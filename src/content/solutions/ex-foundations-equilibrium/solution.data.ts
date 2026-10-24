import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-equilibrium',
  title: 'Równowaga statyczna: trzy równania — przykład 1',
  duration: 7,
  given: ['L = 5,0 m', 'a = 3,0 m', 'P = 12 kN', 'q = 6,0 kN/m', 'H = 5,0 kN'],
  result:
    'RA = 19,8 kN w górę, RB = 22,2 kN w górę oraz Ax = 5,0 kN w prawo. Suma reakcji pionowych równa się sumie obciążeń pionowych, a kontrola momentów względem B daje zero.',
  figure: {
    kind: 'beam',
    length: 5,
    supports: [
      { at: 0, label: 'A' },
      { at: 5, label: 'B' },
    ],
    pointLoads: [{ at: 3, value: 12, label: 'P = 12 kN' }],
    distributed: [{ from: 0, to: 5, start: 6, end: 6, label: 'q = 6 kN/m' }],
    shear: [
      [
        [0, 19.8],
        [3, 1.8],
      ],
      [
        [3, -10.2],
        [5, -22.2],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 16.8],
        [2, 27.6],
        [3, 32.4],
        [4, 19.2],
        [5, 0],
      ],
    ],
    markers: [
      { x: 3, y: 1.8, text: 'T = 1,8 kN', diagram: 'shear' },
      { x: 3, y: -10.2, text: 'T = -10,2 kN', diagram: 'shear' },
      { x: 3, y: 32.4, text: 'M = 32,4 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '12,0 kN', focus: 'load', reveal: 0 },
      { label: 'q', value: '6,0 kN/m', focus: 'load', reveal: 0 },
      { label: 'H', value: '5,0 kN', focus: 'load', reveal: 0 },
      { label: 'Q', value: '30,0 kN', focus: 'load' },
      { label: 'x_Q', value: '2,5 m od A', focus: 'load' },
      { label: 'A_x', value: '5,0 kN', focus: 'reaction' },
      { label: 'R_A', value: '19,8 kN', focus: 'reaction' },
      { label: 'R_B', value: '22,2 kN', focus: 'reaction' },
      { label: 'M_max', value: '32,4 kN·m', focus: 'M' },
    ],
    note: 'Siła pozioma H działa w osi belki, więc nie wnosi momentu; równoważy ją reakcja A_x = 5,0 kN.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość L = 5,0 m. W odległości a = 3,0 m od A działa siła P = 12 kN w dół, na całej długości obciążenie q = 6,0 kN/m, a w osi belki siła pozioma H = 5,0 kN. Reakcje w A przyjmujemy jako A_x w prawo i A_y w górę, a w B jako R_B w górę.',
      caption: 'Schemat belki z obciążeniem ciągłym q, siłą P w x = 3,0 m i siłą poziomą H.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=5{,}0\\ \\text{m},\\quad a=3{,}0\\ \\text{m},\\quad P=12\\ \\text{kN},\\quad q=6{,}0\\ \\text{kN/m}',
    },
    {
      title: 'Równowaga pozioma',
      narration: 'Z równowagi poziomej: A_x − H = 0, więc A_x = 5,0 kN w prawo.',
      caption: 'Reakcja pozioma A_x równoważy siłę H.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'A_x-H=0 \\quad\\Rightarrow\\quad A_x=5{,}0\\ \\text{kN}',
    },
    {
      title: 'Wypadkowa obciążenia ciągłego',
      narration: 'Obciążenie równomierne zastępujemy wypadkową Q = qL = 6,0 · 5,0 = 30 kN.',
      caption: 'Prostokąt q × L odpowiada wypadkowej 30 kN.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q=qL=6{,}0\\cdot 5{,}0=30\\ \\text{kN}',
    },
    {
      title: 'Położenie wypadkowej',
      narration: 'Wypadkowa Q działa w środku rozpiętości, czyli w odległości 2,5 m od A.',
      caption: 'Wypadkowa Q działa 2,5 m od podpory A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'x_Q=\\frac{L}{2}=\\frac{5{,}0}{2}=2{,}5\\ \\text{m}',
    },
    {
      title: 'Momenty względem A',
      narration: 'Suma momentów względem A: R_B · 5,0 − 12 · 3,0 − 30 · 2,5 = 0.',
      caption: 'Momenty obciążeń równoważy moment reakcji R_B.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B\\cdot 5{,}0-12\\cdot 3{,}0-30\\cdot 2{,}5=0',
    },
    {
      title: 'Reakcja R_B',
      narration: 'Stąd R_B · 5,0 = 36 + 75 = 111 kN·m, więc R_B = 22,2 kN.',
      caption: 'R_B = 22,2 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B\\cdot 5{,}0=36+75=111 \\quad\\Rightarrow\\quad R_B=22{,}2\\ \\text{kN}',
    },
    {
      title: 'Reakcja pionowa A_y',
      narration: 'Suma sił pionowych: A_y + R_B = 12 + 30 = 42 kN, więc A_y = 42 − 22,2 = 19,8 kN.',
      caption: 'A_y = 19,8 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'A_y+R_B=12+30=42 \\quad\\Rightarrow\\quad A_y=19{,}8\\ \\text{kN}',
    },
    {
      title: 'Kontrola momentów względem B',
      narration: 'Kontrola momentów względem B: A_y · 5,0 − 12 · 2,0 − 30 · 2,5 = 99 − 24 − 75 = 0.',
      caption: 'Bilans momentów względem B zamyka się do zera.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'A_y\\cdot 5{,}0-12\\cdot 2{,}0-30\\cdot 2{,}5=99-24-75=0',
    },
    {
      title: 'Moment maksymalny',
      narration:
        'Moment pod siłą P: M = A_y · 3,0 − q · 3,0 · 1,5 = 59,4 − 27 = 32,4 kN·m. To jednocześnie maksimum momentu.',
      caption: 'Maksimum momentu 32,4 kN·m wypada pod siłą P.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{\\max}=A_y\\cdot 3{,}0-q\\cdot 3{,}0\\cdot 1{,}5=59{,}4-27=32{,}4\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola bilansu sił',
      narration:
        'Suma reakcji pionowych 19,8 + 22,2 = 42 kN równoważy sumę obciążeń pionowych 12 + 30 = 42 kN. Siła H nie wnosi momentu, bo działa w osi belki.',
      caption: 'Reakcje pionowe równoważą obciążenia pionowe.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'A_y+R_B=19{,}8+22{,}2=42,\\qquad P+Q=12+30=42',
    },
  ],
} satisfies SolutionData
