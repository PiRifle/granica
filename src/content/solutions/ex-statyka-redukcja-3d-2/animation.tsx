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
  add,
  axisLabels,
  axisSystem,
  move,
  pointLabel,
  scale,
  v,
} from '../../../components/solution-figures/three-statics'

const O = v(0, 0, 0)
const A = v(0, 1, 2)
const B = v(2, 0, 1)
const F1 = v(3, -2, 1)
const F2 = v(-3, 2, -1)
const M1 = v(5, 6, -3)
const M2 = v(-2, -1, 4)
const MSUM = v(3, 5, 1)
const O_PRIME = v(1, 1, 1)

const primitives: ThreePrimitive[] = [
  ...axisSystem(O, [5, 5, 3.4]),
  { kind: 'line', points: [A, B], color: THREE_COLORS.muted, dashed: true },
  { kind: 'sphere', at: O, radius: 0.07, color: THREE_COLORS.ink },
  { kind: 'sphere', at: A, radius: 0.07, color: THREE_COLORS.ink },
  { kind: 'sphere', at: B, radius: 0.07, color: THREE_COLORS.ink },
  { kind: 'arrow', from: A, to: move(A, F1, 0.35), color: THREE_COLORS.load, radius: 0.075, pulse: true },
  { kind: 'arrow', from: B, to: move(B, F2, 0.35), color: THREE_COLORS.load, radius: 0.075, pulse: true },
  { kind: 'arrow', from: O, to: A, color: THREE_COLORS.vector, radius: 0.04, visibleAt: 2 },
  { kind: 'arrow', from: O, to: scale(M1, 0.25), color: THREE_COLORS.moment, radius: 0.065, visibleAt: 2 },
  { kind: 'arrow', from: O, to: B, color: THREE_COLORS.vector, radius: 0.04, visibleAt: 3, hideAt: 4 },
  { kind: 'arrow', from: O, to: scale(M2, 0.25), color: '#d05c8f', radius: 0.065, visibleAt: 3, hideAt: 4 },
  { kind: 'arrow', from: scale(M1, 0.25), to: scale(MSUM, 0.25), color: '#d05c8f', radius: 0.065, visibleAt: 4 },
  {
    kind: 'arrow',
    from: O,
    to: scale(MSUM, 0.25),
    color: THREE_COLORS.reaction,
    radius: 0.08,
    visibleAt: 4,
    pulse: true,
  },
  { kind: 'line', points: [B, A], color: THREE_COLORS.reaction, dashed: true, visibleAt: 5 },
  { kind: 'sphere', at: O_PRIME, radius: 0.07, color: THREE_COLORS.reaction, visibleAt: 5 },
  {
    kind: 'arrow',
    from: O_PRIME,
    to: add(O_PRIME, scale(MSUM, 0.25)),
    color: THREE_COLORS.reaction,
    radius: 0.045,
    visibleAt: 5,
  },
]

const labels: ThreeLabel[] = [
  ...axisLabels(O, [5, 5, 3.4]),
  pointLabel('o', 'O', O, [-12, 15]),
  pointLabel('a', 'A', A, [-12, -8]),
  pointLabel('b', 'B', B, [9, 12]),
  { id: 'f1', text: 'F₁', at: move(A, F1, 0.35), offset: [8, -8], color: THREE_COLORS.load, size: 11 },
  { id: 'f2', text: 'F₂ = −F₁', at: move(B, F2, 0.35), offset: [8, 12], color: THREE_COLORS.load, size: 10, hideAt: 4 },
  { id: 'm1', text: 'M₁', at: scale(M1, 0.25), offset: [8, -8], color: THREE_COLORS.moment, size: 11, visibleAt: 2 },
  { id: 'm2', text: 'M₂', at: scale(M2, 0.25), offset: [8, 12], color: '#d05c8f', size: 11, visibleAt: 3, hideAt: 4 },
  { id: 'm2sum', text: 'M₂', at: scale(add(M1, M2), 0.125), offset: [8, 12], color: '#d05c8f', size: 11, visibleAt: 4 },
  {
    id: 'msum',
    text: 'M = (3, 5, 1)',
    at: scale(MSUM, 0.25),
    offset: [8, -8],
    color: THREE_COLORS.reaction,
    size: 10,
    visibleAt: 4,
  },
  {
    id: 'op',
    text: 'O′',
    at: O_PRIME,
    offset: [-9, 12],
    anchor: 'end',
    color: THREE_COLORS.reaction,
    size: 10,
    visibleAt: 5,
  },
]

const status = [
  'F₂ = −F₁, punkty A i B wyznaczają ramię pary',
  'R = F₁ + F₂ = 0 — układ jest parą sił',
  'M₁ = r_A × F₁ = (5, 6, −3) kN·m',
  'M₂ = r_B × F₂ = (−2, −1, 4) kN·m',
  'M = M₁ + M₂ = (3, 5, 1) kN·m',
  'R = 0 ⇒ M_O′ = M_O; kontrola r_BA × F₁ = M',
]
const badgeValues = ['F₂ = −F₁', 'R = 0', 'M₁ = (5, 6, −3)', 'M₂ = (−2, −1, 4)', 'M = (3, 5, 1)', 'M_O′ = M_O']
const badgeTitles = ['para sił', 'wektor główny', 'moment F₁', 'moment F₂', 'moment główny', 'kontrola']

export function CoupleReductionAnimation(props: SolutionAnimationProps) {
  const { index } = props
  return (
    <ThreeSolutionScene
      {...props}
      label="Redukcja pary sił do bieguna"
      primitives={primitives}
      labels={labels}
      camera={{ position: [5, -6, 4.5], target: [1, 1, 1], viewSize: 5.5 }}
    >
      <ThreeBadge title={badgeTitles[index]} value={badgeValues[index]} />
      <ThreeStatus>{status[index]}</ThreeStatus>
    </ThreeSolutionScene>
  )
}
