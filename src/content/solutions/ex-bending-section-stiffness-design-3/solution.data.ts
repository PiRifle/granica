import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-section-stiffness-design-3',
  title: 'Dobór przekroju i kontrola sztywności — przykład 3',
  duration: 7,
  given: ['L = 3,5 m', 'P = 8 kN', 'E = 200 GPa', 'f_{dop} = 10 mm', 'b = 50 mm'],
  result:
    'czyli jest mniejsze od 10 mm. Sprawdźmy jeszcze wytrzymałość: M_max = P L/4 = 7 kN·m, W = 83,333 mm³, więc σ_max = 84 MPa, znacznie poniżej typowego σ_dop. W tym zadaniu o wymiarze decyduje sztywność, a nie wytrzymałość.',
  figure: {
    kind: 'beam',
    length: 3.5,
    supports: [
      { at: 0, label: 'A' },
      { at: 3.5, label: 'B' },
    ],
    pointLoads: [{ at: 1.75, value: 8, label: 'P = 8 kN' }],
    shear: [
      [
        [0, 4],
        [1.75, 4],
      ],
      [
        [1.75, -4],
        [3.5, -4],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1.75, 7],
      ],
      [
        [1.75, 7],
        [3.5, 0],
      ],
    ],
    markers: [
      { x: 1.75, y: 4, text: 'T = 4 kN', diagram: 'shear' },
      { x: 1.75, y: -4, text: 'T = -4 kN', diagram: 'shear' },
      { x: 1.75, y: 7, text: 'M = 7 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '8,0 kN', focus: 'load' },
      { label: 'R_A', value: '4,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '4,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '7,0 kN·m', focus: 'M' },
      { label: 'I_min', value: '3,573·10⁶ mm⁴', focus: 'design' },
      { label: 'h', value: '100 mm', focus: 'design' },
      { label: 'I', value: '4,167·10⁶ mm⁴', focus: 'design' },
      { label: 'f', value: '8,57 mm', focus: 'design' },
      { label: 'σ_max', value: '84 MPa', focus: 'design' },
    ],
    note: 'O wymiarze decyduje sztywność: f = 8,57 mm < f_dop = 10 mm, a naprężenie 84 MPa jest znacznie poniżej granicy.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem to sztywność jest znana, a szukamy wymiaru. Belka swobodnie podparta ma L = 3,5 m, siłę P = 8 kN w środku, E = 200 GPa i dopuszczalne ugięcie f_dop = 10 mm. Szerokość przekroju jest narzucona: b = 50 mm. Jaka wysokość jest potrzebna?',
      caption:
        'Tym razem to sztywność jest znana, a szukamy wymiaru. Belka swobodnie podparta ma L = 3,5 m, siłę P = 8 kN w środku, E = 200 GPa…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'L = 3{,}5 m',
    },
    {
      title: 'Krok 2',
      narration: 'Z warunku f = P L^3/(48EI) ≤ f_dop wynika',
      caption: 'Z warunku f = P L^3/(48EI) ≤ f_dop wynika',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'f = P L^{3}/(48EI) \\le f_{dop}',
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'I_min = (P L^3)/(48 E f_dop) = (8000 · 3500^3)/(48 · 200,000 · 10) = 3,573 · 10^6 mm^4.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula:
        'I_{\\min} = \\frac{P L^3}{48 E f_{dop}}\n= \\frac{8000 \\cdot 3500^3}{48 \\cdot 200{,}000 \\cdot 10}\n= 3{,}573 \\cdot 10^6\\ \\text{mm}^4.',
    },
    {
      title: 'Krok 4',
      narration: 'Dla prostokąta I = b h^3/12, więc',
      caption: 'Dla prostokąta I = b h^3/12, więc',
      visual: 'beam',
      focus: { metric: 'design' },
    },
    {
      title: 'Krok 5',
      narration: 'Zapis matematyczny.',
      caption: 'h ≥ ∛((12 I_min)/(b)) = ∛((12 · 3,573 · 10^6)/(50)) ≈ 95,0 mm.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula:
        'h \\ge \\sqrt[3]{\\frac{12 I_{\\min}}{b}}\n= \\sqrt[3]{\\frac{12 \\cdot 3{,}573 \\cdot 10^6}{50}} \\approx 95{,}0\\ \\text{mm}.',
    },
    {
      title: 'Krok 6',
      narration: 'Przyjmujemy h = 100 mm. Wtedy I = 50 · 100^3/12 = 4,167 · 10^6 mm⁴, a ugięcie wynosi',
      caption: 'Przyjmujemy h = 100 mm. Wtedy I = 50 · 100^3/12 = 4,167 · 10^6 mm⁴, a ugięcie wynosi',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'h = 100 mm',
    },
    {
      title: 'Krok 7',
      narration: 'Zapis matematyczny.',
      caption: 'f = (8000 · 3500^3)/(48 · 200,000 · 4,167 · 10^6) = 8,57 mm,',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'f = \\frac{8000 \\cdot 3500^3}{48 \\cdot 200{,}000 \\cdot 4{,}167 \\cdot 10^6}\n= 8{,}57\\ \\text{mm},',
    },
    {
      title: 'Krok 8',
      narration:
        'czyli jest mniejsze od 10 mm. Sprawdźmy jeszcze wytrzymałość: M_max = P L/4 = 7 kN·m, W = 83,333 mm³, więc σ_max = 84 MPa, znacznie poniżej typowego σ_dop. W tym zadaniu o wymiarze decyduje sztywność, a nie wytrzymałość.',
      caption:
        'czyli jest mniejsze od 10 mm. Sprawdźmy jeszcze wytrzymałość: M_max = P L/4 = 7 kN·m, W = 83,333 mm³, więc σ_max = 84 MPa,…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'M_{max} = P L/4 = 7 kN\\cdot m',
    },
  ],
} satisfies SolutionData
