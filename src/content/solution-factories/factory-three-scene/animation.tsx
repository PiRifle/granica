import type { ComponentType } from 'react'
import { ThreeSolutionScene } from '../../../components/solution-figures/ThreeSolutionScene'
import type { SolutionAnimationProps } from '../../../types'
import { ThreeBadge, ThreeStatus } from '../../../components/solution-figures/three-statics'
import { exampleThreeSceneSpec, type ThreeSceneSpec } from './factory'

export function createThreeSceneAnimation(spec: ThreeSceneSpec): ComponentType<SolutionAnimationProps> {
  return function ThreeSceneAnimation({ index, ...props }: SolutionAnimationProps) {
    return (
      <ThreeSolutionScene
        {...props}
        index={index}
        label={spec.label}
        primitives={spec.primitives}
        labels={spec.labels}
        camera={spec.camera}
      >
        {spec.badges
          ?.filter((badge) => index >= badge.fromIndex)
          .map((badge) => (
            <ThreeBadge
              key={`${badge.value}-${badge.x}`}
              title={badge.title}
              value={badge.value}
              note={badge.note}
              x={badge.x}
              y={badge.y}
              width={badge.width}
              color={badge.color}
            />
          ))}
        <ThreeStatus>{spec.status[Math.min(index, spec.status.length - 1)]}</ThreeStatus>
      </ThreeSolutionScene>
    )
  }
}

export const ThreeSceneExampleAnimation = createThreeSceneAnimation(exampleThreeSceneSpec)
