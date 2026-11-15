import type { ShaftSceneSpec } from '../../../components/solution-figures/shaft-three'
import { createShaftThreeAnimation } from '../../solution-factories/factory-shaft-three/animation'
import { THREE_COLORS, move, v } from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const B = v(0, 4, 0)
const C1 = v(0, 1, 0)
const C2 = v(0, 3, 0)
const R1 = v(0.5 * Math.cos(Math.PI / 6), 1, 0.5 * Math.sin(Math.PI / 6))
const R2 = v(0.5, 3, 0)
const DP = v(Math.cos(Math.PI / 3), 0, Math.sin(Math.PI / 3))
const DF = v(Math.cos(Math.PI / 3), 0, -Math.sin(Math.PI / 3))

const spec: ShaftSceneSpec = {
  label: 'Trójwymiarowy wał w łożyskach A i B z siłami P i F oraz reakcjami',
  status: [
    'Wał wzdłuż y: łożyska A i B, przekroje robocze w y = a i y = 3a',
    'a = 1 m, l = 0,5 m; B w odległości 4a od A',
    'P = 10 kN i szukana F działają w przekrojach prostopadłych do osi wału',
    'ΣM_y: F = P·sin(β−α)/sinβ = P/√3 = 5,773 kN',
    'ΣM_x: R_Bz = 3,415 kN;  ΣM_z: R_Bx = −0,915 kN',
    'ΣF_x: R_Ax = 3,028 kN;  ΣF_z: R_Az = 10,245 kN',
    'R_A = 10,683 kN, R_B = 3,535 kN; znaki według osi x, z',
    'Kontrola: ΣF_x = ΣF_z = 0 oraz ΣM_x = ΣM_z = 0',
  ],
  start: A,
  end: B,
  axisLengths: [0.7, 0.7, 0.7],
  discs: [
    { at: C1, radius: 0.5, spin: 0.35 },
    { at: C2, radius: 0.5, color: THREE_COLORS.pale, spin: 0.35 },
  ],
  points: [
    { id: 'a', text: 'A', at: A, offset: [-14, 14] },
    { id: 'b', text: 'B', at: B, offset: [12, -8] },
  ],
  dimensions: {
    points: [A, C1, C2, B],
    offset: [-0.75, 0, 0],
    labels: [
      { text: 'a', at: v(0, 0.5, 0) },
      { text: '2a', at: v(0, 2, 0) },
      { text: 'a', at: v(0, 3.5, 0) },
    ],
  },
  arms: [
    { from: C1, to: R1, visibleAt: 1 },
    { from: C2, to: R2, visibleAt: 1 },
  ],
  loads: [
    { from: R1, to: move(R1, DP, 0.8), text: 'P = 10 kN', visibleAt: 2 },
    { from: R2, to: move(R2, DF, 0.8), text: 'F = 5,773 kN', visibleAt: 2 },
  ],
  reactions: [
    { from: B, to: move(B, [1, 0, 0], 0.65), text: 'R_Bx', visibleAt: 4 },
    { from: B, to: move(B, [0, 0, 1], 0.75), text: 'R_Bz', visibleAt: 4 },
    { from: A, to: move(A, [1, 0, 0], 0.65), text: 'R_Ax', visibleAt: 5 },
    { from: A, to: move(A, [0, 0, 1], 0.75), text: 'R_Az', visibleAt: 5 },
  ],
  results: { visibleAt: 3, title: 'Wyniki [kN]', lines: ['F = 5,773', 'R_A = 10,683', 'R_B = 3,535'] },
  checkPoint: 'ΣF_x = ΣF_z = ΣM_x = ΣM_z = 0',
  camera: { position: [5, -6, 4], target: [0, 2, 0], viewSize: 5.4 },
}
export const SolutionAnimation = createShaftThreeAnimation(spec)
