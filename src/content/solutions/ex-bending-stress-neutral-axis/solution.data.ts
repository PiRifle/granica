import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-stress-neutral-axis',
  title: 'Rozkład σ i oś obojętna — przykład 1',
  duration: 7,
  given: ['b = 80 mm', 'h = 160 mm', 'M = 8 kN·m', 'E = 200 GPa'],
  result:
    'Naprężenia skrajne mają wartość bezwzględną 23,4 MPa: ściskanie u góry i rozciąganie u dołu. Na osi obojętnej naprężenie wynosi zero, a w połowie wysokości jest dwa razy mniejsze.',
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    moments: [
      { at: 0, value: 8, label: 'M = 8 kN·m' },
      { at: 4, value: 8, label: 'M = 8 kN·m' },
    ],
    shear: [
      [
        [0, 0],
        [4, 0],
      ],
    ],
    moment: [
      [
        [0, 8],
        [4, 8],
      ],
    ],
    markers: [
      { x: 2, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2, y: 8, text: 'M = 8 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'b × h', value: '80 × 160 mm', focus: 'design' },
      { label: 'M', value: '8,0 kN·m', focus: 'M' },
      { label: 'I_z', value: '27,31·10⁶ mm⁴', focus: 'design' },
      { label: 'W_z', value: '341 333 mm³', focus: 'design' },
      { label: 'σ_max', value: '23,44 MPa', focus: 'design' },
      { label: 'σ(y=40 mm)', value: '11,72 MPa', focus: 'design' },
      { label: 'ρ', value: '683 m', focus: 'design' },
      { label: 'ε', value: '1,17·10⁻⁴', focus: 'design' },
    ],
    note: 'Czyste zginanie momentem M = 8 kN·m; długość belki nie zmienia rozkładu naprężeń.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Moment bezwładności: I_z = b h^3/12 = 80 · 160^3/12 = 27,31 · 10^6 mm⁴.',
      caption: 'Moment bezwładności: I_z = b h^3/12 = 80 · 160^3/12 = 27,31 · 10^6 mm⁴.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'I_z = b h^3/12 = 80 \\cdot 160^3/12 = 27{,}31 \\cdot 10^6',
    },
    {
      title: 'Krok 2',
      narration: 'Skrajne włókno: c = h/2 = 80 mm, więc W_z = I_z/c = 341,333 mm³.',
      caption: 'Skrajne włókno: c = h/2 = 80 mm, więc W_z = I_z/c = 341,333 mm³.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'c = h/2 = 80',
    },
    {
      title: 'Krok 3',
      narration: 'Moment w N·mm: M = 8 · 10^6 N·mm.',
      caption: 'Moment w N·mm: M = 8 · 10^6 N·mm.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M = 8 \\cdot 10^6',
    },
    {
      title: 'Krok 4',
      narration: 'Naprężenie maksymalne: σ_max = 8 · 10^6/341,333 = 23,44 MPa.',
      caption: 'Naprężenie maksymalne: σ_max = 8 · 10^6/341,333 = 23,44 MPa.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\sigma_{\\max} = 8 \\cdot 10^6/341{,}333 = 23{,}44',
    },
    {
      title: 'Krok 5',
      narration: 'Naprężenie w połowie drogi do osi, przy y = 40 mm: σ = 8 · 10^6 · 40/27,31 · 10^6 = 11,72 MPa.',
      caption: 'Naprężenie w połowie drogi do osi, przy y = 40 mm: σ = 8 · 10^6 · 40/27,31 · 10^6 = 11,72 MPa.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'y = 40',
    },
    {
      title: 'Krok 6',
      narration: 'Krzywizna: κ = 8 · 10^6/(200,000 · 27,31 · 10^6) = 1,465 · 10^-6 1/mm, czyli ρ ≈ 683 m.',
      caption: 'Krzywizna: κ = 8 · 10^6/(200,000 · 27,31 · 10^6) = 1,465 · 10^-6 1/mm, czyli ρ ≈ 683 m.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\kappa = 8 \\cdot 10^6/(200{,}000 \\cdot 27{,}31 \\cdot 10^6) = 1{,}465 \\cdot 10^{-6}',
    },
    {
      title: 'Krok 7',
      narration: 'Odkształcenie skrajne: ε = σ/E = 23,44/200,000 = 1,17 · 10^-4.',
      caption: 'Odkształcenie skrajne: ε = σ/E = 23,44/200,000 = 1,17 · 10^-4.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\varepsilon = \\sigma/E = 23{,}44/200{,}000 = 1{,}17 \\cdot 10^{-4}',
    },
  ],
} satisfies SolutionData
