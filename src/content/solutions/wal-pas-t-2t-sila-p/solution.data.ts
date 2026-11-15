import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createShaftThreeSolution, shaftScene } from '../../solution-factories/factory-shaft-three/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  shaftScene(
    'Model wału z pasem',
    'Lewa tarcza o promieniu R jest obciążona pasem o naciągach T i t, przy czym T = 2t. Na małej tarczy o promieniu r działa pionowa siła P, a na prawej tarczy o promieniu c pionowa siła Q. Ciężar G działa w połowie odległości między tarczami. Wszystkie obciążenia są prostopadłe do osi wału y.',
    String.raw`T=2t,\quad t=2{,}0\ \mathrm{kN},\quad T=4{,}0\ \mathrm{kN},\quad G=2,\ Q=1\ \mathrm{kN}`,
    'A — przegub kulisty, B — łożysko cylindryczne o osi y.',
    'model',
  ),
  shaftScene(
    'Geometria i wymiary',
    'Odległości od A wyznaczają położenie tarcz: G w y = a/2, mała tarcza z P w y = a, łożysko B w y = a + c, a prawa tarcza z Q w y = a + b. Promienie R, r i c określają ramiona momentów.',
    String.raw`a=0{,}40,\ b=0{,}30,\ c=0{,}20\ \mathrm{m};\quad R=0{,}20,\ r=0{,}10\ \mathrm{m}`,
    'Naciągi pasa działają w punktach (±R; 0; 0).',
    'diagram',
  ),
  shaftScene(
    'Obciążenia pasa i siły skupione',
    'Naciągi t i T działają pionowo w dół po obu stronach lewej tarczy. Ich wypadkowy moment względem osi wału wynosi −R·t, bo T = 2t. Siła Q daje moment +cQ, a P — moment +rP.',
    String.raw`\mathbf t=(0;0;-2),\quad \mathbf T=(0;0;-4),\quad \mathbf Q=(0;0;-1),\quad \mathbf P=(0;0;-P)`,
    'Moment pasa: R·t − R·T = −R·t = −0,40 kN·m.',
    'loads',
  ),
  shaftScene(
    'Moment względem osi wału',
    'Równanie momentów względem y zawiera pas, siłę Q i szukaną siłę P. Po podstawieniu T = 2t i wartości liczbowych otrzymujemy P = 2 kN, czyli połowę naciągu T.',
    String.raw`\sum M_y:\ -Rt+cQ+rP=0\ \Rightarrow\ P=2{,}000\ \mathrm{kN}`,
    'Pas daje moment ujemny, Q i P dodatnie — dlatego P jest dodatnie przy zwrocie w dół.',
    'moment',
  ),
  shaftScene(
    'Momenty względem x i z',
    'W momentach względem x i z naciągi pasa działają na osi y, więc nie dają ramienia. Moment względem x tworzą G, Q, P i B_z, a moment względem z zeruje się, bo nie ma sił poziomych.',
    String.raw`\sum M_x:\ -\tfrac{a}{2}G-(a+b)Q-aP+(a+c)B_z=0\Rightarrow B_z=3{,}167\ \mathrm{kN}`,
    String.raw`\sum M_z:\ (a+c)B_x=0\ \Rightarrow\ B_x=0`,
    'Brak sił poziomych oznacza B_x = 0 i A_x = 0.',
    'moment',
  ),
  shaftScene(
    'Rzuty sił i reakcje w A',
    'Wszystkie obciążenia są pionowe, dlatego A_x = A_y = 0. Suma sił pionowych daje A_z, które równoważy pas, Q, P oraz ciężar G pomniejszone o reakcję B_z.',
    String.raw`A_x=A_y=0,\quad A_z=G+t+T+Q+P-B_z=7{,}833\ \mathrm{kN}`,
    'A_z jest duże, bo lewa tarcza z pasem leży blisko podpory A.',
    'reactions',
  ),
  shaftScene(
    'Wypadkowe reakcje i znaki',
    'Reakcje są pionowe, więc ich wypadkowe są równe składowym z. Większa część obciążenia trafia do A, ponieważ pas i siła P działają blisko tego łożyska.',
    String.raw`R_A=7{,}833\ \mathrm{kN},\qquad R_B=3{,}167\ \mathrm{kN}`,
    'P > 0 oznacza zwrot w dół, zgodny z przyjętym kierunkiem siły P.',
    'signs',
  ),
  shaftScene(
    'Niezależna kontrola równowagi',
    'Kontrola względem K = (0; 0,10; 0,10) obejmuje pas, Q, P, G oraz reakcje. Wszystkie reszty sił i momentów są zerowe, co potwierdza znaki i ramiona.',
    String.raw`\sum F=0,\quad \sum M_K=0,\quad K=(0;0{,}10;0{,}10)\ \mathrm{m}`,
    'Niezależnie sprawdzono moment względem osi wału i osi poprzecznych.',
    'check',
  ),
]

export default {
  ...createShaftThreeSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
