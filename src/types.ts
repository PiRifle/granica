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
  words: number
  inlineMath: number
  displayMath: number
  experiments: number
  experimentMinutes: number
  readingMinutes: number
  totalMinutes: number
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
  loadOverview?: MdxBody
}

export interface SolutionScene {
  title: string
  narration: string
  formula?: string
  caption: string
  visual: 'axial' | 'thermal' | 'section' | 'cube' | 'rosette' | 'beam' | 'diagram'
  emphasis?: string
  focus?: SolutionFocus
}

export interface SolutionFocus {
  metric?: string
  segment?: string
}

export interface AxialSegment {
  id: string
  label: string
  length: number
  area?: number
  n?: number
  sigma?: number
  epsilon?: number
  deltaL?: number
  thermalStrain?: number
  freeDeltaL?: number
}

export interface AxialFigure {
  kind: 'axial'
  segments: AxialSegment[]
  top?: 'fixed' | 'free' | 'gap'
  bottom?: 'fixed' | 'free' | 'gap'
  loads?: Array<{ node: number; value: number; label: string; direction?: 'down' | 'up' }>
  units?: Partial<Record<'N' | 'σ' | 'ε' | 'ΔL' | 'αΔT' | 'ΔL_T' | 'A', string>>
  note?: string
}

export type BeamLine = Array<[number, number]>

export interface FigureValue {
  label: string
  value: string
  focus?: string
  reveal?: number
}

export interface BeamFigure {
  kind: 'beam'
  length: number
  supports: Array<{ at: number; label: string }>
  pointLoads?: Array<{ at: number; value: number; label: string }>
  moments?: Array<{ at: number; value: number; label: string }>
  distributed?: Array<{ from: number; to: number; start: number; end: number; label: string }>
  shear?: BeamLine[]
  moment?: BeamLine[]
  markers?: Array<{ x: number; y: number; text: string; diagram: 'shear' | 'moment' }>
  values?: FigureValue[]
  note?: string
}

export interface SectionFigure {
  kind: 'section'
  shape?: 'rect' | 'circle'
  width: number
  height: number
  parts: Array<{
    x: number
    y: number
    width: number
    height: number
    label?: string
    tone?: 'solid' | 'light' | 'accent'
  }>
  holes?: Array<{ cx: number; cy: number; r: number; label?: string }>
  centroid?: { x: number; y: number }
  values?: FigureValue[]
  note?: string
}

export interface CubeFigure {
  kind: 'cube'
  stresses: { x?: number; y?: number; z?: number }
  strains?: { x?: number; y?: number; z?: number }
  volumeChange?: string
  values?: FigureValue[]
  note?: string
}

export interface RosetteFigure {
  kind: 'rosette'
  gauges: Array<{ angle: number; label: string; value: number; display: string }>
  gamma?: { value: number; display: string }
  mohr?: { center: number; radius: number; left: number; right: number; angle?: number; unit?: string }
  values?: FigureValue[]
  note?: string
}

export type SolutionFigure = AxialFigure | BeamFigure | SectionFigure | CubeFigure | RosetteFigure

export interface SolutionAnimationProps {
  scene: SolutionScene
  index: number
  playing: boolean
  stepProgress: number
  sceneProgress: number
  revealedMath: string
}

export interface WorkedSolution {
  id: string
  title: string
  duration: number
  given: string[]
  result: string
  scenes: SolutionScene[]
  figure?: SolutionFigure
  animation?: ComponentType<SolutionAnimationProps>
}

export interface CourseSolution extends WorkedSolution {
  loadBody: MdxBody
}
