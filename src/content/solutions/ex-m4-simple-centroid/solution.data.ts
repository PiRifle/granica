import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-m4-simple-centroid',
  title: 'Środek ciężkości figur prostych — przykład 1',
  duration: 7,
  given: ['b = 240 mm', 'h = 180 mm'],
  result:
    'Środek ciężkości blachy ma współrzędne (80; 60) mm, a jej pole wynosi 21 600 mm^2, czyli 216 cm². Wynik jest zgodny z regułą jednej trzeciej wysokości od podstawy.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SimpleCentroidTriangleAnimation }))),
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Przyjmujemy kąt prosty w początku układu. Pozioma przyprostokątna b = 240 mm leży na osi x, pionowa h = 180 mm na osi y. Pole trójkąta jest połową iloczynu przyprostokątnych.',
      caption: 'Trójkąt prostokątny 240 × 180 mm; wymiary mierzone od wspólnego początku.',
      visual: 'section',
      focus: { metric: 'axes' },
      formula:
        'b=240\\ \\text{mm},\\qquad h=180\\ \\text{mm},\\qquad A=\\frac{1}{2}\\cdot240\\cdot180=21\\,600\\ \\text{mm}^2',
    },
    {
      title: 'Pasy poziome',
      narration:
        'Dzielimy trójkąt na poziome pasy. Na wysokości y szerokość pasa maleje liniowo: b(y)=b(1-y/h). Pole jest sumą pól tych pasów.',
      caption: 'Coraz węższe pasy ku wierzchołkowi; zaznaczony pas ma szerokość b(y).',
      visual: 'section',
      focus: { metric: 'strips' },
      formula: 'b(y)=240\\left(1-\\frac{y}{180}\\right),\\qquad A=\\int_0^{180}b(y)\\,dy=21\\,600\\ \\text{mm}^2',
    },
    {
      title: 'Środki pasów',
      narration:
        'Każdy pas traktujemy jak pole skupione w jego środku. Ważona suma środków pasów przesuwa wypadkowy punkt do (80; 60) mm.',
      caption: 'Środki pasów (punkty) i wypadkowy środek ciężkości C.',
      visual: 'section',
      focus: { metric: 'parts' },
      formula:
        '\\bar{x}=\\frac{S_y}{A}=\\frac{1\\,728\\,000}{21\\,600}=80\\ \\text{mm},\\qquad \\bar{y}=\\frac{S_x}{A}=\\frac{1\\,296\\,000}{21\\,600}=60\\ \\text{mm}',
    },
    {
      title: 'Konstrukcja środkowych',
      narration:
        'Środkowe łączą wierzchołki ze środkami przeciwległych boków. Przecinają się w jednym punkcie, który dzieli każdą z nich w stosunku 2:1 od wierzchołka.',
      caption: 'Trzy środkowe przecinają się w C=(80; 60) mm.',
      visual: 'section',
      focus: { metric: 'medians' },
      formula: '\\bar{y}=\\frac{h}{3}=60\\ \\text{mm},\\qquad \\bar{x}=\\frac{b}{3}=80\\ \\text{mm}',
    },
    {
      title: 'Wynik i osie centralne',
      narration:
        'Przez środek prowadzimy osie centralne. Odległości 80 mm i 60 mm odpowiadają jednej trzeciej przyprostokątnych. Względem tych osi liczymy centralne momenty bezwładności.',
      caption: 'Osie centralne przechodzą przez C; momenty bezwładności są liczone względem tych osi.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        '\\bar{x}=80\\ \\text{mm},\\ \\bar{y}=60\\ \\text{mm},\\qquad I_x=\\frac{bh^3}{36}=38{,}88\\cdot10^6\\ \\text{mm}^4,\\qquad I_y=\\frac{hb^3}{36}=69{,}12\\cdot10^6\\ \\text{mm}^4',
    },
  ],
} satisfies SolutionData
