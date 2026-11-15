import type { GoldenGateThermalInputs } from '../../solution-factories/factory-axial-thermal/factory'

export const inputs: GoldenGateThermalInputs = { length: 1280, deltaT: 22, alpha: 12e-6 }

export const meta = {
  id: 'most-golden-gate-termiczny',
  title: 'Golden Gate — zmiana długości od temperatury',
  duration: 10,
  given: [
    'długość przęsła w 0 °C: L = 1280 m',
    'stal: α = 1,17·10⁻⁵ 1/K',
    'wzrost temperatury: ΔT = 40 K',
    'wydłużenie swobodne, bez więzów',
  ],
  result:
    'Swobodne wydłużenie termiczne przęsła wynosi ΔL = αLΔT = 0,59904 m = 599,04 mm ≈ 599 mm. Ponieważ wydłużenie jest swobodne, w stali nie powstaje naprężenie: σ = 0.',
}
