import type { SolutionData } from '../../model'
import { MaxNormalExample2Animation } from './animation'

export default {
  id: 'ex-criteria-max-normal-2',
  title: 'Hipoteza największego naprężenia normalnego — przykład 2',
  animation: MaxNormalExample2Animation,
  duration: 7,
  given: ['σ1 = 25 MPa', 'σ2 = −10 MPa', 'σ3 = −160 MPa', 'kr = 150 MPa', 'kc = 600 MPa'],
  result:
    'Dla porównania HMH dałaby w tym stanie σHMH = √(25² + 10² + 160² − 25·(−10) − (−10)·(−160) − (−160)·25). Po obliczeniu otrzymujemy √(625 + 100 + 25 600 + 250 − 1600 + 4000) = √28 975 = 170,2 MPa. Przy Re = 600 MPa zapas wynosiłby 3,53, czyli byłby nieco mniejszy od zapasu na ściskanie według maksimum normalnego. Oba modele prowadzą więc do podobnego rzędu wielkości, ale nie do identycznej liczby.',
  figure: {
    kind: 'cube',
    stresses: { x: 25, y: -10, z: -160 },
    strains: { x: 0.00038, y: 0.0001525, z: -0.0008225 },
    volumeChange: '−0,029%',
    values: [
      { label: 'σ_1', value: '25 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_2', value: '−10 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_3', value: '−160 MPa', focus: 'stress', reveal: 0 },
      { label: 'k_r', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'k_c', value: '600 MPa', focus: 'stress', reveal: 0 },
      { label: 'n_t', value: '6,0', focus: 'stress' },
      { label: 'n_c', value: '3,75', focus: 'stress' },
      { label: 'σ_1,prog', value: '40 MPa', focus: 'stress' },
      { label: 'σ_HMH', value: '170,2 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '3,53', focus: 'stress' },
      { label: 'ε_1', value: '380 με', focus: 'strain' },
      { label: 'ε_2', value: '152,5 με', focus: 'strain' },
      { label: 'ε_3', value: '−822,5 με', focus: 'strain' },
      { label: 'θ', value: '−290 με', focus: 'volume' },
    ],
    note: 'O wyniku decyduje ściskanie, mimo że wytrzymałość na ściskanie jest czterokrotnie większa od wytrzymałości na rozciąganie.',
  },
  scenes: [
    {
      title: 'Zapisz naprężenia główne',
      narration:
        'Żeliwny element jest poddany naprężeniom głównym σ_1 = 25 MPa, σ_2 = −10 MPa i σ_3 = −160 MPa. Materiał ma k_r = 150 MPa i k_c = 600 MPa. Na osi naprężeń widać, że zero nie jest skrajną wartością: dominuje ściskanie σ_3.',
      caption: 'σ_1 = 25 MPa, σ_2 = −10 MPa, σ_3 = −160 MPa.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula:
        '\\sigma_1=25\\,\\text{MPa},\\qquad \\sigma_2=-10\\,\\text{MPa},\\qquad \\sigma_3=-160\\,\\text{MPa},\\qquad k_r=150\\,\\text{MPa},\\qquad k_c=600\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź warunek rozciągania',
      narration:
        'Największe naprężenie dodatnie wynosi 25 MPa, więc 25 ≤ 150 MPa. Zapas na rozciąganie to n_t = 150/25 = 6,0.',
      caption: '25 MPa ≤ 150 MPa, n_t = 6,0.',
      visual: 'cube',
      focus: { metric: 'tension' },
      formula: '25\\le150\\,\\text{MPa},\\qquad n_t=\\frac{150}{25}=6{,}0',
    },
    {
      title: 'Sprawdź warunek ściskania',
      narration:
        'Największe naprężenie ujemne co do modułu wynosi 160 MPa, więc 160 ≤ 600 MPa. Zapas n_c = 600/160 = 3,75, więc o wyniku decyduje ściskanie.',
      caption: '160 MPa ≤ 600 MPa, n_c = 3,75.',
      visual: 'cube',
      focus: { metric: 'compression' },
      formula: '160\\le600\\,\\text{MPa},\\qquad n_c=\\frac{600}{160}=3{,}75',
    },
    {
      title: 'Wyznacz próg decyzyjny',
      narration:
        'Gdyby zwiększać tylko σ_1, rozciąganie przejęłoby decydującą rolę przy 150/σ_1 = 600/160, czyli σ_1 = 150·160/600 = 40 MPa. Dla σ_1 powyżej 40 MPa zapas na rozciąganie byłby mniejszy niż 3,75.',
      caption: 'Próg: σ_1 = 40 MPa.',
      visual: 'cube',
      focus: { metric: 'threshold' },
      formula: '\\frac{150}{\\sigma_1}=\\frac{600}{160},\\qquad \\sigma_1=\\frac{150\\cdot160}{600}=40\\,\\text{MPa}',
    },
    {
      title: 'Porównaj z HMH',
      narration:
        'HMH daje √28 975 = 170,2 MPa. Przy R_e = 600 MPa zapas wynosi 3,53, czyli nieco mniej od zapasu na ściskanie według maksimum normalnego.',
      caption: 'σ_HMH = 170,2 MPa, n_HMH = 3,53.',
      visual: 'cube',
      focus: { metric: 'compare' },
      formula:
        '\\sigma_{HMH}=\\sqrt{25^2+10^2+160^2-25\\cdot(-10)-(-10)\\cdot(-160)-(-160)\\cdot25}=\\sqrt{28\\,975}=170{,}2\\,\\text{MPa},\\qquad n_{HMH}=\\frac{600}{170{,}2}=3{,}53',
    },
  ],
} satisfies SolutionData
