import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { pl, sourceScene, tex } from '../../solution-factories/core/source-task'
import { createReakcjeRamaSolution } from '../../solution-factories/factory-statyka-reakcje-rama/factory'
import { config, residual, task, values } from './task'
const [Ax, Ay, By] = values

const reactionTex = `A_x=${tex(Ax, 3)}\\ \\mathrm{kN},\\qquad A_y=${tex(Ay, 3)}\\ \\mathrm{kN},\\qquad B_y=${tex(By, 3)}\\ \\mathrm{kN}`
const reactionText = `A_x = ${pl(Ax, 3)} kN; A_y = ${pl(Ay, 3)} kN; B_y = ${pl(By, 3)} kN`

const scenes = [
  sourceScene(
    'Model fizyczny i dane',
    'Rama prostokątna ma wymiary 5 × 3 m. Przegub A leży w (0;0), rolka B w (5;0), a górny węzeł C w (5;3). Obciążenie q działa poziomo na lewym pionie, P₁ pionowo w dół w x = 1 m, P₂ w węźle C pod kątem 60° do poziomu, a moment M obraca zgodnie ze wskazówkami zegara.',
    `P_1=${tex(config.p1, 1)}\\ \\mathrm{kN},\\qquad P_2=${tex(config.p2 ?? 0, 1)}\\ \\mathrm{kN},\\qquad M=${tex(config.moment, 1)}\\ \\mathrm{kN\\cdot m},\\qquad q=${tex(config.q, 1)}\\ \\mathrm{kN/m}`,
    'Osie: x w prawo, y w górę. Moment dodatni przeciwny do wskazówek zegara.',
    'model',
  ),
  sourceScene(
    'Wypadkowe obciążeń',
    'Obciążenie q na pionie 3 m zastępujemy wypadkową Q = 3,6 kN w połowie wysokości. Siła P₂ pod kątem 60° ma składową poziomą 9·cos60° = 4,5 kN w lewo i pionową 9·sin60° = 7,794 kN w dół. P₁ działa pionowo w dół.',
    config.loadTex,
    'Q działa w prawo, P₂ w lewo i w dół, a P₁ wyłącznie w dół.',
    'loads',
  ),
  sourceScene(
    'Ramiona sił względem A',
    'Biegun w A eliminuje reakcje przegubu. Wypadkowa Q ma ramię pionowe 1,5 m, P₁ ramię poziome 1 m, a P₂ jest przyłożona w (5;3), więc jej moment zawiera oba ramiona. Reakcja B_y działa na ramieniu 5 m.',
    `y_Q=1{,}5\\ \\mathrm{m},\\qquad x_{P1}=1\\ \\mathrm{m},\\qquad x_{P2}=5\\ \\mathrm{m},\\ y_{P2}=3\\ \\mathrm{m},\\qquad x_B=5\\ \\mathrm{m}`,
    'Moment siły poziomej zależy od wysokości y, a siły pionowej od odległości x.',
    'geometry',
  ),
  sourceScene(
    'Równanie momentów względem A',
    'Podstawiamy składowe obciążeń z zachowaniem zwrotów. Moment M jest zgodny ze wskazówkami zegara i otrzymuje znak ujemny. Po redukcji zostaje równanie liniowe z jedną niewiadomą B_y.',
    config.momentTex,
    'Ramię 5 m przy reakcji B_y daje największy udział w równaniu momentów.',
    'moment',
  ),
  sourceScene(
    'Reakcja B_y',
    'Dzielimy równanie przez 5 m. Otrzymujemy dodatnią reakcję pionową skierowaną do góry. Duża wartość B_y równoważy przede wszystkim pionowe obciążenia P₁ i P₂.',
    `5B_y=${tex(5 * By, 3)}\\quad\\Rightarrow\\quad B_y=${tex(By, 3)}\\ \\mathrm{kN}`,
    'Rolka w B przenosi tylko siłę pionową.',
    'reactions',
  ),
  sourceScene(
    'Rzuty sił i reakcje A',
    'Suma rzutów na x daje A_x, a suma rzutów na y — A_y. Obie reakcje są dodatnie: A_x działa w prawo, a A_y do góry. Znak A_x wynika z różnicy poziomej P₂ i wypadkowej Q.',
    `\\sum F_x=0:\\quad A_x+${tex(config.loads[0].value.x, 1)}-${tex(Math.abs(config.loads[2].value.x), 1)}=0,\\qquad \\sum F_y=0:\\quad A_y-${tex(Math.abs(config.loads[1].value.y), 1)}-${tex(Math.abs(config.loads[2].value.y), 3)}+B_y=0`,
    reactionText,
    'reactions',
  ),
  sourceScene(
    'Interpretacja znaków i zwrotów',
    'Wszystkie reakcje są dodatnie, więc działają zgodnie z dodatnimi osiami. Moment M pozostaje w zapisie ujemny, ponieważ jego obrót jest zgodny ze wskazówkami zegara. Znaki reakcji potwierdzają, że rama jest unoszona przez obie podpory.',
    reactionTex,
    'A_x równoważy nadwyżkę P₂ nad Q, a A_y i B_y równoważą pionowe P₁ i P₂.',
    'signs',
  ),
  sourceScene(
    'Niezależna kontrola równowagi',
    'Podstawiamy reakcje do sum sił oraz do momentu względem punktu (1;1) m. Reszty są zerowe z dokładnością obliczeń zmiennoprzecinkowych, co potwierdza poprawność ramion i znaków wszystkich obciążeń.',
    `\\sum F_x=${tex(residual.x, 2)}\\ \\mathrm{kN},\\qquad \\sum F_y=${tex(residual.y, 2)}\\ \\mathrm{kN},\\qquad \\sum M_{(1;1)}=${tex(residual.moment, 2)}\\ \\mathrm{kN\\cdot m}`,
    'Kontrola obejmuje też moment skupiony M i ukośną siłę P₂.',
    'check',
  ),
]

export default {
  ...createReakcjeRamaSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ARectFrameAnimation }))),
} satisfies SolutionData
