import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-full-axial',
  title: 'Pełne zadanie: pręt osiowo obciążony — przykład 1',
  duration: 7,
  given: ['L=400 mm', 'A_1=200 mm²', 'A_2=350 mm²', 'A_3=500 mm²', 'Q=10 kN', 'P=18 kN'],
  result:
    'Wszystkie naprężenia są dopuszczalne, decyduje odcinek 1 z σ_1=140 MPa. Całkowite wydłużenie wynosi około 0,455 mm i nie przekracza 0,6 mm.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DesignFullAxialAnimation }))),
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    segments: [
      { id: '1', label: '1', length: 400, area: 200, n: 28, sigma: 140, deltaL: 0.28 },
      { id: '2', label: '2', length: 400, area: 350, n: 18, sigma: 51.4, deltaL: 0.1029 },
      { id: '3', label: '3', length: 400, area: 500, n: 18, sigma: 36, deltaL: 0.072 },
    ],
    loads: [
      { node: 1, value: 10, label: 'Q = 10 kN', direction: 'down' },
      { node: 3, value: 18, label: 'P = 18 kN', direction: 'down' },
    ],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', A: 'mm²' },
    note: 'Siła Q obciąża tylko pierwszy odcinek, dlatego N_1 = 28 kN, a N_2 = N_3 = 18 kN.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt schodkowy jest utwierdzony górnym końcem. Ma trzy odcinki o długości L = 400 mm i polach A₁ = 200, A₂ = 350 i A₃ = 500 mm². Na pierwszym połączeniu działa siła Q = 10 kN, a na swobodnym końcu P = 18 kN, obie wzdłuż osi. Przyjmij E = 200 GPa, k = 160 MPa i ΔL_dop = 0,6 mm.',
      caption: 'Trzy odcinki o długości 400 mm; siła Q obciąża pierwsze połączenie, a siła P swobodny koniec.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula:
        'L=400\\ \\text{mm},\\quad A_1=200,\\ A_2=350,\\ A_3=500\\ \\text{mm}^2,\\quad Q=10\\ \\text{kN},\\quad P=18\\ \\text{kN}',
    },
    {
      title: 'Reakcja i siły normalne',
      narration:
        'Reakcja utwierdzenia wynosi R = P + Q = 28 kN. Metodą przekrojów: N₁ = 28 kN, N₂ = 18 kN i N₃ = 18 kN. Siła Q działa tylko na pierwszy odcinek, więc wykres N ma skok na pierwszym połączeniu.',
      caption: 'N₁ = 28 kN, a N₂ = N₃ = 18 kN; skok siły występuje tam, gdzie przyłożono Q.',
      visual: 'axial',
      focus: { metric: 'N', segment: '1' },
      formula: 'R=P+Q=28\\ \\text{kN},\\quad N_1=28\\ \\text{kN},\\quad N_2=N_3=18\\ \\text{kN}',
    },
    {
      title: 'Naprężenia w odcinkach',
      narration:
        'Naprężenia liczymy osobno dla każdego odcinka: σ₁ = 28 000/200 = 140 MPa, σ₂ = 18 000/350 ≈ 51,4 MPa, σ₃ = 18 000/500 = 36 MPa. Największe naprężenie występuje w odcinku 1.',
      caption: 'σ₁ = 140 MPa, σ₂ ≈ 51,4 MPa, σ₃ = 36 MPa. Odcinek 1 jest najbardziej wytężony.',
      visual: 'axial',
      focus: { metric: 'σ', segment: '1' },
      formula:
        '\\sigma_1=140\\ \\text{MPa},\\quad \\sigma_2\\approx51{,}4\\ \\text{MPa},\\quad \\sigma_3=36\\ \\text{MPa}',
    },
    {
      title: 'Wymagane pola przekroju',
      narration:
        'Z warunku σ ≤ k wynika wymagane pole A_req = N/k. Dla kolejnych odcinków: 175, 112,5 i 90 mm². Wszystkie przyjęte pola są większe od wymaganych, ale najmniejszy zapas ma odcinek 1: 200 mm² wobec 175 mm².',
      caption: 'A_req wynosi 175, 112,5 i 90 mm²; przyjęte pola 200, 350 i 500 mm² spełniają warunek.',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
      formula: 'A_{1,\\mathrm{req}}=\\frac{28\\,000}{160}=175\\ \\text{mm}^2\\le200\\ \\text{mm}^2',
    },
    {
      title: 'Wydłużenia odcinków',
      narration:
        'Wydłużenia liczymy z ΔL_i = N_iL_i/(E_iA_i). Odcinek 1 daje 0,280 mm, odcinek 2 około 0,1029 mm, a odcinek 3 — 0,072 mm. Największy udział ma odcinek 1, mimo że jego długość jest taka sama jak pozostałych.',
      caption: 'ΔL₁ = 0,280 mm, ΔL₂ ≈ 0,1029 mm, ΔL₃ = 0,072 mm; suma to około 0,455 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: '1' },
      formula: '\\Delta L_1=0{,}280,\\quad \\Delta L_2\\approx0{,}1029,\\quad \\Delta L_3=0{,}072\\ \\text{mm}',
    },
    {
      title: 'Kontrola wytrzymałości i sztywności',
      narration:
        'Całkowite wydłużenie wynosi ΔL ≈ 0,4549 mm i jest mniejsze od 0,6 mm. Naprężenie decydującego odcinka 1 wynosi 140 MPa, czyli mniej niż k = 160 MPa. Oba warunki są spełnione, a decyduje odcinek 1.',
      caption: 'σ₁ = 140 MPa ≤ 160 MPa oraz ΔL ≈ 0,4549 mm ≤ 0,6 mm — oba warunki spełnione.',
      visual: 'axial',
      focus: { metric: 'check', segment: '1' },
      formula: '\\Delta L\\approx0{,}4549\\ \\text{mm}\\le0{,}6\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
