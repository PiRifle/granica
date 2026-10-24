import type { SolutionData } from '../../model'
import { SiUnitsExampleAnimation } from './animation'

export default {
  id: 'ex-foundations-si-units',
  title: 'Jednostki SI: wspólny język obliczeń — przykład 1',
  duration: 7,
  given: ['P = 96 kN', 'A = 480 mm²'],
  result: 'Naprężenie wynosi 200 MPa, czyli 20 kN/cm². Dodatnia wartość odpowiada rozciąganiu.',
  animation: SiUnitsExampleAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenie',
      narration:
        'Pręt o polu przekroju 480 mm² jest rozciągany siłą 96 kN. Zamieniamy siłę na niutony: 96 kN = 96 000 N. Dzielimy ją przez pole: σ = 96 000 / 480 = 200 N/mm² = 200 MPa. Ponieważ 1 MPa = 0,1 kN/cm², ten sam wynik to 20 kN/cm². Kontrola jednostek: 1 N/mm² = 100 N/cm² = 0,1 kN/cm².',
      caption: 'σ = 200 MPa = 20 kN/cm².',
      visual: 'axial',
      formula:
        'P=96\\ \\text{kN}=96\\,000\\ \\text{N}\\qquad A=480\\ \\text{mm}^2\\qquad \\sigma=\\frac{96\\,000}{480}=200\\ \\text{N/mm}^2\\qquad \\sigma=200\\ \\text{MPa}\\qquad 200\\ \\text{MPa}=20\\ \\text{kN/cm}^2\\qquad 1\\ \\text{MPa}=0{,}1\\ \\text{kN/cm}^2',
    },
  ],
} satisfies SolutionData
