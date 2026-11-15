import { lazy } from 'react'
import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createAxialSolution } from '../../solution-factories/factory-axial-thermal/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  {
    title: '1. Model stopniowanego pręta',
    narration:
      'Pręt jest utwierdzony w podstawie A. Dolna, grubsza część AB ma długość 0,5 m i średnicę 60 mm. Górna, cieńsza część BC ma długość 0,4 m i średnicę 20 mm. W węźle B działa siła Q w dół, a na końcu C siła P w górę.',
    caption: 'Stopniowany pręt aluminiowy: gruba część dolna AB i cienka górna BC.',
    visual: 'axial',
    focus: { metric: 'model' },
    formula: 'l_1=0{,}5\\ \\mathrm{m}\\qquad l_2=0{,}4\\ \\mathrm{m}\\qquad P=5\\ \\mathrm{kN}',
  },
  {
    title: '2. Pola przekrojów i dane',
    narration:
      'Pola przekrojów obliczamy ze średnic. Dolna część ma pole 2827,43 mm², a górna tylko 314,16 mm². Stosunek pól wynosi 9, co będzie miało duży wpływ na sztywność obu części. Moduł Younga aluminium wynosi 70 GPa.',
    caption: 'Pola przekrojów: A₁ = 2827,43 mm² i A₂ = 314,16 mm².',
    visual: 'axial',
    focus: { metric: 'areas' },
    formula:
      'A_1=\\frac{\\pi\\cdot60^2}{4}=2827{,}43\\ \\mathrm{mm^2}\\\\ A_2=\\frac{\\pi\\cdot20^2}{4}=314{,}16\\ \\mathrm{mm^2}',
  },
  {
    title: '3. Siła wewnętrzna w górnej części',
    narration:
      'Przecinamy górną część BC i rozpatrujemy jej fragment od góry. Na końcu C działa siła P w górę, więc w przekroju musi działać siła wewnętrzna P skierowana przeciwnie. Górna część jest rozciągana siłą N₂ = +P = +5 kN.',
    caption: 'Górna część BC jest rozciągana siłą N₂ = +5 kN.',
    visual: 'axial',
    focus: { metric: 'upper' },
    formula: 'N_2=+P=+5\\ \\mathrm{kN}\\qquad\\text{rozciąganie}',
  },
  {
    title: '4. Siła wewnętrzna w dolnej części',
    narration:
      'W dolnej części AB siła wewnętrzna zależy od obu obciążeń. Z równowagi węzła B otrzymujemy N₁ = P − Q. Ponieważ Q jest większe od P, dolna część będzie ściskana, a nie rozciągana.',
    caption: 'Dolna część AB przenosi siłę N₁ = P − Q; jej znak zależy od wartości Q.',
    visual: 'axial',
    focus: { metric: 'lower' },
    formula: 'N_1=P-Q',
  },
  {
    title: '5. Warunek zerowego przemieszczenia C',
    narration:
      'Przemieszczenie końca C jest sumą przemieszczeń obu części. Każda część zmienia długość o Nl/(EA). Warunek δ_C = 0 oznacza, że wydłużenie jednej części musi dokładnie znieść skrócenie drugiej.',
    caption: 'Suma zmian długości obu części musi być równa zeru.',
    visual: 'axial',
    focus: { metric: 'compatibility' },
    formula: '\\delta_C=\\delta_1+\\delta_2=0\\quad\\Rightarrow\\quad\\frac{(P-Q)l_1}{EA_1}+\\frac{Pl_2}{EA_2}=0',
  },
  {
    title: '6. Rozwiązanie na siłę Q',
    narration:
      'Po pomnożeniu przez E i przekształceniu otrzymujemy Q = P[1 + (l₂/l₁)(A₁/A₂)]. Stosunek długości wynosi 0,8, a stosunek pól 9, więc Q = 5·(1 + 7,2) = 41 kN. Taka siła jest potrzebna, aby punkt C nie przesunął się.',
    caption: 'Wymagana siła Q wynosi 41 kN — znacznie więcej niż P.',
    visual: 'axial',
    focus: { metric: 'solve' },
    formula: 'Q=P\\left[1+\\frac{l_2}{l_1}\\frac{A_1}{A_2}\\right]=5\\left[1+0{,}8\\cdot9\\right]=41\\ \\mathrm{kN}',
  },
  {
    title: '7. Naprężenia w obu częściach',
    narration:
      'Przy Q = 41 kN dolna część przenosi N₁ = −36 kN, czyli jest ściskana. Górna część przenosi +5 kN i jest rozciągana. Dzieląc siły przez pola, otrzymujemy σ₁ = −12,73 MPa i σ₂ = +15,92 MPa.',
    caption: 'Dolna część ściskana, górna rozciągana; naprężenia mają różne znaki.',
    visual: 'axial',
    focus: { metric: 'stress' },
    formula:
      '\\sigma_1=\\frac{N_1}{A_1}=\\frac{-36000}{2827{,}43}=-12{,}73\\ \\mathrm{MPa}\\\\ \\sigma_2=\\frac{N_2}{A_2}=\\frac{5000}{314{,}16}=+15{,}92\\ \\mathrm{MPa}',
  },
  {
    title: '8. Kontrola i interpretacja',
    narration:
      'Warunek δ_C = 0 jest spełniony, więc punkt C nie przemieszcza się. Dolna część jest ściskana, a górna rozciągana. Mimo większego naprężenia w cieńszej części, to nie ona decyduje o przemieszczeniu, bo jej długość i siła są mniejsze.',
    caption: 'Punkt C pozostaje nieruchomy; wykres znaków naprężeń potwierdza ściskanie i rozciąganie.',
    visual: 'axial',
    focus: { metric: 'check' },
    formula: '\\delta_C=0\\qquad N_1<0,\\quad N_2>0',
    emphasis: 'Duża siła Q wynika z tego, że cienka górna część jest dziewięć razy mniej sztywna od dolnej.',
  },
]

export default {
  ...createAxialSolution({ ...meta, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SteppedAluminumAnimation }))),
} satisfies SolutionData
