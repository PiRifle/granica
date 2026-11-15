import type { RestrainedThermalInputs } from '../../solution-factories/factory-axial-thermal/factory'

export const inputs: RestrainedThermalInputs = { e: 210000, alpha: 12e-6, deltaT: 30, a: 100 }

export const meta = {
  id: 'pret-termiczny-utwierdzony',
  title: 'Pręt między sztywnymi przegrodami — naprężenia termiczne',
  duration: 11,
  given: [
    'stalowy pręt o długości L₀ = 600 mm między dwiema sztywnymi ścianami',
    'przyrost temperatury ΔT = 100 K',
    'E = 200 GPa = 200 000 MPa',
    'α = 1,17·10⁻⁵ 1/K',
  ],
  result:
    'Swobodne wydłużenie termiczne wynosi ΔL_T = 0,702 mm. Przy pełnym utwierdzeniu długość się nie zmienia, więc powstaje naprężenie ściskające σ = −EαΔT = −234 MPa. Reakcja ścian to 234 N na każdy mm² przekroju.',
}
