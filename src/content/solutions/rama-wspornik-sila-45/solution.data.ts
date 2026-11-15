import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { sourceScene } from '../../solution-factories/core/source-task'
import { createReakcjeRamaSolution } from '../../solution-factories/factory-statyka-reakcje-rama/factory'
import { task } from './task'

const scenes = [
  sourceScene(
    'Model ramy i podpory',
    'Rama składa się z lewej kolumny, górnego pasa i pionowej odnogi w B. W A jest przegub (A_x, A_y), a w B rolka (tylko B_y). Punkt C na górnym pasie wyznacza koniec obciążenia ciągłego, a wolny koniec sięga x = 7 m.',
    String.raw`A=(0;0),\quad B=(5;0),\quad C=(3;2{,}5),\quad \text{wolny koniec }(7;2{,}5)\ \mathrm{m}`,
    'Oś x w prawo, oś y w górę; wymiary poziome 3 + 2 + 2 m i wysokość 2,5 m.',
    'model',
  ),
  sourceScene(
    'Geometria i obciążenia',
    'Obciążenie ciągłe q działa w dół na odcinku 3 m, więc zastępujemy je siłą Q = q·3 = 7,2 kN w środku tego odcinka. Siła P₁ = 13 kN działa pod 45° do poziomu, a moment M = 10 kN·m przy B kręci zgodnie ze wskazówkami zegara.',
    String.raw`Q=q\cdot3=7{,}2\ \mathrm{kN},\quad M=10\ \mathrm{kN\cdot m},\quad P_1=13\ \mathrm{kN}\ \text{pod }45^\circ`,
    'Składowe P₁ są równe co do modułu, bo kąt wynosi 45°.',
    'loads',
  ),
  sourceScene(
    'Rzuty sił i składowe P₁',
    'Siłę ukośną rozkładamy na składowe poziome i pionowe. Znaki wynikają ze zwrotów strzałek: P₁ działa w dół i w lewo, więc obie jej składowe są ujemne. Rzuty sił dają pierwsze dwa równania równowagi.',
    String.raw`\begin{aligned}P_{1x}&=-13\cos45^\circ=-9{,}192\ \mathrm{kN}\\ P_{1y}&=-13\sin45^\circ=-9{,}192\ \mathrm{kN}\\ \sum F_x&=0:\quad A_x-9{,}192=0\\ \sum F_y&=0:\quad A_y+B_y-7{,}2-9{,}192=0\end{aligned}`,
    'Przyjęto dodatnie zwroty zgodne z osiami x i y.',
    'diagram',
  ),
  sourceScene(
    'Równanie momentów względem A',
    'Biegun w A eliminuje A_x i A_y. Moment siły P₁ zawiera zarówno ramię poziome 7 m, jak i pionowe 2,5 m, dlatego nie można pominąć żadnej składowej. Moment skupiony jest ujemny, bo kręci zgodnie z zegarem.',
    String.raw`\sum M_A=5B_y-1{,}5\cdot7{,}2-7\cdot9{,}192+2{,}5\cdot9{,}192-10=0`,
    '5B_y = 62,166 ⇒ B_y = 12,433 kN',
    'moment',
  ),
  sourceScene(
    'Reakcje z pozostałych równań',
    'Po wyznaczeniu B_y wracamy do rzutów sił. A_x równoważy poziomą składową P₁, a A_y uzupełnia bilans pionowy z Q, P₁ i B_y. Wszystkie reakcje są dodatnie przy przyjętych zwrotach.',
    String.raw`A_x=9{,}192\ \mathrm{kN},\quad B_y=12{,}433\ \mathrm{kN},\quad A_y=3{,}959\ \mathrm{kN}`,
    'Jednostki kN; moment w kN·m.',
    'reactions',
  ),
  sourceScene(
    'Interpretacja znaków i zwrotów',
    'Dodatnie A_x działa w prawo, dodatnie A_y i B_y w górę. Moment M jest zewnętrzny i zgodny z zegarem, więc w równaniu momentów występuje ze znakiem ujemnym. Nie zmieniamy znaku wyniku na „ładniejszy”.',
    String.raw`A_x>0\ (+x),\quad A_y>0\ (+y),\quad B_y>0\ (+y)`,
    'Reakcja pionowa B_y jest największa, bo B leży daleko od obciążenia q.',
    'signs',
  ),
  sourceScene(
    'Niezależna kontrola równowagi',
    'Wyniki podstawiamy do sum sił oraz momentu względem B, czyli bieguna innego niż A. Reszty są rzędu błędu zmiennoprzecinkowego, co potwierdza znaki, ramiona i wartości reakcji.',
    String.raw`\sum F_x=0,\quad \sum F_y=0,\quad \sum M_B\approx0`,
    'ΣM_B: 9,192·2,5 − 9,192·2 − 7,2·3,5 + 10 ≈ 0',
    'check',
  ),
]

export default {
  ...createReakcjeRamaSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FrameA09Animation }))),
} satisfies SolutionData
