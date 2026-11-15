import type { SteppedAluminumInputs } from '../../solution-factories/factory-axial-thermal/factory'

export const inputs: SteppedAluminumInputs = { a1: 100, l1: 400, a2: 200, l2: 600, p: 9000, q: 8000, e: 70000 }

export const meta = {
  id: 'dwa-prety-aluminium-zerowe-przemieszczenie',
  title: 'Pręt aluminiowy z dwóch części — siła Q dla zerowego przemieszczenia C',
  duration: 12,
  given: [
    'dolna część AB: l₁ = 0,5 m = 500 mm, d₁ = 60 mm',
    'górna część BC: l₂ = 0,4 m = 400 mm, d₂ = 20 mm',
    'E = 70 GPa = 70 000 MPa',
    'siła P = 5 kN skierowana w górę w punkcie C',
    'siła Q skierowana w dół w węźle B',
  ],
  result:
    'Pola wynoszą A₁ = 2827,43 mm² i A₂ = 314,16 mm². Zerowe przemieszczenie C wymaga Q = 41 kN. Wtedy N₁ = −36 kN (ściskanie), N₂ = +5 kN (rozciąganie), a naprężenia wynoszą −12,73 MPa i +15,92 MPa.',
}
