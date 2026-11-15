import type { ShaftSceneSpec } from '../../../components/solution-figures/shaft-three'
import { createShaftThreeAnimation } from '../../solution-factories/factory-shaft-three/animation'
import { THREE_COLORS, move, v } from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const B = v(0, 0.3, 0)
const YB = v(0, 0.4, 0)
const W = v(0, 0.45, 0)
const P = v(0.06, 0, 0)
const TOP = v(0, 0.45, 0.18)
const BOTTOM = v(0, 0.45, -0.18)

const spec: ShaftSceneSpec = {
  label: 'Wał z krzywką, tarczą pasa, siłami G, P, naciągami t i T oraz reakcjami łożysk',
  status: [
    'Wał wzdłuż y: krzywka przy A, pas na tarczy o promieniu R, łożysko B',
    'a = 0,30 m, b = 0,10 m, c = 0,05 m; R = 0,18 m, r = 0,06 m',
    'G = 1 kN w dół, pas t = 1,5 kN i T = 3 kN w +x, szukana P = 4,500 kN w dół',
    'Ramię pasa to R, a mimośród siły P to r; oba dają moment względem osi y',
    'ΣM_y: R(t − T) + rP = 0  ⇒  P = 4,500 kN',
    'ΣM_x: B_z = 0;  ΣM_z: −y_W(t + T) − aB_x = 0  ⇒  B_x = −6,750 kN',
    'A_x = 2,250 kN, A_z = 5,500 kN, A_y = 0;  R_A = 5,942 kN, R_B = 6,750 kN',
    'Kontrola ΣF = 0 i ΣM_K = 0 dla K = (0; 0,20; 0,10) m — reszty ≈ 0',
  ],
  start: A,
  end: W,
  bearingAt: B,
  discs: [
    { at: A, radius: 0.06, color: THREE_COLORS.pale, spin: -0.8 },
    { at: W, radius: 0.18, spin: 0.5 },
  ],
  points: [
    { id: 'a', text: 'A', at: A, offset: [-12, 14] },
    { id: 'b', text: 'B', at: B, offset: [10, -8] },
    { id: 'w', text: 'W', at: W, offset: [10, -8] },
  ],
  dimensions: {
    points: [A, B, YB, W],
    offset: [-0.25, 0, 0],
    labels: [
      { text: 'a = 0,30 m', at: v(0, 0.15, 0) },
      { text: 'b = 0,10 · c = 0,05 m', at: v(0, 0.375, 0) },
    ],
  },
  arms: [
    { from: A, to: P },
    { from: W, to: TOP },
    { from: W, to: BOTTOM },
  ],
  loads: [
    { from: A, to: move(A, [0, 0, -1], 0.18), text: 'G = 1 kN', visibleAt: 2, offset: [-12, 18] },
    { from: P, to: move(P, [0, 0, -1], 0.2), text: 'P = 4,5 kN', visibleAt: 2, offset: [12, -14] },
    { from: TOP, to: move(TOP, [1, 0, 0], 0.2), text: 't = 1,5 kN', visibleAt: 2 },
    { from: BOTTOM, to: move(BOTTOM, [1, 0, 0], 0.2), text: 'T = 3 kN', visibleAt: 2 },
  ],
  reactions: [
    { from: B, to: move(B, [-1, 0, 0], 0.22), text: 'B_x', visibleAt: 5, offset: [-6, -5] },
    { from: A, to: move(A, [1, 0, 0], 0.18), text: 'A_x', visibleAt: 6 },
    { from: A, to: move(A, [0, 0, 1], 0.22), text: 'A_z', visibleAt: 6 },
  ],
  results: { visibleAt: 6, title: 'Wyniki [kN]', lines: ['P = 4,500', 'R_A = 5,942', 'R_B = 6,750'] },
  checkPoint: 'K = (0; 0,20; 0,10) m',
  camera: { position: [1.2, -1.5, 1], target: [0, 0.22, 0], viewSize: 1.15 },
}
export const SolutionAnimation = createShaftThreeAnimation(spec)
