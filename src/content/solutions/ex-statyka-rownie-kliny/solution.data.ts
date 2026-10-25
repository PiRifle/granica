import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-rownie-kliny',
  title: 'Drabina oparta o ścianę — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'Drabina jednorodna: L = 4 m, W = 300 N, kąt α = 60°',
    'Gładka ściana, chropowata podłoga μs = 0,30',
    'Ciężar działa w połowie długości drabiny',
  ],
  result:
    'Reakcja ściany i potrzebne tarcie wynoszą 86,6 N, a dostępne tarcie 90 N — drabina stoi z zapasem 3,4 N. Minimalny współczynnik tarcia to 0,289; przy μs = 0,25 stopa się ślizga.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.LadderFrictionAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Drabinę modelujemy jako pręt jednorodny. Ściana jest gładka, więc daje tylko poziomą reakcję N_B. Podłoga daje normalną N_A i tarcie T_A skierowane do ściany, bo stopa chce od niej odjechać.',
      caption: 'L = 4 m, W = 300 N, α = 60°, μs = 0,30 — trzy kontakty i trzy równania równowagi.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'L=4\\ \\text{m},\\qquad W=300\\ \\text{N},\\qquad \\alpha=60^\\circ,\\qquad \\mu_s=0{,}30',
    },
    {
      title: 'Równowaga pionowa',
      narration:
        'W kierunku pionowym działają tylko ciężar i normalna podłogi. Tarcie jest poziome, a reakcja ściany również, więc normalna musi dokładnie równoważyć ciężar drabiny.',
      caption: 'N_A = W = 300 N.',
      visual: 'diagram',
      focus: { metric: 'normal' },
      formula: 'N_A=W=300\\ \\text{N}',
    },
    {
      title: 'Moment względem stopy',
      narration:
        'Momenty sumujemy względem stopy, bo przechodzą przez nią N_A i T_A. Zostaje moment ciężaru na ramieniu (L/2)cosα oraz moment reakcji ściany na ramieniu L sinα. Z tego równania wyznaczamy N_B.',
      caption: 'N_B · 4 sin60° = 300 · 2 cos60°, stąd N_B = 86,6 N.',
      visual: 'diagram',
      focus: { metric: 'moment' },
      formula: 'N_B\\cdot L\\sin\\alpha=W\\cdot\\frac L2\\cos\\alpha\\ \\Rightarrow\\ N_B=86{,}6\\ \\text{N}',
    },
    {
      title: 'Tarcie potrzebne do równowagi',
      narration:
        'W kierunku poziomym reakcja ściany musi być zrównoważona tarciem w podłodze. To tarcie nie jest jeszcze graniczne — wynika z równania równowagi. Dopiero porównanie z μsN_A pokaże, czy jest dostępne.',
      caption: 'T_A = N_B = 86,6 N, skierowane od stopy do ściany.',
      visual: 'diagram',
      focus: { metric: 'friction' },
      formula: 'T_A=N_B=86{,}6\\ \\text{N}',
    },
    {
      title: 'Zapas tarcia i współczynnik minimalny',
      narration:
        'Dostępne tarcie to μs razy normalna, czyli 90 N. Potrzebne 86,6 N mieści się w tej granicy, więc drabina stoi. Dzieląc potrzebne tarcie przez normalną, otrzymujemy minimalny współczynnik 0,289.',
      caption: 'T_max = 90 N > 86,6 N; zapas 3,4 N, μ_min = 0,289.',
      visual: 'diagram',
      focus: { metric: 'margin' },
      formula: 'T_{\\max}=\\mu_sN_A=90\\ \\text{N}>86{,}6\\ \\text{N},\\qquad \\mu_{\\min}=0{,}289',
    },
    {
      title: 'Kontrola przy mniejszym tarciu',
      narration:
        'Gdyby podłoga miała μs = 0,25, dostępne tarcie spadłoby do 75 N. To mniej niż wymagane 86,6 N, więc stopa zaczyna się ślizgać, a drabina opada. Kontrola potwierdza, że o równowadze decyduje relacja tarcia do normalnej.',
      caption: 'μs = 0,25 daje T_max = 75 N < 86,6 N — drabina się ślizga.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '\\mu_s=0{,}25\\Rightarrow T_{\\max}=75\\ \\text{N}<86{,}6\\ \\text{N}\\ \\Rightarrow\\ \\text{poślizg}',
    },
  ],
} satisfies SolutionData
