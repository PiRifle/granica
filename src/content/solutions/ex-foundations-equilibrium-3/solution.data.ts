import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-equilibrium-3',
  title: 'Równowaga statyczna: trzy równania — przykład 3',
  duration: 7,
  given: ['L = 4,0 m', 'a = 1,5 m', 'P = 8 kN', 'R_B = 14 kN'],
  result:
    'q = 5,5 kN/m, R_A = 16 kN, a maksimum momentu wynosi 17,8 kN·m pod siłą P. Sprawdzenie momentem względem B: R_A·4 = 64 kN·m oraz P·2,5 + Q·2 = 20 + 44 = 64 kN·m. Gdyby R_B było mniejsze niż Pa/L = 3 kN, otrzymalibyśmy ujemne q, czyli obciążenie skierowane do góry. To sygnał, że dane nie odpowiadają założonemu modelowi belki z obciążeniem w dół.',
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    pointLoads: [{ at: 1.5, value: 8, label: 'P = 8 kN' }],
    distributed: [{ from: 0, to: 4, start: 5.5, end: 5.5, label: 'q = 5,5 kN/m' }],
    shear: [
      [
        [0, 16],
        [1.5, 7.75],
      ],
      [
        [1.5, -0.25],
        [4, -14],
      ],
    ],
    moment: [
      [
        [0, 0],
        [0.5, 7.31],
        [1, 13.25],
        [1.5, 17.81],
      ],
      [
        [1.5, 17.81],
        [2, 17],
        [3, 11.25],
        [4, 0],
      ],
    ],
    markers: [
      { x: 1.5, y: 7.75, text: 'T = 7,8 kN', diagram: 'shear' },
      { x: 1.5, y: -0.25, text: 'T = -0,25 kN', diagram: 'shear' },
      { x: 1.5, y: 17.81, text: 'M = 17,8 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '4,0 m', focus: 'load', reveal: 0 },
      { label: 'a', value: '1,5 m', focus: 'load', reveal: 0 },
      { label: 'P', value: '8,0 kN', focus: 'load', reveal: 0 },
      { label: 'R_B', value: '14,0 kN', focus: 'reaction', reveal: 0 },
      { label: 'q', value: '5,5 kN/m', focus: 'load' },
      { label: 'Q', value: '22,0 kN', focus: 'load' },
      { label: 'x_Q', value: '2,0 m od A', focus: 'load' },
      { label: 'R_A', value: '16,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '17,8 kN·m', focus: 'M' },
    ],
    note: 'Obciążenie q jest nieznane i wynika z podanej reakcji R_B; wypadkowa Q działa w połowie długości belki.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość L = 4,0 m. W odległości a = 1,5 m od lewej podpory działa siła P = 8 kN w dół, a na całej belce działa nieznane równomierne obciążenie q. Wiadomo, że reakcja prawej podpory wynosi R_B = 14 kN. Wyznacz q oraz reakcję R_A.',
      caption: 'Schemat belki z siłą P = 8 kN i nieznanym obciążeniem równomiernym q.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=4{,}0\\ \\text{m},\\quad a=1{,}5\\ \\text{m},\\quad P=8\\ \\text{kN},\\quad R_B=14\\ \\text{kN}',
    },
    {
      title: 'Równanie momentów względem A',
      narration:
        'Suma momentów względem A zawiera moment siły P oraz moment wypadkowej obciążenia ciągłego. Reakcja R_B jest znana, więc równanie pozwala wyznaczyć q.',
      caption: 'Moment reakcji R_B równoważy momenty siły P i obciążenia q.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B L=P a+\\frac{qL^2}{2}',
    },
    {
      title: 'Podstawienie danych',
      narration:
        'Podstawiamy L = 4,0 m, a = 1,5 m, P = 8 kN i R_B = 14 kN. Po lewej stronie otrzymujemy 56 kN·m, a moment siły P wynosi 12 kN·m.',
      caption: '14 · 4 = 8 · 1,5 + q · 4² / 2.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: '14\\cdot4=8\\cdot1{,}5+\\frac{q\\cdot4^2}{2}',
    },
    {
      title: 'Rozwiązanie obciążenia q',
      narration: 'Po uproszczeniu równania mamy 56 = 12 + 8q, czyli 8q = 44. Stąd q = 5,5 kN/m.',
      caption: 'Obciążenie równomierne wynosi 5,5 kN/m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: '56=12+8q\\quad\\Rightarrow\\quad q=5{,}5\\ \\text{kN/m}',
    },
    {
      title: 'Wypadkowa obciążenia ciągłego',
      narration:
        'Obciążenie równomierne zastępujemy wypadkową Q = qL = 5,5 · 4,0 = 22 kN. Działa ona w środku rozpiętości belki.',
      caption: 'Prostokąt q × L odpowiada wypadkowej 22 kN.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q=qL=5{,}5\\cdot4=22\\ \\text{kN}',
    },
    {
      title: 'Położenie wypadkowej',
      narration: 'Wypadkowa obciążenia równomiernego działa w połowie długości, czyli 2,0 m od podpory A.',
      caption: 'Wypadkowa Q działa 2,0 m od A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'x_Q=\\frac{L}{2}=\\frac{4}{2}=2{,}0\\ \\text{m}',
    },
    {
      title: 'Reakcja pionowa R_A',
      narration:
        'Z równowagi pionowej suma reakcji musi być równa sumie obciążeń: R_A + R_B = P + Q = 8 + 22 = 30 kN. Stąd R_A = 30 − 14 = 16 kN.',
      caption: 'R_A = 16 kN w górę.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=P+Q-R_B=8+22-14=16\\ \\text{kN}',
    },
    {
      title: 'Kontrola momentów względem B',
      narration:
        'Sprawdzamy momenty względem prawej podpory: R_A · 4 − P · 2,5 − Q · 2 = 64 − 20 − 44 = 0. Bilans się zamyka.',
      caption: 'Moment reakcji R_A równoważy momenty obu obciążeń.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A\\cdot4-P\\cdot2{,}5-Q\\cdot2=64-20-44=0',
    },
    {
      title: 'Moment maksymalny',
      narration:
        'Pod siłą P moment wynosi M = R_A · 1,5 − q · 1,5 · 0,75 = 24 − 6,1875 ≈ 17,8 kN·m. Siła poprzeczna zmienia tam znak z dodatniego na ujemny, więc jest to maksimum momentu.',
      caption: 'Maksimum momentu 17,8 kN·m wypada pod siłą P.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M=R_A\\cdot1{,}5-q\\cdot1{,}5\\cdot0{,}75=24-6{,}1875=17{,}8125\\approx17{,}8\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola bilansu sił',
      narration:
        'Suma reakcji pionowych 16 + 14 = 30 kN równoważy sumę obciążeń P + Q = 8 + 22 = 30 kN. Dane są spójne z modelem belki swobodnie podpartej.',
      caption: 'Reakcje pionowe równoważą obciążenia pionowe.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A+R_B=16+14=30,\\qquad P+Q=8+22=30',
    },
  ],
} satisfies SolutionData
