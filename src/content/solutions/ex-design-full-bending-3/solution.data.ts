import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-full-bending-3',
  title: 'Pełne zadanie: dobór belki na zginanie — przykład 3',
  duration: 7,
  given: ['L=4 m', 'd=100 mm', 'k=150 MPa', 'E=200 GPa'],
  result:
    'Warto też pamiętać, że belka swobodnie podparta nie jest jedynym schematem. Wspornik ma maksimum momentu w utwierdzeniu i zupełnie inny wzór na ugięcie. Belka utwierdzona na obu końcach jest statycznie niewyznaczalna i wymaga warunków zgodności. W tej lekcji ograniczamy się do schematu swobodnie podpartego, ale procedura projektowa pozostaje podobna: schemat, siły wewnętrzne, naprężenia, warunki, decyzja.',
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 9.82, label: 'P_max = 9,82 kN' }],
    shear: [
      [
        [0, 4.91],
        [2, 4.91],
      ],
      [
        [2, -4.91],
        [4, -4.91],
      ],
    ],
    moment: [
      [
        [0, 0],
        [2, 9.82],
      ],
      [
        [2, 9.82],
        [4, 0],
      ],
    ],
    markers: [
      { x: 2, y: 4.91, text: 'T = 4,91 kN', diagram: 'shear' },
      { x: 2, y: -4.91, text: 'T = -4,91 kN', diagram: 'shear' },
      { x: 2, y: 9.82, text: 'M = 9,82 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '4,0 m', focus: 'load', reveal: 0 },
      { label: 'd', value: '100 mm', focus: 'design', reveal: 0 },
      { label: 'k', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'E', value: '200 GPa', focus: 'design', reveal: 0 },
      { label: 'W', value: '98 175 mm³', focus: 'design' },
      { label: 'I', value: '4 908 738 mm⁴', focus: 'design' },
      { label: 'M_dop', value: '14,73 kN·m', focus: 'design', reveal: 1 },
      { label: 'P z wytrzymałości', value: '14,73 kN', focus: 'design', reveal: 1 },
      { label: 'P ze sztywności', value: '9,82 kN', focus: 'design' },
      { label: 'P_max', value: '9,82 kN', focus: 'design' },
      { label: 'σ przy P_max', value: '100 MPa', focus: 'stress' },
      { label: 'f_dop', value: '13,33 mm', focus: 'design', reveal: 0 },
      { label: 'R_A', value: '4,91 kN', focus: 'reaction' },
      { label: 'R_B', value: '4,91 kN', focus: 'reaction' },
      { label: 'T', value: '4,91 kN', focus: 'T' },
    ],
    note: 'Decyduje sztywność: P_max = 9,82 kN, choć wytrzymałość pozwalałaby na 14,73 kN.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Tym razem znamy przekrój i pytamy o dopuszczalne obciążenie. Belka swobodnie podparta ma L=4 m, przekrój kołowy o d=100 mm i jest obciążona siłą w środku. Przyjmij k=150 MPa, E=200 GPa i f_dop=L/300=13,33 mm.',
      caption:
        'Tym razem znamy przekrój i pytamy o dopuszczalne obciążenie. Belka swobodnie podparta ma L=4 m, przekrój kołowy o d=100 mm i jest…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'L=4\\ \\text{m}',
    },
    {
      title: 'Krok 2',
      narration:
        'Najpierw wskaźnik i moment bezwładności: W=π·100^3/32≈98 175 mm^3, I=π·100^4/64≈4 908 738 mm^4. Dopuszczalny moment z wytrzymałości wynosi M_dop=kW=150·98 175≈14,73 kN·m.',
      caption:
        'Najpierw wskaźnik i moment bezwładności: W=π·100^3/32≈98 175 mm^3, I=π·100^4/64≈4 908 738 mm^4. Dopuszczalny moment z…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'W=\\pi\\cdot100^3/32\\approx98\\,175\\ \\text{mm}^3',
    },
    {
      title: 'Krok 3',
      narration:
        'Dla siły w środku M_max=PL/4, więc z wytrzymałości P≤4M_dop/L=4·14,73/4=14,73 kN. Z warunku sztywności f=PL^3/(48EI)≤ f_dop, czyli P≤48EIf_dop/L^3. Po podstawieniu P≤48·200 000·4 908 738·13,33/4000^3≈9,82 kN.',
      caption:
        'Dla siły w środku M_max=PL/4, więc z wytrzymałości P≤4M_dop/L=4·14,73/4=14,73 kN. Z warunku sztywności f=PL^3/(48EI)≤ f_dop,…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'M_{\\max}=PL/4',
    },
    {
      title: 'Krok 4',
      narration:
        'Decyduje sztywność, więc P_max≈9,82 kN. Przy tej sile naprężenie wynosi około 100 MPa, czyli znacznie mniej niż 150 MPa. Widać, że zapas wytrzymałości nie jest w pełni wykorzystany, ponieważ belka jest zbyt podatna. Gdyby zadanie wymagało wykorzystania pełnej nośności, trzeba by zmienić materiał na sztywniejszy, zwiększyć średnicę albo skrócić rozpiętość.',
      caption:
        'Decyduje sztywność, więc P_max≈9,82 kN. Przy tej sile naprężenie wynosi około 100 MPa, czyli znacznie mniej niż 150 MPa. Widać,…',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: 'P_{\\max}\\approx9{,}82\\ \\text{kN}',
    },
    {
      title: 'Krok 5',
      narration:
        'Przy P_max reakcje wynoszą R_A=R_B=P/2=4,91 kN, a siła tnąca na obu odcinkach ma wartość 4,91 kN. Moment maksymalny w środku wynosi M=P L/4=9,82 kN·m.',
      caption:
        'Przy P_max reakcje wynoszą R_A=R_B=P/2=4,91 kN, a siła tnąca na obu odcinkach ma wartość 4,91 kN. Moment maksymalny w środku…',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=R_B=4{,}91\\ \\text{kN}',
    },
    {
      title: 'Krok 6',
      narration:
        'Wariant odwrotny uczy, że nie wolno zatrzymać się na pierwszym warunku. Często to nie wytrzymałość, lecz sztywność albo stateczność wyznacza rzeczywiste ograniczenie. Po obliczeniu P_max z obu warunków trzeba przyjąć mniejszą wartość i wyraźnie zapisać, który warunek jest decydujący.',
      caption:
        'Wariant odwrotny uczy, że nie wolno zatrzymać się na pierwszym warunku. Często to nie wytrzymałość, lecz sztywność albo…',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'P_{\\max}',
    },
    {
      title: 'Krok 7',
      narration:
        'W zadaniach egzaminacyjnych warto po każdym kroku zapisać jednostkę i sprawdzić rząd wielkości. Moment 18,2 kN·m to 18,2 miliona N·mm, a nie 18 200. Średnica 105 mm jest sensowna dla belki o rozpiętości 4 m i sile 20 kN; średnica 1 mm lub 1000 mm sygnalizowałaby błąd jednostek.',
      caption:
        'W zadaniach egzaminacyjnych warto po każdym kroku zapisać jednostkę i sprawdzić rząd wielkości. Moment 18,2 kN·m to 18,2 miliona…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: '18{,}2\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Krok 8',
      narration:
        'Kontrola rzędu wielkości jest szczególnie ważna przy doborze z katalogu. Jeśli dla małej belki wychodzi dwuteownik o wysokości 500 mm, prawdopodobnie w mianowniku użyto złej jednostki. Jeśli dla dużego stropu wychodzi pręt o średnicy 10 mm, prawdopodobnie pominięto czynnik 10^3 lub 10^6. Zanim zaakceptujesz wynik, porównaj go z typowymi wymiarami podobnych konstrukcji.',
      caption:
        'Kontrola rzędu wielkości jest szczególnie ważna przy doborze z katalogu. Jeśli dla małej belki wychodzi dwuteownik o wysokości…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '500\\ \\text{mm}',
    },
    {
      title: 'Krok 9',
      narration:
        'Warto też pamiętać, że belka swobodnie podparta nie jest jedynym schematem. Wspornik ma maksimum momentu w utwierdzeniu i zupełnie inny wzór na ugięcie. Belka utwierdzona na obu końcach jest statycznie niewyznaczalna i wymaga warunków zgodności. W tej lekcji ograniczamy się do schematu swobodnie podpartego, ale procedura projektowa pozostaje podobna: schemat, siły wewnętrzne, naprężenia, warunki, decyzja.',
      caption:
        'Warto też pamiętać, że belka swobodnie podparta nie jest jedynym schematem. Wspornik ma maksimum momentu w utwierdzeniu i…',
      visual: 'beam',
      focus: { metric: 'design' },
    },
  ],
} satisfies SolutionData
