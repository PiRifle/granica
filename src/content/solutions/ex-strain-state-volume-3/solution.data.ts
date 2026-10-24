import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-volume-3',
  title: 'Zmiana objętości: ślad odkształcenia — przykład 3',
  duration: 7,
  given: ['V_0=-0', 'p=200 MPa', 'nu=0'],
  result:
    'Otrzymaliśmy typowe wartości dla stali. Gdyby wyliczony moduł Younga wyszedł na przykład 20 GPa albo 2000 GPa, należałoby sprawdzić jednostki, znak ciśnienia lub założenie o hydrostatyczności stanu. W rzeczywistym zbiorniku ścianki są rozciągane w dwóch kierunkach, więc czyste ściskanie hydrostatyczne byłoby zbyt dużym uproszczeniem.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: -0.0004, display: '−400 με' },
      { angle: 45, label: '45°', value: -0.0004, display: '−400 με' },
      { angle: 90, label: '90°', value: -0.0004, display: '−400 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: -0.0004,
      radius: 0,
      left: -0.0004,
      right: -0.0004,
      angle: 0,
    },
    values: [
      { label: 'p', value: '200 MPa', focus: 'stress', reveal: 0 },
      { label: 'ΔV/V₀', value: '−0,0012', focus: 'principal', reveal: 0 },
      { label: 'ν', value: '0,30', focus: 'stress', reveal: 0 },
      { label: 'K', value: '166 667 MPa', focus: 'stress' },
      { label: 'E', value: '200 000 MPa', focus: 'stress' },
      { label: 'ε_x=ε_y=ε_z', value: '−400 με', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '−400 με', focus: 'mohr' },
      { label: 'R_ε', value: '0 με', focus: 'mohr' },
      { label: 'θ', value: '−1200 με', focus: 'principal' },
      { label: 'σ', value: '−200 MPa', focus: 'stress' },
    ],
    note: 'Przy ściskaniu hydrostatycznym wszystkie trzy odkształcenia normalne są równe i ujemne, a koło Mohra redukuje się do punktu.',
  },
  scenes: [
    {
      title: 'Zapisz dane pomiarowe',
      narration:
        'W zbiorniku pod ciśnieniem zmierzono względną zmianę objętości ΔV/V₀ = −0,0012 przy ciśnieniu p = 200 MPa. Zakładamy sprężyste, hydrostatyczne ściskanie i ν = 0,30.',
      caption: 'p = 200 MPa, ΔV/V₀ = −0,0012, ν = 0,30.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'p=200\\,\\text{MPa},\\qquad \\frac{\\Delta V}{V_0}=-0{,}0012,\\qquad \\nu=0{,}30',
    },
    {
      title: 'Zapisz definicję modułu ściśliwości',
      narration:
        'Moduł ściśliwości K wiąże ciśnienie hydrostatyczne ze względną zmianą objętości: K = −p/(ΔV/V₀). Znak minus sprawia, że przy ściskaniu K jest dodatnie.',
      caption: 'K = −p/(ΔV/V₀).',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'K=-\\frac{p}{\\Delta V/V_0}',
    },
    {
      title: 'Oblicz moduł ściśliwości',
      narration: 'Podstawiamy p = 200 MPa i ΔV/V₀ = −0,0012: K = −200/(−0,0012) = 166 667 MPa, czyli około 166,7 GPa.',
      caption: 'K = 166 667 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'K=-\\frac{200}{-0{,}0012}=166\\,667\\,\\text{MPa}',
    },
    {
      title: 'Przejdź do modułu Younga',
      narration:
        'Dla materiału izotropowego K = E/[3(1 − 2ν)], więc E = 3K(1 − 2ν). Dla ν = 0,30 współczynnik 1 − 2ν wynosi 0,40.',
      caption: 'E = 3K(1 − 2ν).',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'E=3K(1-2\\nu),\\qquad 1-2\\cdot0{,}30=0{,}40',
    },
    {
      title: 'Oblicz moduł Younga',
      narration:
        'E = 3·166 667·0,40 = 200 000 MPa = 200 GPa. To typowa wartość dla stali, co potwierdza sensowność przyjętych założeń.',
      caption: 'E = 200 000 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'E=3\\cdot166\\,667\\cdot0{,}40=200\\,000\\,\\text{MPa}',
    },
    {
      title: 'Oblicz odkształcenia normalne',
      narration:
        'W stanie hydrostatycznym θ = 3ε, więc ε = θ/3 = −0,0012/3 = −0,0004, czyli −400 με w każdej osi. Wszystkie trzy kierunki są równouprawnione.',
      caption: 'ε_x = ε_y = ε_z = −400 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon=\\frac{\\theta}{3}=\\frac{-0{,}0012}{3}=-0{,}0004=-400\\,\\mu\\varepsilon',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Wszystkie odkształcenia normalne są równe, a ścinanie zerowe. Koło Mohra redukuje się do punktu o współrzędnej −400 με, więc promień wynosi zero.',
      caption: 'ε_sr = −400 με, R_ε = 0.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula: '\\varepsilon_{sr}=-400\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=0',
    },
    {
      title: 'Sprawdź znak i rząd wielkości',
      narration:
        'Moduł Younga 200 GPa i odkształcenie −400 με są typowe dla stali. Gdyby E wyszło 20 GPa albo 2000 GPa, trzeba by sprawdzić jednostki, znak ciśnienia lub założenie o hydrostatyczności. W rzeczywistym zbiorniku ścianki są rozciągane w dwóch kierunkach, więc czyste ściskanie hydrostatyczne jest uproszczeniem.',
      caption: 'Kontrola: 3·(−400) = −1200 με = −0,0012.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '3\\cdot(-400)=-1200\\,\\mu\\varepsilon=-0{,}0012,\\qquad \\sigma=-200\\,\\text{MPa},\\qquad |\\varepsilon|=400\\,\\mu\\varepsilon,\\qquad |\\theta|=1200\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
