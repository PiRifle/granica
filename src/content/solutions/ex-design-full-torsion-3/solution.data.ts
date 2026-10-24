import type { SolutionData } from '../../model'
import { FullTorsion3Animation } from './animation'

export default {
  id: 'ex-design-full-torsion-3',
  title: 'Pełne zadanie: wał pełny i drążony — przykład 3',
  duration: 7,
  given: ['D=80 mm', 'd=50 mm', 'L=1500 mm', 'tau_{dop}=40 MPa', 'varphi_{dop}=2°', 'G=80 GPa'],
  result:
    'Wariant odwrotny jest dobrym testem zrozumienia, ponieważ wymaga przejścia od geometrii do J_o, potem do W_o, a następnie do T z dwóch różnych warunków. Każdy krok ma inną jednostkę i inne znaczenie fizyczne. Zapisanie, który warunek decyduje, jest równie ważne jak sam wynik liczbowy.',
  figure: {
    kind: 'section',
    width: 80,
    height: 80,
    parts: [
      {
        x: 0,
        y: 0,
        width: 80,
        height: 80,
        label: 'rura ∅80',
        tone: 'light',
      },
    ],
    holes: [
      {
        cx: 40,
        cy: 40,
        r: 25,
        label: '∅50',
      },
    ],
    centroid: {
      x: 40,
      y: 40,
    },
    values: [
      {
        label: 'D',
        value: '80 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'd',
        value: '50 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'L',
        value: '1500 mm',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'τ_dop',
        value: '40 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'φ_dop',
        value: '2°',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'G',
        value: '80 GPa',
        focus: 'design',
        reveal: 0,
      },
      {
        label: 'J_o',
        value: '3 407 625 mm⁴',
        focus: 'design',
      },
      {
        label: 'W_o',
        value: '85 191 mm³',
        focus: 'design',
        reveal: 1,
      },
      {
        label: 'T z wytrzymałości',
        value: '3,41 kN·m',
        focus: 'design',
      },
      {
        label: 'T ze sztywności',
        value: '6,34 kN·m',
        focus: 'design',
        reveal: 2,
      },
      {
        label: 'T_max',
        value: '3,41 kN·m',
        focus: 'design',
      },
      {
        label: 'φ przy T_max',
        value: '1,07°',
        focus: 'design',
        reveal: 3,
      },
    ],
    note: 'Decyduje wytrzymałość: T_max = 3,41 kN·m, a kąt 1,07° jest znacznie mniejszy od 2°.',
    shape: 'circle',
  },
  animation: FullTorsion3Animation,
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Znamy geometrię i pytamy o dopuszczalny moment. Rura ma D = 80 mm, d = 50 mm i długość L = 1500 mm. Przyjmujemy τ_dop = 40 MPa, φ_dop = 2° i G = 80 GPa.',
      caption: 'Tym razem średnice są dane, a szukaną wielkością jest moment skręcający.',
      visual: 'section',
      focus: {
        metric: 'model',
      },
      formula: 'D=80\\ \\text{mm},\\qquad d=50\\ \\text{mm},\\qquad L=1500\\ \\text{mm}',
    },
    {
      title: 'Geometria przekroju',
      narration:
        'Najpierw geometria: J_o = π(80⁴ − 50⁴)/32 ≈ 3 407 625 mm⁴, a W_o = 2J_o/D ≈ 85 191 mm³. Naprężenie rośnie liniowo od zera w osi do τ_max na zewnętrznym obwodzie, więc w ściance rury zmienia się od 25 do 40 MPa.',
      caption: 'J_o i W_o wynikają z geometrii; w ściance rury naprężenie rośnie liniowo od wewnątrz na zewnątrz.',
      visual: 'section',
      focus: {
        metric: 'section',
      },
      formula:
        'J_o=\\frac{\\pi(80^4-50^4)}{32}\\approx3\\,407\\,625\\ \\text{mm}^4,\\qquad W_o=\\frac{2J_o}{D}\\approx85\\,191\\ \\text{mm}^3',
    },
    {
      title: 'Nośność z wytrzymałości',
      narration:
        'Z warunku wytrzymałości T ≤ τ_dop·W_o = 40·85 191 ≈ 3 407 640 N·mm ≈ 3,41 kN·m. Przy tym momencie naprężenie na zewnętrznym obwodzie osiąga wartość dopuszczalną.',
      caption: 'Wytrzymałość ogranicza moment do około 3,41 kN·m.',
      visual: 'section',
      focus: {
        metric: 'strength',
      },
      formula: 'T\\le\\tau_{\\mathrm{dop}}W_o=40\\cdot85\\,191\\approx3{,}41\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Nośność ze sztywności',
      narration:
        'Kąt dopuszczalny w radianach wynosi 2·π/180 ≈ 0,03491. Z warunku sztywności T ≤ GJ_oφ_dop/L = 80 000·3 407 625·0,03491/1500 ≈ 6,34 kN·m.',
      caption: 'Sztywność dopuszcza większy moment — ten warunek nie decyduje.',
      visual: 'section',
      focus: {
        metric: 'stiffness',
      },
      formula: 'T\\le\\frac{GJ_o\\varphi_{\\mathrm{dop}}}{L}\\approx6{,}34\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Decyduje wytrzymałość',
      narration:
        'Przyjmujemy T_max ≈ 3,41 kN·m. Przy tym momencie kąt wynosi φ = 3,41·10⁶·1500/(80 000·3 407 625) ≈ 0,01875 rad ≈ 1,07°, czyli znacznie mniej niż 2°. Zapas sztywności jest duży, ale zapas wytrzymałości został wykorzystany.',
      caption: 'T_max = 3,41 kN·m; naprężenie jest na granicy, a kąt 1,07° pozostaje poniżej 2°.',
      visual: 'section',
      focus: {
        metric: 'check',
      },
      formula: 'T_{\\max}\\approx3{,}41\\ \\text{kN}\\cdot\\text{m},\\qquad\\varphi\\approx1{,}07^\\circ<2^\\circ',
    },
    {
      title: 'Wniosek: rola L/D',
      narration:
        'Przy stałym naprężeniu i T = τW_o dla rury φ = TL/(GJ_o) = 2τL/(GD). Kąt zależy od L/D, a nie wprost od grubości ścianki. Dwukrotnie dłuższa rura skręca się dwa razy mocniej przy tym samym naprężeniu.',
      caption: 'Wydłużenie wału lub zmniejszenie D zwiększa kąt nawet wtedy, gdy naprężenie pozostaje takie samo.',
      visual: 'section',
      focus: {
        metric: 'insight',
      },
      formula: '\\varphi=\\frac{2\\tau L}{GD}',
    },
  ],
} satisfies SolutionData
