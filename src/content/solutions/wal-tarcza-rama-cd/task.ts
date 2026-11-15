import { solveShaftThreeTask, type ShaftThreeSolveConfig } from '../../solution-factories/factory-shaft-three/factory'

export const meta = {
  id: 'wal-tarcza-rama-cd',
  title: 'Zestaw B, schemat 9: wał z tarczą i ramą CD',
  duration: 9,
  given: [
    'Q = 5 kN; G = 3 kN',
    'a = 0,20 m, b = 0,15 m, c = 0,10 m',
    'R = 0,30 m, r = 0,40 m',
    'Q ⟂ Ay, P ∥ Ax, CD ⟂ Ax',
    'A — przegub kulisty (3 reakcje), B — łożysko cylindryczne (2 reakcje)',
  ],
  result:
    'P = 3,750 kN; A_x = -2,587 kN; A_y = 0,000 kN; A_z = 2,801 kN; B_x = 2,801 kN; B_z = 3,735 kN; R_A = 3,813 kN; R_B = 4,668 kN',
}

export const solveConfig: ShaftThreeSolveConfig = {
  loads: [
    { label: 'G', at: { x: 0, y: 0.2, z: 0 }, value: { x: 0, y: 0, z: -3 } },
    {
      label: 'Q',
      at: { x: 0.21213203435596426, y: 0.2, z: 0.21213203435596423 },
      value: { x: 3.5355339059327373, y: 0, z: -3.5355339059327378 },
    },
  ],
  unknowns: [
    { label: 'P', at: { x: 0, y: 0.44999999999999996, z: 0.4 }, dir: { x: -1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_x', at: { x: 0, y: 0, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_y', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
    { label: 'A_z', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'B_x', at: { x: 0, y: 0.35, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'B_z', at: { x: 0, y: 0.35, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
  ],
  checkPoint: { x: 0, y: 0.3, z: 0.1 },
}

export const solution = solveShaftThreeTask(solveConfig)
