import { useMemo } from 'react'
import type { CourseSolution } from '../../types'
import { splitFormula } from '../../lib/mathAnimation'
import { SCENE_MS, STEP_MS } from './constants'

export function useSolutionTiming(solution: CourseSolution) {
  const sceneSteps = useMemo(
    () => solution.scenes.map((item) => (item.formula ? splitFormula(item.formula) : [])),
    [solution.scenes],
  )
  const timing = useMemo(() => {
    let start = 0
    return solution.scenes.map((_, sceneIndex) => {
      const steps = sceneSteps[sceneIndex]
      const duration = Math.max(SCENE_MS, Math.max(1, steps.length) * STEP_MS)
      const entry = { start, duration, steps }
      start += duration
      return entry
    })
  }, [sceneSteps, solution.scenes])
  const totalMs = timing.length > 0 ? timing[timing.length - 1].start + timing[timing.length - 1].duration : 0
  return { sceneSteps, timing, totalMs }
}

export type SolutionTiming = ReturnType<typeof useSolutionTiming>
