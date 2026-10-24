import type { SolutionData } from '../../model'
import { DesignFullAxial3Animation } from './animation'

export default {
  id: 'ex-design-full-axial-3',
  title: 'Pełne zadanie: pręt osiowo obciążony — przykład 3',
  duration: 7,
  given: ['L=400 mm', 'A_1=200 mm²', 'A_2=350 mm²', 'A_3=500 mm²', 'Q=10 kN', 'k=150 MPa'],
  result:
    'Decyduje odcinek 1: P_max = 20 kN. Przy tej sile σ₁ = 150 MPa, a całkowite wydłużenie wynosi 0,4943 mm i jest mniejsze od 0,5 mm.',
  animation: DesignFullAxial3Animation,
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    segments: [
      { id: '1', label: '1', length: 400, area: 200, n: 30, sigma: 150, deltaL: 0.3 },
      { id: '2', label: '2', length: 400, area: 350, n: 20, sigma: 57.14, deltaL: 0.1143 },
      { id: '3', label: '3', length: 400, area: 500, n: 20, sigma: 40, deltaL: 0.08 },
    ],
    loads: [
      { node: 1, value: 10, label: 'Q = 10 kN', direction: 'down' },
      { node: 3, value: 20, label: 'P = 20 kN', direction: 'down' },
    ],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', A: 'mm²' },
    note: 'Decyduje odcinek 1: P_max = 20 kN, a całkowite wydłużenie 0,4943 mm jest mniejsze od 0,5 mm.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wracamy do geometrii z laboratorium: L = 400 mm, A₁ = 200, A₂ = 350, A₃ = 500 mm² oraz Q = 10 kN. Tym razem szukamy największej siły P, jaką można przyłożyć, jeśli k = 150 MPa i ΔL_dop = 0,5 mm.',
      caption: 'Geometria i siła Q są dane; szukamy największego dopuszczalnego P.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'L=400\\ \\text{mm},\\quad A_1=200,\\ A_2=350,\\ A_3=500\\ \\text{mm}^2,\\quad Q=10\\ \\text{kN}',
    },
    {
      title: 'Siły normalne zależne od P',
      narration:
        'Siły normalne wynoszą N₁ = P + 10, N₂ = P i N₃ = P (w kN). Siła Q dodaje się wyłącznie w pierwszym odcinku, dlatego właśnie tam siła normalna jest największa.',
      caption: 'N₁ = P + 10, a N₂ = N₃ = P; Q zwiększa siłę tylko przed pierwszym połączeniem.',
      visual: 'axial',
      focus: { metric: 'N', segment: '1' },
      formula: 'N_1=P+10,\\quad N_2=N_3=P',
    },
    {
      title: 'Granice dopuszczalnego P',
      narration:
        'Z warunku wytrzymałości każdego odcinka otrzymujemy osobne ograniczenie. Odcinek 1: (P + 10)·1000/200 ≤ 150, czyli P ≤ 20 kN. Odcinek 2 daje P ≤ 52,5 kN, a odcinek 3 — P ≤ 75 kN. Decyduje najmniejsza wartość.',
      caption: 'Ograniczenia wynoszą 20, 52,5 i 75 kN; najmniejsze P = 20 kN pochodzi z odcinka 1.',
      visual: 'axial',
      focus: { metric: 'limit', segment: '1' },
      formula: 'P+10\\le\\frac{150\\cdot200}{1000}=30\\ \\text{kN}\\Rightarrow P\\le20\\ \\text{kN}',
    },
    {
      title: 'Wymagane pola przy P_max',
      narration:
        'Przy P = 20 kN siły wynoszą N₁ = 30 kN oraz N₂ = N₃ = 20 kN. Wymagane pola to A_req = N/k, czyli 200, 133,3 i 133,3 mm². Odcinek 1 jest na granicy: jego pole 200 mm² jest równe wymaganemu.',
      caption: 'A_req₁ = 200 mm² = A₁, dlatego odcinek 1 decyduje o wartości P_max.',
      visual: 'axial',
      focus: { metric: 'A', segment: '1' },
      formula: 'A_{1,\\mathrm{req}}=\\frac{30\\,000}{150}=200\\ \\text{mm}^2=A_1',
    },
    {
      title: 'Kontrola wydłużenia',
      narration:
        'Przy P = 20 kN wydłużenia odcinków wynoszą 0,300, 0,1143 i 0,080 mm. Suma daje 0,4943 mm, czyli nieco mniej niż ΔL_dop = 0,5 mm. Warunek sztywności jest spełniony, ale zapas jest mały.',
      caption: 'ΔL = 0,300 + 0,1143 + 0,080 = 0,4943 mm ≤ 0,5 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL', segment: '3' },
      formula: '\\Delta L=0{,}300+0{,}1143+0{,}080=0{,}4943\\ \\text{mm}',
    },
    {
      title: 'Kontrola końcowa',
      narration:
        'Przy P_max = 20 kN naprężenie w odcinku 1 wynosi dokładnie 150 MPa, czyli osiąga wartość dopuszczalną. Wydłużenie 0,4943 mm jest bliskie 0,5 mm, ale go nie przekracza. Oba warunki są spełnione, a o wartości P decyduje wytrzymałość odcinka 1.',
      caption: 'σ₁ = 150 MPa ≤ k oraz ΔL = 0,4943 mm ≤ 0,5 mm; decyduje odcinek 1.',
      visual: 'axial',
      focus: { metric: 'check', segment: '1' },
      formula:
        '\\sigma_1=150\\ \\text{MPa}\\le150\\ \\text{MPa},\\quad \\Delta L=0{,}4943\\ \\text{mm}\\le0{,}5\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
