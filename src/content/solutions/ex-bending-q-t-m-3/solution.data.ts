import type { SolutionData } from '../../model'
import { lazy } from 'react'

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
  animation: lazy(() => import('./animation').then((module) => ({ default: module.BendingQtmInverseAnimation }))),
  scenes: [
    {
      title: 'Dany moment M(x)',
      narration:
        'Tym razem znamy funkcję momentu i odtwarzamy obciążenie. Dla belki swobodnie podpartej o L = 6 m moment opisuje wzór M(x) = 12x − 2x² kN·m. Parabola startuje z zera, osiąga 18 kN·m w środku i wraca do zera na podporze B.',
      caption: 'Model i dana funkcja momentu; wykres M jest parabolą wypukłą do góry.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(x) = 12x - 2x^2\\ \\text{kN·m},\\qquad 0 \\le x \\le 6\\ \\text{m}',
    },
    {
      title: 'Różniczkujemy M i otrzymujemy T',
      narration:
        'Pochodna momentu jest siłą tnącą: T(x) = dM/dx = 12 − 4x kN. Styczna do wykresu M ma w każdym punkcie nachylenie równe T(x); na lewej podporze T = 12 kN, w środku T = 0, a na prawej T = −12 kN.',
      caption: 'Nachylenie M maleje liniowo i przechodzi przez zero razem z T.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(x) = \\frac{dM}{dx} = 12 - 4x\\ \\text{kN}',
    },
    {
      title: 'Różniczkujemy T i otrzymujemy q',
      narration:
        'Pochodna siły tnącej wynosi dT/dx = −4 kN/m, więc q = −dT/dx = 4 kN/m. Ujemne nachylenie T oznacza dodatnie obciążenie działające w dół, stałe na całej długości belki.',
      caption: 'Stała pochodna T oznacza stałe obciążenie q; na wykresie pojawiają się strzałki q.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'q(x) = -\\frac{dT}{dx} = 4\\ \\text{kN/m}',
    },
    {
      title: 'Reakcje z końców wykresu T',
      narration:
        'Reakcje odczytujemy z końców wykresu T: R_A = T(0) = 12 kN oraz R_B = −T(6) = 12 kN. Suma reakcji wynosi 24 kN, czyli tyle, ile wypadkowa obciążenia qL = 4 · 6 = 24 kN.',
      caption: 'Początek i koniec wykresu T wyznaczają reakcje podporowe.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = T(0) = 12\\ \\text{kN},\\qquad R_B = -T(6) = 12\\ \\text{kN}',
    },
    {
      title: 'Kontrola maksimum momentu',
      narration:
        'Siła tnąca znika w x = 3 m, więc moment osiąga tam maksimum M(3) = 18 kN·m. Pole pod wykresem T od 0 do 3 m też wynosi 18, a kontrola qL²/8 = 18 kN·m potwierdza wynik.',
      caption: 'T = 0 wskazuje maksimum M; pole pod T i wzór qL²/8 dają tę samą wartość.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{\\max} = M(3) = 18\\ \\text{kN·m},\\qquad \\frac{qL^2}{8} = 18\\ \\text{kN·m}',
    },
  ],
} satisfies SolutionData
