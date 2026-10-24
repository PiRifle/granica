import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-poisson-3',
  title: 'Efekt Poissona: dlaczego pręt robi się cieńszy — przykład 3',
  duration: 7,
  given: ['d_0=10 mm', 'nu=0'],
  result:
    'Przy E=200 GPa odpowiada to naprężeniu σ=Eε≈133 MPa. To sensowny zakres dla stali konstrukcyjnej. Gdyby dopuszczalna zmiana średnicy była dziesięć razy mniejsza, limit naprężenia spadłby do około 13 MPa — pokazuje to, jak rygorystyczne mogą być wymagania wymiarowe w precyzyjnych pasowaniach.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.000667, display: '667 με' },
      { angle: 45, label: '45°', value: 0.0002335, display: '233,5 με' },
      { angle: 90, label: '90°', value: -0.0002, display: '−200 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.0002335,
      radius: 0.0004335,
      left: -0.0002,
      right: 0.000667,
      angle: 0,
    },
    values: [
      { label: 'd₀', value: '10 mm', focus: 'gauges', reveal: 0 },
      { label: 'Δd_dop', value: '0,002 mm', focus: 'gauges', reveal: 0 },
      { label: 'ν', value: '0,30', focus: 'stress', reveal: 0 },
      { label: 'ε_poprz', value: '−200 με', focus: 'gauges' },
      { label: 'ε_osi', value: '667 με', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '233,5 με', focus: 'mohr' },
      { label: 'R_ε', value: '433,5 με', focus: 'mohr' },
      { label: 'ε_I', value: '667 με', focus: 'principal' },
      { label: 'ε_II', value: '−200 με', focus: 'principal' },
      { label: 'σ_x', value: '133,41 MPa', focus: 'stress' },
    ],
    note: 'Limit zmiany średnicy jest bardzo ostry: 2 μm na wałku 10 mm odpowiada odkształceniu poprzecznemu zaledwie 200 με.',
  },
  scenes: [
    {
      title: 'Zapisz ograniczenie wymiarowe',
      narration:
        'Projektant dopuszcza zmianę średnicy wałka o d₀ = 10 mm nie większą niż 2 μm, czyli 0,002 mm. Materiał ma ν = 0,30. Szukamy maksymalnego odkształcenia osiowego.',
      caption: 'd₀ = 10 mm, |Δd| ≤ 0,002 mm, ν = 0,30.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: 'd_0=10\\,\\text{mm},\\qquad |\\Delta d|=0{,}002\\,\\text{mm},\\qquad \\nu=0{,}30',
    },
    {
      title: 'Oblicz odkształcenie poprzeczne',
      narration:
        'Dzielimy limit średnicy przez średnicę początkową: |ε_poprz| = 0,002/10 = 0,0002, czyli 200 με. Przy rozciąganiu znak jest ujemny, ale do limitu bierzemy wartość bezwzględną.',
      caption: '|ε_poprz| = 200 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '|\\varepsilon_{poprz}|=\\frac{0{,}002}{10}=0{,}0002=200\\,\\mu\\varepsilon',
    },
    {
      title: 'Oblicz odkształcenie osiowe',
      narration:
        'Z definicji liczby Poissona |ε_osi| = |ε_poprz|/ν = 0,0002/0,30 = 0,000667, czyli około 667 με. To maksymalne dopuszczalne wydłużenie osiowe wałka.',
      caption: 'ε_osi ≈ 667 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula:
        '|\\varepsilon_{osi}|=\\frac{|\\varepsilon_{poprz}|}{\\nu}=\\frac{0{,}0002}{0{,}30}=0{,}000667=667\\,\\mu\\varepsilon',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Przy zerowym ścinaniu środek koła wynosi 233,5 με, a promień 433,5 με. Skrajne odkształcenia to 667 με w kierunku osi i −200 με w kierunku poprzecznym.',
      caption: 'ε_sr = 233,5 με, R_ε = 433,5 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{667+(-200)}{2}=233{,}5\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{667-(-200)}{2}=433{,}5\\,\\mu\\varepsilon',
    },
    {
      title: 'Odczytaj kierunki główne',
      narration: 'Osie wałka są kierunkami głównymi, bo γ_xy = 0. Otrzymujemy ε_I = 667 με, ε_II = −200 με i φ = 0°.',
      caption: 'ε_I = 667 με, ε_II = −200 με, φ_I = 0°.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=233{,}5+433{,}5=667\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=233{,}5-433{,}5=-200\\,\\mu\\varepsilon,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Oblicz naprężenie osiowe',
      narration:
        'Przyjmujemy stal o E = 200 GPa. W stanie jednoosiowym σ = Eε = 200 000·0,000667 = 133,41 MPa. To sensowny zakres dla stali konstrukcyjnej.',
      caption: 'σ = 133,41 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma=E\\varepsilon=200\\,000\\cdot0{,}000667=133{,}41\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź czułość wymagania',
      narration:
        'Gdyby dopuszczalna zmiana średnicy była dziesięć razy mniejsza, limit naprężenia spadłby do około 13 MPa. Pokazuje to, jak rygorystyczne bywają wymagania wymiarowe w precyzyjnych pasowaniach.',
      caption: 'Kontrola: dziesięciokrotnie mniejszy limit daje σ ≈ 13,34 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma/10=133{,}41/10=13{,}34\\,\\text{MPa},\\qquad |\\varepsilon_{poprz}|=200\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
