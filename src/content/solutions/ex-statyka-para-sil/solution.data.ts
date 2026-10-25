import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-para-sil',
  title: 'Równoważenie tarczy parą sił — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'Para 1: P₁ = 40 N, ramię 0,4 m, przeciwnie do wskazówek zegara',
    'Para 2: P₂ = 60 N, ramię 0,6 m, zgodnie z ruchem wskazówek zegara',
    'Para 3: P₃ = 25 N, ramię 0,8 m, zgodnie z ruchem wskazówek zegara',
    'Promień zaczepienia pary równoważącej: r = 0,25 m',
  ],
  result:
    'Para R = R′ = 80 N przyłożona stycznie na obwodzie r = 0,25 m równoważy moment 40 N·m zgodny z ruchem wskazówek zegara.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ForceCoupleAnimation }))),
  scenes: [
    {
      title: 'Trzy pary na tarczy',
      narration:
        'Każda para to dwie równe, przeciwne i równoległe siły. Dla tarczy liczy się tylko moment pary, bo suma sił każdej pary jest zerowa. Ramiona par wynoszą odpowiednio 0,4 m, 0,6 m i 0,8 m.',
      caption: 'Trzy pary sił obracają tarczę w różnych kierunkach.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        'P_1=40\\ \\text{N},\\ 2r_1=0{,}4\\ \\text{m},\\quad P_2=60\\ \\text{N},\\ 2r_2=0{,}6\\ \\text{m},\\quad P_3=25\\ \\text{N},\\ 2r_3=0{,}8\\ \\text{m}',
    },
    {
      title: 'Momenty poszczególnych par',
      narration:
        'Moment pary obliczamy jako iloczyn jednej siły i ramienia pary. Para pierwsza obraca przeciwnie do wskazówek, więc jej moment jest dodatni. Dwie pozostałe obracają zgodnie, więc ich momenty są ujemne.',
      caption: 'M₁ = +16 N·m, M₂ = −36 N·m, M₃ = −20 N·m.',
      visual: 'diagram',
      focus: { metric: 'moments' },
      formula:
        'M_1=40\\cdot0{,}4=16\\ \\text{N}\\cdot\\text{m},\\quad M_2=-60\\cdot0{,}6=-36\\ \\text{N}\\cdot\\text{m},\\quad M_3=-25\\cdot0{,}8=-20\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Moment wypadkowy par',
      narration:
        'Momenty par sumujemy algebraicznie. 16 − 36 − 20 = −40 N·m, więc wypadkowy moment ma wartość 40 N·m i obraca tarczę zgodnie z ruchem wskazówek zegara.',
      caption: 'Wypadkowy moment trzech par wynosi 40 N·m zgodnie z ruchem wskazówek zegara.',
      visual: 'diagram',
      focus: { metric: 'sum' },
      formula: '\\sum M=16-36-20=-40\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Moment równoważący',
      narration:
        'Aby tarcza była w równowadze, para równoważąca musi dać moment przeciwny: +40 N·m. Jej ramię to średnica obwodu zaczepienia, czyli 2r = 0,5 m.',
      caption: 'Para równoważąca musi działać przeciwnie do wskazówek zegara.',
      visual: 'diagram',
      focus: { metric: 'balance' },
      formula: 'M_R=+40\\ \\text{N}\\cdot\\text{m}=R\\cdot2r',
    },
    {
      title: 'Wartość siły równoważącej',
      narration:
        'Podstawiamy ramię 0,5 m i dzielimy moment przez ramię. R = 40/0,5 = 80 N. Obie siły pary mają tę samą wartość 80 N i przeciwne zwroty.',
      caption: 'R = R′ = 80 N, przyłożone stycznie na promieniu 0,25 m.',
      visual: 'diagram',
      focus: { metric: 'couple' },
      formula: 'R=\\frac{40}{2\\cdot0{,}25}=\\frac{40}{0{,}5}=80\\ \\text{N}',
    },
    {
      title: 'Kontrola równowagi',
      narration:
        'Po dodaniu pary równoważącej suma momentów wynosi 16 − 36 − 20 + 80·0,5 = 0. Suma sił także jest zerowa, bo każda para sama znosi swoje siły. Tarcza nie przesuwa się i nie obraca.',
      caption: 'ΣM = 0 i ΣF = 0 — tarcza jest w równowadze.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '16-36-20+80\\cdot0{,}5=0\\quad\\text{oraz}\\quad\\sum F=0',
    },
  ],
} satisfies SolutionData
