import type { SolutionData } from '../../model'

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
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem z wykresu T odtwarzamy obciążenie. Belka swobodnie podparta ma L = 5 m. Wykres siły tnącej jest stały i równy +12 kN od lewej podpory do x = 2 m, a następnie skacze do -8 kN i pozostaje taki do prawej podpory. Jaka siła skupiona działa na belkę i gdzie?',
      caption:
        'Tym razem z wykresu T odtwarzamy obciążenie. Belka swobodnie podparta ma L = 5 m. Wykres siły tnącej jest stały i równy +12 kN od…',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'L = 5 m',
    },
    {
      title: 'Krok 2',
      narration:
        'Skok wykresu ma wartość 12 - (-8) = 20 kN, więc siła skupiona wynosi P = 20 kN i działa w miejscu skoku, czyli w x = 2 m. Reakcje odczytujemy z poziomych odcinków: R_A = 12 kN oraz R_B = 8 kN. Kontrola momentów względem A:',
      caption:
        'Skok wykresu ma wartość 12 - (-8) = 20 kN, więc siła skupiona wynosi P = 20 kN i działa w miejscu skoku, czyli w x = 2 m. Reakcje…',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: '12 - (-8) = 20 kN',
    },
    {
      title: 'Reakcje z wykresu siły tnącej',
      narration:
        'Poziome odcinki wykresu T odpowiadają reakcjom: R_A = 12 kN na lewym końcu i R_B = 8 kN na prawym. Ich suma równa się sile P.',
      caption: 'R_A = 12 kN, R_B = 8 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=12\\ \\text{kN},\\qquad R_B=8\\ \\text{kN},\\qquad R_A+R_B=20\\ \\text{kN}',
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'R_B L = 8 · 5 = 40 kN·m, P a = 20 · 2 = 40 kN·m.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B L = 8 \\cdot 5 = 40\\ \\text{kN·m}, \\qquad P a = 20 \\cdot 2 = 40\\ \\text{kN·m}.',
    },
    {
      title: 'Krok 4',
      narration:
        'Obie strony są równe, więc odtworzone obciążenie jest poprawne. Ten wariant pokazuje, że wykres T niesie pełną informację o siłach skupionych: wartość skoku to siła, a jego położenie to miejsce przyłożenia.',
      caption:
        'Obie strony są równe, więc odtworzone obciążenie jest poprawne. Ten wariant pokazuje, że wykres T niesie pełną informację o…',
      visual: 'beam',
      focus: { metric: 'T' },
    },
  ],
} satisfies SolutionData
