import type { SolutionData } from '../../model'
import { CriteriaComparison3Animation } from './animation'

export default {
  id: 'ex-criteria-comparison-3',
  title: 'HMH czy Tresca? Porównanie hipotez — przykład 3',
  animation: CriteriaComparison3Animation,
  duration: 7,
  given: ['R_e=235 MPa', 'n_{wym}=2'],
  result:
    'Taki sposób kontroli jest przydatny w projektowaniu, gdy granica materiału jest narzucona przez dostępny gatunek stali. Wtedy nie pytamy, jakie naprężenie jest dopuszczalne, lecz czy dany materiał w ogóle może spełnić wymaganie. Odpowiedź może brzmieć „tak według HMH, nie według Tresca”, i właśnie dlatego wybór hipotezy musi być świadomą decyzją, a nie przypadkiem.',
  figure: {
    kind: 'cube',
    stresses: { x: 60, y: -60, z: 0 },
    strains: { x: 0.00039, y: -0.00039, z: 0 },
    volumeChange: '0%',
    values: [
      { label: 'R_e', value: '235 MPa', focus: 'stress', reveal: 0 },
      { label: 'n_wym', value: '2,0', focus: 'stress', reveal: 0 },
      { label: 'τ', value: '60 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_dop HMH', value: '67,8 MPa', focus: 'stress' },
      { label: 'τ_dop Tresca', value: '58,75 MPa', focus: 'stress' },
      { label: 'R_e,req HMH', value: '207,8 MPa', focus: 'stress' },
      { label: 'R_e,req Tresca', value: '240 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '2,26', focus: 'stress' },
      { label: 'n_T', value: '1,96', focus: 'stress' },
      { label: 'σ_I', value: '60 MPa', focus: 'stress' },
      { label: 'σ_II', value: '−60 MPa', focus: 'stress' },
      { label: 'ε_I', value: '390 με', focus: 'strain' },
      { label: 'ε_II', value: '−390 με', focus: 'strain' },
      { label: 'θ', value: '0 με', focus: 'volume' },
    ],
    note: 'Przy czystym ścinaniu naprężenia główne wynoszą ±τ, a zmiana objętości jest zerowa.',
  },
  scenes: [
    {
      title: 'Zapisz warunek czystego ścinania',
      narration:
        'Dla stali o R_e = 235 MPa wymagamy zapasu n_wym = 2 i pytamy, jakie maksymalne naprężenie styczne przy czystym ścinaniu dopuszcza każda hipoteza. To zadanie odwrotne: od wymaganego zapasu do dopuszczalnego obciążenia.',
      caption: 'R_e = 235 MPa, n_wym = 2, czyste ścinanie; szukamy τ_dop.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula: 'R_e=235\\,\\text{MPa},\\qquad n_{wym}=2{,}0,\\qquad \\sigma=0',
    },
    {
      title: 'Oblicz dopuszczalne τ według HMH',
      narration: 'Dla HMH warunek ma postać √3·τ ≤ R_e/n_wym. Stąd τ_dop = 235/(2·1,732) = 67,8 MPa.',
      caption: 'τ_dop,HMH = 67,8 MPa.',
      visual: 'cube',
      focus: { metric: 'hmh' },
      formula:
        '\\sqrt{3}\\,\\tau\\le\\frac{R_e}{n_{wym}},\\qquad \\tau_{dop,HMH}=\\frac{235}{2\\cdot1{,}732}=67{,}8\\,\\text{MPa}',
    },
    {
      title: 'Oblicz dopuszczalne τ według Tresca',
      narration: 'Dla Tresca warunek to 2τ ≤ R_e/n_wym, więc τ_dop = R_e/(2n_wym) = 235/4 = 58,75 MPa.',
      caption: 'τ_dop,T = 58,75 MPa; to próg bardziej zachowawczy.',
      visual: 'cube',
      focus: { metric: 'tresca' },
      formula: '2\\tau\\le\\frac{R_e}{n_{wym}},\\qquad \\tau_{dop,T}=\\frac{235}{2\\cdot2}=58{,}75\\,\\text{MPa}',
    },
    {
      title: 'Porównaj naprężenia zredukowane i wskaż decydującą hipotezę',
      narration:
        'Przy τ = 60 MPa naprężenie zredukowane według HMH wynosi √3·60 = 103,9 MPa, a według Tresca 2·60 = 120 MPa. Granica dopuszczalna przy n_wym = 2 to σ_dop = R_e/2 = 117,5 MPa. HMH mieści się poniżej granicy, a Tresca powyżej, więc decyduje Tresca.',
      caption: 'σ_HMH = 103,9 < σ_dop = 117,5 < σ_T = 120 MPa → decyduje Tresca.',
      visual: 'cube',
      focus: { metric: 'compare' },
      formula:
        '\\sigma_{HMH}=\\sqrt{3}\\cdot60=103{,}9\\,\\text{MPa},\\qquad \\sigma_T=2\\cdot60=120\\,\\text{MPa},\\qquad \\sigma_{\\mathrm{dop}}=\\frac{235}{2}=117{,}5\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź wymagany zapas i wskaż decydującą hipotezę',
      narration:
        'Dla τ = 60 MPa HMH wymaga R_e,req = √3·60·2 = 207,8 MPa, a Tresca 2·60·2 = 240 MPa. Dla stali 235 MPa HMH ma zapas 2,26, a Tresca 1,96, czyli mniej niż wymagane 2. O wyniku decyduje więc Tresca.',
      caption: 'R_e,req = 207,8 MPa (HMH) lub 240 MPa (Tresca); n_HMH = 2,26, n_T = 1,96 < 2.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        'R_{e,req,HMH}=\\sqrt{3}\\cdot60\\cdot2=207{,}8\\,\\text{MPa},\\qquad R_{e,req,T}=2\\cdot60\\cdot2=240\\,\\text{MPa},\\qquad n_{HMH}=2{,}26,\\qquad n_T=1{,}96',
    },
  ],
} satisfies SolutionData
