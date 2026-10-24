import type { SolutionData } from '../../model'
import { CompositeStaticMoments3Animation } from './animation'

export default {
  id: 'ex-m4-composite-static-moments-3',
  title: 'Momenty statyczne i figury złożone — przykład 3',
  duration: 7,
  given: ['płyta 200 × 120 mm', 'otwór d = 60 mm', 'x_C = 95 mm'],
  result:
    'Otwór o promieniu 30 mm zajmuje przedział od 107,4 mm do 167,4 mm, więc mieści się w płycie. Gdyby wymagano x=90 mm, otrzymalibyśmy x_h≈ 174,9 mm, czyli otwór wystawałby poza prawą krawędź. To pokazuje, że wariant odwrotny trzeba zawsze sprawdzić geometrycznie, a nie tylko algebraicznie.',
  animation: CompositeStaticMoments3Animation,
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Płyta 200 × 120 mm ma kołowy otwór o średnicy 60 mm. Otwór leży na poziomej osi symetrii płyty, więc jego współrzędna y wynosi 60 mm. Szukamy położenia x_h otworu tak, aby wypadkowy środek ciężkości wypadł w x_C = 95 mm.',
      caption: 'Płyta z otworem na osi symetrii; początek układu w lewym dolnym narożniku.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'A_p=200\\cdot120=24\\,000\\ \\text{mm}^2,\\quad x_C=95\\ \\text{mm}',
    },
    {
      title: 'Pola części: materiał i otwór',
      narration:
        'Pole płyty A_p = 24 000 mm², a pole otworu A_h = π·60²/4 ≈ 2827,43 mm². Otwór traktujemy jako pole ujemne, więc pole wypadkowe A = 24 000 − 2827,43 = 21 172,57 mm².',
      caption: 'Otwór jest częścią o polu ujemnym; jego pole odejmujemy od pola płyty.',
      visual: 'section',
      focus: { metric: 'areas' },
      formula:
        'A_h=\\frac{\\pi\\cdot60^2}{4}\\approx2827{,}43\\ \\text{mm}^2,\\quad A=24\\,000-2827{,}43=21\\,172{,}57\\ \\text{mm}^2',
    },
    {
      title: 'Moment statyczny płyty',
      narration:
        'Środek płyty ma x_p = 100 mm. Moment płyty względem osi y wynosi więc S_yp = 24 000·100 = 2 400 000 mm³. To dodatni wkład materiału, który ciągnie środek w prawo.',
      caption: 'Moment płyty względem lewej krawędzi jest dodatni.',
      visual: 'section',
      focus: { metric: 'plate-moment' },
      formula: 'S_{yp}=24\\,000\\cdot100=2\\,400\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Odejmowanie momentu otworu',
      narration:
        'Otwór wnosi moment ujemny −A_h·x_h. Warunek na wypadkowy środek ma postać S_yp − A_h·x_h = A·x_C. Po podstawieniu: 2 400 000 − 2827,43·x_h = 21 172,57·95.',
      caption: 'Moment otworu odejmujemy, bo otwór jest polem ujemnym.',
      visual: 'section',
      focus: { metric: 'balance' },
      formula: '2\\,400\\,000-2827{,}43\\,x_h=21\\,172{,}57\\cdot95',
    },
    {
      title: 'Przesunięcie otworu do rozwiązania',
      narration:
        'Prawa strona wynosi 2 011 394 mm³, zatem x_h = (2 400 000 − 2 011 394)/2827,43 ≈ 137,4 mm. Gdy otwór przesuwa się w prawo, wypadkowy środek przesuwa się w lewo — od x = 100 mm do x = 95 mm.',
      caption: 'Otwór przesuwa się w prawo, a centroid netto w lewo, do zadanej linii x_C = 95 mm.',
      visual: 'section',
      focus: { metric: 'solve' },
      formula: 'x_h=\\frac{2\\,400\\,000-2\\,011\\,394}{2827{,}43}\\approx137{,}4\\ \\text{mm}',
    },
    {
      title: 'Kontrola geometryczna',
      narration:
        'Otwór o promieniu 30 mm zajmuje przedział od 107,4 mm do 167,4 mm, więc mieści się w płycie. Gdyby wymagano x = 90 mm, otrzymalibyśmy x_h ≈ 174,9 mm, czyli otwór wystawałby poza prawą krawędź.',
      caption: 'Wynik algebraiczny trzeba sprawdzić z rzeczywistym zakresem współrzędnej otworu.',
      visual: 'section',
      focus: { metric: 'check' },
      formula: '137{,}4-30=107{,}4\\ \\text{mm},\\quad 137{,}4+30=167{,}4\\ \\text{mm}',
    },
  ],
} satisfies SolutionData
