import { cross3, solveLinearSystem, type Vec3 } from '../../../lib/statics'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'

export interface ShaftThreeForce {
  label: string
  at: Vec3
  value: Vec3
}

export interface ShaftThreeUnknown {
  label: string
  at: Vec3
  dir: Vec3
  kind: 'force' | 'couple'
  unit?: 'kN' | 'kN·m'
}

export interface ShaftThreeSolveConfig {
  loads: ShaftThreeForce[]
  unknowns: ShaftThreeUnknown[]
  checkPoint: Vec3
}

export interface ShaftThreeSolution {
  values: number[]
  byLabel: Record<string, number>
  residual: Vec3
  momentResidual: Vec3
}

const zero = (): Vec3 => ({ x: 0, y: 0, z: 0 })

const scale = (value: Vec3, factor: number): Vec3 => ({
  x: value.x * factor,
  y: value.y * factor,
  z: value.z * factor,
})

const add = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z })

export function solveShaftThreeTask(config: ShaftThreeSolveConfig): ShaftThreeSolution {
  const rows: number[][] = []
  const rhs: number[] = []
  for (const component of ['x', 'y', 'z'] as const) {
    rows.push(config.unknowns.map((unknown) => (unknown.kind === 'force' ? unknown.dir[component] : 0)))
    rhs.push(-config.loads.reduce((sum, load) => sum + load.value[component], 0))
  }
  for (const component of ['x', 'y', 'z'] as const) {
    rows.push(
      config.unknowns.map((unknown) =>
        unknown.kind === 'force' ? cross3(unknown.at, unknown.dir)[component] : unknown.dir[component],
      ),
    )
    rhs.push(-config.loads.reduce((sum, load) => sum + cross3(load.at, load.value)[component], 0))
  }
  const values = solveLinearSystem(rows, rhs)
  const byLabel: Record<string, number> = {}
  config.unknowns.forEach((unknown, index) => {
    byLabel[unknown.label] = values[index]
  })
  const forces = config.loads.map((load) => ({ ...load }))
  config.unknowns.forEach((unknown, index) => {
    if (unknown.kind === 'force') {
      forces.push({ label: unknown.label, at: unknown.at, value: scale(unknown.dir, values[index]) })
    }
  })
  const coupleMoment = config.unknowns.reduce(
    (sum, unknown, index) => (unknown.kind === 'couple' ? add(sum, scale(unknown.dir, values[index])) : sum),
    zero(),
  )
  const residual = forces.reduce((sum, force) => add(sum, force.value), zero())
  const momentResidual = forces.reduce((sum, force) => {
    const radius = {
      x: force.at.x - config.checkPoint.x,
      y: force.at.y - config.checkPoint.y,
      z: force.at.z - config.checkPoint.z,
    }
    return add(sum, cross3(radius, force.value))
  }, coupleMoment)
  return { values, byLabel, residual, momentResidual }
}

export interface ShaftThreeMeta {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
}

export function createShaftThreeSolution(meta: ShaftThreeMeta): Omit<SolutionData, 'animation' | 'scenes'> {
  const data = meta
  return data
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

export function shaftScene(
  title: string,
  narration: string,
  formula: string,
  caption: string,
  metric: string,
  emphasis?: string,
): SolutionScene {
  return { title, narration, formula, caption, visual: 'diagram', focus: { metric }, emphasis }
}

export const exampleShaftThreeTask: ShaftThreeMeta & { scenes: SolutionScene[] } = {
  id: 'example-shaft-three',
  title: 'Przykład fabryczny: wał z jedną tarczą i siłą równoważącą',
  duration: 9,
  given: ['G = 10 kN', 'R = 0,20 m', 'a = 0,30 m, b = 0,40 m'],
  result: 'P = 5,000 kN',
  scenes: [
    shaftScene('Model', 'Przykładowy wał z jedną tarczą.', String.raw`G=10\ \mathrm{kN}`, 'Meta przykładowa.', 'model'),
    shaftScene('Obciążenia', 'Ciężar G na obwodzie tarczy.', String.raw`P=G/2`, 'Meta przykładowa.', 'loads'),
    shaftScene('Równanie', 'Moment względem osi wału.', String.raw`R\cdot P=G\cdot R/2`, 'Meta przykładowa.', 'moment'),
    shaftScene(
      'Rozwiązanie',
      'Siła równoważąca.',
      String.raw`P=5{,}000\ \mathrm{kN}`,
      'Meta przykładowa.',
      'reactions',
    ),
    shaftScene('Kontrola', 'Reszta momentu jest zerowa.', String.raw`\sum M=0`, 'Meta przykładowa.', 'check'),
  ],
}
