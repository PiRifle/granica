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

const O = v(0, 0, 0)
const Q = v(5, -5, 7.071)
const QX = v(5, 0, 0)
const QXY = v(5, -5, 0)
const QY = v(0, -5, 0)
const AXES = v(8, 7, 10)

const primitives: ThreePrimitive[] = [
  ...axisSystem(O, AXES),
  { kind: 'line', points: [O, QXY, Q], color: THREE_COLORS.muted, dashed: true },
  { kind: 'line', points: [QX, QXY, QY], color: THREE_COLORS.muted, dashed: true },
  { kind: 'arrow', from: O, to: Q, color: THREE_COLORS.vector, radius: 0.09, pulse: true },
  { kind: 'sphere', at: Q, radius: 0.11, color: THREE_COLORS.vector },
  { kind: 'arrow', from: O, to: QX, color: THREE_COLORS.moment, radius: 0.065, visibleAt: 1 },
  { kind: 'arrow', from: QX, to: QXY, color: THREE_COLORS.moment, radius: 0.065, visibleAt: 1 },
  { kind: 'arrow', from: QXY, to: Q, color: THREE_COLORS.reaction, radius: 0.075, visibleAt: 3, pulse: true },
  { kind: 'line', points: [O, QXY, Q], color: THREE_COLORS.reaction, dashed: true, visibleAt: 4 },
]

const labels: ThreeLabel[] = [
  ...axisLabels(O, AXES),
  pointLabel('o', 'O', O, [-14, 16]),
  { id: 'q', text: 'Q = 10 kN', at: Q, offset: [10, -8], color: THREE_COLORS.vector, size: 12 },
  {
    id: 'qx',
    text: 'Qx = 5 kN',
    at: v(2.5, 0, 0),
    offset: [-18, -18],
    anchor: 'end',
    color: THREE_COLORS.moment,
    size: 10,
    visibleAt: 1,
  },
  {
    id: 'qy',
    text: 'Qy = −5 kN',
    at: v(5, -2.5, 0),
    offset: [10, 4],
    color: THREE_COLORS.moment,
    size: 10,
    visibleAt: 1,
  },
  {
    id: 'qz-unknown',
    text: 'Qz = ?',
    at: v(5, -5, 3.5),
    offset: [10, 0],
    color: THREE_COLORS.muted,
    size: 11,
    visibleAt: 2,
    hideAt: 3,
  },
  {
    id: 'qz',
    text: 'Qz = 7,07 kN',
    at: v(5, -5, 3.5),
    offset: [10, 0],
    color: THREE_COLORS.reaction,
    size: 10,
    visibleAt: 3,
  },
  { id: 'theta-z', text: 'θz = 45°', at: Q, offset: [10, 12], color: THREE_COLORS.reaction, size: 10, visibleAt: 3 },
]

const status = [
  'Q = 10 kN, θx = 60°, θy = 120°, Qz > 0',
  'Qx = 10cos60° = 5 kN, Qy = 10cos120° = −5 kN',
  'cos²θz = 1 − 0,25 − 0,25 = 0,5',
  'Qz > 0, więc cosθz = +√0,5 i Qz ≈ 7,07 kN',
  '|Q| = √(25 + 25 + 50) = 10 kN',
  'Σcos²θ = 0,25 + 0,25 + 0,5 = 1',
]
const badges = ['θx = 60°, θy = 120°', 'Qx = 5, Qy = −5', 'cos²θz = 0,5', 'Qz = 7,07 kN', '|Q| = 10 kN', 'Σcos²θ = 1']
const titles = ['dane', 'składowe', 'brakujący kąt', 'składowa z', 'kontrola modułu', 'kontrola kierunku']

export function DirectionCosinesAnimation(props: SolutionAnimationProps) {
  const { index } = props
  return (
    <ThreeSolutionScene
      {...props}
      label="Siła zadana kątami kierunkowymi i jej składowe"
      primitives={primitives}
      labels={labels}
      camera={{ position: [12, -15, 12], target: [2, -1.5, 3], viewSize: 13 }}
    >
      <ThreeBadge
        title={titles[index]}
        value={badges[index]}
        note={index >= 5 ? 'cosθx = 0,5 · cosθy = −0,5' : undefined}
      />
      <ThreeStatus>{status[index]}</ThreeStatus>
    </ThreeSolutionScene>
  )
}
