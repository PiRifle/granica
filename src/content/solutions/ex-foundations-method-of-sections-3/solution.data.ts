import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-method-of-sections-3',
  title: 'Metoda przekrojów: zajrzyj do środka — przykład 3',
  duration: 7,
  given: ['L = 5 m', 'a = 2 m', 'x = 1 m', 'M = 12 kN·m'],
  result:
    'P = 20 kN, R_A = 12 kN, R_B = 8 kN, a maksymalny moment wynosi 24 kN·m. Kontrola z prawej strony: R_B · 3 = 8 · 3 = 24 kN·m. Jeden zmierzony moment nie wystarczyłby do wyznaczenia zarówno P, jak i a — potrzebna była znajomość położenia siły.',
  figure: {
    kind: 'beam',
    length: 5,
    supports: [
      { at: 0, label: 'A' },
      { at: 5, label: 'B' },
    ],
    pointLoads: [{ at: 2, value: 20, label: 'P = 20 kN' }],
    shear: [
      [
        [0, 12],
        [2, 12],
      ],
      [
        [2, -8],
        [5, -8],
      ],
    ],
    moment: [
      [
        [0, 0],
        [2, 24],
        [5, 0],
      ],
    ],
    markers: [
      { x: 1, y: 12, text: 'T = 12 kN', diagram: 'shear' },
      { x: 2, y: -8, text: 'T = -8 kN', diagram: 'shear' },
      { x: 1, y: 12, text: 'M = 12 kN·m', diagram: 'moment' },
      { x: 2, y: 24, text: 'M = 24 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '5,0 m', focus: 'load', reveal: 0 },
      { label: 'a', value: '2,0 m', focus: 'load', reveal: 0 },
      { label: 'x', value: '1,0 m', focus: 'load', reveal: 0 },
      { label: 'M(x=1)', value: '12,0 kN·m', focus: 'M', reveal: 0 },
      { label: 'P', value: '20,0 kN', focus: 'load' },
      { label: 'R_A', value: '12,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '8,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '24,0 kN·m', focus: 'M' },
    ],
    note: 'Moment w przekroju x = 1 m zależy od reakcji R_A, a ta od nieznanej siły P. Położenie siły a jest znane.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość 5 m. Siła skupiona P działa w odległości 2 m od lewej podpory. W przekroju x = 1 m zmierzono moment zginający M = 12 kN·m. Wyznacz P, reakcje oraz maksymalny moment.',
      caption: 'Schemat belki z nieznaną siłą P w x = 2 m i pomiarem momentu w x = 1 m.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=5\\ \\text{m},\\quad a=2\\ \\text{m},\\quad x=1\\ \\text{m},\\quad M=12\\ \\text{kN·m}',
    },
    {
      title: 'Reakcja w funkcji siły',
      narration:
        'Dla x przed siłą lewa część belki zawiera tylko reakcję R_A. Z równowagi momentów względem B reakcja lewej podpory wynosi R_A = P(1 − a/L). Po podstawieniu a/L = 2/5 otrzymujemy R_A = 0,6P.',
      caption: 'R_A = 0,6P.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=P\\left(1-\\frac{a}{L}\\right)=P\\left(1-\\frac{2}{5}\\right)=0{,}6P',
    },
    {
      title: 'Moment w przekroju x = 1 m',
      narration:
        'W przekroju x = 1 m, który leży przed siłą P, moment jest równy R_A · 1. Wykorzystujemy związek R_A = 0,6P, więc M = 0,6P.',
      caption: 'M(x = 1 m) = 0,6P.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'x=1\\ \\text{m},\\qquad M=R_A\\cdot1=0{,}6P',
    },
    {
      title: 'Wyznaczenie siły P',
      narration:
        'Podstawiamy zmierzony moment 12 kN·m: 0,6P = 12. Dzielimy obie strony przez 0,6 i otrzymujemy P = 20 kN.',
      caption: 'P = 20 kN.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: '0{,}6P=12\\quad\\Rightarrow\\quad P=20\\ \\text{kN}',
    },
    {
      title: 'Reakcja R_A',
      narration: 'Po wyznaczeniu siły wracamy do związku R_A = 0,6P. Otrzymujemy R_A = 0,6 · 20 = 12 kN.',
      caption: 'R_A = 12 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=0{,}6P=0{,}6\\cdot20=12\\ \\text{kN}',
    },
    {
      title: 'Reakcja R_B',
      narration:
        'Reakcja prawej podpory wynosi R_B = P · a / L. Po podstawieniu P = 20 kN i a = 2 m otrzymujemy 20 · 2 / 5 = 8 kN.',
      caption: 'R_B = 8 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B=\\frac{Pa}{L}=\\frac{20\\cdot2}{5}=8\\ \\text{kN}',
    },
    {
      title: 'Moment maksymalny',
      narration:
        'Maksymalny moment pojawia się pod siłą P, czyli w x = 2 m. Licząc z lewej strony: M_max = R_A · 2 = 12 · 2 = 24 kN·m.',
      caption: 'M_max = 24 kN·m pod siłą P.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{\\max}=R_A\\cdot2=12\\cdot2=24\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola z prawej strony',
      narration:
        'Sprawdzamy moment pod siłą, licząc od prawej podpory. Reakcja R_B = 8 kN działa w odległości 3 m od przekroju, więc M = 8 · 3 = 24 kN·m. Wynik jest spójny.',
      caption: 'Prawa strona daje ten sam moment 24 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'R_B\\cdot3=8\\cdot3=24\\ \\text{kN·m}',
    },
    {
      title: 'Wniosek o danych',
      narration:
        'Jeden zmierzony moment nie wystarczyłby do wyznaczenia zarówno P, jak i a. W tym zadaniu położenie siły było znane, więc niewiadoma była tylko jedna. Gdyby brakowało i P, i a, potrzebny byłby dodatkowy pomiar albo dodatkowe równanie.',
      caption: 'Moment w jednym przekroju nie odtwarza jednoznacznie całego obciążenia.',
      visual: 'beam',
      focus: { metric: 'M' },
    },
  ],
} satisfies SolutionData
