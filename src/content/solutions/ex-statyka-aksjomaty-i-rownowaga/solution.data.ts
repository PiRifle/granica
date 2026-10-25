import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-aksjomaty-i-rownowaga',
  title: 'Reakcje belki z trzech równań równowagi',
  duration: 7,
  given: [
    'Belka AB o długości l = 6 m, przegub w A i podpora przesuwna w B',
    'F₁ = 4 kN w dół, 2 m od A',
    'F₂ = 10 kN w dół, 4 m od A',
    'H = 3 kN poziomo w prawo, 3 m od A',
  ],
  result:
    'B_y = 8 kN w górę, A_y = 6 kN w górę, A_x = 3 kN w lewo. Wypadkowa reakcja w A: R_A = 6,71 kN pod kątem 63,4° do poziomu. Kontrola momentem względem B daje zero.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.EquilibriumBeamAnimation }))),
  scenes: [
    {
      title: 'Schemat i niewiadome',
      narration:
        'Po oswobodzeniu belki w A działają dwie składowe reakcji, a w B jedna pionowa. Siły czynne to F₁, F₂ i H. Niewiadomych jest trzy i tyle samo mamy równań równowagi.',
      caption: 'Trzy niewiadome reakcje i trzy równania równowagi.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: '\\sum F_x=0,\\qquad \\sum F_y=0,\\qquad \\sum M_A=0',
    },
    {
      title: 'Moment względem A',
      narration:
        'Biegun w A eliminuje A_x i A_y. Siła H leży na osi belki, więc jej moment też znika. Zostaje B_y razy 6 minus 4 razy 2 minus 10 razy 4. Stąd B_y równa się 8 kN.',
      caption: '6·B_y = 4·2 + 10·4 = 48, więc B_y = 8 kN.',
      visual: 'diagram',
      focus: { metric: 'momentA' },
      formula: 'B_y\\cdot6-F_1\\cdot2-F_2\\cdot4=0\\ \\Rightarrow\\ B_y=\\frac{4\\cdot2+10\\cdot4}{6}=8\\ \\text{kN}',
    },
    {
      title: 'Suma rzutów pionowych',
      narration:
        'Pionowo działają A_y, B_y oraz obie siły czynne w dół. Suma obciążeń to 14 kN, a B_y to 8 kN, więc na podporę A przypada 6 kN w górę.',
      caption: 'A_y = 14 − 8 = 6 kN.',
      visual: 'diagram',
      focus: { metric: 'sumFy' },
      formula: 'A_y+B_y-F_1-F_2=0\\ \\Rightarrow\\ A_y=14-8=6\\ \\text{kN}',
    },
    {
      title: 'Suma rzutów poziomych',
      narration:
        'Poziomo działa tylko H w prawo i A_x. Równanie daje A_x = −3 kN. Znak minus oznacza, że reakcja działa w lewo, przeciwnie do założonego zwrotu dodatniego.',
      caption: 'A_x = −3 kN, czyli 3 kN w lewo.',
      visual: 'diagram',
      focus: { metric: 'sumFx' },
      formula: 'A_x+H=0\\ \\Rightarrow\\ A_x=-3\\ \\text{kN}',
    },
    {
      title: 'Wypadkowa reakcja w A',
      narration:
        'Składowe reakcji w A tworzą trójkąt o przyprostokątnych 3 i 6 kN. Moduł wynosi pierwiastek z 45, czyli 6,71 kN. Kąt do poziomu to arcus tangens 6/3, czyli 63,4°; reakcja działa w lewo i w górę.',
      caption: 'R_A = 6,71 kN pod kątem 63,4°.',
      visual: 'diagram',
      focus: { metric: 'resultantA' },
      formula: 'R_A=\\sqrt{3^2+6^2}=6{,}71\\ \\text{kN},\\qquad \\alpha=\\arctan\\frac{6}{3}=63{,}4^\\circ',
    },
    {
      title: 'Kontrola względem B',
      narration:
        'Liczmy momenty względem B. A_y daje moment ujemny, obie siły czynne dodatnie. Suma −36 + 16 + 20 jest równa zero, więc znalezione reakcje spełniają także to równanie.',
      caption: 'ΣM_B = −6·6 + 4·4 + 10·2 = 0.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '-A_y\\cdot6+F_1\\cdot4+F_2\\cdot2=-36+16+20=0',
    },
  ],
} satisfies SolutionData
