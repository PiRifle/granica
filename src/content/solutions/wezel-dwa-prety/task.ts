import { pl } from '../../solution-factories/core/source-task'
import type { UkladZbieznyTask } from '../../solution-factories/factory-statyka-uklad-zbiezny/factory'

export const P1 = 12
export const P2 = 6
export const ALPHA = 75
export const BETA = 60

export const D1 = { x: -Math.sin((ALPHA * Math.PI) / 180), y: Math.cos((ALPHA * Math.PI) / 180) }
export const D2 = { x: -Math.sin((BETA * Math.PI) / 180), y: -Math.cos((BETA * Math.PI) / 180) }
export const DET = D1.x * D2.y - D1.y * D2.x
export const S1 = (-P2 * D2.y - P1 * D2.x) / DET
export const S2 = (D1.x * P1 + P2 * D1.y) / DET
export const RX = S1 * D1.x + S2 * D2.x + P2
export const RY = S1 * D1.y + S2 * D2.y - P1

export const task = {
  id: 'wezel-dwa-prety',
  title: 'Lista 01, zadanie 7: dwa pręty i węzeł',
  duration: 9,
  given: ['P₁ = 12 kN', 'P₂ = 6 kN', 'α = 75°', 'β = 60°', 'Pręty nieważkie, przeguby idealne'],
  result: `S₁ = ${pl(S1)} kN; S₂ = ${pl(S2)} kN`,
} satisfies Omit<UkladZbieznyTask, 'scenes'>
