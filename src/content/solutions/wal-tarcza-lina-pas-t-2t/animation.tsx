import type { ShaftSceneSpec } from '../../../components/solution-figures/shaft-three'
import { createShaftThreeAnimation } from '../../solution-factories/factory-shaft-three/animation'
import { THREE_COLORS, move, v } from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const B = v(0, 0.3, 0)
const S = v(0, 0.9, 0)
const Q = v(0.2 * Math.SQRT1_2, 0, 0.2 * Math.SQRT1_2)
const P = v(0.2, 0, 0)
const TOP = v(0, 0.9, 0.1)
const BOTTOM = v(0, 0.9, -0.1)

const spec: ShaftSceneSpec = {
  label: 'Wał z dużą tarczą, liną pod 45 stopni, pasem T = 2t i reakcjami przestrzennymi',
  status: [
    'Wał wzdłuż y: duża tarcza R przy A, łożysko B i mała tarcza pasa r na końcu',
    'a = 0,30 m, b = 0,40 m, c = 0,20 m; R = 0,20 m, r = 0,10 m; T = 2t',
    'G = 2 kN w dół, Q = 1 kN pod 45°, pas t = 2 kN i T = 4 kN pod 30°, P = 0,268 kN',
    'Q daje +RQ, pas daje +rt − rT cos30°, a P — moment −RP względem osi y',
    'ΣM_y: RQ + rt − rT cos30° − RP = 0  ⇒  P = 0,268 kN',
    'ΣM_x: (a+b+c)T sin30° + aB_z = 0  ⇒  B_z = −6,000 kN',
    'ΣM_z: −(a+b+c)(t + T cos30°) − aB_x = 0  ⇒  B_x = −16,392 kN',
    'A_x = 10,221 kN, A_z = 6,439 kN, A_y = 0;  kontrola K = (0; 0,20; 0,10) m',
  ],
  start: A,
  end: S,
  bearingAt: B,
  discs: [
    { at: A, radius: 0.2, spin: 0.5 },
    { at: S, radius: 0.1, color: THREE_COLORS.pale, spin: -0.7 },
  ],
  points: [
    { id: 'a', text: 'A', at: A, offset: [-12, 14] },
    { id: 'b', text: 'B', at: B, offset: [12, 14] },
    { id: 's', text: 'S', at: S, offset: [10, -8] },
  ],
  dimensions: {
    points: [A, B, v(0, 0.7, 0), S],
    offset: [-0.28, 0, 0],
    labels: [
      { text: 'a = 0,30 m', at: v(0, 0.15, 0) },
      { text: 'b = 0,40 m', at: v(0, 0.5, 0) },
      { text: 'c = 0,20 m', at: v(0, 0.8, 0) },
    ],
  },
  arms: [
    { from: A, to: v(0.2, 0, 0) },
    { from: S, to: TOP },
    { from: S, to: BOTTOM },
  ],
  loads: [
    { from: A, to: move(A, [0, 0, -1], 0.18), text: 'G = 2 kN', visibleAt: 2 },
    { from: Q, to: move(Q, [Math.SQRT1_2, 0, -Math.SQRT1_2], 0.2), text: 'Q = 1 kN', visibleAt: 2 },
    { from: P, to: move(P, [0, 0, 1], 0.2), text: 'P = 0,268 kN', visibleAt: 2 },
    { from: TOP, to: move(TOP, [1, 0, 0], 0.2), text: 't = 2 kN', visibleAt: 2 },
    {
      from: BOTTOM,
      to: move(BOTTOM, [Math.cos(Math.PI / 6), 0, Math.sin(Math.PI / 6)], 0.22),
      text: 'T = 4 kN',
      visibleAt: 2,
    },
  ],
  reactions: [
    { from: B, to: move(B, [-1, 0, 0], 0.22), text: 'B_x', visibleAt: 5, offset: [-6, -5] },
    { from: B, to: move(B, [0, 0, -1], 0.2), text: 'B_z', visibleAt: 5 },
    { from: A, to: move(A, [1, 0, 0], 0.2), text: 'A_x', visibleAt: 6 },
    { from: A, to: move(A, [0, 0, 1], 0.22), text: 'A_z', visibleAt: 6 },
  ],
  results: { visibleAt: 6, title: 'Wyniki [kN]', lines: ['P = 0,268', 'R_A = 12,080', 'R_B = 17,456'] },
  checkPoint: 'K = (0; 0,20; 0,10) m',
  camera: { position: [1.3, -1.9, 1.1], target: [0, 0.4, 0], viewSize: 1.4 },
}
export const SolutionAnimation = createShaftThreeAnimation(spec)
