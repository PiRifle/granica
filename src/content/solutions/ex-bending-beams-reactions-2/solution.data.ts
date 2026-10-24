import type { SolutionData } from '../../model'

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
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy belkę wspornikową o długości L = 2,5 m, utwierdzoną w lewym końcu. Na całej długości działa obciążenie równomierne q = 4 kN/m, a na swobodnym końcu działa siła skupiona P = 6 kN w dół. Tym razem podpora w utwierdzeniu daje nie tylko siłę pionową, ale także moment reakcyjny.',
      caption:
        'Rozważmy belkę wspornikową o długości L = 2,5 m, utwierdzoną w lewym końcu. Na całej długości działa obciążenie równomierne q = 4…',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L = 2{,}5 m',
    },
    {
      title: 'Krok 2',
      narration:
        'Wypadkowa obciążenia ciągłego wynosi Q = qL = 4 · 2,5 = 10 kN i działa w odległości 1,25 m od utwierdzenia. Suma sił pionowych daje reakcję R = P + Q = 16 kN. Moment reakcyjny musi zrównoważyć moment obu obciążeń względem utwierdzenia:',
      caption:
        'Wypadkowa obciążenia ciągłego wynosi Q = qL = 4 · 2,5 = 10 kN i działa w odległości 1,25 m od utwierdzenia. Suma sił pionowych…',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q = qL = 4 \\cdot 2{,}5 = 10 kN',
    },
    {
      title: 'Położenie wypadkowej obciążenia ciągłego',
      narration:
        'Wypadkowa Q działa w środku rozpiętości, czyli w odległości L/2 od utwierdzenia. To ramię decyduje o momencie obciążenia ciągłego względem A.',
      caption: 'Wypadkowa Q działa 1,25 m od A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'x_Q=\\frac{L}{2}=1{,}25\\ \\text{m}',
    },
    {
      title: 'Reakcja pionowa utwierdzenia',
      narration:
        'Suma sił pionowych daje reakcję R = P + Q. Zwrot reakcji jest przeciwny do obciążeń, a jej wartość wynosi 16 kN.',
      caption: 'R = 16 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R=P+Q=6+10=16\\ \\text{kN}',
    },
    {
      title: 'Moment od obciążenia ciągłego',
      narration: 'Moment wypadkowej Q względem utwierdzenia wynosi Q razy L/2.',
      caption: 'M_Q = 12,5 kN·m.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'M_Q=Q\\cdot\\frac{L}{2}=10\\cdot1{,}25=12{,}5\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola równowagi momentów',
      narration: 'Moment reakcyjny równoważy sumę momentów od siły P i wypadkowej Q.',
      caption: 'Bilans momentów się zgadza.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'M_R=P L+Q\\cdot\\frac{L}{2}=15+12{,}5=27{,}5\\ \\text{kN·m}',
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'M_R = P L + Q · (L)/(2) = 6 · 2,5 + 10 · 1,25 = 15 + 12,5 = 27,5 kN·m.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula:
        'M_R = P L + Q \\cdot \\frac{L}{2} = 6 \\cdot 2{,}5 + 10 \\cdot 1{,}25 = 15 + 12{,}5 = 27{,}5\\ \\text{kN·m}.',
    },
    {
      title: 'Krok 4',
      narration:
        'Reakcja momentowa ma więc wartość 27,5 kN·m i działa przeciwnie do wypadkowego momentu obciążeń. Ten przykład pokazuje, że utwierdzenie przenosi trzy wielkości: dwie siły i moment. Jeżeli w zadaniu pominiesz moment reakcyjny, belka nie będzie w równowadze, choć suma sił się zgodzi.',
      caption:
        'Reakcja momentowa ma więc wartość 27,5 kN·m i działa przeciwnie do wypadkowego momentu obciążeń. Ten przykład pokazuje, że…',
      visual: 'beam',
      focus: { metric: 'reaction' },
    },
  ],
} satisfies SolutionData
