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
      title: 'Model i dane — szukamy siły',
      narration:
        'Taśma o szerokości 80 mm i grubości 6 mm ma otwór o średnicy 16 mm. Przyjmujemy K_t ≈ 3, a maksymalne naprężenie przy otworze ma osiągnąć 360 MPa. Siła P nie jest dana — to ją wyznaczymy z warunku naprężenia.',
      caption: 'Dane geometrii i warunek σ_max = 360 MPa; siła P jest szukana.',
      visual: 'section',
      focus: { metric: 'model' },
      formula:
        'b=80\\ \\text{mm},\\quad t=6\\ \\text{mm},\\quad d=16\\ \\text{mm},\\quad K_t\\approx3,\\quad \\sigma_{\\max}=360\\ \\text{MPa}',
    },
    {
      title: 'Pole przekroju netto',
      narration:
        'Szerokość czynna przekroju to 80 − 16 = 64 mm. Mnożąc przez grubość 6 mm, otrzymujemy pole netto 384 mm².',
      caption: 'A_net = (80 − 16) · 6 = 384 mm².',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_{\\text{net}}=(b-d)t=(80-16)\\cdot6=384\\ \\text{mm}^2',
    },
    {
      title: 'Od maksimum do naprężenia nominalnego',
      narration:
        'Z zależności σ_max = K_t σ_nom wyznaczamy naprężenie nominalne: σ_nom = 360 / 3 = 120 MPa. To średnie naprężenie na przekroju netto, poza lokalnym pikiem przy otworze.',
      caption: 'σ_nom = 120 MPa.',
      visual: 'section',
      focus: { metric: 'inverse' },
      formula: '\\sigma_{\\text{nom}}=\\frac{\\sigma_{\\max}}{K_t}=\\frac{360}{3}=120\\ \\text{MPa}',
    },
    {
      title: 'Wyznaczenie siły',
      narration:
        'Mnożymy naprężenie nominalne przez pole netto: P = 120 N/mm² · 384 mm² = 46 080 N, czyli około 46,1 kN. To siła, przy której maksimum przy otworze osiąga założone 360 MPa.',
      caption: 'P ≈ 46,1 kN.',
      visual: 'section',
      focus: { metric: 'force' },
      formula: 'P=\\sigma_{\\text{nom}}A_{\\text{net}}=120\\cdot384=46\\,080\\ \\text{N}\\approx46{,}1\\ \\text{kN}',
    },
    {
      title: 'Kontrola rozkładu naprężeń',
      narration:
        'Bez otworu naprężenie brutto wynosi 96 MPa. Otwór podnosi średnie naprężenie netto do 120 MPa, a koncentracja przy krawędzi do 360 MPa. Zaburzenie maleje w odległości rzędu trzech średnic, gdzie wraca naprężenie nominalne.',
      caption: 'σ_brutto = 96 MPa, σ_nom = 120 MPa, σ_max = 360 MPa.',
      visual: 'section',
      focus: { metric: 'check' },
      formula:
        '\\sigma_{\\text{brutto}}=96\\ \\text{MPa},\\qquad \\sigma_{\\text{nom}}=120\\ \\text{MPa},\\qquad \\sigma_{\\max}=360\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
