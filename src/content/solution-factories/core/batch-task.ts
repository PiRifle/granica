import type { SourceTaskDefinition } from './source-task'
import { sourceScene } from './source-task'

export interface BatchStep {
  narration: string
  formula: string
  caption: string
  emphasis?: string
}

export interface BatchTaskInput {
  id: string
  title: string
  given: string[]
  result: string
  visuals: string[][]
  model: BatchStep
  loads: BatchStep
  equations: BatchStep
  solution: BatchStep
  interpretation: BatchStep
  check: BatchStep
  duration?: number
}

export function makeBatchTask(input: BatchTaskInput): SourceTaskDefinition {
  return {
    id: input.id,
    title: input.title,
    duration: input.duration ?? 9,
    given: input.given,
    result: input.result,
    visuals: input.visuals,
    scenes: [
      sourceScene(
        'Model fizyczny i dane',
        input.model.narration,
        input.model.formula,
        input.model.caption,
        'model',
        input.model.emphasis,
      ),
      sourceScene(
        'Geometria, obciążenia i wypadkowe',
        input.loads.narration,
        input.loads.formula,
        input.loads.caption,
        'loads',
        input.loads.emphasis,
      ),
      sourceScene(
        'Równania równowagi i zależności',
        input.equations.narration,
        input.equations.formula,
        input.equations.caption,
        'moment',
        input.equations.emphasis,
      ),
      sourceScene(
        'Rozwiązanie krok po kroku',
        input.solution.narration,
        input.solution.formula,
        input.solution.caption,
        'reactions',
        input.solution.emphasis,
      ),
      sourceScene(
        'Interpretacja wyniku i znaków',
        input.interpretation.narration,
        input.interpretation.formula,
        input.interpretation.caption,
        'signs',
        input.interpretation.emphasis,
      ),
      sourceScene(
        'Niezależna kontrola',
        input.check.narration,
        input.check.formula,
        input.check.caption,
        'check',
        input.check.emphasis,
      ),
    ],
  }
}
