import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-rownowaga-plaska',
  title: 'Równowaga płaska belki z siłą ukośną — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'Belka AB: L = 4 m, przegub w A, rolka w B',
    'P = 10 kN w x = 2 m, odchylona o 30° od belki w dół i w prawo',
    'M = 6 kN·m w x = 3 m, zgodnie z ruchem wskazówek zegara',
  ],
  result: 'A_x = 8,66 kN w lewo, A_y = 1,0 kN w górę, B_y = 4,0 kN w górę; reakcja w A ma moduł 8,72 kN.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PlanarEquilibriumAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Przegub w A daje dwie składowe reakcji, a rolka w B jedną pionową. Siła P jest ukośna, więc najpierw rozłożymy ją na składowe. Moment skupiony wchodzi do równania momentów bez zmiany wartości.',
      caption: 'Belka z przegubem, rolką, siłą ukośną i momentem skupionym.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        'L=4\\ \\text{m},\\quad P=10\\ \\text{kN},\\quad \\alpha=30^\\circ,\\quad M=6\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Składowe siły P',
      narration:
        'Rzut poziomy wynosi 10·cos30° = 8,66 kN w prawo, a pionowy 10·sin30° = 5 kN w dół. Składowa pionowa będzie miała moment ujemny względem A.',
      caption: 'P_x = 8,66 kN w prawo, P_y = 5 kN w dół.',
      visual: 'diagram',
      focus: { metric: 'components' },
      formula: 'P_x=10\\cos30^\\circ=8{,}66\\ \\text{kN},\\qquad P_y=10\\sin30^\\circ=5\\ \\text{kN}',
    },
    {
      title: 'Moment względem A',
      narration:
        'Biegun w A eliminuje A_x i A_y. W równaniu zostaje B_y·4, moment od P_y równy −5·2 oraz moment skupiony −6. Stąd 4B_y = 16 i B_y = 4 kN.',
      caption: 'R_B = 4 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'moment' },
      formula: '4B_y-5\\cdot2-6=0\\quad\\Rightarrow\\quad B_y=4\\ \\text{kN}',
    },
    {
      title: 'Rzut poziomy',
      narration:
        'Jedynymi siłami poziomymi są A_x i składowa P_x. Z sumy rzutów A_x + 8,66 = 0, więc A_x = −8,66 kN. Minus oznacza zwrot w lewo.',
      caption: 'A_x = 8,66 kN w lewo.',
      visual: 'diagram',
      focus: { metric: 'horizontal' },
      formula: 'A_x+P_x=0\\quad\\Rightarrow\\quad A_x=-8{,}66\\ \\text{kN}',
    },
    {
      title: 'Rzut pionowy',
      narration:
        'W pionie działają A_y, B_y = 4 kN w górę oraz P_y = 5 kN w dół. Z bilansu A_y + 4 − 5 = 0 otrzymujemy A_y = 1 kN w górę.',
      caption: 'A_y = 1,0 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'vertical' },
      formula: 'A_y+B_y-5=0\\quad\\Rightarrow\\quad A_y=1\\ \\text{kN}',
    },
    {
      title: 'Kontrola i reakcja wypadkowa',
      narration:
        'Momenty względem B sumują się do −1·4 + 5·2 − 6 = 0. Reakcja w przegubie ma składowe 8,66 kN w lewo i 1 kN w górę, więc jej moduł wynosi 8,72 kN.',
      caption: 'Kontrola momentem względem B oraz moduł reakcji w A.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '-1\\cdot4+5\\cdot2-6=0,\\qquad R_A=\\sqrt{8{,}66^2+1^2}=8{,}72\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
