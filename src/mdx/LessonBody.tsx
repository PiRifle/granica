import { lazy, Suspense, useMemo } from 'react'
import type { CourseLesson } from '../types'
import { LessonRuntimeProvider } from './LessonRuntimeContext'
import { mdxComponents } from './components'
import styles from './Content.module.css'

export function LessonBody({ lesson }: { lesson: CourseLesson }) {
  const Body = useMemo(() => lazy(lesson.loadBody), [lesson.id, lesson.loadBody])
  return <LessonRuntimeProvider value={lesson}>
    <div className={styles.content}>
      <Suspense fallback={<div className={styles.loading}>Ładowanie treści lekcji…</div>}>
        <Body components={mdxComponents} />
      </Suspense>
    </div>
  </LessonRuntimeProvider>
}
