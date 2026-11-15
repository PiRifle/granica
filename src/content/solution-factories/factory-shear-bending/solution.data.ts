import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createShearBendingSolution, pl, type PinDesignInputs } from './factory'
import { createPinDesignAnimation } from './animation'

export const examplePinInputs: PinDesignInputs = { p: 100, kShear: 200, kBearing: 100 }

// połączenie jednocięte: A ≥ P/k_s, d = √(4A/π); h ≥ P/(k_t·d)
const areaRequired = (examplePinInputs.p * 1000) / examplePinInputs.kShear
const dRequired = Math.sqrt((4 * areaRequired) / Math.PI)
const dAdopted = Math.ceil(dRequired)
const hRequired = (examplePinInputs.p * 1000) / (examplePinInputs.kBearing * dAdopted)
const hAdopted = Math.ceil(hRequired)

const scenes: SolutionScene[] = [
  {
    title: '1. Model połączenia sworzniowego',
    narration:
      'Przykład fabryczny: połączenie jednocięte przenosi siłę P. Sworzeń pracuje na ścinanie, a ścianka elementu na docisk — dwa niezależne warunki wytrzymałości.',
    formula: `P=${pl(examplePinInputs.p, 0)}\\ \\mathrm{kN}\\qquad k_s=${pl(examplePinInputs.kShear, 0)}\\ \\mathrm{MPa}\\qquad k_t=${pl(examplePinInputs.kBearing, 0)}\\ \\mathrm{MPa}`,
    caption: 'Sworzeń w sztywnej ścianie; połączenie jednocięte.',
    visual: 'axial',
    focus: { metric: 'model' },
  },
  {
    title: '2. Dobór średnicy i wysokości',
    narration: `Warunek ścinania daje A ≥ ${pl(areaRequired, 1)} mm², czyli d ≥ ${pl(dRequired, 1)} mm; przyjęto d = ${pl(dAdopted, 0)} mm. Warunek docisku daje h ≥ ${pl(hRequired, 1)} mm; przyjęto h = ${pl(hAdopted, 0)} mm.`,
    formula: `d\\ge\\sqrt{\\frac{4P}{\\pi k_s}}=${pl(dRequired, 1)}\\ \\mathrm{mm}\\qquad h\\ge\\frac{P}{k_t d}=${pl(hRequired, 1)}\\ \\mathrm{mm}`,
    caption: `Przyjęto d = ${pl(dAdopted, 0)} mm i h = ${pl(hAdopted, 0)} mm.`,
    visual: 'diagram',
    focus: { metric: 'design' },
  },
]

export default {
  ...createShearBendingSolution({
    id: 'example-shear-bending',
    title: 'Przykład fabryczny: połączenie sworzniowe — dobór średnicy i wysokości',
    duration: 8,
    given: [
      `P = ${pl(examplePinInputs.p, 0)} kN, k_s = ${pl(examplePinInputs.kShear, 0)} MPa, k_t = ${pl(examplePinInputs.kBearing, 0)} MPa`,
    ],
    result: `d ≥ ${pl(dRequired, 1)} mm → d = ${pl(dAdopted, 0)} mm; h ≥ ${pl(hRequired, 1)} mm → h = ${pl(hAdopted, 0)} mm.`,
    scenes,
  }),
  animation: createPinDesignAnimation(examplePinInputs),
} satisfies SolutionData
