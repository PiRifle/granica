import { pl } from '../../solution-factories/core/source-task'
import type { UkladZbieznyTask } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'

export const G = 600
export const L = 2
export const ALPHA = 30
export const RAD = (ALPHA * Math.PI) / 180
export const N = (G * Math.tan(RAD)) / 2
export const AX = N
export const AY = G
export const momentCheck = -L * Math.sin(RAD) * AY + L * Math.cos(RAD) * AX + G * (L / 2) * Math.sin(RAD)

export const task = {
  id: 'pret-oparty-o-sciane',
  title: 'Lista 01, zadanie 1: pręt oparty o ścianę',
  duration: 9,
  given: [
    'G = 600 N',
    'L = 2 m',
    'α = 30° — kąt pręta do ściany',
    'Podpora przegubowa na dolnym końcu; gładka ściana na górnym',
  ],
  result: `N = ${pl(N)} N; A_x = ${pl(AX)} N; A_y = ${pl(AY)} N`,
} satisfies Omit<UkladZbieznyTask, 'scenes'>
