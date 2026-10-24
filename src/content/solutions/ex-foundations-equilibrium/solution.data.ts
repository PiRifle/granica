import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-foundations-equilibrium',
  title: 'Równowaga statyczna: trzy równania — przykład 1',
  duration: 7,
  given: ['L = 5,0 m', 'a = 3,0 m', 'P = 12 kN', 'q = 6,0 kN/m', 'H = 5,0 kN'],
  result:
    'RA = 19,8 kN w górę, RB = 22,2 kN w górę oraz Ax = 5,0 kN w prawo. Suma reakcji pionowych równa się sumie obciążeń pionowych, a kontrola momentów względem B daje zero.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.EquilibriumExampleAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość L = 5,0 m. W odległości a = 3,0 m od A działa siła P = 12 kN w dół, na całej długości obciążenie q = 6,0 kN/m, a w osi belki siła pozioma H = 5,0 kN. Reakcje w A przyjmujemy jako A_x w prawo i R_A w górę, a w B jako R_B w górę.',
      caption: 'Schemat belki z obciążeniem ciągłym q, siłą P w x = 3,0 m i siłą poziomą H.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula:
        'L=5{,}0\\ \\text{m},\\quad a=3{,}0\\ \\text{m},\\quad P=12\\ \\text{kN},\\quad q=6{,}0\\ \\text{kN/m},\\quad H=5{,}0\\ \\text{kN}',
    },
    {
      title: 'Diagram ciała swobodnego',
      narration:
        'Izolujemy belkę i zastępujemy podpory reakcjami: A_x w prawo, R_A w górę i R_B w górę. Obciążenia P, q oraz H pozostają na belce. To jest diagram ciała swobodnego, od którego zaczynamy równania równowagi.',
      caption: 'Reakcje A_x, R_A i R_B na diagramie ciała swobodnego.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'A_x-H=0,\\qquad R_A+R_B-P-qL=0,\\qquad \\sum M_A=0',
    },
    {
      title: 'Równowaga pozioma',
      narration:
        'Siła H działa w lewo, więc reakcja A_x musi działać w prawo. Z sumy sił poziomych A_x − H = 0, czyli A_x = 5,0 kN. Siły poziome znoszą się parami.',
      caption: 'A_x = H = 5,0 kN; siły poziome równoważą się.',
      visual: 'beam',
      focus: { metric: 'horizontal' },
      formula: 'A_x-H=0 \\quad\\Rightarrow\\quad A_x=5{,}0\\ \\text{kN}',
    },
    {
      title: 'Wypadkowa i momenty',
      narration:
        'Obciążenie równomierne zastępujemy wypadkową Q = qL = 30 kN działającą w połowie rozpiętości, 2,5 m od A. Z momentów względem A: R_B · 5,0 = 12 · 3,0 + 30 · 2,5 = 111 kN·m, więc R_B = 22,2 kN. Z równowagi pionowej R_A = 12 + 30 − 22,2 = 19,8 kN.',
      caption: 'Wypadkowa Q oraz wyznaczone reakcje R_B i R_A.',
      visual: 'beam',
      focus: { metric: 'moment' },
      formula:
        'Q=qL=6{,}0\\cdot5{,}0=30\\ \\text{kN},\\qquad R_B\\cdot5{,}0=12\\cdot3{,}0+30\\cdot2{,}5=111 \\quad\\Rightarrow\\quad R_B=22{,}2\\ \\text{kN},\\qquad R_A=12+30-22{,}2=19{,}8\\ \\text{kN}',
    },
    {
      title: 'Kontrola równowagi',
      narration:
        'Sprawdzamy bilans: R_A + R_B = 19,8 + 22,2 = 42 kN równoważy P + Q = 12 + 30 = 42 kN. Momenty względem B również dają zero. Siła H nie wnosi momentu, bo działa w osi belki.',
      caption: 'Bilans sił i momentów zamyka się do zera.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula:
        'R_A+R_B=19{,}8+22{,}2=42,\\qquad P+Q=12+30=42,\\qquad R_A\\cdot5{,}0-12\\cdot2{,}0-30\\cdot2{,}5=99-24-75=0',
    },
  ],
} satisfies SolutionData
