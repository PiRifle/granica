import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-prety-dwuosiowe',
  title: 'Węzeł z dwoma prętami dwusiłowymi — znak siły',
  duration: 6,
  given: [
    'Poziomy pręt AC i ukośny pręt BC pod 45°',
    'Ciężar w węźle C: P = 10 kN',
    'Pręty są dwusiłowe, ich ciężar pomijamy',
  ],
  result:
    'Siła w pręcie BC wynosi NBC = 14,14 kN (rozciąganie). Siła w pręcie AC wynosi NAC = −10 kN, czyli pręt AC jest ściskany siłą 10 kN.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TwoForceBarsAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Węzeł C jest połączony przegubowo z dwoma prętami. Oba pręty są dwusiłowe, więc ich siły działają wzdłuż linii łączących przeguby. Obciążenie P działa pionowo w dół.',
      caption: 'Węzeł C, poziomy pręt AC i ukośny pręt BC pod 45°.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'P=10\\ \\text{kN},\\qquad \\alpha=45^\\circ',
    },
    {
      title: 'Założenie rozciągania',
      narration:
        'Przyjmujemy, że oba pręty są rozciągane. Rysujemy więc siły NAC i NBC od węzła C w stronę przeciwnych końców prętów. Ewentualny minus w wyniku odwróci później zwrot siły.',
      caption: 'NAC w lewo, NBC ukośnie w lewo-górę — założenie rozciągania.',
      visual: 'diagram',
      focus: { metric: 'assumption' },
      formula: 'N_{AC}>0,\\qquad N_{BC}>0\\quad\\text{(założenie rozciągania)}',
    },
    {
      title: 'Równowaga pionowa',
      narration:
        'Pionową składową ma tylko pręt BC: NBC sin 45°. Musi ona zrównoważyć ciężar P. Stąd NBC = 10 / 0,7071 = 14,14 kN. Wynik dodatni oznacza rozciąganie.',
      caption: 'NBC sin 45° = P, więc NBC = 14,14 kN (rozciąganie).',
      visual: 'diagram',
      focus: { metric: 'vertical' },
      formula: 'N_{BC}\\sin45^\\circ-P=0\\ \\Rightarrow\\ N_{BC}=14{,}14\\ \\text{kN}',
    },
    {
      title: 'Równowaga pozioma',
      narration:
        'Pozioma składowa NBC cos 45° działa w lewo. Równoważy ją siła NAC, również założona w lewo, więc równanie ma znaki ujemne. Otrzymujemy NAC = −10 kN.',
      caption: 'NAC = −NBC cos 45° = −10 kN.',
      visual: 'diagram',
      focus: { metric: 'horizontal' },
      formula: '-N_{AC}-N_{BC}\\cos45^\\circ=0\\ \\Rightarrow\\ N_{AC}=-10\\ \\text{kN}',
    },
    {
      title: 'Interpretacja znaku',
      narration:
        'Minus przy NAC oznacza, że rzeczywisty zwrot jest przeciwny do założonego. Pręt AC jest ściskany i działa na węzeł w prawo. Pręt BC pozostaje rozciągany i działa ukośnie w lewo-górę.',
      caption: 'AC — ściskanie 10 kN; BC — rozciąganie 14,14 kN.',
      visual: 'diagram',
      focus: { metric: 'sign' },
      formula: 'N_{AC}<0\\ \\Rightarrow\\ \\text{ściskanie},\\qquad N_{BC}>0\\ \\Rightarrow\\ \\text{rozciąganie}',
    },
    {
      title: 'Kontrola bilansu węzła',
      narration:
        'Sprawdzamy oba kierunki. Poziomo 10 kN w lewo od pręta BC równoważy 10 kN w prawo od ściskanego pręta AC. Pionowo 10 kN w górę od pręta BC równoważy ciężar 10 kN w dół.',
      caption: 'ΣFx = 0 i ΣFy = 0 — bilans węzła się zgadza.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '10-10=0,\\qquad 10-10=0',
    },
  ],
} satisfies SolutionData
