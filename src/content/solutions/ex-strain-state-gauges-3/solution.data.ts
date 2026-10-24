import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-gauges-3',
  title: 'Tensometry: od oporu do odkształcenia — przykład 3',
  duration: 7,
  given: ['R_0=350', 'GF=2'],
  result:
    'Z tego samego rachunku wynika, dlaczego tensometry mają zwykle opór 120 lub 350 Ω, a nie bardzo mały. Większy opór początkowy daje większą bezwzględną zmianę Δ R przy tym samym GF i ε, co ułatwia pomiar. Nie można jednak zwiększać oporu dowolnie, bo rośnie też szum i maleje odporność na zakłócenia.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.000001, display: '1 με' },
      { angle: 45, label: '45°', value: 0.0000005, display: '0,5 με' },
      { angle: 90, label: '90°', value: 0, display: '0 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.0000005,
      radius: 0.0000005,
      left: 0,
      right: 0.000001,
      angle: 0,
    },
    values: [
      { label: 'R₀', value: '350 Ω', focus: 'gauges', reveal: 0 },
      { label: 'GF', value: '2,0', focus: 'gauges', reveal: 0 },
      { label: 'ε', value: '1 με', focus: 'gauges', reveal: 0 },
      { label: 'ε_x', value: '1 με', focus: 'gauges' },
      { label: 'ε_y', value: '0 με', focus: 'gauges' },
      { label: 'ΔR', value: '0,0007 Ω', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '0,5 με', focus: 'mohr' },
      { label: 'R_ε', value: '0,5 με', focus: 'mohr' },
      { label: 'ε_I', value: '1 με', focus: 'principal' },
      { label: 'ε_II', value: '0 με', focus: 'principal' },
      { label: 'σ', value: '0,20 MPa', focus: 'stress' },
    ],
    note: 'Zmiana oporu 0,7 mΩ jest tak mała, że zwykły omomierz jej nie rozdzieli — konieczny jest mostek tensometryczny.',
  },
  scenes: [
    {
      title: 'Zapisz cel pomiaru',
      narration:
        'Chcemy wykryć zmianę odkształcenia o 1 με czujnikiem o oporze bazowym 350 Ω i współczynniku GF = 2,0. Sprawdzimy, jakiej zmiany oporu należy szukać.',
      caption: 'Dane: R₀ = 350 Ω, GF = 2,0, ε = 1 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: 'R_0=350\\,\\Omega,\\qquad GF=2{,}0,\\qquad \\varepsilon=1\\,\\mu\\varepsilon',
    },
    {
      title: 'Oblicz względną zmianę oporu',
      narration:
        'Z definicji współczynnika tensometru ΔR/R₀ = GF·ε = 2,0 · 1·10⁻⁶ = 2·10⁻⁶. Względna zmiana jest więc zaledwie dwumilionowa.',
      caption: 'ΔR/R₀ = 2·10⁻⁶.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\frac{\\Delta R}{R_0}=GF\\,\\varepsilon=2{,}0\\cdot1\\cdot10^{-6}=2\\cdot10^{-6}',
    },
    {
      title: 'Oblicz bezwzględną zmianę oporu',
      narration:
        'Mnożymy względną zmianę przez opór bazowy: ΔR = 2·10⁻⁶ · 350 = 0,0007 Ω, czyli 0,7 mΩ. To mniej niż opór przewodów połączeniowych i mniej niż dryft termiczny zwykłego multimetru.',
      caption: 'ΔR = 0,0007 Ω = 0,7 mΩ.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\Delta R=GF\\,\\varepsilon\\,R_0=2{,}0\\cdot1\\cdot10^{-6}\\cdot350=0{,}0007\\,\\Omega',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Przyjmujemy, że mierzone odkształcenie działa tylko w kierunku czujnika, a poprzeczne jest zerowe. Środek i promień koła wynoszą po 0,5 με, a γ_xy = 0.',
      caption: 'ε_sr = 0,5 με, R_ε = 0,5 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{1+0}{2}=0{,}5\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{1-0}{2}=0{,}5\\,\\mu\\varepsilon',
    },
    {
      title: 'Odczytaj kierunki główne',
      narration:
        'Bez ścinania kierunek czujnika jest kierunkiem głównym. Otrzymujemy ε_I = 1 με i ε_II = 0, a kąt φ = 0°.',
      caption: 'ε_I = 1 με, ε_II = 0, φ_I = 0°.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=0{,}5+0{,}5=1\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=0{,}5-0{,}5=0,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Przyjmij materiał i przelicz na naprężenie',
      narration:
        'Dla stali E = 200 GPa odkształcenie 1 με odpowiada naprężeniu 0,20 MPa przy założeniu jednoosiowym. Sam sygnał jest więc bardzo mały, ale fizycznie mierzalny po wzmocnieniu mostka.',
      caption: 'σ = Eε = 0,20 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma=E\\varepsilon=200\\,000\\cdot1\\cdot10^{-6}=0{,}20\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź dobór oporu bazowego',
      narration:
        'Dla porównania czujnik 120 Ω dałby tylko 0,00024 Ω, czyli 0,24 mΩ. Większy opór bazowy zwiększa sygnał bezwzględny, dlatego stosuje się 350 Ω, ale zbyt duży opór pogarsza stosunek sygnału do szumu.',
      caption: 'Kontrola: dla 120 Ω zmiana wynosi 0,00024 Ω.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '2{,}0\\cdot1\\cdot10^{-6}\\cdot120=0{,}00024\\,\\Omega',
    },
  ],
} satisfies SolutionData
