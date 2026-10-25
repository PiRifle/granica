import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-rownowaga-tarcie',
  title: 'Równowaga z tarciem: zakres siły P — rozwiązanie krok po kroku',
  duration: 7,
  given: [
    'Ciało o ciężarze G = 100 N na równi o kącie α = 30°',
    'Współczynniki tarcia: μs = 0,20, μk = 0,15',
    'Siła P działa równolegle do równi, w górę',
  ],
  result:
    'Ciało pozostaje w spoczynku dla 32,7 N ≤ P ≤ 67,3 N. Przy dolnej granicy tarcie działa w górę równi, przy górnej w dół. Kąt graniczny wynosi φs = arctg 0,20 ≈ 11,3°.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FrictionEquilibriumAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Ciało na równi zastępujemy bryłą z ciężarem G w środku. Reakcję podłoża rozkładamy na normalną N i tarcie T. Siła P jest równoległa do równi, więc zmienia tylko bilans wzdłuż pochyłości, a nie nacisk.',
      caption: 'Równia 30°, ciężar 100 N, siła P wzdłuż równi w górę.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'G=100\\ \\text{N},\\qquad \\alpha=30^\\circ,\\qquad \\mu_s=0{,}20',
    },
    {
      title: 'Składowe ciężaru',
      narration:
        'Ciężar rozkładamy na kierunek równi i prostopadły do niej. Wzdłuż równi działa 50 N w dół, a nacisk normalny wynosi 86,6 N. To właśnie normalna wyznaczy dostępne tarcie.',
      caption: 'G sin α = 50,0 N w dół równi, G cos α = N = 86,6 N.',
      visual: 'diagram',
      focus: { metric: 'components' },
      formula: 'G\\sin\\alpha=50{,}0\\ \\text{N},\\qquad G\\cos\\alpha=86{,}6\\ \\text{N}',
    },
    {
      title: 'Tarcie graniczne',
      narration:
        'Maksymalne tarcie statyczne to μs razy nacisk. Wynosi 17,3 N i jest znacznie mniejsze od 50 N, które ciągnie ciało w dół. Bez siły P ciało nie może więc pozostać w spoczynku.',
      caption: 'T_max = 17,3 N, a składowa zjazdowa to 50 N — potrzeba dodatkowej siły P.',
      visual: 'diagram',
      focus: { metric: 'limit' },
      formula: 'T_{\\max}=\\mu_s N=0{,}20\\cdot86{,}6=17{,}3\\ \\text{N}',
    },
    {
      title: 'Dolna granica siły P',
      narration:
        'Przy najmniejszej sile P tarcie jest w pełni wykorzystane w górę równi. Wtedy P i tarcie razem równoważą składową zjazdową ciężaru. Poniżej tej wartości ciało zjeżdża.',
      caption: 'P_min = 50 − 17,3 = 32,7 N; tarcie działa w górę równi.',
      visual: 'diagram',
      focus: { metric: 'minimum' },
      formula: 'P_{\\min}=G\\sin\\alpha-T_{\\max}=32{,}7\\ \\text{N}',
    },
    {
      title: 'Górna granica siły P',
      narration:
        'Przy zbyt dużej sile P ciało chciałoby wjechać w górę, więc tarcie odwraca zwrot i działa w dół równi. Granica powstaje, gdy P równoważy zarówno składową ciężaru, jak i pełne tarcie.',
      caption: 'P_max = 50 + 17,3 = 67,3 N; tarcie działa w dół równi.',
      visual: 'diagram',
      focus: { metric: 'maximum' },
      formula: 'P_{\\max}=G\\sin\\alpha+T_{\\max}=67{,}3\\ \\text{N}',
    },
    {
      title: 'Kąt tarcia i zakres równowagi',
      narration:
        'Kąt tarcia wiąże tarcie z naciskiem: tangens tego kąta jest równy μs. Wypadkowa reakcji odchyla się wtedy od normalnej o 11,3°. Oba progi siły P odpowiadają temu samemu pochyleniu reakcji, ale w przeciwnych kierunkach.',
      caption: 'φs = 11,3°, a równowaga trwa dla 32,7 N ≤ P ≤ 67,3 N.',
      visual: 'diagram',
      focus: { metric: 'angle' },
      formula:
        '\\operatorname{tg}\\varphi_s=\\mu_s\\ \\Rightarrow\\ \\varphi_s=11{,}3^\\circ,\\qquad 32{,}7\\le P\\le67{,}3\\ \\text{N}',
    },
  ],
} satisfies SolutionData
