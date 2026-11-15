import type { SolutionData } from '../../model'

export interface BendingTorsionInputs {
  p: number
  a: number
  b: number
  kg: number
  d: number
  /** Łańcuch wyświetlany pod znakiem pierwiastka w scenie doboru (zaokrąglenie źródłowe). */
  underRadical: string
  /** Opcjonalne, wierne źródłu zaokrąglenia wyników kontroli HMH. */
  sigmaHmhText?: string
  marginText?: string
}

export interface BendingTorsionValues {
  mg: number
  ms: number
  meq: number
  meqNmm: number
  dMin: number
  sigma: number
  tau: number
  sigmaHmh: number
  marginPct: number
  hmhRatio: number
  sigmaHmhText: string
  marginText: string
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

export function deriveBendingTorsion(inputs: BendingTorsionInputs): BendingTorsionValues {
  const mg = inputs.p * inputs.b
  const ms = inputs.p * inputs.a
  const meq = Math.sqrt(mg ** 2 + 0.75 * ms ** 2)
  const meqNmm = meq * 10 ** 6
  const dMin = Math.cbrt((32 * meqNmm) / (Math.PI * inputs.kg))
  const moment = 10 ** 6
  const sigma = (32 * mg * moment) / (Math.PI * inputs.d ** 3)
  const tau = (16 * ms * moment) / (Math.PI * inputs.d ** 3)
  const sigmaHmh = Math.sqrt(sigma ** 2 + 3 * tau ** 2)
  const marginPct = ((inputs.kg - sigmaHmh) / inputs.kg) * 100
  return {
    mg,
    ms,
    meq,
    meqNmm,
    dMin,
    sigma,
    tau,
    sigmaHmh,
    marginPct,
    hmhRatio: sigmaHmh / inputs.kg,
    sigmaHmhText: inputs.sigmaHmhText ?? pl(sigmaHmh, 2),
    marginText: inputs.marginText ?? pl(marginPct, 1),
  }
}

export interface BendingTorsionTask {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
}

export function createBendingTorsionSolution(task: BendingTorsionTask): Omit<SolutionData, 'animation' | 'scenes'> {
  return { ...task }
}

export const exampleBendingTorsionInputs: BendingTorsionInputs = {
  p: 2,
  a: 0.25,
  b: 0.5,
  kg: 200,
  d: 40,
  underRadical: '55 481',
  sigmaHmhText: '173,44',
  marginText: '13,3',
}
