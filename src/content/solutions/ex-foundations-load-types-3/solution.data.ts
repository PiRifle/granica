import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-foundations-load-types-3',
  title: 'Obciążenia: siła, rozkład i moment — przykład 3',
  duration: 7,
  given: ['γ = 77 kN/m³', 'σ_dop = 120 MPa', 'współczynnik bezpieczeństwa n = 2'],
  result:
    'Maksymalna długość linki wynosi około 1558 m. Przy współczynniku bezpieczeństwa 2 dopuszczalne naprężenie spada do 60 MPa, a długość do około 779 m. Ciężar własny może stać się głównym ograniczeniem, gdy element jest bardzo długi.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.LoadTypesExample3Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Linka stalowa przenosi wyłącznie ciężar własny. Przyjmujemy ciężar objętościowy stali γ = 77 kN/m³ i dopuszczalne naprężenie σ_dop = 120 MPa. Szukamy największej długości L, przy której naprężenie u góry nie przekroczy tej wartości. Pole przekroju nie jest potrzebne.',
      caption: 'Linka obciążona równomiernie rozłożonym ciężarem własnym; długość L jest szukana.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: '\\gamma=77\\ \\text{kN/m}^3,\\quad \\sigma_{\\text{dop}}=120\\ \\text{MPa},\\quad L=?',
    },
    {
      title: 'Naprężenie rośnie ku górze',
      narration:
        'W przekroju odległym o x od swobodnego końca naprężenie wynosi σ(x) = γx. Rośnie ono liniowo od zera na swobodnym końcu do maksimum przy utwierdzeniu. Dzięki temu maksimum wystarczy sprawdzić u góry linki.',
      caption: 'σ(x) = γx — największe naprężenie występuje u góry linki.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma(x)=\\gamma x,\\qquad \\sigma_{\\max}=\\gamma L',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'U góry linki naprężenie nie może przekroczyć wartości dopuszczalnej. Warunek bezpieczeństwa ma więc postać γL ≤ σ_dop. Długość linki jest jedyną niewiadomą, bo pole przekroju skraca się we wzorze na naprężenie.',
      caption: 'Naprężenie u góry nie może przekroczyć wartości dopuszczalnej.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma_{\\max}=\\gamma L\\le\\sigma_{\\text{dop}}',
    },
    {
      title: 'Długość maksymalna',
      narration:
        'Przekształcamy warunek do postaci L_max = σ_dop / γ. Zamieniamy 120 MPa na 120 000 kN/m² i dzielimy przez 77 kN/m³. Otrzymujemy L_max ≈ 1558 m, czyli około 1,56 km.',
      caption: 'L_max ≈ 1558 m; przy tej długości naprężenie u góry osiąga 120 MPa.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        '120\\ \\text{MPa}=120\\,000\\ \\text{kN/m}^2,\\qquad L_{\\max}=\\frac{\\sigma_{\\text{dop}}}{\\gamma}=\\frac{120\\,000}{77}\\approx1558\\ \\text{m}',
    },
    {
      title: 'Współczynnik bezpieczeństwa',
      narration:
        'Przy współczynniku bezpieczeństwa n = 2 dopuszczalne naprężenie wynosi 60 MPa. Długość graniczna maleje do 60 000 / 77 ≈ 779 m. Zapas bezpieczeństwa zmniejsza dopuszczalną długość o połowę.',
      caption: 'Dla n = 2: σ_dop = 60 MPa, L_max ≈ 779 m.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        '\\sigma_{\\text{dop}}=\\frac{120}{2}=60\\ \\text{MPa},\\qquad L_{\\max}=\\frac{60\\,000}{77}\\approx779\\ \\text{m}',
    },
    {
      title: 'Wniosek',
      narration:
        'Ten przykład pokazuje, że ciężar własny może stać się głównym ograniczeniem, gdy element jest bardzo długi. W typowych konstrukcjach budowlanych zwykle nie decyduje o nośności, ale w kablach, linach i wysmukłych masztach trzeba go liczyć osobno.',
      caption: 'W długiej linie o nośności decyduje ciężar własny, nie obciążenie zewnętrzne.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\sigma_{\\max}=\\gamma L\\le\\sigma_{\\text{dop}}',
    },
  ],
} satisfies SolutionData
