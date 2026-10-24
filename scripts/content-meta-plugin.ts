import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import type { Plugin } from 'vite'

const VIRTUAL_ID = 'virtual:lesson-meta'
const RESOLVED_ID = `\0${VIRTUAL_ID}`
const required = ['id', 'moduleId', 'number', 'title', 'shortTitle', 'description', 'duration', 'eyebrow', 'outcomes']
const forbidden = ['lab', 'formula', 'formulaNote', 'insight', 'questions', 'workedExample']

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

function buildMeta(root: string): string {
  const lessonsRoot = path.join(root, 'src/content/lessons')
  const files = walk(lessonsRoot).filter((file) => file.endsWith(`content.mdx`))
  const errors: string[] = []
  const entries: Array<Record<string, unknown>> = []
  const ids = new Set<string>()

  for (const file of files) {
    const relative = path.relative(path.join(root, 'src/content'), file).split(path.sep).join('/')
    const data = matter(fs.readFileSync(file, 'utf8')).data
    for (const key of required) {
      if (!(key in data)) errors.push(`${relative}: brak pola frontmatter "${key}"`)
    }
    for (const key of forbidden) {
      if (key in data) errors.push(`${relative}: pole "${key}" musi być tagiem w treści, nie frontmatterem`)
    }
    const parts = relative.split('/')
    const expectedModule = parts[1]
    const expectedId = parts[2]
    if (data.moduleId !== expectedModule)
      errors.push(`${relative}: moduleId "${data.moduleId}" nie zgadza się ze ścieżką "${expectedModule}"`)
    if (data.id !== expectedId) errors.push(`${relative}: id "${data.id}" nie zgadza się ze ścieżką "${expectedId}"`)
    if (typeof data.number !== 'number' || !Number.isInteger(data.number) || data.number < 1)
      errors.push(`${relative}: number musi być liczbą całkowitą > 0`)
    if (typeof data.duration !== 'number' || data.duration <= 0) errors.push(`${relative}: duration musi być > 0`)
    if (!Array.isArray(data.outcomes) || data.outcomes.length === 0)
      errors.push(`${relative}: outcomes musi być niepustą tablicą`)
    if (ids.has(data.id)) errors.push(`Duplikat id lekcji: ${data.id}`)
    ids.add(data.id)
    entries.push({
      id: data.id,
      moduleId: data.moduleId,
      number: data.number,
      title: data.title,
      shortTitle: data.shortTitle,
      description: data.description,
      duration: data.duration,
      eyebrow: data.eyebrow,
      outcomes: data.outcomes,
      ...(data.solutionId ? { solutionId: data.solutionId } : {}),
    })
  }

  if (errors.length) throw new Error(`Błędy frontmattera:\n${errors.map((error) => `- ${error}`).join('\n')}`)
  entries.sort((a, b) => String(a.id).localeCompare(String(b.id)))
  return `export const lessonMeta = ${JSON.stringify(entries, null, 2)}\n`
}

export function contentMetaPlugin(): Plugin {
  let root = process.cwd()
  return {
    name: 'content-meta',
    configResolved(config) {
      root = config.root
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return
      return buildMeta(root)
    },
    configureServer(server) {
      const invalidate = (file: string) => {
        if (!file.endsWith('content.mdx') || !file.includes(`${path.sep}content${path.sep}lessons${path.sep}`)) return
        const module = server.moduleGraph.getModuleById(RESOLVED_ID)
        if (module) server.moduleGraph.invalidateModule(module)
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('change', invalidate)
      server.watcher.on('add', invalidate)
      server.watcher.on('unlink', invalidate)
    },
  }
}
