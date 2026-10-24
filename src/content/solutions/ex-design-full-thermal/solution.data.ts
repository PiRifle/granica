import type { SolutionData } from '../../model'
import { ThermalMechanicalBarAnimation } from './animation'

export default {
  id: 'ex-design-full-thermal',
  title: 'Pełne zadanie: obciążenie mechaniczne i temperatura — przykład 1',
  duration: 7,
  given: ['L_1 = L_2 = 1000 mm', 'A_1 = A_2 = 300 mm²', 'E=200 GPa', 'alpha=12·10⁻⁶ 1/K', 'ΔT=50 K', 'P=20 kN'],
  result:
    'W obu odcinkach powstaje ściskanie. Siły normalne wynoszą N_1=-26 kN i N_2=-46 kN, a naprężenia -86,7 MPa i -153,3 MPa. Punkt C przesuwa się w prawo o około 0,167 mm, choć końce pręta pozostają nieruchome.',
  animation: ThermalMechanicalBarAnimation,
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'fixed',
    segments: [
      {
        id: '1',
        label: 'AC',
        length: 1000,
        area: 300,
        n: -26,
        sigma: -86.7,
        thermalStrain: 0.0006,
        freeDeltaL: 0.6,
        deltaL: 0.1667,
      },
      {
        id: '2',
        label: 'CB',
        length: 1000,
        area: 300,
        n: -46,
        sigma: -153.3,
        thermalStrain: 0.0006,
        freeDeltaL: 0.6,
        deltaL: -0.1667,
      },
    ],
    loads: [{ node: 1, value: 20, label: 'P = 20 kN', direction: 'down' }],
    units: { N: 'kN', σ: 'MPa', ΔL: 'mm', ΔL_T: 'mm', αΔT: '–', A: 'mm²' },
    note: 'Swobodne wydłużenie termiczne obu odcinków wynosi 0,6 mm, ale sztywne końce wymuszają zgodność przemieszczeń.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt A–C–B jest utwierdzony na obu końcach. Odcinki mają L₁ = L₂ = 1000 mm i pole A = 300 mm². Materiał: E = 200 GPa, α = 12·10⁻⁶ 1/K. W punkcie C działa siła P = 20 kN w prawo, a temperatura wzrasta o ΔT = 50 K.',
      caption: 'Oba końce nieruchome; w punkcie C działa siła P, a cały pręt ogrzewa się o 50 K.',
      visual: 'thermal',
      focus: { metric: 'model' },
      formula:
        'L_1=L_2=1000\\ \\text{mm},\\quad A=300\\ \\text{mm}^2,\\quad P=20\\ \\text{kN},\\quad \\Delta T=50\\ \\text{K}',
    },
    {
      title: 'Swobodne wydłużenie termiczne',
      narration:
        'Gdyby prawa podpora nie ograniczała ruchu, każdy odcinek wydłużyłby się o ΔL_T = αΔT L = 12·10⁻⁶·50·1000 = 0,6 mm. Cały pręt wydłużyłby się o 1,2 mm, a naprężenie pozostałoby zerowe.',
      caption: 'Bez prawej podpory oba odcinki wydłużają się swobodnie; σ = 0.',
      visual: 'thermal',
      focus: { metric: 'free' },
      formula:
        '\\Delta L_{T,1}=\\Delta L_{T,2}=\\alpha\\Delta T L=12\\cdot10^{-6}\\cdot50\\cdot1000=0{,}6\\ \\text{mm}',
    },
    {
      title: 'Samo zablokowanie termiczne',
      narration:
        'Przy nieruchomych końcach całkowita długość się nie zmienia. Odkształcenie mechaniczne musi skompensować termiczne, więc w obu odcinkach powstaje N_T = −EAαΔT = −36 kN, czyli ściskanie σ_T = −120 MPa.',
      caption: 'Ten sam ΔT = 50 K bez siły P: ΔL = 0, a w obu odcinkach panuje ściskanie 120 MPa.',
      visual: 'thermal',
      focus: { metric: 'restraint' },
      formula: 'N_T=-EA\\alpha\\Delta T=-36\\ \\text{kN},\\qquad \\sigma_T=-E\\alpha\\Delta T=-120\\ \\text{MPa}',
    },
    {
      title: 'Samo obciążenie mechaniczne',
      narration:
        'Przy ΔT = 0 działa tylko siła P = 20 kN w prawo. Z równowagi N₁ − N₂ = P, a ze zgodności N₁ = −N₂. Stąd N₁ = +10 kN (rozciąganie), N₂ = −10 kN (ściskanie), a punkt C przesuwa się o u = PL/(2EA) = 0,1667 mm.',
      caption: 'Siła P rozciąga odcinek AC i ściska CB; punkt C przesuwa się w prawo.',
      visual: 'thermal',
      focus: { metric: 'mechanical' },
      formula:
        'N_1^{(P)}=+10\\ \\text{kN},\\qquad N_2^{(P)}=-10\\ \\text{kN},\\qquad u=\\frac{PL}{2EA}=0{,}1667\\ \\text{mm}',
    },
    {
      title: 'Suma: temperatura i siła',
      narration:
        'Nakładamy oba wpływy. W odcinku AC siła mechaniczna zmniejsza ściskanie termiczne: N₁ = −36 + 10 = −26 kN. W odcinku CB działa w tę samą stronę: N₂ = −36 − 10 = −46 kN. Punkt C nadal przesuwa się w prawo o 0,1667 mm.',
      caption: 'Oba odcinki są ściskane, ale CB jest bardziej wytężony.',
      visual: 'thermal',
      focus: { metric: 'combined' },
      formula: 'N_1=N_T+N_1^{(P)}=-26\\ \\text{kN},\\qquad N_2=N_T+N_2^{(P)}=-46\\ \\text{kN}',
    },
    {
      title: 'Sprawdzenie wytrzymałości',
      narration:
        'Naprężenia wynoszą σ₁ = −26 000/300 ≈ −86,7 MPa i σ₂ = −46 000/300 ≈ −153,3 MPa. Granica ściskana k_c = 160 MPa, więc decyduje odcinek CB. Pręt jest bezpieczny, ale zapas wynosi tylko około 4,2%.',
      caption: 'σ₂ = −153,3 MPa ≤ k_c = 160 MPa; decyduje odcinek CB.',
      visual: 'thermal',
      focus: { metric: 'check' },
      formula: '|\\sigma_1|=86{,}7\\ \\text{MPa},\\qquad |\\sigma_2|=153{,}3\\ \\text{MPa}\\le160\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
