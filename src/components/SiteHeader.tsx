import { useEffect, useState } from 'react'
import { ArrowRight, Check, ChevronDown, Target } from 'lucide-react'
import { useCourseStore } from '../store'
import type { Course, CourseTool } from '../types'
import { courseThemeStyle } from '../lib/courseTheme'
import { Logo } from './Logo'
import home from './Home.module.css'
import { classNames, cx } from '../lib/css'

const h = classNames(home)

export function SiteHeader({
  courses,
  activeCourse,
  mode = 'course',
  onHome,
  onStart,
  onTool,
  onCourse,
  startLabel: startLabelOverride,
}: {
  courses: Course[]
  activeCourse?: Course
  mode?: 'landing' | 'course'
  onHome: () => void
  onStart: () => void
  onTool: (view: CourseTool) => void
  onCourse: (id: string) => void
  startLabel?: string
}) {
  const completed = useCourseStore((state) => state.completed)
  const [menuOpen, setMenuOpen] = useState(false)
  const completedCount = activeCourse
    ? activeCourse.lessons.filter((lesson) => completed.includes(lesson.id)).length
    : completed.length

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const startLabel =
    startLabelOverride ?? (activeCourse ? (completedCount ? 'Wróć do kursu' : 'Zacznij naukę') : 'Wybierz kurs')

  return (
    <header className={h('site-header')}>
      <Logo
        onClick={onHome}
        subtitle={activeCourse ? activeCourse.shortTitle : 'interaktywne kursy mechaniki'}
        label={activeCourse ? `Granica — ${activeCourse.title}` : 'Granica — strona główna'}
        dotColor={activeCourse ? 'var(--accent)' : 'var(--orange)'}
      />
      <nav aria-label="Główna nawigacja">
        {mode === 'course' && activeCourse ? (
          <>
            <a href="#metoda">Jak się uczymy</a>
            <a href="#moduly">Moduły</a>
            <a href="#narzedzia">Narzędzia</a>
          </>
        ) : (
          <>
            <a href="#kursy">Kursy</a>
            <a href="#metoda">Jak to działa</a>
            <a href="#w-srodku">W środku</a>
          </>
        )}
      </nav>
      <div className={h('header-actions')}>
        <div className={h('course-switcher')}>
          <button
            type="button"
            className={h('course-switcher-button')}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {activeCourse ? <span className={h('preview-dot')} style={courseThemeStyle(activeCourse.theme)} /> : null}
            {activeCourse ? activeCourse.shortTitle : 'Przedmioty'}
            <ChevronDown size={14} />
          </button>
          {menuOpen && (
            <div className={h('course-menu')} role="menu">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  onHome()
                }}
              >
                <span className={h('course-menu-copy')}>
                  <strong>Wszystkie kursy</strong>
                  <small>Strona główna</small>
                </span>
              </button>
              {courses.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  role="menuitem"
                  className={cx(activeCourse?.id === course.id && h('active'))}
                  onClick={() => {
                    setMenuOpen(false)
                    onCourse(course.id)
                  }}
                >
                  <span className={h('preview-dot')} style={courseThemeStyle(course.theme)} />
                  <span className={h('course-menu-copy')}>
                    <strong>{course.title}</strong>
                    <small>{course.marketing.statusLabel}</small>
                  </span>
                  {activeCourse?.id === course.id ? <Check size={14} /> : null}
                </button>
              ))}
            </div>
          )}
        </div>
        {activeCourse?.tools.training ? (
          <button className={h('button button-quiet button-small')} onClick={() => onTool('training')}>
            <Target size={15} />
            Trening
          </button>
        ) : null}
        <button className={h('button button-dark button-small')} onClick={onStart}>
          {startLabel}
          <ArrowRight size={16} />
        </button>
      </div>
    </header>
  )
}
