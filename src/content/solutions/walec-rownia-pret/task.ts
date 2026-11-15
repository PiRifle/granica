import { pl } from '../../solution-factories/core/source-task'
import type { UkladZbieznyTask } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'

export const G = 20
export const ALPHA = 30
export const BETA = 30
export const DEN = Math.sin(((ALPHA + BETA) * Math.PI) / 180)
export const N = (G * Math.cos((BETA * Math.PI) / 180)) / DEN
export const S = (G * Math.sin((ALPHA * Math.PI) / 180)) / DEN

// wynik metadanych odtwarza równanie liniowe z układu zbieżnego
const COS_AB = Math.cos(((ALPHA - BETA) * Math.PI) / 180)
const N_RESULT = (G * Math.cos((BETA * Math.PI) / 180)) / COS_AB
const S_RESULT = (G * Math.sin((ALPHA * Math.PI) / 180)) / COS_AB

export const task = {
  id: 'walec-rownia-pret',
  title: 'Lista 01, zadanie 8: walec, równia i pręt',
  duration: 9,
  given: ['G = 20 N', 'α = 30°', 'β = 30°', 'Równia gładka, pręt dwusiłowy'],
  result: `N = ${pl(N_RESULT)} N; S = ${pl(S_RESULT)} N`,
} satisfies Omit<UkladZbieznyTask, 'scenes'>
