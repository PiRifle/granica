import type { SolutionData } from '../../model'
import { AxialHookeLawExample1Animation } from './animation'

export default {
  id: 'ex-axial-hooke-law',
  title: 'Prawo Hooke’a: proporcjonalne odkształcenie — przykład 1',
  duration: 7,
  given: ['L = 2 m', 'E = 200 GPa', 'σ = 150 MPa'],
  result:
    'ε = 0,00075 = 0,075%, a wydłużenie sprężyste ΔL = 1,5 mm. Zapas względem typowej granicy plastyczności wynosi około 1,57.',
  animation: AxialHookeLawExample1Animation,
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Przelicz E = 200 GPa = 200 000 MPa, aby zgodzić jednostki z σ. Z prawa Hooke’a: ε = σ/E = 150/200 000 = 0,00075. Przelicz odkształcenie na procent: 0,00075 · 100% = 0,075%. Przelicz długość L = 2 m = 2000 mm. Wydłużenie: ΔL = εL = 0,00075 · 2000 mm = 1,5 mm. Oblicz zapas względem granicy plastyczności: 235/150 ≈ 1,57. Sprawdź rząd wielkości: 1,5 mm na 2 m to mniej niż 0,1% długości, co jest typowe dla stali w zakresie sprężystym.',
      caption:
        'Sprawdź rząd wielkości: 1,5 mm na 2 m to mniej niż 0,1% długości, co jest typowe dla stali w zakresie sprężystym.',
      visual: 'axial',
      formula:
        'E = 200 GPa = 200\\,000 MPa\\qquad \\varepsilon = \\sigma /E = 150/200\\,000 = 0{,}00075\\qquad 0{,}00075 \\cdot 100\\% = 0{,}075\\%\\qquad L = 2 m = 2000 mm\\qquad \\Delta L = \\varepsilon L = 0{,}00075 \\cdot 2000 mm = 1{,}5 mm\\qquad 235/150 \\approx 1{,}57',
    },
  ],
} satisfies SolutionData
