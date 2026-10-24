import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-composite-static-moments-2',
  title: 'Momenty statyczne i figury złożone — przykład 2',
  duration: 7,
  given: ['środnik 10 × 180 mm', 'półki 80 × 10 mm'],
  result:
    'Zatem x=73 000/3400≈ 21,47 mm. Wynik leży między 5 mm a 40 mm i jest bliżej środnika, który ma największe pole. Gdybyśmy przez pomyłkę policzyli środnik jako pełny prostokąt 10 × 200 mm, a półki jako 80 × 10 mm, pole wzrosłoby do 3600 mm² i pojawiłby się podwójnie policzony narożnik 10 × 10 mm.',
  figure: {
    kind: 'section',
    width: 80,
    height: 200,
    parts: [
      { x: 0, y: 10, width: 10, height: 180, label: 'środnik', tone: 'accent' },
      { x: 0, y: 0, width: 80, height: 10, label: 'półka dolna', tone: 'light' },
      { x: 0, y: 190, width: 80, height: 10, label: 'półka górna', tone: 'light' },
    ],
    centroid: { x: 21.47, y: 100 },
    values: [
      { label: 'A środnika', value: '1800 mm²', focus: 'section' },
      { label: 'A półki', value: '800 mm²', focus: 'section' },
      { label: 'A', value: '3400 mm²', focus: 'section' },
      { label: 'x_C', value: '21,47 mm', focus: 'centroid' },
      { label: 'y_C', value: '100 mm', focus: 'centroid' },
      { label: 'S_x', value: '340 000 mm³', focus: 'centroid' },
      { label: 'S_y', value: '73 000 mm³', focus: 'centroid' },
      { label: 'I_x', value: '19,31·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '1,418·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Ceownik otwarty w prawo: środnik 10 × 180 mm i dwie półki 80 × 10 mm.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Rozważmy kanał (ceownik) otwarty w prawo: środnik 10 × 180 mm oraz dwie półki 80 × 10 mm, górna i dolna. Wysokość całkowita wynosi 200 mm, a szerokość 80 mm. Dzielimy przekrój tak, aby części nie nachodziły na siebie.',
      caption: 'Ceownik otwarty w prawo; początek układu w lewym dolnym narożniku półki dolnej.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_1=10\\cdot180,\\quad A_2=A_3=80\\cdot10',
    },
    {
      title: 'Podział na części',
      narration:
        'Środnik zajmuje pas między półkami: 10 × 180 mm, jego środek leży w (5; 100). Półka dolna ma pole 800 mm² i środek (40; 5), a górna (40; 195). Taki podział nie liczy narożników dwukrotnie.',
      caption: 'Trzy prostokąty bez nakładania się; współrzędne środków w milimetrach.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_1=1800,\\quad A_2=800,\\quad A_3=800\\ \\text{mm}^2',
    },
    {
      title: 'Pole całkowite',
      narration:
        'Pole całkowite A=1800+800+800=3400 mm^2. Moment względem osi x obliczamy z sumy iloczynów pól i współrzędnych y.',
      caption: 'Pole całkowite A=1800+800+800=3400 mm^2.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=1800+800+800=3400\\ \\text{mm}^2',
    },
    {
      title: 'Moment statyczny względem osi x',
      narration: 'S_x=1800· 100+800· 5+800· 195=180 000+4000+156 000=340 000 mm^3.',
      caption: 'S_x=1800· 100+800· 5+800· 195=180 000+4000+156 000=340 000 mm^3.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'S_x=1800\\cdot 100+800\\cdot 5+800\\cdot 195=180\\,000+4000+156\\,000=340\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Wyznaczenie y_C',
      narration: 'Stąd y=340 000/3400=100 mm, co zgadza się z symetrią względem poziomej osi środkowej.',
      caption: 'Stąd y=340 000/3400=100 mm, co zgadza się z symetrią.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{y}=340\\,000/3400=100\\ \\text{mm}',
    },
    {
      title: 'Moment statyczny względem osi y',
      narration: 'S_y=1800· 5+800· 40+800· 40=9000+32 000+32 000=73 000 mm^3.',
      caption: 'S_y=1800· 5+800· 40+800· 40=9000+32 000+32 000=73 000 mm^3.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'S_y=1800\\cdot 5+800\\cdot 40+800\\cdot 40=9000+32\\,000+32\\,000=73\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Wyznaczenie x_C',
      narration:
        'Zatem x=73 000/3400≈ 21,47 mm. Wynik leży między 5 mm a 40 mm i jest bliżej środnika, który ma największe pole.',
      caption: 'Centroid leży blisko środnika, bo jego pole dominuje w przekroju.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{x}=73\\,000/3400\\approx21{,}47\\ \\text{mm}',
    },
    {
      title: 'Steiner i moment Ix',
      narration:
        'Środnik leży na osi x, więc jego składnik Steinera znika. Obie półki są oddalone o 95 mm od osi centralnej, dlatego ich wkład przesunięcia jest duży.',
      caption: 'Moment względem poziomej osi centralnej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        'I_x=\\frac{10\\cdot180^3}{12}+2\\left[\\frac{80\\cdot10^3}{12}+800(195-100)^2\\right]\\approx19{,}31\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment Iy',
      narration:
        'Przy osi pionowej środnik ma mały moment własny, a półki wnoszą zarówno moment własny, jak i składnik Steinera związany z odległością ich środków od osi y.',
      caption: 'Moment względem pionowej osi centralnej.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula:
        'I_y=\\frac{180\\cdot10^3}{12}+2\\left[\\frac{10\\cdot80^3}{12}+800(40-21{,}47)^2\\right]\\approx1{,}418\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Gdybyśmy przez pomyłkę policzyli środnik jako pełny prostokąt 10 × 200 mm, a półki jako 80 × 10 mm, pole wzrosłoby do 3600 mm² i pojawiłby się podwójnie policzony narożnik 10 × 10 mm.',
      caption: 'Poprawny podział części decyduje o wartości pola i położeniu centroidu.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        '\\boxed{A=3400\\ \\text{mm}^2,\\quad \\bar{x}=21{,}47\\ \\text{mm},\\quad \\bar{y}=100\\ \\text{mm},\\quad I_x\\approx19{,}31\\cdot10^6\\ \\text{mm}^4,\\quad I_y\\approx1{,}418\\cdot10^6\\ \\text{mm}^4}',
    },
  ],
} satisfies SolutionData
