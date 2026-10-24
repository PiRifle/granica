import type { SolutionData } from '../../model'
import { EquilibriumExample3Animation } from './animation'

export default {
  id: 'ex-foundations-equilibrium-3',
  title: 'Równowaga statyczna: trzy równania — przykład 3',
  duration: 7,
  given: ['L = 4,0 m', 'a = 1,5 m', 'P = 8 kN', 'R_B = 14 kN'],
  result:
    'q = 5,5 kN/m, R_A = 16 kN, a maksimum momentu wynosi 17,8 kN·m pod siłą P. Sprawdzenie momentem względem B: R_A·4 = 64 kN·m oraz P·2,5 + Q·2 = 20 + 44 = 64 kN·m. Gdyby R_B było mniejsze niż Pa/L = 3 kN, otrzymalibyśmy ujemne q, czyli obciążenie skierowane do góry. To sygnał, że dane nie odpowiadają założonemu modelowi belki z obciążeniem w dół.',
  animation: EquilibriumExample3Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Belka swobodnie podparta ma długość L = 4,0 m. W odległości a = 1,5 m od lewej podpory działa siła P = 8 kN w dół, a na całej belce działa nieznane równomierne obciążenie q. Wiadomo, że reakcja prawej podpory wynosi R_B = 14 kN. Wyznacz q oraz reakcję R_A. Suma momentów względem A zawiera moment siły P oraz moment wypadkowej obciążenia ciągłego. Reakcja R_B jest znana, więc równanie pozwala wyznaczyć q. Podstawiamy L = 4,0 m, a = 1,5 m, P = 8 kN i R_B = 14 kN. Po lewej stronie otrzymujemy 56 kN·m, a moment siły P wynosi 12 kN·m. Po uproszczeniu równania mamy 56 = 12 + 8q, czyli 8q = 44. Stąd q = 5,5 kN/m. Obciążenie równomierne zastępujemy wypadkową Q = qL = 5,5 · 4,0 = 22 kN. Działa ona w środku rozpiętości belki. Wypadkowa obciążenia równomiernego działa w połowie długości, czyli 2,0 m od podpory A. Z równowagi pionowej suma reakcji musi być równa sumie obciążeń: R_A + R_B = P + Q = 8 + 22 = 30 kN. Stąd R_A = 30 − 14 = 16 kN. Sprawdzamy momenty względem prawej podpory: R_A · 4 − P · 2,5 − Q · 2 = 64 − 20 − 44 = 0. Bilans się zamyka. Pod siłą P moment wynosi M = R_A · 1,5 − q · 1,5 · 0,75 = 24 − 6,1875 ≈ 17,8 kN·m. Siła poprzeczna zmienia tam znak z dodatniego na ujemny, więc jest to maksimum momentu. Suma reakcji pionowych 16 + 14 = 30 kN równoważy sumę obciążeń P + Q = 8 + 22 = 30 kN. Dane są spójne z modelem belki swobodnie podpartej.',
      caption: 'Reakcje pionowe równoważą obciążenia pionowe.',
      visual: 'beam',
      formula:
        'L=4{,}0\\ \\text{m},\\quad a=1{,}5\\ \\text{m},\\quad P=8\\ \\text{kN},\\quad R_B=14\\ \\text{kN}\\qquad R_B L=P a+\\frac{qL^2}{2}\\qquad 14\\cdot4=8\\cdot1{,}5+\\frac{q\\cdot4^2}{2}\\qquad 56=12+8q\\quad\\Rightarrow\\quad q=5{,}5\\ \\text{kN/m}\\qquad Q=qL=5{,}5\\cdot4=22\\ \\text{kN}\\qquad x_Q=\\frac{L}{2}=\\frac{4}{2}=2{,}0\\ \\text{m}\\qquad R_A=P+Q-R_B=8+22-14=16\\ \\text{kN}\\qquad R_A\\cdot4-P\\cdot2{,}5-Q\\cdot2=64-20-44=0\\qquad M=R_A\\cdot1{,}5-q\\cdot1{,}5\\cdot0{,}75=24-6{,}1875=17{,}8125\\approx17{,}8\\ \\text{kN·m}\\qquad R_A+R_B=16+14=30,\\qquad P+Q=8+22=30',
    },
  ],
} satisfies SolutionData
