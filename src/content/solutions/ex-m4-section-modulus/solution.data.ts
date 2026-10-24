import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m4-section-modulus',
  title: 'Wskaźnik wytrzymałości przekroju W — przykład 1',
  duration: 7,
  given: ['teownik 120 × 120 mm', 'I_x = 5,674·10⁶ mm⁴', 'c_d = 82,73 mm'],
  result:
    'W_d≈ 68,6· 10^3 mm^3, W_g≈ 152,2· 10^3 mm^3. Przy |M_x|=10 kN·m największe naprężenie wynosi około 145,8 MPa na dolnej krawędzi i około 65,7 MPa na górnej. Decyduje strona dolna.',
  figure: {
    kind: 'section',
    width: 120,
    height: 120,
    parts: [
      { x: 50, y: 0, width: 20, height: 100, label: 'środnik', tone: 'accent' },
      { x: 0, y: 100, width: 120, height: 20, label: 'półka', tone: 'light' },
    ],
    centroid: { x: 60, y: 82.73 },
    values: [
      { label: 'I_x', value: '5,674·10⁶ mm⁴', focus: 'Ix', reveal: 0 },
      { label: 'c_d', value: '82,73 mm', focus: 'centroid', reveal: 0 },
      { label: 'c_g', value: '37,27 mm', focus: 'centroid' },
    ],
    note: 'Teownik o różnych odległościach górnej i dolnej krawędzi od osi centralnej.',
  },
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SectionModulusExample1Animation }))),
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Przekrój jest teownikiem o wysokości 120 mm. Oś obojętna przechodzi przez środek ciężkości, który leży 82,73 mm nad dolną krawędzią.',
      caption: 'Oś obojętna nie leży w połowie wysokości przekroju.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'I_x=5{,}674\\cdot10^6\\ \\text{mm}^4,\\quad c_d=82{,}73\\ \\text{mm}',
    },
    {
      title: 'Odległości skrajnych włókien',
      narration:
        'Odległość dolnej krawędzi od osi wynosi c_d=82,73 mm. Odległość górnej krawędzi to c_g=120-82,73=37,27 mm.',
      caption: 'Dolna krawędź jest dalej od osi niż górna.',
      visual: 'section',
      focus: { metric: 'c' },
      formula: 'c_d=82{,}73\\ \\text{mm},\\quad c_g=120-82{,}73=37{,}27\\ \\text{mm}',
    },
    {
      title: 'Rozkład naprężeń',
      narration:
        'Naprężenie rośnie liniowo od zera na osi obojętnej. Na skrajnym włóknie osiąga największą wartość, a dolna krawędź jako dalsza od osi ma większe naprężenie niż górna.',
      caption: 'Zero na osi obojętnej, maksimum na krawędziach.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '|\\sigma|=\\frac{|M_x|\\,|y|}{I_x}',
    },
    {
      title: 'Wskaźniki obu krawędzi',
      narration:
        'Wskaźnik dla dolnej krawędzi to W_d=I_x/c_d≈68,6·10³ mm³, a dla górnej W_g=I_x/c_g≈152,2·10³ mm³. Mniejszy wskaźnik oznacza większe naprężenie przy tym samym momencie.',
      caption: 'Większa odległość c daje mniejszy wskaźnik W.',
      visual: 'section',
      focus: { metric: 'W' },
      formula:
        'W_d=\\frac{I_x}{c_d}\\approx68{,}6\\cdot10^3\\ \\text{mm}^3,\\quad W_g=\\frac{I_x}{c_g}\\approx152{,}2\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Moment i naprężenie dolnej krawędzi',
      narration:
        'Moment zamieniamy na N·mm: 10 kN·m=10·10^6 N·mm. Naprężenie na dolnej krawędzi wynosi σ_d=10·10^6/(68,6·10^3)≈145,8 MPa.',
      caption: 'Dolna krawędź decyduje o wytężeniu.',
      visual: 'section',
      focus: { metric: 'check' },
      formula: '\\sigma_d=\\frac{10\\cdot10^6}{68{,}6\\cdot10^3}\\approx145{,}8\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Naprężenie na górnej krawędzi wynosi około 65,7 MPa. Strona krytyczna to dolna krawędź, bo ma mniejsze W i większe naprężenie. Dla stali konstrukcyjnej o σ_dop=160 MPa przekrój spełnia warunek z niewielkim zapasem.',
      caption: 'O wytężeniu decyduje dolna krawędź.',
      visual: 'section',
      focus: { metric: 'result' },
      formula:
        '\\boxed{W_d\\approx68{,}6\\cdot10^3\\ \\text{mm}^3,\\quad W_g\\approx152{,}2\\cdot10^3\\ \\text{mm}^3,\\quad \\sigma_d\\approx145{,}8\\ \\text{MPa},\\quad \\sigma_g\\approx65{,}7\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
