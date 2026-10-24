import type { SolutionData } from '../../model'

export default {
  id: 'ex-ideal-1',
  title: 'Belka z obciążeniem równomiernym',
  duration: 6,
  given: [
    'L = 3,6 m; podpory przegubowe w A i B na końcach',
    'q = 6 kN/m na całej długości belki',
    'Ciężar własny pomijamy',
  ],
  result: 'Wypadkowa P = 21,6 kN działa w połowie rozpiętości. Reakcje: R_A = R_B = 10,8 kN.',
  figure: {
    kind: 'beam',
    length: 3.6,
    supports: [
      { at: 0, label: 'A' },
      { at: 3.6, label: 'B' },
    ],
    distributed: [{ from: 0, to: 3.6, start: 6, end: 6, label: 'q = 6 kN/m' }],
  },
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Obciążenie równomierne ma wykres prostokątny. Wypadkowa jest równa polu tego prostokąta, czyli q razy L. Jednostka kN/m pomnożona przez metr daje kN. Wypadkowa obciążenia równomiernego działa w środku ciężkości prostokąta, czyli w połowie długości belki. Od lewej podpory wynosi więc L/2. Suma momentów względem lewej podpory pozwala wyznaczyć R_B. Wypadkowa działa w odległości 1,8 m, a reakcja R_B w odległości 3,6 m. Po podzieleniu otrzymujemy 10,8 kN. Z równowagi pionowej suma reakcji musi być równa wypadkowej. Po odjęciu R_B od P otrzymujemy R_A. Obciążenie jest symetryczne, więc reakcje są równe. Sprawdzamy sumę sił pionowych i momentów. Suma reakcji wynosi 21,6 kN, dokładnie tyle co wypadkowa. Momenty względem A również się zerują.',
      caption: 'Reakcje równoważą wypadkową, a suma momentów jest zerowa.',
      visual: 'beam',
      formula:
        'P=qL=6\\cdot3,6=21,6\\,\\mathrm{kN}\\qquad x_P=\\frac{L}{2}=\\frac{3,6}{2}=1,8\\,\\mathrm{m}\\qquad R_B\\cdot L=P\\cdot x_P\\quad\\Rightarrow\\quad R_B=\\frac{21,6\\cdot1,8}{3,6}=10,8\\,\\mathrm{kN}\\qquad R_A=P-R_B=21,6-10,8=10,8\\,\\mathrm{kN}\\qquad R_A+R_B=10,8+10,8=21,6\\,\\mathrm{kN}=P',
    },
  ],
} satisfies SolutionData
