import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-strain-state-general-hooke',
  title: 'Uogólnione prawo Hooke’a: wszystkie osie naraz — przykład 1',
  duration: 7,
  given: ['E=200 GPa', 'nu=0,30', 'sigma_x=80 MPa', 'sigma_y=40 MPa', 'sigma_z=-20 MPa', 'tau_{xy}=30 MPa'],
  result:
    'ε_x=370 με, ε_y=110 με, ε_z=-280 με oraz γ_xy=390 μrad. Objętość rośnie nieznacznie, mimo ujemnego naprężenia w kierunku z.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.GeneralHookeExample1Animation }))),
  scenes: [
    {
      title: 'Model: przestrzenny stan naprężenia',
      narration:
        'Na ściany sześcianu działają trzy naprężenia normalne: σ_x = 80 MPa, σ_y = 40 MPa i σ_z = −20 MPa. W płaszczyźnie xy działa dodatkowo τ_xy = 30 MPa. Pozostałe składowe styczne są zerowe.',
      caption: 'Element 3D: trzy naprężenia normalne i jedno styczne w płaszczyźnie xy.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_x=80\\,\\text{MPa},\\quad \\sigma_y=40\\,\\text{MPa},\\quad \\sigma_z=-20\\,\\text{MPa},\\quad \\tau_{xy}=30\\,\\text{MPa}',
    },
    {
      title: 'Sprzężenie: każda oś zmienia trzy odkształcenia',
      narration:
        'Dodajemy skutki trzech naprężeń. σ_x wydłuża kierunek x, a przez efekt Poissona zwęża y i z. σ_y działa analogicznie, a ściskające σ_z skraca z i jednocześnie rozszerza x oraz y. Dopiero suma tych udziałów daje pełne odkształcenia.',
      caption: 'Superpozycja: własne wydłużenie i poprzeczny skurcz od każdej ze składowych.',
      visual: 'cube',
      focus: { metric: 'coupling' },
      formula:
        '\\varepsilon_x=\\frac{\\sigma_x-\\nu(\\sigma_y+\\sigma_z)}{E},\\qquad \\varepsilon_y=\\frac{\\sigma_y-\\nu(\\sigma_z+\\sigma_x)}{E},\\qquad \\varepsilon_z=\\frac{\\sigma_z-\\nu(\\sigma_x+\\sigma_y)}{E}',
    },
    {
      title: 'Deformacja elementu we wszystkich osiach',
      narration:
        'Po podstawieniu E = 200 000 MPa i ν = 0,30 otrzymujemy ε_x = 370 με, ε_y = 110 με i ε_z = −280 με. Element wydłuża się w x i y, a najbardziej kurczy się w z, bo ściskanie σ_z sumuje się ze skurczem Poissona od σ_x i σ_y.',
      caption: 'ε_x = 370 με, ε_y = 110 με, ε_z = −280 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=370\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=110\\,\\mu\\varepsilon,\\qquad \\varepsilon_z=-280\\,\\mu\\varepsilon',
    },
    {
      title: 'Ścinanie: τ_xy i γ_xy',
      narration:
        'Naprężenie styczne τ_xy = 30 MPa wywołuje odkształcenie postaciowe tylko w płaszczyźnie xy. Moduł ścinania wynosi G = E/[2(1+ν)] = 76 923 MPa, więc γ_xy = 30/76 923 = 390 μrad. Ścinanie nie zmienia odkształceń liniowych.',
      caption: 'G = 76 923 MPa, γ_xy = 390 μrad.',
      visual: 'cube',
      focus: { metric: 'shear' },
      formula:
        'G=\\frac{E}{2(1+\\nu)}=76\\,923\\,\\text{MPa},\\qquad \\gamma_{xy}=\\frac{\\tau_{xy}}{G}=390\\,\\mu\\text{rad}',
    },
    {
      title: 'Odkształcenia główne w płaszczyźnie xy',
      narration:
        'Środek koła Mohra to średnia ε_x i ε_y, czyli 240 με. Promień R = √(130² + 195²) = 234,36 με daje ε_I = 474,36 με i ε_II = 5,64 με. Kąt główny φ = 28,155°. Trzecim odkształceniem głównym jest ε_z = −280 με.',
      caption: 'ε_I = 474,36 με, ε_II = 5,64 με, φ = 28,155°.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_I=474{,}36\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=5{,}64\\,\\mu\\varepsilon,\\qquad \\varphi=28{,}155^\\circ',
    },
    {
      title: 'Kontrola: zmiana objętości',
      narration:
        'Ślad tensora odkształcenia to 370 + 110 − 280 = 200 με. Objętość rośnie o około 0,02%, mimo że w kierunku z panuje naprężenie ściskające. To pokazuje, że znak ε_z nie decyduje sam o znaku zmiany objętości.',
      caption: 'θ = ΔV/V₀ = 200 με ≈ 0,02%.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=370+110-280=200\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
