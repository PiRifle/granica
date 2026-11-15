import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { sourceScene, tex } from '../../solution-factories/core/source-task'
import { createUkladZbieznySolution } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'
import { G, ALPHA, BETA, N, S, task } from './task'

const scenes = [
  sourceScene(
    'Model fizyczny i dane',
    'Jednorodny walec o ciężarze G leży na gładkiej równi nachylonej pod kątem α. Pręt dwusiłowy łączy środek walca z nieruchomym przegubem i tworzy z poziomem kąt β. Przyjmujemy x w prawo i y w górę. Walec jest w równowadze pod działaniem ciężaru, reakcji równi i siły pręta.',
    `G=${tex(G, 0)}\\ \\mathrm{N},\\qquad \\alpha=${ALPHA}^\\circ,\\qquad \\beta=${BETA}^\\circ`,
    'Równia jest gładka, więc reakcja N jest prostopadła do jej powierzchni. Pręt jest dwusiłowy, więc S działa wzdłuż osi pręta.',
    'model',
    'Rysunek pokazuje walec na równi, pręt do nieruchomego przegubu oraz kąty α i β.',
  ),
  sourceScene(
    'Kierunki sił',
    'Reakcja równi N jest prostopadła do powierzchni i skierowana do walca: jej wektor ma kierunek (−sinα; cosα). Siła pręta S działa wzdłuż pręta pod kątem β do poziomu, czyli ma kierunek (cosβ; sinβ). Ciężar działa pionowo w dół.',
    `\\mathbf N=N(-\\sin\\alpha;\\cos\\alpha),\\qquad \\mathbf S=S(\\cos\\beta;\\sin\\beta),\\qquad \\mathbf G=(0;-G)`,
    'Dodatnie N oznacza nacisk równi na walec, a dodatnie S — rozciąganie pręta.',
    'loads',
  ),
  sourceScene(
    'Składowe sił na osie',
    'Rozkładamy N i S na osie układu. Składowa pozioma N jest skierowana w lewo, a pozioma składowa S w prawo. Składowe pionowe obu sił działają do góry i równoważą ciężar. Równanie momentów względem środka walca jest spełnione, bo wszystkie siły przechodzą przez środek.',
    `N_x=-N\\sin\\alpha,\\quad N_y=N\\cos\\alpha,\\quad S_x=S\\cos\\beta,\\quad S_y=S\\sin\\beta`,
    'Kąt α opisuje nachylenie równi, a β — nachylenie pręta do poziomu.',
    'geometry',
  ),
  sourceScene(
    'Równania równowagi',
    'Poziome składowe N i S muszą się znosić, a sumy składowych pionowych N, S i ciężaru muszą dać zero. Otrzymujemy układ dwóch równań na N i S. Układ jest niesingularny, bo kierunki N i S nie są równoległe.',
    `\\begin{cases}-N\\sin\\alpha+S\\cos\\beta=0\\\\N\\cos\\alpha+S\\sin\\beta=G\\end{cases}`,
    'Dla α = β = 30° pręt jest nachylony pod tym samym kątem do poziomu co równia do pionu.',
    'equations',
  ),
  sourceScene(
    'Rozwiązanie układu',
    'Z pierwszego równania wyznaczamy N w zależności od S, a następnie podstawiamy do drugiego. Po uporządkowaniu otrzymujemy siłę w pręcie i reakcję równi.',
    `N=${tex(N, 3)}\\ \\mathrm{N},\\qquad S=${tex(S, 3)}\\ \\mathrm{N}`,
    'Siła w pręcie jest mniejsza od ciężaru, bo pręt działa ukośnie i przejmuje tylko część obciążenia.',
    'reactions',
  ),
  sourceScene(
    'Znaki i zwroty sił',
    'S > 0 oznacza, że pręt jest rozciągany i ciągnie walec w stronę przegubu. N > 0 oznacza, że walec nie traci kontaktu z równią. Znaki są zgodne z przyjętymi kierunkami na rysunku.',
    `S>0\\ (\\text{rozciąganie}),\\qquad N>0\\ (\\text{kontakt z równią})`,
    'Gdyby N wyszło ujemne, walec odrywałby się od równi — tak nie jest.',
    'signs',
  ),
  sourceScene(
    'Interpretacja wyniku',
    'Reakcja równi jest mniejsza od ciężaru, bo pręt działa ukośnie i przejmuje część obciążenia pionowego. Wzory pokazują, że przy większym kącie β pręt przejmuje większą część ciężaru, a nacisk N maleje.',
    `S=G\\frac{\\sin\\alpha}{\\sin(\\alpha+\\beta)}=${tex(S, 3)}\\ \\mathrm{N},\\qquad N=G\\frac{\\cos\\beta}{\\sin(\\alpha+\\beta)}=${tex(N, 3)}\\ \\mathrm{N}`,
    'Dla α = β = 30° mianownik sin(α+β) = sin60°, dlatego N jest większe od S.',
    'interpretation',
  ),
  sourceScene(
    'Niezależna kontrola',
    'Podstawiamy N i S do obu równań rzutów. Suma składowych poziomych zeruje się, a suma składowych pionowych jest równa ciężarowi G. Reszty są rzędu błędów zaokrągleń.',
    `-N\\sin\\alpha+S\\cos\\beta\\approx0,\\qquad N\\cos\\alpha+S\\sin\\beta=${tex(G, 0)}\\ \\mathrm{N}=G`,
    'Kontrola w globalnym układzie osi potwierdza wartości i znaki obu sił.',
    'check',
  ),
]

export default {
  ...createUkladZbieznySolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.CylinderRampRodAnimation }))),
} satisfies SolutionData
