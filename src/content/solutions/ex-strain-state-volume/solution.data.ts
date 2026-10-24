import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-volume',
  title: 'Zmiana objętości: ślad odkształcenia — przykład 1',
  duration: 7,
  given: ['E=200 GPa', 'nu=0', 'sigma_z=-120 MPa'],
  result:
    'Objętość zmniejsza się o 0,00072, czyli 0,072 %. Obie drogi obliczeń dają ten sam wynik, co potwierdza spójność wzorów.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: -0.00024, display: '−240 με' },
      { angle: 45, label: '45°', value: -0.00024, display: '−240 με' },
      { angle: 90, label: '90°', value: -0.00024, display: '−240 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: -0.00024,
      radius: 0,
      left: -0.00024,
      right: -0.00024,
      angle: 0,
    },
    values: [
      { label: 'σ_x=σ_y=σ_z', value: '−120 MPa', focus: 'stress', reveal: 0 },
      { label: 'E', value: '200 GPa', focus: 'stress', reveal: 0 },
      { label: 'ν', value: '0,30', focus: 'stress', reveal: 0 },
      { label: 'suma σ', value: '−360 MPa', focus: 'stress' },
      { label: 'p', value: '120 MPa', focus: 'stress' },
      { label: 'ε_x=ε_y=ε_z', value: '−240 με', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '−240 με', focus: 'mohr' },
      { label: 'R_ε', value: '0 με', focus: 'mohr' },
      { label: 'θ', value: '−720 με', focus: 'principal' },
      { label: 'ΔV/V₀', value: '−0,00072', focus: 'principal' },
      { label: 'K', value: '166 667 MPa', focus: 'stress' },
    ],
    note: 'W stanie hydrostatycznym wszystkie odkształcenia normalne są równe, a koło Mohra redukuje się do punktu.',
  },
  scenes: [
    {
      title: 'Zapisz stan naprężenia',
      narration:
        'Na element działa hydrostatyczne ściskanie: σ_x = σ_y = σ_z = −120 MPa. Wszystkie naprężenia normalne są równe, a naprężenia styczne zerowe.',
      caption: 'σ_x = σ_y = σ_z = −120 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=\\sigma_y=\\sigma_z=-120\\,\\text{MPa}',
    },
    {
      title: 'Oblicz sumę naprężeń',
      narration:
        'Suma trzech naprężeń normalnych wynosi −120 − 120 − 120 = −360 MPa. To ona, a nie pojedyncza składowa, decyduje o zmianie objętości.',
      caption: 'Suma σ = −360 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '-120-120-120=-360\\,\\text{MPa}',
    },
    {
      title: 'Oblicz ciśnienie hydrostatyczne',
      narration:
        'Ciśnienie hydrostatyczne to minus jedna trzecia sumy naprężeń: p = −(−360)/3 = 120 MPa. Znak dodatni oznacza ściskanie.',
      caption: 'p = 120 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'p=-\\frac{-360}{3}=120\\,\\text{MPa}',
    },
    {
      title: 'Oblicz odkształcenia normalne',
      narration:
        'W stanie hydrostatycznym ε = (1 − 2ν)σ/E. Dla ν = 0,30 współczynnik 1 − 2ν = 0,40, więc ε = 0,40·(−120)/200 000 = −0,00024, czyli −240 με w każdej osi.',
      caption: 'ε_x = ε_y = ε_z = −240 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon=\\frac{0{,}40\\cdot(-120)}{200\\,000}=-0{,}00024=-240\\,\\mu\\varepsilon',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Wszystkie odkształcenia normalne są równe, a ścinanie zerowe. Koło Mohra redukuje się do punktu o współrzędnej −240 με, więc promień wynosi zero.',
      caption: 'ε_sr = −240 με, R_ε = 0.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula: '\\varepsilon_{sr}=-240\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=0',
    },
    {
      title: 'Oblicz ślad tensora odkształcenia',
      narration:
        'Ślad tensora to suma trzech odkształceń normalnych: θ = −240 − 240 − 240 = −720 με, czyli −0,00072. Znak ujemny oznacza zmniejszenie objętości.',
      caption: 'θ = ΔV/V₀ = −0,00072.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula: '\\theta=\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=-240-240-240=-720\\,\\mu\\varepsilon=-0{,}00072',
    },
    {
      title: 'Oblicz moduł ściśliwości',
      narration:
        'Moduł ściśliwości K wiąże ciśnienie hydrostatyczne ze względną zmianą objętości. Dla E = 200 GPa i ν = 0,30 otrzymujemy K = E/[3(1 − 2ν)] = 200 000/(3·0,40) = 166 667 MPa.',
      caption: 'K = 166 667 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'K=\\frac{E}{3(1-2\\nu)}=\\frac{200\\,000}{3\\cdot0{,}40}=166\\,667\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź wynik przez K',
      narration:
        'Kontrola przez moduł ściśliwości: ΔV/V₀ = −p/K = −120/166 667 = −0,00072. Otrzymujemy tę samą wartość, co ze śladu tensora, więc obie drogi są spójne.',
      caption: 'Kontrola: −120/166 667 = −0,00072.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '-\\frac{p}{K}=-\\frac{120}{166\\,667}=-0{,}00072,\\qquad |\\varepsilon_x|=240\\,\\mu\\varepsilon,\\qquad |\\theta|=720\\,\\mu\\varepsilon,\\qquad |\\sum\\sigma|=360\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
