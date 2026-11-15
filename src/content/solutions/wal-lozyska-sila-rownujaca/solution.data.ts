import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createShaftThreeSolution, pl, shaftScene, tex } from '../../solution-factories/factory-shaft-three/factory'
import { meta } from './task'

const P = 10
const l = 0.5
const a = 1
const alpha = 30
const beta = 60
const F = P / Math.sqrt(3)
const sinBeta = Math.sin((beta * Math.PI) / 180)
const cosBeta = Math.cos((beta * Math.PI) / 180)
const rBx = (cosBeta * (P - 3 * F)) / 4
const rBz = (sinBeta * (P + F)) / 4
const rAx = P * cosBeta - F * cosBeta - rBx
const rAz = (P + F) * sinBeta - rBz
const rA = Math.hypot(rAx, rAz)
const rB = Math.hypot(rBx, rBz)

const scenes: SolutionScene[] = [
  shaftScene(
    'Model wału i łożysk',
    'Wał leży wzdłuż osi y i jest podparty w dwóch łożyskach A i B. Siły P i F działają w przekrojach prostopadłych do osi wału, na ramionach o długości l. Łożyska dają reakcje poprzeczne R_Ax, R_Az oraz R_Bx, R_Bz.',
    String.raw`A=(0;0;0),\quad B=(0;4a;0),\quad P=${pl(P, 0)}\ \mathrm{kN},\quad l=${pl(l, 1)}\ \mathrm{m}`,
    'Oś y jest osią wału; osie x i z leżą w przekroju poprzecznym.',
    'model',
  ),
  shaftScene(
    'Geometria i wymiary',
    'Od A odmierzamy odległości wzdłuż wału: przekrój z siłą P leży w y = a, przekrój z siłą F w y = 3a, a łożysko B w y = 4a. Oba ramiona mają długość l = 0,5 m. Kąty α = 30° i β = 60° opisują położenie ramion i kierunków sił w przekrojach.',
    String.raw`y_P=a=${pl(a, 0)}\ \mathrm{m},\quad y_F=3a,\quad y_B=4a,\quad l=${pl(l, 1)}\ \mathrm{m},\quad \alpha=${alpha}^\circ,\quad \beta=${beta}^\circ`,
    'Wymiary i kąty przepisano z odręcznego rozwiązania źródłowego.',
    'diagram',
  ),
  shaftScene(
    'Obciążenia w przekrojach',
    'Siła P = 10 kN działa na ramieniu l w pierwszym przekroju. Szukana siła F działa na ramieniu l w drugim przekroju. Składowe obu sił w płaszczyźnie przekroju zależą od kąta β, a wzajemne położenie ramion od kąta α.',
    String.raw`P_x=P\cos\beta,\quad P_z=P\sin\beta,\quad F_x=F\cos\beta,\quad F_z=F\sin\beta`,
    'Moment względem osi wału powstaje z iloczynu ramienia l i składowej stycznej siły.',
    'loads',
  ),
  shaftScene(
    'Warunek momentu względem osi wału',
    'Momenty względem osi y pochodzą tylko od P i F, bo reakcje łożysk leżą na osi wału. Po podzieleniu przez l otrzymujemy równanie na F. Kąty spełniają β − α = 30°, dlatego F = P/√3.',
    String.raw`\sum M_y:\ -F\sin\beta-P\cos\beta\sin\alpha+P\sin\beta\cos\alpha=0\quad\Rightarrow\quad F=\frac{P}{\sqrt3}=${tex(F)}\ \mathrm{kN}`,
    'To równanie odpowiada odrębnemu warunkowi równowagi momentów w źródle.',
    'moment',
  ),
  shaftScene(
    'Momenty względem osi poprzecznych',
    'Moment względem x wyznacza pionową reakcję B_z, a moment względem z — poziomą reakcję B_x. Biegunem jest A, więc składowe reakcji w A nie wchodzą do tych równań.',
    String.raw`R_{Bz}=${tex(rBz)}\ \mathrm{kN},\qquad R_{Bx}=${tex(rBx)}\ \mathrm{kN}`,
    'Ujemne B_x oznacza zwrot przeciwny do przyjętego dodatniego kierunku osi x.',
    'moment',
  ),
  shaftScene(
    'Rzuty sił i reakcje w A',
    'Po wyznaczeniu reakcji w B sumy sił w kierunkach x i z dają składowe w A. R_Ax równoważy poziomą wypadkową P, F i B_x, a R_Az pionową wypadkową tych sił i B_z.',
    String.raw`R_{Ax}=${tex(rAx)}\ \mathrm{kN},\qquad R_{Az}=${tex(rAz)}\ \mathrm{kN}`,
    'Jednostki kN; znaki odnoszą się do osi x i z przekroju poprzecznego.',
    'reactions',
  ),
  shaftScene(
    'Wypadkowe reakcje i znaki',
    'Wypadkowa reakcja łożyska jest modułem składowych poprzecznych. Reakcja w A jest większa, bo przejmuje dużą pionową składową obu sił. Znak R_Bx pozostaje ujemny, a R_Bz i R_Az dodatnie.',
    String.raw`R_A=\sqrt{R_{Ax}^2+R_{Az}^2}=${tex(rA)}\ \mathrm{kN},\qquad R_B=\sqrt{R_{Bx}^2+R_{Bz}^2}=${tex(rB)}\ \mathrm{kN}`,
    'Wartości zgodne z ręcznym rozwiązaniem: F = 5,773 kN.',
    'signs',
  ),
  shaftScene(
    'Niezależna kontrola równowagi',
    'Wyniki podstawiamy do sum sił w kierunkach x i z oraz do momentów względem osi x i z. Reszty są zerowe z dokładnością numeryczną, co potwierdza wartości F oraz znaki wszystkich reakcji.',
    String.raw`\sum F_x=0,\quad \sum F_z=0,\quad \sum M_x=0,\quad \sum M_z=0`,
    'Kontrola używa innych równań niż główny warunek momentu względem osi wału.',
    'check',
  ),
]

export default {
  ...createShaftThreeSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
