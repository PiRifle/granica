import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-rosette-2',
  title: 'Rozeta 0°/45°/90°: trzy odczyty, pełny obraz — przykład 2',
  duration: 7,
  given: ['varepsilon_0=600', 'varepsilon_{45}=300', 'varepsilon_{90}=-200', 'gamma_{xy}=2'],
  result:
    'Wynik mówi, że największe rozciąganie działa pod kątem około 7^circ od osi pierwszego czujnika. To niewiele, ale przy projektowaniu połączenia lub otworu taki obrót może mieć znaczenie. Drugie odkształcenie główne jest ujemne, czyli w kierunku prostopadłym materiał jest ściskany. Taki stan jest typowy dla rozciągania z udziałem ścinania.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0006, display: '600 με' },
      { angle: 45, label: '45°', value: 0.0003, display: '300 με' },
      { angle: 90, label: '90°', value: -0.0002, display: '−200 με' },
    ],
    gamma: { value: 0.0002, display: '200 μrad' },
    mohr: {
      center: 0.0002,
      radius: 0.0004123105626,
      left: -0.0002123105626,
      right: 0.0006123105626,
      angle: 7.018,
    },
    values: [
      { label: 'ε₀', value: '600 με', focus: 'gauges', reveal: 0 },
      { label: 'ε₄₅', value: '300 με', focus: 'gauges', reveal: 0 },
      { label: 'ε₉₀', value: '−200 με', focus: 'gauges', reveal: 0 },
      { label: 'γ_xy', value: '200 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '200 με', focus: 'mohr' },
      { label: 'R_ε', value: '412,31 με', focus: 'mohr' },
      { label: 'ε_I', value: '612,31 με', focus: 'principal' },
      { label: 'ε_II', value: '−212,31 με', focus: 'principal' },
      { label: 'φ_I', value: '7,018°', focus: 'angle' },
      { label: 'σ_I', value: '120,58 MPa', focus: 'stress' },
      { label: 'σ_II', value: '−6,29 MPa', focus: 'stress' },
    ],
    note: 'Tym razem czujnik 45° nie daje średniej, więc pojawia się ścinanie i koło Mohra nie jest styczne do osi pionowej.',
  },
  scenes: [
    {
      title: 'Przypisz odczyty do osi',
      narration:
        'Czujnik 0° wskazuje 600 με, a czujnik 90° −200 με. Trzeci odczyt, 300 με, jest większy od średniej 200 με, co oznacza niezerowe odkształcenie postaciowe.',
      caption: 'ε₀ = 600 με, ε₄₅ = 300 με, ε₉₀ = −200 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula:
        '\\varepsilon_0=600\\,\\mu\\varepsilon,\\qquad \\varepsilon_{45}=300\\,\\mu\\varepsilon,\\qquad \\varepsilon_{90}=-200\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenie postaciowe',
      narration:
        'Z transformacji dla kierunku 45° otrzymujemy γ_xy = 2 · 300 − 600 − (−200) = 200 μrad. Ścinanie jest dodatnie, więc odkształcenie główne obróci się w stronę czujnika 45°.',
      caption: 'γ_xy = 200 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula: '\\gamma_{xy}=2\\cdot300-600-(-200)=200\\,\\mu\\text{rad}',
    },
    {
      title: 'Oblicz środek i promień koła',
      narration:
        'Środek koła to średnia odkształceń normalnych, czyli 200 με. Promień obejmuje połowę różnicy ε₀ − ε₉₀ oraz połowę γ_xy. Po podstawieniu dostajemy około 412,31 με.',
      caption: 'ε_sr = 200 με, R_ε = 412,31 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{600+(-200)}{2}=200\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\sqrt{400^2+100^2}=412{,}31\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenia główne',
      narration:
        'Dodajemy i odejmujemy promień od średniej. Otrzymujemy ε_I = 612,31 με oraz ε_II = −212,31 με. Jedno z nich jest rozciągające, drugie ściskające.',
      caption: 'ε_I = 612,31 με, ε_II = −212,31 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=200+412{,}31=612{,}31\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=200-412{,}31=-212{,}31\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz kierunki główne',
      narration:
        'Tangens podwójnego kąta to γ_xy/(ε₀ − ε₉₀) = 200/800 = 0,25. Stąd 2φ = 14,036°, a φ = 7,018° od osi czujnika 0°. Drugi kierunek jest prostopadły.',
      caption: 'φ_I = 7,018°, φ_II = 97,018°.',
      visual: 'rosette',
      focus: { metric: 'angle' },
      formula: '\\tan2\\varphi_I=\\frac{200}{600-(-200)}=\\frac{200}{800}=0{,}25,\\qquad \\varphi_I=7{,}018^\\circ',
    },
    {
      title: 'Przyjmij model materiału',
      narration:
        'Do przeliczenia odkształceń na naprężenia przyjmujemy stal izotropową o E = 200 GPa i ν = 0,30. Czynnik E/(1 − ν²) wynosi 219 780 MPa.',
      caption: 'Model: E = 200 GPa, ν = 0,30, płaski stan naprężenia.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'E=200\\,000\\,\\text{MPa},\\qquad \\nu=0{,}30,\\qquad \\frac{E}{1-\\nu^2}=219\\,780\\,\\text{MPa}',
    },
    {
      title: 'Przelicz odkształcenia na naprężenia',
      narration:
        'W kierunkach głównych stosujemy odwrócone prawo Hooke’a. σ_I jest rozciągające i wynosi 120,58 MPa, a σ_II jest lekko ściskające i wynosi −6,29 MPa.',
      caption: 'σ_I = 120,58 MPa, σ_II = −6,29 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_I=219\\,780\\cdot(612{,}31+0{,}30\\cdot(-212{,}31))\\cdot10^{-6}=120{,}58\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(-212{,}31+0{,}30\\cdot612{,}31)\\cdot10^{-6}=-6{,}29\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź wynik',
      narration:
        'Sprawdzenie polega na porównaniu modułów skrajnych odkształceń i naprężeń. Największe rozciąganie działa pod kątem 7,018°, a największe ściskanie prostopadle do niego. Znaki obu naprężeń są zgodne ze znakami odkształceń głównych.',
      caption: 'Kontrola: |ε_II| = 212,31 με oraz |σ_II| = 6,29 MPa.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '|\\varepsilon_{II}|=212{,}31\\,\\mu\\varepsilon,\\qquad |\\sigma_{II}|=6{,}29\\,\\text{MPa},\\qquad \\varphi_{II}=7{,}018^\\circ+90^\\circ=97{,}018^\\circ',
    },
  ],
} satisfies SolutionData
