import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { centroidConfig, centroidScenes, centroidSolutionBase } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-triangle-rectangle-semicircle-a15-d10')

export default {
  ...centroidSolutionBase('centroid-triangle-rectangle-semicircle-a15-d10'),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
  scenes: centroidScenes(config),
} satisfies SolutionData
