import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-method-of-sections-2',
  title: 'Metoda przekrojów: zajrzyj do środka — przykład 2',
  duration: 7,
  given: ['L_AB = 1,2 m', 'A_AB = 300 mm²', 'L_BC = 0,8 m', 'A_BC = 200 mm²', 'P_B = 15 kN', 'P_C = 10 kN'],
  result:
    'N_BC = 10 kN, N_AB = 25 kN, σ_BC = 50 MPa, σ_AB = 83,3 MPa. Największa siła i największe naprężenie występują w odcinku AB, ale to nie jest regułą. Gdyby odcinek BC miał znacznie mniejsze pole, mógłby mieć większe naprężenie mimo mniejszej siły. Dlatego po wyznaczeniu N w każdym przedziale trzeba sprawdzić iloraz |N|/A, a nie tylko największe |N|.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: { N: 'kN', σ: 'MPa', A: 'mm²' },
    segments: [
      { id: 'ab', label: 'AB', length: 1200, area: 300, n: 25, sigma: 83.3 },
      { id: 'bc', label: 'BC', length: 800, area: 200, n: 10, sigma: 50 },
    ],
    loads: [
      { node: 1, value: 15, label: '15 kN' },
      { node: 2, value: 10, label: '10 kN' },
    ],
    note: 'Utwierdzenie A daje reakcję 25 kN w górę. Siły podłużne są dodatnie, bo oba odcinki są rozciągane.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pionowy pręt jest utwierdzony górnym końcem A i składa się z dwóch odcinków. Odcinek AB ma długość 1,2 m i pole przekroju 300 mm². Odcinek BC ma długość 0,8 m i pole 200 mm². W punkcie B działa siła 15 kN w dół, a w swobodnym końcu C siła 10 kN w dół.',
      caption: 'Pręt dwuodcinkowy AB–BC z siłami 15 kN w B i 10 kN w C.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula:
        'L_{AB}=1{,}2\\ \\text{m},\\quad A_{AB}=300\\ \\text{mm}^2,\\quad L_{BC}=0{,}8\\ \\text{m},\\quad A_{BC}=200\\ \\text{mm}^2',
    },
    {
      title: 'Reakcja w utwierdzeniu',
      narration:
        'Rozpatrujemy cały pręt. Jedyną reakcją jest siła w utwierdzeniu A, skierowana w górę. Równowaga pionowa daje R_A = 15 + 10 = 25 kN.',
      caption: 'R_A = 25 kN w górę.',
      visual: 'axial',
      focus: { metric: 'N' },
      formula: 'R_A=15+10=25\\ \\text{kN}',
    },
    {
      title: 'Przekrój w odcinku BC',
      narration:
        'Przecinamy odcinek BC i zostawiamy dolną część z siłą 10 kN. Na górnej ścianie dolnej części dodatnie N jest skierowane w górę, bo rozciąga przekrój. Równowaga pionowa daje N_BC − 10 = 0.',
      caption: 'N_BC = 10 kN (rozciąganie).',
      visual: 'axial',
      focus: { metric: 'N', segment: 'bc' },
      formula: 'N_{BC}-10=0\\quad\\Rightarrow\\quad N_{BC}=10\\ \\text{kN}',
    },
    {
      title: 'Naprężenie w odcinku BC',
      narration:
        'Dzielimy siłę 10 kN, czyli 10 000 N, przez pole 200 mm². Otrzymujemy 50 N/mm², czyli 50 MPa. Wartość dodatnia oznacza rozciąganie.',
      caption: 'σ_BC = 50 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'bc' },
      formula: '\\sigma_{BC}=\\frac{10\\,000}{200}=50\\ \\text{MPa}',
    },
    {
      title: 'Przekrój w odcinku AB',
      narration:
        'Teraz przecinamy odcinek AB i zostawiamy dolną część, która zawiera obie siły: 15 kN w B i 10 kN w C. Równowaga pionowa daje N_AB − 15 − 10 = 0, więc N_AB = 25 kN.',
      caption: 'N_AB = 25 kN (rozciąganie).',
      visual: 'axial',
      focus: { metric: 'N', segment: 'ab' },
      formula: 'N_{AB}-15-10=0\\quad\\Rightarrow\\quad N_{AB}=25\\ \\text{kN}',
    },
    {
      title: 'Naprężenie w odcinku AB',
      narration:
        'Dzielimy 25 000 N przez pole 300 mm². Otrzymujemy 83,3 N/mm², czyli 83,3 MPa. To największe naprężenie w całym pręcie.',
      caption: 'σ_AB = 83,3 MPa.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'ab' },
      formula: '\\sigma_{AB}=\\frac{25\\,000}{300}=83{,}3\\ \\text{MPa}',
    },
    {
      title: 'Porównanie naprężeń',
      narration:
        'Odcinek AB ma większą siłę i większe naprężenie. Nie można jednak wnioskować tylko z siły: o naprężeniu decyduje iloraz |N|/A. Mniejszy przekrój może zrównoważyć mniejszą siłę i dać większe naprężenie.',
      caption: 'Do oceny wytrzymałości porównuj |N|/A, a nie samo |N|.',
      visual: 'axial',
      focus: { metric: 'σ', segment: 'ab' },
      formula: '|\\sigma|_{AB}=83{,}3\\ \\text{MPa}>|\\sigma|_{BC}=50\\ \\text{MPa}',
    },
    {
      title: 'Kontrola globalnej równowagi',
      narration:
        'Reakcja w A jest równa sile normalnej w AB. To kontrola globalnej równowagi: siła w utwierdzeniu musi równoważyć wszystkie obciążenia poniżej. Wynik 25 kN jest spójny z wcześniejszym obliczeniem.',
      caption: 'R_A = N_AB = 25 kN potwierdza równowagę.',
      visual: 'axial',
      focus: { metric: 'N', segment: 'ab' },
      formula: 'R_A=N_{AB}=25\\ \\text{kN}',
    },
  ],
} satisfies SolutionData
