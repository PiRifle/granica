import type { SolutionData } from '../../model'
import { AxialForceDiagramsAnimation } from './animation'

export default {
  id: 'ex-axial-force-diagrams',
  title: 'Wykres siły osiowej N — przykład 1',
  duration: 7,
  given: ['x = 0'],
  result:
    'Od utwierdzenia do wolnego końca: N = +15 kN, −5 kN, +5 kN; środkowy odcinek jest ściskany, a pozostałe rozciągane.',
  animation: AxialForceDiagramsAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Zacznij od wolnego końca. Na ostatnim odcinku jedyną siłą zewnętrzną odciętej prawej części jest 5 kN, więc N₃ = +5 kN. Na środkowym odcinku po prawej stronie działają 10 kN w lewo i 5 kN w prawo, więc N₂ = −10 + 5 = −5 kN. Na pierwszym odcinku po prawej stronie działają 20 kN w prawo, 10 kN w lewo i 5 kN w prawo, więc N₁ = 20 − 10 + 5 = +15 kN. Z równowagi całego pręta reakcja w A wynosi 15 kN w lewo, co potwierdza N₁ = +15 kN. Narysuj trzy poziome stopnie: +15, −5 i +5 kN, ze skokami w przekrojach przyłożenia sił.',
      caption: 'Narysuj trzy poziome stopnie: +15, −5 i +5 kN, ze skokami w przekrojach przyłożenia sił.',
      visual: 'axial',
      formula:
        'N_3=+5\\ \\text{kN}\\qquad N_2=-10+5=-5\\ \\text{kN}\\qquad N_1=20-10+5=+15\\ \\text{kN}\\qquad N_1=+15\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
