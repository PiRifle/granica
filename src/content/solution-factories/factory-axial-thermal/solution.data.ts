import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution, deriveHollowTube, pl, type HollowTubeInputs } from './factory'
import { createHollowTubeAnimation } from './animation'

export const exampleHollowTubeInputs: HollowTubeInputs = { d: 100, p: 400, sigmaDop: 120 }

const example = deriveHollowTube(exampleHollowTubeInputs)

const scenes: SolutionScene[] = [
  {
    title: '1. Model rury i obciążenie',
    narration:
      'Przykład fabryczny: rura rozciągana osiowo siłą P. Średnica wewnętrzna d jest znana, średnica zewnętrzna D jest szukana. Warunek wytrzymałości σ = P/A ≤ σ_dop prowadzi do pierwiastka z kwadratowej nierówności na D.',
    formula: `d=${pl(exampleHollowTubeInputs.d, 0)}\\ \\mathrm{mm}\\qquad P=${pl(exampleHollowTubeInputs.p, 0)}\\ \\mathrm{kN}\\qquad \\sigma_{\\mathrm{dop}}=${pl(exampleHollowTubeInputs.sigmaDop, 0)}\\ \\mathrm{MPa}`,
    caption: 'Przekrój pierścieniowy rury z zaznaczoną średnicą wewnętrzną d i szukaną średnicą zewnętrzną D.',
    visual: 'axial',
    focus: { metric: 'model' },
  },
  {
    title: '2. Dobór i kontrola średnicy',
    narration: `Wymagane pole to ${pl(example.areaRequired, 1)} mm², stąd D ≥ ${pl(example.dRequired, 2)} mm; przyjęto D = ${pl(example.dAdopted, 0)} mm. Pole wynosi wtedy ${pl(example.area, 2)} mm², a naprężenie ${pl(example.sigma, 2)} MPa < ${pl(exampleHollowTubeInputs.sigmaDop, 0)} MPa.`,
    formula: `D\\ge\\sqrt{\\frac{4P}{\\pi\\sigma_{\\mathrm{dop}}}+d^2}=${pl(example.dRequired, 2)}\\ \\mathrm{mm}\\qquad D=${pl(example.dAdopted, 0)}\\ \\mathrm{mm}`,
    caption: `Kontrola: σ = ${pl(example.sigma, 2)} MPa przy grubości ścianki ${pl(example.wall, 0)} mm.`,
    visual: 'section',
    focus: { metric: 'check' },
  },
]

export default {
  ...createAxialSolution({
    id: 'example-axial-thermal',
    title: 'Przykład fabryczny: rura rozciągana — dobór średnicy zewnętrznej',
    duration: 8,
    given: [
      `d = ${pl(exampleHollowTubeInputs.d, 0)} mm, P = ${pl(exampleHollowTubeInputs.p, 0)} kN, σ_dop = ${pl(exampleHollowTubeInputs.sigmaDop, 0)} MPa`,
    ],
    result: `D ≥ ${pl(example.dRequired, 2)} mm, przyjęto D = ${pl(example.dAdopted, 0)} mm; A = ${pl(example.area, 2)} mm², σ = ${pl(example.sigma, 2)} MPa, t = ${pl(example.wall, 0)} mm.`,
    scenes,
  }),
  animation: createHollowTubeAnimation(exampleHollowTubeInputs),
} satisfies SolutionData
