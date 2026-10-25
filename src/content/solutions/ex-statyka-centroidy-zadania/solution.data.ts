import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-centroidy-zadania',
  title: 'Koło z prostokątnym i półkolistym wycięciem — pełne rozwiązanie',
  duration: 7,
  given: [
    'Koło o promieniu R = 25 mm i środku O = (0, 0)',
    'Wycięcie prostokątne 15 × 10 mm, lewy dolny narożnik w O, środek (7,5; 5)',
    'Wycięcie półkoliste o promieniu r = 10 mm, średnica na osi y, brzeg w lewo, centroid (−4,24; 0)',
  ],
  result:
    'A = 1656,42 mm², Q_y = −458,98 mm³, Q_x = −750 mm³. Centroid leży w punkcie C = (−0,277; −0,453) mm. Pappus dla półkola r = 10 mm daje objętość kuli 4 188,8 mm³.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.CircleCutoutsAnimation }))),
  scenes: [
    {
      title: 'Model i odczyt geometrii',
      narration:
        'Koło ma promień 25 mm, a wycięcie składa się z prostokąta i półkola. Prostokąt leży po prawej stronie osi y i nad osią x, natomiast półkole wystaje w lewo od osi y. Oba wycięcia traktujemy jako pola ujemne.',
      caption: 'Materiał: koło R = 25 mm. Wycięcia: prostokąt 15 × 10 mm i półkole r = 10 mm.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'R=25\\ \\text{mm},\\qquad 15\\times10\\ \\text{mm},\\qquad r=10\\ \\text{mm}',
    },
    {
      title: 'Pola części i pole netto',
      narration:
        'Pole koła wynosi 1963,50 mm². Prostokąt odejmuje 150 mm², a półkole 157,08 mm². Po odjęciu obu wycięć zostaje 1656,42 mm² materiału. To pole netto jest mianownikiem obu współrzędnych centroidu.',
      caption: 'A = 1963,50 − 150 − 157,08 = 1656,42 mm².',
      visual: 'diagram',
      focus: { metric: 'areas' },
      formula: 'A_1=1963{,}50,\\quad A_2=-150,\\quad A_3=-157{,}08\\quad\\Rightarrow\\quad A=1656{,}42\\ \\text{mm}^2',
    },
    {
      title: 'Moment względem osi y',
      narration:
        'Prostokątne wycięcie leży po prawej stronie osi y, więc jego moment jest ujemny. Półkole leży po lewej, a jego pole też jest ujemne, więc iloczyn dwóch minusów daje wkład dodatni. Suma momentów wynosi −458,98 mm³, a x_C jest ujemne.',
      caption: 'Q_y = −458,98 mm³, x_C = −0,277 mm.',
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      formula:
        'Q_y=(-150)\\cdot7{,}5+(-157{,}08)\\cdot(-4{,}24)=-458{,}98\\ \\text{mm}^3,\\qquad x_C=-0{,}277\\ \\text{mm}',
    },
    {
      title: 'Moment względem osi x',
      narration:
        'Półkole jest symetryczne względem osi x, więc jego moment względem tej osi jest zerowy. Tylko prostokąt, leżący powyżej osi, wnosi moment ujemny po odjęciu materiału. Współrzędna y_C wynosi −0,453 mm.',
      caption: 'Q_x = −750 mm³, y_C = −0,453 mm.',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      formula: 'Q_x=(-150)\\cdot5=-750\\ \\text{mm}^3,\\qquad y_C=\\frac{-750}{1656{,}42}=-0{,}453\\ \\text{mm}',
    },
    {
      title: 'Znaki i położenie centroidu',
      narration:
        'Obie współrzędne są ujemne, bo materiał usunięto po prawej stronie osi y i powyżej osi x. Centroid przesuwa się więc w lewo i w dół, czyli w stronę przeciwną do wycięć. Punkt leży bardzo blisko środka O, dlatego jego położenie pokazujemy w powiększeniu.',
      caption: 'C = (−0,277; −0,453) mm — na lewo i poniżej O.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      formula: 'x_C=-0{,}277\\ \\text{mm}<0,\\qquad y_C=-0{,}453\\ \\text{mm}<0',
    },
    {
      title: 'Kontrola Pappusa dla półkola',
      narration:
        'Obrót półkola o promieniu 10 mm wokół jego średnicy daje kulę. Twierdzenie Pappusa z centroidem 4r/(3π) i polem πr²/2 daje dokładnie 4πr³/3, czyli 4 188,8 mm³. To potwierdza, że w tabeli użyto właściwego centroidu półkola, a nie centroidu łuku.',
      caption: 'V = 4πr³/3 = 4 188,8 mm³ — zgodność z twierdzeniem.',
      visual: 'diagram',
      focus: { metric: 'pappus-check' },
      formula:
        'V=2\\pi\\cdot\\frac{4r}{3\\pi}\\cdot\\frac{\\pi r^2}{2}=\\frac{4\\pi r^3}{3}=4\\,188{,}8\\ \\text{mm}^3',
    },
  ],
} satisfies SolutionData
