import { pl } from '../../solution-factories/core/source-task'
import type { UkladZbieznyTask } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'

export const G = 900
export const ALPHA = 20
export const BETA = 70
export const RAD_A = (ALPHA * Math.PI) / 180
export const RAD_B = (BETA * Math.PI) / 180
export const N1 = (G * Math.sin(RAD_B)) / (Math.cos(RAD_A) * Math.sin(RAD_B) + Math.sin(RAD_A) * Math.cos(RAD_B))
export const N2 = (N1 * Math.sin(RAD_A)) / Math.sin(RAD_B)
export const residualX = N1 * Math.sin(RAD_A) - N2 * Math.sin(RAD_B)
export const residualY = N1 * Math.cos(RAD_A) + N2 * Math.cos(RAD_B) - G

export const task = {
  id: 'tarcza-dwie-scianki',
  title: 'Lista 01, zadanie 2: tarcza między dwiema ściankami',
  duration: 9,
  given: ['G = 900 N', 'α = 20°', 'β = 70°', 'Tarcza jednorodna, styk gładki'],
  result: `N₁ = ${pl(N1)} N; N₂ = ${pl(N2)} N`,
} satisfies Omit<UkladZbieznyTask, 'scenes'>
