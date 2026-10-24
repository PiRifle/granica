import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-beams-reactions',
  title: 'Belki i reakcje podporowe — przykład 1',
  duration: 7,
  given: ['L = 6 m', 'q = 2 kN/m', 'a = 4 m', 'P = 24 kN'],
  result:
    'R_A = 14 kN, R_B = 22 kN. Reakcje sumują się do 36 kN, czyli do całkowitego obciążenia P + Q. Moment pod siłą wynosi 40 kN·m.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    distributed: [{ from: 0, to: 6, start: 2, end: 2, label: 'q = 2 kN/m' }],
    pointLoads: [{ at: 4, value: 24, label: 'P = 24 kN' }],
    shear: [
      [
        [0, 14],
        [4, 6],
      ],
      [
        [4, -18],
        [6, -22],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 13],
        [2, 24],
        [3, 33],
        [4, 40],
      ],
      [
        [4, 40],
        [5, 25],
        [6, 0],
      ],
    ],
    markers: [
      { x: 4, y: 6, text: 'T = 6 kN', diagram: 'shear' },
      { x: 4, y: -18, text: 'T = -18 kN', diagram: 'shear' },
      { x: 4, y: 40, text: 'M = 40 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'Q', value: '12,0 kN', focus: 'load' },
      { label: 'x_Q', value: '3,0 m od A', focus: 'load' },
      { label: 'P', value: '24,0 kN', focus: 'load', reveal: 0 },
      { label: 'R_A', value: '14,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '22,0 kN', focus: 'reaction' },
      { label: 'M pod P', value: '40,0 kN·m', focus: 'M' },
    ],
    note: 'Wypadkowa Q = 12 kN działa w x = 3 m, a maksimum momentu wypada pod siłą P.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Oblicz wypadkową obciążenia ciągłego: Q = qL = 2 · 6 = 12 kN.',
      caption: 'Oblicz wypadkową obciążenia ciągłego: Q = qL = 2 · 6 = 12 kN.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q = qL = 2 \\cdot 6 = 12',
    },
    {
      title: 'Krok 2',
      narration: 'Wypadkowa Q działa w połowie rozpiętości, czyli w odległości 3 m od A.',
      caption: 'Wypadkowa Q działa w połowie rozpiętości, czyli w odległości 3 m od A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'x_Q=\\frac{L}{2}=\\frac{6}{2}=3\\,\\mathrm{m}',
    },
    {
      title: 'Krok 3',
      narration: 'Suma momentów względem A: R_B · 6 = P · 4 + Q · 3 = 24 · 4 + 12 · 3.',
      caption: 'Suma momentów względem A: R_B · 6 = P · 4 + Q · 3 = 24 · 4 + 12 · 3.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B \\cdot 6 = P \\cdot 4 + Q \\cdot 3 = 24 \\cdot 4 + 12 \\cdot 3',
    },
    {
      title: 'Krok 4',
      narration: 'Stąd R_B · 6 = 96 + 36 = 132, więc R_B = 22 kN.',
      caption: 'Stąd R_B · 6 = 96 + 36 = 132, więc R_B = 22 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B \\cdot 6 = 96 + 36 = 132',
    },
    {
      title: 'Krok 5',
      narration: 'Suma sił pionowych: R_A = P + Q - R_B = 24 + 12 - 22 = 14 kN.',
      caption: 'Suma sił pionowych: R_A = P + Q - R_B = 24 + 12 - 22 = 14 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = P + Q - R_B = 24 + 12 - 22 = 14',
    },
    {
      title: 'Krok 6',
      narration: 'Kontrola momentów względem B: R_A · 6 - P · 2 - Q · 3 = 84 - 48 - 36 = 0.',
      caption: 'Kontrola momentów względem B: R_A · 6 - P · 2 - Q · 3 = 84 - 48 - 36 = 0.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A \\cdot 6 - P \\cdot 2 - Q \\cdot 3 = 84 - 48 - 36 = 0',
    },
    {
      title: 'Krok 7',
      narration: 'Moment pod siłą: M = R_A · 4 - q · 4 · 2 = 56 - 16 = 40 kN·m.',
      caption: 'Moment pod siłą: M = R_A · 4 - q · 4 · 2 = 56 - 16 = 40 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M = R_A \\cdot 4 - q \\cdot 4 \\cdot 2 = 56 - 16 = 40',
    },
  ],
} satisfies SolutionData
