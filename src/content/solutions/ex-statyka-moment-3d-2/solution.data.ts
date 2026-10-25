import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-moment-3d-2',
  title: 'Moment względem osi y — rzut momentu i kontrola geometryczna',
  duration: 6,
  given: [
    'Dźwignia OP = 0,4 m, odchylona o 30° od osi x w płaszczyźnie poziomej',
    'F = 200 N w dół, przyłożona w punkcie P',
    'Osie x i y są poziome, oś z jest pionowa',
    'Szukamy momentu siły względem osi y',
  ],
  result:
    'P = (0,346; 0,2; 0) m. M_O = r × F = (−40, 69,3, 0) N·m, więc M_y = 69,3 N·m. Kontrola z rzutu: odległość P od osi y wynosi x = 0,346 m, a 200·0,346 = 69,3 N·m. Znak dodatni oznacza obrót zgodny z dodatnim zwrotem osi y.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.MomentAboutAxisAnimation }))),
  scenes: [
    {
      title: 'Model dźwigni',
      narration:
        'Dźwignia leży w płaszczyźnie poziomej xy. Siła jest pionowa, więc jest prostopadła do tej płaszczyzny. Moment względem osi y policzymy najpierw przez wektor momentu względem O, a potem niezależnie z ramienia w rzucie.',
      caption: 'Dźwignia OP = 0,4 m pod kątem 30° do osi x; siła F = 200 N w dół.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'OP=0{,}4\\ \\text{m},\\qquad \\alpha=30^\\circ,\\qquad F=200\\ \\text{N}\\ \\text{w dół}',
    },
    {
      title: 'Współrzędne punktu P',
      narration:
        'Rzutujemy koniec dźwigni na osie poziome. Współrzędna x to 0,4 cos30° ≈ 0,346 m, a współrzędna y to 0,4 sin30° = 0,2 m. Punkt leży w płaszczyźnie poziomej, więc z = 0.',
      caption: 'P = (0,346; 0,2; 0) m.',
      visual: 'diagram',
      focus: { metric: 'point' },
      formula:
        'x_P=0{,}4\\cos30^\\circ=0{,}346\\ \\text{m},\\qquad y_P=0{,}4\\sin30^\\circ=0{,}2\\ \\text{m},\\qquad z_P=0',
    },
    {
      title: 'Moment względem punktu O',
      narration:
        'Zapisujemy siłę jako (0, 0, −200) N i liczymy iloczyn wektorowy r × F. Składowa Mz znika, bo wektor ramienia i siła leżą w jednej płaszczyźnie pionowej przechodzącej przez O i P. Otrzymujemy M_O = (−40, 69,3, 0) N·m.',
      caption: 'M_O = (−40, 69,3, 0) N·m.',
      visual: 'diagram',
      focus: { metric: 'cross' },
      formula:
        '\\mathbf M_O=\\mathbf r\\times\\mathbf F=(0{,}346;0{,}2;0)\\times(0;0;-200)=(-40;\\,69{,}3;\\,0)\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Odczyt momentu względem osi y',
      narration:
        'Moment względem osi y jest rzutem wektora momentu na wersor tej osi. Wersor osi y to (0, 1, 0), więc zostaje druga składowa. M_y = 69,3 N·m — dodatnia, czyli zgodna z dodatnim zwrotem osi y.',
      caption: 'M_y = 69,3 N·m.',
      visual: 'diagram',
      focus: { metric: 'projection' },
      formula: 'M_y=\\mathbf M_O\\cdot\\mathbf e_y=(-40;\\,69{,}3;\\,0)\\cdot(0;1;0)=69{,}3\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Kontrola z rzutu siły',
      narration:
        'Rzutujemy siłę na płaszczyznę prostopadłą do osi y, czyli na płaszczyznę xz. Siła pozostaje pionowa, a jej odległość od osi y to współrzędna x punktu P. Moment wynosi więc 200·0,346 = 69,3 N·m — dokładnie tyle samo.',
      caption: 'd = x = 0,346 m, M_y = 200·0,346 = 69,3 N·m.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'M_y=F\\cdot x_P=200\\cdot0{,}346=69{,}3\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Znak i interpretacja',
      narration:
        'Dodatni moment oznacza obrót zgodny z dodatnim zwrotem osi y. Siła działa w dół na końcu dźwigni wychylonej w stronę dodatniego x, więc rzeczywiście „opuszcza” ten koniec. Znak jest informacją o zwrocie obrotu, a nie o wartości siły.',
      caption: 'M_y > 0 — obrót zgodny z osią +y.',
      visual: 'diagram',
      focus: { metric: 'sign' },
      formula: 'M_y=+69{,}3\\ \\text{N}\\cdot\\text{m}\\quad\\Rightarrow\\quad \\text{obrót zgodny z }+y',
    },
  ],
} satisfies SolutionData
