import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-tarcie-suche',
  title: 'Tarcie suche: próg ruchu i tarcie kinetyczne — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'Ciężar skrzyni G = 100 N, podłoże poziome',
    'Współczynniki tarcia: μs = 0,30, μk = 0,25',
    'Pozioma siła napędowa P; rozpatrujemy P = 20 N i progi ruchu',
  ],
  result:
    'Dla P = 20 N tarcie wynosi T = 20 N, więc skrzynia stoi. Próg ruchu to T_max = 30 N. Po rozpoczęciu poślizgu tarcie spada do T_k = 25 N, więc ruch jednostajny utrzymuje P = 25 N.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DryFrictionAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Na skrzynię działają ciężar G, reakcja normalna N, pozioma siła P i tarcie T. Podłoże jest poziome, więc normalna równoważy ciężar, a tarcie będzie się dopasowywać do siły napędowej aż do swojej granicy.',
      caption: 'Ciężar 100 N, współczynniki 0,30 i 0,25 — trzeba rozstrzygnąć, czy skrzynia stoi.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'G=100\\ \\text{N},\\qquad \\mu_s=0{,}30,\\qquad \\mu_k=0{,}25',
    },
    {
      title: 'Spoczynek przy P = 20 N',
      narration:
        'Skrzynia nie rusza się, więc tarcie nie jest równe μN — wynika z równowagi poziomej. Siła tarcia dokładnie równoważy P. Dopiero porównanie z granicą pokaże, że ten spoczynek jest możliwy.',
      caption: 'T = P = 20 N, czyli mniej niż T_max = 30 N.',
      visual: 'diagram',
      focus: { metric: 'static' },
      formula: 'N=G=100\\ \\text{N},\\qquad T=P=20\\ \\text{N}',
    },
    {
      title: 'Granica poślizgu',
      narration:
        'Największe tarcie statyczne to iloczyn współczynnika μs i nacisku normalnego. Przy tej sile skrzynia jest jeszcze w równowadze, ale każdy dodatkowy niuton siły P rozpocznie ruch.',
      caption: 'T_max = 0,30 · 100 = 30 N — to najmniejsza siła ruszająca skrzynię.',
      visual: 'diagram',
      focus: { metric: 'limit' },
      formula: 'T_{\\max}=\\mu_s N=0{,}30\\cdot100=30\\ \\text{N}',
    },
    {
      title: 'Poślizg i spadek tarcia',
      narration:
        'Gdy skrzynia ruszy, działa już tarcie kinetyczne. Współczynnik μk jest mniejszy od μs, więc siła tarcia spada. Widać to jako krótszy wektor tarcia mimo tego samego nacisku.',
      caption: 'Po rozpoczęciu ruchu T_k = 25 N, o 5 N mniej niż próg statyczny.',
      visual: 'diagram',
      focus: { metric: 'kinetic' },
      formula: 'T_k=\\mu_k N=0{,}25\\cdot100=25\\ \\text{N}',
    },
    {
      title: 'Ruch jednostajny',
      narration:
        'Do podtrzymania jednostajnego poślizgu wystarcza siła równa tarciu kinetycznemu. Ruch jest łatwiejszy do utrzymania niż do rozpoczęcia, bo tarcie kinetyczne jest mniejsze od granicy statycznej.',
      caption: 'P = T_k = 25 N utrzymuje ruch jednostajny.',
      visual: 'diagram',
      focus: { metric: 'uniform' },
      formula: 'P=T_k=25\\ \\text{N}\\quad\\Rightarrow\\quad T=25\\ \\text{N}',
    },
    {
      title: 'Kontrola trzech stanów',
      narration:
        'Porównanie pokazuje całą logikę zadania: 20 N to spoczynek z zapasem, 30 N to granica ruchu, a 25 N wystarcza już tylko wtedy, gdy skrzynia naprawdę się ślizga. Nierówność T ≤ μsN pozostaje warunkiem spoczynku.',
      caption: '20 N < 30 N — spoczynek; 25 N = T_k — poślizg jednostajny.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '20<30\\ \\Rightarrow\\ \\text{spoczynek},\\qquad 25=\\mu_k N<T_{\\max}',
    },
  ],
} satisfies SolutionData
