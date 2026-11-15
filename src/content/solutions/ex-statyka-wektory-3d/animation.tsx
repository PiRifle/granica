import {
  ThreeSolutionScene,
  type ThreeLabel,
  type ThreePrimitive,
} from '../../../components/solution-figures/ThreeSolutionScene'
import type { SolutionAnimationProps } from '../../../types'
import {
  THREE_COLORS,
  ThreeBadge,
  ThreeStatus,
  axisLabels,
  axisSystem,
  pointLabel,
  v,
} from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const B = v(3, 4, 12)
const CX = v(3, 0, 0)
const CXY = v(3, 4, 0)
const UNIT_END = v((3 / 13) * 6, (4 / 13) * 6, (12 / 13) * 6)
const AXIS_LENGTHS = v(5.2, 5.2, 13)

const primitives: ThreePrimitive[] = [
  ...axisSystem(A, AXIS_LENGTHS),
  { kind: 'rod', from: A, to: B, color: THREE_COLORS.muted, dashed: true },
  { kind: 'sphere', at: A, color: THREE_COLORS.ink, radius: 0.1 },
  { kind: 'sphere', at: B, color: THREE_COLORS.ink, radius: 0.1 },
  { kind: 'arrow', from: A, to: B, color: THREE_COLORS.vector, radius: 0.075, visibleAt: 1, pulse: true },
  { kind: 'line', points: [A, CX, CXY, B], color: THREE_COLORS.muted, dashed: true, visibleAt: 1 },
  { kind: 'arrow', from: A, to: B, color: THREE_COLORS.ok, radius: 0.12, opacity: 0.22, visibleAt: 2, hideAt: 4 },
  { kind: 'arrow', from: A, to: UNIT_END, color: THREE_COLORS.reaction, radius: 0.065, visibleAt: 3, hideAt: 4 },
  { kind: 'arrow', from: A, to: CX, color: THREE_COLORS.load, radius: 0.055, visibleAt: 4 },
  { kind: 'arrow', from: CX, to: CXY, color: THREE_COLORS.load, radius: 0.055, visibleAt: 4 },
  { kind: 'arrow', from: CXY, to: B, color: THREE_COLORS.load, radius: 0.055, visibleAt: 4 },
  { kind: 'arrow', from: A, to: B, color: THREE_COLORS.load, radius: 0.085, visibleAt: 4, pulse: true },
]

const labels: ThreeLabel[] = [
  ...axisLabels(A, AXIS_LENGTHS),
  pointLabel('a', 'A', A, [-13, 16]),
  pointLabel('b', 'B', B, [-12, -8]),
  { id: 'coords', text: '(3, 4, 12) m', at: B, offset: [10, 14], size: 10, color: THREE_COLORS.muted },
  {
    id: 'r',
    text: 'r_AB',
    at: v(1.5, 2, 6),
    offset: [9, 0],
    size: 12,
    color: THREE_COLORS.vector,
    visibleAt: 1,
    hideAt: 3,
  },
  {
    id: 'dx',
    text: 'Δx = 3 m',
    at: v(1.5, 0, 0),
    offset: [0, 15],
    size: 10,
    anchor: 'middle',
    visibleAt: 1,
    hideAt: 4,
  },
  { id: 'dy', text: 'Δy = 4 m', at: v(3, 2, 0), offset: [8, 4], size: 10, visibleAt: 1, hideAt: 4 },
  { id: 'dz', text: 'Δz = 12 m', at: v(3, 4, 6), offset: [8, 4], size: 10, visibleAt: 1, hideAt: 4 },
  {
    id: 'u',
    text: 'u = (3/13, 4/13, 12/13)',
    at: UNIT_END,
    offset: [8, 4],
    size: 10,
    color: THREE_COLORS.reaction,
    visibleAt: 3,
    hideAt: 4,
  },
  {
    id: 'fx',
    text: 'Fx = 3 kN',
    at: v(1.5, 0, 0),
    offset: [0, -8],
    size: 10,
    anchor: 'middle',
    color: THREE_COLORS.load,
    visibleAt: 4,
    hideAt: 5,
  },
  {
    id: 'fy',
    text: 'Fy = 4 kN',
    at: v(3, 2, 0),
    offset: [8, -4],
    size: 10,
    color: THREE_COLORS.load,
    visibleAt: 4,
    hideAt: 5,
  },
  {
    id: 'fz',
    text: 'Fz = 12 kN',
    at: v(3, 4, 6),
    offset: [8, 4],
    size: 10,
    color: THREE_COLORS.load,
    visibleAt: 4,
    hideAt: 5,
  },
  { id: 'f', text: 'F = 13 kN', at: B, offset: [10, -9], size: 12, color: THREE_COLORS.load, visibleAt: 4 },
]

const status = [
  'Cięgno wyznacza kierunek w trzech wymiarach',
  'r_AB = (3, 4, 12) m — różnice współrzędnych',
  'λ = 13 m — długość prostej działania',
  'u = r_AB / λ — wektor jednostkowy',
  'F = 13u = (3, 4, 12) kN',
  'Σcos²θ = 1 — kontrola kątów',
]

export function Vector3DAnimation(props: SolutionAnimationProps) {
  const { index } = props
  return (
    <ThreeSolutionScene
      {...props}
      label="Siła przestrzenna wzdłuż cięgna i jej składowe"
      primitives={primitives}
      labels={labels}
      camera={{ position: [18, -21, 17], target: [1.5, 2, 5], viewSize: 16 }}
    >
      {index === 2 && <ThreeBadge value="λ = 13 m" x={306} y={248} width={126} />}
      {index === 5 && <ThreeBadge title="kąty kierunkowe" value="Σcos²θ = 1" note="θx 76,7° · θy 72,1° · θz 22,6°" />}
      <ThreeStatus>{status[index]}</ThreeStatus>
    </ThreeSolutionScene>
  )
}
