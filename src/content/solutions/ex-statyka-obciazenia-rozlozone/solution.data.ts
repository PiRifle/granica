import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-obciazenia-rozlozone',
  title: 'Obciążenie trapezowe i reakcje belki — rozwiązanie krok po kroku',
  duration: 7,
  given: [
    'Rozpiętość belki: L = 6 m, podpory w A (x = 0) i B (x = 6 m)',
    'Obciążenie stałe: q₁ = 2 kN/m na całej długości',
    'Składnik trójkątny: od 0 w A do q₂ = 4 kN/m w B',
  ],
  result: 'Wypadkowa Q = 24 kN działa 3,5 m od A. Reakcje wynoszą R_A = 10 kN i R_B = 14 kN.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.DistributedLoadAnimation }))),
  scenes: [
    {
      title: 'Model obciążenia',
      narration:
        'Obciążenie trapezowe powstaje z nałożenia stałej intensywności 2 kN/m i trójkąta narastającego do 4 kN/m w punkcie B. Na belkę działa nieskończenie wiele równoległych sił elementarnych.',
      caption: 'Trapezowy wykres obciążenia od 2 kN/m w A do 6 kN/m w B.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'q_1=2\\ \\text{kN/m},\\quad q_2=4\\ \\text{kN/m},\\quad L=6\\ \\text{m}',
    },
    {
      title: 'Podział na prostokąt i trójkąt',
      narration:
        'Trapez dzielimy na prostokąt o stałej intensywności 2 kN/m i trójkąt o maksimum 4 kN/m. Prostokąt daje 12 kN w środku, a trójkąt 12 kN w dwóch trzecich długości od końca zerowego.',
      caption: 'Q₁ = 12 kN w x = 3 m, Q₂ = 12 kN w x = 4 m.',
      visual: 'diagram',
      focus: { metric: 'split' },
      formula:
        'Q_1=q_1L=2\\cdot6=12\\ \\text{kN},\\qquad Q_2=\\frac{1}{2}q_2L=\\frac{1}{2}\\cdot4\\cdot6=12\\ \\text{kN}',
    },
    {
      title: 'Wypadkowa i jej środek',
      narration:
        'Całkowita wypadkowa to suma obu składników, czyli 24 kN. Jej położenie liczymy jako średnią ważoną: (12·3 + 12·4)/24 = 3,5 m od A.',
      caption: 'Q = 24 kN działa w x_Q = 3,5 m.',
      visual: 'diagram',
      focus: { metric: 'resultant' },
      formula: 'Q=Q_1+Q_2=24\\ \\text{kN},\\qquad x_Q=\\frac{12\\cdot3+12\\cdot4}{24}=3{,}5\\ \\text{m}',
    },
    {
      title: 'Reakcja w B',
      narration:
        'Momenty względem A dają równanie R_B·6 = Q·3,5 = 84 kN·m. Stąd reakcja w rolce wynosi 14 kN i działa w górę.',
      caption: 'R_B = 14 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'reaction-b' },
      formula: 'R_B\\cdot6=Q\\cdot x_Q=24\\cdot3{,}5=84\\quad\\Rightarrow\\quad R_B=14\\ \\text{kN}',
    },
    {
      title: 'Reakcja w A',
      narration:
        'Z bilansu pionowego reakcja w A wynosi 24 − 14 = 10 kN. Obie reakcje razem równoważą całe obciążenie 24 kN.',
      caption: 'R_A = 10 kN w górę, R_B = 14 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'reaction-a' },
      formula: 'R_A=Q-R_B=24-14=10\\ \\text{kN}',
    },
    {
      title: 'Kontrola względem B',
      narration:
        'Moment reakcji R_A względem B wynosi 10·6 = 60 kN·m. Momenty obciążenia względem B to 12·3 + 12·2 = 36 + 24 = 60 kN·m. Kontrola potwierdza wynik.',
      caption: 'Momenty względem B: 60 kN·m po obu stronach.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'R_A\\cdot6=10\\cdot6=60,\\qquad Q_1\\cdot3+Q_2\\cdot2=36+24=60',
    },
  ],
} satisfies SolutionData
