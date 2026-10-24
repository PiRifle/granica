import type { SolutionData } from '../../model'
import { BendingMomentExample2Animation } from './animation'

export default {
  id: 'ex-bending-moment-diagram-2',
  title: 'Moment zginający M(x) — przykład 2',
  duration: 8,
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
  animation: BendingMomentExample2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta o rozpiętości L = 6 m jest obciążona równomiernie q = 6 kN/m na całej długości. Oś x biegnie od lewej podpory A do prawej podpory B.',
      caption: 'Model: obciążenie ciągłe q na całej rozpiętości L.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L = 6\\ \\text{m},\\quad q = 6\\ \\text{kN/m}',
    },
    {
      title: 'Reakcje z symetrii',
      narration:
        'Obciążenie jest symetryczne, więc reakcje są równe i wynoszą po połowie wypadkowej obciążenia: R_A = R_B = qL/2 = 18 kN.',
      caption: 'Reakcje z symetrii: R_A = R_B = qL/2 = 18 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = R_B = \\frac{qL}{2} = \\frac{6 \\cdot 6}{2} = 18\\ \\text{kN}',
    },
    {
      title: 'Siła tnąca i miejsce zerowe',
      narration:
        'Po wyznaczeniu reakcji siła tnąca maleje liniowo od R_A = 18 kN przy lewej podporze do −18 kN przy prawej. Nachylenie wykresu wynosi −q = −6 kN/m, a zero wypada w x = 3 m.',
      caption: 'T(x) = 18 − 6x zeruje się w środku rozpiętości.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(x) = 18 - 6x = 0\\quad \\Rightarrow\\quad x = 3\\ \\text{m}',
    },
    {
      title: 'Wykres M(x)',
      narration:
        'Moment jest całką siły tnącej: M(x) = R_A x − qx²/2 = 18x − 3x² kN·m. Wykres jest parabolą, która startuje w zerze, rośnie do maksimum i wraca do zera na prawej podporze.',
      caption: 'M(x) = 18x − 3x² kN·m — parabola z maksimum w środku.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(x) = R_A x - \\frac{q x^2}{2} = 18x - 3x^2\\ \\text{kN·m}',
    },
    {
      title: 'Maksimum w środku',
      narration:
        'W środku, gdzie T = 0, moment osiąga maksimum: M(3) = 54 − 27 = 27 kN·m. To zgadza się z gotowym wzorem qL²/8 = 6 · 36 / 8 = 27 kN·m.',
      caption: 'Maksimum 27 kN·m w środku rozpiętości, tam gdzie T = 0.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{\\max} = M(3) = 18 \\cdot 3 - 3 \\cdot 3^2 = 27\\ \\text{kN·m} = \\frac{qL^2}{8}',
    },
  ],
} satisfies SolutionData
