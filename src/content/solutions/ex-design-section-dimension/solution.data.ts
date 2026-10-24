import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-section-dimension',
  title: 'Dobór wymiaru z warunku wytrzymałości — przykład 1',
  duration: 7,
  given: ['L=3 m', 'P=12 kN', 'k=140 MPa', 'E=200 GPa'],
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SectionDimension1Animation }))),
  result:
    'Wymagany wskaźnik wynosi około 64 286 mm^3, a najmniejsza przyjęta średnica to 90 mm. Naprężenie 125,8 MPa jest mniejsze od 140 MPa, a ugięcie 10,5 mm nie przekracza 12 mm.',
  figure: {
    kind: 'beam',
    length: 3,
    supports: [
      { at: 0, label: 'A' },
      { at: 3, label: 'B' },
    ],
    pointLoads: [{ at: 1.5, value: 12, label: 'P = 12 kN' }],
    shear: [
      [
        [0, 6],
        [1.5, 6],
      ],
      [
        [1.5, -6],
        [3, -6],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1.5, 9],
      ],
      [
        [1.5, 9],
        [3, 0],
      ],
    ],
    markers: [
      { x: 1.5, y: 6, text: 'T = 6 kN', diagram: 'shear' },
      { x: 1.5, y: -6, text: 'T = -6 kN', diagram: 'shear' },
      { x: 1.5, y: 9, text: 'M = 9 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '3,0 m', focus: 'load', reveal: 0 },
      { label: 'P', value: '12,0 kN', focus: 'load', reveal: 0 },
      { label: 'k', value: '140 MPa', focus: 'stress', reveal: 0 },
      { label: 'E', value: '200 GPa', focus: 'design', reveal: 0 },
      { label: 'R_A', value: '6,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '6,0 kN', focus: 'reaction' },
      { label: 'T', value: '6,0 kN', focus: 'T' },
      { label: 'M_max', value: '9,0 kN·m', focus: 'M' },
      { label: 'W_min', value: '64 286 mm³', focus: 'design' },
      { label: 'd_min', value: '86,8 mm', focus: 'design' },
      { label: 'd', value: '90 mm', focus: 'design' },
      { label: 'W', value: '71 569 mm³', focus: 'design' },
      { label: 'σ_max', value: '125,8 MPa', focus: 'stress' },
      { label: 'I', value: '3 220 000 mm⁴', focus: 'design' },
      { label: 'f', value: '10,5 mm', focus: 'design' },
      { label: 'f_dop', value: '12,0 mm', focus: 'design' },
    ],
    note: 'Decyduje wytrzymałość: d = 90 mm, a ugięcie 10,5 mm pozostaje poniżej 12 mm.',
  },
  scenes: [
    {
      title: 'Model i obciążenie',
      narration:
        'Belka swobodnie podparta ma L = 3 m i jest obciążona siłą P = 12 kN w środku. Reakcje wynoszą R_A = R_B = 6 kN, a maksymalny moment to M_max = PL/4 = 9 kN·m.',
      caption:
        'Belka swobodnie podparta ma L = 3 m i jest obciążona siłą P = 12 kN w środku. Reakcje wynoszą R_A = R_B = 6 kN, a maksymalny moment to M_max = PL/4 = 9 kN·m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'M_{\\max}=PL/4=12\\,000\\cdot 3000/4=9\\,000\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Wymagany wskaźnik',
      narration:
        'Z warunku σ = M/W ≤ k wynika W_min = M_max/k = 9 000 000/140 = 64 285,7 mm³. To jeszcze nie wymiar, tylko wymagana cecha geometryczna przekroju.',
      caption:
        'Z warunku σ = M/W ≤ k wynika W_min = M_max/k = 9 000 000/140 = 64 285,7 mm³. To jeszcze nie wymiar, tylko wymagana cecha geometryczna przekroju.',
      visual: 'beam',
      focus: { metric: 'required' },
      formula: 'W_{\\min}=M_{\\max}/k=9\\,000\\,000/140=64\\,285{,}7\\ \\text{mm}^3',
    },
    {
      title: 'Dobór średnicy',
      narration:
        'Dla pełnego koła W = πd³/32, więc d_min = ∛(32M_max/(πk)) ≈ 86,8 mm. Z szeregu wymiarów co 10 mm przyjmujemy najmniejszą większą średnicę d = 90 mm.',
      caption:
        'Dla pełnego koła W = πd³/32, więc d_min = ∛(32M_max/(πk)) ≈ 86,8 mm. Z szeregu wymiarów co 10 mm przyjmujemy najmniejszą większą średnicę d = 90 mm.',
      visual: 'beam',
      focus: { metric: 'dimension' },
      formula:
        'd_{\\min}=\\sqrt[3]{32M_{\\max}/(\\pi k)}\\approx86{,}8\\ \\text{mm}\\quad\\Rightarrow\\quad d=90\\ \\text{mm}',
    },
    {
      title: 'Kontrola naprężeń',
      narration:
        'Przyjęty przekrój ma W = π·90³/32 = 71 569 mm³, więc σ_max = 9 000 000/71 569 ≈ 125,8 MPa. Warunek 125,8 MPa ≤ 140 MPa jest spełniony, a wykorzystanie wynosi około 90%.',
      caption:
        'Przyjęty przekrój ma W = π·90³/32 = 71 569 mm³, więc σ_max = 9 000 000/71 569 ≈ 125,8 MPa. Warunek 125,8 MPa ≤ 140 MPa jest spełniony, a wykorzystanie wynosi około 90%.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_{\\max}=\\frac{M_{\\max}}{W}=\\frac{9\\,000\\,000}{71\\,569}\\approx125{,}8\\ \\text{MPa}\\le140\\ \\text{MPa}',
    },
    {
      title: 'Kontrola ugięcia',
      narration:
        'Osobno sprawdzamy sztywność: I = π·90⁴/64 ≈ 3 220 000 mm⁴, a f = PL³/(48EI) ≈ 10,5 mm. Jest to mniej niż L/250 = 12 mm, więc o wymiarze decyduje wytrzymałość.',
      caption:
        'Osobno sprawdzamy sztywność: I = π·90⁴/64 ≈ 3 220 000 mm⁴, a f = PL³/(48EI) ≈ 10,5 mm. Jest to mniej niż L/250 = 12 mm, więc o wymiarze decyduje wytrzymałość.',
      visual: 'beam',
      focus: { metric: 'stiffness' },
      formula: 'f=\\frac{PL^3}{48EI}\\approx10{,}5\\ \\text{mm}\\le\\frac{L}{250}=12\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
