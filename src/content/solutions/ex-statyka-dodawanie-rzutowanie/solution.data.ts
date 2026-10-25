import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-dodawanie-rzutowanie',
  title: 'Wypadkowa dwóch sił współliniowych — rozwiązanie krok po kroku',
  duration: 6,
  given: [
    'F₁ = 30 kN w kierunku „4 w prawo i 3 w górę”',
    'F₂ = 25 kN w kierunku „4 w lewo i 3 w dół”',
    'Kierunki opisane trójką 3-4-5, więc cos α = 4/5 i sin α = 3/5',
  ],
  result:
    'F₁ = (24; 18) kN, F₂ = (−20; −15) kN, R = (4; 3) kN. Moduł wypadkowej |R| = 5 kN, a jej kąt do osi x wynosi 36,87°.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ProjectionAdditionAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Obie linki działają na to samo oczko. Kierunek pierwszej to 4 jednostki w prawo i 3 w górę, drugiej — 4 w lewo i 3 w dół. Trójkąt 3-4-5 daje od razu cosinus i sinus kąta nachylenia: 4/5 oraz 3/5.',
      caption: 'Dwie siły o przeciwnych zwrotach, zaczepione w jednym punkcie.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula:
        '\\mathbf F_1=30\\left(\\tfrac45\\mathbf i+\\tfrac35\\mathbf j\\right)\\ \\text{kN},\\qquad \\mathbf F_2=-25\\left(\\tfrac45\\mathbf i+\\tfrac35\\mathbf j\\right)\\ \\text{kN}',
    },
    {
      title: 'Składowe siły F₁',
      narration:
        'Rzutujemy pierwszą siłę na osie. Składowa pozioma to 30 razy 4/5, pionowa — 30 razy 3/5. Obie są dodatnie, bo siła działa w prawo i w górę.',
      caption: 'F₁x = 24 kN, F₁y = 18 kN.',
      visual: 'diagram',
      focus: { metric: 'components1' },
      formula: 'F_{1x}=30\\cdot\\tfrac45=24\\ \\text{kN},\\qquad F_{1y}=30\\cdot\\tfrac35=18\\ \\text{kN}',
    },
    {
      title: 'Składowe siły F₂',
      narration:
        'Druga siła ma zwrot przeciwny, więc oba rzuty są ujemne. Wartości bezwzględne wynoszą 20 kN i 15 kN, ale w sumie rzutów liczą się ze znakiem minus.',
      caption: 'F₂x = −20 kN, F₂y = −15 kN.',
      visual: 'diagram',
      focus: { metric: 'components2' },
      formula: 'F_{2x}=-25\\cdot\\tfrac45=-20\\ \\text{kN},\\qquad F_{2y}=-25\\cdot\\tfrac35=-15\\ \\text{kN}',
    },
    {
      title: 'Suma rzutów',
      narration:
        'Składowe tego samego kierunku dodajemy algebraicznie. Poziomo 24 minus 20 daje 4 kN, pionowo 18 minus 15 daje 3 kN. Wypadkowa jest więc znacznie mniejsza od obu sił — większość ich działania się znosi.',
      caption: 'Rx = 4 kN, Ry = 3 kN.',
      visual: 'diagram',
      focus: { metric: 'sum' },
      formula: 'R_x=24-20=4\\ \\text{kN},\\qquad R_y=18-15=3\\ \\text{kN}',
    },
    {
      title: 'Moduł i kierunek wypadkowej',
      narration:
        'Moduł liczymy z twierdzenia Pitagorasa: pierwiastek z 4² + 3² daje 5 kN. Tangens kąta to 3/4, więc kąt wynosi 36,87°. Oba rzuty są dodatnie, więc wypadkowa leży w pierwszej ćwiartce.',
      caption: '|R| = 5 kN, α_R = 36,87°.',
      visual: 'diagram',
      focus: { metric: 'resultant' },
      formula: 'R=\\sqrt{4^2+3^2}=5\\ \\text{kN},\\qquad \\alpha_R=\\arctan\\tfrac34=36{,}87^\\circ',
    },
    {
      title: 'Kontrola geometryczna',
      narration:
        'Wersory obu sił są przeciwne, więc siły działają wzdłuż jednej prostej. Kąt między nimi wynosi 180°, a twierdzenie cosinusów daje 30² + 25² − 2·30·25 = 25, czyli R = 5 kN. Wynik analityczny i geometryczny są zgodne.',
      caption: 'F₂ przesunięta na koniec F₁ domyka wielobok w punkcie wypadkowej.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: '\\mathbf u_2=-\\mathbf u_1,\\qquad R^2=30^2+25^2+2\\cdot30\\cdot25\\cos180^\\circ=25',
    },
  ],
} satisfies SolutionData
