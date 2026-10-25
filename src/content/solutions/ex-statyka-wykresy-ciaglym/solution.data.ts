import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-wykresy-ciaglym',
  title: 'Wykresy przy obciążeniu trójkątnym',
  duration: 7,
  given: [
    'Belka swobodnie podparta o rozpiętości L = 6 m',
    'Obciążenie trójkątne: q = 0 w A, q₀ = 6 kN/m w B',
    'Funkcja obciążenia q(x) = x kN/m',
  ],
  result:
    'R_A = 6 kN, R_B = 12 kN. T(x) = 6 − x²/2, M(x) = 6x − x³/6. M_max = 13,86 kN·m w x = 3,46 m, a M(0) = M(6) = 0.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TriangularLoadAnimation }))),
  scenes: [
    {
      title: 'Obciążenie liniowo zmienne',
      narration:
        'Natężenie obciążenia rośnie od zera w podporze A do 6 kN/m w podporze B. Funkcja q(x) jest liniowa: q równa się x. To stopień wyżej niż obciążenie stałe, więc również wykresy T i M będą o stopień wyżej.',
      caption: 'q(x) = q₀x/L = x kN/m na całej rozpiętości.',
      visual: 'diagram',
      focus: { metric: 'load' },
      formula: 'q(x)=\\frac{q_0}{L}x=\\frac{6}{6}x=x\\ \\text{kN/m},\\qquad 0\\le x\\le6\\ \\text{m}',
    },
    {
      title: 'Wypadkowa i reakcje',
      narration:
        'Pole trójkąta obciążenia to połowa iloczynu podstawy i wysokości, czyli 18 kN. Wypadkowa działa w środku ciężkości trójkąta, w odległości 4 m od A. Moment względem A daje R_B równe 12 kN, a równowaga pionowa — R_A równe 6 kN.',
      caption: 'W = 18 kN w odległości 4 m od A; R_A = 6 kN, R_B = 12 kN.',
      visual: 'diagram',
      focus: { metric: 'reaction' },
      formula:
        'W=\\frac12q_0L=18\\ \\text{kN},\\qquad R_B=\\frac{18\\cdot4}{6}=12\\ \\text{kN},\\qquad R_A=6\\ \\text{kN}',
    },
    {
      title: 'Siła tnąca — parabola',
      narration:
        'Całkujemy minus q(x), czyli minus x. Siła tnąca ma postać 6 minus x²/2. Na lewej podporze wynosi 6 kN, w środku 1,5 kN, a przy prawej podporze spada do minus 12 kN. Pod podporą B następuje skok o 12 kN.',
      caption: 'T(0) = 6 kN, T(3) = 1,5 kN, T(6) = −12 kN.',
      visual: 'diagram',
      focus: { metric: 'T' },
      formula:
        'T(x)=R_A-\\int_0^x s\\,ds=6-\\frac{x^2}{2},\\qquad T(3)=1{,}5\\ \\text{kN},\\qquad T(6)=-12\\ \\text{kN}',
    },
    {
      title: 'Moment — krzywa sześcienna',
      narration:
        'Całkując siłę tnącą, otrzymujemy moment 6x minus x³/6. W środku rozpiętości moment wynosi 13,5 kN·m, ale to nie jest jeszcze maksimum, bo siła tnąca jest tam dodatnia. Moment zeruje się na obu podporach.',
      caption: 'M(3) = 13,5 kN·m; M(0) = M(6) = 0.',
      visual: 'diagram',
      focus: { metric: 'M' },
      formula: 'M(x)=\\int_0^x T(s)\\,ds=6x-\\frac{x^3}{6},\\qquad M(3)=18-4{,}5=13{,}5\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Maksimum momentu',
      narration:
        'Ekstremum momentu wyznacza zerowanie siły tnącej. Równanie 6 minus x²/2 równa się zero daje x równy pierwiastkowi z 12, czyli około 3,46 m. Moment osiąga tam 13,86 kN·m.',
      caption: 'x = √12 ≈ 3,46 m, M_max ≈ 13,86 kN·m.',
      visual: 'diagram',
      focus: { metric: 'extremum' },
      formula: 'T=0\\Rightarrow x=\\sqrt{12}=3{,}464\\ \\text{m},\\qquad M_{\\max}=13{,}86\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Kontrola kształtów i brzegów',
      narration:
        'Obciążenie jest stopnia pierwszego, siła tnąca drugiego, a moment trzeciego. Moment znika na obu podporach, a pod B siła tnąca skacze o wartość reakcji. Te trzy obserwacje potwierdzają poprawność całkowania.',
      caption: 'q liniowe, T kwadratowe, M sześcienne; M(0) = M(6) = 0.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'M(0)=0,\\quad M(6)=0,\\quad T(6^-)=-12\\ \\text{kN},\\quad T(6^+)=0',
    },
  ],
} satisfies SolutionData
