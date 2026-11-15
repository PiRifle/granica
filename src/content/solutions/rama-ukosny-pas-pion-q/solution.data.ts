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
    'Belka wychodzi z przegubu A w (0;0), ma poziomy odcinek 2 m, krótki pion przy C, ukośny pas do górnego węzła oraz prawy pion o wysokości 3 m. Rolka B leży w (6;0). Siła P₁ działa w dół w x = 1 m, obciążenie q poziomo w lewo na prawym pionie, a moment M obraca zgodnie ze wskazówkami zegara.',
    `P_1=${tex(config.p1, 1)}\\ \\mathrm{kN},\\qquad M=${tex(config.moment, 1)}\\ \\mathrm{kN\\cdot m},\\qquad q=${tex(config.q, 1)}\\ \\mathrm{kN/m}`,
    'Osie: x w prawo, y w górę. Moment dodatni przeciwny do wskazówek zegara.',
    'model',
  ),
  sourceScene(
    'Wypadkowe obciążeń',
    'Obciążenie q na pionie 3 m zastępujemy wypadkową Q = q·3 = 4,2 kN przyłożoną w połowie wysokości. Siła P₁ działa pionowo w dół przy x = 1 m. Moment M pozostaje momentem skupionym o zwrocie zgodnym ze wskazówkami zegara.',
    config.loadTex,
    'Q działa poziomo w lewo, P₁ pionowo w dół, a M jest parą sił.',
    'loads',
  ),
  sourceScene(
    'Ramiona sił względem A',
    'W równaniu momentów względem A siła P₁ ma ramię 1 m, wypadkowa Q ma ramię pionowe 1,5 m, a reakcja B_y ramię 6 m. Moment skupiony dodajemy bezpośrednio, z jego znakiem.',
    `x_{P1}=1\\ \\mathrm{m},\\qquad x_Q=6\\ \\mathrm{m},\\ y_Q=1{,}5\\ \\mathrm{m},\\qquad x_B=6\\ \\mathrm{m}`,
    'Biegun w A usuwa A_x i A_y z równania momentów.',
    'geometry',
  ),
  sourceScene(
    'Równanie momentów względem A',
    'Podstawiamy obciążenia i moment skupiony. P₁ daje moment ujemny, pozioma Q daje moment dodatni, a M jest ujemny. Po redukcji otrzymujemy równanie z niewiadomą B_y.',
    config.momentTex,
    'Ramiona podano w metrach, więc wynik B_y wychodzi w kN.',
    'moment',
  ),
  sourceScene(
    'Reakcja B_y',
    'Dzielimy równanie przez 6 m. Dodatnia reakcja oznacza, że rolka działa do góry. Jej wartość jest mniejsza od P₁, bo część pionowego obciążenia przejmuje przegub A.',
    `6B_y=${tex(6 * By, 3)}\\quad\\Rightarrow\\quad B_y=${tex(By, 3)}\\ \\mathrm{kN}`,
    'Rolka B przenosi wyłącznie siłę pionową.',
    'reactions',
  ),
  sourceScene(
    'Rzuty sił i reakcje A',
    'Suma rzutów na x daje A_x = 4,2 kN w prawo, równoważąc wypadkową Q. Suma rzutów na y daje A_y, które uzupełnia brakującą część pionowego obciążenia względem B_y. Obie reakcje są dodatnie.',
    `\\sum F_x=0:\\quad A_x-${tex(Math.abs(config.loads[1].value.x), 1)}=0,\\qquad \\sum F_y=0:\\quad A_y-${tex(Math.abs(config.loads[0].value.y), 1)}+B_y=0`,
    reactionText,
    'reactions',
  ),
  sourceScene(
    'Interpretacja znaków i zwrotów',
    'A_x działa w prawo, A_y i B_y do góry. Moment M jest w zapisie ujemny, ponieważ obraca zgodnie ze wskazówkami zegara. Dodatnie reakcje oznaczają, że przyjęte zwroty osi odpowiadają rzeczywistym zwrotom sił w podporach.',
    reactionTex,
    'A_x równoważy poziome q, a A_y i B_y razem równoważą P₁.',
    'signs',
  ),
  sourceScene(
    'Niezależna kontrola równowagi',
    'Wyniki podstawiamy do sum sił oraz do momentu względem punktu (1;1) m, którego nie używano jako głównego bieguna. Reszty są zerowe z dokładnością numeryczną, co potwierdza poprawność znaków i ramion.',
    `\\sum F_x=${tex(residual.x, 2)}\\ \\mathrm{kN},\\qquad \\sum F_y=${tex(residual.y, 2)}\\ \\mathrm{kN},\\qquad \\sum M_{(1;1)}=${tex(residual.moment, 2)}\\ \\mathrm{kN\\cdot m}`,
    'Kontrola obejmuje moment skupiony M oraz obciążenie ciągłe q.',
    'check',
  ),
]

export default {
  ...createReakcjeRamaSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.ASlopedFrameAnimation }))),
} satisfies SolutionData
