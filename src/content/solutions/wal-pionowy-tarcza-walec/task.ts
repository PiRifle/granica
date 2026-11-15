import { solveShaftThreeTask, type ShaftThreeSolveConfig } from '../../solution-factories/factory-shaft-three/factory'

export const meta = {
  id: 'wal-pionowy-tarcza-walec',
  title: 'Zestaw B, schemat 8: pionowy wał z tarczą i walcem',
  duration: 9,
  given: [
    'Q = 4 kN; T = 6 kN; G = 3 kN',
    't = T/2 = 3,0 kN',
    'a = 0,20 m, b = 0,40 m, c = 0,15 m',
    'R = 0,20 m, r = 0,10 m',
    'T = 2t, t ∥ Ay, T ⊥ Az, P ∥ Ay',
  ],
  result:
    'P = 2,196 kN; A_x = 15,451 kN; A_y = 15,215 kN; A_z = 7,000 kN; B_x = -20,647 kN; B_y = -19,019 kN; R_A = 22,787 kN; R_B = 28,072 kN',
}

export const solveConfig: ShaftThreeSolveConfig = {
  loads: [
    { label: 'Q', at: { x: -0.2, y: 0, z: 0.75 }, value: { x: 0, y: 0, z: -4 } },
    { label: 'G', at: { x: 0, y: 0, z: 0.075 }, value: { x: 0, y: 0, z: -3 } },
    { label: 't', at: { x: 0.2, y: 0, z: 0.75 }, value: { x: 0, y: 3, z: 0 } },
    { label: 'T', at: { x: 0, y: 0.2, z: 0.75 }, value: { x: 5.196152422706632, y: 2.9999999999999996, z: 0 } },
  ],
  unknowns: [
    { label: 'P', at: { x: -0.2, y: 0, z: 0.75 }, dir: { x: 0, y: -1, z: 0 }, kind: 'force' },
    { label: 'A_x', at: { x: 0, y: 0, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_y', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
    { label: 'A_z', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'B_x', at: { x: 0, y: 0, z: 0.15 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'B_y', at: { x: 0, y: 0, z: 0.15 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
  ],
  checkPoint: { x: 0, y: 0, z: 0.3 },
}

export const solution = solveShaftThreeTask(solveConfig)
