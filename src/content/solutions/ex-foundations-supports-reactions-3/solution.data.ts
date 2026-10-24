import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-supports-reactions-3',
  title: 'Podpory i reakcje: jak konstrukcja odpowiada — przykład 3',
  duration: 7,
  given: ['L = 4 m', 'P = 20 kN', 'R_B = 15 kN'],
  result:
    'Siła działa w odległości a = 3 m od lewej podpory, R_A = 5 kN, a moment pod siłą wynosi M = 15 kN·m. Sprawdzenie z prawej strony: R_B · 1 = 15 · 1 = 15 kN·m. Gdyby reakcja R_B była większa od P, otrzymalibyśmy a większe od L, co oznaczałoby, że dane są sprzeczne z modelem belki swobodnie podpartej.',
  figure: {
    kind: 'beam',
    length: 4,
    supports: [
      { at: 0, label: 'A' },
      { at: 4, label: 'B' },
    ],
    pointLoads: [{ at: 3, value: 20, label: 'P = 20 kN' }],
    shear: [
      [
        [0, 5],
        [3, 5],
      ],
      [
        [3, -15],
        [4, -15],
      ],
    ],
    moment: [
      [
        [0, 0],
        [3, 15],
        [4, 0],
      ],
    ],
    markers: [
      { x: 3, y: 5, text: 'T = 5 kN', diagram: 'shear' },
      { x: 3, y: -15, text: 'T = -15 kN', diagram: 'shear' },
      { x: 3, y: 15, text: 'M = 15 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '4,0 m', focus: 'load', reveal: 0 },
      { label: 'P', value: '20,0 kN', focus: 'load', reveal: 0 },
      { label: 'R_B', value: '15,0 kN', focus: 'reaction', reveal: 0 },
      { label: 'a', value: '3,0 m', focus: 'load' },
      { label: 'R_A', value: '5,0 kN', focus: 'reaction' },
      { label: 'M', value: '15,0 kN·m', focus: 'M' },
    ],
    note: 'Położenie siły wynika z podanej reakcji R_B. Moment pod siłą jest równy R_A · a = R_B · (L − a).',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Belka swobodnie podparta ma długość 4 m. Wiadomo, że przy sile P = 20 kN reakcja prawej podpory wynosi R_B = 15 kN. Szukamy odległości a, w jakiej działa siła, oraz reakcji R_A i momentu pod siłą.',
      caption: 'Belka z siłą P = 20 kN w nieznanym położeniu a.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=4\\ \\text{m},\\quad P=20\\ \\text{kN},\\quad R_B=15\\ \\text{kN}',
    },
    {
      title: 'Związek reakcji z położeniem siły',
      narration:
        'Dla belki z jedną siłą reakcja prawej podpory wynosi R_B = Pa/L. Przekształcamy ten związek, żeby wyznaczyć położenie a.',
      caption: 'R_B = P · a / L.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_B=\\frac{Pa}{L}',
    },
    {
      title: 'Położenie siły',
      narration: 'Przekształcamy wzór do a = R_B L / P. Podstawiamy 15 kN, 4 m i 20 kN, otrzymując a = 3 m.',
      caption: 'a = 3 m od lewej podpory.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'a=\\frac{R_B L}{P}=\\frac{15\\cdot4}{20}=3\\ \\text{m}',
    },
    {
      title: 'Reakcja R_A',
      narration: 'Z równowagi pionowej R_A + R_B = P, więc R_A = P − R_B = 20 − 15 = 5 kN.',
      caption: 'R_A = 5 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A=P-R_B=20-15=5\\ \\text{kN}',
    },
    {
      title: 'Moment pod siłą',
      narration:
        'Moment pod siłą liczymy z lewej strony: M = R_A · a = 5 · 3 = 15 kN·m. To jednocześnie maksymalny moment w belce.',
      caption: 'M = 15 kN·m pod siłą.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'M=R_A\\cdot3=5\\cdot3=15\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola z prawej strony',
      narration:
        'Licząc od prawej podpory, siła działa w odległości 1 m od B. Moment wynosi więc R_B · 1 = 15 · 1 = 15 kN·m. Wynik jest spójny.',
      caption: 'Prawa strona daje ten sam moment 15 kN·m.',
      visual: 'beam',
      focus: { metric: 'M' },
      formula: 'R_B\\cdot1=15\\cdot1=15\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola bilansu sił',
      narration: 'Suma reakcji 5 + 15 = 20 kN jest równa sile P. Belka jest w równowadze pionowej.',
      caption: 'R_A + R_B = P.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'R_A+R_B=5+15=20=P',
    },
    {
      title: 'Wniosek o danych',
      narration:
        'Gdyby reakcja R_B była większa od P, otrzymalibyśmy a większe od L. To oznaczałoby, że dane są sprzeczne z modelem belki swobodnie podpartej. Zawsze sprawdzaj, czy wyznaczone położenie mieści się w obrębie belki.',
      caption: 'Poprawne dane muszą dawać 0 ≤ a ≤ L.',
      visual: 'beam',
      focus: { metric: 'reaction' },
    },
  ],
} satisfies SolutionData
