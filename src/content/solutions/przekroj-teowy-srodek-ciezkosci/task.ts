import type { TeeCentroidInputs } from '../../solution-factories/factory-section-geometry/factory'

export const inputs: TeeCentroidInputs = { flangeWidth: 9, flangeThickness: 2, webWidth: 1, webHeight: 28, height: 30 }

export const meta = {
  id: 'przekroj-teowy-srodek-ciezkosci',
  title: 'Przekrój teowy — środek ciężkości',
  duration: 11,
  given: [
    'pas (stopka): szerokość 9,0 cm, grubość 2,0 cm',
    'środnik: szerokość 1,0 cm, wysokość 28,0 cm pod pasem',
    'całkowita wysokość przekroju 30,0 cm',
    'oś z mierzona w dół od górnej krawędzi; y — pozioma oś symetrii',
  ],
  result:
    'A = 46 cm², z_C = 466/46 = 10,13 cm od górnej krawędzi, y_C = 0. Pierwszy moment pola względem osi centralnej y₀ jest równy zeru.',
}
