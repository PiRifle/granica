import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-rownowaga-zbiezna',
  title: 'Równowaga kuli między równią i ścianą — rozwiązanie krok po kroku',
  duration: 6,
  given: ['Ciężar kuli G = 100 N', 'Kąt równi α = 30°', 'Równia i pionowa ściana są gładkie'],
  result:
    'Reakcja równi wynosi N₁ = 115,5 N i jest prostopadła do równi. Reakcja ściany wynosi N₂ = 57,7 N i działa poziomo od ściany.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.InclineEquilibriumAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Kulę zastępujemy punktem materialnym w jej środku. Dwa gładkie więzy — równia i pionowa ściana — zastąpimy reakcjami o znanych kierunkach. Ciężar działa pionowo w dół.',
      caption: 'Kula o ciężarze 100 N między równią pod 30° i pionową ścianą.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'G=100\\ \\text{N},\\qquad \\alpha=30^\\circ',
    },
    {
      title: 'Kierunki reakcji',
      narration:
        'Gładka równia reaguje prostopadle do swojej powierzchni, czyli pod kątem 30° od pionu. Gładka ściana reaguje prostopadle do siebie, więc poziomo. Na schemacie mamy trzy siły zbieżne w środku kuli.',
      caption: 'N₁ prostopadle do równi, N₂ poziomo od ściany, G pionowo w dół.',
      visual: 'diagram',
      focus: { metric: 'directions' },
      formula: 'N_1\\perp\\text{równia},\\qquad N_2\\perp\\text{ściana},\\qquad G\\ \\text{w dół}',
    },
    {
      title: 'Równowaga pionowa',
      narration:
        'Rzutujemy siły na oś pionową. Reakcja ściany nie ma składowej pionowej, a od równi zostaje N₁ cos 30°. Z zerowej sumy otrzymujemy N₁ = 100 / cos 30° = 115,5 N.',
      caption: 'N₁ cos 30° = G, stąd N₁ = 115,5 N.',
      visual: 'diagram',
      focus: { metric: 'vertical' },
      formula: 'N_1\\cos30^\\circ-G=0\\ \\Rightarrow\\ N_1=\\frac{100}{0{,}866}=115{,}5\\ \\text{N}',
    },
    {
      title: 'Równowaga pozioma',
      narration:
        'Pozioma składowa reakcji równi wynosi N₁ sin 30° i jest skierowana w lewo. Równoważy ją reakcja ściany N₂ skierowana w prawo. Stąd N₂ = 115,5 · 0,5 = 57,7 N.',
      caption: 'N₂ = N₁ sin 30° = 57,7 N, poziomo od ściany.',
      visual: 'diagram',
      focus: { metric: 'horizontal' },
      formula: 'N_2-N_1\\sin30^\\circ=0\\ \\Rightarrow\\ N_2=115{,}5\\cdot0{,}5=57{,}7\\ \\text{N}',
    },
    {
      title: 'Sprawdzenie rzutów',
      narration:
        'Suma sił poziomych to 57,7 N w prawo minus 57,7 N w lewo, czyli zero. Pionowo 100 N od składowej N₁ równoważy ciężar 100 N. Wypadkowa reakcji N₁ i N₂ jest równa co do wartości ciężarowi i przeciwnie skierowana.',
      caption: 'ΣFx = 0 i ΣFy = 0; N₁ + N₂ = −G.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '-57{,}7+57{,}7=0,\\qquad 115{,}5\\cos30^\\circ-100=0',
    },
    {
      title: 'Zamknięty trójkąt sił',
      narration:
        'Trzy siły w równowadze tworzą zamknięty trójkąt. Odkładamy G w dół, od jego końca N₁ pod kątem 30° od pionu, a odcinek N₂ zamyka trójkąt poziomo. To geometryczny obraz obu równań rzutów.',
      caption: 'G + N₁ + N₂ = 0 — trójkąt sił jest zamknięty.',
      visual: 'diagram',
      focus: { metric: 'triangle' },
      formula: '\\vec G+\\vec N_1+\\vec N_2=0',
    },
  ],
} satisfies SolutionData
