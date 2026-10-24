import type { SolutionFigure, SolutionScene } from '../types'
import { type Focus } from './solution-figures/focus'
import { AxialView } from './solution-figures/AxialView'
import { BeamView } from './solution-figures/BeamView'
import { CubeView } from './solution-figures/CubeView'
import { RosetteView } from './solution-figures/RosetteView'
import { SectionView } from './solution-figures/SectionView'

export { inferFocus, resolveFocus, type Focus } from './solution-figures/focus'

export function SolutionFigureView({
  figure,
  scene,
  focus,
  animationKey,
  progress = 1,
  revealedFocus,
  sceneIndex = 0,
  revealedMath = '',
  heightFloor = 0,
  onRequestHeight,
}: {
  figure: SolutionFigure
  scene: SolutionScene
  focus?: Focus
  animationKey?: string
  progress?: number
  revealedFocus?: string[]
  sceneIndex?: number
  revealedMath?: string
  heightFloor?: number
  onRequestHeight?: (height: number) => void
}) {
  switch (figure.kind) {
    case 'axial':
      return (
        <AxialView
          figure={figure}
          scene={scene}
          focus={focus}
          animationKey={animationKey}
          progress={progress}
          revealedFocus={revealedFocus}
          sceneIndex={sceneIndex}
          revealedMath={revealedMath}
        />
      )
    case 'beam':
      return (
        <BeamView
          figure={figure}
          scene={scene}
          focus={focus}
          animationKey={animationKey}
          progress={progress}
          revealedFocus={revealedFocus}
          sceneIndex={sceneIndex}
          revealedMath={revealedMath}
          heightFloor={heightFloor}
          onRequestHeight={onRequestHeight}
        />
      )
    case 'section':
      return (
        <SectionView
          figure={figure}
          scene={scene}
          focus={focus}
          animationKey={animationKey}
          progress={progress}
          revealedFocus={revealedFocus}
          sceneIndex={sceneIndex}
          revealedMath={revealedMath}
        />
      )
    case 'cube':
      return (
        <CubeView
          figure={figure}
          scene={scene}
          focus={focus}
          animationKey={animationKey}
          progress={progress}
          revealedFocus={revealedFocus}
          sceneIndex={sceneIndex}
          revealedMath={revealedMath}
        />
      )
    case 'rosette':
      return (
        <RosetteView
          figure={figure}
          scene={scene}
          focus={focus}
          animationKey={animationKey}
          progress={progress}
          revealedFocus={revealedFocus}
          sceneIndex={sceneIndex}
          revealedMath={revealedMath}
        />
      )
    default:
      return null
  }
}
