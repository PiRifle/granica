import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import type { ThreeCamera, ThreeLabel, ThreePrimitive } from '../../../components/solution-figures/ThreeSolutionScene'

export interface ThreeSceneBadgeSpec {
  fromIndex: number
  title?: string
  value: string
  note?: string
  x: number
  y: number
  width: number
  color?: string
}

export interface ThreeSceneSpec {
  label: string
  camera: ThreeCamera
  primitives: ThreePrimitive[]
  labels: ThreeLabel[]
  status: string[]
  badges?: ThreeSceneBadgeSpec[]
}

export interface ThreeSceneMeta {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
}

export function createThreeSceneSolution(meta: ThreeSceneMeta): Omit<SolutionData, 'animation' | 'scenes'> {
  const data = meta
  return data
}

export function threeScene(
  title: string,
  narration: string,
  formula: string,
  caption: string,
  metric: string,
  emphasis?: string,
): SolutionScene {
  return { title, narration, formula, caption, visual: 'diagram', focus: { metric }, emphasis }
}

export const exampleThreeSceneMeta: ThreeSceneMeta = {
  id: 'example-three-scene',
  title: 'Przykład fabryczny: prosty pręt z podporą i siłą',
  duration: 9,
  given: ['P = 4 kN', 'L = 1 m'],
  result: 'R_A = 4 kN',
}

export const exampleThreeSceneSpec: ThreeSceneSpec = {
  label: 'Przykładowy pręt z podporą i siłą',
  camera: { position: [1.2, -1.6, 1.0], target: [0, 0.3, 0], viewSize: 1.3 },
  primitives: [],
  labels: [],
  status: ['Przykładowa scena fabryczna', 'Kontrola'],
  badges: [{ fromIndex: 1, value: 'ΣF = 0', note: 'przykład', x: 292, y: 248, width: 152 }],
}
