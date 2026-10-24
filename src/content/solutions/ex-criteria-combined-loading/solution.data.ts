import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-criteria-combined-loading',
  title: 'Zginanie, skręcanie i siła osiowa razem — przykład 1',
  duration: 7,
  given: ['d = 60 mm', 'N = 30 kN', 'M = 1,2 kN·m', 'T = 800 N·m', 'R_e = 235 MPa'],
  result:
    'W rozważanym włóknie σ_x=67,2 MPa i τ=18,9 MPa, więc σ_HMH=74,7 MPa i σ_T=77,1 MPa. Oba zapasy przekraczają 3, więc element jest bezpieczny z dużym marginesem.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.CombinedLoadingExample1Animation }))),
  figure: {
    kind: 'cube',
    stresses: {
      x: 67.2,
      y: 0,
      z: 0,
    },
    strains: {
      x: 0.000336,
      y: -0.0001008,
      z: -0.0001008,
    },
    volumeChange: '0,01344%',
    values: [
      {
        label: 'd',
        value: '60 mm',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'N',
        value: '30 kN',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'M',
        value: '1,2 kN·m',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'T',
        value: '800 N·m',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'R_e',
        value: '235 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'σ_x',
        value: '67,20 MPa',
        focus: 'stress',
      },
      {
        label: 'τ',
        value: '18,86 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_HMH',
        value: '74,72 MPa',
        focus: 'stress',
      },
      {
        label: 'σ_T',
        value: '77,06 MPa',
        focus: 'stress',
      },
      {
        label: 'n_HMH',
        value: '3,14',
        focus: 'stress',
      },
      {
        label: 'n_T',
        value: '3,05',
        focus: 'stress',
      },
      {
        label: 'ε_x',
        value: '336 με',
        focus: 'strain',
      },
      {
        label: 'ε_y',
        value: '−100,8 με',
        focus: 'strain',
      },
      {
        label: 'γ_xy',
        value: '245,2 μrad',
        focus: 'strain',
      },
      {
        label: 'θ',
        value: '134,4 με',
        focus: 'volume',
      },
    ],
    note: 'W badanym włóknie działa naprężenie normalne od siły osiowej i zginania oraz naprężenie styczne od skręcania.',
  },
  scenes: [
    {
      title: 'Trzy obciążenia w jednym przekroju',
      narration:
        'Pełny pręt stalowy o średnicy d = 60 mm jest rozciągany siłą N = 30 kN, zginany momentem M = 1,2 kN·m i skręcany momentem T = 800 N·m. Wszystkie trzy obciążenia działają w tym samym przekroju, więc najpierw wyznaczamy ich siły wewnętrzne.',
      caption: 'd = 60 mm; N = 30 kN, M = 1,2 kN·m, T = 800 N·m w jednym przekroju.',
      visual: 'beam',
      focus: {
        metric: 'loads',
      },
      formula: 'N=30\\,\\text{kN},\\qquad M=1{,}2\\,\\text{kN·m},\\qquad T=800\\,\\text{N·m},\\qquad d=60\\,\\text{mm}',
    },
    {
      title: 'Składowe naprężenia normalnego w włóknie A',
      narration:
        'Pole przekroju wynosi A = 2 827 mm², a wskaźnik zginania W = 21 206 mm³. Siła osiowa daje równomierne σ_N = N/A = 10,61 MPa, a zginanie w skrajnym włóknie σ_M = M/W = 56,59 MPa. W wybranym włóknie oba udziały są dodatnie, więc σ_x = 67,20 MPa.',
      caption: 'W włóknie A: σ_N = 10,61 MPa, σ_M = 56,59 MPa, σ_x = 67,20 MPa.',
      visual: 'section',
      focus: {
        metric: 'normal',
      },
      formula:
        '\\sigma_N=\\frac{N}{A}=10{,}61\\,\\text{MPa},\\qquad \\sigma_M=\\frac{M}{W}=56{,}59\\,\\text{MPa},\\qquad \\sigma_x=67{,}20\\,\\text{MPa}',
    },
    {
      title: 'Ścinanie od skręcania na obwodzie',
      narration:
        'Moment skręcający 800 N·m daje na obwodzie ścinanie τ = T/W_o = 800 000/42 412 = 18,86 MPa. Naprężenie jest styczne do obwodu i maleje liniowo do zera w środku przekroju.',
      caption: 'τ = 18,86 MPa na obwodzie; w środku τ = 0.',
      visual: 'section',
      focus: {
        metric: 'shear',
      },
      formula: '\\tau=\\frac{T}{W_o}=\\frac{800\\,000}{42\\,412}=18{,}86\\,\\text{MPa}',
    },
    {
      title: 'Stan naprężenia w punkcie A',
      narration:
        'W włóknie A działają jednocześnie σ_x = 67,20 MPa i τ = 18,86 MPa, a σ_y = σ_z = 0. To płaski stan naprężenia: do redukcji wystarczą dwie składowe, ale nie wolno ich dodawać jak zwykłych liczb.',
      caption: 'σ_x = 67,20 MPa, τ = 18,86 MPa, σ_y = σ_z = 0.',
      visual: 'cube',
      focus: {
        metric: 'state',
      },
      formula: '\\sigma_x=67{,}20\\,\\text{MPa},\\qquad \\tau=18{,}86\\,\\text{MPa},\\qquad \\sigma_y=\\sigma_z=0',
    },
    {
      title: 'Redukcja według HMH i Tresca',
      narration:
        'HMH daje σ_HMH = √(67,20² + 3·18,86²) = 74,72 MPa, a Tresca σ_T = √(67,20² + 4·18,86²) = 77,06 MPa. Tresca jest ostrzejsza, bo większy współczynnik przy τ².',
      caption: 'σ_HMH = 74,72 MPa, σ_T = 77,06 MPa.',
      visual: 'diagram',
      focus: {
        metric: 'reduce',
      },
      formula:
        '\\sigma_{HMH}=\\sqrt{67{,}20^2+3\\cdot18{,}86^2}=74{,}72\\,\\text{MPa},\\qquad \\sigma_T=\\sqrt{67{,}20^2+4\\cdot18{,}86^2}=77{,}06\\,\\text{MPa}',
    },
    {
      title: 'Kontrola zapasu bezpieczeństwa',
      narration:
        'Przy R_e = 235 MPa zapasy wynoszą n_HMH = 235/74,72 = 3,14 oraz n_T = 235/77,06 = 3,05. Oba przekraczają jedność, więc element jest bezpieczny z dużym marginesem.',
      caption: 'n_HMH = 3,14, n_T = 3,05 > 1.',
      visual: 'diagram',
      focus: {
        metric: 'check',
      },
      formula: 'n_{HMH}=\\frac{235}{74{,}72}=3{,}14,\\qquad n_T=\\frac{235}{77{,}06}=3{,}05',
    },
  ],
} satisfies SolutionData
