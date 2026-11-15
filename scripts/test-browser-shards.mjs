import { spawn } from 'node:child_process'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

const shardCount = Number(process.env.SOLUTION_SHARD_COUNT ?? os.availableParallelism())
const verbose = process.env.SOLUTION_SHARD_VERBOSE === '1'
const vitest = fileURLToPath(new URL('../node_modules/vitest/vitest.mjs', import.meta.url))
const startedAt = Date.now()
const activeChildren = new Set()
const results = []

function runAttempt(shard, attempt) {
  return new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [vitest, 'run', '--config', 'vitest.browser.config.ts', `--shard=${shard}/${shardCount}`],
      {
        cwd: process.cwd(),
        env: process.env,
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    )
    activeChildren.add(child)
    const result = { output: '', code: 1, passed: 0, failed: 0, remainder: '' }
    const consume = (chunk) => {
      result.output += chunk
      const lines = `${result.remainder}${chunk}`.split('\n')
      result.remainder = lines.pop() ?? ''
      for (const line of lines) {
        if (verbose) console.log(`[shard ${shard} / próba ${attempt}] ${line}`)
        if (line.includes('✓ |chromium|')) result.passed += 1
        else if (line.includes('× |chromium|')) result.failed += 1
        const completed = result.passed + result.failed
        if (!verbose && completed > 0 && completed % 10 === 0) {
          console.log(
            `[shard ${shard}/${shardCount} / próba ${attempt}] postęp: ${completed} | OK ${result.passed} | FAIL ${result.failed}`,
          )
        }
      }
    }
    child.stdout.setEncoding('utf8')
    child.stderr.setEncoding('utf8')
    child.stdout.on('data', consume)
    child.stderr.on('data', consume)
    child.once('error', (error) => {
      result.output += `\n${error.message}\n`
      result.code = 1
    })
    child.once('exit', (code) => {
      activeChildren.delete(child)
      result.code = code ?? 1
      resolve(result)
    })
  })
}

const stop = () => {
  for (const child of activeChildren) child.kill('SIGTERM')
}
process.once('SIGINT', stop)
process.once('SIGTERM', stop)

async function runShard(shard) {
  const attempts = []
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const result = await runAttempt(shard, attempt)
    attempts.push(result)
    const infrastructureError =
      result.code !== 0 &&
      /Failed to fetch dynamically imported module|Cannot connect to the iframe|Failed to import test file/.test(
        result.output,
      )
    if (result.code === 0 || !infrastructureError || attempt === 3) {
      console.log(`[shard ${shard}/${shardCount}] zakończony: ${result.code} / próba ${attempt}`)
      return { shard, code: result.code, output: result.output, attempts }
    }
    console.log(`[shard ${shard}/${shardCount}] błąd ładowania; ponawiam próbę ${attempt + 1}`)
    await new Promise((resolve) => setTimeout(resolve, 250 * attempt))
  }
  throw new Error('Nieosiągalny stan sharda')
}

await Promise.all(Array.from({ length: shardCount }, (_, index) => runShard(index + 1))).then((entries) => {
  results.push(...entries)
})

let failed = 0
let passed = 0
let shardsWithoutResults = 0
for (const result of results) {
  if (!verbose) {
    console.log(`\n===== SHARD ${result.shard}/${shardCount} =====\n`)
    for (const [index, attempt] of result.attempts.entries()) {
      console.log(`\n----- próba ${index + 1} -----\n`)
      process.stdout.write(attempt.output)
    }
  }
  const output = result.output.replace(/\u001b\[[0-9;]*m/g, '')
  const beforeFailed = failed
  const beforePassed = passed
  for (const match of output.matchAll(/Tests\s+(\d+) failed \| (\d+) passed/g)) {
    failed += Number(match[1])
    passed += Number(match[2])
  }
  if (!output.includes(' failed | ')) {
    for (const match of output.matchAll(/Tests\s+(\d+) passed/g)) passed += Number(match[1])
  }
  if (beforeFailed === failed && beforePassed === passed) shardsWithoutResults += 1
}

const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1)
const failedShards = results.filter((result) => result.code !== 0).length
console.log('\n===== PODSUMOWANIE WSZYSTKICH SHARDÓW =====')
if (passed + failed === 0) {
  console.log('Nie udało się zebrać wyników testowych. Sprawdź raporty shardów.')
}
console.log(
  `Testy: ${passed + failed} | zaliczone: ${passed} | niezaliczone: ${failed} | shardy z błędami: ${failedShards} | shardy bez wyników: ${shardsWithoutResults} | czas: ${elapsed}s`,
)
process.exitCode = failedShards > 0 || passed + failed === 0 ? 1 : 0
