import {
  createReakcjeRamaTask,
  force,
  pin,
  point,
  vertical,
  type ReakcjeRamaConfig,
} from '../../solution-factories/factory-statyka-reakcje-rama/factory'

const config: ReakcjeRamaConfig = {
  nr: 10,
  p1: 14,
  moment: 12,
  q: 2.6,
  geometry:
    'Utwierdzenie A = (0;0), przegub C = (2;3), rolka B = (5;0) m. q działa w prawo na pionie 3 m, P₁ jest prostopadła do CB i skierowana w dół–w lewo. Czwarte równanie to moment prawej części względem C.',
  givenGeometry: 'poziome 2 + 1,5 + 1,5 m; wysokość 3 m; P₁ ⊥ CB',
  loads: [force(7.8, 0, point(0, 1.5)), force(-14 / Math.SQRT2, -14 / Math.SQRT2, point(3.5, 1.5))],
  couples: [-12],
  unknowns: [...pin(point(0, 0)), { kind: 'couple' }, vertical(point(5, 0))],
  labels: ['A_x', 'A_y', 'M_A', 'B_y'],
  loadTex: 'Q=2{,}6\\cdot3=7{,}8\\ \\mathrm{kN},\\qquad P_{1x}=P_{1y}=-14/\\sqrt2=-9{,}899\\ \\mathrm{kN}',
  resultantTex:
    'Q=7{,}8\\ \\mathrm{kN}\\ \\text{w }(0;1{,}5),\\qquad P_1=(-9{,}899;-9{,}899)\\ \\mathrm{kN}\\ \\text{w }(3{,}5;1{,}5)',
  momentTex:
    '\\sum M_C^{(P)}=3B_y+1{,}5(-9{,}89949)-(-1{,}5)(-9{,}89949)=0\\quad\\Rightarrow\\quad B_y=9{,}899\\ \\mathrm{kN}',
  extraEquations: [{ type: 'M', at: point(2, 3), loadIndices: [1], coupleIndices: [], unknownIndices: [3] }],
}

export { config }

const solved = createReakcjeRamaTask(config)
export const values = solved.values
export const residual = solved.residual
export const task = { ...solved.task, id: 'rama-utwierdzona-przegub' }
