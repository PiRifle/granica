import {
  createReakcjeRamaTask,
  force,
  pin,
  point,
  vertical,
  type ReakcjeRamaConfig,
} from '../../solution-factories/factory-statyka-reakcje-rama/factory'

const config: ReakcjeRamaConfig = {
  nr: 8,
  p1: 12,
  p2: 6,
  moment: 15,
  q: 2.2,
  geometry:
    'A = (0;0), C = (3;2), B = (5,5;0) m. q obciąża 4,5 m górnego pasa, P₁ działa w lewo na wysokości 2 m, a P₂ w prawo–w dół pod 30°.',
  givenGeometry: 'A–C: 3 m; q na 2,5 + 2 m; P₁ 2 m nad B; P₂ pod 30°',
  loads: [force(0, -9.9, point(5.25, 4)), force(-12, 0, point(5.5, 2)), force(5.19615, -3, point(7.5, 4))],
  couples: [-15],
  unknowns: [...pin(point(0, 0)), vertical(point(5.5, 0))],
  labels: ['A_x', 'A_y', 'B_y'],
  loadTex:
    'Q=2{,}2\\cdot4{,}5=9{,}9\\ \\mathrm{kN},\\qquad P_{2x}=6\\cos30^\\circ=5{,}196\\ \\mathrm{kN},\\quad P_{2y}=-3\\ \\mathrm{kN}',
  resultantTex:
    'Q=9{,}9\\ \\mathrm{kN}\\ \\text{w }x=5{,}25\\ \\mathrm{m},\\quad P_1=(-12;0)\\ \\mathrm{kN},\\quad P_2=(5{,}196;-3)\\ \\mathrm{kN}',
  momentTex: '\\sum M_A=5{,}5B_y-5{,}25\\cdot9{,}9+2\\cdot12+7{,}5(-3)-4\\cdot5{,}19615-15=0',
}

export { config }

const solved = createReakcjeRamaTask(config)
export const values = solved.values
export const residual = solved.residual
export const task = { ...solved.task, id: 'rama-ukosny-pas-4-5' }
