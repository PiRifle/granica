import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createSectionSolution, pl, type TeeCentroidInputs } from './factory'
import { createTeeCentroidAnimation } from './animation'

export const exampleTeeInputs: TeeCentroidInputs = {
  flangeWidth: 9,
  flangeThickness: 2,
  webWidth: 1,
  webHeight: 28,
  height: 30,
}

// pomiary w cm, początek osi z w górnej krawędzi
const flangeArea = exampleTeeInputs.flangeWidth * exampleTeeInputs.flangeThickness
const webArea = exampleTeeInputs.webWidth * exampleTeeInputs.webHeight
const totalArea = flangeArea + webArea
const zCentroid =
  (flangeArea * exampleTeeInputs.flangeThickness * 0.5 +
    webArea * (exampleTeeInputs.flangeThickness + exampleTeeInputs.webHeight * 0.5)) /
  totalArea

const scenes: SolutionScene[] = [
  {
    title: '1. Podział przekroju teowego',
    narration:
      'Przykład fabryczny: przekrój teowy dzielimy na prostokątny pas i środnik. Oba fragmenty opisujemy polami i położeniami środków ciężkości względem osi z liczonej od górnej krawędzi.',
    formula: `A_1=${pl(flangeArea, 1)}\\ \\mathrm{cm}^2\\qquad A_2=${pl(webArea, 1)}\\ \\mathrm{cm}^2`,
    caption: 'Podział na pas i środnik; oś y jest osią symetrii.',
    visual: 'section',
    focus: { metric: 'parts' },
  },
  {
    title: '2. Środek ciężkości',
    narration: `Środek ciężkości leży na osi symetrii y. Współrzędna z_C to średnia ważona pól: z_C = ${pl(zCentroid, 2)} cm od górnej krawędzi.`,
    formula: `z_C=\\frac{A_1 z_1+A_2 z_2}{A_1+A_2}=${pl(zCentroid, 2)}\\ \\mathrm{cm}`,
    caption: `z_C = ${pl(zCentroid, 2)} cm od górnej krawędzi przekroju.`,
    visual: 'section',
    focus: { metric: 'centroid' },
  },
]

export default {
  ...createSectionSolution({
    id: 'example-section-geometry',
    title: 'Przykład fabryczny: przekrój teowy — środek ciężkości',
    duration: 8,
    given: [
      `pas ${pl(exampleTeeInputs.flangeWidth, 1)} × ${pl(exampleTeeInputs.flangeThickness, 1)} cm, środnik ${pl(exampleTeeInputs.webWidth, 1)} × ${pl(exampleTeeInputs.webHeight, 1)} cm`,
    ],
    result: `A = ${pl(totalArea, 1)} cm², z_C = ${pl(zCentroid, 2)} cm od górnej krawędzi.`,
    scenes,
  }),
  animation: createTeeCentroidAnimation(exampleTeeInputs),
} satisfies SolutionData
