import type { SteppedMaxLoadInputs } from '../../solution-factories/factory-axial-thermal/factory'

const STEEL = '#4f6df5'
const ALU = '#ff8a5c'
const BRONZE = '#2f7d5b'

export const inputs: SteppedMaxLoadInputs = {
  segments: [
    {
      id: 'st',
      label: 'stal',
      length: 2.5,
      area: 500,
      color: STEEL,
      nLabel: '−5P',
      magnitude: 5,
      sigmaDop: 140,
      limit: 14,
      ratioDigits: 1,
    },
    {
      id: 'al',
      label: 'aluminium',
      length: 2.0,
      area: 400,
      color: ALU,
      nLabel: '−P',
      magnitude: 1,
      sigmaDop: 90,
      limit: 36,
      ratioDigits: 1,
    },
    {
      id: 'br',
      label: 'brąz',
      length: 1.5,
      area: 200,
      color: BRONZE,
      nLabel: '−2P',
      magnitude: 2,
      sigmaDop: 100,
      limit: 10,
      ratioDigits: 1,
    },
  ],
  loadLabels: ['4P', 'P', '2P'],
  reactionLabel: 'R = 5P',
  reactionLine: 'R = 5P — reakcja działa w prawo',
  directionsNote: '4P i 2P działają w lewo, P w prawo',
}

export const meta = {
  id: 'pret-stopniowy-maksymalna-sila',
  title: 'Pręt stal–aluminium–brąz — maksymalna siła P',
  duration: 12,
  given: [
    'utwierdzenie na lewym końcu; odcinki: stal 2,5 m, aluminium 2,0 m, brąz 1,5 m',
    'pola przekrojów: stal 500 mm², aluminium 400 mm², brąz 200 mm²',
    'siła 4P w lewo na styku stal–aluminium, P w prawo na styku aluminium–brąz, 2P w lewo na prawym końcu',
    'naprężenia dopuszczalne: stal 140 MPa, aluminium 90 MPa, brąz 100 MPa',
  ],
  result:
    'Siły osiowe wynoszą N_st = −5P, N_al = −P, N_br = −2P. Najmniejszą granicę daje brąz: 2P/200 ≤ 100 MPa, więc P_max = 10 000 N = 10 kN. Przy tej sile σ_st = 100 MPa, σ_al = 25 MPa, σ_br = 100 MPa.',
}
