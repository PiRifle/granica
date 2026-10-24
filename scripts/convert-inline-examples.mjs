#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import katex from 'katex'

const root = process.cwd()
const lessonsRoot = path.join(root, 'src/content/lessons')
const solutionsRoot = path.join(root, 'src/content/solutions')
const dryRun = process.argv.includes('--dry-run')
const debug = process.argv.includes('--debug')

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
  sectionsConverted: 0,
  sectionsSkipped: [],
  scenesCreated: 0,
  newFormulas: 0,
  existingSolutionsImproved: 0,
  existingScenesImproved: 0,
  existingScenesUnchanged: 0,
  formulasOmitted: [],
  debugNew: [],
  debugExisting: [],
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

function writeSolution(id, data, body, usedIds) {
  usedIds.add(id)
  if (dryRun) return
  const dir = path.join(solutionsRoot, id)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(
    path.join(dir, 'solution.data.ts'),
    `import type { SolutionData } from '../../model'\n\nexport default ${JSON.stringify(data, null, 2)} satisfies SolutionData\n`,
  )
  fs.writeFileSync(path.join(dir, 'content.mdx'), `${body}\n`)
}

const greekToLatex = {
  α: '\\alpha',
  β: '\\beta',
  γ: '\\gamma',
  δ: '\\delta',
  ε: '\\varepsilon',
  ζ: '\\zeta',
  η: '\\eta',
  θ: '\\theta',
  ι: '\\iota',
  κ: '\\kappa',
  λ: '\\lambda',
  μ: '\\mu',
  µ: '\\mu',
  ν: '\\nu',
  ξ: '\\xi',
  π: '\\pi',
  ρ: '\\rho',
  σ: '\\sigma',
  τ: '\\tau',
  υ: '\\upsilon',
  φ: '\\varphi',
  χ: '\\chi',
  ψ: '\\psi',
  ω: '\\omega',
  Γ: '\\Gamma',
  Δ: '\\Delta',
  Θ: '\\Theta',
  Λ: '\\Lambda',
  Ξ: '\\Xi',
  Π: '\\Pi',
  Σ: '\\Sigma',
  Υ: '\\Upsilon',
  Φ: '\\Phi',
  Ψ: '\\Psi',
  Ω: '\\Omega',
}

const textSuffixes = new Set([
  'dop',
  'max',
  'min',
  'red',
  'HMH',
  'sr',
  'wym',
  'rz',
  'abs',
  'poprz',
  'osi',
  'req',
  'gr',
  'eq',
  'opt',
  'avg',
  'lim',
  'cr',
  'pl',
  'el',
])

const unitWords = new Set([
  'N',
  'kN',
  'MN',
  'Pa',
  'kPa',
  'MPa',
  'GPa',
  'm',
  'mm',
  'cm',
  'km',
  'µm',
  'μm',
  'kg',
  'g',
  's',
  'min',
  'h',
  'K',
  'C',
  '°C',
  'rad',
  'obr',
  'Hz',
  'W',
  'kW',
  'J',
  'kJ',
  'm2',
  'mm2',
  'cm2',
  'm3',
  'mm3',
  'cm3',
  'N/mm2',
  'N/mm²',
  'kN/m',
  'kN·m',
  'N·m',
  'MPa²',
])

const stopWords = new Set([
  'w',
  'i',
  'z',
  'o',
  'u',
  'a',
  'na',
  'do',
  'od',
  'po',
  'za',
  'ze',
  'we',
  'to',
  'co',
  'bo',
  'by',
  'lub',
  'lub',
  'lub',
  'że',
  'je',
  'go',
  'mu',
  'im',
  'ich',
  'się',
  'jest',
  'są',
  'być',
  'ma',
  'mają',
  'wynosi',
  'wynoszą',
  'otrzymujemy',
  'otrzymuje',
  'mamy',
  'daje',
  'dają',
  'czyli',
  'więc',
  'zatem',
  'stąd',
  'gdy',
  'gdyby',
  'jeśli',
  'dla',
  'przy',
  'oraz',
  'albo',
  'gdzie',
  'wtedy',
  'oblicz',
  'przelicz',
  'przyjmij',
  'przyjmujemy',
  'sprawdź',
  'sprawdźmy',
  'ustal',
  'wyznacz',
  'wyznaczamy',
  'podstaw',
  'podstawiamy',
  'zapisz',
  'porównaj',
  'porównujemy',
  'naprężenie',
  'naprężenia',
  'siła',
  'siły',
  'siłę',
  'pole',
  'pola',
  'moment',
  'momentu',
  'wynik',
  'wartość',
  'wartości',
  'średnica',
  'średnicę',
  'średnicy',
  'moduł',
  'modułu',
  'granica',
  'granicy',
  'materiał',
  'materiału',
  'pręt',
  'pręta',
  'wał',
  'wału',
  'belka',
  'belki',
  'przekrój',
  'przekroju',
  'odcinek',
  'odcinka',
  'odcinku',
  'krok',
  'kroku',
  'przykład',
  'przykładu',
  'wariant',
  'wariantu',
  'rozwiązanie',
  'odpowiedź',
  'uwaga',
  'warto',
  'zauważyć',
  'zauważ',
  'pamiętaj',
  'trzeba',
  'należy',
  'można',
  'może',
  'mogą',
  'będzie',
  'będą',
  'jest',
  'jako',
  'które',
  'który',
  'która',
  'których',
  'tym',
  'ten',
  'ta',
  'te',
  'tego',
  'tej',
  'tak',
  'takie',
  'taki',
  'aby',
  'ale',
  'bardzo',
  'około',
  'ponad',
  'poniżej',
  'powyżej',
  'między',
  'przez',
  'przed',
  'pod',
  'nad',
  'bez',
  'przeciw',
  'równa',
  'równe',
  'równy',
  'proszę',
])

function stripTokenPunctuation(token) {
  return token.replace(/^[("'„]+/, '').replace(/[)"'.,;:!?…]+$/, '')
}

function isMathToken(raw) {
  if (!raw) return false
  if (/[:;]$/.test(raw)) return false
  const token = stripTokenPunctuation(raw)
  if (!token) return false
  if (/[()[\]{}]$/.test(raw)) return true
  const lower = token.toLowerCase()
  if (stopWords.has(lower)) return false
  if (/^[+\-−·×/^_=≈≤≥<>()[\]{}|,]+$/.test(token)) return true
  if (/^(max|min|log|ln|sin|cos|tan|sqrt|exp)$/i.test(token)) return true
  if (unitWords.has(token)) return true
  if (/\d/.test(token)) return true
  if (/[α-ωΑ-Ωµ]/.test(token)) return true
  if (/[_^]/.test(token)) return true
  if (/[\u2080-\u2089\u2093\u2070-\u2079\u00b2\u00b3\u00b9]/.test(token)) return true
  if (/^[A-Za-z]{1,2}$/.test(token)) return true
  if (/^[A-Za-zΔα-ωΑ-Ωµ]+\/[A-Za-zΔα-ωΑ-Ωµ0-9]+$/.test(token)) return true
  if (/^[A-Za-zΔα-ωΑ-Ωµ]+\([A-Za-z0-9,]+\)$/.test(token)) return true
  if (/^(max|min)\(/.test(token)) return true
  if (/^(Amin|Amax|Nmax|Nmin|Mmax|Mmin|Meq|Mdop|Wmin|Wmax|nwym|nrz|ndop|kr|kc|GF)$/.test(token)) return true
  return false
}

function isLeftOperand(raw) {
  const token = stripTokenPunctuation(raw)
  if (!token) return false
  if (/^[=≈≤≥+\-−·×/^,]+$/.test(token)) return false
  return /[A-Za-z0-9α-ωΑ-Ωµ\u2080-\u2089\u2093\u00b2\u00b3\u00b9)\]]/.test(token)
}

function replaceSqrt(value) {
  let output = ''
  for (let index = 0; index < value.length; index += 1) {
    if (value[index] !== '√') {
      output += value[index]
      continue
    }
    let cursor = index + 1
    while (cursor < value.length && /\s/.test(value[cursor])) cursor += 1
    const open = value[cursor]
    if (open === '(' || open === '[') {
      const close = open === '(' ? ')' : ']'
      let depth = 0
      let end = cursor
      for (; end < value.length; end += 1) {
        if (value[end] === open) depth += 1
        else if (value[end] === close) {
          depth -= 1
          if (depth === 0) break
        }
      }
      if (end < value.length) {
        output += `\\sqrt{${value.slice(cursor + 1, end)}}`
        index = end
        continue
      }
    }
    let end = cursor
    while (end < value.length && /[A-Za-z0-9.]/.test(value[end])) end += 1
    if (end > cursor) {
      output += `\\sqrt{${value.slice(cursor, end)}}`
      index = end - 1
      continue
    }
    output += '\\sqrt'
  }
  return output
}

function formatSuffix(suffix, braced = false) {
  let text = suffix
  if (text.startsWith('_')) text = text.slice(1)
  if (text.startsWith('{') && text.endsWith('}')) text = text.slice(1, -1)
  if (!text) return ''
  if (/^[A-Za-z]{2,}$/.test(text) && textSuffixes.has(text)) {
    return braced ? `_{\\mathrm{${text}}}` : `_{\\mathrm{${text}}}`
  }
  return braced ? `_{${text}}` : `_{${text}}`
}

function latexifyVariables(value) {
  let text = value

  text = text.replace(/Δ\s*([A-Za-z])(_\{[^}]+\}|_[A-Za-z0-9]+|[A-Za-z0-9]*)/g, (_match, letter, rest) => {
    let output = `\\Delta ${letter}`
    if (rest) {
      if (rest.startsWith('_')) output += formatSuffix(rest)
      else output += formatSuffix(rest)
    }
    return output
  })
  text = text.replace(/Δ/g, '\\Delta ')

  text = text.replace(/([α-ωΑ-Ωµ])(_\{[^}]+\}|_[A-Za-z0-9]+|[A-Za-z0-9]+)?/g, (match, greek, suffix) => {
    const command = greekToLatex[greek]
    if (!command) return match
    if (!suffix) return `${command} `
    return `${command}${formatSuffix(suffix)}`
  })

  const plainSuffixes = [
    ['Amin', 'A_{\\min}'],
    ['Amax', 'A_{\\max}'],
    ['Nmax', 'N_{\\max}'],
    ['Nmin', 'N_{\\min}'],
    ['Mmax', 'M_{\\max}'],
    ['Mmin', 'M_{\\min}'],
    ['Meq', 'M_{\\mathrm{eq}}'],
    ['Mdop', 'M_{\\mathrm{dop}}'],
    ['Wmin', 'W_{\\min}'],
    ['Wmax', 'W_{\\max}'],
    ['nwym', 'n_{\\mathrm{wym}}'],
    ['nrz', 'n_{\\mathrm{rz}}'],
    ['ndop', 'n_{\\mathrm{dop}}'],
    ['Imax', 'I_{\\max}'],
    ['Imin', 'I_{\\min}'],
  ]
  for (const [from, to] of plainSuffixes) {
    text = text.replace(new RegExp(`\\b${from}\\b`, 'g'), to)
  }

  text = text.replace(/\b([A-Za-z])(\d+)\b/g, '$1_{$2}')
  return text
}

function toLatex(value) {
  let text = value.trim()
  text = text
    .replace(/^["'„]+/, '')
    .replace(/["'.,;:!?…]+$/, '')
    .trim()
  if (!text) return ''
  text = text.replace(/[−–—]/g, '-')
  text = text.replace(/≈/g, '\\approx ')
  text = text.replace(/≤/g, '\\le ')
  text = text.replace(/≥/g, '\\ge ')
  text = text.replace(/≠/g, '\\ne ')
  text = text.replace(/→/g, '\\to ')
  text = text.replace(/←/g, '\\leftarrow ')
  text = text.replace(/∞/g, '\\infty ')
  text = text.replace(/±/g, '\\pm ')
  text = text.replace(/·/g, '\\cdot ')
  text = text.replace(/×/g, '\\times ')
  text = text.replace(/÷/g, '\\div ')
  text = text.replace(/°/g, '^{\\circ}')
  text = text.replace(/%/g, '\\%')
  text = text.replace(/½/g, '\\frac{1}{2}')
  text = text.replace(/¼/g, '\\frac{1}{4}')
  text = text.replace(/¾/g, '\\frac{3}{4}')
  text = text.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]+)/g, (match) => {
    const map = {
      '⁰': '0',
      '¹': '1',
      '²': '2',
      '³': '3',
      '⁴': '4',
      '⁵': '5',
      '⁶': '6',
      '⁷': '7',
      '⁸': '8',
      '⁹': '9',
      '⁻': '-',
      '⁺': '+',
    }
    return `^{${[...match].map((character) => map[character] ?? character).join('')}}`
  })
  text = text.replace(/([₀₁₂₃₄₅₆₇₈₉ₓ]+)/g, (match) => {
    const map = {
      '₀': '0',
      '₁': '1',
      '₂': '2',
      '₃': '3',
      '₄': '4',
      '₅': '5',
      '₆': '6',
      '₇': '7',
      '₈': '8',
      '₉': '9',
      ₓ: 'x',
    }
    return `_{${[...match].map((character) => map[character] ?? character).join('')}}`
  })
  text = replaceSqrt(text)

  text = latexifyVariables(text)

  text = text.replace(/\^(-?\d+)/g, '^{$1}')
  text = text.replace(/\^([A-Za-z])/g, '^{$1}')
  text = text.replace(/_([A-Za-z0-9]+)/g, '_{$1}')
  text = text.replace(/\b(max|min)\s*\(/g, '\\$1(')

  text = text.replace(/(\d),(\d)/g, '$1{,}$2')
  text = text.replace(/(\d)\s+(\d)/g, '$1\\,$2')
  text = text.replace(/\s+/g, ' ').trim()
  text = text.replace(/\s*\^\s*/g, '^')
  text = text.replace(/\s*_\s*/g, '_')
  return text
}

function extractEquationFormula(value) {
  const spaced = value.replace(/\s*([=≈≤≥])\s*/g, ' $1 ')
  const tokens = spaced.split(/\s+/).filter(Boolean)
  for (let index = 0; index < tokens.length; index += 1) {
    if (!/^[=≈≤≥]$/.test(tokens[index])) continue

    let start = index - 1
    while (start >= 0 && isMathToken(tokens[start])) start -= 1
    start += 1

    let end = index + 1
    while (end < tokens.length && isMathToken(tokens[end])) end += 1
    end -= 1

    if (start >= index || end <= index) continue
    if (!isLeftOperand(tokens[start])) continue
    while (end > index && !isLeftOperand(tokens[end])) end -= 1
    if (end <= index) continue

    const raw = tokens.slice(start, end + 1).join(' ')
    const formula = toLatex(raw)
    if (!formula) continue
    if (isValidFormula(formula)) return formula
    stats.formulasOmitted.push(`${raw.slice(0, 160)} -> ${formula.slice(0, 160)}`)
  }
  return ''
}

function extractFormula(value) {
  const display = value.match(/\$\$([\s\S]*?)\$\$/)
  if (display) return display[1].trim()
  const inline = value.match(/\$([^$]+)\$/)
  if (inline) return inline[1].trim()
  return extractEquationFormula(value)
}

function sceneFromText(value, visual, step) {
  const raw = value.trim()
  const narration = cleanNarration(raw)
  if (!narration) return null
  const scene = {
    title: `Krok ${step}`,
    narration,
    caption: shorten(narration),
    visual,
  }
  const formula = extractFormula(raw)
  if (formula) {
    if (isValidFormula(formula)) scene.formula = formula
    else stats.formulasOmitted.push(`new ${scene.title}: ${formula.slice(0, 160)}`)
  }
  return scene
}

function splitBodyBlocks(text) {
  const blocks = []
  const chunks = text.split(/\n\s*\n/)
  for (const chunk of chunks) {
    const value = chunk.trim()
    if (!value) continue
    const lines = value.split('\n')
    if (lines.every((line) => /^\s*\|/.test(line))) {
      blocks.push({ type: 'table', text: value })
      continue
    }
    if (/^<\/?(Formula|Caption)\b/i.test(value)) continue
    blocks.push({ type: 'text', text: value })
  }
  return blocks
}

function findTailStart(lines) {
  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index].trim()
    if (/^#{3,}\s/.test(trimmed)) return index
    const component = trimmed.match(/^<([A-Za-z][A-Za-z0-9]*)/)
    if (!component) continue
    const name = component[1]
    if (name === 'Formula' || name === 'Caption' || name === 'AnimatedSolution') continue
    return index
  }
  return lines.length
}

function buildInlineSolution(lesson, heading, sectionBody, id, usedIds, visual) {
  const blocks = splitBodyBlocks(sectionBody)
  const textBlocks = blocks.filter((block) => block.type === 'text')
  if (textBlocks.length === 0) {
    stats.sectionsSkipped.push(`${lesson.relative}: "${heading}" — brak akapitów`)
    return null
  }

  const scenes = []
  let omitted = 0
  let sceneIndex = 0
  for (const block of textBlocks) {
    const scene = sceneFromText(block.text, visual, sceneIndex + 1)
    if (!scene) continue
    sceneIndex += 1
    if (!scene.formula) omitted += 1
    scenes.push(scene)
  }

  if (scenes.length === 0) {
    stats.sectionsSkipped.push(`${lesson.relative}: "${heading}" — brak scen`)
    return null
  }

  const scenesWithFormula = scenes.filter((scene) => scene.formula)
  if (scenesWithFormula.length === 0) {
    stats.sectionsSkipped.push(`${lesson.relative}: "${heading}" — nie wykryto równania`)
    return null
  }

  const firstParagraph = blocks.find((block) => block.type === 'text')?.text ?? ''
  const lastParagraph = [...blocks].reverse().find((block) => block.type === 'text')?.text ?? ''
  const title = heading.replace(/^#+\s*/, '').trim()

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
  stats.sectionsConverted += 1
  stats.scenesCreated += scenes.length
  stats.newFormulas += scenesWithFormula.length
  if (debug) stats.debugNew.push({ id, heading, scenes: scenes.length, formulas: scenesWithFormula.length })
  if (omitted > 0) stats.sectionsSkipped.push(`${id}: ${omitted} scen bez wykrytej formuły`)
  return { id, blocks }
}

function parseSolutionFile(file) {
  const source = fs.readFileSync(file, 'utf8')
  const body = source
    .replace(/^import[^\n]*\n/gm, '')
    .replace(/export default/, 'const __data =')
    .replace(/satisfies\s+SolutionData\s*$/, '')
  const factory = new Function(`${body}\nreturn __data`)
  return factory()
}

function saveSolutionFile(file, data) {
  if (dryRun) return
  fs.writeFileSync(
    file,
    `import type { SolutionData } from '../../model'\n\nexport default ${JSON.stringify(data, null, 2)} satisfies SolutionData\n`,
  )
}

function improveExistingSolutions() {
  const directories = fs
    .readdirSync(solutionsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('ex-') && !entry.name.startsWith('ex-ideal-'))
    .map((entry) => entry.name)
    .sort()

  for (const directory of directories) {
    const file = path.join(solutionsRoot, directory, 'solution.data.ts')
    if (!fs.existsSync(file)) continue
    let data
    try {
      data = parseSolutionFile(file)
    } catch (error) {
      stats.sectionsSkipped.push(`${directory}: nie można odczytać solution.data.ts (${error.message})`)
      continue
    }
    if (!Array.isArray(data.scenes)) continue
    let changed = false
    for (const scene of data.scenes) {
      if (scene.formula) continue
      const narration = typeof scene.narration === 'string' ? scene.narration : ''
      const caption = typeof scene.caption === 'string' ? scene.caption : ''
      let formula = extractFormula(narration)
      if (!formula && caption) formula = extractFormula(caption)
      if (!formula || !isValidFormula(formula)) {
        stats.existingScenesUnchanged += 1
        continue
      }
      scene.formula = formula
      changed = true
      stats.existingScenesImproved += 1
      if (debug) stats.debugExisting.push({ id: directory, title: scene.title, formula })
    }
    if (changed) {
      stats.existingSolutionsImproved += 1
      saveSolutionFile(file, data)
    }
  }
}

function allocateNextId(lessonId, usedIds) {
  let suffix = 2
  while (suffix < 1000) {
    const candidate = `ex-${lessonId}-${suffix}`
    if (!usedIds.has(candidate) && !fs.existsSync(path.join(solutionsRoot, candidate))) return candidate
    suffix += 1
  }
  throw new Error(`Brak wolnego identyfikatora dla ${lessonId}`)
}

function processLesson(file, usedIds) {
  const relative = path.relative(lessonsRoot, file).split(path.sep).join('/')
  const parts = relative.split('/')
  const moduleId = parts[0]
  const lessonId = parts[1]
  const visual = visualByModule[moduleId] ?? 'diagram'
  let text = fs.readFileSync(file, 'utf8')
  const lines = text.split('\n')

  const headings = []
  lines.forEach((line, index) => {
    if (/^##\s+.*przykład/i.test(line)) headings.push(index)
  })

  const edits = []
  for (const headingIndex of headings) {
    let end = lines.length
    for (let index = headingIndex + 1; index < lines.length; index += 1) {
      if (/^##\s+/.test(lines[index])) {
        end = index
        break
      }
    }
    const bodyLines = lines.slice(headingIndex + 1, end)
    if (bodyLines.some((line) => line.includes('<AnimatedSolution'))) continue

    const tailStart = findTailStart(bodyLines)
    const exampleLines = bodyLines.slice(0, tailStart)
    const tailLines = bodyLines.slice(tailStart)
    if (exampleLines.length === 0) {
      stats.sectionsSkipped.push(`${relative}: "${lines[headingIndex]}" — brak treści przed komponentami`)
      continue
    }

    const id = allocateNextId(lessonId, usedIds)
    const sectionBody = exampleLines.join('\n')
    const created = buildInlineSolution({ relative, lessonId }, lines[headingIndex], sectionBody, id, usedIds, visual)
    if (!created) continue

    const tableBlocks = created.blocks.filter((block) => block.type === 'table').map((block) => block.text)
    const replacementLines = [lines[headingIndex], '', `<AnimatedSolution id="${created.id}" />`, '']
    if (tableBlocks.length > 0) replacementLines.push(...tableBlocks.flatMap((table) => [table, '']))
    if (tailLines.length > 0) replacementLines.push(...tailLines)
    edits.push({ start: headingIndex, end, lines: replacementLines })
  }

  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    lines.splice(edit.start, edit.end - edit.start, ...edit.lines)
  }

  if (!dryRun && edits.length > 0) fs.writeFileSync(file, lines.join('\n'))
}

const usedIds = new Set(
  fs
    .readdirSync(solutionsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name),
)

const lessonFiles = walk(lessonsRoot)
  .filter((file) => file.endsWith('/content.mdx'))
  .sort()

for (const file of lessonFiles) processLesson(file, usedIds)

improveExistingSolutions()

console.log(`Sections converted in this pass: ${stats.sectionsConverted}`)
console.log(`Scenes created: ${stats.scenesCreated}`)
console.log(`New scenes with formula: ${stats.newFormulas}`)
console.log(`Existing solutions improved: ${stats.existingSolutionsImproved}`)
console.log(`Existing scenes improved: ${stats.existingScenesImproved}`)
console.log(`Existing scenes left without formula: ${stats.existingScenesUnchanged}`)
console.log(`Skipped/notes: ${stats.sectionsSkipped.length}`)
for (const item of stats.sectionsSkipped) console.log(`  - ${item}`)
if (stats.formulasOmitted.length > 0) {
  console.log(`Invalid formulas omitted: ${stats.formulasOmitted.length}`)
  for (const item of stats.formulasOmitted.slice(0, 20)) console.log(`  - ${item}`)
  if (stats.formulasOmitted.length > 20) console.log(`  … ${stats.formulasOmitted.length - 20} more`)
}
if (debug) {
  console.log('\nNew solution samples:')
  for (const item of stats.debugNew.slice(0, 20))
    console.log(`  - ${item.id}: ${item.formulas}/${item.scenes} formulas`)
  console.log('\nExisting formula samples:')
  for (const item of stats.debugExisting.slice(0, 80)) console.log(`  - ${item.id} ${item.title}: ${item.formula}`)
}
if (dryRun) console.log('Dry run: no files were written.')
