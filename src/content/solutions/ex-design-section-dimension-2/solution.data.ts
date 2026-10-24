import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-section-dimension-2',
  title: 'Dobór wymiaru z warunku wytrzymałości — przykład 2',
  duration: 7,
  given: ['h=2b', 'L=2 m', 'P=12 kN', 'k=160 MPa'],
  result:
    'Warto porównać przekrój prostokątny z kołem o tym samym W. Dla koła W=42 667 daje d^3=32W/π≈ 434 500, czyli d≈ 75,7 mm. Pole koła wynosi około 4500 mm^2, a pole prostokąta 3200 mm^2. Prostokąt jest więc lżejszy przy podobnej nośności, ponieważ materiał jest odsunięty dalej od osi obojętnej. To pierwsza ilustracja tego, że kształt przekroju ma znaczenie.',
  figure: {
    kind: 'beam',
    length: 2,
    supports: [
      { at: 0, label: 'A' },
      { at: 2, label: 'B' },
    ],
    pointLoads: [{ at: 1, value: 12, label: 'P = 12 kN' }],
    shear: [
      [
        [0, 6],
        [1, 6],
      ],
      [
        [1, -6],
        [2, -6],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 6],
      ],
      [
        [1, 6],
        [2, 0],
      ],
    ],
    markers: [
      { x: 1, y: 6, text: 'T = 6 kN', diagram: 'shear' },
      { x: 1, y: -6, text: 'T = -6 kN', diagram: 'shear' },
      { x: 1, y: 6, text: 'M = 6 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '2,0 m', focus: 'load', reveal: 0 },
      { label: 'P', value: '12,0 kN', focus: 'load', reveal: 0 },
      { label: 'k', value: '160 MPa', focus: 'stress', reveal: 0 },
      { label: 'R_A', value: '6,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '6,0 kN', focus: 'reaction' },
      { label: 'T', value: '6,0 kN', focus: 'T' },
      { label: 'M_max', value: '6,0 kN·m', focus: 'M' },
      { label: 'W_min', value: '37 500 mm³', focus: 'design' },
      { label: 'b_min', value: '38,3 mm', focus: 'design', reveal: 3 },
      { label: 'b', value: '40 mm', focus: 'design' },
      { label: 'h', value: '80 mm', focus: 'design', reveal: 4 },
      { label: 'W', value: '42 667 mm³', focus: 'design', reveal: 4 },
      { label: 'σ_max', value: '140,6 MPa', focus: 'stress', reveal: 4 },
      { label: 'A prostokąta', value: '3 200 mm²', focus: 'design' },
      { label: 'd koła', value: '75,7 mm', focus: 'design', reveal: 5 },
      { label: 'A koła', value: '4 500 mm²', focus: 'design' },
    ],
    note: 'Prostokąt 40 × 80 mm ma pole 3200 mm², czyli mniejsze niż koło ∅75,7 mm o podobnym W.',
  },
  scenes: [
    {
      title: 'Reakcje',
      narration: 'Przy symetrycznym obciążeniu reakcje wynoszą R_A = R_B = P/2 = 12/2 = 6 kN.',
      caption: 'Przy symetrycznym obciążeniu reakcje wynoszą R_A = R_B = P/2 = 12/2 = 6 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A = R_B = P/2 = 12/2 = 6\\ \\text{kN}',
    },
    {
      title: 'Siła tnąca',
      narration: 'Siła tnąca wynosi T = R_A = 6 kN po lewej stronie siły i T = -R_B = -6 kN po prawej.',
      caption: 'Siła tnąca wynosi T = R_A = 6 kN po lewej stronie siły i T = -R_B = -6 kN po prawej.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T = R_A = 6\\ \\text{kN}',
    },
    {
      title: 'Krok 1',
      narration:
        'Rozważmy belkę o tym samym schemacie, ale z przekrojem prostokątnym o proporcji h=2b. Dane: L=2 m, P=12 kN, k=160 MPa. Moment maksymalny wynosi M_max=12· 2/4=6 kN·m=6 000 000 N·mm.',
      caption:
        'Rozważmy belkę o tym samym schemacie, ale z przekrojem prostokątnym o proporcji h=2b. Dane: L=2 m, P=12 kN, k=160 MPa. Moment…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'h=2b',
    },
    {
      title: 'Krok 2',
      narration:
        'Wymagany wskaźnik to W_min=6 000 000/160=37 500 mm^3. Dla h=2b mamy W=bh^2/6=b· 4b^2/6=2b^3/3. Po przekształceniu b^3≥ 3W_min/2=56 250, więc b≥ 38,3 mm.',
      caption:
        'Wymagany wskaźnik to W_min=6 000 000/160=37 500 mm^3. Dla h=2b mamy W=bh^2/6=b· 4b^2/6=2b^3/3. Po przekształceniu b^3≥…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'W_{\\min}=6\\,000\\,000/160=37\\,500\\ \\text{mm}^3',
    },
    {
      title: 'Krok 3',
      narration:
        'Przyjmujemy b=40 mm i h=80 mm. Rzeczywisty wskaźnik wynosi W=40· 80^2/6=42 667 mm^3, a naprężenie σ=6 000 000/42 667=140,6 MPa, czyli mniej niż 160 MPa.',
      caption:
        'Przyjmujemy b=40 mm i h=80 mm. Rzeczywisty wskaźnik wynosi W=40· 80^2/6=42 667 mm^3, a naprężenie σ=6 000 000/42 667=140,6 MPa,…',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: 'b=40\\ \\text{mm}',
    },
    {
      title: 'Krok 4',
      narration:
        'Warto porównać przekrój prostokątny z kołem o tym samym W. Dla koła W=42 667 daje d^3=32W/π≈ 434 500, czyli d≈ 75,7 mm. Pole koła wynosi około 4500 mm^2, a pole prostokąta 3200 mm^2. Prostokąt jest więc lżejszy przy podobnej nośności, ponieważ materiał jest odsunięty dalej od osi obojętnej. To pierwsza ilustracja tego, że kształt przekroju ma znaczenie.',
      caption:
        'Warto porównać przekrój prostokątny z kołem o tym samym W. Dla koła W=42 667 daje d^3=32W/π≈ 434 500, czyli d≈ 75,7 mm. Pole koła…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'W',
    },
  ],
} satisfies SolutionData
