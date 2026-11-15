import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { defineSourceSolution } from '../../solution-factories/core/source-task'
import { scenes, task } from './task'

export default {
  ...defineSourceSolution({ ...task, scenes }),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
