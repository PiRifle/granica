import {
  createReakcjeRamaTask,
  force,
  pin,
  point,
  vertical,
  type ReakcjeRamaConfig,
} from '../../solution-factories/factory-statyka-reakcje-rama/factory'

const config: ReakcjeRamaConfig = {
  nr: 5,
  p1: 9,
  moment: 16,
  q: 1.6,
  geometry:
    'Utwierdzenie A = (0;0), przegub pośredni C = (3;3), rolka B = (5;3), koniec pasa w x = 8 m. Oprócz trzech równań całości używamy momentu prawej części względem C.',
  givenGeometry: 'q na 3 m; C po 3 m; B po kolejnych 2 m; wspornik P₁: 3 m; P₁ pod 30°',
  loads: [force(0, -4.8, point(1.5, 3)), force(-7.79423, -4.5, point(8, 3))],
  couples: [-16],
  unknowns: [...pin(point(0, 0)), { kind: 'couple' }, vertical(point(5, 3))],
  labels: ['A_x', 'A_y', 'M_A', 'B_y'],
  loadTex:
    'Q=1{,}6\\cdot3=4{,}8\\ \\mathrm{kN},\\qquad P_{1x}=-9\\cos30^\\circ=-7{,}794\\ \\mathrm{kN},\\quad P_{1y}=-4{,}5\\ \\mathrm{kN}',
  resultantTex:
    'Q=4{,}8\\ \\mathrm{kN}\\ \\text{w }(1{,}5;3),\\qquad P_1=(-7{,}794;-4{,}5)\\ \\mathrm{kN}\\ \\text{w }(8;3)',
  momentTex: '\\sum M_C^{(P)}=2B_y+5(-4{,}5)-16=0\\quad\\Rightarrow\\quad B_y=19{,}250\\ \\mathrm{kN}',
  extraEquations: [{ type: 'M', at: point(3, 3), loadIndices: [1], coupleIndices: [0], unknownIndices: [3] }],
}

export { config }

const solved = createReakcjeRamaTask(config)
export const values = solved.values
export const residual = solved.residual
export const task = { ...solved.task, id: 'wspornik-przegub-rolka-q' }
