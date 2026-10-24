import type { SolutionData } from '../../model'
import { SupportsReactionsExample2Animation } from './animation'

export default {
  id: 'ex-foundations-supports-reactions-2',
  title: 'Podpory i reakcje: jak konstrukcja odpowiada — przykład 2',
  duration: 7,
  given: ['L = 2,5 m', 'P = 8 kN', 'q = 3 kN/m'],
  result:
    'R_Ay = 15,5 kN, a reakcja momentowa M_A = 29,375 kN·m działa przeciwnie do momentu obciążeń. Reakcja pozioma A_x wynosi zero, bo nie ma obciążeń poziomych. Utwierdzenie nadal ma jednak zdolność przenoszenia siły poziomej — jej wartość w tym zadaniu jest po prostu zerowa.',
  animation: SupportsReactionsExample2Animation,
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
      narration:
        'Obciążenie równomierne zastępujemy wypadkową Q = qL = 3 · 2,5 = 7,5 kN. Działa ona w środku obciążenia, czyli 1,25 m od utwierdzenia.',
      caption: 'Q = 7,5 kN w x_Q = 1,25 m od A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'Q=qL=3\\cdot2{,}5=7{,}5\\ \\text{kN},\\qquad x_Q=\\frac{L}{2}=1{,}25\\ \\text{m}',
    },
    {
      title: 'Reakcja pionowa w utwierdzeniu',
      narration:
        'Z równowagi pionowej reakcja w utwierdzeniu musi równoważyć obie siły skierowane w dół: R_Ay = P + Q = 8 + 7,5 = 15,5 kN. Działa w górę.',
      caption: 'R_Ay = 15,5 kN w górę.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_{Ay}=P+Q=8+7{,}5=15{,}5\\ \\text{kN}',
    },
    {
      title: 'Moment od obciążeń względem A',
      narration:
        'Siła P działa na ramieniu 2,5 m, a wypadkowa Q na ramieniu 1,25 m. Oba momenty obracają belkę zgodnie z ruchem wskazówek zegara: M_P = 8 · 2,5 = 20 kN·m oraz M_Q = 7,5 · 1,25 = 9,375 kN·m.',
      caption: 'M_P + M_Q = 29,375 kN·m zgodnie z ruchem wskazówek zegara.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula:
        'M_P=P\\cdot L=8\\cdot2{,}5=20\\ \\text{kN·m},\\qquad M_Q=Q\\cdot\\frac{L}{2}=7{,}5\\cdot1{,}25=9{,}375\\ \\text{kN·m}',
    },
    {
      title: 'Reakcja momentowa w utwierdzeniu',
      narration:
        'Reakcja momentowa równoważy sumę momentów obciążeń: M_A = M_P + M_Q = 20 + 9,375 = 29,375 kN·m. Działa przeciwnie do ruchu wskazówek zegara, czyli przeciwnie do momentu obciążeń.',
      caption: 'M_A = 29,375 kN·m przeciwnie do ruchu wskazówek zegara.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'M_A=M_P+M_Q=20+9{,}375=29{,}375\\ \\text{kN·m}',
    },
  ],
} satisfies SolutionData
