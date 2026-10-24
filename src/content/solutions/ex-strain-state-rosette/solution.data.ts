import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-strain-state-rosette',
  title: 'Rozeta 0°/45°/90°: trzy odczyty, pełny obraz — przykład 1',
  duration: 7,
  given: ['varepsilon_0=800', 'varepsilon_45=500', 'varepsilon_90=200'],
  result:
    'ε_1=800 με, ε_2=200 με i γ_max=600 μrad. Zerowa wartość γ_xy oznacza, że w tym punkcie nie ma ścinania względem osi rozety, a kierunki główne pokrywają się z osiami czujników.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.StrainRosetteExample1Animation }))),
  scenes: [
    {
      title: 'Model rozety i trzy odczyty',
      narration:
        'Czujnik 0° mierzy odkształcenie normalne w kierunku x, a czujnik 90° w kierunku y. Odczyty wynoszą odpowiednio 800 με i 200 με. Czujnik 45° rejestruje 500 με, czyli dokładnie tyle, ile średnia dwóch skrajnych kierunków. Animacja rysuje trzy kierunki pomiarowe na jednym podłożu.',
      caption: 'Trzy czujniki rozety dają ε₀ = 800 με, ε₄₅ = 500 με i ε₉₀ = 200 με.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
      formula:
        '\\varepsilon_0=800\\,\\mu\\varepsilon,\\qquad \\varepsilon_{45}=500\\,\\mu\\varepsilon,\\qquad \\varepsilon_{90}=200\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenie postaciowe',
      narration:
        'Transformacja odkształcenia dla kierunku 45° pozwala wyznaczyć γ_xy z trzech odczytów. Otrzymujemy zero, więc względem osi rozety nie ma ścinania. Na kole Mohra punkt 45° leży na pionowej średnicy, bo właśnie w tym kierunku ścinanie jest największe.',
      caption: 'γ_xy = 2 · 500 − 800 − 200 = 0 μrad.',
      visual: 'rosette',
      focus: { metric: 'shear' },
      formula: '\\gamma_{xy}=2\\varepsilon_{45}-\\varepsilon_0-\\varepsilon_{90}=2\\cdot500-800-200=0',
    },
    {
      title: 'Zbuduj koło Mohra',
      narration:
        'Punkty odpowiadające kierunkom 0° i 90° wyznaczają średnicę koła. Środek to średnia odkształceń normalnych, a promień równa się połowie ich różnicy, bo γ_xy = 0. Koło leży w całości po prawej stronie osi ε = 0, bo oba odkształcenia główne są dodatnie. Animacja zakreśla je po ustaleniu środka i promienia.',
      caption: 'ε_sr = 500 με, R_ε = 300 με; koło przechodzi przez punkty 0° i 90°.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
      formula:
        '\\varepsilon_{sr}=\\frac{800+200}{2}=500\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=\\frac{800-200}{2}=300\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz odkształcenia główne',
      narration:
        'Odkształcenia główne to skrajne punkty koła: średnia plus i minus promień. Otrzymujemy 800 με oraz 200 με, czyli wartości pokrywające się z odczytami czujników.',
      caption: 'εⅠ = 800 με, εⅡ = 200 με.',
      visual: 'rosette',
      focus: { metric: 'principal' },
      formula: '\\varepsilon_I=500+300=800\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=500-300=200\\,\\mu\\varepsilon',
    },
    {
      title: 'Wyznacz kierunki główne',
      narration:
        'Kąt kierunku głównego wynika z tangensa podwójnego kąta. Ponieważ γ_xy = 0 i ε₀ > ε₉₀, tangens jest równy zeru, więc kierunki główne pokrywają się z osiami 0° i 90°. Na rysunku osie główne nakładają się na kierunki czujników.',
      caption: 'φⅠ = 0°, φⅡ = 90°.',
      visual: 'rosette',
      focus: { metric: 'angle' },
      formula:
        '\\tan2\\varphi_I=\\frac{\\gamma_{xy}}{\\varepsilon_0-\\varepsilon_{90}}=\\frac{0}{800-200}=0,\\qquad \\varphi_I=0^\\circ',
    },
    {
      title: 'Model materiału i naprężenia',
      narration:
        'Przyjmujemy stal izotropową o module Younga 200 GPa i liczbie Poissona 0,30. Dla płaskiego stanu naprężenia czynnik E/(1 − ν²) wynosi 219 780 MPa. Odwracamy prawo Hooke’a w kierunkach głównych i otrzymujemy σⅠ = 189,01 MPa oraz σⅡ = 96,70 MPa. Kontrola: suma naprężeń 285,71 MPa odpowiada sumie odkształceń 1000 με przez ten sam czynnik.',
      caption: 'E = 200 GPa, ν = 0,30; σⅠ = 189,01 MPa, σⅡ = 96,70 MPa. Kontrola: σⅠ + σⅡ = 285,71 MPa.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      formula:
        '\\frac{E}{1-\\nu^2}=219\\,780\\,\\text{MPa},\\qquad \\sigma_I=219\\,780\\cdot(800+0{,}30\\cdot200)\\cdot10^{-6}=189{,}01\\,\\text{MPa},\\qquad \\sigma_{II}=219\\,780\\cdot(200+0{,}30\\cdot800)\\cdot10^{-6}=96{,}70\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
