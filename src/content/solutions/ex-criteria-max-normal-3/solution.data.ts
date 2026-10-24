import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-criteria-max-normal-3',
  title: 'Hipoteza największego naprężenia normalnego — przykład 3',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.MaxNormalExample3Animation }))),
  duration: 7,
  given: ['σy = −40 MPa', 'σx = 0', 'kr = 150 MPa', 'n = 2,0'],
  result:
    'Warto zauważyć, że w tym zadaniu zwiększanie ścinania zwiększa jednocześnie naprężenie rozciągające i ściskające. Nie można więc powiedzieć, że „ścinanie jest bezpieczne, dopóki nie przekracza granicy ścinania”. W hipotezie maksimum normalnego ścinanie jest tylko pośrednim sposobem wytworzenia naprężeń głównych. To kolejny powód, dla którego trzeba najpierw policzyć σ1 i σ2, a dopiero potem porównywać je z granicami.',
  figure: {
    kind: 'cube',
    stresses: { x: 0, y: -40, z: 0 },
    strains: { x: 0.0005475, y: 0.00006, z: -0.0006875 },
    volumeChange: '−0,008%',
    values: [
      { label: 'σ_x', value: '0 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '−40 MPa', focus: 'stress', reveal: 0 },
      { label: 'k_r', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'n', value: '2,0', focus: 'stress', reveal: 0 },
      { label: 'k_r/n', value: '75 MPa', focus: 'stress' },
      { label: 'τ_max', value: '92,9 MPa', focus: 'stress' },
      { label: 'C', value: '−20 MPa', focus: 'stress' },
      { label: 'R', value: '95 MPa', focus: 'stress' },
      { label: 'σ_1', value: '75 MPa', focus: 'stress' },
      { label: 'σ_2', value: '0 MPa', focus: 'stress' },
      { label: 'σ_3', value: '−115 MPa', focus: 'stress' },
      { label: 'ε_1', value: '547,5 με', focus: 'strain' },
      { label: 'ε_2', value: '60 με', focus: 'strain' },
      { label: 'ε_3', value: '−687,5 με', focus: 'strain' },
      { label: 'θ', value: '−80 με', focus: 'volume' },
    ],
    note: 'Decyduje rozciąganie: przy τ = 92,9 MPa otrzymujemy σ_1 = 75 MPa, czyli dokładnie k_r/n.',
  },
  scenes: [
    {
      title: 'Zapisz stan naprężenia',
      narration:
        'Płyta z materiału kruchego jest ściskana w jednym kierunku: σ_y = −40 MPa, σ_x = 0. Dopuszczalna wytrzymałość na rozciąganie wynosi k_r = 150 MPa, a wymagany zapas n = 2,0, więc naprężenie dopuszczalne to k_r/n = 75 MPa.',
      caption: 'σ_x = 0, σ_y = −40 MPa, k_r = 150 MPa, n = 2,0, σ_dop = 75 MPa.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula:
        '\\sigma_x=0,\\qquad \\sigma_y=-40\\,\\text{MPa},\\qquad k_r=150\\,\\text{MPa},\\qquad n=2{,}0,\\qquad \\frac{k_r}{n}=75\\,\\text{MPa}',
    },
    {
      title: 'Powiąż τ z naprężeniem głównym',
      narration:
        'Środek koła Mohra to C = −20 MPa, a promień R = √(20² + τ²). Naprężenia główne wynoszą σ_1 = −20 + R i σ_2 = −20 − R. Największe rozciągające to σ_1, więc wymagamy −20 + √(400 + τ²) ≤ 75.',
      caption: 'σ_1 = −20 + √(400 + τ²) ≤ 75 MPa.',
      visual: 'cube',
      focus: { metric: 'mohr' },
      formula:
        'C=-20\\,\\text{MPa},\\qquad R=\\sqrt{20^2+\\tau^2},\\qquad \\sigma_1=-20+\\sqrt{400+\\tau^2}\\le75\\,\\text{MPa}',
    },
    {
      title: 'Wyznacz maksymalne τ',
      narration:
        'Po przekształceniu √(400 + τ²) ≤ 95, więc 400 + τ² ≤ 9 025. Stąd τ² ≤ 8 625 i τ ≤ 92,9 MPa. Przy tej wartości koło Mohra styka się z granicą σ_1 = 75 MPa.',
      caption: 'τ_max = 92,9 MPa.',
      visual: 'cube',
      focus: { metric: 'limit' },
      formula:
        '\\sqrt{400+\\tau^2}\\le95,\\qquad 400+\\tau^2\\le9\\,025,\\qquad \\tau^2\\le8\\,625,\\qquad \\tau\\le92{,}9\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź naprężenia przy τ_max',
      narration:
        'Przy τ = 92,9 MPa otrzymujemy σ_1 = 75 MPa i σ_2 = −115 MPa. Warunek ściskania 115 ≤ k_c/n jest spełniony z dużym zapasem, jeśli k_c = 600 MPa. O wyniku decyduje rozciąganie, które osiąga granicę.',
      caption: 'σ_1 = 75 MPa, σ_2 = −115 MPa; decyduje rozciąganie.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: '\\sigma_1=-20+\\sqrt{400+92{,}9^2}=75\\,\\text{MPa},\\qquad \\sigma_2=-20-95=-115\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
