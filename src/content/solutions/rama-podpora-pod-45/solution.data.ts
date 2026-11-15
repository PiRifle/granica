import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { sourceScene } from '../../solution-factories/core/source-task'
import { createReakcjeRamaSolution } from '../../solution-factories/factory-statyka-reakcje-rama/factory'
import { task } from './task'

const scenes = [
  sourceScene(
    'Model ramy i podpory',
    'Rama ma przegub nieruchomy A w punkcie (2;0) oraz rolkę B na podłożu pochyłym pod 45°. Reakcja B jest prostopadła do tego podłoża, więc działa ukośnie w lewo i w górę. Niewiadome to A_x, A_y oraz B.',
    'A=(2;0),\\quad B=(7;2),\\quad \\text{wymiary }2+2+1+2\\ \\text{m},\\quad h=2\\ \\text{m}',
    'Trzy niewiadome: A_x, A_y i ukośna reakcja B.',
    'model',
  ),
  sourceScene(
    'Obciążenia i moment',
    'Obciążenie ciągłe q = 1,8 kN/m na odcinku 2 m daje Q = 3,6 kN w x = 1 m. Siła P₁ = 10 kN działa w C pod 45° w dół–w lewo, P₂ = 8 kN pionowo w x = 5 m, a moment M = 25 kN·m jest zgodny ze wskazówkami zegara.',
    'Q=1{,}8\\cdot2=3{,}6\\ \\mathrm{kN},\\qquad P_{1x}=P_{1y}=-10/\\sqrt2=-7{,}071\\ \\mathrm{kN},\\qquad P_2=8\\ \\mathrm{kN}\\downarrow',
    'Q w (1;2) m, P₁ w C = (4;2) m, P₂ w (5;2) m.',
    'loads',
  ),
  sourceScene(
    'Składowe obciążeń',
    'Siłę ukośną P₁ rozkładamy na dwie równe składowe 7,071 kN. Obciążenie ciągłe zastępujemy wypadkową Q w środku odcinka, a P₂ pozostaje pionowa. Moment M jest parą sił i nie zależy od punktu przyłożenia.',
    'P_{1x}=-7{,}071\\ \\mathrm{kN},\\quad P_{1y}=-7{,}071\\ \\mathrm{kN},\\quad Q=3{,}6\\ \\mathrm{kN},\\quad P_2=(0;-8)\\ \\mathrm{kN}',
    'Wszystkie obciążenia sprowadzone do sił skupionych i pary M.',
    'components',
  ),
  sourceScene(
    'Moment względem A',
    'Biegunem jest przegub A. Siła P₁ przechodzi przez punkt, którego ramiona względem A dają moment zerowy, więc w równaniu zostają Q, P₂, moment M i reakcja B. Po podstawieniu 7B/√2 + 3,6 − 24 − 25 = 0 otrzymujemy B = 9,172 kN wzdłuż linii 45°.',
    '\\sum M_A=5\\frac{B}{\\sqrt2}+2\\frac{B}{\\sqrt2}+3{,}6-8\\cdot3-25=0',
    '7B/√2 = 45,4, skąd B = 9,172 kN — reakcja ukośna w lewo i w górę.',
    'moment',
  ),
  sourceScene(
    'Składowe reakcji B',
    'Reakcja B jest prostopadła do podłoża nachylonego pod 45°, więc jej składowe mają równe moduły. B_x = −6,486 kN działa w lewo, a B_y = +6,486 kN w górę.',
    'B_x=-\\frac{B}{\\sqrt2}=-6{,}486\\ \\mathrm{kN},\\qquad B_y=+\\frac{B}{\\sqrt2}=+6{,}486\\ \\mathrm{kN}',
    'B_x w lewo, B_y w górę.',
    'components-b',
  ),
  sourceScene(
    'Rzut sił na poziom',
    'W poziomie działają A_x, składowa P₁x oraz B_x. Z ΣFx = 0: A_x − 7,071 − 6,486 = 0, czyli A_x = 13,557 kN w prawo.',
    '\\sum F_x=A_x-7{,}071-6{,}486=0\\quad\\Rightarrow\\quad A_x=13{,}56\\ \\mathrm{kN}',
    'A_x = 13,56 kN w prawo.',
    'horizontal',
  ),
  sourceScene(
    'Rzut sił na pion',
    'W pionie działają A_y, Q = 3,6 kN, P₁y = 7,071 kN i P₂ = 8 kN w dół oraz B_y = 6,486 kN w górę. Bilans daje A_y = 3,6 + 7,071 + 8 − 6,486 = 12,185 kN.',
    '\\sum F_y=A_y-3{,}6-7{,}071-8+6{,}486=0\\quad\\Rightarrow\\quad A_y=12{,}19\\ \\mathrm{kN}',
    'A_y = 12,19 kN w górę.',
    'vertical',
  ),
  sourceScene(
    'Znaki i kontrola',
    'Wszystkie trzy niewiadome wyszły dodatnie w przyjętych kierunkach: A_x w prawo, A_y w górę, B wzdłuż normalnej do podłoża. Kontrola momentów względem B: −33,813 + 21,6 + 21,213 + 16 − 25 = 0.',
    '\\sum M_B=-33{,}813+21{,}6+21{,}213+16-25=0',
    'Bilans momentów względem B potwierdza reakcje.',
    'check',
  ),
]

export default {
  ...createReakcjeRamaSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
