import type { SolutionData } from '../../model'
import { createShaftThreeSolution, exampleShaftThreeTask } from './factory'
import { ShaftThreeExampleAnimation } from './animation'

export default {
  ...createShaftThreeSolution(exampleShaftThreeTask),
  scenes: exampleShaftThreeTask.scenes,
  animation: ShaftThreeExampleAnimation,
} satisfies SolutionData
