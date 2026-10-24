import { lazy, useMemo } from 'react'
import type { CourseSolution } from '../types'
import { local } from './solution-player/local'
import { SolutionControls } from './solution-player/SolutionControls'
import { SolutionHeader } from './solution-player/SolutionHeader'
import { SolutionResult } from './solution-player/SolutionResult'
import { SolutionStage } from './solution-player/SolutionStage'
import { useSolutionActive } from './solution-player/useSolutionActive'
import { useSolutionHeight } from './solution-player/useSolutionHeight'
import { useSolutionPlayback } from './solution-player/useSolutionPlayback'
import { useSolutionReveal } from './solution-player/useSolutionReveal'
import { useSolutionTiming } from './solution-player/useSolutionTiming'

export function SolutionPlayer({ solution }: { solution: CourseSolution }) {
  const Body = useMemo(() => lazy(solution.loadBody), [solution.id, solution.loadBody])
  const { sceneSteps, timing, totalMs } = useSolutionTiming(solution)
  const lastIndex = solution.scenes.length - 1
  const playback = useSolutionPlayback(totalMs, timing, lastIndex)
  const active = useSolutionActive(solution, timing, playback.position)
  const { stageRef, stageFloor, heightFloor, requestHeight } = useSolutionHeight(
    solution.id,
    active.index,
    playback.seeking,
    playback.position,
  )
  const { figureFocus, revealedFocus, revealedMath } = useSolutionReveal(
    solution,
    active.index,
    active.scene,
    active.steps,
    active.stepIndex,
    sceneSteps,
  )
  const progress = totalMs > 0 ? (playback.position / totalMs) * 100 : 0

  return (
    <section className={local('solution-player')} aria-label={`Animowane rozwiązanie: ${solution.title}`}>
      <SolutionHeader solution={solution} Body={Body} />
      <SolutionStage
        solution={solution}
        scene={active.scene}
        index={active.index}
        stepIndex={active.stepIndex}
        playing={playback.playing}
        stepProgress={active.stepProgress}
        sceneProgress={active.sceneProgress}
        figureFocus={figureFocus}
        revealedFocus={revealedFocus}
        revealedMath={revealedMath}
        heightFloor={heightFloor}
        requestHeight={requestHeight}
        stageRef={stageRef}
        stageFloor={stageFloor}
      />
      <SolutionControls
        solution={solution}
        playback={playback}
        active={active}
        timing={timing}
        totalMs={totalMs}
        progress={progress}
      />
      <SolutionResult result={solution.result} />
    </section>
  )
}
