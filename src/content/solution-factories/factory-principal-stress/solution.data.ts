import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createPrincipalStressSolution, derivePrincipalStress, examplePrincipalStressInputs, pl } from './factory'
import { PrincipalStressExampleAnimation } from './animation'

const example = derivePrincipalStress(examplePrincipalStressInputs)

export default {
  ...createPrincipalStressSolution({
    id: 'example-principal-stress',
    title: 'Przykład fabryczny: płaski stan naprężenia i naprężenia główne',
    duration: 12,
    given: [
      `σx = ${pl(examplePrincipalStressInputs.sigmaX, 0)} MPa`,
      `σy = ${pl(examplePrincipalStressInputs.sigmaY, 0)} MPa`,
      `τxy = ${pl(examplePrincipalStressInputs.tauXY, 0)} MPa`,
    ],
    result: `σ1 = ${pl(example.sigma1, 2)} MPa, σ2 = ${pl(example.sigma2, 2)} MPa, τmax = ${pl(example.tauMax, 2)} MPa`,
  }),
  animation: PrincipalStressExampleAnimation,
  scenes: [
    {
      title: 'Przykład',
      narration: 'Przykładowa scena fabryczna.',
      formula: '\\sigma_1=\\sigma_{\\text{śr}}+R',
      caption: 'Meta przykładowa.',
      visual: 'diagram',
      focus: { metric: 'model' },
    },
  ] satisfies SolutionScene[],
} satisfies SolutionData
