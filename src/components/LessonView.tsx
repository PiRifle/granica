import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Award, BookOpen, Check, ChevronRight, Lightbulb, Menu, X } from 'lucide-react'
import { getModuleForLesson, getSolution, lessonIndex, lessons, modules } from '../content/course'
import { useCourseStore } from '../store'
import type { CourseLesson, LessonId } from '../types'
import type { View } from '../lib/navigation'
import { CourseProgress } from './UI'
import { SolutionPlayer } from './SolutionPlayer'
import { LessonBody } from '../mdx/LessonBody'
import { Logo } from './Logo'
import lessonView from './LessonView.module.css'
import { classNames, cx } from '../lib/css'

const l = classNames(lessonView)

export function LessonView({
  lesson,
  onHome,
  onLesson,
  onModule,
  onTool,
}: {
  lesson: CourseLesson
  onHome: () => void
  onLesson: (id: LessonId) => void
  onModule: (id: string) => void
  onTool: (view: View) => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { completed, setLastLesson } = useCourseStore()
  const module = getModuleForLesson(lesson)
  const index = lessonIndex(lesson.id)
  const prevLesson = lessons[index - 1]
  const nextLesson = lessons[index + 1]
  const solution = lesson.solutionId ? getSolution(lesson.solutionId) : undefined

  useEffect(() => {
    setLastLesson(lesson.id)
    window.scrollTo(0, 0)
  }, [lesson.id, setLastLesson])

  return (
    <div className={l('lesson-page')}>
      <header className={l('lesson-header')}>
        <Logo onClick={onHome} />
        <div className={l('lesson-header-progress')}>
          <span>
            Twój postęp{' '}
            <strong>
              {completed.length}/{lessons.length}
            </strong>
          </span>
          <CourseProgress value={(completed.length / lessons.length) * 100} />
        </div>
        <button
          className={l('icon-button mobile-menu')}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Pokaż moduły"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <button className={l('button button-small button-quiet')} onClick={onHome}>
          <X size={16} />
          Zamknij lekcję
        </button>
      </header>
      <div className={l('lesson-layout')}>
        <aside className={cx(l('lesson-sidebar'), menuOpen && l('open'))}>
          <span className={l('sidebar-label')}>TWOJA ŚCIEŻKA · {modules.length} MODUŁÓW</span>
          <nav className={l('sidebar-nav')} aria-label="Lekcje kursu">
            {modules.map((moduleEntry) => (
              <div key={moduleEntry.id} className={l('sidebar-module')}>
                <button className={l('sidebar-module-title')} onClick={() => onModule(moduleEntry.id)}>
                  {String(moduleEntry.number).padStart(2, '0')} · {moduleEntry.shortTitle}
                </button>
                {moduleEntry.lessons.map((item) => (
                  <button
                    key={item.id}
                    className={cx(l('sidebar-lesson'), item.id === lesson.id && l('active'))}
                    onClick={() => {
                      onLesson(item.id)
                      setMenuOpen(false)
                    }}
                  >
                    <span className={l('sidebar-number')}>
                      {completed.includes(item.id) ? <Check size={14} /> : item.number}
                    </span>
                    <span>
                      {item.shortTitle}
                      <small>{item.totalMinutes} min</small>
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className={l('sidebar-tip')}>
            <Lightbulb />
            <strong>Ucz się po swojemu</strong>
            <p>Możesz wracać do eksperymentów. Postęp zapisuje się na tym urządzeniu.</p>
          </div>
        </aside>
        <main className={l('lesson-main')}>
          <div className={l('lesson-breadcrumb')}>
            <button onClick={onHome}>Kurs</button>
            <ChevronRight size={14} />
            <button onClick={() => onModule(module.id)}>
              Moduł {module.number}: {module.shortTitle}
            </button>
            <ChevronRight size={14} />
            <span>Lekcja {lesson.number}</span>
          </div>
          <div className={l('lesson-title')}>
            <span className={l('section-kicker')}>{lesson.eyebrow.toUpperCase()}</span>
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>
            <span
              className={l('lesson-time')}
              title={`Wzory w linii: ${lesson.inlineMath} · blokowe: ${lesson.displayMath} · ${lesson.totalMinutes} min razem`}
            >
              <BookOpen size={15} />
              {lesson.readingMinutes} min czytania
              {lesson.experiments > 0
                ? ` · ${lesson.experiments} ${experimentsLabel(lesson.experiments)} (~${lesson.experimentMinutes} min)`
                : ''}
              {` · ${lesson.words.toLocaleString('pl-PL')} słów`}
              {solution ? ' · animowane rozwiązanie' : ''}
            </span>
          </div>
          <LessonBody lesson={lesson} />
          {solution && <SolutionPlayer solution={solution} />}
          <div className={l('lesson-navigation')}>
            {prevLesson ? (
              <button className={l('button button-quiet')} onClick={() => onLesson(prevLesson.id)}>
                <ArrowLeft />
                Poprzednia
              </button>
            ) : (
              <span />
            )}
            {nextLesson ? (
              <button className={l('button button-primary')} onClick={() => onLesson(nextLesson.id)}>
                Następna lekcja
                <ArrowRight />
              </button>
            ) : (
              <button className={l('button button-primary')} onClick={() => onTool('exam')}>
                Przejdź do kolokwium
                <Award />
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function experimentsLabel(count: number): string {
  if (count === 1) return 'eksperyment'
  const last = count % 10
  const lastTwo = count % 100
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return 'eksperymenty'
  return 'eksperymentów'
}
