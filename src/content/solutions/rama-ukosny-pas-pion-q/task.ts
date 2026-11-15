import {
  createReakcjeRamaTask,
  force,
  pin,
  point,
  vertical,
  type ReakcjeRamaConfig,
} from '../../solution-factories/factory-statyka-reakcje-rama/factory'

const config: ReakcjeRamaConfig = {
  nr: 4,
  p1: 8,
  moment: 18,
  q: 1.4,
  geometry:
    'A = (0;0), B = (6;0) m. P₁ działa w dół w x = 1 m, q w lewo na prawym pionie o wysokości 3 m, a moment przy górnym końcu pasa jest zgodny ze wskazówkami zegara.',
  givenGeometry: 'wymiary poziome 1 + 1 + 4 m; wysokość pionu z q: 3 m',
  loads: [force(0, -8, point(1, 0)), force(-4.2, 0, point(6, 1.5))],
  couples: [-18],
  unknowns: [...pin(point(0, 0)), vertical(point(6, 0))],
  labels: ['A_x', 'A_y', 'B_y'],
  loadTex: 'Q=q\\cdot3=1{,}4\\cdot3=4{,}2\\ \\mathrm{kN}\\ \\text{w lewo},\\qquad P_{1y}=-8\\ \\mathrm{kN}',
  resultantTex:
    'Q=(-4{,}2;0)\\ \\mathrm{kN}\\ \\text{w }(6;1{,}5),\\qquad P_1=(0;-8)\\ \\mathrm{kN}\\ \\text{w }x=1\\ \\mathrm{m}',
  momentTex: '\\sum M_A=6B_y-8\\cdot1+1{,}5\\cdot4{,}2-18=0',
}

export { config }

const solved = createReakcjeRamaTask(config)
export const values = solved.values
export const residual = solved.residual
export const task = { ...solved.task, id: 'rama-ukosny-pas-pion-q' }
