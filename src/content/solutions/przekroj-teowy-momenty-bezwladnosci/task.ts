import type { TeeSecondMomentsInputs } from '../../solution-factories/factory-section-geometry/factory'

export const inputs: TeeSecondMomentsInputs = {
  flangeWidth: 9,
  flangeThickness: 2,
  webWidth: 1,
  webHeight: 28,
  height: 30,
}

export const meta = {
  id: 'przekroj-teowy-momenty-bezwladnosci',
  title: 'Przekrój teowy — centralne momenty bezwładności',
  duration: 12,
  given: [
    'pas: 9,0 × 2,0 cm; środnik: 1,0 × 28,0 cm',
    'całkowita wysokość 30,0 cm; A = 46 cm²',
    'środek ciężkości z_C = 10,1304 cm od górnej krawędzi',
    'y₀ — pozioma oś centralna; z₀ — pionowa oś centralna',
  ],
  result:
    'I_y0 = 4300,55 cm⁴ (odległości pionowe z), I_z0 = 123,83 cm⁴ (odległości poziome y). Przekrój stawia około 35 razy większy opór przy zginaniu względem osi poziomej.',
}
