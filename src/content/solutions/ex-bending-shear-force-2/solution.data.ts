import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-shear-force-2',
  title: 'Siła tnąca T(x) — przykład 2',
  duration: 7,
  given: ['L = 5 m', 'q = 4 kN/m'],
  result:
    'Miejsce, w którym T = 0, jest ważne. Oznacza ono, że na lewo od tego punktu wypadkowa sił pionowych równoważy się z reakcją, a na prawo przeważa obciążenie. W następnej lekcji zobaczysz, że właśnie tam moment zginający osiąga ekstremum.',
  figure: {
    kind: 'beam',
    length: 5,
    supports: [
      { at: 0, label: 'A' },
      { at: 5, label: 'B' },
    ],
    distributed: [{ from: 0, to: 5, start: 4, end: 4, label: 'q = 4 kN/m' }],
    shear: [
      [
        [0, 10],
        [2.5, 0],
        [5, -10],
      ],
    ],
    moment: [
      [
        [0, 0],
        [0.5, 4.5],
        [1, 8],
        [1.5, 10.5],
        [2, 12],
        [2.5, 12.5],
        [3, 12],
        [3.5, 10.5],
        [4, 8],
        [4.5, 4.5],
        [5, 0],
      ],
    ],
    markers: [
      { x: 2.5, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2.5, y: 12.5, text: 'M = 12,5 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'q', value: '4,0 kN/m', focus: 'load' },
      { label: 'R_A', value: '10,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '10,0 kN', focus: 'reaction' },
      { label: 'T(0)', value: '10,0 kN', focus: 'T' },
      { label: 'T(2,5)', value: '0 kN', focus: 'T' },
      { label: 'T(5)', value: '-10,0 kN', focus: 'T' },
      { label: 'M_max', value: '12,5 kN·m', focus: 'M' },
    ],
    note: 'Nachylenie wykresu T wynosi -q = -4 kN/m, a zero wypada w połowie rozpiętości.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy belkę swobodnie podpartą o rozpiętości L = 5 m, obciążoną równomiernie na całej długości q = 4 kN/m. Z symetrii reakcje wynoszą R_A = R_B = qL/2 = 10 kN. Tym razem wykres siły tnącej nie składa się z poziomych odcinków, lecz z jednej linii prostej.',
      caption:
        'Rozważmy belkę swobodnie podpartą o rozpiętości L = 5 m, obciążoną równomiernie na całej długości q = 4 kN/m. Z symetrii reakcje…',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'L = 5 m',
    },
    {
      title: 'Krok 2',
      narration: 'Dla x od 0 do 5 m mamy',
      caption: 'Dla x od 0 do 5 m mamy',
      visual: 'beam',
      focus: { metric: 'T' },
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'T(x) = R_A - qx = 10 - 4x kN.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(x) = R_A - qx = 10 - 4x\\ \\text{kN}.',
    },
    {
      title: 'Krok 4',
      narration:
        'Na lewym końcu T(0) = +10 kN. W połowie rozpiętości T(2,5) = 0. Na prawym końcu, tuż przed podporą, T(5) = -10 kN. Reakcja R_B = 10 kN w górę domyka wykres do zera. Nachylenie wynosi -4 kN/m, czyli dokładnie -q, zgodnie z zależnością dT/dx = -q.',
      caption:
        'Na lewym końcu T(0) = +10 kN. W połowie rozpiętości T(2,5) = 0. Na prawym końcu, tuż przed podporą, T(5) = -10 kN. Reakcja R_B =…',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(0) = +10 kN',
    },
    {
      title: 'Krok 5',
      narration:
        'Miejsce, w którym T = 0, jest ważne. Oznacza ono, że na lewo od tego punktu wypadkowa sił pionowych równoważy się z reakcją, a na prawo przeważa obciążenie. W następnej lekcji zobaczysz, że właśnie tam moment zginający osiąga ekstremum.',
      caption:
        'Miejsce, w którym T = 0, jest ważne. Oznacza ono, że na lewo od tego punktu wypadkowa sił pionowych równoważy się z reakcją, a na…',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T = 0',
    },
  ],
} satisfies SolutionData
