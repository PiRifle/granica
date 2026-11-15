import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { centroidConfig, centroidScenes, centroidSolutionBase } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-arc-cap-notch-a4-d20')

export default {
  ...centroidSolutionBase('centroid-arc-cap-notch-a4-d20'),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
  scenes: centroidScenes(config),
} satisfies SolutionData
