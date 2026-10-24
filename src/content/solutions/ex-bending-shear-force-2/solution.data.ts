import type { SolutionData } from '../../model'
import { BendingShearForceExample2Animation } from './animation'

export default {
  id: 'ex-bending-shear-force-2',
  title: 'Siła tnąca T(x) — przykład 2',
  duration: 7,
  given: ['L = 5 m', 'q = 4 kN/m'],
  result:
    'Miejsce, w którym T = 0, jest ważne. Oznacza ono, że na lewo od tego punktu wypadkowa sił pionowych równoważy się z reakcją, a na prawo przeważa obciążenie. W następnej lekcji zobaczysz, że właśnie tam moment zginający osiąga ekstremum.',
  figure: {
    kind: 'beam',
    length: 5,
    supports: [
      { at: 0, label: 'A' },
      { at: 5, label: 'B' },
    ],
    distributed: [{ from: 0, to: 5, start: 4, end: 4, label: 'q = 4 kN/m' }],
    shear: [
      [
        [0, 10],
        [2.5, 0],
        [5, -10],
      ],
    ],
    moment: [
      [
        [0, 0],
        [0.5, 4.5],
        [1, 8],
        [1.5, 10.5],
        [2, 12],
        [2.5, 12.5],
        [3, 12],
        [3.5, 10.5],
        [4, 8],
        [4.5, 4.5],
        [5, 0],
      ],
    ],
    markers: [
      { x: 2.5, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2.5, y: 12.5, text: 'M = 12,5 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'q', value: '4,0 kN/m', focus: 'load' },
      { label: 'R_A', value: '10,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '10,0 kN', focus: 'reaction' },
      { label: 'T(0)', value: '10,0 kN', focus: 'T' },
      { label: 'T(2,5)', value: '0 kN', focus: 'T' },
      { label: 'T(5)', value: '-10,0 kN', focus: 'T' },
      { label: 'M_max', value: '12,5 kN·m', focus: 'M' },
    ],
    note: 'Nachylenie wykresu T wynosi -q = -4 kN/m, a zero wypada w połowie rozpiętości.',
  },
  animation: BendingShearForceExample2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma rozpiętość L = 5 m i jest obciążona równomiernie na całej długości q = 4 kN/m. Tym razem siła tnąca nie będzie stała: obciążenie ciągłe zmienia ją w sposób ciągły na całej rozpiętości.',
      caption: 'Schemat belki: równomierne q = 4 kN/m na całej rozpiętości.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula: 'L=5\\ \\text{m},\\qquad q=4\\ \\text{kN/m}',
    },
    {
      title: 'Reakcje z symetrii',
      narration:
        'Obciążenie i geometria są symetryczne, więc reakcje dzielą wypadkową qL = 20 kN po połowie. Z symetrii reakcje wynoszą R_A = R_B = qL/2 = 10 kN.',
      caption: 'R_A = R_B = 10 kN; suma reakcji równoważy qL = 20 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=R_B=\\frac{qL}{2}=\\frac{4\\cdot5}{2}=10\\ \\text{kN}',
    },
    {
      title: 'T(x) maleje liniowo',
      narration:
        'Po przecięciu w x i odrzuceniu prawej części równowaga pionowa daje T(x) = R_A − qx = 10 − 4x kN. Nachylenie wykresu wynosi −q = −4 kN/m, więc linia opada liniowo od +10 kN.',
      caption: 'T(x) = 10 − 4x kN; nachylenie −4 kN/m.',
      visual: 'beam',
      focus: { metric: 'T-left' },
      formula: 'T(x)=R_A-qx=10-4x\\ \\text{kN}\\quad\\text{dla }0\\le x\\le2{,}5\\ \\text{m}',
    },
    {
      title: 'Miejsce zerowe T = 0',
      narration:
        'W połowie rozpiętości T = 0. To chwilowa równowaga: wypadkowa obciążenia po lewej stronie przekroju równa się reakcji R_A. W następnej lekcji zobaczysz, że właśnie tam moment zginający osiąga ekstremum.',
      caption: 'T = 0 w x = 2,5 m; znak siły tnącej zmienia się.',
      visual: 'beam',
      focus: { metric: 'T-zero' },
      formula: '10-4x=0\\quad\\Rightarrow\\quad x=2{,}5\\ \\text{m}',
    },
    {
      title: 'Prawy koniec i domknięcie',
      narration:
        'Na prawym końcu T(5) = 10 − 4 · 5 = −10 kN. Reakcja R_B = 10 kN w górę domyka wykres do zera, a suma zmian od lewej do prawej wynosi zero.',
      caption: 'T(5) = −10 kN; reakcja R_B domyka wykres.',
      visual: 'beam',
      focus: { metric: 'T-close' },
      formula: 'T(5)=10-4\\cdot5=-10\\ \\text{kN},\\qquad -10+R_B=0',
    },
    {
      title: 'Przekrój krytyczny',
      narration:
        'Przekrój x = 2,5 m jest szczególny: T zmienia tam znak, a moment zginający osiąga ekstremum. Dla samego ścinania największe |T| występuje przy podporach, ale zero wykresu jest kluczowe dla dalszej analizy.',
      caption: 'Przekrój krytyczny w x = 2,5 m: T = 0 i zmiana znaku.',
      visual: 'beam',
      focus: { metric: 'critical' },
      formula: 'T(2{,}5)=0,\\qquad \\left.\\frac{dM}{dx}\\right|_{x=2{,}5}=0',
    },
  ],
} satisfies SolutionData
