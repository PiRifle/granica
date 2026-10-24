import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-steiner-parallel-axis',
  title: 'Twierdzenie Steinera — przykład 1',
  duration: 7,
  given: ['półki 120 × 20 mm', 'środnik 20 × 160 mm'],
  result:
    'Moment bezwładności dwuteownika względem poziomej osi centralnej wynosi około 45,87· 10^6 mm^4≈ 4587 cm^4. Przy jednej trzeciej materiału przekrój zachowuje ponad połowę sztywności pełnego prostokąta, co pokazuje skuteczność oddalania półek od osi.',
  figure: {
    kind: 'section',
    width: 120,
    height: 200,
    parts: [
      { x: 0, y: 0, width: 120, height: 20, label: 'półka dolna', tone: 'light' },
      { x: 50, y: 20, width: 20, height: 160, label: 'środnik', tone: 'accent' },
      { x: 0, y: 180, width: 120, height: 20, label: 'półka górna', tone: 'light' },
    ],
    centroid: { x: 60, y: 100 },
    values: [
      { label: 'A półki', value: '2400 mm²', focus: 'section' },
      { label: 'A środnika', value: '3200 mm²', focus: 'section' },
      { label: 'A', value: '8000 mm²', focus: 'section' },
      { label: 'y_C', value: '100 mm', focus: 'centroid' },
      { label: 'I_xc półki', value: '80 000 mm⁴', focus: 'Ix' },
      { label: 'I_xc środnika', value: '6 826 667 mm⁴', focus: 'Ix' },
      { label: 'I_x', value: '45,87·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I_y', value: '5,867·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Dwuteownik 120 × 200 mm: dwie półki 120 × 20 mm i środnik 20 × 160 mm.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Dwuteownik ma wysokość 200 mm i szerokość 120 mm. Półki mają 120 × 20 mm, a środnik 20 × 160 mm. Z symetrii środek ciężkości leży w połowie wysokości, czyli 100 mm od dolnej krawędzi.',
      caption: 'Dwuteownik symetryczny względem obu osi centralnych.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_p=120\\cdot20,\\quad A_s=20\\cdot160,\\quad \\bar{y}=100\\ \\text{mm}',
    },
    {
      title: 'Pola części',
      narration:
        'Z symetrii środek ciężkości leży w połowie wysokości, czyli 100 mm od dolnej krawędzi. Pola: półka A_p=120· 20=2400 mm^2, środnik A_s=20· 160=3200 mm^2, razem A=8000 mm^2.',
      caption: 'Z symetrii środek ciężkości leży w połowie wysokości. Pola: półka 2400 mm², środnik 3200 mm².',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_p=120\\cdot 20=2400\\ \\text{mm}^2,\\quad A_s=20\\cdot160=3200\\ \\text{mm}^2',
    },
    {
      title: 'Moment własny półki',
      narration: 'Półka: I_xc,p=120· 20^3/12=80 000 mm^4. Jej środek leży 90 mm od osi centralnej, więc a_p=90 mm.',
      caption: 'Półka: I_xc,p=120· 20^3/12=80 000 mm^4; a_p=90 mm.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_{xc,p}=120\\cdot 20^3/12=80\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Steiner dla półki',
      narration:
        'Wkład jednej półki: 80 000+2400· 90^2=80 000+19 440 000=19 520 000 mm^4. Dwie półki dają 39 040 000 mm^4.',
      caption: 'Wkład jednej półki: 80 000+2400· 90^2=19 520 000 mm^4.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: '80\\,000+2400\\cdot 90^2=80\\,000+19\\,440\\,000=19\\,520\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Moment środnika',
      narration:
        'Środnik: I_xc,s=20· 160^3/12≈ 6 826 667 mm^4. Jego środek leży na osi centralnej, więc a_s=0 i nie ma składnika przesunięcia.',
      caption: 'Środnik: I_xc,s=20· 160^3/12≈ 6 826 667 mm^4; a_s=0.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_{xc,s}=20\\cdot 160^3/12\\approx 6\\,826\\,667\\ \\text{mm}^4',
    },
    {
      title: 'Suma momentów Ix',
      narration: 'Suma: I_x=39 040 000+6 826 667=45 866 667 mm^4≈ 45,87· 10^6 mm^4.',
      caption: 'Suma: I_x=39 040 000+6 826 667=45 866 667 mm^4.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_x=39\\,040\\,000+6\\,826\\,667=45\\,866\\,667\\ \\text{mm}^4\\approx45{,}87\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Kontrola przez pustki',
      narration:
        'Kontrola przez odejmowanie pustek: pełny prostokąt 120 × 200 ma I=80· 10^6 mm^4. Dwie pustki 50 × 160 mają razem 2· 50· 160^3/12≈ 34,13· 10^6 mm^4. Różnica daje 45,87· 10^6 mm^4.',
      caption: 'Kontrola przez odejmowanie pustek potwierdza wynik.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I=80\\cdot10^6-2\\cdot\\frac{50\\cdot160^3}{12}\\approx45{,}87\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Moment Iy',
      narration:
        'Względem pionowej osi centralnej półki mają moment własny 20·120³/12, a środnik 160·20³/12. Wszystkie środki leżą na osi y, więc nie ma składników Steinera.',
      caption: 'Przy osi pionowej w trzeciej potędze występują szerokości elementów.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=2\\cdot\\frac{20\\cdot120^3}{12}+\\frac{160\\cdot20^3}{12}\\approx5{,}867\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Porównanie z pełnym prostokątem: pole spadło z 24 000 do 8000 mm², czyli do jednej trzeciej, a moment pozostał na poziomie około 57,3% wartości pełnej.',
      caption: 'Oddalenie półek od osi daje dużą sztywność przy małym polu.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\boxed{A=8000\\ \\text{mm}^2,\\quad I_x\\approx45{,}87\\cdot10^6\\ \\text{mm}^4,\\quad I_y\\approx5{,}867\\cdot10^6\\ \\text{mm}^4}',
    },
  ],
} satisfies SolutionData
