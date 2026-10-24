import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LessonId } from './types'
import { lessonIds, lessons } from './content/course'

const firstLesson = lessons[0]?.id ?? 'foundations-si-units'

interface CourseState {
  completed: LessonId[]
  scores: Partial<Record<LessonId, number>>
  lastLesson: LessonId
  completeLesson: (id: LessonId, score: number) => void
  setLastLesson: (id: LessonId) => void
  resetProgress: () => void
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      completed: [],
      scores: {},
      lastLesson: firstLesson,
      completeLesson: (id, score) => set((state) => ({
        completed: state.completed.includes(id) ? state.completed : [...state.completed, id],
        scores: { ...state.scores, [id]: Math.max(score, state.scores[id] ?? 0) },
      })),
      setLastLesson: (lastLesson) => set({ lastLesson }),
      resetProgress: () => set({ completed: [], scores: {}, lastLesson: firstLesson }),
    }),
    {
      name: 'wytrzymalosc-course-v2',
      version: 2,
      migrate: (persisted) => {
        const state = persisted as Partial<CourseState> | undefined
        const completed = (state?.completed ?? []).filter((id) => lessonIds.includes(id))
        return {
          ...state,
          completed,
          scores: state?.scores ?? {},
          lastLesson: state?.lastLesson && lessonIds.includes(state.lastLesson) ? state.lastLesson : firstLesson,
        }
      },
    },
  ),
)
