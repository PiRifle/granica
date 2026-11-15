import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { pl, sourceScene, tex } from '../../solution-factories/core/source-task'
import { createUkladZbieznySolution } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'
import { G, ALPHA, RAD, T, N, residualX, residualY, task } from './task'

const scenes = [
  sourceScene(
    'Model walca na równi',
    `Walec o ciężarze G = ${G} N spoczywa na gładkiej równi nachylonej pod kątem α = ${ALPHA}° do poziomu. Linka jest równoległa do równi i przytrzymuje walec przed stoczeniem. Przyjmujemy osie x w prawo i y w górę oraz dodatkowy układ równoległy i prostopadły do równi.`,
    `G=${G}\\ \\mathrm{N},\\qquad \\alpha=${ALPHA}^\\circ`,
    'Styk jest gładki, więc reakcja równi jest prostopadła do powierzchni.',
    'model',
    `Walec G = ${G} N na równi α = ${ALPHA}°`,
  ),
  sourceScene(
    'Ciężar i reakcja równi',
    `Ciężar działa pionowo w dół w środku walca. Reakcja równi N jest prostopadła do powierzchni i skierowana do walca. Linka działa wzdłuż równi, więc jej kierunek pokrywa się z nachyleniem.`,
    `\\mathbf N=N(-\\sin\\alpha;\\cos\\alpha),\\qquad \\mathbf G=(0;-G)`,
    'Normalna N ma składową poziomą w lewo i pionową do góry.',
    'loads',
    'N prostopadła do równi, G pionowo w dół',
  ),
  sourceScene(
    'Napięcie linki równoległej do równi',
    `Linka jest równoległa do równi, dlatego napięcie T działa pod kątem α do poziomu, w górę zbocza. Bez tarcia w kierunku równi działa tylko linka i składowa ciężaru.`,
    `\\mathbf T=T(\\cos\\alpha;\\sin\\alpha)`,
    'Linka nie zmienia kierunku, bo jest równoległa do powierzchni równi.',
    'tension',
    `T równoległe do równi, kąt ${ALPHA}°`,
  ),
  sourceScene(
    'Rozkład ciężaru na składowe',
    `Rozkładamy ciężar na kierunek równoległy i prostopadły do równi. Składowa równoległa G sinα = ${pl(G * Math.sin(RAD))} N ściąga walec w dół zbocza. Składowa prostopadła G cosα = ${pl(G * Math.cos(RAD))} N dociska walec do równi.`,
    `G_\\parallel=G\\sin\\alpha=${tex(G * Math.sin(RAD))}\\ \\mathrm{N},\\qquad G_\\perp=G\\cos\\alpha=${tex(G * Math.cos(RAD))}\\ \\mathrm{N}`,
    'Kąt α jest kątem nachylenia równi do poziomu.',
    'components',
    'G∥ = 50 N, G⊥ = 86,603 N',
  ),
  sourceScene(
    'Równanie wzdłuż równi i napięcie T',
    `W kierunku równoległym do równi równoważą się napięcie linki i składowa równoległa ciężaru. Otrzymujemy T = G sinα = ${pl(T)} N.`,
    `T-G\\sin\\alpha=0\\quad\\Rightarrow\\quad T=${tex(T)}\\ \\mathrm{N}`,
    'T > 0 oznacza, że linka jest naprężona i rzeczywiście przytrzymuje walec.',
    'tension',
    `T = ${pl(T)} N`,
  ),
  sourceScene(
    'Równanie prostopadłe i reakcja N',
    `W kierunku prostopadłym reakcja równi równoważy składową prostopadłą ciężaru. Otrzymujemy N = G cosα = ${pl(N)} N.`,
    `N-G\\cos\\alpha=0\\quad\\Rightarrow\\quad N=${tex(N)}\\ \\mathrm{N}`,
    'N > 0 oznacza, że walec nie traci kontaktu z równią.',
    'normal',
    `N = ${pl(N)} N`,
  ),
  sourceScene(
    'Znaki i interpretacja',
    `Przy większym kącie nachylenia rośnie składowa równoległa ciężaru, więc linka musi przenosić większą siłę. Reakcja równi maleje, bo maleje składowa prostopadła. Dla α = ${ALPHA}° napięcie jest równe połowie ciężaru.`,
    `\\frac{T}{G}=\\sin\\alpha=${tex(Math.sin(RAD))},\\qquad \\frac{N}{G}=\\cos\\alpha=${tex(Math.cos(RAD))}`,
    'T i N są dodatnie, więc oba więzy są aktywne.',
    'signs',
    'T = G/2, N > T',
  ),
  sourceScene(
    'Niezależna kontrola w układzie x–y',
    `Rzutujemy T, N i G na osie poziome i pionowe. Reszty są zerowe z dokładnością numeryczną: ΣF_x = ${pl(residualX)} N oraz ΣF_y = ${pl(residualY)} N.`,
    `\\sum F_x=${tex(residualX)}\\ \\mathrm{N},\\qquad \\sum F_y=${tex(residualY)}\\ \\mathrm{N}`,
    'Kontrola potwierdza kąty, znaki i wartości napięcia oraz reakcji.',
    'check',
    'ΣF_x ≈ 0, ΣF_y ≈ 0',
  ),
]

export default {
  ...createUkladZbieznySolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
