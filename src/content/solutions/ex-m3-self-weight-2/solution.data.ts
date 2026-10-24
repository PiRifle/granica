import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-self-weight-2',
  title: 'Ciężar własny elementu — przykład 2',
  duration: 7,
  given: ['A = 300 mm²', 'L = 4 m', 'P = 5 kN', 'ρ = 7850 kg/m³', 'γ = 77 kN/m³', 'E = 200 GPa'],
  result:
    'Zauważ, że w obu przypadkach wydłużenie od ciężaru własnego jest takie samo, bo nie zależy od ładunku P. Zmienia się tylko dodatkowy składnik PL/(EA). Dzięki zasadzie superpozycji możemy analizować te dwa wpływy osobno i dodać wyniki, dopóki materiał pozostaje liniowo sprężysty.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SelfWeightExample2Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Do pręta zawieszono na dolnym końcu ładunek P = 5 kN. Oprócz niego działa ciężar własny q = γA = 23,1 N/m. Oba obciążenia działają równocześnie, więc siłę w przekroju zapisujemy jako sumę.',
      caption: 'Pręt z ładunkiem P i rozłożonym ciężarem własnym.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'P=5\\ \\text{kN},\\qquad q=\\gamma A=23{,}1\\ \\text{N/m}',
    },
    {
      title: 'Siła osiowa N(x)',
      narration:
        'W przekroju x dolna część przenosi ładunek P oraz ciężar γAx. Z równowagi N(x) = P + γAx. Na dolnym końcu N(0) = 5,0 kN, przy zawieszeniu N(L) = 5092,4 N ≈ 5,09 kN.',
      caption: 'N(x) = P + γAx; stały składnik P i liniowy przyrost od ciężaru własnego.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'N(x)=P+\\gamma Ax,\\qquad N(L)=5000+92{,}4=5092{,}4\\ \\text{N}\\approx5{,}09\\ \\text{kN}',
    },
    {
      title: 'Naprężenie σ(x)',
      narration:
        'Po podzieleniu przez pole A otrzymujemy σ(x) = P/A + γx. Na dolnym końcu σ = 16,67 MPa, a przy zawieszeniu σmax = 5092,4/300 ≈ 16,97 MPa. Przyrost od ciężaru własnego jest mały, ale nie znika.',
      caption: 'σ(x) = P/A + γx; pole przekroju nie skraca już składnika od P.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        '\\sigma(x)=\\frac{P}{A}+\\gamma x,\\qquad \\sigma_{\\max}=\\frac{5092{,}4}{300}\\approx16{,}97\\ \\text{MPa}',
    },
    {
      title: 'Wydłużenie całkowite',
      narration:
        'Wydłużenie jest sumą dwóch niezależnych udziałów: od ładunku PL/(EA) = 0,333 mm i od ciężaru własnego γL²/(2E) = 0,00308 mm. Razem δ ≈ 0,336 mm; o wyniku decyduje ładunek zewnętrzny.',
      caption: 'Superpozycja: δ = PL/(EA) + γL²/(2E) ≈ 0,336 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\delta=\\frac{PL}{EA}+\\frac{\\gamma L^2}{2E}\\approx0{,}333+0{,}00308=0{,}336\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
