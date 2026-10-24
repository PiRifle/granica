import { Suspense, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Award, BookOpen, Check, ChevronRight, Lightbulb, Menu, X } from 'lucide-react'
import { getModuleForLesson, getSolution, lessonIndex, lessons, modules } from '../content/course'
import { useCourseStore } from '../store'
import type { CourseLesson, LessonId } from '../types'
import type { View } from '../lib/navigation'
import { CourseProgress } from './UI'
import { labRegistry } from './LabRegistry'
import { SolutionPlayer } from './SolutionPlayer'
import { LessonBody } from '../mdx/LessonBody'
import { Logo } from './Logo'
import { Quiz } from './Quiz'
import lessonView from './LessonView.module.css'
import { classNames, cx } from '../lib/css'

const l = classNames(lessonView)

export function LessonView({ lesson, onHome, onLesson, onTool }: { lesson: CourseLesson; onHome: () => void; onLesson: (id: LessonId) => void; onTool: (view: View) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { completed, completeLesson, setLastLesson } = useCourseStore()
  const ActiveLab = labRegistry[lesson.lab]
  const module = getModuleForLesson(lesson)
  const index = lessonIndex(lesson.id)
  const prevLesson = lessons[index - 1]
  const nextLesson = lessons[index + 1]
  const solutionIds = [...new Set([lesson.solutionId, ...(lesson.solutionIds ?? [])].filter((id): id is string => Boolean(id)))]
  const solutions = solutionIds.flatMap((id) => {
    const solution = getSolution(id)
    return solution ? [solution] : []
  })

  useEffect(() => { setLastLesson(lesson.id); window.scrollTo(0, 0) }, [lesson.id, setLastLesson])

  return <div className={l('lesson-page')}>
    <header className={l('lesson-header')}><Logo onClick={onHome} /><div className={l('lesson-header-progress')}><span>Twój postęp <strong>{completed.length}/{lessons.length}</strong></span><CourseProgress value={completed.length / lessons.length * 100} /></div><button className={l('icon-button mobile-menu')} onClick={() => setMenuOpen(!menuOpen)} aria-label="Pokaż moduły">{menuOpen ? <X /> : <Menu />}</button><button className={l('button button-small button-quiet')} onClick={onHome}><X size={16} />Zamknij lekcję</button></header>
    <div className={l('lesson-layout')}>
      <aside className={cx(l('lesson-sidebar'), menuOpen && l('open'))}><span className={l('sidebar-label')}>TWOJA ŚCIEŻKA · {modules.length} MODUŁÓW</span><nav className={l('sidebar-nav')} aria-label="Lekcje kursu">{modules.map((moduleEntry) => <div key={moduleEntry.id} className={l('sidebar-module')}><span className={l('sidebar-module-title')}>{String(moduleEntry.number).padStart(2, '0')} · {moduleEntry.shortTitle}</span>{moduleEntry.lessons.map((item) => <button key={item.id} className={cx(l('sidebar-lesson'), item.id === lesson.id && l('active'))} onClick={() => { onLesson(item.id); setMenuOpen(false) }}><span className={l('sidebar-number')}>{completed.includes(item.id) ? <Check size={14} /> : item.number}</span><span>{item.shortTitle}<small>{item.duration} min</small></span></button>)}</div>)}</nav><div className={l('sidebar-tip')}><Lightbulb /><strong>Ucz się po swojemu</strong><p>Możesz wracać do eksperymentów. Postęp zapisuje się na tym urządzeniu.</p></div></aside>
      <main className={l('lesson-main')}><div className={l('lesson-breadcrumb')}><button onClick={onHome}>Kurs</button><ChevronRight size={14} /><span>Moduł {module.number}: {module.shortTitle}</span><ChevronRight size={14} /><span>Lekcja {lesson.number}</span></div><div className={l('lesson-title')}><span className={l('section-kicker')}>{lesson.eyebrow.toUpperCase()}</span><h1>{lesson.title}</h1><p>{lesson.description}</p><span className={l('lesson-time')}><BookOpen size={15} /> około {lesson.duration} min · eksperyment + {lesson.questions.length} pytania{solutions.length ? ` + ${solutions.length} animowane rozwiązania` : ''}</span></div>
        <motion.div key={`lab-${lesson.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{ActiveLab ? <Suspense fallback={<div className={l('lab-fallback')} role="status">Ładowanie laboratorium…</div>}><ActiveLab /></Suspense> : <div className={l('lab-fallback')}>Laboratorium dla tej lekcji nie jest jeszcze dostępne.</div>}</motion.div>
        <section className={l('explanation')}><div className={l('explanation-heading')}><span className={l('round-icon')}><Lightbulb /></span><div><span className={l('section-kicker')}>CO WŁAŚNIE ZA OBSERWOWAŁEŚ?</span><h2>Wzór jest skrótem obserwacji.</h2></div></div><LessonBody lesson={lesson} /></section>
        {solutions.map((solution) => <SolutionPlayer key={solution.id} solution={solution} />)}
        <Quiz key={lesson.id} lesson={lesson} onComplete={(score) => completeLesson(lesson.id, score)} />
        <div className={l('lesson-navigation')}>{prevLesson ? <button className={l('button button-quiet')} onClick={() => onLesson(prevLesson.id)}><ArrowLeft />Poprzednia</button> : <span />}{nextLesson ? <button className={l('button button-primary')} onClick={() => onLesson(nextLesson.id)}>Następna lekcja<ArrowRight /></button> : <button className={l('button button-primary')} onClick={() => onTool('exam')}>Przejdź do kolokwium<Award /></button>}</div>
      </main>
    </div>
  </div>
}
