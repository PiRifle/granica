import type { AxialStressStateInputs } from '../../solution-factories/factory-axial-thermal/factory'

export const inputs: AxialStressStateInputs = { area: 100, p: 50 }

export const meta = {
  id: 'pret-rozciagany-naprezenia-glowne',
  title: 'Pręt rozciągany — maksymalne ścinanie i naprężenia główne',
  duration: 11,
  given: [
    'pole przekroju A = 100 mm²',
    'siła osiowa rozciągająca P = 50 kN',
    'w układzie x-y-z: σ_y = σ_z = 0 oraz wszystkie składniki styczne równe zero',
  ],
  result:
    'σ_x = 500 MPa, σ_1 = 500 MPa, σ_2 = σ_3 = 0. Maksymalne ścinanie τ_max = 250 MPa występuje na płaszczyźnie nachylonej pod 45°, gdzie σ = 250 MPa i τ = 250 MPa.',
}
