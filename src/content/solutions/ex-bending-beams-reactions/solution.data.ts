import type { SolutionData } from '../../model'
import { lazy } from 'react'

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
  animation: lazy(() => import('./animation').then((module) => ({ default: module.BeamReactionsExample1Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma przegub w A i rolkę w B oraz rozpiętość L = 6 m. Na całej długości działa obciążenie równomierne q = 2 kN/m, a w odległości a = 4 m od A siła skupiona P = 24 kN w dół.',
      caption: 'Schemat swobodnego ciała: podpory A i B, obciążenie ciągłe q oraz siła skupiona P.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula: 'L = 6\\ \\text{m},\\quad q = 2\\ \\text{kN/m},\\quad P = 24\\ \\text{kN}',
    },
    {
      title: 'Wypadkowa obciążenia ciągłego',
      narration:
        'Obciążenie równomierne zastępujemy wypadkową Q = qL = 2 · 6 = 12 kN. Działa ona w środku ciężkości, czyli 3 m od A.',
      caption: 'Q = 12 kN w x_Q = 3 m zastępuje obciążenie ciągłe tylko w równaniach równowagi.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q = qL = 2 \\cdot 6 = 12\\ \\text{kN},\\quad x_Q = \\frac{L}{2} = 3\\ \\text{m}',
    },
    {
      title: 'Moment względem A — reakcja R_B',
      narration:
        'Suma momentów względem A: R_B · 6 = P · 4 + Q · 3 = 24 · 4 + 12 · 3. Reakcja R_B działa w górę, a jej ramię wynosi 6 m.',
      caption: 'R_B · 6 = 96 + 36 = 132, więc R_B = 22 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula:
        'R_B \\cdot 6 = P \\cdot 4 + Q \\cdot 3 = 24 \\cdot 4 + 12 \\cdot 3 = 132 \\\\ R_B = \\frac{132}{6} = 22\\ \\text{kN}',
    },
    {
      title: 'Suma sił — reakcja R_A',
      narration:
        'Suma sił pionowych: R_A + R_B = P + Q, więc R_A = 24 + 12 − 22 = 14 kN. Obie reakcje działają w górę, przeciwnie do obciążeń.',
      caption: 'R_A = 14 kN dopełnia równowagę sił pionowych.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = P + Q - R_B = 24 + 12 - 22 = 14\\ \\text{kN}',
    },
    {
      title: 'Kontrola równowagi i moment pod P',
      narration:
        'Kontrola momentów względem B: R_A · 6 − P · 2 − Q · 3 = 84 − 48 − 36 = 0. Moment pod siłą P wynosi M = R_A · 4 − q · 4 · 2 = 40 kN·m.',
      caption: 'Suma momentów wraca do zera, a maksimum momentu wypada pod siłą P.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula:
        'R_A \\cdot 6 - P \\cdot 2 - Q \\cdot 3 = 84 - 48 - 36 = 0 \\\\ M = R_A \\cdot 4 - q \\cdot 4 \\cdot 2 = 56 - 16 = 40\\ \\text{kN·m}',
    },
  ],
} satisfies SolutionData
