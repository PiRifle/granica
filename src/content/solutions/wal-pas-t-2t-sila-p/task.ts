import { solveShaftThreeTask, type ShaftThreeSolveConfig } from '../../solution-factories/factory-shaft-three/factory'

export const meta = {
  id: 'wal-pas-t-2t-sila-p',
  title: 'Zestaw B, schemat 6: wał z pasem T = 2t i siłą P',
  duration: 9,
  given: [
    'Q = 1 kN; T = 4 kN; G = 2 kN',
    't = T/2 = 2,0 kN',
    'a = 0,40 m, b = 0,30 m, c = 0,20 m',
    'R = 0,20 m, r = 0,10 m',
    'T = 2t, T i t ⟂ Ay, P ⟂ Ay',
  ],
  result:
    'P = 2,000 kN; A_x = 0,000 kN; A_y = 0,000 kN; A_z = 7,833 kN; B_x = 0,000 kN; B_z = 3,167 kN; R_A = 7,833 kN; R_B = 3,167 kN',
}

export const solveConfig: ShaftThreeSolveConfig = {
  loads: [
    { label: 'G', at: { x: 0, y: 0.2, z: 0 }, value: { x: 0, y: 0, z: -2 } },
    { label: 't', at: { x: 0.2, y: 0, z: 0 }, value: { x: 0, y: 0, z: -2 } },
    { label: 'T', at: { x: -0.2, y: 0, z: 0 }, value: { x: 0, y: 0, z: -4 } },
    { label: 'Q', at: { x: 0.2, y: 0.7, z: 0 }, value: { x: 0, y: 0, z: -1 } },
  ],
  unknowns: [
    { label: 'P', at: { x: 0.1, y: 0.4, z: 0.1 }, dir: { x: 0, y: 0, z: -1 }, kind: 'force' },
    { label: 'A_x', at: { x: 0, y: 0, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_y', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
    { label: 'A_z', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'B_x', at: { x: 0, y: 0.6000000000000001, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'B_z', at: { x: 0, y: 0.6000000000000001, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
  ],
  checkPoint: { x: 0, y: 0.1, z: 0.1 },
}

export const solution = solveShaftThreeTask(solveConfig)
