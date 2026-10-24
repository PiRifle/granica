import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-shaft-design-3',
  title: 'Dobór średnicy: wytrzymałość i sztywność — przykład 3',
  duration: 7,
  given: ['D = 90 mm', 'd = 70 mm', 'G = 80 GPa', 'tau_{dop} = 40 MPa', 'L = 2,5 m'],
  result:
    'Wariant odwrotny pokazuje, że ten sam przekrój może mieć różne ograniczenia w zależności od długości i wymaganego kąta. Dla krótkiego wału częściej decyduje wytrzymałość, a dla długiego sztywność. Projektant powinien sprawdzić oba warunki i wiedzieć, który z nich jest aktywny.',
  figure: {
    kind: 'section',
    width: 90,
    height: 90,
    parts: [{ x: 0, y: 0, width: 90, height: 90, label: 'rura ∅90', tone: 'light' }],
    holes: [{ cx: 45, cy: 45, r: 35, label: '∅70' }],
    centroid: { x: 45, y: 45 },
    values: [
      { label: 'D', value: '90 mm', focus: 'design', reveal: 0 },
      { label: 'd', value: '70 mm', focus: 'design', reveal: 0 },
      { label: 'L', value: '2500 mm', focus: 'design', reveal: 0 },
      { label: 'G', value: '80 GPa', focus: 'design', reveal: 0 },
      { label: 'τ_dop', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'J_o', value: '4 084 070 mm⁴', focus: 'design' },
      { label: 'W_o', value: '90 757 mm³', focus: 'design' },
      { label: 'T z wytrzymałości', value: '3,63 kN·m', focus: 'design', reveal: 2 },
      { label: 'T ze sztywności', value: '2,28 kN·m', focus: 'design' },
      { label: 'T_max', value: '2,28 kN·m', focus: 'design' },
      { label: 'τ przy T_max', value: '25,1 MPa', focus: 'stress', reveal: 3 },
    ],
    note: 'Dla długiego wału o D = 90 mm i d = 70 mm o nośności decyduje sztywność.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Mamy istniejący wał rurowy o D = 90 mm i d = 70 mm, wykonany ze stali o G = 80 GPa. Dopuszczalne naprężenie wynosi τ_dop = 40 MPa, a dopuszczalny kąt to 1° na długości L = 2,5 m. Szukamy maksymalnego momentu, jaki można bezpiecznie przenieść.',
      caption:
        'Mamy istniejący wał rurowy o D = 90 mm i d = 70 mm, wykonany ze stali o G = 80 GPa. Dopuszczalne naprężenie wynosi τ_dop = 40…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'D = 90\\ \\text{mm}',
    },
    {
      title: 'Krok 2',
      narration:
        'Najpierw obliczamy geometrię: 90^4-70^4 = 65 610 000-24 010 000 = 41 600 000 mm^4, więc J_o = π · 41 600 000/32 = 4 084 070 mm^4. Wskaźnik wynosi W_o = J_o/45 = 90 757 mm^3.',
      caption:
        'Najpierw obliczamy geometrię: 90^4-70^4 = 65 610 000-24 010 000 = 41 600 000 mm^4, więc J_o = π · 41 600 000/32 = 4 084 070 mm^4.…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: '90^4-70^4 = 65\\,610\\,000-24\\,010\\,000 = 41\\,600\\,000\\ \\text{mm}^4',
    },
    {
      title: 'Krok 3',
      narration:
        'Z warunku wytrzymałości T ≤ τ_dopW_o = 40 · 90 757 = 3 630 280 N·mm, czyli około 3,63 kN·m. Z warunku sztywności, po zamianie 1° = 0,017453 rad, otrzymujemy T ≤ G J_o φ_dop/L = 80 000 · 4 084 070 · 0,017453/2500 = 2 281 000 N·mm, czyli około 2,28 kN·m.',
      caption:
        'Z warunku wytrzymałości T ≤ τ_dopW_o = 40 · 90 757 = 3 630 280 N·mm, czyli około 3,63 kN·m. Z warunku sztywności, po zamianie…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'T \\le \\tau_{dop}W_o = 40 \\cdot 90\\,757 = 3\\,630\\,280\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Krok 4',
      narration:
        'Decyduje sztywność. Bezpieczny moment wynosi około 2,28 kN·m. Przy tej wartości naprężenie wynosi 2 281 000 · 45/4 084 070 = 25,1 MPa, więc zapas wytrzymałości jest duży. Gdyby dopuszczalny kąt zwiększyć do 2°, warunek sztywności pozwoliłby na około 4,56 kN·m, ale wtedy decydowałby już warunek wytrzymałości z granicą 3,63 kN·m.',
      caption:
        'Decyduje sztywność. Bezpieczny moment wynosi około 2,28 kN·m. Przy tej wartości naprężenie wynosi 2 281 000 · 45/4 084 070 = 25,1…',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '2{,}28\\ \\text{kN}\\cdot\\text{m}',
    },
    {
      title: 'Krok 5',
      narration:
        'Wariant odwrotny pokazuje, że ten sam przekrój może mieć różne ograniczenia w zależności od długości i wymaganego kąta. Dla krótkiego wału częściej decyduje wytrzymałość, a dla długiego sztywność. Projektant powinien sprawdzić oba warunki i wiedzieć, który z nich jest aktywny.',
      caption:
        'Wariant odwrotny pokazuje, że ten sam przekrój może mieć różne ograniczenia w zależności od długości i wymaganego kąta. Dla…',
      visual: 'section',
      focus: { metric: 'design' },
    },
  ],
} satisfies SolutionData
