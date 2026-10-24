import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-section-stiffness-design',
  title: 'Dobór przekroju i kontrola sztywności — przykład 1',
  duration: 7,
  given: ['L = 4 m', 'P = 10 kN', 'E = 210 GPa', 'sigma_{dop} = 160 MPa', 'b = 50 mm', 'h = 100 mm'],
  result:
    'Przekrój 50 × 100 mm spełnia oba warunki: σ_max = 120 MPa oraz f_max = 15,24 mm. Zapas sztywności jest niewielki, więc każdy wzrost obciążenia lub rozpiętości wymaga ponownego sprawdzenia ugięcia.',
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 10, label: 'P = 10 kN' }],
    shear: [
      [
        [0, 5],
        [2, 5],
      ],
      [
        [2, -5],
        [4, -5],
      ],
    ],
    moment: [
      [
        [0, 0],
        [2, 10],
      ],
      [
        [2, 10],
        [4, 0],
      ],
    ],
    markers: [
      { x: 2, y: 5, text: 'T = 5 kN', diagram: 'shear' },
      { x: 2, y: -5, text: 'T = -5 kN', diagram: 'shear' },
      { x: 2, y: 10, text: 'M = 10 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '10,0 kN', focus: 'load' },
      { label: 'R_A', value: '5,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '5,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '10,0 kN·m', focus: 'M' },
      { label: 'W_min', value: '62 500 mm³', focus: 'design' },
      { label: 'I_min', value: '3,968·10⁶ mm⁴', focus: 'design' },
      { label: 'W', value: '83 333 mm³', focus: 'design' },
      { label: 'I', value: '4,167·10⁶ mm⁴', focus: 'design' },
      { label: 'σ_max', value: '120 MPa', focus: 'design' },
      { label: 'f_max', value: '15,24 mm', focus: 'design' },
      { label: 'T', value: '5,0 kN', focus: 'T' },
    ],
    note: 'Przekrój 50 × 100 mm spełnia warunek naprężeń i ugięcia; siła tnąca wynosi T = 5 kN.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Maksymalny moment: M_max = P L/4 = 10 · 4/4 = 10 kN·m = 10 · 10^6 N·mm.',
      caption: 'Maksymalny moment: M_max = P L/4 = 10 · 4/4 = 10 kN·m = 10 · 10^6 N·mm.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{\\max} = P L/4 = 10 \\cdot 4/4 = 10',
    },
    {
      title: 'Krok 2',
      narration: 'Wymagany wskaźnik: W_min = 10 · 10^6/160 = 62,500 mm³.',
      caption: 'Wymagany wskaźnik: W_min = 10 · 10^6/160 = 62,500 mm³.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'W_{\\min} = 10 \\cdot 10^6/160 = 62{,}500',
    },
    {
      title: 'Krok 3',
      narration: 'Wymagany moment bezwładności: I_min = 10,000 · 4000^3/(48 · 210,000 · 16) = 3,968 · 10^6 mm⁴.',
      caption: 'Wymagany moment bezwładności: I_min = 10,000 · 4000^3/(48 · 210,000 · 16) = 3,968 · 10^6 mm⁴.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'I_{\\min} = 10{,}000 \\cdot 4000^3/(48 \\cdot 210{,}000 \\cdot 16) = 3{,}968 \\cdot 10^6',
    },
    {
      title: 'Krok 4',
      narration: 'Dla przekroju 50 × 100: W = 50 · 100^2/6 = 83,333 mm³, czyli W ≥ W_min.',
      caption: 'Dla przekroju 50 × 100: W = 50 · 100^2/6 = 83,333 mm³, czyli W ≥ W_min.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '50 \\times 100',
    },
    {
      title: 'Krok 5',
      narration: 'I = 50 · 100^3/12 = 4,167 · 10^6 mm⁴, czyli I ≥ I_min.',
      caption: 'I = 50 · 100^3/12 = 4,167 · 10^6 mm⁴, czyli I ≥ I_min.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'I = 50 \\cdot 100^3/12 = 4{,}167 \\cdot 10^6',
    },
    {
      title: 'Krok 6',
      narration: 'Kontrola naprężenia: σ_max = 10 · 10^6/83,333 = 120 MPa ≤ 160 MPa.',
      caption: 'Kontrola naprężenia: σ_max = 10 · 10^6/83,333 = 120 MPa ≤ 160 MPa.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\sigma_{\\max} = 10 \\cdot 10^6/83{,}333 = 120',
    },
    {
      title: 'Krok 7',
      narration: 'Kontrola ugięcia: f = 10,000 · 4000^3/(48 · 210,000 · 4,167 · 10^6) = 15,24 mm ≤ 16 mm.',
      caption: 'Kontrola ugięcia: f = 10,000 · 4000^3/(48 · 210,000 · 4,167 · 10^6) = 15,24 mm ≤ 16 mm.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'f = 10{,}000 \\cdot 4000^3/(48 \\cdot 210{,}000 \\cdot 4{,}167 \\cdot 10^6) = 15{,}24',
    },
    {
      title: 'Krok 8',
      narration:
        'Siła tnąca T = P/2 = 5 kN, więc τ_max = 1,5 T/A = 1,5 · 5000/5000 = 1,5 MPa. Naprężenia styczne są pomijalne.',
      caption:
        'Siła tnąca T = P/2 = 5 kN, więc τ_max = 1,5 T/A = 1,5 · 5000/5000 = 1,5 MPa. Naprężenia styczne są pomijalne.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T = P/2 = 5',
    },
  ],
} satisfies SolutionData
