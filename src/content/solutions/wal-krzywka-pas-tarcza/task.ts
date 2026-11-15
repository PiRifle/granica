import { solveShaftThreeTask, type ShaftThreeSolveConfig } from '../../solution-factories/factory-shaft-three/factory'

export const meta = {
  id: 'wal-krzywka-pas-tarcza',
  title: 'Zestaw B, schemat 4: wał z krzywką i tarczą pasową',
  duration: 9,
  given: [
    'Q = 3 kN; G = 2 kN',
    'a = 0,30 m, b = 0,20 m, c = 0,40 m',
    'R = 0,15 m, r = 0,10 m',
    'Q ⟂ Ay, P ⟂ Ay, P mimośrodowa o ramieniu r',
    'A — przegub kulisty (3 reakcje), B — łożysko cylindryczne (2 reakcje)',
  ],
  result:
    'P = 3,000 kN; A_x = 1,333 kN; A_y = 0,000 kN; A_z = 4,333 kN; B_x = 1,667 kN; B_z = 0,667 kN; R_A = 4,534 kN; R_B = 1,795 kN',
}

export const solveConfig: ShaftThreeSolveConfig = {
  loads: [
    { label: 'G', at: { x: 0, y: 0.3, z: 0 }, value: { x: 0, y: 0, z: -2 } },
    { label: 'Q', at: { x: 0, y: 0.5, z: 0.1 }, value: { x: -3, y: 0, z: 0 } },
  ],
  unknowns: [
    { label: 'P', at: { x: 0.1, y: 0, z: 0 }, dir: { x: 0, y: 0, z: -1 }, kind: 'force' },
    { label: 'A_x', at: { x: 0, y: 0, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_y', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
    { label: 'A_z', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'B_x', at: { x: 0, y: 0.9, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'B_z', at: { x: 0, y: 0.9, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
  ],
  checkPoint: { x: 0, y: 0.2, z: 0 },
}

export const solution = solveShaftThreeTask(solveConfig)
