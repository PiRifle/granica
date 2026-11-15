import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { sourceScene, tex } from '../../solution-factories/core/source-task'
import { createUkladZbieznySolution } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'
import { L, P, H, S, AX, AY, task } from './task'

const scenes = [
  sourceScene(
    'Model fizyczny i dane',
    'Trójkątna, nieważka płyta ma podstawę L i wysokość L/2. W lewym dolnym węźle A działa przegub, a w lewym górnym węźle T jest zamocowany poziomy pręt dwusiłowy. W prawym dolnym węźle V działa pionowa siła P skierowana w dół. Przyjmujemy x w prawo i y w górę.',
    `L=${tex(L, 0)}\\ \\mathrm{m},\\qquad P=${tex(P, 0)}\\ \\mathrm{kN},\\qquad h=\\frac{L}{2}=${tex(H, 3)}\\ \\mathrm{m}`,
    'Pręt jest dwusiłowy i poziomy, więc jego oddziaływanie na płytę ma tylko składową poziomą.',
    'model',
    'Rysunek pokazuje trójkątną płytę, przegub A, poziomy pręt w T i siłę P w V.',
  ),
  sourceScene(
    'Obciążenie i kierunki sił',
    'Przyjmujemy dodatni zwrot siły w pręcie zgodnie z osią x, czyli w prawo. Siła P działa pionowo w dół w odległości L od lewego boku płyty. Reakcja przegubu A ma dwie składowe A_x i A_y.',
    `P=(0;-P)\\ \\text{w }(L;0),\\qquad S=(S;0)\\ \\text{w }(0;h)`,
    'Znak S wyjdzie z równania; dodatnia wartość oznaczałaby zwrot w prawo, ujemna w lewo.',
    'loads',
  ),
  sourceScene(
    'Geometria i ramiona względem A',
    'Biegun momentów umieszczamy w przegubie A. Siła P ma ramię poziome L. Siła S działa poziomo na wysokości h = L/2, więc jej ramię pionowe wynosi L/2. Reakcje A_x i A_y nie dają momentu względem A.',
    `x_P=L=${tex(L, 3)}\\ \\mathrm{m},\\qquad y_S=\\frac{L}{2}=${tex(H, 3)}\\ \\mathrm{m}`,
    'Do równania momentów potrzebne jest tylko ramię pionowe siły S i poziome ramię siły P.',
    'geometry',
  ),
  sourceScene(
    'Równanie momentów względem A',
    'Moment siły S o zwrocie zgodnym z osią x jest ujemny względem A. Moment siły P działającej w dół jest również ujemny. Po przyrównaniu sumy do zera otrzymujemy wartość S. Znak minus oznacza, że pręt działa na płytę w lewo.',
    `-S\\frac{L}{2}-PL=0\\quad\\Rightarrow\\quad S=-2P=${tex(S, 3)}\\ \\mathrm{kN}`,
    'Pręt jest rozciągany: działa na płytę w stronę ściany, czyli w lewo.',
    'moment',
  ),
  sourceScene(
    'Rzuty sił i reakcja przegubu',
    'Po wyznaczeniu S piszemy sumy rzutów na osie. A_x równoważy poziomą siłę pręta, a A_y równoważy całe obciążenie P. Otrzymujemy A_x dodatnie w prawo i A_y dodatnie do góry.',
    `A_x+S=0,\\qquad A_y-P=0\\quad\\Rightarrow\\quad A_x=${tex(AX, 3)}\\ \\mathrm{kN},\\ A_y=${tex(AY, 3)}\\ \\mathrm{kN}`,
    'Wartość A_x jest równa co do modułu sile w pręcie, ale ma przeciwny zwrot.',
    'reactions',
  ),
  sourceScene(
    'Znaki i charakter pracy pręta',
    'S < 0 w przyjętym układzie oznacza zwrot w lewo, czyli rozciąganie pręta. A_x > 0 działa w prawo i równoważy naciąg. A_y > 0 działa do góry i równoważy siłę P.',
    `S<0\\ (\\leftarrow\\ \\text{rozciąganie}),\\qquad A_x>0\\ (\\rightarrow),\\qquad A_y>0\\ (\\uparrow)`,
    'Znak siły w pręcie opisuje zwrot oddziaływania na płytę, a nie tylko wartość bezwzględną.',
    'signs',
  ),
  sourceScene(
    'Interpretacja wyniku',
    'Siła w pręcie jest dwa razy większa od obciążenia, bo ramię S jest dwa razy mniejsze niż ramię P. Krótki bok płyty powoduje duży nacisk na pręt. Reakcja pionowa przegubu jest równa P, a pozioma równa sile w pręcie.',
    `|S|=2P=${tex(Math.abs(S), 3)}\\ \\mathrm{kN},\\qquad A_x=-S=${tex(AX, 3)}\\ \\mathrm{kN},\\qquad A_y=P=${tex(AY, 3)}\\ \\mathrm{kN}`,
    'Dłuższe ramię siły P wymaga większej siły w pręcie o krótkim ramieniu.',
    'interpretation',
  ),
  sourceScene(
    'Niezależna kontrola równowagi',
    'Kontrolę wykonujemy momentem względem górnego węzła T. Reakcja A_x daje moment dodatni, a siła P moment ujemny o tej samej wartości bezwzględnej. Sumy rzutów sił również się zerują.',
    `\\sum M_T=A_x\\frac{L}{2}-PL=0,\\qquad \\sum F_x=0,\\quad \\sum F_y=0`,
    'Niezależny biegun w T potwierdza wartość i zwrot siły w pręcie.',
    'check',
  ),
]

export default {
  ...createUkladZbieznySolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TriangularPlateAnimation }))),
} satisfies SolutionData
