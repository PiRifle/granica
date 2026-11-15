import type { ThreeLabel, ThreePrimitive } from '../../../components/solution-figures/ThreeSolutionScene'
import {
  THREE_COLORS,
  axisLabels,
  axisSystem,
  move,
  pointLabel,
  v,
} from '../../../components/solution-figures/three-statics'
import type { ThreeSceneSpec } from '../../solution-factories/factory-three-scene/factory'
import { createThreeSceneAnimation } from '../../solution-factories/factory-three-scene/animation'

const A = v(0, 0, 0)
const B = v(0, 4, 0)
const D = v(4, 0, 0)
const C = v(4, 4, 0)
const AT = v(0, 0, 4.5)
const BT = v(0, 4, 4.5)
const DT = v(4, 0, 4.5)
const CT = v(4, 4, 4.5)
const G = v(2, 2, 4.5)
const corners = [A, B, C, D]
const topCorners = [AT, BT, CT, DT]

const primitives: ThreePrimitive[] = [
  ...corners.flatMap((point, index) => [
    { kind: 'rod' as const, from: point, to: topCorners[index], radius: 0.045, color: THREE_COLORS.member },
    { kind: 'rod' as const, from: point, to: corners[(index + 1) % 4], dashed: true, color: THREE_COLORS.muted },
    {
      kind: 'rod' as const,
      from: topCorners[index],
      to: topCorners[(index + 1) % 4],
      radius: 0.04,
      color: THREE_COLORS.member,
    },
    { kind: 'sphere' as const, at: point, radius: 0.08, color: THREE_COLORS.ink },
    { kind: 'sphere' as const, at: topCorners[index], radius: 0.08, color: THREE_COLORS.ink },
  ]),
  { kind: 'support', at: A, support: 'pin' },
  { kind: 'support', at: B, support: 'roller' },
  ...axisSystem(v(0, 0, 5.4), [1, 1, 1]),
  {
    kind: 'line',
    points: [A, move(A, [0, 0, -0.5], 1), move(B, [0, 0, -0.5], 1), B],
    color: THREE_COLORS.muted,
    visibleAt: 1,
  },
  {
    kind: 'line',
    points: [A, move(A, [-0.5, 0, 0], 1), move(D, [-0.5, 0, 0], 1), D],
    color: THREE_COLORS.muted,
    visibleAt: 1,
  },
  {
    kind: 'arrow',
    from: AT,
    to: move(AT, [0, 0, -1], 1.2),
    color: THREE_COLORS.load,
    radius: 0.07,
    visibleAt: 2,
    pulse: true,
  },
  {
    kind: 'arrow',
    from: G,
    to: move(G, [0, 0, -1], 1.2),
    color: THREE_COLORS.load,
    radius: 0.07,
    visibleAt: 2,
    pulse: true,
  },
  { kind: 'arrow', from: B, to: move(B, [0, 0, 1], 1.3), color: THREE_COLORS.reaction, radius: 0.06, visibleAt: 3 },
  {
    kind: 'arrow',
    from: DT,
    to: move(DT, [-1, 0, 0], 1.3),
    color: THREE_COLORS.load,
    radius: 0.07,
    visibleAt: 4,
    pulse: true,
  },
  { kind: 'arrow', from: A, to: move(A, [1, 0, 0], 1), color: THREE_COLORS.reaction, radius: 0.06, visibleAt: 5 },
  { kind: 'arrow', from: A, to: move(A, [0, 0, 1], 1.5), color: THREE_COLORS.reaction, radius: 0.06, visibleAt: 5 },
]

const labels: ThreeLabel[] = [
  ...axisLabels(v(0, 0, 5.4), [1, 1, 1]).map((label) => ({ ...label, hideAt: 5 })),
  { ...pointLabel('a', 'A', A, [-15, 16]), hideAt: 5 },
  { ...pointLabel('b', 'B', B, [12, 14]), hideAt: 5 },
  { ...pointLabel('c', 'C', DT, [12, -8]), hideAt: 5 },
  {
    id: 'dim-a',
    text: 'a = 4,0 m',
    at: v(0, 2, -0.5),
    size: 9,
    anchor: 'middle',
    color: THREE_COLORS.muted,
    visibleAt: 1,
  },
  {
    id: 'dim-b',
    text: 'b = 4,0 m',
    at: v(1.5, 0, 0),
    offset: [-15, 15],
    size: 9,
    color: THREE_COLORS.muted,
    visibleAt: 1,
  },
  {
    id: 'dim-c',
    text: 'c = 4,5 m',
    at: v(4, 4, 2.25),
    offset: [12, 0],
    size: 9,
    color: THREE_COLORS.muted,
    visibleAt: 1,
  },
  { id: 'q', text: 'Q = 20 kN', at: move(AT, [0, 0, -1], 1.2), color: THREE_COLORS.load, size: 10, visibleAt: 2 },
  {
    id: 'g',
    text: 'G = 18 kN',
    at: move(G, [0, 0, -1], 1.2),
    color: THREE_COLORS.load,
    size: 10,
    anchor: 'middle',
    offset: [0, 16],
    visibleAt: 2,
  },
  {
    id: 'bz',
    text: 'B_z = 9 kN',
    at: move(B, [0, 0, 1], 1.3),
    color: THREE_COLORS.reaction,
    size: 9,
    offset: [12, 10],
    visibleAt: 3,
  },
  {
    id: 'p',
    text: 'P = 8 kN',
    at: move(DT, [-1, 0, 0], 1.3),
    color: THREE_COLORS.load,
    size: 10,
    anchor: 'end',
    visibleAt: 4,
  },
  { id: 'ax', text: 'A_x', at: move(A, [1, 0, 0], 1), color: THREE_COLORS.reaction, size: 9, visibleAt: 5 },
  { id: 'az', text: 'A_z', at: move(A, [0, 0, 1], 1.5), color: THREE_COLORS.reaction, size: 9, visibleAt: 5 },
]

const status = [
  'Rama z sześcioma prętami: podstawa a × b, wysokość c',
  'a = 4,0 m, b = 4,0 m, c = 4,5 m; Q w narożu, G w środku górnej płaszczyzny',
  'Q = 20 kN w dół, G = 18 kN w dół, P = 8,000 kN w −x',
  'M_x: −(a/2)·G + a·B_z = 0  ⇒  B_z = 9,000 kN',
  'M_y: (b/2)·G − b·P = 0  ⇒  P = 8,000 kN',
  'ΣF_z: A_z = Q + G − B_z = 29,000 kN;  B_x = 0',
  'A_x = 8,000 kN, A_y = 0;  R_A = 30,083 kN, R_B = 9,000 kN',
  'Kontrola ΣF = 0 i ΣM_K = 0 dla K = (2; 2; 0) m — reszty ≈ 0',
]

const spec: ThreeSceneSpec = {
  label: 'Przestrzenna rama o podstawie a × b i wysokości c z obciążeniami i podporami',
  camera: { position: [8, -10, 8], target: [2, 2, 2], viewSize: 7.6 },
  primitives,
  labels,
  status,
  badges: [
    {
      fromIndex: 5,
      title: 'wyniki [kN]',
      value: 'R_A = 30,083',
      note: 'R_B = 9,000 · A_x = 8,000',
      x: 14,
      y: 42,
      width: 160,
    },
    { fromIndex: 7, value: 'ΣF = 0, ΣM_K = 0', note: 'K = (2; 2; 0) m', x: 292, y: 248, width: 152 },
  ],
}

export const SolutionAnimation = createThreeSceneAnimation(spec)
