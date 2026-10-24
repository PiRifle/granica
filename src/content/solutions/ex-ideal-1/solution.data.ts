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
    values: [
      { label: 'Q', value: '21,6 kN', focus: 'load', reveal: 1 },
      { label: 'x_P', value: '1,8 m od A', focus: 'load', reveal: 1 },
      { label: 'R_B', value: '10,8 kN', focus: 'reaction', reveal: 2 },
      { label: 'R_A', value: '10,8 kN', focus: 'reaction', reveal: 3 },
    ],
    note: 'Obciążenie równomierne zastępujemy wypadkową w środku rozpiętości.',
  },
  scenes: [
    {
      title: 'Obciążenie rozłożone na całej belce',
      narration:
        'Zamiast pojedynczych sił opisujemy obciążenie funkcją q(x). Na całej długości belki q = 6 kN/m, a schemat pokazuje prostokątny wykres obciążenia.',
      formula: 'q=6\\,\\mathrm{kN/m},\\qquad L=3,6\\,\\mathrm{m}',
      caption: 'Model zastępuje rzeczywiste obciążenie równomiernym rozkładem q.',
      visual: 'beam',
      focus: { metric: 'geometry' },
    },
    {
      title: 'Wypadkowa w środku rozpiętości',
      narration:
        'Wypadkowa jest polem prostokąta pod wykresem: q razy L. Działa w środku ciężkości prostokąta, czyli w połowie długości belki.',
      formula: 'P=qL=6\\cdot3,6=21,6\\,\\mathrm{kN},\\qquad x_P=\\frac{L}{2}=\\frac{3,6}{2}=1,8\\,\\mathrm{m}',
      caption: 'Wypadkowa 21,6 kN działa 1,8 m od podpory A.',
      visual: 'beam',
      focus: { metric: 'load' },
    },
    {
      title: 'Reakcja prawej podpory',
      narration:
        'Suma momentów względem lewej podpory pozwala wyznaczyć R_B. Wypadkowa działa w odległości 1,8 m, a reakcja R_B w odległości 3,6 m. Po podzieleniu otrzymujemy 10,8 kN.',
      formula: 'R_B\\cdot L=P\\cdot x_P\\quad\\Rightarrow\\quad R_B=\\frac{21,6\\cdot1,8}{3,6}=10,8\\,\\mathrm{kN}',
      caption: 'Moment wypadkowej równoważy moment reakcji R_B.',
      visual: 'beam',
      focus: { metric: 'reaction' },
    },
    {
      title: 'Reakcja lewej podpory i kontrola',
      narration:
        'Z równowagi pionowej suma reakcji musi być równa wypadkowej. Po odjęciu R_B od P otrzymujemy R_A. Obciążenie jest symetryczne, więc reakcje są równe i razem dają 21,6 kN.',
      formula: 'R_A=P-R_B=21,6-10,8=10,8\\,\\mathrm{kN},\\qquad R_A+R_B=21,6\\,\\mathrm{kN}=P',
      caption: 'R_A = 10,8 kN. Suma reakcji równoważy wypadkową.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      emphasis: 'Dla obciążenia symetrycznego reakcje są równe.',
    },
  ],
} satisfies SolutionData
