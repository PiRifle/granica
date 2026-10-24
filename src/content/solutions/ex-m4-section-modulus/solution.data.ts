import type { SolutionData } from '../../model'

export default {
  id: 'ex-m4-section-modulus',
  title: 'Wskaźnik wytrzymałości przekroju W — przykład 1',
  duration: 7,
  given: ['teownik 120 × 120 mm', 'I_x = 5,674·10⁶ mm⁴', 'c_d = 82,73 mm'],
  result:
    'W_d≈ 68,6· 10^3 mm^3, W_g≈ 152,2· 10^3 mm^3. Przy |M_x|=10 kN·m największe naprężenie wynosi około 145,8 MPa na dolnej krawędzi i około 65,7 MPa na górnej. Decyduje strona dolna.',
  figure: {
    kind: 'section',
    width: 120,
    height: 120,
    parts: [
      { x: 50, y: 0, width: 20, height: 100, label: 'środnik', tone: 'accent' },
      { x: 0, y: 100, width: 120, height: 20, label: 'półka', tone: 'light' },
    ],
    centroid: { x: 60, y: 82.73 },
    values: [
      { label: 'I_x', value: '5,674·10⁶ mm⁴', focus: 'Ix', reveal: 0 },
      { label: 'c_d', value: '82,73 mm', focus: 'centroid', reveal: 0 },
      { label: 'c_g', value: '37,27 mm', focus: 'centroid' },
      { label: 'W_d', value: '68,6·10³ mm³', focus: 'Ix' },
      { label: 'W_g', value: '152,2·10³ mm³', focus: 'Ix' },
      { label: 'M_x', value: '10·10⁶ N·mm', focus: 'Ix' },
      { label: 'σ_d', value: '145,8 MPa', focus: 'Ix' },
      { label: 'σ_g', value: '65,7 MPa', focus: 'Ix' },
    ],
    note: 'Teownik o różnych odległościach górnej i dolnej krawędzi od osi centralnej.',
  },
  scenes: [
    {
      title: 'Dane i układ osi',
      narration:
        'Przekrój jest teownikiem o wysokości 120 mm. Oś centralna leży 82,73 mm nad dolną krawędzią, więc odległości skrajnych włókien są różne.',
      caption: 'Oś centralna nie leży w połowie wysokości przekroju.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'c_d=82{,}73\\ \\text{mm},\\quad c_g=120-82{,}73=37{,}27\\ \\text{mm}',
    },
    {
      title: 'Odległości skrajnych włókien',
      narration: 'Odległość dolnej krawędzi od osi: c_d=82,73 mm. Odległość górnej krawędzi: c_g=120-82,73=37,27 mm.',
      caption: 'Dolna krawędź jest dalej od osi niż górna.',
      visual: 'section',
      focus: { metric: 'centroid' },
      formula: 'c_d=82{,}73\\ \\text{mm},\\quad c_g=37{,}27\\ \\text{mm}',
    },
    {
      title: 'Wskaźnik dla dolnej krawędzi',
      narration: 'Wskaźnik dla dolnej krawędzi: W_d=I_x/c_d=5,674· 10^6/82,73≈ 68,6· 10^3 mm^3.',
      caption: 'Wskaźnik dla dolnej krawędzi.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'W_d=I_x/c_d=5{,}674\\cdot10^6/82{,}73\\approx68{,}6\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Wskaźnik dla górnej krawędzi',
      narration: 'Wskaźnik dla górnej krawędzi: W_g=I_x/c_g=5,674· 10^6/37,27≈ 152,2· 10^3 mm^3.',
      caption: 'Wskaźnik dla górnej krawędzi jest większy.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: 'W_g=I_x/c_g=5{,}674\\cdot10^6/37{,}27\\approx152{,}2\\cdot10^3\\ \\text{mm}^3',
    },
    {
      title: 'Zamiana jednostek momentu',
      narration: 'Moment zamieniamy na N·mm: 10 kN·m=10· 10^6 N·mm.',
      caption: 'Do wzoru na naprężenie moment podstawiamy w N·mm.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: '10\\ \\text{kN}\\cdot\\text{m}=10\\cdot10^6\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Naprężenie na dolnej krawędzi',
      narration: 'Naprężenie na dolnej krawędzi: σ_d=10· 10^6/(68,6· 10^3)≈ 145,8 MPa.',
      caption: 'Naprężenie na dolnej krawędzi.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: '\\sigma_d=10\\cdot10^6/(68{,}6\\cdot10^3)\\approx145{,}8\\ \\text{MPa}',
    },
    {
      title: 'Naprężenie na górnej krawędzi',
      narration: 'Naprężenie na górnej krawędzi: σ_g=10· 10^6/(152,2· 10^3)≈ 65,7 MPa.',
      caption: 'Naprężenie na górnej krawędzi jest mniejsze.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula: '\\sigma_g=10\\cdot10^6/(152{,}2\\cdot10^3)\\approx65{,}7\\ \\text{MPa}',
    },
    {
      title: 'Interpretacja wyniku',
      narration:
        'Strona krytyczna to dolna krawędź, bo ma mniejsze W i większe naprężenie. Dla typowej stali konstrukcyjnej o σ_dop=160 MPa przekrój spełnia warunek z niewielkim zapasem.',
      caption: 'O wytężeniu decyduje dolna krawędź.',
      visual: 'section',
      focus: { metric: 'Ix' },
      formula:
        '\\boxed{W_d\\approx68{,}6\\cdot10^3\\ \\text{mm}^3,\\quad W_g\\approx152{,}2\\cdot10^3\\ \\text{mm}^3,\\quad \\sigma_d\\approx145{,}8\\ \\text{MPa},\\quad \\sigma_g\\approx65{,}7\\ \\text{MPa}}',
    },
  ],
} satisfies SolutionData
