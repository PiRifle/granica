import type { SolutionData } from '../../model'
import { SaintVenantExample3Animation } from './animation'

export default {
  id: 'ex-foundations-saint-venant-3',
  title: 'Zasada Saint-Venanta: dystans od detalu — przykład 3',
  duration: 7,
  given: ['b = 80 mm', 't = 6 mm', 'd = 16 mm', 'K_t ≈ 3', 'σ_max = 360 MPa'],
  result:
    'A_net = 384 mm², σ_nom = 120 MPa, a siła P ≈ 46,1 kN. Naprężenie brutto bez otworu wynosi 96 MPa. O nośności decyduje nie tylko pole netto, ale i kształt detalu — dwa otwory o tym samym polu mogą dawać różne maksima, jeśli różnią się kształtem lub położeniem względem krawędzi.',
  animation: SaintVenantExample3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Taśma o szerokości 80 mm i grubości 6 mm ma otwór o średnicy 16 mm. Przyjmujemy K_t ≈ 3 i szukamy siły P, przy której maksymalne naprężenie przy otworze osiągnie 360 MPa. Szerokość czynna przekroju to 80 − 16 = 64 mm. Mnożąc przez grubość 6 mm, otrzymujemy pole netto 384 mm². Z zależności σ_max = K_t σ_nom wyznaczamy naprężenie nominalne: σ_nom = 360 / 3 = 120 MPa. To średnie naprężenie na przekroju netto. Mnożymy naprężenie nominalne przez pole netto: P = 120 N/mm² · 384 mm² = 46 080 N, czyli około 46,1 kN. Bez otworu pole wynosi 80 · 6 = 480 mm², więc naprężenie brutto to 46 080 / 480 = 96 MPa. Otwór zwiększa naprężenie średnie z 96 do 120 MPa przez zmniejszenie pola. Dzieląc tę samą siłę przez pole netto, otrzymujemy 46 080 / 384 = 120 MPa. Koncentracja podnosi następnie maksimum do 360 MPa przy krawędzi otworu. O nośności decyduje nie tylko pole netto, ale i kształt detalu. Dwa otwory o tym samym polu mogą dawać różne maksima, jeśli różnią się kształtem lub położeniem względem krawędzi. Dlatego przy doborze przekroju najpierw ustal, gdzie może powstać koncentracja, a dopiero potem licz średnie naprężenie.',
      caption: 'Kształt detalu wpływa na maksymalne naprężenie tak samo jak pole netto.',
      visual: 'section',
      formula:
        'b=80\\ \\text{mm},\\quad t=6\\ \\text{mm},\\quad d=16\\ \\text{mm},\\quad K_t\\approx3,\\quad \\sigma_{\\max}=360\\ \\text{MPa}\\qquad A_{\\text{net}}=(80-16)\\cdot6=384\\ \\text{mm}^2\\qquad \\sigma_{\\text{nom}}=\\frac{\\sigma_{\\max}}{K_t}=\\frac{360}{3}=120\\ \\text{MPa}\\qquad P=\\sigma_{\\text{nom}}A_{\\text{net}}=120\\cdot384=46\\,080\\ \\text{N}\\approx46{,}1\\ \\text{kN}\\qquad \\frac{46\\,080}{80\\cdot6}=96\\ \\text{MPa}\\qquad \\frac{46\\,080}{384}=120\\ \\text{MPa},\\qquad 3\\cdot120=360\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
