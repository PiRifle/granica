import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-wektor-i-sklad',
  title: 'Składanie dwóch sił — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'F₁ = 30 kN, kąt α₁ = 25° od osi x',
    'F₂ = 20 kN, kąt α₂ = 120° od osi x',
    'Przyjmujemy dodatnie zwroty osi x w prawo i y w górę',
  ],
  result:
    'F₁ = (27,19; 12,68) kN, F₂ = (−10,00; 17,32) kN, R = (17,19; 30,00) kN. Moduł wypadkowej |R| = 34,60 kN, a jej kąt wynosi 60,2° od osi x.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.VectorAdditionAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Obie siły zaczepiamy w początku układu O. Kąt mierzymy od dodatniego kierunku osi x w stronę przeciwną do ruchu wskazówek zegara. Siła F₁ leży w pierwszej ćwiartce, a F₂ w drugiej, więc jej składowa x będzie ujemna.',
      caption: 'Dwie siły o znanych modułach i kątach, zaczepione w jednym punkcie.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'F_1=30\\ \\text{kN},\\ \\alpha_1=25^\\circ,\\qquad F_2=20\\ \\text{kN},\\ \\alpha_2=120^\\circ',
    },
    {
      title: 'Składowe siły F₁',
      narration:
        'Rzutujemy F₁ na osie. Składowa pozioma to moduł razy cosinus kąta, a pionowa — moduł razy sinus. Obie są dodatnie, bo kąt leży w pierwszej ćwiartce.',
      caption: 'F₁x = 27,19 kN, F₁y = 12,68 kN.',
      visual: 'diagram',
      focus: { metric: 'components1' },
      formula: 'F_{1x}=30\\cos25^\\circ=27{,}19\\ \\text{kN},\\qquad F_{1y}=30\\sin25^\\circ=12{,}68\\ \\text{kN}',
    },
    {
      title: 'Składowe siły F₂',
      narration:
        'Dla kąta 120° cosinus jest ujemny, więc składowa pozioma ma zwrot w lewo. Sinus pozostaje dodatni. To nie jest błąd znaku — tak działa rzutowanie wektora na osie.',
      caption: 'F₂x = −10,00 kN (w lewo), F₂y = 17,32 kN (w górę).',
      visual: 'diagram',
      focus: { metric: 'components2' },
      formula: 'F_{2x}=20\\cos120^\\circ=-10{,}00\\ \\text{kN},\\qquad F_{2y}=20\\sin120^\\circ=17{,}32\\ \\text{kN}',
    },
    {
      title: 'Suma składowych',
      narration:
        'Składowe tego samego kierunku dodajemy algebraicznie. Poziomo 27,19 minus 10,00 daje 17,19 kN. Pionowo 12,68 plus 17,32 daje 30,00 kN. Wypadkowa jest wektorem o tych składowych.',
      caption: 'Rx = 17,19 kN, Ry = 30,00 kN.',
      visual: 'diagram',
      focus: { metric: 'sum' },
      formula: 'R_x=F_{1x}+F_{2x}=17{,}19\\ \\text{kN},\\qquad R_y=F_{1y}+F_{2y}=30{,}00\\ \\text{kN}',
    },
    {
      title: 'Moduł i kierunek wypadkowej',
      narration:
        'Moduł liczymy z twierdzenia Pitagorasa, a kierunek z arcus tangens stosunku składowych. Dodatnie obie składowe oznaczają pierwszą ćwiartkę, więc kąt 60,2° jest już kątem od osi x.',
      caption: '|R| = 34,60 kN, φ = 60,2°.',
      visual: 'diagram',
      focus: { metric: 'resultant' },
      formula:
        'R=\\sqrt{17{,}19^2+30{,}00^2}=34{,}60\\ \\text{kN},\\qquad \\varphi=\\arctan\\frac{30{,}00}{17{,}19}=60{,}2^\\circ',
    },
    {
      title: 'Kontrola geometryczna',
      narration:
        'Równoległobok zbudowany na F₁ i F₂ ma przekątną równą wypadkowej. Jego boki są równoległe do sił, a przekątna kończy się w punkcie o współrzędnych (17,19; 30,00). Kontrola potwierdza rachunek składowych.',
      caption: 'Przekątna równoległoboku pokrywa się z wektorem wypadkowej.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '\\vec R=\\vec F_1+\\vec F_2',
    },
  ],
} satisfies SolutionData
