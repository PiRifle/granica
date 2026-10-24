import type { SolutionData } from '../../model'

export default {
  id: 'ex-m3-hooke-stiffness-2',
  title: 'Prawo Hooke’a i sztywność osiowa — przykład 2',
  duration: 7,
  given: ['L=1', 'd=16 mm', 'N=12 kN', 'E=70 GPa'],
  result:
    'Gdyby średnicę aluminiowego pręta zwiększyć dwukrotnie, pole wzrosłoby czterokrotnie, a sztywność również czterokrotnie. Wydłużenie spadłoby do jednej czwartej poprzedniej wartości, ale masa pręta wzrosłaby czterokrotnie. To pokazuje typowy kompromis: sztywność można kupić materiałem albo geometrią, a każdy z tych sposobów ma swoją cenę.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 750,
        area: 201.06,
        n: 12,
        sigma: 59.68,
        epsilon: 0.000853,
        deltaL: 0.64,
      },
      {
        id: '2',
        label: '2',
        length: 750,
        area: 201.06,
        n: 12,
        sigma: 59.68,
        epsilon: 0.000853,
        deltaL: 0.64,
      },
    ],
    loads: [
      {
        node: 2,
        value: 12,
        label: 'N = 12 kN',
      },
    ],
    note: 'd = 16 mm, A = 201,06 mm², E = 70 000 MPa.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy aluminiowy pręt o długości L=1,5 m i średnicy d=16 mm, rozciągany siłą N=12 kN. Moduł aluminium przyjmujemy E=70 GPa. Pole przekroju wynosi',
      caption:
        'Rozważmy aluminiowy pręt o długości L=1,5 m i średnicy d=16 mm, rozciągany siłą N=12 kN. Moduł aluminium przyjmujemy E=70 GPa.…',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'L = 1{,}5 m',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'A=(π d^2)/(4)=(π· 16^2)/(4)≈ 201,06 mm^2.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula: 'A=\\frac{\\pi d^2}{4}=\\frac{\\pi\\cdot 16^2}{4}\\approx 201{,}06\\ \\text{mm}^2.',
    },
    {
      title: 'Krok 3',
      narration: 'Naprężenie jest równe',
      caption: 'Naprężenie jest równe',
      visual: 'thermal',
      focus: { metric: 'σ' },
    },
    {
      title: 'Krok 4',
      narration: 'Zapis matematyczny.',
      caption: 'σ=(12 000)/(201,06)≈ 59,68 MPa.',
      visual: 'thermal',
      focus: { metric: 'σ' },
      formula: '\\sigma=\\frac{12\\,000}{201{,}06}\\approx 59{,}68\\ \\text{MPa}.',
    },
    {
      title: 'Krok 5',
      narration: 'Odkształcenie wynosi ε=59,68/70 000≈ 0,000853, a wydłużenie',
      caption: 'Odkształcenie wynosi ε=59,68/70 000≈ 0,000853, a wydłużenie',
      visual: 'thermal',
      focus: { metric: 'ε' },
      formula: '\\varepsilon = 59{,}68/70\\,000 \\approx 0{,}000853',
    },
    {
      title: 'Krok 6',
      narration: 'Zapis matematyczny.',
      caption: 'Δ L=ε L=0,000853· 1500≈ 1,28 mm.',
      visual: 'thermal',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L=\\varepsilon L=0{,}000853\\cdot 1500\\approx 1{,}28\\ \\text{mm}.',
    },
    {
      title: 'Krok 7',
      narration: 'Sztywność pręta to',
      caption: 'Sztywność pręta to',
      visual: 'thermal',
      focus: { metric: 'A' },
    },
    {
      title: 'Krok 8',
      narration: 'Zapis matematyczny.',
      caption: 'k=(EA)/(L)=(70 000· 201,06)/(1500)≈ 9383 N/mm≈ 9,38 MN/m.',
      visual: 'thermal',
      focus: { metric: 'A' },
      formula:
        'k=\\frac{EA}{L}=\\frac{70\\,000\\cdot 201{,}06}{1500}\\approx 9383\\ \\text{N/mm}\\approx 9{,}38\\ \\text{MN/m}.',
    },
    {
      title: 'Krok 9',
      narration:
        'Porównanie ze stalą jest pouczające. Aluminium ma około trzy razy mniejszy moduł, więc przy podobnym naprężeniu odkształca się około trzy razy bardziej. Nie znaczy to, że jest „gorsze”: jest lżejsze, a w wielu zastosowaniach mniejsza masa jest ważniejsza niż mniejsza sztywność. Wybór materiału zależy od tego, który warunek jest krytyczny.',
      caption:
        'Porównanie ze stalą jest pouczające. Aluminium ma około trzy razy mniejszy moduł, więc przy podobnym naprężeniu odkształca się…',
      visual: 'thermal',
      focus: { metric: 'ε' },
    },
    {
      title: 'Krok 10',
      narration:
        'Gdyby średnicę aluminiowego pręta zwiększyć dwukrotnie, pole wzrosłoby czterokrotnie, a sztywność również czterokrotnie. Wydłużenie spadłoby do jednej czwartej poprzedniej wartości, ale masa pręta wzrosłaby czterokrotnie. To pokazuje typowy kompromis: sztywność można kupić materiałem albo geometrią, a każdy z tych sposobów ma swoją cenę.',
      caption:
        'Gdyby średnicę aluminiowego pręta zwiększyć dwukrotnie, pole wzrosłoby czterokrotnie, a sztywność również czterokrotnie.…',
      visual: 'thermal',
      focus: { metric: 'A' },
    },
  ],
} satisfies SolutionData
