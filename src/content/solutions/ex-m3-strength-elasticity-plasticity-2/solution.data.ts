import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-strength-elasticity-plasticity-2',
  title: 'Re, Rm, sprężystość i plastyczność — przykład 2',
  duration: 7,
  given: ['R_e=235 MPa', 'R_m=370 MPa', 'S_0=120 mm^2'],
  result:
    'Gdyby ta sama siła działała na próbkę o polu 60 mm^2, naprężenie wzrosłoby do 300 MPa. To już przekracza R_e, więc po odciążeniu pozostałoby odkształcenie trwałe. Element nie musiałby jeszcze pęknąć, ponieważ 300 MPa jest mniejsze od R_m=370 MPa, ale jego geometria uległaby zmianie. To klasyczny przykład stanu, w którym „jeszcze nie pękło” nie znaczy „jest bezpieczne”.',
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
      title: 'Krok 1',
      narration:
        'Przyjmijmy teraz stal o R_e=235 MPa i R_m=370 MPa, próbkę o polu S_0=120 mm^2. Siły graniczne wynoszą',
      caption: 'Przyjmijmy teraz stal o R_e=235 MPa i R_m=370 MPa, próbkę o polu S_0=120 mm^2. Siły graniczne wynoszą',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'R_{e} = 235 MPa',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'F_e=235· 120=28 200 N=28,2 kN,',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'F_e=235\\cdot 120=28\\,200\\ \\text{N}=28{,}2\\ \\text{kN},',
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'F_m=370· 120=44 400 N=44,4 kN.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'F_m=370\\cdot 120=44\\,400\\ \\text{N}=44{,}4\\ \\text{kN}.',
    },
    {
      title: 'Krok 4',
      narration: 'Załóżmy, że element pracuje pod siłą N=18 kN. Naprężenie wynosi',
      caption: 'Załóżmy, że element pracuje pod siłą N=18 kN. Naprężenie wynosi',
      visual: 'thermal',
      focus: { metric: 'N' },
      formula: 'N = 18 kN',
    },
    {
      title: 'Krok 5',
      narration: 'Zapis matematyczny.',
      caption: 'σ=(18 000)/(120)=150 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma=\\frac{18\\,000}{120}=150\\ \\text{MPa}.',
    },
    {
      title: 'Krok 6',
      narration:
        'Jest ono mniejsze od R_e=235 MPa, więc element pozostaje w zakresie sprężystym, a odkształcenie po odciążeniu zniknie. Odległość do granicy plastyczności wynosi 235-150=85 MPa, czyli zapas naprężeniowy około 36% względem R_e.',
      caption:
        'Jest ono mniejsze od R_e=235 MPa, więc element pozostaje w zakresie sprężystym, a odkształcenie po odciążeniu zniknie. Odległość…',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'R_{e} = 235 MPa',
    },
    {
      title: 'Krok 7',
      narration:
        'Gdyby ta sama siła działała na próbkę o polu 60 mm^2, naprężenie wzrosłoby do 300 MPa. To już przekracza R_e, więc po odciążeniu pozostałoby odkształcenie trwałe. Element nie musiałby jeszcze pęknąć, ponieważ 300 MPa jest mniejsze od R_m=370 MPa, ale jego geometria uległaby zmianie. To klasyczny przykład stanu, w którym „jeszcze nie pękło” nie znaczy „jest bezpieczne”.',
      caption:
        'Gdyby ta sama siła działała na próbkę o polu 60 mm^2, naprężenie wzrosłoby do 300 MPa. To już przekracza R_e, więc po odciążeniu…',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: 'R_{m} = 370 MPa',
    },
  ],
} satisfies SolutionData
