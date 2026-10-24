import type { CourseTool } from '../types'

export type View = 'home' | 'lesson' | CourseTool

export const toolSegments: Record<CourseTool, string> = {
  training: 'training',
  exam: 'exam',
  cheatsheet: 'cheatsheet',
  syllabus: 'syllabus',
  library: 'library',
}

export function coursePath(courseId: string): string {
  return `/course/${courseId}`
}

export function courseToolPath(courseId: string, view: CourseTool): string {
  return `${coursePath(courseId)}/${toolSegments[view]}`
}

export function courseLessonPath(courseId: string, lessonId: string): string {
  return `${coursePath(courseId)}/lesson/${lessonId}`
}

export function courseModulePath(courseId: string, moduleId: string): string {
  return `${coursePath(courseId)}/module/${moduleId}`
}
