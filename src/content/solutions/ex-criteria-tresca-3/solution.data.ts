import type { SolutionData } from '../../model'
import { TrescaExample3Animation } from './animation'

export default {
  id: 'ex-criteria-tresca-3',
  title: 'Hipoteza Tresca: największe ścinanie — przykład 3',
  animation: TrescaExample3Animation,
  duration: 7,
  given: ['σ = 50 MPa'],
  result:
    'Odpowiedź: według Tresca dopuszczalne naprężenie styczne wynosi około 65,4 MPa. To pokazuje, że wariant odwrotny trzeba rozwiązywać z tą samą hipotezą, którą przyjęto do oceny. Nie można policzyć granicy z HMH, a potem porównać jej z wynikiem Tresca.',
  figure: {
    kind: 'cube',
    stresses: { x: 50, y: 0, z: 0 },
    strains: { x: 0.0005426, y: -0.0003676, z: -0.000075 },
    volumeChange: '0,01%',
    values: [
      { label: 'σ', value: '50 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_T,dop', value: '140 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_dop Tresca', value: '65,4 MPa', focus: 'stress' },
      { label: 'τ_dop HMH', value: '75,5 MPa', focus: 'stress' },
      { label: 'σ_1', value: '95,02 MPa', focus: 'stress' },
      { label: 'σ_2', value: '−45,02 MPa', focus: 'stress' },
      { label: 'ε_1', value: '542,6 με', focus: 'strain' },
      { label: 'ε_2', value: '−367,6 με', focus: 'strain' },
      { label: 'ε_3', value: '−75 με', focus: 'strain' },
      { label: 'θ', value: '100 με', focus: 'volume' },
    ],
    note: 'Przy τ = 65,4 MPa Tresca osiąga dokładnie dopuszczalne 140 MPa; HMH dopuściłaby większe ścinanie.',
  },
  scenes: [
    {
      title: 'Zapisz dane i pytanie',
      narration:
        'Punkt jest rozciągany naprężeniem σ = 50 MPa i ścinany naprężeniem τ. Dopuszczalne naprężenie zredukowane według Tresca wynosi 140 MPa. Pytamy, jakie maksymalne τ można przyłożyć.',
      caption: 'σ = 50 MPa, σ_T,dop = 140 MPa, τ jest szukane.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula: '\\sigma=50\\,\\text{MPa},\\quad \\sigma_{T,dop}=140\\,\\text{MPa}',
    },
    {
      title: 'Zapisz warunek i rozwiąż go',
      narration:
        'Warunek ma postać σ_T = √(50² + 4τ²) ≤ 140. Po podniesieniu do kwadratu: 2 500 + 4τ² ≤ 19 600, więc 4τ² ≤ 17 100, τ² ≤ 4 275 i τ ≤ 65,4 MPa. Na wykresie krzywa σ_T(τ) przecina limit właśnie przy tej wartości.',
      caption: 'Krzywa σ_T(τ) osiąga 140 MPa przy τ = 65,4 MPa.',
      visual: 'cube',
      focus: { metric: 'condition' },
      formula:
        '\\sigma_T=\\sqrt{50^2+4\\tau^2}\\le140,\\quad 4\\tau^2\\le17\\,100,\\quad \\tau\\le65{,}4\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź maksymalne ścinanie',
      narration:
        'Przy τ = 65,4 MPa naprężenia główne wynoszą 95,02 MPa i −45,02 MPa, a σ_3 = 0. Największe koło obejmuje σ_1 i σ_2, więc τ_max = (95,02 + 45,02)/2 = 70,02 MPa.',
      caption: 'τ_max = 70,02 MPa, a σ_T = 2τ_max = 140 MPa.',
      visual: 'cube',
      focus: { metric: 'maxshear' },
      formula: '\\tau_{max}=\\frac{95{,}02-(-45{,}02)}{2}=70{,}02\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź wynik i porównaj z HMH',
      narration:
        'Przy τ = 65,4 MPa otrzymujemy σ_T = √(2 500 + 17 100) = √19 600 = 140 MPa, czyli dokładnie limit. HMH dopuściłaby τ ≤ 75,5 MPa, więc Tresca jest około 1,15 razy bardziej restrykcyjna.',
      caption: 'Tresca wykorzystuje limit w 100%, a HMH tylko w 88,4%.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        '\\sigma_T(65{,}4)=\\sqrt{50^2+4\\cdot65{,}4^2}\\approx140\\,\\text{MPa},\\quad \\tau_{dop,HMH}=75{,}5\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
