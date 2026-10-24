import type { ComponentType } from 'react'
import type { LessonMeta, ModuleStatus, SolutionAnimationProps, SolutionFigure, SolutionScene } from '../types'

export type { LessonMeta }

export interface ModuleData {
  id: string
  number: number
  title: string
  shortTitle: string
  description: string
  outcomes: string[]
  status?: ModuleStatus
}

export interface SolutionData {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
  scenes: SolutionScene[]
  figure?: SolutionFigure
  animation?: ComponentType<SolutionAnimationProps>
}
