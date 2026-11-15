import type { SolutionAnimationProps } from '../../../types'
import { FigureThreeAnimation } from '../../solution-factories/centroid'
import { centroidConfig } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-circle-deep-notch-a9-d50')

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <FigureThreeAnimation config={config} {...props} />
}
