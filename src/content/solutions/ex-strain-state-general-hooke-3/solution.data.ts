import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-general-hooke-3',
  title: 'Uogólnione prawo Hooke’a: wszystkie osie naraz — przykład 3',
  duration: 7,
  given: ['varepsilon_x=500', 'varepsilon_y=-150', 'E=200 GPa', 'nu=0'],
  result:
    'Gdyby zmierzone ε_y było dodatnie, wniosek o czystym rozciąganiu byłby fałszywy. Trzeba by wrócić do pełnego układu równań i rozważyć naprężenie σ_y lub odkształcenie termiczne.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0005, display: '500 με' },
      { angle: 45, label: '45°', value: 0.000175, display: '175 με' },
      { angle: 90, label: '90°', value: -0.00015, display: '−150 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.000175,
      radius: 0.000325,
      left: -0.00015,
      right: 0.0005,
      angle: 0,
    },
    values: [
      { label: 'ε_x', value: '500 με', focus: 'gauges', reveal: 0 },
      { label: 'ε_y', value: '−150 με', focus: 'gauges', reveal: 0 },
      { label: 'E', value: '200 GPa', focus: 'stress', reveal: 0 },
      { label: 'ν', value: '0,30', focus: 'stress', reveal: 0 },
      { label: 'σ_x', value: '100 MPa', focus: 'stress' },
      { label: 'σ_y', value: '0 MPa', focus: 'stress' },
      { label: 'ε_z', value: '−150 με', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '175 με', focus: 'mohr' },
      { label: 'R_ε', value: '325 με', focus: 'mohr' },
      { label: 'ε_I', value: '500 με', focus: 'principal' },
      { label: 'ε_II', value: '−150 με', focus: 'principal' },
      { label: 'φ_I', value: '0°', focus: 'angle' },
    ],
    note: 'Zgodność zmierzonego ε_y z przewidywaniem −νσ_x/E jest testem, czy stan jest rzeczywiście jednoosiowy.',
  },
  scenes: [
    {
      title: 'Zapisz odczyty tensometrów',
      narration:
        'Wzdłuż osi x zmierzono ε_x = 500 με, a wzdłuż osi y ε_y = −150 με. Materiał ma E = 200 GPa i ν = 0,30. Zakładamy, że badany punkt jest w stanie jednoosiowym i sprawdzamy, czy to założenie jest spójne.',
      caption: 'ε_x = 500 με, ε_y = −150 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_x=500\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=-150\\,\\mu\\varepsilon',
    },
    {
      title: 'Oblicz naprężenie z prawa Hooke’a',
      narration:
        'Dla jednoosiowego rozciągania ε_x = σ_x/E, więc σ_x = Eε_x = 200 000 · 0,0005 = 100 MPa. To naprężenie jest dodatnie, czyli materiał jest rozciągany.',
      caption: 'σ_x = 100 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=E\\varepsilon_x=200\\,000\\cdot0{,}0005=100\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź przewidywane odkształcenie poprzeczne',
      narration:
        'W stanie jednoosiowym odkształcenie poprzeczne wynosi ε_y = −νε_x = −0,30·0,0005 = −0,00015, czyli −150 με. Dokładnie tyle zmierzono, więc hipoteza jednoosiowości jest spójna z danymi.',
      caption: 'Przewidywane ε_y = −150 με, zgodne z pomiarem.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_y=-\\nu\\varepsilon_x=-0{,}30\\cdot0{,}0005=-0{,}00015=-150\\,\\mu\\varepsilon',
    },
    {
      title: 'Oblicz odkształcenie grubości',
      narration:
        'W stanie jednoosiowym ε_z = −νε_x, tak samo jak ε_y. Grubość elementu maleje o 150 με, mimo że w kierunku z nie działa żadne naprężenie.',
      caption: 'ε_z = −150 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_z=-\\nu\\varepsilon_x=-0{,}30\\cdot0{,}0005=-150\\,\\mu\\varepsilon',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Przy zerowym ścinaniu koło ma środek 175 με i promień 325 με. Skrajne odkształcenia to 500 με i −150 με.',
      caption: 'ε_sr = 175 με, R_ε = 325 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{500+(-150)}{2}=175\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{500-(-150)}{2}=325\\,\\mu\\varepsilon',
    },
    {
      title: 'Odczytaj kierunki główne',
      narration:
        'Kierunki x i y są kierunkami głównymi, bo γ_xy = 0. Otrzymujemy ε_I = 500 με, ε_II = −150 με i φ = 0°.',
      caption: 'ε_I = 500 με, ε_II = −150 με, φ_I = 0°.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=175+325=500\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=175-325=-150\\,\\mu\\varepsilon,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Sprawdź naprężenie w kierunku y',
      narration:
        'W płaskim stanie naprężenia σ_y = 0. Gdyby zmierzone ε_y było dodatnie, wniosek o czystym rozciąganiu byłby fałszywy — trzeba by wrócić do pełnego układu równań i rozważyć σ_y lub odkształcenie termiczne.',
      caption: 'σ_y = 0 MPa w przyjętym stanie jednoosiowym.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma_y=0\\,\\text{MPa},\\qquad \\sigma_x=100\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź spójność wyniku',
      narration:
        'Trzy odkształcenia normalne mają sumę 500 − 150 − 150 = 200 με. Objętość rośnie, bo wydłużenie w kierunku x przewyższa dwa skurcze poprzeczne. Cały rachunek jest spójny z modelem jednoosiowym.',
      caption: 'Kontrola: 500 − 150 − 150 = 200 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=500-150-150=200\\,\\mu\\varepsilon,\\qquad |\\varepsilon_y|=150\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
