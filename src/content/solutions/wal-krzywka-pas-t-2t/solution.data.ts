import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createShaftThreeSolution, shaftScene } from '../../solution-factories/factory-shaft-three/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  shaftScene(
    'Model wału, krzywki i pasa',
    'Wał leży wzdłuż osi y. W A jest przegub kulisty (3 reakcje), a w B łożysko cylindryczne o osi y (2 reakcje). Przy A osadzono krzywkę o promieniu r, na której działa pionowa siła P, a na końcu wału tarczę pasa o promieniu R z naciągami t i T. Ciężar G działa w środku krzywki.',
    String.raw`A=(0;0;0),\quad B=(0;0{,}30;0),\quad \text{tarcza pasa }y=0{,}45\ \mathrm{m}`,
    'Oś y wzdłuż wału, oś z pionowo, oś x prostopadła do y i z.',
    'model',
  ),
  shaftScene(
    'Geometria i wymiary',
    'Położenia elementów odmierza się od A: łożysko B leży w y = a, a tarcza pasa w y = a + b + c = 0,45 m. Promień tarczy R jest trzykrotnie większy od promienia krzywki r, co decyduje o proporcji momentów od pasa i siły P.',
    String.raw`a=0{,}30,\ b=0{,}10,\ c=0{,}05\ \mathrm{m},\quad R=0{,}18,\ r=0{,}06\ \mathrm{m}`,
    'Naciągi pasa działają stycznie w punktach (0; 0,45; ±0,18).',
    'diagram',
  ),
  shaftScene(
    'Obciążenia i szukana siła P',
    'Ciężar G = 1 kN działa pionowo w środku krzywki. Naciągi t = 1,5 kN i T = 3 kN działają w kierunku +x, odpowiednio w górnym i dolnym punkcie tarczy. Szukana siła P działa pionowo w dół w punkcie (r; 0; 0), więc ma mimośród r względem osi wału.',
    String.raw`\mathbf G=(0;0;-1),\quad \mathbf t=(1{,}5;0;0),\quad \mathbf T=(3;0;0),\quad \mathbf P=(0;0;-P)`,
    'Warunek T = 2t jest spełniony: T = 3 kN, t = 1,5 kN.',
    'loads',
  ),
  shaftScene(
    'Moment względem osi wału y',
    'Moment względem osi y tworzą wyłącznie naciągi pasa i siła P. Naciąg t daje moment +R·t, naciąg T moment −R·T, a siła P moment +r·P. Po podstawieniu danych otrzymujemy P = 4,500 kN.',
    String.raw`\sum M_y:\ R(t-T)+rP=0\ \Rightarrow\ 0{,}18(1{,}5-3)+0{,}06P=0\ \Rightarrow\ P=4{,}500\ \mathrm{kN}`,
    'Pas daje moment −0,27 kN·m, a siła P moment +0,27 kN·m.',
    'moment',
  ),
  shaftScene(
    'Momenty względem osi x i z',
    'Moment względem osi x pochodzi tylko od reakcji B_z, bo obciążenia pasa i P leżą w płaszczyznach przechodzących przez A. Moment względem osi z tworzą oba naciągi pasa na ramieniu y = 0,45 m oraz pozioma reakcja B_x na ramieniu a = 0,30 m.',
    String.raw`\sum M_x:\ aB_z=0\ \Rightarrow\ B_z=0;\quad \sum M_z:\ -y_W(t+T)-aB_x=0\ \Rightarrow\ B_x=-6{,}750\ \mathrm{kN}`,
    'Ujemne B_x oznacza zwrot przeciwny do osi x.',
    'moment',
  ),
  shaftScene(
    'Rzuty sił i reakcje w A',
    'Sumy sił uzupełniają składowe reakcji w przegubie A. Siły poziome pasa i reakcja B_x równoważą się częściowo, dlatego A_x = 2,250 kN. Składowa A_y jest zerowa, bo żadne obciążenie nie działa wzdłuż osi wału. Pionowa A_z równoważy ciężar G i siłę P.',
    String.raw`A_x=2{,}250,\quad A_y=0,\quad A_z=5{,}500\ \mathrm{kN},\quad B_x=-6{,}750,\quad B_z=0\ \mathrm{kN}`,
    'A_z = G + P = 1 + 4,5 = 5,5 kN, bo B_z = 0.',
    'reactions',
  ),
  shaftScene(
    'Wypadkowe reakcje i znaki',
    'Wypadkowa reakcja łożyska jest modułem składowych prostopadłych do osi wału. Duże B_x wynika z momentu obu naciągów pasa, a A_z z konieczności utrzymania pionowego ciężaru i siły P. Znaki odnoszą się do przyjętych zwrotów osi.',
    String.raw`R_A=\sqrt{A_x^2+A_z^2}=5{,}942\ \mathrm{kN},\quad R_B=|B_x|=6{,}750\ \mathrm{kN}`,
    'P > 0 przy zwrocie −z, B_x < 0 przy zwrocie −x.',
    'signs',
  ),
  shaftScene(
    'Niezależna kontrola równowagi',
    'Wyniki podstawiamy do sum sił i momentów względem punktu K = (0; 0,20; 0,10) m, którego nie użyto jako głównego bieguna. Wszystkie sześć reszt jest rzędu błędu zmiennoprzecinkowego, co potwierdza wartości i znaki reakcji.',
    String.raw`\sum F=0,\quad \sum M_K=0,\quad K=(0;0{,}20;0{,}10)\ \mathrm{m}`,
    'Kontrola obejmuje moment względem osi wału i obu osi poprzecznych.',
    'check',
  ),
]

export default {
  ...createShaftThreeSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
