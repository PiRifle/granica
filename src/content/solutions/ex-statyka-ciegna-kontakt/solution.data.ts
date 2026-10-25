import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-ciegna-kontakt',
  title: 'Walec na równi z poziomą linką — kierunki reakcji',
  duration: 6,
  given: ['Ciężar walca G = 200 N', 'Kąt równi α = 30°', 'Linka pozioma, równia gładka'],
  result:
    'Reakcja równi wynosi N = 230,9 N prostopadle do powierzchni, a napięcie linki T = 115,5 N. Reakcja jest większa od ciężaru, bo linka dociska walec do równi.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RopeContactAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Walec zastępujemy punktem w jego środku. Równia jest gładka, więc daje tylko reakcję normalną. Linka jest pozioma i działa wzdłuż swojej osi. Ciężar pozostaje pionowy.',
      caption: 'Walec 200 N na równi 30°, utrzymywany poziomą linką.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'G=200\\ \\text{N},\\qquad \\alpha=30^\\circ',
    },
    {
      title: 'Kierunki reakcji więzów',
      narration:
        'Normalna do równi odchyla się o 30° od pionu i jest skierowana w lewo-górę. Napięcie linki działa poziomo w prawo. Te dwa kierunki wynikają z rodzaju więzu, a nie z rachunku.',
      caption: 'N prostopadle do równi, T poziomo w prawo, G pionowo w dół.',
      visual: 'diagram',
      focus: { metric: 'directions' },
      formula: 'N\\perp\\text{równia},\\qquad T\\parallel\\text{linka},\\qquad G\\ \\text{w dół}',
    },
    {
      title: 'Równowaga pionowa',
      narration:
        'Rzutujemy na oś pionową. Linka nie ma składowej pionowej, więc ciężar równoważy tylko składowa N cos 30°. Stąd N = 200 / 0,866 = 230,9 N.',
      caption: 'N cos 30° = G, więc N = 230,9 N.',
      visual: 'diagram',
      focus: { metric: 'vertical' },
      formula: 'N\\cos30^\\circ-G=0\\ \\Rightarrow\\ N=\\frac{200}{0{,}866}=230{,}9\\ \\text{N}',
    },
    {
      title: 'Równowaga pozioma',
      narration:
        'Pozioma składowa reakcji równi N sin 30° działa w lewo. Równoważy ją napięcie linki T skierowane w prawo. Otrzymujemy T = 230,9 · 0,5 = 115,5 N.',
      caption: 'T = N sin 30° = 115,5 N.',
      visual: 'diagram',
      focus: { metric: 'horizontal' },
      formula: 'T-N\\sin30^\\circ=0\\ \\Rightarrow\\ T=230{,}9\\cdot0{,}5=115{,}5\\ \\text{N}',
    },
    {
      title: 'Wynik i interpretacja',
      narration:
        'Napięcie można też policzyć ze skróconego wzoru T = G tan 30° = 115,5 N. Reakcja równi 230,9 N jest o 15,5% większa od ciężaru — to efekt poziomego docisku linki.',
      caption: 'T = 115,5 N, N = 230,9 N > G; linka dociska walec do równi.',
      visual: 'diagram',
      focus: { metric: 'result' },
      formula: 'T=G\\tan30^\\circ=115{,}5\\ \\text{N},\\qquad N=\\frac{G}{\\cos30^\\circ}=230{,}9\\ \\text{N}',
    },
    {
      title: 'Kontrola trójkątem sił',
      narration:
        'Odkładamy T poziomo, G pionowo w dół, a N zamyka trójkąt pod kątem 30° od pionu. Trójkąt jest zamknięty, więc suma wektorów jest zerowa. To geometryczny odpowiednik obu równań rzutów.',
      caption: 'T + G + N = 0 — zamknięty trójkąt sił.',
      visual: 'diagram',
      focus: { metric: 'triangle' },
      formula: '\\vec T+\\vec G+\\vec N=0',
    },
  ],
} satisfies SolutionData
