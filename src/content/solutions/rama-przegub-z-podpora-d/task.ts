import {
  createReakcjeRamaTask,
  force,
  pin,
  point,
  vertical,
  type ReakcjeRamaConfig,
} from '../../solution-factories/factory-statyka-reakcje-rama/factory'

const config: ReakcjeRamaConfig = {
  nr: 7,
  p1: 11,
  p2: 7,
  moment: 20,
  q: 2,
  geometry:
    'A = (0;0), przegub C = (3;2), B = (6;0), D = (3;3) m. Reakcje B i D są pionowe. Czwartą niewiadomą wyznacza równanie momentu prawej części względem przegubu C.',
  givenGeometry: 'poziome 3 + 3 m; pionowe 2 m i 3 m; q na pionie 2 m; P₂ pod 60°',
  loads: [force(0, -11, point(0, 2)), force(-4, 0, point(3, 1)), force(3.5, 6.06218, point(3, 0))],
  couples: [-20],
  unknowns: [...pin(point(0, 0)), vertical(point(6, 0)), vertical(point(3, 3))],
  labels: ['A_x', 'A_y', 'B_y', 'D_y'],
  loadTex:
    'Q=2\\cdot2=4\\ \\mathrm{kN},\\qquad P_{2x}=7\\cos60^\\circ=3{,}5\\ \\mathrm{kN},\\quad P_{2y}=7\\sin60^\\circ=6{,}062\\ \\mathrm{kN}',
  resultantTex: 'P_1=(0;-11)\\ \\mathrm{kN},\\quad Q=(-4;0)\\ \\mathrm{kN},\\quad P_2=(3{,}5;6{,}062)\\ \\mathrm{kN}',
  momentTex: '\\sum M_C^{(P)}=3B_y-20=0\\quad\\Rightarrow\\quad B_y=6{,}667\\ \\mathrm{kN}',
  extraEquations: [{ type: 'M', at: point(3, 2), loadIndices: [], coupleIndices: [0], unknownIndices: [2, 3] }],
}

export { config }

const solved = createReakcjeRamaTask(config)
export const values = solved.values
export const residual = solved.residual
export const task = { ...solved.task, id: 'rama-przegub-z-podpora-d' }
