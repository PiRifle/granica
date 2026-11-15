import type { SolutionAnimationProps } from '../../../types'
import { FigureFiveAltAnimation } from '../../solution-factories/centroid'
import { centroidConfig } from '../../solution-factories/centroid'

const config = centroidConfig('centroid-strip-triangle-hole-a10-d10')

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <FigureFiveAltAnimation config={config} {...props} />
}
