import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import {
  createConfinedCompressionSolution,
  deriveConfinedCompression,
  exampleConfinedCompressionInputs,
  pl,
  plGroup,
} from './factory'
import { ConfinedCompressionExampleAnimation } from './animation'

const example = deriveConfinedCompression(exampleConfinedCompressionInputs)

export default {
  ...createConfinedCompressionSolution({
    id: 'example-confined-compression',
    title: 'Przykład fabryczny: prostopadłościan ściskany między sztywnymi ścianami',
    duration: 11,
    given: [
      `a = ${pl(exampleConfinedCompressionInputs.a, 0)} mm, b = ${pl(exampleConfinedCompressionInputs.b, 0)} mm, g = ${pl(exampleConfinedCompressionInputs.g, 0)} mm`,
      `P = ${pl(exampleConfinedCompressionInputs.p, 0)} kN, ν = ${pl(exampleConfinedCompressionInputs.nu, 2)}, E = ${plGroup(exampleConfinedCompressionInputs.e / 1000)} GPa`,
    ],
    result: `σ_x = ${pl(example.sigmaX, 2)} MPa, σ_y = ${pl(example.sigmaY, 2)} MPa, σ_z = ${pl(example.sigmaZ, 2)} MPa`,
  }),
  animation: ConfinedCompressionExampleAnimation,
  scenes: [
    {
      title: 'Przykład',
      narration: 'Przykładowa scena fabryczna.',
      formula: '\\sigma_z=\\nu(\\sigma_x+\\sigma_y)',
      caption: 'Meta przykładowa.',
      visual: 'cube',
      focus: { metric: 'model' },
    },
  ] satisfies SolutionScene[],
} satisfies SolutionData
