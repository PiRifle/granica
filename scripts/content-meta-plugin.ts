import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import remarkMdx from 'remark-mdx'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import type { Plugin } from 'vite'
import { labMeta } from '../src/labs/labMeta.ts'
import { computeReadingStats, countWords, type ReadingStats } from '../src/lib/readingStats.ts'

const VIRTUAL_ID = 'virtual:lesson-meta'
const RESOLVED_ID = `\0${VIRTUAL_ID}`
const required = ['id', 'moduleId', 'number', 'title', 'shortTitle', 'description', 'eyebrow', 'outcomes']
const forbidden = ['duration', 'lab', 'formula', 'formulaNote', 'insight', 'questions', 'workedExample']

type AstNode = {
  type: string
  value?: string
  name?: string
  attributes?: Array<{ name?: string; value?: unknown }>
  children?: AstNode[]
}

const processor = unified().use(remarkParse).use(remarkMdx).use(remarkMath)
const blockTypes = new Set(['paragraph', 'heading', 'listItem', 'tableCell', 'blockquote', 'list'])

function attribute(node: AstNode, name: string): string | undefined {
  const value = node.attributes?.find((entry) => entry.name === name)?.value
  return typeof value === 'string' ? value : undefined
}

function analyzeLesson(body: string): ReadingStats {
  const tree = processor.parse(body) as unknown as AstNode
  const texts: string[] = []
  let inlineMath = 0
  let displayMath = 0
  let experiments = 0
  let experimentMinutes = 0

  const visit = (node: AstNode) => {
    if (node.type === 'inlineMath') {
      inlineMath += 1
      texts.push(' ')
      return
    }
    if (node.type === 'math') {
      displayMath += 1
      texts.push(' ')
      return
    }
    if (node.type === 'code' || node.type === 'inlineCode') return
    if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
      if (node.name === 'Quiz') return
      if (node.name === 'Lab') {
        const id = attribute(node, 'id')
        experiments += 1
        experimentMinutes += (id ? labMeta[id]?.minutes : undefined) ?? 4
        return
      }
    }
    if (blockTypes.has(node.type)) texts.push(' ')
    if (node.type === 'text' && node.value) texts.push(node.value)
    if (node.children) for (const child of node.children) visit(child)
  }

  visit(tree)
  return computeReadingStats({
    words: countWords(texts.join('')),
    inlineMath,
    displayMath,
    experiments,
    experimentMinutes,
  })
}

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
    const parsed = matter(fs.readFileSync(file, 'utf8'))
    const data = parsed.data
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
    if (!Array.isArray(data.outcomes) || data.outcomes.length === 0)
      errors.push(`${relative}: outcomes musi być niepustą tablicą`)
    if (ids.has(data.id)) errors.push(`Duplikat id lekcji: ${data.id}`)
    ids.add(data.id)
    const stats = analyzeLesson(parsed.content)
    entries.push({
      id: data.id,
      moduleId: data.moduleId,
      number: data.number,
      title: data.title,
      shortTitle: data.shortTitle,
      description: data.description,
      eyebrow: data.eyebrow,
      outcomes: data.outcomes,
      ...stats,
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
