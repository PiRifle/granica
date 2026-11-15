import { solveShaftThreeTask, type ShaftThreeSolveConfig } from '../../solution-factories/factory-shaft-three/factory'

export const solveConfig: ShaftThreeSolveConfig = {
  loads: [
    { label: 'Q', at: { x: 0.2, y: 0, z: 0.1 }, value: { x: 0, y: 0, z: -4 } },
    { label: 'G', at: { x: 0, y: 0.2, z: 0 }, value: { x: 0, y: 0, z: -2 } },
  ],
  unknowns: [
    { label: 'P', at: { x: 0, y: 0.6000000000000001, z: 0.1 }, dir: { x: -1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_x', at: { x: 0, y: 0, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_y', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
    { label: 'A_z', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'B_x', at: { x: 0, y: 0.6000000000000001, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'B_z', at: { x: 0, y: 0.6000000000000001, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
  ],
  checkPoint: { x: 0, y: 0.1, z: 0 },
}

export const solution = solveShaftThreeTask(solveConfig)
export const meta = {
  id: 'plytki-prostopadle-sily',
  title: 'Zestaw B, schemat 2: układ płytek z siłą Q i siłą P wzdłuż osi x',
  duration: 9,
  given: [
    'Q = 4 kN; G = 2 kN',
    'a = 0,20 m, b = 0,10 m, c = 0,30 m',
    'R = 0,10 m, r = 0,10 m',
    'Q ⟂ Ay, CD ⟂ Ax, P ∥ Ax',
    'A — przegub kulisty (3 reakcje), B — łożysko cylindryczne o osi y (2 reakcje)',
  ],
  result:
    'P = 8,000 kN; A_x = 0,000 kN; A_y = 0,000 kN; A_z = 5,333 kN; B_x = 8,000 kN; B_z = 0,667 kN; R_A = 5,333 kN; R_B = 8,028 kN',
}
