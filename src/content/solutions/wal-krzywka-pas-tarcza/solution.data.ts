import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createShaftThreeSolution, shaftScene } from '../../solution-factories/factory-shaft-three/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  shaftScene(
    'Model wału z krzywką',
    'Wał leży wzdłuż osi y. Przy A osadzono krzywkę o promieniu R, na której mimośrodzie r działa pionowa siła P. W połowie długości działa ciężar G, a na prawej tarczy o promieniu r pozioma siła Q styczna do obwodu. Podpora A jest przegubem kulistym, a B łożyskiem cylindrycznym o osi y.',
    String.raw`A=(0;0;0),\quad B=(0;0{,}9;0),\quad P\ \text{w }(0{,}1;0;0),\quad Q\ \text{w }(0;0{,}5;0{,}1)`,
    'Oś wału y, oś z pionowa, oś x prostopadła do wału.',
    'model',
  ),
  shaftScene(
    'Geometria i wymiary',
    'Położenia obciążeń odmierza się od A: G w y = a, Q w y = a + b, a łożysko B w y = a + b + c. Promienie krzywki i tarczy wyznaczają ramiona sił P i Q.',
    String.raw`a=0{,}30,\ b=0{,}20,\ c=0{,}40\ \mathrm{m},\quad R=0{,}15,\ r=0{,}10\ \mathrm{m}`,
    'Mimośród P i promień tarczy Q są równe r = 0,10 m.',
    'diagram',
  ),
  shaftScene(
    'Obciążenia i zwroty',
    'Ciężar G działa pionowo w dół, Q poziomo w −x, a P pionowo w dół. Siły Q i P są prostopadłe do osi wału, więc przenoszą się na łożyska poprzeczne. Siła P jest szukaną siłą równoważącą moment skręcający.',
    String.raw`\mathbf G=(0;0;-2),\quad \mathbf Q=(-3;0;0),\quad \mathbf P=(0;0;-P)`,
    'Q działa stycznie do prawej tarczy, P na mimośrodzie r krzywki.',
    'loads',
  ),
  shaftScene(
    'Moment względem osi wału',
    'Momenty względem osi y od Q i P mają przeciwne znaki, ale równe ramię r. Dlatego równanie M_y daje od razu P = Q, niezależnie od ciężaru G.',
    String.raw`\sum M_y:\ -rQ+rP=0\ \Rightarrow\ P=Q=3{,}000\ \mathrm{kN}`,
    'Q daje moment ujemny, P dodatni — po podstawieniu wartości momenty się znoszą.',
    'moment',
  ),
  shaftScene(
    'Momenty względem x i z',
    'Moment względem x pochodzi od ciężaru G i reakcji pionowej B_z. Moment względem z zawiera poziomą siłę Q na ramieniu y_Q = a + b oraz reakcję B_x.',
    String.raw`\sum M_x:\ -aG+(a+b+c)B_z=0\Rightarrow B_z=0{,}667\ \mathrm{kN}`,
    String.raw`\sum M_z:\ (a+b+c)B_x-(a+b)Q=0\Rightarrow B_x=1{,}667\ \mathrm{kN}`,
    'Biegunem jest A, więc składowe reakcji w A nie wchodzą do momentów.',
    'moment',
  ),
  shaftScene(
    'Rzuty sił i reakcje w A',
    'Po wyznaczeniu B_x i B_z sumy sił uzupełniają składowe w A. A_x równoważy różnicę Q i B_x, a A_z przejmuje ciężar G oraz pionową siłę P pomniejszone o B_z. Składowa A_y jest zerowa.',
    String.raw`A_x=Q-B_x=1{,}333\ \mathrm{kN},\quad A_y=0,\quad A_z=G+P-B_z=4{,}333\ \mathrm{kN}`,
    'Dodatnie A_x działa w +x, bo Q działa w −x, a B_x w +x.',
    'reactions',
  ),
  shaftScene(
    'Wypadkowe reakcje i znaki',
    'Reakcja w A jest wyraźnie większa, bo A przejmuje prawie cały ciężar oraz siłę P. Reakcja B jest mała, ponieważ łożysko B leży daleko od obciążeń pionowych. Znak P dodatni oznacza zwrot w dół.',
    String.raw`R_A=\sqrt{A_x^2+A_z^2}=4{,}534\ \mathrm{kN},\qquad R_B=\sqrt{B_x^2+B_z^2}=1{,}795\ \mathrm{kN}`,
    'P = Q wynika z równych ramion r, a nie z przypadkowej zbieżności liczb.',
    'signs',
  ),
  shaftScene(
    'Niezależna kontrola równowagi',
    'Kontrola względem K = (0; 0,20; 0) używa innych ramion niż biegun A. Sumy sił i momentów znikają, co potwierdza znaki Q, P i reakcji łożysk.',
    String.raw`\sum F=0,\quad \sum M_K=0,\quad K=(0;0{,}20;0)\ \mathrm{m}`,
    'Sprawdzono również moment względem osi wału.',
    'check',
  ),
]

export default {
  ...createShaftThreeSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
