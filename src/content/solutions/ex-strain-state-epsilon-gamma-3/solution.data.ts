import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-epsilon-gamma-3',
  title: 'Odkształcenia: długości i kąty — przykład 3',
  duration: 7,
  given: ['gamma_{xy}=0'],
  result:
    'Gdyby wynik wyszedł rzędu kilku stopni, należałoby sprawdzić jednostki. Odkształcenie sprężyste stali rzadko przekracza kilka tysięcznych, więc kąt rzędu 0,1^circ jest już duży jak na ten zakres.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0012, display: '1200 με' },
      { angle: 45, label: '45°', value: 0.00135, display: '1350 με' },
      { angle: 90, label: '90°', value: 0, display: '0 με' },
    ],
    gamma: { value: 0.0015, display: '1500 μrad' },
    mohr: {
      center: 0.0006,
      radius: 0.0009604686356,
      left: -0.0003604686356,
      right: 0.001560468636,
      angle: 25.67,
    },
    values: [
      { label: 'ε', value: '1200 με', focus: 'gauges', reveal: 0 },
      { label: 'ΔL', value: '0,096 mm', focus: 'gauges' },
      { label: 'γ_xy', value: '1500 μrad', focus: 'shear' },
      { label: 'kąt', value: '0,0859°', focus: 'shear' },
      { label: 'ε_sr', value: '600 με', focus: 'mohr' },
      { label: 'R_ε', value: '960,47 με', focus: 'mohr' },
      { label: 'ε_I', value: '1560,47 με', focus: 'principal' },
      { label: 'ε_II', value: '−360,47 με', focus: 'principal' },
      { label: 'φ_I', value: '25,67°', focus: 'angle' },
      { label: 'σ_I', value: '319,25 MPa', focus: 'stress' },
      { label: 'σ_II', value: '23,67 MPa', focus: 'stress' },
    ],
    note: 'Zadanie podaje tylko dopuszczalne ε i γ; na rysunku przyjęto ε_y = 0, aby zilustrować pełne koło Mohra. To założenie ilustracyjne.',
  },
  scenes: [
    {
      title: 'Zamień mikrostrainy na wartość bezwymiarową',
      narration:
        'Dopuszczalne odkształcenie liniowe wynosi 1200 με, czyli 0,0012. Tę wartość wykorzystamy do obliczenia wydłużenia na bazie pomiarowej.',
      caption: '1200 με = 0,0012.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '1200\\,\\mu\\varepsilon=0{,}0012',
    },
    {
      title: 'Oblicz dopuszczalne wydłużenie',
      narration:
        'Baza pomiarowa ma 80 mm, więc maksymalne wydłużenie to ΔL = ε·L₀ = 0,0012 · 80 = 0,096 mm. To mniej niż dziesiąta część milimetra.',
      caption: 'ΔL = 0,096 mm.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\Delta L=\\varepsilon L_0=0{,}0012\\cdot80=0{,}096\\,\\text{mm}',
    },
    {
      title: 'Przelicz ścinanie na kąt',
      narration:
        'Odkształcenie postaciowe γ_xy = 0,0015 rad odpowiada kątowi 0,0015 · 180°/π ≈ 0,0859°, czyli około pięciu minut kątowych. To pokazuje, dlaczego potrzebne są czułe czujniki, a nie zwykła linijka.',
      caption: 'γ_xy = 1500 μrad ≈ 0,0859°.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula: '\\gamma_{xy}=0{,}0015\\,\\text{rad}=1500\\,\\mu\\text{rad}\\approx0{,}0859^\\circ',
    },
    {
      title: 'Oblicz środek i promień koła',
      narration:
        'Przyjmując ε_y = 0 dla ilustracji, środek koła wynosi 600 με, a promień obejmuje połowę ε_x oraz połowę γ_xy. Otrzymujemy R_ε = 960,47 με.',
      caption: 'ε_sr = 600 με, R_ε = 960,47 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{1200+0}{2}=600\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\sqrt{600^2+750^2}=960{,}47\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenia główne',
      narration:
        'Skrajne punkty koła dają ε_I = 1560,47 με i ε_II = −360,47 με. Największe rozciąganie jest większe od odkształcenia w kierunku x, bo dodaje się do niego efekt ścinania.',
      caption: 'ε_I = 1560,47 με, ε_II = −360,47 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=600+960{,}47=1560{,}47\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=600-960{,}47=-360{,}47\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz kierunek główny',
      narration:
        'Tangens podwójnego kąta to γ_xy/ε_x = 1500/1200 = 1,25. Stąd 2φ ≈ 51,34°, a φ ≈ 25,67°. Kierunek główny odchyla się od osi x w stronę działania ścinania.',
      caption: 'φ_I = 25,67°.',
      visual: 'rosette',
      focus: { metric: 'angle' },
      formula: '\\tan2\\varphi_I=\\frac{1500}{1200}=1{,}25,\\qquad \\varphi_I=25{,}67^\\circ',
    },
    {
      title: 'Przyjmij materiał i oblicz naprężenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 czynnik E/(1 − ν²) = 219 780 MPa. Otrzymujemy σ_I = 319,25 MPa oraz σ_II = 23,67 MPa.',
      caption: 'σ_I = 319,25 MPa, σ_II = 23,67 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_I=219\\,780\\cdot(1560{,}47+0{,}30\\cdot(-360{,}47))\\cdot10^{-6}=319{,}25\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(-360{,}47+0{,}30\\cdot1560{,}47)\\cdot10^{-6}=23{,}67\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź jednostki i rząd wielkości',
      narration:
        'Kąt 0,0859° jest bardzo mały, a naprężenie 319 MPa odpowiada wysokiej, ale spotykanej stali konstrukcyjnej. Gdyby kąt wyszedł rzędu kilku stopni, trzeba by sprawdzić jednostki i założenia.',
      caption: 'Kontrola: 0,0859° to około 5 minut kątowych.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula: '0{,}0859^\\circ\\approx5{,}15\\,\\text{min},\\qquad |\\varepsilon_{II}|=360{,}47\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
