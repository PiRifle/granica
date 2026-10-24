import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-stress-neutral-axis-2',
  title: 'Rozkład σ i oś obojętna — przykład 2',
  duration: 7,
  given: [],
  result:
    'Górna półka jest ściskana, a dolna krawędź środnika rozciągana. Mimo że górna półka jest szersza, to dolne włókno jest dalej od osi obojętnej, więc to ono decyduje o największym naprężeniu. Wniosek jest ogólny: w przekroju niesymetrycznym zawsze sprawdzaj oba skrajne włókna, bo „większy przekrój” nie oznacza automatycznie mniejszego naprężenia.',
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    moments: [
      { at: 0, value: 5, label: 'M = 5 kN·m' },
      { at: 4, value: 5, label: 'M = 5 kN·m' },
    ],
    shear: [
      [
        [0, 0],
        [4, 0],
      ],
    ],
    moment: [
      [
        [0, 5],
        [4, 5],
      ],
    ],
    markers: [
      { x: 2, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2, y: 5, text: 'M = 5 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'A_1', value: '2000 mm²', focus: 'design' },
      { label: 'A_2', value: '1600 mm²', focus: 'design' },
      { label: 'ȳ', value: '32,22 mm', focus: 'design' },
      { label: 'c_g', value: '32,22 mm', focus: 'design' },
      { label: 'c_d', value: '67,78 mm', focus: 'design' },
      { label: 'I_z', value: '3,142·10⁶ mm⁴', focus: 'design' },
      { label: 'M', value: '5,0 kN·m', focus: 'M' },
      { label: 'σ_g', value: '-51,3 MPa', focus: 'design' },
      { label: 'σ_d', value: '107,9 MPa', focus: 'design' },
    ],
    note: 'Przekrój teowy jest niesymetryczny: decyduje dolne włókno, mimo że górna półka jest szersza.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy przekrój teowy złożony z półki 100 × 20 mm i środnika 20 × 80 mm. Całkowita wysokość wynosi 100 mm. Taki przekrój nie jest symetryczny względem osi poziomej, więc oś obojętna nie leży w połowie wysokości. Trzeba najpierw znaleźć środek ciężkości.',
      caption:
        'Rozważmy przekrój teowy złożony z półki 100 × 20 mm i środnika 20 × 80 mm. Całkowita wysokość wynosi 100 mm. Taki przekrój nie…',
      visual: 'beam',
      focus: { metric: 'design' },
    },
    {
      title: 'Krok 2',
      narration:
        'Pole półki to A_1 = 2000 mm², a jej środek ciężkości leży 10 mm od góry. Pole środnika to A_2 = 1600 mm², a jego środek leży 60 mm od góry. Wspólny środek ciężkości jest w odległości',
      caption:
        'Pole półki to A_1 = 2000 mm², a jej środek ciężkości leży 10 mm od góry. Pole środnika to A_2 = 1600 mm², a jego środek leży 60…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'A_{1} = 2000 mm^{2}',
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'y = (2000 · 10 + 1600 · 60)/(3600) = 32,22 mm',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\bar{y} = \\frac{2000 \\cdot 10 + 1600 \\cdot 60}{3600} = 32{,}22\\ \\text{mm}',
    },
    {
      title: 'Krok 4',
      narration:
        'od góry. To jest jednocześnie położenie osi obojętnej. Do góry zostaje c_g = 32,22 mm, a do dołu c_d = 100 - 32,22 = 67,78 mm.',
      caption:
        'od góry. To jest jednocześnie położenie osi obojętnej. Do góry zostaje c_g = 32,22 mm, a do dołu c_d = 100 - 32,22 = 67,78 mm.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'c_{g} = 32{,}22 mm',
    },
    {
      title: 'Krok 5',
      narration:
        'Moment bezwładności liczymy twierdzeniem Steinera. Dla półki I_1 = 100 · 20^3/12 = 66,667 mm⁴, a przesunięcie względem wspólnej osi wynosi 22,22 mm. Dla środnika I_2 = 20 · 80^3/12 = 853,333 mm⁴, a przesunięcie 27,78 mm. Po zsumowaniu',
      caption:
        'Moment bezwładności liczymy twierdzeniem Steinera. Dla półki I_1 = 100 · 20^3/12 = 66,667 mm⁴, a przesunięcie względem wspólnej…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'I_{1} = 100 \\cdot 20^{3}/12 = 66{,}667 mm^{4}',
    },
    {
      title: 'Krok 6',
      narration: 'Zapis matematyczny.',
      caption: 'I_z = 66,667 + 2000 · 22,22^2 + 853,333 + 1600 · 27,78^2 = 3,142 · 10^6 mm^4.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula:
        'I_z = 66{,}667 + 2000 \\cdot 22{,}22^2 + 853{,}333 + 1600 \\cdot 27{,}78^2\n= 3{,}142 \\cdot 10^6\\ \\text{mm}^4.',
    },
    {
      title: 'Krok 7',
      narration: 'Przy M = 5 kN·m naprężenia skrajne wynoszą',
      caption: 'Przy M = 5 kN·m naprężenia skrajne wynoszą',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M = 5 kN\\cdot m',
    },
    {
      title: 'Krok 8',
      narration: 'Zapis matematyczny.',
      caption:
        'σ_g = -(5 · 10^6 · 32,22)/(3,142 · 10^6) = -51,3 MPa, σ_d = (5 · 10^6 · 67,78)/(3,142 · 10^6) = 107,9 MPa.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula:
        '\\sigma_g = -\\frac{5 \\cdot 10^6 \\cdot 32{,}22}{3{,}142 \\cdot 10^6} = -51{,}3\\ \\text{MPa},\n\\qquad\n\\sigma_d = \\frac{5 \\cdot 10^6 \\cdot 67{,}78}{3{,}142 \\cdot 10^6} = 107{,}9\\ \\text{MPa}.',
    },
    {
      title: 'Krok 9',
      narration:
        'Górna półka jest ściskana, a dolna krawędź środnika rozciągana. Mimo że górna półka jest szersza, to dolne włókno jest dalej od osi obojętnej, więc to ono decyduje o największym naprężeniu. Wniosek jest ogólny: w przekroju niesymetrycznym zawsze sprawdzaj oba skrajne włókna, bo „większy przekrój” nie oznacza automatycznie mniejszego naprężenia.',
      caption:
        'Górna półka jest ściskana, a dolna krawędź środnika rozciągana. Mimo że górna półka jest szersza, to dolne włókno jest dalej od…',
      visual: 'beam',
      focus: { metric: 'design' },
    },
  ],
} satisfies SolutionData
