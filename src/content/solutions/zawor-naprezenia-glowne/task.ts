import type {
  PrincipalStressInputs,
  PrincipalStressTask,
} from '../../solution-factories/factory-principal-stress/factory'

export const inputs: PrincipalStressInputs = { sigmaX: 130, sigmaY: 150, tauXY: 70, kg: 200 }

export const meta = {
  id: 'zawor-naprezenia-glowne',
  title: 'Korpus zaworu DN50 — maksymalne naprężenie główne',
  duration: 12,
  given: [
    'tensor naprężeń w punkcie najbardziej wytężonym [MPa]: σx = 130, σy = 150, τxy = 70',
    'pozostałe składniki: σz = 0, τyz = τzx = 0',
    'naprężenie dopuszczalne k_g = 200 MPa',
  ],
  result:
    'σ_śr = 140 MPa, R = 70,71 MPa, σ1 = 210,71 MPa, σ2 = 69,29 MPa, σ3 = 0. Ponieważ σ1 = 210,7 MPa > 200 MPa, warunek wytrzymałości nie jest spełniony — przekroczenie wynosi 5,36%.',
}
