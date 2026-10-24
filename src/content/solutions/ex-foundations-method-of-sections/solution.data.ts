import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-method-of-sections',
  title: 'Metoda przekrojów: zajrzyj do środka — przykład 1',
  duration: 7,
  given: ['L = 6 m', 'P = 24 kN', 'a = 2 m', 'x₁ = 1 m', 'x₂ = 4 m'],
  result:
    'W x = 1 m: N = 0, V = +16 kN, M = +16 kN·m. W x = 4 m: N = 0, V = −8 kN, M = +16 kN·m. Znak minus przy V oznacza zwrot przeciwny do założonego; moment dodatni wygina belkę wypukłością w dół.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 24, label: 'P = 24 kN' }],
    shear: [
      [
        [0, 16],
        [2, 16],
      ],
      [
        [2, -8],
        [6, -8],
      ],
    ],
    moment: [
      [
        [0, 0],
        [2, 32],
        [6, 0],
      ],
    ],
    markers: [
      { x: 1, y: 16, text: 'T = 16 kN', diagram: 'shear' },
      { x: 2, y: -8, text: 'T = -8 kN', diagram: 'shear' },
      { x: 1, y: 16, text: 'M = 16 kN·m', diagram: 'moment' },
      { x: 2, y: 32, text: 'M = 32 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '6,0 m', focus: 'load', reveal: 0 },
      { label: 'P', value: '24,0 kN', focus: 'load', reveal: 0 },
      { label: 'a', value: '2,0 m', focus: 'load', reveal: 0 },
      { label: 'x₁', value: '1,0 m', focus: 'load', reveal: 0 },
      { label: 'x₂', value: '4,0 m', focus: 'load', reveal: 0 },
      { label: 'R_A', value: '16,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '8,0 kN', focus: 'reaction' },
      { label: 'T(x=1)', value: '16,0 kN', focus: 'T' },
      { label: 'T(x=4)', value: '-8,0 kN', focus: 'T' },
      { label: 'M(x=1)', value: '16,0 kN·m', focus: 'M' },
      { label: 'M(x=4)', value: '16,0 kN·m', focus: 'M' },
    ],
    note: 'Siła P dzieli belkę na dwa przedziały: 0 ≤ x < 2 m i 2 < x ≤ 6 m. Siła poprzeczna jest stała w każdym z nich.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość L = 6 m. Siła P = 24 kN działa w odległości a = 2 m od lewej podpory. Mamy wyznaczyć siłę podłużną, siłę poprzeczną i moment w dwóch przekrojach: x = 1 m oraz x = 4 m.',
      caption: 'Schemat belki z siłą P = 24 kN w x = 2 m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula:
        'L=6\\ \\text{m},\\quad P=24\\ \\text{kN},\\quad a=2\\ \\text{m},\\quad x_1=1\\ \\text{m},\\quad x_2=4\\ \\text{m}',
    },
    {
      title: 'Reakcje podporowe',
      narration:
        'Z równowagi momentów względem A obliczamy R_B = P · a / L = 24 · 2 / 6 = 8 kN. Następnie z równowagi pionowej R_A = P − R_B = 24 − 8 = 16 kN.',
      caption: 'R_A = 16 kN, R_B = 8 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B=\\frac{Pa}{L}=\\frac{24\\cdot2}{6}=8\\ \\text{kN},\\qquad R_A=P-R_B=24-8=16\\ \\text{kN}',
    },
    {
      title: 'Przekrój x = 1 m: siła poprzeczna',
      narration:
        'Dla x = 1 m wybieramy lewą część belki. Na cięciu działają dodatnie N w lewo, V w dół i M przeciwnie do ruchu wskazówek zegara. Równowaga pionowa daje 16 − V = 0, więc V = +16 kN.',
      caption: 'W x = 1 m siła poprzeczna wynosi +16 kN.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'x_1=1\\ \\text{m},\\qquad 16-V=0\\quad\\Rightarrow\\quad V=+16\\ \\text{kN}',
    },
    {
      title: 'Przekrój x = 1 m: moment',
      narration:
        'Moment względem cięcia: M − 16 · 1 = 0. Stąd M = +16 kN·m. Dodatni moment oznacza rozciąganie dolnych włókien belki.',
      caption: 'W x = 1 m moment wynosi +16 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'x_1=1\\ \\text{m},\\qquad M-16\\cdot1=0\\quad\\Rightarrow\\quad M=+16\\ \\text{kN·m}',
    },
    {
      title: 'Przekrój x = 4 m: siła poprzeczna',
      narration:
        'Dla x = 4 m lewa część zawiera już siłę 24 kN. Równowaga pionowa: 16 − 24 − V = 0, więc V = −8 kN. Minus oznacza, że rzeczywisty zwrot jest przeciwny do założonego.',
      caption: 'W x = 4 m siła poprzeczna wynosi −8 kN.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'x_2=4\\ \\text{m},\\qquad 16-24-V=0\\quad\\Rightarrow\\quad V=-8\\ \\text{kN}',
    },
    {
      title: 'Przekrój x = 4 m: moment',
      narration:
        'Momenty względem cięcia: M − 16 · 4 + 24 · (4 − 2) = 0. Stąd M = 64 − 48 = +16 kN·m. Moment jest taki sam jak w x = 1 m.',
      caption: 'W x = 4 m moment wynosi +16 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'x_2=4\\ \\text{m},\\qquad M-16\\cdot4+24\\cdot(4-2)=0\\quad\\Rightarrow\\quad M=+16\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola z prawej strony',
      narration:
        'Dla x = 4 m prawa część belki ma tylko reakcję R_B = 8 kN, działającą w odległości 2 m od przekroju. Moment wynosi więc M = 8 · 2 = 16 kN·m. Zgodność potwierdza wynik.',
      caption: 'Prawa strona daje ten sam moment 16 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M=R_B\\cdot(6-4)=8\\cdot2=16\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola bilansu sił',
      narration:
        'Suma reakcji 16 + 8 = 24 kN jest równa sile P. W obu przekrojach siła podłużna N = 0, bo na belkę nie działa żadne obciążenie poziome.',
      caption: 'Reakcje równoważą siłę P, a N = 0 w całej belce.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A+R_B=16+8=24=P',
    },
  ],
} satisfies SolutionData
