import {
  createReakcjeRamaTask,
  force,
  pin,
  point,
  vertical,
  type ReakcjeRamaConfig,
} from '../../solution-factories/factory-statyka-reakcje-rama/factory'

const config: ReakcjeRamaConfig = {
  nr: 3,
  p1: 7,
  p2: 9,
  moment: 20,
  q: 1.2,
  geometry:
    'A = (0;0), B = (5;0), C = (5;3) m. Obciążenie q działa w prawo na pionie 3 m, P₁ w dół w x = 1 m, a P₂ w dół–w lewo pod 60° do poziomu.',
  givenGeometry: 'rama 5 × 3 m; P₁ w x = 1 m; P₂ przy C pod 60°',
  loads: [force(3.6, 0, point(0, 1.5)), force(0, -7, point(1, 3)), force(-4.5, -7.79423, point(5, 3))],
  couples: [-20],
  unknowns: [...pin(point(0, 0)), vertical(point(5, 0))],
  labels: ['A_x', 'A_y', 'B_y'],
  loadTex:
    'Q=1{,}2\\cdot3=3{,}6\\ \\mathrm{kN},\\qquad P_{2x}=-9\\cos60^\\circ=-4{,}5\\ \\mathrm{kN},\\quad P_{2y}=-9\\sin60^\\circ=-7{,}794\\ \\mathrm{kN}',
  resultantTex:
    'Q=3{,}6\\ \\mathrm{kN}\\ \\text{w }(0;1{,}5),\\quad P_1=(0;-7)\\ \\mathrm{kN},\\quad P_2=(-4{,}5;-7{,}794)\\ \\mathrm{kN}',
  momentTex: '\\sum M_A=5B_y-3{,}6\\cdot1{,}5-7\\cdot1+5(-7{,}79423)-3(-4{,}5)-20=0',
}

export { config }

const solved = createReakcjeRamaTask(config)
export const values = solved.values
export const residual = solved.residual
export const task = { ...solved.task, id: 'rama-prostokatna-5-3' }
