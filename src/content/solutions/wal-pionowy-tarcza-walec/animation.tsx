import type { ShaftSceneSpec } from '../../../components/solution-figures/shaft-three'
import { createShaftThreeAnimation } from '../../solution-factories/factory-shaft-three/animation'
import { THREE_COLORS, move, v } from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const B = v(0, 0, 0.15)
const MID = v(0, 0, 0.35)
const D = v(0, 0, 0.75)
const Q = v(-0.2, 0, 0.75)
const T = v(0, 0.2, 0.75)
const SMALL_T = v(0.2, 0, 0.75)
const G = v(0, 0, 0.075)

const spec: ShaftSceneSpec = {
  label: 'Pionowy wał z poziomą tarczą, walcem, pasem, ciężarami i reakcjami przestrzennymi',
  status: [
    'Pionowy wał: przegub A w podstawie, walec o promieniu r i łożysko B, u góry tarcza R',
    'a = 0,20 m, b = 0,40 m, c = 0,15 m; R = 0,20 m, r = 0,10 m; H = c+a+b = 0,75 m',
    'Q = 4 kN i G = 3 kN w dół; pas t = 3 kN w +y i T = 6 kN pod 30°, szukana P = 2,196 kN',
    't daje +Rt, T daje −R·T·cos30°, a P daje +RP względem pionowej osi z',
    'ΣM_z: Rt − R·T cos30° + RP = 0  ⇒  P = 2,196 kN',
    'ΣM_y: 0,75·4 − 0,75·T sin30° + c·B_x = 0  ⇒  B_x = −20,647 kN',
    'ΣM_x: −0,75·t − 0,75·T sin30° + 0,75P + c·B_y = 0  ⇒  B_y = −19,019 kN',
    'ΣF_z: A_z = Q + G = 7,000 kN;  kontrola K = (0; 0; 0,30) m — reszty ≈ 0',
  ],
  start: A,
  end: D,
  bearingAt: B,
  axis: [0, 0, 1],
  discs: [{ at: D, radius: 0.2, spin: 0.5 }],
  points: [
    { id: 'a', text: 'A', at: A, offset: [-12, 14] },
    { id: 'b', text: 'B', at: B, offset: [10, 12] },
    { id: 'd', text: 'D', at: D, offset: [10, -8] },
  ],
  dimensions: {
    points: [A, B, MID, D],
    offset: [-0.3, 0, 0],
    labels: [
      { text: 'c = 0,15 m', at: v(0, 0, 0.075) },
      { text: 'a = 0,20 m', at: v(0, 0, 0.25) },
      { text: 'b = 0,40 m', at: v(0, 0, 0.55) },
    ],
  },
  extra: [
    {
      kind: 'disc',
      at: v(0, 0, 0.085),
      radius: 0.1,
      thickness: 0.13,
      axis: [0, 0, 1],
      color: THREE_COLORS.material,
    },
  ],
  arms: [
    { from: D, to: SMALL_T },
    { from: B, to: v(0.1, 0, 0.15) },
  ],
  loads: [
    { from: Q, to: move(Q, [0, 0, -1], 0.2), text: 'Q = 4 kN', visibleAt: 2, offset: [-7, 18] },
    { from: G, to: move(G, [0, 0, -1], 0.16), text: 'G = 3 kN', visibleAt: 2 },
    { from: SMALL_T, to: move(SMALL_T, [0, 1, 0], 0.22), text: 't = 3 kN', visibleAt: 2, offset: [-12, -14] },
    {
      from: T,
      to: move(T, [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6), 0], 0.24),
      text: 'T = 6 kN',
      visibleAt: 2,
      offset: [14, 16],
    },
    { from: Q, to: move(Q, [0, -1, 0], 0.22), text: 'P = 2,196 kN', visibleAt: 2, offset: [-6, 12] },
  ],
  reactions: [
    { from: B, to: move(B, [-1, 0, 0], 0.22), text: 'B_x', visibleAt: 5, offset: [-6, -5] },
    { from: B, to: move(B, [0, -1, 0], 0.22), text: 'B_y', visibleAt: 5 },
    { from: A, to: move(A, [1, 0, 0], 0.2), text: 'A_x', visibleAt: 6 },
    { from: A, to: move(A, [0, 1, 0], 0.2), text: 'A_y', visibleAt: 6 },
    { from: A, to: move(A, [0, 0, 1], 0.22), text: 'A_z', visibleAt: 6 },
  ],
  results: { visibleAt: 6, title: 'Wyniki [kN]', lines: ['P = 2,196', 'R_A = 22,787', 'R_B = 28,072'] },
  checkPoint: 'K = (0; 0; 0,30) m',
  camera: { position: [1.3, -1.7, 1.15], target: [0, 0, 0.35], viewSize: 1.25 },
}
export const SolutionAnimation = createShaftThreeAnimation(spec)
