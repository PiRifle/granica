import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-tresca',
  title: 'Hipoteza Tresca: największe ścinanie — przykład 1',
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
      narration: 'Naprężenia główne wynoszą σ_1 = 120 MPa, σ_2 = 60 MPa i σ_3 = 0. Materiał ma R_e = 355 MPa.',
      caption: 'σ_1 = 120 MPa, σ_2 = 60 MPa, σ_3 = 0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_1=120\\,\\text{MPa},\\qquad \\sigma_2=60\\,\\text{MPa},\\qquad \\sigma_3=0',
    },
    {
      title: 'Wskaż naprężenia skrajne',
      narration:
        'Największe naprężenie główne to 120 MPa, a najmniejsze 0 MPa. To one wyznaczają maksymalną różnicę, czyli podwójne maksymalne ścinanie.',
      caption: 'σ_max = 120 MPa, σ_min = 0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{max}=120\\,\\text{MPa},\\qquad \\sigma_{min}=0',
    },
    {
      title: 'Oblicz naprężenie zredukowane Tresca',
      narration: 'Naprężenie zredukowane to różnica skrajnych naprężeń: σ_T = 120 − 0 = 120 MPa.',
      caption: 'σ_T = 120 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_T=120-0=120\\,\\text{MPa}',
    },
    {
      title: 'Oblicz maksymalne ścinanie',
      narration: 'Maksymalne ścinanie jest połową naprężenia zredukowanego: τ_max = σ_T/2 = 60 MPa.',
      caption: 'τ_max = 60 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\tau_{max}=\\frac{\\sigma_T}{2}=\\frac{120}{2}=60\\,\\text{MPa}',
    },
    {
      title: 'Oblicz współczynnik bezpieczeństwa',
      narration: 'Zapas wynosi n = R_e/σ_T = 355/120 = 2,96. Dla porównania HMH daje 103,9 MPa i zapas 3,42.',
      caption: 'n = 2,96, n_HMH = 3,42.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'n=\\frac{355}{120}=2{,}96,\\qquad \\sigma_{HMH}=103{,}9\\,\\text{MPa},\\qquad n_{HMH}=\\frac{355}{103{,}9}=3{,}42',
    },
    {
      title: 'Sprawdź przez trzy różnice',
      narration:
        'Kontrola przez trzy różnice: |120 − 60| = 60, |60 − 0| = 60, |0 − 120| = 120. Największa wynosi 120 MPa, zgodnie z wynikiem.',
      caption: 'Kontrola: największa różnica to 120 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '|120-60|=60,\\qquad |60-0|=60,\\qquad |0-120|=120',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_1 = 510 με, ε_2 = 120 με i ε_3 = −270 με. Ślad 360 με oznacza wzrost objętości.',
      caption: 'ε_1 = 510 με, ε_2 = 120 με, ε_3 = −270 με, θ = 360 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_1=510\\,\\mu\\varepsilon,\\qquad \\varepsilon_2=120\\,\\mu\\varepsilon,\\qquad \\varepsilon_3=-270\\,\\mu\\varepsilon,\\qquad \\theta=360\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 360 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=360\\,\\mu\\varepsilon,\\qquad |\\varepsilon_3|=270\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
