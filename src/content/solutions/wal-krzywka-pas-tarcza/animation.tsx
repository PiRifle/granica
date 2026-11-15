import type { ShaftSceneSpec } from '../../../components/solution-figures/shaft-three'
import { createShaftThreeAnimation } from '../../solution-factories/factory-shaft-three/animation'
import { THREE_COLORS, move, v } from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const G = v(0, 0.3, 0)
const M = v(0, 0.5, 0)
const B = v(0, 0.9, 0)
const P = v(0.1, 0, 0)
const Q = v(0, 0.5, 0.1)

const spec: ShaftSceneSpec = {
  label: 'Wał z krzywką, tarczą pasową, siłami G, Q i P oraz reakcjami łożysk',
  status: [
    'Wał wzdłuż y: lewa krzywka R przy A, prawa tarcza r, łożysko B',
    'a = 0,30 m, b = 0,20 m, c = 0,40 m; R = 0,15 m, r = 0,10 m',
    'G = 2 kN w dół, Q = 3 kN w −x stycznie, P = 3 kN w dół na mimośrodzie r',
    'M_y: −r·Q + r·P = 0  ⇒  P = Q = 3,000 kN',
    'ΣM_x: −0,30·G + 0,90·B_z = 0  ⇒  B_z = 0,667 kN',
    'ΣM_z: 0,90·B_x − 0,50·Q = 0  ⇒  B_x = 1,667 kN',
    'A_x = 1,333 kN, A_z = 4,333 kN, A_y = 0;  R_A = 4,534 kN, R_B = 1,795 kN',
    'Kontrola ΣF = 0 i ΣM_K = 0 dla K = (0; 0,20; 0) — reszty ≈ 0',
  ],
  start: A,
  end: B,
  discs: [
    { at: A, radius: 0.15, spin: 0.5 },
    { at: M, radius: 0.1, color: THREE_COLORS.pale, spin: -0.7 },
  ],
  points: [
    { id: 'a', text: 'A', at: A, offset: [-12, 14] },
    { id: 'b', text: 'B', at: B, offset: [10, -8] },
  ],
  dimensions: {
    points: [A, G, M, B],
    offset: [-0.22, 0, 0],
    labels: [
      { text: 'a = 0,30 m', at: v(0, 0.15, 0) },
      { text: 'b = 0,20 m', at: v(0, 0.4, 0) },
      { text: 'c = 0,40 m', at: v(0, 0.7, 0) },
    ],
  },
  arms: [
    { from: A, to: v(0, 0, 0.15) },
    { from: M, to: Q },
  ],
  loads: [
    { from: G, to: move(G, [0, 0, -1], 0.2), text: 'G = 2 kN', visibleAt: 2 },
    { from: Q, to: move(Q, [-1, 0, 0], 0.2), text: 'Q = 3 kN', visibleAt: 2, offset: [-6, -5] },
    { from: P, to: move(P, [0, 0, -1], 0.2), text: 'P = 3 kN', visibleAt: 2 },
  ],
  reactions: [
    { from: B, to: move(B, [1, 0, 0], 0.16), text: 'B_x', visibleAt: 4 },
    { from: B, to: move(B, [0, 0, 1], 0.22), text: 'B_z', visibleAt: 4 },
    { from: A, to: move(A, [1, 0, 0], 0.16), text: 'A_x', visibleAt: 5 },
    { from: A, to: move(A, [0, 0, 1], 0.22), text: 'A_z', visibleAt: 5 },
  ],
  results: { visibleAt: 5, title: 'Wyniki [kN]', lines: ['R_A = 4,534', 'R_B = 1,795'] },
  checkPoint: 'K = (0; 0,20; 0) m',
  camera: { position: [1.3, -1.8, 1.1], target: [0, 0.4, 0], viewSize: 1.35 },
}
export const SolutionAnimation = createShaftThreeAnimation(spec)
