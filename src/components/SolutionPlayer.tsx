import { lazy, useEffect, useMemo } from 'react'
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

export function SolutionPlayer({
  solution,
  autoPlay = false,
  instant = false,
  sceneRequest,
  onSceneChange,
}: {
  solution: CourseSolution
  autoPlay?: boolean
  instant?: boolean
  sceneRequest?: { index: number; token: number }
  onSceneChange?: (index: number) => void
}) {
  const Body = useMemo(() => lazy(solution.loadBody), [solution.id, solution.loadBody])
  const { sceneSteps, timing, totalMs } = useSolutionTiming(solution)
  const lastIndex = solution.scenes.length - 1
  const playback = useSolutionPlayback(totalMs, timing, lastIndex, autoPlay)
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
  const requestToken = sceneRequest?.token
  const requestIndex = sceneRequest?.index

  useEffect(() => {
    if (autoPlay && requestIndex === 0) return
    if (requestToken !== undefined && requestIndex !== undefined) playback.goToScene(requestIndex)
  }, [autoPlay, playback.goToScene, requestIndex, requestToken])

  useEffect(() => {
    onSceneChange?.(active.index)
  }, [active.index, onSceneChange])

  return (
    <section className={local('solution-player')} aria-label={`Animowane rozwiązanie: ${solution.title}`}>
      <SolutionHeader solution={solution} Body={Body} />
      <SolutionStage
        solution={solution}
        scene={active.scene}
        index={active.index}
        instant={instant}
        stepIndex={active.stepIndex}
        playing={playback.playing || playback.engaged}
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
