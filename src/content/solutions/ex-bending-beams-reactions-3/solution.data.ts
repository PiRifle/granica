import type { SolutionData } from '../../model'
import { lazy } from 'react'

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
  animation: lazy(() => import('./animation').then((module) => ({ default: module.BeamReactionsExample3Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma rozpiętość L = 8 m. Znamy reakcje R_A = 30 kN i R_B = 10 kN. Na belkę działa jedna siła skupiona P w nieznanej odległości a od lewej podpory; chcemy odtworzyć P oraz a.',
      caption: 'Znane reakcje działają w górę; położenie i wartość siły P są niewiadome.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula: 'L = 8\\ \\text{m},\\quad R_A = 30\\ \\text{kN},\\quad R_B = 10\\ \\text{kN}',
    },
    {
      title: 'Suma sił — wartość P',
      narration:
        'Suma sił pionowych daje P = R_A + R_B = 30 + 10 = 40 kN. Siła działa w dół; jej położenie a nadal trzeba wyznaczyć z momentów.',
      caption: 'P = 40 kN, ale odległość a pozostaje niewiadoma.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'P = R_A + R_B = 30 + 10 = 40\\ \\text{kN}',
    },
    {
      title: 'Moment względem A — położenie a',
      narration:
        'Z sumy momentów względem A: R_B · L = P · a, czyli a = R_B L / P = 10 · 8 / 40 = 2 m. Siła leży bliżej lewej podpory, dlatego R_A jest większa od R_B.',
      caption: 'a = 2 m od A; siła przesuwa się na wyznaczone miejsce.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'R_B L = P a \\Rightarrow a = \\frac{R_B L}{P} = \\frac{10 \\cdot 8}{40} = 2\\ \\text{m}',
    },
    {
      title: 'Kontrola i interpretacja',
      narration:
        'Kontrola: R_A = P (L − a) / L = 40 · 6 / 8 = 30 kN, czyli się zgadza. Większa reakcja po lewej stronie oznacza, że siła jest bliżej lewej podpory.',
      caption: 'Reakcje i położenie siły tworzą spójny schemat równowagi.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula: 'R_A = \\frac{P(L-a)}{L} = \\frac{40 \\cdot 6}{8} = 30\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
