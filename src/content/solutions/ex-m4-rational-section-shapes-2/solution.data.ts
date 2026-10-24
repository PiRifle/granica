import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-rational-section-shapes-2',
  title: 'Racjonalne kształty przekrojów — przykład 2',
  duration: 7,
  given: ['A = 7854 mm²', 'D pręta = 100 mm', 'D rury = 200 mm'],
  result:
    'Ten wynik jest bardziej uczciwym porównaniem niż poprzedni. Przy tej samej masie rura o większej średnicy jest wyraźnie sztywniejsza i mocniejsza, ale zajmuje więcej miejsca i ma cieńszą ściankę. Właśnie dlatego w konstrukcjach o ograniczonej masie stosuje się rury i przekroje skrzynkowe, a nie pełne pręty.',
  figure: {
    kind: 'section',
    width: 200,
    height: 200,
    parts: [{ x: 0, y: 0, width: 200, height: 200, tone: 'light' }],
    holes: [{ cx: 100, cy: 100, r: 86.6, label: '∅173,2' }],
    centroid: { x: 100, y: 100 },
    values: [
      { label: 'A', value: '7854 mm²', focus: 'section', reveal: 0 },
      { label: 'D rury', value: '200 mm', focus: 'section', reveal: 0 },
      { label: 'd rury', value: '173,2 mm', focus: 'section' },
      { label: 't ścianki', value: '13,4 mm', focus: 'section' },
      { label: 'I rury', value: '34,36·10⁶ mm⁴', focus: 'Ix' },
      { label: 'I pręta', value: '4,909·10⁶ mm⁴', focus: 'Ix' },
      { label: 'W rury', value: '343,6·10³ mm³', focus: 'Ix' },
      { label: 'W pręta', value: '98,2·10³ mm³', focus: 'Ix' },
      { label: 'I_y rury', value: '34,36·10⁶ mm⁴', focus: 'Iy' },
    ],
    note: 'Rura o średnicy zewnętrznej 200 mm i polu równym polu pręta pełnego D = 100 mm; rysunek schematyczny.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Porównajmy przekroje przy tej samej masie, czyli przy tym samym polu A=7854 mm². Pręt pełny ma D=100 mm, a rurę dobieramy tak, aby miała średnicę zewnętrzną D=200 mm.',
      caption: 'Pręt pełny D = 100 mm i rura o większej średnicy przy tym samym polu.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A=7854\\ \\text{mm}^2,\\quad D=200\\ \\text{mm}',
    },
    {
      title: 'Średnica wewnętrzna rury',
      narration: 'Z warunku równego pola: (π(200^2-d^2))/(4)=7854, więc d^2=200^2-(4· 7854)/(π)=40 000-10 000=30 000.',
      caption: 'Warunek równego pola pozwala wyznaczyć średnicę wewnętrzną.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: '\\frac{\\pi(200^2-d^2)}{4}=7854\\quad\\Rightarrow\\quad d^2=200^2-\\frac{4\\cdot7854}{\\pi}=30\\,000',
    },
    {
      title: 'Grubość ścianki',
      narration: 'czyli d≈173,2 mm. Grubość ścianki wynosi t=(200-173,2)/2≈13,4 mm.',
      caption: 'Rura o dużym promieniu wymaga cienkiej ścianki.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'd\\approx173{,}2\\ \\text{mm},\\quad t=\\frac{200-173{,}2}{2}\\approx13{,}4\\ \\text{mm}',
    },
    {
      title: 'Moment rury',
      narration: 'Moment bezwładności rury: I_r=(π(200^4-173,2^4))/(64)≈34,36· 10^6 mm^4.',
      caption: 'Moment bezwładności rury przy tym samym polu.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_r=\\frac{\\pi(200^4-173{,}2^4)}{64}\\approx34{,}36\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Porównanie z prętem',
      narration:
        'Pręt pełny ma I_p=4,909· 10^6 mm^4, więc rura przy tej samej masie ma około siedem razy większy moment bezwładności.',
      caption: 'Przy tej samej masie rura jest znacznie sztywniejsza.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_p=\\frac{\\pi\\cdot100^4}{64}=4{,}909\\cdot10^6\\ \\text{mm}^4,\\quad \\frac{I_r}{I_p}\\approx7',
    },
    {
      title: 'Wskaźniki wytrzymałości',
      narration:
        'Wskaźnik W rośnie tylko trzy i pół razy, bo ramię c wzrosło z 50 do 100 mm: W_r=(34,36· 10^6)/(100)≈343,6· 10^3 mm^3, W_p=(4,909· 10^6)/(50)≈98,2· 10^3 mm^3.',
      caption: 'Wskaźnik wytrzymałości rośnie wolniej niż moment bezwładności.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        'W_r=\\frac{34{,}36\\cdot10^6}{100}\\approx343{,}6\\cdot10^3\\ \\text{mm}^3,\\quad W_p=\\frac{4{,}909\\cdot10^6}{50}\\approx98{,}2\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Moment Iy',
      narration: 'Rura jest kołowo symetryczna, więc I_y=I_x≈34,36·10⁶ mm⁴. Oba kierunki zginania są równie sztywne.',
      caption: 'Dla rury I_x = I_y.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=I_x=\\frac{\\pi(200^4-173{,}2^4)}{64}\\approx34{,}36\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Przy tej samej masie rura o większej średnicy jest wyraźnie sztywniejsza i mocniejsza, ale zajmuje więcej miejsca i ma cieńszą ściankę. Właśnie dlatego w konstrukcjach o ograniczonej masie stosuje się rury i przekroje skrzynkowe.',
      caption: 'Większa średnica poprawia sztywność, ale zwiększa gabaryt i ryzyko wyboczenia ścianki.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\boxed{d\\approx173{,}2\\ \\text{mm},\\quad t\\approx13{,}4\\ \\text{mm},\\quad I_r\\approx34{,}36\\cdot10^6\\ \\text{mm}^4,\\quad W_r\\approx343{,}6\\cdot10^3\\ \\text{mm}^3}',
    },
  ],
} satisfies SolutionData
