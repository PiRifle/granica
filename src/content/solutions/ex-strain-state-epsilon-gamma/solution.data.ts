import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-epsilon-gamma',
  title: 'Odkształcenia: długości i kąty — przykład 1',
  duration: 7,
  given: ['L_0=250 mm', 'L=0'],
  result:
    'ε_x=720 με, γ_xy=0,0009 rad, a ε_xy=0,00045. Wydłużenie i ścinanie są osobnymi miarami i mają różne wartości liczbowe.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.00072, display: '720 με' },
      { angle: 45, label: '45°', value: 0.00081, display: '810 με' },
      { angle: 90, label: '90°', value: 0, display: '0 με' },
    ],
    gamma: { value: 0.0009, display: '900 μrad' },
    mohr: {
      center: 0.00036,
      radius: 0.0005762811814,
      left: -0.0002162811814,
      right: 0.0009362811814,
      angle: 25.67,
    },
    values: [
      { label: 'ΔL', value: '0,18 mm', focus: 'gauges', reveal: 0 },
      { label: 'ε_x', value: '720 με', focus: 'gauges' },
      { label: 'ε_y', value: '0 με', focus: 'gauges' },
      { label: 'γ_xy', value: '900 μrad', focus: 'shear' },
      { label: 'ε_xy', value: '450 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '360 με', focus: 'mohr' },
      { label: 'R_ε', value: '576,28 με', focus: 'mohr' },
      { label: 'ε_I', value: '936,28 με', focus: 'principal' },
      { label: 'ε_II', value: '−216,28 με', focus: 'principal' },
      { label: 'φ_I', value: '25,67°', focus: 'angle' },
      { label: 'σ_I', value: '191,52 MPa', focus: 'stress' },
      { label: 'σ_II', value: '14,20 MPa', focus: 'stress' },
    ],
    note: 'Zadanie podaje tylko ε_x i γ_xy; na rysunku przyjęto ε_y = 0, aby pokazać pełne koło Mohra. To założenie ilustracyjne, nie dodatkowy pomiar.',
  },
  scenes: [
    {
      title: 'Oblicz odkształcenie liniowe',
      narration:
        'Wydłużenie 0,18 mm na bazie 250 mm daje ε_x = 0,18/250 = 0,00072. Znak dodatni oznacza wydłużenie w kierunku x.',
      caption: 'ε_x = 0,18/250 = 0,00072.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_x=\\frac{0{,}18}{250}=0{,}00072',
    },
    {
      title: 'Zapisz wynik w mikrostrainach',
      narration:
        'Mnożymy odkształcenie przez 10⁶ i otrzymujemy 720 με. To wygodna jednostka, bo odkształcenia sprężyste metali mieszczą się zwykle w setkach lub tysiącach mikrostrain.',
      caption: '720 με = 0,072%.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '0{,}00072\\cdot10^6=720\\,\\mu\\varepsilon',
    },
    {
      title: 'Odczytaj odkształcenie postaciowe',
      narration:
        'Odkształcenie inżynierskie ścinania wynosi 0,0009 rad, czyli 900 μrad. Nie jest to odkształcenie normalne i nie można go dodawać wprost do ε_x.',
      caption: 'γ_xy = 0,0009 rad = 900 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula: '\\gamma_{xy}=0{,}0009\\,\\text{rad}=900\\,\\mu\\text{rad}',
    },
    {
      title: 'Przelicz na składową tensorową',
      narration:
        'W tensorze odkształcenia składowa pozadiagonalna jest połową odkształcenia inżynierskiego. Dlatego ε_xy = 0,0009/2 = 0,00045.',
      caption: 'ε_xy = γ_xy/2 = 450 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula: '\\varepsilon_{xy}=\\frac{0{,}0009}{2}=0{,}00045',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Dla pełnego obrazu przyjmujemy ε_y = 0, bo zadanie nie podaje odkształcenia poprzecznego. Wtedy ε_45 = (ε_x + ε_y)/2 + γ_xy/2 = 810 με, środek koła wynosi 360 με, a promień 576,28 με.',
      caption: 'ε_sr = 360 με, R_ε = 576,28 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{45}=360+450=810\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\sqrt{360^2+450^2}=576{,}28\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenia główne',
      narration:
        'Skrajne punkty koła dają ε_I = 936,28 με i ε_II = −216,28 με. Stan jest więc rozciągany w jednym kierunku głównym i ściskany w drugim.',
      caption: 'ε_I = 936,28 με, ε_II = −216,28 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=360+576{,}28=936{,}28\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=360-576{,}28=-216{,}28\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz kierunek główny',
      narration:
        'Tangens podwójnego kąta to γ_xy/(ε_x − ε_y) = 900/720 = 1,25. Stąd 2φ ≈ 51,34°, a φ ≈ 25,67° od osi x.',
      caption: 'φ_I = 25,67°.',
      visual: 'rosette',
      focus: { metric: 'angle' },
      formula: '\\tan2\\varphi_I=\\frac{900}{720}=1{,}25,\\qquad \\varphi_I=25{,}67^\\circ',
    },
    {
      title: 'Przyjmij materiał i oblicz naprężenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 czynnik E/(1 − ν²) wynosi 219 780 MPa. Po podstawieniu σ_I = 191,52 MPa, a σ_II = 14,20 MPa.',
      caption: 'σ_I = 191,52 MPa, σ_II = 14,20 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_I=219\\,780\\cdot(936{,}28+0{,}30\\cdot(-216{,}28))\\cdot10^{-6}=191{,}52\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(-216{,}28+0{,}30\\cdot936{,}28)\\cdot10^{-6}=14{,}20\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź rząd wielkości',
      narration:
        '720 με to 0,072%, czyli mniej niż typowa granica sprężystości stali. Otrzymane naprężenia są wysokie, ale nadal mieszczą się w zakresie sprężystym, co potwierdza sensowność przyjętego modelu.',
      caption: 'Kontrola: ε_x = 720 με = 0,072%, |ε_II| = 216,28 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_x=720\\,\\mu\\varepsilon=0{,}072\\,\\%,\\qquad |\\varepsilon_{II}|=216{,}28\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
