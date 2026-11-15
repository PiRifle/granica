import { pl } from '../../solution-factories/core/source-task'
import type { UkladZbieznyTask } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'

export const L = 2
export const P = 48
export const H = L / 2
export const S = -2 * P
export const AX = -S
export const AY = P

export const task = {
  id: 'plyta-trojkatna-z-pretem',
  title: 'Lista 01, zadanie 6: trójkątna płyta z prętem',
  duration: 9,
  given: ['P = 48 kN', 'L = 2 m', 'Płyta nieważka', 'Przegub w lewym dolnym węźle, poziomy pręt w lewym górnym węźle'],
  result: `S = ${pl(S)} kN; A_x = ${pl(AX)} kN; A_y = ${pl(AY)} kN`,
} satisfies Omit<UkladZbieznyTask, 'scenes'>
