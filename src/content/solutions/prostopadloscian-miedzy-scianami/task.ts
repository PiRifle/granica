import type { ConfinedCompressionInputs } from '../../solution-factories/factory-confined-compression/factory'

export const inputs: ConfinedCompressionInputs = { a: 200, b: 150, g: 25, p: 200, nu: 0.25, e: 200000 }

export const meta = {
  id: 'prostopadloscian-miedzy-scianami',
  title: 'Prostopadłościan między sztywnymi ścianami — składowe stanu naprężenia',
  duration: 11,
  given: [
    'a = 200 mm (oś x), b = 150 mm (oś y), g = 25 mm (grubość, oś z, między ścianami)',
    'dwie siły ściskające P = 200 kN: wzdłuż x na polu b·g oraz wzdłuż y na polu a·g',
    'sztywne ściany blokują odkształcenie ε_z = 0',
    'ν = 0,25; stal, E = 200 GPa (przyjęte do kontroli odkształceń)',
  ],
  result:
    'σ_x = −53,33 MPa, σ_y = −40,00 MPa, σ_z = −23,33 MPa — wszystkie naprężenia są ściskające, ε_z = 0. Przy założeniu E = 200 GPa: ε_x = −1,875·10⁻⁴, ε_y = −1,0417·10⁻⁴.',
}
