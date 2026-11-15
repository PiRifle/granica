import type { ShaftSceneSpec } from '../../../components/solution-figures/shaft-three'
import { createShaftThreeAnimation } from '../../solution-factories/factory-shaft-three/animation'
import { THREE_COLORS, move, v } from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const C = v(0, 0.2, 0)
const L = v(0, 0.5, 0)
const B = v(0, 0.6, 0)
const P = v(0, 0.5, 0.15)
const Q = v(0.035355, 0.2, -0.035355)

const spec: ShaftSceneSpec = {
  label: 'Wał z dwiema tarczami, liną pod 45°, ciężarem i reakcjami łożysk',
  status: [
    'Wał wzdłuż y: łożysko A, tarcza C, duża tarcza i łożysko B',
    'a = 0,20 m, b = 0,30 m, c = 0,10 m; R = 0,15 m, r = 0,05 m',
    'G = 20 kN w dół, Q = 2 kN w dół pod 45°, P = 0,471 kN w −x',
    'Ramię P to R, a mimośród liny Q to r·cos45° — oba dają moment M_y',
    'ΣM_y: 0,05·cos45°·2 − 0,15P = 0  ⇒  P = 0,471 kN',
    'ΣM_x: B_z = 17,333 kN;  ΣM_z: B_x = 0,393 kN',
    'A_x = 0,079 kN, A_z = 4,667 kN, A_y = 0;  R_A = 4,667 kN, R_B = 17,338 kN',
    'Kontrola ΣF = 0 i ΣM_K = 0 dla K = (0; 0,30; 0) — reszty ≈ 0',
  ],
  start: A,
  end: B,
  discs: [
    { at: C, radius: 0.05, color: THREE_COLORS.pale, spin: 0.7 },
    { at: L, radius: 0.15, spin: 0.45 },
  ],
  points: [
    { id: 'a', text: 'A', at: A, offset: [-12, 14] },
    { id: 'b', text: 'B', at: B, offset: [10, -8] },
    { id: 'c', text: 'C', at: C, offset: [-12, -8] },
    { id: 'l', text: 'L', at: L, offset: [-12, 12] },
  ],
  dimensions: {
    points: [A, C, L, B],
    offset: [-0.18, 0, 0],
    labels: [
      { text: 'a = 0,20 m', at: v(0, 0.1, 0) },
      { text: 'b = 0,30 m', at: v(0, 0.35, 0) },
      { text: 'c = 0,10 m', at: v(0, 0.55, 0) },
    ],
  },
  arms: [
    { from: L, to: P },
    { from: C, to: Q },
  ],
  loads: [
    { from: L, to: move(L, [0, 0, -1], 0.22), text: 'G = 20 kN', visibleAt: 2 },
    { from: Q, to: move(Q, [0, 0, -1], 0.18), text: 'Q = 2 kN', visibleAt: 2 },
    { from: P, to: move(P, [-1, 0, 0], 0.2), text: 'P = 0,471 kN', visibleAt: 2, offset: [2, -22] },
  ],
  reactions: [
    { from: B, to: move(B, [1, 0, 0], 0.16), text: 'B_x', visibleAt: 5 },
    { from: B, to: move(B, [0, 0, 1], 0.22), text: 'B_z', visibleAt: 5 },
    { from: A, to: move(A, [1, 0, 0], 0.16), text: 'A_x', visibleAt: 6 },
    { from: A, to: move(A, [0, 0, 1], 0.22), text: 'A_z', visibleAt: 6 },
  ],
  results: { visibleAt: 6, title: 'Wyniki [kN]', lines: ['P = 0,471', 'R_A = 4,667', 'R_B = 17,338'] },
  checkPoint: 'K = (0; 0,30; 0) m',
}
export const SolutionAnimation = createShaftThreeAnimation(spec)
