import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-full-axial-2',
  title: 'Pełne zadanie: pręt osiowo obciążony — przykład 2',
  duration: 7,
  given: ['L_1=300 mm', 'A_1=400 mm²', 'L_2=500 mm', 'A_2=200 mm²', 'P=20 kN', 'Q=25 kN'],
  result:
    'Odcinek 1 jest ściskany (σ₁ = −12,5 MPa), a odcinek 2 rozciągany (σ₂ = 100 MPa). Wydłużenie netto wynosi około 0,231 mm, bo skrócenie odcinka 1 zmniejsza sumę.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DesignFullAxial2Animation }))),
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    segments: [
      { id: '1', label: '1', length: 300, area: 400, n: -5, sigma: -12.5, deltaL: -0.01875 },
      { id: '2', label: '2', length: 500, area: 200, n: 20, sigma: 100, deltaL: 0.25 },
    ],
    loads: [
      { node: 1, value: 25, label: 'Q = 25 kN', direction: 'up' },
      { node: 2, value: 20, label: 'P = 20 kN', direction: 'down' },
    ],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', A: 'mm²' },
    note: 'Odcinek 1 jest ściskany, a odcinek 2 rozciągany; decyduje naprężenie w cieńszym odcinku 2.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt dwuodcinkowy jest utwierdzony górnym końcem. Odcinek 1 ma L₁ = 300 mm i A₁ = 400 mm², a odcinek 2 — L₂ = 500 mm i A₂ = 200 mm². Na swobodnym końcu działa siła P = 20 kN w dół, a na połączeniu siła Q = 25 kN w górę. Przyjmij E = 200 GPa.',
      caption: 'P rozciąga dolny odcinek, a Q działa przeciwnie i ściska górny odcinek.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula:
        'L_1=300\\ \\text{mm},\\quad A_1=400\\ \\text{mm}^2,\\quad L_2=500\\ \\text{mm},\\quad A_2=200\\ \\text{mm}^2',
    },
    {
      title: 'Reakcja i siły normalne',
      narration:
        'Z równowagi całego pręta: R − 25 + 20 = 0, więc R = 5 kN w dół. Siła normalna w odcinku 2, liczona od swobodnego końca, wynosi N₂ = 20 kN (rozciąganie). W odcinku 1 siła Q przewyższa P, dlatego N₁ = −5 kN (ściskanie).',
      caption: 'N₁ = −5 kN (ściskanie), N₂ = +20 kN (rozciąganie); na połączeniu następuje skok 25 kN.',
      visual: 'axial',
      focus: { metric: 'N', segment: '2' },
      formula: 'R-25+20=0\\Rightarrow R=5\\ \\text{kN},\\quad N_1=-5\\ \\text{kN},\\quad N_2=20\\ \\text{kN}',
    },
    {
      title: 'Naprężenia i decydujący odcinek',
      narration:
        'Naprężenia wynoszą σ₁ = −5000/400 = −12,5 MPa oraz σ₂ = 20 000/200 = 100 MPa. Odcinek 2 ma większą siłę bezwzględną i mniejsze pole, więc jest bardziej wytężony. Odcinek 1 jest ściskany, dlatego jego naprężenie ma znak ujemny; do warunku wytrzymałości bierzemy wartość bezwzględną.',
      caption: 'σ₁ = −12,5 MPa, σ₂ = 100 MPa; decyduje odcinek 2, a znak naprężenia informuje o ściskaniu.',
      visual: 'axial',
      focus: { metric: 'σ', segment: '2' },
      formula:
        '\\sigma_1=-\\frac{5\\,000}{400}=-12{,}5\\ \\text{MPa},\\quad \\sigma_2=\\frac{20\\,000}{200}=100\\ \\text{MPa}',
    },
    {
      title: 'Wydłużenia i skrócenie',
      narration:
        'Wydłużenie odcinka 1 jest ujemne: ΔL₁ = −5000·300/(200 000·400) = −0,01875 mm. Odcinek 2 wydłuża się o ΔL₂ = 20 000·500/(200 000·200) = 0,25 mm. Suma z zachowaniem znaków daje około 0,231 mm.',
      caption: 'ΔL₁ = −0,01875 mm, ΔL₂ = 0,25 mm; suma ze znakami to około 0,231 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: '2' },
      formula:
        '\\Delta L_1=-0{,}01875\\ \\text{mm},\\quad \\Delta L_2=0{,}25\\ \\text{mm},\\quad \\Delta L\\approx0{,}231\\ \\text{mm}',
    },
    {
      title: 'Bilans znaków i wniosek',
      narration:
        'Największe naprężenie bezwzględne, 100 MPa, występuje w odcinku 2. Cały pręt wydłuża się netto o około 0,231 mm, ponieważ skrócenie odcinka 1 zmniejsza sumę. Sumowanie wartości bezwzględnych dałoby 0,269 mm, czyli wynik zawyżony. Znak odcinka ściskanego jest częścią rozwiązania.',
      caption: '|σ|max = 100 MPa w odcinku 2; ΔL ≈ 0,231 mm, a suma wartości bezwzględnych 0,269 mm jest błędna.',
      visual: 'axial',
      focus: { metric: 'check', segment: '2' },
      formula: '|\\sigma|_{\\max}=100\\ \\text{MPa},\\quad \\Delta L\\approx0{,}231\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
