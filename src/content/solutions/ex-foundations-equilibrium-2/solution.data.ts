import type { SolutionData } from '../../model'

export default {
  id: 'ex-foundations-equilibrium-2',
  title: 'Równowaga statyczna: trzy równania — przykład 2',
  duration: 7,
  given: ['F=10 kN'],
  result:
    'Kontrola momentów względem B daje -M_A+A_y· 2,4=-19,2+19,2=0. Siła pozioma nie wnosi momentu względem B, bo działa wzdłuż osi belki. Wniosek: utwierdzenie przenosi zarówno siłę osiową, jak i moment, nawet jeśli w tym zadaniu siła osiowa nie wpływa na zginanie. Gdyby belka była wykonana z materiału o małej wytrzymałości na rozciąganie, sama siła osiowa mogłaby zdecydować o doborze przekroju. Reakcje trzeba więc raportować wszystkie, a nie tylko te, które są wygodne w równaniu momentów.',
  figure: {
    kind: 'beam',
    length: 2.4,
    supports: [{ at: 0, label: 'A' }],
    pointLoads: [{ at: 2.4, value: 8, label: 'F_y = 8 kN' }],
    moments: [{ at: 0, value: 19.2, label: 'M_A = 19,2 kN·m' }],
    shear: [
      [
        [0, 8],
        [2.4, 8],
      ],
    ],
    moment: [
      [
        [0, -19.2],
        [0.6, -14.4],
        [1.2, -9.6],
        [1.8, -4.8],
        [2.4, 0],
      ],
    ],
    markers: [
      { x: 0, y: 8, text: 'T = 8 kN', diagram: 'shear' },
      { x: 0, y: -19.2, text: 'M_A = -19,2 kN·m', diagram: 'moment' },
    ],
    values: [
      { label: 'L', value: '2,4 m', focus: 'load', reveal: 0 },
      { label: 'F', value: '10,0 kN', focus: 'load', reveal: 0 },
      { label: 'F_x', value: '6,0 kN w prawo', focus: 'load', reveal: 0 },
      { label: 'F_y', value: '8,0 kN w dół', focus: 'load', reveal: 0 },
      { label: 'A_x', value: '-6,0 kN (w lewo)', focus: 'reaction' },
      { label: 'A_y', value: '8,0 kN', focus: 'reaction' },
      { label: 'M_A', value: '19,2 kN·m', focus: 'reaction' },
    ],
    note: 'Utwierdzenie A przenosi reakcję poziomą A_x, pionową A_y oraz moment M_A; siła pozioma działa w osi belki.',
  },
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Wspornik jest utwierdzony w ścianie w punkcie A i ma długość 2,4 m. Na swobodnym końcu B działa siła F = 10 kN, której składowa pozioma wynosi 6 kN w prawo, a pionowa 8 kN w dół. Siła pozioma działa w osi belki.',
      caption: 'Wspornik z siłą F rozłożoną na składową poziomą i pionową.',
      visual: 'beam',
      focus: { metric: 'load' },
      formula: 'L=2{,}4\\ \\text{m},\\quad F_x=6\\ \\text{kN},\\quad F_y=8\\ \\text{kN}',
    },
    {
      title: 'Równowaga pozioma',
      narration:
        'W utwierdzeniu przyjmujemy A_x w prawo. Równowaga pozioma daje A_x + 6 = 0, czyli A_x = -6 kN. Minus oznacza, że rzeczywista reakcja działa w lewo.',
      caption: 'A_x = -6 kN, czyli 6 kN w lewo.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'A_x+6=0 \\quad\\Rightarrow\\quad A_x=-6\\ \\text{kN}',
    },
    {
      title: 'Równowaga pionowa',
      narration: 'Równowaga pionowa: A_y − 8 = 0, więc A_y = 8 kN w górę.',
      caption: 'A_y = 8 kN.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'A_y-8=0 \\quad\\Rightarrow\\quad A_y=8\\ \\text{kN}',
    },
    {
      title: 'Moment od siły pionowej',
      narration:
        'Siła 8 kN działa w odległości 2,4 m od A i obraca belkę zgodnie z ruchem wskazówek zegara, więc jej moment wynosi -8 · 2,4 = -19,2 kN·m.',
      caption: 'Moment obciążenia względem A to -19,2 kN·m.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: '-8\\cdot 2{,}4=-19{,}2\\ \\text{kN·m}',
    },
    {
      title: 'Reakcja momentowa',
      narration: 'Reakcja momentowa równoważy moment od siły pionowej: M_A − 19,2 = 0, więc M_A = 19,2 kN·m.',
      caption: 'M_A = 19,2 kN·m przeciwnie do ruchu wskazówek zegara.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: 'M_A-19{,}2=0 \\quad\\Rightarrow\\quad M_A=19{,}2\\ \\text{kN·m}',
    },
    {
      title: 'Kontrola momentów względem B',
      narration:
        'Kontrola momentów względem B daje -M_A + A_y · 2,4 = -19,2 + 19,2 = 0. Siła pozioma nie wnosi momentu względem B, bo działa wzdłuż osi belki.',
      caption: 'Bilans momentów względem B potwierdza reakcje.',
      visual: 'beam',
      focus: { metric: 'reaction' },
      formula: '-M_A+A_y\\cdot 2{,}4=-19{,}2+19{,}2=0',
    },
  ],
} satisfies SolutionData
