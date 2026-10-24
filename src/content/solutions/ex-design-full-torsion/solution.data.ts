import type { SolutionData } from '../../model'

export default {
  id: 'ex-design-full-torsion',
  title: 'Pełne zadanie: wał pełny i drążony — przykład 1',
  duration: 7,
  given: ['T=1200 N·m', 'L=1200 mm', 'tau_{dop}=45 MPa', 'varphi_{dop}=1,5°', 'G=80 GPa', 'k=d/D=0,6'],
  result:
    'Wał pełny o d=55 mm spełnia oba warunki, a rura D=56 mm, d=34 mm jest o około 35 procent lżejsza przy nieco większym naprężeniu 40,3 MPa i kącie 1,24°.',
  figure: {
    kind: 'section',
    width: 56,
    height: 56,
    parts: [{ x: 0, y: 0, width: 56, height: 56, label: 'rura ∅56', tone: 'light' }],
    holes: [{ cx: 28, cy: 28, r: 17, label: '∅34' }],
    centroid: { x: 28, y: 28 },
    values: [
      { label: 'T', value: '1200 N·m', focus: 'load', reveal: 0 },
      { label: 'L', value: '1200 mm', focus: 'design', reveal: 0 },
      { label: 'τ_dop', value: '45 MPa', focus: 'stress', reveal: 0 },
      { label: 'φ_dop', value: '1,5°', focus: 'design', reveal: 0 },
      { label: 'k = d/D', value: '0,6', focus: 'design', reveal: 0 },
      { label: 'd wału pełnego', value: '55 mm', focus: 'design' },
      { label: 'W_o wału pełnego', value: '32 668 mm³', focus: 'design' },
      { label: 'τ wału pełnego', value: '36,7 MPa', focus: 'stress', reveal: 6 },
      { label: 'φ wału pełnego', value: '1,15°', focus: 'design' },
      { label: 'D rury', value: '56 mm', focus: 'design' },
      { label: 'd rury', value: '34 mm', focus: 'design', reveal: 10 },
      { label: 'J_o rury', value: '834 300 mm⁴', focus: 'design', reveal: 10 },
      { label: 'W_o rury', value: '29 797 mm³', focus: 'design', reveal: 10 },
      { label: 'τ rury', value: '40,3 MPa', focus: 'stress', reveal: 10 },
      { label: 'φ rury', value: '1,24°', focus: 'design', reveal: 10 },
      { label: 'A wału pełnego', value: '2 376 mm²', focus: 'design' },
      { label: 'A rury', value: '1 555 mm²', focus: 'design' },
      { label: 'oszczędność', value: '35 %', focus: 'design', reveal: 11 },
    ],
    note: 'Rura ∅56/∅34 jest o około 35% lżejsza od wału pełnego ∅55 przy zbliżonych warunkach pracy.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Moment w jednostkach spójnych: T=1200 N·m=1 200 000 N·mm.',
      caption: 'Moment w jednostkach spójnych: T=1200 N·m=1 200 000 N·mm.',
      visual: 'section',
      focus: { metric: 'load' },
      formula: 'T=1200\\ \\text{N}\\cdot\\text{m}=1\\,200\\,000\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Krok 2',
      narration: 'Kąt dopuszczalny: φ_dop=1,5·π/180≈0,02618 rad.',
      caption: 'Kąt dopuszczalny: φ_dop=1,5·π/180≈0,02618 rad.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: '\\varphi_{\\mathrm{dop}}=1{,}5\\cdot\\pi/180\\approx0{,}02618\\ \\text{rad}',
    },
    {
      title: 'Krok 3',
      narration: 'Wał pełny, wytrzymałość: W_o,min=T/τ_dop=1 200 000/45=26 667 mm^3.',
      caption: 'Wał pełny, wytrzymałość: W_o,min=T/τ_dop=1 200 000/45=26 667 mm^3.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'W_{o,\\min}=T/\\tau_{\\mathrm{dop}}=1\\,200\\,000/45=26\\,667\\ \\text{mm}^3',
    },
    {
      title: 'Krok 4',
      narration: 'Średnica z wytrzymałości: d≥∛(16T/(πτ_dop))=∛(19 200 000/(π·45))≈51,4 mm.',
      caption: 'Średnica z wytrzymałości: d≥∛(16T/(πτ_dop))=∛(19 200 000/(π·45))≈51,4 mm.',
      visual: 'section',
      focus: { metric: 'design' },
      formula:
        'd\\ge\\sqrt[3]{16T/(\\pi\\tau_{\\mathrm{dop}})}=\\sqrt[3]{19\\,200\\,000/(\\pi\\cdot45)}\\approx51{,}4\\ \\text{mm}',
    },
    {
      title: 'Krok 5',
      narration: 'Wał pełny, sztywność: J_o,min=TL/(Gφ_dop)=1 200 000·1200/(80 000·0,02618)≈687 500 mm^4.',
      caption: 'Wał pełny, sztywność: J_o,min=TL/(Gφ_dop)=1 200 000·1200/(80 000·0,02618)≈687 500 mm^4.',
      visual: 'section',
      focus: { metric: 'design' },
      formula:
        'J_{o,\\min}=TL/(G\\varphi_{\\mathrm{dop}})=1\\,200\\,000\\cdot1200/(80\\,000\\cdot0{,}02618)\\approx687\\,500\\ \\text{mm}^4',
    },
    {
      title: 'Krok 6',
      narration: 'Średnica ze sztywności: d≥√(32J_o,min/π)=√(32·687 500/π)≈51,5 mm.',
      caption: 'Średnica ze sztywności: d≥√(32J_o,min/π)=√(32·687 500/π)≈51,5 mm.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'd\\ge\\sqrt[4]{32J_{o,\\min}/\\pi}=\\sqrt[4]{32\\cdot687\\,500/\\pi}\\approx51{,}5\\ \\text{mm}',
    },
    {
      title: 'Krok 7',
      narration:
        'Przyjmujemy d=55 mm. Wtedy W_o=π·55^3/16≈32 668 mm^3, τ_max=1 200 000/32 668≈36,7 MPa, a J_o≈898 360 mm^4.',
      caption:
        'Przyjmujemy d=55 mm. Wtedy W_o=π·55^3/16≈32 668 mm^3, τ_max=1 200 000/32 668≈36,7 MPa, a J_o≈898 360 mm^4.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: 'd=55\\ \\text{mm}',
    },
    {
      title: 'Krok 8',
      narration: 'Kąt wału pełnego: φ=1 200 000·1200/(80 000·898 360)≈0,02004 rad≈1,15°≤1,5°.',
      caption: 'Kąt wału pełnego: φ=1 200 000·1200/(80 000·898 360)≈0,02004 rad≈1,15°≤1,5°.',
      visual: 'section',
      focus: { metric: 'design' },
      formula:
        '\\varphi=1\\,200\\,000\\cdot1200/(80\\,000\\cdot898\\,360)\\approx0{,}02004\\ \\text{rad}\\approx1{,}15^\\circ\\le1{,}5^\\circ',
    },
    {
      title: 'Krok 9',
      narration: 'Rura o α=0,6: 1-α^4=1-0,1296=0,8704. Z wytrzymałości D≥∛(16T/[πτ_dop(1-α^4)])≈53,8 mm.',
      caption: 'Rura o α=0,6: 1-α^4=1-0,1296=0,8704. Z wytrzymałości D≥∛(16T/[πτ_dop(1-α^4)])≈53,8 mm.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: '\\alpha=0{,}6',
    },
    {
      title: 'Krok 10',
      narration: 'Ze sztywności D≥√(32TL/[π Gφ_dop(1-α^4)])≈53,3 mm, więc decyduje wytrzymałość.',
      caption: 'Ze sztywności D≥√(32TL/[π Gφ_dop(1-α^4)])≈53,3 mm, więc decyduje wytrzymałość.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'D\\ge\\sqrt[4]{32TL/[\\pi G\\varphi_{\\mathrm{dop}}(1-\\alpha^4)]}\\approx53{,}3\\ \\text{mm}',
    },
    {
      title: 'Krok 11',
      narration:
        'Przyjmujemy D=56 mm i d=34 mm. Wtedy J_o≈834 300 mm^4, W_o=2J_o/D≈29 797 mm^3, τ_max≈40,3 MPa, a φ≈0,02158 rad≈1,24°.',
      caption:
        'Przyjmujemy D=56 mm i d=34 mm. Wtedy J_o≈834 300 mm^4, W_o=2J_o/D≈29 797 mm^3, τ_max≈40,3 MPa, a φ≈0,02158 rad≈1,24°.',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: 'D=56\\ \\text{mm}',
    },
    {
      title: 'Krok 12',
      narration:
        'Pola: wał pełny A=π·55^2/4≈2376 mm^2, rura A=π(56^2-34^2)/4≈1555 mm^2, czyli oszczędność około 35 procent.',
      caption:
        'Pola: wał pełny A=π·55^2/4≈2376 mm^2, rura A=π(56^2-34^2)/4≈1555 mm^2, czyli oszczędność około 35 procent.',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'A=\\pi\\cdot55^2/4\\approx2376\\ \\text{mm}^2',
    },
  ],
} satisfies SolutionData
