import {
  createReakcjeRamaTask,
  force,
  pin,
  point,
  type ReakcjeRamaConfig,
} from '../../solution-factories/factory-statyka-reakcje-rama/factory'

const config: ReakcjeRamaConfig = {
  nr: 6,
  p1: 10,
  p2: 8,
  moment: 25,
  q: 1.8,
  geometry:
    'A = (2;0), B = (7;2) m. q obciąża lewy odcinek 2 m, P₁ działa przy C w dół–w lewo pod 45°, P₂ pionowo w x = 5 m, a reakcja B jest prostopadła do podłoża 45°.',
  givenGeometry: 'wymiary 2 + 2 + 1 + 2 m; wysokość 2 m; podpora B pod 45°',
  loads: [force(0, -3.6, point(1, 2)), force(-7.07107, -7.07107, point(4, 2)), force(0, -8, point(5, 2))],
  couples: [-25],
  unknowns: [...pin(point(2, 0)), { kind: 'force', at: point(7, 2), direction: point(-Math.SQRT1_2, Math.SQRT1_2) }],
  labels: ['A_x', 'A_y', 'B'],
  loadTex: 'Q=1{,}8\\cdot2=3{,}6\\ \\mathrm{kN},\\qquad P_{1x}=P_{1y}=-10/\\sqrt2=-7{,}071\\ \\mathrm{kN}',
  resultantTex: 'Q=3{,}6\\ \\mathrm{kN},\\quad P_1=(-7{,}071;-7{,}071)\\ \\mathrm{kN},\\quad P_2=(0;-8)\\ \\mathrm{kN}',
  momentTex:
    '\\sum M_A=5\\frac{B}{\\sqrt2}+2\\frac{B}{\\sqrt2}-2\\cdot3{,}6-2(-7{,}07107)-2\\cdot7{,}07107-3\\cdot8-25=0',
}

export { config }

const solved = createReakcjeRamaTask(config)
export const values = solved.values
export const residual = solved.residual
export const task = { ...solved.task, id: 'rama-podpora-pod-45' }
