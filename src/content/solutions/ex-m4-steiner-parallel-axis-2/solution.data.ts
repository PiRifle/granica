import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-steiner-parallel-axis-2',
  title: 'Twierdzenie Steinera — przykład 2',
  duration: 7,
  given: ['środnik 20 × 100 mm', 'półka 120 × 20 mm'],
  result:
    'Zwróć uwagę, że wkład półki jest prawie tak duży jak wkład większego pola środnika, mimo że półka ma mniejsze pole. Decyduje odległość od osi. To wyjaśnia, dlaczego w przekrojach zginanych półki umieszcza się na zewnątrz, a nie przy środku.',
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
      { label: 'A środnika', value: '2000 mm²', focus: 'section' },
      { label: 'A półki', value: '2400 mm²', focus: 'section' },
      { label: 'A', value: '4400 mm²', focus: 'section' },
      { label: 'y_C', value: '82,73 mm', focus: 'centroid' },
      { label: 'I_xc środnika', value: '1 666 667 mm⁴', focus: 'Ix' },
      { label: 'I_xc półki', value: '80 000 mm⁴', focus: 'Ix' },
      { label: 'I_x', value: '5,674·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '2,947·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Teownik: środnik 20 × 100 mm i półka 120 × 20 mm; oś centralna 82,73 mm nad dolnym końcem środnika.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Wróćmy do przekroju teowego z lekcji o momentach statycznych: środnik 20 × 100 mm, półka 120 × 20 mm, środek ciężkości 82,73 mm od dolnego końca środnika. Pole wynosi 4400 mm².',
      caption: 'Teownik z osią centralną poziomą na wysokości 82,73 mm.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        'A_1=20\\cdot100=2000\\ \\text{mm}^2,\\quad A_2=120\\cdot20=2400\\ \\text{mm}^2,\\quad A=4400\\ \\text{mm}^2,\\quad \\bar{y}=82{,}73\\ \\text{mm}',
    },
    {
      title: 'Moment środnika',
      narration:
        'Dla środnika I_xc,1=20· 100^3/12=1 666 667 mm^4, a odległość jego środka od osi centralnej to a_1=82,73-50=32,73 mm.',
      caption: 'Własny moment środnika i jego odległość od osi centralnej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_{xc,1}=20\\cdot100^3/12=1\\,666\\,667\\ \\text{mm}^4,\\quad a_1=82{,}73-50=32{,}73\\ \\text{mm}',
    },
    {
      title: 'Steiner dla środnika',
      narration: 'I_1=1 666 667+2000· 32,73^2≈ 1 666 667+2 142 149=3 808 816 mm^4.',
      caption: 'Wkład środnika wraz ze składnikiem przesunięcia.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_1=1\\,666\\,667+2000\\cdot32{,}73^2\\approx1\\,666\\,667+2\\,142\\,149=3\\,808\\,816\\ \\text{mm}^4',
    },
    {
      title: 'Moment półki',
      narration: 'Dla półki I_xc,2=120· 20^3/12=80 000 mm^4, a a_2=110-82,73=27,27 mm.',
      caption: 'Własny moment półki i jej odległość od osi centralnej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_{xc,2}=120\\cdot20^3/12=80\\,000\\ \\text{mm}^4,\\quad a_2=110-82{,}73=27{,}27\\ \\text{mm}',
    },
    {
      title: 'Steiner dla półki',
      narration: 'I_2=80 000+2400· 27,27^2≈ 80 000+1 785 124=1 865 124 mm^4.',
      caption: 'Wkład półki wraz ze składnikiem przesunięcia.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_2=80\\,000+2400\\cdot27{,}27^2\\approx80\\,000+1\\,785\\,124=1\\,865\\,124\\ \\text{mm}^4',
    },
    {
      title: 'Suma Ix',
      narration:
        'Suma daje I_x≈ 5 673 940 mm^4, czyli około 5,67· 10^6 mm^4. Kontrola przez moment względem podstawy potwierdza wynik.',
      caption: 'Suma wkładów środnika i półki.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=3\\,808\\,816+1\\,865\\,124=5\\,673\\,940\\ \\text{mm}^4\\approx5{,}67\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Kontrola przez podstawę',
      narration:
        'Kontrola przez moment względem podstawy: I_podstawa≈ 35,79· 10^6 mm^4, a po odjęciu A y_C^2 otrzymujemy z powrotem około 5,67· 10^6 mm^4.',
      caption: 'Twierdzenie Steinera działa w obie strony.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: '35{,}79\\cdot10^6-4400\\cdot82{,}73^2\\approx5{,}67\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment Iy',
      narration:
        'Oś y jest osią symetrii. Oba prostokąty leżą na niej swoimi środkami, więc moment względem osi pionowej obliczamy bez składników Steinera.',
      caption: 'Moment względem pionowej osi symetrii.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=\\frac{100\\cdot20^3}{12}+\\frac{20\\cdot120^3}{12}\\approx2{,}947\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Zwróć uwagę, że wkład półki jest prawie tak duży jak wkład większego pola środnika, mimo że półka ma mniejsze pole. Decyduje odległość od osi. To wyjaśnia, dlaczego w przekrojach zginanych półki umieszcza się na zewnątrz.',
      caption: 'Oddalenie pola od osi jest ważniejsze niż samo pole części.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\boxed{\\bar{y}=82{,}73\\ \\text{mm},\\quad I_x\\approx5{,}674\\cdot10^6\\ \\text{mm}^4,\\quad I_y\\approx2{,}947\\cdot10^6\\ \\text{mm}^4}',
    },
  ],
} satisfies SolutionData
