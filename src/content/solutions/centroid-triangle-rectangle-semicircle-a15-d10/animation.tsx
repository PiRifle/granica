import type { SolutionAnimationProps } from '../../../types'
import { FigureSixAltAnimation } from '../../solution-factories/centroid'
import { centroidConfig } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-triangle-rectangle-semicircle-a15-d10')

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <FigureSixAltAnimation config={config} {...props} />
}
