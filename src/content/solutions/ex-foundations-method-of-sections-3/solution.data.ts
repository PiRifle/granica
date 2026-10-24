import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-foundations-method-of-sections-3',
  title: 'Metoda przekrojów: zajrzyj do środka — przykład 3',
  duration: 7,
  given: ['L = 5 m', 'a = 2 m', 'x = 1 m', 'M = 12 kN·m'],
  result:
    'P = 20 kN, R_A = 12 kN, R_B = 8 kN, a maksymalny moment wynosi 24 kN·m. Kontrola z prawej strony: R_B · 3 = 8 · 3 = 24 kN·m. Jeden zmierzony moment nie wystarczyłby do wyznaczenia zarówno P, jak i a — potrzebna była znajomość położenia siły.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.MethodOfSectionsInverseAnimation }))),
  scenes: [
    {
      title: 'Model i pomiar',
      narration:
        'Belka swobodnie podparta ma długość 5 m. Siła skupiona P działa w odległości 2 m od lewej podpory. W przekroju x = 1 m zmierzono moment zginający M = 12 kN·m. Wyznacz P, reakcje oraz maksymalny moment.',
      caption: 'Schemat belki z nieznaną siłą P w x = 2 m i pomiarem momentu w x = 1 m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=5\\ \\text{m},\\quad a=2\\ \\text{m},\\quad x=1\\ \\text{m},\\quad M=12\\ \\text{kN·m}',
    },
    {
      title: 'Reakcja w funkcji siły',
      narration:
        'Dla x przed siłą lewa część belki zawiera tylko reakcję R_A. Z równowagi momentów względem B reakcja lewej podpory wynosi R_A = P(1 − a/L). Po podstawieniu a/L = 2/5 otrzymujemy R_A = 0,6P, a prawa reakcja R_B = 0,4P.',
      caption: 'R_A = 0,6P, a R_B = 0,4P.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=P\\left(1-\\frac{a}{L}\\right)=P\\left(1-\\frac{2}{5}\\right)=0{,}6P',
    },
    {
      title: 'Cięcie w x = 1 m: moment od R_A',
      narration:
        'Przesuwamy przekrój do x = 1 m. Lewa część zawiera tylko reakcję R_A, więc N = 0, V = R_A i M = R_A · 1. Związek R_A = 0,6P daje M = 0,6P, a w przekroju zmierzono M = 12 kN·m.',
      caption: 'W x = 1 m: N = 0, V = R_A, M = 0,6P = 12 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'x=1\\ \\text{m},\\qquad N=0,\\qquad V=R_A,\\qquad M=R_A\\cdot1=0{,}6P',
    },
    {
      title: 'Wyznaczenie siły P',
      narration:
        'Podstawiamy zmierzony moment 12 kN·m: 0,6P = 12. Dzielimy obie strony przez 0,6 i otrzymujemy P = 20 kN.',
      caption: 'P = 20 kN.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: '0{,}6P=12\\quad\\Rightarrow\\quad P=20\\ \\text{kN}',
    },
    {
      title: 'Reakcje po wyznaczeniu P',
      narration:
        'Po wyznaczeniu siły wracamy do związku R_A = 0,6P i otrzymujemy R_A = 0,6 · 20 = 12 kN. Reakcja prawej podpory wynosi R_B = P · a / L = 20 · 2 / 5 = 8 kN.',
      caption: 'R_A = 12 kN, R_B = 8 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=0{,}6P=0{,}6\\cdot20=12\\ \\text{kN},\\qquad R_B=\\frac{Pa}{L}=\\frac{20\\cdot2}{5}=8\\ \\text{kN}',
    },
    {
      title: 'Moment maksymalny i kontrola',
      narration:
        'Maksymalny moment pojawia się pod siłą P, czyli w x = 2 m. Licząc z lewej strony: M_max = R_A · 2 = 12 · 2 = 24 kN·m. Kontrola z prawej strony: R_B · 3 = 8 · 3 = 24 kN·m. Jeden pomiar momentu nie wystarczyłby do wyznaczenia zarówno P, jak i a; tutaj położenie siły było znane.',
      caption: 'M_max = 24 kN·m pod siłą P; kontrola z prawej strony daje 8 · 3 = 24 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{\\max}=R_A\\cdot2=12\\cdot2=24\\ \\text{kN·m},\\qquad R_B\\cdot3=8\\cdot3=24\\ \\text{kN·m}',
    },
  ],
} satisfies SolutionData
