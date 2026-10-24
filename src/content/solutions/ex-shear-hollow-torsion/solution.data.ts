import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-hollow-torsion',
  title: 'Skręcanie rury: materiał tam, gdzie pracuje — przykład 1',
  duration: 7,
  given: ['D = 80 mm', 'd = 50 mm', 'T = 2,5 kN·m'],
  result:
    'τ_max ≈ 29,4 MPa na zewnętrznej powierzchni rury. Przy tej samej średnicy zewnętrznej wał pełny miałby naprężenie około 24,9 MPa, więc rura jest w tym porównaniu słabsza, ale zużywa o 39% mniej materiału.',
  figure: {
    kind: 'section',
    width: 80,
    height: 80,
    parts: [
      {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        label: 'rura ∅80',
        tone: 'light',
      },
    ],
    holes: [
      {
        cx: 40,
        cy: 40,
        r: 25,
        label: '∅50',
      },
    ],
    centroid: {
      x: 40,
      y: 40,
    },
    values: [
      {
        label: 'T',
        value: '2,5 kN·m',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'D',
        value: '80 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'd',
        value: '50 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'J_o',
        value: '3 407 646 mm⁴',
        focus: 'design',
      },
      {
        label: 'W_o',
        value: '85 191 mm³',
        focus: 'design',
      },
      {
        label: 'τ_max',
        value: '29,4 MPa',
        focus: 'stress',
        reveal: 4,
      },
      {
        label: 'A',
        value: '3 063 mm²',
        focus: 'design',
      },
      {
        label: 'A_0',
        value: '5 027 mm²',
        focus: 'design',
        reveal: 5,
      },
      {
        label: 'τ wału pełnego',
        value: '24,9 MPa',
        focus: 'stress',
        reveal: 6,
      },
      {
        label: 'oszczędność',
        value: '39 %',
        focus: 'design',
        reveal: 6,
      },
    ],
    note: 'Rura ∅80/∅50 przenosi moment 2,5 kN·m; największe naprężenie panuje na zewnętrznej krawędzi.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Zamień moment: T = 2,5 kN·m = 2 500 000 N·mm.',
      caption: 'Zamień moment: T = 2,5 kN·m = 2 500 000 N·mm.',
      visual: 'section',
      focus: {
        metric: 'load',
      },
      formula: 'T = 2{,}5\\ \\text{kN}\\cdot\\text{m} = 2\\,500\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Krok 2',
      narration: 'Oblicz różnicę czwartych potęg: 80^4-50^4 = 40 960 000-6 250 000 = 34 710 000 mm^4.',
      caption: 'Oblicz różnicę czwartych potęg: 80^4-50^4 = 40 960 000-6 250 000 = 34 710 000 mm^4.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: '80^4-50^4 = 40\\,960\\,000-6\\,250\\,000 = 34\\,710\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Krok 3',
      narration: 'Biegunowy moment bezwładności: J_o = π · 34 710 000/32 = 3 407 646 mm^4.',
      caption: 'Biegunowy moment bezwładności: J_o = π · 34 710 000/32 = 3 407 646 mm^4.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'J_o = \\pi \\cdot 34\\,710\\,000/32 = 3\\,407\\,646\\ \\text{mm}^4',
    },
    {
      title: 'Krok 4',
      narration: 'Wskaźnik wytrzymałości: W_o = J_o/40 = 85 191 mm^3.',
      caption: 'Wskaźnik wytrzymałości: W_o = J_o/40 = 85 191 mm^3.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'W_o = J_o/40 = 85\\,191\\ \\text{mm}^3',
    },
    {
      title: 'Krok 5',
      narration: 'Maksymalne naprężenie: τ_max = 2 500 000/85 191 = 29,35 MPa.',
      caption: 'Maksymalne naprężenie: τ_max = 2 500 000/85 191 = 29,35 MPa.',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: '\\tau_{max} = 2\\,500\\,000/85\\,191 = 29{,}35\\ \\text{MPa}',
    },
    {
      title: 'Krok 6',
      narration: 'Pole rury: A = π(80^2-50^2)/4 = 3 063 mm^2. Pole wału pełnego: A_0 = π · 80^2/4 = 5 027 mm^2.',
      caption: 'Pole rury: A = π(80^2-50^2)/4 = 3 063 mm^2. Pole wału pełnego: A_0 = π · 80^2/4 = 5 027 mm^2.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'A = \\pi(80^2-50^2)/4 = 3063\\ \\text{mm}^2',
    },
    {
      title: 'Krok 7',
      narration: 'Oszczędność pola: (5 027-3 063)/5 027 = 0,391, czyli około 39%.',
      caption: 'Oszczędność pola: (5 027-3 063)/5 027 = 0,391, czyli około 39%.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: '(5027-3063)/5027 = 0{,}391',
    },
  ],
} satisfies SolutionData
