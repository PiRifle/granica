import type { SolutionAnimationProps } from '../../../types'
import { FigureTwoCentroidAnimation } from '../../solution-factories/centroid'
import { centroidConfig } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-circle-chamfer-notch-a5')

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <FigureTwoCentroidAnimation config={config} {...props} />
}
