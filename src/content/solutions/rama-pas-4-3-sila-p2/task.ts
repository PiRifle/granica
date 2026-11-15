import {
  createReakcjeRamaTask,
  force,
  pin,
  point,
  vertical,
  type ReakcjeRamaConfig,
} from '../../solution-factories/factory-statyka-reakcje-rama/factory'

const config: ReakcjeRamaConfig = {
  nr: 2,
  p1: 6,
  p2: 10,
  moment: 22,
  q: 1,
  geometry:
    'A = (0;0), B = (8;0) m. P₁ przyłożono w (4;1,5) prostopadle do pasa 4:3, P₂ działa w lewo na wysokości 1,5 m, a q obciąża górny odcinek 2 m.',
  givenGeometry: 'rozstaw 2 + 2 + 2 + 2 m; wysokość 3 m; q na 2 m; P₂ w połowie pionu 3 m',
  loads: [force(3.6, -4.8, point(4, 1.5)), force(0, -2, point(7, 3)), force(-10, 0, point(8, 1.5))],
  couples: [-22],
  unknowns: [...pin(point(0, 0)), vertical(point(8, 0))],
  labels: ['A_x', 'A_y', 'B_y'],
  loadTex:
    'P_{1x}=6\\cdot\\frac35=3{,}6\\ \\mathrm{kN},\\quad P_{1y}=-6\\cdot\\frac45=-4{,}8\\ \\mathrm{kN},\\qquad Q=q\\cdot2=2\\ \\mathrm{kN}',
  resultantTex:
    'P_1=(3{,}6;-4{,}8)\\ \\mathrm{kN},\\quad Q=2\\ \\mathrm{kN}\\ \\text{w }x=7\\ \\mathrm{m},\\quad P_2=(-10;0)\\ \\mathrm{kN}',
  momentTex: '\\sum M_A=8B_y+4(-4{,}8)-1{,}5\\cdot3{,}6-7\\cdot2+1{,}5\\cdot10-22=0',
}

export { config }

const solved = createReakcjeRamaTask(config)
export const values = solved.values
export const residual = solved.residual
export const task = { ...solved.task, id: 'rama-pas-4-3-sila-p2' }
