import {
  createReakcjeRamaTask,
  force,
  pin,
  point,
  vertical,
  type ReakcjeRamaConfig,
} from '../../solution-factories/factory-statyka-reakcje-rama/factory'

const config: ReakcjeRamaConfig = {
  nr: 9,
  p1: 13,
  moment: 10,
  q: 2.4,
  geometry:
    'A = (0;0), B = (5;0) m. q obciąża lewy pas o długości 3 m, P₁ działa przy wolnym końcu x = 7 m w dół–w lewo pod 45°, a moment przy B jest zgodny ze wskazówkami zegara.',
  givenGeometry: 'q na 3 m; A–B: 3 + 2 m; wspornik 2 m; wysokość 2,5 m',
  loads: [force(0, -7.2, point(1.5, 2.5)), force(-9.19239, -9.19239, point(7, 2.5))],
  couples: [-10],
  unknowns: [...pin(point(0, 0)), vertical(point(5, 0))],
  labels: ['A_x', 'A_y', 'B_y'],
  loadTex: 'Q=2{,}4\\cdot3=7{,}2\\ \\mathrm{kN},\\qquad P_{1x}=P_{1y}=-13/\\sqrt2=-9{,}192\\ \\mathrm{kN}',
  resultantTex:
    'Q=7{,}2\\ \\mathrm{kN}\\ \\text{w }(1{,}5;2{,}5),\\qquad P_1=(-9{,}192;-9{,}192)\\ \\mathrm{kN}\\ \\text{w }(7;2{,}5)',
  momentTex: '\\sum M_A=5B_y-1{,}5\\cdot7{,}2+7(-9{,}19239)-2{,}5(-9{,}19239)-10=0',
}

export { config }

const solved = createReakcjeRamaTask(config)
export const values = solved.values
export const residual = solved.residual
export const task = { ...solved.task, id: 'rama-wspornik-sila-45' }
