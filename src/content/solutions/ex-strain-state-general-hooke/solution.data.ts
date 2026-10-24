import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-general-hooke',
  title: 'Uogólnione prawo Hooke’a: wszystkie osie naraz — przykład 1',
  duration: 7,
  given: ['E=200 GPa', 'nu=0', 'sigma_x=80 MPa', 'sigma_y=40 MPa', 'sigma_z=-20 MPa', 'tau_{xy}=30 MPa'],
  result:
    'ε_x=370 με, ε_y=110 με, ε_z=-280 με oraz γ_xy=390 μrad. Objętość rośnie nieznacznie, mimo ujemnego naprężenia w kierunku z.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.00037, display: '370 με' },
      { angle: 45, label: '45°', value: 0.000435, display: '435 με' },
      { angle: 90, label: '90°', value: 0.00011, display: '110 με' },
    ],
    gamma: { value: 0.00039, display: '390 μrad' },
    mohr: {
      center: 0.00024,
      radius: 0.0002343608329,
      left: 0.0000056391671,
      right: 0.0004743608329,
      angle: 28.155,
    },
    values: [
      { label: 'σ_x', value: '80,0 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_y', value: '40,0 MPa', focus: 'stress', reveal: 0 },
      { label: 'σ_z', value: '−20,0 MPa', focus: 'stress', reveal: 0 },
      { label: 'τ_xy', value: '30,0 MPa', focus: 'stress', reveal: 0 },
      { label: 'G', value: '76 923 MPa', focus: 'stress' },
      { label: 'ε_x', value: '370 με', focus: 'gauges' },
      { label: 'ε_y', value: '110 με', focus: 'gauges' },
      { label: 'ε_z', value: '−280 με', focus: 'gauges' },
      { label: 'γ_xy', value: '390 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '240 με', focus: 'mohr' },
      { label: 'R_ε', value: '234,36 με', focus: 'mohr' },
      { label: 'ε_I', value: '474,36 με', focus: 'principal' },
      { label: 'ε_II', value: '5,64 με', focus: 'principal' },
      { label: 'φ_I', value: '28,155°', focus: 'angle' },
      { label: 'θ = ΔV/V₀', value: '200 με', focus: 'principal' },
    ],
    note: 'Trójosiowy stan naprężenia wymaga pełnego prawa Hooke’a: każda składowa odkształcenia zależy od wszystkich trzech naprężeń normalnych.',
  },
  scenes: [
    {
      title: 'Zapisz stan naprężenia',
      narration:
        'Dane są trzy naprężenia normalne i jedno styczne: σ_x = 80 MPa, σ_y = 40 MPa, σ_z = −20 MPa oraz τ_xy = 30 MPa. Pozostałe składowe styczne są zerowe, więc osie x, y, z są osiami głównymi tensora naprężenia.',
      caption: 'Stan naprężenia w punkcie: σ_x = 80 MPa, σ_y = 40 MPa, σ_z = −20 MPa, τ_xy = 30 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_x=80\\,\\text{MPa},\\qquad \\sigma_y=40\\,\\text{MPa},\\qquad \\sigma_z=-20\\,\\text{MPa},\\qquad \\tau_{xy}=30\\,\\text{MPa}',
    },
    {
      title: 'Oblicz moduł ścinania',
      narration:
        'Dla materiału izotropowego moduł Kirchhoffa wynosi G = E/[2(1 + ν)]. Po podstawieniu E = 200 000 MPa i ν = 0,30 otrzymujemy 76 923 MPa.',
      caption: 'G = 76 923 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'G=\\frac{E}{2(1+\\nu)}=\\frac{200\\,000}{2(1+0{,}30)}=76\\,923\\,\\text{MPa}',
    },
    {
      title: 'Oblicz odkształcenie w kierunku x',
      narration:
        'W uogólnionym prawie Hooke’a ε_x zależy od σ_x oraz od σ_y i σ_z pomniejszonych przez liczbę Poissona. Otrzymujemy (80 − 6)/200 000 = 0,00037.',
      caption: 'ε_x = 370 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_x=\\frac{80-0{,}30(40-20)}{200\\,000}=\\frac{80-6}{200\\,000}=0{,}00037',
    },
    {
      title: 'Oblicz odkształcenie w kierunku y',
      narration:
        'Analogicznie ε_y = [40 − 0,30(−20 + 80)]/200 000 = (40 − 18)/200 000 = 0,00011. Wpływ naprężenia σ_x jest tu większy niż własnego σ_y, bo σ_x jest dwukrotnie większe.',
      caption: 'ε_y = 110 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_y=\\frac{40-0{,}30(-20+80)}{200\\,000}=\\frac{40-18}{200\\,000}=0{,}00011',
    },
    {
      title: 'Oblicz odkształcenie w kierunku z',
      narration:
        'W kierunku z działa ujemne naprężenie −20 MPa, ale dwa dodatnie naprężenia poziome wywołują dodatkowy skurcz przez efekt Poissona. Wynik jest ujemny: ε_z = −280 με.',
      caption: 'ε_z = −280 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_z=\\frac{-20-0{,}30(80+40)}{200\\,000}=\\frac{-20-36}{200\\,000}=-0{,}00028',
    },
    {
      title: 'Oblicz odkształcenie postaciowe',
      narration:
        'Odkształcenie postaciowe w płaszczyźnie xy zależy tylko od τ_xy i modułu G. Otrzymujemy γ_xy = 30/76 923 = 0,00039 rad, czyli 390 μrad.',
      caption: 'γ_xy = 390 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula: '\\gamma_{xy}=\\frac{\\tau_{xy}}{G}=\\frac{30}{76\\,923}=0{,}00039\\,\\text{rad}',
    },
    {
      title: 'Zbuduj koło Mohra odkształceń',
      narration:
        'Środek koła to średnia ε_x i ε_y, czyli 240 με. Promień obejmuje połowę różnicy tych odkształceń oraz połowę γ_xy; wynosi 234,36 με.',
      caption: 'ε_sr = 240 με, R_ε = 234,36 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{370+110}{2}=240\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\sqrt{130^2+195^2}=234{,}36\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenia główne',
      narration:
        'W płaszczyźnie xy odkształcenia główne wynoszą 474,36 με i 5,64 με. Trzecie odkształcenie główne to ε_z = −280 με, więc pełny tensor ma trzy różne wartości główne.',
      caption: 'ε_I = 474,36 με, ε_II = 5,64 με, ε_III = −280 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=240+234{,}36=474{,}36\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=240-234{,}36=5{,}64\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz kierunek główny',
      narration:
        'Tangens podwójnego kąta to γ_xy/(ε_x − ε_y) = 390/260 = 1,50. Stąd 2φ ≈ 56,31°, a φ ≈ 28,155° od osi x.',
      caption: 'φ_I = 28,155°.',
      visual: 'rosette',
      focus: { metric: 'angle' },
      formula: '\\tan2\\varphi_I=\\frac{390}{370-110}=\\frac{390}{260}=1{,}50,\\qquad \\varphi_I=28{,}155^\\circ',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia to suma trzech odkształceń normalnych: 370 + 110 − 280 = 200 με. Objętość rośnie o 0,02%, mimo że w kierunku z panuje naprężenie ściskające.',
      caption: 'Kontrola: θ = 370 + 110 − 280 = 200 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\theta=\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=370+110-280=200\\,\\mu\\varepsilon,\\qquad |\\varepsilon_z|=280\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
