import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { sourceScene } from '../../solution-factories/core/source-task'
import { createReakcjeRamaSolution } from '../../solution-factories/factory-statyka-reakcje-rama/factory'
import { task } from './task'

const scenes = [
  sourceScene(
    'Model ramy z przegubem',
    'Rama ma przegub nieruchomy A, przegub pośredni C oraz pionowe podpory B i D. Czwartą niewiadomą wyznacza równowaga prawej części odciętej w przegubie C. Obciążenia to P₁, obciążenie ciągłe q na pionie, P₂ pod 60° i moment M.',
    'A=(0;0),\\quad C=(3;2),\\quad B=(6;0),\\quad D=(3;3)\\ \\mathrm{m}',
    'Niewiadome: A_x, A_y, B_y oraz D_y.',
    'model',
  ),
  sourceScene(
    'Obciążenia i moment',
    'P₁ = 11 kN działa pionowo w dół przy x = 0. Obciążenie ciągłe q = 2 kN/m na pionie 2 m daje Q = 4 kN w połowie wysokości, skierowane w prawo. Siła P₂ = 7 kN działa pod 60° w górę–w prawo, a moment M = 20 kN·m jest zgodny ze wskazówkami zegara.',
    'Q=2\\cdot2=4\\ \\mathrm{kN},\\qquad P_{2x}=7\\cos60^\\circ=3{,}5\\ \\mathrm{kN},\\qquad P_{2y}=7\\sin60^\\circ=6{,}062\\ \\mathrm{kN}',
    'Q w (3;1) m, P₂ w (3;0) m, P₁ w (0;2) m.',
    'loads',
  ),
  sourceScene(
    'Wypadkowe obciążeń',
    'Obciążenie ciągłe zastępujemy siłą Q w środku pionowego odcinka. Siłę P₂ rozkładamy na składową poziomą 3,5 kN w prawo i pionową 6,062 kN w górę. Moment M pozostaje parą sił o zwrocie zgodnym z zegarem.',
    'Q=(-4;0)\\ \\mathrm{kN},\\qquad P_2=(3{,}5;6{,}062)\\ \\mathrm{kN},\\qquad P_1=(0;-11)\\ \\mathrm{kN}',
    'Wszystkie obciążenia sprowadzone do sił skupionych i momentu M.',
    'components',
  ),
  sourceScene(
    'Przegub C i prawa część',
    'Przecinamy ramę w przegubie C. Prawa część jest równoważona przez B_y i D_y, a moment w przegubie jest zerowy. W równaniu momentów względem C podpora D leży na pionie przez C, więc nie daje ramienia — zostaje tylko B_y i moment M.',
    '\\sum M_C^{(P)}=3B_y-20=0\\quad\\Rightarrow\\quad B_y=6{,}667\\ \\mathrm{kN}',
    'B_y = 6,67 kN działa w górę.',
    'hinge',
    'D leży bezpośrednio nad C, dlatego jego reakcja nie wchodzi do tego równania.',
  ),
  sourceScene(
    'Rzut sił na poziom',
    'W poziomie działa Q = 4 kN w lewo i składowa P₂x = 3,5 kN w prawo. Z ΣFx = 0 otrzymujemy A_x = 0,5 kN w prawo.',
    '\\sum F_x=A_x-4+3{,}5=0\\quad\\Rightarrow\\quad A_x=0{,}5\\ \\mathrm{kN}',
    'A_x = 0,50 kN w prawo.',
    'horizontal',
  ),
  sourceScene(
    'Moment względem A i reakcja D',
    'Momenty względem A: Q ma ramię 1 m, P₂ daje 3·P₂y, B_y ramię 6 m, a moment M działa zgodnie z zegarem. Równanie zawiera jeszcze D_y z ramieniem 3 m. Po podstawieniu D_y = −14,062 kN, czyli reakcja w D działa w dół.',
    '\\sum M_A=4+18{,}186-20+6{,}667\\cdot6+3D_y=0\\quad\\Rightarrow\\quad D_y=-14{,}062\\ \\mathrm{kN}',
    'D_y = 14,06 kN w dół (znak ujemny względem osi y).',
    'moment',
  ),
  sourceScene(
    'Rzut sił na pion',
    'W pionie działają A_y, P₁ = 11 kN w dół, P₂y = 6,062 kN i B_y = 6,667 kN w górę oraz D_y = 14,062 kN w dół. Bilans daje A_y = 12,333 kN w górę.',
    '\\sum F_y=A_y-11+6{,}062+6{,}667-14{,}062=0\\quad\\Rightarrow\\quad A_y=12{,}333\\ \\mathrm{kN}',
    'A_y = 12,33 kN w górę.',
    'vertical',
  ),
  sourceScene(
    'Znaki i niezależna kontrola',
    'Dodatnie A_x i A_y mają zwroty osi, B_y działa w górę, a ujemne D_y oznacza reakcję w dół. Kontrola momentów względem B daje zero, więc znaki i ramiona są poprawne.',
    '\\sum M_B=-73{,}998+66+4-18{,}186-20+42{,}186=0',
    'Bilans względem B potwierdza wszystkie cztery reakcje.',
    'check',
  ),
]

export default {
  ...createReakcjeRamaSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
