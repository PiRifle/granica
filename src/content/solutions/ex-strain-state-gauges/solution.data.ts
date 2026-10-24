import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-gauges',
  title: 'Tensometry: od oporu do odkształcenia — przykład 1',
  duration: 7,
  given: ['R_0=350', 'GF=2', 'R=0'],
  result:
    'Czujnik wskazuje ε=200 με, czyli wydłużenie względne 0,02 % w kierunku swojej osi, uśrednione na bazie. Wynik jest spójny z danymi i nie wymaga poprawki na jednostki.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0002, display: '200 με' },
      { angle: 45, label: '45°', value: 0.0001, display: '100 με' },
      { angle: 90, label: '90°', value: 0, display: '0 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.0001,
      radius: 0.0001,
      left: 0,
      right: 0.0002,
      angle: 0,
    },
    values: [
      { label: 'R₀', value: '350 Ω', focus: 'gauges', reveal: 0 },
      { label: 'GF', value: '2,10', focus: 'gauges', reveal: 0 },
      { label: 'ΔR', value: '0,147 Ω', focus: 'gauges' },
      { label: 'ε', value: '200 με', focus: 'gauges' },
      { label: 'ε_x', value: '200 με', focus: 'gauges' },
      { label: 'ε_y', value: '0 με', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '100 με', focus: 'mohr' },
      { label: 'R_ε', value: '100 με', focus: 'mohr' },
      { label: 'ε_I', value: '200 με', focus: 'principal' },
      { label: 'ε_II', value: '0 με', focus: 'principal' },
      { label: 'φ_I', value: '0°', focus: 'angle' },
      { label: 'σ', value: '40,00 MPa', focus: 'stress' },
    ],
    note: 'Czujnik mierzy odkształcenie tylko w swojej osi; pozostałe kierunki na rysunku uzupełniono zerami, aby pokazać interpretację rozety.',
  },
  scenes: [
    {
      title: 'Oblicz względną zmianę oporu',
      narration:
        'Opór czujnika wzrósł o 0,147 Ω względem bazy 350 Ω. Względna zmiana wynosi więc 0,147/350 = 0,00042. To wielkość bezwymiarowa, niezależna od jednostki oporu.',
      caption: 'ΔR/R₀ = 0,147/350 = 0,00042.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\frac{\\Delta R}{R_0}=\\frac{0{,}147}{350}=0{,}00042',
    },
    {
      title: 'Wyznacz odkształcenie z współczynnika GF',
      narration:
        'Współczynnik tensometru GF = 2,10 wiąże względną zmianę oporu z odkształceniem. Dzieląc 0,00042 przez 2,10, otrzymujemy ε = 0,0002.',
      caption: 'ε = (ΔR/R₀)/GF = 0,0002.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon=\\frac{\\Delta R/R_0}{GF}=\\frac{0{,}00042}{2{,}10}=0{,}0002',
    },
    {
      title: 'Przelicz na mikrostrainy',
      narration:
        'Mnożymy wynik przez 10⁶: 0,0002 · 10⁶ = 200 με. Czujnik mierzy więc wydłużenie względne 0,02% w kierunku swojej osi.',
      caption: 'ε = 200 με = 0,02%.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '0{,}0002\\cdot10^6=200\\,\\mu\\varepsilon',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Znamy tylko odkształcenie w kierunku czujnika. Dla ilustracji przyjmujemy zerowe odkształcenie poprzeczne, więc środek koła i promień wynoszą po 100 με, a γ_xy = 0.',
      caption: 'ε_sr = 100 με, R_ε = 100 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{200+0}{2}=100\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{200-0}{2}=100\\,\\mu\\varepsilon',
    },
    {
      title: 'Odczytaj kierunki główne',
      narration:
        'Przy zerowym ścinaniu kierunek czujnika jest jednocześnie kierunkiem głównym. ε_I = 200 με, ε_II = 0, a kąt φ = 0°.',
      caption: 'ε_I = 200 με, ε_II = 0, φ_I = 0°.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=100+100=200\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=100-100=0,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Przyjmij model materiału',
      narration:
        'Jeżeli czujnik jest przyklejony do elementu rozciąganego jednoosiowo, prawo Hooke’a daje σ = Eε. Dla stali E = 200 GPa otrzymujemy 40 MPa. To wartość orientacyjna, bo pomiar nie rozstrzyga sam o jednoosiowości.',
      caption: 'Przy założeniu rozciągania jednoosiowego σ = 40 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma=E\\varepsilon=200\\,000\\cdot0{,}0002=40\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź wynik odwrotnie',
      narration:
        'Kontrola odwrotna: GF · ε · R₀ = 2,10 · 0,0002 · 350 = 0,147 Ω. Otrzymujemy tę samą zmianę oporu, więc rachunek jest spójny.',
      caption: 'Kontrola: GF·ε·R₀ = 0,147 Ω.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: 'GF\\,\\varepsilon\\,R_0=2{,}10\\cdot0{,}0002\\cdot350=0{,}147\\,\\Omega',
    },
  ],
} satisfies SolutionData
