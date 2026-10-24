import type { SolutionData } from '../../model'
import { SectionDimension2Animation } from './animation'

export default {
  id: 'ex-design-section-dimension-2',
  title: 'Dobór wymiaru z warunku wytrzymałości — przykład 2',
  duration: 7,
  given: ['h=2b', 'L=2 m', 'P=12 kN', 'k=160 MPa'],
  animation: SectionDimension2Animation,
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
      title: 'Model i obciążenie',
      narration:
        'Belka swobodnie podparta ma L = 2 m i jest obciążona siłą P = 12 kN w środku. Reakcje wynoszą po 6 kN, a moment maksymalny M_max = PL/4 = 6 kN·m = 6 000 000 N·mm.',
      caption:
        'Belka swobodnie podparta ma L = 2 m i jest obciążona siłą P = 12 kN w środku. Reakcje wynoszą po 6 kN, a moment maksymalny M_max = PL/4 = 6 kN·m = 6 000 000 N·mm.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'M_{\\max}=PL/4=12\\,000\\cdot 2000/4=6\\,000\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Wymagany wskaźnik',
      narration:
        'Wymagany wskaźnik to W_min = 6 000 000/160 = 37 500 mm³. Dla prostokąta o proporcji h = 2b mamy W = bh²/6 = 2b³/3, więc b_min = ∛(3W_min/2) ≈ 38,3 mm.',
      caption:
        'Wymagany wskaźnik to W_min = 6 000 000/160 = 37 500 mm³. Dla prostokąta o proporcji h = 2b mamy W = bh²/6 = 2b³/3, więc b_min = ∛(3W_min/2) ≈ 38,3 mm.',
      visual: 'beam',
      focus: { metric: 'required' },
      formula:
        'W_{\\min}=\\frac{M_{\\max}}{k}=37\\,500\\ \\text{mm}^3\\quad\\Rightarrow\\quad b_{\\min}=\\sqrt[3]{\\frac{3W_{\\min}}{2}}\\approx38{,}3\\ \\text{mm}',
    },
    {
      title: 'Przyjęty przekrój',
      narration:
        'Przyjmujemy b = 40 mm i h = 2b = 80 mm. Rzeczywisty wskaźnik wynosi W = 40·80²/6 = 42 667 mm³, czyli więcej niż wymagane 37 500 mm³.',
      caption:
        'Przyjmujemy b = 40 mm i h = 2b = 80 mm. Rzeczywisty wskaźnik wynosi W = 40·80²/6 = 42 667 mm³, czyli więcej niż wymagane 37 500 mm³.',
      visual: 'beam',
      focus: { metric: 'selection' },
      formula:
        'b=40\\ \\text{mm},\\quad h=2b=80\\ \\text{mm}\\quad\\Rightarrow\\quad W=\\frac{40\\cdot80^2}{6}=42\\,667\\ \\text{mm}^3',
    },
    {
      title: 'Kontrola naprężeń',
      narration:
        'Naprężenie wynosi σ_max = 6 000 000/42 667 ≈ 140,6 MPa, czyli mniej niż k = 160 MPa. Wykorzystanie przekroju to około 88%, więc warunek jest spełniony z niewielkim zapasem.',
      caption:
        'Naprężenie wynosi σ_max = 6 000 000/42 667 ≈ 140,6 MPa, czyli mniej niż k = 160 MPa. Wykorzystanie przekroju to około 88%, więc warunek jest spełniony z niewielkim zapasem.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_{\\max}=\\frac{M_{\\max}}{W}=\\frac{6\\,000\\,000}{42\\,667}\\approx140{,}6\\ \\text{MPa}\\le160\\ \\text{MPa}',
    },
    {
      title: 'Porównanie kształtów',
      narration:
        'Koło o tym samym W = 42 667 mm³ miałoby d ≈ 75,7 mm i pole około 4500 mm². Prostokąt 40 × 80 mm ma pole 3200 mm², więc jest lżejszy przy podobnej nośności, ponieważ materiał jest odsunięty dalej od osi obojętnej.',
      caption:
        'Koło o tym samym W = 42 667 mm³ miałoby d ≈ 75,7 mm i pole około 4500 mm². Prostokąt 40 × 80 mm ma pole 3200 mm², więc jest lżejszy przy podobnej nośności, ponieważ materiał jest odsunięty dalej od osi obojętnej.',
      visual: 'beam',
      focus: { metric: 'shape' },
      formula: 'W=\\frac{\\pi d^3}{32}=42\\,667\\ \\text{mm}^3\\quad\\Rightarrow\\quad d\\approx75{,}7\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
