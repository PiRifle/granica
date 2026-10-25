import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-trzy-sily',
  title: 'Belka na linie i przegubie — równowaga trzech sił',
  duration: 6,
  given: [
    'Belka AB o długości l = 3 m',
    'Lina BD pod kątem α = 60° do poziomu',
    'Siła P = 6 kN w odległości a = 1 m od A',
  ],
  result:
    'Siła w linie wynosi S = 2,31 kN. Reakcja przegubu ma składowe Ax = 1,15 kN w lewo i Ay = 4,00 kN w górę, czyli RA = 4,16 kN pod kątem 73,9° od poziomu.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ThreeForcesAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka jest ciałem trzysiłowym: działa na nią obciążenie P, siła liny S i reakcja przegubu RA. Przegub daje dwie składowe, ale kierunek wypadkowej RA wyznaczy później geometria punktu zbiegu.',
      caption: 'Belka AB, lina BD pod 60° i siła P w odległości 1 m od przegubu.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'l=3\\ \\text{m},\\qquad a=1\\ \\text{m},\\qquad P=6\\ \\text{kN},\\qquad \\alpha=60^\\circ',
    },
    {
      title: 'Momenty względem A',
      narration:
        'Sumujemy momenty względem przegubu A, bo przechodzą przez niego obie niewiadome składowe reakcji. Zostaje moment pionowej składowej S o ramieniu l sin 60° oraz moment siły P o ramieniu a.',
      caption: 'Ramię S względem A wynosi l sin 60° = 2,60 m, ramię P to 1 m.',
      visual: 'diagram',
      focus: { metric: 'moment' },
      formula: '\\sum M_A=S\\sin60^\\circ\\cdot l-P\\cdot a=0',
    },
    {
      title: 'Siła w linie',
      narration:
        'Po podstawieniu danych otrzymujemy S = 6 · 1 / (3 · 0,866) = 2,31 kN. Wynik dodatni oznacza, że lina jest naciągnięta, zgodnie z założonym zwrotem.',
      caption: 'S = 2,31 kN — lina jest rozciągana.',
      visual: 'diagram',
      focus: { metric: 'cable' },
      formula: 'S=\\frac{P\\,a}{l\\sin60^\\circ}=\\frac{6\\cdot1}{3\\cdot0{,}866}=2{,}31\\ \\text{kN}',
    },
    {
      title: 'Składowe reakcji przegubu',
      narration:
        'Równanie rzutów na poziom daje Ax = −S cos 60° = −1,15 kN, więc reakcja pozioma działa w lewo. Równowaga pionowa daje Ay = P − S sin 60° = 4,00 kN w górę.',
      caption: 'Ax = 1,15 kN w lewo, Ay = 4,00 kN w górę.',
      visual: 'diagram',
      focus: { metric: 'components' },
      formula: 'A_x=-S\\cos60^\\circ=-1{,}15\\ \\text{kN},\\qquad A_y=P-S\\sin60^\\circ=4{,}00\\ \\text{kN}',
    },
    {
      title: 'Wypadkowa reakcja',
      narration:
        'Składamy obie składowe w jedną reakcję. Moduł wynosi 4,16 kN, a kąt od poziomu 73,9°. Wektor RA jest skierowany w lewo i w górę.',
      caption: 'RA = 4,16 kN pod kątem 73,9° od poziomu.',
      visual: 'diagram',
      focus: { metric: 'resultant' },
      formula:
        'R_A=\\sqrt{1{,}15^2+4{,}00^2}=4{,}16\\ \\text{kN},\\qquad \\varphi=\\arctan\\frac{4{,}00}{1{,}15}=73{,}9^\\circ',
    },
    {
      title: 'Kontrola punktem zbiegu',
      narration:
        'Prosta siły P jest pionowa przez x = 1 m, a prosta liny przechodzi przez B pod 60°. Przecinają się w E = (1; −3,46) m. Nachylenie prostej AE wynosi −3,46, dokładnie tyle, ile Ay/Ax — wszystkie trzy siły są zbieżne.',
      caption: 'Punkt E potwierdza poprawność kierunku reakcji RA.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'E=(1;\\,-3{,}46)\\ \\text{m},\\qquad \\frac{A_y}{A_x}=\\frac{4{,}00}{-1{,}15}=-3{,}46',
    },
  ],
} satisfies SolutionData
