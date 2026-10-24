function splitTopLevel(value: string, separator: (value: string, index: number) => number): string[] {
  const parts: string[] = []
  let current = ''
  let depth = 0
  let brackets = 0
  let environment = 0
  for (let index = 0; index < value.length;) {
    if (value.startsWith('\\begin', index)) environment += 1
    if (value.startsWith('\\end', index)) environment = Math.max(0, environment - 1)
    if (depth === 0 && brackets === 0 && environment === 0) {
      const length = separator(value, index)
      if (length > 0) {
        parts.push(current)
        current = ''
        index += length
        continue
      }
    }
    const character = value[index]
    if (character === '{') depth += 1
    else if (character === '}') depth = Math.max(0, depth - 1)
    else if (character === '[' || character === '(') brackets += 1
    else if (character === ']' || character === ')') brackets = Math.max(0, brackets - 1)
    current += character
    index += 1
  }
  parts.push(current)
  return parts.map((part) => part.trim()).filter(Boolean)
}

function topLevelPlus(value: string): number[] {
  const positions: number[] = []
  let braces = 0
  let brackets = 0
  let environment = 0
  for (let index = 0; index < value.length; index += 1) {
    if (value.startsWith('\\begin', index)) environment += 1
    if (value.startsWith('\\end', index)) environment = Math.max(0, environment - 1)
    if (braces === 0 && brackets === 0 && environment === 0 && value[index] === '+') {
      let previous = index - 1
      while (previous >= 0 && /\s/.test(value[previous])) previous -= 1
      if (previous >= 0 && !/[=(+\-*/^_,<>]/.test(value[previous])) positions.push(index)
    }
    if (value[index] === '{') braces += 1
    else if (value[index] === '}') braces = Math.max(0, braces - 1)
    else if (value[index] === '[') brackets += 1
    else if (value[index] === ']') brackets = Math.max(0, brackets - 1)
    else if (value[index] === '(') brackets += 1
    else if (value[index] === ')') brackets = Math.max(0, brackets - 1)
  }
  return positions
}

function topLevelEquals(value: string): number[] {
  const positions: number[] = []
  let depth = 0
  let environment = 0
  for (let index = 0; index < value.length; index += 1) {
    if (value.startsWith('\\begin', index)) environment += 1
    if (value.startsWith('\\end', index)) environment = Math.max(0, environment - 1)
    if (depth === 0 && environment === 0 && value[index] === '=') {
      const previous = value[index - 1]
      if (previous !== '<' && previous !== '>' && previous !== '!') positions.push(index)
    }
    if (value[index] === '{') depth += 1
    else if (value[index] === '}') depth = Math.max(0, depth - 1)
  }
  return positions
}

function expandChunk(chunk: string): string[] {
  if (chunk.includes('\\begin')) return [chunk]
  const steps: string[] = []
  const implications = splitTopLevel(chunk, (value, index) => {
    if (value.startsWith('\\Rightarrow', index)) return '\\Rightarrow'.length
    if (value.startsWith('\\to', index)) return '\\to'.length
    return 0
  })
  for (const implication of implications) {
    const assignments = splitTopLevel(implication, (value, index) => {
      if (value[index] === ';' && value[index - 1] !== '\\') return 1
      if (value[index] === ',' && value[index - 1] !== '\\') {
        const next = value.slice(index + 1).trimStart()
        if (!/^\d/.test(next)) return 1
      }
      return 0
    })
    for (const assignment of assignments) {
      const equals = topLevelEquals(assignment)
      if (equals.length < 2) {
        const pluses = equals.length === 1 ? topLevelPlus(assignment) : []
        if (pluses.length > 0) {
          for (const position of pluses) steps.push(assignment.slice(0, position).trim())
          steps.push(assignment.trim())
        } else {
          steps.push(assignment)
        }
        continue
      }
      for (let positionIndex = 1; positionIndex < equals.length; positionIndex += 1) {
        steps.push(assignment.slice(0, equals[positionIndex]).trim())
      }
      steps.push(assignment.trim())
    }
  }
  return steps.filter(Boolean)
}

export function splitFormula(formula: string): string[] {
  const chunks: string[] = []
  let current = ''
  let depth = 0
  let environment = 0
  for (let index = 0; index < formula.length;) {
    if (formula.startsWith('\\begin', index)) environment += 1
    if (formula.startsWith('\\end', index)) environment = Math.max(0, environment - 1)
    if (depth === 0 && environment === 0 && formula.startsWith('\\\\', index)) {
      chunks.push(current)
      current = ''
      index += 2
      continue
    }
    if (depth === 0 && environment === 0 && formula.startsWith('\\qquad', index)) {
      chunks.push(current)
      current = ''
      index += 6
      continue
    }
    if (depth === 0 && environment === 0 && formula.startsWith('\\quad', index)) {
      chunks.push(current)
      current = ''
      index += 5
      continue
    }
    const character = formula[index]
    if (character === '{') depth += 1
    else if (character === '}') depth = Math.max(0, depth - 1)
    current += character
    index += 1
  }
  chunks.push(current)
  const merged: string[] = []
  for (const chunk of chunks.map((item) => item.trim()).filter(Boolean)) {
    if (merged.length > 0 && !/=|\\Rightarrow|\\to/.test(chunk)) {
      merged[merged.length - 1] = `${merged[merged.length - 1]}\\quad ${chunk}`
    } else {
      merged.push(chunk)
    }
  }
  return merged.flatMap(expandChunk)
}

export interface MathToken {
  id: string
  math: string
}

function readGroup(value: string, start: number): { end: number } | null {
  let index = start
  while (index < value.length && /\s/.test(value[index])) index += 1
  if (index >= value.length) return null
  const open = value[index]
  if (open !== '{' && open !== '[') return null
  const close = open === '{' ? '}' : ']'
  let depth = 0
  for (let cursor = index; cursor < value.length; cursor += 1) {
    if (value[cursor] === open) depth += 1
    else if (value[cursor] === close) {
      depth -= 1
      if (depth === 0) return { end: cursor + 1 }
    }
  }
  return null
}

const ARGUMENT_COMMANDS = new Set([
  'frac',
  'dfrac',
  'tfrac',
  'sqrt',
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
  'boldsymbol',
  'operatorname',
  'boxed',
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
  'overbrace',
  'underbrace',
  'overset',
  'underset',
  'stackrel',
])

const TWO_ARGUMENT_COMMANDS = new Set(['frac', 'dfrac', 'tfrac', 'overset', 'underset', 'stackrel'])
const SKIP_COMMANDS = new Set([
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
])

function readArgument(value: string, start: number): { end: number } | null {
  const group = readGroup(value, start)
  if (group) return group
  let index = start
  while (index < value.length && /\s/.test(value[index])) index += 1
  if (index >= value.length) return null
  if (value[index] === '\\') {
    let end = index + 1
    while (end < value.length && /[a-zA-Z]/.test(value[end])) end += 1
    const command = value.slice(index + 1, end)
    if (ARGUMENT_COMMANDS.has(command)) {
      const argumentCount = TWO_ARGUMENT_COMMANDS.has(command) ? 2 : 1
      for (let argumentIndex = 0; argumentIndex < argumentCount; argumentIndex += 1) {
        const argument = readArgument(value, end)
        if (!argument) break
        end = argument.end
      }
    }
    return { end }
  }
  return { end: index + 1 }
}

export function tokenizeFormula(value: string): MathToken[] {
  if (value.includes('\\begin')) return [{ id: 'environment#0', math: value }]
  const tokens: string[] = []
  let index = 0
  while (index < value.length) {
    const character = value[index]
    if (/\s/.test(character)) {
      index += 1
      continue
    }
    if (character === '\\') {
      const next = value[index + 1]
      if (!next) break
      if (!/[a-zA-Z]/.test(next)) {
        if (next === ',' || next === ';' || next === ':' || next === '!' || next === ' ' || next === '\\') {
          index += 2
          continue
        }
        tokens.push(`\\${next}`)
        index += 2
        continue
      }
      let end = index + 1
      while (end < value.length && /[a-zA-Z]/.test(value[end])) end += 1
      const command = value.slice(index + 1, end)
      if (SKIP_COMMANDS.has(command)) {
        index = end
        continue
      }
      let math = value.slice(index, end)
      if (command === 'sqrt') {
        const optional = readGroup(value, end)
        if (optional) {
          math = value.slice(index, optional.end)
          end = optional.end
        }
        const argument = readArgument(value, end)
        if (argument) {
          math = value.slice(index, argument.end)
          end = argument.end
        }
      } else if (ARGUMENT_COMMANDS.has(command)) {
        const argumentCount = TWO_ARGUMENT_COMMANDS.has(command) ? 2 : 1
        for (let argumentIndex = 0; argumentIndex < argumentCount; argumentIndex += 1) {
          const argument = readArgument(value, end)
          if (!argument) break
          math = value.slice(index, argument.end)
          end = argument.end
        }
      }
      tokens.push(math)
      index = end
      continue
    }
    if (character === '^' || character === '_') {
      const argument = readArgument(value, index + 1)
      const math = argument ? value.slice(index, argument.end) : value.slice(index, index + 2)
      if (tokens.length > 0) tokens[tokens.length - 1] += math
      else tokens.push(`{}${math}`)
      index = argument ? argument.end : index + 2
      continue
    }
    if (character === '{') {
      const group = readGroup(value, index)
      if (group) {
        tokens.push(value.slice(index, group.end))
        index = group.end
        continue
      }
    }
    if (/[0-9]/.test(character)) {
      let end = index + 1
      while (end < value.length) {
        if (/[0-9]/.test(value[end])) {
          end += 1
          continue
        }
        if (value.startsWith('{,}', end)) {
          end += 3
          continue
        }
        if (value.startsWith('\\,', end) && /[0-9]/.test(value[end + 2] ?? '')) {
          end += 2
          continue
        }
        break
      }
      tokens.push(value.slice(index, end))
      index = end
      continue
    }
    if (/[a-zA-Z]/.test(character)) {
      let end = index + 1
      while (end < value.length && /[a-zA-Z]/.test(value[end])) end += 1
      tokens.push(value.slice(index, end))
      index = end
      continue
    }
    tokens.push(character)
    index += 1
  }
  const occurrences = new Map<string, number>()
  return tokens.map((math) => {
    const occurrence = occurrences.get(math) ?? 0
    occurrences.set(math, occurrence + 1)
    return { id: `${math}#${occurrence}`, math }
  })
}
