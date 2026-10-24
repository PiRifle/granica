import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-q-t-m',
  title: 'Zależności q–T–M — przykład 1',
  duration: 7,
  given: ['L = 5 m', 'q = 8 kN/m'],
  result:
    'T maleje liniowo od +20 kN do -20 kN i znika w połowie rozpiętości. Moment jest paraboliczny, a jego maksimum wynosi 25 kN·m w środku belki.',
  figure: {
    kind: 'beam',
    length: 5,
    supports: [
      { at: 0, label: 'A' },
      { at: 5, label: 'B' },
    ],
    distributed: [{ from: 0, to: 5, start: 8, end: 8, label: 'q = 8 kN/m' }],
    shear: [
      [
        [0, 20],
        [2.5, 0],
        [5, -20],
      ],
    ],
    moment: [
      [
        [0, 0],
        [0.5, 9],
        [1, 16],
        [1.5, 21],
        [2, 24],
        [2.5, 25],
        [3, 24],
        [3.5, 21],
        [4, 16],
        [4.5, 9],
        [5, 0],
      ],
    ],
    markers: [
      { x: 2.5, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2.5, y: 25, text: 'M = 25 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'q', value: '8,0 kN/m', focus: 'load' },
      { label: 'R_A', value: '20,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '20,0 kN', focus: 'reaction' },
      { label: 'T_max', value: '20,0 kN', focus: 'T' },
      { label: 'M_max', value: '25,0 kN·m', focus: 'M' },
    ],
    note: 'T maleje liniowo od +20 kN do -20 kN i zeruje się w środku, gdzie moment osiąga 25 kN·m.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Reakcje z symetrii: R_A = R_B = qL/2 = 8 · 5 / 2 = 20 kN.',
      caption: 'Reakcje z symetrii: R_A = R_B = qL/2 = 8 · 5 / 2 = 20 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = R_B = qL/2 = 8 \\cdot 5 / 2 = 20',
    },
    {
      title: 'Krok 2',
      narration: 'Siła tnąca: T(x) = R_A - qx = 20 - 8x kN.',
      caption: 'Siła tnąca: T(x) = R_A - qx = 20 - 8x kN.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(x) = R_A - qx = 20 - 8x',
    },
    {
      title: 'Krok 3',
      narration: 'Miejsce zerowe: 20 - 8x = 0 daje x = 2,5 m.',
      caption: 'Miejsce zerowe: 20 - 8x = 0 daje x = 2,5 m.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: '20 - 8x = 0',
    },
    {
      title: 'Krok 4',
      narration: 'Moment: M(x) = R_A x - qx^2/2 = 20x - 4x^2 kN·m.',
      caption: 'Moment: M(x) = R_A x - qx^2/2 = 20x - 4x^2 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(x) = R_A x - qx^2/2 = 20x - 4x^2',
    },
    {
      title: 'Krok 5',
      narration: 'Maksimum: M(2,5) = 50 - 25 = 25 kN·m.',
      caption: 'Maksimum: M(2,5) = 50 - 25 = 25 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(2{,}5) = 50 - 25 = 25',
    },
    {
      title: 'Krok 6',
      narration: 'Kontrola wzorem: qL^2/8 = 8 · 25 / 8 = 25 kN·m.',
      caption: 'Kontrola wzorem: qL^2/8 = 8 · 25 / 8 = 25 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'qL^2/8 = 8 \\cdot 25 / 8 = 25',
    },
    {
      title: 'Krok 7',
      narration:
        'Kontrola jednostek: q = 8 kN/m = 8 N/mm, L = 5000 mm, R_A = 20 000 N, a moment w N·mm wynosi 20 000 · 2500 - 8 · 2500^2/2 = 25 000 000 N·mm, czyli 25 kN·m.',
      caption:
        'Kontrola jednostek: q = 8 kN/m = 8 N/mm, L = 5000 mm, R_A = 20 000 N, a moment w N·mm wynosi 20 000 · 2500 - 8 · 2500^2/2 = 25…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'q = 8',
    },
  ],
} satisfies SolutionData
