import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-wypadkowa-zbiezna',
  title: 'Wypadkowa trzech sił zbieżnych — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'F₁ = 8 kN, kąt 60° nad poziomem',
    'F₂ = 6 kN, poziomo w prawo',
    'F₃ = 5 kN, kąt 30° poniżej poziomu, zwrot w prawo',
  ],
  result:
    'Wypadkowa ma składowe Wx = 14,33 kN i Wy = 4,43 kN, moduł W = 15,0 kN oraz kąt 17,2° nad poziomem. Działa w punkcie zbiegu O.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ResultantAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wszystkie trzy siły zaczepiamy w punkcie O. Kąty mierzymy od dodatniego kierunku osi x: F₁ w pierwszej ćwiartce, F₂ na osi, a F₃ w czwartej, więc jej rzut pionowy będzie ujemny.',
      caption: 'Trzy siły o wspólnym punkcie zaczepienia O.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        'F_1=8\\ \\text{kN},\\ 60^\\circ,\\qquad F_2=6\\ \\text{kN},\\ 0^\\circ,\\qquad F_3=5\\ \\text{kN},\\ -30^\\circ',
    },
    {
      title: 'Składowe siły F₁',
      narration:
        'Rzutujemy F₁ na osie. Składowa pozioma to 8 cos 60°, a pionowa 8 sin 60°. Obie są dodatnie, bo siła leży w pierwszej ćwiartce.',
      caption: 'F₁x = 4,00 kN, F₁y = 6,93 kN.',
      visual: 'diagram',
      focus: { metric: 'components1' },
      formula: 'F_{1x}=8\\cos60^\\circ=4{,}00\\ \\text{kN},\\qquad F_{1y}=8\\sin60^\\circ=6{,}93\\ \\text{kN}',
    },
    {
      title: 'Składowe F₂ i F₃',
      narration:
        'F₂ leży na osi x, więc ma tylko składową poziomą. Dla F₃ sinus kąta −30° jest ujemny: składowa pozioma pozostaje dodatnia, a pionowa działa w dół.',
      caption: 'F₂x = 6,00 kN, F₂y = 0; F₃x = 4,33 kN, F₃y = −2,50 kN.',
      visual: 'diagram',
      focus: { metric: 'components2' },
      formula:
        'F_{2x}=6{,}00\\ \\text{kN},\\ F_{2y}=0,\\qquad F_{3x}=5\\cos30^\\circ=4{,}33\\ \\text{kN},\\ F_{3y}=-5\\sin30^\\circ=-2{,}50\\ \\text{kN}',
    },
    {
      title: 'Suma rzutów',
      narration:
        'Dodajemy składowe tego samego kierunku. Poziomo: 4,00 + 6,00 + 4,33 = 14,33 kN. Pionowo: 6,93 + 0 − 2,50 = 4,43 kN. To współrzędne wypadkowej.',
      caption: 'Wx = 14,33 kN, Wy = 4,43 kN.',
      visual: 'diagram',
      focus: { metric: 'sum' },
      formula: 'W_x=4{,}00+6{,}00+4{,}33=14{,}33\\ \\text{kN},\\qquad W_y=6{,}93-2{,}50=4{,}43\\ \\text{kN}',
    },
    {
      title: 'Moduł i kierunek',
      narration:
        'Moduł liczymy z twierdzenia Pitagorasa, a kierunek z arcus tangens. Obie składowe są dodatnie, więc wypadkowa leży w pierwszej ćwiartce i kąt 17,2° mierzymy bezpośrednio od osi x.',
      caption: 'W = 15,0 kN, θ = 17,2° nad poziomem.',
      visual: 'diagram',
      focus: { metric: 'resultant' },
      formula:
        'W=\\sqrt{14{,}33^2+4{,}43^2}=15{,}0\\ \\text{kN},\\qquad \\theta=\\arctan\\frac{4{,}43}{14{,}33}=17{,}2^\\circ',
    },
    {
      title: 'Kontrola wielobokiem sił',
      narration:
        'Układamy wektory końcówka do początku: F₁, potem F₂, na końcu F₃. Koniec ostatniego wektora wypada dokładnie w punkcie o współrzędnych (14,33; 4,43), więc odcinek od O do tego punktu jest wypadkową.',
      caption: 'Wielobok sił zamyka się odcinkiem wypadkowej.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '\\vec W=\\vec F_1+\\vec F_2+\\vec F_3',
    },
  ],
} satisfies SolutionData
