import type { ShaftSceneSpec } from '../../../components/solution-figures/shaft-three'
import { createShaftThreeAnimation } from '../../solution-factories/factory-shaft-three/animation'
import { THREE_COLORS, move, v } from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const G = v(0, 0.2, 0)
const M = v(0, 0.4, 0)
const B = v(0, 0.6, 0)
const W = v(0, 0.7, 0)
const P = v(0.1, 0.4, 0.1)
const Q = v(0.2, 0.7, 0)

const spec: ShaftSceneSpec = {
  label: 'Wał z dwiema tarczami pasowymi, naciągami T i t, siłami G, Q, P i reakcjami',
  status: [
    'Wał wzdłuż y: lewa tarcza pasa R, mała tarcza r z siłą P, prawa tarcza c z Q',
    'a = 0,40 m, b = 0,30 m, c = 0,20 m; R = 0,20 m, r = 0,10 m; T = 2t',
    'T = 4 kN, t = 2 kN, G = 2 kN, Q = 1 kN, szukana siła P = 2,000 kN',
    'M_y: −R·t + c·Q + r·P = 0  ⇒  P = 2,000 kN',
    'ΣM_x: −0,20·G − 0,70·Q − 0,40·P + 0,60·B_z = 0 ⇒ B_z = 3,167',
    'ΣM_z: 0,60·B_x = 0 ⇒ B_x = 0;  ΣF_y: A_y = 0',
    'A_x = 0, A_z = 7,833 kN;  R_A = 7,833 kN, R_B = 3,167 kN',
    'Kontrola ΣF = 0 i ΣM_K = 0 dla K = (0; 0,10; 0,10) — reszty ≈ 0',
  ],
  start: A,
  end: W,
  bearingAt: B,
  discs: [
    { at: A, radius: 0.2, spin: 0.5 },
    { at: M, radius: 0.1, color: THREE_COLORS.pale, spin: -0.8 },
    { at: W, radius: 0.2, spin: -0.45 },
  ],
  points: [
    { id: 'a', text: 'A', at: A, offset: [-15, -10] },
    { id: 'b', text: 'B', at: B, offset: [10, 12] },
    { id: 'w', text: 'W', at: W, offset: [10, -8] },
  ],
  dimensions: {
    points: [A, M, W],
    offset: [-0.28, 0, 0],
    labels: [
      { text: 'a = 0,40 m', at: v(0, 0.2, 0) },
      { text: 'b = 0,30 m', at: v(0, 0.55, 0) },
    ],
  },
  arms: [
    { from: A, to: v(-0.2, 0, 0) },
    { from: M, to: P },
    { from: W, to: Q },
  ],
  loads: [
    { from: v(-0.2, 0, 0), to: v(-0.2, 0, -0.18), text: 'T = 4 kN', visibleAt: 2 },
    { from: v(0.2, 0, 0), to: v(0.2, 0, -0.18), text: 't = 2 kN', visibleAt: 2 },
    { from: G, to: move(G, [0, 0, -1], 0.18), text: 'G = 2 kN', visibleAt: 2 },
    { from: Q, to: move(Q, [0, 0, -1], 0.18), text: 'Q = 1 kN', visibleAt: 2 },
    { from: P, to: move(P, [0, 0, -1], 0.18), text: 'P = 2 kN', visibleAt: 2 },
  ],
  reactions: [
    { from: B, to: move(B, [0, 0, 1], 0.22), text: 'B_z', visibleAt: 4 },
    { from: A, to: move(A, [0, 0, 1], 0.24), text: 'A_z', visibleAt: 5 },
  ],
  results: { visibleAt: 5, title: 'Wyniki [kN]', lines: ['P = 2,000', 'R_A = 7,833', 'R_B = 3,167'] },
  checkPoint: 'K = (0; 0,10; 0,10) m',
  camera: { position: [1.3, -1.8, 1.1], target: [0, 0.35, 0], viewSize: 1.35 },
}
export const SolutionAnimation = createShaftThreeAnimation(spec)
