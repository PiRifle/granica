import type { SolutionData } from '../../model'

export default {
  id: 'ex-strain-state-epsilon-gamma-2',
  title: 'Odkształcenia: długości i kąty — przykład 2',
  duration: 7,
  given: [],
  result:
    'Zwróć uwagę, że pole jest liniowe, więc odkształcenia są stałe w całej tarczy. To wygodne ćwiczenie rachunkowe, ale w rzeczywistej konstrukcji pochodne zmieniają się z położeniem. Gdyby pole zawierało składnik x^2, pochodna ∂ u/∂ x zależałaby od x i odkształcenie nie byłoby jednorodne.',
  figure: {
    kind: 'rosette',
    gauges: [
      { angle: 0, label: '0°', value: 0.0004, display: '400 με' },
      { angle: 45, label: '45°', value: 0.0004, display: '400 με' },
      { angle: 90, label: '90°', value: -0.0001, display: '−100 με' },
    ],
    gamma: { value: 0.0005, display: '500 μrad' },
    mohr: {
      center: 0.00015,
      radius: 0.0003535533906,
      left: -0.0002035533906,
      right: 0.0005035533906,
      angle: 22.5,
    },
    values: [
      { label: '∂u/∂x', value: '400 με', focus: 'gauges' },
      { label: '∂u/∂y', value: '200 με', focus: 'gauges' },
      { label: '∂v/∂x', value: '300 με', focus: 'gauges' },
      { label: '∂v/∂y', value: '−100 με', focus: 'gauges' },
      { label: 'ε_x', value: '400 με', focus: 'gauges' },
      { label: 'ε_y', value: '−100 με', focus: 'gauges' },
      { label: 'γ_xy', value: '500 μrad', focus: 'shear' },
      { label: 'ε_xy', value: '250 μrad', focus: 'shear' },
      { label: 'ε₄₅', value: '400 με', focus: 'gauges' },
      { label: 'ε_sr', value: '150 με', focus: 'mohr' },
      { label: 'R_ε', value: '353,55 με', focus: 'mohr' },
      { label: 'ε_I', value: '503,55 με', focus: 'principal' },
      { label: 'ε_II', value: '−203,55 με', focus: 'principal' },
      { label: 'φ_I', value: '22,5°', focus: 'angle' },
      { label: 'σ_I', value: '97,25 MPa', focus: 'stress' },
      { label: 'σ_II', value: '−11,54 MPa', focus: 'stress' },
    ],
    note: 'Pole przemieszczeń jest liniowe, więc pochodne cząstkowe, a zatem cały tensor odkształcenia, są stałe w każdym punkcie tarczy.',
  },
  scenes: [
    {
      title: 'Zapisz pole przemieszczeń',
      narration:
        'Dane jest liniowe pole przemieszczeń w płaskiej tarczy. Składowa pozioma zależy od x i y, a pionowa również zawiera oba składniki, co zapowiada niezerowe odkształcenia normalne i postaciowe.',
      caption: 'u = 0,0004x + 0,0002y, v = 0,0003x − 0,0001y (mm).',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula: 'u=0{,}0004x+0{,}0002y,\\qquad v=0{,}0003x-0{,}0001y',
    },
    {
      title: 'Oblicz pochodne cząstkowe',
      narration:
        'Różniczkujemy obie składowe po x i y. Pochodne są stałe, bo pole jest liniowe: ∂u/∂x = 0,0004, ∂u/∂y = 0,0002, ∂v/∂x = 0,0003 oraz ∂v/∂y = −0,0001.',
      caption: 'Cztery pochodne cząstkowe wyznaczają tensor odkształcenia.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula:
        '\\frac{\\partial u}{\\partial x}=0{,}0004,\\qquad \\frac{\\partial u}{\\partial y}=0{,}0002,\\qquad \\frac{\\partial v}{\\partial x}=0{,}0003,\\qquad \\frac{\\partial v}{\\partial y}=-0{,}0001',
    },
    {
      title: 'Odczytaj odkształcenia normalne',
      narration:
        'Odkształcenia normalne to pochodne wzdłuż osi: ε_x = ∂u/∂x = 400 με oraz ε_y = ∂v/∂y = −100 με. W kierunku y materiał się więc skraca.',
      caption: 'ε_x = 400 με, ε_y = −100 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula:
        '\\varepsilon_x=0{,}0004=400\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=-0{,}0001=-100\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenie postaciowe',
      narration:
        'Odkształcenie inżynierskie ścinania to suma pochodnych mieszanych: γ_xy = ∂u/∂y + ∂v/∂x = 0,0002 + 0,0003 = 0,0005. Tensorowa składowa ε_xy jest połową tej wartości.',
      caption: 'γ_xy = 500 μrad, ε_xy = 250 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula:
        '\\gamma_{xy}=\\frac{\\partial u}{\\partial y}+\\frac{\\partial v}{\\partial x}=0{,}0002+0{,}0003=0{,}0005,\\qquad \\varepsilon_{xy}=250\\,\\mu\\text{rad}',
    },
    {
      title: 'Oblicz środek i promień koła',
      narration:
        'Średnia odkształceń normalnych wynosi 150 με. Promień obejmuje połowę różnicy ε_x − ε_y oraz połowę γ_xy; po podstawieniu otrzymujemy 353,55 με.',
      caption: 'ε_sr = 150 με, R_ε = 353,55 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{400+(-100)}{2}=150\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\sqrt{250^2+250^2}=353{,}55\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenia główne',
      narration:
        'Dodając i odejmując promień od średniej, otrzymujemy ε_I = 503,55 με i ε_II = −203,55 με. W kierunkach głównych odkształcenie postaciowe znika.',
      caption: 'ε_I = 503,55 με, ε_II = −203,55 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=150+353{,}55=503{,}55\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=150-353{,}55=-203{,}55\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz kierunki główne',
      narration:
        'Tangens podwójnego kąta to γ_xy/(ε_x − ε_y) = 500/500 = 1. Stąd 2φ = 45°, a φ = 22,5°. Kierunek główny leży więc dokładnie w połowie między osiami x i y.',
      caption: 'φ_I = 22,5°.',
      visual: 'rosette',
      focus: { metric: 'angle' },
      formula: '\\tan2\\varphi_I=\\frac{500}{400-(-100)}=\\frac{500}{500}=1,\\qquad \\varphi_I=22{,}5^\\circ',
    },
    {
      title: 'Przyjmij materiał i oblicz naprężenia',
      narration:
        'Dla stali E = 200 GPa i ν = 0,30 czynnik materiałowy wynosi 219 780 MPa. Otrzymujemy σ_I = 97,25 MPa oraz σ_II = −11,54 MPa.',
      caption: 'σ_I = 97,25 MPa, σ_II = −11,54 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_I=219\\,780\\cdot(503{,}55+0{,}30\\cdot(-203{,}55))\\cdot10^{-6}=97{,}25\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(-203{,}55+0{,}30\\cdot503{,}55)\\cdot10^{-6}=-11{,}54\\,\\text{MPa}',
    },
    {
      title: 'Sprawdź jednorodność pola',
      narration:
        'Ponieważ pole jest liniowe, pochodne nie zależą od położenia. Gdyby pojawił się składnik x², pochodna ∂u/∂x zależałaby od x i odkształcenia nie byłyby stałe. Kontrola modułów potwierdza zgodność znaków i rzędu wielkości.',
      caption: 'Kontrola: |ε_y| = 100 με, |ε_II| = 203,55 με, |σ_II| = 11,54 MPa.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '|\\varepsilon_y|=100\\,\\mu\\varepsilon,\\qquad |\\varepsilon_{II}|=203{,}55\\,\\mu\\varepsilon,\\qquad |\\sigma_{II}|=11{,}54\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
