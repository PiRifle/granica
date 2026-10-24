import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-stress-neutral-axis-3',
  title: 'Rozkład σ i oś obojętna — przykład 3',
  duration: 7,
  given: ['sigma_{dop} = 140 MPa', 'M = 10 kN·m'],
  result:
    'Wariant odwrotny pokazuje, że dobór przekroju nie polega na zgadywaniu. Z warunku na naprężenie wynika minimalny wskaźnik W, a z niego — wymiary. Dopiero po wybraniu konkretnego przekroju sprawdza się rzeczywiste naprężenie i ewentualnie koryguje wymiary.',
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    moments: [
      { at: 0, value: 10, label: 'M = 10 kN·m' },
      { at: 4, value: 10, label: 'M = 10 kN·m' },
    ],
    shear: [
      [
        [0, 0],
        [4, 0],
      ],
    ],
    moment: [
      [
        [0, 10],
        [4, 10],
      ],
    ],
    markers: [
      { x: 2, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2, y: 10, text: 'M = 10 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'M', value: '10,0 kN·m', focus: 'M' },
      { label: 'σ_dop', value: '140 MPa', focus: 'design' },
      { label: 'W_min', value: '71 429 mm³', focus: 'design' },
      { label: 'h_min', value: '≈ 95,0 mm', focus: 'design' },
      { label: 'b × h', value: '50 × 100 mm', focus: 'design' },
      { label: 'W', value: '83 333 mm³', focus: 'design' },
      { label: 'σ_max', value: '120 MPa', focus: 'design' },
      { label: 'I', value: '4,167·10⁶ mm⁴', focus: 'design' },
    ],
    note: 'Z warunku σ_max ≤ 140 MPa wynika W_min = 71 429 mm³; przyjęty przekrój 50 × 100 mm daje σ_max = 120 MPa.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem znamy dopuszczalne naprężenie i moment, a szukamy wymiarów przekroju. Przyjmijmy σ_dop = 140 MPa i M = 10 kN·m. Wymagany wskaźnik wytrzymałości wynosi',
      caption:
        'Tym razem znamy dopuszczalne naprężenie i moment, a szukamy wymiarów przekroju. Przyjmijmy σ_dop = 140 MPa i M = 10 kN·m.…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\sigma_{\\mathrm{dop}} = 140 MPa',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'W_min = (M)/(σ_dop) = (10 · 10^6)/(140) = 71,429 mm^3.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'W_{\\min} = \\frac{M}{\\sigma_{dop}} = \\frac{10 \\cdot 10^6}{140} = 71{,}429\\ \\text{mm}^3.',
    },
    {
      title: 'Krok 3',
      narration:
        'Wybierzmy prostokąt o stosunku b = h/2, czyli dwukrotnie wyższy niż szeroki. Wtedy W = b h^2/6 = h^3/12, więc',
      caption:
        'Wybierzmy prostokąt o stosunku b = h/2, czyli dwukrotnie wyższy niż szeroki. Wtedy W = b h^2/6 = h^3/12, więc',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'b = h/2',
    },
    {
      title: 'Krok 4',
      narration: 'Zapis matematyczny.',
      caption: 'h ≥ ∛(12 W_min) = ∛(857,143) ≈ 95,0 mm.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'h \\ge \\sqrt[3]{12 W_{\\min}} = \\sqrt[3]{857{,}143} \\approx 95{,}0\\ \\text{mm}.',
    },
    {
      title: 'Krok 5',
      narration:
        'Przyjmujemy h = 100 mm i b = 50 mm. Wtedy W = 50 · 100^2/6 = 83,333 mm³, a naprężenie wynosi σ_max = 10 · 10^6/83,333 = 120 MPa, czyli mieści się w granicy 140 MPa. Moment bezwładności I = 50 · 100^3/12 = 4,167 · 10^6 mm⁴.',
      caption:
        'Przyjmujemy h = 100 mm i b = 50 mm. Wtedy W = 50 · 100^2/6 = 83,333 mm³, a naprężenie wynosi σ_max = 10 · 10^6/83,333 = 120 MPa,…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'h = 100 mm',
    },
    {
      title: 'Krok 6',
      narration:
        'Wariant odwrotny pokazuje, że dobór przekroju nie polega na zgadywaniu. Z warunku na naprężenie wynika minimalny wskaźnik W, a z niego — wymiary. Dopiero po wybraniu konkretnego przekroju sprawdza się rzeczywiste naprężenie i ewentualnie koryguje wymiary.',
      caption:
        'Wariant odwrotny pokazuje, że dobór przekroju nie polega na zgadywaniu. Z warunku na naprężenie wynika minimalny wskaźnik W, a z…',
      visual: 'beam',
      focus: { metric: 'design' },
    },
  ],
} satisfies SolutionData
