import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-rational-section-shapes-3',
  title: 'Racjonalne kształty przekrojów — przykład 3',
  duration: 7,
  given: ['A = 2000 mm²', 'I/A = 2000 mm²'],
  result:
    'To zadanie pokazuje, że „od wyniku do danych” nie kończy się na jednym wzorze. Po dobraniu promienia i grubości trzeba wrócić do założeń: czy rura jest rzeczywiście cienkościenna, czy ścianka nie wyboczy się, czy średnica mieści się w dostępnej przestrzeni i czy połączenia da się wykonać.',
  figure: {
    kind: 'section',
    width: 126.5,
    height: 126.5,
    parts: [{ x: 0, y: 0, width: 126.5, height: 126.5, tone: 'light' }],
    holes: [{ cx: 63.25, cy: 63.25, r: 58.22, label: 'R = 63,25' }],
    centroid: { x: 63.25, y: 63.25 },
    values: [
      { label: 'A', value: '2000 mm²', focus: 'section', reveal: 0 },
      { label: 'I/A', value: '2000 mm²', focus: 'Ix', reveal: 0 },
      { label: 'R', value: '63,25 mm', focus: 'section' },
      { label: 'D', value: '126,5 mm', focus: 'section' },
      { label: 't', value: '5,03 mm', focus: 'section' },
      { label: 'I', value: '4,0·10⁶ mm⁴', focus: 'Ix' },
      { label: 'W', value: '63,2·10³ mm³', focus: 'Ix' },
      { label: 'D/t', value: '25', focus: 'Ix' },
      { label: 'I_y', value: '4,0·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Schemat: cienkościenna rura o promieniu zewnętrznym 63,25 mm i grubości ścianki 5,03 mm.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Dla przekroju o polu A=2000 mm² wymagamy I/A=2000 mm², czyli I=4· 10^6 mm^4. Szukamy promienia cienkościennej rury i grubości ścianki.',
      caption: 'Rura cienkościenna o zadanym polu i wymaganym stosunku I/A.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=2000\\ \\text{mm}^2,\\quad I/A=2000\\ \\text{mm}^2,\\quad I=4\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Związek I/A z promieniem',
      narration: 'Dla rury cienkiej I/A≈R^2/2, więc promień wynika wprost z wymaganego stosunku.',
      caption: 'Cienkościenna rura ma I/A ≈ R²/2.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I/A\\approx\\frac{R^2}{2}',
    },
    {
      title: 'Promień rury',
      narration: 'R≈√(2·(I)/(A))=√(2· 2000)=√(4000)≈63,25 mm.',
      caption: 'Promień zewnętrzny rury wynosi około 63,25 mm.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'R\\approx\\sqrt{2\\cdot\\frac{I}{A}}=\\sqrt{2\\cdot2000}=\\sqrt{4000}\\approx63{,}25\\ \\text{mm}',
    },
    {
      title: 'Średnica zewnętrzna',
      narration: 'czyli średnica zewnętrzna około 126,5 mm. Grubość ścianki wynika z pola.',
      caption: 'Średnica zewnętrzna jest dwa razy większa od promienia.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'D=2R=2\\cdot63{,}25=126{,}5\\ \\text{mm}',
    },
    {
      title: 'Grubość ścianki',
      narration: 't≈(A)/(2π R)=(2000)/(2π· 63,25)≈5,03 mm.',
      caption: 'Grubość ścianki wynika z pola powierzchni rury.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 't\\approx\\frac{A}{2\\pi R}=\\frac{2000}{2\\pi\\cdot63{,}25}\\approx5{,}03\\ \\text{mm}',
    },
    {
      title: 'Sprawdzenie momentu i wskaźnika',
      narration:
        'Sprawdzenie: I≈π R^3t≈4,0· 10^6 mm^4, a W=I/R≈63,2· 10^3 mm^3. Stosunek D/t≈25, więc ścianka nie jest ekstremalnie cienka.',
      caption: 'Moment i wskaźnik wynikają z promienia oraz grubości ścianki.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        'I\\approx\\pi R^3t\\approx4{,}0\\cdot10^6\\ \\text{mm}^4,\\quad W=\\frac{I}{R}\\approx63{,}2\\cdot10^3\\ \\text{mm}^3,\\quad \\frac{D}{t}\\approx25',
    },
    {
      title: 'Moment Iy',
      narration:
        'Rura jest kołowo symetryczna, więc I_y=I_x≈4,0·10⁶ mm⁴. Oba kierunki zginania mają tę samą sztywność.',
      caption: 'Dla rury I_x = I_y.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=I_x\\approx\\pi R^3t\\approx4{,}0\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Po dobraniu promienia i grubości trzeba wrócić do założeń: czy rura jest rzeczywiście cienkościenna, czy ścianka nie wyboczy się, czy średnica mieści się w dostępnej przestrzeni i czy połączenia da się wykonać.',
      caption: 'Wynik geometryczny wymaga jeszcze sprawdzenia stateczności i technologii.',
      visual: 'section',
      focus: { metric: 'section' },
      formula:
        '\\boxed{R\\approx63{,}25\\ \\text{mm},\\quad t\\approx5{,}03\\ \\text{mm},\\quad I\\approx4{,}0\\cdot10^6\\ \\text{mm}^4,\\quad W\\approx63{,}2\\cdot10^3\\ \\text{mm}^3}',
    },
  ],
} satisfies SolutionData
