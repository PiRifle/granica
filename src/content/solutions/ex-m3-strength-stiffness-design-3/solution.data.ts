import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-strength-stiffness-design-3',
  title: 'Dobór ze względu na wytrzymałość i sztywność — przykład 3',
  duration: 7,
  given: ['A = 500 mm²', 'E = 200 GPa', 'σ_dop = 150 MPa', 'ΔL_dop = 2 mm'],
  result:
    'Ten wynik wyjaśnia, dlaczego długie elementy często wymagają większego przekroju, niż wynikałoby to z samej wytrzymałości. Wydłużenie rośnie liniowo z długością, a naprężenie nie. Wystarczy wydłużyć pręt, aby warunek sztywności stał się decydujący, nawet przy niezmienionym obciążeniu i materiale.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.StrengthStiffnessDesign3Animation })),
  ),
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 3000,
        area: 500,
        n: 66.7,
        sigma: 133.3,
        epsilon: 0.000667,
        deltaL: 2,
      },
    ],
    loads: [
      {
        node: 1,
        value: 66.7,
        label: 'N_δ = 66,7 kN',
      },
    ],
    note: 'Dla L = 3000 mm decyduje sztywność; A = 500 mm².',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt ma pole 500 mm², E = 200 GPa, σ_dop = 150 MPa i ΔL_dop = 2 mm. Tym razem długość jest zmienna, a szukamy maksymalnej siły, jaką pręt może przenieść. O wyniku zdecyduje mniejsza z dwóch dopuszczalnych sił.',
      caption: 'Wytrzymałość daje stałą granicę siły, a sztywność granicę malejącą z długością.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula:
        'A=500\\ \\text{mm}^2,\\quad E=200\\ \\text{GPa},\\quad \\sigma_{\\mathrm{dop}}=150\\ \\text{MPa},\\quad \\Delta L_{\\mathrm{dop}}=2\\ \\text{mm}',
    },
    {
      title: 'Granica wytrzymałości',
      narration:
        'Z warunku σ = N/A ≤ σ_dop otrzymujemy N ≤ σ_dop·A = 150·500 = 75 000 N, czyli 75 kN. Ta granica nie zależy od długości pręta.',
      caption: 'Na wykresie jest to pozioma linia N_σ = 75 kN.',
      visual: 'axial',
      focus: { metric: 'Nσ' },
      formula: 'N_\\sigma=\\sigma_{\\mathrm{dop}}A=150\\cdot500=75\\,000\\ \\text{N}=75\\ \\text{kN}',
    },
    {
      title: 'Granica sztywności',
      narration:
        'Z warunku ΔL = NL/(EA) ≤ ΔL_dop otrzymujemy N ≤ EAΔL_dop/L = 200 000·500·2/L = 200 000 000/L, gdzie L jest w milimetrach. Dla L = 3000 mm daje to około 66,7 kN, czyli mniej niż 75 kN.',
      caption: 'Granica sztywności maleje hiperbolicznie wraz z długością.',
      visual: 'axial',
      focus: { metric: 'Nδ' },
      formula:
        'N_\\delta=\\frac{EA\\Delta L_{\\mathrm{dop}}}{L}=\\frac{200\\,000\\cdot500\\cdot2}{L}=\\frac{200\\,000\\,000}{L}\\ \\text{N},\\qquad N_\\delta(3000)\\approx66{,}7\\ \\text{kN}',
    },
    {
      title: 'Długość krytyczna',
      narration:
        'Granice zrównują się przy długości krytycznej L* = EΔL_dop/σ_dop = 200 000·2/150 ≈ 2667 mm ≈ 2,67 m. Krótszy pręt jest ograniczony wytrzymałością, a dłuższy sztywnością.',
      caption: 'Punkt przecięcia obu warunków wyznacza zmianę warunku decydującego.',
      visual: 'axial',
      focus: { metric: 'L*' },
      formula:
        'L^*=\\frac{E\\Delta L_{\\mathrm{dop}}}{\\sigma_{\\mathrm{dop}}}=\\frac{200\\,000\\cdot2}{150}\\approx2667\\ \\text{mm}\\approx2{,}67\\ \\text{m}',
    },
    {
      title: 'Wybór warunku dla różnych długości',
      narration:
        'Dla L = 2 m granica sztywności wynosi 100 kN, więc decyduje wytrzymałość i maksimum to 75 kN. Dla L = 4 m granica sztywności spada do 50 kN, więc decyduje sztywność. Wydłużenie zmienia warunek decydujący.',
      caption: 'Przy L < 2,67 m decyduje wytrzymałość, a przy L > 2,67 m decyduje sztywność.',
      visual: 'axial',
      focus: { metric: 'examples' },
      formula:
        'L=2000\\ \\text{mm}:\\ N_\\delta=100\\ \\text{kN}>75\\ \\text{kN}\\;\\Rightarrow\\ N_{\\max}=75\\ \\text{kN}',
    },
    {
      title: 'Sprawdzenie dla L = 3 m',
      narration:
        'Dla L = 3000 mm granica sztywności 66,7 kN jest mniejsza od 75 kN, więc maksymalna siła wynosi 66,7 kN. Naprężenie 66 700/500 = 133,3 MPa jest mniejsze od 150 MPa, a wydłużenie 0,000667·3000 ≈ 2,0 mm mieści się w dopuszczalnych 2 mm.',
      caption: 'Decyduje sztywność, ale oba warunki są spełnione. Naprężenie zachowuje zapas do granicy.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula:
        '\\sigma=\\frac{66\\,700}{500}=133{,}3\\ \\text{MPa}\\le150\\ \\text{MPa},\\qquad \\Delta L=\\frac{133{,}3}{200\\,000}\\cdot3000\\approx2{,}0\\ \\text{mm}\\le2\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
