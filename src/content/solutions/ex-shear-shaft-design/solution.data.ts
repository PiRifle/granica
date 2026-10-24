import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-shaft-design',
  title: 'Dobór średnicy: wytrzymałość i sztywność — przykład 1',
  duration: 7,
  given: ['T = 2,2 kN·m', 'L = 1800 mm', 'G = 80 GPa', 'tau_{dop} = 45 MPa', 'varphi_{dop} = 1,2°'],
  result:
    'Przyjęto d = 75 mm. Oba warunki są spełnione: τ_max ≈ 26,6 MPa jest znacznie poniżej 45 MPa, a kąt 0,913° jest mniejszy od 1,2°. O doborze zadecydowała sztywność, nie wytrzymałość.',
  figure: {
    kind: 'section',
    width: 75,
    height: 75,
    parts: [{ x: 0, y: 0, width: 75, height: 75, label: 'wał ∅75', tone: 'solid' }],
    centroid: { x: 37.5, y: 37.5 },
    values: [
      { label: 'T', value: '2,2 kN·m', focus: 'load', reveal: 0 },
      { label: 'L', value: '1800 mm', focus: 'design', reveal: 0 },
      { label: 'τ_dop', value: '45 MPa', focus: 'stress', reveal: 0 },
      { label: 'φ_dop', value: '1,2°', focus: 'design', reveal: 0 },
      { label: 'd z wytrzymałości', value: '62,91 mm', focus: 'design' },
      { label: 'd ze sztywności', value: '70,05 mm', focus: 'design' },
      { label: 'd przyjęte', value: '75 mm', focus: 'design' },
      { label: 'W_o', value: '82 808 mm³', focus: 'design' },
      { label: 'τ_max', value: '26,6 MPa', focus: 'stress', reveal: 4 },
      { label: 'J_o', value: '3 106 336 mm⁴', focus: 'design' },
      { label: 'φ', value: '0,913°', focus: 'design' },
    ],
    note: 'O doborze średnicy zadecydował warunek sztywności: 70,05 mm > 62,91 mm.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Zamień dane: T = 2 200 000 N·mm, L = 1800 mm, φ_dop = 1,2 · π/180 = 0,020944 rad.',
      caption: 'Zamień dane: T = 2 200 000 N·mm, L = 1800 mm, φ_dop = 1,2 · π/180 = 0,020944 rad.',
      visual: 'section',
      focus: { metric: 'load' },
      formula: 'T = 2\\,200\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Krok 2',
      narration: 'Warunek wytrzymałości: d ≥ ∛(16 · 2 200 000/(π · 45)) = ∛(248 989) = 62,91 mm.',
      caption: 'Warunek wytrzymałości: d ≥ ∛(16 · 2 200 000/(π · 45)) = ∛(248 989) = 62,91 mm.',
      visual: 'section',
      focus: { metric: 'design' },
      formula:
        'd \\ge \\sqrt[3]{16 \\cdot 2\\,200\\,000/(\\pi \\cdot 45)} = \\sqrt[3]{248\\,989} = 62{,}91\\ \\text{mm}',
    },
    {
      title: 'Krok 3',
      narration: 'Warunek sztywności: d ≥ √(32 · 2 200 000 · 1800/(π · 80 000 · 0,020944)) = √(24 080 000) = 70,05 mm.',
      caption: 'Warunek sztywności: d ≥ √(32 · 2 200 000 · 1800/(π · 80 000 · 0,020944)) = √(24 080 000) = 70,05 mm.',
      visual: 'section',
      focus: { metric: 'design' },
      formula:
        'd \\ge \\sqrt[4]{32 \\cdot 2\\,200\\,000 \\cdot 1800/(\\pi \\cdot 80\\,000 \\cdot 0{,}020944)} = \\sqrt[4]{24\\,080\\,000} = 70{,}05\\ \\text{mm}',
    },
    {
      title: 'Krok 4',
      narration:
        'Decyduje sztywność. Najbliższa większa średnica handlowa to 75 mm; średnica 70 mm jest zbyt blisko granicy i daje kąt nieco większy od dopuszczalnego.',
      caption:
        'Decyduje sztywność. Najbliższa większa średnica handlowa to 75 mm; średnica 70 mm jest zbyt blisko granicy i daje kąt nieco…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: '75\\ \\text{mm}',
    },
    {
      title: 'Krok 5',
      narration: 'Sprawdź naprężenie: W_o = π · 75^3/16 = 82 808 mm^3, więc τ_max = 2 200 000/82 808 = 26,6 MPa.',
      caption: 'Sprawdź naprężenie: W_o = π · 75^3/16 = 82 808 mm^3, więc τ_max = 2 200 000/82 808 = 26,6 MPa.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: 'W_o = \\pi \\cdot 75^3/16 = 82\\,808\\ \\text{mm}^3',
    },
    {
      title: 'Krok 6',
      narration:
        'Sprawdź kąt: J_o = π · 75^4/32 = 3 106 336 mm^4, więc φ = 2 200 000 · 1800/(80 000 · 3 106 336) = 0,01594 rad.',
      caption:
        'Sprawdź kąt: J_o = π · 75^4/32 = 3 106 336 mm^4, więc φ = 2 200 000 · 1800/(80 000 · 3 106 336) = 0,01594 rad.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'J_o = \\pi \\cdot 75^4/32 = 3\\,106\\,336\\ \\text{mm}^4',
    },
    {
      title: 'Krok 7',
      narration: 'Zamień kąt na stopnie: 0,01594 · 180/π = 0,913°, czyli mniej niż 1,2°.',
      caption: 'Zamień kąt na stopnie: 0,01594 · 180/π = 0,913°, czyli mniej niż 1,2°.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: '0{,}01594 \\cdot 180/\\pi = 0{,}913^\\circ',
    },
  ],
} satisfies SolutionData
