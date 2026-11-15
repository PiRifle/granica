import {
  createReakcjeRamaTask,
  force,
  pin,
  point,
  vertical,
  type ReakcjeRamaConfig,
} from '../../solution-factories/factory-statyka-reakcje-rama/factory'

const config: ReakcjeRamaConfig = {
  nr: 1,
  p1: 5,
  moment: 24,
  q: 0.8,
  geometry:
    'A = (0;0), B = (6;0) m. Obciążenie q działa poziomo na wysokości 3,5 m, a P₁ jest prostopadła do pochyłego pasa i skierowana w dół–w lewo. Moment przy C jest zgodny ze wskazówkami zegara.',
  givenGeometry: 'wysokość 3,5 m i 2 m; wymiary poziome 4 + 1 + 1 m; P₁ ⊥ pas',
  loads: [force(2.8, 0, point(0, 1.75)), force(-1.37113, -4.57036, point(5, 2.25))],
  couples: [-24],
  unknowns: [...pin(point(0, 0)), vertical(point(6, 0))],
  labels: ['A_x', 'A_y', 'B_y'],
  loadTex:
    'Q=q\\cdot3{,}5=2{,}8\\ \\mathrm{kN},\\quad P_{1x}=-5\\frac{1{,}5}{\\sqrt{5^2+1{,}5^2}}=-1{,}371\\ \\mathrm{kN},\\quad P_{1y}=-5\\frac{5}{\\sqrt{5^2+1{,}5^2}}=-4{,}570\\ \\mathrm{kN}',
  resultantTex:
    'Q=2{,}8\\ \\mathrm{kN}\\ \\text{w }(0;1{,}75),\\qquad P_1=(-1{,}371;-4{,}570)\\ \\mathrm{kN}\\ \\text{w }(5;2{,}25)',
  momentTex: '\\sum M_A=6B_y-2{,}8\\cdot1{,}75+5(-4{,}57036)-2{,}25(-1{,}37113)-24=0',
}

export { config }

const solved = createReakcjeRamaTask(config)
export const values = solved.values
export const residual = solved.residual
export const task = { ...solved.task, id: 'rama-pion-q-pas-ukosny' }
