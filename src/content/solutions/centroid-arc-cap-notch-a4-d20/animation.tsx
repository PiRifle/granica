import type { SolutionAnimationProps } from '../../../types'
import { FigureOneCentroidAnimation } from '../../solution-factories/centroid'
import { centroidConfig } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-arc-cap-notch-a4-d20')

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <FigureOneCentroidAnimation config={config} {...props} />
}
