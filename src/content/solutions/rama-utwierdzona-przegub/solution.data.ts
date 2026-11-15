import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { sourceScene } from '../../solution-factories/core/source-task'
import { createReakcjeRamaSolution } from '../../solution-factories/factory-statyka-reakcje-rama/factory'
import { task } from './task'

const scenes = [
  sourceScene(
    'Model ramy z przegubem pośrednim',
    'Lewa część ramy jest utwierdzona w A i połączona z prawą częścią przegubem C. Prawa część to ukośny pręt CB podparty rolką w B. W utwierdzeniu występują A_x, A_y i M_A, w przegubie moment jest zerowy, a w B tylko B_y.',
    String.raw`A=(0;0)\ \text{utwierdzenie},\quad C=(2;3)\ \text{przegub},\quad B=(5;0)\ \text{rolka}`,
    'Oś x w prawo, oś y w górę; wymiary poziome 2 + 1,5 + 1,5 m i wysokość 3 m.',
    'model',
  ),
  sourceScene(
    'Geometria i obciążenia',
    'Obciążenie ciągłe q działa poziomo w prawo na pionie o wysokości 3 m, więc daje Q = 7,8 kN na wysokości 1,5 m. Siła P₁ = 14 kN jest prostopadła do CB i działa w dół–w lewo w środku tego pręta. Moment M = 12 kN·m kręci zgodnie z zegarem.',
    String.raw`Q=q\cdot3=7{,}8\ \mathrm{kN},\quad P_1=14\ \mathrm{kN},\quad M=12\ \mathrm{kN\cdot m}`,
    'P₁ jest prostopadła do CB, więc jej składowe są równe: 14/√2 = 9,899 kN.',
    'loads',
  ),
  sourceScene(
    'Równowaga części prawej względem C',
    'Przegub pośredni pozwala odciąć prawą część CB. Moment w przegubie jest zerowy, więc na odciętą część działają tylko P₁ i B_y. Ramię B_y wynosi 3 m, a składowa pionowa P₁ ma ramię 1,5 m.',
    String.raw`\sum M_C^{(P)}=3B_y+1{,}5(-9{,}899)-(-1{,}5)(-9{,}899)=0`,
    '3B_y − 14,849 − 14,849 = 0 ⇒ B_y = 9,899 kN',
    'moment',
  ),
  sourceScene(
    'Rzuty sił i reakcja pozioma',
    'Z równania momentów względem C otrzymujemy B_y. Następnie suma sił poziomych daje A_x, a suma sił pionowych potwierdza, że A_y = 0, bo P₁ i B_y znoszą się pionowo.',
    String.raw`\begin{aligned}\sum F_x&=0: & A_x+7{,}8-9{,}899&=0\\ \sum F_y&=0: & A_y-9{,}899+9{,}899&=0\end{aligned}`,
    'A_x = 2,099 kN, A_y = 0',
    'reactions',
  ),
  sourceScene(
    'Moment utwierdzenia',
    'Moment reakcji w utwierdzeniu wyznaczamy z globalnego bilansu momentów względem A. Q daje moment zgodny z zegarem, podobnie M, a B_y przeciwny. Wynik ujemny oznacza moment reakcji zgodny z zegarem.',
    String.raw`\sum M_A:\ M_A-1{,}5\cdot7{,}8-3{,}5\cdot9{,}899+1{,}5\cdot9{,}899+5\cdot9{,}899-12=0`,
    'M_A = −5,998 kN·m',
    'reactions',
  ),
  sourceScene(
    'Interpretacja znaków',
    'A_x dodatnie działa w prawo, A_y = 0 nie ma zwrotu, B_y dodatnie działa w górę. M_A jest ujemne, więc reakcja momentu kręci zgodnie z zegarem — przeciwnie niż przyjęty dodatni obrót.',
    String.raw`A_x>0\ (+x),\quad A_y=0,\quad M_A<0,\quad B_y>0\ (+y)`,
    'Znak momentu jest częścią odpowiedzi, a nie błędem rachunku.',
    'signs',
  ),
  sourceScene(
    'Niezależna kontrola równowagi',
    'Sprawdzamy sumy sił oraz moment względem punktu innego niż A i C. Znikające reszty potwierdzają poprawność znaków, ramion i wartości reakcji.',
    String.raw`\sum F_x=0,\quad \sum F_y=-9{,}899+9{,}899=0,\quad \sum M\approx0`,
    'Kontrola obejmuje moment utwierdzenia i reakcję rolki.',
    'check',
  ),
]

export default {
  ...createReakcjeRamaSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.FrameA10Animation }))),
} satisfies SolutionData
