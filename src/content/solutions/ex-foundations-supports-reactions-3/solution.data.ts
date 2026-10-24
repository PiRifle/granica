import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-foundations-supports-reactions-3',
  title: 'Podpory i reakcje: jak konstrukcja odpowiada — przykład 3',
  duration: 7,
  given: ['L = 4 m', 'P = 20 kN', 'R_B = 15 kN'],
  result:
    'Siła działa w odległości a = 3 m od lewej podpory, R_A = 5 kN, a moment pod siłą wynosi M = 15 kN·m. Sprawdzenie z prawej strony: R_B · 1 = 15 · 1 = 15 kN·m. Gdyby reakcja R_B była większa od P, otrzymalibyśmy a większe od L, co oznaczałoby, że dane są sprzeczne z modelem belki swobodnie podpartej.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.SupportsReactionsExample3Animation })),
  ),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość 4 m. Wiadomo, że przy sile P = 20 kN reakcja prawej podpory wynosi R_B = 15 kN. Szukamy odległości a, w jakiej działa siła, oraz reakcji R_A i momentu pod siłą.',
      caption: 'Belka z siłą P = 20 kN w nieznanym położeniu a.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=4\\ \\text{m},\\quad P=20\\ \\text{kN},\\quad R_B=15\\ \\text{kN}',
    },
    {
      title: 'Związek reakcji z położeniem siły',
      narration:
        'Dla belki z jedną siłą reakcja prawej podpory wynosi R_B = Pa/L. Przekształcamy ten związek, żeby wyznaczyć położenie a.',
      caption: 'R_B = P · a / L, więc a = R_B · L / P.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B=\\frac{Pa}{L}\\quad\\Rightarrow\\quad a=\\frac{R_B L}{P}',
    },
    {
      title: 'Położenie siły',
      narration:
        'Podstawiamy R_B = 15 kN, L = 4 m i P = 20 kN. Otrzymujemy a = 15 · 4 / 20 = 3 m. Siła działa 3 m od lewej podpory, czyli 1 m od prawej.',
      caption: 'a = 3 m od lewej podpory.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'a=\\frac{R_B L}{P}=\\frac{15\\cdot4}{20}=3\\ \\text{m}',
    },
    {
      title: 'Reakcja R_A',
      narration: 'Z równowagi pionowej R_A + R_B = P, więc R_A = P − R_B = 20 − 15 = 5 kN.',
      caption: 'R_A = 5 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=P-R_B=20-15=5\\ \\text{kN}',
    },
    {
      title: 'Moment pod siłą',
      narration:
        'Moment pod siłą liczymy z lewej strony: M = R_A · a = 5 · 3 = 15 kN·m. Kontrola z prawej strony: R_B · (L − a) = 15 · 1 = 15 kN·m.',
      caption: 'M = 15 kN·m pod siłą P.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M=R_A\\cdot a=5\\cdot3=15\\ \\text{kN·m},\\qquad R_B\\cdot(L-a)=15\\cdot1=15\\ \\text{kN·m}',
    },
  ],
} satisfies SolutionData
