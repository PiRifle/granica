import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-tresca-3',
  title: 'Hipoteza Tresca: największe ścinanie — przykład 3',
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
      caption: 'σ = 50 MPa, σ_T,dop = 140 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma=50\\,\\text{MPa},\\qquad \\sigma_{T,dop}=140\\,\\text{MPa}',
    },
    {
      title: 'Zapisz warunek Tresca',
      narration: 'Warunek ma postać σ_T = √(50² + 4τ²) ≤ 140. Po podniesieniu do kwadratu: 2 500 + 4τ² ≤ 19 600.',
      caption: '√(50² + 4τ²) ≤ 140.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_T=\\sqrt{50^2+4\\tau^2}\\le140,\\qquad 2\\,500+4\\tau^2\\le19\\,600',
    },
    {
      title: 'Wyznacz maksymalne τ',
      narration: 'Stąd 4τ² ≤ 17 100, czyli τ² ≤ 4 275 i τ ≤ 65,4 MPa.',
      caption: 'τ ≤ 65,4 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '4\\tau^2\\le17\\,100,\\qquad \\tau^2\\le4\\,275,\\qquad \\tau\\le65{,}4\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź wynik i porównaj z HMH',
      narration:
        'Przy τ = 65,4 MPa otrzymujemy σ_T = √(2 500 + 17 100) = √19 600 = 140 MPa. HMH dopuściłaby τ ≤ 75,5 MPa, więc Tresca jest około 1,15 razy bardziej restrykcyjna.',
      caption: 'Kontrola: σ_T = 140 MPa, τ_HMH = 75,5 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_T=\\sqrt{2\\,500+4\\cdot4\\,275}=140\\,\\text{MPa},\\qquad 3\\tau^2\\le17\\,100\\Rightarrow\\tau\\le75{,}5\\,\\text{MPa}',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Przy τ = 65,4 MPa naprężenia główne wynoszą 95,02 MPa i −45,02 MPa. Dla stali E = 200 GPa i ν = 0,30 dają ε_1 = 542,6 με, ε_2 = −367,6 με, ε_3 = −75 με i θ = 100 με.',
      caption: 'ε_1 = 542,6 με, ε_2 = −367,6 με, θ = 100 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_1=542{,}6\\,\\mu\\varepsilon,\\qquad \\varepsilon_2=-367{,}6\\,\\mu\\varepsilon,\\qquad \\varepsilon_3=-75\\,\\mu\\varepsilon,\\qquad \\theta=100\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 100 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=100\\,\\mu\\varepsilon,\\qquad |\\sigma_2|=45{,}02\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
