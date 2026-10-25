import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-wektory-3d',
  title: 'Siła w przestrzeni — od wektora wodzącego do składowych',
  duration: 6,
  given: [
    'F = 13 kN, cięgno od A = (0, 0, 0) do B = (3, 4, 12) m',
    'Siła ciągnie punkt A w stronę B',
    'Współrzędne w metrach, układ prawoskrętny',
  ],
  result:
    'r_AB = (3, 4, 12) m, λ = 13 m, u = (3/13, 4/13, 12/13). F = (3, 4, 12) kN, |F| = 13 kN. Kąty kierunkowe: θx ≈ 76,7°, θy ≈ 72,1°, θz ≈ 22,6°.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.Vector3DAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Cięgno zaczepiono w początku układu i naciągnięto w stronę punktu B. W przestrzeni kierunek opisują trzy różnice współrzędnych, a nie jeden kąt.',
      caption: 'Punkty A i B wyznaczają prostą działania siły.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'F=13\\ \\text{kN},\\qquad A=(0,0,0)\\ \\text{m},\\qquad B=(3,4,12)\\ \\text{m}',
    },
    {
      title: 'Wektor wodzący',
      narration:
        'Odejmujemy współrzędne punktu początkowego od końcowego. Powstaje wektor o składowych 3, 4 i 12 m — to on opisuje kierunek i zwrot cięgna.',
      caption: 'Wektor r_AB prowadzi od A do B.',
      visual: 'diagram',
      focus: { metric: 'vector' },
      formula: '\\mathbf r_{AB}=(3-0)\\,\\mathbf i+(4-0)\\,\\mathbf j+(12-0)\\,\\mathbf k=(3,4,12)\\ \\text{m}',
    },
    {
      title: 'Długość prostej działania',
      narration:
        'Długość wektora liczymy z twierdzenia Pitagorasa w trzech wymiarach. Kwadraty składowych sumują się do 169, więc długość wynosi dokładnie 13 m.',
      caption: 'λ = 13 m — tyle wynosi odległość A–B.',
      visual: 'diagram',
      focus: { metric: 'length' },
      formula: '\\lambda=\\sqrt{3^2+4^2+12^2}=\\sqrt{169}=13\\ \\text{m}',
    },
    {
      title: 'Wersor kierunku',
      narration:
        'Dzielimy wektor wodzący przez jego długość. Otrzymujemy wektor jednostkowy: jego składowe to cosinusy kierunkowe, a suma ich kwadratów jest równa jeden.',
      caption: 'Wersor u ma długość 1 i ten sam zwrot co r_AB.',
      visual: 'diagram',
      focus: { metric: 'unit' },
      formula:
        '\\mathbf u=\\frac{\\mathbf r_{AB}}{\\lambda}=\\left(\\frac{3}{13},\\frac{4}{13},\\frac{12}{13}\\right),\\qquad |\\mathbf u|=1',
    },
    {
      title: 'Składowe siły',
      narration:
        'Mnożymy wersor przez wartość siły. Wszystkie składowe są dodatnie, bo siła ma zwrot od A ku B. Kontrola modułu daje z powrotem 13 kN.',
      caption: 'F = (3, 4, 12) kN — składowe zgodne ze zwrotem osi.',
      visual: 'diagram',
      focus: { metric: 'components' },
      formula: '\\mathbf F=13\\,\\mathbf u=(3\\,\\mathbf i+4\\,\\mathbf j+12\\,\\mathbf k)\\ \\text{kN}',
    },
    {
      title: 'Kąty kierunkowe',
      narration:
        'Cosinus kąta to składowa podzielona przez moduł. Najmniejszy kąt wypada z osią z, bo to składowa z jest największa. Suma kwadratów cosinusów potwierdza poprawność zapisu.',
      caption: 'θx ≈ 76,7°, θy ≈ 72,1°, θz ≈ 22,6°; kontrola Σcos²θ = 1.',
      visual: 'diagram',
      focus: { metric: 'angles' },
      formula:
        '\\theta_x=\\arccos\\frac{3}{13}=76{,}7^\\circ,\\qquad \\theta_y=72{,}1^\\circ,\\qquad \\theta_z=22{,}6^\\circ',
    },
  ],
} satisfies SolutionData
