import type { SolutionData } from '../../model'

export interface TorsionStationInput {
  label: string
  moment: number
  sign: 1 | -1
}

export interface TorsionDiagramsInputs {
  stations: number[]
  applied: TorsionStationInput[]
  balancingIndex: number
  d: number
  segmentLength: number
  shearModulus: number
  ks: number
}

export interface TorsionDiagramsValues {
  balancing: number
  internal: number[]
  j0: number
  w0: number
  stresses: number[]
  twists: number[]
  twistDegrees: number[]
  cumulative: number[]
  totalTwist: number
  totalDegrees: number
  maxStress: number
  maxSegment: number
}

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

export function deriveTorsionDiagrams(inputs: TorsionDiagramsInputs): TorsionDiagramsValues {
  const balancing = -inputs.applied.reduce(
    (sum, entry, index) => (index === inputs.balancingIndex ? sum : sum + entry.sign * entry.moment),
    0,
  )
  const internal: number[] = []
  let running = 0
  for (let segment = 0; segment < inputs.applied.length - 1; segment += 1) {
    running += inputs.applied[segment].sign * inputs.applied[segment].moment
    internal.push(running)
  }
  const d = inputs.d
  const j0 = (Math.PI * d ** 4) / 32
  const w0 = (Math.PI * d ** 3) / 16
  const momentScale = 10 ** 6
  const stresses = internal.map((moment) => (Math.abs(moment) * momentScale) / w0)
  const g = inputs.shearModulus
  const lengthMm = inputs.segmentLength * 1000
  const twists = internal.map((moment) => (moment * momentScale * lengthMm) / (g * j0))
  const cumulative: number[] = [0]
  twists.forEach((twist) => cumulative.push(cumulative[cumulative.length - 1] + twist))
  const totalTwist = cumulative[cumulative.length - 1]
  const toDegrees = (rad: number) => (rad * 180) / Math.PI
  const maxStress = Math.max(...stresses)
  const maxSegment = stresses.indexOf(maxStress)
  return {
    balancing,
    internal,
    j0,
    w0,
    stresses,
    twists,
    twistDegrees: twists.map(toDegrees),
    cumulative,
    totalTwist,
    totalDegrees: toDegrees(totalTwist),
    maxStress,
    maxSegment,
  }
}

export interface TorsionDiagramsTask {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
}

export function createTorsionDiagramsSolution(task: TorsionDiagramsTask): Omit<SolutionData, 'animation' | 'scenes'> {
  return { ...task }
}

export const exampleTorsionDiagramsInputs: TorsionDiagramsInputs = {
  stations: [0, 0.2, 0.4, 0.6, 0.8],
  applied: [
    { label: 'M₁', moment: 2, sign: -1 },
    { label: 'M₀', moment: 11, sign: 1 },
    { label: 'M₂', moment: 3, sign: -1 },
    { label: 'M₃', moment: 2, sign: -1 },
    { label: 'M₄', moment: 4, sign: -1 },
  ],
  balancingIndex: 1,
  d: 40,
  segmentLength: 0.2,
  shearModulus: 80000,
  ks: 200,
}
