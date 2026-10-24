import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-bending-q-t-m-2',
  title: 'Zależności q–T–M — przykład 2',
  duration: 7,
  given: ['L = 6 m', 'q = 3 kN/m', 'P = 12 kN'],
  result:
    'Wykres momentu jest paraboliczny na obu odcinkach, ale w środku ma charakterystyczne załamanie stycznej, ponieważ siła tnąca zmienia się skokowo. To przykład, w którym załamanie wykresu M nie oznacza błędu: pochodna M jest nieciągła, bo T jest nieciągła.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    distributed: [{ from: 0, to: 6, start: 3, end: 3, label: 'q = 3 kN/m' }],
    pointLoads: [{ at: 3, value: 12, label: 'P = 12 kN' }],
    shear: [
      [
        [0, 15],
        [3, 6],
      ],
      [
        [3, -6],
        [6, -15],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 13.5],
        [2, 24],
        [3, 31.5],
        [4, 28],
        [5, 16.5],
        [6, 0],
      ],
    ],
    markers: [
      { x: 3, y: 6, text: 'T = +6 kN', diagram: 'shear' },
      { x: 3, y: -6, text: 'T = -6 kN', diagram: 'shear' },
      { x: 3, y: 31.5, text: 'M = 31,5 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'q', value: '3,0 kN/m', focus: 'load' },
      { label: 'P', value: '12,0 kN', focus: 'load' },
      { label: 'R_A', value: '15,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '15,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '31,5 kN·m', focus: 'M' },
    ],
    note: 'Pod siłą T skacze z +6 kN do -6 kN, a moment osiąga maksimum 31,5 kN·m.',
  },
  animation: lazy(() => import('./animation').then((module) => ({ default: module.BendingQtmPointLoadAnimation }))),
  scenes: [
    {
      title: 'Model: q oraz siła P',
      narration:
        'Belka swobodnie podparta o L = 6 m jest obciążona równomiernie q = 3 kN/m oraz siłą skupioną P = 12 kN w połowie rozpiętości. Obciążenie jest symetryczne, więc wypadkowa qL = 18 kN działa w środku, podobnie jak siła P.',
      caption: 'Model i dane: rozpiętość 6 m, obciążenie ciągłe 3 kN/m i siła 12 kN w środku.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L = 6\\ \\text{m},\\quad q = 3\\ \\text{kN/m},\\quad P = 12\\ \\text{kN}',
    },
    {
      title: 'Reakcje z symetrii',
      narration:
        'Obciążenie jest symetryczne, więc reakcje są równe: R_A = R_B = (qL + P)/2 = 15 kN. To warunki startowe dla wykresu T po obu stronach belki.',
      caption: 'Obie reakcje wynoszą 15 kN i domykają sumę obciążeń 18 + 12 = 30 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = R_B = \\frac{qL + P}{2} = \\frac{18 + 12}{2} = 15\\ \\text{kN}',
    },
    {
      title: 'Siła tnąca i skok pod P',
      narration:
        'Na lewym odcinku T(x) = 15 − 3x, więc tuż przed siłą T = +6 kN. Pod siłą P siła tnąca skacze w dół o 12 kN do −6 kN, a dalej maleje liniowo do −15 kN. Na obu odcinkach nachylenie pozostaje równe −q.',
      caption: 'Stałe q daje dwa równoległe odcinki liniowe; siła skupiona tworzy skok T.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(x) = 15 - 3x\\ \\text{ dla } x < 3,\\qquad \\frac{dT}{dx} = -q',
    },
    {
      title: 'Moment całkuje siłę tnącą',
      narration:
        'Moment M(x) = 15x − 1,5x² jest paraboliczny, a jego nachylenie w każdym punkcie jest równe T(x). Ponieważ T jest dodatnie przed środkiem, moment rośnie; za środkiem T jest ujemne, więc moment maleje.',
      caption: 'Pole pod T zmienia M. Ciągłość M i skok T dają załamanie stycznej, nie skok momentu.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(x) = 15x - \\frac{3x^2}{2},\\qquad \\frac{dM}{dx} = T(x)',
    },
    {
      title: 'Maksimum przy skoku T',
      narration:
        'Pod siłą P siła tnąca przechodzi z +6 kN na −6 kN, więc moment osiąga maksimum M(3) = 31,5 kN·m. Po obu stronach d²M/dx² = −q, ale pochodna M jest nieciągła, bo nieciągła jest T.',
      caption: 'Załamanie wykresu M jest poprawne: T zmienia znak skokowo, a M pozostaje ciągły.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(3) = 31{,}5\\ \\text{kN·m},\\qquad \\frac{d^2M}{dx^2} = -q',
    },
  ],
} satisfies SolutionData
