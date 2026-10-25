import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-model-kratownicy',
  title: 'Kratownica trójkątna — od schematu do sił osiowych',
  duration: 6,
  given: [
    'Węzły A = (0, 0), B = (6, 0), C = (3, 4) m',
    'Podpora przegubowa w A, podpora przesuwna w B',
    'Obciążenie P = 10 kN w węźle C, pionowo w dół',
    'Pręty: AC, BC i AB',
  ],
  result:
    'Reakcje: Ax = 0, Ay = By = 5 kN. Siły: NAC = NBC = −6,25 kN (ściskanie) oraz NAB = +3,75 kN (rozciąganie). Znak minus oznacza przeciwny zwrot do założonego rozciągania.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ModelTrussAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Kratownicę zastępujemy schematem prętów dwuosiowych. Obciążenie działa tylko w węźle C, a połączenia traktujemy jako idealne przeguby. Podpora w A daje dwie składowe reakcji, a podpora przesuwna w B tylko reakcję pionową.',
      caption: 'Trójkąt 3–4–5 z obciążeniem w wierzchołku i podporami w węzłach A i B.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'A=(0,0),\\quad B=(6,0),\\quad C=(3,4)\\ \\text{m},\\qquad P=10\\ \\text{kN}',
    },
    {
      title: 'Reakcje podpór',
      narration:
        'Z równowagi całej kratownicy suma sił poziomych daje Ax = 0. Geometria i obciążenie są symetryczne, więc reakcje pionowe dzielą się po połowie: Ay = By = 10/2 = 5 kN.',
      caption: 'Ay = By = 5 kN, Ax = 0.',
      visual: 'diagram',
      focus: { metric: 'reactions' },
      formula: 'A_x=0,\\qquad A_y=B_y=\\frac{P}{2}=5\\ \\text{kN}',
    },
    {
      title: 'Geometria prętów ukośnych',
      narration:
        'Połowa podstawy ma 3 m, a wysokość 4 m, więc długość każdego pręta ukośnego wynosi 5 m. Kąt θ do poziomu spełnia sinθ = 4/5 = 0,8 i cosθ = 3/5 = 0,6.',
      caption: 'Trójkąt 3–4–5: sinθ = 0,8, cosθ = 0,6.',
      visual: 'diagram',
      focus: { metric: 'geometry' },
      formula: '\\sin\\theta=\\frac{4}{5}=0{,}8,\\qquad \\cos\\theta=\\frac{3}{5}=0{,}6',
    },
    {
      title: 'Węzeł C — pręty ukośne',
      narration:
        'W węźle C działają dwa pręty ukośne i obciążenie 10 kN. Z symetrii NAC = NBC = N. Równowaga pionowa daje −2N sinθ − P = 0, czyli N = −10/(2·0,8) = −6,25 kN. Oba pręty są ściskane.',
      caption: 'NAC = NBC = −6,25 kN — ściskanie.',
      visual: 'diagram',
      focus: { metric: 'nodeC' },
      formula: '-2N\\sin\\theta-P=0\\quad\\Rightarrow\\quad N=-\\frac{10}{2\\cdot0{,}8}=-6{,}25\\ \\text{kN}',
    },
    {
      title: 'Węzeł A — dolny pas',
      narration:
        'Siła w AC ma składowe (−3,75; −5,00) kN. Reakcja Ay = 5 kN znosi składową pionową, a w poziomie zostaje NAB − 3,75 = 0. Stąd NAB = +3,75 kN, czyli rozciąganie.',
      caption: 'NAB = +3,75 kN — rozciąganie.',
      visual: 'diagram',
      focus: { metric: 'nodeA' },
      formula: 'N_{AB}-3{,}75=0\\quad\\Rightarrow\\quad N_{AB}=+3{,}75\\ \\text{kN}',
    },
    {
      title: 'Kontrola i interpretacja znaków',
      narration:
        'W węźle B reakcja 5 kN równoważy pionową składową ściskanego pręta BC, a poziome składowe BC i AB znoszą się. Kolor zielony oznacza rozciąganie, czerwony ściskanie. Znak minus nie jest „siłą ujemną”, tylko przeciwnym zwrotem do założonego rozciągania.',
      caption: 'Wszystkie siły w równowadze; kolory pokazują charakter pracy prętów.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'N_{AC}=N_{BC}=-6{,}25\\ \\text{kN},\\qquad N_{AB}=+3{,}75\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
