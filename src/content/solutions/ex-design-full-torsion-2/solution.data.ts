import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-design-full-torsion-2',
  title: 'Pełne zadanie: wał pełny i drążony — przykład 2',
  duration: 7,
  given: ['d=55 mm', 'D=70 mm', 'T=1200 N·m'],
  result:
    'Przy tej samej masie rura ma większy J_o, a w naszym przykładzie także większy W_o niż wał pełny o średnicy 55 mm, ponieważ jej średnica zewnętrzna jest większa. Wskaźnik rury wynosi około 57 500 mm^3, a wału pełnego 32 668 mm^3. To pokazuje, że porównanie „na masę” jest zupełnie inne niż porównanie „na średnicę”.',
  figure: {
    kind: 'section',
    width: 70,
    height: 70,
    parts: [
      {
        x: 0,
        y: 0,
        width: 70,
        height: 70,
        label: 'rura ∅70',
        tone: 'light',
      },
    ],
    holes: [
      {
        cx: 35,
        cy: 35,
        r: 21.65,
        label: '∅43,3',
      },
    ],
    centroid: {
      x: 35,
      y: 35,
    },
    values: [
      {
        label: 'd wału pełnego',
        value: '55 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'D rury',
        value: '70 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'T',
        value: '1200 N·m',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'J_o wału pełnego',
        value: '898 360 mm⁴',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'd rury',
        value: '43,3 mm',
        focus: 'design',
        reveal: 1,
      },
      {
        label: 'J_o rury',
        value: '2 010 000 mm⁴',
        focus: 'design',
      },
      {
        label: 'J_o rury / J_o wału',
        value: '2,24',
        focus: 'design',
        reveal: 1,
      },
      {
        label: 'τ rury',
        value: '20,9 MPa',
        focus: 'stress',
        reveal: 2,
      },
      {
        label: 'τ wału pełnego',
        value: '36,7 MPa',
        focus: 'stress',
        reveal: 2,
      },
      {
        label: 'φ rury',
        value: '0,512°',
        focus: 'design',
        reveal: 2,
      },
      {
        label: 'φ wału pełnego',
        value: '1,15°',
        focus: 'design',
        reveal: 2,
      },
      {
        label: 'W_o rury',
        value: '57 500 mm³',
        focus: 'design',
        reveal: 4,
      },
      {
        label: 'W_o wału pełnego',
        value: '32 668 mm³',
        focus: 'design',
        reveal: 1,
      },
    ],
    note: 'Przy równej masie rura ∅70/∅43,3 ma ponad dwukrotnie większy J_o od wału pełnego ∅55.',
    shape: 'circle',
  },
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FullTorsion2Animation }))),
  scenes: [
    {
      title: 'Ta sama masa, ten sam moment',
      narration:
        'Porównajmy wał pełny i rurę przy tej samej masie, a nie przy tej samej średnicy zewnętrznej. Wał pełny ma d = 55 mm i pole około 2376 mm². Dobierzmy rurę o tej samej długości i masie, ale o większej średnicy zewnętrznej D = 70 mm.',
      caption: 'Równa masa oznacza równe pole przekroju — średnica wewnętrzna rury jest jeszcze niewiadoma.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula: 'd=55\\ \\text{mm},\\qquad D=70\\ \\text{mm},\\qquad A=2376\\ \\text{mm}^2',
    },
    {
      title: 'Geometria rury',
      narration:
        'Z równości pól: π(70² − d²)/4 = 2376, czyli d² = 70² − 4·2376/π ≈ 1875. Stąd d ≈ 43,3 mm. Otwór zabiera tyle materiału, ile wynosi cały przekrój wału pełnego.',
      caption: 'Średnica wewnętrzna rury wynika wyłącznie z warunku równej masy.',
      visual: 'section',
      focus: {
        metric: 'geometry',
      },
      formula: '\\pi(70^2-d^2)/4=2376\\quad\\Rightarrow\\quad d\\approx43{,}3\\ \\text{mm}',
    },
    {
      title: 'Moment bezwładności',
      narration:
        'Moment bezwładności rury wynosi J_o = π(70⁴ − 43,3⁴)/32 ≈ 2,01·10⁶ mm⁴, czyli około 2,24 razy więcej niż wału pełnego. Materiał jest dalej od osi, więc ten sam moment skręcający wywołuje mniejszy kąt.',
      caption: 'Przy równej masie rura ma wyraźnie większy J_o — jest sztywniejsza na skręcanie.',
      visual: 'section',
      focus: {
        metric: 'inertia',
      },
      formula: 'J_o=\\frac{\\pi(70^4-43{,}3^4)}{32}\\approx2{,}01\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Naprężenie i kąt',
      narration:
        'Przy tym samym momencie T = 1200 N·m naprężenie w rurze wynosi około 20,9 MPa zamiast 36,7 MPa, a kąt skręcenia około 0,512° zamiast 1,15°. Rura jest więc lżejsza w przeliczeniu na jednostkę długości, sztywniejsza i mniej wytężona.',
      caption: 'Mniejszy kąt i mniejsze naprężenie wynikają z większego J_o oraz większej średnicy zewnętrznej.',
      visual: 'section',
      focus: {
        metric: 'check',
      },
      formula: '\\tau_{\\text{rura}}\\approx20{,}9\\ \\text{MPa},\\qquad\\varphi_{\\text{rura}}\\approx0{,}512^\\circ',
    },
    {
      title: 'Cena większej średnicy',
      narration:
        'Wskaźnik rury wynosi około 57 500 mm³, a wału pełnego 32 668 mm³. Przewaga wynika jednak z większej średnicy zewnętrznej, która zajmuje więcej miejsca i zwiększa podatność cienkiej ścianki na uszkodzenia. Porównanie „na masę” jest więc inne niż porównanie „na średnicę”.',
      caption:
        'Większe D daje większy W_o i mniejszy kąt, ale wymaga więcej przestrzeni oraz staranniejszego mocowania.',
      visual: 'section',
      focus: {
        metric: 'tradeoff',
      },
      formula: 'W_o=\\frac{2J_o}{D}\\quad\\Rightarrow\\quad W_{o,\\text{rura}}\\approx57\\,500\\ \\text{mm}^3',
    },
  ],
} satisfies SolutionData
