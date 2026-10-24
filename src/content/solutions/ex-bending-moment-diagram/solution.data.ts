import type { SolutionData } from '../../model'
import { BendingMomentExample1Animation } from './animation'

export default {
  id: 'ex-bending-moment-diagram',
  title: 'Moment zginający M(x) — przykład 1',
  duration: 8,
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
  animation: BendingMomentExample1Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma rozpiętość L = 6 m. Siła P = 30 kN działa w dół w odległości a = 2 m od lewej podpory A. Obciążenie ciągłe jest pomijalne.',
      caption: 'Model: podpory A i B, siła P w odległości a od lewej podpory.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L = 6\\ \\text{m},\\quad P = 30\\ \\text{kN},\\quad a = 2\\ \\text{m}',
    },
    {
      title: 'Reakcje podpór',
      narration:
        'Z sumy momentów względem A: R_B · 6 = 30 · 2, więc R_B = 10 kN. Z sumy sił pionowych: R_A = 30 − 10 = 20 kN.',
      caption: 'Najpierw reakcje: R_B = 10 kN i R_A = 20 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B = \\frac{30 \\cdot 2}{6} = 10\\ \\text{kN},\\quad R_A = 30 - 10 = 20\\ \\text{kN}',
    },
    {
      title: 'M(x) na lewym odcinku',
      narration:
        'Dla x od 0 do 2 m bierzemy lewą część belki. Moment reakcji R_A działa na ramieniu x, więc M(x) = R_A x = 20x kN·m.',
      caption: 'Wykres M rośnie liniowo od zera do 40 kN·m pod siłą.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(x) = R_A x = 20x\\ \\text{kN·m},\\quad 0 \\le x \\le 2\\ \\text{m}',
    },
    {
      title: 'M(x) za siłą',
      narration:
        'Za siłą dochodzi moment od P: M(x) = 20x − 30(x − 2) kN·m. Wykres maleje liniowo od 40 kN·m do zera na podporze B.',
      caption: 'Prawy odcinek: M(x) = 20x − 30(x − 2), od 40 kN·m do zera.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(x) = 20x - 30(x - 2)\\ \\text{kN·m},\\quad 2 \\le x \\le 6\\ \\text{m}',
    },
    {
      title: 'Maksimum pod siłą',
      narration:
        'Pod siłą T zmienia znak, więc moment osiąga maksimum: M(2) = 20 · 2 = 40 kN·m. Na prawej podporze M(6) = 120 − 30 · 4 = 0, a kontrola z prawej strony daje R_B · 4 = 10 · 4 = 40 kN·m.',
      caption: 'Maksimum 40 kN·m wypada pod siłą, gdzie T zmienia znak z dodatniego na ujemny.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{\\max} = M(2) = 20 \\cdot 2 = 40\\ \\text{kN·m},\\quad M(6) = 0',
    },
  ],
} satisfies SolutionData
