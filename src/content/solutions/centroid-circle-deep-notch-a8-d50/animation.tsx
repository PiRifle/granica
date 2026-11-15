import type { SolutionAnimationProps } from '../../../types'
import { FigureThreeAltAnimation } from '../../solution-factories/centroid'
import { centroidConfig } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-circle-deep-notch-a8-d50')

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <FigureThreeAltAnimation config={config} {...props} />
}
