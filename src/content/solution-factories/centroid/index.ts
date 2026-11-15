import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { defineSourceSolution } from '../core/source-task'
import { centroidConfig, centroidTask, type CentroidConfig } from './configs'
import { figureOneScenes, figureTwoScenes } from './scenes'
import {
  chamferedNotchVariantScenes,
  deepNotchAltScenes,
  deepNotchScenes,
  semicircleSlotScenes,
  stripTriangleHoleAltScenes,
  stripTriangleHoleScenes,
  triangleRectangleSemicircleAltScenes,
  triangleRectangleSemicircleScenes,
} from './scenes-variants'

export * from './configs'
export { figureOneScenes, figureTwoScenes } from './scenes'
export { FigureOneCentroidAnimation, FigureTwoCentroidAnimation } from './animations'
export {
  FigureTwoVariantAnimation,
  FigureThreeAnimation,
  FigureThreeAltAnimation,
  FigureFourAnimation,
  FigureFiveAltAnimation,
  FigureFiveAnimation,
  FigureSixAnimation,
  FigureSixAltAnimation,
} from './animations-variants'

export function centroidScenes(config: CentroidConfig): SolutionScene[] {
  if (config.figure === 1) return figureOneScenes(config)
  if (config.figure === 2) {
    return config.variant === 1 ? figureTwoScenes(config) : chamferedNotchVariantScenes(config)
  }
  if (config.figure === 3) {
    return config.variant === 3 ? deepNotchAltScenes(config) : deepNotchScenes(config)
  }
  if (config.figure === 4) return semicircleSlotScenes(config)
  if (config.figure === 5) {
    return config.variant === 1 ? stripTriangleHoleAltScenes(config) : stripTriangleHoleScenes(config)
  }
  return config.variant === 3 ? triangleRectangleSemicircleAltScenes(config) : triangleRectangleSemicircleScenes(config)
}

export function centroidSolutionBase(id: string): Omit<SolutionData, 'animation'> {
  return defineSourceSolution(centroidTask(id))
}
