import type { SolutionAnimationProps } from '../../../types'
import { FigureFiveAnimation } from '../../solution-factories/centroid'
import { centroidConfig } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-strip-triangle-hole-a25-d15')

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <FigureFiveAnimation config={config} {...props} />
}
