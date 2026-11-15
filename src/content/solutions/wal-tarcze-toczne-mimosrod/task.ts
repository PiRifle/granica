import { solveShaftThreeTask, type ShaftThreeSolveConfig } from '../../solution-factories/factory-shaft-three/factory'

export const meta = {
  id: 'wal-tarcze-toczne-mimosrod',
  title: 'Zestaw B, schemat 5: wał z tarczami tocznymi i mimośrodem δ',
  duration: 9,
  given: [
    'Q = 5 kN; G = 3 kN',
    'a = 0,30 m, b = 0,40 m, c = 0,20 m',
    'R = 0,20 m, r = 0,15 m',
    'N = G, N ∥ Az, P ∥ Ax, Q ⟂ Ay',
    'δ = 5·10⁻³ R = 0,0010 m',
  ],
  result:
    'P = 1,845 kN; A_x = 2,291 kN; A_y = 0,000 kN; A_z = -0,714 kN; B_x = -4,777 kN; B_z = 3,214 kN; R_A = 2,400 kN; R_B = 5,757 kN',
}

export const solveConfig: ShaftThreeSolveConfig = {
  loads: [
    { label: 'G₁', at: { x: 0, y: 0, z: 0 }, value: { x: 0, y: 0, z: -3 } },
    { label: 'N₁', at: { x: 0.001, y: 0, z: 0 }, value: { x: 0, y: 0, z: 3 } },
    { label: 'G₂', at: { x: 0, y: 0.3, z: 0 }, value: { x: 0, y: 0, z: -3 } },
    { label: 'N₂', at: { x: 0.001, y: 0.3, z: 0 }, value: { x: 0, y: 0, z: 3 } },
    {
      label: 'Q',
      at: { x: 0.15, y: 0.8999999999999999, z: 0 },
      value: { x: 4.330127018922194, y: 0, z: -2.4999999999999996 },
    },
  ],
  unknowns: [
    { label: 'P', at: { x: 0, y: 0.3, z: 0.2 }, dir: { x: -1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_x', at: { x: 0, y: 0, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_y', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
    { label: 'A_z', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'B_x', at: { x: 0, y: 0.7, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'B_z', at: { x: 0, y: 0.7, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
  ],
  checkPoint: { x: 0, y: 0.1, z: 0.1 },
}

export const solution = solveShaftThreeTask(solveConfig)
