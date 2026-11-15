import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createThreeSceneSolution, threeScene } from '../../solution-factories/factory-three-scene/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  threeScene(
    'Model układu trzech płytek',
    'Trzy prostopadłe płytki tworzą sztywne ciało. Podpora A jest przegubem kulistym (3 reakcje), a B łożyskiem cylindrycznym o osi y (2 reakcje). Obciążenie Q działa pionowo nad lewą płytką, ciężar G w środku układu, a szukana siła P jest równoległa do osi x.',
    String.raw`\text{trzy płytki},\quad A=(0;0;0),\quad B=(0;0{,}6;0)`,
    'Oś y wzdłuż układu, oś z pionowo, oś x prostopadła.',
    'model',
  ),
  threeScene(
    'Geometria i wymiary',
    'Wymiary a, b, c wyznaczają położenie płytek i łożyska B. Promienie R i r są równe i wynoszą 0,10 m. Warunek CD ⟂ Ax oznacza, że ramię CD leży w płaszczyźnie prostopadłej do osi x.',
    String.raw`a=0{,}2,\ b=0{,}1,\ c=0{,}3\ \mathrm{m},\quad R=r=0{,}1\ \mathrm{m}`,
    'Q jest prostopadłe do osi y, a P równoległe do osi x.',
    'diagram',
  ),
  threeScene(
    'Obciążenia i szukana siła P',
    'Q = 4 kN działa pionowo w punkcie (a; 0; R), a G = 2 kN w punkcie (0; a; 0). Siła P działa w punkcie C = (0; a+b+c; r) przeciwnie do osi x. Mimośród Q względem osi y wynosi a, a ramię P względem osi z — r.',
    String.raw`\mathbf Q=(0;0;-4),\quad \mathbf G=(0;0;-2),\quad \mathbf P=(-P;0;0)`,
    'Mimośród Q i ramię P dają momenty względem osi wału y.',
    'loads',
  ),
  threeScene(
    'Moment względem osi y',
    'Moment względem osi y zawiera mimośród Q i ramię r siły P. To równanie wyznacza P; pozostałe obciążenia nie dają momentu względem y.',
    String.raw`\sum M_y:\ 0{,}2\cdot4-0{,}1P=0\ \Rightarrow\ P=8{,}000\ \mathrm{kN}`,
    'Duża wartość P wynika z krótkiego ramienia r = 0,10 m.',
    'moment',
  ),
  threeScene(
    'Momenty względem x i z',
    'Moment względem x daje pionową reakcję B_z, a moment względem z — poziomą B_x. Biegunem jest A, więc składowe w A nie wchodzą do tych równań.',
    String.raw`\sum M_x:\ -0{,}2\cdot2+0{,}6B_z=0\ \Rightarrow\ B_z=0{,}667\ \mathrm{kN}`,
    String.raw`\sum M_z:\ 0{,}6P-0{,}6B_x=0\ \Rightarrow\ B_x=8{,}000\ \mathrm{kN}`,
    'moment',
  ),
  threeScene(
    'Rzuty sił i reakcje w A',
    'Sumy sił uzupełniają składowe reakcji w A. A_x zeruje się, bo B_x równoważy całą siłę P. A_y również jest zerowe, bo układ nie przenosi obciążenia wzdłuż osi y.',
    String.raw`B_x=8{,}000,\quad A_x=0,\quad A_z=5{,}333,\quad A_y=0\ \mathrm{kN}`,
    'A_z równoważy pionowe ciężary Q i G.',
    'reactions',
  ),
  threeScene(
    'Wypadkowe reakcje i znaki',
    'Wypadkowa reakcja łożyska jest modułem składowych prostopadłych do osi y. B_x jest dodatnie i równe P, a A_z dodatnie równoważy ciężary. Znaki wynikają z przyjętych zwrotów osi.',
    String.raw`R_A=5{,}333\ \mathrm{kN},\quad R_B=8{,}028\ \mathrm{kN}`,
    'P > 0 przy zwrocie −x, B_x > 0 przy zwrocie +x.',
    'signs',
  ),
  threeScene(
    'Niezależna kontrola równowagi',
    'Kontrola względem punktu K = (0; 0,10; 0) używa innych ramion niż biegun A. Sumy sił i momentów znikają z dokładnością numeryczną, co potwierdza wartości i znaki reakcji.',
    String.raw`\sum F=0,\quad \sum M_K=0,\quad K=(0;0{,}10;0)\ \mathrm{m}`,
    'Sprawdzono wszystkie trzy rzuty sił i wszystkie trzy momenty względem osi.',
    'check',
  ),
]

export default {
  ...createThreeSceneSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
