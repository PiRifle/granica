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
  },
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Wypadkowa jest polem trójkąta pod wykresem obciążenia. Podstawa to długość belki, a wysokość to maksymalna intensywność q₀. Policz najpierw pole, a potem sprawdź jednostkę. W trójkącie rosnącym w prawo wypadkowa działa w jednej trzeciej długości od podstawy, czyli w dwóch trzecich od wierzchołka. Od końca A, gdzie obciążenie jest zerowe, wynosi więc 2L/3. Moment wypadkowej względem A wynosi P razy x_P. Równoważy go moment reakcji R_B działającej w odległości L. Dzieląc, otrzymujemy 24 kN. Z równowagi pionowej suma reakcji równa się wypadkowej. Po odjęciu R_B otrzymujemy R_A. Mniejsza reakcja występuje po stronie mniejszego obciążenia. Sprawdzamy oba warunki równowagi. Suma reakcji wynosi 36 kN. Moment reakcji R_B względem A to 24 razy 6, czyli 144 kN·m, tyle samo co moment wypadkowej 36 razy 4.',
      caption: 'Bilans sił i momentów się zgadza.',
      visual: 'beam',
      formula:
        'P=\\frac{1}{2}q_0L=\\frac{1}{2}\\cdot12\\cdot6=36\\,\\mathrm{kN}\\qquad x_P=\\frac{2}{3}L=\\frac{2}{3}\\cdot6=4\\,\\mathrm{m}\\qquad R_B\\cdot L=P\\cdot x_P\\quad\\Rightarrow\\quad R_B=\\frac{36\\cdot4}{6}=24\\,\\mathrm{kN}\\qquad R_A=P-R_B=36-24=12\\,\\mathrm{kN}\\qquad R_A+R_B=12+24=36\\,\\mathrm{kN}=P,\\qquad R_B L=24\\cdot6=144=P x_P',
    },
  ],
} satisfies SolutionData
