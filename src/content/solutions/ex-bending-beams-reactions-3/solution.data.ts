import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-beams-reactions-3',
  title: 'Belki i reakcje podporowe — przykład 3',
  duration: 7,
  given: ['L = 8 m', 'R_A = 30 kN', 'R_B = 10 kN'],
  result:
    'Kontrola: R_A = P (L - a) / L = 40 · 6 / 8 = 30 kN, czyli się zgadza. Taki wariant uczy czytać reakcje jako informację o położeniu obciążenia: większa reakcja po lewej stronie oznacza, że siła jest bliżej lewej podpory.',
  figure: {
    kind: 'beam',
    length: 8,
    supports: [
      { at: 0, label: 'A' },
      { at: 8, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 40, label: 'P = 40 kN' }],
    values: [
      { label: 'P', value: '40,0 kN', focus: 'load' },
      { label: 'a', value: '2,0 m od A', focus: 'load' },
      { label: 'R_A', value: '30,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '10,0 kN', focus: 'reaction' },
    ],
    note: 'Większa reakcja R_A = 30 kN potwierdza, że siła P działa bliżej lewej podpory.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem znamy reakcje, a szukamy obciążenia. Belka swobodnie podparta ma rozpiętość L = 8 m. Z obliczeń wiadomo, że R_A = 30 kN i R_B = 10 kN, a na belkę działa jedna siła skupiona P w odległości a od lewej podpory. Chcemy odtworzyć P oraz a.',
      caption:
        'Tym razem znamy reakcje, a szukamy obciążenia. Belka swobodnie podparta ma rozpiętość L = 8 m. Z obliczeń wiadomo, że R_A = 30 kN…',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L = 8 m',
    },
    {
      title: 'Krok 2',
      narration:
        'Najpierw suma sił pionowych daje P = R_A + R_B = 40 kN. Następnie korzystamy z zależności R_B = P a / L, która wynika z sumy momentów względem A. Po przekształceniu otrzymujemy',
      caption:
        'Najpierw suma sił pionowych daje P = R_A + R_B = 40 kN. Następnie korzystamy z zależności R_B = P a / L, która wynika z sumy…',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'P = R_{A} + R_{B} = 40 kN',
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'a = (R_B L)/(P) = (10 · 8)/(40) = 2 m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'a = \\frac{R_B L}{P} = \\frac{10 \\cdot 8}{40} = 2\\ \\text{m}.',
    },
    {
      title: 'Krok 4',
      narration:
        'Kontrola: R_A = P (L - a) / L = 40 · 6 / 8 = 30 kN, czyli się zgadza. Taki wariant uczy czytać reakcje jako informację o położeniu obciążenia: większa reakcja po lewej stronie oznacza, że siła jest bliżej lewej podpory.',
      caption:
        'Kontrola: R_A = P (L - a) / L = 40 · 6 / 8 = 30 kN, czyli się zgadza. Taki wariant uczy czytać reakcje jako informację o…',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_{A} = P (L - a) / L = 40 \\cdot 6 / 8 = 30 kN',
    },
  ],
} satisfies SolutionData
