export type LessonId = string

export interface Question {
  question: string
  answers: string[]
  correct: number
  explanation: string
  hint: string
  outcome?: string
}

export interface WorkedExample {
  given: string
  steps: string[]
  result: string
}

export interface Lesson {
  id: LessonId
  moduleId: string
  number: number
  title: string
  shortTitle: string
  description: string
  duration: number
  eyebrow: string
  intuition: string
  formula: string
  formulaNote: string
  insight: string
  lab: string
  outcomes: string[]
  questions: Question[]
  workedExample?: WorkedExample
  solutionId?: string
}

export interface CourseModule {
  id: string
  number: number
  title: string
  shortTitle: string
  description: string
  outcomes: string[]
  lessons: Lesson[]
}

export interface SolutionScene {
  title: string
  narration: string
  formula?: string
  caption: string
  visual: 'axial' | 'thermal' | 'section' | 'cube' | 'rosette' | 'beam' | 'diagram'
  emphasis?: string
}

export interface WorkedSolution {
  id: string
  title: string
  problem: string
  duration: number
  given: string[]
  result: string
  scenes: SolutionScene[]
}
