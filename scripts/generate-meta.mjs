import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = path.resolve('src/content')
const lessonsRoot = path.join(root, 'lessons')
const outFile = path.join(root, 'generated', 'lesson-meta.ts')
const required = ['id', 'moduleId', 'number', 'title', 'shortTitle', 'description', 'duration', 'eyebrow', 'outcomes']
const forbidden = ['lab', 'formula', 'formulaNote', 'insight', 'questions', 'workedExample']

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

const files = walk(lessonsRoot).filter((file) => file.endsWith(`${path.sep}content.mdx`))
const errors = []
const entries = []

for (const file of files) {
  const relative = path.relative(root, file).split(path.sep).join('/')
  const parsed = matter(fs.readFileSync(file, 'utf8'))
  const data = parsed.data
  for (const key of required) {
    if (!(key in data)) errors.push(`${relative}: brak pola frontmatter "${key}"`)
  }
  for (const key of forbidden) {
    if (key in data) errors.push(`${relative}: pole "${key}" musi być tagiem w treści, nie frontmatterem`)
  }
  const expectedModule = relative.split('/')[1]
  const expectedId = relative.split('/')[2]
  if (data.moduleId !== expectedModule) errors.push(`${relative}: moduleId "${data.moduleId}" nie zgadza się ze ścieżką "${expectedModule}"`)
  if (data.id !== expectedId) errors.push(`${relative}: id "${data.id}" nie zgadza się ze ścieżką "${expectedId}"`)
  if (typeof data.number !== 'number' || !Number.isInteger(data.number) || data.number < 1) errors.push(`${relative}: number musi być liczbą całkowitą > 0`)
  if (typeof data.duration !== 'number' || data.duration <= 0) errors.push(`${relative}: duration musi być > 0`)
  if (!Array.isArray(data.outcomes) || data.outcomes.length === 0) errors.push(`${relative}: outcomes musi być niepustą tablicą`)
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

if (errors.length) {
  console.error(`Błędy frontmattera (${errors.length}):`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

const ids = new Set()
for (const entry of entries) {
  if (ids.has(entry.id)) errors.push(`Duplikat id lekcji: ${entry.id}`)
  ids.add(entry.id)
}
if (errors.length) {
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

entries.sort((a, b) => a.id.localeCompare(b.id))
fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, `// Plik generowany przez scripts/generate-meta.mjs.\nimport type { LessonMeta } from '../model'\n\nexport const lessonMeta = ${JSON.stringify(entries, null, 2)} satisfies LessonMeta[]\n`)
console.log(`Wygenerowano metadane ${entries.length} lekcji do ${path.relative(process.cwd(), outFile)}`)
