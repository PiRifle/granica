import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-poisson',
  title: 'Efekt Poissona: dlaczego pręt robi się cieńszy — przykład 1',
  duration: 7,
  given: ['E=200 GPa', 'nu=0', 'd_0=16 mm', 'varepsilon_x=900'],
  result:
    'Średnica zmniejsza się o około 0,0043 mm, czyli 4,3 μm. Odkształcenie poprzeczne wynosi -270 με, a naprężenie osiowe około 180 MPa.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0009, display: '900 με' },
      { angle: 45, label: '45°', value: 0.000315, display: '315 με' },
      { angle: 90, label: '90°', value: -0.00027, display: '−270 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.000315,
      radius: 0.000585,
      left: -0.00027,
      right: 0.0009,
      angle: 0,
    },
    values: [
      { label: 'ε_x', value: '900 με', focus: 'gauges', reveal: 0 },
      { label: 'd₀', value: '16 mm', focus: 'gauges', reveal: 0 },
      { label: 'E', value: '200 GPa', focus: 'stress', reveal: 0 },
      { label: 'ν', value: '0,30', focus: 'stress', reveal: 0 },
      { label: 'ε_y', value: '−270 με', focus: 'gauges' },
      { label: 'Δd', value: '−0,00432 mm', focus: 'gauges' },
      { label: 'd', value: '15,99568 mm', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '315 με', focus: 'mohr' },
      { label: 'R_ε', value: '585 με', focus: 'mohr' },
      { label: 'ε_I', value: '900 με', focus: 'principal' },
      { label: 'ε_II', value: '−270 με', focus: 'principal' },
      { label: 'σ_x', value: '180 MPa', focus: 'stress' },
    ],
    note: 'Efekt Poissona jest poprzeczny: wydłużenie osiowe wywołuje skurcz średnicy, mimo że w kierunku poprzecznym nie działa naprężenie.',
  },
  scenes: [
    {
      title: 'Zamień odkształcenie na wartość bezwymiarową',
      narration:
        'Odkształcenie osiowe 900 με to 900·10⁻⁶ = 0,0009. W kierunku x pręt wydłuża się, więc ε_x jest dodatnie.',
      caption: 'ε_x = 900·10⁻⁶ = 0,0009.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_x=900\\cdot10^{-6}=0{,}0009',
    },
    {
      title: 'Oblicz odkształcenie poprzeczne',
      narration:
        'Z definicji liczby Poissona ε_y = −νε_x. Po podstawieniu ν = 0,30 otrzymujemy −0,30·0,0009 = −0,00027, czyli −270 με.',
      caption: 'ε_y = −270 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_y=-\\nu\\varepsilon_x=-0{,}30\\cdot0{,}0009=-0{,}00027',
    },
    {
      title: 'Oblicz zmianę średnicy',
      narration:
        'Zmiana średnicy to iloczyn odkształcenia poprzecznego i średnicy początkowej: Δd = ε_y·d₀ = −0,00027·16 = −0,00432 mm. Średnica maleje, bo ε_y jest ujemne.',
      caption: 'Δd = −0,00432 mm.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\Delta d=\\varepsilon_y d_0=-0{,}00027\\cdot16=-0{,}00432\\,\\text{mm}',
    },
    {
      title: 'Oblicz nową średnicę',
      narration:
        'Odejmujemy skurcz od średnicy początkowej: d = 16 − 0,00432 = 15,99568 mm. Zmiana jest więc niewielka, ale mierzalna.',
      caption: 'd = 15,99568 mm.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: 'd=d_0+\\Delta d=16-0{,}00432=15{,}99568\\,\\text{mm}',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Przy zerowym ścinaniu koło ma środek 315 με i promień 585 με. Skrajne odkształcenia to 900 με w kierunku osi i −270 με w kierunku poprzecznym.',
      caption: 'ε_sr = 315 με, R_ε = 585 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{900+(-270)}{2}=315\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{900-(-270)}{2}=585\\,\\mu\\varepsilon',
    },
    {
      title: 'Odczytaj kierunki główne',
      narration: 'Osie pręta są kierunkami głównymi, bo γ_xy = 0. ε_I = 900 με, a ε_II = −270 με; kąt φ = 0°.',
      caption: 'ε_I = 900 με, ε_II = −270 με, φ_I = 0°.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=315+585=900\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=315-585=-270\\,\\mu\\varepsilon,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Oblicz naprężenie osiowe',
      narration:
        'W stanie jednoosiowym σ_x = Eε_x = 200 000·0,0009 = 180 MPa. To naprężenie jest poniżej typowej granicy plastyczności stali, więc model sprężysty jest uzasadniony.',
      caption: 'σ_x = 180 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=E\\varepsilon_x=200\\,000\\cdot0{,}0009=180\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź wynik',
      narration:
        'Kontrola: ε_y/ε_x = −0,00027/0,0009 = −0,30 = −ν, zgodnie z definicją. Stosunek skurczu poprzecznego do wydłużenia osiowego jest więc poprawny.',
      caption: 'Kontrola: ε_y/ε_x = −0,30.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\frac{\\varepsilon_y}{\\varepsilon_x}=\\frac{-0{,}00027}{0{,}0009}=-0{,}30,\\qquad |\\Delta d|=0{,}00432\\,\\text{mm},\\qquad |\\varepsilon_y|=270\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
