import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-moment-diagram-2',
  title: 'Moment zginający M(x) — przykład 2',
  duration: 7,
  given: ['L = 6 m', 'q = 6 kN/m'],
  result:
    'Ten wynik zgadza się ze wzorem qL^2/8 = 6 · 36 / 8 = 27 kN·m. Warto zapamiętać ten przypadek jako punkt odniesienia: dla równomiernego obciążenia na całej rozpiętości maksimum momentu występuje w połowie i wynosi qL^2/8. Nachylenie wykresu M jest równe T = 18 - 6x, więc w środku, gdzie T = 0, styczna do wykresu jest pozioma.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    distributed: [{ from: 0, to: 6, start: 6, end: 6, label: 'q = 6 kN/m' }],
    shear: [
      [
        [0, 18],
        [3, 0],
        [6, -18],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 15],
        [2, 24],
        [3, 27],
        [4, 24],
        [5, 15],
        [6, 0],
      ],
    ],
    markers: [
      { x: 3, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 3, y: 27, text: 'M = 27 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'q', value: '6,0 kN/m', focus: 'load' },
      { label: 'R_A', value: '18,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '18,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '27,0 kN·m', focus: 'M' },
    ],
    note: 'Siła tnąca zeruje się w środku rozpiętości, gdzie moment osiąga maksimum qL²/8 = 27 kN·m.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Belka swobodnie podparta o rozpiętości L = 6 m jest obciążona równomiernie q = 6 kN/m na całej długości. Reakcje z symetrii wynoszą R_A = R_B = qL/2 = 18 kN. Moment w przekroju x liczony od lewej podpory ma postać',
      caption:
        'Belka swobodnie podparta o rozpiętości L = 6 m jest obciążona równomiernie q = 6 kN/m na całej długości. Reakcje z symetrii…',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'L = 6 m',
    },
    {
      title: 'Siła tnąca T(x)',
      narration:
        'Po wyznaczeniu reakcji siła tnąca maleje liniowo od R_A = 18 kN przy lewej podporze do -18 kN przy prawej. Nachylenie wykresu wynosi -q = -6 kN/m.',
      caption: 'T(x) = 18 - 6x kN.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(x)=R_A-qx=18-6x\\ \\text{kN}',
    },
    {
      title: 'Miejsce zerowe siły tnącej',
      narration:
        'Siła tnąca zeruje się w x = 3 m. Właśnie tam moment zginający osiąga ekstremum, a styczna do wykresu M jest pozioma.',
      caption: 'T = 0 w środku rozpiętości.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: '18-6x=0\\quad\\Rightarrow\\quad x=3\\ \\text{m}',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'M(x) = R_A x - (q x^2)/(2) = 18x - 3x^2 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(x) = R_A x - \\frac{q x^2}{2} = 18x - 3x^2\\ \\text{kN·m}.',
    },
    {
      title: 'Krok 3',
      narration:
        'Sprawdźmy wartości na granicach. Na lewej podporze M(0) = 0. W środku rozpiętości M(3) = 54 - 27 = 27 kN·m. Na prawej podporze M(6) = 108 - 108 = 0. Moment jest dodatni na całej długości, a jego maksimum wynosi 27 kN·m.',
      caption:
        'Sprawdźmy wartości na granicach. Na lewej podporze M(0) = 0. W środku rozpiętości M(3) = 54 - 27 = 27 kN·m. Na prawej podporze…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(0) = 0',
    },
    {
      title: 'Krok 4',
      narration:
        'Ten wynik zgadza się ze wzorem qL^2/8 = 6 · 36 / 8 = 27 kN·m. Warto zapamiętać ten przypadek jako punkt odniesienia: dla równomiernego obciążenia na całej rozpiętości maksimum momentu występuje w połowie i wynosi qL^2/8. Nachylenie wykresu M jest równe T = 18 - 6x, więc w środku, gdzie T = 0, styczna do wykresu jest pozioma.',
      caption:
        'Ten wynik zgadza się ze wzorem qL^2/8 = 6 · 36 / 8 = 27 kN·m. Warto zapamiętać ten przypadek jako punkt odniesienia: dla…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'qL^{2}/8 = 6 \\cdot 36 / 8 = 27 kN\\cdot m',
    },
  ],
} satisfies SolutionData
