import { solveShaftThreeTask, type ShaftThreeSolveConfig } from '../../solution-factories/factory-shaft-three/factory'

export const solveConfig: ShaftThreeSolveConfig = {
  loads: [
    { label: 'Q', at: { x: 0, y: 0, z: 4.5 }, value: { x: 0, y: 0, z: -20 } },
    { label: 'G', at: { x: 2, y: 2, z: 4.5 }, value: { x: 0, y: 0, z: -18 } },
  ],
  unknowns: [
    { label: 'P', at: { x: 4, y: 0, z: 4.5 }, dir: { x: -1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_x', at: { x: 0, y: 0, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'A_y', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 1, z: 0 }, kind: 'force' },
    { label: 'A_z', at: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
    { label: 'B_x', at: { x: 0, y: 4, z: 0 }, dir: { x: 1, y: 0, z: 0 }, kind: 'force' },
    { label: 'B_z', at: { x: 0, y: 4, z: 0 }, dir: { x: 0, y: 0, z: 1 }, kind: 'force' },
  ],
  checkPoint: { x: 2, y: 2, z: 0 },
}

export const solution = solveShaftThreeTask(solveConfig)
export const meta = {
  id: 'rama-przestrzenna-6-pretow',
  title: 'Zestaw B, schemat 3: rama przestrzenna z sześcioma prętami',
  duration: 9,
  given: [
    'Q = 20 kN; G = 18 kN',
    'a = 4,0 m, b = 4,0 m, c = 4,5 m',
    'Rama z prętami 1–6, Q działa w narożu górnym, G w środku górnej płaszczyzny',
    'A — przegub kulisty (3 reakcje), B — łożysko cylindryczne (2 reakcje), P — pionowa reakcja równoważąca w C',
  ],
  result:
    'P = 8,000 kN; A_x = 8,000 kN; A_y = 0,000 kN; A_z = 29,000 kN; B_x = 0,000 kN; B_z = 9,000 kN; R_A = 30,083 kN; R_B = 9,000 kN',
}
