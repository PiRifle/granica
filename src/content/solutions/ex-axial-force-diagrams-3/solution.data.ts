import type { SolutionData } from '../../model'
import { AxialForceDiagrams3Animation } from './animation'

export default {
  id: 'ex-axial-force-diagrams-3',
  title: 'Wykres siły osiowej N — przykład 3',
  duration: 7,
  given: ['N_1=+12 kN', 'N_2=-8 kN', 'N_3=+4 kN'],
  result:
    'Przy naprężeniu dopuszczalnym σ_dop=120 MPa wymagane pola wynoszą kolejno 100, 66,7 i 33,3 mm^2. Ostatni odcinek jest najcieńszy, ale drugi jest ściskany, więc dla niego trzeba dodatkowo sprawdzić wyboczenie. Widać, że dobór przekroju wymaga nie tylko znajomości N, ale też znaku i długości odcinka.',
  animation: AxialForceDiagrams3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Załóżmy, że znamy wykres siły osiowej, a chcemy odtworzyć obciążenia zewnętrzne i dobrać pola przekroju. Pręt ma trzy odcinki po 0,5 m: przy utwierdzeniu N_1=+12 kN, w środku N_2=-8 kN, przy swobodnym końcu N_3=+4 kN. Zaczynamy od wolnego końca. Siła na końcu musi wynosić 4 kN w prawo, bo tylko ona równoważy N_3=+4 kN. Na granicy drugiego i trzeciego odcinka N zmienia się z -8 na +4 kN, czyli rośnie o 12 kN. Ze związku Δ N=-P wynika P=-12 kN, a więc siła 12 kN w lewo. Na granicy pierwszego i drugiego odcinka N zmienia się z +12 na -8 kN, czyli maleje o 20 kN. Stąd P=+20 kN, czyli siła 20 kN w prawo. Suma obciążeń zewnętrznych wynosi 20-12+4=12 kN w prawo, więc reakcja utwierdzenia ma 12 kN w lewo. Zgadza się to z N_1=+12 kN. Przy naprężeniu dopuszczalnym σ_dop=120 MPa wymagane pola wynoszą kolejno 100, 66,7 i 33,3 mm^2. Ostatni odcinek jest najcieńszy, ale drugi jest ściskany, więc dla niego trzeba dodatkowo sprawdzić wyboczenie. Widać, że dobór przekroju wymaga nie tylko znajomości N, ale też znaku i długości odcinka.',
      caption:
        'Przy naprężeniu dopuszczalnym σ_dop=120 MPa wymagane pola wynoszą kolejno 100, 66,7 i 33,3 mm^2. Ostatni odcinek jest najcieńszy,…',
      visual: 'axial',
      formula: '0{,}5\\ \\text{m}\\qquad 4\\ \\text{kN}\\qquad N\\qquad \\sigma_{\\mathrm{dop}}=120\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
