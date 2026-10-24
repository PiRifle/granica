import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-criteria-tresca',
  title: 'Hipoteza Tresca: największe ścinanie — przykład 1',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TrescaExample1Animation }))),
  duration: 7,
  given: ['σθ = 120 MPa', 'σz = 60 MPa', 'Re = 355 MPa'],
  result:
    'σT = 120 MPa, τmax = 60 MPa, a zapas wynosi około 2,96. HMH dałaby w tym punkcie 103,9 MPa i zapas 3,42, więc Tresca jest tu bardziej zachowawcza.',
  figure: {
    kind: 'cube',
    stresses: { x: 120, y: 60, z: 0 },
    strains: { x: 0.00051, y: 0.00012, z: -0.00027 },
    volumeChange: '0,036%',
    values: [
      { label: 'σ_1', value: '120 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_2', value: '60 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_3', value: '0 MPa', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '355 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_T', value: '120 MPa', focus: 'stress' },
      { label: 'τ_max', value: '60 MPa', focus: 'stress' },
      { label: 'n', value: '2,96', focus: 'stress' },
      { label: 'σ_HMH', value: '103,9 MPa', focus: 'stress' },
      { label: 'n_HMH', value: '3,42', focus: 'stress' },
      { label: 'ε_1', value: '510 με', focus: 'strain' },
      { label: 'ε_2', value: '120 με', focus: 'strain' },
      { label: 'ε_3', value: '−270 με', focus: 'strain' },
      { label: 'θ', value: '360 με', focus: 'volume' },
    ],
    note: 'Tresca porównuje największą różnicę naprężeń głównych, a nie największe naprężenie główne.',
  },
  scenes: [
    {
      title: 'Uporządkuj naprężenia główne',
      narration:
        'Naprężenia główne wynoszą σ_1 = 120 MPa, σ_2 = 60 MPa i σ_3 = 0. Ustawiamy je malejąco, bo dopiero skrajne wartości wyznaczają maksymalne ścinanie.',
      caption: 'σ_1 = 120 MPa, σ_2 = 60 MPa, σ_3 = 0.',
      visual: 'cube',
      focus: { metric: 'state' },
      formula: '\\sigma_1=120\\,\\text{MPa},\\quad \\sigma_2=60\\,\\text{MPa},\\quad \\sigma_3=0',
    },
    {
      title: 'Zbuduj trzy koła Mohra',
      narration:
        'Każda para naprężeń głównych tworzy własne koło. Promienie wynoszą 30, 30 i 60 MPa, a największe koło odpowiada parze (1,3), bo obejmuje cały przedział od 0 do 120 MPa.',
      caption: 'Trzy koła: (1,2), (2,3) i (3,1); największe jest koło pary (1,3).',
      visual: 'cube',
      focus: { metric: 'circles' },
      formula: 'R_{12}=30\\,\\text{MPa},\\quad R_{23}=30\\,\\text{MPa},\\quad R_{13}=60\\,\\text{MPa}',
    },
    {
      title: 'Odczytaj maksymalne ścinanie',
      narration:
        'Największe ścinanie to promień największego koła: τ_max = (120 − 0)/2 = 60 MPa. W materiale działa ono na płaszczyźnie nachylonej pod 45° do kierunków σ_1 i σ_3.',
      caption: 'τ_max = 60 MPa na płaszczyźnie pod 45°.',
      visual: 'cube',
      focus: { metric: 'maxshear' },
      formula: '\\tau_{max}=\\frac{\\sigma_1-\\sigma_3}{2}=\\frac{120-0}{2}=60\\,\\text{MPa}',
    },
    {
      title: 'Wyznacz naprężenie zredukowane Tresca',
      narration:
        'Średnica największego koła jest równa σ_T. Dlatego σ_T = 120 − 0 = 120 MPa, czyli dwa razy τ_max. Zero jest pełnoprawnym naprężeniem skrajnym.',
      caption: 'σ_T = 2τ_max = 120 MPa.',
      visual: 'cube',
      focus: { metric: 'tresca' },
      formula: '\\sigma_T=\\sigma_{max}-\\sigma_{min}=120-0=120\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź zapas bezpieczeństwa',
      narration:
        'Materiał ma R_e = 355 MPa, więc zapas wynosi n = 355/120 = 2,96. HMH dałaby w tym punkcie 103,9 MPa i zapas 3,42, więc Tresca jest bardziej zachowawcza.',
      caption: 'n = 2,96, a dla HMH n = 3,42.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula: 'n=\\frac{R_e}{\\sigma_T}=\\frac{355}{120}=2{,}96,\\quad n_{HMH}=\\frac{355}{103{,}9}=3{,}42',
    },
  ],
} satisfies SolutionData
