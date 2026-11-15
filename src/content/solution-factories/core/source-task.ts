import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'

export interface SourceTaskDefinition extends Omit<SolutionData, 'animation'> {
  visuals: string[][]
}

export function defineSourceSolution({
  visuals: _visuals,
  ...data
}: SourceTaskDefinition) {
  return data satisfies SolutionData
}

export function sourceScene(
  title: string,
  narration: string,
  formula: string,
  caption: string,
  metric: string,
  emphasis?: string,
): SolutionScene {
  return { title, narration, formula, caption, visual: 'diagram', focus: { metric }, emphasis }
}

export function pl(value: number, digits = 3) {
  const normalized = Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value
  return normalized.toLocaleString('pl-PL', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: false,
  })
}

export function tex(value: number, digits = 3) {
  return pl(value, digits).replace(',', '{,}')
}

export function signed(value: number, digits = 3) {
  return `${value >= 0 ? '+' : '−'}${pl(Math.abs(value), digits)}`
}
