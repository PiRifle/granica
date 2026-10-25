import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-figury-zlozone',
  title: 'Centroid figury z pięciu prostokątów — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'Prostokąt 1: 12 × 2 cm, środek (6; 1)',
    'Prostokąt 2: 2 × 6 cm, środek (1; 5)',
    'Prostokąt 3: 2 × 2 cm, środek (11; 3)',
    'Prostokąt 4: 8 × 2 cm, środek (4; 9)',
    'Prostokąt 5: 2 × 2 cm, środek (7; 7)',
  ],
  result:
    'A = 60 cm², Q_y = 292 cm³, Q_x = 268 cm³. Centroid leży w punkcie C = (4,87; 4,47) cm, wewnątrz obrysu figury.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.CompositeAreaAnimation }))),
  scenes: [
    {
      title: 'Model i podział figury',
      narration:
        'Figurę dzielimy na pięć rozłącznych prostokątów. Żaden z nich nie jest otworem, więc wszystkie pola są dodatnie. Początek układu leży w lewym dolnym narożniku, a osie biegną wzdłuż dolnej i lewej krawędzi.',
      caption: 'Pięć prostokątów tworzy figurę o obrysie 12 × 10 cm.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'A_i:\\quad 12\\times2,\\quad 2\\times6,\\quad 2\\times2,\\quad 8\\times2,\\quad 2\\times2',
    },
    {
      title: 'Pola części i pole netto',
      narration:
        'Pole każdego prostokąta to iloczyn boków. Sumujemy pięć pól dodatnich i otrzymujemy pole netto, które będzie mianownikiem obu współrzędnych. Kolejność części nie ma znaczenia, byle żadna nie była liczona dwa razy.',
      caption: 'Pola: 24, 12, 4, 16 i 4 cm²; pole netto A = 60 cm².',
      visual: 'diagram',
      focus: { metric: 'areas' },
      formula: 'A=24+12+4+16+4=60\\ \\text{cm}^2',
    },
    {
      title: 'Momenty względem osi y',
      narration:
        'Dla każdego prostokąta mnożymy jego pole przez współrzędną x środka. Ramiona mierzymy od osi y. Największy wkład wnosi duży dolny prostokąt, mimo że jego środek nie leży najdalej w prawo.',
      caption: 'Ramiona x_i to odległości środków części od osi y.',
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      formula: 'Q_y=\\sum x_iA_i=6\\cdot24+1\\cdot12+11\\cdot4+4\\cdot16+7\\cdot4=292\\ \\text{cm}^3',
    },
    {
      title: 'Momenty względem osi x',
      narration:
        'Analogicznie mnożymy pola przez wysokości środków. Tym razem największy wkład wnosi górny prostokąt o polu 16 cm², którego środek leży 9 cm nad osią x. Suma momentów wynosi 268 cm³.',
      caption: 'Ramiona y_i to wysokości środków części nad osią x.',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      formula: 'Q_x=\\sum y_iA_i=1\\cdot24+5\\cdot12+3\\cdot4+9\\cdot16+7\\cdot4=268\\ \\text{cm}^3',
    },
    {
      title: 'Współrzędne centroidu',
      narration:
        'Dzielimy momenty przez pole netto. x_C = 4,87 cm, y_C = 4,47 cm. Centroid leży poniżej połowy wysokości, bo największe pole 24 cm² leży nisko, oraz w lewej połowie, bo duże pola skupiają się przy lewej krawędzi.',
      caption: 'C = (4,87; 4,47) cm.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      formula: 'x_C=\\frac{292}{60}=4{,}87\\ \\text{cm},\\qquad y_C=\\frac{268}{60}=4{,}47\\ \\text{cm}',
    },
    {
      title: 'Kontrola położenia',
      narration:
        'Centroid musi leżeć wewnątrz prostokąta ograniczającego figurę. Sprawdzamy zakresy: x_C mieści się między 0 a 12 cm, a y_C między 0 a 10 cm. Punkt wypada w środkowym pustym obszarze — to normalne, bo centroid nie musi leżeć w materiale.',
      caption: '0 ≤ x_C ≤ 12 cm oraz 0 ≤ y_C ≤ 10 cm; C wypada w pustce między częściami.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '0\\le x_C\\le12\\ \\text{cm},\\qquad 0\\le y_C\\le10\\ \\text{cm}',
    },
  ],
} satisfies SolutionData
