import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-centroidy-zadania-2',
  title: 'Koło ze szczeliną — centroid i kontrola wariantów',
  duration: 6,
  given: [
    'Koło R = 25 mm, środek O = (0, 0)',
    'Szczelina: prostokąt 10 × 20 mm od osi y w prawo',
    'Półkole r = 10 mm po lewej stronie, środek w O',
    'Szczelina jest symetryczna względem osi x',
  ],
  result:
    'A_w = 357,08 mm², x_w = 0,933 mm. Pole netto A = 1606,42 mm², Q_y = −333,33 mm³, więc x_C = −0,208 mm. Z symetrii Q_x = 0 i y_C = 0. Dla a = 12 mm: x_C = −0,494 mm; dla a = 15 mm: x_C = −1,051 mm.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SlotCentroidAnimation }))),
  scenes: [
    {
      title: 'Odczyt geometrii',
      narration:
        'Materiał to pełne koło o promieniu 25 mm. Szczelinę tworzą prostokąt od osi y w prawo oraz półkole po lewej stronie osi y. Wysokość szczeliny jest równa średnicy półkola, czyli 20 mm. Cała szczelina jest symetryczna względem osi x.',
      caption: 'Koło R = 25 mm ze szczeliną: prostokąt 10 × 20 mm i półkole r = 10 mm.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'R=25\\ \\text{mm},\\qquad a=10\\ \\text{mm},\\qquad r=10\\ \\text{mm},\\qquad h=2r=20\\ \\text{mm}',
    },
    {
      title: 'Pola części',
      narration:
        'Pole prostokątnej części szczeliny wynosi 10·20 = 200 mm². Półkole ma pole πr²/2 = 50π ≈ 157,08 mm². Razem wycięcie usuwa 357,08 mm². Pole netto to pole koła minus pole wycięcia: 1963,50 − 357,08 = 1606,42 mm².',
      caption: 'A_w = 357,08 mm², A = 1606,42 mm².',
      visual: 'diagram',
      focus: { metric: 'areas' },
      formula: 'A_w=200+50\\pi=357{,}08\\ \\text{mm}^2,\\qquad A=\\pi\\cdot25^2-357{,}08=1606{,}42\\ \\text{mm}^2',
    },
    {
      title: 'Centroid wycięcia',
      narration:
        'Prostokąt ma środek w (5; 0), a półkole w odległości 4r/(3π) ≈ 4,244 mm na lewo od O. Moment wycięcia względem osi y wynosi 200·5 − 157,08·4,244 = 333,33 mm³. Dzieląc przez pole wycięcia, otrzymujemy x_w ≈ 0,933 mm.',
      caption: 'x_w = 0,933 mm; y_w = 0 z symetrii.',
      visual: 'diagram',
      focus: { metric: 'cut-centroid' },
      formula:
        'Q_{y,w}=200\\cdot5+157{,}08\\cdot(-4{,}244)=333{,}33\\ \\text{mm}^3,\\qquad x_w=\\frac{333{,}33}{357{,}08}=0{,}933\\ \\text{mm}',
    },
    {
      title: 'Moment i współrzędna x_C',
      narration:
        'Koło ma centroid w O, więc jego moment względem osi y jest zerowy. Moment całej figury to minus moment wycięcia: Q_y = −333,33 mm³. Po podzieleniu przez pole netto dostajemy x_C ≈ −0,208 mm. Centroid przesuwa się w lewo, przeciwnie do wycięcia.',
      caption: 'Q_y = −333,33 mm³, x_C = −0,208 mm.',
      visual: 'diagram',
      focus: { metric: 'x-centroid' },
      formula: 'Q_y=0-333{,}33=-333{,}33\\ \\text{mm}^3,\\qquad x_C=\\frac{-333{,}33}{1606{,}42}=-0{,}208\\ \\text{mm}',
    },
    {
      title: 'Symetria względem osi x',
      narration:
        'Szczelina jest symetryczna względem osi x, więc usuwa materiał po równo nad i pod tą osią. Moment względem osi x znika, a współrzędna y_C pozostaje zerowa. To widać bez rachunku — wystarczy zauważyć oś symetrii figury.',
      caption: 'Q_x = 0 ⇒ y_C = 0.',
      visual: 'diagram',
      focus: { metric: 'y-centroid' },
      formula: 'Q_x=0\\quad\\Rightarrow\\quad y_C=\\frac{0}{1606{,}42}=0\\ \\text{mm}',
    },
    {
      title: 'Kontrola wariantów',
      narration:
        'Zwiększamy długość prostokątnej części szczeliny, nie zmieniając półkola. Dla a = 12 mm otrzymujemy x_C = −0,494 mm, a dla a = 15 mm x_C = −1,051 mm. Im więcej materiału usuwamy po prawej stronie, tym bardziej centroid przesuwa się w lewo. Współrzędna y_C pozostaje zerowa.',
      caption: 'a = 10, 12, 15 mm ⇒ x_C = −0,208; −0,494; −1,051 mm.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'a=12\\ \\text{mm}:\\ x_C=-0{,}494\\ \\text{mm};\\qquad a=15\\ \\text{mm}:\\ x_C=-1{,}051\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
