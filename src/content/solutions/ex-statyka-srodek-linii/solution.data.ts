import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-srodek-linii',
  title: 'Środek ciężkości kratownicy — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'Węzły: A = (0, 0), B = (4, 0), C = (0; 2,5), D = (0, 5), E = (4; 2,5) — w metrach',
    'Pręty: AC, CD, CB, BE, CE, DE — jednorodne, o tym samym przekroju',
    'Wagą jest długość pręta',
  ],
  result:
    'L = 20,94 m, Q_y = 36,88 m², Q_x = 49,225 m². Środek ciężkości kratownicy leży w punkcie C = (1,76; 2,35) m, w świetle między prętami.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TrussCentroidAnimation }))),
  scenes: [
    {
      title: 'Model kratownicy',
      narration:
        'Kratownica to układ cienkich, jednorodnych prętów. Każdy pręt zastępujemy odcinkiem o masie proporcjonalnej do długości, więc w średniej ważonej wagą będzie długość, a nie pole przekroju.',
      caption: 'Sześć prętów między pięcioma węzłami; początek układu w węźle A.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'A=(0,0),\\quad B=(4,0),\\quad C=(0;2{,}5),\\quad D=(0,5),\\quad E=(4;2{,}5)',
    },
    {
      title: 'Długości i środki prętów',
      narration:
        'Pręty pionowe AC, CD i BE mają po 2,5 m, poziomy CE ma 4 m, a przekątne CB i DE po 4,72 m. Środek każdego pręta leży w połowie jego długości — to właśnie te punkty będą ważone długością.',
      caption: 'Trzy pręty po 2,5 m, jeden 4,00 m i dwie przekątne po 4,72 m.',
      visual: 'diagram',
      focus: { metric: 'lengths' },
      formula:
        'L_{AC}=L_{CD}=L_{BE}=2{,}5\\ \\text{m},\\quad L_{CE}=4{,}00\\ \\text{m},\\quad L_{CB}=L_{DE}=\\sqrt{4^2+2{,}5^2}=4{,}72\\ \\text{m}',
    },
    {
      title: 'Suma długości',
      narration:
        'Mianownikiem obu współrzędnych jest całkowita długość kratownicy. Sumujemy wszystkie sześć prętów niezależnie od ich położenia. Pręty o zerowym momencie w jednej osi nadal wchodzą do tej sumy.',
      caption: 'Całkowita długość prętów L = 20,94 m.',
      visual: 'diagram',
      focus: { metric: 'total-length' },
      formula: 'L=\\sum L_i=2{,}5+2{,}5+4{,}72+2{,}5+4+4{,}72=20{,}94\\ \\text{m}',
    },
    {
      title: 'Momenty względem osi y',
      narration:
        'Do x_C potrzebne są momenty względem osi y. Ramieniem jest pozioma odległość środka pręta od tej osi. Pręty AC i CD leżą na osi y, więc nie wnoszą momentu, a przekątne i pręt poziomy wnoszą najwięcej.',
      caption: 'Q_y = 36,88 m².',
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      formula: 'Q_y=\\sum x_iL_i=0+0+2\\cdot4{,}72+4\\cdot2{,}5+2\\cdot4+2\\cdot4{,}72=36{,}88\\ \\text{m}^2',
    },
    {
      title: 'Momenty względem osi x',
      narration:
        'Analogicznie sumujemy iloczyny y_i·L_i. Największy wkład wnosi przekątna DE, bo jest długa i ma wysoko wysunięty środek. Pręt CE ma większą długość, ale jego środek leży niżej.',
      caption: 'Q_x = 49,225 m².',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      formula:
        'Q_x=\\sum y_iL_i=2{,}5\\cdot1{,}25+2{,}5\\cdot3{,}75+4{,}72\\cdot1{,}25+2{,}5\\cdot1{,}25+4\\cdot2{,}5+4{,}72\\cdot3{,}75=49{,}225\\ \\text{m}^2',
    },
    {
      title: 'Współrzędne centroidu i kontrola',
      narration:
        'Dzielimy momenty przez długość całkowitą. Wynik leży wewnątrz obrysu kratownicy, bliżej lewej strony, bo lewy słup i obie przekątne wnoszą duży moment w x = 0 i x = 2. Wysokość 2,35 m jest bliska połowie wysokości kratownicy.',
      caption: 'x_C = 1,76 m, y_C = 2,35 m — punkt leży w świetle między prętami.',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      formula:
        'x_C=\\frac{36{,}88}{20{,}94}=1{,}76\\ \\text{m},\\qquad y_C=\\frac{49{,}225}{20{,}94}=2{,}35\\ \\text{m}',
    },
  ],
} satisfies SolutionData
