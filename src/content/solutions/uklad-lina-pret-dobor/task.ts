import type { TwoRopeBarDesignInputs } from '../../solution-factories/factory-axial-thermal/factory'

export const inputs: TwoRopeBarDesignInputs = {
  mass: 800,
  lRope: 2,
  lBar: 3,
  kRope: 160,
  kBar: 120,
  eRope: 100000,
  eBar: 210000,
}

export const meta = {
  id: 'uklad-lina-pret-dobor',
  title: 'Pręt 800 kg na dwóch linach — przekroje i wydłużenia',
  duration: 12,
  given: [
    'pręt AB: m = 800 kg, L = 10 m, zawieszony poziomo',
    'lina brązowa przy A: L₁ = 4 m, k_b = 90 MPa, E_b = 120 GPa',
    'lina stalowa przy B: L₂ = 3 m, k_st = 120 MPa, E_st = 200 GPa',
    'g = 9,81 m/s² (założenie do obliczenia ciężaru)',
  ],
  result:
    'Ciężar pręta wynosi W = 7848 N, więc każda lina przenosi 3924 N. Minimalne pola to 43,6 mm² (brąz) i 32,7 mm² (stal). Przy tych polach wydłużenia wynoszą 3,00 mm i 1,80 mm — dłuższa lina brązowa wydłuża się bardziej.',
}
