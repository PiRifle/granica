import { solveShaftThreeTask, type ShaftThreeSolveConfig } from '../../solution-factories/factory-shaft-three/factory'

export const meta = {
  id: 'wal-tarcze-lina-45',
  title: 'Zestaw B, schemat 1: wał z dwiema tarczami i liną pod kątem 45°',
  duration: 9,
  given: [
    'Q = 2 kN; G = 20 kN',
    'a = 0,20 m, b = 0,30 m, c = 0,10 m',
    'R = 0,15 m, r = 0,05 m',
    'P ∥ Ax, CD ⟂ Ay, Q pionowe (Q ⟂ Ay)',
    'A — przegub kulisty (3 reakcje), B — łożysko cylindryczne o osi y (2 reakcje)',
  ],
  result:
    'P = 0,471 kN; A_x = 0,079 kN; A_y = 0,000 kN; A_z = 4,667 kN; B_x = 0,393 kN; B_z = 17,333 kN; R_A = 4,667 kN; R_B = 17,338 kN',
}

export const solveConfig: ShaftThreeSolveConfig = {
  loads: [
    { label: 'G', at: { x: 0, y: 0.5, z: 0 }, value: { x: 0, y: 0, z: -20 } },
    { label: 'Q', at: { x: 0.03535533905932738, y: 0.2, z: -0.035355339059327376 }, value: { x: 0, y: 0, z: -2 } },
  ],
  unknowns: [
    { label: 'P', at: { x: 0, y: 0.5, z: 0.15 }, dir: { x: -1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_x', at: { x: 0, y: 0, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_y', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
    { label: 'A_z', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'B_x', at: { x: 0, y: 0.6, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'B_z', at: { x: 0, y: 0.6, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
  ],
  checkPoint: { x: 0, y: 0.3, z: 0 },
}

export const solution = solveShaftThreeTask(solveConfig)
