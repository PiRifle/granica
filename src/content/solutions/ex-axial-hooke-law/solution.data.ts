import type { SolutionData } from '../../model'

export default {
  id: 'ex-axial-hooke-law',
  title: 'Prawo Hooke’a: proporcjonalne odkształcenie — przykład 1',
  duration: 7,
  given: ['L = 2 m', 'E = 200 GPa', 'σ = 150 MPa'],
  result:
    'ε = 0,00075 = 0,075%, a wydłużenie sprężyste ΔL = 1,5 mm. Zapas względem typowej granicy plastyczności wynosi około 1,57.',
  figure: {
    kind: 'axial',
    top: 'fixed',
    bottom: 'free',
    units: {
      N: 'kN',
      σ: 'MPa',
      ε: '–',
      ΔL: 'mm',
      A: 'mm²',
    },
    segments: [
      {
        id: '1',
        label: '1',
        length: 1000,
        sigma: 150,
        epsilon: 0.00075,
        deltaL: 0.75,
      },
      {
        id: '2',
        label: '2',
        length: 1000,
        sigma: 150,
        epsilon: 0.00075,
        deltaL: 0.75,
      },
    ],
    note: 'σ jest dane; pole i siła nie są potrzebne do wyznaczenia ε i ΔL.',
  },
  scenes: [
    {
      title: 'Krok 1',
      narration: 'Przelicz E = 200 GPa = 200 000 MPa, aby zgodzić jednostki z σ.',
      caption: 'Przelicz E = 200 GPa = 200 000 MPa, aby zgodzić jednostki z σ.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: 'E = 200 GPa = 200\\,000 MPa',
    },
    {
      title: 'Krok 2',
      narration: 'Z prawa Hooke’a: ε = σ/E = 150/200 000 = 0,00075.',
      caption: 'Z prawa Hooke’a: ε = σ/E = 150/200 000 = 0,00075.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon = \\sigma /E = 150/200\\,000 = 0{,}00075',
    },
    {
      title: 'Krok 3',
      narration: 'Przelicz odkształcenie na procent: 0,00075 · 100% = 0,075%.',
      caption: 'Przelicz odkształcenie na procent: 0,00075 · 100% = 0,075%.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '0{,}00075 \\cdot 100\\% = 0{,}075\\%',
    },
    {
      title: 'Krok 4',
      narration: 'Przelicz długość L = 2 m = 2000 mm.',
      caption: 'Przelicz długość L = 2 m = 2000 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: 'L = 2 m = 2000 mm',
    },
    {
      title: 'Krok 5',
      narration: 'Wydłużenie: ΔL = εL = 0,00075 · 2000 mm = 1,5 mm.',
      caption: 'Wydłużenie: ΔL = εL = 0,00075 · 2000 mm = 1,5 mm.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L = \\varepsilon_{L} = 0{,}00075 \\cdot 2000 mm = 1{,}5 mm',
    },
    {
      title: 'Krok 6',
      narration: 'Oblicz zapas względem granicy plastyczności: 235/150 ≈ 1,57.',
      caption: 'Oblicz zapas względem granicy plastyczności: 235/150 ≈ 1,57.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '235/150 \\approx 1{,}57',
    },
    {
      title: 'Krok 7',
      narration:
        'Sprawdź rząd wielkości: 1,5 mm na 2 m to mniej niż 0,1% długości, co jest typowe dla stali w zakresie sprężystym.',
      caption:
        'Sprawdź rząd wielkości: 1,5 mm na 2 m to mniej niż 0,1% długości, co jest typowe dla stali w zakresie sprężystym.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
    },
  ],
} satisfies SolutionData
