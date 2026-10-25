import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-hamulce-tarcie',
  title: 'Hamulec klockowy: równowaga bębna i dźwigni — rozwiązanie krok po kroku',
  duration: 7,
  given: [
    'Bęben R = 0,25 m, tarcza Rb = 0,50 m, Q = 12 kN',
    'Dźwignia a = 0,25 m, b = 0,75 m, mimośród e = 0,04 m',
    'Współczynnik tarcia μs = 0,25',
  ],
  result:
    'Moment hamujący wynosi 3 kN·m, siła tarcia T = 6 kN, a nacisk klocka N = 24 kN. Gdy tarcie pomaga dźwigni, potrzeba P = 5,76 kN; przy przeciwnym obrocie P = 6,24 kN.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.BlockBrakeAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Układ składa się z bębna linowego, tarczy hamulcowej, klocka i dźwigni. Obciążenie Q działa na ramieniu R, a tarcie klocka na większym promieniu Rb. Dźwignia dociska klocek siłą N i jest podparta w przegubie A.',
      caption: 'R = 0,25 m, Rb = 0,50 m, Q = 12 kN, a = 0,25 m, b = 0,75 m, e = 0,04 m.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'R=0{,}25\\ \\text{m},\\quad R_b=0{,}50\\ \\text{m},\\quad Q=12\\ \\text{kN},\\quad \\mu_s=0{,}25',
    },
    {
      title: 'Moment od obciążenia',
      narration:
        'Siła Q w linie działa na ramieniu R względem osi bębna. Moment ten chce obrócić bęben i musi być zrównoważony przez tarcie klocka. Na razie liczymy tylko stronę obciążenia.',
      caption: 'M_Q = Q · R = 12 · 0,25 = 3 kN·m.',
      visual: 'diagram',
      focus: { metric: 'loadmoment' },
      formula: 'M_Q=QR=12\\cdot0{,}25=3\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Siła tarcia na tarczy',
      narration:
        'Tarcie działa na większym promieniu niż lina, więc jego siła jest mniejsza od Q. Moment tarcia T·Rb musi równoważyć moment obciążenia Q·R. Dzieląc moment przez promień tarczy, otrzymujemy T = 6 kN.',
      caption: 'T = QR/Rb = 3 / 0,50 = 6 kN.',
      visual: 'diagram',
      focus: { metric: 'friction' },
      formula: 'T=\\frac{QR}{R_b}=\\frac{3}{0{,}50}=6\\ \\text{kN}',
    },
    {
      title: 'Nacisk klocka',
      narration:
        'W stanie granicznym tarcie osiąga μsN. Znając wymaganą siłę tarcia, wyznaczamy nacisk klocka. Wynosi on 24 kN, czyli czterokrotnie więcej niż siła tarcia, bo współczynnik μs jest równy 0,25.',
      caption: 'N = T/μs = 6 / 0,25 = 24 kN.',
      visual: 'diagram',
      focus: { metric: 'normal' },
      formula: 'N=\\frac{T}{\\mu_s}=\\frac{6}{0{,}25}=24\\ \\text{kN}',
    },
    {
      title: 'Równowaga dźwigni — tarcie pomaga',
      narration:
        'Dźwignia jest w równowadze pod działaniem nacisku N, siły P i momentu tarcia T·e. Gdy tarcie pomaga dociskać klocek, jego moment działa w tę samą stronę co P, więc potrzebna siła jest mniejsza. Po podstawieniu danych otrzymujemy 5,76 kN.',
      caption: 'P = (Na − Te)/(a + b) = (6 − 0,24)/1,00 = 5,76 kN.',
      visual: 'diagram',
      focus: { metric: 'lever' },
      formula: 'P=\\frac{Na-Te}{a+b}=\\frac{24\\cdot0{,}25-6\\cdot0{,}04}{1{,}00}=5{,}76\\ \\text{kN}',
    },
    {
      title: 'Przeciwny obrót i kontrola',
      narration:
        'Po zmianie kierunku obrotu tarcie działa przeciwnie i przeszkadza dźwigni. Znak momentu T·e zmienia się, więc siła P rośnie do 6,24 kN. Różnica 0,48 kN to cały wpływ mimośrodu e; reakcje wynoszą O_x = 6 kN, O_y = 36 kN, A_x = 6 kN i A_y = 18,24 kN.',
      caption: 'P = (Na + Te)/(a + b) = (6 + 0,24)/1,00 = 6,24 kN.',
      visual: 'diagram',
      focus: { metric: 'reverse' },
      formula: 'P=\\frac{Na+Te}{a+b}=\\frac{6+0{,}24}{1{,}00}=6{,}24\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
