import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createShaftThreeSolution, shaftScene } from '../../solution-factories/factory-shaft-three/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  shaftScene(
    'Model wału z tarczą i pasem',
    'Wał leży wzdłuż osi y. W A jest przegub kulisty (3 reakcje), a w B łożysko cylindryczne o osi y (2 reakcje). Na początku wału osadzono dużą tarczę o promieniu R, a na końcu małą tarczę pasa o promieniu r. Lina Q działa pod kątem 45°, pas ma naciągi t i T, a ciężar G działa w środku dużej tarczy.',
    String.raw`A=(0;0;0),\quad B=(0;0{,}30;0),\quad \text{mała tarcza }y=0{,}90\ \mathrm{m}`,
    'Warunki t ∥ Ax, Q ⟂ Ay, P ∥ Az i T = 2t ustalają kierunki obciążeń.',
    'model',
  ),
  shaftScene(
    'Geometria i wymiary',
    'Wymiary a, b i c wyznaczają położenie łożyska B i małej tarczy pasa. Promień dużej tarczy R = 0,20 m jest ramieniem liny Q i siły P, a promień małej tarczy r = 0,10 m jest ramieniem naciągów pasa.',
    String.raw`a=0{,}30,\ b=0{,}40,\ c=0{,}20\ \mathrm{m},\quad R=0{,}20,\ r=0{,}10\ \mathrm{m}`,
    'Mała tarcza leży w y = a+b+c = 0,90 m, a łożysko B w y = a = 0,30 m.',
    'diagram',
  ),
  shaftScene(
    'Obciążenia: lina, pas i siła P',
    'Ciężar G = 2 kN działa pionowo w środku dużej tarczy. Lina Q = 1 kN ma składowe Q·sin45° w osi x i −Q·cos45° w osi z. Naciąg t = 2 kN działa w kierunku +x, a T = 4 kN pod kątem 30° w płaszczyźnie x–z. Siła P działa pionowo w górę w punkcie (R; 0; 0).',
    String.raw`\mathbf Q=(1\sin45^\circ;0;-1\cos45^\circ),\quad \mathbf t=(2;0;0),\quad \mathbf T=(4\cos30^\circ;0;4\sin30^\circ)`,
    'Pas daje moment wypadkowy r·t − r·T·cos30° = 0,20 − 0,3464 kN·m.',
    'loads',
  ),
  shaftScene(
    'Moment względem osi wału y',
    'Moment względem osi y zawiera linę Q, oba naciągi pasa i siłę P. Lina daje +R·Q, naciąg t daje +r·t, naciąg T daje −r·T·cos30°, a siła P daje −R·P. Momenty liny i pasa prawie się znoszą, dlatego P jest małe.',
    String.raw`\sum M_y:\ RQ+rt-rT\cos30^\circ-RP=0\ \Rightarrow\ P=0{,}268\ \mathrm{kN}`,
    'Po podstawieniu: 0,20 + 0,20 − 0,3464 − 0,20P = 0.',
    'moment',
  ),
  shaftScene(
    'Moment względem osi x',
    'Moment względem osi x tworzy pionowa składowa naciągu T na ramieniu a + b + c oraz reakcja B_z na ramieniu a. Lina Q nie daje momentu względem x, bo działa w płaszczyźnie y = 0.',
    String.raw`\sum M_x:\ (a+b+c)T\sin30^\circ+aB_z=0\ \Rightarrow\ 0{,}90\cdot2+0{,}30B_z=0\ \Rightarrow\ B_z=-6{,}000\ \mathrm{kN}`,
    'Ujemne B_z oznacza, że łożysko B działa w dół.',
    'moment',
  ),
  shaftScene(
    'Moment względem osi z',
    'Moment względem osi z zawiera oba naciągi pasa na ramieniu y = 0,90 m oraz reakcję B_x na ramieniu a = 0,30 m. Naciągi dają moment ujemny, dlatego B_x jest ujemne i duże.',
    String.raw`\sum M_z:\ -y_S(t+T\cos30^\circ)-aB_x=0\ \Rightarrow\ B_x=-16{,}392\ \mathrm{kN}`,
    'Po podstawieniu: −0,90(2 + 3,4641) − 0,30B_x = 0.',
    'moment',
  ),
  shaftScene(
    'Rzuty sił, reakcje i znaki',
    'Sumy sił uzupełniają składowe reakcji w A. Poziome siły liny i pasa są duże, dlatego A_x = 10,221 kN równoważy ich wypadkową razem z ujemnym B_x. Składowa A_y zeruje się, a A_z równoważy ciężary i pionowe składowe pozostałych sił.',
    String.raw`A_x=10{,}221,\ A_y=0,\ A_z=6{,}439\ \mathrm{kN};\quad R_A=12{,}080,\ R_B=17{,}456\ \mathrm{kN}`,
    'Znaki odnoszą się do osi x, y, z; B_x < 0 i B_z < 0.',
    'reactions',
  ),
  shaftScene(
    'Niezależna kontrola równowagi',
    'Kontrola względem K = (0; 0,20; 0,10) m obejmuje linę Q, pas, siłę P, ciężar G oraz reakcje. Wszystkie reszty sił i momentów są zerowe, co potwierdza bilans mimo częściowego zniesienia momentów.',
    String.raw`\sum F=0,\quad \sum M_K=0,\quad K=(0;0{,}20;0{,}10)\ \mathrm{m}`,
    'Niezależnie sprawdzono moment względem osi wału i obu osi poprzecznych.',
    'check',
  ),
]

export default {
  ...createShaftThreeSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
