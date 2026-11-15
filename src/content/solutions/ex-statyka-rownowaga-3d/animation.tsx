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
const C = v(2, 2, 0)
const D = v(0, 2, 0)
const E = v(2, 0, 2)
const G = v(1, 1, 0)
const CABLE_TIP = v(1.3, 0.7, 1.3)

const primitives: ThreePrimitive[] = [
  ...axisSystem(A, [3.5, 3, 2.8]),
  { kind: 'plate', points: [A, B, C, D], color: '#dce8f7', opacity: 0.85 },
  { kind: 'support', at: A, support: 'pin' },
  { kind: 'support', at: B, support: 'roller' },
  ...[A, B, C, D].map((at) => ({ kind: 'sphere' as const, at, radius: 0.055, color: THREE_COLORS.ink })),
  { kind: 'arrow', from: G, to: move(G, [0, 0, -1], 0.8), color: THREE_COLORS.load, radius: 0.05, pulse: true },
  { kind: 'arrow', from: C, to: move(C, [0, 0, -1], 0.8), color: THREE_COLORS.load, radius: 0.05, pulse: true },
  { kind: 'rod', from: D, to: E, dashed: true, color: THREE_COLORS.muted },
  { kind: 'sphere', at: E, radius: 0.06, color: THREE_COLORS.muted },
  { kind: 'rod', from: D, to: E, color: THREE_COLORS.vector, radius: 0.025, visibleAt: 1 },
  { kind: 'arrow', from: D, to: CABLE_TIP, color: THREE_COLORS.vector, radius: 0.055, visibleAt: 1, pulse: true },
  { kind: 'line', points: [A, G], color: THREE_COLORS.moment, dashed: true, visibleAt: 3 },
  { kind: 'line', points: [A, C], color: THREE_COLORS.moment, dashed: true, visibleAt: 3 },
  { kind: 'line', points: [A, D], color: THREE_COLORS.moment, dashed: true, visibleAt: 3 },
  { kind: 'arrow', from: D, to: CABLE_TIP, color: THREE_COLORS.reaction, radius: 0.065, visibleAt: 3 },
  { kind: 'arrow', from: B, to: v(2, 1.5, 0), color: THREE_COLORS.reaction, radius: 0.05, visibleAt: 3 },
  { kind: 'arrow', from: B, to: v(2, 0, 1.25), color: THREE_COLORS.reaction, radius: 0.05, visibleAt: 3 },
  { kind: 'arrow', from: A, to: v(-1.2, 0, 0), color: THREE_COLORS.reaction, radius: 0.05, visibleAt: 4 },
  { kind: 'arrow', from: A, to: v(0, 0, -0.5), color: THREE_COLORS.reaction, radius: 0.05, visibleAt: 4 },
]

const labels: ThreeLabel[] = [
  ...axisLabels(A, [3.5, 3, 2.8]),
  pointLabel('a', 'A', A, [-12, 14]),
  pointLabel('b', 'B', B, [9, 14]),
  pointLabel('c', 'C', C, [9, -8]),
  pointLabel('d', 'D', D, [-12, -8]),
  pointLabel('e', 'E', E, [9, -8]),
  {
    id: 'g',
    text: 'G = 10 kN',
    at: move(G, [0, 0, -1], 0.8),
    offset: [-8, 4],
    anchor: 'end',
    color: THREE_COLORS.load,
    size: 10,
  },
  { id: 'p', text: 'P = 6 kN', at: move(C, [0, 0, -1], 0.8), offset: [9, 4], color: THREE_COLORS.load, size: 10 },
  { id: 's', text: 'S = 19,05 kN', at: CABLE_TIP, offset: [9, -8], color: THREE_COLORS.vector, size: 10, visibleAt: 1 },
  {
    id: 'by',
    text: 'B_y = 11 kN',
    at: v(2, 1.5, 0),
    offset: [8, 4],
    color: THREE_COLORS.reaction,
    size: 9,
    visibleAt: 3,
  },
  {
    id: 'bz',
    text: 'B_z = 11 kN',
    at: v(2, 0, 1.25),
    offset: [8, -8],
    color: THREE_COLORS.reaction,
    size: 9,
    visibleAt: 3,
  },
  {
    id: 'ax',
    text: 'A_x = −11 kN',
    at: v(-1.2, 0, 0),
    offset: [0, 14],
    anchor: 'middle',
    color: THREE_COLORS.reaction,
    size: 9,
    visibleAt: 4,
  },
  {
    id: 'az',
    text: 'A_z = −6 kN',
    at: v(0, 0, -0.5),
    offset: [-8, 14],
    anchor: 'end',
    color: THREE_COLORS.reaction,
    size: 9,
    visibleAt: 4,
  },
]

const status = [
  'Płyta ABCD, ciężar G, siła P i cięgno DE',
  'DE = (2, −2, 2) m, |DE| = 2√3 m',
  'Więzy: A — 3 reakcje, B — 2, cięgno — 1',
  'S = 11√3 ≈ 19,05 kN, B_z = 11 kN, B_y = 11 kN',
  'A_x = −11 kN, A_y = 0, A_z = −6 kN',
  'ΣM_B = 0; A_z działa w dół — płyta nie odrywa się',
]

export function Equilibrium3DAnimation(props: SolutionAnimationProps) {
  const { index } = props
  return (
    <ThreeSolutionScene
      {...props}
      label="Równowaga płyty na trzech podporach"
      primitives={primitives}
      labels={labels}
      camera={{ position: [4, -5, 4], target: [1, 1, 0.5], viewSize: 4.6 }}
    >
      {index === 1 && <ThreeBadge value="|DE| = 2√3 m" color={THREE_COLORS.vector} />}
      {index === 2 && <ThreeBadge title="więzy" value="A: 3 · B: 2 · cięgno: 1" />}
      {index >= 5 && <ThreeBadge value="ΣM_B = (0, 0, 0)" note="kontrola niezależna" />}
      <ThreeStatus>{status[index]}</ThreeStatus>
    </ThreeSolutionScene>
  )
}
