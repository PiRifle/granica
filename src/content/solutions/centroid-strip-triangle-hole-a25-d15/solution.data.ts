import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { centroidConfig, centroidScenes, centroidSolutionBase } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-strip-triangle-hole-a25-d15')

export default {
  ...centroidSolutionBase('centroid-strip-triangle-hole-a25-d15'),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
  scenes: centroidScenes(config),
} satisfies SolutionData
