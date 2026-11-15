import type { SolutionData } from '../../model'
import type { SolutionScene } from '../../../types'
import { createThreeSceneSolution, exampleThreeSceneMeta } from './factory'
import { ThreeSceneExampleAnimation } from './animation'

export default {
  ...createThreeSceneSolution(exampleThreeSceneMeta),
  animation: ThreeSceneExampleAnimation,
  scenes: [
    {
      title: 'Przykład',
      narration: 'Przykładowa scena fabryczna.',
      formula: '\\sum F=0',
      caption: 'Meta przykładowa.',
      visual: 'diagram',
      focus: { metric: 'model' },
    },
  ] satisfies SolutionScene[],
} satisfies SolutionData
