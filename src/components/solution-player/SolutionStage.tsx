import { Suspense, type RefObject } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { CourseSolution, SolutionScene } from '../../types'
import type { Focus } from '../solution-figures/focus'
import { SolutionFigureView } from '../SolutionFigure'
import { MathTransform } from '../solution-figures/MathTransform'
import { SceneVisual } from '../solution-figures/SceneVisual'
import { local } from './local'

export function SolutionStage({
  solution,
  scene,
  index,
  stepIndex,
  playing,
  stepProgress,
  sceneProgress,
  figureFocus,
  revealedFocus,
  revealedMath,
  heightFloor,
  requestHeight,
  stageRef,
  stageFloor,
}: {
  solution: CourseSolution
  scene: SolutionScene
  index: number
  stepIndex: number
  playing: boolean
  stepProgress: number
  sceneProgress: number
  figureFocus?: Focus
  revealedFocus: string[]
  revealedMath: string
  heightFloor: number
  requestHeight: (height: number) => void
  stageRef: RefObject<HTMLDivElement | null>
  stageFloor: number
}) {
  const Animation = solution.animation
  const visualKey = Animation || !solution.figure ? `${solution.id}-${index}` : solution.id

  return (
    <div
      ref={stageRef}
      className={local('solution-stage')}
      style={{ minHeight: stageFloor > 0 ? `${stageFloor}px` : undefined }}
    >
      <div className={local('solution-visual')}>
        <AnimatePresence mode="wait">
          <motion.div
            key={visualKey}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Suspense fallback={null}>
              {Animation ? (
                <Animation
                  scene={scene}
                  index={index}
                  playing={playing}
                  stepProgress={stepProgress}
                  sceneProgress={sceneProgress}
                  revealedMath={revealedMath}
                />
              ) : solution.figure ? (
                <SolutionFigureView
                  figure={solution.figure}
                  scene={scene}
                  focus={figureFocus}
                  animationKey={`${index}-${stepIndex}`}
                  progress={playing ? stepProgress : 1}
                  revealedFocus={revealedFocus}
                  sceneIndex={index}
                  revealedMath={revealedMath}
                  heightFloor={heightFloor}
                  onRequestHeight={requestHeight}
                />
              ) : (
                <SceneVisual scene={scene} index={index} />
              )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
        <span className={local('solution-scene-count')}>
          SCENA {index + 1} / {solution.scenes.length}
        </span>
      </div>
      <div className={local('solution-copy')}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`copy-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <span className={local('solution-scene-title')}>{scene.title}</span>
            <p>{scene.narration}</p>
            {scene.formula && <MathTransform formula={scene.formula} progress={sceneProgress} />}
            <p className={local('solution-caption')}>{scene.caption}</p>
            {scene.emphasis && <p className={local('solution-emphasis')}>{scene.emphasis}</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
