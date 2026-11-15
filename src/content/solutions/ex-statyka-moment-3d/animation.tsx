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
  move,
  pointLabel,
  scale,
  v,
} from '../../../components/solution-figures/three-statics'

const O = v(0, 0, 0)
const P = v(2, 1, 2)
const F = v(3, -6, 2)
const M = v(14, 2, -15)
const Q = v(1, 2, 2)
const EL = v(1 / 3, 2 / 3, 2 / 3)
const F_END = move(P, F, 0.2)
const M_END = scale(M, 0.1)
const PROJECTION = scale(EL, -1.4)

const primitives: ThreePrimitive[] = [
  ...axisSystem(O, [4, 3, 3]),
  { kind: 'sphere', at: O, radius: 0.07, color: THREE_COLORS.ink },
  { kind: 'sphere', at: P, radius: 0.07, color: THREE_COLORS.ink },
  { kind: 'arrow', from: O, to: P, color: THREE_COLORS.vector, radius: 0.05 },
  { kind: 'arrow', from: P, to: F_END, color: THREE_COLORS.load, radius: 0.06, pulse: true },
  { kind: 'plate', points: [O, P, F_END, scale(F, 0.2)], color: THREE_COLORS.moment, opacity: 0.12, visibleAt: 1 },
  { kind: 'arrow', from: O, to: M_END, color: THREE_COLORS.moment, radius: 0.07, visibleAt: 2, pulse: true },
  { kind: 'rod', from: scale(Q, -0.4), to: scale(Q, 1.4), dashed: true, color: THREE_COLORS.reaction, visibleAt: 3 },
  { kind: 'sphere', at: Q, radius: 0.075, color: THREE_COLORS.reaction, visibleAt: 3 },
  { kind: 'line', points: [M_END, PROJECTION], color: THREE_COLORS.muted, dashed: true, visibleAt: 4 },
  { kind: 'arrow', from: O, to: PROJECTION, color: THREE_COLORS.reaction, radius: 0.075, visibleAt: 4 },
]

const labels: ThreeLabel[] = [
  ...axisLabels(O, [4, 3, 3]),
  pointLabel('o', 'O', O, [-13, 15]),
  pointLabel('p', 'P', P, [8, -8]),
  { id: 'r', text: 'r', at: scale(P, 0.5), offset: [-12, -8], size: 11, color: THREE_COLORS.vector },
  { id: 'f', text: 'F', at: F_END, offset: [8, 4], size: 11, color: THREE_COLORS.load },
  {
    id: 'm',
    text: 'M_O = (14; 2; −15)',
    at: M_END,
    offset: [-10, -10],
    anchor: 'end',
    size: 10,
    color: THREE_COLORS.moment,
    visibleAt: 2,
  },
  { id: 'q', text: 'Q', at: Q, offset: [8, -8], size: 10, color: THREE_COLORS.reaction, visibleAt: 3 },
  {
    id: 'axis',
    text: 'l · e_l = (1/3; 2/3; 2/3)',
    at: scale(Q, 1.4),
    offset: [8, 4],
    size: 9,
    color: THREE_COLORS.reaction,
    visibleAt: 3,
  },
  {
    id: 'ml',
    text: 'M_l = −4 kN·m',
    at: PROJECTION,
    offset: [-10, 18],
    anchor: 'end',
    size: 10,
    color: THREE_COLORS.reaction,
    visibleAt: 4,
    hideAt: 5,
  },
]

const status = [
  'Siła F w punkcie P, biegun w O',
  'r × F: płaszczyzna i składowe momentu',
  'M_O = (14, 2, −15) kN·m, |M_O| ≈ 20,6 kN·m',
  'Oś l przez O i Q; e_l = (1/3, 2/3, 2/3)',
  'M_l = M_O · e_l = −4 kN·m',
  'Rzut ujemny — zwrot przeciwny do e_l',
]

export function Moment3DAnimation(props: SolutionAnimationProps) {
  const { index } = props
  return (
    <ThreeSolutionScene
      {...props}
      label="Moment siły względem punktu i względem osi"
      primitives={primitives}
      labels={labels}
      camera={{ position: [5, -7, 5], target: [0.8, 0.5, 0.7], viewSize: 5.5 }}
    >
      {index >= 5 && <ThreeBadge value="M_l < 0" note="zwrot przeciwny do e_l" x={14} y={246} width={150} />}
      <ThreeStatus>{status[index]}</ThreeStatus>
    </ThreeSolutionScene>
  )
}
