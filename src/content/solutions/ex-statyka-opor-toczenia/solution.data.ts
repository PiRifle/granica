import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-opor-toczenia',
  title: 'Opór toczenia: moment i siła progowa — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'Walec o promieniu r = 0,25 m i ciężarze G = 2 kN',
    'Współczynnik oporu toczenia f = 0,005 m',
    'Współczynnik tarcia statycznego μs = 0,20; siła P pozioma do osi',
  ],
  result:
    'Moment oporu to 10 N·m, a do ruszenia walca potrzeba P = 40 N. Potrzebne tarcie 40 N jest znacznie poniżej granicy 400 N, więc walec toczy się bez poślizgu. Graniczny kąt równi wynosi około 1,15°.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.RollingResistanceAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Walec toczymy po odkształcalnym podłożu. W modelu sztywnym kontakt byłby punktowy, ale rzeczywisty nacisk jest rozłożony i jego wypadkowa przesuwa się do przodu. Tę odległość opisuje współczynnik oporu toczenia f, mający wymiar długości.',
      caption: 'r = 0,25 m, G = 2 kN, f = 0,005 m, μs = 0,20.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'r=0{,}25\\ \\text{m},\\qquad G=2\\ \\text{kN},\\qquad f=0{,}005\\ \\text{m}',
    },
    {
      title: 'Nacisk i przesunięcie wypadkowej',
      narration:
        'Pozioma siła P nie zmienia nacisku pionowego, więc normalna nadal równoważy ciężar. Odkształcenie podłoża przesuwa jednak jej linię działania o f przed punkt styku. To właśnie ramię, na którym normalna tworzy moment oporu.',
      caption: 'N = G = 2000 N; wypadkowa normalna przesunięta o f do przodu.',
      visual: 'diagram',
      focus: { metric: 'normal' },
      formula: 'N=G=2000\\ \\text{N},\\qquad M_t=fN',
    },
    {
      title: 'Moment oporu toczenia',
      narration:
        'Moment oporu to iloczyn nacisku i przesunięcia f. Przy nacisku 2000 N i ramieniu 5 mm otrzymujemy 10 N·m. Ten moment przeciwdziała toczeniu, nawet gdy walec jeszcze stoi.',
      caption: 'M_t = 0,005 · 2000 = 10 N·m.',
      visual: 'diagram',
      focus: { metric: 'moment' },
      formula: 'M_t=0{,}005\\cdot2000=10\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Siła progowa',
      narration:
        'Moment siły P względem punktu styku wynosi P·r. Walec ruszy, gdy zrównoważy moment oporu N·f. Dzieląc moment oporu przez promień, dostajemy najmniejszą siłę poziomą przyłożoną do osi.',
      caption: 'P = Nf/r = 2000 · 0,005 / 0,25 = 40 N.',
      visual: 'diagram',
      focus: { metric: 'threshold' },
      formula: 'P=\\frac{Nf}{r}=\\frac{2000\\cdot0{,}005}{0{,}25}=40\\ \\text{N}',
    },
    {
      title: 'Kontrola poślizgu',
      narration:
        'Toczenie bez poślizgu wymaga tarcia w punkcie styku. Potrzebne tarcie jest równe sile P, czyli 40 N. Granica tarcia statycznego wynosi aż 400 N, więc zapas jest dziesięciokrotny i walec naprawdę się toczy, a nie ślizga.',
      caption: 'T = P = 40 N < μsN = 400 N — brak poślizgu.',
      visual: 'diagram',
      focus: { metric: 'slipcheck' },
      formula: 'T=P=40\\ \\text{N}<\\mu_sN=0{,}20\\cdot2000=400\\ \\text{N}',
    },
    {
      title: 'Graniczny kąt równi',
      narration:
        'Na równi rolę siły napędowej przejmuje składowa ciężaru wzdłuż pochyłości. Równowaga momentów daje tangens kąta granicznego równy f/r. Dla podanych danych wynosi on 0,02, czyli około 1,15°. Większy promień przy tym samym f zmniejsza ten kąt.',
      caption: 'tg α_max = f/r = 0,02, więc α_max ≈ 1,15°; dla r = 0,50 m otrzymamy 0,57°.',
      visual: 'diagram',
      focus: { metric: 'incline' },
      formula:
        '\\operatorname{tg}\\alpha_{\\max}=\\frac fr=\\frac{0{,}005}{0{,}25}=0{,}02\\ \\Rightarrow\\ \\alpha_{\\max}=1{,}15^\\circ',
    },
  ],
} satisfies SolutionData
