import { solveShaftThreeTask, type ShaftThreeSolveConfig } from '../../solution-factories/factory-shaft-three/factory'

export const meta = {
  id: 'wal-tarcza-lina-pas-t-2t',
  title: 'Zestaw B, schemat 10: wał z tarczą, liną 45° i pasem T = 2t',
  duration: 9,
  given: [
    'Q = 1 kN; T = 4 kN; G = 2 kN',
    't = T/2 = 2,0 kN',
    'a = 0,30 m, b = 0,40 m, c = 0,20 m',
    'R = 0,20 m, r = 0,10 m',
    't ∥ Ax, Q ⟂ Ay, P ∥ Az, T = 2t',
  ],
  result:
    'P = 0,268 kN; A_x = 10,221 kN; A_y = 0,000 kN; A_z = 6,439 kN; B_x = -16,392 kN; B_z = -6,000 kN; R_A = 12,080 kN; R_B = 17,456 kN',
}

export const solveConfig: ShaftThreeSolveConfig = {
  loads: [
    { label: 'G', at: { x: 0, y: 0, z: 0 }, value: { x: 0, y: 0, z: -2 } },
    {
      label: 'Q',
      at: { x: 0.14142135623730953, y: 0, z: 0.1414213562373095 },
      value: { x: 0.7071067811865475, y: 0, z: -0.7071067811865476 },
    },
    { label: 't', at: { x: 0, y: 0.8999999999999999, z: 0.1 }, value: { x: 2, y: 0, z: 0 } },
    {
      label: 'T',
      at: { x: 0, y: 0.8999999999999999, z: -0.1 },
      value: { x: 3.464101615137755, y: 0, z: 1.9999999999999998 },
    },
  ],
  unknowns: [
    { label: 'P', at: { x: 0.2, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'A_x', at: { x: 0, y: 0, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_y', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
    { label: 'A_z', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'B_x', at: { x: 0, y: 0.3, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'B_z', at: { x: 0, y: 0.3, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
  ],
  checkPoint: { x: 0, y: 0.2, z: 0.1 },
}

export const solution = solveShaftThreeTask(solveConfig)
