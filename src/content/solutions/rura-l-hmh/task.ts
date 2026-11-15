import type { BendingTorsionInputs } from '../../solution-factories/factory-bending-torsion/factory'

export const inputs: BendingTorsionInputs = {
  p: 2,
  a: 0.25,
  b: 0.5,
  kg: 200,
  d: 40,
  underRadical: '55 481',
  sigmaHmhText: '173,44',
  marginText: '13,3',
}

export const meta = {
  id: 'rura-l-hmh',
  title: 'Zginanie i skręcanie pręta L — średnica według HMH',
  duration: 12,
  given: [
    'rura L utwierdzona w A: odcinek AB = b = 0,50 m wzdłuż osi x',
    'odcinek BC = a = 0,25 m wzdłuż osi z, pionowa siła P = 2 kN w punkcie C',
    'k_g = 200 MPa, przekrój pełny kołowy o średnicy d',
  ],
  result:
    'M_g = P·b = 1,00 kN·m, M_s = P·a = 0,50 kN·m, M_eq = 1,0897 kN·m. Wymagana średnica to d ≥ 38,14 mm, więc przyjmujemy d = 40 mm. Przy tej średnicy σ = 159,15 MPa, τ = 39,79 MPa i σ_HMH = 173,44 MPa < k_g = 200 MPa — warunek HMH jest spełniony.',
}
