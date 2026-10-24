import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-solid-torsion-3',
  title: 'Skręcanie wału pełnego — przykład 3',
  duration: 7,
  given: ['T = 800 N·m', 'tau_{dop} = 40 MPa', 'G = 80 GPa', 'varphi_{dop} = 1°/m'],
  result:
    'To bardzo typowa sytuacja w projektowaniu wałów. Warunek wytrzymałości daje średnicę minimalną, ale dopiero warunek sztywności często wymusza wymiar większy. W lekcji o kącie skręcenia zobaczysz tę procedurę dokładniej, a w lekcji o doborze średnicy połączysz oba warunki w pełny algorytm.',
  figure: {
    kind: 'section',
    width: 50,
    height: 50,
    parts: [{ x: 0, y: 0, width: 50, height: 50, label: 'wał ∅50', tone: 'solid' }],
    centroid: { x: 25, y: 25 },
    values: [
      { label: 'T', value: '800 N·m', focus: 'load', reveal: 0 },
      { label: 'τ_dop', value: '40 MPa', focus: 'stress', reveal: 0 },
      { label: 'd z wytrzymałości', value: '46,7 mm', focus: 'design', reveal: 1 },
      { label: 'd = 48 mm', value: '48 mm', focus: 'design' },
      { label: 'W_o (48)', value: '21 714 mm³', focus: 'design' },
      { label: 'τ (48)', value: '36,85 MPa', focus: 'stress', reveal: 2 },
      { label: 'd ze sztywności', value: '49,15 mm', focus: 'design', reveal: 3 },
      { label: 'd przyjęte', value: '50 mm', focus: 'design', reveal: 4 },
      { label: 'W_o (50)', value: '24 544 mm³', focus: 'design' },
      { label: 'τ_max', value: '32,6 MPa', focus: 'stress', reveal: 4 },
      { label: 'φ', value: '0,93°/m', focus: 'design', reveal: 4 },
    ],
    note: 'Ostatecznie decyduje warunek sztywności: 49,15 mm > 46,7 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Dobierzmy średnicę wału pełnego dla momentu T = 800 N·m i naprężenia dopuszczalnego τ_dop = 40 MPa. Najpierw korzystamy z warunku wytrzymałości.',
      caption:
        'Dobierzmy średnicę wału pełnego dla momentu T = 800 N·m i naprężenia dopuszczalnego τ_dop = 40 MPa. Najpierw korzystamy z warunku…',
      visual: 'section',
      focus: { metric: 'load' },
      formula: 'T = 800\\ \\text{N}\\cdot\\text{m}',
    },
    {
      title: 'Krok 2',
      narration:
        'Ze wzoru τ_max = 16T/(π d^3) otrzymujemy d ≥ ∛(16T/(πτ_dop)). Podstawiamy T = 800 000 N·mm: d ≥ ∛(12 800 000/(π · 40)) = ∛(101 859) = 46,7 mm.',
      caption:
        'Ze wzoru τ_max = 16T/(π d^3) otrzymujemy d ≥ ∛(16T/(πτ_dop)). Podstawiamy T = 800 000 N·mm: d ≥ ∛(12 800 000/(π · 40)) = ∛(101…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: '\\tau_{max} = 16T/(\\pi d^3)',
    },
    {
      title: 'Krok 3',
      narration:
        'Najbliższa większa średnica handlowa to 48 mm. Sprawdzamy: W_o = π · 48^3/16 = 21 714,4 mm^3, a τ_max = 800 000/21 714,4 = 36,85 MPa, czyli poniżej 40 MPa. Warunek wytrzymałości jest spełniony.',
      caption:
        'Najbliższa większa średnica handlowa to 48 mm. Sprawdzamy: W_o = π · 48^3/16 = 21 714,4 mm^3, a τ_max = 800 000/21 714,4 = 36,85…',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: 'W_o = \\pi \\cdot 48^3/16 = 21\\,714{,}4\\ \\text{mm}^3',
    },
    {
      title: 'Krok 4',
      narration:
        'Załóżmy teraz, że dopuszczalny kąt skręcenia wynosi 1° na metr długości, czyli φ_dop = 0,01745 rad/m. Z warunku φ = TL/(GJ_o) ≤ φ_dop otrzymujemy d ≥ √(32TL/(π Gφ_dop)). Dla L = 1000 mm i G = 80 000 MPa mamy d ≥ √(5 836 000) = 49,15 mm.',
      caption:
        'Załóżmy teraz, że dopuszczalny kąt skręcenia wynosi 1° na metr długości, czyli φ_dop = 0,01745 rad/m. Z warunku φ = TL/(GJ_o)…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: '1^\\circ',
    },
    {
      title: 'Krok 5',
      narration:
        'Ostatecznie wybieramy 50 mm, bo to większa z dwóch średnic. Sprawdzamy naprężenie: W_o = 24 543,7 mm^3, więc τ_max = 32,6 MPa. Kąt wynosi 0,0163 rad/m, czyli 0,93° na metr. Oba warunki są spełnione, a o wyborze zadecydowała sztywność, nie wytrzymałość.',
      caption:
        'Ostatecznie wybieramy 50 mm, bo to większa z dwóch średnic. Sprawdzamy naprężenie: W_o = 24 543,7 mm^3, więc τ_max = 32,6 MPa.…',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: 'W_o = 24\\,543{,}7\\ \\text{mm}^3',
    },
    {
      title: 'Krok 6',
      narration:
        'To bardzo typowa sytuacja w projektowaniu wałów. Warunek wytrzymałości daje średnicę minimalną, ale dopiero warunek sztywności często wymusza wymiar większy. W lekcji o kącie skręcenia zobaczysz tę procedurę dokładniej, a w lekcji o doborze średnicy połączysz oba warunki w pełny algorytm.',
      caption:
        'To bardzo typowa sytuacja w projektowaniu wałów. Warunek wytrzymałości daje średnicę minimalną, ale dopiero warunek sztywności…',
      visual: 'section',
      focus: { metric: 'design' },
    },
  ],
} satisfies SolutionData
