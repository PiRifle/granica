import type { ComponentType } from 'react'
import type { SolutionAnimationProps } from '../../../types'
import { ShaftThreeScene, type ShaftSceneSpec } from '../../../components/solution-figures/shaft-three'
import { move, v } from '../../../components/solution-figures/three-statics'

export function createShaftThreeAnimation(spec: ShaftSceneSpec): ComponentType<SolutionAnimationProps> {
  return function ShaftThreeAnimation(props: SolutionAnimationProps) {
    return ShaftThreeScene(spec, props)
  }
}

const EXAMPLE_A = v(0, 0, 0)
const EXAMPLE_B = v(0, 0.7, 0)
const EXAMPLE_DISC = v(0, 0.3, 0)

const exampleSpec: ShaftSceneSpec = {
  label: 'Przykładowy wał z jedną tarczą, ciężarem i siłą równoważącą',
  status: [
    'Wał wzdłuż y: przegub A, tarcza i łożysko B',
    'R = 0,20 m, a = 0,30 m, b = 0,40 m',
    'G = 10 kN w dół, szukana siła P = 5,000 kN',
    'M_y: R·P − R·G/2 = 0  ⇒  P = 5,000 kN',
    'Reakcje łożysk z rzutów i momentów',
    'Wyniki przykładowe',
    'Wypadkowe reakcje',
    'Kontrola ΣF = 0 i ΣM_K = 0 — reszty ≈ 0',
  ],
  start: EXAMPLE_A,
  end: EXAMPLE_B,
  discs: [{ at: EXAMPLE_DISC, radius: 0.2, spin: 0.5 }],
  points: [
    { id: 'a', text: 'A', at: EXAMPLE_A, offset: [-12, 14] },
    { id: 'b', text: 'B', at: EXAMPLE_B, offset: [10, -8] },
  ],
  loads: [
    { from: EXAMPLE_DISC, to: move(EXAMPLE_DISC, [0, 0, -1], 0.2), text: 'G = 10 kN', visibleAt: 2 },
    { from: move(EXAMPLE_DISC, [0.2, 0, 0], 1), to: move(EXAMPLE_DISC, [0.36, 0, 0], 1), text: 'P', visibleAt: 2 },
  ],
  reactions: [
    { from: EXAMPLE_B, to: move(EXAMPLE_B, [0, 0, 1], 0.2), text: 'B_z', visibleAt: 4 },
    { from: EXAMPLE_A, to: move(EXAMPLE_A, [0, 0, 1], 0.18), text: 'A_z', visibleAt: 5 },
  ],
  results: { visibleAt: 5, title: 'Wyniki [kN]', lines: ['P = 5,000'] },
  checkPoint: 'K = (0; 0,30; 0) m',
  camera: { position: [1.2, -1.6, 1.05], target: [0, 0.35, 0], viewSize: 1.3 },
}

export const ShaftThreeExampleAnimation = createShaftThreeAnimation(exampleSpec)
