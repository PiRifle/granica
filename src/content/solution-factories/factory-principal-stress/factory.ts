import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'

export interface PrincipalStressInputs {
  sigmaX: number
  sigmaY: number
  tauXY: number
  kg: number
}

export interface PrincipalStressValues {
  sr: number
  radius: number
  sigma1: number
  sigma2: number
  sigma3: number
  tauMax: number
  sum: number
  ratio: number
  overstressPct: number
}

export function pl(value: number, digits = 3) {
  const normalized = Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value
  return normalized.toLocaleString('pl-PL', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: false,
  })
}

export function derivePrincipalStress(inputs: PrincipalStressInputs): PrincipalStressValues {
  const sr = (inputs.sigmaX + inputs.sigmaY) / 2
  const radius = Math.sqrt(((inputs.sigmaX - inputs.sigmaY) / 2) ** 2 + inputs.tauXY ** 2)
  const sigma1 = sr + radius
  const sigma2 = sr - radius
  const sigma3 = 0
  const tauMax = (sigma1 - sigma3) / 2
  const sum = sigma1 + sigma2 + sigma3
  const ratio = sigma1 / inputs.kg
  const overstressPct = (ratio - 1) * 100
  return { sr, radius, sigma1, sigma2, sigma3, tauMax, sum, ratio, overstressPct }
}

export interface PrincipalStressTask {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
}

export function createPrincipalStressSolution(task: PrincipalStressTask): Omit<SolutionData, 'animation' | 'scenes'> {
  return { ...task }
}

export function principalStressScene(
  title: string,
  narration: string,
  formula: string,
  caption: string,
  visual: 'cube' | 'diagram',
  metric: string,
  emphasis?: string,
): SolutionScene {
  return { title, narration, formula, caption, visual, focus: { metric }, emphasis }
}

export const examplePrincipalStressInputs: PrincipalStressInputs = {
  sigmaX: 130,
  sigmaY: 150,
  tauXY: 70,
  kg: 200,
}
