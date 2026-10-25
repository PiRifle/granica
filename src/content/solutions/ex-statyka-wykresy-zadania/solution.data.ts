import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-wykresy-zadania',
  title: 'Pełne zadanie — rama z obciążeniem ciągłym',
  duration: 8,
  given: [
    'Kolumna AB o wysokości h = 4 m, utwierdzona w A',
    'Belka BC o długości L = 6 m, sztywny węzeł w B',
    'Obciążenie ciągłe q = 4 kN/m na całej belce',
    'W końcu C: P = 12 kN w dół i H = 10 kN w prawo',
  ],
  result:
    'A_x = 10 kN w lewo, A_y = 36 kN w górę, M_A = 184 kN·m. Belka: N = −10 kN, T(x) = 36 − 4x, M_B = −144, M_środek = −54 kN·m. Kolumna: N = −36 kN, T = 10 kN, M(y) = 184 − 10y; M_podstawa = 184, M_B = 144 kN·m.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FullFrameAnimation }))),
  scenes: [
    {
      title: 'Schemat i obciążenia',
      narration:
        'Na belce działa obciążenie ciągłe na całej długości, a w wolnym końcu dodatkowo siła pionowa i pozioma. Kolumna jest utwierdzona, więc reakcja obejmuje dwie siły i moment. Zanim policzymy cokolwiek w przekroju, musimy znać te reakcje.',
      caption: 'h = 4 m, L = 6 m, q = 4 kN/m, P = 12 kN, H = 10 kN.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        'h=4\\ \\text{m},\\quad L=6\\ \\text{m},\\quad q=4\\ \\text{kN/m},\\quad P=12\\ \\text{kN},\\quad H=10\\ \\text{kN}',
    },
    {
      title: 'Reakcje utwierdzenia',
      narration:
        'Wypadkowa obciążenia ciągłego wynosi 24 kN i działa w połowie belki. Równowaga pionowa daje 36 kN, pozioma — 10 kN w lewo. Moment utwierdzenia to suma momentów obciążenia, siły P i siły H względem A, czyli 184 kN·m.',
      caption: 'A_x = 10 kN w lewo, A_y = 36 kN, M_A = 184 kN·m.',
      visual: 'diagram',
      focus: { metric: 'reaction' },
      formula:
        'W=qL=24\\ \\text{kN},\\qquad A_y=W+P=36\\ \\text{kN},\\qquad M_A=24\\cdot3+12\\cdot6+10\\cdot4=184\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Belka — siła tnąca i moment',
      narration:
        'Cięcie belki od wolnego końca daje siłę normalną równą minus 10 kN, czyli ściskanie. Siła tnąca maleje liniowo od 36 kN w węźle do 12 kN w końcu C. Moment jest parabolą: minus 144 kN·m w B, minus 54 kN·m w środku i zero w C.',
      caption: 'N = −10 kN, T(x) = 36 − 4x, M_B = −144 kN·m, M_środek = −54 kN·m.',
      visual: 'diagram',
      focus: { metric: 'beam' },
      formula: 'N=-10\\ \\text{kN},\\quad T(x)=36-4x,\\quad M(x)=-\\left[2(6-x)^2+12(6-x)\\right]',
    },
    {
      title: 'Kolumna — N, T i M',
      narration:
        'W kolumnie całe obciążenie pionowe belki staje się siłą normalną 36 kN ściskania. Siła pozioma 10 kN daje siłę tnącą. Moment maleje liniowo od 184 kN·m w podstawie do 144 kN·m w węźle, a na wysokości 2 m wynosi 164 kN·m.',
      caption: 'N = −36 kN, T = 10 kN, M(y) = 184 − 10y.',
      visual: 'diagram',
      focus: { metric: 'column' },
      formula: 'N=-(qL+P)=-36\\ \\text{kN},\\quad T=H=10\\ \\text{kN},\\quad M(y)=184-10y',
    },
    {
      title: 'Kontrola węzła B',
      narration:
        'Belka wnosi do węzła moment minus 144 kN·m, a kolumna ma na górze plus 144 kN·m. Siła tnąca belki 36 kN staje się ściskaniem kolumny, a siła normalna belki 10 kN — siłą tnącą kolumny. Wszystkie trzy pary się znoszą.',
      caption: 'M_beam = −144 kN·m, M_kol = +144 kN·m; N i T również się równoważą.',
      visual: 'diagram',
      focus: { metric: 'node' },
      formula:
        'M_B^{\\text{belka}}=-144\\ \\text{kN}\\cdot\\text{m},\\qquad M_B^{\\text{kolumna}}=184-10\\cdot4=144\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Kształty i warunki brzegowe',
      narration:
        'W belce siła tnąca jest liniowa, bo obciążenie jest stałe, a moment paraboliczny. W kolumnie oba wykresy są liniowe, bo działa tam tylko stała siła tnąca. Moment w belce znika w C, a nad węzłem przyjmuje wartość 144 kN·m o przeciwnym znaku niż w kolumnie.',
      caption: 'Belka: T liniowe, M parabola od −144 do 0. Kolumna: M liniowo od 184 do 144 kN·m.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'M_C=0,\\qquad M_B^{\\text{belka}}+M_B^{\\text{kol}}=0,\\qquad \\frac{dM}{dx}=T',
    },
  ],
} satisfies SolutionData
