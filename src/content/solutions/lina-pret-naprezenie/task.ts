import type { RopeBarStressInputs } from '../../solution-factories/factory-axial-thermal/factory'

export const inputs: RopeBarStressInputs = {
  mass: 3000,
  aRope: 120,
  aBar: 300,
  lRope: 1.5,
  lBar: 2.5,
  eRope: 100000,
  eBar: 210000,
}

export const meta = {
  id: 'lina-pret-naprezenie',
  title: 'Pręt ABC 3000 kg — naprężenie w linie',
  duration: 12,
  given: [
    'pręt ABC: m = 3000 kg, AC = 10 m, przegub w C',
    'B jest środkiem pręta: AB = BC = 5 m',
    'lina od A przez bloczek D (3 m nad B) do B',
    'średnica liny d = 12 mm',
    'g = 9,81 m/s² (założenie do obliczenia ciężaru)',
  ],
  result:
    'Ciężar pręta wynosi W = 29430 N. Z momentu względem C otrzymujemy naciąg liny S = 14 504,7 N ≈ 14,50 kN. Pole liny to 113,10 mm², więc naprężenie σ = 128,25 MPa.',
}
