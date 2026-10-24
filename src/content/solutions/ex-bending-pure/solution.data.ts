import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-bending-pure',
  title: 'Czyste zginanie — przykład 1',
  duration: 7,
  given: ['L = 4 m', 'P = 12 kN', 'a = 1 m', 'b = 60 mm', 'h = 120 mm', 'E = 200 GPa'],
  result:
    'Między siłami panuje czyste zginanie: M = 12 kN·m i T = 0. Naprężenia skrajne wynoszą ± 83,3 MPa, a oś belki zakrzywia się w łuk o promieniu około 144 m. Górne włókna są ściskane, dolne rozciągane.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PureBendingExample1Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta o rozpiętości L = 4 m jest obciążona w układzie czteropunktowym: dwie siły P = 12 kN działają w odległości a = 1 m od każdej podpory. Przekrój jest prostokątny, b = 60 mm i h = 120 mm, a materiał ma E = 200 GPa.',
      caption: 'Czteropunktowy układ zginania: siły w x = 1 m i x = 3 m, przekrój 60 × 120 mm.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula:
        'L=4\\ \\text{m},\\quad a=1\\ \\text{m},\\quad P=12\\ \\text{kN},\\quad b\\times h=60\\times120\\ \\text{mm},\\quad E=200\\ \\text{GPa}',
    },
    {
      title: 'Czyste zginanie między siłami',
      narration:
        'Z symetrii reakcje wynoszą R_A = R_B = 12 kN. Na odcinku od x = 1 m do x = 3 m siła tnąca znika, a moment jest stały: M = P a = 12 kN·m. Ten środkowy odcinek jest właśnie odcinkiem czystego zginania.',
      caption: 'Na środkowym odcinku T = 0, a M = 12 kN·m jest stały.',
      visual: 'beam',
      focus: { metric: 'forces' },
      formula: 'M=Pa=12\\cdot1=12\\ \\text{kN}\\cdot\\text{m},\\qquad T=0',
    },
    {
      title: 'Krzywizna belki',
      narration:
        'Stały moment wywołuje stałą krzywiznę. Oś belki zakrzywia się w łuk, a przekroje pozostają płaskie i obracają się względem siebie. Promień krzywizny wynosi ρ = EI/M ≈ 144 m.',
      caption: 'Stała krzywizna na całym odcinku: przekroje pozostają płaskie, ρ ≈ 144 m.',
      visual: 'beam',
      focus: { metric: 'curvature' },
      formula:
        '\\kappa=\\frac{M}{EI}=6{,}94\\cdot10^{-3}\\ \\text{1/m},\\qquad \\rho=\\frac{1}{\\kappa}\\approx144\\ \\text{m}',
    },
    {
      title: 'Liniowy rozkład naprężeń',
      narration:
        'Naprężenie normalne zmienia się liniowo od zera na osi obojętnej do wartości maksymalnej na skrajnych włóknach. Górne włókna są ściskane, dolne rozciągane, a wartość skrajna wynosi σ_max = M/W = 83,3 MPa.',
      caption: 'σ = My/I: zero na osi obojętnej, ±83,3 MPa na skrajnych włóknach.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: '\\sigma(y)=\\frac{My}{I},\\qquad \\sigma_{\\max}=\\frac{M}{W}=83{,}3\\ \\text{MPa}',
    },
    {
      title: 'Kontrola odkształceń',
      narration:
        'Na koniec kontrola: skrajne włókno ma ε = c/ρ = 60/144 000 = 4,17·10⁻⁴, więc σ = Eε = 83,3 MPa. Brak siły tnącej nie oznacza braku naprężeń — T = 0, ale naprężenia normalne nadal istnieją.',
      caption: 'T = 0, ale σ_max = 83,3 MPa; ε = 4,17·10⁻⁴ jest w zakresie sprężystym.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula: '\\varepsilon=\\frac{c}{\\rho}=4{,}17\\cdot10^{-4},\\qquad \\sigma=E\\varepsilon=83{,}3\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
