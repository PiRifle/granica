import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-single-double-3',
  title: 'Połączenia jedno- i dwucięte — przykład 3',
  duration: 7,
  given: ['F = 90 kN', 'tau_{dop} = 120 MPa'],
  result:
    'W praktyce projektant często iteruje: dobiera średnicę, sprawdza rozstaw i odległości od krawędzi, a potem wraca do obliczeń. Nasz przykład pomija te szczegóły, ale pokazuje logikę. Najpierw warunek wytrzymałości, potem zaokrąglenie, na końcu kontrola. Dopiero po niej można przejść do rysunku wykonawczego.',
  figure: {
    kind: 'section',
    width: 22,
    height: 22,
    parts: [
      {
        x: 0,
        y: 0,
        width: 22,
        height: 22,
        label: 'sworzeń ∅22',
        tone: 'solid',
      },
    ],
    centroid: {
      x: 11,
      y: 11,
    },
    values: [
      {
        label: 'F',
        value: '90 kN',
        focus: 'load',
        reveal: 0,
      },
      {
        label: 'τ_dop',
        value: '120 MPa',
        focus: 'stress',
        reveal: 0,
      },
      {
        label: 'A_s,min',
        value: '750 mm²',
        focus: 'design',
      },
      {
        label: 'A_min',
        value: '375 mm²',
        focus: 'design',
        reveal: 1,
      },
      {
        label: 'd_min',
        value: '21,85 mm',
        focus: 'design',
        reveal: 2,
      },
      {
        label: 'd',
        value: '22 mm',
        focus: 'design',
      },
      {
        label: 'A',
        value: '380,13 mm²',
        focus: 'design',
      },
      {
        label: 'τ_sr',
        value: '118,4 MPa',
        focus: 'stress',
        reveal: 3,
      },
    ],
    note: 'Przyjęto średnicę handlową 22 mm; naprężenie 118,4 MPa jest poniżej 120 MPa.',
    shape: 'circle',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Zaprojektujmy średnicę sworznia dwuciętego dla siły F = 90 kN i naprężenia dopuszczalnego τ_dop = 120 MPa. Tym razem szukamy wymiaru, a nie naprężenia.',
      caption:
        'Zaprojektujmy średnicę sworznia dwuciętego dla siły F = 90 kN i naprężenia dopuszczalnego τ_dop = 120 MPa. Tym razem szukamy…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'F = 90\\ \\text{kN}',
    },
    {
      title: 'Krok 2',
      narration:
        'Wymagane łączne pole ścinania wynosi A_s ≥ F/τ_dop = 90 000/120 = 750 mm^2. Dla jednego sworznia dwuciętego A_s = 2A, więc pole jednego przekroju musi wynosić co najmniej A ≥ 375 mm^2.',
      caption:
        'Wymagane łączne pole ścinania wynosi A_s ≥ F/τ_dop = 90 000/120 = 750 mm^2. Dla jednego sworznia dwuciętego A_s = 2A, więc pole…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'A_s \\ge F/\\tau_{dop} = 90\\,000/120 = 750\\ \\text{mm}^2',
    },
    {
      title: 'Krok 3',
      narration:
        'Z zależności A = π d^2/4 otrzymujemy d ≥ √(4A/π) = √(4 · 375/π) = √(477,46) = 21,85 mm. Najmniejsza dopuszczalna średnica to około 21,9 mm.',
      caption:
        'Z zależności A = π d^2/4 otrzymujemy d ≥ √(4A/π) = √(4 · 375/π) = √(477,46) = 21,85 mm. Najmniejsza dopuszczalna średnica to…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
      formula: 'A = \\pi d^2/4',
    },
    {
      title: 'Krok 4',
      narration:
        'Wybieramy średnicę handlową 22 mm i sprawdzamy ponownie. Pole wynosi A = π · 22^2/4 = 380,13 mm^2, łączne pole 2A = 760,27 mm^2, a naprężenie τ_sr = 90 000/760,27 = 118,38 MPa, czyli poniżej 120 MPa. Warunek jest spełniony.',
      caption:
        'Wybieramy średnicę handlową 22 mm i sprawdzamy ponownie. Pole wynosi A = π · 22^2/4 = 380,13 mm^2, łączne pole 2A = 760,27 mm^2,…',
      visual: 'section',
      focus: {
        metric: 'stress',
      },
      formula: 'A = \\pi \\cdot 22^2/4 = 380{,}13\\ \\text{mm}^2',
    },
    {
      title: 'Krok 5',
      narration:
        'Zwróć uwagę, że zaokrąglenie średnicy w górę zwiększa pole, ale nie zmienia liczby płaszczyzn. Gdyby wynik był blisko granicy, moglibyśmy rozważyć zwiększenie liczby sworzni zamiast średnicy. To decyzja projektowa: większa średnica oznacza cięższy łącznik i większy otwór w blasze, a większa liczba łączników oznacza dłuższe połączenie i bardziej złożony montaż.',
      caption:
        'Zwróć uwagę, że zaokrąglenie średnicy w górę zwiększa pole, ale nie zmienia liczby płaszczyzn. Gdyby wynik był blisko granicy,…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
    },
    {
      title: 'Krok 6',
      narration:
        'W praktyce projektant często iteruje: dobiera średnicę, sprawdza rozstaw i odległości od krawędzi, a potem wraca do obliczeń. Nasz przykład pomija te szczegóły, ale pokazuje logikę. Najpierw warunek wytrzymałości, potem zaokrąglenie, na końcu kontrola. Dopiero po niej można przejść do rysunku wykonawczego.',
      caption:
        'W praktyce projektant często iteruje: dobiera średnicę, sprawdza rozstaw i odległości od krawędzi, a potem wraca do obliczeń.…',
      visual: 'section',
      focus: {
        metric: 'design',
      },
    },
  ],
} satisfies SolutionData
