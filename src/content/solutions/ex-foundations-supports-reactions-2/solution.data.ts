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
      title: 'Model, dane i obliczenia',
      narration:
        'Wspornik jest utwierdzony w ścianie w punkcie A i ma długość 2,5 m. Na swobodnym końcu działa siła 8 kN w dół, a na całej długości równomierne obciążenie 3 kN/m. Wyznacz reakcje w utwierdzeniu. Obciążenie równomierne zastępujemy siłą Q = qL. Mnożymy 3 kN/m przez 2,5 m i otrzymujemy 7,5 kN. Wypadkowa Q działa w środku obciążenia, czyli 1,25 m od utwierdzenia. To ramię decyduje o momencie obciążenia ciągłego względem A. Z równowagi pionowej reakcja w utwierdzeniu musi równoważyć obie siły skierowane w dół: R_Ay = P + Q = 8 + 7,5 = 15,5 kN. Siła 8 kN działa na ramieniu 2,5 m. Jej moment względem A wynosi 8 · 2,5 = 20 kN·m i obraca belkę zgodnie z ruchem wskazówek zegara. Wypadkowa Q działa na ramieniu 1,25 m. Jej moment względem A wynosi 7,5 · 1,25 = 9,375 kN·m. Reakcja momentowa równoważy sumę momentów obu obciążeń: M_A = M_P + M_Q = 20 + 9,375 = 29,375 kN·m. Działa przeciwnie do ruchu wskazówek zegara. Bilans względem swobodnego końca B: −M_A + R_Ay · 2,5 − Q · 1,25 = −29,375 + 38,75 − 9,375 = 0. Równowaga momentów się zamyka. Jeśli obciążenia działają zgodnie z ruchem wskazówek zegara, reakcja momentowa działa przeciwnie. Reakcja pozioma A_x wynosi zero, bo nie ma obciążeń poziomych, ale utwierdzenie nadal może przenosić siłę poziomą.',
      caption: 'Utwierdzenie przenosi siłę pionową i moment, a siła pozioma jest w tym zadaniu zerowa.',
      visual: 'beam',
      formula:
        'L=2{,}5\\ \\text{m},\\quad P=8\\ \\text{kN},\\quad q=3\\ \\text{kN/m}\\qquad Q=qL=3\\cdot2{,}5=7{,}5\\ \\text{kN}\\qquad x_Q=\\frac{L}{2}=\\frac{2{,}5}{2}=1{,}25\\ \\text{m}\\qquad R_{Ay}=P+Q=8+7{,}5=15{,}5\\ \\text{kN}\\qquad M_P=P L=8\\cdot2{,}5=20\\ \\text{kN·m}\\qquad M_Q=Q\\cdot\\frac{L}{2}=7{,}5\\cdot1{,}25=9{,}375\\ \\text{kN·m}\\qquad M_A=M_P+M_Q=20+9{,}375=29{,}375\\ \\text{kN·m}\\qquad -M_A+R_{Ay}\\cdot2{,}5-Q\\cdot1{,}25=-29{,}375+38{,}75-9{,}375=0',
    },
  ],
} satisfies SolutionData
