import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-wezly-zlozone',
  title: 'Węzeł złożony — obciążenie „ożywia” pionowy pręt',
  duration: 6,
  given: [
    'Węzły A = (0, 0), B = (4, 0), C = (8, 0), D = (4, 3) m',
    'Pręty AB, BC, AD, CD i pionowy BD',
    'Podpora przegubowa w A, podpora przesuwna w C',
    'Obciążenie P = 6 kN w węźle B, pionowo w dół',
  ],
  result:
    'NAB = NBC = +4,00 kN (rozciąganie), NAD = NCD = −5,00 kN (ściskanie) oraz NBD = +6,00 kN (rozciąganie). Bez obciążenia w B pionowy pręt byłby zerowy; obciążenie węzłowe sprawiło, że przejął całą siłę pionową.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ComplexNodesAnimation }))),
  scenes: [
    {
      title: 'Model i para współliniowa',
      narration:
        'W węźle B spotykają się dwa współliniowe pasy AB i BC, pionowy pręt BD oraz obciążenie 6 kN. To typowy węzeł złożony: geometria jest prosta, ale o roli pręta BD decyduje obciążenie zewnętrzne, a nie sama liczba prętów.',
      caption: 'Kratownica królewska z obciążeniem w węźle z parą współliniową.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'A=(0,0),\\quad B=(4,0),\\quad C=(8,0),\\quad D=(4,3)\\ \\text{m},\\qquad P=6\\ \\text{kN}',
    },
    {
      title: 'Reakcje podpór',
      narration:
        'Geometria i obciążenie są symetryczne względem pionowej osi przez D i B. Z symetrii Ay = Cy = 3 kN, a suma sił poziomych daje Ax = 0.',
      caption: 'Ay = Cy = 3 kN, Ax = 0.',
      visual: 'diagram',
      focus: { metric: 'reactions' },
      formula: 'A_x=0,\\qquad A_y=C_y=\\frac{6}{2}=3\\ \\text{kN}',
    },
    {
      title: 'Węzły A i C',
      narration:
        'Pręt AD ma kierunek (4, 3), więc jego długość wynosi 5 m, a składowe jednostkowe to (0,8; 0,6). W węźle A pionowo 3 + 0,6NAD = 0, stąd NAD = −5 kN. Poziomo NAB + 0,8NAD = 0, czyli NAB = +4 kN. Symetria daje NCD = −5 kN i NBC = +4 kN.',
      caption: 'NAD = NCD = −5,00 kN, NAB = NBC = +4,00 kN.',
      visual: 'diagram',
      focus: { metric: 'nodesAC' },
      formula: '3+0{,}6N_{AD}=0\\Rightarrow N_{AD}=-5\\ \\text{kN},\\qquad N_{AB}=+4\\ \\text{kN}',
    },
    {
      title: 'Węzeł B — rola obciążenia',
      narration:
        'Pasy AB i BC są poziome, więc nie mają składowej pionowej. Pionową równowagę węzła B tworzą tylko pręt BD i obciążenie 6 kN: NBD − 6 = 0. Stąd NBD = +6 kN, czyli rozciąganie. Ten sam pręt bez obciążenia w B byłby zerowy.',
      caption: 'NBD = +6,00 kN — obciążenie węzłowe zmienia rolę pręta.',
      visual: 'diagram',
      focus: { metric: 'nodeB' },
      formula: 'N_{BD}-6=0\\quad\\Rightarrow\\quad N_{BD}=+6{,}00\\ \\text{kN}',
    },
    {
      title: 'Kontrola węzła D',
      narration:
        'Na węzeł D pręt AD działa siłą (−5)(−0,8; −0,6) = (4; 3), pręt CD siłą (−5)(0,8; −0,6) = (−4; 3), a pręt BD siłą 6(0; −1) = (0; −6). Suma składowych jest zerem, więc znaki i wartości są spójne.',
      caption: 'Składowe w D sumują się do zera — kontrola domyka rachunek.',
      visual: 'diagram',
      focus: { metric: 'checkD' },
      formula: '(4;3)+(-4;3)+(0;-6)=(0;0)',
    },
    {
      title: 'Pełny obraz sił',
      narration:
        'Zielone pręty są rozciągane, czerwone ściskane. Para współliniowa przenosi równą siłę 4 kN przez węzeł B, ale nie jest zerowa. To najważniejsza lekcja: obciążenie w węźle potrafi „ożywić” pręt, który w schemacie nieobciążonym byłby zerowy.',
      caption: 'Rozciąganie: AB, BC, BD. Ściskanie: AD, CD.',
      visual: 'diagram',
      focus: { metric: 'summary' },
      formula:
        'N_{AB}=N_{BC}=+4{,}00\\ \\text{kN},\\quad N_{AD}=N_{CD}=-5{,}00\\ \\text{kN},\\quad N_{BD}=+6{,}00\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
