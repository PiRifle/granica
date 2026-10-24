import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-full-bending-3',
  title: 'Pełne zadanie: dobór belki na zginanie — przykład 3',
  duration: 7,
  given: ['L=4 m', 'd=100 mm', 'k=150 MPa', 'E=200 GPa', 'f_dop=13,33 mm'],
  result:
    'Decyduje sztywność: P_max ≈ 9,82 kN. Przy tej sile σ = 100 MPa < 150 MPa, a ugięcie 13,33 mm osiąga wartość dopuszczalną, więc wytrzymałość nie jest w pełni wykorzystana.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FullBendingDesign3Animation }))),
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 9.82, label: 'P_max = 9,82 kN' }],
    shear: [
      [
        [0, 4.91],
        [2, 4.91],
      ],
      [
        [2, -4.91],
        [4, -4.91],
      ],
    ],
    moment: [
      [
        [0, 0],
        [2, 9.82],
      ],
      [
        [2, 9.82],
        [4, 0],
      ],
    ],
    markers: [
      { x: 2, y: 4.91, text: 'T = 4,91 kN', diagram: 'shear' },
      { x: 2, y: -4.91, text: 'T = -4,91 kN', diagram: 'shear' },
      { x: 2, y: 9.82, text: 'M = 9,82 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '4,0 m', focus: 'load', reveal: 0 },
      { label: 'd', value: '100 mm', focus: 'design', reveal: 0 },
      { label: 'k', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'E', value: '200 GPa', focus: 'design', reveal: 0 },
      { label: 'W', value: '98 175 mm³', focus: 'design' },
      { label: 'I', value: '4 908 738 mm⁴', focus: 'design' },
      { label: 'M_dop', value: '14,73 kN·m', focus: 'design', reveal: 1 },
      { label: 'P z wytrzymałości', value: '14,73 kN', focus: 'design', reveal: 1 },
      { label: 'P ze sztywności', value: '9,82 kN', focus: 'design' },
      { label: 'P_max', value: '9,82 kN', focus: 'design' },
      { label: 'σ przy P_max', value: '100 MPa', focus: 'stress' },
      { label: 'f_dop', value: '13,33 mm', focus: 'design', reveal: 0 },
      { label: 'R_A', value: '4,91 kN', focus: 'reaction' },
      { label: 'R_B', value: '4,91 kN', focus: 'reaction' },
      { label: 'T', value: '4,91 kN', focus: 'T' },
    ],
    note: 'Decyduje sztywność: P_max = 9,82 kN, choć wytrzymałość pozwalałaby na 14,73 kN.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma L = 4 m, przekrój kołowy d = 100 mm i siłę w środku rozpiętości. Dane: k = 150 MPa, E = 200 GPa, f_dop = L/300 = 13,33 mm. Szukamy dopuszczalnego obciążenia P_max.',
      caption: 'Znamy przekrój i materiał; szukamy największej siły, jaką belka może przenieść.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula:
        'L=4\\ \\text{m},\\quad d=100\\ \\text{mm},\\quad k=150\\ \\text{MPa},\\quad f_{dop}=13{,}33\\ \\text{mm}',
    },
    {
      title: 'Właściwości przekroju',
      narration:
        'Dla pełnego koła W = πd³/32 = π·100³/32 ≈ 98 175 mm³ oraz I = πd⁴/64 ≈ 4 908 738 mm⁴. Te dwie wielkości rozdzielają warunek wytrzymałości od warunku sztywności.',
      caption: 'W opisuje naprężenia, a I ugięcie — dlatego trzeba sprawdzić oba warunki.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        'W=\\frac{\\pi\\cdot100^3}{32}\\approx98\\,175\\ \\text{mm}^3,\\qquad I=\\frac{\\pi\\cdot100^4}{64}\\approx4\\,908\\,738\\ \\text{mm}^4',
    },
    {
      title: 'Granica wytrzymałości',
      narration:
        'Dopuszczalny moment wynosi M_dop = kW = 150·98 175 ≈ 14,73 kN·m. Dla siły w środku M_max = PL/4, więc z wytrzymałości P ≤ 4M_dop/L = 14,73 kN.',
      caption: 'Warunek naprężeń pozwala na P ≤ 14,73 kN; naprężenie osiąga wtedy k = 150 MPa.',
      visual: 'section',
      focus: { metric: 'strength' },
      formula:
        'M_{dop}=kW=150\\cdot98\\,175\\approx14{,}73\\ \\text{kN}\\cdot\\text{m},\\qquad P\\le\\frac{4M_{dop}}{L}=14{,}73\\ \\text{kN}',
    },
    {
      title: 'Granica sztywności',
      narration:
        'Z warunku f = PL³/(48EI) ≤ f_dop otrzymujemy P ≤ 48EIf_dop/L³. Po podstawieniu P ≤ 48·200 000·4 908 738·13,33/4000³ ≈ 9,82 kN.',
      caption: 'Przy P = 9,82 kN ugięcie osiąga f_dop = 13,33 mm, więc sztywność ogranicza obciążenie wcześniej.',
      visual: 'beam',
      focus: { metric: 'stiffness' },
      formula:
        'P\\le\\frac{48EIf_{dop}}{L^3}=\\frac{48\\cdot200\\,000\\cdot4\\,908\\,738\\cdot13{,}33}{4000^3}\\approx9{,}82\\ \\text{kN}',
    },
    {
      title: 'Decyduje sztywność',
      narration:
        'Wytrzymałość pozwala na 14,73 kN, ale sztywność tylko na 9,82 kN. Przyjmujemy mniejszą wartość, więc P_max ≈ 9,82 kN; przy tej sile naprężenie wynosi zaledwie około 100 MPa.',
      caption: 'P_max = min(14,73; 9,82) = 9,82 kN — o nośności decyduje ugięcie.',
      visual: 'beam',
      focus: { metric: 'governing' },
      formula: 'P_{\\max}=\\min(14{,}73,\\ 9{,}82)=9{,}82\\ \\text{kN}',
    },
    {
      title: 'Kontrola końcowa',
      narration:
        'Przy P_max = 9,82 kN reakcje wynoszą R_A = R_B = P/2 = 4,91 kN, a moment M_max = PL/4 = 9,82 kN·m. Naprężenie σ = M_max/W ≈ 100 MPa jest mniejsze od 150 MPa, natomiast ugięcie f ≈ 13,33 mm osiąga wartość dopuszczalną. O zapasie decyduje sztywność.',
      caption: 'σ = 100 MPa < 150 MPa, ale f = 13,33 mm = f_dop — wytrzymałość nie jest w pełni wykorzystana.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula:
        '\\sigma=\\frac{9{,}82\\cdot10^6}{98\\,175}\\approx100\\ \\text{MPa},\\qquad f=\\frac{P L^3}{48EI}\\approx13{,}33\\ \\text{mm}=f_{dop}',
    },
  ],
} satisfies SolutionData
