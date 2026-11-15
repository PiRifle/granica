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
const P = v(0.346, 0.2, 0)
const F_TIP = v(0.346, 0.2, -0.18)
const M = v(-0.4, 0.693, 0)
const MY = v(0, 0.693, 0)
const PX = v(0.346, 0, 0)
const PY = v(0, 0.2, 0)

const primitives: ThreePrimitive[] = [
  ...axisSystem(O, [0.58, 0.8, 0.36]),
  { kind: 'rod', from: O, to: P, radius: 0.018, color: THREE_COLORS.vector },
  { kind: 'sphere', at: O, radius: 0.025, color: THREE_COLORS.ink },
  { kind: 'sphere', at: P, radius: 0.025, color: THREE_COLORS.ink },
  { kind: 'arrow', from: P, to: F_TIP, color: THREE_COLORS.load, radius: 0.018, pulse: true },
  { kind: 'line', points: [PX, P, PY], color: THREE_COLORS.muted, dashed: true, visibleAt: 1 },
  { kind: 'arrow', from: O, to: M, color: THREE_COLORS.moment, radius: 0.022, visibleAt: 2, pulse: true },
  { kind: 'arrow', from: O, to: MY, color: THREE_COLORS.reaction, radius: 0.025, visibleAt: 3 },
  { kind: 'line', points: [M, MY], color: THREE_COLORS.muted, dashed: true, visibleAt: 3 },
  { kind: 'rod', from: P, to: PY, radius: 0.012, color: THREE_COLORS.reaction, visibleAt: 4 },
]

const labels: ThreeLabel[] = [
  ...axisLabels(O, [0.58, 0.8, 0.36]),
  pointLabel('o', 'O', O, [-12, 14]),
  pointLabel('p', 'P', P, [10, -8]),
  { id: 'f', text: 'F = 200 N', at: F_TIP, offset: [-8, 14], anchor: 'end', color: THREE_COLORS.load, size: 10 },
  {
    id: 'r',
    text: '0,4 m · 30°',
    at: v(0.17, 0.1, 0),
    offset: [0, 14],
    anchor: 'middle',
    color: THREE_COLORS.vector,
    size: 9,
  },
  {
    id: 'm',
    text: 'M_O = (−40; 69,3; 0)',
    at: M,
    offset: [-10, -8],
    anchor: 'end',
    color: THREE_COLORS.moment,
    size: 9,
    visibleAt: 2,
  },
  { id: 'my', text: 'M_y = 69,3 N·m', at: MY, offset: [10, 14], color: THREE_COLORS.reaction, size: 10, visibleAt: 3 },
]

const status = [
  'Dźwignia 0,4 m pod kątem 30°; F = 200 N w dół',
  'P = (0,346; 0,2; 0) m',
  'M_O = r × F = (−40; 69,3; 0) N·m',
  'M_y = M_O · e_y = 69,3 N·m',
  'Kontrola: M_y = 200 · 0,346 = 69,3 N·m',
  'Dodatni moment — obrót zgodny z osią +y',
]

export function MomentAboutAxisAnimation(props: SolutionAnimationProps) {
  const { index } = props
  return (
    <ThreeSolutionScene
      {...props}
      label="Moment siły względem osi y dla dźwigni poziomej"
      primitives={primitives}
      labels={labels}
      camera={{ position: [0.85, -1.1, 0.8], target: [0.05, 0.2, 0], viewSize: 1.2 }}
    >
      {index >= 5 && <ThreeBadge value="M_y > 0" note="obrót zgodny z osią +y" x={292} y={246} width={150} />}
      <ThreeStatus>{status[index]}</ThreeStatus>
    </ThreeSolutionScene>
  )
}
