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
    'Rama ma przegub A w punkcie (0;0), rolkę B w (6;0) oraz pochyły pas od wysokości 3,5 m do 2 m. Obciążenie q działa poziomo na lewym pionie, siła P₁ jest prostopadła do pochyłego pasa, a moment M przy C obraca zgodnie ze wskazówkami zegara.',
    `P_1=${tex(config.p1, 1)}\\ \\mathrm{kN},\\qquad M=${tex(config.moment, 1)}\\ \\mathrm{kN\\cdot m},\\qquad q=${tex(config.q, 1)}\\ \\mathrm{kN/m}`,
    'Przyjęto osie x w prawo i y w górę; moment dodatni jest przeciwny do wskazówek zegara.',
    'model',
  ),
  sourceScene(
    'Obciążenia zastępcze',
    'Obciążenie ciągłe q na pionie o wysokości 3,5 m zastępujemy wypadkową Q = q·3,5 przyłożoną w połowie wysokości. Siłę P₁ rozkładamy na składowe zgodnie z kierunkiem prostopadłym do pasa o nachyleniu 1,5:5. Moment skupiony pozostaje parą sił o ramieniu wynikającym z geometrii.',
    config.loadTex,
    'Wypadkowa Q działa poziomo w połowie pionu, a P₁ ma zwroty ujemne obu składowych.',
    'loads',
  ),
  sourceScene(
    'Ramiona sił względem A',
    'Do równania momentów potrzebne są poziome i pionowe odległości punktów przyłożenia od bieguna A. Dla Q ramię pionowe wynosi 1,75 m, dla P₁ odpowiednio 5 m i 2,25 m, a reakcja B_y ma ramię 6 m. Moment siły liczymy jako x·F_y − y·F_x.',
    `x_Q=0,\\quad y_Q=1{,}75\\ \\mathrm{m},\\qquad x_{P1}=5\\ \\mathrm{m},\\quad y_{P1}=2{,}25\\ \\mathrm{m},\\qquad x_B=6\\ \\mathrm{m}`,
    'Biegun w A eliminuje z równania niewiadome A_x i A_y.',
    'geometry',
  ),
  sourceScene(
    'Równanie momentów względem A',
    'Podstawiamy składowe obciążeń i moment skupiony z zachowaniem znaków. Moment zgodny ze wskazówkami zegara zapisujemy jako ujemny. Po uporządkowaniu zostaje jedno równanie z niewiadomą B_y.',
    config.momentTex,
    'Wszystkie ramiona są w metrach, siły w kN, a momenty w kN·m.',
    'moment',
  ),
  sourceScene(
    'Wyznaczenie reakcji B_y',
    'Grupujemy wyrazy swobodne i dzielimy przez ramię 6 m. Dodatni wynik oznacza, że reakcja rolki działa zgodnie z przyjętym zwrotem osi y, czyli do góry.',
    `6B_y=${tex(6 * By, 3)}\\quad\\Rightarrow\\quad B_y=${tex(By, 3)}\\ \\mathrm{kN}`,
    'Rolka przenosi tylko siłę prostopadłą do podłoża, więc ma jedną niewiadomą B_y.',
    'reactions',
  ),
  sourceScene(
    'Rzuty sił i reakcje przegubu A',
    'Znając B_y, piszemy sumę rzutów na osie x i y. Przegub A daje dwie składowe. Ujemne wartości A_x i A_y oznaczają, że rzeczywiste zwroty są przeciwne do dodatnich osi układu.',
    `\\sum F_x=0:\\quad A_x+${tex(config.loads[0].value.x, 1)}${tex(config.loads[1].value.x, 3)}=0,\\qquad \\sum F_y=0:\\quad A_y${tex(config.loads[1].value.y, 3)}+B_y=0`,
    reactionText,
    'reactions',
    'Wartości ujemne nie są błędem: informują o przeciwnym zwrocie reakcji.',
  ),
  sourceScene(
    'Interpretacja znaków i zwrotów',
    'A_x działa w lewo, A_y w dół, a B_y do góry. Znak jest częścią odpowiedzi, dlatego nie zmieniamy go na dodatni. Moment M jest zgodny ze wskazówkami zegara i w równaniu występuje z minusem.',
    reactionTex,
    'Zapis ze znakami pozwala jednoznacznie odtworzyć zwroty reakcji bez dodatkowego rysunku.',
    'signs',
  ),
  sourceScene(
    'Niezależna kontrola równowagi',
    'Podstawiamy wszystkie reakcje do sum sił oraz do momentu względem punktu (1;1) m, którego nie używano jako głównego bieguna. Reszty są rzędu błędów zmiennoprzecinkowych, co potwierdza wartości, ramiona i znaki.',
    `\\sum F_x=${tex(residual.x, 2)}\\ \\mathrm{kN},\\qquad \\sum F_y=${tex(residual.y, 2)}\\ \\mathrm{kN},\\qquad \\sum M_{(1;1)}=${tex(residual.moment, 2)}\\ \\mathrm{kN\\cdot m}`,
    'Trzy niezależne warunki równowagi są spełnione jednocześnie.',
    'check',
  ),
]

export default {
  ...createReakcjeRamaSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.AFrameReactionsAnimation }))),
} satisfies SolutionData
