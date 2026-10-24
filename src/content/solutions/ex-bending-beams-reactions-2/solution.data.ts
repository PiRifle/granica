import type { SolutionData } from '../../model'
import { BeamReactionsExample2Animation } from './animation'

export default {
  id: 'ex-bending-beams-reactions-2',
  title: 'Belki i reakcje podporowe — przykład 2',
  duration: 7,
  given: ['L = 2,5 m', 'q = 4 kN/m', 'P = 6 kN'],
  result:
    'Reakcja momentowa ma więc wartość 27,5 kN·m i działa przeciwnie do wypadkowego momentu obciążeń. Ten przykład pokazuje, że utwierdzenie przenosi trzy wielkości: dwie siły i moment. Jeżeli w zadaniu pominiesz moment reakcyjny, belka nie będzie w równowadze, choć suma sił się zgodzi.',
  figure: {
    kind: 'beam',
    length: 2.5,
    supports: [{ at: 0, label: 'A' }],
    distributed: [{ from: 0, to: 2.5, start: 4, end: 4, label: 'q = 4 kN/m' }],
    pointLoads: [{ at: 2.5, value: 6, label: 'P = 6 kN' }],
    moments: [{ at: 0, value: 27.5, label: 'M_R = 27,5 kN·m' }],
    shear: [
      [
        [0, 16],
        [2.5, 6],
      ],
    ],
    moment: [
      [
        [0, -27.5],
        [0.625, -18.281],
        [1.25, -10.625],
        [1.875, -4.531],
        [2.5, 0],
      ],
    ],
    markers: [
      { x: 0, y: 16, text: 'R = 16 kN', diagram: 'shear' },
      { x: 0, y: -27.5, text: 'M_R = 27,5 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'Q', value: '10,0 kN', focus: 'load' },
      { label: 'x_Q', value: '1,25 m od A', focus: 'load' },
      { label: 'P', value: '6,0 kN', focus: 'load' },
      { label: 'R', value: '16,0 kN', focus: 'reaction' },
      { label: 'M_R', value: '27,5 kN·m', focus: 'reaction' },
    ],
    note: 'Utwierdzenie A przenosi reakcję pionową R = 16 kN oraz moment M_R = 27,5 kN·m; koniec B jest swobodny.',
  },
  animation: BeamReactionsExample2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka wspornikowa o długości L = 2,5 m jest utwierdzona w lewym końcu A. Na całej długości działa q = 4 kN/m, a na swobodnym końcu B siła P = 6 kN w dół. Utwierdzenie może przenieść siłę pionową i moment reakcyjny.',
      caption: 'Koniec B jest swobodny; reakcje w A to siła R i moment M_R.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula: 'L = 2{,}5\\ \\text{m},\\quad q = 4\\ \\text{kN/m},\\quad P = 6\\ \\text{kN}',
    },
    {
      title: 'Wypadkowa obciążenia ciągłego',
      narration:
        'Wypadkowa obciążenia ciągłego Q = qL = 4 · 2,5 = 10 kN działa w odległości L/2 = 1,25 m od utwierdzenia. To ramię decyduje o momencie obciążenia ciągłego względem A.',
      caption: 'Q = 10 kN działa w środku rozpiętości, 1,25 m od A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q = qL = 4 \\cdot 2{,}5 = 10\\ \\text{kN},\\quad x_Q = \\frac{L}{2} = 1{,}25\\ \\text{m}',
    },
    {
      title: 'Reakcja pionowa utwierdzenia',
      narration: 'Suma sił pionowych: R = P + Q = 6 + 10 = 16 kN. Reakcja działa w górę, przeciwnie do obu obciążeń.',
      caption: 'R = 16 kN równoważy pionowe obciążenia.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R = P + Q = 6 + 10 = 16\\ \\text{kN}',
    },
    {
      title: 'Moment reakcyjny utwierdzenia',
      narration:
        'Moment od obciążenia ciągłego względem A wynosi Q · L/2 = 12,5 kN·m, a od siły P: P · L = 15 kN·m. Reakcja momentowa M_R działa przeciwnie do ruchu wskazówek zegara i wynosi 27,5 kN·m.',
      caption: 'M_R = 15 + 12,5 = 27,5 kN·m, zwrot przeciwny do momentu obciążeń.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula:
        'M_Q = Q \\cdot \\frac{L}{2} = 10 \\cdot 1{,}25 = 12{,}5\\ \\text{kN·m} \\\\ M_R = P L + Q \\cdot \\frac{L}{2} = 15 + 12{,}5 = 27{,}5\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola równowagi',
      narration:
        'Kontrola: suma sił R − P − Q = 16 − 6 − 10 = 0 oraz suma momentów M_R − P L − Q · L/2 = 27,5 − 15 − 12,5 = 0. Utwierdzenie przenosi więc dwie siły i moment; pominięcie M_R łamie równowagę mimo zgodnej sumy sił.',
      caption: 'Oba warunki równowagi są spełnione; moment reakcyjny jest niezbędny.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula: 'R - P - Q = 16 - 6 - 10 = 0 \\\\ M_R - P L - Q \\cdot \\frac{L}{2} = 27{,}5 - 15 - 12{,}5 = 0',
    },
  ],
} satisfies SolutionData
