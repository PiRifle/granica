import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { sourceScene, tex } from '../../solution-factories/core/source-task'
import { createUkladZbieznySolution } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'
import { P, L, ALPHA, COS, SIN, AX, BY, AY, task } from './task'

const scenes = [
  sourceScene(
    'Model fizyczny i dane',
    'Nieważka belka o długości L jest podparta przegubem A na lewym końcu i rolką B na prawym końcu. W połowie długości, w punkcie M, działa siła P nachylona do belki pod kątem α. Przyjmujemy osie x w prawo i y w górę; moment dodatni jest przeciwny do wskazówek zegara.',
    `P=${tex(P, 0)}\\ \\mathrm{kN},\\qquad L=${tex(L, 0)}\\ \\mathrm{m},\\qquad \\alpha=${ALPHA}^\\circ`,
    'Przegub A daje dwie składowe reakcji, rolka B tylko jedną pionową B_y. Siła P ma składową poziomą i pionową.',
    'model',
    'Rysunek pokazuje belkę, przegub, rolkę, siłę P i kąt α.',
  ),
  sourceScene(
    'Rozkład siły P',
    'Siłę P rozkładamy na kierunek belki i kierunek prostopadły. Składowa pozioma P_x działa w prawo, a pionowa P_y w dół. Dzięki temu obciążenie belki można traktować jako sumę dwóch sił skupionych w punkcie M.',
    `P_x=P\\cos\\alpha=${tex(P * COS, 3)}\\ \\mathrm{kN},\\qquad P_y=-P\\sin\\alpha=${tex(-P * SIN, 3)}\\ \\mathrm{kN}`,
    'Kąt α mierzymy między siłą P a osią belki, dlatego P_x = P cosα, a |P_y| = P sinα.',
    'loads',
  ),
  sourceScene(
    'Geometria i ramiona sił',
    'Punkt przyłożenia P leży w połowie rozpiętości, więc jego odległość od A wynosi L/2. Reakcja B_y działa na końcu belki w odległości L od A. Do równania momentów potrzebne są tylko odległości poziome, bo B_y jest pionowa, a P ma znane składowe.',
    `x_P=\\frac{L}{2}=${tex(L / 2, 3)}\\ \\mathrm{m},\\qquad x_B=L=${tex(L, 3)}\\ \\mathrm{m}`,
    'Biegun w A eliminuje z równania momentów niewiadome A_x i A_y.',
    'geometry',
  ),
  sourceScene(
    'Równanie momentów względem A',
    'Moment składowej pionowej P_y obraca belkę zgodnie ze wskazówkami zegara, więc w równaniu ma znak ujemny. Moment reakcji B_y jest przeciwny. Suma momentów względem A daje jedno równanie z niewiadomą B_y.',
    `B_yL-P\\sin\\alpha\\frac{L}{2}=0\\quad\\Rightarrow\\quad B_y=\\frac{P\\sin\\alpha}{2}=${tex(BY, 3)}\\ \\mathrm{kN}`,
    'Składowa pozioma P_x nie daje momentu względem A, bo jej linia działania przechodzi przez ten punkt.',
    'moment',
  ),
  sourceScene(
    'Rzuty sił i reakcje podpór',
    'Znając B_y, piszemy sumy rzutów na osie x i y. Reakcja A_x równoważy poziomą składową P, a A_y wraz z B_y równoważy pionową składową P. Wynik A_x jest ujemny, czyli działa w lewo.',
    `A_x+P\\cos\\alpha=0,\\qquad A_y+B_y-P\\sin\\alpha=0\\quad\\Rightarrow\\quad A_x=${tex(AX, 3)},\\ A_y=${tex(AY, 3)}\\ \\mathrm{kN}`,
    'Wartości A_y i B_y są równe, ponieważ siła P leży dokładnie w połowie rozpiętości.',
    'reactions',
  ),
  sourceScene(
    'Znaki i zwroty reakcji',
    'Znak jest częścią odpowiedzi. A_x < 0 oznacza zwrot w lewo, przeciwnie do osi x. A_y > 0 i B_y > 0 oznaczają działanie do góry. Nie zmieniamy znaków na dodatnie, bo opisują one rzeczywiste zwroty reakcji.',
    `A_x<0\\ (\\leftarrow),\\qquad A_y>0\\ (\\uparrow),\\qquad B_y>0\\ (\\uparrow)`,
    'Pozioma składowa P ściska przegub A, dlatego reakcja A_x jest skierowana w lewo.',
    'signs',
  ),
  sourceScene(
    'Interpretacja wyniku',
    'Reakcje pionowe dzielą składową pionową siły P na dwie równe części. Gdyby siła P działała bliżej jednej podpory, bliższa podpora przejęłaby większą część obciążenia. Składowa pozioma obciąża wyłącznie przegub A.',
    `A_x=-P\\cos\\alpha=${tex(AX, 3)}\\ \\mathrm{kN},\\qquad A_y=B_y=\\frac{P\\sin\\alpha}{2}=${tex(BY, 3)}\\ \\mathrm{kN}`,
    'Dla α = 60° składowa pionowa jest większa od poziomej, bo sin60° > cos60°.',
    'interpretation',
  ),
  sourceScene(
    'Niezależna kontrola równowagi',
    'Sprawdzamy moment względem drugiego bieguna B oraz sumy rzutów sił. Moment A_y równoważy moment pionowej składowej P, a poziome siły znoszą się. Reszty są rzędu błędów zaokrągleń.',
    `\\sum M_B=-A_yL+P\\sin\\alpha\\frac{L}{2}=0,\\qquad \\sum F_x=0,\\quad \\sum F_y=0`,
    'Kontrola wykorzystuje inny biegun momentów niż równanie główne, więc potwierdza wartości i znaki reakcji.',
    'check',
  ),
]

export default {
  ...createUkladZbieznySolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SkewLoadBeamAnimation }))),
} satisfies SolutionData
