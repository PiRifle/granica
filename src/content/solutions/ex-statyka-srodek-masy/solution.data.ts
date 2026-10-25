import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-srodek-masy',
  title: 'Środek ciężkości trzech mas punktowych — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'm₁ = 2 kg w punkcie (0, 0)',
    'm₂ = 4 kg w punkcie (3, 0)',
    'm₃ = 6 kg w punkcie (3, 4)',
    'Odległości w metrach, g = 9,81 m/s²',
  ],
  result:
    'G = 117,72 N, Q_y = 294,30 N·m, Q_x = 235,44 N·m. Środek ciężkości leży w punkcie C = (2,50; 2,00) m, bliżej najcięższej masy m₃.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PointMassCentroidAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Trzy masy punktowe tworzą układ, którego ciężar jest wypadkową trzech równoległych sił ciężkości. Początek układu leży w masie m₁, oś x biegnie w prawo, a oś y w górę. Szukamy punktu C, w którym można zaczepić wypadkową bez zmiany momentów.',
      caption: 'Masy m₁ = 2 kg, m₂ = 4 kg i m₃ = 6 kg w znanych punktach płaszczyzny.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'm_1=2\\ \\text{kg},\\qquad m_2=4\\ \\text{kg},\\qquad m_3=6\\ \\text{kg}',
    },
    {
      title: 'Ciężary części i ciężar całkowity',
      narration:
        'Każdą masę zamieniamy na ciężar, mnożąc ją przez przyspieszenie ziemskie. Ciężary są równoległe i skierowane w dół. Ich suma jest ciężarem całkowitym, który będzie mianownikiem w obu współrzędnych środka ciężkości.',
      caption: 'G₁ = 19,62 N, G₂ = 39,24 N, G₃ = 58,86 N, G = 117,72 N.',
      visual: 'diagram',
      focus: { metric: 'weights' },
      formula:
        'G_1=2\\cdot9{,}81=19{,}62\\ \\text{N},\\quad G_2=4\\cdot9{,}81=39{,}24\\ \\text{N},\\quad G_3=6\\cdot9{,}81=58{,}86\\ \\text{N}',
    },
    {
      title: 'Momenty względem osi y',
      narration:
        'Współrzędna x_C powstaje z momentów ciężarów względem osi y. Ramieniem jest odległość pozioma od tej osi. Masa m₁ leży na osi, więc jej moment jest zerowy, a m₂ i m₃ mają to samo ramię 3 m.',
      caption: 'Q_y = 39,24·3 + 58,86·3 = 294,30 N·m.',
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      formula: 'Q_y=\\sum G_k x_k=19{,}62\\cdot0+39{,}24\\cdot3+58{,}86\\cdot3=294{,}30\\ \\text{N·m}',
    },
    {
      title: 'Momenty względem osi x',
      narration:
        'Analogicznie liczymy momenty względem osi x. Tym razem ramieniem jest wysokość punktu. Masy m₁ i m₂ leżą na osi x, więc tylko m₃ wnosi moment, ponieważ znajduje się 4 m nad osią.',
      caption: 'Q_x = 58,86·4 = 235,44 N·m.',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      formula: 'Q_x=\\sum G_k y_k=19{,}62\\cdot0+39{,}24\\cdot0+58{,}86\\cdot4=235{,}44\\ \\text{N·m}',
    },
    {
      title: 'Współrzędne środka ciężkości',
      narration:
        'Dzielimy każdy moment przez ciężar całkowity. Otrzymujemy średnią ważoną położeń: x_C = 2,50 m, y_C = 2,00 m. Punkt leży wewnątrz trójkąta utworzonego przez masy i jest przesunięty w stronę najcięższej z nich.',
      caption: 'C = (2,50; 2,00) m.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      formula:
        'x_C=\\frac{294{,}30}{117{,}72}=2{,}50\\ \\text{m},\\qquad y_C=\\frac{235{,}44}{117{,}72}=2{,}00\\ \\text{m}',
    },
    {
      title: 'Kontrola na masach',
      narration:
        'W jednorodnym polu grawitacyjnym g skraca się, więc ten sam wynik dostajemy z masami jako wagami. Widać też, że środek ważony leży bliżej m₃ niż zwykła średnia arytmetyczna położeń, która wypada w (2,00; 1,33) m.',
      caption: 'Kontrola masami daje x_C = 30/12 = 2,50 m oraz y_C = 24/12 = 2,00 m.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula:
        'x_C=\\frac{2\\cdot0+4\\cdot3+6\\cdot3}{12}=2{,}50\\ \\text{m},\\qquad y_C=\\frac{2\\cdot0+4\\cdot0+6\\cdot4}{12}=2{,}00\\ \\text{m}',
    },
  ],
} satisfies SolutionData
