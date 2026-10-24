import type { SolutionData } from '../../model'
import { BendingShearForceExample3Animation } from './animation'

export default {
  id: 'ex-bending-shear-force-3',
  title: 'Siła tnąca T(x) — przykład 3',
  duration: 7,
  given: ['L = 5 m', 'x = 2 m'],
  result:
    'Obie strony są równe, więc odtworzone obciążenie jest poprawne. Ten wariant pokazuje, że wykres T niesie pełną informację o siłach skupionych: wartość skoku to siła, a jego położenie to miejsce przyłożenia.',
  figure: {
    kind: 'beam',
    length: 5,
    supports: [
      { at: 0, label: 'A' },
      { at: 5, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 20, label: 'P = 20 kN' }],
    shear: [
      [
        [0, 12],
        [2, 12],
      ],
      [
        [2, -8],
        [5, -8],
      ],
    ],
    moment: [
      [
        [0, 0],
        [2, 24],
      ],
      [
        [2, 24],
        [5, 0],
      ],
    ],
    markers: [
      { x: 2, y: 12, text: 'T = 12 kN', diagram: 'shear' },
      { x: 2, y: -8, text: 'T = -8 kN', diagram: 'shear' },
      { x: 2, y: 24, text: 'M = 24 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '20,0 kN', focus: 'load' },
      { label: 'R_A', value: '12,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '8,0 kN', focus: 'reaction' },
      { label: 'T lewa', value: '12,0 kN', focus: 'T' },
      { label: 'T prawa', value: '-8,0 kN', focus: 'T' },
      { label: 'M_max', value: '24,0 kN·m', focus: 'M' },
    ],
    note: 'Skok wykresu T ma wartość 12 - (-8) = 20 kN i wyznacza siłę P działającą w x = 2 m.',
  },
  animation: BendingShearForceExample3Animation,
  scenes: [
    {
      title: 'Dany wykres T',
      narration:
        'Tym razem z wykresu T odtwarzamy obciążenie. Belka swobodnie podparta ma L = 5 m. Wykres siły tnącej jest stały i równy +12 kN od lewej podpory do x = 2 m, a następnie skacze do −8 kN i pozostaje taki do prawej podpory. Jaka siła skupiona działa na belkę i gdzie?',
      caption: 'Dany wykres: +12 kN, skok w x = 2 m, potem −8 kN do podpory B.',
      visual: 'beam',
      focus: { metric: 'given' },
      formula: 'T=+12\\ \\text{kN}\\ (0<x<2\\ \\text{m}),\\qquad T=-8\\ \\text{kN}\\ (2<x<5\\ \\text{m})',
    },
    {
      title: 'Skok wskazuje siłę P',
      narration:
        'Skok wykresu ma wartość 12 − (−8) = 20 kN, więc siła skupiona wynosi P = 20 kN i działa w miejscu skoku, czyli w x = 2 m. Kierunek skoku w dół odpowiada sile działającej w dół.',
      caption: 'Skok 20 kN w x = 2 m odtwarza siłę P = 20 kN.',
      visual: 'beam',
      focus: { metric: 'jump' },
      formula: 'P=12-(-8)=20\\ \\text{kN},\\qquad x=2\\ \\text{m}',
    },
    {
      title: 'Reakcje z poziomych odcinków',
      narration:
        'Poziome odcinki wykresu T odpowiadają reakcjom: R_A = 12 kN na lewym końcu i R_B = 8 kN na prawym. Ich suma równa się sile P, więc wykres jest spójny z równowagą całej belki.',
      caption: 'R_A = 12 kN, R_B = 8 kN; R_A + R_B = 20 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=12\\ \\text{kN},\\qquad R_B=8\\ \\text{kN},\\qquad R_A+R_B=20\\ \\text{kN}',
    },
    {
      title: 'Kontrola momentów',
      narration:
        'Kontrola względem A: R_B · L = 8 · 5 = 40 kN·m oraz P · a = 20 · 2 = 40 kN·m. Obie strony są równe, więc odtworzone obciążenie jest poprawne. Na schemacie widać przeciwne zwroty momentów od P i od R_B.',
      caption: 'Momenty względem A: 40 kN·m = 40 kN·m.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula: 'R_B L=8\\cdot5=40\\ \\text{kN·m},\\qquad P a=20\\cdot2=40\\ \\text{kN·m}',
    },
    {
      title: 'Przekrój krytyczny',
      narration:
        'Wykres T niesie pełną informację o siłach skupionych: wartość skoku to siła, a jego położenie to miejsce przyłożenia. Największa bezwzględna wartość T występuje przed siłą, a przekrój krytyczny wypada w x = 2 m.',
      caption: 'Przekrój krytyczny w x = 2 m: skok 20 kN i |T|max = 12 kN.',
      visual: 'beam',
      focus: { metric: 'critical' },
      formula: '|T|_{\\max}=12\\ \\text{kN}\\quad\\text{w przekroju }x=2\\ \\text{m}',
    },
  ],
} satisfies SolutionData
