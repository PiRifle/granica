import type { SolutionData } from '../../model'
import { AllowableSafetyFactor3Animation } from './animation'

export default {
  id: 'ex-m3-allowable-safety-factor-3',
  title: 'Naprężenie dopuszczalne i współczynnik bezpieczeństwa — przykład 3',
  duration: 7,
  given: ['A=500 mm²', 'R_e=235 MPa', 'n=2'],
  result:
    'Dla A = 500 mm² i n = 2 naprężenie dopuszczalne wynosi 117,5 MPa, więc N_max = 58,75 kN. Przy sile 50 kN mamy σ = 100 MPa i n_rz = 2,35, a przy 70 kN σ = 140 MPa i n_rz ≈ 1,68, czyli zapas jest za mały. Po zwiększeniu n do 2,5 nośność spada do 47 kN.',
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
        area: 500,
        n: 58.75,
        sigma: 117.5,
      },
    ],
    loads: [
      {
        node: 1,
        value: 58.75,
        label: 'N_max = 58,75 kN',
      },
    ],
    note: 'Dla n = 2: σ_dop = 117,5 MPa i N_max = 58,75 kN.',
  },
  animation: AllowableSafetyFactor3Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Mamy istniejący pręt o polu A = 500 mm² ze stali R_e = 235 MPa. Wymagany współczynnik bezpieczeństwa wynosi n = 2, a szukamy maksymalnej siły roboczej. Na rysunku siła jest jeszcze nieznana.',
      caption: 'Pręt o stałym polu A = 500 mm²; szukamy N_max dla n = 2.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'A=500\\ \\text{mm}^2,\\qquad R_e=235\\ \\text{MPa},\\qquad n=2',
    },
    {
      title: 'Naprężenie dopuszczalne',
      narration:
        'Naprężenie dopuszczalne wyznaczamy jak zwykle: σ_dop = R_e/n = 235/2 = 117,5 MPa. Dopiero ta wartość, a nie sama granica R_e, ogranicza siłę w pręcie.',
      caption: 'σ_dop = 117,5 MPa, czyli połowa granicy plastyczności.',
      visual: 'axial',
      focus: { metric: 'allowable' },
      formula: '\\sigma_{\\mathrm{dop}}=\\frac{235}{2}=117{,}5\\ \\text{MPa}',
    },
    {
      title: 'Maksymalna siła robocza',
      narration:
        'Maksymalna siła wynosi N_max = σ_dop·A = 117,5·500 = 58 750 N, czyli 58,75 kN. Przy tej sile naprężenie osiąga dokładnie σ_dop, więc wykorzystanie przekroju wynosi 100%.',
      caption: 'N_max = 58,75 kN odpowiada σ = σ_dop = 117,5 MPa.',
      visual: 'axial',
      focus: { metric: 'capacity' },
      formula: 'N_{\\max}=\\sigma_{\\mathrm{dop}}A=117{,}5\\cdot500=58\\,750\\ \\text{N}\\approx58{,}75\\ \\text{kN}',
    },
    {
      title: 'Kontrola przy 50 kN',
      narration:
        'Przy sile 50 kN naprężenie wynosi σ = 50 000/500 = 100 MPa, a rzeczywisty współczynnik n_rz = 235/100 = 2,35. Element ma zapas większy od wymaganego, a wykorzystanie przekroju wynosi około 85%.',
      caption: 'σ = 100 MPa < σ_dop = 117,5 MPa oraz n_rz = 2,35 ≥ 2.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula: '\\sigma=\\frac{50\\,000}{500}=100\\ \\text{MPa},\\qquad n_{\\mathrm{rz}}=\\frac{235}{100}=2{,}35\\ge2',
    },
    {
      title: 'Przeciążenie 70 kN',
      narration:
        'Przy sile 70 kN naprężenie rośnie do σ = 140 MPa, a n_rz = 235/140 ≈ 1,68. Warunek n_rz ≥ 2 nie jest spełniony, mimo że naprężenie jest jeszcze mniejsze od R_e = 235 MPa. Element nie uległby natychmiastowemu zniszczeniu, ale nie spełnia przyjętego kryterium bezpieczeństwa.',
      caption: 'σ = 140 MPa < R_e, ale σ > σ_dop i n_rz = 1,68 < 2.',
      visual: 'axial',
      focus: { metric: 'overload' },
      formula:
        '\\sigma=\\frac{70\\,000}{500}=140\\ \\text{MPa}>117{,}5\\ \\text{MPa},\\qquad n_{\\mathrm{rz}}\\approx1{,}68<2',
    },
    {
      title: 'Wpływ wymaganego zapasu',
      narration:
        'Jeżeli wymaganie wzrośnie do n = 2,5, naprężenie dopuszczalne maleje do σ_dop = 235/2,5 = 94 MPa, a maksymalna siła do N_max = 94·500 = 47 kN. Zależność jest odwrotnie proporcjonalna do n: większy zapas oznacza mniejszą dopuszczalną siłę przy tym samym przekroju.',
      caption: 'n: 2 → 2,5 obniża σ_dop z 117,5 do 94 MPa i N_max z 58,75 do 47 kN.',
      visual: 'axial',
      focus: { metric: 'influence' },
      formula:
        'n=2\\rightarrow2{,}5,\\qquad \\sigma_{\\mathrm{dop}}=94\\ \\text{MPa},\\qquad N_{\\max}=47\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
