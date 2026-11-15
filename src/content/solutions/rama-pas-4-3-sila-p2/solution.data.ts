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
    'Rama zaczyna się przegubem A w (0;0), ma poziomy odcinek 2 m, pochyły pas 4:3 do wysokości 3 m, górny odcinek 2 m z obciążeniem q oraz pion z siłą P₂. Rolka B leży w (8;0), a moment M działa przy lewym załamaniu.',
    `P_1=${tex(config.p1, 1)}\\ \\mathrm{kN},\\qquad P_2=${tex(config.p2 ?? 0, 1)}\\ \\mathrm{kN},\\qquad M=${tex(config.moment, 1)}\\ \\mathrm{kN\\cdot m},\\qquad q=${tex(config.q, 1)}\\ \\mathrm{kN/m}`,
    'Osie: x w prawo, y w górę. Moment dodatni przeciwny do wskazówek zegara.',
    'model',
  ),
  sourceScene(
    'Wypadkowe obciążeń',
    'Siła P₁ jest prostopadła do pasa o nachyleniu 3:4, więc jej składowe wynikają z proporcji 3:4:5. Obciążenie q na odcinku 2 m daje wypadkową Q = 2 kN w połowie odcinka. P₂ działa poziomo w lewo na wysokości 1,5 m.',
    config.loadTex,
    'P₁ ma obie składowe dodatnią i ujemną, Q działa w dół, a P₂ w lewo.',
    'loads',
  ),
  sourceScene(
    'Ramiona sił względem A',
    'Równanie momentów względem A wykorzystuje położenia punktów przyłożenia: P₁ w (4;1,5), Q w (7;3) i P₂ w (8;1,5). Reakcja B_y ma ramię 8 m. Moment każdej siły liczymy jako x·F_y − y·F_x.',
    `x_{P1}=4\\ \\mathrm{m},\\ y_{P1}=1{,}5\\ \\mathrm{m},\\qquad x_Q=7\\ \\mathrm{m},\\ y_Q=3\\ \\mathrm{m},\\qquad x_{P2}=8\\ \\mathrm{m},\\ y_{P2}=1{,}5\\ \\mathrm{m}`,
    'Biegun w A usuwa z równania A_x i A_y, zostawiając B_y.',
    'geometry',
  ),
  sourceScene(
    'Równanie momentów względem A',
    'Podstawiamy składowe P₁, wypadkową Q, siłę P₂ oraz moment skupiony. Moment M jest zgodny ze wskazówkami zegara, więc w równaniu ma znak ujemny. Po redukcji otrzymujemy bezpośrednio B_y.',
    config.momentTex,
    'Każdy wyraz ma jednostkę kN·m; ramiona podano w metrach.',
    'moment',
  ),
  sourceScene(
    'Reakcja B_y',
    'Dzielimy stronami przez ramię 8 m. Wynik dodatni oznacza reakcję rolki skierowaną do góry, zgodnie z dodatnim zwrotem osi y.',
    `8B_y=${tex(8 * By, 3)}\\quad\\Rightarrow\\quad B_y=${tex(By, 3)}\\ \\mathrm{kN}`,
    'Rolka przenosi wyłącznie siłę pionową, dlatego B_y jest jedyną reakcją w B.',
    'reactions',
  ),
  sourceScene(
    'Rzuty sił i reakcje A',
    'Z sumy rzutów na x otrzymujemy A_x, a z sumy rzutów na y — A_y. Obie reakcje przegubu są dodatnie, więc działają zgodnie z przyjętymi osiami: A_x w prawo, A_y do góry.',
    `\\sum F_x=0:\\quad A_x+${tex(config.loads[0].value.x, 1)}-${tex(Math.abs(config.loads[2].value.x), 1)}=0,\\qquad \\sum F_y=0:\\quad A_y${tex(config.loads[0].value.y, 1)}${tex(config.loads[1].value.y, 1)}+B_y=0`,
    reactionText,
    'reactions',
  ),
  sourceScene(
    'Interpretacja znaków i zwrotów',
    'Wszystkie trzy reakcje są dodatnie, więc ich zwroty pokrywają się z dodatnimi osiami. Moment M pozostaje ujemny w zapisie, bo jego obrót jest zgodny ze wskazówkami zegara. Sprawdzenie znaków jest równie ważne jak sama wartość.',
    reactionTex,
    'Dodatnie A_y i B_y unoszą ramę, a A_x równoważy wypadkową poziomą P₂ − P₁x.',
    'signs',
  ),
  sourceScene(
    'Niezależna kontrola równowagi',
    'Podstawiamy reakcje do sum sił i do momentu względem punktu (1;1) m, nieużywanego wcześniej jako biegun. Reszty są zerowe z dokładnością numeryczną, co potwierdza poprawność wszystkich ramion i znaków.',
    `\\sum F_x=${tex(residual.x, 2)}\\ \\mathrm{kN},\\qquad \\sum F_y=${tex(residual.y, 2)}\\ \\mathrm{kN},\\qquad \\sum M_{(1;1)}=${tex(residual.moment, 2)}\\ \\mathrm{kN\\cdot m}`,
    'Trzy niezależne reszty potwierdzają równowagę całej ramy.',
    'check',
  ),
]

export default {
  ...createReakcjeRamaSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.AAngledFrameAnimation }))),
} satisfies SolutionData
