import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { sourceScene, tex } from '../../solution-factories/core/source-task'
import { createUkladZbieznySolution } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'
import { P1, P2, ALPHA, BETA, S1, S2, RX, RY, task } from './task'

const scenes = [
  sourceScene(
    'Model fizyczny i dane',
    'Dwa nieważkie pręty są zamocowane przegubowo do pionowej ściany w punktach leżących nad sobą. Wolne końce spotykają się w jednym węźle W. W węźle działają obciążenia: P₁ pionowo w dół i P₂ poziomo w prawo. Kąty α i β mierzymy od ściany do osi prętów.',
    `P_1=${tex(P1, 0)}\\ \\mathrm{kN},\\qquad P_2=${tex(P2, 0)}\\ \\mathrm{kN},\\qquad \\alpha=${ALPHA}^\\circ,\\qquad \\beta=${BETA}^\\circ`,
    'Przyjmujemy dodatnie siły w prętach jako rozciągające, więc ich wektory na węzeł działają w stronę ściany.',
    'model',
    'Rysunek pokazuje dwa pręty, węzeł W, kąty α i β oraz obciążenia P₁ i P₂.',
  ),
  sourceScene(
    'Kierunki prętów',
    'Kierunek pręta 1 wyznacza kąt α od pionu. Wektor jednostkowy od węzła w stronę górnego przegubu ma składowe (−sinα; cosα). Dla pręta 2 kąt β jest mierzony od pionu w dół, więc wektor od węzła do dolnego przegubu ma składowe (−sinβ; −cosβ).',
    `\\mathbf d_1=(-\\sin\\alpha;\\cos\\alpha),\\qquad \\mathbf d_2=(-\\sin\\beta;-\\cos\\beta)`,
    'Znaki składowych wynikają z położenia górnego i dolnego przegubu względem węzła.',
    'geometry',
  ),
  sourceScene(
    'Obciążenia w węźle',
    'Obciążenia przykładamy w węźle W. P₁ działa w dół, P₂ w prawo. Węzeł jest zbieżny, więc równanie momentów jest spełnione tożsamościowo, a do rozwiązania wystarczą dwa równania rzutów na osie.',
    `\\mathbf P_1=(0;-${tex(P1, 0)}),\\qquad \\mathbf P_2=(${tex(P2, 0)};0)\\ \\mathrm{kN}`,
    'Siły w prętach zapisujemy jako S₁·d₁ i S₂·d₂; dodatni wynik oznacza rozciąganie.',
    'loads',
  ),
  sourceScene(
    'Równania równowagi węzła',
    'Sumujemy rzuty wszystkich sił na osie x i y. Otrzymujemy układ dwóch równań liniowych na S₁ i S₂. Macierz układu jest niesingularna, bo kierunki prętów nie są równoległe.',
    `\\begin{cases}-S_1\\sin\\alpha-S_2\\sin\\beta+P_2=0\\\\S_1\\cos\\alpha-S_2\\cos\\beta-P_1=0\\end{cases}`,
    'Kąty α i β występują w równaniach przez swoje sinusy i cosinusy.',
    'equations',
  ),
  sourceScene(
    'Rozwiązanie układu',
    'Rozwiązujemy układ metodą wyznacznikową. Wyznacznik kierunków jest równy sin(α+β), więc jest różny od zera. Otrzymujemy dodatnią siłę w pręcie 1 i ujemną w pręcie 2.',
    `S_1=${tex(S1, 3)}\\ \\mathrm{kN},\\qquad S_2=${tex(S2, 3)}\\ \\mathrm{kN}`,
    'Wartości bezwzględne decydują o doborze przekroju, a znaki o charakterze pracy prętów.',
    'reactions',
  ),
  sourceScene(
    'Znaki i charakter pracy prętów',
    'S₁ > 0 oznacza, że pręt 1 jest rozciągany i ciągnie węzeł w stronę górnego przegubu. S₂ < 0 oznacza ściskanie: pręt 2 odpycha węzeł w stronę przeciwną do dolnego przegubu. Znaki są częścią odpowiedzi.',
    `S_1>0\\ (\\text{rozciąganie}),\\qquad S_2<0\\ (\\text{ściskanie})`,
    'Pręt 2 jest ściskany, mimo że obciążenie P₂ działa poziomo w prawo.',
    'signs',
  ),
  sourceScene(
    'Interpretacja wyniku',
    'Oba pręty współpracują ze sobą: siła pozioma P₂ wywołuje rozciąganie pręta 1 i ściskanie pręta 2. Pręt 1 przenosi większą siłę, bo jego kąt α jest bliższy poziomowi, więc ma większą składową poziomą.',
    `S_1\\sin\\alpha+S_2\\sin\\beta=P_2,\\qquad S_1\\cos\\alpha-S_2\\cos\\beta=P_1`,
    'Układ równań pokazuje sprzężenie obu prętów — nie można wyznaczyć ich sił niezależnie.',
    'interpretation',
  ),
  sourceScene(
    'Niezależna kontrola',
    'Podstawiamy wyznaczone siły do obu równań rzutów. Reszty są rzędu błędów zaokrągleń, co potwierdza wartości i znaki. Sprawdzamy też, że wyznacznik kierunków jest różny od zera.',
    `\\sum F_x=${tex(RX, 6)}\\ \\mathrm{kN},\\qquad \\sum F_y=${tex(RY, 6)}\\ \\mathrm{kN},\\qquad \\det=\\sin(\\alpha+\\beta)`,
    'Kontrola numeryczna w węźle potwierdza poprawność rozwiązania układu.',
    'check',
  ),
]

export default {
  ...createUkladZbieznySolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.TwoBarJointAnimation }))),
} satisfies SolutionData
