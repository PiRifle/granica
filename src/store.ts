import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LessonId } from './types'
import { courses, defaultCourse, lessonIds } from './content/course'

const initialLastLessons = Object.fromEntries(
  courses
    .map((course) => [course.id, course.lessons[0]?.id] as const)
    .filter((entry): entry is readonly [string, LessonId] => Boolean(entry[1])),
)

interface CourseState {
  completed: LessonId[]
  scores: Partial<Record<LessonId, number>>
  lastLessonByCourse: Record<string, LessonId>
  lastCourseId: string
  completeLesson: (id: LessonId, score: number) => void
  setLastLesson: (courseId: string, id: LessonId) => void
  setLastCourse: (courseId: string) => void
  resetProgress: () => void
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      completed: [],
      scores: {},
      lastLessonByCourse: initialLastLessons,
      lastCourseId: defaultCourse.id,
      completeLesson: (id, score) =>
        set((state) => ({
          completed: state.completed.includes(id) ? state.completed : [...state.completed, id],
          scores: { ...state.scores, [id]: Math.max(score, state.scores[id] ?? 0) },
        })),
      setLastLesson: (courseId, id) =>
        set((state) => ({
          lastCourseId: courseId,
          lastLessonByCourse: { ...state.lastLessonByCourse, [courseId]: id },
        })),
      setLastCourse: (lastCourseId) => set({ lastCourseId }),
      resetProgress: () =>
        set({
          completed: [],
          scores: {},
          lastLessonByCourse: initialLastLessons,
          lastCourseId: defaultCourse.id,
        }),
    }),
    {
      name: 'wytrzymalosc-course-v2',
      version: 3,
      migrate: (persisted) => {
        const state = persisted as (Partial<CourseState> & { lastLesson?: LessonId }) | undefined
        const completed = (state?.completed ?? []).filter((id) => lessonIds.includes(id))
        const migratedLastLessons = { ...initialLastLessons }
        for (const course of courses) {
          const stored = state?.lastLessonByCourse?.[course.id]
          const legacy = course.id === defaultCourse.id ? state?.lastLesson : undefined
          const candidate = stored ?? legacy
          if (candidate && course.lessons.some((lesson) => lesson.id === candidate)) {
            migratedLastLessons[course.id] = candidate
          }
        }
        const lastCourseId = courses.some((course) => course.id === state?.lastCourseId)
          ? (state?.lastCourseId as string)
          : defaultCourse.id
        return {
          completed,
          scores: state?.scores ?? {},
          lastLessonByCourse: migratedLastLessons,
          lastCourseId,
        }
      },
    },
  ),
)
