import type { SolutionData } from '../../model'
import { SectionStiffnessDesign1Animation } from './animation'

export default {
  id: 'ex-bending-section-stiffness-design',
  title: 'Dobór przekroju i kontrola sztywności — przykład 1',
  duration: 7,
  given: ['L = 4 m', 'P = 10 kN', 'E = 210 GPa', 'sigma_{dop} = 160 MPa', 'b = 50 mm', 'h = 100 mm'],
  result:
    'Przekrój 50 × 100 mm spełnia oba warunki: σ_max = 120 MPa oraz f_max = 15,24 mm. Zapas sztywności jest niewielki, więc każdy wzrost obciążenia lub rozpiętości wymaga ponownego sprawdzenia ugięcia.',
  animation: SectionStiffnessDesign1Animation,
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 10, label: 'P = 10 kN' }],
    shear: [
      [
        [0, 5],
        [2, 5],
      ],
      [
        [2, -5],
        [4, -5],
      ],
    ],
    moment: [
      [
        [0, 0],
        [2, 10],
      ],
      [
        [2, 10],
        [4, 0],
      ],
    ],
    markers: [
      { x: 2, y: 5, text: 'T = 5 kN', diagram: 'shear' },
      { x: 2, y: -5, text: 'T = -5 kN', diagram: 'shear' },
      { x: 2, y: 10, text: 'M = 10 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '10,0 kN', focus: 'load' },
      { label: 'R_A', value: '5,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '5,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '10,0 kN·m', focus: 'M' },
      { label: 'W_min', value: '62 500 mm³', focus: 'design' },
      { label: 'I_min', value: '3,968·10⁶ mm⁴', focus: 'design' },
      { label: 'W', value: '83 333 mm³', focus: 'design' },
      { label: 'I', value: '4,167·10⁶ mm⁴', focus: 'design' },
      { label: 'σ_max', value: '120 MPa', focus: 'design' },
      { label: 'f_max', value: '15,24 mm', focus: 'design' },
      { label: 'T', value: '5,0 kN', focus: 'T' },
    ],
    note: 'Przekrój 50 × 100 mm spełnia warunek naprężeń i ugięcia; siła tnąca wynosi T = 5 kN.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma L = 4 m i siłę P = 10 kN w środku. Przyjmujemy E = 210 GPa, σ_dop = 160 MPa oraz f_dop = L/250 = 16 mm. Rozważamy prostokąt b = 50 mm, h = 100 mm.',
      caption: 'Belka, obciążenie i przekrój 50 × 100 mm — dwa niezależne warunki projektowe.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula: 'L = 4\\ \\text{m},\\quad P = 10\\ \\text{kN},\\quad b\\times h = 50\\times100\\ \\text{mm}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'Maksymalny moment wynosi M_max = P L/4 = 10 · 4/4 = 10 kN·m. Warunek σ_max ≤ σ_dop wymaga W ≥ W_min = M_max/σ_dop = 10·10⁶/160 = 62 500 mm³. Przekrój ma W = b h²/6 = 83 333 mm³, więc warunek jest spełniony.',
      caption: 'W_min = 62 500 mm³ < W = 83 333 mm³ — zapas wytrzymałości około 33%.',
      visual: 'beam',
      focus: { metric: 'strength' },
      formula: 'W_{\\min}=\\frac{M_{\\max}}{\\sigma_{dop}}=\\frac{10\\cdot10^6}{160}=62\\,500\\ \\text{mm}^3',
    },
    {
      title: 'Warunek sztywności',
      narration:
        'Ugięcie f = P L³/(48 E I) nie może przekroczyć f_dop. Stąd I ≥ I_min = P L³/(48 E f_dop) = 10 000·4000³/(48·210 000·16) = 3,968·10⁶ mm⁴. Przekrój ma I = b h³/12 = 4,167·10⁶ mm⁴.',
      caption: 'I_min = 3,968·10⁶ mm⁴ < I = 4,167·10⁶ mm⁴ — zapas sztywności tylko około 5%.',
      visual: 'beam',
      focus: { metric: 'stiffness' },
      formula:
        'I_{\\min}=\\frac{P L^3}{48 E f_{dop}}=\\frac{10\\,000\\cdot4000^3}{48\\cdot210\\,000\\cdot16}=3{,}968\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Decyduje sztywność',
      narration:
        'Oba warunki są spełnione, ale ich wykorzystanie jest różne. Naprężenie osiąga 120/160 = 75% wartości dopuszczalnej, a ugięcie 15,24/16 = 95%. O wymiarze decyduje więc sztywność, a zapas nośności pozostaje duży.',
      caption: 'Naprężenie wykorzystane w 75%, ugięcie w 95% — decyduje sztywność.',
      visual: 'beam',
      focus: { metric: 'governing' },
      formula: '\\frac{\\sigma_{\\max}}{\\sigma_{dop}}=0{,}75,\\qquad \\frac{f_{\\max}}{f_{dop}}=0{,}95',
    },
    {
      title: 'Kontrola naprężeń',
      narration:
        'Naprężenie maksymalne wynosi σ_max = M_max/W = 10·10⁶/83 333 = 120 MPa. Jest mniejsze od σ_dop = 160 MPa, więc warunek wytrzymałości jest spełniony.',
      caption: 'σ_max = 120 MPa ≤ 160 MPa — warunek wytrzymałości spełniony.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: '\\sigma_{\\max}=\\frac{10\\cdot10^6}{83\\,333}=120\\ \\text{MPa}\\le160\\ \\text{MPa}',
    },
    {
      title: 'Kontrola ugięcia',
      narration:
        'Rzeczywiste ugięcie wynosi f = 10 000·4000³/(48·210 000·4,167·10⁶) = 15,24 mm. Jest mniejsze od f_dop = 16 mm, więc warunek sztywności jest spełniony, choć zapas jest niewielki.',
      caption: 'f_max = 15,24 mm ≤ 16 mm — zapas 0,76 mm.',
      visual: 'beam',
      focus: { metric: 'deflection' },
      formula:
        'f=\\frac{10\\,000\\cdot4000^3}{48\\cdot210\\,000\\cdot4{,}167\\cdot10^6}=15{,}24\\ \\text{mm}\\le16\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
