import type { ShaftSceneSpec } from '../../../components/solution-figures/shaft-three'
import { createShaftThreeAnimation } from '../../solution-factories/factory-shaft-three/animation'
import { THREE_COLORS, move, v } from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const M = v(0, 0.2, 0)
const B = v(0, 0.35, 0)
const E = v(0, 0.45, 0)
const C = v(0, 0.45, 0.4)
const D = v(0, 0.6, -0.3)
const Q = v(0.3 * Math.SQRT1_2, 0.2, 0.3 * Math.SQRT1_2)

const spec: ShaftSceneSpec = {
  label: 'Wał z tarczą, liną pod 45 stopni, ramą CD i reakcjami przestrzennymi',
  status: [
    'Wał wzdłuż y: tarcza o promieniu R przy A, łożysko B i rama CD na końcu wału',
    'a = 0,20 m, b = 0,15 m, c = 0,10 m; R = 0,30 m, r = 0,40 m',
    'G = 3 kN w dół, Q = 5 kN stycznie pod 45°, szukana P = 3,750 kN w −x',
    'Q daje moment +RQ względem y, a P — moment −rP; ramię r to wysokość ramy CD',
    'ΣM_y: RQ − rP = 0  ⇒  P = 3,750 kN',
    'ΣM_x: −aG − aQ cos45° + bB_z = 0  ⇒  B_z = 3,735 kN',
    'ΣM_z: −aQ sin45° + (a+b+c)P − bB_x = 0  ⇒  B_x = 2,801 kN',
    'A_x = −2,587 kN, A_z = 2,801 kN, A_y = 0;  kontrola K = (0; 0,30; 0,10) m',
  ],
  start: A,
  end: E,
  bearingAt: B,
  discs: [{ at: M, radius: 0.3, spin: 0.45 }],
  points: [
    { id: 'a', text: 'A', at: A, offset: [-12, 14] },
    { id: 'b', text: 'B', at: B, offset: [10, -8] },
    { id: 'c', text: 'C', at: C, offset: [10, -8] },
    { id: 'd', text: 'D', at: D, offset: [10, 12] },
  ],
  dimensions: {
    points: [A, M, B, E],
    offset: [-0.36, 0, 0],
    labels: [
      { text: 'a = 0,20 m', at: v(0, 0.1, 0) },
      { text: 'b = 0,15 · c = 0,10 m', at: v(0, 0.35, 0) },
    ],
  },
  extra: [
    { kind: 'rod', from: E, to: C, radius: 0.025, color: THREE_COLORS.member },
    { kind: 'rod', from: C, to: D, radius: 0.025, color: THREE_COLORS.member },
    { kind: 'rod', from: D, to: E, radius: 0.025, color: THREE_COLORS.member },
  ],
  arms: [
    { from: M, to: v(0.3, 0.2, 0) },
    { from: E, to: C },
  ],
  loads: [
    { from: M, to: move(M, [0, 0, -1], 0.22), text: 'G = 3 kN', visibleAt: 2, offset: [6, 30] },
    {
      from: Q,
      to: move(Q, [Math.SQRT1_2, 0, -Math.SQRT1_2], 0.22),
      text: 'Q = 5 kN',
      visibleAt: 2,
      offset: [12, 18],
    },
    { from: C, to: move(C, [-1, 0, 0], 0.24), text: 'P', visibleAt: 2, offset: [-18, -20] },
  ],
  reactions: [
    { from: B, to: move(B, [1, 0, 0], 0.2), text: 'B_x', visibleAt: 5 },
    { from: B, to: move(B, [0, 0, 1], 0.22), text: 'B_z', visibleAt: 5 },
    { from: A, to: move(A, [-1, 0, 0], 0.2), text: 'A_x', visibleAt: 6, offset: [-6, -5] },
    { from: A, to: move(A, [0, 0, 1], 0.22), text: 'A_z', visibleAt: 6 },
  ],
  results: { visibleAt: 6, title: 'Wyniki [kN]', lines: ['P = 3,750', 'R_A = 3,813', 'R_B = 4,668'] },
  checkPoint: 'K = (0; 0,30; 0,10) m',
  camera: { position: [1.25, -1.5, 1.1], target: [0, 0.3, 0.05], viewSize: 1.35 },
}
export const SolutionAnimation = createShaftThreeAnimation(spec)
