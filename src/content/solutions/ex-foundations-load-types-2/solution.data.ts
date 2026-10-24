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
      { label: 'L', value: '6,0 m', focus: 'load', reveal: 0 },
      { label: 'q', value: '2,4 kN/m', focus: 'load', reveal: 0 },
      { label: 'P', value: '18,0 kN', focus: 'load', reveal: 0 },
      { label: 'Q', value: '14,4 kN', focus: 'load' },
      { label: 'x_Q', value: '3,0 m od A', focus: 'load' },
      { label: 'P + Q', value: '32,4 kN', focus: 'load' },
      { label: 'R_A', value: '16,2 kN', focus: 'reaction' },
      { label: 'R_B', value: '16,2 kN', focus: 'reaction' },
      { label: 'M_max', value: '37,8 kN·m', focus: 'M' },
    ],
    note: 'Obciążenie q i siła P mają wypadkową w środku rozpiętości, dlatego reakcje są równe.',
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
        'Obciążenie równomierne zastępujemy wypadkową Q = qL. Mnożymy 2,4 kN/m przez 6 m i otrzymujemy 14,4 kN.',
      caption: 'Wypadkowa ciężaru własnego Q = 14,4 kN.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q=qL=2{,}4\\cdot6=14{,}4\\ \\text{kN}',
    },
    {
      title: 'Całkowite obciążenie i położenie',
      narration:
        'Wypadkowa ciężaru własnego działa w środku belki, podobnie jak siła 18 kN. Całkowite obciążenie wynosi więc P + Q = 18 + 14,4 = 32,4 kN, a jego wypadkowa również leży w środku rozpiętości.',
      caption: 'Obie wypadkowe działają w x = 3,0 m od A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'P+Q=18+14{,}4=32{,}4\\ \\text{kN},\\qquad x_Q=\\frac{L}{2}=3{,}0\\ \\text{m}',
    },
    {
      title: 'Reakcje z symetrii',
      narration:
        'Obciążenie jest symetryczne względem środka belki, więc obie reakcje są równe. Dzielimy całkowite obciążenie przez dwa: R_A = R_B = 32,4 / 2 = 16,2 kN.',
      caption: 'R_A = R_B = 16,2 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=R_B=\\frac{32{,}4}{2}=16{,}2\\ \\text{kN}',
    },
    {
      title: 'Moment w środku rozpiętości',
      narration:
        'Moment w środku obliczamy z lewej części. Reakcja R_A działa w odległości 3 m, a obciążenie równomierne na lewej połowie ma wypadkową q · 3 = 7,2 kN w odległości 1,5 m od przekroju.',
      caption: 'M_max = 16,2 · 3 − 7,2 · 1,5 = 37,8 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula:
        'M_{\\max}=R_A\\cdot3-(q\\cdot3)\\cdot1{,}5=16{,}2\\cdot3-7{,}2\\cdot1{,}5=48{,}6-10{,}8=37{,}8\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola wzorem sumarycznym',
      narration:
        'Ten sam moment można obliczyć od razu wzorem dla belki z siłą w środku i obciążeniem równomiernym: PL/4 + qL²/8. Podstawienie daje 27 + 10,8 = 37,8 kN·m.',
      caption: 'Niezależny wzór potwierdza wynik 37,8 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula:
        'M_{\\max}=\\frac{PL}{4}+\\frac{qL^2}{8}=\\frac{18\\cdot6}{4}+\\frac{2{,}4\\cdot36}{8}=27+10{,}8=37{,}8\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola bilansu sił',
      narration:
        'Suma reakcji 16,2 + 16,2 = 32,4 kN jest równa sumie obciążeń P + Q = 18 + 14,4 = 32,4 kN. Bilans sił się zamyka, więc reakcje są poprawne.',
      caption: 'Reakcje równoważą całkowite obciążenie belki.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A+R_B=16{,}2+16{,}2=32{,}4,\\qquad P+Q=18+14{,}4=32{,}4',
    },
    {
      title: 'Wniosek',
      narration:
        'Oba sposoby dają ten sam wynik. Taka kontrola jest obowiązkowa: jeśli dwa poprawne rachunki dają różne liczby, trzeba znaleźć błąd, a nie wybrać wygodniejszy wynik.',
      caption: 'Zgodność dwóch metod potwierdza poprawność rozwiązania.',
      visual: 'beam',
      focus: { metric: 'M' },
    },
  ],
} satisfies SolutionData
