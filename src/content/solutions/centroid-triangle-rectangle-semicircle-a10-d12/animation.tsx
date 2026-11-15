import type { SolutionAnimationProps } from '../../../types'
import { FigureSixAnimation } from '../../solution-factories/centroid'
import { centroidConfig } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-triangle-rectangle-semicircle-a10-d12')

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <FigureSixAnimation config={config} {...props} />
}
