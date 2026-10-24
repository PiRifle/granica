import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m3-strength-elasticity-plasticity-2',
  title: 'Re, Rm, sprężystość i plastyczność — przykład 2',
  duration: 7,
  given: ['R_e=235 MPa', 'R_m=370 MPa', 'S_0=120 mm²'],
  result:
    'Gdyby ta sama siła działała na próbkę o polu 60 mm^2, naprężenie wzrosłoby do 300 MPa. To już przekracza R_e, więc po odciążeniu pozostałoby odkształcenie trwałe. Element nie musiałby jeszcze pęknąć, ponieważ 300 MPa jest mniejsze od R_m=370 MPa, ale jego geometria uległaby zmianie. To klasyczny przykład stanu, w którym „jeszcze nie pękło” nie znaczy „jest bezpieczne”.',
  animation: lazy(() =>
    import('./animation').then((module) => ({ default: module.StrengthElasticityPlasticity2Animation })),
  ),
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 1000,
        area: 120,
        n: 18,
        sigma: 150,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        area: 120,
        n: 18,
        sigma: 150,
      },
    ],
    loads: [
      {
        node: 2,
        value: 18,
        label: 'N = 18 kN',
      },
    ],
    note: 'Stan roboczy: N = 18 kN, S₀ = 120 mm², σ = 150 MPa.',
  },
  scenes: [
    {
      title: 'Model próbki i dane',
      narration:
        'Przyjmijmy stal o granicy plastyczności R_e = 235 MPa i wytrzymałości R_m = 370 MPa. Próbka ma pole S₀ = 120 mm² i jest rozciągana siłą N = 18 kN. Na wykresie pokażemy, gdzie znajduje się stan roboczy względem obu granic.',
      caption: 'Najpierw ustalamy położenie stanu roboczego na krzywej materiału.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'N=18\\ \\text{kN},\\qquad S_0=120\\ \\text{mm}^2',
    },
    {
      title: 'Stan sprężysty przy σ = 150 MPa',
      narration:
        'Naprężenie wynosi σ = 18 000/120 = 150 MPa. Jest ono mniejsze od R_e = 235 MPa, więc element pozostaje w zakresie sprężystym, a odkształcenie po odciążeniu znika. Odległość do granicy plastyczności wynosi 235 − 150 = 85 MPa, czyli zapas około 36% względem R_e.',
      caption: 'Po odciążeniu próbka wraca do pierwotnej długości — ε_p = 0.',
      visual: 'axial',
      focus: { metric: 'elastic' },
      formula: '\\sigma=\\frac{18\\,000}{120}=150\\ \\text{MPa}<R_e=235\\ \\text{MPa}',
    },
    {
      title: 'Granice materiału: R_e i R_m',
      narration:
        'Granicy plastyczności odpowiada siła F_e = 235·120 = 28 200 N = 28,2 kN. Największa siła próby wynika z wytrzymałości: F_m = 370·120 = 44 400 N = 44,4 kN. Obie wartości odnosimy do tego samego pola początkowego S₀.',
      caption: 'R_e opisuje początek odkształcenia trwałego, a R_m największą siłę w próbie.',
      visual: 'axial',
      focus: { metric: 'limits' },
      formula:
        'F_e=235\\cdot120=28\\,200\\ \\text{N}=28{,}2\\ \\text{kN},\\qquad F_m=370\\cdot120=44\\,400\\ \\text{N}=44{,}4\\ \\text{kN}',
    },
    {
      title: 'Mniejsze pole — większe naprężenie',
      narration:
        'Gdyby ta sama siła 18 kN działała na próbkę o polu 60 mm², naprężenie wzrosłoby do 300 MPa. Punkt na krzywej przesuwa się wtedy powyżej R_e = 235 MPa, więc materiał zaczyna płynąć i odkształcenie staje się trwałe.',
      caption: 'Przy stałej sile zmniejszenie pola dwukrotnie podwaja naprężenie.',
      visual: 'axial',
      focus: { metric: 'area' },
      formula: '\\sigma=\\frac{18\\,000}{60}=300\\ \\text{MPa}',
    },
    {
      title: 'Odciążenie i odkształcenie trwałe',
      narration:
        'Po odciążeniu próbki od 300 MPa pozostaje odkształcenie trwałe, bo 300 MPa przekracza R_e. Element nie musiałby jeszcze pęknąć, ponieważ 300 MPa jest mniejsze od R_m = 370 MPa, ale jego geometria uległaby zmianie. To klasyczny przykład stanu, w którym „jeszcze nie pękło” nie znaczy „jest bezpieczne”.',
      caption: 'Stan 300 MPa jest plastyczny: po odciążeniu ε_p > 0, choć próbka jeszcze nie pękła.',
      visual: 'axial',
      focus: { metric: 'plastic' },
      formula: 'R_e=235\\ \\text{MPa}<300\\ \\text{MPa}<R_m=370\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
