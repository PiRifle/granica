import type { SolutionData } from '../../model'
import { SectionModulusExample2Animation } from './animation'

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
    parts: [
      {
        x: 0,
        y: 0,
        width: 120,
        height: 120,
        tone: 'light',
      },
    ],
    holes: [
      {
        cx: 60,
        cy: 60,
        r: 50,
        label: '∅100',
      },
    ],
    centroid: {
      x: 60,
      y: 60,
    },
    values: [
      { label: 'D', value: '120 mm', focus: 'section', reveal: 0 },
      { label: 'd', value: '100 mm', focus: 'section', reveal: 0 },
      { label: 'c', value: '60 mm', focus: 'section', reveal: 0 },
    ],
    note: 'Schemat: pręt pełny D = 120 mm i rura d = 100 mm o tej samej średnicy zewnętrznej.',
    shape: 'circle',
  },
  animation: SectionModulusExample2Animation,
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Porównajmy pełny pręt kołowy o średnicy D=120 mm z rurą o średnicy zewnętrznej D=120 mm i wewnętrznej d=100 mm.',
      caption: 'Pręt pełny i rura o tej samej średnicy zewnętrznej.',
      visual: 'section',
      focus: { metric: 'model' },
      formula: 'D=120\\ \\text{mm},\\quad d=100\\ \\text{mm}',
    },
    {
      title: 'Odległość skrajnego włókna',
      narration:
        'Oba przekroje mają tę samą średnicę zewnętrzną, więc skrajne włókno leży w tej samej odległości od osi obojętnej: c=D/2=60 mm.',
      caption: 'Wspólne c oznacza, że o różnicy wskaźników decyduje sam moment bezwładności.',
      visual: 'section',
      focus: { metric: 'c' },
      formula: 'c=\\frac{D}{2}=\\frac{120}{2}=60\\ \\text{mm}',
    },
    {
      title: 'Momenty bezwładności',
      narration:
        'Dla pręta pełnego I_s=(πD^4)/64≈10,18·10^6 mm^4. Dla rury odejmujemy jądro: I_r=π(D^4-d^4)/64≈5,27·10^6 mm^4.',
      caption: 'Rura ma mniejszy moment bezwładności, bo jej materiał leży bliżej osi.',
      visual: 'section',
      focus: { metric: 'I' },
      formula:
        'I_s=\\frac{\\pi D^4}{64}\\approx10{,}18\\cdot10^6\\ \\text{mm}^4,\\quad I_r=\\frac{\\pi(D^4-d^4)}{64}\\approx5{,}27\\cdot10^6\\ \\text{mm}^4',
    },
    {
      title: 'Wskaźniki wytrzymałości',
      narration:
        'Ponieważ c jest takie samo, wskaźnik jest proporcjonalny do momentu bezwładności. W_s=I_s/60≈169,6·10^3 mm^3, a W_r=I_r/60≈87,8·10^3 mm^3.',
      caption: 'Większy wskaźnik ma pręt pełny.',
      visual: 'section',
      focus: { metric: 'W' },
      formula:
        'W_s=\\frac{I_s}{60}\\approx169{,}6\\cdot10^3\\ \\text{mm}^3,\\quad W_r=\\frac{I_r}{60}\\approx87{,}8\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Naprężenia przy zginaniu',
      narration:
        'Przy momencie 8 kN·m naprężenie w pręcie pełnym wynosi około 47,2 MPa, a w rurze około 91,1 MPa. Ten sam moment wywołuje w rurze prawie dwa razy większe naprężenie.',
      caption: 'Mniejszy wskaźnik oznacza większe naprężenie przy tym samym momencie.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula:
        '\\sigma_s=\\frac{8\\cdot10^6}{169{,}6\\cdot10^3}\\approx47{,}2\\ \\text{MPa},\\quad \\sigma_r=\\frac{8\\cdot10^6}{87{,}8\\cdot10^3}\\approx91{,}1\\ \\text{MPa}',
    },
    {
      title: 'Masa, nośność i kryterium',
      narration:
        'Pole pręta pełnego wynosi około 11 310 mm², a rury około 3456 mm², czyli rura ma około 30,6% materiału. Rura jest lżejsza i bardziej efektywna na jednostkę masy, ale ma mniejszą nośność bezwzględną. W trzeba porównywać przy jasno określonym kryterium: tej samej średnicy zewnętrznej, tej samej masie, tym samym momencie czy tym samym naprężeniu dopuszczalnym.',
      caption: 'Bez kryterium porównanie „rura jest lepsza” jest niepełne.',
      visual: 'section',
      focus: { metric: 'result' },
      formula:
        '\\boxed{I_s\\approx10{,}18\\cdot10^6\\ \\text{mm}^4,\\quad W_s\\approx169{,}6\\cdot10^3\\ \\text{mm}^3,\\quad I_r\\approx5{,}27\\cdot10^6\\ \\text{mm}^4,\\quad W_r\\approx87{,}8\\cdot10^3\\ \\text{mm}^3}',
    },
  ],
} satisfies SolutionData
