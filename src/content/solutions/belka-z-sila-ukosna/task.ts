import { pl } from '../../solution-factories/core/source-task'
import type { UkladZbieznyTask } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'

export const P = 20
export const L = 4
export const ALPHA = 60
export const COS = Math.cos((ALPHA * Math.PI) / 180)
export const SIN = Math.sin((ALPHA * Math.PI) / 180)
export const AX = -P * COS
export const BY = (P * SIN) / 2
export const AY = BY

export const task = {
  id: 'belka-z-sila-ukosna',
  title: 'Lista 01, zadanie 4: belka z siłą ukośną',
  duration: 9,
  given: ['P = 20 kN', 'L = 4 m', 'α = 60° — kąt P do belki', 'Przegub w A, podpora przesuwna w B'],
  result: `A_x = ${pl(AX)} kN; A_y = ${pl(AY)} kN; B_y = ${pl(BY)} kN`,
} satisfies Omit<UkladZbieznyTask, 'scenes'>
