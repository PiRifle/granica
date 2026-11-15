import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import {
  planarResiduals,
  solvePlanarSystem,
  type PlanarForce,
  type PlanarUnknown,
  type Vec2,
} from '../../../lib/statics'
import { pl } from '../core/source-task'

export interface ReakcjeRamaTask {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
  scenes: SolutionScene[]
}

export interface ReakcjeRamaConfig {
  nr: number
  p1: number
  p2?: number
  moment: number
  q: number
  geometry: string
  givenGeometry: string
  loads: PlanarForce[]
  couples: number[]
  unknowns: PlanarUnknown[]
  labels: string[]
  loadTex: string
  resultantTex: string
  momentTex: string
  extraEquations?: Parameters<typeof solvePlanarSystem>[3]
}

export const point = (x: number, y: number): Vec2 => ({ x, y })
export const force = (x: number, y: number, at: Vec2): PlanarForce => ({ value: point(x, y), at })
export const pin = (at: Vec2): PlanarUnknown[] => [
  { kind: 'force', at, direction: point(1, 0) },
  { kind: 'force', at, direction: point(0, 1) },
]
export const vertical = (at: Vec2): PlanarUnknown => ({ kind: 'force', at, direction: point(0, 1) })

export function solveReakcjeRama(config: ReakcjeRamaConfig) {
  const equations: NonNullable<ReakcjeRamaConfig['extraEquations']> = [
    { type: 'Fx' },
    { type: 'Fy' },
    { type: 'M', at: point(0, 0) },
    ...(config.extraEquations ?? []),
  ]
  const values = solvePlanarSystem(config.loads, config.couples, config.unknowns, equations)
  const residual = planarResiduals(config.loads, config.couples, config.unknowns, values, point(1, 1))
  return { values, residual }
}

export function createReakcjeRamaTask(config: ReakcjeRamaConfig) {
  const { values, residual } = solveReakcjeRama(config)
  const valueText = values.map(
    (value, index) => `${config.labels[index]} = ${pl(value)} ${config.labels[index].startsWith('M') ? 'kN·m' : 'kN'}`,
  )
  return {
    config,
    values,
    residual,
    task: {
      id: '',
      title: `Zestaw A, schemat ${config.nr}: reakcje belki lub ramy`,
      duration: 9,
      given: [
        `P₁ = ${config.p1} kN${config.p2 === undefined ? '' : `; P₂ = ${config.p2} kN`}`,
        `M = ${config.moment} kN·m; q = ${config.q} kN/m`,
        config.givenGeometry,
        'Przyjęto x w prawo, y w górę i dodatni moment przeciwny do wskazówek zegara',
      ],
      result: valueText.join('; '),
    } satisfies Omit<ReakcjeRamaTask, 'scenes'>,
  }
}

export function createReakcjeRamaSolution(task: ReakcjeRamaTask): Omit<SolutionData, 'animation'> {
  const { id, title, duration, given, result, scenes } = task
  return { id, title, duration, given, result, scenes }
}

export const canonicalConfig: ReakcjeRamaConfig = {
  nr: 1,
  p1: 5,
  moment: 24,
  q: 0.8,
  geometry:
    'A = (0;0), B = (6;0) m. Obciążenie q działa poziomo na wysokości 3,5 m, a P₁ jest prostopadła do pochyłego pasa i skierowana w dół–w lewo. Moment przy C jest zgodny ze wskazówkami zegara.',
  givenGeometry: 'wysokość 3,5 m i 2 m; wymiary poziome 4 + 1 + 1 m; P₁ ⊥ pas',
  loads: [force(2.8, 0, point(0, 1.75)), force(-1.37113, -4.57036, point(5, 2.25))],
  couples: [-24],
  unknowns: [...pin(point(0, 0)), vertical(point(6, 0))],
  labels: ['A_x', 'A_y', 'B_y'],
  loadTex:
    'Q=q\\cdot3{,}5=2{,}8\\ \\mathrm{kN},\\quad P_{1x}=-5\\frac{1{,}5}{\\sqrt{5^2+1{,}5^2}}=-1{,}371\\ \\mathrm{kN},\\quad P_{1y}=-5\\frac{5}{\\sqrt{5^2+1{,}5^2}}=-4{,}570\\ \\mathrm{kN}',
  resultantTex:
    'Q=2{,}8\\ \\mathrm{kN}\\ \\text{w }(0;1{,}75),\\qquad P_1=(-1{,}371;-4{,}570)\\ \\mathrm{kN}\\ \\text{w }(5;2{,}25)',
  momentTex: '\\sum M_A=6B_y-2{,}8\\cdot1{,}75+5(-4{,}57036)-2{,}25(-1{,}37113)-24=0',
}
