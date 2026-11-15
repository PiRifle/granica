import type { SolutionAnimationProps } from '../../../types'
import { StrainTensorAnimation } from '../../solution-factories/factory-hooke/animation'

export function SolutionAnimation(props: SolutionAnimationProps) {
  return <StrainTensorAnimation {...props} />
}
