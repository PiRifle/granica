import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'

export function pl(value: number, digits = 3) {
  const normalized = Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value
  return normalized.toLocaleString('pl-PL', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: false,
  })
}

export function plGroup(value: number, digits = 0) {
  const normalized = Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value
  return normalized.toLocaleString('pl-PL', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    useGrouping: true,
  })
}

export interface SectionTask {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
  scenes: SolutionScene[]
}

export function createSectionSolution(task: SectionTask): Omit<SolutionData, 'animation'> {
  return { ...task }
}

// --- Przekrój teowy — środek ciężkości ---

export interface TeeCentroidInputs {
  flangeWidth: number
  flangeThickness: number
  webWidth: number
  webHeight: number
  height: number
}

// --- Przekrój teowy — centralne momenty bezwładności ---

export interface TeeSecondMomentsInputs {
  flangeWidth: number
  flangeThickness: number
  webWidth: number
  webHeight: number
  height: number
}

// --- Przekrój L (kątownik) — centralne momenty bezwładności ---

export interface LSectionSecondMomentsInputs {
  a: number
  verticalHeight: number
  horizontalLength: number
}
