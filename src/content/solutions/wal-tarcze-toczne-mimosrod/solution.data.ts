import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createShaftThreeSolution, shaftScene } from '../../solution-factories/factory-shaft-three/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  shaftScene(
    'Model tarcz tocznych',
    'Dwie tarcze o promieniu R stykają się z podłożem w punktach przesuniętych o mały mimośród δ. W każdym styku działają pionowo ciężar G i normalna N = G, ale ich linie działania nie pokrywają się. Siła P działa poziomo na górze środkowej tarczy, a Q jest przyłożona na ramieniu r pod kątem 30°.',
    String.raw`N=G=3\ \mathrm{kN},\quad \delta=5\cdot10^{-3}R=0{,}001\ \mathrm{m},\quad R=0{,}20,\ r=0{,}15\ \mathrm{m}`,
    'A — przegub kulisty, B — łożysko cylindryczne o osi y.',
    'model',
  ),
  shaftScene(
    'Geometria układu',
    'Pierwsza para G₁–N₁ leży przy A, druga para G₂–N₂ w y = a. Łożysko B jest w y = a + b, a siła Q w y = a + b + c. Mimośród δ jest mały, ale jego moment względem osi wału jest kontrolowany.',
    String.raw`a=0{,}30,\ b=0{,}40,\ c=0{,}20\ \mathrm{m};\quad y_B=a+b=0{,}70,\ y_Q=a+b+c=0{,}90\ \mathrm{m}`,
    'Siła P działa w (0; a; R), a Q w (r; y_Q; 0).',
    'diagram',
  ),
  shaftScene(
    'Pary sił i obciążenie Q',
    'Ciężar G działa w dół, normalna N w górę. Każda para daje moment −δG względem osi wału, razem −2δG. Siła Q ma składową poziomą Q cos30° i pionową −Q sin30°, więc wnosi zarówno siłę, jak i moment.',
    String.raw`\mathbf Q=5\cos30^\circ\mathbf e_x-5\sin30^\circ\mathbf e_z,\quad M_y^{G-N}=-2\delta G=-0{,}006\ \mathrm{kN\cdot m}`,
    'Mimośród δ = 0,001 m nie jest pominięty w równaniu momentów.',
    'loads',
  ),
  shaftScene(
    'Moment względem osi wału',
    'Moment względem y zbiera dwa momenty par G–N, moment od Q oraz moment od poziomej siły P. To równanie wyznacza P. Wartość δ jest mała, ale wpływa na wynik.',
    String.raw`\sum M_y:\ -2\delta G+rQ\sin30^\circ-RP=0\ \Rightarrow\ P=1{,}845\ \mathrm{kN}`,
    'Moment od Q wynosi +rQ sin30° = +0,375 kN·m.',
    'moment',
  ),
  shaftScene(
    'Momenty względem x i z',
    'Pary G–N znoszą się w momentach względem osi x i z, bo N równoważy G. Zostają momenty od Q oraz reakcji B. Moment względem x wyznacza B_z, a względem z — B_x.',
    String.raw`\sum M_x:\ -y_Q Q\sin30^\circ+y_B B_z=0\Rightarrow B_z=3{,}214\ \mathrm{kN}`,
    String.raw`\sum M_z:\ y_P P-y_Q Q\cos30^\circ-y_B B_x=0\Rightarrow B_x=-4{,}777\ \mathrm{kN}`,
    'Znak minus przy B_x oznacza zwrot przeciwny do osi x.',
    'moment',
  ),
  shaftScene(
    'Rzuty sił i reakcje w A',
    'Sumy sił poziomych i pionowych dają składowe w A. A_x równoważy Q cos30° oraz P i B_x, a A_z jest ujemne, bo Q dociąża wał od góry. Składowa A_y pozostaje zerowa.',
    String.raw`A_x=2{,}291\ \mathrm{kN},\quad A_y=0,\quad A_z=-0{,}714\ \mathrm{kN}`,
    'Ujemne A_z to poprawny zwrot w dół, a nie błąd rachunku.',
    'reactions',
  ),
  shaftScene(
    'Wypadkowe i interpretacja znaków',
    'Reakcja B jest większa od A, bo dodatkowo przenosi poziomą składową Q oraz siłę P. Mały mimośród δ zmienia P tylko nieznacznie, ale jest widoczny w bilansie momentów.',
    String.raw`R_A=2{,}400\ \mathrm{kN},\qquad R_B=5{,}757\ \mathrm{kN}`,
    'P > 0 przy zwrocie −x; A_z < 0 oznacza reakcję skierowaną w dół.',
    'signs',
  ),
  shaftScene(
    'Niezależna kontrola równowagi',
    'Kontrola względem K = (0; 0,10; 0,10) obejmuje obie pary G–N, siłę Q, siłę P i reakcje. Wszystkie reszty sił i momentów są zerowe, co potwierdza bilans mimo małego δ.',
    String.raw`\sum F=0,\quad \sum M_K=0,\quad K=(0;0{,}10;0{,}10)\ \mathrm{m}`,
    'Niezależne ramiona potwierdzają znak B_x oraz ujemną reakcję A_z.',
    'check',
  ),
]

export default {
  ...createShaftThreeSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
