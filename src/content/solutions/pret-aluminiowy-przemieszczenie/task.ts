import type { AxialElongationInputs } from '../../solution-factories/factory-axial-thermal/factory'

export const inputs: AxialElongationInputs = {
  area: 120,
  e: 75000,
  segments: [
    { length: 100, forces: -5000 },
    { length: 300, forces: -3000 },
    { length: 200, forces: 2000 },
  ],
}

export const meta = {
  id: 'pret-aluminiowy-przemieszczenie',
  title: 'Pręt aluminiowy — całkowita zmiana długości',
  duration: 11,
  given: [
    'A = 120 mm², E = 75 GPa = 75 000 MPa',
    'odcinki: L₁ = 100 mm, L₂ = 300 mm, L₃ = 200 mm',
    'P₁ = 5000 N w lewo na lewym końcu',
    'P₂ = 3000 N w prawo w x = 100 mm',
    'P₃ = 10 000 N w lewo w x = 400 mm',
    'P₄ = 12 000 N w prawo na prawym końcu',
  ],
  result:
    'Siły podłużne wynoszą N₁ = +5 kN, N₂ = +2 kN, N₃ = +12 kN. Wydłużenia odcinków: 0,0556 mm, 0,0667 mm i 0,2667 mm, więc całkowite wydłużenie pręta wynosi ΔL = +0,3889 mm.',
}
