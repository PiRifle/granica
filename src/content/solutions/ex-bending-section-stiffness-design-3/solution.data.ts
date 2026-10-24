import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-bending-section-stiffness-design-3',
  title: 'Dobór przekroju i kontrola sztywności — przykład 3',
  duration: 7,
  given: ['L = 3,5 m', 'P = 8 kN', 'E = 200 GPa', 'f_{dop} = 10 mm', 'b = 50 mm'],
  result:
    'czyli jest mniejsze od 10 mm. Sprawdźmy jeszcze wytrzymałość: M_max = P L/4 = 7 kN·m, W = 83,333 mm³, więc σ_max = 84 MPa, znacznie poniżej typowego σ_dop. W tym zadaniu o wymiarze decyduje sztywność, a nie wytrzymałość.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SectionStiffnessDesign3Animation }))),
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
      title: 'Model i dane',
      narration:
        'Tym razem sztywność jest znana, a szukamy wymiaru. Belka swobodnie podparta ma L = 3,5 m, siłę P = 8 kN w środku, E = 200 GPa i dopuszczalne ugięcie f_dop = 10 mm. Szerokość jest narzucona: b = 50 mm. Jaka wysokość jest potrzebna?',
      caption: 'Belka i przekrój o znanej szerokości b = 50 mm; wysokość h jest szukana.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula:
        'L = 3{,}5\\ \\text{m},\\quad P = 8\\ \\text{kN},\\quad b = 50\\ \\text{mm},\\quad f_{dop}=10\\ \\text{mm}',
    },
    {
      title: 'Wymaganie sztywności',
      narration:
        'Z warunku f = P L³/(48EI) ≤ f_dop wynika minimalny moment bezwładności I_min = P L³/(48 E f_dop) = 8000·3500³/(48·200 000·10) = 3,573·10⁶ mm⁴.',
      caption: 'Wymaganie sztywności daje I ≥ 3,573·10⁶ mm⁴.',
      visual: 'beam',
      focus: { metric: 'stiffness' },
      formula:
        'I_{\\min}=\\frac{P L^3}{48 E f_{dop}}=\\frac{8000\\cdot3500^3}{48\\cdot200\\,000\\cdot10}=3{,}573\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Wymagana wysokość',
      narration:
        'Dla prostokąta I = b h³/12, więc h ≥ ∛(12 I_min/b) = ∛(12·3,573·10⁶/50) ≈ 95,0 mm. Przyjmujemy h = 100 mm. Wtedy I = 50·100³/12 = 4,167·10⁶ mm⁴.',
      caption: 'h ≥ 95,0 mm; przyjęto h = 100 mm, więc I = 4,167·10⁶ mm⁴.',
      visual: 'beam',
      focus: { metric: 'section' },
      formula:
        'h\\ge\\sqrt[3]{\\frac{12 I_{\\min}}{b}}=\\sqrt[3]{\\frac{12\\cdot3{,}573\\cdot10^6}{50}}\\approx95{,}0\\ \\text{mm}',
    },
    {
      title: 'Kontrola ugięcia',
      narration:
        'Po przyjęciu h = 100 mm ugięcie wynosi f = 8000·3500³/(48·200 000·4,167·10⁶) = 8,57 mm. Jest mniejsze od f_dop = 10 mm, więc warunek sztywności jest spełniony.',
      caption: 'f = 8,57 mm ≤ 10 mm — wykorzystanie limitu około 86%.',
      visual: 'beam',
      focus: { metric: 'deflection' },
      formula:
        'f=\\frac{8000\\cdot3500^3}{48\\cdot200\\,000\\cdot4{,}167\\cdot10^6}=8{,}57\\ \\text{mm}\\le10\\ \\text{mm}',
    },
    {
      title: 'Kontrola naprężeń i wniosek',
      narration:
        'M_max = P L/4 = 7 kN·m, a W = 50·100²/6 = 83 333 mm³, więc σ_max = 7·10⁶/83 333 = 84 MPa. To znacznie poniżej typowego σ_dop = 160 MPa. O wymiarze decyduje sztywność: ugięcie wykorzystuje 86% limitu, a wytrzymałość tylko około 53%.',
      caption: 'σ_max = 84 MPa ≪ 160 MPa — decyduje sztywność, nie wytrzymałość.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_{\\max}=\\frac{M_{\\max}}{W}=\\frac{7\\cdot10^6}{83\\,333}=84\\ \\text{MPa}\\ll160\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
