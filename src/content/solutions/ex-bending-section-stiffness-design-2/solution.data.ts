import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-bending-section-stiffness-design-2',
  title: 'Dobór przekroju i kontrola sztywności — przykład 2',
  duration: 7,
  given: ['L = 4 m', 'q = 9 kN/m', 'sigma_{dop} = 160 MPa', 'E = 210 GPa'],
  result:
    'Ten przykład pokazuje typową iterację projektową. Nie wystarczy dobrać przekroju „na naprężenie” i zakończyć. Po każdej zmianie wymiarów trzeba przeliczyć I, W i ugięcie, ponieważ wszystkie te wielkości zmieniają się razem.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SectionStiffnessDesign2Animation }))),
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    distributed: [{ from: 0, to: 4, start: 9, end: 9, label: 'q = 9 kN/m' }],
    shear: [
      [
        [0, 18],
        [2, 0],
        [4, -18],
      ],
    ],
    moment: [
      [
        [0, 0],
        [0.5, 7.875],
        [1, 13.5],
        [1.5, 16.875],
        [2, 18],
        [2.5, 16.875],
        [3, 13.5],
        [3.5, 7.875],
        [4, 0],
      ],
    ],
    markers: [
      { x: 2, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2, y: 18, text: 'M = 18 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'q', value: '9,0 kN/m', focus: 'load' },
      { label: 'R_A', value: '18,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '18,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '18,0 kN·m', focus: 'M' },
      { label: 'W_min', value: '112 500 mm³', focus: 'design' },
      { label: 'W', value: '144 000 mm³', focus: 'design' },
      { label: 'σ_max', value: '125 MPa', focus: 'design' },
      { label: 'f', value: '16,53 mm', focus: 'design' },
      { label: 'f_dop', value: '16 mm', focus: 'design' },
    ],
    note: 'Warunek sztywności decyduje o wymiarze: po zwiększeniu h do 140 mm ugięcie spada do około 10,4 mm.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma L = 4 m i jest obciążona równomiernie q = 9 kN/m. Przyjmujemy σ_dop = 160 MPa, E = 210 GPa i f_dop = L/250 = 16 mm. Wstępnie rozważamy prostokąt b = 60 mm, h = 120 mm.',
      caption: 'Belka, obciążenie ciągłe i wstępny przekrój 60 × 120 mm.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula: 'L = 4\\ \\text{m},\\quad q = 9\\ \\text{kN/m},\\quad b\\times h = 60\\times120\\ \\text{mm}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'Maksymalny moment wynosi M_max = q L²/8 = 9·4²/8 = 18 kN·m. Wymagany wskaźnik to W_min = 18·10⁶/160 = 112 500 mm³. Przyjęty przekrój 60 × 120 mm ma W = 144 000 mm³, a naprężenie σ_max = 18·10⁶/144 000 = 125 MPa. Warunek wytrzymałości jest spełniony.',
      caption: 'W_min = 112 500 mm³ < W = 144 000 mm³ — wytrzymałość spełniona.',
      visual: 'beam',
      focus: { metric: 'strength' },
      formula: 'W_{\\min}=\\frac{M_{\\max}}{\\sigma_{dop}}=\\frac{18\\cdot10^6}{160}=112\\,500\\ \\text{mm}^3',
    },
    {
      title: 'Warunek sztywności',
      narration:
        'Dla obciążenia równomiernego f = 5qL⁴/(384EI). Przekrój 60 × 120 mm ma I = 60·120³/12 = 8,64·10⁶ mm⁴, więc f = 16,53 mm. To więcej niż f_dop = 16 mm, mimo że naprężenie jest bezpieczne. Warunek sztywności nie jest spełniony.',
      caption: 'f = 16,53 mm > f_dop = 16 mm — o wymiarze musi decydować sztywność.',
      visual: 'beam',
      focus: { metric: 'stiffness' },
      formula:
        'f=\\frac{5qL^4}{384EI}=\\frac{5\\cdot9\\cdot4000^4}{384\\cdot210\\,000\\cdot8{,}64\\cdot10^6}=16{,}53\\ \\text{mm}>16\\ \\text{mm}',
    },
    {
      title: 'Iteracja — zwiększamy wysokość',
      narration:
        'Zwiększamy wysokość z 120 do 140 mm, pozostawiając b = 60 mm. Moment bezwładności rośnie z 8,64·10⁶ do 13,72·10⁶ mm⁴, a ugięcie spada do około 10,4 mm. W rośnie do 196 000 mm³, więc wytrzymałość pozostaje zachowana.',
      caption: 'Wzrost h z 120 do 140 mm zmniejsza ugięcie z 16,53 do około 10,4 mm.',
      visual: 'beam',
      focus: { metric: 'iteration' },
      formula:
        'h: 120\\ \\text{mm}\\to140\\ \\text{mm},\\qquad I: 8{,}64\\cdot10^6\\to13{,}72\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Kontrola naprężeń',
      narration:
        'Dla przekroju 60 × 140 mm wskaźnik wynosi W = 60·140²/6 = 196 000 mm³. Naprężenie σ_max = 18·10⁶/196 000 = 91,8 MPa jest znacznie mniejsze od σ_dop = 160 MPa.',
      caption: 'σ_max = 91,8 MPa ≤ 160 MPa — duży zapas wytrzymałości.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: '\\sigma_{\\max}=\\frac{18\\cdot10^6}{196\\,000}=91{,}8\\ \\text{MPa}\\le160\\ \\text{MPa}',
    },
    {
      title: 'Kontrola ugięcia',
      narration:
        'Po zwiększeniu wysokości ugięcie wynosi f = 5·9·4000⁴/(384·210 000·13,72·10⁶) ≈ 10,4 mm. Jest mniejsze od f_dop = 16 mm, więc dopiero teraz oba warunki są spełnione.',
      caption: 'f ≈ 10,4 mm ≤ 16 mm — warunek sztywności spełniony z zapasem około 35%.',
      visual: 'beam',
      focus: { metric: 'deflection' },
      formula:
        'f=\\frac{5\\cdot9\\cdot4000^4}{384\\cdot210\\,000\\cdot13{,}72\\cdot10^6}\\approx10{,}4\\ \\text{mm}\\le16\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
