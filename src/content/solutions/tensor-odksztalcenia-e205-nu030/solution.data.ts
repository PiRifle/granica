import { lazy } from 'react'
import type { SolutionData } from '../../model'
import { createStrainTensorSolution, STRAIN_TENSOR_TASK } from '../../solution-factories/factory-hooke/factory'

export default {
  ...createStrainTensorSolution(STRAIN_TENSOR_TASK),
  animation: lazy(() => import('./animation').then((module) => ({ default: module.SolutionAnimation }))),
} satisfies SolutionData
