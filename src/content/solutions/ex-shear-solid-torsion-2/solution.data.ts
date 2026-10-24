import type { SolutionData } from '../../model'

export default {
  id: 'ex-shear-solid-torsion-2',
  title: 'Skręcanie wału pełnego — przykład 2',
  duration: 7,
  given: ['P = 15 kW', 'n = 1450 obr/min', 'd = 25 mm', 'G = 80 GPa'],
  result:
    'Ten przykład pokazuje, że moc i prędkość obrotowa są równoważne momentowi. Przy tej samej mocy mniejsza prędkość oznacza większy moment i większe naprężenie. Dlatego wały wolnoobrotowe muszą być grubsze od szybkoobrotowych przenoszących tę samą moc.',
  figure: {
    kind: 'section',
    width: 25,
    height: 25,
    parts: [{ x: 0, y: 0, width: 25, height: 25, label: 'wał ∅25', tone: 'solid' }],
    centroid: { x: 12.5, y: 12.5 },
    values: [
      { label: 'P', value: '15 kW', focus: 'load', reveal: 0 },
      { label: 'n', value: '1450 obr/min', focus: 'load', reveal: 0 },
      { label: 'd', value: '25 mm', focus: 'design', reveal: 0 },
      { label: 'G', value: '80 GPa', focus: 'design', reveal: 0 },
      { label: 'ω', value: '151,84 rad/s', focus: 'load' },
      { label: 'T', value: '98,79 N·m', focus: 'load', reveal: 1 },
      { label: 'W_o', value: '3 068 mm³', focus: 'design', reveal: 2 },
      { label: 'τ_max', value: '32,2 MPa', focus: 'stress', reveal: 2 },
      { label: 'J_o', value: '38 350 mm⁴', focus: 'design', reveal: 3 },
      { label: 'φ na 1 m', value: '1,84°', focus: 'design', reveal: 3 },
    ],
    note: 'Moc i prędkość obrotowa wyznaczają moment, a ten decyduje o naprężeniu i kącie skręcenia.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration:
        'Rozważmy wał napędowy przenoszący moc P = 15 kW przy prędkości obrotowej n = 1450 obr/min. Średnica wału wynosi d = 25 mm, a materiał ma G = 80 GPa. Chcemy obliczyć moment i maksymalne naprężenie.',
      caption:
        'Rozważmy wał napędowy przenoszący moc P = 15 kW przy prędkości obrotowej n = 1450 obr/min. Średnica wału wynosi d = 25 mm, a…',
      visual: 'section',
      focus: { metric: 'load' },
      formula: 'P = 15\\ \\text{kW}',
    },
    {
      title: 'Krok 2',
      narration:
        'Najpierw zamieniamy prędkość obrotową na prędkość kątową: ω = 2π n/60 = 2π · 1450/60 = 151,84 rad/s. Moc w watach to 15 000 W, więc moment wynosi T = P/ω = 15 000/151,84 = 98,79 N·m.',
      caption:
        'Najpierw zamieniamy prędkość obrotową na prędkość kątową: ω = 2π n/60 = 2π · 1450/60 = 151,84 rad/s. Moc w watach to 15 000 W,…',
      visual: 'section',
      focus: { metric: 'load' },
      formula: '\\omega = 2\\pi n/60 = 2\\pi \\cdot 1450/60 = 151{,}84\\ \\text{rad/s}',
    },
    {
      title: 'Krok 3',
      narration:
        'Moment w N·mm to 98 790 N·mm. Wskaźnik wytrzymałości dla d = 25 mm wynosi W_o = π · 25^3/16 = 3067,96 mm^3. Maksymalne naprężenie to τ_max = 98 790/3067,96 = 32,2 MPa.',
      caption:
        'Moment w N·mm to 98 790 N·mm. Wskaźnik wytrzymałości dla d = 25 mm wynosi W_o = π · 25^3/16 = 3067,96 mm^3. Maksymalne naprężenie…',
      visual: 'section',
      focus: { metric: 'stress' },
      formula: '98\\,790\\ \\text{N}\\cdot\\text{mm}',
    },
    {
      title: 'Krok 4',
      narration:
        'Naprężenie 32,2 MPa jest znacznie poniżej typowej granicy plastyczności stali, ale nadal trzeba sprawdzić, czy wał nie skręca się zbyt mocno. Dla długości 1 m i modułu G = 80 GPa kąt wynosi φ = 98 790 · 1000/(80 000 · 38 349,5) = 0,0322 rad, czyli około 1,84°. To już zauważalne skręcenie, które może być nieakceptowalne w precyzyjnym napędzie.',
      caption:
        'Naprężenie 32,2 MPa jest znacznie poniżej typowej granicy plastyczności stali, ale nadal trzeba sprawdzić, czy wał nie skręca się…',
      visual: 'section',
      focus: { metric: 'design' },
      formula: 'G = 80\\ \\text{GPa}',
    },
    {
      title: 'Krok 5',
      narration:
        'Ten przykład pokazuje, że moc i prędkość obrotowa są równoważne momentowi. Przy tej samej mocy mniejsza prędkość oznacza większy moment i większe naprężenie. Dlatego wały wolnoobrotowe muszą być grubsze od szybkoobrotowych przenoszących tę samą moc.',
      caption:
        'Ten przykład pokazuje, że moc i prędkość obrotowa są równoważne momentowi. Przy tej samej mocy mniejsza prędkość oznacza większy…',
      visual: 'section',
      focus: { metric: 'stress' },
    },
  ],
} satisfies SolutionData
