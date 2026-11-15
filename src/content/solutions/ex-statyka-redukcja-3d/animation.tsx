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
const P = v(1, 0, 2)
const F = v(0, 4, 0)
const R_CROSS = v(-8, 0, 4)
const M_O = v(-6, 0, 5)
const O_PRIME = v(1, 0, 0)
const M_PRIME = v(-6, 0, 1)
const LINE_BASE = v(1.25, 0, 1.5)

const primitives: ThreePrimitive[] = [
  ...axisSystem(O, [4, 3.5, 3.5]),
  { kind: 'plate', points: [O, v(2.5, 0, 0), v(2.5, 0, 3), v(0, 0, 3)], color: '#eef3fb', opacity: 0.45 },
  { kind: 'sphere', at: O, radius: 0.06, color: THREE_COLORS.ink },
  { kind: 'sphere', at: P, radius: 0.06, color: THREE_COLORS.ink },
  { kind: 'arrow', from: P, to: move(P, F, 0.65), color: THREE_COLORS.load, radius: 0.06, pulse: true },
  { kind: 'ring', at: P, radius: 0.35, tube: 0.025, axis: [2, 0, 1], color: THREE_COLORS.moment },
  { kind: 'arrow', from: O, to: move(O, F, 0.65), color: THREE_COLORS.reaction, radius: 0.07, visibleAt: 1 },
  { kind: 'arrow', from: O, to: P, color: THREE_COLORS.vector, radius: 0.04, visibleAt: 2 },
  { kind: 'arrow', from: O, to: scale(R_CROSS, 0.35), color: THREE_COLORS.moment, radius: 0.05, visibleAt: 2 },
  { kind: 'arrow', from: O, to: scale(M_O, 0.35), color: THREE_COLORS.moment, radius: 0.06, visibleAt: 2 },
  {
    kind: 'rod',
    from: v(1.25, -0.35, 1.5),
    to: v(1.25, 3.5, 1.5),
    dashed: true,
    color: THREE_COLORS.reaction,
    visibleAt: 4,
  },
  {
    kind: 'arrow',
    from: LINE_BASE,
    to: move(LINE_BASE, F, 0.65),
    color: THREE_COLORS.reaction,
    radius: 0.06,
    visibleAt: 4,
  },
  { kind: 'arrow', from: O, to: O_PRIME, color: THREE_COLORS.vector, radius: 0.04, visibleAt: 5 },
  {
    kind: 'arrow',
    from: O_PRIME,
    to: move(O_PRIME, M_PRIME, 0.35),
    color: THREE_COLORS.moment,
    radius: 0.05,
    visibleAt: 5,
  },
]

const labels: ThreeLabel[] = [
  ...axisLabels(O, [4, 3.5, 3.5]),
  pointLabel('o', 'O', O, [-12, 15]),
  pointLabel('p', 'P(1,0,2)', P, [9, -8]),
  { id: 'f', text: 'F = 4 kN', at: move(P, F, 0.65), offset: [8, 4], color: THREE_COLORS.load, size: 11 },
  {
    id: 'r',
    text: 'R = (0, 4, 0) kN',
    at: move(O, F, 0.65),
    offset: [35, 15],
    color: THREE_COLORS.reaction,
    size: 10,
    visibleAt: 1,
    hideAt: 4,
  },
  {
    id: 'cross',
    text: 'r × F = (−8, 0, 4)',
    at: scale(R_CROSS, 0.35),
    offset: [8, 12],
    color: THREE_COLORS.moment,
    size: 9,
    visibleAt: 2,
  },
  {
    id: 'mo',
    text: 'M_O = (−6, 0, 5)',
    at: scale(M_O, 0.35),
    offset: [8, -8],
    color: THREE_COLORS.moment,
    size: 9,
    visibleAt: 2,
  },
  {
    id: 'line',
    text: 'x = 1,25 m, z = 1,5 m',
    at: LINE_BASE,
    offset: [50, 20],
    color: THREE_COLORS.reaction,
    size: 9,
    visibleAt: 4,
  },
  { id: 'op', text: 'O′', at: O_PRIME, offset: [8, -8], size: 10, visibleAt: 5 },
  {
    id: 'mp',
    text: 'M_O′ = (−6, 0, 1)',
    at: move(O_PRIME, M_PRIME, 0.35),
    offset: [-8, 16],
    anchor: 'end',
    color: THREE_COLORS.moment,
    size: 9,
    visibleAt: 5,
  },
]

const status = [
  'Siła w P i przyłożona para M_c',
  'R = (0, 4, 0) kN — suma sił',
  'r × F = (−8, 0, 4), M_O = (−6, 0, 5) kN·m',
  'R · M_O = 0 → układ ma wypadkową',
  'Prosta działania: x = 1,25 m, z = 1,5 m',
  'M_O′ = (−6, 0, 1) kN·m po przesunięciu bieguna',
]

export function Reduction3DAnimation(props: SolutionAnimationProps) {
  const { index } = props
  return (
    <ThreeSolutionScene
      {...props}
      label="Redukcja przestrzennego układu sił do bieguna"
      primitives={primitives}
      labels={labels}
      camera={{ position: [6, -7, 5], target: [1, 0.8, 1.2], viewSize: 6 }}
    >
      {index === 0 && <ThreeBadge value="M_c = (2, 0, 1)" color={THREE_COLORS.moment} />}
      {index >= 3 && index < 5 && <ThreeBadge value="R · M_O = 0" note="układ ma wypadkową" />}
      <ThreeStatus>{status[index]}</ThreeStatus>
    </ThreeSolutionScene>
  )
}
