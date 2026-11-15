import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createShaftThreeSolution, shaftScene } from '../../solution-factories/factory-shaft-three/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  shaftScene(
    'Model wału i podpory',
    'Wał leży wzdłuż osi y. W A jest przegub kulisty (3 reakcje), a w B łożysko cylindryczne o osi y (2 reakcje). Na małej tarczy o promieniu r = 0,05 m działa lina Q pod kątem 45°, a na dużej tarczy o promieniu R = 0,15 m ciężar G i pozioma siła P równoległa do osi x.',
    String.raw`\text{oś wału }y,\quad A=(0;0;0),\quad B=(0;0{,}6;0)`,
    'A — przegub kulisty, B — łożysko cylindryczne; oś z pionowo w górę.',
    'model',
  ),
  shaftScene(
    'Geometria i wymiary',
    'Położenia tarcz odmierzamy od A: mała tarcza C leży w y = a, a duża w y = a + b. Łożysko B jest w y = a + b + c. Promienie tarcz wyznaczają ramiona sił Q i P.',
    String.raw`a=0{,}2,\ b=0{,}3,\ c=0{,}1\ \mathrm{m},\quad R=0{,}15,\ r=0{,}05\ \mathrm{m}`,
    'Oś x prostopadła do wału, oś z pionowa.',
    'diagram',
  ),
  shaftScene(
    'Obciążenia i szukana siła P',
    'Ciężar G działa pionowo w środku dużej tarczy, a Q pionowo w punkcie D liny na małej tarczy. Siła P działa stycznie na górze dużej tarczy, w punkcie (0; a+b; R), i jest skierowana przeciwnie do osi x.',
    String.raw`\mathbf G=(0;0;-20),\quad \mathbf Q=(0;0;-2),\quad \mathbf P=(-P;0;0)`,
    'Linia CD jest prostopadła do osi wału, więc Q ma ramię w płaszczyźnie x–z.',
    'loads',
  ),
  shaftScene(
    'Moment względem osi wału',
    'Moment względem osi y pochodzi tylko od Q i P. Poziomy mimośród Q wynosi r·cos45°, a ramię P jest równe R. Z równania M_y od razu wyznaczamy szukaną siłę P.',
    String.raw`\sum M_y:\ 0{,}05\cos45^\circ\cdot2-0{,}15P=0\ \Rightarrow\ P=0{,}471\ \mathrm{kN}`,
    'Q daje moment dodatni, a P — ujemny.',
    'moment',
  ),
  shaftScene(
    'Momenty względem x i z',
    'Moment względem x daje reakcję pionową B_z, a moment względem z — poziomą B_x. W obu równaniach biegunem jest A, więc składowe reakcji w A nie występują.',
    String.raw`\sum M_x:\ -0{,}5\cdot20-0{,}2\cdot2+0{,}6B_z=0\ \Rightarrow\ B_z=17{,}333\ \mathrm{kN}`,
    String.raw`\sum M_z:\ -0{,}6B_x+0{,}5P=0\ \Rightarrow\ B_x=0{,}393\ \mathrm{kN}`,
    'moment',
  ),
  shaftScene(
    'Rzuty sił i reakcje w A',
    'Po wyznaczeniu B_x i B_z sumy sił dają składowe w A. Składowa A_y jest zerowa, bo żadne obciążenie nie działa wzdłuż osi wału.',
    String.raw`B_x=0{,}393,\quad A_x=0{,}079,\quad A_z=4{,}667,\quad A_y=0\ \mathrm{kN}`,
    'Jednostki kN; znak dodatni oznacza zgodność z przyjętym zwrotem osi.',
    'reactions',
  ),
  shaftScene(
    'Wypadkowe reakcje łożysk',
    'Wypadkowa reakcja łożyska jest modułem składowych prostopadłych do osi wału. Duża wartość R_B wynika z dużego ciężaru G i położenia łożyska B daleko od obciążenia.',
    String.raw`R_A=\sqrt{A_x^2+A_z^2}=4{,}667\ \mathrm{kN},\quad R_B=\sqrt{B_x^2+B_z^2}=17{,}338\ \mathrm{kN}`,
    'Składowe wzdłuż osi wału nie zwiększają nośności poprzecznej łożyska.',
    'signs',
  ),
  shaftScene(
    'Niezależna kontrola równowagi',
    'Wyniki podstawiamy do sum sił i momentów względem punktu K = (0; 0,30; 0), którego nie użyto jako głównego bieguna. Wszystkie sześć reszt jest rzędu błędu zmiennoprzecinkowego.',
    String.raw`\sum F=0,\quad \sum M_K=0,\quad K=(0;0{,}30;0)\ \mathrm{m}`,
    'Kontrola potwierdza znaki i ramiona wszystkich sił.',
    'check',
  ),
]

export default {
  ...createShaftThreeSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
