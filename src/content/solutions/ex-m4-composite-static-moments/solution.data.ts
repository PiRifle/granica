import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-composite-static-moments',
  title: 'Momenty statyczne i figury złożone — przykład 1',
  duration: 7,
  given: ['środnik 20 × 100 mm', 'półka 120 × 20 mm'],
  result:
    'Pole przekroju wynosi 4400 mm^2, czyli 44 cm^2. Środek ciężkości leży 82,73 mm nad dolnym końcem środnika, a jego współrzędna pozioma to 60 mm. Momenty statyczne wynoszą S_x=364 000 mm^3 i S_y=264 000 mm^3.',
  figure: {
    kind: 'section',
    width: 120,
    height: 120,
    parts: [
      { x: 50, y: 0, width: 20, height: 100, label: 'środnik', tone: 'accent' },
      { x: 0, y: 100, width: 120, height: 20, label: 'półka', tone: 'light' },
    ],
    centroid: { x: 60, y: 82.73 },
    values: [
      { label: 'A₁ środnika', value: '2000 mm²', focus: 'section' },
      { label: 'A₂ półki', value: '2400 mm²', focus: 'section' },
      { label: 'A', value: '4400 mm²', focus: 'section' },
      { label: 'x_C', value: '60 mm', focus: 'centroid' },
      { label: 'y_C', value: '82,73 mm', focus: 'centroid' },
      { label: 'S_x', value: '364 000 mm³', focus: 'centroid' },
      { label: 'S_y', value: '264 000 mm³', focus: 'centroid' },
      { label: 'I_x', value: '5,674·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '2,947·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Teownik 120 × 120 mm: środnik 20 × 100 mm i półka 120 × 20 mm; oś y jest osią symetrii.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Przyjmujemy początek układu na dolnym końcu środnika, oś y pionowo w górę, a oś x poziomo. Przekrój składa się ze środnika 20 × 100 mm i półki 120 × 20 mm. Oś y pokrywa się z osią symetrii.',
      caption: 'Teownik złożony z dwóch prostokątów; oś y przechodzi przez środek półki i środnika.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_1=20\\cdot100,\\quad A_2=120\\cdot20',
    },
    {
      title: 'Pole środnika',
      narration: 'Środnik: A_1=20· 100=2000 mm^2, y_1=50 mm, x_1=60 mm, bo jest wyśrodkowany pod półką.',
      caption: 'Środnik: A_1=20· 100=2000 mm^2, y_1=50 mm, x_1=60 mm.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_1=20\\cdot 100=2000\\ \\text{mm}^2',
    },
    {
      title: 'Pole półki',
      narration: 'Półka: A_2=120· 20=2400 mm^2, y_2=100+10=110 mm, x_2=60 mm.',
      caption: 'Półka: A_2=120· 20=2400 mm^2, y_2=100+10=110 mm, x_2=60 mm.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_2=120\\cdot 20=2400\\ \\text{mm}^2',
    },
    {
      title: 'Pole całkowite',
      narration: 'Pole całkowite: A=2000+2400=4400 mm^2.',
      caption: 'Pole całkowite: A=2000+2400=4400 mm^2.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=2000+2400=4400\\ \\text{mm}^2',
    },
    {
      title: 'Moment statyczny względem osi x',
      narration: 'Moment względem osi x: S_x=2000· 50+2400· 110=100 000+264 000=364 000 mm^3.',
      caption: 'Moment względem osi x: S_x=2000· 50+2400· 110=100 000+264 000=364 000 mm^3.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'S_x=2000\\cdot 50+2400\\cdot 110=100\\,000+264\\,000=364\\,000\\ \\text{mm}^3',
    },
    {
      title: 'Wyznaczenie y_C',
      narration:
        'Środek: y=S_x/A=364 000/4400≈ 82,73 mm. Leży między 50 mm a 110 mm, bliżej półki, bo półka ma większe pole i jest wyżej.',
      caption: 'Środek: y=S_x/A=364 000/4400≈ 82,73 mm. Leży między 50 mm a 110 mm, bliżej półki.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: '\\bar{y}=S_x/A=364\\,000/4400\\approx 82{,}73\\ \\text{mm}',
    },
    {
      title: 'Moment statyczny względem osi y',
      narration: 'Moment względem osi y: z symetrii x=60 mm, więc S_y=4400· 60=264 000 mm^3. Kontrola: S_y/A=60 mm.',
      caption: 'Moment względem osi y: z symetrii x=60 mm, więc S_y=4400· 60=264 000 mm^3.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'S_y=4400\\cdot60=264\\,000\\ \\text{mm}^3,\\quad \\bar{x}=S_y/A=60\\ \\text{mm}',
    },
    {
      title: 'Steiner i moment Ix',
      narration:
        'Dla każdej części stosujemy twierdzenie Steinera: własny moment bh³/12 plus pole razy kwadrat odległości od osi centralnej. Suma daje moment względem poziomej osi centralnej.',
      caption: 'Wkład półki jest duży, bo jej pole leży daleko od wspólnej osi x.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        'I_x=\\left[\\frac{20\\cdot100^3}{12}+2000(50-82{,}73)^2\\right]+\\left[\\frac{120\\cdot20^3}{12}+2400(110-82{,}73)^2\\right]\\approx5{,}674\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment Iy',
      narration:
        'Oś y jest osią symetrii, więc centroidy obu prostokątów leżą na niej i składniki Steinera znikają. Wystarczy zsumować momenty własne względem osi pionowej.',
      caption: 'Przy osi pionowej w trzeciej potędze występują szerokości elementów.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\frac{100\\cdot20^3}{12}+\\frac{20\\cdot120^3}{12}\\approx2{,}947\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Pole wynosi 4400 mm², a centroid leży 82,73 mm nad dolnym końcem środnika. Momenty statyczne opisują położenie pola względem osi odniesienia, a momenty bezwładności sztywność przekroju.',
      caption: 'Osie centralne przechodzą przez punkt (60; 82,73) mm.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula:
        '\\boxed{A=4400\\ \\text{mm}^2,\\quad \\bar{x}=60\\ \\text{mm},\\quad \\bar{y}=82{,}73\\ \\text{mm},\\quad S_x=364\\,000\\ \\text{mm}^3,\\quad S_y=264\\,000\\ \\text{mm}^3}',
    },
  ],
} satisfies SolutionData
