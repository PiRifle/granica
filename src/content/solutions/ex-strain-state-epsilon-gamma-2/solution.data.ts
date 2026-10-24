import type { SolutionData } from '../../model'
import { StrainFieldAnimation } from './animation'

export default {
  id: 'ex-strain-state-epsilon-gamma-2',
  title: 'Odkształcenia: długości i kąty — przykład 2',
  duration: 7,
  given: ['u=0,0004x+0,0002y', 'v=0,0003x−0,0001y'],
  result:
    'Zwróć uwagę, że pole jest liniowe, więc odkształcenia są stałe w całej tarczy. To wygodne ćwiczenie rachunkowe, ale w rzeczywistej konstrukcji pochodne zmieniają się z położeniem. Gdyby pole zawierało składnik x^2, pochodna ∂ u/∂ x zależałaby od x i odkształcenie nie byłoby jednorodne.',
  animation: StrainFieldAnimation,
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
      title: 'Model: liniowe pole przemieszczeń',
      narration:
        'W płaskiej tarczy dane jest liniowe pole przemieszczeń u = 0,0004x + 0,0002y oraz v = 0,0003x − 0,0001y (w milimetrach). Ponieważ pole jest liniowe, pochodne cząstkowe są stałe, a więc cały tensor odkształcenia jest taki sam w każdym punkcie tarczy.',
      caption: 'u = 0,0004x + 0,0002y, v = 0,0003x − 0,0001y.',
      visual: 'rosette',
      focus: { metric: 'model' },
      formula: 'u=0{,}0004x+0{,}0002y,\\qquad v=0{,}0003x-0{,}0001y',
    },
    {
      title: 'Odkształcenia normalne: długość i szerokość',
      narration:
        'Odkształcenia normalne to pochodne wzdłuż osi: ε_x = ∂u/∂x = 400 με oraz ε_y = ∂v/∂y = −100 με. Element wydłuża się w kierunku x, a w kierunku y się skraca. To czysto geometryczny efekt pola, niezależny od ścinania.',
      caption: 'ε_x = 400 με, ε_y = −100 με.',
      visual: 'rosette',
      focus: { metric: 'normal' },
      formula:
        '\\varepsilon_x=0{,}0004=400\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=-0{,}0001=-100\\,\\mu\\varepsilon',
    },
    {
      title: 'Ścinanie: obrót obu boków',
      narration:
        'Pochodne mieszane opisują obrót boków. Dolna krawędź obraca się o ∂v/∂x = 300 με, a lewa krawędź o ∂u/∂y = 200 με. Suma tych obrotów daje inżynierskie odkształcenie postaciowe γ_xy = 0,0002 + 0,0003 = 0,0005 rad.',
      caption: '∂u/∂y = 200 με, ∂v/∂x = 300 με, γ_xy = 500 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula:
        '\\frac{\\partial u}{\\partial y}=0{,}0002,\\qquad \\frac{\\partial v}{\\partial x}=0{,}0003,\\qquad \\gamma_{xy}=0{,}0005',
    },
    {
      title: 'Pełna deformacja i składowa tensorowa',
      narration:
        'Nakładamy teraz odkształcenia normalne i postaciowe. Element wydłuża się w kierunku x, skraca w kierunku y, a jego boki przestają być prostopadłe. Składowa tensorowa to połowa odkształcenia inżynierskiego: ε_xy = γ_xy/2 = 250 μrad.',
      caption: 'ε_xy = γ_xy/2 = 250 μrad.',
      visual: 'rosette',
      focus: { metric: 'combined' },
      formula: '\\varepsilon_{xy}=\\frac{\\gamma_{xy}}{2}=\\frac{0{,}0005}{2}=0{,}00025=250\\,\\mu\\text{rad}',
    },
    {
      title: 'Koło Mohra: środek i promień',
      narration:
        'Średnia odkształceń normalnych wynosi ε_sr = (400 − 100)/2 = 150 με. Promień obejmuje połowę różnicy ε_x − ε_y oraz połowę γ_xy; po podstawieniu R_ε = √(250² + 250²) = 353,55 με.',
      caption: 'ε_sr = 150 με, R_ε = 353,55 με.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{400+(-100)}{2}=150\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\sqrt{250^2+250^2}=353{,}55\\,\\mu\\varepsilon',
    },
    {
      title: 'Kierunki główne, naprężenia i kontrola',
      narration:
        'Dodając i odejmując promień od średniej, otrzymujemy ε_I = 503,55 με i ε_II = −203,55 με. Kąt główny wynosi φ = 22,5°, bo tan 2φ = 500/500 = 1. Dla stali E = 200 GPa i ν = 0,30 otrzymujemy σ_I = 97,25 MPa oraz σ_II = −11,54 MPa. Pole jest liniowe, więc te wartości nie zależą od położenia punktu.',
      caption: 'ε_I = 503,55 με, ε_II = −203,55 με, φ = 22,5°; σ_I = 97,25 MPa, σ_II = −11,54 MPa.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_{I,II}=150\\pm353{,}55\\,\\mu\\varepsilon,\\qquad \\tan2\\varphi_I=\\frac{500}{500}=1\\ \\Rightarrow\\ \\varphi_I=22{,}5^\\circ',
    },
  ],
} satisfies SolutionData
