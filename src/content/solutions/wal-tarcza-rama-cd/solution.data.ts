import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createShaftThreeSolution, shaftScene } from '../../solution-factories/factory-shaft-three/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  shaftScene(
    'Model wału z tarczą i ramą CD',
    'Wał leży wzdłuż osi y. W A jest przegub kulisty (3 reakcje), a w B łożysko cylindryczne o osi y (2 reakcje). Na wale osadzono tarczę o promieniu R oraz ramę CD, do której przyłożono poziomą siłę P. Lina Q odchodzi stycznie pod kątem 45°, a ciężar G działa w środku tarczy.',
    String.raw`A=(0;0;0),\quad B=(0;0{,}35;0),\quad C=(0;0{,}45;0{,}40)\ \mathrm{m}`,
    'Warunki Q ⟂ Ay, P ∥ Ax i CD ⟂ Ax ustalają kierunki sił.',
    'model',
  ),
  shaftScene(
    'Geometria i wymiary',
    'Odległości a, b i c wyznaczają położenie tarczy, łożyska B i punktu C ramy. Promień tarczy R = 0,30 m jest ramieniem liny Q, a wysokość ramy r = 0,40 m jest ramieniem siły P względem osi wału.',
    String.raw`a=0{,}20,\ b=0{,}15,\ c=0{,}10\ \mathrm{m},\quad R=0{,}30,\ r=0{,}40\ \mathrm{m}`,
    'Punkt C leży w y = a+b+c = 0,45 m oraz z = r = 0,40 m.',
    'diagram',
  ),
  shaftScene(
    'Obciążenia: ciężar, lina i siła P',
    'Ciężar G = 3 kN działa pionowo w środku tarczy. Lina Q = 5 kN działa w punkcie 45° na obwodzie, więc ma składowe Q·sin45° w osi x i −Q·cos45° w osi z. Siła P działa w punkcie C przeciwnie do osi x.',
    String.raw`\mathbf G=(0;0;-3),\quad \mathbf Q=(5\sin45^\circ;0;-5\cos45^\circ),\quad \mathbf P=(-P;0;0)`,
    'Moment liny względem osi wału wynosi R·Q = 1,50 kN·m.',
    'loads',
  ),
  shaftScene(
    'Moment względem osi wału y',
    'Moment względem osi y tworzą lina Q i siła P. Lina daje moment +R·Q, a siła P moment −r·P. Ciężar G leży na osi wału, więc nie daje momentu względem y. Z równania otrzymujemy P = 3,750 kN.',
    String.raw`\sum M_y:\ RQ-rP=0\ \Rightarrow\ 0{,}30\cdot5-0{,}40P=0\ \Rightarrow\ P=3{,}750\ \mathrm{kN}`,
    'P jest większe od Q, bo ramię r jest większe od promienia tarczy R.',
    'moment',
  ),
  shaftScene(
    'Moment względem osi x',
    'Moment względem osi x tworzą ciężar G i pionowa składowa liny Q, oba na mimośrodzie a, oraz reakcja B_z na ramieniu a + b. Po podstawieniu danych otrzymujemy B_z = 3,735 kN.',
    String.raw`\sum M_x:\ -aG-aQ\cos45^\circ+(a+b)B_z=0\ \Rightarrow\ B_z=3{,}735\ \mathrm{kN}`,
    'Oba obciążenia pionowe działają w płaszczyźnie y = a, dlatego mają to samo ramię a.',
    'moment',
  ),
  shaftScene(
    'Moment względem osi z',
    'Moment względem osi z zawiera poziomą składową liny Q, siłę P na ramieniu y = a + b + c oraz reakcję B_x. Siła P jest przyłożona w punkcie C, dlatego jej ramię względem z wynosi 0,45 m, a nie r = 0,40 m.',
    String.raw`\sum M_z:\ -aQ\sin45^\circ+(a+b+c)P-(a+b)B_x=0\ \Rightarrow\ B_x=2{,}801\ \mathrm{kN}`,
    'Dodatnie B_x działa zgodnie z osią x, a ujemne A_x — przeciwnie.',
    'moment',
  ),
  shaftScene(
    'Rzuty sił, reakcje i znaki',
    'Sumy sił uzupełniają składowe reakcji w A. Pozioma składowa liny Q i siła P działają przeciwnie, dlatego A_x jest ujemne. Składowa A_y zeruje się, bo układ nie przenosi obciążenia wzdłuż osi wału. Pionowa A_z równoważy ciężar i składową Q.',
    String.raw`A_x=-2{,}587,\ A_y=0,\ A_z=2{,}801\ \mathrm{kN};\quad R_A=3{,}813,\ R_B=4{,}668\ \mathrm{kN}`,
    'Znaki odnoszą się do osi x, y, z; A_x < 0 i B_x > 0.',
    'reactions',
  ),
  shaftScene(
    'Niezależna kontrola równowagi',
    'Kontrola względem K = (0; 0,30; 0,10) m używa innych ramion niż biegun A. Wszystkie reszty sił i momentów są zerowe, co potwierdza znaki i wartości reakcji.',
    String.raw`\sum F=0,\quad \sum M_K=0,\quad K=(0;0{,}30;0{,}10)\ \mathrm{m}`,
    'Sprawdzono również moment względem osi x, który zależy od G, Q i B_z.',
    'check',
  ),
]

export default {
  ...createShaftThreeSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
