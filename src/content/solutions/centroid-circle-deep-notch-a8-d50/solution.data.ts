import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { centroidConfig, centroidScenes, centroidSolutionBase } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-circle-deep-notch-a8-d50')

export default {
  ...centroidSolutionBase('centroid-circle-deep-notch-a8-d50'),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
  scenes: centroidScenes(config),
} satisfies SolutionData
