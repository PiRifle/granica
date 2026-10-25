import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-srodek-bryl',
  title: 'Centroid bryły z wycięciem — rozwiązanie krok po kroku',
  duration: 7,
  given: [
    'Część 1: prostopadłościan 70 × 30 × 25 cm, środek (35; 15; 12,5)',
    'Część 2: prostopadłościan 20 × 20 × 15 cm, środek (10; 40; 7,5)',
    'Część 3: wycięcie 10 × 20 × 25 cm, środek (30; 15; 12,5) — objętość ujemna',
  ],
  result:
    'V = 53 500 cm³, Q_yz = 1 747 500 cm⁴, Q_zx = 952 500 cm⁴, Q_xy = 638 750 cm⁴. Centroid leży w punkcie C = (32,66; 17,80; 11,94) cm.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolidCentroidAnimation }))),
  scenes: [
    {
      title: 'Model bryły',
      narration:
        'Bryła to dwa prostopadłościany oraz prostopadłościenne wycięcie. Wycięcie leży wewnątrz większej części, więc w rachunku wystąpi jako objętość ujemna. Przyjmujemy układ osi x, y, z wzdłuż krawędzi większego prostopadłościanu.',
      caption: 'Dwie części materialne i jedno wycięcie o wymiarach 10 × 20 × 25 cm.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'V_1=70\\cdot30\\cdot25,\\qquad V_2=20\\cdot20\\cdot15,\\qquad V_3=-10\\cdot20\\cdot25',
    },
    {
      title: 'Objętości części i objętość netto',
      narration:
        'Objętość prostopadłościanu to iloczyn trzech wymiarów. Pierwsza część ma 52 500 cm³, druga 6 000 cm³, a wycięcie 5 000 cm³ ze znakiem minus. Objętość netto wynosi 53 500 cm³ i będzie mianownikiem wszystkich trzech współrzędnych.',
      caption: 'V₁ = 52 500 cm³, V₂ = 6 000 cm³, V₃ = −5 000 cm³, V = 53 500 cm³.',
      visual: 'diagram',
      focus: { metric: 'volumes' },
      formula: 'V=52\\,500+6\\,000-5\\,000=53\\,500\\ \\text{cm}^3',
    },
    {
      title: 'Moment względem płaszczyzny yz',
      narration:
        'Współrzędną x_C wyznacza moment względem płaszczyzny yz, czyli suma x_i·V_i. Wycięcie ma ujemną objętość, ale jego współrzędna x pozostaje dodatnia. Po podzieleniu momentu przez objętość netto otrzymujemy x_C = 32,66 cm.',
      caption: 'Q_yz = 1 747 500 cm⁴, x_C = 32,66 cm.',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      formula:
        'Q_{yz}=35\\cdot52\\,500+10\\cdot6\\,000+30\\cdot(-5\\,000)=1\\,747\\,500\\ \\text{cm}^4,\\qquad x_C=32{,}66\\ \\text{cm}',
    },
    {
      title: 'Moment względem płaszczyzny zx',
      narration:
        'Druga współrzędna powstaje z sumy y_i·V_i. Mniejsza część leży daleko w kierunku y, dlatego mimo małej objętości wyraźnie przesuwa centroid w stronę y_C = 17,80 cm. Wycięcie leży nisko, więc odejmuje moment w tej samej strefie.',
      caption: 'Q_zx = 952 500 cm⁴, y_C = 17,80 cm.',
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      formula:
        'Q_{zx}=15\\cdot52\\,500+40\\cdot6\\,000+15\\cdot(-5\\,000)=952\\,500\\ \\text{cm}^4,\\qquad y_C=17{,}80\\ \\text{cm}',
    },
    {
      title: 'Moment względem płaszczyzny xy',
      narration:
        'Trzecia współrzędna to suma z_i·V_i. Obie części materialne są niskie, a wycięcie przechodzi przez całą wysokość dużej bryły, więc jego ujemny moment jest proporcjonalnie duży. Otrzymujemy z_C = 11,94 cm, czyli prawie połowę wysokości 25 cm.',
      caption: 'Q_xy = 638 750 cm⁴, z_C = 11,94 cm.',
      visual: 'diagram',
      focus: { metric: 'moment-z' },
      formula:
        'Q_{xy}=12{,}5\\cdot52\\,500+7{,}5\\cdot6\\,000+12{,}5\\cdot(-5\\,000)=638\\,750\\ \\text{cm}^4,\\qquad z_C=11{,}94\\ \\text{cm}',
    },
    {
      title: 'Centroid i kontrola przestrzenna',
      narration:
        'Wszystkie trzy współrzędne mieszczą się w obrysie bryły: x_C między 0 a 70 cm, y_C między 0 a 50 cm, z_C między 0 a 25 cm. Wynik jest bliski środka dużej części, bo wycięcie leży w jej wnętrzu i nie przesuwa centroidu gwałtownie.',
      caption: 'C = (32,66; 17,80; 11,94) cm — punkt wewnątrz obrysu bryły.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      formula: 'C=(32{,}66;\\ 17{,}80;\\ 11{,}94)\\ \\text{cm}',
    },
  ],
} satisfies SolutionData
