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

export interface LessonMeta {
  id: LessonId
  moduleId: string
  number: number
  title: string
  shortTitle: string
  description: string
  duration: number
  eyebrow: string
  outcomes: string[]
  solutionId?: string
}

export interface CourseLesson extends LessonMeta {
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
