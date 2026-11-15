import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { sourceScene } from '../../solution-factories/core/source-task'
import { createReakcjeRamaSolution } from '../../solution-factories/factory-statyka-reakcje-rama/factory'
import { task } from './task'

const scenes = [
  sourceScene(
    'Model ramy z ukośnym pasem',
    'Lewy pas A–C jest ukośny, od C pionowy słup prowadzi do górnego pasa, a prawy słup opiera się na rolce B. Podpora A jest przegubem nieruchomym. Obciążenia to q na górnym pasie, pozioma P₁, ukośna P₂ i moment M.',
    'A=(0;0),\\quad C=(3;2),\\quad B=(5{,}5;0),\\quad \\text{górny pas }y=4\\ \\mathrm{m}',
    'Niewiadome: A_x, A_y oraz B_y.',
    'model',
  ),
  sourceScene(
    'Obciążenia i moment',
    'Obciążenie ciągłe q = 2,2 kN/m na 4,5 m daje Q = 9,9 kN w x = 5,25 m. Siła P₁ = 12 kN działa poziomo w lewo na wysokości 2 m. Siła P₂ = 6 kN działa pod 30° w prawo–w dół, a moment M = 15 kN·m jest zgodny ze wskazówkami zegara.',
    'Q=2{,}2\\cdot4{,}5=9{,}9\\ \\mathrm{kN},\\qquad P_{2x}=6\\cos30^\\circ=5{,}196\\ \\mathrm{kN},\\qquad P_{2y}=-6\\sin30^\\circ=-3\\ \\mathrm{kN}',
    'Q w (5,25;4) m, P₁ w (5,5;2) m, P₂ w (7,5;4) m.',
    'loads',
  ),
  sourceScene(
    'Wypadkowe obciążeń',
    'Obciążenie ciągłe zastępujemy siłą Q w środku górnego pasa. Siłę P₂ rozkładamy na składową poziomą 5,196 kN w prawo i pionową 3 kN w dół. P₁ jest już pozioma, a moment M pozostaje parą sił.',
    'Q=(0;-9{,}9)\\ \\mathrm{kN},\\qquad P_1=(-12;0)\\ \\mathrm{kN},\\qquad P_2=(5{,}196;-3)\\ \\mathrm{kN}',
    'Wszystkie obciążenia sprowadzone do sił skupionych i pary M.',
    'components',
  ),
  sourceScene(
    'Moment względem A i reakcja B',
    'Biegunem jest przegub A. Q ma ramię 5,25 m, P₁ daje moment 2·12, P₂ wnosi 7,5·(−3) − 4·5,196, a moment M działa zgodnie z zegarem. Równanie zawiera tylko B_y, bo A_x i A_y przechodzą przez biegun.',
    '\\sum M_A=5{,}5B_y-5{,}25\\cdot9{,}9+2\\cdot12+7{,}5(-3)-4\\cdot5{,}196-15=0',
    '5,5B_y = 86,26, skąd B_y = 15,68 kN w górę.',
    'moment',
  ),
  sourceScene(
    'Rzut sił na poziom',
    'W poziomie działają A_x, P₁ = 12 kN w lewo i P₂x = 5,196 kN w prawo. Z ΣFx = 0 otrzymujemy A_x = 12 − 5,196 = 6,804 kN w prawo.',
    '\\sum F_x=A_x-12+5{,}196=0\\quad\\Rightarrow\\quad A_x=6{,}80\\ \\mathrm{kN}',
    'A_x = 6,80 kN w prawo.',
    'horizontal',
  ),
  sourceScene(
    'Rzut sił na pion',
    'W pionie działają A_y, Q = 9,9 kN i P₂y = 3 kN w dół oraz B_y = 15,684 kN w górę. Bilans daje A_y = 9,9 + 3 − 15,684 = −2,784 kN, więc reakcja w A działa w dół.',
    '\\sum F_y=A_y-9{,}9-3+15{,}684=0\\quad\\Rightarrow\\quad A_y=-2{,}78\\ \\mathrm{kN}',
    'A_y = 2,78 kN w dół (wartość ujemna względem osi y).',
    'vertical',
  ),
  sourceScene(
    'Znaki i zwroty',
    'Dodatnie A_x i B_y mają zwroty osi, natomiast ujemne A_y oznacza reakcję skierowaną w dół. Znak jest częścią odpowiedzi: nie zmieniamy go, bo opisuje rzeczywisty zwrot reakcji.',
    'A_x=+6{,}804\\ \\mathrm{kN},\\qquad A_y=-2{,}784\\ \\mathrm{kN},\\qquad B_y=+15{,}684\\ \\mathrm{kN}',
    'A_x w prawo, A_y w dół, B_y w górę.',
    'signs',
  ),
  sourceScene(
    'Niezależna kontrola',
    'Sprawdzamy momenty względem B, punktu nieużywanego jako główny biegun. Po podstawieniu reakcji suma wynosi zero, co potwierdza wartości i znaki wszystkich trzech niewiadomych.',
    '\\sum M_B=15{,}31+2{,}475+24-26{,}785-15=0',
    'Bilans momentów względem B jest spełniony.',
    'check',
  ),
]

export default {
  ...createReakcjeRamaSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
