import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-strain-state-gauges',
  title: 'Tensometry: od oporu do odkształcenia — przykład 1',
  duration: 7,
  given: ['R_0 = 350 Ω', 'GF = 2,10', 'ΔR = 0,147 Ω'],
  result:
    'Czujnik wskazuje ε=200 με, czyli wydłużenie względne 0,02 % w kierunku swojej osi, uśrednione na bazie. Wynik jest spójny z danymi i nie wymaga poprawki na jednostki.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.StrainGaugeChainAnimation }))),
  scenes: [
    {
      title: 'Model i dane pomiaru',
      narration:
        'Czujnik jest przyklejony do rozciąganej próbki. Mostek wyznaczył zmianę oporu 0,147 Ω przy oporze bazowym 350 Ω i współczynniku GF = 2,10. Zanim policzymy odkształcenie, zobaczmy cały łańcuch: próbka, czujnik, mostek i odczyt.',
      caption: 'R₀ = 350 Ω, GF = 2,10, ΔR = 0,147 Ω.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'R_0=350\\,\\Omega,\\qquad GF=2{,}10,\\qquad \\Delta R=0{,}147\\,\\Omega',
    },
    {
      title: 'Oblicz względną zmianę oporu',
      narration:
        'Opór czujnika wzrósł o 0,147 Ω względem bazy 350 Ω. Względna zmiana wynosi więc 0,147/350 = 0,00042. To wielkość bezwymiarowa, niezależna od jednostki oporu.',
      caption: 'ΔR/R₀ = 0,147/350 = 0,00042.',
      visual: 'diagram',
      focus: { metric: 'ratio' },
      formula: '\\frac{\\Delta R}{R_0}=\\frac{0{,}147}{350}=0{,}00042',
    },
    {
      title: 'Wyznacz odkształcenie z współczynnika GF',
      narration:
        'Współczynnik tensometru GF = 2,10 wiąże względną zmianę oporu z odkształceniem. Dzieląc 0,00042 przez 2,10, otrzymujemy ε = 0,0002. Ścieżka czujnika wydłuża się teraz razem z próbką.',
      caption: 'ε = (ΔR/R₀)/GF = 0,0002.',
      visual: 'diagram',
      focus: { metric: 'strain' },
      formula: '\\varepsilon=\\frac{\\Delta R/R_0}{GF}=\\frac{0{,}00042}{2{,}10}=0{,}0002',
    },
    {
      title: 'Przelicz na mikrostrainy',
      narration:
        'Mnożymy wynik przez 10⁶: 0,0002 · 10⁶ = 200 με. Czujnik mierzy więc wydłużenie względne 0,02 % w kierunku swojej osi.',
      caption: 'ε = 200 με = 0,02 %.',
      visual: 'diagram',
      focus: { metric: 'micro' },
      formula: '0{,}0002\\cdot10^6=200\\,\\mu\\varepsilon',
    },
    {
      title: 'Kierunek czujnika',
      narration:
        'Czujnik mierzy odkształcenie tylko w swojej osi. W tym przykładzie odkształcenie poprzeczne przyjmujemy jako zerowe, więc ε_x = 200 με, ε_y = 0 i γ_xy = 0. To pokazuje, dlaczego pojedynczy tensometr daje jedną liczbę, a nie pełny płaski stan odkształcenia.',
      caption: 'Pomiar dotyczy osi czujnika: ε_x = 200 με, ε_y = 0.',
      visual: 'diagram',
      focus: { metric: 'axis' },
      formula: '\\varepsilon_x=200\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=0,\\qquad \\gamma_{xy}=0',
    },
    {
      title: 'Sprawdź wynik i naprężenie',
      narration:
        'Kontrola odwrotna: GF · ε · R₀ = 2,10 · 0,0002 · 350 = 0,147 Ω, czyli dokładnie tyle, ile wskazał mostek. Przy założeniu rozciągania jednoosiowego prawo Hooke’a daje σ = Eε = 40 MPa dla stali E = 200 GPa. To wartość orientacyjna, bo pomiar nie rozstrzyga sam o jednoosiowości.',
      caption: 'Kontrola: GF·ε·R₀ = 0,147 Ω; przy rozciąganiu jednoosiowym σ = 40 MPa.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula:
        'GF\\,\\varepsilon\\,R_0=2{,}10\\cdot0{,}0002\\cdot350=0{,}147\\,\\Omega,\\qquad \\sigma=E\\varepsilon=200\\,000\\cdot0{,}0002=40\\,\\text{MPa}',
    },
  ],
} satisfies SolutionData
