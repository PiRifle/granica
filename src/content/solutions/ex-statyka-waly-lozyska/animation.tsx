import type { SolutionAnimationProps } from '../../../types'
import { ShaftThreeScene } from '../../../components/solution-figures/shaft-three'
import { THREE_COLORS, move, v } from '../../../components/solution-figures/three-statics'

const A = v(0, 0, 0)
const P = v(0.4, 0, 0)
const Q = v(0.6, 0, 0)
const B = v(1, 0, 0)

export function ShaftBearingsAnimation(props: SolutionAnimationProps) {
  return ShaftThreeScene(
    {
      label: 'Wał w łożyskach i reakcje w dwóch płaszczyznach',
      status: [
        'Wał wzdłuż osi x: łożysko wzdłużne A i poprzeczne B',
        'A_x = −4 kN — siłę osiową przejmuje łożysko A',
        'ΣM_A: B_z = 4 kN, B_y = −4,2 kN',
        'ΣF: A_y = −1,8 kN, A_z = 6 kN',
        'R_A = 6,26 kN, R_B = 5,80 kN',
        'M_x: 3 − 3 = 0; łożyska nie przenoszą skręcania',
      ],
      start: A,
      end: B,
      axis: [1, 0, 0],
      axisLengths: [0.3, 0.3, 0.3],
      discs: [
        { at: P, radius: 0.12, spin: 0.5 },
        { at: Q, radius: 0.1, color: THREE_COLORS.pale, spin: -0.5 },
      ],
      points: [
        { id: 'a', text: 'A', at: A, offset: [-12, 16] },
        { id: 'b', text: 'B', at: B, offset: [20, 30] },
      ],
      dimensions: {
        points: [A, P, Q, B],
        offset: [0, 0, -0.25],
        labels: [
          { text: '0,4 m', at: v(0.2, 0, 0) },
          { text: '0,3 m', at: v(0.5, 0, 0) },
          { text: '0,3 m', at: v(0.8, 0, 0) },
        ],
      },
      loads: [
        { from: P, to: move(P, [0, 0, -1], 0.28), text: 'P = 10 kN', visibleAt: 0, offset: [10, -14] },
        { from: Q, to: move(Q, [0, 1, 0], 0.24), text: 'Q = 6 kN', visibleAt: 0 },
        { from: P, to: move(P, [1, 0, 0], 0.22), text: 'H = 4 kN', visibleAt: 0 },
      ],
      reactions: [
        { from: A, to: move(A, [-1, 0, 0], 0.24), text: 'A_x = −4 kN', visibleAt: 1, offset: [-6, -5] },
        { from: B, to: move(B, [0, 0, 1], 0.26), text: 'B_z = 4 kN', visibleAt: 2 },
        { from: B, to: move(B, [0, -1, 0], 0.24), text: 'B_y = −4,2 kN', visibleAt: 2, offset: [14, -18] },
        { from: A, to: move(A, [0, -1, 0], 0.22), text: 'A_y = −1,8 kN', visibleAt: 3 },
        { from: A, to: move(A, [0, 0, 1], 0.28), text: 'A_z = 6 kN', visibleAt: 3 },
      ],
      extra: [
        { kind: 'ring', at: B, radius: 0.2, tube: 0.018, axis: [1, 0, 0], color: THREE_COLORS.moment, visibleAt: 5 },
      ],
      results: { visibleAt: 3, title: 'Wyniki [kN]', lines: ['R_A = 6,26', 'R_B = 5,80', 'M_x = 0'] },
      checkPoint: 'ΣF = 0, ΣM = 0',
      camera: { position: [1.6, -1.8, 1.3], target: [0.5, 0, 0], viewSize: 1.7 },
    },
    props,
  )
}
