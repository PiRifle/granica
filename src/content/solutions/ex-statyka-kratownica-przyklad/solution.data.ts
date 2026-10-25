import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-kratownica-przyklad',
  title: 'Kratownica trójpanelowa — pełne rozwiązanie i kontrola Ritterem',
  duration: 8,
  given: [
    'Panel a = 2 m, wysokość h = a·tan60° = 3,464 m',
    'Węzły górne A, C, E, G; dolne B, D, F, H',
    'Obciążenia P₁ = 8 kN w C, P₂ = 4 kN w E, P₃ = 2 kN w H w prawo',
    'Podpora przegubowa w A, więź poziomy w B',
    'Pręty numerowane 1–12 jak w wykładzie',
  ],
  result:
    'Reakcje: RAx = 9,238 kN w lewo, RAy = 12 kN w górę, RB = 7,238 kN w prawo. Siły (kN): N₁=+2,309, N₂=+13,856, N₃=−7,237, N₄=−12, N₅=0, N₆=+4,619, N₇=−0,309, N₈=−4, N₉=0, N₁₀=0, N₁₁=+2, N₁₂=0. Ritter dla prętów 1, 2, 3 potwierdza tabelę.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FullTrussExampleAnimation }))),
  scenes: [
    {
      title: 'Geometria i model',
      narration:
        'Kratownica ma trzy panele po 2 m. Wysokość wynosi h = a·tan60° = 3,464 m, a ukośnice są nachylone pod 60°. Górny pas tworzą AC, CE, EG, dolny BD, DF, FH, a słupki CD, EF, GH łączą oba pasy.',
      caption: 'Osiem węzłów, dwanaście prętów, trzy obciążenia i trzy reakcje.',
      visual: 'diagram',
      focus: { metric: 'geometry' },
      formula: 'a=2\\ \\text{m},\\qquad h=a\\tan60^\\circ=3{,}464\\ \\text{m},\\qquad \\alpha=60^\\circ',
    },
    {
      title: 'Reakcje podpór',
      narration:
        'Pionowo całe obciążenie 8 + 4 = 12 kN przejmuje przegub A, bo więź w B jest pozioma: RAy = 12 kN. Moment względem B daje RAx·3,464 = 8·2 + 4·4 = 32, więc RAx = 9,238 kN w lewo. Poziomo RB = 9,238 − 2 = 7,238 kN w prawo.',
      caption: 'RAy = 12 kN, RAx = 9,238 kN w lewo, RB = 7,238 kN w prawo.',
      visual: 'diagram',
      focus: { metric: 'reactions' },
      formula:
        'R_{Ax}=\\frac{8\\cdot2+4\\cdot4}{3{,}464}=9{,}238\\ \\text{kN},\\qquad R_{Ay}=12\\ \\text{kN},\\qquad R_B=7{,}238\\ \\text{kN}',
    },
    {
      title: 'Pręty zerowe i węzeł H',
      narration:
        'W nieobciążonym węźle G spotykają się tylko EG i GH, więc N₉ = N₁₂ = 0. W węźle H pionowy GH ma zero, a obciążenie 2 kN działa poziomo, więc ukośnica EH też jest zerowa: N₁₀ = 0. Poziomo zostaje N₁₁ = +2 kN. W węźle E po zerach N₉ i N₁₀ pozioma równowaga daje N₅ = 0.',
      caption: 'Zera: N₅ = N₉ = N₁₀ = N₁₂ = 0; N₁₁ = +2,00 kN.',
      visual: 'diagram',
      focus: { metric: 'zeros' },
      formula: 'N_9=N_{12}=0,\\quad N_{10}=0,\\quad N_5=0,\\quad N_{11}=+2\\ \\text{kN}',
    },
    {
      title: 'Węzeł F — pierwsze siły',
      narration:
        'W węźle F znamy N₁₁ = +2 i N₈ po wycięciu E. Pionowo N₈ + N₆ sin60° = 0, a z węzła E otrzymujemy N₈ = −4 kN. Stąd N₆ = 4/0,866 = +4,619 kN. Poziomo N₁₁ − N₇ − N₆ cos60° = 0, więc N₇ = 2 − 2,309 = −0,309 kN.',
      caption: 'N₈ = −4,00 kN, N₆ = +4,619 kN, N₇ = −0,309 kN.',
      visual: 'diagram',
      focus: { metric: 'nodeF' },
      formula:
        'N_6=\\frac{4}{\\sin60^\\circ}=+4{,}619\\ \\text{kN},\\qquad N_7=2-4{,}619\\cdot0{,}5=-0{,}309\\ \\text{kN}',
    },
    {
      title: 'Węzły C i D — domknięcie rachunku',
      narration:
        'W węźle C znamy N₅ = 0 i N₆ = +4,619. Poziomo N₁ = N₆ cos60° = +2,309 kN. Pionowo −8 − N₆ sin60° − N₄ = 0, więc N₄ = −12 kN. W węźle D pionowo N₄ + N₂ sin60° = 0 daje N₂ = +13,856 kN, a poziomo N₃ = N₇ − N₂ cos60° = −7,237 kN.',
      caption: 'N₁ = +2,309, N₂ = +13,856, N₃ = −7,237, N₄ = −12,00 kN.',
      visual: 'diagram',
      focus: { metric: 'nodesCD' },
      formula:
        'N_1=N_6\\cos60^\\circ=+2{,}309\\ \\text{kN},\\quad N_2=\\frac{12}{\\sin60^\\circ}=+13{,}856\\ \\text{kN},\\quad N_3=-7{,}237\\ \\text{kN}',
    },
    {
      title: 'Kontrola Ritterem',
      narration:
        'Przekrój przez pręty 1, 2 i 3 przechodzi między lewą i prawą częścią. Dla prawej części pionowo N₂ sin60° = P₁ + P₂, więc N₂ = +13,856 kN. Moment względem D daje N₁·3,464 = P₂·2, czyli N₁ = +2,309 kN. Poziomo N₃ = P₃ − N₁ − N₂ cos60° = −7,237 kN. Wyniki zgadzają się z metodą węzłów.',
      caption: 'Przekrój 1–2–3 potwierdza tabelę sił; kontrola domyka całe zadanie.',
      visual: 'diagram',
      focus: { metric: 'ritterCheck' },
      formula:
        'N_2\\sin60^\\circ=12\\Rightarrow N_2=+13{,}856,\\quad N_1=\\frac{4\\cdot2}{3{,}464}=+2{,}309,\\quad N_3=2-N_1-N_2\\cos60^\\circ=-7{,}237',
    },
  ],
} satisfies SolutionData
