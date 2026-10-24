import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-full-bending-2',
  title: 'Pełne zadanie: dobór belki na zginanie — przykład 2',
  duration: 7,
  given: ['L=4 m', 'P=20 kN', 'a=1,4 m', 'h=2b', 'k=160 MPa', 'E=200 GPa', 'f_dop=16 mm'],
  result:
    'Przekrój 60 × 120 mm spełnia oba warunki: σ_max = 126,4 MPa < 160 MPa oraz f = 12,8 mm < 16 mm. Przy podobnej nośności jest lżejszy od koła ∅110 mm, ale wymaga poprawnego ustawienia względem osi zginania.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FullBendingDesign2Animation }))),
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    pointLoads: [{ at: 1.4, value: 20, label: 'P = 20 kN' }],
    shear: [
      [
        [0, 13],
        [1.4, 13],
      ],
      [
        [1.4, -7],
        [4, -7],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1.4, 18.2],
      ],
      [
        [1.4, 18.2],
        [4, 0],
      ],
    ],
    markers: [
      { x: 1.4, y: 13, text: 'T = 13 kN', diagram: 'shear' },
      { x: 1.4, y: -7, text: 'T = -7 kN', diagram: 'shear' },
      { x: 1.4, y: 18.2, text: 'M = 18,2 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '20,0 kN', focus: 'load', reveal: 0 },
      { label: 'L', value: '4,0 m', focus: 'load', reveal: 0 },
      { label: 'a', value: '1,4 m', focus: 'load', reveal: 0 },
      { label: 'R_A', value: '13,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '7,0 kN', focus: 'reaction', reveal: 0 },
      { label: 'T_A', value: '13,0 kN', focus: 'T' },
      { label: 'T_B', value: '-7,0 kN', focus: 'T', reveal: 1 },
      { label: 'M_max', value: '18,2 kN·m', focus: 'M' },
      { label: 'W_min', value: '113 750 mm³', focus: 'design', reveal: 2 },
      { label: 'b_min', value: '55,5 mm', focus: 'design', reveal: 2 },
      { label: 'b', value: '60 mm', focus: 'design' },
      { label: 'h', value: '120 mm', focus: 'design' },
      { label: 'W', value: '144 000 mm³', focus: 'design', reveal: 3 },
      { label: 'σ_max', value: '126,4 MPa', focus: 'stress', reveal: 3 },
      { label: 'I', value: '8 640 000 mm⁴', focus: 'design', reveal: 3 },
      { label: 'f', value: '12,8 mm', focus: 'design', reveal: 3 },
      { label: 'A prostokąta', value: '7 200 mm²', focus: 'design' },
      { label: 'A koła ∅110', value: '9 503 mm²', focus: 'design', reveal: 7 },
    ],
    note: 'Prostokąt 60 × 120 mm jest lżejszy od koła ∅110 mm przy podobnej nośności.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Ten sam schemat: L = 4 m, P = 20 kN w odległości a = 1,4 m, więc M_max = 18,2 kN·m. Tym razem przekrój jest prostokątny o proporcji h = 2b; przyjmujemy k = 160 MPa, E = 200 GPa i f_dop = L/250 = 16 mm.',
      caption: 'Schemat i dane; szukamy szerokości b przy zadanym stosunku h = 2b.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula:
        'L=4\\ \\text{m},\\quad P=20\\ \\text{kN},\\quad a=1{,}4\\ \\text{m},\\quad h=2b,\\quad k=160\\ \\text{MPa}',
    },
    {
      title: 'Reakcje i moment maksymalny',
      narration:
        'Reakcje wynoszą R_A = 13 kN i R_B = 7 kN. Moment maksymalny pod siłą to M_max = Pab/L = 18,2 kN·m = 18 200 000 N·mm — identycznie jak dla koła, bo moment nie zależy od przekroju.',
      caption: 'Wierzchołek M wypada pod siłą; sam moment nie zależy od kształtu przekroju.',
      visual: 'beam',
      focus: { metric: 'moment' },
      formula:
        'R_A=13\\ \\text{kN},\\qquad M_{\\max}=18{,}2\\ \\text{kN}\\cdot\\text{m}=18\\,200\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'Wymagany wskaźnik wynosi W_min = 113 750 mm³. Dla prostokąta W = bh²/6 = b(2b)²/6 = 2b³/3, więc b³ ≥ 3W_min/2 = 170 625 i b ≥ 55,5 mm.',
      caption: 'Proporcja h = 2b redukuje dobór do jednej niewiadomej b; wynik to 55,5 mm.',
      visual: 'beam',
      focus: { metric: 'strength' },
      formula:
        'W_{\\min}=113\\,750\\ \\text{mm}^3,\\qquad b\\ge\\sqrt[3]{\\frac{3\\cdot113\\,750}{2}}\\approx55{,}5\\ \\text{mm}',
    },
    {
      title: 'Dobór przekroju',
      narration:
        'Przyjmujemy b = 60 mm i h = 120 mm. Rzeczywisty wskaźnik W = 60·120²/6 = 144 000 mm³, a moment bezwładności I = 60·120³/12 = 8 640 000 mm⁴. Oba są większe od wymagań.',
      caption: 'Przekrój 60 × 120 mm ma W = 144 000 mm³ > W_min oraz I = 8,64·10⁶ mm⁴.',
      visual: 'beam',
      focus: { metric: 'section' },
      formula:
        'b=60\\ \\text{mm},\\quad h=120\\ \\text{mm},\\quad W=144\\,000\\ \\text{mm}^3,\\quad I=8\\,640\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Kontrola naprężeń',
      narration:
        'Naprężenie maksymalne σ_max = M_max/W = 18 200 000/144 000 ≈ 126,4 MPa, czyli mniej niż k = 160 MPa. Zapas wytrzymałości jest większy niż dla koła ∅110 mm.',
      caption: 'σ_max = 126,4 MPa ≤ 160 MPa — warunek wytrzymałości spełniony.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: '\\sigma_{\\max}=\\frac{18\\,200\\,000}{144\\,000}\\approx126{,}4\\ \\text{MPa}\\le160\\ \\text{MPa}',
    },
    {
      title: 'Kontrola ugięcia',
      narration:
        'Ugięcie f = P a²b²/(3EIL) = 20 000·1400²·2600²/(3·200 000·8 640 000·4000) ≈ 12,8 mm, więc jest mniejsze od f_dop = 16 mm. Prostokąt 60 × 120 mm ma pole 7200 mm², czyli mniejsze niż koło ∅110 mm (9503 mm²), ale jest bardziej podatny na zwichrzenie i wymaga poprawnego ustawienia względem osi zginania.',
      caption: 'f = 12,8 mm ≤ 16 mm; przy podobnej nośności prostokąt jest lżejszy, lecz mniej odporny na zwichrzenie.',
      visual: 'beam',
      focus: { metric: 'deflection' },
      formula: 'f=\\frac{P a^2b^2}{3EIL}\\approx12{,}8\\ \\text{mm}\\le16\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
