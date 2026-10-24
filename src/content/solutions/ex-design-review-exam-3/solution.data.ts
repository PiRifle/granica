import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-review-exam-3',
  title: 'Powtórka mieszana i strategia kolokwium — przykład 3',
  duration: 7,
  given: ['M=3 kN·m', 'k=150 MPa'],
  result:
    'Wariant odwrotny uczy, że kontrola rzędu wielkości jest częścią rozwiązania. Średnica 0,6 mm lub 5,9 mm powinna natychmiast wzbudzić podejrzenie. Podobnie moment 18 200 N·mm zamiast 18 200 000 N·mm daje wskaźnik tysiąc razy za mały, a średnicę około dziesięć razy za małą. Zawsze warto zapytać, czy otrzymany wymiar jest realistyczny dla danej konstrukcji.',
  figure: {
    kind: 'beam',
    length: 2,
    supports: [
      { at: 0, label: 'A' },
      { at: 2, label: 'B' },
    ],
    pointLoads: [{ at: 1, value: 6, label: 'P = 6 kN' }],
    shear: [
      [
        [0, 3],
        [1, 3],
      ],
      [
        [1, -3],
        [2, -3],
      ],
    ],
    moment: [
      [
        [0, 0],
        [1, 3],
      ],
      [
        [1, 3],
        [2, 0],
      ],
    ],
    markers: [
      { x: 1, y: 3, text: 'T = 3 kN', diagram: 'shear' },
      { x: 1, y: -3, text: 'T = -3 kN', diagram: 'shear' },
      { x: 1, y: 3, text: 'M = 3 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'M', value: '3,0 kN·m', focus: 'M', reveal: 0 },
      { label: 'k', value: '150 MPa', focus: 'stress', reveal: 0 },
      { label: 'W (błędne)', value: '0,02 mm³', focus: 'design', reveal: 0 },
      { label: 'd (błędne)', value: '0,6 mm', focus: 'design', reveal: 0 },
      { label: 'W', value: '20 000 mm³', focus: 'design', reveal: 1 },
      { label: 'd_min', value: '58,8 mm', focus: 'design', reveal: 1 },
      { label: 'd', value: '60 mm', focus: 'design' },
      { label: 'W (60)', value: '21 206 mm³', focus: 'design' },
      { label: 'σ', value: '141,5 MPa', focus: 'stress', reveal: 2 },
      { label: 'R_A', value: '3,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '3,0 kN', focus: 'reaction' },
    ],
    note: 'Poprawny wskaźnik to 20 000 mm³, a nie 0,02 mm³; wynik 60 mm jest realistyczny.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Na kolokwium często trzeba ocenić gotowe rozwiązanie. Przypuśćmy, że student oblicza belkę dla M=3 kN·m i k=150 MPa, a następnie zapisuje W=3/150=0,02 mm^3 i wnioskuje, że średnica może wynosić około 0,6 mm. Wynik jest absurdalny, więc trzeba znaleźć błąd.',
      caption:
        'Na kolokwium często trzeba ocenić gotowe rozwiązanie. Przypuśćmy, że student oblicza belkę dla M=3 kN·m i k=150 MPa, a następnie…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'M=3\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Krok 2',
      narration:
        'Błąd polega na pominięciu zamiany jednostek. Moment 3 kN·m to 3 000 000 N·mm, a nie 3. Poprawny wskaźnik wynosi W=3 000 000/150=20 000 mm^3. Dla pełnego koła d=∛(32W/π)=∛(640 000/π)≈58,8 mm, więc sensowny wymiar to 60 mm.',
      caption:
        'Błąd polega na pominięciu zamiany jednostek. Moment 3 kN·m to 3 000 000 N·mm, a nie 3. Poprawny wskaźnik wynosi W=3 000…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '3\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Krok 3',
      narration:
        'Sprawdzenie przyjętego wymiaru: W=π·60^3/32≈21 206 mm^3, a σ=3 000 000/21 206≈141,5 MPa≤150 MPa. Wynik jest poprawny i ma niewielki zapas. Gdyby student użył 3000/150=20 mm^3, otrzymałby d≈5,9 mm, co również jest absurdalne dla belki o takim momencie.',
      caption:
        'Sprawdzenie przyjętego wymiaru: W=π·60^3/32≈21 206 mm^3, a σ=3 000 000/21 206≈141,5 MPa≤150 MPa. Wynik jest poprawny i ma…',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: 'W=\\pi\\cdot60^3/32\\approx21\\,206\\ \\text{mm}^3',
    },
    {
      title: 'Krok 4',
      narration:
        'Przy przyjętym obciążeniu reakcje wynoszą po 3 kN, a siła tnąca na obu odcinkach ma wartość 3 kN. Moment maksymalny w środku to 3 kN·m.',
      caption:
        'Przy przyjętym obciążeniu reakcje wynoszą po 3 kN, a siła tnąca na obu odcinkach ma wartość 3 kN. Moment maksymalny w środku to 3 kN·m.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=R_B=3\\ \\text{kN}',
    },
    {
      title: 'Siła tnąca',
      narration: 'Siła tnąca wynosi T = R_A = 3 kN po lewej stronie siły i T = -R_B = -3 kN po prawej.',
      caption: 'Siła tnąca wynosi T = R_A = 3 kN po lewej stronie siły i T = -R_B = -3 kN po prawej.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T = R_A = 3\\ \\text{kN}',
    },
    {
      title: 'Krok 5',
      narration:
        'Wariant odwrotny uczy, że kontrola rzędu wielkości jest częścią rozwiązania. Średnica 0,6 mm lub 5,9 mm powinna natychmiast wzbudzić podejrzenie. Podobnie moment 18 200 N·mm zamiast 18 200 000 N·mm daje wskaźnik tysiąc razy za mały, a średnicę około dziesięć razy za małą. Zawsze warto zapytać, czy otrzymany wymiar jest realistyczny dla danej konstrukcji.',
      caption:
        'Wariant odwrotny uczy, że kontrola rzędu wielkości jest częścią rozwiązania. Średnica 0,6 mm lub 5,9 mm powinna natychmiast…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: '0{,}6\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
