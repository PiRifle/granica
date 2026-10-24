import type { SolutionData } from '../../model'
import { GeneralHookeExample3Animation } from './animation'

export default {
  id: 'ex-strain-state-general-hooke-3',
  title: 'Uogólnione prawo Hooke’a: wszystkie osie naraz — przykład 3',
  duration: 7,
  given: ['varepsilon_x=500', 'varepsilon_y=-150', 'E=200 GPa', 'nu=0,30'],
  result:
    'Gdyby zmierzone ε_y było dodatnie, wniosek o czystym rozciąganiu byłby fałszywy. Trzeba by wrócić do pełnego układu równań i rozważyć naprężenie σ_y lub odkształcenie termiczne.',
  animation: GeneralHookeExample3Animation,
  scenes: [
    {
      title: 'Pomiar tensometrami',
      narration:
        'Wzdłuż osi x zmierzono ε_x = 500 με, a wzdłuż osi y ε_y = −150 με. Materiał ma E = 200 GPa i ν = 0,30. Zakładamy stan jednoosiowy i sprawdzamy, czy pomiar jest z nim spójny.',
      caption: 'ε_x = 500 με, ε_y = −150 με; E = 200 GPa, ν = 0,30.',
      visual: 'cube',
      focus: { metric: 'gauges' },
      formula: '\\varepsilon_x=500\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=-150\\,\\mu\\varepsilon',
    },
    {
      title: 'Odwrócenie prawa Hooke’a',
      narration:
        'W stanie jednoosiowym ε_x = σ_x/E, więc σ_x = Eε_x = 200 000 · 0,0005 = 100 MPa. Dodatni znak oznacza rozciąganie w kierunku x.',
      caption: 'σ_x = 100 MPa, σ_y = 0.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma_x=E\\varepsilon_x=200\\,000\\cdot0{,}0005=100\\,\\text{MPa}',
    },
    {
      title: 'Test efektu Poissona',
      narration:
        'Jeśli stan jest jednoosiowy, to ε_y powinno wynosić −νε_x = −0,30·0,0005 = −0,00015, czyli −150 με. Zmierzona wartość jest dokładnie taka, więc hipoteza jest spójna.',
      caption: 'Przewidywane ε_y = −150 με jest zgodne z pomiarem.',
      visual: 'cube',
      focus: { metric: 'coupling' },
      formula: '\\varepsilon_y=-\\nu\\varepsilon_x=-0{,}30\\cdot500=-150\\,\\mu\\varepsilon',
    },
    {
      title: 'Odkształcenie grubości',
      narration: 'W kierunku z nie działa naprężenie, ale ε_z = −νε_x = −150 με. Grubość elementu maleje mimo σ_z = 0.',
      caption: 'ε_z = −150 με.',
      visual: 'cube',
      focus: { metric: 'strain-z' },
      formula: '\\varepsilon_z=-\\nu\\varepsilon_x=-0{,}30\\cdot0{,}0005=-0{,}00015=-150\\,\\mu\\varepsilon',
    },
    {
      title: 'Koło Mohra i wartości główne',
      narration:
        'Przy zerowym ścinaniu koło ma środek 175 με i promień 325 με. Odkształcenia główne to 500 με i −150 με, a kierunki x i y są już głównymi, czyli φ = 0°.',
      caption: 'ε_I = 500 με, ε_II = −150 με, φ = 0°.',
      visual: 'cube',
      focus: { metric: 'principal' },
      formula:
        '\\varepsilon_{sr}=175\\,\\mu\\varepsilon,\\qquad R_\\varepsilon=325\\,\\mu\\varepsilon,\\qquad \\varepsilon_I=500\\,\\mu\\varepsilon,\\qquad \\varepsilon_{II}=-150\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdzenie założenia i objętości',
      narration:
        'Suma odkształceń wynosi 500 − 150 − 150 = 200 με, więc objętość rośnie. Gdyby ε_y było dodatnie, wniosek o czystym rozciąganiu byłby fałszywy: trzeba by wrócić do pełnego układu równań i rozważyć σ_y lub odkształcenie termiczne.',
      caption: 'Kontrola: 500 − 150 − 150 = 200 με; dodatnie ε_y wyklucza stan jednoosiowy.',
      visual: 'cube',
      focus: { metric: 'check' },
      formula:
        '\\varepsilon_x+\\varepsilon_y+\\varepsilon_z=500-150-150=200\\,\\mu\\varepsilon,\\qquad \\varepsilon_y>0\\Rightarrow\\sigma_y\\neq0',
    },
  ],
} satisfies SolutionData
