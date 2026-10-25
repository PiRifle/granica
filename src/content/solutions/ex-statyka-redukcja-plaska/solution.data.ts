import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-statyka-redukcja-plaska',
  title: 'Redukcja płaskiego układu sił — rozwiązanie krok po kroku',
  duration: 7,
  given: [
    'F₁ = 3 kN w prawo w punkcie A(0; 0,5 m)',
    'F₂ = 4 kN w górę w punkcie B(0,6 m; 0)',
    'Moment skupiony M₀ = 6 kN·m przeciwnie do ruchu wskazówek zegara',
    'Biegun redukcji: O(0; 0)',
  ],
  result:
    'Wektor główny R = 5 kN pod kątem 53,1°, moment główny M_O = 6,9 kN·m. Wypadkowa 5 kN działa wzdłuż prostej 4x − 3y = 6,9, przechodzącej przez (1,725; 0) i (0; −2,3).',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.PlanarReductionAnimation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Dwie siły działają w różnych punktach tarczy, a dodatkowo przyłożony jest moment skupiony. Taki układ jest płaski i dowolny, więc redukujemy go do bieguna O.',
      caption: 'Siły F₁ i F₂ oraz moment skupiony M₀ na tarczy w układzie xy.',
      visual: 'diagram',
      focus: { metric: 'model' },
      formula: 'F_1=3\\ \\text{kN}\\ (A),\\quad F_2=4\\ \\text{kN}\\ (B),\\quad M_0=6\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Wektor główny',
      narration:
        'Składowe wektora głównego to sumy rzutów sił. Poziomo mamy 3 kN, pionowo 4 kN. Z twierdzenia Pitagorasa R = 5 kN, a kąt wynosi około 53,1° nad osią x.',
      caption: 'R = 5 kN pod kątem 53,1° do osi x.',
      visual: 'diagram',
      focus: { metric: 'vector' },
      formula:
        'R_x=3\\ \\text{kN},\\quad R_y=4\\ \\text{kN},\\quad R=\\sqrt{3^2+4^2}=5\\ \\text{kN},\\quad \\alpha=53{,}1^\\circ',
    },
    {
      title: 'Momenty sił względem O',
      narration:
        'Moment F₁ jest ujemny, bo siła pozioma działa powyżej bieguna i obraca zgodnie z ruchem wskazówek zegara. Moment F₂ jest dodatni, bo pionowa siła działa po prawej stronie bieguna.',
      caption: 'M₁ = −1,5 kN·m, M₂ = +2,4 kN·m.',
      visual: 'diagram',
      focus: { metric: 'moments' },
      formula:
        'M_1=0\\cdot0-0{,}5\\cdot3=-1{,}5\\ \\text{kN}\\cdot\\text{m},\\quad M_2=0{,}6\\cdot4-0\\cdot0=2{,}4\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Moment główny',
      narration:
        'Do momentów sił dodajemy moment skupiony, który nie zależy od bieguna. Suma wynosi −1,5 + 2,4 + 6 = 6,9 kN·m i ma zwrot przeciwny do ruchu wskazówek zegara.',
      caption: 'M_O = 6,9 kN·m przeciwnie do ruchu wskazówek zegara.',
      visual: 'diagram',
      focus: { metric: 'resultant-moment' },
      formula: 'M_O=-1{,}5+2{,}4+6=6{,}9\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Przesunięcie do jednej siły',
      narration:
        'Wektor główny przesuwamy prostopadle do jego kierunku o d = M_O/R = 1,38 m. Po takim przesunięciu moment względem O znika i układ sprowadza się do jednej siły 5 kN.',
      caption: 'Wypadkowa leży na prostej 4x − 3y = 6,9, odległej o 1,38 m od bieguna.',
      visual: 'diagram',
      focus: { metric: 'line' },
      formula: 'd=\\frac{M_O}{R}=\\frac{6{,}9}{5}=1{,}38\\ \\text{m},\\qquad 4x-3y=6{,}9',
    },
    {
      title: 'Kontrola prostej działania',
      narration:
        'Prosta wypadkowej przecina oś x w punkcie 1,725 m, a oś y w punkcie −2,3 m. Moment siły 5 kN przyłożonej w (1,725; 0) względem O wynosi 1,725·4 = 6,9 kN·m, czyli zgadza się z momentem głównym.',
      caption: 'Przecięcia z osiami: x = 1,725 m, y = −2,3 m; moment kontrolny 6,9 kN·m.',
      visual: 'diagram',
      focus: { metric: 'check' },
      formula: 'y(0)=-2{,}3\\ \\text{m},\\quad x(0)=1{,}725\\ \\text{m},\\quad 1{,}725\\cdot4=6{,}9',
    },
  ],
} satisfies SolutionData
