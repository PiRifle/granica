import type { SolutionData } from '../../model'
import { FullBendingDesign1Animation } from './animation'

export default {
  id: 'ex-design-full-bending',
  title: 'Pełne zadanie: dobór belki na zginanie — przykład 1',
  duration: 7,
  given: ['L=4 m', 'P=20 kN', 'a=1,4 m', 'k=160 MPa', 'E=200 GPa', 'f_dop=16 mm'],
  result:
    'Przyjęta średnica 110 mm spełnia oba warunki: σ_max = 139,3 MPa < 160 MPa oraz f = 15,4 mm < 16 mm. Ugięcie jest jednak bliskie granicy, więc o zapasie decyduje sztywność.',
  animation: FullBendingDesign1Animation,
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    pointLoads: [{ at: 1.4, value: 20, label: 'P = 20 kN' }],
    shear: [
      [
        [0, 13],
        [1.4, 13],
      ],
      [
        [1.4, -7],
        [4, -7],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1.4, 18.2],
      ],
      [
        [1.4, 18.2],
        [4, 0],
      ],
    ],
    markers: [
      { x: 1.4, y: 13, text: 'T = 13 kN', diagram: 'shear' },
      { x: 1.4, y: -7, text: 'T = -7 kN', diagram: 'shear' },
      { x: 1.4, y: 18.2, text: 'M = 18,2 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '20,0 kN', focus: 'load', reveal: 0 },
      { label: 'L', value: '4,0 m', focus: 'load', reveal: 0 },
      { label: 'a', value: '1,4 m', focus: 'load', reveal: 0 },
      { label: 'b', value: '2,6 m', focus: 'load' },
      { label: 'R_A', value: '13,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '7,0 kN', focus: 'reaction' },
      { label: 'T_A', value: '13,0 kN', focus: 'T' },
      { label: 'T_B', value: '-7,0 kN', focus: 'T', reveal: 2 },
      { label: 'M_max', value: '18,2 kN·m', focus: 'M' },
      { label: 'W_min', value: '113 750 mm³', focus: 'design' },
      { label: 'd_min', value: '105,0 mm', focus: 'design' },
      { label: 'd', value: '110 mm', focus: 'design' },
      { label: 'W', value: '130 669 mm³', focus: 'design' },
      { label: 'σ_max', value: '139,3 MPa', focus: 'stress', reveal: 7 },
      { label: 'I', value: '7 186 875 mm⁴', focus: 'design' },
      { label: 'f', value: '15,4 mm', focus: 'design' },
      { label: 'f_dop', value: '16,0 mm', focus: 'design' },
    ],
    note: 'Maksimum momentu wypada pod siłą P; przyjęty wymiar spełnia oba warunki, a ugięcie jest bliskie granicy.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma L = 4 m i jest obciążona siłą P = 20 kN w odległości a = 1,4 m od lewej podpory. Przyjmujemy k = 160 MPa, E = 200 GPa, przekrój pełnego koła i ugięcie dopuszczalne f_dop = L/250 = 16 mm.',
      caption: 'Schemat, obciążenie i dane materiałowe — bez założonego z góry wymiaru przekroju.',
      visual: 'beam',
      focus: { metric: 'model' },
      formula:
        'L=4\\ \\text{m},\\quad a=1{,}4\\ \\text{m},\\quad b=2{,}6\\ \\text{m},\\quad P=20\\ \\text{kN},\\quad k=160\\ \\text{MPa}',
    },
    {
      title: 'Reakcje i moment maksymalny',
      narration:
        'Reakcje wynoszą R_A = P b/L = 20·2,6/4 = 13 kN oraz R_B = P a/L = 20·1,4/4 = 7 kN. Moment rośnie liniowo do wierzchołka pod siłą: M_max = R_A a = 13·1,4 = 18,2 kN·m = 18 200 000 N·mm.',
      caption: 'Wierzchołek wykresu M wypada pod siłą, a nie w środku rozpiętości.',
      visual: 'beam',
      focus: { metric: 'moment' },
      formula: 'R_A=13\\ \\text{kN},\\qquad M_{\\max}=13\\cdot1{,}4=18{,}2\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Warunek wytrzymałości',
      narration:
        'Wymagany wskaźnik wynosi W_min = M_max/k = 18 200 000/160 = 113 750 mm³. Dla pełnego koła W = πd³/32, więc d_min = ∛(32·113 750/π) ≈ 105,0 mm.',
      caption: 'Warunek wytrzymałości daje średnicę minimalną 105,0 mm; to jeszcze nie dobrany wymiar.',
      visual: 'beam',
      focus: { metric: 'strength' },
      formula:
        'W_{\\min}=\\frac{18\\,200\\,000}{160}=113\\,750\\ \\text{mm}^3,\\qquad d_{\\min}=\\sqrt[3]{\\frac{32\\cdot113\\,750}{\\pi}}\\approx105{,}0\\ \\text{mm}',
    },
    {
      title: 'Dobór przekroju',
      narration:
        'Przyjmujemy d = 110 mm z szeregu wymiarów co 5 mm, ponieważ dostępne 105 mm jest mniejsze od wymaganego 105,0 mm. Rzeczywisty wskaźnik W = π·110³/32 ≈ 130 669 mm³, a moment bezwładności I = π·110⁴/64 ≈ 7 186 875 mm⁴.',
      caption: 'Średnica 110 mm daje zapas wskaźnika względem W_min i zwiększa sztywność.',
      visual: 'beam',
      focus: { metric: 'section' },
      formula:
        'd=110\\ \\text{mm},\\qquad W=\\frac{\\pi\\cdot110^3}{32}\\approx130\\,669\\ \\text{mm}^3,\\qquad I=\\frac{\\pi\\cdot110^4}{64}\\approx7\\,186\\,875\\ \\text{mm}^4',
    },
    {
      title: 'Kontrola naprężeń',
      narration:
        'Naprężenie maksymalne wynosi σ_max = M_max/W = 18 200 000/130 669 ≈ 139,3 MPa. Jest mniejsze od k = 160 MPa, więc warunek wytrzymałości jest spełniony z zapasem około 13%.',
      caption: 'σ_max = 139,3 MPa ≤ 160 MPa — warunek wytrzymałości spełniony.',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: '\\sigma_{\\max}=\\frac{18\\,200\\,000}{130\\,669}\\approx139{,}3\\ \\text{MPa}\\le160\\ \\text{MPa}',
    },
    {
      title: 'Kontrola ugięcia',
      narration:
        'Ugięcie pod siłą wynosi f = P a²b²/(3EIL) = 20 000·1400²·2600²/(3·200 000·7 186 875·4000) ≈ 15,4 mm. Jest mniejsze od f_dop = L/250 = 16 mm, więc oba warunki są spełnione, ale zapas sztywności jest niewielki.',
      caption: 'f = 15,4 mm ≤ 16 mm — oba warunki spełnione; o zapasie decyduje sztywność.',
      visual: 'beam',
      focus: { metric: 'deflection' },
      formula: 'f=\\frac{P a^2b^2}{3EIL}\\approx15{,}4\\ \\text{mm}\\le\\frac{L}{250}=16\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
