import type { SolutionData } from '../../model'
import { CriteriaComparison1Animation } from './animation'

export default {
  id: 'ex-criteria-comparison',
  title: 'HMH czy Tresca? Porównanie hipotez — przykład 1',
  animation: CriteriaComparison1Animation,
  duration: 7,
  given: ['sigma=120 MPa', 'tau=40 MPa', 'R_e=300 MPa'],
  result:
    'Tresca daje ostrzejszą ocenę: σ_T=144,2 MPa i n_T=2,08, podczas gdy HMH daje 138,6 MPa i n_HMH=2,17. Obie hipotezy przewidują bezpieczeństwo, ale zapas różni się o około 4 procent.',
  figure: {
    kind: 'cube',
    stresses: { x: 120, y: 0, z: 0 },
    strains: { x: 0.0006, y: -0.00018, z: -0.00018 },
    volumeChange: '0,024%',
    values: [
      { label: 'σ', value: '120 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '300 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_HMH', value: '138,56 MPa', focus: 'stress' },
      { label: 'σ_T', value: '144,22 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '2,165', focus: 'stress' },
      { label: 'n_T', value: '2,080', focus: 'stress' },
      { label: 'ε_x', value: '600 με', focus: 'strain' },
      { label: 'γ_xy', value: '520 μrad', focus: 'strain' },
      { label: 'θ', value: '240 με', focus: 'volume' },
    ],
    note: 'Tresca jest tu bardziej zachowawcza, bo uwzględnia pełną różnicę naprężeń głównych, a HMH rozkłada wytężenie na energię postaciową.',
  },
  scenes: [
    {
      title: 'Zapisz stan naprężenia',
      narration:
        'Punkt jest rozciągany naprężeniem σ = 120 MPa i ścinany naprężeniem τ = 40 MPa. Materiał ma granicę plastyczności R_e = 300 MPa. Naprężenia główne wynoszą σI = 132,11 MPa, σII = 0 i σIII = −12,11 MPa, więc w porównaniu trzeba uwzględnić wszystkie trzy kierunki.',
      caption: 'σ = 120 MPa, τ = 40 MPa, R_e = 300 MPa; σI = 132,11 MPa, σIII = −12,11 MPa.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula:
        '\\sigma=120\\,\\text{MPa},\\qquad \\tau=40\\,\\text{MPa},\\qquad R_e=300\\,\\text{MPa},\\qquad \\sigma_I=132{,}11\\,\\text{MPa},\\qquad \\sigma_{III}=-12{,}11\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie HMH',
      narration:
        'Dla płaskiego stanu naprężenia σ_HMH = √(σ² + 3τ²). Po podstawieniu otrzymujemy √(14 400 + 4 800) = √19 200 = 138,56 MPa.',
      caption: 'σ_HMH = 138,56 MPa.',
      visual: 'cube',
      focus: { metric: 'hmh' },
      formula:
        '\\sigma_{HMH}=\\sqrt{120^2+3\\cdot40^2}=\\sqrt{14\\,400+4\\,800}=\\sqrt{19\\,200}=138{,}56\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenie Tresca',
      narration:
        'Dla Tresca σ_T = √(σ² + 4τ²). Otrzymujemy √(14 400 + 6 400) = √20 800 = 144,22 MPa, czyli więcej niż według HMH.',
      caption: 'σ_T = 144,22 MPa.',
      visual: 'cube',
      focus: { metric: 'tresca' },
      formula: '\\sigma_T=\\sqrt{120^2+4\\cdot40^2}=\\sqrt{14\\,400+6\\,400}=\\sqrt{20\\,800}=144{,}22\\,\\text{MPa}',
    },
    {
      title: 'Porównaj wartości i wskaż decydującą hipotezę',
      narration:
        'Na wspólnej skali Tresca daje większe naprężenie zredukowane niż HMH. Różnica wynosi 144,22 − 138,56 = 5,66 MPa, czyli około 4 procent. Obie wartości są porównywane z tą samą granicą, więc o ocenie bezpieczeństwa decyduje Tresca. Kontrola σ_T² − σ_HMH² = 1 600 = τ² potwierdza, że różnica wynika z naprężenia stycznego.',
      caption: 'Tresca jest większa i decyduje: Δ ≈ 5,7 MPa, czyli 4,1%.',
      visual: 'cube',
      focus: { metric: 'compare' },
      formula: '\\sigma_T^2-\\sigma_{HMH}^2=20\\,800-19\\,200=1\\,600=\\tau^2,\\qquad \\sigma_T>\\sigma_{HMH}',
    },
    {
      title: 'Oblicz zapasy bezpieczeństwa',
      narration:
        'Zapas według HMH wynosi 300/138,56 = 2,165, a według Tresca 300/144,22 = 2,080. Obie hipotezy przewidują bezpieczeństwo, ale Tresca daje mniejszy zapas, więc to ona decyduje o ocenie elementu.',
      caption: 'n_HMH = 2,165, n_T = 2,080; obie hipotezy dopuszczają, ale decyduje Tresca.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: 'n_{HMH}=\\frac{300}{138{,}56}=2{,}165,\\qquad n_T=\\frac{300}{144{,}22}=2{,}080',
    },
  ],
} satisfies SolutionData
