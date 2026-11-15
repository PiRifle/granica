import type { SolutionData } from '../../model'
import { StrainTensorAnimation } from './animation'
import { createStrainTensorSolution, STRAIN_TENSOR_TASK } from './factory'

export default {
  ...createStrainTensorSolution(STRAIN_TENSOR_TASK),
  animation: StrainTensorAnimation,
} satisfies SolutionData
