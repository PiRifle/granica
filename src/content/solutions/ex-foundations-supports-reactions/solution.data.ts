import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-supports-reactions',
  title: 'Podpory i reakcje: jak konstrukcja odpowiada — przykład 1',
  duration: 7,
  given: ['L = 5 m', 'q = 4 kN/m', 'P = 30 kN', 'a = 2 m'],
  result:
    'Reakcje wynoszą R_A = 28 kN i R_B = 22 kN, obie skierowane w górę. Suma reakcji 50 kN równoważy sumę obciążeń. Maksimum momentu wynosi 48 kN·m pod siłą P.',
  figure: {
    kind: 'beam',
    length: 5,
    supports: [
      { at: 0, label: 'A' },
      { at: 5, label: 'B' },
    ],
    distributed: [{ from: 0, to: 5, start: 4, end: 4, label: 'q = 4 kN/m' }],
    pointLoads: [{ at: 2, value: 30, label: 'P = 30 kN' }],
    shear: [
      [
        [0, 28],
        [2, 20],
      ],
      [
        [2, -10],
        [5, -22],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 26],
        [2, 48],
        [3, 36],
        [4, 20],
        [5, 0],
      ],
    ],
    markers: [
      { x: 2, y: 20, text: 'T = 20 kN', diagram: 'shear' },
      { x: 2, y: -10, text: 'T = -10 kN', diagram: 'shear' },
      { x: 2, y: 48, text: 'M = 48 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '5,0 m', focus: 'load', reveal: 0 },
      { label: 'q', value: '4,0 kN/m', focus: 'load', reveal: 0 },
      { label: 'P', value: '30,0 kN', focus: 'load', reveal: 0 },
      { label: 'a', value: '2,0 m', focus: 'load', reveal: 0 },
      { label: 'Q', value: '20,0 kN', focus: 'load' },
      { label: 'x_Q', value: '2,5 m od A', focus: 'load' },
      { label: 'R_A', value: '28,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '22,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '48,0 kN·m', focus: 'M' },
    ],
    note: 'Obciążenie równomierne działa na całej długości, a siła P w x = 2 m. Maksimum momentu wypada pod siłą P.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość L = 5 m. Na całej długości działa obciążenie równomierne q = 4 kN/m, a w odległości a = 2 m od lewej podpory siła skupiona P = 30 kN. Wyznacz reakcje R_A i R_B.',
      caption: 'Belka z obciążeniem q = 4 kN/m i siłą P = 30 kN w x = 2 m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=5\\ \\text{m},\\quad q=4\\ \\text{kN/m},\\quad P=30\\ \\text{kN},\\quad a=2\\ \\text{m}',
    },
    {
      title: 'Wypadkowa obciążenia równomiernego',
      narration: 'Obciążenie równomierne zastępujemy wypadkową Q = qL. Mnożymy 4 kN/m przez 5 m i otrzymujemy 20 kN.',
      caption: 'Q = 20 kN.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q=qL=4\\cdot5=20\\ \\text{kN}',
    },
    {
      title: 'Położenie wypadkowej',
      narration:
        'Wypadkowa Q działa w środku belki, czyli 2,5 m od podpory A. To ramię decyduje o momencie obciążenia ciągłego względem A.',
      caption: 'x_Q = 2,5 m od A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'x_Q=\\frac{L}{2}=\\frac{5}{2}=2{,}5\\ \\text{m}',
    },
    {
      title: 'Suma momentów względem A',
      narration:
        'Moment reakcji R_B musi zrównoważyć moment siły P i moment wypadkowej Q. Równanie ma postać R_B · 5 = 30 · 2 + 20 · 2,5.',
      caption: 'Momenty obu obciążeń równoważy moment reakcji R_B.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B\\cdot5=30\\cdot2+20\\cdot2{,}5',
    },
    {
      title: 'Reakcja R_B',
      narration: 'Prawa strona równania wynosi 60 + 50 = 110 kN·m. Dzieląc przez 5 m, otrzymujemy R_B = 22 kN.',
      caption: 'R_B = 22 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B=\\frac{60+50}{5}=22\\ \\text{kN}',
    },
    {
      title: 'Reakcja R_A',
      narration:
        'Z równowagi pionowej suma reakcji jest równa sumie obciążeń: R_A + R_B = 30 + 20 = 50 kN. Stąd R_A = 50 − 22 = 28 kN.',
      caption: 'R_A = 28 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=30+20-22=28\\ \\text{kN}',
    },
    {
      title: 'Kontrola momentów względem B',
      narration:
        'Sprawdzamy momenty względem prawej podpory: R_A · 5 − P · 3 − Q · 2,5 = 140 − 90 − 50 = 0. Bilans się zamyka.',
      caption: 'Kontrola momentów względem B daje zero.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A\\cdot5-P\\cdot3-Q\\cdot2{,}5=140-90-50=0',
    },
    {
      title: 'Moment maksymalny',
      narration:
        'Pod siłą P moment wynosi M = R_A · 2 − q · 2 · 1 = 56 − 8 = 48 kN·m. Siła poprzeczna zmienia tam znak, więc to maksimum momentu.',
      caption: 'M_max = 48 kN·m pod siłą P.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M=R_A\\cdot2-q\\cdot2\\cdot1=56-8=48\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola bilansu sił',
      narration:
        'Suma reakcji pionowych 28 + 22 = 50 kN równoważy sumę obciążeń P + Q = 30 + 20 = 50 kN. Reakcje są poprawne.',
      caption: 'Reakcje równoważą całkowite obciążenie belki.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A+R_B=28+22=50,\\qquad P+Q=30+20=50',
    },
  ],
} satisfies SolutionData
