import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-volume-2',
  title: 'Zmiana objętości: ślad odkształcenia — przykład 2',
  duration: 7,
  given: ['sigma_x=150 MPa', 'sigma_z=0', 'E=200 GPa', 'nu=0', 'varepsilon_x=150', 'varepsilon_z=-0'],
  result:
    'Ten przykład pokazuje też, dlaczego nie można oceniać zmiany objętości na podstawie jednej średnicy. Zmiana średnicy może być wyraźna, a zmiana objętości nadal niewielka.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.00075, display: '750 με' },
      { angle: 45, label: '45°', value: 0.0002625, display: '262,5 με' },
      { angle: 90, label: '90°', value: -0.000225, display: '−225 με' },
    ],
    gamma: { value: 0, display: '0 μrad' },
    mohr: {
      center: 0.0002625,
      radius: 0.0004875,
      left: -0.000225,
      right: 0.00075,
      angle: 0,
    },
    values: [
      { label: 'σ_x', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'E', value: '200 GPa', focus: 'stress', reveal: 0 },
      { label: 'ν', value: '0,30', focus: 'stress', reveal: 0 },
      { label: 'ε_x', value: '750 με', focus: 'gauges' },
      { label: 'ε_y', value: '−225 με', focus: 'gauges' },
      { label: 'ε_z', value: '−225 με', focus: 'gauges' },
      { label: 'γ_xy', value: '0 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '262,5 με', focus: 'mohr' },
      { label: 'R_ε', value: '487,5 με', focus: 'mohr' },
      { label: 'ε_I', value: '750 με', focus: 'principal' },
      { label: 'ε_II', value: '−225 με', focus: 'principal' },
      { label: 'θ', value: '300 με', focus: 'principal' },
      { label: 'ΔV/V₀', value: '0,0003', focus: 'principal' },
    ],
    note: 'Dwa odkształcenia poprzeczne są ujemne, ale wydłużenie osiowe przewyższa ich sumę, więc objętość rośnie.',
  },
  scenes: [
    {
      title: 'Zapisz jednoosiowy stan naprężenia',
      narration:
        'Stal jest rozciągana naprężeniem σ_x = 150 MPa, a σ_y = σ_z = 0. Moduł Younga wynosi 200 GPa, a liczba Poissona 0,30.',
      caption: 'σ_x = 150 MPa, σ_y = σ_z = 0.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=150\\,\\text{MPa},\\qquad \\sigma_y=0,\\qquad \\sigma_z=0',
    },
    {
      title: 'Oblicz odkształcenie osiowe',
      narration: 'ε_x = σ_x/E = 150/200 000 = 0,00075, czyli 750 με. W kierunku obciążenia materiał wydłuża się.',
      caption: 'ε_x = 750 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_x=\\frac{150}{200\\,000}=0{,}00075=750\\,\\mu\\varepsilon',
    },
    {
      title: 'Oblicz odkształcenia poprzeczne',
      narration:
        'W obu kierunkach poprzecznych działa efekt Poissona: ε_y = ε_z = −νε_x = −0,30·0,00075 = −0,000225, czyli −225 με.',
      caption: 'ε_y = ε_z = −225 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_y=\\varepsilon_z=-0{,}30\\cdot0{,}00075=-0{,}000225=-225\\,\\mu\\varepsilon',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration: 'W płaszczyźnie xy ścinanie jest zerowe. Środek koła wynosi 262,5 με, a promień 487,5 με.',
      caption: 'ε_sr = 262,5 με, R_ε = 487,5 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{750+(-225)}{2}=262{,}5\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{750-(-225)}{2}=487{,}5\\,\\mu\\varepsilon',
    },
    {
      title: 'Odczytaj kierunki główne',
      narration:
        'Osie x, y, z są kierunkami głównymi, bo nie ma ścinania. ε_I = 750 με, ε_II = −225 με, a trzecią wartością jest również −225 με.',
      caption: 'ε_I = 750 με, ε_II = ε_III = −225 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=262{,}5+487{,}5=750\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=262{,}5-487{,}5=-225\\,\\mu\\varepsilon',
    },
    {
      title: 'Oblicz ślad tensora odkształcenia',
      narration:
        'Sumujemy trzy odkształcenia normalne: θ = 750 − 225 − 225 = 300 με, czyli 0,0003. Objętość rośnie o 0,03%.',
      caption: 'θ = ΔV/V₀ = 0,0003.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula: '\\theta=\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=750-225-225=300\\,\\mu\\varepsilon',
    },
    {
      title: 'Przyjmij model objętościowy',
      narration:
        'Moduł ściśliwości K = E/[3(1 − 2ν)] = 200 000/(3·0,40) = 166 667 MPa. Wiąże on ciśnienie hydrostatyczne ze względną zmianą objętości.',
      caption: 'K = 166 667 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'K=\\frac{200\\,000}{3(1-2\\cdot0{,}30)}=166\\,667\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź znak i rząd wielkości',
      narration:
        'Wynik dodatni oznacza wzrost objętości, mimo że dwa z trzech odkształceń są ujemne. Wydłużenie osiowe 750 με przewyższa sumę skurczów poprzecznych 450 με, dlatego θ = 300 με jest dodatnie.',
      caption: 'Kontrola: 750 − 225 − 225 = 300 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula: '\\theta=750-225-225=300\\,\\mu\\varepsilon,\\qquad |\\varepsilon_y|=225\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
