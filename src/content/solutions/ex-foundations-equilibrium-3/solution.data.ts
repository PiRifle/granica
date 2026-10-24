import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-foundations-equilibrium-3',
  title: 'Równowaga statyczna: trzy równania — przykład 3',
  duration: 7,
  given: ['L = 4,0 m', 'a = 1,5 m', 'P = 8 kN', 'R_B = 14 kN'],
  result:
    'q = 5,5 kN/m, R_A = 16 kN, a maksimum momentu wynosi 17,8 kN·m pod siłą P. Sprawdzenie momentem względem B: R_A·4 = 64 kN·m oraz P·2,5 + Q·2 = 20 + 44 = 64 kN·m. Gdyby R_B było mniejsze niż Pa/L = 3 kN, otrzymalibyśmy ujemne q, czyli obciążenie skierowane do góry. To sygnał, że dane nie odpowiadają założonemu modelowi belki z obciążeniem w dół.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.EquilibriumExample3Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość L = 4,0 m. W odległości a = 1,5 m od A działa siła P = 8 kN w dół, a na całej belce działa nieznane równomierne obciążenie q. Wiemy, że reakcja prawej podpory wynosi R_B = 14 kN.',
      caption: 'Znane są P, geometria i R_B; szukamy q oraz R_A.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula:
        'L=4{,}0\\ \\text{m},\\quad a=1{,}5\\ \\text{m},\\quad P=8\\ \\text{kN},\\quad R_B=14\\ \\text{kN},\\quad q=?',
    },
    {
      title: 'Równanie momentów względem A',
      narration:
        'Suma momentów względem A: R_B · L = P · a + qL²/2. Po podstawieniu 14 · 4 = 8 · 1,5 + q · 4²/2, czyli 56 = 12 + 8q. Stąd 8q = 44 i q = 5,5 kN/m.',
      caption: 'Z podanej reakcji R_B wyznaczamy q = 5,5 kN/m.',
      visual: 'beam',
      focus: { metric: 'moment' },
      formula:
        'R_B L=P a+\\frac{qL^2}{2},\\qquad 14\\cdot4=8\\cdot1{,}5+\\frac{q\\cdot4^2}{2},\\qquad 56=12+8q \\quad\\Rightarrow\\quad q=5{,}5\\ \\text{kN/m}',
    },
    {
      title: 'Wypadkowa obciążenia ciągłego',
      narration:
        'Obciążenie równomierne zastępujemy wypadkową Q = qL = 5,5 · 4,0 = 22 kN. Działa ona w środku rozpiętości, czyli 2,0 m od A.',
      caption: 'Q = 22 kN działa 2,0 m od A.',
      visual: 'beam',
      focus: { metric: 'resultant' },
      formula: 'Q=qL=5{,}5\\cdot4{,}0=22\\ \\text{kN},\\qquad x_Q=\\frac{L}{2}=2{,}0\\ \\text{m}',
    },
    {
      title: 'Reakcja R_A',
      narration: 'Z równowagi pionowej R_A + R_B = P + Q, czyli R_A = 8 + 22 − 14 = 16 kN.',
      caption: 'R_A = 16 kN w górę.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A+R_B=P+Q,\\qquad R_A=8+22-14=16\\ \\text{kN}',
    },
    {
      title: 'Kontrola równowagi',
      narration:
        'Kontrola momentów względem B: R_A · 4 − P · 2,5 − Q · 2 = 64 − 20 − 44 = 0. Suma reakcji 16 + 14 = 30 kN równa się sumie obciążeń 8 + 22 = 30 kN.',
      caption: 'Moment i siły równoważą się; dane są spójne.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula:
        'R_A\\cdot4-P\\cdot2{,}5-Q\\cdot2=16\\cdot4-8\\cdot2{,}5-22\\cdot2=64-20-44=0,\\qquad R_A+R_B=16+14=30,\\qquad P+Q=8+22=30',
    },
  ],
} satisfies SolutionData
