import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-rosette',
  title: 'Rozeta 0°/45°/90°: trzy odczyty, pełny obraz — przykład 1',
  duration: 7,
  given: ['varepsilon_0=800', 'varepsilon_{45}=500', 'varepsilon_{90}=200'],
  result:
    'ε_1=800 με, ε_2=200 με i γ_max=600 μrad. Zerowa wartość γ_xy oznacza, że w tym punkcie nie ma ścinania względem osi rozety, a kierunki główne pokrywają się z osiami czujników.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0008, display: '800 με' },
      { angle: 45, label: '45°', value: 0.0005, display: '500 με' },
      { angle: 90, label: '90°', value: 0.0002, display: '200 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.0005,
      radius: 0.0003,
      left: 0.0002,
      right: 0.0008,
      angle: 0,
    },
    values: [
      { label: 'ε₀', value: '800 με', focus: 'gauges', reveal: 0 },
      { label: 'ε₄₅', value: '500 με', focus: 'gauges', reveal: 0 },
      { label: 'ε₉₀', value: '200 με', focus: 'gauges', reveal: 0 },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '500 με', focus: 'mohr' },
      { label: 'R_ε', value: '300 με', focus: 'mohr' },
      { label: 'ε_I', value: '800 με', focus: 'principal' },
      { label: 'ε_II', value: '200 με', focus: 'principal' },
      { label: 'φ_I', value: '0°', focus: 'angle' },
      { label: 'σ_I', value: '189,01 MPa', focus: 'stress' },
      { label: 'σ_II', value: '96,70 MPa', focus: 'stress' },
    ],
    note: 'Czujnik 45° daje dokładnie średnią odczytów 0° i 90°, więc ścinanie znika, a osie rozety są już kierunkami głównymi.',
  },
  scenes: [
    {
      title: 'Przypisz odczyty do osi',
      narration:
        'Czujnik 0° mierzy odkształcenie normalne w kierunku x, a czujnik 90° w kierunku y. Odczyty wynoszą odpowiednio 800 με i 200 με. Czujnik 45° rejestruje 500 με, czyli dokładnie tyle, ile średnia dwóch skrajnych kierunków.',
      caption: 'Trzy czujniki rozety dają ε₀ = 800 με, ε₄₅ = 500 με i ε₉₀ = 200 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula:
        '\\varepsilon_0=800\\,\\mu\\varepsilon,\\qquad \\varepsilon_{45}=500\\,\\mu\\varepsilon,\\qquad \\varepsilon_{90}=200\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenie postaciowe',
      narration:
        'Transformacja odkształcenia dla kierunku 45° pozwala wyznaczyć γ_xy z trzech odczytów. Otrzymujemy zero, więc względem osi rozety nie ma ścinania.',
      caption: 'γ_xy = 2 · 500 − 800 − 200 = 0 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula: '\\gamma_{xy}=2\\varepsilon_{45}-\\varepsilon_0-\\varepsilon_{90}=2\\cdot500-800-200=0',
    },
    {
      title: 'Oblicz środek i promień koła',
      narration:
        'Środek koła Mohra to średnia odkształceń normalnych, a promień równa się połowie ich różnicy, bo γ_xy = 0. Koło jest więc styczne do pionowej osi układu.',
      caption: 'ε_sr = 500 με, R_ε = 300 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{800+200}{2}=500\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{800-200}{2}=300\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenia główne',
      narration:
        'Odkształcenia główne to skrajne punkty koła: średnia plus i minus promień. Otrzymujemy 800 με oraz 200 με, czyli wartości pokrywające się z odczytami czujników.',
      caption: 'ε_I = 800 με, ε_II = 200 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula: '\\varepsilon_I=500+300=800\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=500-300=200\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz kierunki główne',
      narration:
        'Kąt kierunku głównego wynika z tangensa podwójnego kąta. Ponieważ γ_xy = 0 i ε₀ > ε₉₀, tangens jest równy zeru, więc kierunki główne pokrywają się z osiami 0° i 90°.',
      caption: 'φ_I = 0°, φ_II = 90°.',
      visual: 'rosette',
      focus: { metric: 'angle' },
      formula:
        '\\tan2\\varphi_I=\\frac{\\gamma_{xy}}{\\varepsilon_0-\\varepsilon_{90}}=\\frac{0}{800-200}=0,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Przyjmij model materiału',
      narration:
        'Aby przejść od odkształceń do naprężeń, przyjmujemy stal izotropową o module Younga 200 GPa i liczbie Poissona 0,30. Dla płaskiego stanu naprężenia używamy czynnika E/(1 − ν²).',
      caption: 'E = 200 000 MPa, ν = 0,30, E/(1 − ν²) = 219 780 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'E=200\\,000\\,\\text{MPa},\\qquad \\nu=0{,}30,\\qquad \\frac{E}{1-\\nu^2}=219\\,780\\,\\text{MPa}',
    },
    {
      title: 'Przelicz odkształcenia na naprężenia',
      narration:
        'W kierunkach głównych odwracamy prawo Hooke’a dla płaskiego stanu naprężenia. Pierwsze naprężenie jest rozciągające, drugie również dodatnie, ale mniejsze.',
      caption: 'σ_I = 189,01 MPa, σ_II = 96,70 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_I=219\\,780\\cdot(800+0{,}30\\cdot200)\\cdot10^{-6}=189{,}01\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(200+0{,}30\\cdot800)\\cdot10^{-6}=96{,}70\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź spójność wyniku',
      narration:
        'Suma naprężeń głównych odpowiada sumie odkształceń przez ten sam czynnik materiałowy. Oba naprężenia są dodatnie, więc w płaszczyźnie pomiaru materiał jest rozciągany w obu kierunkach głównych.',
      caption: 'Kontrola: σ_I + σ_II = 285,71 MPa przy ε_I + ε_II = 1 000 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\sigma_I+\\sigma_{II}=189{,}01+96{,}70=285{,}71\\,\\text{MPa},\\qquad \\varepsilon_I+\\varepsilon_{II}=800+200=1\\,000\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
