import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-full-bending-2',
  title: 'Pełne zadanie: dobór belki na zginanie — przykład 2',
  duration: 7,
  given: ['L=4 m', 'P=20 kN', 'a=1,4 m', 'h=2b', 'k=160 MPa', 'E=200 GPa'],
  result:
    'W praktyce projektant często zaczyna od kształtu znanego z katalogu, a potem sprawdza, czy spełnia oba warunki. Katalog podaje I i W dla konkretnej osi, więc nie trzeba ich wyprowadzać od zera. Ważne jest natomiast, aby nie mieszać osi i nie podstawiać W dla jednego kierunku do momentu działającego w innym. To częsty błąd przy belkach zginanych ukośnie.',
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
      { label: 'R_A', value: '13,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '7,0 kN', focus: 'reaction', reveal: 0 },
      { label: 'T_A', value: '13,0 kN', focus: 'T' },
      { label: 'T_B', value: '-7,0 kN', focus: 'T', reveal: 1 },
      { label: 'M_max', value: '18,2 kN·m', focus: 'M' },
      { label: 'W_min', value: '113 750 mm³', focus: 'design', reveal: 2 },
      { label: 'b_min', value: '55,5 mm', focus: 'design', reveal: 2 },
      { label: 'b', value: '60 mm', focus: 'design' },
      { label: 'h', value: '120 mm', focus: 'design' },
      { label: 'W', value: '144 000 mm³', focus: 'design', reveal: 3 },
      { label: 'σ_max', value: '126,4 MPa', focus: 'stress', reveal: 3 },
      { label: 'I', value: '8 640 000 mm⁴', focus: 'design', reveal: 3 },
      { label: 'f', value: '12,8 mm', focus: 'design', reveal: 3 },
      { label: 'A prostokąta', value: '7 200 mm²', focus: 'design' },
      { label: 'A koła ∅110', value: '9 503 mm²', focus: 'design', reveal: 7 },
    ],
    note: 'Prostokąt 60 × 120 mm jest lżejszy od koła ∅110 mm przy podobnej nośności.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Reakcje dla schematu: R_A=Pb/L=20·2,6/4=13 kN, R_B=Pa/L=20·1,4/4=7 kN.',
      caption: 'Reakcje dla schematu: R_A=Pb/L=20·2,6/4=13 kN, R_B=Pa/L=20·1,4/4=7 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=Pb/L=20\\cdot2{,}6/4=13\\ \\text{kN}',
    },
    {
      title: 'Krok 2',
      narration: 'Siła tnąca wynosi T=13 kN po lewej stronie siły i T=-7 kN po prawej.',
      caption: 'Siła tnąca wynosi T=13 kN po lewej stronie siły i T=-7 kN po prawej.',
      visual: 'beam',
      focus: { metric: 'T' },
      formula: 'T=13\\ \\text{kN}',
    },
    {
      title: 'Krok 3',
      narration:
        'Rozważmy ten sam schemat i moment M_max=18,2 kN·m, ale przekrój prostokątny o proporcji h=2b. Wymagany wskaźnik nadal wynosi W_min=113 750 mm^3. Dla prostokąta W=bh^2/6=b(2b)^2/6=2b^3/3, więc b^3≥3W_min/2=170 625 i b≥55,5 mm.',
      caption:
        'Rozważmy ten sam schemat i moment M_max=18,2 kN·m, ale przekrój prostokątny o proporcji h=2b. Wymagany wskaźnik nadal wynosi…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{\\max}=18{,}2\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Krok 4',
      narration:
        'Przyjmujemy b=60 mm i h=120 mm. Rzeczywisty wskaźnik wynosi W=60·120^2/6=144 000 mm^3, a naprężenie σ=18 200 000/144 000≈126,4 MPa, czyli mniej niż 160 MPa. Moment bezwładności I=60·120^3/12=8 640 000 mm^4, a ugięcie f≈12,8 mm, więc warunek 16 mm jest spełniony z większym zapasem niż dla koła.',
      caption:
        'Przyjmujemy b=60 mm i h=120 mm. Rzeczywisty wskaźnik wynosi W=60·120^2/6=144 000 mm^3, a naprężenie σ=18 200 000/144 000≈126,4…',
      visual: 'beam',
      focus: { metric: 'stress' },
      formula: 'b=60\\ \\text{mm}',
    },
    {
      title: 'Krok 5',
      narration:
        'Porównanie jest pouczające. Pole prostokąta wynosi 7200 mm^2, a koła o d=110 mm około 9503 mm^2. Prostokąt jest więc lżejszy, mimo że ma większą wysokość. Wskaźnik na jednostkę pola wynosi 20,0 mm dla prostokąta i około 13,8 mm dla koła. To dlatego belki o przekroju dwuteowym lub skrzynkowym są znacznie bardziej efektywne: materiał jest odsunięty od osi obojętnej, gdzie pracuje najskuteczniej.',
      caption:
        'Porównanie jest pouczające. Pole prostokąta wynosi 7200 mm^2, a koła o d=110 mm około 9503 mm^2. Prostokąt jest więc lżejszy,…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '7200\\ \\text{mm}^2',
    },
    {
      title: 'Krok 6',
      narration:
        'Nie oznacza to, że prostokąt jest zawsze lepszy. Wysoka i wąska belka jest podatna na zwichrzenie boczne, a jej wykonanie i połączenia mogą być trudniejsze. Koło jest symetryczne i wygodne w montażu. Wybór kształtu to kompromis między nośnością, sztywnością, masą, statecznością i technologią.',
      caption:
        'Nie oznacza to, że prostokąt jest zawsze lepszy. Wysoka i wąska belka jest podatna na zwichrzenie boczne, a jej wykonanie i…',
      visual: 'beam',
      focus: { metric: 'design' },
    },
    {
      title: 'Krok 7',
      narration:
        'Kierunek zginania ma tu ogromne znaczenie. Prostokąt 60×120 mm jest efektywny, gdy jest zginany względem osi równoległej do krótszego boku, czyli gdy obciążenie działa w płaszczyźnie wysokości 120 mm. Po obróceniu o 90° ten sam przekrój ma znacznie mniejszy W, ponieważ wysokość wynosi wtedy 60 mm. W zadaniu trzeba więc zawsze sprawdzić, względem której osi liczony jest moment bezwładności.',
      caption:
        'Kierunek zginania ma tu ogromne znaczenie. Prostokąt 60×120 mm jest efektywny, gdy jest zginany względem osi równoległej do…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '60\\times120\\ \\text{mm}',
    },
    {
      title: 'Krok 8',
      narration:
        'W praktyce projektant często zaczyna od kształtu znanego z katalogu, a potem sprawdza, czy spełnia oba warunki. Katalog podaje I i W dla konkretnej osi, więc nie trzeba ich wyprowadzać od zera. Ważne jest natomiast, aby nie mieszać osi i nie podstawiać W dla jednego kierunku do momentu działającego w innym. To częsty błąd przy belkach zginanych ukośnie.',
      caption:
        'W praktyce projektant często zaczyna od kształtu znanego z katalogu, a potem sprawdza, czy spełnia oba warunki. Katalog podaje I…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'I',
    },
  ],
} satisfies SolutionData
