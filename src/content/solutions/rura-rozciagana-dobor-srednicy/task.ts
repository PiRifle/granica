import type { HollowTubeInputs } from '../../solution-factories/factory-axial-thermal/factory'

export const inputs: HollowTubeInputs = { d: 100, p: 400, sigmaDop: 120 }

export const meta = {
  id: 'rura-rozciagana-dobor-srednicy',
  title: 'Rura rozciągana — dobór średnicy zewnętrznej',
  duration: 10,
  given: [
    'średnica wewnętrzna rury d = 100 mm',
    'siła rozciągająca P = 400 kN',
    'naprężenie dopuszczalne σ_dop = 120 MPa',
    'przekrój rurowy o średnicy zewnętrznej D',
  ],
  result:
    'Wymagane D ≥ 119,35 mm, przyjęto D = 120 mm. Wtedy A = 3455,75 mm², a σ = 115,75 MPa < 120 MPa — warunek wytrzymałości jest spełniony, a ścianka ma grubość 10 mm.',
}
