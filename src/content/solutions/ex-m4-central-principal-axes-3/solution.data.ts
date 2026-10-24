import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-central-principal-axes-3',
  title: 'Osie centralne i główne — przykład 3',
  duration: 7,
  given: ['I_1 = 50·10⁶ mm⁴', 'I_2 = 10·10⁶ mm⁴', 'I_x = 35·10⁶ mm⁴'],
  result:
    "skąd 2θ≈ 75,5° i θ≈ 37,8°. Sprawdzenie: podstawienie tego kąta do wzoru transformacyjnego daje I_x'≈ 50· 10^6 mm^4, czyli I_1. Drugi kierunek, prostopadły, daje I_2. Widzimy, że same wartości główne nie wystarczają do jednoznacznego odtworzenia orientacji; potrzebna jest jeszcze informacja o znaku momentu dewiacyjnego lub o kącie.",
  figure: {
    kind: 'section',
    width: 140,
    height: 100,
    parts: [{ x: 0, y: 0, width: 140, height: 100, label: 'schemat', tone: 'light' }],
    centroid: { x: 70, y: 50 },
    values: [
      { label: 'I_1', value: '50·10⁶ mm⁴', focus: 'Ix', reveal: 0 },
      { label: 'I_2', value: '10·10⁶ mm⁴', focus: 'Iy', reveal: 0 },
      { label: 'I_x', value: '35·10⁶ mm⁴', focus: 'Ix', reveal: 0 },
      { label: 'I_y', value: '25·10⁶ mm⁴', focus: 'Iy' },
      { label: '|I_xy|', value: '19,36·10⁶ mm⁴', focus: 'Ix' },
      { label: '2θ', value: '75,5°', focus: 'Ix' },
      { label: 'θ', value: '37,8°', focus: 'Ix' },
    ],
    note: 'Schemat: kształt przekroju nie jest istotny — dane są momentami bezwładności, nie wymiarami geometrycznymi.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Znamy główne momenty I_1=50·10⁶ mm⁴ i I_2=10·10⁶ mm⁴ oraz moment względem osi x równy I_x=35·10⁶ mm⁴. Chcemy odtworzyć I_y, I_xy i kąt osi głównych.',
      caption: 'Zadanie odwrotne: od wartości głównych do orientacji osi.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        'I_1=50\\cdot10^6\\ \\text{mm}^4,\\quad I_2=10\\cdot10^6\\ \\text{mm}^4,\\quad I_x=35\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Niezmiennik sumy',
      narration: 'Z niezmiennika sumy mamy I_y=I_1+I_2-I_x=60·10⁶-35·10⁶=25·10⁶ mm⁴.',
      caption: 'Suma momentów względem dowolnych prostopadłych osi jest stała.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula: 'I_y=I_1+I_2-I_x=60\\cdot10^6-35\\cdot10^6=25\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Niezmiennik iloczynu',
      narration: 'Z niezmiennika iloczynu: I_xy^2=I_xI_y-I_1I_2=(35·25-50·10)·10^12=375·10^12 mm^8.',
      caption: 'Iloczyn momentów głównych jest równy I_xI_y-I_xy².',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_{xy}^2=I_xI_y-I_1I_2=(35\\cdot25-50\\cdot10)\\cdot10^{12}=375\\cdot10^{12}\\ \\text{mm}^8',
    },
    {
      title: 'Moment dewiacyjny',
      narration:
        'czyli |I_xy|≈19,36·10⁶ mm⁴. Znak zależy od tego, w którą stronę obrócono układ; przyjmijmy I_xy=-19,36·10⁶ mm⁴.',
      caption: 'Znak momentu dewiacyjnego zależy od orientacji osi.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: '|I_{xy}|=\\sqrt{375\\cdot10^{12}}\\approx19{,}36\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Kąt osi głównych',
      narration: 'Korzystamy z tan2θ=-(2I_xy)/(I_x-I_y)=-(2·(-19,36))/(35-25)≈3,873, skąd 2θ≈75,5° i θ≈37,8°.',
      caption: 'Kąt wynika z pary momentów i momentu dewiacyjnego.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: '\\tan2\\theta=-\\frac{2I_{xy}}{I_x-I_y}=-\\frac{2\\cdot(-19{,}36)}{35-25}\\approx3{,}873',
    },
    {
      title: 'Sprawdzenie transformacji',
      narration:
        "Podstawienie tego kąta do wzoru transformacyjnego daje I_x'≈50·10⁶ mm⁴, czyli I_1. Drugi kierunek, prostopadły, daje I_2.",
      caption: 'Transformacja momentów potwierdza odtworzony kąt.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: '2\\theta\\approx75{,}5^\\circ,\\quad \\theta\\approx37{,}8^\\circ',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Same wartości główne nie wystarczają do jednoznacznego odtworzenia orientacji; potrzebna jest jeszcze informacja o znaku momentu dewiacyjnego lub o kącie.',
      caption: 'Wartości własne opisują wielkości, ale nie orientację osi.',
      visual: 'section',
      focus: { metric: 'Iy' },
      formula:
        '\\boxed{I_y=25\\cdot10^6\\ \\text{mm}^4,\\quad |I_{xy}|\\approx19{,}36\\cdot10^6\\ \\text{mm}^4,\\quad \\theta\\approx37{,}8^\\circ}',
    },
  ],
} satisfies SolutionData
