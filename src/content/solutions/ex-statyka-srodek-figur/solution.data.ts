import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-srodek-figur',
  title: 'Centroid spandrela parabolicznego — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'Figura ograniczona osią x, prostą x = 60 mm i parabolą y = 0,025x²',
    'Współrzędne x i y w milimetrach',
    'Wysokość przy x = 60 mm wynosi h = 90 mm',
  ],
  result:
    'A = 1800 mm², Q_y = 81 000 mm³, Q_x = 48 600 mm³. Centroid leży w punkcie C = (45; 27) mm, czyli w odległości 3a/4 od lewej krawędzi i 3h/10 od podstawy.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ParabolicSpandrelAnimation }))),
  scenes: [
    {
      title: 'Model figury i pasek',
      narration:
        'Figurę ogranicza oś x, pionowa prosta x = 60 mm oraz parabola y = 0,025x². Dzielimy ją na pionowe paski. Pasek o szerokości dx ma wysokość y(x), więc jego pole wynosi dA = y·dx, a własny środek leży w połowie wysokości.',
      caption: 'Pojedynczy pasek: pole dA = y dx, środek w punkcie (x; y/2).',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'y=0{,}025x^2,\\qquad 0\\le x\\le60\\ \\text{mm},\\qquad h=y(60)=90\\ \\text{mm}',
    },
    {
      title: 'Podział na pionowe paski',
      narration:
        'Zastępujemy figurę skończoną liczbą pasków, a następnie zwiększamy ich liczbę. W granicy dx dąży do zera, a suma pól staje się całką. Każdy pasek wnosi do momentów iloczyn swojego pola i położenia środka.',
      caption: 'Im więcej pasków, tym dokładniej odwzorowana jest krzywa i pole.',
      visual: 'diagram',
      focus: { metric: 'strips' },
      formula: 'dA=y\\,dx,\\qquad \\bar x=x,\\qquad \\bar y=\\frac{y}{2}',
    },
    {
      title: 'Pole figury',
      narration:
        'Całkujemy wysokość paska od zera do 60 mm. Całka z x² daje x³/3, więc pole wynosi 0,025·60³/3 = 1800 mm². Ten sam wynik daje gotowy wzór dla spandrela: A = ah/3.',
      caption: 'A = 1800 mm².',
      visual: 'diagram',
      focus: { metric: 'area' },
      formula: 'A=\\int_0^{60}0{,}025x^2\\,dx=0{,}025\\cdot\\frac{60^3}{3}=1800\\ \\text{mm}^2',
    },
    {
      title: 'Moment względem osi y',
      narration:
        'Moment względem osi y to całka x·dA. Po podstawieniu dA = 0,025x² dx otrzymujemy całkę z x³, która daje 81 000 mm³. Dzieląc przez pole, dostajemy x_C = 45 mm, czyli trzy czwarte szerokości figury.',
      caption: 'Q_y = 81 000 mm³, x_C = 45 mm.',
      visual: 'diagram',
      focus: { metric: 'moment-y' },
      formula:
        'Q_y=\\int_0^{60}x\\cdot0{,}025x^2\\,dx=81\\,000\\ \\text{mm}^3,\\qquad x_C=\\frac{81\\,000}{1800}=45\\ \\text{mm}',
    },
    {
      title: 'Moment względem osi x',
      narration:
        'Do momentu względem osi x wchodzi środek paska y/2. Całkujemy więc połowę kwadratu wysokości. Wynik 48 600 mm³ po podzieleniu przez pole daje y_C = 27 mm, czyli 0,3 wysokości figury.',
      caption: 'Q_x = 48 600 mm³, y_C = 27 mm.',
      visual: 'diagram',
      focus: { metric: 'moment-x' },
      formula:
        'Q_x=\\frac12\\int_0^{60}(0{,}025x^2)^2\\,dx=48\\,600\\ \\text{mm}^3,\\qquad y_C=\\frac{48\\,600}{1800}=27\\ \\text{mm}',
    },
    {
      title: 'Wynik i kontrola wzorami',
      narration:
        'Centroid leży w punkcie (45; 27) mm, bliżej prawej krawędzi i bliżej podstawy. Oba wyniki zgadzają się z gotowymi wzorami dla spandrela parabolicznego: x_C = 3a/4, y_C = 3h/10 oraz A = ah/3.',
      caption: 'C = (45; 27) mm; pole 1800 mm².',
      visual: 'diagram',
      focus: { metric: 'centroid' },
      formula:
        'x_C=\\frac{3a}{4}=45\\ \\text{mm},\\qquad y_C=\\frac{3h}{10}=27\\ \\text{mm},\\qquad A=\\frac{ah}{3}=1800\\ \\text{mm}^2',
    },
  ],
} satisfies SolutionData
