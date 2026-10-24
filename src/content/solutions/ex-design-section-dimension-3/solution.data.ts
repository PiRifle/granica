import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-section-dimension-3',
  title: 'Dobór wymiaru z warunku wytrzymałości — przykład 3',
  duration: 7,
  given: ['L=2,5 m', 'd=60 mm', 'k=150 MPa'],
  result:
    'Większość błędów w tym zadaniu wynika z jednostek, potęgi przy średnicy albo pominięcia kontroli sztywności. Poniższa lista porządkuje najczęstsze pułapki.',
  figure: {
    kind: 'beam',
    length: 2.5,
    supports: [
      { at: 0, label: 'A' },
      { at: 2.5, label: 'B' },
    ],
    pointLoads: [{ at: 1.25, value: 5.09, label: 'P = 5,09 kN' }],
    shear: [
      [
        [0, 2.545],
        [1.25, 2.545],
      ],
      [
        [1.25, -2.545],
        [2.5, -2.545],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1.25, 3.18],
      ],
      [
        [1.25, 3.18],
        [2.5, 0],
      ],
    ],
    markers: [
      { x: 1.25, y: 2.545, text: 'T = 2,55 kN', diagram: 'shear' },
      { x: 1.25, y: -2.545, text: 'T = -2,55 kN', diagram: 'shear' },
      { x: 1.25, y: 3.18, text: 'M = 3,18 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '2,5 m', focus: 'load', reveal: 0 },
      { label: 'd', value: '60 mm', focus: 'design', reveal: 0 },
      { label: 'k', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'W', value: '21 206 mm³', focus: 'design' },
      { label: 'M_max', value: '3,18 kN·m', focus: 'design', reveal: 1 },
      { label: 'P_max', value: '5,09 kN', focus: 'design' },
      { label: 'R_A', value: '2,55 kN', focus: 'reaction' },
      { label: 'R_B', value: '2,55 kN', focus: 'reaction' },
      { label: 'T', value: '2,55 kN', focus: 'T' },
    ],
    note: 'Przy d = 60 mm dopuszczalna siła w środku rozpiętości wynosi około 5,09 kN.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem znamy wymiar i pytamy o dopuszczalne obciążenie. Belka swobodnie podparta ma L=2,5 m i przekrój kołowy o d=60 mm. Naprężenie dopuszczalne wynosi k=150 MPa. Jaka jest największa siła P w środku rozpiętości?',
      caption:
        'Tym razem znamy wymiar i pytamy o dopuszczalne obciążenie. Belka swobodnie podparta ma L=2,5 m i przekrój kołowy o d=60 mm.…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'L=2{,}5\\ \\text{m}',
    },
    {
      title: 'Krok 2',
      narration:
        'Najpierw wskaźnik: W=π· 60^3/32=π· 216 000/32≈ 21 206 mm^3. Dopuszczalny moment wynosi M_max=kW=150· 21 206=3 180 900 N·mm≈ 3,18 kN·m.',
      caption:
        'Najpierw wskaźnik: W=π· 60^3/32=π· 216 000/32≈ 21 206 mm^3. Dopuszczalny moment wynosi M_max=kW=150· 21 206=3 180 900 N·mm≈ 3,18…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'W=\\pi\\cdot 60^3/32=\\pi\\cdot 216\\,000/32\\approx 21\\,206\\ \\text{mm}^3',
    },
    {
      title: 'Krok 3',
      narration:
        'Z zależności M_max=PL/4 otrzymujemy P=4M_max/L=4· 3,18/2,5≈ 5,09 kN. To obciążenie wyczerpuje naprężenie dopuszczalne, więc w projekcie trzeba by je zmniejszyć o przyjęty zapas lub zwiększyć średnicę.',
      caption:
        'Z zależności M_max=PL/4 otrzymujemy P=4M_max/L=4· 3,18/2,5≈ 5,09 kN. To obciążenie wyczerpuje naprężenie dopuszczalne, więc w…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'M_{\\max}=PL/4',
    },
    {
      title: 'Krok 4',
      narration:
        'Przy tym obciążeniu reakcje wynoszą R_A=R_B=P/2≈2,55 kN, a siła tnąca na obu odcinkach ma wartość 2,55 kN. Moment maksymalny w środku to 3,18 kN·m.',
      caption:
        'Przy tym obciążeniu reakcje wynoszą R_A=R_B=P/2≈2,55 kN, a siła tnąca na obu odcinkach ma wartość 2,55 kN. Moment maksymalny w środku…',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=R_B=2{,}55\\ \\text{kN}',
    },
    {
      title: 'Siła tnąca',
      narration: 'Siła tnąca wynosi T = R_A = 2,55 kN po lewej stronie siły i T = -R_B = -2,55 kN po prawej.',
      caption: 'Siła tnąca wynosi T = R_A = 2,55 kN po lewej stronie siły i T = -R_B = -2,55 kN po prawej.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T = R_A = 2{,}55\\ \\text{kN}',
    },
    {
      title: 'Krok 5',
      narration:
        'Wariant odwrotny jest dobrym testem zrozumienia, ponieważ wymaga przejścia w obie strony: od geometrii do wskaźnika, od wskaźnika do momentu i od momentu do siły. Każdy z tych kroków ma inną jednostkę, co sprzyja błędom, jeśli nie zapisujemy jednostek na bieżąco.',
      caption:
        'Wariant odwrotny jest dobrym testem zrozumienia, ponieważ wymaga przejścia w obie strony: od geometrii do wskaźnika, od wskaźnika…',
      visual: 'beam',
      focus: { metric: 'T' },
    },
    {
      title: 'Krok 6',
      narration:
        'Warto przy tym zauważyć, że wynik P≈ 5,09 kN jest obciążeniem granicznym dla przyjętego k. W projekcie nie przyjmujemy go bez zapasu; albo zmniejszamy siłę, albo zwiększamy przekrój, albo obniżamy k przez większy współczynnik bezpieczeństwa.',
      caption:
        'Warto przy tym zauważyć, że wynik P≈ 5,09 kN jest obciążeniem granicznym dla przyjętego k. W projekcie nie przyjmujemy go bez…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'P\\approx 5{,}09\\ \\text{kN}',
    },
    {
      title: 'Krok 7',
      narration:
        'Jeśli zadanie podaje wymagany współczynnik bezpieczeństwa n, zamiast k używamy k=R_e/n. Wtedy dopuszczalny moment maleje proporcjonalnie do 1/n, a dopuszczalna siła również. Warto od razu zapisać, czy k jest już naprężeniem dopuszczalnym, czy dopiero granicą materiału. To rozróżnienie jest częstym źródłem nieporozumień.',
      caption:
        'Jeśli zadanie podaje wymagany współczynnik bezpieczeństwa n, zamiast k używamy k=R_e/n. Wtedy dopuszczalny moment maleje…',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: 'n',
    },
    {
      title: 'Krok 8',
      narration:
        'Większość błędów w tym zadaniu wynika z jednostek, potęgi przy średnicy albo pominięcia kontroli sztywności. Poniższa lista porządkuje najczęstsze pułapki.',
      caption:
        'Większość błędów w tym zadaniu wynika z jednostek, potęgi przy średnicy albo pominięcia kontroli sztywności. Poniższa lista…',
      visual: 'beam',
      focus: { metric: 'design' },
    },
  ],
} satisfies SolutionData
