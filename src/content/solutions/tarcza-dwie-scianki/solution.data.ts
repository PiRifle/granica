import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { pl, sourceScene, tex } from '../../solution-factories/core/source-task'
import { createUkladZbieznySolution } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'
import { G, ALPHA, BETA, RAD_A, RAD_B, N1, N2, residualX, residualY, task } from './task'

const scenes = [
  sourceScene(
    'Model tarczy między ściankami',
    `Tarcza o ciężarze G = ${G} N jest w równowadze między dwiema nieruchomymi, gładkimi ściankami. Lewa ścianka jest nachylona pod kątem α = ${ALPHA}° do poziomu, a prawa pod kątem β = ${BETA}°. Ponieważ styki są gładkie, reakcje N₁ i N₂ są prostopadłe do ścianek.`,
    `G=${G}\\ \\mathrm{N},\\qquad \\alpha=${ALPHA}^\\circ,\\qquad \\beta=${BETA}^\\circ`,
    'Przyjmujemy osie x w prawo i y w górę; dodatnia reakcja oznacza odpychanie tarczy od ścianki.',
    'model',
    `α = ${ALPHA}°, β = ${BETA}°, G = ${G} N`,
  ),
  sourceScene(
    'Normalne i ciężar',
    `Na tarczę działają trzy siły: ciężar G w dół oraz reakcje normalne N₁ i N₂ skierowane do wnętrza tarczy. Wszystkie trzy proste działania przecinają się w środku tarczy, więc moment względem środka jest spełniony tożsamościowo.`,
    `\\mathbf G=(0;-G),\\qquad \\mathbf N_1=N_1(\\sin\\alpha;\\cos\\alpha),\\qquad \\mathbf N_2=N_2(-\\sin\\beta;\\cos\\beta)`,
    'Kierunki normalnych wynikają z prostopadłości do odpowiedniej ścianki.',
    'loads',
    'Trzy siły zbieżne w środku tarczy',
  ),
  sourceScene(
    'Geometria kątów normalnych',
    `Lewa normalna tworzy z osią x kąt 90° − α = ${90 - ALPHA}°, a prawa kąt 90° + β = ${90 + BETA}°. Dlatego składowa pozioma N₁ jest dodatnia, a składowa pozioma N₂ ujemna. Kąt między normalnymi wynosi 180° − α − β = ${180 - ALPHA - BETA}°.`,
    `\\mathbf n_1=(\\sin\\alpha;\\cos\\alpha),\\qquad \\mathbf n_2=(-\\sin\\beta;\\cos\\beta)`,
    'α i β są mierzone do poziomu, a nie do pionu.',
    'geometry',
    'N₁ pod kątem 70°, N₂ pod kątem 160° do +x',
  ),
  sourceScene(
    'Równania równowagi',
    `Rzut na oś x wiąże ze sobą obie normalne, a rzut na oś y równoważy ciężar. Otrzymujemy układ dwóch równań liniowych z niewiadomymi N₁ i N₂.`,
    `\\begin{cases}N_1\\sin\\alpha-N_2\\sin\\beta=0\\\\N_1\\cos\\alpha+N_2\\cos\\beta=G\\end{cases}`,
    'Równanie momentów nie wnosi nowej informacji, bo siły są zbieżne.',
    'equations',
    'Układ 2×2 na N₁ i N₂',
  ),
  sourceScene(
    'Wyznaczenie N₁',
    `Z równania poziomego mamy N₂ = N₁ sinα/sinβ. Po podstawieniu do równania pionowego otrzymujemy N₁ = ${pl(N1)} N. Wartość dodatnia oznacza, że lewa ścianka rzeczywiście odpycha tarczę.`,
    `N_1=\\frac{G\\sin\\beta}{\\cos\\alpha\\sin\\beta+\\sin\\alpha\\cos\\beta}=${tex(N1)}\\ \\mathrm{N}`,
    `N₁ = ${pl(N1)} N.`,
    'reactions',
    `N₁ = ${pl(N1)} N`,
  ),
  sourceScene(
    'Wyznaczenie N₂',
    `Po podstawieniu N₁ do zależności poziomej otrzymujemy N₂ = ${pl(N2)} N. Prawa ścianka odpycha tarczę słabiej niż lewa, bo jej normalna jest bardziej odchylona od pionu.`,
    `N_2=N_1\\frac{\\sin\\alpha}{\\sin\\beta}=${tex(N2)}\\ \\mathrm{N}`,
    `N₂ = ${pl(N2)} N.`,
    'reactions',
    `N₂ = ${pl(N2)} N`,
  ),
  sourceScene(
    'Interpretacja znaków i stosunku reakcji',
    `Obie reakcje są dodatnie, więc tarcza nie traci kontaktu z żadną ścianką. Stosunek reakcji N₂/N₁ = sinα/sinβ = ${pl(Math.sin(RAD_A) / Math.sin(RAD_B))} zależy tylko od kątów nachylenia ścianek.`,
    `\\frac{N_2}{N_1}=\\frac{\\sin\\alpha}{\\sin\\beta}=${tex(Math.sin(RAD_A) / Math.sin(RAD_B))}`,
    'Większa reakcja występuje na ściance o mniejszym nachyleniu do poziomu.',
    'signs',
    'N₁ > N₂, obie reakcje dodatnie',
  ),
  sourceScene(
    'Niezależna kontrola rzutów',
    `Podstawiamy wyznaczone reakcje do obu równań rzutów. Reszty są rzędu błędów zaokrągleń: ΣF_x = ${pl(residualX)} N oraz ΣF_y = ${pl(residualY)} N.`,
    `\\sum F_x=${tex(residualX)}\\ \\mathrm{N},\\qquad \\sum F_y=${tex(residualY)}\\ \\mathrm{N}`,
    'Kontrola potwierdza wartości, znaki i kąty normalnych.',
    'check',
    'ΣF_x ≈ 0, ΣF_y ≈ 0',
  ),
]

export default {
  ...createUkladZbieznySolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
