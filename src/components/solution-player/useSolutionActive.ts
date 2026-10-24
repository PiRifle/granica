import type { CourseSolution } from '../../types'
import type { SolutionTiming } from './useSolutionTiming'

export function useSolutionActive(solution: CourseSolution, timing: SolutionTiming['timing'], position: number) {
  let index = 0
  for (let sceneIndex = 0; sceneIndex < timing.length; sceneIndex += 1) {
    if (position >= timing[sceneIndex].start) index = sceneIndex
    else break
  }
  const activeTiming = timing[index]
  const localMs = Math.min(activeTiming.duration, Math.max(0, position - activeTiming.start))
  const sceneProgress = activeTiming.duration > 0 ? localMs / activeTiming.duration : 0
  const steps = activeTiming.steps
  const stepIndex = steps.length > 0 ? Math.min(steps.length - 1, Math.floor(sceneProgress * steps.length)) : 0
  const stepProgress = steps.length > 0 ? sceneProgress * steps.length - stepIndex : sceneProgress
  const stepFormula = steps[stepIndex]
  const scene = solution.scenes[index]
  return {
    index,
    scene,
    sceneProgress,
    steps,
    stepIndex,
    stepProgress,
    stepFormula,
    localMs,
    lastIndex: solution.scenes.length - 1,
  }
}

export type SolutionActive = ReturnType<typeof useSolutionActive>
