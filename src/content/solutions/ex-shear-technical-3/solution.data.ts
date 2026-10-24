import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-technical-3',
  title: 'Ścinanie techniczne: siła w poprzek przekroju — przykład 3',
  duration: 7,
  given: ['F = 50 kN', 'tau_{dop} = 80 MPa'],
  result:
    'Zwróć uwagę, że zaokrąglenie średnicy w górę jest bezpieczne, ale nie zawsze wystarcza. Przy średnicy 30 mm naprężenie spadło do 70,7 MPa, jednak nadal trzeba sprawdzić docisk blachy i wytrzymałość przekroju netto. Sam sworzeń może być mocny, a blacha wokół otworu zbyt cienka. Projektowanie połączenia to zawsze sprawdzenie całego układu, nie tylko jednego elementu.',
  figure: {
    kind: 'section',
    width: 30,
    height: 30,
    parts: [
      {
        x: 0,
        y: 0,
        width: 30,
        height: 30,
        label: 'sworzeń ∅30',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 15,
      y: 15,
    },
    values: [
      {
        label: 'F',
        value: '50 kN',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'τ_dop',
        value: '80 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'A_s,min',
        value: '625 mm²',
        focus: 'design',
      },
      {
        label: 'd_min',
        value: '28,2 mm',
        focus: 'design',
        reveal: 1,
      },
      {
        label: 'd',
        value: '30 mm',
        focus: 'design',
      },
      {
        label: 'A',
        value: '706,86 mm²',
        focus: 'design',
      },
      {
        label: 'τ_sr',
        value: '70,7 MPa',
        focus: 'stress',
        reveal: 2,
      },
    ],
    note: 'Po zaokrągleniu do 30 mm naprężenie spada do 70,7 MPa, poniżej 80 MPa.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Załóżmy, że znamy dopuszczalne naprężenie styczne i chcemy dobrać średnicę sworznia. Połączenie jest jednocięte, siła wynosi F = 50 kN, a naprężenie dopuszczalne przyjęto τ_dop = 80 MPa. Szukamy najmniejszej średnicy, dla której warunek τ_sr ≤ τ_dop jest spełniony.',
      caption:
        'Załóżmy, że znamy dopuszczalne naprężenie styczne i chcemy dobrać średnicę sworznia. Połączenie jest jednocięte, siła wynosi F =…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'F = 50\\ \\text{kN}',
    },
    {
      title: 'Krok 2',
      narration:
        'Najpierw wyznaczamy wymagane pole ścinane: A_s ≥ F/τ_dop = 50 000/80 = 625 mm^2. Dla jednej płaszczyzny ścinania A_s = π d^2/4, więc d ≥ √(4A_s/π) = √(4 · 625/π) = √(795,77) = 28,2 mm.',
      caption:
        'Najpierw wyznaczamy wymagane pole ścinane: A_s ≥ F/τ_dop = 50 000/80 = 625 mm^2. Dla jednej płaszczyzny ścinania A_s = π d^2/4,…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'A_s \\ge F/\\tau_{dop} = 50\\,000/80 = 625\\ \\text{mm}^2',
    },
    {
      title: 'Krok 3',
      narration:
        'Najmniejsza średnica z warunku wytrzymałości to około 28,2 mm. W praktyce wybieramy najbliższy dostępny wymiar większy od tej wartości, na przykład 30 mm. Sprawdzamy: A = π · 30^2/4 = 706,86 mm^2, a τ_sr = 50 000/706,86 = 70,7 MPa, czyli mniej niż 80 MPa.',
      caption:
        'Najmniejsza średnica z warunku wytrzymałości to około 28,2 mm. W praktyce wybieramy najbliższy dostępny wymiar większy od tej…',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: 'A = \\pi \\cdot 30^2/4 = 706{,}86\\ \\text{mm}^2',
    },
    {
      title: 'Krok 4',
      narration:
        'Ten przykład pokazuje typową kolejność pracy projektowej. Najpierw przekształcasz wzór, potem zaokrąglasz wynik w górę do wymiaru handlowego, a na końcu wracasz do wzoru i sprawdzasz, czy zaokrąglenie nie zepsuło warunku. Nigdy nie zostawiaj wyniku bez tej końcowej kontroli.',
      caption:
        'Ten przykład pokazuje typową kolejność pracy projektowej. Najpierw przekształcasz wzór, potem zaokrąglasz wynik w górę do wymiaru…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
    },
    {
      title: 'Krok 5',
      narration:
        'Zwróć uwagę, że zaokrąglenie średnicy w górę jest bezpieczne, ale nie zawsze wystarcza. Przy średnicy 30 mm naprężenie spadło do 70,7 MPa, jednak nadal trzeba sprawdzić docisk blachy i wytrzymałość przekroju netto. Sam sworzeń może być mocny, a blacha wokół otworu zbyt cienka. Projektowanie połączenia to zawsze sprawdzenie całego układu, nie tylko jednego elementu.',
      caption:
        'Zwróć uwagę, że zaokrąglenie średnicy w górę jest bezpieczne, ale nie zawsze wystarcza. Przy średnicy 30 mm naprężenie spadło do…',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
    },
  ],
} satisfies SolutionData
