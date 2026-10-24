import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-bending-shear-force',
  title: 'Siła tnąca T(x) — przykład 1',
  duration: 7,
  given: ['L = 6 m', 'P = 18 kN', 'a = 2 m'],
  result:
    'T = +12 kN na lewym odcinku i T = -6 kN na prawym. Pod siłą występuje skok 18 kN, a wykres zamyka się w podporze B.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 18, label: 'P = 18 kN' }],
    shear: [
      [
        [0, 12],
        [2, 12],
      ],
      [
        [2, -6],
        [6, -6],
      ],
    ],
    moment: [
      [
        [0, 0],
        [2, 24],
      ],
      [
        [2, 24],
        [6, 0],
      ],
    ],
    markers: [
      { x: 2, y: 12, text: 'T = 12 kN', diagram: 'shear' },
      { x: 2, y: -6, text: 'T = -6 kN', diagram: 'shear' },
      { x: 2, y: 24, text: 'M = 24 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '18,0 kN', focus: 'load' },
      { label: 'R_A', value: '12,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '6,0 kN', focus: 'reaction' },
      { label: 'T lewa', value: '12,0 kN', focus: 'T' },
      { label: 'T prawa', value: '-6,0 kN', focus: 'T' },
      { label: 'M_max', value: '24,0 kN·m', focus: 'M' },
    ],
    note: 'Pod siłą wykres T skacze w dół o 18 kN, a reakcja R_B domyka go do zera.',
  },
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.BendingShearForceExample1Animation })),
  ),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma rozpiętość L = 6 m. Siła P = 18 kN działa w dół w odległości a = 2 m od lewej podpory A. Obciążenie ciągłe jest pomijalne, więc wykres T będzie się składał z dwóch poziomych odcinków.',
      caption: 'Schemat belki: P = 18 kN w x = 2 m, rozpiętość L = 6 m.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula: 'L=6\\ \\text{m},\\qquad P=18\\ \\text{kN},\\qquad a=2\\ \\text{m}',
    },
    {
      title: 'Reakcje podporowe',
      narration:
        'Z sumy momentów względem A: R_B · 6 = 18 · 2, więc R_B = 6 kN. Z sumy sił pionowych: R_A = 18 − 6 = 12 kN. Reakcje są pierwszymi wartościami, od których zacznie się wykres T.',
      caption: 'R_A = 12 kN, R_B = 6 kN; reakcje równoważą siłę P.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B=\\frac{P a}{L}=\\frac{18\\cdot2}{6}=6\\ \\text{kN},\\qquad R_A=P-R_B=12\\ \\text{kN}',
    },
    {
      title: 'T(x) na lewym odcinku',
      narration:
        'Przecinamy belkę w odległości x od lewej podpory i odrzucamy prawą część. Na odcinku od x = 0 do x = 2 m nie ma obciążenia ciągłego, więc dT/dx = 0. Siła tnąca jest stała i startuje od reakcji R_A = +12 kN.',
      caption: 'Lewy odcinek: pozioma linia T = +12 kN.',
      visual: 'beam',
      focus: { metric: 'T-left' },
      formula: 'T(x)=R_A=+12\\ \\text{kN}\\quad\\text{dla }0<x<2\\ \\text{m}',
    },
    {
      title: 'Skok pod siłą P',
      narration:
        'Pod siłą wykres skacze w dół o wartość P: 12 − 18 = −6 kN. Skok jest pionowy, bo siła skupiona zmienia sumę sił po lewej stronie cięcia w jednym przekroju.',
      caption: 'Skok o 18 kN w dół w miejscu przyłożenia siły.',
      visual: 'beam',
      focus: { metric: 'T-jump' },
      formula: 'T(2^{+})=12-18=-6\\ \\text{kN}',
    },
    {
      title: 'Prawy odcinek i zamknięcie',
      narration:
        'Na odcinku od x = 2 m do x = 6 m siła tnąca pozostaje równa −6 kN. Przy prawej podporze reakcja R_B = 6 kN w górę domyka wykres do zera. Kontrola: całkowita zmiana T wynosi +12 − 18 + 6 = 0.',
      caption: 'Prawy odcinek: T = −6 kN; reakcja R_B domyka wykres.',
      visual: 'beam',
      focus: { metric: 'T-right' },
      formula: 'T(x)=-6\\ \\text{kN}\\quad\\text{dla }2<x<6\\ \\text{m},\\qquad -6+R_B=0',
    },
    {
      title: 'Przekrój krytyczny',
      narration:
        'Największa bezwzględna wartość siły tnącej występuje tuż przed siłą P i wynosi 12 kN. W przekroju x = 2 m wykres zmienia znak, więc właśnie tam leży przekrój krytyczny dla ścinania.',
      caption: 'Przekrój krytyczny w x = 2 m: |T|max = 12 kN.',
      visual: 'beam',
      focus: { metric: 'critical' },
      formula: '|T|_{\\max}=12\\ \\text{kN}\\quad\\text{w przekroju }x=2\\ \\text{m}',
    },
  ],
} satisfies SolutionData
