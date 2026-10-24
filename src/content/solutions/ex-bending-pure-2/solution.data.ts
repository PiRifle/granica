import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-pure-2',
  title: 'Czyste zginanie — przykład 2',
  duration: 7,
  given: ['M = 8 kN·m'],
  result:
    'Po obrocie przekroju o 90 stopni, czyli przy b = 100 mm i h = 50 mm, moment bezwładności maleje czterokrotnie, a wskaźnik W dwukrotnie. Naprężenie rośnie wtedy do 192 MPa, a promień krzywizny maleje do około 27 m. Ten sam moment i materiał dają inną odpowiedź, bo decyduje ustawienie przekroju względem płaszczyzny zginania.',
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    moments: [
      { at: 0, value: 8, label: 'M = 8 kN·m' },
      { at: 4, value: 8, label: 'M = 8 kN·m' },
    ],
    shear: [
      [
        [0, 0],
        [4, 0],
      ],
    ],
    moment: [
      [
        [0, 8],
        [4, 8],
      ],
    ],
    markers: [
      { x: 2, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2, y: 8, text: 'M = 8 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'M', value: '8,0 kN·m', focus: 'M' },
      { label: 'b × h', value: '50 × 100 mm', focus: 'design' },
      { label: 'I', value: '4,167·10⁶ mm⁴', focus: 'design' },
      { label: 'W', value: '83 333 mm³', focus: 'design' },
      { label: 'σ_max', value: '96 MPa', focus: 'design' },
      { label: 'ρ', value: '109 m', focus: 'design' },
      { label: 'σ po obrocie', value: '192 MPa', focus: 'design' },
    ],
    note: 'Schemat czystego zginania momentami na końcach; długość belki nie wpływa na naprężenie. Po obrocie przekroju σ rośnie do 192 MPa.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy belkę swobodnie podpartą, obciążoną na obu końcach parami momentów o wartości M = 8 kN·m. Taki układ daje czyste zginanie na całej długości, ponieważ na belkę nie działają siły poprzeczne. Reakcje pionowe są zerowe, a moment jest stały.',
      caption:
        'Rozważmy belkę swobodnie podpartą, obciążoną na obu końcach parami momentów o wartości M = 8 kN·m. Taki układ daje czyste…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M = 8 kN\\cdot m',
    },
    {
      title: 'Krok 2',
      narration:
        'Przekrój jest prostokątny, b = 50 mm i h = 100 mm, a materiał ma E = 210 GPa. Moment bezwładności względem osi poziomej wynosi',
      caption:
        'Przekrój jest prostokątny, b = 50 mm i h = 100 mm, a materiał ma E = 210 GPa. Moment bezwładności względem osi poziomej wynosi',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'b = 50 mm',
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'I = (50 · 100^3)/(12) = 4,167 · 10^6 mm^4.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'I = \\frac{50 \\cdot 100^3}{12} = 4{,}167 \\cdot 10^6\\ \\text{mm}^4.',
    },
    {
      title: 'Krok 4',
      narration:
        'Wskaźnik wytrzymałości to W = I/c = 4,167 · 10^6/50 = 83,333 mm³, więc naprężenie skrajne wynosi σ_max = 8 · 10^6/83,333 = 96 MPa. Krzywizna jest równa',
      caption:
        'Wskaźnik wytrzymałości to W = I/c = 4,167 · 10^6/50 = 83,333 mm³, więc naprężenie skrajne wynosi σ_max = 8 · 10^6/83,333 = 96…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\sigma_{\\mathrm{max}} = 8 \\cdot 10^{6}/83{,}333 = 96 MPa',
    },
    {
      title: 'Krok 5',
      narration: 'Zapis matematyczny.',
      caption: 'κ = (8 · 10^6)/(210,000 · 4,167 · 10^6) = 9,14 · 10^-6 1/mm,',
      visual: 'beam',
      focus: { metric: 'design' },
      formula:
        '\\kappa = \\frac{8 \\cdot 10^6}{210{,}000 \\cdot 4{,}167 \\cdot 10^6}\n= 9{,}14 \\cdot 10^{-6}\\ \\text{1/mm},',
    },
    {
      title: 'Krok 6',
      narration:
        'czyli promień krzywizny ρ ≈ 109 m. Odkształcenie skrajne ε = 96/210,000 = 4,57 · 10^-4 jest znacznie mniejsze od typowego odkształcenia przy granicy sprężystości stali, więc model liniowy jest uzasadniony.',
      caption:
        'czyli promień krzywizny ρ ≈ 109 m. Odkształcenie skrajne ε = 96/210,000 = 4,57 · 10^-4 jest znacznie mniejsze od typowego…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: '\\rho \\approx 109 m',
    },
    {
      title: 'Krok 7',
      narration:
        'Po obrocie przekroju o 90 stopni, czyli przy b = 100 mm i h = 50 mm, moment bezwładności maleje czterokrotnie, a wskaźnik W dwukrotnie. Naprężenie rośnie wtedy do 192 MPa, a promień krzywizny maleje do około 27 m. Ten sam moment i materiał dają inną odpowiedź, bo decyduje ustawienie przekroju względem płaszczyzny zginania.',
      caption:
        'Po obrocie przekroju o 90 stopni, czyli przy b = 100 mm i h = 50 mm, moment bezwładności maleje czterokrotnie, a wskaźnik W…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'b = 100 mm',
    },
  ],
} satisfies SolutionData
