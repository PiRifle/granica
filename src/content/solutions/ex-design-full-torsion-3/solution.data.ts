import type { SolutionData } from '../../model'

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
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Znamy geometrię i pytamy o dopuszczalny moment. Rura ma D=80 mm, d=50 mm i długość L=1,5 m. Przyjmij τ_dop=40 MPa, φ_dop=2° i G=80 GPa.',
      caption:
        'Znamy geometrię i pytamy o dopuszczalny moment. Rura ma D=80 mm, d=50 mm i długość L=1,5 m. Przyjmij τ_dop=40 MPa, φ_dop=2° i…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'D=80\\ \\text{mm}',
    },
    {
      title: 'Krok 2',
      narration:
        'Najpierw geometria: J_o=π(80^4-50^4)/32≈3 407 625 mm^4, a W_o=2J_o/D≈85 191 mm^3. Z wytrzymałości T≤τ_dopW_o=40·85 191≈3 407 640 N·mm≈3,41 kN·m.',
      caption:
        'Najpierw geometria: J_o=π(80^4-50^4)/32≈3 407 625 mm^4, a W_o=2J_o/D≈85 191 mm^3. Z wytrzymałości T≤τ_dopW_o=40·85 191≈3 407 640…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'J_o=\\pi(80^4-50^4)/32\\approx3\\,407\\,625\\ \\text{mm}^4',
    },
    {
      title: 'Krok 3',
      narration:
        'Kąt dopuszczalny w radianach wynosi 2·π/180≈0,03491. Z warunku sztywności T≤ GJ_oφ_dop/L=80 000·3 407 625·0,03491/1500≈6,34 kN·m.',
      caption:
        'Kąt dopuszczalny w radianach wynosi 2·π/180≈0,03491. Z warunku sztywności T≤ GJ_oφ_dop/L=80 000·3 407 625·0,03491/1500≈6,34 kN·m.',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: '2\\cdot\\pi/180\\approx0{,}03491',
    },
    {
      title: 'Krok 4',
      narration:
        'Decyduje wytrzymałość, więc T_max≈3,41 kN·m. Przy tym momencie kąt wynosi φ=3,41·10^6·1500/(80 000·3 407 625)≈0,01875 rad≈1,07°, czyli znacznie mniej niż 2°. Zapas sztywności jest duży, ale zapas wytrzymałości został wykorzystany.',
      caption:
        'Decyduje wytrzymałość, więc T_max≈3,41 kN·m. Przy tym momencie kąt wynosi φ=3,41·10^6·1500/(80 000·3 407 625)≈0,01875…',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: 'T_{\\max}\\approx3{,}41\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Krok 5',
      narration:
        'Ciekawa jest zależność kąta od naprężenia przy T=τ W_o. Dla rury W_o=2J_o/D, więc φ=TL/(GJ_o)=τ(2J_o/D)L/(GJ_o)=2τ L/(GD). Przy stałym τ kąt zależy od L/D, a nie od grubości ścianki wprost. To pokazuje, że wydłużanie wału lub zmniejszanie średnicy zewnętrznej zwiększa kąt nawet wtedy, gdy naprężenie pozostaje takie samo.',
      caption:
        'Ciekawa jest zależność kąta od naprężenia przy T=τ W_o. Dla rury W_o=2J_o/D, więc φ=TL/(GJ_o)=τ(2J_o/D)L/(GJ_o)=2τ L/(GD). Przy…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'T=\\tau W_o',
    },
    {
      title: 'Krok 6',
      narration:
        'Wariant odwrotny jest dobrym testem zrozumienia, ponieważ wymaga przejścia od geometrii do J_o, potem do W_o, a następnie do T z dwóch różnych warunków. Każdy krok ma inną jednostkę i inne znaczenie fizyczne. Zapisanie, który warunek decyduje, jest równie ważne jak sam wynik liczbowy.',
      caption:
        'Wariant odwrotny jest dobrym testem zrozumienia, ponieważ wymaga przejścia od geometrii do J_o, potem do W_o, a następnie do T z…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'J_o',
    },
  ],
} satisfies SolutionData
