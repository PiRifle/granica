import type { SolutionData } from '../../model'
import { AxialStrengthCondition3Animation } from './animation'

export default {
  id: 'ex-axial-strength-condition-3',
  title: 'Warunek wytrzymałości i zapas bezpieczeństwa — przykład 3',
  duration: 7,
  given: ['A=500 mm²', 'R_e=235 MPa', 'n=2,5'],
  result:
    'Dla A = 500 mm² i n = 2,5 naprężenie dopuszczalne wynosi 94 MPa, więc Nmax = 47 kN. Przy n = 1,5 ten sam przekrój przenosi 78,3 kN. W wariancie odwrotnym dla N = 60 kN i n = 2 przyjęto A = 550 mm², gdzie σ = 109,1 MPa i nrz = 2,15 ≥ 2.',
  animation: AxialStrengthCondition3Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Mamy gotowy pręt o polu A = 500 mm² ze stali Re = 235 MPa. Wymagany współczynnik bezpieczeństwa wynosi n = 2,5, a szukamy maksymalnej dopuszczalnej siły. Na rysunku siła jest jeszcze nieznana.',
      caption: 'Pręt o stałym polu A = 500 mm²; szukamy Nmax dla n = 2,5.',
      visual: 'axial',
      focus: {
        metric: 'model',
      },
      formula: 'A=500\\ \\text{mm}^2,\\qquad R_e=235\\ \\text{MPa},\\qquad n=2{,}5',
    },
    {
      title: 'Naprężenie dopuszczalne i nośność',
      narration:
        'Naprężenie dopuszczalne wynosi σdop = Re/n = 235/2,5 = 94 MPa. Maksymalna siła to Nmax = σdop·A = 94·500 = 47 000 N, czyli 47 kN. Strzałka siły rośnie do tej wartości.',
      caption: 'σdop = 94 MPa, więc Nmax = 47 kN.',
      visual: 'axial',
      focus: {
        metric: 'capacity',
      },
      formula:
        '\\sigma_{\\mathrm{dop}}=\\frac{235}{2{,}5}=94\\ \\text{MPa},\\qquad N_{\\max}=94\\cdot500=47\\,000\\ \\text{N}=47\\ \\text{kN}',
    },
    {
      title: 'Wpływ współczynnika n',
      narration:
        'Zmniejszenie wymaganego zapasu z 2,5 do 1,5 podnosi naprężenie dopuszczalne do 156,7 MPa i nośność do 78,3 kN. Współczynnik bezpieczeństwa nie jest dodatkiem do wyniku, lecz bezpośrednio zmienia dopuszczalne obciążenie.',
      caption: 'Przy n = 1,5 ten sam przekrój przenosi 78,3 kN zamiast 47 kN.',
      visual: 'axial',
      focus: {
        metric: 'influence',
      },
      formula: 'n=2{,}5\\rightarrow1{,}5,\\qquad N_{\\max}=47\\ \\text{kN}\\rightarrow78{,}3\\ \\text{kN}',
    },
    {
      title: 'Wariant odwrotny: dobór pola',
      narration:
        'Dla siły 60 kN i wymaganego zapasu n = 2 naprężenie dopuszczalne wynosi 117,5 MPa. Potrzebne pole to Amin = 60 000/117,5 = 510,6 mm²; przyjmujemy A = 550 mm².',
      caption: 'Amin = 510,6 mm², przyjęto A = 550 mm².',
      visual: 'axial',
      focus: {
        metric: 'area',
      },
      formula:
        '\\sigma_{\\mathrm{dop}}=\\frac{235}{2}=117{,}5\\ \\text{MPa},\\qquad A_{\\min}=\\frac{60\\,000}{117{,}5}=510{,}6\\ \\text{mm}^2',
    },
    {
      title: 'Sprawdzenie przyjętego przekroju',
      narration:
        'Dla A = 550 mm² rzeczywiste naprężenie wynosi σ = 60 000/550 = 109,1 MPa, czyli jest mniejsze od 117,5 MPa. Rzeczywisty zapas nrz = 235/109,1 = 2,15 jest większy od wymaganego 2. Przyjęty przekrój spełnia warunek.',
      caption: 'σ = 109,1 MPa < σdop = 117,5 MPa oraz nrz = 2,15 ≥ 2.',
      visual: 'axial',
      focus: {
        metric: 'check',
      },
      formula:
        '\\sigma=\\frac{60\\,000}{550}=109{,}1\\ \\text{MPa},\\qquad n_{\\mathrm{rz}}=\\frac{235}{109{,}1}=2{,}15\\ge2',
    },
  ],
} satisfies SolutionData
