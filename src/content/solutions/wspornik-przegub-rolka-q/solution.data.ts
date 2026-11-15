import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { sourceScene } from '../../solution-factories/core/source-task'
import { createReakcjeRamaSolution } from '../../solution-factories/factory-statyka-reakcje-rama/factory'
import { task } from './task'

const scenes = [
  sourceScene(
    'Model ramy i podpory',
    'Rama jest utwierdzona w A, ma przegub pośredni C i rolkę B. Utwierdzenie daje trzy niewiadome: A_x, A_y i M_A; rolka dokłada pionową B_y. Na lewym pasie działa obciążenie ciągłe q, a na wsporniku siła P₁ pod kątem 30°.',
    'A=(0;0),\\quad C=(3;3),\\quad B=(5;3),\\quad \\text{wspornik do }x=8\\ \\text{m}',
    'Do wyznaczenia są cztery reakcje: A_x, A_y, M_A oraz B_y.',
    'model',
  ),
  sourceScene(
    'Obciążenia i moment',
    'Obciążenie ciągłe q = 1,6 kN/m na odcinku 3 m zastępujemy siłą Q = 4,8 kN w połowie tego odcinka. Siłę P₁ = 9 kN przy końcu wspornika rozkładamy pod kątem 30° do poziomu. Moment M = 16 kN·m działa zgodnie ze wskazówkami zegara.',
    'Q=q\\cdot3=4{,}8\\ \\mathrm{kN},\\qquad P_{1x}=-9\\cos30^\\circ=-7{,}794\\ \\mathrm{kN},\\qquad P_{1y}=-9\\sin30^\\circ=-4{,}5\\ \\mathrm{kN}',
    'Q działa w (1,5;3) m, a P₁ w punkcie (8;3) m.',
    'loads',
  ),
  sourceScene(
    'Przegub C i prawa część',
    'Przecinamy ramę w przegubie C. Prawa część nie przenosi momentu przez przegub, więc suma momentów względem C zawiera tylko B_y, składową P₁y i moment M. Ramię B_y wynosi 2 m, a P₁ leży 5 m od C.',
    '\\sum M_C=2B_y+5(-4{,}5)-16=0\\quad\\Rightarrow\\quad B_y=19{,}25\\ \\mathrm{kN}',
    'B_y = 19,25 kN działa w górę.',
    'hinge',
    'Przegub pośredni pozwala rozdzielić ramę na dwie części.',
  ),
  sourceScene(
    'Rzut sił na poziom',
    'W kierunku poziomym działa tylko składowa P₁x oraz reakcja A_x. Z warunku ΣFx = 0 otrzymujemy A_x = 7,794 kN, czyli zwrot zgodny z osią x (w prawo).',
    '\\sum F_x=A_x-7{,}794=0\\quad\\Rightarrow\\quad A_x=7{,}794\\ \\mathrm{kN}',
    'A_x = 7,79 kN w prawo.',
    'horizontal',
  ),
  sourceScene(
    'Rzut sił na pion',
    'W pionie działają Q = 4,8 kN i P₁y = 4,5 kN w dół oraz B_y = 19,25 kN w górę. Bilans daje A_y = 4,8 + 4,5 − 19,25 = −9,95 kN, więc reakcja w A jest skierowana w dół.',
    '\\sum F_y=A_y-4{,}8-4{,}5+19{,}25=0\\quad\\Rightarrow\\quad A_y=-9{,}95\\ \\mathrm{kN}',
    'A_y = 9,95 kN w dół (wartość ujemna względem osi y).',
    'vertical',
  ),
  sourceScene(
    'Moment utwierdzenia',
    'Momenty względem A: Q ma ramię 1,5 m, P₁ daje 8·P₁y − 3·P₁x, a B_y ramię 5 m. Uwzględniamy też moment skupiony M. Po podstawieniu M_A = −60,43 kN·m, czyli utwierdzenie działa zgodnie ze wskazówkami zegara.',
    '\\sum M_A=M_A-4{,}8\\cdot1{,}5+(8(-4{,}5)-3(-7{,}794))+5\\cdot19{,}25-16=0',
    'M_A = −60,43 kN·m, czyli 60,43 kN·m zgodnie ze wskazówkami zegara.',
    'moment',
  ),
  sourceScene(
    'Znaki i zwroty reakcji',
    'Znak wyniku zależy od przyjętego układu: dodatnie A_x i B_y mają zwroty osi, ujemne A_y działa w dół, a ujemny M_A obraca zgodnie ze wskazówkami zegara. Nie zmieniamy znaków na „wygodniejsze”.',
    'A_x=+7{,}794\\ \\mathrm{kN},\\quad A_y=-9{,}95\\ \\mathrm{kN},\\quad M_A=-60{,}43\\ \\mathrm{kN\\cdot m},\\quad B_y=+19{,}25\\ \\mathrm{kN}',
    'A_x w prawo, A_y w dół, M_A zgodnie z zegarem, B_y w górę.',
    'signs',
  ),
  sourceScene(
    'Niezależna kontrola',
    'Sprawdzamy momenty względem B, punktu nieużywanego wcześniej jako główny biegun. Po podstawieniu reakcji suma wynosi zero, co potwierdza znaki, ramiona i wartości wszystkich czterech niewiadomych.',
    '\\sum M_B=M_A+4{,}8\\cdot3{,}5-4{,}5\\cdot3+7{,}794\\cdot3+9{,}95\\cdot5-16=0',
    'Bilans momentów względem B jest spełniony.',
    'check',
  ),
]

export default {
  ...createReakcjeRamaSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
