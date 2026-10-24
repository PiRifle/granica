import type { SolutionData } from '../../model'
import { SupportsReactionsExampleAnimation } from './animation'

export default {
  id: 'ex-foundations-supports-reactions',
  title: 'Podpory i reakcje: jak konstrukcja odpowiada — przykład 1',
  duration: 7,
  given: ['L = 5 m', 'q = 4 kN/m', 'P = 30 kN', 'a = 2 m'],
  result:
    'Reakcje wynoszą R_A = 28 kN i R_B = 22 kN, obie skierowane w górę. Suma reakcji 50 kN równoważy sumę obciążeń. Maksimum momentu wynosi 48 kN·m pod siłą P.',
  animation: SupportsReactionsExampleAnimation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Belka swobodnie podparta ma długość L = 5 m. Na całej długości działa obciążenie równomierne q = 4 kN/m, a w odległości a = 2 m od lewej podpory siła skupiona P = 30 kN. Wyznacz reakcje R_A i R_B. Obciążenie równomierne zastępujemy wypadkową Q = qL. Mnożymy 4 kN/m przez 5 m i otrzymujemy 20 kN. Wypadkowa Q działa w środku belki, czyli 2,5 m od podpory A. To ramię decyduje o momencie obciążenia ciągłego względem A. Moment reakcji R_B musi zrównoważyć moment siły P i moment wypadkowej Q. Równanie ma postać R_B · 5 = 30 · 2 + 20 · 2,5. Prawa strona równania wynosi 60 + 50 = 110 kN·m. Dzieląc przez 5 m, otrzymujemy R_B = 22 kN. Z równowagi pionowej suma reakcji jest równa sumie obciążeń: R_A + R_B = 30 + 20 = 50 kN. Stąd R_A = 50 − 22 = 28 kN. Sprawdzamy momenty względem prawej podpory: R_A · 5 − P · 3 − Q · 2,5 = 140 − 90 − 50 = 0. Bilans się zamyka. Pod siłą P moment wynosi M = R_A · 2 − q · 2 · 1 = 56 − 8 = 48 kN·m. Siła poprzeczna zmienia tam znak, więc to maksimum momentu. Suma reakcji pionowych 28 + 22 = 50 kN równoważy sumę obciążeń P + Q = 30 + 20 = 50 kN. Reakcje są poprawne.',
      caption: 'Reakcje równoważą całkowite obciążenie belki.',
      visual: 'beam',
      formula:
        'L=5\\ \\text{m},\\quad q=4\\ \\text{kN/m},\\quad P=30\\ \\text{kN},\\quad a=2\\ \\text{m}\\qquad Q=qL=4\\cdot5=20\\ \\text{kN}\\qquad x_Q=\\frac{L}{2}=\\frac{5}{2}=2{,}5\\ \\text{m}\\qquad R_B\\cdot5=30\\cdot2+20\\cdot2{,}5\\qquad R_B=\\frac{60+50}{5}=22\\ \\text{kN}\\qquad R_A=30+20-22=28\\ \\text{kN}\\qquad R_A\\cdot5-P\\cdot3-Q\\cdot2{,}5=140-90-50=0\\qquad M=R_A\\cdot2-q\\cdot2\\cdot1=56-8=48\\ \\text{kN·m}\\qquad R_A+R_B=28+22=50\\qquad P+Q=30+20=50',
    },
  ],
} satisfies SolutionData
