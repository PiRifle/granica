import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-load-types-2',
  title: 'Obciążenia: siła, rozkład i moment — przykład 2',
  duration: 7,
  given: ['L = 6 m', 'q = 2,4 kN/m', 'P = 18 kN'],
  result:
    'Wypadkowa ciężaru własnego wynosi 14,4 kN, a całkowite obciążenie 32,4 kN. Z symetrii R_A = R_B = 16,2 kN, a maksymalny moment w środku rozpiętości wynosi 37,8 kN·m. Oba sposoby obliczenia momentu dają ten sam wynik — to obowiązkowa kontrola poprawności.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    distributed: [{ from: 0, to: 6, start: 2.4, end: 2.4, label: 'q = 2,4 kN/m' }],
    pointLoads: [{ at: 3, value: 18, label: 'P = 18 kN' }],
    shear: [
      [
        [0, 16.2],
        [3, 9],
      ],
      [
        [3, -9],
        [6, -16.2],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 15],
        [2, 27.6],
        [3, 37.8],
      ],
      [
        [3, 37.8],
        [4, 27.6],
        [5, 15],
        [6, 0],
      ],
    ],
    markers: [
      { x: 3, y: 9, text: 'T = 9 kN', diagram: 'shear' },
      { x: 3, y: -9, text: 'T = -9 kN', diagram: 'shear' },
      { x: 3, y: 37.8, text: 'M = 37,8 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'Q', value: '14,4 kN', focus: 'load', reveal: 1 },
      { label: 'x_Q', value: '3,0 m od A', focus: 'load', reveal: 1 },
      { label: 'R_A', value: '16,2 kN', focus: 'reaction', reveal: 2 },
      { label: 'R_B', value: '16,2 kN', focus: 'reaction', reveal: 2 },
      { label: 'M_max', value: '37,8 kN·m', focus: 'M', reveal: 4 },
    ],
    note: 'Obciążenie q działa na całej długości belki, a siła P jest przyłożona w środku rozpiętości.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość 6 m. Jej ciężar własny odpowiada równomiernemu obciążeniu q = 2,4 kN/m. Dodatkowo w środku rozpiętości działa siła skupiona P = 18 kN. Oblicz reakcje i maksymalny moment zginający.',
      caption: 'Belka z obciążeniem równomiernym q i siłą P w środku rozpiętości.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=6\\ \\text{m},\\quad q=2{,}4\\ \\text{kN/m},\\quad P=18\\ \\text{kN}',
    },
    {
      title: 'Wypadkowa ciężaru własnego',
      narration:
        'Obciążenie równomierne zastępujemy wypadkową Q = qL. Mnożymy 2,4 kN/m przez 6 m i otrzymujemy 14,4 kN. Wypadkowa działa w środku ciężkości wykresu obciążenia, czyli w połowie rozpiętości.',
      caption: 'Wypadkowa ciężaru własnego Q = 14,4 kN działa w x = 3,0 m od A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q=qL=2{,}4\\cdot6=14{,}4\\ \\text{kN},\\qquad x_Q=\\frac{L}{2}=3{,}0\\ \\text{m}',
    },
    {
      title: 'Reakcje z symetrii',
      narration:
        'Wypadkowa ciężaru własnego działa w środku belki, podobnie jak siła 18 kN. Całkowite obciążenie wynosi więc P + Q = 18 + 14,4 = 32,4 kN. Obciążenie jest symetryczne, dlatego reakcje są równe: R_A = R_B = 32,4 / 2 = 16,2 kN.',
      caption: 'R_A = R_B = 16,2 kN równoważą całkowite obciążenie 32,4 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'P+Q=18+14{,}4=32{,}4\\ \\text{kN},\\qquad R_A=R_B=\\frac{32{,}4}{2}=16{,}2\\ \\text{kN}',
    },
    {
      title: 'Siła tnąca',
      narration:
        'Po lewej stronie belki siła tnąca wynosi T(x) = R_A − qx. Na podporze A jest równa 16,2 kN, a w środku rozpiętości maleje do 16,2 − 2,4 · 3 = 9,0 kN. Skok o 18 kN w środku odpowiada sile skupionej P.',
      caption: 'Siła tnąca zmienia się liniowo od 16,2 kN do −16,2 kN, ze skokiem w środku.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(x)=R_A-qx,\\qquad T(3)=16{,}2-2{,}4\\cdot3=9{,}0\\ \\text{kN}',
    },
    {
      title: 'Moment zginający i maksimum',
      narration:
        'Moment w środku obliczamy z lewej części: R_A · 3 − (q · 3) · 1,5 = 48,6 − 10,8 = 37,8 kN·m. Ten sam wynik daje wzór sumaryczny PL/4 + qL²/8 = 27 + 10,8 = 37,8 kN·m. Zgodność obu metod potwierdza poprawność rozwiązania.',
      caption: 'M_max = 37,8 kN·m w środku rozpiętości; obie metody dają ten sam wynik.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula:
        'M_{\\max}=R_A\\cdot3-(q\\cdot3)\\cdot1{,}5=16{,}2\\cdot3-7{,}2\\cdot1{,}5=48{,}6-10{,}8=37{,}8\\ \\text{kN·m},\\qquad M_{\\max}=\\frac{PL}{4}+\\frac{qL^2}{8}=\\frac{18\\cdot6}{4}+\\frac{2{,}4\\cdot36}{8}=27+10{,}8=37{,}8\\ \\text{kN·m}',
    },
  ],
} satisfies SolutionData
