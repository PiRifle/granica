import { pl } from '../../solution-factories/core/source-task'
import type { UkladZbieznyTask } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'

export const G = 100
export const ALPHA = 30
export const RAD = (ALPHA * Math.PI) / 180
export const T = G * Math.sin(RAD)
export const N = G * Math.cos(RAD)
export const residualX = T * Math.cos(RAD) - N * Math.sin(RAD)
export const residualY = T * Math.sin(RAD) + N * Math.cos(RAD) - G

export const task = {
  id: 'walec-na-rowni-linka',
  title: 'Lista 01, zadanie 3: walec na równi z linką',
  duration: 9,
  given: ['G = 100 N', 'α = 30°', 'Równia gładka, linka równoległa do równi'],
  result: `N = ${pl(N)} N; T = ${pl(T)} N`,
} satisfies Omit<UkladZbieznyTask, 'scenes'>
