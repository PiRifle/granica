import type { SteppedBarInputs } from '../../solution-factories/factory-axial-thermal/factory'

const STEEL = '#4f6df5'
const ALU = '#ff8a5c'
const BRONZE = '#c1862f'

export const inputs: SteppedBarInputs = {
  p: 3000,
  area: 50,
  segments: [
    { id: 'steel', label: 'stal', length: 0.5, color: STEEL, n: 12000, tagged: '+4P = 12 kN' },
    { id: 'alu', label: 'aluminium', length: 1.0, color: ALU, n: 12000, tagged: '+4P = 12 kN' },
    { id: 'bronze', label: 'brąz', length: 2.0, color: BRONZE, n: 9000, tagged: '+3P = 9 kN' },
  ],
  leftLoadLabel: '4P = 12 kN',
  midLoadLabel: 'P = 3 kN',
  reactionLabel: 'R = 3P = 9 kN',
}

export const meta = {
  id: 'pret-stal-aluminium-braz-naprezenia',
  title: 'Pręt stal–aluminium–brąz — naprężenia w segmentach',
  duration: 11,
  given: [
    'stal 0,5 m, aluminium 1,0 m, brąz 2,0 m (od lewej)',
    'utwierdzenie na prawym końcu, w odcinku brązowym',
    'siła 4P = 12 kN na lewym swobodnym końcu, w lewo',
    'siła P = 3 kN na styku aluminium–brąz, w prawo',
    'P = 3000 N, pole każdego odcinka A = 50 mm²',
  ],
  result:
    'N_st = N_al = +4P = 12 kN, N_br = +3P = 9 kN; σ_st = σ_al = 240 MPa, σ_br = 180 MPa (rozciąganie), a reakcja ściany wynosi 3P = 9 kN w prawo.',
}
