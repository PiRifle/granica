import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { pl, sourceScene, tex } from '../../solution-factories/core/source-task'
import { createUkladZbieznySolution } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'
import { G, L, ALPHA, RAD, N, AX, AY, momentCheck, task } from './task'

const scenes = [
  sourceScene(
    'Model pręta i ściany',
    `Jednorodny pręt o długości L = ${L} m tworzy ze ścianą kąt α = ${ALPHA}°, więc z poziomem kąt 90° − α = ${90 - ALPHA}°. Dolny koniec A jest w przegubie na podłodze, a górny koniec B dotyka gładkiej pionowej ściany. Przyjmujemy osie x w prawo i y w górę; moment dodatni jest przeciwny do wskazówek zegara.`,
    `L=${L}\\ \\mathrm{m},\\qquad \\alpha=${ALPHA}^\\circ,\\qquad G=${G}\\ \\mathrm{N}`,
    'Gładka ściana daje tylko reakcję poziomą, a przegub A dwie składowe.',
    'model',
    `Pręt L = ${L} m pod kątem α = ${ALPHA}° do ściany`,
  ),
  sourceScene(
    'Ciężar i reakcja ściany',
    `Ciężar jednorodnego pręta G = ${G} N działa pionowo w połowie długości. Reakcja ściany N jest prostopadła do gładkiej ściany, więc działa poziomo w lewo. Reakcja przegubu A ma składowe A_x i A_y.`,
    `\\mathbf G=(0;-${G})\\ \\mathrm{N},\\qquad \\mathbf N=(-N;0),\\qquad \\mathbf A=(A_x;A_y)`,
    'Kierunek N wynika wyłącznie z geometrii styku ze ścianą.',
    'loads',
    'G w połowie pręta, N poziomo w lewo',
  ),
  sourceScene(
    'Ramiona sił względem A',
    `Biegun w przegubie A eliminuje A_x i A_y z równania momentów. Reakcja N ma ramię pionowe L cosα = ${pl(L * Math.cos(RAD))} m. Ciężar G ma ramię poziome (L/2) sinα = ${pl((L / 2) * Math.sin(RAD))} m.`,
    `r_N=L\\cos\\alpha=${tex(L * Math.cos(RAD))}\\ \\mathrm{m},\\qquad r_G=\\frac{L}{2}\\sin\\alpha=${tex((L / 2) * Math.sin(RAD))}\\ \\mathrm{m}`,
    'Moment siły liczymy jako iloczyn wartości i ramienia, z odpowiednim znakiem obrotu.',
    'geometry',
    'Ramię N to L cosα, ramię G to (L/2) sinα',
  ),
  sourceScene(
    'Równanie momentów i wartość N',
    `Moment N obraca pręt zgodnie ze wskazówkami zegara, a moment ciężaru przeciwnie. Po przyjęciu znaków otrzymujemy jedno równanie z niewiadomą N. Rozwiązanie daje N = ${pl(N)} N.`,
    `N\\,L\\cos\\alpha-G\\frac{L}{2}\\sin\\alpha=0\\quad\\Rightarrow\\quad N=\\frac{G\\tan\\alpha}{2}=${tex(N)}\\ \\mathrm{N}`,
    `N = ${pl(N)} N; reakcja ściany rośnie ze wzrostem kąta α.`,
    'moment',
    `N = ${pl(N)} N`,
  ),
  sourceScene(
    'Rzut poziomy i reakcja A_x',
    `W kierunku poziomym działają tylko N i A_x. Reakcja N jest skierowana w lewo, więc A_x musi działać w prawo i mieć tę samą wartość. Otrzymujemy A_x = ${pl(AX)} N.`,
    `\\sum F_x=0:\\quad A_x-N=0\\quad\\Rightarrow\\quad A_x=N=${tex(AX)}\\ \\mathrm{N}`,
    'Znak dodatni A_x oznacza zwrot zgodny z osią x, czyli w prawo.',
    'reactions',
    `A_x = ${pl(AX)} N w prawo`,
  ),
  sourceScene(
    'Rzut pionowy i reakcja A_y',
    `W kierunku pionowym ciężar G działa w dół, a reakcja przegubu A_y musi go zrównoważyć. Otrzymujemy A_y = ${pl(AY)} N, czyli reakcję do góry.`,
    `\\sum F_y=0:\\quad A_y-G=0\\quad\\Rightarrow\\quad A_y=G=${tex(AY)}\\ \\mathrm{N}`,
    'Reakcja pionowa przegubu nie zależy od kąta nachylenia pręta.',
    'reactions',
    `A_y = ${pl(AY)} N do góry`,
  ),
  sourceScene(
    'Interpretacja znaków i zwrotów',
    `Wszystkie reakcje są dodatnie w przyjętych zwrotach: N działa w lewo, A_x w prawo, a A_y do góry. Nacisk pręta na ścianę jest równy N, ale ma zwrot przeciwny, czyli w prawo.`,
    `N=${tex(N)}\\ \\mathrm{N},\\qquad A_x=${tex(AX)}\\ \\mathrm{N},\\qquad A_y=${tex(AY)}\\ \\mathrm{N}`,
    'Znak jest częścią odpowiedzi i opisuje rzeczywisty zwrot reakcji.',
    'signs',
    'N w lewo, A_x w prawo, A_y do góry',
  ),
  sourceScene(
    'Niezależna kontrola momentem względem B',
    `Obieramy górny punkt styku B jako nowy biegun momentów. Reakcja N przechodzi przez B, więc znika z równania. Składowe A_x i A_y oraz ciężar G dają moment wypadkowy ${pl(momentCheck)} N·m, czyli zero z dokładnością numeryczną.`,
    `\\sum M_B=${tex(momentCheck)}\\ \\mathrm{N\\cdot m}\\approx0`,
    'Kontrola wykorzystuje inny biegun niż główne równanie momentów.',
    'check',
    'ΣM_B ≈ 0',
  ),
]

export default {
  ...createUkladZbieznySolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
