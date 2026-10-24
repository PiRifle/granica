import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-axial-hooke-law',
  title: 'Prawo Hooke’a: proporcjonalne odkształcenie — przykład 1',
  duration: 7,
  given: ['L = 2 m', 'E = 200 GPa', 'σ = 150 MPa'],
  result:
    'ε = 0,00075 = 0,075%, a wydłużenie sprężyste ΔL = 1,5 mm. Zapas względem typowej granicy plastyczności wynosi około 1,57.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.HookeLawExample1Animation }))),
  scenes: [
    {
      title: 'Model i dane',
      narration:
        'Pręt stalowy o długości L₀ = 2 m jest rozciągany naprężeniem σ = 150 MPa. Moduł Younga stali wynosi E = 200 GPa = 200 000 MPa.',
      caption: 'W zakresie liniowo sprężystym naprężenie i odkształcenie są wprost proporcjonalne.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula:
        'L_0 = 2\\ \\text{m},\\quad E = 200\\ \\text{GPa} = 200\\,000\\ \\text{MPa},\\quad \\sigma = 150\\ \\text{MPa}',
    },
    {
      title: 'Odkształcenie względne',
      narration: 'Z prawa Hooke’a ε = σ/E = 150/200 000 = 0,00075. Odkształcenie względne wynosi 0,075%.',
      caption: 'ε jest bezwymiarowe; 0,00075 to 0,075%, a nie 0,75%.',
      visual: 'axial',
      focus: { metric: 'ε' },
      formula: '\\varepsilon = \\frac{\\sigma}{E} = \\frac{150}{200\\,000} = 0{,}00075 = 0{,}075\\%',
    },
    {
      title: 'Wydłużenie pręta',
      narration:
        'Wydłużenie to odkształcenie odniesione do długości początkowej: ΔL = εL₀ = 0,00075 · 2000 mm = 1,5 mm.',
      caption: 'Na schemacie wydłużenie jest powiększone, aby było widoczne.',
      visual: 'axial',
      focus: { metric: 'ΔL' },
      formula: '\\Delta L = \\varepsilon L_0 = 0{,}00075 \\cdot 2000\\ \\text{mm} = 1{,}5\\ \\text{mm}',
    },
    {
      title: 'Zapas do granicy plastyczności',
      narration:
        'Naprężenie 150 MPa jest niższe od typowej granicy plastyczności stali 235 MPa. Zapas wynosi 235/150 ≈ 1,57, więc model liniowo sprężysty jest uzasadniony.',
      caption:
        'Sztywność i wytrzymałość to różne kryteria: E opisuje wydłużenie, a granica plastyczności — bezpieczne obciążenie.',
      visual: 'axial',
      focus: { metric: 'σ' },
      formula: '\\frac{\\sigma_y}{\\sigma} = \\frac{235}{150} \\approx 1{,}57',
    },
  ],
} satisfies SolutionData
