import type { SolutionData } from '../../model'
import { AllowableSafetyFactorAnimation } from './animation'

export default {
  id: 'ex-m3-allowable-safety-factor',
  title: 'Naprężenie dopuszczalne i współczynnik bezpieczeństwa — przykład 1',
  duration: 7,
  given: ['N=120 kN', 'R_e=235 MPa', 'n=1,5'],
  result:
    'Cięgno o średnicy 32 mm ma pole około 804 mm², naprężenie około 149 MPa i rzeczywisty współczynnik bezpieczeństwa około 1,58 względem R_e. Warunek wytrzymałościowy jest spełniony.',
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
        area: 804,
        n: 120,
        sigma: 149.2,
      },
    ],
    loads: [
      {
        node: 1,
        value: 120,
        label: 'N = 120 kN',
      },
    ],
    note: 'Przyjęto d = 32 mm, A = 804 mm²; długość schematyczna.',
  },
  animation: AllowableSafetyFactorAnimation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Stalowe cięgno o stałej średnicy przenosi siłę N = 120 kN. Przyjmujemy R_e = 235 MPa oraz wymagany współczynnik bezpieczeństwa n = 1,5. Szukamy przekroju i sprawdzamy, czy po zaokrągleniu średnicy zapas pozostaje wystarczający.',
      caption: 'Jeden pręt o nieznanym polu, obciążony osiowo siłą N = 120 kN.',
      visual: 'axial',
      focus: { metric: 'model' },
      formula: 'N=120\\ \\text{kN},\\quad R_e=235\\ \\text{MPa},\\quad n=1{,}5',
    },
    {
      title: 'Naprężenie dopuszczalne',
      narration:
        'Naprężenie dopuszczalne wyznaczamy, dzieląc granicę plastyczności przez wymagany zapas: σ_dop = R_e/n = 235/1,5 ≈ 156,7 MPa. Poziom dopuszczalny leży poniżej R_e, więc projekt nie wykorzystuje materiału aż do granicy plastyczności.',
      caption: 'σ_dop = 156,7 MPa leży poniżej R_e = 235 MPa.',
      visual: 'axial',
      focus: { metric: 'allowable' },
      formula: '\\sigma_{\\mathrm{dop}}=\\frac{R_e}{n}=\\frac{235}{1{,}5}\\approx156{,}7\\ \\text{MPa}',
    },
    {
      title: 'Dobór przekroju',
      narration:
        'Minimalne pole wynosi A_min = N/σ_dop = 120 000/156,7 ≈ 766 mm², czyli d_min ≈ 31,2 mm. Przyjmujemy standardową średnicę d = 32 mm i pole A = π·32²/4 ≈ 804 mm². Wybrane pole jest większe od minimalnego.',
      caption: 'A_min = 766 mm², przyjęto d = 32 mm i A = 804 mm².',
      visual: 'axial',
      focus: { metric: 'area' },
      formula:
        'A_{\\min}=\\frac{120\\,000}{156{,}7}\\approx766\\ \\text{mm}^2,\\qquad d=32\\ \\text{mm}\\Rightarrow A\\approx804\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenie rzeczywiste',
      narration:
        'Dla przyjętej średnicy naprężenie robocze wynosi σ = N/A = 120 000/804 ≈ 149,2 MPa. Jest ono mniejsze od σ_dop = 156,7 MPa, więc wykorzystanie przekroju wynosi około 95%.',
      caption: 'σ = 149,2 MPa < σ_dop = 156,7 MPa; wykorzystanie około 95%.',
      visual: 'axial',
      focus: { metric: 'stress' },
      formula:
        '\\sigma=\\frac{120\\,000}{804}\\approx149{,}2\\ \\text{MPa},\\qquad \\frac{\\sigma}{\\sigma_{\\mathrm{dop}}}\\approx0{,}95',
    },
    {
      title: 'Sprawdzenie zapasu',
      narration:
        'Rzeczywisty współczynnik bezpieczeństwa wynosi n_rz = R_e/σ = 235/149,2 ≈ 1,58 i jest większy od wymaganego 1,5. Warunek jest spełniony. R_m jest większe od R_e, ale go nie używamy, bo krytyczne jest nadmierne odkształcenie trwałe, a nie zerwanie.',
      caption: 'n_rz = 1,58 ≥ n = 1,5, więc przyjęty przekrój jest bezpieczny.',
      visual: 'axial',
      focus: { metric: 'check' },
      formula: 'n_{\\mathrm{rz}}=\\frac{R_e}{\\sigma}=\\frac{235}{149{,}2}\\approx1{,}58\\ge1{,}5',
    },
  ],
} satisfies SolutionData
