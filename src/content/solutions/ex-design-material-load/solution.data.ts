import type { SolutionData } from '../../model'
import { MaterialLoad1Animation } from './animation'

export default {
  id: 'ex-design-material-load',
  title: 'Dobór materiału i obciążenia dopuszczalnego — przykład 1',
  duration: 7,
  given: ['A=300 mm²', 'L=1500 mm', 'E=200 GPa', 'R_e=235 MPa', 'n=1,8', 'ΔL_dop=1 mm'],
  result:
    'Obciążenie dopuszczalne wynosi około 39,2 kN i decyduje o nim wytrzymałość. Wydłużenie przy tej sile wynosi około 0,98 mm, czyli mieści się w dopuszczalnym 1 mm.',
  animation: MaterialLoad1Animation,
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    segments: [{ id: '1', label: 'pręt', length: 1500, area: 300, n: 39.167, sigma: 130.56, deltaL: 0.979 }],
    loads: [{ node: 1, value: 39.167, label: 'P_dop = 39,2 kN', direction: 'down' }],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', A: 'mm²' },
    note: 'Decyduje wytrzymałość: 39,2 kN < 40 kN dopuszczalnych ze względu na sztywność.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt o polu A = 300 mm² i długości L = 1500 mm jest wykonany ze stali o module E = 200 GPa i granicy plastyczności R_e = 235 MPa. Wymagany zapas wynosi n = 1,8, a dopuszczalne wydłużenie 1 mm. Szukamy największej siły, jaką można przyłożyć.',
      caption:
        'Model: pręt utwierdzony u góry, obciążony siłą P. Trzeba sprawdzić jednocześnie wytrzymałość i sztywność.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'A=300\\ \\text{mm}^2,\\quad L=1500\\ \\text{mm},\\quad E=200\\ \\text{GPa}',
    },
    {
      title: 'Granica materiału i naprężenie dopuszczalne',
      narration:
        'Najpierw materiał wyznacza próg naprężenia. Dzielimy granicę plastyczności przez współczynnik bezpieczeństwa: k = R_e/n = 235/1,8 ≈ 130,56 MPa. Większy zapas obniża dopuszczalne naprężenie i zmniejsza nośność pręta.',
      caption: 'Naprężenie dopuszczalne k = 130,56 MPa jest poniżej granicy R_e = 235 MPa.',
      visual: 'axial',
      focus: { metric: 'allowable' },
      formula: 'k=\\frac{R_e}{n}=\\frac{235}{1{,}8}\\approx130{,}56\\ \\text{MPa}',
    },
    {
      title: 'Nośność z warunku wytrzymałości',
      narration:
        'Przy naprężeniu dopuszczalnym 130,56 MPa pole 300 mm² przenosi P_dop,w = kA = 130,56 · 300 = 39 167 N, czyli około 39,2 kN. To pierwsza z dwóch dopuszczalnych sił.',
      caption: 'Warunek wytrzymałości daje 39,2 kN.',
      visual: 'axial',
      focus: { metric: 'strength' },
      formula: 'P_{\\mathrm{dop},w}=kA=130{,}56\\cdot300=39\\,167\\ \\text{N}\\approx39{,}2\\ \\text{kN}',
    },
    {
      title: 'Nośność z warunku sztywności',
      narration:
        'Drugi warunek pochodzi z wydłużenia. Dopuszczalna siła wynosi P_dop,Δ = EAΔL_dop/L = 200 000 · 300 · 1/1500 = 40 000 N = 40 kN. Przy tej sile pręt wydłuży się dokładnie o dopuszczalny 1 mm.',
      caption: 'Warunek sztywności daje 40,0 kN; pręt dochodzi do linii ΔL_dop = 1 mm.',
      visual: 'axial',
      focus: { metric: 'stiffness' },
      formula:
        'P_{\\mathrm{dop},\\Delta}=\\frac{EA\\Delta L_{\\mathrm{dop}}}{L}=\\frac{200\\,000\\cdot300\\cdot1}{1500}=40\\,000\\ \\text{N}=40\\ \\text{kN}',
    },
    {
      title: 'Decyzja: mniejsza z dwóch nośności',
      narration:
        'Oba warunki muszą być spełnione równocześnie, więc przyjmujemy mniejszą wartość: P_dop = min(39,2; 40) = 39,2 kN. Decyduje wytrzymałość, ale różnica jest niewielka, więc po zmianie materiału lub wymiaru trzeba przeliczyć oba warunki ponownie.',
      caption: 'Decyduje wytrzymałość: 39,2 kN < 40,0 kN ze sztywności.',
      visual: 'axial',
      focus: { metric: 'decision' },
      formula: 'P_{\\mathrm{dop}}=\\min(39{,}2;40)=39{,}2\\ \\text{kN}',
    },
    {
      title: 'Kontrola przyjętego obciążenia',
      narration:
        'Przy sile 39,2 kN rzeczywiste naprężenie wynosi σ = 39 167/300 ≈ 130,56 MPa, czyli nie przekracza k. Wydłużenie ΔL = 39 167 · 1500/(200 000 · 300) ≈ 0,979 mm jest mniejsze od 1 mm. Oba warunki są spełnione.',
      caption: 'σ = 130,56 MPa ≤ k oraz ΔL = 0,979 mm ≤ 1 mm — oba warunki spełnione.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula:
        '\\sigma=\\frac{39\\,167}{300}=130{,}56\\ \\text{MPa}\\le k,\\qquad \\Delta L=\\frac{39\\,167\\cdot1500}{200\\,000\\cdot300}=0{,}979\\ \\text{mm}\\le1\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
