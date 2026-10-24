#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import katex from 'katex'

const root = process.cwd()
const lessonsRoot = path.join(root, 'src/content/lessons')
const solutionsRoot = path.join(root, 'src/content/solutions')
const dryRun = process.argv.includes('--dry-run')

const visualByModule = {
  foundations: 'diagram',
  axial: 'axial',
  material: 'thermal',
  geometry: 'section',
  shear: 'diagram',
  bending: 'beam',
  'stress-state': 'cube',
  'strain-state': 'rosette',
  criteria: 'cube',
  design: 'diagram',
}

const stats = {
  workedConverted: 0,
  proseConverted: 0,
  skipped: [],
  formulasOmitted: [],
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

function normalizeInline(value) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractTag(value, tag) {
  const match = value.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))
  return match ? match[1] : null
}

function cleanNarration(value) {
  const symbols = {
    alpha: 'α',
    beta: 'β',
    gamma: 'γ',
    delta: 'δ',
    Delta: 'Δ',
    epsilon: 'ε',
    varepsilon: 'ε',
    zeta: 'ζ',
    eta: 'η',
    theta: 'θ',
    Theta: 'Θ',
    kappa: 'κ',
    lambda: 'λ',
    Lambda: 'Λ',
    mu: 'μ',
    nu: 'ν',
    xi: 'ξ',
    pi: 'π',
    Pi: 'Π',
    rho: 'ρ',
    sigma: 'σ',
    Sigma: 'Σ',
    tau: 'τ',
    upsilon: 'υ',
    phi: 'φ',
    varphi: 'φ',
    chi: 'χ',
    psi: 'ψ',
    Psi: 'Ψ',
    omega: 'ω',
    Omega: 'Ω',
    cdot: '·',
    times: '×',
    approx: '≈',
    le: '≤',
    leq: '≤',
    ge: '≥',
    geq: '≥',
    ne: '≠',
    neq: '≠',
    pm: '±',
    mp: '∓',
    to: '→',
    rightarrow: '→',
    Rightarrow: '→',
    leftarrow: '←',
    Leftarrow: '←',
    infty: '∞',
    sum: 'Σ',
    int: '∫',
    partial: '∂',
    percent: '%',
    degree: '°',
  }
  const formatting = new Set([
    'text',
    'mathrm',
    'mathbf',
    'mathit',
    'mathsf',
    'mathtt',
    'mathbb',
    'mathcal',
    'mathfrak',
    'mathscr',
    'operatorname',
    'boldsymbol',
    'overline',
    'underline',
    'bar',
    'hat',
    'vec',
    'dot',
    'ddot',
    'widehat',
    'widetilde',
    'overrightarrow',
    'overleftarrow',
  ])
  const skipped = new Set([
    'left',
    'right',
    'big',
    'Big',
    'bigg',
    'Bigg',
    'bigl',
    'bigr',
    'Bigl',
    'Bigr',
    'biggl',
    'biggr',
    'Biggl',
    'Biggr',
    'quad',
    'qquad',
    'displaystyle',
    'textstyle',
    'limits',
    'nolimits',
    'nonumber',
    'begin',
    'end',
  ])

  function readGroup(source, start) {
    let index = start
    while (index < source.length && /\s/.test(source[index])) index += 1
    if (source[index] !== '{') return null
    let depth = 0
    for (let cursor = index; cursor < source.length; cursor += 1) {
      if (source[cursor] === '{') depth += 1
      else if (source[cursor] === '}') {
        depth -= 1
        if (depth === 0) return { content: source.slice(index + 1, cursor), end: cursor + 1 }
      }
    }
    return null
  }

  function readOptional(source, start) {
    let index = start
    while (index < source.length && /\s/.test(source[index])) index += 1
    if (source[index] !== '[') return null
    const end = source.indexOf(']', index + 1)
    if (end < 0) return null
    return { content: source.slice(index + 1, end), end: end + 1 }
  }

  function render(source) {
    let output = ''
    let index = 0
    while (index < source.length) {
      const character = source[index]
      if (character === '\\') {
        const next = source[index + 1]
        if (!next) {
          index += 1
          continue
        }
        if (!/[A-Za-z]/.test(next)) {
          if (next === '\\' || next === ',' || next === ';' || next === ':' || next === '!' || next === ' ') {
            output += ' '
          } else {
            output += next
          }
          index += 2
          continue
        }
        let commandEnd = index + 1
        while (commandEnd < source.length && /[A-Za-z]/.test(source[commandEnd])) commandEnd += 1
        const command = source.slice(index + 1, commandEnd)
        index = commandEnd
        if (formatting.has(command)) {
          const group = readGroup(source, index)
          if (group) {
            output += render(group.content)
            index = group.end
          }
          continue
        }
        if (command === 'frac') {
          const first = readGroup(source, index)
          if (!first) continue
          const second = readGroup(source, first.end)
          if (!second) {
            output += render(first.content)
            index = first.end
            continue
          }
          output += `(${render(first.content)})/(${render(second.content)})`
          index = second.end
          continue
        }
        if (command === 'sqrt') {
          const optional = readOptional(source, index)
          let degree = ''
          if (optional) {
            degree = optional.content
            index = optional.end
          }
          const group = readGroup(source, index)
          if (group) {
            output += `${degree === '3' ? '∛' : '√'}(${render(group.content)})`
            index = group.end
          } else {
            output += '√'
          }
          continue
        }
        if (command in symbols) {
          output += symbols[command]
          continue
        }
        if (skipped.has(command)) {
          if (command === 'begin' || command === 'end') {
            const group = readGroup(source, index)
            if (group) index = group.end
          }
          continue
        }
        output += command
        continue
      }
      if (character === '{' || character === '}') {
        index += 1
        continue
      }
      output += character
      index += 1
    }
    return output
  }

  let text = value
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, ' $1 ')
  text = text.replace(/\$([^$]+)\$/g, ' $1 ')
  text = text.replace(/`([^`]+)`/g, '$1')
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1')
  text = text.replace(/__([^_]+)__/g, '$1')
  text = text.replace(/^\s*[-*+]\s+/gm, '')
  text = text.replace(/^\s*\d+\.\s+/gm, '')
  text = render(text)
  text = text.replace(/\s+([,.;:!?])/g, '$1')
  text = text.replace(/\(\s+/g, '(')
  text = text.replace(/\s+\)/g, ')')
  text = text.replace(/\s+/g, ' ').trim()
  return text
}

function shorten(value, limit = 130) {
  const text = normalizeInline(value)
  if (text.length <= limit) return text
  const cut = text.slice(0, limit)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trim()}…`
}

function looksLikeTaskData(value) {
  const text = normalizeInline(value)
  if (!text) return false
  if (/[0-9]|=/.test(text)) return true
  return /^(Dane|Dana|Dany|Rozważmy|Przyjmijmy|Załóżmy|Belka|Pręt|Wał|Płyta|Przekrój|Wspornik|Taśma|Linka|Tensometr|Zbicie|Rozeta|Element|Pionowy|Okrągły|Prostokąt|Trójkąt|Półkole|Rura|Zbiornik)/i.test(
    text,
  )
}

function isValidFormula(formula) {
  try {
    katex.renderToString(formula, { throwOnError: true, displayMode: true })
    return true
  } catch {
    return false
  }
}

function allocateId(baseId, usedIds) {
  const suffixes = ['', '-b', '-c', '-d', '-e', '-f', '-g', '-h', '-i', '-j']
  for (const suffix of suffixes) {
    const candidate = `${baseId}${suffix}`
    if (!usedIds.has(candidate) && !fs.existsSync(path.join(solutionsRoot, candidate))) return candidate
  }
  let index = 2
  while (true) {
    const candidate = `${baseId}-b${index}`
    if (!usedIds.has(candidate) && !fs.existsSync(path.join(solutionsRoot, candidate))) return candidate
    index += 1
  }
}

function writeSolution(id, data, body, usedIds) {
  usedIds.add(id)
  const dir = path.join(solutionsRoot, id)
  if (!dryRun) {
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(
      path.join(dir, 'solution.data.ts'),
      `import type { SolutionData } from '../../model'\n\nexport default ${JSON.stringify(data, null, 2)} satisfies SolutionData\n`,
    )
    fs.writeFileSync(path.join(dir, 'content.mdx'), `${body}\n`)
  }
}

function parseProseBlocks(body) {
  const blocks = []
  const pattern = /<Formula>([\s\S]*?)<\/Formula>|\$\$([\s\S]*?)\$\$/g
  let lastIndex = 0
  let match

  const addText = (text) => {
    for (const chunk of text.split(/\n\s*\n/)) {
      const value = chunk.trim()
      if (!value) continue
      if (/^<\/?(Formula|Caption)\b/i.test(value)) continue
      blocks.push({ type: 'paragraph', text: value })
    }
  }

  while ((match = pattern.exec(body))) {
    if (match.index > lastIndex) addText(body.slice(lastIndex, match.index))
    if (match[1] !== undefined) {
      const inner = match[1]
      const caption = extractTag(inner, 'Caption')
      const formulas = [...inner.matchAll(/\$\$([\s\S]*?)\$\$/g)]
      if (formulas.length > 0) {
        for (const formula of formulas) {
          blocks.push({
            type: 'equation',
            formula: formula[1].trim(),
            caption: caption ? normalizeInline(caption) : '',
          })
        }
      } else {
        const fallback = inner.trim()
        if (fallback)
          blocks.push({ type: 'equation', formula: fallback, caption: caption ? normalizeInline(caption) : '' })
      }
    } else {
      blocks.push({ type: 'equation', formula: match[2].trim(), caption: '' })
    }
    lastIndex = pattern.lastIndex
  }
  if (lastIndex < body.length) addText(body.slice(lastIndex))
  return blocks
}

function buildProseSolution(lesson, heading, sectionBody, id, usedIds, visual) {
  const blocks = parseProseBlocks(sectionBody)
  const equations = blocks.filter((block) => block.type === 'equation' && block.formula)
  if (equations.length === 0) {
    stats.skipped.push(`${lesson.relative}: "${heading}" — brak równania blokowego`)
    return null
  }

  const paragraphs = blocks.filter((block) => block.type === 'paragraph')
  const firstParagraph = paragraphs[0]?.text ?? ''
  const lastParagraph = paragraphs.at(-1)?.text ?? ''
  const title = heading.replace(/^#+\s*/, '').trim()

  const scenes = []
  let omitted = 0
  blocks.forEach((block, index) => {
    const step = index + 1
    if (block.type === 'equation') {
      const formula = block.formula.trim()
      const scene = {
        title: `Krok ${step}`,
        narration: block.caption ? cleanNarration(block.caption) : 'Zapis matematyczny.',
        caption: shorten(cleanNarration(formula) || 'Zapis wzoru'),
        visual,
      }
      if (formula && isValidFormula(formula)) scene.formula = formula
      else if (formula) {
        omitted += 1
        stats.formulasOmitted.push(`${id}: ${formula.slice(0, 120)}`)
      }
      scenes.push(scene)
    } else {
      const narration = cleanNarration(block.text)
      if (!narration) return
      scenes.push({
        title: `Krok ${step}`,
        narration,
        caption: shorten(narration),
        visual,
      })
    }
  })

  if (scenes.length === 0) {
    stats.skipped.push(`${lesson.relative}: "${heading}" — brak scen`)
    return null
  }

  const data = {
    id,
    title,
    duration: 7,
    given: looksLikeTaskData(firstParagraph) ? [cleanNarration(firstParagraph)] : [],
    result: lastParagraph ? cleanNarration(lastParagraph) : 'Zgodnie z obliczeniami.',
    scenes,
  }

  const body = normalizeInline(firstParagraph || title)
  writeSolution(id, data, body, usedIds)
  stats.proseConverted += 1
  if (omitted > 0) stats.skipped.push(`${id}: pominięto ${omitted} niepoprawnych formuł`)
  return id
}

function processLesson(file) {
  const relative = path.relative(lessonsRoot, file).split(path.sep).join('/')
  const parts = relative.split('/')
  const moduleId = parts[0]
  const lessonId = parts[1]
  const visual = visualByModule[moduleId] ?? 'diagram'
  const usedIds = new Set()
  let text = fs.readFileSync(file, 'utf8')
  const shortTitle =
    text
      .match(/^shortTitle:\s*(.+)$/m)?.[1]
      ?.trim()
      .replace(/^['"]|['"]$/g, '') ?? lessonId

  const workedMatches = [...text.matchAll(/<WorkedExample>([\s\S]*?)<\/WorkedExample>/g)]
  const workedReplacements = []
  workedMatches.forEach((match, index) => {
    const block = match[1]
    const given = extractTag(block, 'Given')
    const result = extractTag(block, 'Result')
    const stepsBlock = extractTag(block, 'Steps')
    if (given === null || result === null || stepsBlock === null) {
      stats.skipped.push(`${relative}: WorkedExample #${index + 1} — brak Given/Steps/Result`)
      return
    }
    const steps = [...stepsBlock.matchAll(/<Step>([\s\S]*?)<\/Step>/g)].map((step) => step[1])
    if (steps.length === 0) {
      stats.skipped.push(`${relative}: WorkedExample #${index + 1} — brak kroków`)
      return
    }

    const baseId = index === 0 ? `ex-${lessonId}` : `ex-${lessonId}-w${index + 1}`
    const id = allocateId(baseId, usedIds)
    const givenText = normalizeInline(given)
    const resultText = normalizeInline(result)
    const scenes = steps.map((step, stepIndex) => {
      const raw = normalizeInline(step)
      const math = raw.match(/\$([^$]+)\$/)
      const scene = {
        title: `Krok ${stepIndex + 1}`,
        narration: cleanNarration(raw),
        caption: shorten(cleanNarration(raw)),
        visual,
      }
      if (math && isValidFormula(math[1].trim())) scene.formula = math[1].trim()
      else if (math) stats.formulasOmitted.push(`${id}: ${math[1].trim().slice(0, 120)}`)
      return scene
    })

    const data = {
      id,
      title: `${shortTitle} — przykład`,
      duration: 7,
      given: [cleanNarration(givenText)],
      result: cleanNarration(resultText),
      scenes,
    }

    if (!dryRun) {
      writeSolution(id, data, givenText, usedIds)
    } else {
      usedIds.add(id)
    }
    stats.workedConverted += 1
    workedReplacements.push({ start: match.index, end: match.index + match[0].length, id })
  })

  for (const replacement of workedReplacements.sort((a, b) => b.start - a.start)) {
    text = `${text.slice(0, replacement.start)}<AnimatedSolution id="${replacement.id}" />${text.slice(replacement.end)}`
  }

  const lines = text.split('\n')
  const headings = []
  lines.forEach((line, index) => {
    if (/^##\s+.*przykład/i.test(line)) headings.push(index)
  })

  const proseEdits = []
  headings.forEach((headingIndex, proseIndex) => {
    let end = lines.length
    for (let index = headingIndex + 1; index < lines.length; index += 1) {
      if (/^##\s+/.test(lines[index])) {
        end = index
        break
      }
    }
    const bodyLines = lines.slice(headingIndex + 1, end)
    if (bodyLines.some((line) => line.includes('<AnimatedSolution'))) return

    let tailStart = bodyLines.length
    for (let index = 0; index < bodyLines.length; index += 1) {
      const trimmed = bodyLines[index].trim()
      const component = trimmed.match(/^<([A-Za-z][A-Za-z0-9]*)/)
      if (!component) continue
      const name = component[1]
      if (name === 'Formula' || name === 'Caption') continue
      tailStart = index
      break
    }

    const exampleLines = bodyLines.slice(0, tailStart)
    const tailLines = bodyLines.slice(tailStart)
    const sectionBody = exampleLines.join('\n')
    const baseId = `ex-${lessonId}-${proseIndex + 2}`
    const id = allocateId(baseId, usedIds)
    const created = buildProseSolution({ relative, lessonId }, lines[headingIndex], sectionBody, id, usedIds, visual)
    if (!created) return

    const replacementLines = [lines[headingIndex], '', `<AnimatedSolution id="${created}" />`, '']
    if (tailLines.length > 0) replacementLines.push(...tailLines)
    proseEdits.push({ start: headingIndex, end, lines: replacementLines })
  })

  for (const edit of proseEdits.sort((a, b) => b.start - a.start)) {
    lines.splice(edit.start, edit.end - edit.start, ...edit.lines)
  }

  if (!dryRun) fs.writeFileSync(file, lines.join('\n'))
}

const lessonFiles = walk(lessonsRoot)
  .filter((file) => file.endsWith('/content.mdx'))
  .sort()

for (const file of lessonFiles) processLesson(file)

console.log(`WorkedExamples converted: ${stats.workedConverted}`)
console.log(`Prose examples converted: ${stats.proseConverted}`)
console.log(`Skipped/notes: ${stats.skipped.length}`)
for (const item of stats.skipped) console.log(`  - ${item}`)
if (stats.formulasOmitted.length > 0) {
  console.log(`Invalid formulas omitted: ${stats.formulasOmitted.length}`)
  for (const item of stats.formulasOmitted) console.log(`  - ${item}`)
}
if (dryRun) console.log('Dry run: no files were written.')
