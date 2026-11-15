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

const O = v(0, 0, 0)
const A = v(2, 0, 0)
const B = v(2, 3, 1)
const F = v(4, 0, -6)
const R = v(-4, 0, 6)
const LOAD_M = v(-18, 16, -12)
const REACTION_M = v(18, -16, 12)

const primitives: ThreePrimitive[] = [
  ...axisSystem(O, [4, 3, 3]),
  { kind: 'support', at: O, support: 'fixed' },
  { kind: 'rod', from: O, to: A, radius: 0.065, color: THREE_COLORS.member },
  { kind: 'rod', from: A, to: B, radius: 0.065, color: THREE_COLORS.member },
  { kind: 'sphere', at: B, radius: 0.075, color: THREE_COLORS.ink },
  { kind: 'arrow', from: B, to: move(B, F, 0.28), color: THREE_COLORS.load, radius: 0.065, pulse: true },
  { kind: 'line', points: [O, v(0.8, 0, 0)], color: THREE_COLORS.muted, dashed: true, visibleAt: 1 },
  { kind: 'line', points: [O, v(0, 0.8, 0)], color: THREE_COLORS.muted, dashed: true, visibleAt: 1 },
  { kind: 'line', points: [O, v(0, 0, 0.8)], color: THREE_COLORS.muted, dashed: true, visibleAt: 1 },
  { kind: 'arrow', from: O, to: move(O, R, 0.28), color: THREE_COLORS.reaction, radius: 0.065, visibleAt: 2 },
  { kind: 'arrow', from: O, to: B, color: THREE_COLORS.vector, radius: 0.035, visibleAt: 3 },
  { kind: 'arrow', from: O, to: move(O, LOAD_M, 0.08), color: THREE_COLORS.moment, radius: 0.055, visibleAt: 3 },
  {
    kind: 'arrow',
    from: O,
    to: move(O, REACTION_M, 0.08),
    color: THREE_COLORS.moment,
    radius: 0.07,
    visibleAt: 4,
    pulse: true,
  },
]

const labels: ThreeLabel[] = [
  ...axisLabels(O, [4, 3, 3]),
  pointLabel('o', 'O', O, [-12, 15]),
  pointLabel('a', 'A', A, [0, 16]),
  pointLabel('b', 'B(2,3,1)', B, [9, -8]),
  {
    id: 'f',
    text: 'F = (4, 0, −6) kN',
    at: move(B, F, 0.28),
    offset: [-8, 4],
    anchor: 'end',
    color: THREE_COLORS.load,
    size: 10,
  },
  {
    id: 'r',
    text: 'R = (−4, 0, 6)',
    at: move(O, R, 0.28),
    offset: [8, -8],
    color: THREE_COLORS.reaction,
    size: 10,
    visibleAt: 2,
  },
  { id: 'arm', text: 'r_B', at: v(1, 1.5, 0.5), offset: [12, -8], color: THREE_COLORS.vector, size: 10, visibleAt: 3 },
  {
    id: 'lm',
    text: 'r_B × F = (−18, 16, −12)',
    at: move(O, LOAD_M, 0.08),
    offset: [-8, -8],
    anchor: 'end',
    color: THREE_COLORS.moment,
    size: 9,
    visibleAt: 3,
  },
  {
    id: 'rm',
    text: 'M = (18, −16, 12)',
    at: move(O, REACTION_M, 0.08),
    offset: [8, 14],
    color: THREE_COLORS.moment,
    size: 9,
    visibleAt: 4,
  },
]

const status = [
  'Wspornik O–A–B obciążony siłą F w końcu B',
  'Podpora stała: 3 siły + 3 momenty = 6 niewiadomych',
  'R = −F = (−4, 0, 6) kN',
  'r_B × F = (−18, 16, −12) kN·m',
  'M = −r_B × F = (18, −16, 12) kN·m',
  'R = 7,21 kN, M ≈ 26,9 kN·m — podpora przenosi oba',
]

export function Supports3DAnimation(props: SolutionAnimationProps) {
  const { index } = props
  return (
    <ThreeSolutionScene
      {...props}
      label="Wspornik w podporze stałej i reakcje przestrzenne"
      primitives={primitives}
      labels={labels}
      camera={{ position: [5, -6, 4.5], target: [1, 1, 0.4], viewSize: 5 }}
    >
      {index === 1 && (
        <ThreeBadge
          title="podpora stała"
          value="3 siły + 3 momenty"
          note="n_u = 6"
          x={14}
          y={246}
          width={164}
          color={THREE_COLORS.moment}
        />
      )}
      {index >= 5 && <ThreeBadge value="R = 7,21 kN" note="M ≈ 26,9 kN·m" x={14} y={246} width={150} />}
      <ThreeStatus>{status[index]}</ThreeStatus>
    </ThreeSolutionScene>
  )
}
