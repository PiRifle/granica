import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-criteria-safety-factor-3',
  title: 'Współczynnik bezpieczeństwa: ile zapasu ma element? — przykład 3',
  duration: 7,
  given: ['A = 400 mm²', 'F = 60 kN', 'n_wym = 2,0'],
  result:
    'Ostatnia kontrola dotyczy jednostek i rzędu wielkości. Naprężenie 150 MPa przy polu 400 mm² odpowiada sile 60 kN, czyli około 6 ton. To sensowna wartość dla pręta o średnicy około 22,6 mm. Gdyby wynik wychodził w setkach kiloniutonów albo w ułamkach niutona, trzeba sprawdzić przeliczenia, zanim uzna się zadanie za rozwiązane.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SafetyFactor3Animation }))),
  figure: {
    kind: 'cube',
    stresses: {
      x: 150,
      y: 0,
      z: 0,
    },
    strains: {
      x: 0.00075,
      y: -0.000225,
      z: -0.000225,
    },
    volumeChange: '0,03%',
    values: [
      {
        label: 'A',
        value: '400 mm²',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'F',
        value: '60 kN',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'n_wym',
        value: '2,0',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'σ',
        value: '150 MPa',
        focus: 'stress',
      },
      {
        label: 'R_e,req',
        value: '300 MPa',
        focus: 'stress',
      },
      {
        label: 'k (R_e=235)',
        value: '117,5 MPa',
        focus: 'stress',
      },
      {
        label: 'A_min',
        value: '510,6 mm²',
        focus: 'stress',
      },
      {
        label: 'n (235 MPa)',
        value: '1,57',
        focus: 'stress',
      },
      {
        label: 'n (355 MPa)',
        value: '2,37',
        focus: 'stress',
      },
      {
        label: 'ε_x',
        value: '750 με',
        focus: 'strain',
      },
      {
        label: 'ε_y',
        value: '−225 με',
        focus: 'strain',
      },
      {
        label: 'θ',
        value: '300 με',
        focus: 'volume',
      },
    ],
    note: 'Wymaganą granicę 300 MPa można osiągnąć przez zmianę gatunku stali albo przez zwiększenie pola przekroju.',
  },
  scenes: [
    {
      title: 'Model i dane projektowe',
      narration:
        'Element o polu A = 400 mm² ma przenieść siłę F = 60 kN. Projekt wymaga zapasu n_wym = 2. Naprężenie robocze wynosi σ = 60 000/400 = 150 MPa.',
      caption: 'A = 400 mm², F = 60 kN, n_wym = 2, σ = 150 MPa.',
      visual: 'cube',
      focus: {
        metric: 'model',
      },
      formula:
        'A=400\\,\\text{mm}^2,\\qquad F=60\\,\\text{kN},\\qquad n_{wym}=2{,}0,\\qquad \\sigma=\\frac{60\\,000}{400}=150\\,\\text{MPa}',
    },
    {
      title: 'Naprężenie robocze',
      narration:
        'Samo naprężenie 150 MPa nie mówi jeszcze, czy element jest bezpieczny. Dopiero porównanie z granicą materiału i z wymaganym zapasem rozstrzyga o poprawności doboru.',
      caption: 'Naprężenie robocze σ = 150 MPa.',
      visual: 'cube',
      focus: {
        metric: 'stress',
      },
      formula: '\\sigma=\\frac{F}{A}=\\frac{60\\,000}{400}=150\\,\\text{MPa}',
    },
    {
      title: 'Wymagana granica materiału',
      narration:
        'Aby przy naprężeniu 150 MPa uzyskać zapas 2, granica materiału musi wynosić R_e,req = σ·n_wym = 150·2 = 300 MPa. Typowa stal konstrukcyjna o granicy 235 MPa nie wystarcza.',
      caption: 'R_e,req = 300 MPa; stal 235 MPa jest za słaba.',
      visual: 'cube',
      focus: {
        metric: 'limit',
      },
      formula: 'R_{e,req}=\\sigma\\,n_{wym}=150\\cdot2=300\\,\\text{MPa}',
    },
    {
      title: 'Zapas dla dostępnych gatunków stali',
      narration:
        'Stal 235 MPa daje zapas 235/150 = 1,57, czyli mniej niż 2. Stal 355 MPa daje 355/150 = 2,37, więc spełnia wymaganie. O wyniku decyduje zarówno granica, jak i naprężenie robocze.',
      caption: 'n(235 MPa) = 1,57 < 2; n(355 MPa) = 2,37 ≥ 2.',
      visual: 'cube',
      focus: {
        metric: 'check',
      },
      formula: 'n_{235}=\\frac{235}{150}=1{,}57<2,\\qquad n_{355}=\\frac{355}{150}=2{,}37\\ge2',
    },
    {
      title: 'Pole wymagane dla stali 235 MPa',
      narration:
        'Przy stali 235 MPa naprężenie dopuszczalne wynosi k = 235/2 = 117,5 MPa, więc potrzeba A_min = 60 000/117,5 = 510,6 mm². Alternatywą jest stal 355 MPa przy dotychczasowym polu 400 mm².',
      caption: 'Dla stali 235 MPa: A_min = 510,6 mm² > 400 mm²; alternatywa to stal 355 MPa.',
      visual: 'cube',
      focus: {
        metric: 'area',
      },
      formula:
        'k=\\frac{235}{2}=117{,}5\\,\\text{MPa},\\qquad A_{min}=\\frac{60\\,000}{117{,}5}=510{,}6\\,\\text{mm}^2',
    },
  ],
} satisfies SolutionData
