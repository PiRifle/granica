import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-q-t-m-2',
  title: 'Zależności q–T–M — przykład 2',
  duration: 7,
  given: ['L = 6 m', 'q = 3 kN/m', 'P = 12 kN'],
  result:
    'Wykres momentu jest paraboliczny na obu odcinkach, ale w środku ma charakterystyczne załamanie stycznej, ponieważ siła tnąca zmienia się skokowo. To przykład, w którym załamanie wykresu M nie oznacza błędu: pochodna M jest nieciągła, bo T jest nieciągła.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    distributed: [{ from: 0, to: 6, start: 3, end: 3, label: 'q = 3 kN/m' }],
    pointLoads: [{ at: 3, value: 12, label: 'P = 12 kN' }],
    shear: [
      [
        [0, 15],
        [3, 6],
      ],
      [
        [3, -6],
        [6, -15],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 13.5],
        [2, 24],
        [3, 31.5],
        [4, 28],
        [5, 16.5],
        [6, 0],
      ],
    ],
    markers: [
      { x: 3, y: 6, text: 'T = +6 kN', diagram: 'shear' },
      { x: 3, y: -6, text: 'T = -6 kN', diagram: 'shear' },
      { x: 3, y: 31.5, text: 'M = 31,5 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'q', value: '3,0 kN/m', focus: 'load' },
      { label: 'P', value: '12,0 kN', focus: 'load' },
      { label: 'R_A', value: '15,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '15,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '31,5 kN·m', focus: 'M' },
    ],
    note: 'Pod siłą T skacze z +6 kN do -6 kN, a moment osiąga maksimum 31,5 kN·m.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy belkę swobodnie podpartą o L = 6 m, obciążoną równomiernie q = 3 kN/m oraz siłą skupioną P = 12 kN w połowie rozpiętości. Obciążenie jest symetryczne, więc reakcje są równe: R_A = R_B = (qL + P)/2 = (18 + 12)/2 = 15 kN.',
      caption:
        'Rozważmy belkę swobodnie podpartą o L = 6 m, obciążoną równomiernie q = 3 kN/m oraz siłą skupioną P = 12 kN w połowie…',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'L = 6 m',
    },
    {
      title: 'Krok 2',
      narration: 'Na lewym odcinku, od x = 0 do x = 3 m, siła tnąca wynosi',
      caption: 'Na lewym odcinku, od x = 0 do x = 3 m, siła tnąca wynosi',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'x = 0',
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'T(x) = 15 - 3x kN.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(x) = 15 - 3x\\ \\text{kN}.',
    },
    {
      title: 'Krok 4',
      narration:
        'Tuż przed siłą T(3) = 15 - 9 = +6 kN. Pod siłą następuje skok w dół o 12 kN, więc tuż za nią T = -6 kN. Na prawym odcinku T(x) = 3 - 3x kN, co daje -6 kN przy x = 3 i -15 kN przy x = 6. Reakcja R_B domyka wykres do zera.',
      caption:
        'Tuż przed siłą T(3) = 15 - 9 = +6 kN. Pod siłą następuje skok w dół o 12 kN, więc tuż za nią T = -6 kN. Na prawym odcinku T(x) =…',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T(3) = 15 - 9 = +6 kN',
    },
    {
      title: 'Krok 5',
      narration:
        'Siła tnąca nie przechodzi przez zero w sposób ciągły, ale pod siłą przeskakuje z wartości dodatniej na ujemną. To wystarcza, żeby moment osiągnął maksimum właśnie tam. Moment w środku obliczamy z lewej części:',
      caption:
        'Siła tnąca nie przechodzi przez zero w sposób ciągły, ale pod siłą przeskakuje z wartości dodatniej na ujemną. To wystarcza, żeby…',
      visual: 'beam',
      focus: { metric: 'M' },
    },
    {
      title: 'Krok 6',
      narration: 'Zapis matematyczny.',
      caption: 'M(3) = 15 · 3 - (3 · 3^2)/(2) = 45 - 13,5 = 31,5 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M(3) = 15 \\cdot 3 - \\frac{3 \\cdot 3^2}{2} = 45 - 13{,}5 = 31{,}5\\ \\text{kN·m}.',
    },
    {
      title: 'Krok 7',
      narration:
        'Wykres momentu jest paraboliczny na obu odcinkach, ale w środku ma charakterystyczne załamanie stycznej, ponieważ siła tnąca zmienia się skokowo. To przykład, w którym załamanie wykresu M nie oznacza błędu: pochodna M jest nieciągła, bo T jest nieciągła.',
      caption:
        'Wykres momentu jest paraboliczny na obu odcinkach, ale w środku ma charakterystyczne załamanie stycznej, ponieważ siła tnąca…',
      visual: 'beam',
      focus: { metric: 'M' },
    },
  ],
} satisfies SolutionData
