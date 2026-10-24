import styles from '../SolutionFigure.module.css'

export const local = (...values: Array<string | false | null | undefined>) =>
  values
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => styles[name] ?? name)
    .join(' ')

const numberFormat = new Intl.NumberFormat('pl-PL', { maximumSignificantDigits: 6 })
export const formatNumber = (value?: number) =>
  value == null || Number.isNaN(value) ? '—' : numberFormat.format(value)

export function parseFigureNumber(value: string): number | undefined {
  const match = value
    .replace(/\s/g, '')
    .replace(',', '.')
    .match(/-?\d+(?:\.\d+)?/)
  return match ? Number(match[0]) : undefined
}

export function mathNumbers(value: string): number[] {
  const normalized = value
    .replace(/\{,\}/g, ',')
    .replace(/\\[,;! ]/g, ' ')
    .replace(/\\mathrm\{([^}]*)\}/g, '$1')
    .replace(/[^\d,.\-]/g, ' ')
  const matches = normalized.match(/-?\d+(?:[.,]\d+)?/g) ?? []
  return matches.map((match) => Number(match.replace(',', '.'))).filter((number) => Number.isFinite(number))
}

export function valueRevealed(
  item: { value: string; reveal?: number },
  sceneIndex: number,
  revealedMath: string,
): boolean {
  if (item.reveal != null) return item.reveal <= sceneIndex
  if (!revealedMath) return true
  const valueNumbers = mathNumbers(item.value)
  if (valueNumbers.length === 0) return true
  const mathValues = mathNumbers(revealedMath)
  return valueNumbers.some((valueNumber) => mathValues.some((mathValue) => Math.abs(valueNumber - mathValue) < 1e-9))
}

export const SEGMENT_COLORS = ['#4f6df5', '#ff8a5c', '#5bb98c', '#a970dd', '#d8a13b']
