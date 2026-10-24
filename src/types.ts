import type { ComponentType } from 'react'

export type LessonId = string

export type MdxBody = () => Promise<{ default: ComponentType<{ components?: Record<string, ComponentType<any>> }> }>

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
  formula: string
  formulaNote: string
  insight: string
  lab: string
  outcomes: string[]
  questions: Question[]
  workedExample?: WorkedExample
  solutionId?: string
  solutionIds?: string[]
}

export interface CourseLesson extends Lesson {
  loadBody: MdxBody
}

export interface CourseModule {
  id: string
  number: number
  title: string
  shortTitle: string
  description: string
  outcomes: string[]
  lessons: CourseLesson[]
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
  duration: number
  given: string[]
  result: string
  scenes: SolutionScene[]
}

export interface CourseSolution extends WorkedSolution {
  loadBody: MdxBody
}
