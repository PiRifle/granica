import type { SolutionData } from '../../model'

export default {
  id: 'ex-bending-moment-diagram-3',
  title: 'Moment zginający M(x) — przykład 3',
  duration: 7,
  given: ['L = 6 m', 'M_max = 45 kN·m'],
  result:
    'Reakcje wynoszą wtedy R_A = R_B = 15 kN. Kontrola: M_max = R_A · L/2 = 15 · 3 = 45 kN·m. Wynik jest spójny. Taki wariant pokazuje, że z wykresu momentu można odtworzyć obciążenie, podobnie jak z wykresu siły tnącej można odtworzyć siły skupione. W praktyce projektowej częściej idziesz w drugą stronę: od obciążenia do momentu, a potem do wymaganego przekroju.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    pointLoads: [{ at: 3, value: 30, label: 'P = 30 kN' }],
    shear: [
      [
        [0, 15],
        [3, 15],
      ],
      [
        [3, -15],
        [6, -15],
      ],
    ],
    moment: [
      [
        [0, 0],
        [3, 45],
      ],
      [
        [3, 45],
        [6, 0],
      ],
    ],
    markers: [
      { x: 3, y: 15, text: 'T = 15 kN', diagram: 'shear' },
      { x: 3, y: -15, text: 'T = -15 kN', diagram: 'shear' },
      { x: 3, y: 45, text: 'M = 45 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'P', value: '30,0 kN', focus: 'load' },
      { label: 'R_A', value: '15,0 kN', focus: 'reaction' },
      { label: 'R_B', value: '15,0 kN', focus: 'reaction' },
      { label: 'M_max', value: '45,0 kN·m', focus: 'M' },
    ],
    note: 'Przy sile w środku rozpiętości M_max = PL/4 = 30 · 6 / 4 = 45 kN·m.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Znamy maksymalny moment, a szukamy obciążenia. Belka swobodnie podparta o L = 6 m jest obciążona siłą P w połowie rozpiętości. Z obliczeń wynika, że M_max = 45 kN·m. Jaka jest wartość siły P?',
      caption:
        'Znamy maksymalny moment, a szukamy obciążenia. Belka swobodnie podparta o L = 6 m jest obciążona siłą P w połowie rozpiętości. Z…',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'L = 6 m',
    },
    {
      title: 'Reakcje z symetrii',
      narration:
        'Siła działa w połowie rozpiętości, więc reakcje są równe i wynoszą po połowie obciążenia. To pozwala później przeliczyć moment z powrotem na siłę.',
      caption: 'R_A = R_B = 15 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=R_B=\\frac{P}{2}=15\\ \\text{kN}',
    },
    {
      title: 'Krok 2',
      narration: 'Dla siły w środku belki obowiązuje M_max = PL/4. Przekształcamy:',
      caption: 'Dla siły w środku belki obowiązuje M_max = PL/4. Przekształcamy:',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{max} = PL/4',
    },
    {
      title: 'Maksimum w środku rozpiętości',
      narration:
        'Przy sile skupionej w środku moment rośnie liniowo od zera do M_max, a następnie maleje liniowo do zera. Ekstremum wypada pod siłą.',
      caption: 'M_max = 45 kN·m pod siłą.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M_{max}=\\frac{PL}{4}=\\frac{30\\cdot6}{4}=45\\ \\text{kN·m}',
    },
    {
      title: 'Krok 3',
      narration: 'Zapis matematyczny.',
      caption: 'P = (4 M_max)/(L) = (4 · 45)/(6) = 30 kN.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'P = \\frac{4 M_{\\max}}{L} = \\frac{4 \\cdot 45}{6} = 30\\ \\text{kN}.',
    },
    {
      title: 'Krok 4',
      narration:
        'Reakcje wynoszą wtedy R_A = R_B = 15 kN. Kontrola: M_max = R_A · L/2 = 15 · 3 = 45 kN·m. Wynik jest spójny. Taki wariant pokazuje, że z wykresu momentu można odtworzyć obciążenie, podobnie jak z wykresu siły tnącej można odtworzyć siły skupione. W praktyce projektowej częściej idziesz w drugą stronę: od obciążenia do momentu, a potem do wymaganego przekroju.',
      caption:
        'Reakcje wynoszą wtedy R_A = R_B = 15 kN. Kontrola: M_max = R_A · L/2 = 15 · 3 = 45 kN·m. Wynik jest spójny. Taki wariant…',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_{A} = R_{B} = 15 kN',
    },
  ],
} satisfies SolutionData
