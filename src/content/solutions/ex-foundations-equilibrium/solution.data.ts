import type { SolutionData } from '../../model'
import { EquilibriumExampleAnimation } from './animation'

export default {
  id: 'ex-foundations-equilibrium',
  title: 'Równowaga statyczna: trzy równania — przykład 1',
  duration: 7,
  given: ['L = 5,0 m', 'a = 3,0 m', 'P = 12 kN', 'q = 6,0 kN/m', 'H = 5,0 kN'],
  result:
    'RA = 19,8 kN w górę, RB = 22,2 kN w górę oraz Ax = 5,0 kN w prawo. Suma reakcji pionowych równa się sumie obciążeń pionowych, a kontrola momentów względem B daje zero.',
  animation: EquilibriumExampleAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Belka swobodnie podparta ma długość L = 5,0 m. W odległości a = 3,0 m od A działa siła P = 12 kN w dół, na całej długości obciążenie q = 6,0 kN/m, a w osi belki siła pozioma H = 5,0 kN. Reakcje w A przyjmujemy jako A_x w prawo i A_y w górę, a w B jako R_B w górę. Z równowagi poziomej: A_x − H = 0, więc A_x = 5,0 kN w prawo. Obciążenie równomierne zastępujemy wypadkową Q = qL = 6,0 · 5,0 = 30 kN. Wypadkowa Q działa w środku rozpiętości, czyli w odległości 2,5 m od A. Suma momentów względem A: R_B · 5,0 − 12 · 3,0 − 30 · 2,5 = 0. Stąd R_B · 5,0 = 36 + 75 = 111 kN·m, więc R_B = 22,2 kN. Suma sił pionowych: A_y + R_B = 12 + 30 = 42 kN, więc A_y = 42 − 22,2 = 19,8 kN. Kontrola momentów względem B: A_y · 5,0 − 12 · 2,0 − 30 · 2,5 = 99 − 24 − 75 = 0. Moment pod siłą P: M = A_y · 3,0 − q · 3,0 · 1,5 = 59,4 − 27 = 32,4 kN·m. To jednocześnie maksimum momentu. Suma reakcji pionowych 19,8 + 22,2 = 42 kN równoważy sumę obciążeń pionowych 12 + 30 = 42 kN. Siła H nie wnosi momentu, bo działa w osi belki.',
      caption: 'Reakcje pionowe równoważą obciążenia pionowe.',
      visual: 'beam',
      formula:
        'L=5{,}0\\ \\text{m},\\quad a=3{,}0\\ \\text{m},\\quad P=12\\ \\text{kN},\\quad q=6{,}0\\ \\text{kN/m}\\qquad A_x-H=0 \\quad\\Rightarrow\\quad A_x=5{,}0\\ \\text{kN}\\qquad Q=qL=6{,}0\\cdot 5{,}0=30\\ \\text{kN}\\qquad x_Q=\\frac{L}{2}=\\frac{5{,}0}{2}=2{,}5\\ \\text{m}\\qquad R_B\\cdot 5{,}0-12\\cdot 3{,}0-30\\cdot 2{,}5=0\\qquad R_B\\cdot 5{,}0=36+75=111 \\quad\\Rightarrow\\quad R_B=22{,}2\\ \\text{kN}\\qquad A_y+R_B=12+30=42 \\quad\\Rightarrow\\quad A_y=19{,}8\\ \\text{kN}\\qquad A_y\\cdot 5{,}0-12\\cdot 2{,}0-30\\cdot 2{,}5=99-24-75=0\\qquad M_{\\max}=A_y\\cdot 3{,}0-q\\cdot 3{,}0\\cdot 1{,}5=59{,}4-27=32{,}4\\ \\text{kN·m}\\qquad A_y+R_B=19{,}8+22{,}2=42,\\qquad P+Q=12+30=42',
    },
  ],
} satisfies SolutionData
