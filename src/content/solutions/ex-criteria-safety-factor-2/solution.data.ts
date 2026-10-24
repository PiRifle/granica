import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-criteria-safety-factor-2',
  title: 'Współczynnik bezpieczeństwa: ile zapasu ma element? — przykład 2',
  duration: 7,
  given: ['A=400 mm²', 'F=50 kN', 'R_e=235 MPa', 'E=200 GPa', 'sigma=50 000', 'n=235'],
  result:
    'Taka sytuacja jest częsta w długich cięgnach, sprężynach i elementach, w których liczy się przemieszczenie. Projektant nie może poprzestać na sprawdzeniu n≥ n_wym, bo element o wystarczającym zapasie wytrzymałości może nadal być nieużyteczny z powodu zbyt dużego wydłużenia. Dopiero porównanie obu wymagań daje pełny obraz.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SafetyFactor2Animation }))),
  figure: {
    kind: 'cube',
    stresses: {
      x: 125,
      y: 0,
      z: 0,
    },
    strains: {
      x: 0.000625,
      y: -0.0001875,
      z: -0.0001875,
    },
    volumeChange: '0,025%',
    values: [
      {
        label: 'A',
        value: '400 mm²',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'F',
        value: '50 kN',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'R_e',
        value: '235 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'E',
        value: '200 GPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'σ',
        value: '125 MPa',
        focus: 'stress',
      },
      {
        label: 'n',
        value: '1,88',
        focus: 'stress',
      },
      {
        label: 'ΔL (L=1 m)',
        value: '0,625 mm',
        focus: 'strain',
      },
      {
        label: 'ΔL (L=3 m)',
        value: '1,875 mm',
        focus: 'strain',
      },
      {
        label: 'A_min',
        value: '500 mm²',
        focus: 'stress',
      },
      {
        label: 'ε_x',
        value: '625 με',
        focus: 'strain',
      },
      {
        label: 'ε_y',
        value: '−187,5 με',
        focus: 'strain',
      },
      {
        label: 'θ',
        value: '250 με',
        focus: 'volume',
      },
    ],
    note: 'Zapas wytrzymałości nie zależy od długości, ale wydłużenie rośnie proporcjonalnie do L.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt ma pole A = 400 mm² i jest obciążony siłą F = 50 kN. Wykonano go ze stali o R_e = 235 MPa i E = 200 GPa, a projekt wymaga zapasu n_wym = 1,5.',
      caption: 'A = 400 mm², F = 50 kN, R_e = 235 MPa, E = 200 GPa.',
      visual: 'cube',
      focus: {
        metric: 'model',
      },
      formula:
        'A=400\\,\\text{mm}^2,\\qquad F=50\\,\\text{kN},\\qquad R_e=235\\,\\text{MPa},\\qquad E=200\\,\\text{GPa}',
    },
    {
      title: 'Naprężenie robocze i wartość dopuszczalna',
      narration:
        'Naprężenie wynosi σ = 50 000/400 = 125 MPa. Naprężenie dopuszczalne to k = R_e/n_wym = 235/1,5 = 156,7 MPa, więc naprężenie robocze leży poniżej wartości dopuszczalnej.',
      caption: 'σ = 125 MPa < k = 156,7 MPa.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula: '\\sigma=\\frac{50\\,000}{400}=125\\,\\text{MPa},\\qquad k=\\frac{235}{1{,}5}=156{,}7\\,\\text{MPa}',
    },
    {
      title: 'Zapas jako stosunek granicy do naprężenia',
      narration:
        'Zapas rzeczywisty wynosi n = R_e/σ = 235/125 = 1,88. Granica jest więc 1,88 razy większa od naprężenia roboczego, czyli element ma zapas większy od wymaganego 1,5.',
      caption: 'R_e = 1,88·σ, czyli n = 1,88.',
      visual: 'cube',
      focus: {
        metric: 'factor',
      },
      formula: 'n=\\frac{R_e}{\\sigma}=\\frac{235}{125}=1{,}88',
    },
    {
      title: 'Sprawdzenie wytrzymałości',
      narration:
        'Warunek n ≥ n_wym jest spełniony, bo 1,88 ≥ 1,5. To rozstrzyga tylko wytrzymałość; o pracy elementu decyduje jeszcze sztywność, której ten zapas nie opisuje.',
      caption: 'n = 1,88 ≥ 1,5 — warunek wytrzymałości spełniony.',
      visual: 'cube',
      focus: {
        metric: 'check',
      },
      formula: 'n=1{,}88\\ge1{,}5,\\qquad \\sigma=125\\,\\text{MPa}<k=156{,}7\\,\\text{MPa}',
    },
    {
      title: 'Wydłużenie dla dwóch długości',
      narration:
        'Wydłużenie wynosi ΔL = FL/(EA). Dla L = 1 m otrzymujemy 0,625 mm, a dla L = 3 m aż 1,875 mm. Przy limicie 1,5 mm krótszy pręt go spełnia, a dłuższy przekracza limit.',
      caption: 'ΔL = 0,625 mm dla 1 m, ΔL = 1,875 mm dla 3 m; limit 1,5 mm.',
      visual: 'cube',
      focus: {
        metric: 'stiffness',
      },
      formula:
        '\\Delta L_1=\\frac{50\\,000\\cdot1\\,000}{200\\,000\\cdot400}=0{,}625\\,\\text{mm},\\qquad \\Delta L_3=\\frac{50\\,000\\cdot3\\,000}{200\\,000\\cdot400}=1{,}875\\,\\text{mm}',
    },
    {
      title: 'Pole wymagane przez sztywność',
      narration:
        'Przy ΔL_dop = 1,5 mm, L = 3 000 mm i F = 50 kN otrzymujemy A ≥ FL/(EΔL_dop) = 50 000·3 000/(200 000·1,5) = 500 mm². Sam warunek wytrzymałości wymagałby tylko 400 mm², więc decyduje sztywność.',
      caption: 'A_min = 500 mm² > A = 400 mm²; decyduje sztywność.',
      visual: 'cube',
      focus: {
        metric: 'area',
      },
      formula:
        'A\\ge\\frac{FL}{E\\Delta L_{dop}}=\\frac{50\\,000\\cdot3\\,000}{200\\,000\\cdot1{,}5}=500\\,\\text{mm}^2',
    },
  ],
} satisfies SolutionData
