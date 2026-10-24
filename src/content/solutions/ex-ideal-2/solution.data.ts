import type { SolutionData } from '../../model'

export default {
  id: 'ex-ideal-2',
  title: 'Belka z obciążeniem trójkątnym',
  duration: 7,
  given: [
    'L = 6 m; podpory przegubowe w A i B na końcach',
    'Obciążenie rośnie liniowo od 0 w A do q₀ = 12 kN/m w B',
    'Ciężar własny pomijamy',
  ],
  result: 'Wypadkowa P = 36 kN działa 4 m od A. Reakcje: R_B = 24 kN, R_A = 12 kN.',
  figure: {
    kind: 'beam',
    length: 6,
    supports: [
      { at: 0, label: 'A' },
      { at: 6, label: 'B' },
    ],
    distributed: [{ from: 0, to: 6, start: 0, end: 12, label: 'q₀ = 12 kN/m' }],
    values: [
      { label: 'Q', value: '36,0 kN', focus: 'load', reveal: 1 },
      { label: 'x_P', value: '4,0 m od A', focus: 'load', reveal: 1 },
      { label: 'R_B', value: '24,0 kN', focus: 'reaction', reveal: 2 },
      { label: 'R_A', value: '12,0 kN', focus: 'reaction', reveal: 3 },
    ],
    note: 'Trójkąt obciążenia rośnie w prawo, więc wypadkowa działa bliżej podpory B.',
  },
  scenes: [
    {
      title: 'Obciążenie trójkątne',
      narration:
        'Obciążenie rośnie liniowo od zera w A do q₀ = 12 kN/m w B. Wykres q(x) jest trójkątem, więc jego pole zmienia się wraz z długością i maksymalną intensywnością.',
      formula: 'q(0)=0,\\qquad q(L)=12\\,\\mathrm{kN/m},\\qquad L=6\\,\\mathrm{m}',
      caption: 'Model obciążenia jest liniowo rosnącym rozkładem q(x).',
      visual: 'beam',
      focus: { metric: 'geometry' },
    },
    {
      title: 'Wypadkowa i jej położenie',
      narration:
        'Wypadkowa jest polem trójkąta: połowa iloczynu q₀ i L. W trójkącie rosnącym w prawo działa w dwóch trzecich długości od końca A, czyli 4 m od lewej podpory.',
      formula:
        'P=\\frac{1}{2}q_0L=\\frac{1}{2}\\cdot12\\cdot6=36\\,\\mathrm{kN},\\qquad x_P=\\frac{2}{3}L=\\frac{2}{3}\\cdot6=4\\,\\mathrm{m}',
      caption: 'Wypadkowa 36 kN działa 4 m od A.',
      visual: 'beam',
      focus: { metric: 'load' },
    },
    {
      title: 'Reakcja prawej podpory',
      narration:
        'Moment wypadkowej względem A wynosi P razy x_P. Równoważy go moment reakcji R_B działającej w odległości L. Dzieląc, otrzymujemy 24 kN.',
      formula: 'R_B\\cdot L=P\\cdot x_P\\quad\\Rightarrow\\quad R_B=\\frac{36\\cdot4}{6}=24\\,\\mathrm{kN}',
      caption: 'R_B = 24 kN, czyli dwie trzecie wypadkowej.',
      visual: 'beam',
      focus: { metric: 'reaction' },
    },
    {
      title: 'Reakcja lewej podpory i kontrola',
      narration:
        'Z równowagi pionowej suma reakcji równa się wypadkowej. Po odjęciu R_B otrzymujemy R_A. Mniejsza reakcja występuje po stronie mniejszego obciążenia, a bilans sił i momentów się zgadza.',
      formula: 'R_A=P-R_B=36-24=12\\,\\mathrm{kN},\\qquad R_A+R_B=36\\,\\mathrm{kN}=P',
      caption: 'R_A = 12 kN. Suma reakcji równoważy wypadkową.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      emphasis: 'Reakcja bliżej większego obciążenia jest większa.',
    },
  ],
} satisfies SolutionData
