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
  v,
} from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const B = v(2, 0, 0)
const C = v(2, 3, 0)
const D = v(0, 3, 0)
const G = v(1, 1.5, 0)
const CABLE_ANCHOR = v(2, 3, 2)
const CABLE_TIP = v(2, 3, 1.35)

const primitives: ThreePrimitive[] = [
  ...axisSystem(A, [3.5, 3.8, 2.8]),
  { kind: 'plate', points: [A, B, C, D], color: '#dce8f7', opacity: 0.85 },
  { kind: 'support', at: A, support: 'pin' },
  { kind: 'support', at: B, support: 'roller' },
  ...[A, B, C, D].map((at) => ({ kind: 'sphere' as const, at, radius: 0.055, color: THREE_COLORS.ink })),
  { kind: 'arrow', from: G, to: move(G, [0, 0, -1], 0.9), color: THREE_COLORS.load, radius: 0.05, pulse: true },
  { kind: 'arrow', from: D, to: move(D, [0, 0, -1], 0.78), color: THREE_COLORS.load, radius: 0.05, pulse: true },
  { kind: 'arrow', from: C, to: v(2.8, 3, 0), color: THREE_COLORS.load, radius: 0.05, pulse: true },
  { kind: 'rod', from: C, to: CABLE_ANCHOR, dashed: true, color: THREE_COLORS.muted },
  { kind: 'sphere', at: CABLE_ANCHOR, radius: 0.06, color: THREE_COLORS.muted },
  { kind: 'arrow', from: C, to: CABLE_TIP, color: THREE_COLORS.vector, radius: 0.06, visibleAt: 1, pulse: true },
  { kind: 'line', points: [A, C], color: THREE_COLORS.moment, dashed: true, visibleAt: 1 },
  { kind: 'line', points: [A, D], color: THREE_COLORS.moment, dashed: true, visibleAt: 1 },
  { kind: 'line', points: [A, G], color: THREE_COLORS.moment, dashed: true, visibleAt: 1 },
  { kind: 'arrow', from: B, to: v(2, 1, 0), color: THREE_COLORS.reaction, radius: 0.05, visibleAt: 2 },
  { kind: 'arrow', from: B, to: v(2, 0, -0.62), color: THREE_COLORS.reaction, radius: 0.05, visibleAt: 2 },
  { kind: 'arrow', from: A, to: v(-0.9, 0, 0), color: THREE_COLORS.reaction, radius: 0.05, visibleAt: 3 },
  { kind: 'arrow', from: A, to: v(0, -1, 0), color: THREE_COLORS.reaction, radius: 0.05, visibleAt: 3 },
  { kind: 'arrow', from: A, to: v(0, 0, 1.05), color: THREE_COLORS.reaction, radius: 0.05, visibleAt: 3 },
  { kind: 'line', points: [B, A], color: THREE_COLORS.moment, dashed: true, visibleAt: 4 },
  { kind: 'line', points: [B, C], color: THREE_COLORS.moment, dashed: true, visibleAt: 4 },
  { kind: 'line', points: [B, D], color: THREE_COLORS.moment, dashed: true, visibleAt: 4 },
  { kind: 'line', points: [B, G], color: THREE_COLORS.moment, dashed: true, visibleAt: 4 },
]

const labels: ThreeLabel[] = [
  ...axisLabels(A, [3.5, 3.8, 2.8]).map((label) => ({ ...label, hideAt: 5 })),
  pointLabel('a', 'A', A, [-12, 14]),
  pointLabel('b', 'B', B, [9, 14]),
  pointLabel('c', 'C', C, [9, -8]),
  pointLabel('d', 'D', D, [-12, -8]),
  {
    id: 'g',
    text: 'G = 12 kN',
    at: move(G, [0, 0, -1], 0.9),
    offset: [-8, 4],
    anchor: 'end',
    color: THREE_COLORS.load,
    size: 10,
  },
  {
    id: 'p',
    text: 'P = 8 kN',
    at: move(D, [0, 0, -1], 0.78),
    offset: [-8, 4],
    anchor: 'end',
    color: THREE_COLORS.load,
    size: 10,
  },
  { id: 'h', text: 'H = 6 kN', at: v(2.8, 3, 0), offset: [8, -8], color: THREE_COLORS.load, size: 10 },
  { id: 's', text: 'S = 14 kN', at: CABLE_TIP, offset: [9, -8], color: THREE_COLORS.vector, size: 10, visibleAt: 1 },
  {
    id: 'by',
    text: 'B_y = 9 kN',
    at: v(2, 1, 0),
    offset: [-8, -8],
    anchor: 'end',
    color: THREE_COLORS.reaction,
    size: 9,
    visibleAt: 2,
    hideAt: 5,
  },
  {
    id: 'bz',
    text: 'B_z = −8 kN',
    at: v(2, 0, -0.62),
    offset: [8, 12],
    color: THREE_COLORS.reaction,
    size: 9,
    visibleAt: 2,
    hideAt: 5,
  },
  {
    id: 'ax',
    text: 'A_x = −6 kN',
    at: v(-0.9, 0, 0),
    offset: [0, 14],
    anchor: 'middle',
    color: THREE_COLORS.reaction,
    size: 9,
    visibleAt: 3,
    hideAt: 4,
  },
  {
    id: 'ay',
    text: 'A_y = −9 kN',
    at: v(0, -1, 0),
    offset: [8, 12],
    color: THREE_COLORS.reaction,
    size: 9,
    visibleAt: 3,
    hideAt: 4,
  },
  {
    id: 'az',
    text: 'A_z = 14 kN',
    at: v(0, 0, 1.05),
    offset: [8, -8],
    color: THREE_COLORS.reaction,
    size: 9,
    visibleAt: 3,
    hideAt: 4,
  },
]

const status = [
  'Płyta ABCD, obciążenia G, P, H i trzy więzy',
  'ΣM_A: S = 14 kN z równania względem osi x',
  'ΣM_A: B_z = −8 kN, B_y = 9 kN',
  'ΣF: A_x = −6, A_y = −9, A_z = 14 kN',
  'Kontrola względem B: ΣM_B = (0, 0, 0)',
  'Kontrola sensu: 14 − 8 + 14 = 20 = G + P',
]

export function Full3DTaskAnimation(props: SolutionAnimationProps) {
  const { index } = props
  return (
    <ThreeSolutionScene
      {...props}
      label="Pełne zadanie równowagi przestrzennej płyty"
      primitives={primitives}
      labels={labels}
      camera={{ position: [4.5, -5.5, 4], target: [1, 1.5, 0.4], viewSize: 5.2 }}
    >
      {index === 4 && (
        <ThreeBadge value="ΣM_B = (0, 0, 0)" note="kontrola poza równaniem A" x={14} y={246} width={168} />
      )}
      {index >= 5 && <ThreeBadge value="A_z + B_z + S = 20 kN" note="G + P = 20 kN" x={286} y={246} width={166} />}
      <ThreeStatus>{status[index]}</ThreeStatus>
    </ThreeSolutionScene>
  )
}
