import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-shear-force',
  title: 'Siła tnąca T(x) — przykład 1',
  duration: 7,
  given: ['L = 6 m', 'P = 18 kN', 'a = 2 m'],
  result:
    'T = +12 kN na lewym odcinku i T = -6 kN na prawym. Pod siłą występuje skok 18 kN, a wykres zamyka się w podporze B.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 18, label: 'P = 18 kN' }],
    shear: [
      [
        [0, 12],
        [2, 12],
      ],
      [
        [2, -6],
        [6, -6],
      ],
    ],
    moment: [
      [
        [0, 0],
        [2, 24],
      ],
      [
        [2, 24],
        [6, 0],
      ],
    ],
    markers: [
      { x: 2, y: 12, text: 'T = 12 kN', diagram: 'shear' },
      { x: 2, y: -6, text: 'T = -6 kN', diagram: 'shear' },
      { x: 2, y: 24, text: 'M = 24 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '18,0 kN', focus: 'load' },
      { label: 'R_A', value: '12,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '6,0 kN', focus: 'reaction' },
      { label: 'T lewa', value: '12,0 kN', focus: 'T' },
      { label: 'T prawa', value: '-6,0 kN', focus: 'T' },
      { label: 'M_max', value: '24,0 kN·m', focus: 'M' },
    ],
    note: 'Pod siłą wykres T skacze w dół o 18 kN, a reakcja R_B domyka go do zera.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Z sumy momentów względem A: R_B · 6 = 18 · 2, więc R_B = 6 kN.',
      caption: 'Z sumy momentów względem A: R_B · 6 = 18 · 2, więc R_B = 6 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B \\cdot 6 = 18 \\cdot 2',
    },
    {
      title: 'Krok 2',
      narration: 'Z sumy sił pionowych: R_A = 18 - 6 = 12 kN.',
      caption: 'Z sumy sił pionowych: R_A = 18 - 6 = 12 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = 18 - 6 = 12',
    },
    {
      title: 'Krok 3',
      narration: 'Na odcinku od x = 0 do x = 2 m nie ma obciążenia ciągłego, więc T = +12 kN.',
      caption: 'Na odcinku od x = 0 do x = 2 m nie ma obciążenia ciągłego, więc T = +12 kN.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'x = 0',
    },
    {
      title: 'Krok 4',
      narration: 'Pod siłą wykres skacze w dół o 18 kN: 12 - 18 = -6 kN.',
      caption: 'Pod siłą wykres skacze w dół o 18 kN: 12 - 18 = -6 kN.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: '12 - 18 = -6',
    },
    {
      title: 'Krok 5',
      narration: 'Na odcinku od x = 2 m do x = 6 m siła tnąca pozostaje równa -6 kN.',
      caption: 'Na odcinku od x = 2 m do x = 6 m siła tnąca pozostaje równa -6 kN.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'x = 2',
    },
    {
      title: 'Krok 6',
      narration: 'Przy prawej podporze reakcja R_B = 6 kN w górę domyka wykres do zera.',
      caption: 'Przy prawej podporze reakcja R_B = 6 kN w górę domyka wykres do zera.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'R_B = 6',
    },
    {
      title: 'Krok 7',
      narration: 'Kontrola: całkowita zmiana T wynosi +12 - 18 + 6 = 0.',
      caption: 'Kontrola: całkowita zmiana T wynosi +12 - 18 + 6 = 0.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T',
    },
  ],
} satisfies SolutionData
