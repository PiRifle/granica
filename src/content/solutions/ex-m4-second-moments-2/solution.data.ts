import type { SolutionData } from '../../model'
import { TriangleSecondMomentAnimation } from './animation'

export default {
  id: 'ex-m4-second-moments-2',
  title: 'Momenty bezwładności przekroju — przykład 2',
  duration: 7,
  given: ['b = 120 mm', 'h = 90 mm'],
  result:
    'Zwróć uwagę na kierunek. Jeżeli trójkąt zostanie obrócony tak, że podstawa będzie pionowa, to moment względem poziomej osi zmieni się na hb^3/36, czyli w tym przypadku 90· 120^3/36=4 320 000 mm^4. Ten sam kształt, inne ustawienie, inna sztywność.',
  figure: {
    kind: 'section',
    width: 120,
    height: 90,
    parts: [
      { x: 5, y: 0, width: 110, height: 15, tone: 'solid' },
      { x: 15, y: 15, width: 90, height: 15, tone: 'solid' },
      { x: 25, y: 30, width: 70, height: 15, tone: 'solid' },
      { x: 35, y: 45, width: 50, height: 15, tone: 'solid' },
      { x: 45, y: 60, width: 30, height: 15, tone: 'solid' },
      { x: 55, y: 75, width: 10, height: 15, tone: 'solid' },
    ],
    centroid: { x: 60, y: 30 },
    values: [
      { label: 'b', value: '120 mm', focus: 'section', reveal: 0 },
      { label: 'h', value: '90 mm', focus: 'section', reveal: 0 },
      { label: 'A', value: '5400 mm²', focus: 'section' },
      { label: 'I podstawy', value: '7 290 000 mm⁴', focus: 'Ix' },
      { label: 'I_c', value: '2 430 000 mm⁴', focus: 'Ix' },
      { label: 'A(h/3)²', value: '4 860 000 mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '3 240 000 mm⁴', focus: 'Iy' },
      { label: 'I po obrocie', value: '4 320 000 mm⁴', focus: 'Ix' },
    ],
    note: 'Schemat: trójkąt równoramienny o podstawie 120 mm i wysokości 90 mm przybliżono pasami; wymiary są rzeczywiste.',
  },
  animation: TriangleSecondMomentAnimation,
  scenes: [
    {
      title: 'Model: trójkąt i osie',
      narration:
        'Trójkąt ma podstawę b=120 mm i wysokość h=90 mm. Podstawa leży na osi x, a oś centralna jest od niej oddalona o h/3=30 mm. Oś y jest osią symetrii.',
      caption: 'Trójkąt równoramienny z podstawą na osi x i osią centralną w odległości h/3.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'b=120\\ \\text{mm},\\quad h=90\\ \\text{mm},\\quad \\bar{y}=\\frac{h}{3}=30\\ \\text{mm}',
    },
    {
      title: 'Pasy poziome względem podstawy',
      narration:
        'Dzielimy trójkąt na poziome pasy. Szerokość pasa maleje liniowo, b(y)=b(1-y/h), a jego wkład zawiera kwadrat odległości y od podstawy.',
      caption: 'Pasy poziome budują moment względem osi przechodzącej przez podstawę.',
      visual: 'section',
      focus: { metric: 'Ix', segment: 'base' },
      formula: 'I_{\\text{podstawa}}=\\int_0^h y^2\\,b\\left(1-\\frac{y}{h}\\right)dy=\\frac{bh^3}{12}',
    },
    {
      title: 'Oś centralna i mniejsze I',
      narration:
        'Po przeniesieniu osi do środka ciężkości odległości y mierzymy od nowej osi. Materiał leży teraz bliżej osi, więc moment centralny jest mniejszy i wynosi bh^3/36.',
      caption: 'Ta sama figura, inna oś: pasy liczone względem osi centralnej.',
      visual: 'section',
      focus: { metric: 'Ix', segment: 'centroid' },
      formula: 'I_c=\\frac{bh^3}{36}',
    },
    {
      title: 'Pasy pionowe budują I_y',
      narration:
        'Teraz dzielimy trójkąt na pionowe pasy. Odległością od osi symetrii y jest x, więc każdy pas wnosi x^2 dA, a moment wynosi hb^3/48.',
      caption: 'Pasy pionowe; oś y jest osią symetrii trójkąta.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\frac{hb^3}{48}=\\frac{90\\cdot120^3}{48}=3{,}24\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Obrót o 90°',
      narration:
        'Gdy trójkąt obrócimy tak, że podstawa będzie pionowa, a pozioma oś pozostanie na miejscu, moment względem tej osi zmienia się na hb^3/36. Ten sam kształt, inne ustawienie, inna sztywność.',
      caption: 'Obrót figury zmienia moment względem ustalonej osi poziomej.',
      visual: 'section',
      focus: { metric: 'Ix', segment: 'rotate' },
      formula: 'I=\\frac{hb^3}{36}=\\frac{90\\cdot120^3}{36}=4\\,320\\,000\\ \\text{mm}^4',
    },
  ],
} satisfies SolutionData
