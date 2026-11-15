import { solveShaftThreeTask, type ShaftThreeSolveConfig } from '../../solution-factories/factory-shaft-three/factory'

export const meta = {
  id: 'wal-krzywka-pas-t-2t',
  title: 'Zestaw B, schemat 7: wał z krzywką i pasem T = 2t',
  duration: 9,
  given: [
    'T = 3 kN; G = 1 kN',
    't = T/2 = 1,5 kN',
    'a = 0,30 m, b = 0,10 m, c = 0,05 m',
    'R = 0,18 m, r = 0,06 m',
    'T = 2t, T i t ⟂ Ay, P ∥ Az',
  ],
  result:
    'P = 4,500 kN; A_x = 2,250 kN; A_y = 0,000 kN; A_z = 5,500 kN; B_x = -6,750 kN; B_z = 0,000 kN; R_A = 5,942 kN; R_B = 6,750 kN',
}

export const solveConfig: ShaftThreeSolveConfig = {
  loads: [
    { label: 'G', at: { x: 0, y: 0, z: 0 }, value: { x: 0, y: 0, z: -1 } },
    { label: 't', at: { x: 0, y: 0.45, z: 0.18 }, value: { x: 1.5, y: 0, z: 0 } },
    { label: 'T', at: { x: 0, y: 0.45, z: -0.18 }, value: { x: 3, y: 0, z: 0 } },
  ],
  unknowns: [
    { label: 'P', at: { x: 0.06, y: 0, z: 0 }, dir: { x: 0, y: 0, z: -1 }, kind: 'force' },
    { label: 'A_x', at: { x: 0, y: 0, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_y', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
    { label: 'A_z', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'B_x', at: { x: 0, y: 0.3, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'B_z', at: { x: 0, y: 0.3, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
  ],
  checkPoint: { x: 0, y: 0.2, z: 0.1 },
}

export const solution = solveShaftThreeTask(solveConfig)
