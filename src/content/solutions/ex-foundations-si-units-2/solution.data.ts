import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-foundations-si-units-2',
  title: 'Jednostki SI: wspólny język obliczeń — przykład 2',
  duration: 7,
  given: ['b = 250 mm', 't = 12 mm', 'P = 150 kN', 'L = 2,5 m', 'E = 200 GPa'],
  result:
    'A = 3000 mm², σ = 50 MPa, ΔL = 0,625 mm. Sprawdzenie: 200 000 MPa to 200 000 N/mm². Iloczyn EA ma więc jednostkę N, a NL jednostkę N·mm. Iloraz daje mm, zgodnie z oczekiwaniem. Wydłużenie 0,625 mm na długości 2500 mm to około 0,025 procenta, co jest typowe dla stali w zakresie sprężystym.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SiUnitsExample2Animation }))),
  scenes: [
    {
      title: 'Model, dane i obliczenia',
      narration:
        'Taśma 250 × 12 mm o długości 2,5 m jest rozciągana siłą 150 kN, a moduł Younga stali wynosi 200 GPa. Pole przekroju to 250 · 12 = 3000 mm², więc naprężenie wynosi 150 000 / 3000 = 50 MPa. Do wydłużenia zamieniamy L = 2500 mm i E = 200 000 MPa: ΔL = 150 000 · 2500 / (200 000 · 3000) = 0,625 mm. Odkształcenie ε = 0,625 / 2500 = 0,00025, czyli 0,025%. Kontrola wymiaru: N·mm / N = mm.',
      caption: 'A = 3000 mm², σ = 50 MPa, ΔL = 0,625 mm, ε = 0,00025.',
      visual: 'axial',
      formula:
        'b=250\\ \\text{mm},\\quad t=12\\ \\text{mm}\\qquad A=250\\ \\text{mm}\\cdot12\\ \\text{mm}=3000\\ \\text{mm}^2\\qquad \\sigma=\\frac{150\\,000}{3000}=50\\ \\text{N/mm}^2=50\\ \\text{MPa}\\qquad L=2{,}5\\ \\text{m}=2500\\ \\text{mm}\\qquad E=200\\ \\text{GPa}=200\\,000\\ \\text{MPa}\\qquad \\Delta L=\\frac{150\\,000\\cdot2500}{200\\,000\\cdot3000}=0{,}625\\ \\text{mm}\\qquad \\varepsilon=\\frac{0{,}625}{2500}=0{,}00025=0{,}025\\%\\qquad \\frac{\\text{N}\\cdot\\text{mm}}{\\text{N}}=\\text{mm}',
    },
  ],
} satisfies SolutionData
