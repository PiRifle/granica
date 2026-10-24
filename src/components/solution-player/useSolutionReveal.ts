import { useMemo } from 'react'
import type { CourseSolution, SolutionScene } from '../../types'
import { inferFocus, resolveFocus } from '../SolutionFigure'

export function useSolutionReveal(
  solution: CourseSolution,
  index: number,
  scene: SolutionScene,
  steps: string[],
  stepIndex: number,
  sceneSteps: string[][],
) {
  const stepFormula = steps[stepIndex]
  const baseFocus = solution.figure ? resolveFocus(scene, solution.figure) : undefined
  const stepFocus =
    solution.figure && stepFormula
      ? inferFocus({ ...scene, title: '', narration: '', formula: stepFormula }, solution.figure)
      : undefined
  const figureFocus =
    baseFocus || stepFocus
      ? { metric: stepFocus?.metric ?? baseFocus?.metric, segment: stepFocus?.segment ?? baseFocus?.segment }
      : undefined
  const revealedFocus = useMemo(() => {
    if (!solution.figure) return []
    const revealed = new Set<string>()
    for (let sceneIndex = 0; sceneIndex <= index; sceneIndex += 1) {
      const focus = resolveFocus(solution.scenes[sceneIndex], solution.figure)
      if (focus.metric) revealed.add(focus.metric)
    }
    return Array.from(revealed)
  }, [solution, index])
  const revealedMath = useMemo(() => {
    const parts: string[] = []
    for (let sceneIndex = 0; sceneIndex < index; sceneIndex += 1) parts.push(...sceneSteps[sceneIndex])
    parts.push(...(sceneSteps[index]?.slice(0, stepIndex + 1) ?? []))
    return parts.join(' ')
  }, [index, sceneSteps, stepIndex])
  return { figureFocus, revealedFocus, revealedMath }
}

export type SolutionReveal = ReturnType<typeof useSolutionReveal>
