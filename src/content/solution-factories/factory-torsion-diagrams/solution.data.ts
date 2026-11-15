import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createTorsionDiagramsSolution, deriveTorsionDiagrams, exampleTorsionDiagramsInputs, pl } from './factory'
import { TorsionDiagramsExampleAnimation } from './animation'

const example = deriveTorsionDiagrams(exampleTorsionDiagramsInputs)

export default {
  ...createTorsionDiagramsSolution({
    id: 'example-torsion-diagrams',
    title: 'Przykład fabryczny: wał skręcany — wykres momentu i naprężenia',
    duration: 12,
    given: [
      `momenty: ${exampleTorsionDiagramsInputs.applied.map((entry) => `${entry.label} = ${pl(entry.moment, 0)}`).join(', ')} kN·m`,
      `d = ${pl(exampleTorsionDiagramsInputs.d, 0)} mm, l = ${pl(exampleTorsionDiagramsInputs.segmentLength, 1)} m, G = ${pl(exampleTorsionDiagramsInputs.shearModulus / 1000, 0)} GPa`,
    ],
    result: `M₀ = ${pl(example.balancing, 0)} kN·m, τmax = ${pl(Math.max(...example.stresses), 1)} MPa, φ = ${pl(example.totalTwist, 4)} rad`,
  }),
  animation: TorsionDiagramsExampleAnimation,
  scenes: [
    {
      title: 'Przykład',
      narration: 'Przykładowa scena fabryczna.',
      formula: '\\tau_{\\max}=|M_s|/W_0',
      caption: 'Meta przykładowa.',
      visual: 'diagram',
      focus: { metric: 'model' },
    },
  ] satisfies SolutionScene[],
} satisfies SolutionData
