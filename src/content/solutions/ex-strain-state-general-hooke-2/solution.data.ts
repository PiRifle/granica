import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-general-hooke-2',
  title: 'Uogólnione prawo Hooke’a: wszystkie osie naraz — przykład 2',
  duration: 7,
  given: ['sigma_z=0', 'sigma_x=120 MPa', 'sigma_y=0', 'E=200 GPa', 'nu=0'],
  result:
    'Gdyby ktoś błędnie przyjął, że w kierunku z nie ma odkształcenia, popełniłby błąd rzędu 180 με. Przy pomiarze tensometrycznym to wartość całkowicie mierzalna, więc założenie płaskiego stanu odkształcenia zamiast płaskiego stanu naprężenia musi być świadome.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0006, display: '600 με' },
      { angle: 45, label: '45°', value: 0.00021, display: '210 με' },
      { angle: 90, label: '90°', value: -0.00018, display: '−180 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.00021,
      radius: 0.00039,
      left: -0.00018,
      right: 0.0006,
      angle: 0,
    },
    values: [
      { label: 'σ_x', value: '120 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '0 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_z', value: '0 MPa', focus: 'stress', reveal: 0 },
      { label: 'ε_x', value: '600 με', focus: 'gauges' },
      { label: 'ε_y', value: '−180 με', focus: 'gauges' },
      { label: 'ε_z', value: '−180 με', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '210 με', focus: 'mohr' },
      { label: 'R_ε', value: '390 με', focus: 'mohr' },
      { label: 'ε_I', value: '600 με', focus: 'principal' },
      { label: 'ε_II', value: '−180 με', focus: 'principal' },
      { label: 'φ_I', value: '0°', focus: 'angle' },
    ],
    note: 'Płaski stan naprężenia nie oznacza płaskiego stanu odkształcenia: ε_z jest niezerowe, bo grubość blachy zmienia się przez efekt Poissona.',
  },
  scenes: [
    {
      title: 'Zapisz płaski stan naprężenia',
      narration:
        'Cienka blacha jest rozciągana naprężeniem σ_x = 120 MPa, a σ_y = 0 i σ_z = 0. To płaski stan naprężenia, ale nie płaski stan odkształcenia — grubość może się zmieniać.',
      caption: 'σ_x = 120 MPa, σ_y = σ_z = 0.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=120\\,\\text{MPa},\\qquad \\sigma_y=0,\\qquad \\sigma_z=0',
    },
    {
      title: 'Oblicz odkształcenie w kierunku x',
      narration: 'W kierunku x działa tylko σ_x, więc ε_x = σ_x/E = 120/200 000 = 0,0006, czyli 600 με.',
      caption: 'ε_x = 600 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_x=\\frac{120}{200\\,000}=0{,}0006=600\\,\\mu\\varepsilon',
    },
    {
      title: 'Oblicz odkształcenie w kierunku y',
      narration:
        'W kierunku y nie ma naprężenia, ale rozciąganie w x powoduje skurcz poprzeczny. ε_y = −νσ_x/E = −0,30·120/200 000 = −0,00018, czyli −180 με.',
      caption: 'ε_y = −180 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_y=\\frac{0-0{,}30\\cdot120}{200\\,000}=-0{,}00018=-180\\,\\mu\\varepsilon',
    },
    {
      title: 'Oblicz odkształcenie grubości',
      narration:
        'W kierunku z naprężenie jest zerowe, więc ε_z = −ν(σ_x + σ_y)/E = −νσ_x/E. Wartość jest taka sama jak ε_y, czyli −180 με. Grubość blachy maleje o 0,018%.',
      caption: 'ε_z = −180 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_z=\\frac{0-0{,}30(120+0)}{200\\,000}=-0{,}00018=-180\\,\\mu\\varepsilon',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'W płaszczyźnie xy ścinanie jest zerowe, więc koło ma środek 210 με i promień 390 με. Skrajne odkształcenia normalne to 600 με i −180 με.',
      caption: 'ε_sr = 210 με, R_ε = 390 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{600+(-180)}{2}=210\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{600-(-180)}{2}=390\\,\\mu\\varepsilon',
    },
    {
      title: 'Odczytaj kierunki główne',
      narration: 'Bez ścinania osie x i y są już kierunkami głównymi. ε_I = 600 με, ε_II = −180 με, a φ = 0°.',
      caption: 'ε_I = 600 με, ε_II = −180 με, φ_I = 0°.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=210+390=600\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=210-390=-180\\,\\mu\\varepsilon,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Przyjmij model materiału',
      narration:
        'Model jest już określony przez E = 200 GPa i ν = 0,30. Dla płaskiego stanu naprężenia nie używamy modułu ściśliwości ani trzeciosiowego układu równań, ale trzecie odkształcenie normalne nadal obliczamy.',
      caption: 'E = 200 GPa, ν = 0,30, σ_z = 0.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'E=200\\,000\\,\\text{MPa},\\qquad \\nu=0{,}30,\\qquad \\sigma_z=0',
    },
    {
      title: 'Sprawdź błąd założenia płaskiego odkształcenia',
      narration:
        'Gdyby błędnie przyjąć ε_z = 0, błąd wyniósłby 180 με. To wartość w pełni mierzalna tensometrem, więc wybór między płaskim stanem naprężenia a płaskim stanem odkształcenia musi być świadomy.',
      caption: 'Kontrola: |ε_y| = |ε_z| = 180 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula: '|\\varepsilon_y|=|\\varepsilon_z|=180\\,\\mu\\varepsilon,\\qquad \\varepsilon_x=600\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
