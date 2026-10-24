import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-rosette-3',
  title: 'Rozeta 0°/45°/90°: trzy odczyty, pełny obraz — przykład 3',
  duration: 7,
  given: ['varepsilon_1=700', 'varepsilon_2=-100', 'theta_p=20'],
  result:
    'Dla kierunku 45^circ kąt względem kierunku głównego wynosi 45^circ-20^circ=25^circ, więc 2θ=50^circ. Stąd ε_45=300+400cos50^circ≈300+257=557 με. Odczyty wynoszą więc około 606, 557 i -6 με. Kontrola: γ_xy=2·557-606-(-6)=514 μrad, co odpowiada 2R_εsin40^circ=800·0,643≈514 μrad.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0006064177772, display: '606,42 με' },
      { angle: 45, label: '45°', value: 0.0005571150439, display: '557,12 με' },
      { angle: 90, label: '90°', value: -0.0000064177772, display: '−6,42 με' },
    ],
    gamma: { value: 0.0005142300877, display: '514,23 μrad' },
    mohr: {
      center: 0.0003,
      radius: 0.0004,
      left: -0.0001,
      right: 0.0007,
      angle: 20,
    },
    values: [
      { label: 'ε_I', value: '700 με', focus: 'principal', reveal: 0 },
      { label: 'ε_II', value: '−100 με', focus: 'principal', reveal: 0 },
      { label: 'φ_I', value: '20°', focus: 'angle', reveal: 0 },
      { label: 'ε₀', value: '606,42 με', focus: 'gauges' },
      { label: 'ε₄₅', value: '557,12 με', focus: 'gauges' },
      { label: 'ε₉₀', value: '−6,42 με', focus: 'gauges' },
      { label: 'γ_xy', value: '514,23 μrad', focus: 'shear' },
      { label: 'ε_sr', value: '300 με', focus: 'mohr' },
      { label: 'R_ε', value: '400 με', focus: 'mohr' },
      { label: 'σ_I', value: '147,25 MPa', focus: 'stress' },
      { label: 'σ_II', value: '24,18 MPa', focus: 'stress' },
    ],
    note: 'To zadanie odwrotne: od znanych odkształceń głównych i kąta φ odtwarzamy wskazania trzech czujników rozety.',
  },
  scenes: [
    {
      title: 'Zapisz dany stan główny',
      narration:
        'W punkcie panują odkształcenia główne ε_I = 700 με i ε_II = −100 με, a pierwszy kierunek główny jest odchylony o 20° od osi x. Na tej podstawie wyznaczymy wskazania rozety 0°/45°/90°.',
      caption: 'Dane: ε_I = 700 με, ε_II = −100 με, φ_I = 20°.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=700\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=-100\\,\\mu\\varepsilon,\\qquad \\varphi_I=20^\\circ',
    },
    {
      title: 'Oblicz środek i promień koła',
      narration:
        'Środek koła to średnia odkształceń głównych, a promień to połowa ich różnicy. Otrzymujemy ε_sr = 300 με i R_ε = 400 με.',
      caption: 'ε_sr = 300 με, R_ε = 400 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{700+(-100)}{2}=300\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{700-(-100)}{2}=400\\,\\mu\\varepsilon',
    },
    {
      title: 'Odtwórz odczyt czujnika 0°',
      narration:
        'Odczyt czujnika 0° otrzymujemy z transformacji ε₀ = ε_sr + R_ε cos(2(0° − 20°)). Cosinus −40° wynosi około 0,766, więc ε₀ ≈ 606,42 με.',
      caption: 'ε₀ = 606,42 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_0=300+400\\cdot\\cos(-40^\\circ)=300+400\\cdot0{,}766=606{,}42\\,\\mu\\varepsilon',
    },
    {
      title: 'Odtwórz odczyty 45° i 90°',
      narration:
        'Analogicznie dla 90° kąt względem kierunku głównego wynosi 70°, a dla 45° — 25°. Otrzymujemy ε₉₀ ≈ −6,42 με oraz ε₄₅ ≈ 557,12 με.',
      caption: 'ε₉₀ = −6,42 με, ε₄₅ = 557,12 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula:
        '\\varepsilon_{90}=300+400\\cdot\\cos(140^\\circ)=-6{,}42\\,\\mu\\varepsilon,\\qquad \\varepsilon_{45}=300+400\\cdot\\cos(50^\\circ)=557{,}12\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenie postaciowe',
      narration:
        'Kontrolnie obliczamy γ_xy z trzech odczytów. Wynosi ono 514,23 μrad i zgadza się z wartością 2R_ε sin 40° = 514,23 μrad, co potwierdza spójność transformacji.',
      caption: 'γ_xy = 514,23 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula: '\\gamma_{xy}=2\\cdot557{,}12-606{,}42-(-6{,}42)=514{,}23\\,\\mu\\text{rad}',
    },
    {
      title: 'Potwierdź kierunek główny',
      narration:
        'Kąt φ_I = 20° jest dany, ale można go odtworzyć z tangensa podwójnego kąta. Dla kontroli wystarczy zauważyć, że γ_xy/(ε₀ − ε₉₀) = 514,23/(606,42 + 6,42) ≈ 0,839, co odpowiada 2φ ≈ 40°.',
      caption: 'Kontrola kąta: 2φ_I ≈ 40°, φ_I ≈ 20°.',
      visual: 'rosette',
      focus: { metric: 'angle' },
      formula: '\\tan2\\varphi_I=\\frac{514{,}23}{606{,}42-(-6{,}42)}=0{,}839,\\qquad 2\\varphi_I=40^\\circ',
    },
    {
      title: 'Przyjmij model materiału',
      narration:
        'Przyjmujemy stal izotropową o E = 200 GPa i ν = 0,30. Czynnik E/(1 − ν²) = 219 780 MPa pozwoli zamienić odkształcenia główne na naprężenia.',
      caption: 'E = 200 000 MPa, ν = 0,30.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula: 'E=200\\,000\\,\\text{MPa},\\qquad \\nu=0{,}30,\\qquad \\frac{E}{1-\\nu^2}=219\\,780\\,\\text{MPa}',
    },
    {
      title: 'Oblicz naprężenia i sprawdź wynik',
      narration:
        'Po podstawieniu σ_I = 147,25 MPa, a σ_II = 24,18 MPa. Oba naprężenia są dodatnie, mimo że ε_II jest ujemne, bo w płaskim stanie naprężenia decyduje suma odkształceń w obu kierunkach.',
      caption: 'σ_I = 147,25 MPa, σ_II = 24,18 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_I=219\\,780\\cdot(700+0{,}30\\cdot(-100))\\cdot10^{-6}=147{,}25\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(-100+0{,}30\\cdot700)\\cdot10^{-6}=24{,}18\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
