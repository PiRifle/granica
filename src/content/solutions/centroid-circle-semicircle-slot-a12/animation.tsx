import type { SolutionAnimationProps } from '../../../types'
import { FigureFourAnimation } from '../../solution-factories/centroid'
import { centroidConfig } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-circle-semicircle-slot-a12')

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <FigureFourAnimation config={config} {...props} />
}
