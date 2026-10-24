import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-strain-state-general-hooke-2',
  title: 'Uogólnione prawo Hooke’a: wszystkie osie naraz — przykład 2',
  duration: 7,
  given: ['sigma_z=0', 'sigma_x=120 MPa', 'sigma_y=0', 'E=200 GPa', 'nu=0,30'],
  result:
    'Gdyby ktoś błędnie przyjął, że w kierunku z nie ma odkształcenia, popełniłby błąd rzędu 180 με. Przy pomiarze tensometrycznym to wartość całkowicie mierzalna, więc założenie płaskiego stanu odkształcenia zamiast płaskiego stanu naprężenia musi być świadome.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.GeneralHookeExample2Animation }))),
  scenes: [
    {
      title: 'Model: płaski stan naprężenia',
      narration:
        'Cienka blacha jest rozciągana tylko w kierunku x: σ_x = 120 MPa, a σ_y = σ_z = 0. To płaski stan naprężenia. Grubość blachy jest mała, ale jej zmiana nadal jest mierzalna.',
      caption: 'σ_x = 120 MPa, σ_y = σ_z = 0; E = 200 GPa, ν = 0,30.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=120\\,\\text{MPa},\\qquad \\sigma_y=0,\\qquad \\sigma_z=0',
    },
    {
      title: 'Odkształcenie w kierunku x',
      narration:
        'W kierunku x działa wyłącznie σ_x, więc ε_x = σ_x/E = 120/200 000 = 0,0006, czyli 600 με. Blacha wydłuża się wzdłuż siły.',
      caption: 'ε_x = 600 με.',
      visual: 'cube',
      focus: { metric: 'strain-x' },
      formula: '\\varepsilon_x=\\frac{\\sigma_x}{E}=\\frac{120}{200\\,000}=600\\,\\mu\\varepsilon',
    },
    {
      title: 'Efekt Poissona w kierunku y i z',
      narration:
        'Mimo zerowych naprężeń σ_y i σ_z blacha kurczy się w obu kierunkach poprzecznych. ε_y = ε_z = −νσ_x/E = −0,30·120/200 000 = −180 με.',
      caption: 'ε_y = ε_z = −180 με przy σ_y = σ_z = 0.',
      visual: 'cube',
      focus: { metric: 'coupling' },
      formula:
        '\\varepsilon_y=\\varepsilon_z=-\\frac{\\nu\\sigma_x}{E}=-\\frac{0{,}30\\cdot120}{200\\,000}=-180\\,\\mu\\varepsilon',
    },
    {
      title: 'Płaski stan naprężenia ≠ płaski stan odkształcenia',
      narration:
        'Gdyby przyjąć ε_z = 0, błąd wyniósłby 180 με. Grubość blachy rzeczywiście maleje, chociaż σ_z = 0. Założenie płaskiego stanu odkształcenia trzeba więc uzasadnić osobno.',
      caption: 'Rzeczywiste ε_z = −180 με; założenie ε_z = 0 daje błąd 180 με.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        '\\varepsilon_z=\\frac{\\sigma_z-\\nu(\\sigma_x+\\sigma_y)}{E}=-\\frac{0{,}30(120+0)}{200\\,000}=-180\\,\\mu\\varepsilon',
    },
    {
      title: 'Koło Mohra i odkształcenia główne',
      narration:
        'W płaszczyźnie xy nie ma ścinania, więc koło ma środek 210 με i promień 390 με. Skrajne odkształcenia to 600 με i −180 με, a osie x i y są już głównymi, czyli φ = 0°.',
      caption: 'ε_I = 600 με, ε_II = −180 με, φ = 0°.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_{sr}=210\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=390\\,\\mu\\varepsilon,\\qquad \\varepsilon_I=600\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=-180\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
