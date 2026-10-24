import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-section-dimension-3',
  title: 'Dobór wymiaru z warunku wytrzymałości — przykład 3',
  duration: 7,
  given: ['L=2,5 m', 'd=60 mm', 'k=150 MPa'],
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SectionDimension3Animation }))),
  result:
    'Dla d = 60 mm wskaźnik wynosi około 21 206 mm³, dopuszczalny moment 3,18 kN·m, a największa siła w środku rozpiętości P ≈ 5,09 kN. Wykorzystanie 100% oznacza, że jest to granica nośności bez zapasu.',
  figure: {
    kind: 'beam',
    length: 2.5,
    supports: [
      { at: 0, label: 'A' },
      { at: 2.5, label: 'B' },
    ],
    pointLoads: [{ at: 1.25, value: 5.09, label: 'P = 5,09 kN' }],
    shear: [
      [
        [0, 2.545],
        [1.25, 2.545],
      ],
      [
        [1.25, -2.545],
        [2.5, -2.545],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1.25, 3.18],
      ],
      [
        [1.25, 3.18],
        [2.5, 0],
      ],
    ],
    markers: [
      { x: 1.25, y: 2.545, text: 'T = 2,55 kN', diagram: 'shear' },
      { x: 1.25, y: -2.545, text: 'T = -2,55 kN', diagram: 'shear' },
      { x: 1.25, y: 3.18, text: 'M = 3,18 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '2,5 m', focus: 'load', reveal: 0 },
      { label: 'd', value: '60 mm', focus: 'design', reveal: 0 },
      { label: 'k', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'W', value: '21 206 mm³', focus: 'design' },
      { label: 'M_max', value: '3,18 kN·m', focus: 'design', reveal: 1 },
      { label: 'P_max', value: '5,09 kN', focus: 'design' },
      { label: 'R_A', value: '2,55 kN', focus: 'reaction' },
      { label: 'R_B', value: '2,55 kN', focus: 'reaction' },
      { label: 'T', value: '2,55 kN', focus: 'T' },
    ],
    note: 'Przy d = 60 mm dopuszczalna siła w środku rozpiętości wynosi około 5,09 kN.',
  },
  scenes: [
    {
      title: 'Model i przekrój',
      narration:
        'Belka swobodnie podparta ma L = 2,5 m, a jej przekrój jest pełnym kołem o d = 60 mm. Naprężenie dopuszczalne wynosi k = 150 MPa. Tym razem szukamy największej siły P w środku rozpiętości.',
      caption:
        'Belka swobodnie podparta ma L = 2,5 m, a jej przekrój jest pełnym kołem o d = 60 mm. Naprężenie dopuszczalne wynosi k = 150 MPa. Tym razem szukamy największej siły P w środku rozpiętości.',
      visual: 'beam',
      focus: { metric: 'geometry' },
      formula: 'L=2{,}5\\ \\text{m},\\quad d=60\\ \\text{mm},\\quad k=150\\ \\text{MPa}',
    },
    {
      title: 'Wskaźnik przekroju',
      narration:
        'Najpierw geometria: W = πd³/32 = π·60³/32 = π·216 000/32 ≈ 21 206 mm³. Wskaźnik wytrzymałości zależy tylko od kształtu i wymiaru przekroju, nie od obciążenia.',
      caption:
        'Najpierw geometria: W = πd³/32 = π·60³/32 = π·216 000/32 ≈ 21 206 mm³. Wskaźnik wytrzymałości zależy tylko od kształtu i wymiaru przekroju, nie od obciążenia.',
      visual: 'beam',
      focus: { metric: 'section' },
      formula: 'W=\\pi\\cdot60^3/32=\\pi\\cdot216\\,000/32\\approx21\\,206\\ \\text{mm}^3',
    },
    {
      title: 'Dopuszczalny moment',
      narration:
        'Dopuszczalny moment wynosi M_max = kW = 150·21 206 = 3 180 900 N·mm ≈ 3,18 kN·m. Jest to moment, przy którym naprężenie osiąga wartość dopuszczalną.',
      caption:
        'Dopuszczalny moment wynosi M_max = kW = 150·21 206 = 3 180 900 N·mm ≈ 3,18 kN·m. Jest to moment, przy którym naprężenie osiąga wartość dopuszczalną.',
      visual: 'beam',
      focus: { metric: 'moment' },
      formula:
        'M_{\\max}=k\\,W=150\\cdot21\\,206=3\\,180\\,900\\ \\text{N}\\cdot\\text{mm}\\approx3{,}18\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Dopuszczalna siła',
      narration:
        'Z zależności M_max = PL/4 otrzymujemy P_max = 4M_max/L = 4·3,18/2,5 ≈ 5,09 kN. Przy tym obciążeniu reakcje wynoszą R_A = R_B ≈ 2,55 kN.',
      caption:
        'Z zależności M_max = PL/4 otrzymujemy P_max = 4M_max/L = 4·3,18/2,5 ≈ 5,09 kN. Przy tym obciążeniu reakcje wynoszą R_A = R_B ≈ 2,55 kN.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'P_{\\max}=\\frac{4M_{\\max}}{L}=\\frac{4\\cdot3{,}18}{2{,}5}\\approx5{,}09\\ \\text{kN}',
    },
    {
      title: 'Kontrola wykorzystania',
      narration:
        'Kontrola: σ_max = M_max/W = 3 180 900/21 206 ≈ 150 MPa = k. Przekrój jest wykorzystany w 100%, więc jest to granica nośności. W projekcie trzeba zachować zapas: zmniejszyć siłę, zwiększyć średnicę albo przyjąć niższe k.',
      caption:
        'Kontrola: σ_max = M_max/W = 3 180 900/21 206 ≈ 150 MPa = k. Przekrój jest wykorzystany w 100%, więc jest to granica nośności. W projekcie trzeba zachować zapas: zmniejszyć siłę, zwiększyć średnicę albo przyjąć niższe k.',
      visual: 'beam',
      focus: { metric: 'check' },
      formula: '\\sigma_{\\max}=\\frac{M_{\\max}}{W}=\\frac{3\\,180\\,900}{21\\,206}\\approx150\\ \\text{MPa}=k',
    },
  ],
} satisfies SolutionData
