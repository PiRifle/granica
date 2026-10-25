import { lazy, Suspense } from 'react'
import { BookOpen, CheckCircle2, Circle, ClipboardList } from 'lucide-react'
import { useCourseStore } from '../store'
import type { Course } from '../types'
import { courseThemeStyle } from '../lib/courseTheme'
import { mdxComponents } from '../mdx/components'
import contentStyles from '../mdx/Content.module.css'
import tools from './Tools.module.css'
import styles from './StudyTools.module.css'

const cx = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ')
const local = (names: string) =>
  names
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => tools[name] ?? styles[name] ?? name)
    .join(' ')

const CheatSheetBody = lazy(() => import('../content/cheatsheet.mdx'))

export function CheatSheet({ course, onBack }: { course: Course; onBack: () => void }) {
  return (
    <div className={local('tool-page')} style={courseThemeStyle(course.theme)}>
      <header className={local('tool-header')}>
        <button className={local('button button-quiet button-small')} onClick={onBack}>
          ← Wróć do kursu
        </button>
        <div className={local('tool-header-copy')}>
          <span className={local('section-kicker')}>ŚCIĄGA</span>
          <h1>Wszystkie wzory w jednym miejscu.</h1>
          <p>Wzór, jednostki i jedna myśl, która wyjaśnia sens. Treść ściągi jest osobnym dokumentem MDX.</p>
        </div>
        <span className={local('tool-score')}>
          <BookOpen size={17} /> {course.lessons.length} lekcji
        </span>
      </header>
      <div className={contentStyles.content}>
        <Suspense fallback={<p>Ładowanie ściągi…</p>}>
          <CheatSheetBody components={mdxComponents} />
        </Suspense>
      </div>
    </div>
  )
}

export function SyllabusMap({ course, onBack }: { course: Course; onBack: () => void }) {
  const { completed, scores } = useCourseStore()
  const courseLessonIds = new Set(course.lessons.map((lesson) => lesson.id))
  const totalCompleted = completed.filter((id) => courseLessonIds.has(id)).length
  return (
    <div className={local('tool-page')} style={courseThemeStyle(course.theme)}>
      <header className={local('tool-header')}>
        <button className={local('button button-quiet button-small')} onClick={onBack}>
          ← Wróć do kursu
        </button>
        <div className={local('tool-header-copy')}>
          <span className={local('section-kicker')}>MAPA POKRYCIA SYLABUSA</span>
          <h1>Widać dokładnie, co już umiesz.</h1>
          <p>
            Karta przedmiotu rozbita na moduły, lekcje i efekty kształcenia. Postęp liczy się z ukończonych lekcji na
            tym urządzeniu.
          </p>
        </div>
        <span className={local('tool-score')}>
          <ClipboardList size={17} /> {totalCompleted} / {course.lessons.length} lekcji
        </span>
      </header>
      <div className={local('syllabus-list')}>
        {course.syllabus.map((item) => {
          const module = course.modules.find((entry) => entry.id === item.moduleId)
          if (!module) return null
          const planned = module.status === 'planned' || module.lessons.length === 0
          const done = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
          const percent = module.lessons.length ? Math.round((done / module.lessons.length) * 100) : 0
          const status = planned
            ? 'not-started'
            : done === 0
              ? 'not-started'
              : done === module.lessons.length
                ? 'complete'
                : 'in-progress'
          return (
            <article key={item.moduleId} className={local(`syllabus-card ${status}`)}>
              <div className={local('syllabus-card-head')}>
                <span className={local('syllabus-number')}>
                  {status === 'complete' ? <CheckCircle2 /> : <Circle />}
                </span>
                <div>
                  <span className={local('section-kicker')}>
                    MODUŁ {String(module.number).padStart(2, '0')}
                    {planned ? ' · W PRZYGOTOWANIU' : ''}
                  </span>
                  <h2>{module.title}</h2>
                  <p>{item.label}</p>
                </div>
                <span className={local('syllabus-percent')}>
                  {percent}%<small>{planned ? 'w planie' : `${done} / ${module.lessons.length} lekcji`}</small>
                </span>
              </div>
              <div className={local('progress-root')}>
                <div className={local('progress-indicator')} style={{ transform: `translateX(-${100 - percent}%)` }} />
              </div>
              <div className={local('syllabus-outcomes')}>
                {module.outcomes.map((outcome) => {
                  const code = outcome.trim().split(' ')[0]
                  const covered = module.lessons.some(
                    (lesson) =>
                      completed.includes(lesson.id) &&
                      lesson.outcomes.some((lessonOutcome) => lessonOutcome.trim().split(' ')[0] === code),
                  )
                  return (
                    <span key={outcome} className={covered ? local('covered') : undefined}>
                      {covered ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                      {outcome}
                    </span>
                  )
                })}
              </div>
              {module.lessons.length > 0 && (
                <div className={local('syllabus-lessons')}>
                  {module.lessons.map((lesson) => {
                    const isDone = completed.includes(lesson.id)
                    const score = scores[lesson.id]
                    return (
                      <span key={lesson.id} className={isDone ? local('done') : undefined}>
                        {isDone ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                        {lesson.shortTitle}
                        {isDone && score !== undefined ? ` · ${score}%` : ''}
                      </span>
                    )
                  })}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
