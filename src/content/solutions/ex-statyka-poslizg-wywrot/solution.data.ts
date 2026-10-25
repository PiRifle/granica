import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-poslizg-wywrot',
  title: 'Poślizg czy wywrot: dwa progi — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'Szafa o ciężarze W = 400 N, podstawa d = 0,60 m',
    'Siła P pozioma na wysokości h = 1,20 m',
    'Współczynnik tarcia statycznego μs = 0,40',
  ],
  result:
    'Próg poślizgu wynosi 160 N, a próg wywrotu 100 N. Szafa wywróci się przy P ≈ 100 N, zanim zacznie się ślizgać. Przy μs = 0,20 poślizg nastąpiłby już przy 80 N.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SlipTippingAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Szafę traktujemy jako bryłę sztywną. Ciężar działa w połowie szerokości podstawy, a siła P na wysokości h. Reakcja normalna N może przesuwać się wzdłuż podstawy, a tarcie T działa przeciwnie do zamierzonego ruchu.',
      caption: 'W = 400 N, d = 0,60 m, h = 1,20 m, μs = 0,40.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'W=400\\ \\text{N},\\quad d=0{,}60\\ \\text{m},\\quad h=1{,}20\\ \\text{m},\\quad \\mu_s=0{,}40',
    },
    {
      title: 'Próg poślizgu',
      narration:
        'Poślizg zaczyna się, gdy tarcie osiągnie granicę μsN. W kierunku pionowym normalna równoważy ciężar, a w poziomym tarcie równoważy P. Dlatego próg poślizgu obliczamy wprost z μsW.',
      caption: 'N = 400 N, więc P_poś = 160 N.',
      visual: 'diagram',
      focus: { metric: 'slip' },
      formula: 'N=W=400\\ \\text{N},\\qquad P_{\\text{poś}}=\\mu_sN=160\\ \\text{N}',
    },
    {
      title: 'Wędrówka wypadkowej normalnej',
      narration:
        'Para sił P i T daje moment, który przesuwa wypadkową nacisku w stronę przedniej krawędzi. Przy P = 100 N przesunięcie wynosi już 0,30 m, czyli dokładnie pół szerokości podstawy. To jest granica stateczności.',
      caption: 'x = Ph/W; przy P = 100 N otrzymujemy x = 0,30 m = d/2.',
      visual: 'diagram',
      focus: { metric: 'shift' },
      formula: 'x=\\frac{Ph}{W}\\quad\\Rightarrow\\quad x(100\\ \\text{N})=0{,}30\\ \\text{m}=\\frac d2',
    },
    {
      title: 'Próg wywrotu',
      narration:
        'W stanie granicznym wywrotu normalna działa w przedniej krawędzi. Sumujemy momenty względem tej krawędzi: moment siły P napędza obrót, a moment ciężaru go powstrzymuje. Tarcie i normalna przechodzą przez krawędź, więc ich momenty znikają.',
      caption: 'P_wyw = (400 · 0,30) / 1,20 = 100 N.',
      visual: 'diagram',
      focus: { metric: 'tip' },
      formula: 'P_{\\text{wyw}}=\\frac{W\\,d/2}{h}=\\frac{400\\cdot0{,}30}{1{,}20}=100\\ \\text{N}',
    },
    {
      title: 'Który próg jest mniejszy?',
      narration:
        'Decyduje mniejszy z dwóch progów. Wywrot przy 100 N następuje wcześniej niż poślizg przy 160 N. W chwili wywrotu potrzebne tarcie wynosi tylko 100 N, więc jest jeszcze daleko od granicy 160 N — założenie jest spójne.',
      caption: 'P_gr = min(160, 100) = 100 N, czyli wywrot; T = 100 N < 160 N.',
      visual: 'diagram',
      focus: { metric: 'compare' },
      formula:
        'P_{\\text{gr}}=\\min(160{,}100)=100\\ \\text{N}\\ \\Rightarrow\\ \\text{wywrot},\\qquad T=100<160\\ \\text{N}',
    },
    {
      title: 'Kontrola na śliskiej podłodze',
      narration:
        'Zmiana współczynnika tarcia nie zmienia progu wywrotu, ale obniża próg poślizgu. Przy μs = 0,20 poślizg następuje już przy 80 N, więc wygrywa go wcześniej niż wywrot przy 100 N. To pokazuje, że o trybie decyduje para geometria–tarcie.',
      caption: 'μs = 0,20 daje P_poś = 80 N < 100 N, więc teraz decyduje poślizg.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula:
        '\\mu_s=0{,}20\\Rightarrow P_{\\text{poś}}=80\\ \\text{N}<100\\ \\text{N}\\ \\Rightarrow\\ \\text{poślizg}',
    },
  ],
} satisfies SolutionData
