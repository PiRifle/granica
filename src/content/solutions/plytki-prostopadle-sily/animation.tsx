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
const AX = v(0.2, 0, 0)
const AZ = v(0, 0, 0.1)
const Q = v(0.2, 0, 0.1)
const G = v(0, 0.2, 0)
const B = v(0, 0.6, 0)
const BX = v(0.2, 0.6, 0)
const BZ = v(0.2, 0.6, 0.1)
const C = v(0, 0.6, 0.1)

const primitives: ThreePrimitive[] = [
  { kind: 'plate', points: [A, AX, BX, B], color: '#dce8f7' },
  { kind: 'plate', points: [A, AX, Q, AZ], color: '#eef3fb' },
  { kind: 'plate', points: [B, BX, BZ, C], color: '#d5e3f4' },
  { kind: 'rod', from: A, to: B, dashed: true, color: THREE_COLORS.support },
  { kind: 'support', at: A, support: 'pin' },
  { kind: 'support', at: B, support: 'roller' },
  { kind: 'sphere', at: A, radius: 0.035, color: THREE_COLORS.support },
  ...axisSystem(v(0, 0, 0.35), [0.25, 0.25, 0.25]),
  {
    kind: 'line',
    points: [A, move(A, [-0.14, 0, 0], 1), move(B, [-0.14, 0, 0], 1), B],
    color: THREE_COLORS.muted,
    dashed: true,
    visibleAt: 1,
  },
  { kind: 'line', points: [A, Q], color: THREE_COLORS.moment, dashed: true, visibleAt: 3 },
  { kind: 'line', points: [A, G], color: THREE_COLORS.moment, dashed: true, visibleAt: 3 },
  { kind: 'line', points: [B, C], color: THREE_COLORS.moment, dashed: true, visibleAt: 3 },
  { kind: 'arrow', from: Q, to: move(Q, [0, 0, -1], 0.2), color: THREE_COLORS.load, visibleAt: 2, pulse: true },
  { kind: 'arrow', from: G, to: move(G, [0, 0, -1], 0.18), color: THREE_COLORS.load, visibleAt: 2, pulse: true },
  { kind: 'arrow', from: C, to: move(C, [-1, 0, 0], 0.24), color: THREE_COLORS.load, visibleAt: 2, pulse: true },
  { kind: 'arrow', from: B, to: move(B, [1, 0, 0], 0.18), color: THREE_COLORS.reaction, visibleAt: 5 },
  { kind: 'arrow', from: B, to: move(B, [0, 0, 1], 0.22), color: THREE_COLORS.reaction, visibleAt: 5 },
  { kind: 'arrow', from: A, to: move(A, [0, 0, 1], 0.22), color: THREE_COLORS.reaction, visibleAt: 6 },
]

const labels: ThreeLabel[] = [
  ...axisLabels(v(0, 0, 0.35), [0.25, 0.25, 0.25]),
  pointLabel('a', 'A', A, [-12, 14]),
  pointLabel('b', 'B', B, [10, 12]),
  pointLabel('c', 'C', C, [8, -8]),
  { id: 'q', text: 'Q = 4 kN', at: move(Q, [0, 0, -1], 0.2), color: THREE_COLORS.load, size: 9, visibleAt: 2 },
  { id: 'g', text: 'G = 2 kN', at: move(G, [0, 0, -1], 0.18), color: THREE_COLORS.load, size: 9, visibleAt: 2 },
  {
    id: 'p',
    text: 'P = 8 kN',
    at: move(C, [-1, 0, 0], 0.24),
    color: THREE_COLORS.load,
    size: 9,
    anchor: 'end',
    visibleAt: 2,
  },
  { id: 'bx', text: 'B_x', at: move(B, [1, 0, 0], 0.18), color: THREE_COLORS.reaction, size: 9, visibleAt: 5 },
  { id: 'bz', text: 'B_z', at: move(B, [0, 0, 1], 0.22), color: THREE_COLORS.reaction, size: 9, visibleAt: 5 },
  { id: 'az', text: 'A_z', at: move(A, [0, 0, 1], 0.22), color: THREE_COLORS.reaction, size: 9, visibleAt: 6 },
]

const status = [
  'Trzy prostopadłe płytki: przegub A i łożysko B o osi y',
  'a = 0,20 m, b = 0,10 m, c = 0,30 m; R = r = 0,10 m',
  'Q = 4 kN w dół na mimośrodzie a, G = 2 kN, P = 8 kN w −x',
  'M_y: 0,20·4 − 0,10·P = 0  ⇒  P = 8,000 kN',
  'ΣM_x: −0,20·2 + 0,60·B_z = 0  ⇒  B_z = 0,667 kN',
  'ΣM_z: 0,60·B_x − 0,60·P = 0  ⇒  B_x = 8,000 kN',
  'A_x = A_y = 0; A_z = 5,333 kN; R_A = 5,333 kN, R_B = 8,028 kN',
  'Kontrola ΣF = 0 i ΣM_K = 0 dla K = (0; 0,10; 0) — reszty ≈ 0',
]

const spec: ThreeSceneSpec = {
  label: 'Przestrzenny układ trzech prostopadłych płytek z podporami i siłami',
  camera: { position: [1.1, -1.5, 1.1], target: [0.05, 0.3, 0.03], viewSize: 1.15 },
  primitives,
  labels,
  status,
  badges: [
    {
      fromIndex: 6,
      title: 'wyniki [kN]',
      value: 'R_A = 5,333',
      note: 'R_B = 8,028 · P = 8,000',
      x: 14,
      y: 42,
      width: 156,
    },
    { fromIndex: 7, value: 'ΣF = 0, ΣM_K = 0', note: 'K = (0; 0,10; 0) m', x: 292, y: 248, width: 152 },
  ],
}

export const SolutionAnimation = createThreeSceneAnimation(spec)
