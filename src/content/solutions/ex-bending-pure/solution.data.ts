import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-pure',
  title: 'Czyste zginanie — przykład 1',
  duration: 7,
  given: ['L = 4 m', 'P = 12 kN', 'a = 1 m', 'b = 60 mm', 'h = 120 mm', 'E = 200 GPa'],
  result:
    'Między siłami panuje czyste zginanie: M = 12 kN·m i T = 0. Naprężenia skrajne wynoszą ± 83,3 MPa, a oś belki zakrzywia się w łuk o promieniu około 144 m. Górne włókna są ściskane, dolne rozciągane.',
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    pointLoads: [
      { at: 1, value: 12, label: 'P = 12 kN' },
      { at: 3, value: 12, label: 'P = 12 kN' },
    ],
    shear: [
      [
        [0, 12],
        [1, 12],
      ],
      [
        [1, 0],
        [3, 0],
      ],
      [
        [3, -12],
        [4, -12],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 12],
      ],
      [
        [1, 12],
        [3, 12],
      ],
      [
        [3, 12],
        [4, 0],
      ],
    ],
    markers: [
      { x: 1, y: 12, text: 'T = 12 kN', diagram: 'shear' },
      { x: 1, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 3, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 3, y: -12, text: 'T = -12 kN', diagram: 'shear' },
      { x: 2, y: 12, text: 'M = 12 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '12,0 kN', focus: 'load' },
      { label: 'R_A', value: '12,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '12,0 kN', focus: 'reaction' },
      { label: 'M', value: '12,0 kN·m', focus: 'M' },
      { label: 'T', value: '0 kN', focus: 'T' },
      { label: 'I', value: '8,64·10⁶ mm⁴', focus: 'design' },
      { label: 'W', value: '144 000 mm³', focus: 'design' },
      { label: 'σ_max', value: '83,3 MPa', focus: 'design' },
    ],
    note: 'Między siłami panuje czyste zginanie: T = 0, a moment jest stały i wynosi 12 kN·m.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Z symetrii reakcje wynoszą R_A = R_B = P = 12 kN.',
      caption: 'Z symetrii reakcje wynoszą R_A = R_B = P = 12 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = R_B = P = 12',
    },
    {
      title: 'Krok 2',
      narration:
        'Na odcinku między siłami, od x = 1 m do x = 3 m, moment jest stały: M = P a = 12 · 1 = 12 kN·m. Siła tnąca na tym odcinku jest równa zeru.',
      caption:
        'Na odcinku między siłami, od x = 1 m do x = 3 m, moment jest stały: M = P a = 12 · 1 = 12 kN·m. Siła tnąca na tym odcinku jest…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'x = 1',
    },
    {
      title: 'Krok 3',
      narration: 'Moment bezwładności przekroju: I = b h^3/12 = 60 · 120^3/12 = 8,64 · 10^6 mm⁴.',
      caption: 'Moment bezwładności przekroju: I = b h^3/12 = 60 · 120^3/12 = 8,64 · 10^6 mm⁴.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'I = b h^3/12 = 60 \\cdot 120^3/12 = 8{,}64 \\cdot 10^6',
    },
    {
      title: 'Krok 4',
      narration: 'Odległość skrajnego włókna: c = h/2 = 60 mm, więc W = I/c = 144,000 mm³.',
      caption: 'Odległość skrajnego włókna: c = h/2 = 60 mm, więc W = I/c = 144,000 mm³.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'c = h/2 = 60',
    },
    {
      title: 'Krok 5',
      narration: 'Zamień moment na N·mm: M = 12 · 10^6 N·mm. Wtedy σ_max = M/W = 12 · 10^6/144,000 = 83,3 MPa.',
      caption: 'Zamień moment na N·mm: M = 12 · 10^6 N·mm. Wtedy σ_max = M/W = 12 · 10^6/144,000 = 83,3 MPa.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'M = 12 \\cdot 10^6',
    },
    {
      title: 'Krok 6',
      narration:
        'Krzywizna: κ = M/(EI) = 12 · 10^6/(200,000 · 8,64 · 10^6) = 6,94 · 10^-6 1/mm, czyli 6,94 · 10^-3 1/m.',
      caption: 'Krzywizna: κ = M/(EI) = 12 · 10^6/(200,000 · 8,64 · 10^6) = 6,94 · 10^-6 1/mm, czyli 6,94 · 10^-3 1/m.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\kappa = M/(EI) = 12 \\cdot 10^6/(200{,}000 \\cdot 8{,}64 \\cdot 10^6) = 6{,}94 \\cdot 10^{-6}',
    },
    {
      title: 'Krok 7',
      narration:
        'Promień krzywizny: ρ = 1/κ ≈ 144 m. Odkształcenie skrajnego włókna: ε = σ/E = 83,3/200,000 = 4,17 · 10^-4.',
      caption:
        'Promień krzywizny: ρ = 1/κ ≈ 144 m. Odkształcenie skrajnego włókna: ε = σ/E = 83,3/200,000 = 4,17 · 10^-4.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\rho = 1/\\kappa \\approx 144',
    },
    {
      title: 'Krok 8',
      narration:
        'Kontrola: podwojenie siły P podwoi moment i naprężenie, ale nie zmieni położenia osi obojętnej ani znaku naprężeń.',
      caption:
        'Kontrola: podwojenie siły P podwoi moment i naprężenie, ale nie zmieni położenia osi obojętnej ani znaku naprężeń.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'P',
    },
  ],
} satisfies SolutionData
