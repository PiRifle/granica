import type { Question, WorkedExample } from '../types'

export interface LessonData {
  id: string
  moduleId: string
  number: number
  title: string
  shortTitle: string
  description: string
  duration: number
  eyebrow: string
  formula: string
  formulaNote: string
  insight: string
  lab: string
  outcomes: string[]
  questions: Question[]
  workedExample?: WorkedExample
  solutionId?: string
}

export interface ModuleData {
  id: string
  number: number
  title: string
  shortTitle: string
  description: string
  outcomes: string[]
}

export interface SolutionData {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
  scenes: import('../types').SolutionScene[]
}
