import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-section-modulus-2',
  title: 'Wskaźnik wytrzymałości przekroju W — przykład 2',
  duration: 7,
  given: ['D = 120 mm', 'd = 100 mm', 'c = 60 mm'],
  result:
    'Ten przykład pokazuje, że W trzeba porównywać przy jasno określonym kryterium: tej samej średnicy zewnętrznej, tej samej masie, tym samym momencie czy tym samym naprężeniu dopuszczalnym. Bez tego porównanie „rura jest lepsza” lub „pręt jest lepszy” jest niepełne.',
  figure: {
    kind: 'section',
    width: 120,
    height: 120,
    parts: [{ x: 0, y: 0, width: 120, height: 120, tone: 'light' }],
    holes: [{ cx: 60, cy: 60, r: 50, label: '∅100' }],
    centroid: { x: 60, y: 60 },
    values: [
      { label: 'D', value: '120 mm', focus: 'section', reveal: 0 },
      { label: 'd', value: '100 mm', focus: 'section', reveal: 0 },
      { label: 'c', value: '60 mm', focus: 'section', reveal: 0 },
      { label: 'I_s', value: '10,18·10⁶ mm⁴', focus: 'Ix' },
      { label: 'W_s', value: '169,6·10³ mm³', focus: 'Ix' },
      { label: 'I_r', value: '5,27·10⁶ mm⁴', focus: 'Ix' },
      { label: 'W_r', value: '87,8·10³ mm³', focus: 'Ix' },
      { label: 'A_s', value: '11 310 mm²', focus: 'section' },
      { label: 'A_r', value: '3456 mm²', focus: 'section' },
    ],
    note: 'Schemat: pręt pełny D = 120 mm i rura d = 100 mm o tej samej średnicy zewnętrznej.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Porównajmy pełny pręt kołowy o średnicy D=120 mm z rurą o średnicy zewnętrznej D=120 mm i wewnętrznej d=100 mm. Oba przekroje mają tę samą odległość skrajnego włókna c=60 mm.',
      caption: 'Pręt pełny i rura o tej samej średnicy zewnętrznej.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'D=120\\ \\text{mm},\\quad d=100\\ \\text{mm},\\quad c=60\\ \\text{mm}',
    },
    {
      title: 'Pręt pełny',
      narration: 'Dla pręta pełnego: I_s=(π D^4)/(64)=(π· 120^4)/(64)≈ 10,18· 10^6 mm^4.',
      caption: 'Moment bezwładności pełnego pręta.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_s=\\frac{\\pi D^4}{64}=\\frac{\\pi\\cdot120^4}{64}\\approx10{,}18\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Wskaźnik pręta pełnego',
      narration: 'W_s=(I_s)/(60)≈ 169,6· 10^3 mm^3.',
      caption: 'Wskaźnik wytrzymałości pełnego przekroju.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'W_s=\\frac{I_s}{60}\\approx169{,}6\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Rura',
      narration: 'Dla rury: I_r=(π(D^4-d^4))/(64)=(π(120^4-100^4))/(64)≈ 5,27· 10^6 mm^4.',
      caption: 'Moment bezwładności rury.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'I_r=\\frac{\\pi(D^4-d^4)}{64}=\\frac{\\pi(120^4-100^4)}{64}\\approx5{,}27\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Wskaźnik rury',
      narration: 'W_r=(I_r)/(60)≈ 87,8· 10^3 mm^3.',
      caption: 'Wskaźnik wytrzymałości rury.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'W_r=\\frac{I_r}{60}\\approx87{,}8\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Pola przekrojów',
      narration:
        'Pole pręta pełnego wynosi około 11 310 mm^2, a rury około 3456 mm^2, czyli rura ma około 30,6% materiału.',
      caption: 'Rura zużywa znacznie mniej materiału.',
      visual: 'section',
      focus: { metric: 'section' },
      formula: 'A_s\\approx11\\,310\\ \\text{mm}^2,\\quad A_r\\approx3456\\ \\text{mm}^2',
    },
    {
      title: 'Naprężenia przy zginaniu',
      narration:
        'Przy momencie 8 kN·m naprężenie w pręcie pełnym wynosi około 47,2 MPa, a w rurze około 91,1 MPa. Rura jest lżejsza i bardziej efektywna na jednostkę masy, ale ma mniejszą nośność bezwzględną.',
      caption: 'Mniejsza nośność bezwzględna przy tej samej średnicy zewnętrznej.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\sigma_s=\\frac{8\\cdot10^6}{169{,}6\\cdot10^3}\\approx47{,}2\\ \\text{MPa},\\quad \\sigma_r=\\frac{8\\cdot10^6}{87{,}8\\cdot10^3}\\approx91{,}1\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'W trzeba porównywać przy jasno określonym kryterium: tej samej średnicy zewnętrznej, tej samej masie, tym samym momencie czy tym samym naprężeniu dopuszczalnym.',
      caption: 'Bez kryterium porównanie „rura jest lepsza” jest niepełne.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\boxed{I_s\\approx10{,}18\\cdot10^6\\ \\text{mm}^4,\\quad W_s\\approx169{,}6\\cdot10^3\\ \\text{mm}^3,\\quad I_r\\approx5{,}27\\cdot10^6\\ \\text{mm}^4,\\quad W_r\\approx87{,}8\\cdot10^3\\ \\text{mm}^3}',
    },
  ],
} satisfies SolutionData
