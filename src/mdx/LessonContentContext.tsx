import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { LessonData } from '../content/model'

const LessonContentContext = createContext<LessonData | null>(null)

export function LessonContentProvider({ value, children }: { value: LessonData; children: ReactNode }) {
  return <LessonContentContext.Provider value={value}>{children}</LessonContentContext.Provider>
}

export function useLessonContent(): LessonData {
  const value = useContext(LessonContentContext)
  if (!value) throw new Error('Komponent MDX musi być renderowany wewnątrz LessonContentProvider')
  return value
}
