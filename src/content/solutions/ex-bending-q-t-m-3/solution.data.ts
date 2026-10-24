import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-q-t-m-3',
  title: 'Zależności q–T–M — przykład 3',
  duration: 7,
  given: ['L = 6 m'],
  result:
    'Kontrola wzorem qL^2/8 = 4 · 36 / 8 = 18 kN·m potwierdza wynik. Ten wariant pokazuje, że cała informacja o obciążeniu jest zawarta w drugiej pochodnej momentu.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    distributed: [{ from: 0, to: 6, start: 4, end: 4, label: 'q = 4 kN/m' }],
    shear: [
      [
        [0, 12],
        [3, 0],
        [6, -12],
      ],
    ],
    moment: [
      [
        [0, 0],
        [0.5, 5.5],
        [1, 10],
        [1.5, 13.5],
        [2, 16],
        [2.5, 17.5],
        [3, 18],
        [3.5, 17.5],
        [4, 16],
        [4.5, 13.5],
        [5, 10],
        [5.5, 5.5],
        [6, 0],
      ],
    ],
    markers: [
      { x: 3, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 3, y: 18, text: 'M = 18 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'q', value: '4,0 kN/m', focus: 'load' },
      { label: 'R_A', value: '12,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '12,0 kN', focus: 'reaction' },
      { label: 'T_max', value: '12,0 kN', focus: 'T' },
      { label: 'M_max', value: '18,0 kN·m', focus: 'M' },
    ],
    note: 'Z funkcji M(x) = 12x - 2x² otrzymujemy T(x) = 12 - 4x oraz stałe q = 4 kN/m.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem znamy funkcję momentu i odtwarzamy obciążenie. Dla belki swobodnie podpartej o L = 6 m moment opisuje wzór',
      caption:
        'Tym razem znamy funkcję momentu i odtwarzamy obciążenie. Dla belki swobodnie podpartej o L = 6 m moment opisuje wzór',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'L = 6 m',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'M(x) = 12x - 2x^2 kN·m, 0 ≤ x ≤ 6 m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(x) = 12x - 2x^2\\ \\text{kN·m}, \\qquad 0 \\le x \\le 6\\ \\text{m}.',
    },
    {
      title: 'Krok 3',
      narration: 'Jaka jest siła tnąca, obciążenie i reakcje? Różniczkujemy moment:',
      caption: 'Jaka jest siła tnąca, obciążenie i reakcje? Różniczkujemy moment:',
      visual: 'beam',
      focus: { metric: 'T' },
    },
    {
      title: 'Krok 4',
      narration: 'Zapis matematyczny.',
      caption: 'T(x) = (dM)/(dx) = 12 - 4x kN.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(x) = \\frac{dM}{dx} = 12 - 4x\\ \\text{kN}.',
    },
    {
      title: 'Krok 5',
      narration: 'Następnie różniczkujemy siłę tnącą:',
      caption: 'Następnie różniczkujemy siłę tnącą:',
      visual: 'beam',
      focus: { metric: 'load' },
    },
    {
      title: 'Krok 6',
      narration: 'Zapis matematyczny.',
      caption: 'q(x) = -(dT)/(dx) = 4 kN/m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'q(x) = -\\frac{dT}{dx} = 4\\ \\text{kN/m}.',
    },
    {
      title: 'Krok 7',
      narration:
        'Obciążenie jest więc stałe i działa w dół. Reakcje odczytujemy z końców wykresu T: R_A = T(0) = 12 kN, a R_B = -T(6) = 12 kN. Suma reakcji wynosi 24 kN, czyli tyle, ile wypadkowa obciążenia qL = 4 · 6 = 24 kN. Maksimum momentu wypada tam, gdzie T = 0, czyli w x = 3 m:',
      caption:
        'Obciążenie jest więc stałe i działa w dół. Reakcje odczytujemy z końców wykresu T: R_A = T(0) = 12 kN, a R_B = -T(6) = 12 kN.…',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_{A} = T(0) = 12 kN',
    },
    {
      title: 'Krok 8',
      narration: 'Zapis matematyczny.',
      caption: 'M_max = M(3) = 36 - 18 = 18 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{\\max} = M(3) = 36 - 18 = 18\\ \\text{kN·m}.',
    },
    {
      title: 'Krok 9',
      narration:
        'Kontrola wzorem qL^2/8 = 4 · 36 / 8 = 18 kN·m potwierdza wynik. Ten wariant pokazuje, że cała informacja o obciążeniu jest zawarta w drugiej pochodnej momentu.',
      caption:
        'Kontrola wzorem qL^2/8 = 4 · 36 / 8 = 18 kN·m potwierdza wynik. Ten wariant pokazuje, że cała informacja o obciążeniu jest…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'qL^{2}/8 = 4 \\cdot 36 / 8 = 18 kN\\cdot m',
    },
  ],
} satisfies SolutionData
