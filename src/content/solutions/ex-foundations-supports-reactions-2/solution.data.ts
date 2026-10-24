import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-supports-reactions-2',
  title: 'Podpory i reakcje: jak konstrukcja odpowiada — przykład 2',
  duration: 7,
  given: ['L = 2,5 m', 'P = 8 kN', 'q = 3 kN/m'],
  result:
    'R_Ay = 15,5 kN, a reakcja momentowa M_A = 29,375 kN·m działa przeciwnie do momentu obciążeń. Reakcja pozioma A_x wynosi zero, bo nie ma obciążeń poziomych. Utwierdzenie nadal ma jednak zdolność przenoszenia siły poziomej — jej wartość w tym zadaniu jest po prostu zerowa.',
  figure: {
    kind: 'beam',
    length: 2.5,
    supports: [{ at: 0, label: 'A' }],
    distributed: [{ from: 0, to: 2.5, start: 3, end: 3, label: 'q = 3 kN/m' }],
    pointLoads: [{ at: 2.5, value: 8, label: 'P = 8 kN' }],
    moments: [{ at: 0, value: 29.375, label: 'M_A = 29,375 kN·m' }],
    shear: [
      [
        [0, 15.5],
        [2.5, 8],
      ],
    ],
    moment: [
      [
        [0, -29.375],
        [0.625, -20.27],
        [1.25, -12.34],
        [1.875, -5.59],
        [2.5, 0],
      ],
    ],
    markers: [
      { x: 0, y: 15.5, text: 'R_Ay = 15,5 kN', diagram: 'shear' },
      { x: 0, y: -29.375, text: 'M_A = -29,375 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '2,5 m', focus: 'load', reveal: 0 },
      { label: 'P', value: '8,0 kN', focus: 'load', reveal: 0 },
      { label: 'q', value: '3,0 kN/m', focus: 'load', reveal: 0 },
      { label: 'Q', value: '7,5 kN', focus: 'load' },
      { label: 'x_Q', value: '1,25 m od A', focus: 'load' },
      { label: 'R_Ay', value: '15,5 kN', focus: 'reaction' },
      { label: 'M_A', value: '29,375 kN·m', focus: 'reaction' },
    ],
    note: 'Utwierdzenie A przenosi reakcję pionową R_Ay oraz moment M_A; koniec B jest swobodny.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wspornik jest utwierdzony w ścianie w punkcie A i ma długość 2,5 m. Na swobodnym końcu działa siła 8 kN w dół, a na całej długości równomierne obciążenie 3 kN/m. Wyznacz reakcje w utwierdzeniu.',
      caption: 'Wspornik z siłą P = 8 kN na końcu i obciążeniem q = 3 kN/m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=2{,}5\\ \\text{m},\\quad P=8\\ \\text{kN},\\quad q=3\\ \\text{kN/m}',
    },
    {
      title: 'Wypadkowa obciążenia równomiernego',
      narration: 'Obciążenie równomierne zastępujemy siłą Q = qL. Mnożymy 3 kN/m przez 2,5 m i otrzymujemy 7,5 kN.',
      caption: 'Q = 7,5 kN.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q=qL=3\\cdot2{,}5=7{,}5\\ \\text{kN}',
    },
    {
      title: 'Położenie wypadkowej',
      narration:
        'Wypadkowa Q działa w środku obciążenia, czyli 1,25 m od utwierdzenia. To ramię decyduje o momencie obciążenia ciągłego względem A.',
      caption: 'x_Q = 1,25 m od A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'x_Q=\\frac{L}{2}=\\frac{2{,}5}{2}=1{,}25\\ \\text{m}',
    },
    {
      title: 'Reakcja pionowa',
      narration:
        'Z równowagi pionowej reakcja w utwierdzeniu musi równoważyć obie siły skierowane w dół: R_Ay = P + Q = 8 + 7,5 = 15,5 kN.',
      caption: 'R_Ay = 15,5 kN w górę.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_{Ay}=P+Q=8+7{,}5=15{,}5\\ \\text{kN}',
    },
    {
      title: 'Moment od siły P',
      narration:
        'Siła 8 kN działa na ramieniu 2,5 m. Jej moment względem A wynosi 8 · 2,5 = 20 kN·m i obraca belkę zgodnie z ruchem wskazówek zegara.',
      caption: 'M_P = 20 kN·m.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'M_P=P L=8\\cdot2{,}5=20\\ \\text{kN·m}',
    },
    {
      title: 'Moment od obciążenia równomiernego',
      narration: 'Wypadkowa Q działa na ramieniu 1,25 m. Jej moment względem A wynosi 7,5 · 1,25 = 9,375 kN·m.',
      caption: 'M_Q = 9,375 kN·m.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'M_Q=Q\\cdot\\frac{L}{2}=7{,}5\\cdot1{,}25=9{,}375\\ \\text{kN·m}',
    },
    {
      title: 'Reakcja momentowa w utwierdzeniu',
      narration:
        'Reakcja momentowa równoważy sumę momentów obu obciążeń: M_A = M_P + M_Q = 20 + 9,375 = 29,375 kN·m. Działa przeciwnie do ruchu wskazówek zegara.',
      caption: 'M_A = 29,375 kN·m.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'M_A=M_P+M_Q=20+9{,}375=29{,}375\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola momentów względem B',
      narration:
        'Bilans względem swobodnego końca B: −M_A + R_Ay · 2,5 − Q · 1,25 = −29,375 + 38,75 − 9,375 = 0. Równowaga momentów się zamyka.',
      caption: 'Kontrola względem B potwierdza reakcje.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: '-M_A+R_{Ay}\\cdot2{,}5-Q\\cdot1{,}25=-29{,}375+38{,}75-9{,}375=0',
    },
    {
      title: 'Wniosek o utwierdzeniu',
      narration:
        'Jeśli obciążenia działają zgodnie z ruchem wskazówek zegara, reakcja momentowa działa przeciwnie. Reakcja pozioma A_x wynosi zero, bo nie ma obciążeń poziomych, ale utwierdzenie nadal może przenosić siłę poziomą.',
      caption: 'Utwierdzenie przenosi siłę pionową i moment, a siła pozioma jest w tym zadaniu zerowa.',
      visual: 'beam',
      focus: { metric: 'reaction' },
    },
  ],
} satisfies SolutionData
