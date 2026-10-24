import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-hmh',
  title: 'Hipoteza HMH: energia zmiany postaci — przykład 1',
  duration: 7,
  given: ['Re = 355 MPa', 'σθ = 120 MPa', 'σz = 60 MPa'],
  result:
    'Naprężenie zredukowane HMH wynosi 103,9 MPa, a zapas około 3,42. Dla porównania Tresca dałaby σT = 120 MPa i zapas 2,96, więc byłaby bardziej zachowawcza.',
  figure: {
    kind: 'cube',
    stresses: { x: 120, y: 60, z: 0 },
    strains: { x: 0.00051, y: 0.00012, z: -0.00027 },
    volumeChange: '0,036%',
    values: [
      { label: 'R_e', value: '355 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_1', value: '120 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_2', value: '60 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_3', value: '0 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_HMH', value: '103,92 MPa', focus: 'stress' },
      { label: 'n', value: '3,42', focus: 'stress' },
      { label: 'σ_T', value: '120 MPa', focus: 'stress' },
      { label: 'n_T', value: '2,96', focus: 'stress' },
      { label: 'ε_1', value: '510 με', focus: 'strain' },
      { label: 'ε_2', value: '120 με', focus: 'strain' },
      { label: 'ε_3', value: '−270 με', focus: 'strain' },
      { label: 'θ', value: '360 με', focus: 'volume' },
    ],
    note: 'HMH wykorzystuje wszystkie trzy naprężenia główne, a nie tylko największe z nich.',
  },
  scenes: [
    {
      title: 'Zapisz naprężenia główne',
      narration:
        'Przyjmujemy naprężenia główne σ_1 = 120 MPa, σ_2 = 60 MPa i σ_3 = 0. Materiał ma granicę plastyczności R_e = 355 MPa.',
      caption: 'σ_1 = 120 MPa, σ_2 = 60 MPa, σ_3 = 0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_1=120\\,\\text{MPa},\\qquad \\sigma_2=60\\,\\text{MPa},\\qquad \\sigma_3=0',
    },
    {
      title: 'Zapisz wzór HMH',
      narration:
        'Naprężenie HMH można obliczyć z pełnej różnicy: σ_HMH² = σ_1² + σ_2² + σ_3² − σ_1σ_2 − σ_2σ_3 − σ_3σ_1.',
      caption: 'σ_HMH² = σ_1² + σ_2² + σ_3² − σ_1σ_2 − σ_2σ_3 − σ_3σ_1.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_{HMH}^{2}=\\sigma_1^{2}+\\sigma_2^{2}+\\sigma_3^{2}-\\sigma_1\\sigma_2-\\sigma_2\\sigma_3-\\sigma_3\\sigma_1',
    },
    {
      title: 'Podstaw wartości',
      narration: 'Podstawiamy 120, 60 i 0 MPa. Iloczyny z zerem znikają, a pozostaje 120² + 60² − 120·60.',
      caption: 'σ_HMH² = 120² + 60² − 120·60.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_{HMH}^{2}=120^{2}+60^{2}+0^{2}-120\\cdot60-60\\cdot0-0\\cdot120',
    },
    {
      title: 'Oblicz składniki',
      narration: 'Suma wynosi 14 400 + 3 600 − 7 200 = 10 800 MPa². Pierwiastek daje σ_HMH = 103,92 MPa.',
      caption: 'σ_HMH² = 10 800 MPa², σ_HMH = 103,92 MPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '14\\,400+3\\,600-7\\,200=10\\,800\\,\\text{MPa}^2,\\qquad \\sigma_{HMH}=\\sqrt{10\\,800}=103{,}92\\,\\text{MPa}',
    },
    {
      title: 'Oblicz współczynnik bezpieczeństwa',
      narration:
        'Dzielimy granicę przez naprężenie zredukowane: n = 355/103,92 = 3,42. Zapas jest większy od trzech, więc element jest bezpieczny.',
      caption: 'n = 3,42.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: 'n=\\frac{355}{103{,}92}=3{,}42',
    },
    {
      title: 'Sprawdź przez różnice naprężeń',
      narration:
        'Kontrola przez różnice: ½[(120 − 60)² + (60 − 0)² + (0 − 120)²] = ½(3 600 + 3 600 + 14 400) = 10 800, zgodnie z poprzednim wynikiem.',
      caption: 'Kontrola: ½(3 600 + 3 600 + 14 400) = 10 800.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\frac{1}{2}[(120-60)^{2}+(60-0)^{2}+(0-120)^{2}]=\\frac{1}{2}(3\\,600+3\\,600+14\\,400)=10\\,800',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 otrzymujemy ε_1 = 510 με, ε_2 = 120 με i ε_3 = −270 με. Ślad tensora 360 με jest dodatni, więc objętość rośnie.',
      caption: 'ε_1 = 510 με, ε_2 = 120 με, ε_3 = −270 με, θ = 360 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_1=\\frac{120-0{,}30\\cdot60}{200\\,000}=510\\,\\mu\\varepsilon,\\qquad \\varepsilon_2=120\\,\\mu\\varepsilon,\\qquad \\varepsilon_3=-270\\,\\mu\\varepsilon,\\qquad \\theta=360\\,\\mu\\varepsilon',
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
