import { lazy } from 'react'
import type { SolutionScene } from '../../../types'
import type { SolutionData } from '../../model'
import { createThreeSceneSolution, threeScene } from '../../solution-factories/factory-three-scene/factory'
import { meta } from './task'

const scenes: SolutionScene[] = [
  threeScene(
    'Model ramy przestrzennej',
    'Sześć prętów tworzy prostopadłościenną ramę o podstawie a × b i wysokości c. Obciążenie Q działa pionowo w górnym narożu A, ciężar G w środku górnej płaszczyzny, a w narożu C działa pozioma siła równoważąca P skierowana w −x. Podpora A jest przegubem kulistym, a B łożyskiem cylindrycznym o osi y.',
    String.raw`\text{rama }a\times b\times c,\quad A=(0;0;0),\quad B=(0;4;0),\quad C=(4;0;4{,}5)`,
    'Oś z jest pionowa, x i y leżą w podstawie; pręty przenoszą tylko siły osiowe.',
    'model',
  ),
  threeScene(
    'Geometria i dane',
    'Wymiary ramy wynikają z położenia naroży. Q leży na pionowej linii przechodzącej przez A, dlatego nie daje momentu względem A. Ciężar G ma mimośrody b/2 oraz a/2, więc generuje momenty względem obu osi podstawy.',
    String.raw`a=4{,}0,\ b=4{,}0,\ c=4{,}5\ \mathrm{m};\quad Q=20,\ G=18\ \mathrm{kN}`,
    'Naroża podstawy: A, B oraz dwa pozostałe; górna płaszczyzna leży na wysokości c.',
    'diagram',
  ),
  threeScene(
    'Obciążenia i niewiadoma P',
    'Obciążenie Q przyłożono w narożu A na wysokości c, a ciężar G w środku górnej płaszczyzny. Siła P działa poziomo w narożu C, przeciwnie do osi x. Reakcje A mają trzy składowe, a B dwie — razem sześć niewiadomych.',
    String.raw`\mathbf Q=(0;0;-20)\ \text{w }(0;0;4{,}5),\quad \mathbf G=(0;0;-18)\ \text{w }(2;2;4{,}5),\quad \mathbf P=(-P;0;0)`,
    'P jest przyłożona w punkcie C = (b; 0; c).',
    'loads',
  ),
  threeScene(
    'Momenty względem podstawy',
    'Moment względem osi x daje wyłącznie ciężar G, bo Q leży nad A. Moment względem y pochodzi od G i poziomej siły P. Moment względem z jest zerowy, ponieważ B_x działa na osi y i nie ma ramienia w podstawie.',
    String.raw`\sum M_x:\ -\tfrac{a}{2}G+aB_z=0;\quad \sum M_y:\ \tfrac{b}{2}G-bP=0;\quad \sum M_z:\ bB_x=0`,
    'Biegunem jest A; ramiona mierzymy wzdłuż krawędzi podstawy.',
    'moment',
  ),
  threeScene(
    'Rozwiązanie momentów',
    'Z równania M_x otrzymujemy B_z = G/2 = 9 kN. Równanie M_y wyznacza P = bG/(2c) = 8 kN, a równanie M_z potwierdza B_x = 0. Wartość P nie zależy od Q.',
    String.raw`B_z=\frac{G}{2}=9{,}000\ \mathrm{kN},\quad P=\frac{bG}{2c}=8{,}000\ \mathrm{kN},\quad B_x=0`,
    'Q nie występuje w równaniach momentów względem A.',
    'solution',
  ),
  threeScene(
    'Rzuty sił i reakcje w A',
    'Po wyznaczeniu B_z i P sumy sił dają składowe reakcji w A. A_x równoważy poziomą siłę P, A_z przejmuje pionowe obciążenia pomniejszone o B_z, a A_y pozostaje zerowe.',
    String.raw`A_x=P=8{,}000\ \mathrm{kN},\quad A_y=0,\quad A_z=Q+G-B_z=29{,}000\ \mathrm{kN}`,
    'A_x działa w +x, bo P działa w −x.',
    'reactions',
  ),
  threeScene(
    'Wypadkowe i interpretacja znaków',
    'Wypadkowa reakcja w A jest duża, bo A przejmuje prawie cały ciężar Q oraz większą część G. Reakcja B jest pionowa, a B_x znika. Dodatni znak P oznacza zgodność z przyjętym zwrotem −x.',
    String.raw`R_A=\sqrt{A_x^2+A_z^2}=30{,}083\ \mathrm{kN},\qquad R_B=B_z=9{,}000\ \mathrm{kN}`,
    'Znaki odnosimy do osi x, y, z; A_y = 0 wynika z braku obciążenia wzdłuż y.',
    'signs',
  ),
  threeScene(
    'Niezależna kontrola równowagi',
    'Wyniki podstawiamy do sum sił i momentów względem środka podstawy K = (2; 2; 0), którego nie użyto jako bieguna głównego. Wszystkie reszty są rzędu błędu zmiennoprzecinkowego.',
    String.raw`\sum F=0,\quad \sum M_K=0,\quad K=(2;2;0)\ \mathrm{m}`,
    'Kontrola obejmuje inne ramiona niż równania rozwiązujące, w tym moment od B_x.',
    'check',
  ),
]

export default {
  ...createThreeSceneSolution(meta),
  scenes,
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
