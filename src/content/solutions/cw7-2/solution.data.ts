import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'cw7-2',
  title: 'Rozeta tensometryczna 0°/45°/90°',
  duration: 10,
  given: [
    'ε₀ = 2,68·10⁻⁴; ε₄₅ = 1,25·10⁻⁴; ε₉₀ = −2,65·10⁻⁴',
    'Oś x pokrywa się z czujnikiem 0°, oś y z czujnikiem 90°; kąt 45° mierzony od x ku y',
    'Założenie materiałowe: stal izotropowa E = 200 GPa = 200 000 MPa, ν = 0,3',
    'Na swobodnej powierzchni przyjmujemy płaski stan naprężenia: σ_z = τ_xz = τ_yz = 0',
  ],
  result:
    'γ_xy = 2,47·10⁻⁴; ε_I = 2,95225·10⁻⁴, ε_II = −2,92225·10⁻⁴; φ_I = 12,432°, φ_II = 102,432°; dla stali σ_I = 45,62 MPa, σ_II = −44,76 MPa.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RosetteMohrAnimation }))),
  scenes: [
    {
      title: 'Przypisz odczyty do osi',
      narration:
        'Czujnik 0° mierzy odkształcenie normalne w kierunku x, a czujnik 90° w kierunku y. Trzeci pomiar pozwoli wyznaczyć odkształcenie postaciowe γ_xy. Wszystkie odkształcenia są bezwymiarowe.',
      formula:
        '\\varepsilon_x=\\varepsilon_0=2,68\\cdot10^{-4},\\qquad \\varepsilon_y=\\varepsilon_{90}=-2,65\\cdot10^{-4}',
      caption: 'Dodatnie ε_x oznacza wydłużenie w kierunku x, ujemne ε_y — skrócenie w kierunku y.',
      visual: 'rosette',
      focus: { metric: 'gauges' },
    },
    {
      title: 'Wyznacz odkształcenie postaciowe',
      narration:
        'Transformacja odkształcenia normalnego dla kąta 45° daje ε₄₅ = (ε_x + ε_y)/2 + γ_xy/2. Po przekształceniu γ_xy = 2ε₄₅ − ε₀ − ε₉₀.',
      formula: '\\gamma_{xy}=2(1,25\\cdot10^{-4})-2,68\\cdot10^{-4}-(-2,65\\cdot10^{-4})=2,47\\cdot10^{-4}',
      caption: 'Pomiar pod 45° nie jest odkształceniem postaciowym; trzeba go przeliczyć z trzech odczytów.',
      visual: 'rosette',
      focus: { metric: 'shear' },
    },
    {
      title: 'Zbuduj koło Mohra odkształceń',
      narration:
        'Średnia odkształceń normalnych wyznacza środek koła Mohra. Promień obejmuje połowę różnicy ε_x − ε_y oraz połowę γ_xy. Dzięki temu znajdziemy skrajne odkształcenia normalne.',
      formula:
        '\\varepsilon_{sr}=\\frac{\\varepsilon_x+\\varepsilon_y}{2}=1,50\\cdot10^{-6},\\qquad R_\\varepsilon=\\sqrt{\\left(\\frac{\\varepsilon_x-\\varepsilon_y}{2}\\right)^2+\\left(\\frac{\\gamma_{xy}}{2}\\right)^2}=2,937252\\cdot10^{-4}',
      caption: 'Tutaj (ε_x − ε_y)/2 = 2,665·10⁻⁴, a γ_xy/2 = 1,235·10⁻⁴.',
      visual: 'rosette',
      focus: { metric: 'mohr' },
    },
    {
      title: 'Wyznacz odkształcenia główne',
      narration:
        'Odkształcenia główne są skrajnymi punktami koła: średnia plus lub minus promień. W kierunkach głównych odkształcenie postaciowe znika.',
      formula: '\\varepsilon_{I,II}=\\varepsilon_{sr}\\pm R_\\varepsilon',
      caption: 'ε_I = 2,952252·10⁻⁴ oraz ε_II = −2,922252·10⁻⁴.',
      visual: 'rosette',
      focus: { metric: 'principal' },
    },
    {
      title: 'Wyznacz kierunki główne',
      narration:
        'Kierunek pierwszego odkształcenia głównego znajdujemy z równania transformacji. Tangens podwójnego kąta to γ_xy/(ε_x − ε_y). Wybieramy rozwiązanie odpowiadające ε_I; drugi kierunek jest prostopadły.',
      formula:
        '\\tan2\\varphi_I=\\frac{\\gamma_{xy}}{\\varepsilon_x-\\varepsilon_y}=\\frac{2,47}{5,33},\\qquad \\varphi_I=\\tfrac12\\arctan(0,463415)=12,4318^\\circ',
      caption: 'φ_I = 12,432° od czujnika 0° w stronę czujnika 90°, a φ_II = 102,432°.',
      visual: 'rosette',
      focus: { metric: 'angle' },
      emphasis: 'Kąt na kole Mohra wynosi 2φ, ale kierunek fizyczny na elemencie to φ.',
    },
    {
      title: 'Model materiału, naprężenia i interpretacja',
      narration:
        'Materiał nie jest określony, więc jawnie przyjmujemy stal o E = 200 GPa i ν = 0,3. Na nieobciążonej powierzchni stosujemy płaski stan naprężenia. W kierunkach głównych odwracamy prawo Hooke’a: σ_I = E/(1 − ν²)(ε_I + νε_II) oraz σ_II = E/(1 − ν²)(ε_II + νε_I). Po podstawieniu σ_I = 45,62 MPa, a σ_II = −44,76 MPa. Kontrola w osiach pomiarowych daje σ_x = 41,429 MPa, σ_y = −40,571 MPa i τ_xy = 19,00 MPa; transformacja tych wartości prowadzi do tych samych naprężeń głównych. Kierunek pierwszy jest nachylony o 12,432° od czujnika 0°, a drugi jest prostopadły. Trzecie naprężenie normalne na swobodnej powierzchni wynosi zero.',
      formula:
        '\\frac{E}{1-\\nu^2}=219\\,780,22\\ \\text{MPa},\\qquad \\sigma_I=219\\,780,22\\,(2,95225-0,3\\cdot2,92225)\\cdot10^{-4}=45,62\\ \\text{MPa},\\qquad \\sigma_{II}=219\\,780,22\\,(-2,92225+0,3\\cdot2,95225)\\cdot10^{-4}=-44,76\\ \\text{MPa}',
      caption:
        'Dla E = 200 GPa i ν = 0,3: σ_I = 45,62 MPa, σ_II = −44,76 MPa. Kontrola w osiach x–y: σ_x = 41,429 MPa, σ_y = −40,571 MPa, τ_xy = 19,00 MPa daje ten sam wynik.',
      visual: 'rosette',
      focus: { metric: 'stress' },
      emphasis: 'Rozeta daje najpierw stan odkształcenia; dopiero model materiału pozwala otrzymać naprężenia.',
    },
  ],
} satisfies SolutionData
