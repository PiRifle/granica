import type { SolutionData } from '../../model'
import { lazy } from 'react'

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
  animation: lazy(() => import('./animation').then((module) => ({ default: module.BendingQtmAnimation }))),
  scenes: [
    {
      title: 'Model i obciążenie',
      narration:
        'Belka swobodnie podparta o L = 5 m jest obciążona równomiernie q = 8 kN/m. Obciążenie działa w dół na każdym metrze, a jego wypadkowa Q = qL = 40 kN działa w środku rozpiętości.',
      caption: 'Model i dane: dwa podparcia A i B, rozpiętość 5 m oraz stałe obciążenie 8 kN/m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q = qL = 8 \\cdot 5 = 40\\ \\text{kN}',
    },
    {
      title: 'Reakcje z symetrii',
      narration:
        'Obciążenie jest symetryczne, więc obie reakcje są równe: R_A = R_B = qL/2 = 20 kN. Te wartości są warunkami początkowymi dla wykresu siły tnącej.',
      caption: 'Reakcje równe 20 kN zamykają równowagę sił pionowych.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = R_B = \\frac{qL}{2} = \\frac{8 \\cdot 5}{2} = 20\\ \\text{kN}',
    },
    {
      title: 'Siła tnąca z nachylenia −q',
      narration:
        'Siła tnąca wynosi T(x) = R_A − qx = 20 − 8x. Pochodna dT/dx = −q jest stała i ujemna, dlatego wykres T jest liniowo opadający. W x = 2,5 m siła tnąca znika.',
      caption: 'Stałe q daje liniowe T; w połowie rozpiętości T = 0.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(x) = 20 - 8x,\\qquad \\frac{dT}{dx} = -q = -8\\ \\text{kN/m}',
    },
    {
      title: 'Moment jako całka siły tnącej',
      narration:
        'Całkując T(x), otrzymujemy M(x) = 20x − 4x². Nachylenie wykresu M w każdym punkcie jest równe T(x), a pole pod wykresem T od 0 do x daje przyrost momentu.',
      caption: 'T steruje nachyleniem M: dM/dx = T. Obszar pod T rośnie razem z momentem.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(x) = 20x - 4x^2,\\qquad \\frac{dM}{dx} = T(x)',
    },
    {
      title: 'Maksimum tam, gdzie T = 0',
      narration:
        'W x = 2,5 m siła tnąca zmienia znak, więc moment osiąga maksimum M = 25 kN·m. Druga pochodna d²M/dx² = −q jest ujemna, dlatego parabola jest wypukła do góry.',
      caption: 'Ekstremum M wypada przy zerze T, a nie przy największej wartości T.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(2{,}5) = 25\\ \\text{kN·m},\\qquad \\frac{d^2M}{dx^2} = -q',
    },
  ],
} satisfies SolutionData
