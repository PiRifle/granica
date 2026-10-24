import type { SolutionData } from '../../model'

export default {
  id: 'ex-criteria-safety-factor-2',
  title: 'Współczynnik bezpieczeństwa: ile zapasu ma element? — przykład 2',
  duration: 7,
  given: ['A=400 mm^2', 'F=50 kN', 'R_e=235 MPa', 'E=200 GPa', 'sigma=50 000', 'n=235'],
  result:
    'Taka sytuacja jest częsta w długich cięgnach, sprężynach i elementach, w których liczy się przemieszczenie. Projektant nie może poprzestać na sprawdzeniu n≥ n_wym, bo element o wystarczającym zapasie wytrzymałości może nadal być nieużyteczny z powodu zbyt dużego wydłużenia. Dopiero porównanie obu wymagań daje pełny obraz.',
  figure: {
    kind: 'cube',
    stresses: { x: 125, y: 0, z: 0 },
    strains: { x: 0.000625, y: -0.0001875, z: -0.0001875 },
    volumeChange: '0,025%',
    values: [
      { label: 'A', value: '400 mm²', focus: 'stress', reveal: 0 },
      { label: 'F', value: '50 kN', focus: 'stress', reveal: 0 },
      { label: 'R_e', value: '235 MPa', focus: 'stress', reveal: 0 },
      { label: 'E', value: '200 GPa', focus: 'stress', reveal: 0 },
      { label: 'σ', value: '125 MPa', focus: 'stress' },
      { label: 'n', value: '1,88', focus: 'stress' },
      { label: 'ΔL (L=1 m)', value: '0,625 mm', focus: 'strain' },
      { label: 'ΔL (L=3 m)', value: '1,875 mm', focus: 'strain' },
      { label: 'A_min', value: '500 mm²', focus: 'stress' },
      { label: 'ε_x', value: '625 με', focus: 'strain' },
      { label: 'ε_y', value: '−187,5 με', focus: 'strain' },
      { label: 'θ', value: '250 με', focus: 'volume' },
    ],
    note: 'Zapas wytrzymałości nie zależy od długości, ale wydłużenie rośnie proporcjonalnie do L.',
  },
  scenes: [
    {
      title: 'Zapisz dane pręta',
      narration:
        'Pręt ma pole A = 400 mm² i jest obciążony siłą F = 50 kN. Wykonano go ze stali o R_e = 235 MPa i E = 200 GPa.',
      caption: 'A = 400 mm², F = 50 kN, R_e = 235 MPa, E = 200 GPa.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'A=400\\,\\text{mm}^2,\\qquad F=50\\,\\text{kN},\\qquad R_e=235\\,\\text{MPa},\\qquad E=200\\,\\text{GPa}',
    },
    {
      title: 'Oblicz naprężenie i zapas',
      narration:
        'Naprężenie wynosi σ = 50 000/400 = 125 MPa, więc zapas n = 235/125 = 1,88. Warunek wytrzymałości jest spełniony, jeśli wymagane jest np. n_wym = 1,5.',
      caption: 'σ = 125 MPa, n = 1,88.',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula: '\\sigma=\\frac{50\\,000}{400}=125\\,\\text{MPa},\\qquad n=\\frac{235}{125}=1{,}88',
    },
    {
      title: 'Oblicz wydłużenie dla L = 1 m',
      narration: 'Wydłużenie wynosi ΔL = FL/(EA). Dla L = 1 000 mm otrzymujemy 50 000·1 000/(200 000·400) = 0,625 mm.',
      caption: 'ΔL = 0,625 mm dla L = 1 m.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula: '\\Delta L=\\frac{FL}{EA}=\\frac{50\\,000\\cdot1\\,000}{200\\,000\\cdot400}=0{,}625\\,\\text{mm}',
    },
    {
      title: 'Oblicz wydłużenie dla L = 3 m',
      narration:
        'Dla L = 3 000 mm wydłużenie wynosi 1,875 mm, czyli trzykrotnie więcej. Naprężenie i zapas wytrzymałości pozostają takie same.',
      caption: 'ΔL = 1,875 mm dla L = 3 m.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula: '\\Delta L=\\frac{50\\,000\\cdot3\\,000}{200\\,000\\cdot400}=1{,}875\\,\\text{mm}',
    },
    {
      title: 'Porównaj z limitem wydłużenia',
      narration:
        'Jeżeli dopuszczalne wydłużenie wynosi 1,5 mm, to krótszy pręt je spełnia, a dłuższy nie. Duży zapas wytrzymałości nie gwarantuje więc poprawnej pracy konstrukcji.',
      caption: 'Limit 1,5 mm: L = 1 m spełnia, L = 3 m nie spełnia.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula: '0{,}625<1{,}5\\,\\text{mm},\\qquad 1{,}875>1{,}5\\,\\text{mm}',
    },
    {
      title: 'Oblicz wymagane pole',
      narration:
        'Przy ΔL_dop = 1,5 mm, L = 3 000 mm i F = 50 kN otrzymujemy A ≥ FL/(EΔL_dop) = 50 000·3 000/(200 000·1,5) = 500 mm².',
      caption: 'A_min = 500 mm².',
      visual: 'cube',
      focus: { metric: 'stress' },
      formula:
        'A\\ge\\frac{FL}{E\\Delta L_{dop}}=\\frac{50\\,000\\cdot3\\,000}{200\\,000\\cdot1{,}5}=500\\,\\text{mm}^2',
    },
    {
      title: 'Przelicz stan na odkształcenia',
      narration:
        'Dla σ = 125 MPa i stali E = 200 GPa odkształcenie osiowe wynosi 625 με, a poprzeczne −187,5 με. Ślad 250 με opisuje niewielki wzrost objętości.',
      caption: 'Kontrola: ε_x = 625 με, θ = 250 με.',
      visual: 'cube',
      focus: { metric: 'strain' },
      formula:
        '\\varepsilon_x=\\frac{125}{200\\,000}=625\\,\\mu\\varepsilon,\\qquad \\varepsilon_y=\\varepsilon_z=-187{,}5\\,\\mu\\varepsilon,\\qquad \\theta=250\\,\\mu\\varepsilon',
    },
    {
      title: 'Sprawdź zmianę objętości',
      narration:
        'Ślad tensora odkształcenia jest dodatni, więc objętość elementu rośnie. Wartość śladu jest miarą względnej zmiany objętości.',
      caption: 'Kontrola: θ = 250 με.',
      visual: 'cube',
      focus: { metric: 'volume' },
      formula: '\\theta=250\\,\\mu\\varepsilon',
    },
  ],
} satisfies SolutionData
