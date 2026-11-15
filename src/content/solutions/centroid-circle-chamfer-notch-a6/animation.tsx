import type { SolutionAnimationProps } from '../../../types'
import { FigureTwoVariantAnimation } from '../../solution-factories/centroid'
import { centroidConfig } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-circle-chamfer-notch-a6')

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <FigureTwoVariantAnimation config={config} {...props} />
}
