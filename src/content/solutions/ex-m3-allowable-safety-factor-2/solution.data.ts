import type { SolutionData } from '../../model'
import { AllowableSafetyFactor2Animation } from './animation'

export default {
  id: 'ex-m3-allowable-safety-factor-2',
  title: 'Naprężenie dopuszczalne i współczynnik bezpieczeństwa — przykład 2',
  duration: 7,
  given: ['R_f=120 MPa', 'n=2', 'N=120 kN'],
  result:
    'Przy granicy zmęczeniowej R_f = 120 MPa i n = 2 naprężenie dopuszczalne wynosi 60 MPa, więc potrzebne pole to 2000 mm². Po przyjęciu d = 52 mm otrzymujemy A ≈ 2124 mm², σ ≈ 56,5 MPa i n_rz ≈ 2,12.',
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
        area: 2124,
        n: 120,
        sigma: 56.5,
      },
    ],
    loads: [
      {
        node: 1,
        value: 120,
        label: 'N = 120 kN',
      },
    ],
    note: 'Przyjęto d = 52 mm, A = 2124 mm²; długość schematyczna.',
  },
  animation: AllowableSafetyFactor2Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Ten sam pręt może być projektowany względem innej granicy. Cięgno pracuje w maszynie wykonującej milion cykli, więc miarodajna jest umowna granica zmęczeniowa R_f = 120 MPa. Wymagany współczynnik bezpieczeństwa wynosi n = 2, a siła pozostaje N = 120 kN.',
      caption: 'Obciążenie zmienne: granica zmęczeniowa R_f = 120 MPa, n = 2, N = 120 kN.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'R_f=120\\ \\text{MPa},\\quad n=2,\\quad N=120\\ \\text{kN}',
    },
    {
      title: 'Naprężenie dopuszczalne',
      narration:
        'Naprężenie dopuszczalne wynosi σ_dop = R_f/n = 120/2 = 60 MPa. Jest ono znacznie niższe niż w przypadku projektowania względem R_e = 235 MPa, bo decyduje zmęczenie, a nie jednorazowe uplastycznienie.',
      caption: 'σ_dop = 60 MPa leży daleko poniżej R_f = 120 MPa i R_e = 235 MPa.',
      visual: 'axial',
      focus: { metric: 'allowable' },
      formula: '\\sigma_{\\mathrm{dop}}=\\frac{R_f}{n}=\\frac{120}{2}=60\\ \\text{MPa}',
    },
    {
      title: 'Wymagane pole',
      narration:
        'Z warunku σ ≤ σ_dop otrzymujemy A_min = N/σ_dop = 120 000/60 = 2000 mm², czyli d_min ≈ 50,5 mm. Po zaokrągleniu do 52 mm pole wynosi A ≈ 2124 mm². To znacznie więcej niż 804 mm² w wariancie statycznym, mimo że materiał się nie zmienił.',
      caption: 'A_min = 2000 mm², przyjęto d = 52 mm i A ≈ 2124 mm².',
      visual: 'axial',
      focus: { metric: 'area' },
      formula:
        'A_{\\min}=\\frac{120\\,000}{60}=2000\\ \\text{mm}^2,\\qquad d=52\\ \\text{mm}\\Rightarrow A\\approx2124\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenie rzeczywiste',
      narration:
        'Dla przyjętego pola naprężenie robocze wynosi σ = 120 000/2124 ≈ 56,5 MPa. Jest mniejsze od σ_dop = 60 MPa, więc wykorzystanie przekroju wynosi około 94%.',
      caption: 'σ = 56,5 MPa < σ_dop = 60 MPa; wykorzystanie około 94%.',
      visual: 'axial',
      focus: { metric: 'stress' },
      formula:
        '\\sigma=\\frac{120\\,000}{2124}\\approx56{,}5\\ \\text{MPa},\\qquad \\frac{\\sigma}{\\sigma_{\\mathrm{dop}}}\\approx0{,}94',
    },
    {
      title: 'Sprawdzenie zapasu',
      narration:
        'Rzeczywisty współczynnik bezpieczeństwa wynosi n_rz = R_f/σ = 120/56,5 ≈ 2,12 i jest większy od wymaganego 2. Średnica rośnie z 32 do 52 mm, bo zmienił się mechanizm decydujący o bezpieczeństwie. Samo „dobranie współczynnika” bez wskazania granicy nie ma znaczenia.',
      caption: 'n_rz = 2,12 ≥ n = 2; o doborze decyduje granica zmęczeniowa.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula: 'n_{\\mathrm{rz}}=\\frac{R_f}{\\sigma}=\\frac{120}{56{,}5}\\approx2{,}12\\ge2',
    },
  ],
} satisfies SolutionData
