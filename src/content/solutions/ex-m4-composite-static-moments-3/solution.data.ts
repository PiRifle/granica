import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-composite-static-moments-3',
  title: 'Momenty statyczne i figury złożone — przykład 3',
  duration: 7,
  given: ['płyta 200 × 120 mm', 'otwór d = 60 mm', 'x_C = 95 mm'],
  result:
    'Otwór o promieniu 30 mm zajmuje przedział od 107,4 mm do 167,4 mm, więc mieści się w płycie. Gdyby wymagano x=90 mm, otrzymalibyśmy x_h≈ 174,9 mm, czyli otwór wystawałby poza prawą krawędź. To pokazuje, że wariant odwrotny trzeba zawsze sprawdzić geometrycznie, a nie tylko algebraicznie.',
  figure: {
    kind: 'section',
    width: 200,
    height: 120,
    parts: [{ x: 0, y: 0, width: 200, height: 120, label: 'płyta', tone: 'light' }],
    holes: [{ cx: 137.4, cy: 60, r: 30, label: '∅60' }],
    centroid: { x: 95, y: 60 },
    values: [
      { label: 'A płyty', value: '24 000 mm²', focus: 'section' },
      { label: 'A otworu', value: '2827,43 mm²', focus: 'section' },
      { label: 'A netto', value: '21 172,57 mm²', focus: 'section' },
      { label: 'x_C', value: '95 mm', focus: 'centroid', reveal: 0 },
      { label: 'y_C', value: '60 mm', focus: 'centroid' },
      { label: 'x otworu', value: '137,4 mm', focus: 'centroid' },
      { label: 'S_y', value: '2 011 394 mm³', focus: 'centroid' },
      { label: 'I_x netto', value: '28,16·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y netto', value: '74,28·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Płyta 200 × 120 mm z otworem ∅60 mm; otwór leży na poziomej osi symetrii.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Płyta 200 × 120 mm ma kołowy otwór o średnicy 60 mm. Otwór leży na poziomej osi symetrii płyty, więc jego współrzędna y wynosi 60 mm, a oś x przechodzi przez środek wysokości.',
      caption: 'Płyta z otworem na osi symetrii; początek układu w lewym dolnym narożniku.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_p=200\\cdot120=24\\,000\\ \\text{mm}^2',
    },
    {
      title: 'Pola części',
      narration:
        'Pole płyty A_p=24 000 mm^2, pole otworu A_h=π· 60^2/4=900π≈ 2827,43 mm^2. Pole wypadkowe A=24 000-2827,43=21 172,57 mm^2.',
      caption: 'Otwór traktujemy jako pole ujemne.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        'A_h=\\frac{\\pi\\cdot60^2}{4}\\approx2827{,}43\\ \\text{mm}^2,\\quad A=24\\,000-2827{,}43=21\\,172{,}57\\ \\text{mm}^2',
    },
    {
      title: 'Moment statyczny płyty',
      narration: 'Środek płyty ma x_p=100 mm, więc jej moment względem osi y wynosi S_yp=24 000· 100=2 400 000 mm^3.',
      caption: 'Moment statyczny płyty względem lewej krawędzi.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'S_{yp}=24\\,000\\cdot100=2\\,400\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Warunek na wypadkowy środek',
      narration:
        'Warunek na wypadkowy środek to S_yp - A_h x_h = A x_C. Podstawiamy znane pole i wymaganą współrzędną 95 mm.',
      caption: 'Moment otworu odejmujemy, bo jest polem ujemnym.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '2\\,400\\,000-2827{,}43\\,x_h=21\\,172{,}57\\cdot95',
    },
    {
      title: 'Obliczenie położenia otworu',
      narration: 'Prawa strona wynosi 2 011 394 mm^3, zatem x_h=(2 400 000-2 011 394)/2827,43≈ 137,4 mm.',
      caption: 'Otwór musi leżeć w odległości 137,4 mm od lewej krawędzi.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'x_h=\\frac{2\\,400\\,000-2\\,011\\,394}{2827{,}43}\\approx137{,}4\\ \\text{mm}',
    },
    {
      title: 'Moment bezwładności Ix',
      narration:
        'Płyta ma I_x=200·120³/12, a otwór leży na osi x, więc jego składnik Steinera znika. Odejmujemy moment własny otworu πd⁴/64.',
      caption: 'Moment względem poziomej osi centralnej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        'I_x=\\frac{200\\cdot120^3}{12}-\\frac{\\pi\\cdot60^4}{64}=28\\,800\\,000-636\\,173\\approx28{,}16\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment bezwładności Iy',
      narration:
        'Otwór jest oddalony od pionowej osi centralnej o 42,4 mm. Dlatego oprócz momentu własnego odejmujemy również składnik Steinera A_h(137,4-95)².',
      caption: 'Moment względem pionowej osi centralnej.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula:
        'I_y=\\frac{120\\cdot200^3}{12}-\\left[\\frac{\\pi\\cdot60^4}{64}+2827{,}43(137{,}4-95)^2\\right]\\approx74{,}28\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Kontrola geometryczna',
      narration:
        'Otwór o promieniu 30 mm zajmuje przedział od 107,4 mm do 167,4 mm, więc mieści się w płycie. Gdyby wymagano x=90 mm, otrzymalibyśmy x_h≈ 174,9 mm, czyli otwór wystawałby poza prawą krawędź.',
      caption: 'Wynik algebraiczny trzeba sprawdzić z rzeczywistym zakresem współrzędnej otworu.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '137{,}4-30=107{,}4\\ \\text{mm},\\quad 137{,}4+30=167{,}4\\ \\text{mm}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Wariant odwrotny trzeba zawsze sprawdzić geometrycznie, a nie tylko algebraicznie. Otwór o średnicy 60 mm mieści się w płycie tylko dlatego, że jego środek leży dostatecznie daleko od krawędzi.',
      caption: 'Pole netto, centroid i momenty bezwładności po odjęciu otworu.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        '\\boxed{\\bar{x}=95\\ \\text{mm},\\quad x_h=137{,}4\\ \\text{mm},\\quad A=21\\,172{,}57\\ \\text{mm}^2,\\quad I_x\\approx28{,}16\\cdot10^6\\ \\text{mm}^4,\\quad I_y\\approx74{,}28\\cdot10^6\\ \\text{mm}^4}',
    },
  ],
} satisfies SolutionData
