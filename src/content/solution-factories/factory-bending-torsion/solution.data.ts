import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createBendingTorsionSolution, deriveBendingTorsion, exampleBendingTorsionInputs, pl } from './factory'
import { BendingTorsionExampleAnimation } from './animation'

const example = deriveBendingTorsion(exampleBendingTorsionInputs)

export default {
  ...createBendingTorsionSolution({
    id: 'example-bending-torsion',
    title: 'Przykład fabryczny: rura L zginana i skręcana — dobór wg HMH',
    duration: 12,
    given: [
      `P = ${pl(exampleBendingTorsionInputs.p, 0)} kN, a = ${pl(exampleBendingTorsionInputs.a, 2)} m, b = ${pl(exampleBendingTorsionInputs.b, 2)} m`,
      `k_g = ${pl(exampleBendingTorsionInputs.kg, 0)} MPa, d = ${pl(exampleBendingTorsionInputs.d, 0)} mm`,
    ],
    result: `M_eq = ${pl(example.meq, 4)} kN·m, d_min = ${pl(example.dMin, 2)} mm, σ_HMH = ${example.sigmaHmhText} MPa`,
  }),
  animation: BendingTorsionExampleAnimation,
  scenes: [
    {
      title: 'Przykład',
      narration: 'Przykładowa scena fabryczna.',
      formula: 'M_{\\mathrm{eq}}=\\sqrt{M_g^2+0{,}75M_s^2}',
      caption: 'Meta przykładowa.',
      visual: 'diagram',
      focus: { metric: 'model' },
    },
  ] satisfies SolutionScene[],
} satisfies SolutionData
