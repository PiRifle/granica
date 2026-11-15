import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createShaftThreeSolution, shaftScene } from '../../solution-factories/factory-shaft-three/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  shaftScene(
    'Model pionowego wału',
    'Oś wału jest pionowa (z). W podstawie A znajduje się przegub kulisty (3 reakcje), a na wysokości c łożysko cylindryczne B (2 reakcje). Walec o promieniu r ma wysokość c, a pozioma tarcza o promieniu R leży na wysokości H = c + a + b = 0,75 m.',
    String.raw`A=(0;0;0),\quad B=(0;0;0{,}15),\quad \text{tarcza }z=0{,}75\ \mathrm{m}`,
    'Oś z pionowo w górę, osie x i y w płaszczyźnie poziomej.',
    'model',
  ),
  shaftScene(
    'Geometria i wymiary',
    'Wymiary a, b i c wyznaczają wysokość tarczy oraz położenie łożyska B. Promień tarczy R = 0,20 m i promień walca r = 0,10 m określają ramiona momentów od sił poziomych i od ciężarów.',
    String.raw`a=0{,}20,\ b=0{,}40,\ c=0{,}15\ \mathrm{m},\quad R=0{,}20,\ r=0{,}10\ \mathrm{m},\quad H=c+a+b=0{,}75\ \mathrm{m}`,
    'Naciągi pasa leżą w płaszczyźnie poziomej tarczy.',
    'diagram',
  ),
  shaftScene(
    'Obciążenia: ciężary, pas i siła P',
    'Ciężar Q = 4 kN działa w dół na brzegu tarczy, a ciężar G = 3 kN w środku walca. Naciąg t = 3 kN działa w kierunku +y, a naciąg T = 6 kN pod kątem 30° do osi x. Szukana siła P działa poziomo w kierunku −y w punkcie (−R; 0; H).',
    String.raw`\mathbf Q=(0;0;-4),\quad \mathbf G=(0;0;-3),\quad \mathbf t=(0;3;0),\quad \mathbf T=(6\cos30^\circ;6\sin30^\circ;0)`,
    'T = 2t, a składowa pozioma T wynosi 6·cos30° = 5,196 kN.',
    'loads',
  ),
  shaftScene(
    'Moment względem osi pionowej z',
    'Ciężary Q i G są pionowe, więc nie dają momentu względem osi z. Moment tworzą naciągi pasa i siła P. Naciąg t daje +R·t, naciąg T daje −R·T·cos30°, a siła P daje +R·P. Z równania wynika P = 2,196 kN.',
    String.raw`\sum M_z:\ Rt-RT\cos30^\circ+RP=0\ \Rightarrow\ 0{,}20(3-5{,}196)+0{,}20P=0\ \Rightarrow\ P=2{,}196\ \mathrm{kN}`,
    'P jest dodatnie przy zwrocie −y, czyli działa przeciwnie do osi y.',
    'moment',
  ),
  shaftScene(
    'Moment względem osi y',
    'Moment względem osi y zawiera składową poziomą naciągu T, mimośród ciężaru Q oraz reakcję B_x. Siła t nie daje momentu względem y, bo jej linia działania przecina tę oś. Równanie wyznacza B_x = −20,647 kN.',
    String.raw`\sum M_y:\ HT\cos30^\circ-RQ+cB_x=0\ \Rightarrow\ B_x=-20{,}647\ \mathrm{kN}`,
    'Ujemne B_x oznacza zwrot przeciwny do osi x.',
    'moment',
  ),
  shaftScene(
    'Moment względem osi x',
    'Moment względem osi x tworzą oba naciągi pasa, siła P oraz reakcja B_y. Naciągi t i T dają moment ujemny, a siła P i reakcja B_y — dodatni. Po podstawieniu otrzymujemy B_y = −19,019 kN.',
    String.raw`\sum M_x:\ -Ht-HT\sin30^\circ+HP-cB_y=0\ \Rightarrow\ B_y=-19{,}019\ \mathrm{kN}`,
    'Moment od P równoważy częściowo moment od naciągów pasa.',
    'moment',
  ),
  shaftScene(
    'Rzuty sił i reakcje w A',
    'Sumy sił dają składowe reakcji w przegubie A. Naciąg T i reakcja B_x równoważą się w kierunku x, a naciągi pasa, P i B_y — w kierunku y. Pionowa reakcja A_z równoważy wyłącznie ciężary Q i G.',
    String.raw`A_x=15{,}451,\ A_y=15{,}215,\ A_z=Q+G=7{,}000\ \mathrm{kN};\quad R_A=22{,}787,\ R_B=28{,}072\ \mathrm{kN}`,
    'A_z nie zależy od pasa ani od siły P.',
    'reactions',
  ),
  shaftScene(
    'Niezależna kontrola równowagi',
    'Kontrola względem K = (0; 0; 0,30) m obejmuje wszystkie siły poziome i pionowe oraz momenty względem trzech osi. Reszty są zerowe, co potwierdza poprawność znaków i ramion.',
    String.raw`\sum F=0,\quad \sum M_K=0,\quad K=(0;0;0{,}30)\ \mathrm{m}`,
    'Sprawdzenie jest niezależne od punktu A użytego w równaniach głównych.',
    'check',
  ),
]

export default {
  ...createShaftThreeSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
