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

export interface AxialTask {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
  scenes: SolutionScene[]
}

export function createAxialSolution(task: AxialTask): Omit<SolutionData, 'animation'> {
  return { ...task }
}

// --- Rura rozciągana — dobór średnicy zewnętrznej ---

export interface HollowTubeInputs {
  d: number
  p: number
  sigmaDop: number
}

export interface HollowTubeValues {
  force: number
  areaRequired: number
  dRequired: number
  dAdopted: number
  area: number
  sigma: number
  wall: number
}

export function deriveHollowTube(inputs: HollowTubeInputs): HollowTubeValues {
  const force = inputs.p * 1000
  const areaRequired = force / inputs.sigmaDop
  const dRequired = Math.sqrt((4 * areaRequired) / Math.PI + inputs.d * inputs.d)
  const dAdopted = Math.ceil(dRequired)
  const area = (Math.PI * (dAdopted * dAdopted - inputs.d * inputs.d)) / 4
  const sigma = force / area
  const wall = (dAdopted - inputs.d) / 2
  return { force, areaRequired, dRequired, dAdopted, area, sigma, wall }
}

// --- Pręt wielomateriałowy stal–aluminium–brąz — siły osiowe i naprężenia ---

export interface SteppedSegment {
  id: string
  label: string
  length: number
  color: string
  tagged: string
  n: number
}

export interface SteppedBarInputs {
  p: number
  area: number
  segments: SteppedSegment[]
  leftLoadLabel: string
  midLoadLabel: string
  reactionLabel: string
}

export interface SteppedBarValues {
  stresses: number[]
  maxStress: number
  maxN: number
  reactionN: number
}

export function deriveSteppedBar(inputs: SteppedBarInputs): SteppedBarValues {
  const stresses = inputs.segments.map((segment) => segment.n / inputs.area)
  return {
    stresses,
    maxStress: Math.max(...stresses),
    maxN: Math.max(...inputs.segments.map((segment) => segment.n)),
    reactionN: inputs.segments[inputs.segments.length - 1].n,
  }
}

// --- Pręt wielomateriałowy — maksymalna dopuszczalna siła P ---

export interface MaxLoadSegment {
  id: string
  label: string
  length: number
  area: number
  color: string
  nLabel: string
  magnitude: number
  sigmaDop: number
  limit: number
  ratioDigits: number
}

export interface SteppedMaxLoadInputs {
  segments: MaxLoadSegment[]
  loadLabels: [string, string, string]
  reactionLabel: string
  reactionLine: string
  directionsNote: string
}

export interface SteppedMaxLoadValues {
  limits: number[]
  pMax: number
  governingIndex: number
}

export function deriveSteppedMaxLoad(inputs: SteppedMaxLoadInputs): SteppedMaxLoadValues {
  const limits = inputs.segments.map((segment) => segment.limit)
  const pMax = Math.min(...limits)
  return { limits, pMax, governingIndex: limits.indexOf(pMax) }
}

// --- Pręt aluminiowy — całkowita zmiana długości ---

export interface AxialElongationSegment {
  length: number
  forces: number
}

export interface AxialElongationInputs {
  area: number
  e: number
  segments: AxialElongationSegment[]
}

// --- Golden Gate — zmiana długości od temperatury ---

export interface GoldenGateThermalInputs {
  length: number
  deltaT: number
  alpha: number
}

// --- Pręt między sztywnymi przegrodami — naprężenia termiczne ---

export interface RestrainedThermalInputs {
  e: number
  alpha: number
  deltaT: number
  a: number
}

// --- Pręt ABC z masą — naprężenie w linie ---

export interface RopeBarStressInputs {
  mass: number
  aRope: number
  aBar: number
  lRope: number
  lBar: number
  eRope: number
  eBar: number
}

// --- Dwa pręty aluminiowe — siła Q dla zerowego przemieszczenia ---

export interface SteppedAluminumInputs {
  a1: number
  l1: number
  a2: number
  l2: number
  p: number
  q: number
  e: number
}

// --- Pręt na dwóch linach — przekroje i wydłużenia ---

export interface TwoRopeBarDesignInputs {
  mass: number
  lRope: number
  lBar: number
  kRope: number
  kBar: number
  eRope: number
  eBar: number
}

// --- Pręt rozciągany — maksymalne ścinanie i naprężenia główne ---

export interface AxialStressStateInputs {
  area: number
  p: number
}
