import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-sily-rownolegle',
  title: 'Wypadkowa dwóch sił równoległych — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'P₁ = 400 N w dół w punkcie A (x = 0)',
    'P₂ = 600 N w dół w punkcie B (x = 3 m)',
    'Szukane: wartość, zwrot i położenie wypadkowej',
  ],
  result:
    'W = 1000 N skierowana w dół, przyłożona 1,8 m od punktu A, czyli między siłami i bliżej silniejszej siły P₂.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ParallelResultantAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Obie siły są pionowe i skierowane w dół, więc tworzą układ równoległy. Przyjmujemy dodatni zwrot w dół i mierzymy położenie od punktu A wzdłuż belki.',
      caption: 'Dwie siły równoległe o zgodnych zwrotach działają w punktach A i B.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        'P_1=400\\ \\text{N},\\quad P_2=600\\ \\text{N},\\quad AB=3\\ \\text{m},\\quad x_1=0,\\ x_2=3\\ \\text{m}',
    },
    {
      title: 'Wartość wypadkowej',
      narration:
        'Przy zgodnych zwrotach wartość wypadkowej jest sumą algebraiczną sił. W = 400 + 600 = 1000 N, a zwrot pozostaje w dół.',
      caption: 'Wypadkowa ma wartość 1000 N i jest skierowana w dół.',
      visual: 'diagram',
      focus: { metric: 'sum' },
      formula: 'W=P_1+P_2=400+600=1000\\ \\text{N}',
    },
    {
      title: 'Równanie momentów względem A',
      narration:
        'Biegun wybieramy w punkcie A, przez który przechodzi prosta działania P₁. Moment P₁ jest więc zerowy, a moment P₂ wynosi 600·3 = 1800 N·m. Ten sam moment musi dawać wypadkowa W·x_W.',
      caption: 'Moment P₁ względem A znika, więc równanie zawiera tylko P₂ i wypadkową.',
      visual: 'diagram',
      focus: { metric: 'moment' },
      formula:
        '1000\\cdot x_W=600\\cdot3=1800\\ \\text{N}\\cdot\\text{m}\\quad\\Rightarrow\\quad x_W=1{,}8\\ \\text{m}',
    },
    {
      title: 'Położenie wypadkowej',
      narration:
        'Wypadkowa leży 1,8 m od A, czyli 1,2 m od B. Jest bliżej silniejszej siły P₂, bo to ona wnosi większy moment względem A.',
      caption: 'x_W = 1,8 m od A; odległość od B wynosi 1,2 m.',
      visual: 'diagram',
      focus: { metric: 'position' },
      formula: 'x_W=\\frac{P_2}{P_1+P_2}\\,AB=\\frac{600}{1000}\\cdot3=1{,}8\\ \\text{m}',
    },
    {
      title: 'Kontrola drugim biegunem',
      narration:
        'Liczymy momenty względem B. Siła P₁ daje 400·3 = 1200 N·m, a wypadkowa W działa w odległości 1,2 m od B, więc również daje 1000·1,2 = 1200 N·m. Momenty się zgadzają.',
      caption: 'Momenty względem B po obu stronach wynoszą 1200 N·m.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'M_B(P_1)=400\\cdot3=1200\\ \\text{N}\\cdot\\text{m}=1000\\cdot(3-1{,}8)',
    },
    {
      title: 'Reguła odwrotnych proporcji',
      narration:
        'Punkt działania wypadkowej dzieli odcinek AB w stosunku odwrotnie proporcjonalnym do wartości sił. Dla 400 N i 600 N stosunek odcinków wynosi 3:2, co potwierdza wynik 1,8 m i 1,2 m.',
      caption: 'AD : DB = P₂ : P₁ = 600 : 400 = 3 : 2.',
      visual: 'diagram',
      focus: { metric: 'proportion' },
      formula: 'AD:DB=P_2:P_1=600:400=3:2',
    },
  ],
} satisfies SolutionData
