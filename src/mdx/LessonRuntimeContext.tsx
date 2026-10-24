import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { CourseLesson } from '../types'

const LessonRuntimeContext = createContext<CourseLesson | null>(null)

export function LessonRuntimeProvider({ value, children }: { value: CourseLesson; children: ReactNode }) {
  return <LessonRuntimeContext.Provider value={value}>{children}</LessonRuntimeContext.Provider>
}

export function useLessonRuntime(): CourseLesson {
  const value = useContext(LessonRuntimeContext)
  if (!value) throw new Error('Komponent MDX musi być renderowany wewnątrz LessonRuntimeProvider')
  return value
}
