import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-moment-diagram',
  title: 'Moment zginający M(x) — przykład 1',
  duration: 7,
  given: ['L = 6 m', 'P = 30 kN', 'a = 2 m'],
  result:
    'Maksymalny moment wynosi M_max = 40 kN·m pod siłą. Wykres M rośnie liniowo od zera do 40 kN·m, a następnie maleje liniowo do zera.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 30, label: 'P = 30 kN' }],
    shear: [
      [
        [0, 20],
        [2, 20],
      ],
      [
        [2, -10],
        [6, -10],
      ],
    ],
    moment: [
      [
        [0, 0],
        [2, 40],
      ],
      [
        [2, 40],
        [6, 0],
      ],
    ],
    markers: [
      { x: 2, y: 20, text: 'T = 20 kN', diagram: 'shear' },
      { x: 2, y: -10, text: 'T = -10 kN', diagram: 'shear' },
      { x: 2, y: 40, text: 'M = 40 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '30,0 kN', focus: 'load' },
      { label: 'R_A', value: '20,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '10,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '40,0 kN·m', focus: 'M' },
    ],
    note: 'Moment rośnie liniowo do 40 kN·m pod siłą, a potem liniowo maleje do zera w podporze B.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Z sumy momentów względem A: R_B · 6 = 30 · 2, więc R_B = 10 kN.',
      caption: 'Z sumy momentów względem A: R_B · 6 = 30 · 2, więc R_B = 10 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B \\cdot 6 = 30 \\cdot 2',
    },
    {
      title: 'Krok 2',
      narration: 'Z sumy sił pionowych: R_A = 30 - 10 = 20 kN.',
      caption: 'Z sumy sił pionowych: R_A = 30 - 10 = 20 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = 30 - 10 = 20',
    },
    {
      title: 'Krok 3',
      narration: 'Dla x od 0 do 2 m: M(x) = R_A x = 20x kN·m.',
      caption: 'Dla x od 0 do 2 m: M(x) = R_A x = 20x kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'x',
    },
    {
      title: 'Krok 4',
      narration: 'Pod siłą: M(2) = 20 · 2 = 40 kN·m.',
      caption: 'Pod siłą: M(2) = 20 · 2 = 40 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(2) = 20 \\cdot 2 = 40',
    },
    {
      title: 'Krok 5',
      narration: 'Dla x od 2 do 6 m: M(x) = 20x - 30(x - 2) kN·m.',
      caption: 'Dla x od 2 do 6 m: M(x) = 20x - 30(x - 2) kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'x',
    },
    {
      title: 'Krok 6',
      narration: 'Na prawym końcu: M(6) = 120 - 30 · 4 = 0, zgodnie z warunkiem podpory.',
      caption: 'Na prawym końcu: M(6) = 120 - 30 · 4 = 0, zgodnie z warunkiem podpory.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(6) = 120 - 30 \\cdot 4 = 0',
    },
    {
      title: 'Krok 7',
      narration: 'Kontrola z prawej strony: M(2) = R_B · 4 = 10 · 4 = 40 kN·m.',
      caption: 'Kontrola z prawej strony: M(2) = R_B · 4 = 10 · 4 = 40 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(2) = R_B \\cdot 4 = 10 \\cdot 4 = 40',
    },
  ],
} satisfies SolutionData
