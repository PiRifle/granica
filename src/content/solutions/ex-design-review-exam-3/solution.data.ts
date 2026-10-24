import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-review-exam-3',
  title: 'Powtórka mieszana i strategia kolokwium — przykład 3',
  duration: 7,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DesignReviewExam3Animation }))),
  given: ['M = 3 kN·m', 'k = 150 MPa'],
  result:
    'Wariant odwrotny uczy, że kontrola rzędu wielkości jest częścią rozwiązania. Moment 3 kN·m to 3 000 000 N·mm, a nie 3. Poprawny wskaźnik wynosi 20 000 mm³, a średnica 60 mm jest realistyczna. Wynik 0,6 mm odrzucamy, bo powstał przez pominięcie zamiany jednostek.',
  figure: {
    kind: 'beam',
    length: 2,
    supports: [
      { at: 0, label: 'A' },
      { at: 2, label: 'B' },
    ],
    pointLoads: [{ at: 1, value: 6, label: 'P = 6 kN' }],
    shear: [
      [
        [0, 3],
        [1, 3],
      ],
      [
        [1, -3],
        [2, -3],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 3],
      ],
      [
        [1, 3],
        [2, 0],
      ],
    ],
    markers: [
      { x: 1, y: 3, text: 'T = 3 kN', diagram: 'shear' },
      { x: 1, y: -3, text: 'T = -3 kN', diagram: 'shear' },
      { x: 1, y: 3, text: 'M = 3 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'M', value: '3,0 kN·m', focus: 'M', reveal: 0 },
      { label: 'k', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'W (błędne)', value: '0,02 mm³', focus: 'design', reveal: 0 },
      { label: 'd (błędne)', value: '0,6 mm', focus: 'design', reveal: 0 },
      { label: 'W', value: '20 000 mm³', focus: 'design', reveal: 1 },
      { label: 'd_min', value: '58,8 mm', focus: 'design', reveal: 1 },
      { label: 'd', value: '60 mm', focus: 'design' },
      { label: 'W (60)', value: '21 206 mm³', focus: 'design' },
      { label: 'σ', value: '141,5 MPa', focus: 'stress', reveal: 2 },
      { label: 'R_A', value: '3,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '3,0 kN', focus: 'reaction' },
    ],
    note: 'Poprawny wskaźnik to 20 000 mm³, a nie 0,02 mm³; wynik 60 mm jest realistyczny.',
  },
  scenes: [
    {
      title: 'Model belki',
      narration:
        'Belka swobodnie podparta ma rozpiętość L = 2 m i jest obciążona siłą P = 6 kN w środku. Dopuszczalne naprężenie wynosi k = 150 MPa. Najpierw ustalamy model i obciążenie, a dopiero potem szukamy przekroju.',
      caption: 'Model: belka, dwa podparcia i siła w środku rozpiętości. Szukamy średnicy przekroju kołowego.',
      visual: 'beam',
      focus: { metric: 'loads' },
      formula: 'P=6\\ \\text{kN},\\quad L=2\\ \\text{m},\\quad k=150\\ \\text{MPa}',
    },
    {
      title: 'Reakcje i siła tnąca',
      narration:
        'Z symetrii reakcje wynoszą R_A = R_B = P/2 = 3 kN. Siła tnąca ma wartość +3 kN po lewej stronie siły i −3 kN po prawej, więc zmienia znak dokładnie pod siłą.',
      caption: 'Reakcje po 3 kN, a siła tnąca zmienia znak pod obciążeniem. To zapowiada ekstremum momentu.',
      visual: 'beam',
      focus: { metric: 'shear' },
      formula: 'R_A=R_B=\\frac{P}{2}=3\\ \\text{kN},\\quad T=\\pm3\\ \\text{kN}',
    },
    {
      title: 'Moment maksymalny',
      narration:
        'Moment zginający rośnie liniowo od podpór i osiąga maksimum pod siłą. Dla siły w środku M_max = PL/4 = 6·2/4 = 3 kN·m. Ten moment trafia do warunku wytrzymałości.',
      caption: 'Wykres momentu jest trójkątny; maksimum 3 kN·m wypada w środku rozpiętości.',
      visual: 'beam',
      focus: { metric: 'moment' },
      formula: 'M_{\\max}=\\frac{PL}{4}=\\frac{6\\cdot2}{4}=3\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Jednostki i dobór średnicy',
      narration:
        'Student podstawia M = 3 zamiast 3 000 000 N·mm i otrzymuje W = 0,02 mm³, a potem d ≈ 0,6 mm. To absurd. Poprawnie: W_min = 3 000 000/150 = 20 000 mm³, d_min ≈ 58,8 mm, więc przyjmujemy 60 mm.',
      caption: 'Przekrój rośnie od nierealnych 0,6 mm do poprawnego wymiaru 60 mm. Decyduje zamiana jednostek momentu.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula:
        'W_{\\min}=\\frac{3\\,000\\,000}{150}=20\\,000\\ \\text{mm}^3\\quad d_{\\min}=\\sqrt[3]{\\frac{32W_{\\min}}{\\pi}}\\approx58{,}8\\ \\text{mm}\\quad d=60\\ \\text{mm}',
    },
    {
      title: 'Kontrola naprężeń',
      narration:
        'Dla przyjętej średnicy 60 mm wskaźnik wynosi W = π·60³/32 ≈ 21 206 mm³. Naprężenie σ = 3 000 000/21 206 ≈ 141,5 MPa jest mniejsze od 150 MPa, ale zapas jest niewielki.',
      caption: 'Rozkład naprężeń jest liniowy od osi obojętnej. Wykorzystanie granicy wynosi około 94%.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula:
        'W=\\frac{\\pi\\cdot60^3}{32}\\approx21\\,206\\ \\text{mm}^3,\\quad \\sigma=\\frac{3\\,000\\,000}{21\\,206}\\approx141{,}5\\ \\text{MPa}\\le150\\ \\text{MPa}',
    },
    {
      title: 'Decyzja i rząd wielkości',
      narration:
        'Kontrola rzędu wielkości jest częścią rozwiązania: 0,6 mm jest absurdalne dla belki o takim momencie, a 60 mm jest realistyczne. Wynik 0,6 mm odrzucamy, bo powstał przez pominięcie zamiany kN·m na N·mm. Przyjmujemy d = 60 mm.',
      caption:
        'Odpowiedź: d = 60 mm, σ ≈ 141,5 MPa ≤ 150 MPa. Błąd jednostek został wychwycony przez kontrolę rzędu wielkości.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula: 'd=60\\ \\text{mm},\\quad \\sigma\\approx141{,}5\\ \\text{MPa}\\le k=150\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
