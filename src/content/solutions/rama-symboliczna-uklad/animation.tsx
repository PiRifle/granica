import type { ThreeLabel, ThreePrimitive } from '../../../components/solution-figures/ThreeSolutionScene'
import { THREE_COLORS, axisSystem, move, pointLabel, v } from '../../../components/solution-figures/three-statics'
import type { ThreeSceneSpec } from '../../solution-factories/factory-three-scene/factory'
import { createThreeSceneAnimation } from '../../solution-factories/factory-three-scene/animation'

const A = v(0, 0, 2)
const B = v(0, 0, 0)
const C = v(0, 2, 0)
const D = v(0, 2, 1)
const G = v(0, 1, 0)
const AXIS_ORIGIN = v(1.2, -1, 0)

const primitives: ThreePrimitive[] = [
  { kind: 'rod', from: A, to: B, radius: 0.035, color: THREE_COLORS.edge },
  { kind: 'rod', from: B, to: C, radius: 0.035, color: THREE_COLORS.edge },
  { kind: 'rod', from: C, to: D, radius: 0.035, color: THREE_COLORS.edge },
  { kind: 'rod', from: D, to: A, dashed: true, color: THREE_COLORS.edge },
  { kind: 'support', at: A, support: 'pin' },
  { kind: 'support', at: B, support: 'roller' },
  ...axisSystem(AXIS_ORIGIN, [0.45, 0.45, 0.45]),
  {
    kind: 'line',
    points: [move(A, [-0.25, 0, 0], 1), move(B, [-0.25, 0, 0], 1)],
    color: THREE_COLORS.muted,
    visibleAt: 1,
  },
  {
    kind: 'line',
    points: [move(B, [0, 0, -0.25], 1), move(C, [0, 0, -0.25], 1)],
    color: THREE_COLORS.muted,
    visibleAt: 1,
  },
  {
    kind: 'line',
    points: [move(C, [0.25, 0, 0], 1), move(D, [0.25, 0, 0], 1)],
    color: THREE_COLORS.muted,
    visibleAt: 1,
  },
  {
    kind: 'arrow',
    from: G,
    to: move(G, [0, 0, -1], 0.5),
    color: THREE_COLORS.load,
    radius: 0.035,
    visibleAt: 2,
    pulse: true,
  },
  {
    kind: 'arrow',
    from: C,
    to: move(C, [1, 0, 0], 0.55),
    color: THREE_COLORS.load,
    radius: 0.035,
    visibleAt: 2,
    pulse: true,
  },
  {
    kind: 'arrow',
    from: D,
    to: move(D, [0.45, 0.15, 0.85], 0.65),
    color: THREE_COLORS.load,
    radius: 0.035,
    visibleAt: 2,
    pulse: true,
  },
  { kind: 'arrow', from: A, to: move(A, [1, 0, 0], 0.45), color: THREE_COLORS.reaction, radius: 0.03, visibleAt: 3 },
  { kind: 'arrow', from: A, to: move(A, [0, 1, 0], 0.45), color: THREE_COLORS.reaction, radius: 0.03, visibleAt: 3 },
  { kind: 'arrow', from: A, to: move(A, [0, 0, 1], 0.45), color: THREE_COLORS.reaction, radius: 0.03, visibleAt: 3 },
  { kind: 'arrow', from: B, to: move(B, [0, 1, 0], 0.45), color: THREE_COLORS.reaction, radius: 0.03, visibleAt: 3 },
  { kind: 'arrow', from: B, to: move(B, [0, 0, 1], 0.45), color: THREE_COLORS.reaction, radius: 0.03, visibleAt: 3 },
]

const labels: ThreeLabel[] = [
  { ...pointLabel('a', 'A', A, [-12, -8]), hideAt: 4 },
  { ...pointLabel('b', 'B', B, [-12, 14]), hideAt: 4 },
  { ...pointLabel('c', 'C', C, [10, 12]), hideAt: 4 },
  { ...pointLabel('d', 'D', D, [10, -8]), hideAt: 4 },
  {
    id: 'dim-ab',
    text: '2a',
    at: v(-0.25, 0, 1),
    size: 9,
    anchor: 'middle',
    color: THREE_COLORS.muted,
    visibleAt: 1,
    hideAt: 2,
  },
  {
    id: 'dim-bc',
    text: '2a',
    at: v(0, 1, -0.25),
    size: 9,
    anchor: 'middle',
    color: THREE_COLORS.muted,
    visibleAt: 1,
    hideAt: 2,
  },
  { id: 'dim-cd', text: 'a', at: v(0.25, 2, 0.5), size: 9, color: THREE_COLORS.muted, visibleAt: 1, hideAt: 2 },
  { id: 'g', text: 'G', at: move(G, [0, 0, -1], 0.5), color: THREE_COLORS.load, size: 10, visibleAt: 2 },
  { id: 'p', text: 'P', at: move(C, [1, 0, 0], 0.55), color: THREE_COLORS.load, size: 10, visibleAt: 2 },
  {
    id: 's',
    text: 'S = 3G/4',
    at: move(D, [0.45, 0.15, 0.85], 0.65),
    color: THREE_COLORS.load,
    size: 10,
    visibleAt: 2,
  },
  { id: 'rax', text: 'R_Ax', at: move(A, [1, 0, 0], 0.45), color: THREE_COLORS.reaction, size: 8.5, visibleAt: 3 },
  { id: 'ray', text: 'R_Ay', at: move(A, [0, 1, 0], 0.45), color: THREE_COLORS.reaction, size: 8.5, visibleAt: 3 },
  { id: 'raz', text: 'R_Az', at: move(A, [0, 0, 1], 0.45), color: THREE_COLORS.reaction, size: 8.5, visibleAt: 3 },
  { id: 'rby', text: 'R_By', at: move(B, [0, 1, 0], 0.45), color: THREE_COLORS.reaction, size: 8.5, visibleAt: 3 },
  { id: 'rbz', text: 'R_Bz', at: move(B, [0, 0, 1], 0.45), color: THREE_COLORS.reaction, size: 8.5, visibleAt: 3 },
]

const status = [
  'Odtworzony szkielet A–B–C–D; brak pełnej treści źródła',
  'Osie x, y, z i wymiary symboliczne 2a, a',
  'G w połowie B–C, P w C, S w pręcie przy D',
  'A: R_Ax, R_Ay, R_Az; B: R_By, R_Bz',
  'ΣM_x: −G·a + S·sinα·2a = 0 ⇒ S = 3G/4',
  'ΣM_y: −R_Bz·a + G·a/2 = 0 ⇒ R_Bz = G/2',
  'ΣF: R_Ay = 2P + G/2, R_Ax = −P − G/4, R_Az = 0',
  'Kontrola symboliczna; brak wymiarów do kontroli 3D',
]

const spec: ThreeSceneSpec = {
  label: 'Odtworzony przestrzenny szkielet ramy z podporami A i B, siłami G, P, S i reakcjami',
  camera: { position: [3.5, -4.5, 3], target: [0, 1, 0.8], viewSize: 3.8 },
  primitives,
  labels,
  status,
  badges: [
    {
      fromIndex: 4,
      title: 'wyniki symboliczne',
      value: 'S = 3G/4 · R_Bz = G/2',
      note: 'R_Ay = 2P + G/2 · R_Ax = −P − G/4',
      x: 272,
      y: 244,
      width: 176,
    },
  ],
}

export const SolutionAnimation = createThreeSceneAnimation(spec)
