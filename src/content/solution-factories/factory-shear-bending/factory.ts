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

export interface ShearBendingTask {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
  scenes: SolutionScene[]
}

export function createShearBendingSolution(task: ShearBendingTask): Omit<SolutionData, 'animation'> {
  return { ...task }
}

// --- Połączenie sworzniowe — dobór średnicy i wysokości ---

export interface PinDesignInputs {
  p: number
  kShear: number
  kBearing: number
}

// --- Pręt aluminiowy — maksymalny dopuszczalny moment zginający ---

export interface AluminumBeamMomentInputs {
  width: number
  height: number
  wall: number
  re: number
  safety: number
}

// --- Belka z przewieszeniem — wykresy T/M i dobór średnicy ---

export interface BeamDiameterDesignInputs {
  kg: number
}

// --- Wspornik z siłą P pod kątem α — wykresy N, T, M ---

export interface InclinedLoadDiagramsInputs {
  p: number
  alphaDeg: number
  length: number
}

// --- Belka wspornikowa z obciążeniem q i momentem M — dobór W_y ---

export interface CantileverDesignInputs {
  q: number
  l1: number
  moment: number
  l2: number
  kg: number
}
