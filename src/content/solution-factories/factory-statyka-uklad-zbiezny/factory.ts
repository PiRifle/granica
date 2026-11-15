import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'

export interface UkladZbieznyTask {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
  scenes: SolutionScene[]
}

export function createUkladZbieznySolution(task: UkladZbieznyTask): Omit<SolutionData, 'animation'> {
  const { id, title, duration, given, result, scenes } = task
  return { id, title, duration, given, result, scenes }
}
