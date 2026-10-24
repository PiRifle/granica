import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-section-stiffness-design-2',
  title: 'Dobór przekroju i kontrola sztywności — przykład 2',
  duration: 7,
  given: ['L = 4 m', 'q = 9 kN/m', 'sigma_{dop} = 160 MPa', 'E = 210 GPa'],
  result:
    'Ten przykład pokazuje typową iterację projektową. Nie wystarczy dobrać przekroju „na naprężenie” i zakończyć. Po każdej zmianie wymiarów trzeba przeliczyć I, W i ugięcie, ponieważ wszystkie te wielkości zmieniają się razem.',
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    distributed: [{ from: 0, to: 4, start: 9, end: 9, label: 'q = 9 kN/m' }],
    shear: [
      [
        [0, 18],
        [2, 0],
        [4, -18],
      ],
    ],
    moment: [
      [
        [0, 0],
        [0.5, 7.875],
        [1, 13.5],
        [1.5, 16.875],
        [2, 18],
        [2.5, 16.875],
        [3, 13.5],
        [3.5, 7.875],
        [4, 0],
      ],
    ],
    markers: [
      { x: 2, y: 0, text: 'T = 0', diagram: 'shear' },
      { x: 2, y: 18, text: 'M = 18 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'q', value: '9,0 kN/m', focus: 'load' },
      { label: 'R_A', value: '18,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '18,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '18,0 kN·m', focus: 'M' },
      { label: 'W_min', value: '112 500 mm³', focus: 'design' },
      { label: 'W', value: '144 000 mm³', focus: 'design' },
      { label: 'σ_max', value: '125 MPa', focus: 'design' },
      { label: 'f', value: '16,53 mm', focus: 'design' },
      { label: 'f_dop', value: '16 mm', focus: 'design' },
    ],
    note: 'Warunek sztywności decyduje o wymiarze: po zwiększeniu h do 140 mm ugięcie spada do około 10,4 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy belkę swobodnie podpartą o L = 4 m, obciążoną równomiernie q = 9 kN/m. Przyjmij σ_dop = 160 MPa, E = 210 GPa i f_dop = L/250 = 16 mm. Najpierw obliczamy moment maksymalny:',
      caption:
        'Rozważmy belkę swobodnie podpartą o L = 4 m, obciążoną równomiernie q = 9 kN/m. Przyjmij σ_dop = 160 MPa, E = 210 GPa i f_dop =…',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L = 4 m',
    },
    {
      title: 'Reakcje z symetrii',
      narration:
        'Obciążenie jest równomierne na całej rozpiętości, więc reakcje są równe. Każda z nich przenosi połowę wypadkowej qL.',
      caption: 'R_A = R_B = 18 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=R_B=\\frac{qL}{2}=\\frac{9\\cdot4}{2}=18\\ \\text{kN}',
    },
    {
      title: 'Krok 2',
      narration: 'Zapis matematyczny.',
      caption: 'M_max = (q L^2)/(8) = (9 · 4^2)/(8) = 18 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{\\max} = \\frac{q L^2}{8} = \\frac{9 \\cdot 4^2}{8} = 18\\ \\text{kN·m}.',
    },
    {
      title: 'Krok 3',
      narration:
        'Wymagany wskaźnik wynosi W_min = 18 · 10^6/160 = 112,500 mm³. Przyjmijmy prostokąt o b = h/2. Wtedy W = h^3/12, więc h ≥ ∛(12 · 112,500) ≈ 110,5 mm. Wybieramy b = 60 mm i h = 120 mm. Dla tego przekroju W = 144,000 mm³, a naprężenie wynosi 18 · 10^6/144,000 = 125 MPa, czyli warunek wytrzymałości jest spełniony.',
      caption:
        'Wymagany wskaźnik wynosi W_min = 18 · 10^6/160 = 112,500 mm³. Przyjmijmy prostokąt o b = h/2. Wtedy W = h^3/12, więc h ≥ ∛(12 ·…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'W_{min} = 18 \\cdot 10^{6}/160 = 112{,}500 mm^{3}',
    },
    {
      title: 'Krok 4',
      narration:
        'Sprawdźmy ugięcie. Dla obciążenia równomiernego f = 5qL^4/(384EI), a I = 60 · 120^3/12 = 8,64 · 10^6 mm⁴. Po podstawieniu q = 9 N/mm i L = 4000 mm otrzymujemy',
      caption:
        'Sprawdźmy ugięcie. Dla obciążenia równomiernego f = 5qL^4/(384EI), a I = 60 · 120^3/12 = 8,64 · 10^6 mm⁴. Po podstawieniu q = 9…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'f = 5qL^{4}/(384EI)',
    },
    {
      title: 'Krok 5',
      narration: 'Zapis matematyczny.',
      caption: 'f = (5 · 9 · 4000^4)/(384 · 210,000 · 8,64 · 10^6) = 16,53 mm.',
      visual: 'beam',
      focus: { metric: 'design' },
      formula:
        'f = \\frac{5 \\cdot 9 \\cdot 4000^4}{384 \\cdot 210{,}000 \\cdot 8{,}64 \\cdot 10^6}\n= 16{,}53\\ \\text{mm}.',
    },
    {
      title: 'Krok 6',
      narration:
        'To więcej niż f_dop = 16 mm, mimo że naprężenie jest bezpieczne. Warunek sztywności decyduje więc o wymiarze. Zwiększamy wysokość do h = 140 mm, pozostawiając b = 60 mm. Wtedy I = 13,72 · 10^6 mm⁴, W = 196,000 mm³, naprężenie spada do 91,8 MPa, a ugięcie do około 10,4 mm. Dopiero ten przekrój spełnia oba warunki.',
      caption:
        'To więcej niż f_dop = 16 mm, mimo że naprężenie jest bezpieczne. Warunek sztywności decyduje więc o wymiarze. Zwiększamy wysokość…',
      visual: 'beam',
      focus: { metric: 'design' },
      formula: 'f_{dop} = 16 mm',
    },
    {
      title: 'Krok 7',
      narration:
        'Ten przykład pokazuje typową iterację projektową. Nie wystarczy dobrać przekroju „na naprężenie” i zakończyć. Po każdej zmianie wymiarów trzeba przeliczyć I, W i ugięcie, ponieważ wszystkie te wielkości zmieniają się razem.',
      caption:
        'Ten przykład pokazuje typową iterację projektową. Nie wystarczy dobrać przekroju „na naprężenie” i zakończyć. Po każdej zmianie…',
      visual: 'beam',
      focus: { metric: 'design' },
    },
  ],
} satisfies SolutionData
