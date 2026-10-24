import type { SolutionData } from '../../model'
import { lazy } from 'react'

export default {
  id: 'ex-foundations-si-units-3',
  title: 'Jednostki SI: wspólny język obliczeń — przykład 3',
  duration: 7,
  given: ['P = 120 kN', 'σ_dop = 160 MPa', 'dobrano d = 32 mm'],
  result:
    'A_min = 750 mm², d_min ≈ 30,9 mm, przyjęto d = 32 mm, czyli A ≈ 804 mm². Naprężenie wynosi σ ≈ 149 MPa < 160 MPa, więc dobór jest poprawny. Zaokrąglenie średnicy w dół dałoby przekrój mniejszy od minimalnego i naprężenie większe od dopuszczalnego.',
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SiUnitsExample3Animation }))),
  scenes: [
    {
      title: 'Model, dane i dobór przekroju',
      narration:
        'Pręt przenosi 120 kN przy naprężeniu dopuszczalnym 160 MPa. Z warunku σ = N/A ≤ σ_dop obliczamy A_min = 120 000 / 160 = 750 mm². Dla pręta okrągłego d_min = √(4·750/π) ≈ 30,9 mm, więc przyjmujemy d = 32 mm. Pole wynosi π·32²/4 ≈ 804 mm², a naprężenie 120 000 / 804 ≈ 149 MPa < 160 MPa. Dobór jest poprawny.',
      caption: 'd = 32 mm, A ≈ 804 mm², σ ≈ 149 MPa < 160 MPa.',
      visual: 'axial',
      formula:
        'P=120\\ \\text{kN},\\quad \\sigma_{\\text{dop}}=160\\ \\text{MPa}\\qquad \\sigma=\\frac{N}{A}\\le160\\ \\text{MPa}\\qquad A_{\\min}=\\frac{120\\,000}{160}=750\\ \\text{mm}^2\\qquad d=\\sqrt{\\frac{4\\cdot750}{\\pi}}\\approx30{,}9\\ \\text{mm}\\qquad d=32\\ \\text{mm}\\qquad A=\\frac{\\pi\\cdot32^2}{4}\\approx804\\ \\text{mm}^2\\qquad \\sigma=\\frac{120\\,000}{804}\\approx149\\ \\text{MPa}<160\\ \\text{MPa}',
    },
  ],
} satisfies SolutionData
