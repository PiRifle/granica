import type { ShaftSceneSpec } from '../../../components/solution-figures/shaft-three'
import { createShaftThreeAnimation } from '../../solution-factories/factory-shaft-three/animation'
import { THREE_COLORS, move, v } from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const M = v(0, 0.3, 0)
const B = v(0, 0.7, 0)
const W = v(0, 0.9, 0)
const P = v(0, 0.3, 0.2)
const Q = v(0.15, 0.9, 0)

const pairLoads = (at: typeof A, suffix: string, visibleAt: number): ShaftSceneSpec['loads'] => [
  { from: move(at, [-0.2, 0, 0], 1), to: move(at, [-0.2, 0, -0.18], 1), text: `G${suffix}`, visibleAt },
  { from: move(at, [0.2, 0, 0], 1), to: move(at, [0.2, 0, 0.18], 1), text: `N${suffix}`, visibleAt },
]

const spec: ShaftSceneSpec = {
  label: 'Wał z dwiema tarczami tocznymi, mimośrodem delta, siłami G, N, Q, P i reakcjami',
  status: [
    'Dwie tarcze toczne o promieniu R, styk z mimośrodem δ, łożyska A i B',
    'a = 0,30 m, b = 0,40 m, c = 0,20 m; R = 0,20 m, r = 0,15 m, δ = 0,001 m',
    'Pary G–N = 3 kN, Q = 5 kN pod 30°, szukana siła P = 1,845 kN',
    'M_y: −2δG + r·Q·sin30° − R·P = 0  ⇒  P = 1,845 kN',
    'G–N się znoszą; ΣM_x: −0,9·Q·sin30° + 0,7·B_z = 0 ⇒ B_z = 3,214',
    'ΣM_z: −0,9·Q·cos30° + 0,3·P + 0,7·B_x = 0 ⇒ B_x = −4,777',
    'A_x = 2,291 kN, A_z = −0,714 kN, A_y = 0;  R_A = 2,400 kN, R_B = 5,757 kN',
    'Kontrola ΣF = 0 i ΣM_K = 0 dla K = (0; 0,10; 0,10) — reszty ≈ 0',
  ],
  start: A,
  end: W,
  bearingAt: B,
  discs: [
    { at: A, radius: 0.2, spin: 0.5 },
    { at: M, radius: 0.2, color: THREE_COLORS.pale, spin: -0.45 },
    { at: W, radius: 0.15, color: THREE_COLORS.pale, spin: -0.7 },
  ],
  points: [
    { id: 'a', text: 'A', at: A, offset: [-12, 14] },
    { id: 'b', text: 'B', at: B, offset: [10, 12] },
    { id: 'w', text: 'W', at: W, offset: [10, -8] },
  ],
  dimensions: {
    points: [A, M, B, W],
    offset: [-0.28, 0, 0],
    labels: [
      { text: 'a = 0,30 m', at: v(0, 0.15, 0) },
      { text: 'b = 0,40 m', at: v(0, 0.5, 0) },
      { text: 'c = 0,20 m', at: v(0, 0.8, 0) },
    ],
  },
  arms: [
    { from: M, to: P },
    { from: W, to: Q },
  ],
  loads: [
    ...pairLoads(A, '₁', 2),
    ...pairLoads(M, '₂', 2),
    {
      from: Q,
      to: move(Q, [Math.cos(Math.PI / 6), 0, -Math.sin(Math.PI / 6)], 0.2),
      text: 'Q = 5 kN',
      visibleAt: 2,
    },
    { from: P, to: move(P, [-1, 0, 0], 0.22), text: 'P = 1,845 kN', visibleAt: 2, offset: [-6, -5] },
  ],
  reactions: [
    { from: B, to: move(B, [-1, 0, 0], 0.2), visibleAt: 4 },
    { from: B, to: move(B, [0, 0, 1], 0.22), text: 'B_z', visibleAt: 4 },
    { from: A, to: move(A, [1, 0, 0], 0.18), text: 'A_x', visibleAt: 5 },
    { from: A, to: move(A, [0, 0, -1], 0.16), text: 'A_z', visibleAt: 5 },
  ],
  results: { visibleAt: 5, title: 'Wyniki [kN]', lines: ['P = 1,845', 'R_A = 2,400', 'R_B = 5,757'] },
  checkPoint: 'K = (0; 0,10; 0,10) m',
  camera: { position: [1.3, -1.9, 1.15], target: [0, 0.4, 0], viewSize: 1.4 },
}
export const SolutionAnimation = createShaftThreeAnimation(spec)
