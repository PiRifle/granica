import type { LSectionSecondMomentsInputs } from '../../solution-factories/factory-section-geometry/factory'

export const inputs: LSectionSecondMomentsInputs = { a: 1, verticalHeight: 8, horizontalLength: 5 }

export const meta = {
  id: 'przekroj-katownik-momenty-bezwladnosci',
  title: 'Przekrój L — centralne momenty bezwładności',
  duration: 12,
  given: [
    'pionowa część o szerokości a i całkowitej wysokości 8a',
    'pozioma stopa o długości 5a i grubości a',
    'układ: x w prawo, y w górę, początek O w lewym dolnym narożniku',
    'podział: pionowa część 7a × a nad stopą oraz stopa 5a × a',
  ],
  result:
    'A = 12a², x_C = 4a/3, y_C = 17a/6. Centralne momenty: I_x = 227a⁴/3 ≈ 75,67a⁴, I_y = 68a⁴/3 ≈ 22,67a⁴, I_xy = −70a⁴/3 ≈ −23,33a⁴.',
}
