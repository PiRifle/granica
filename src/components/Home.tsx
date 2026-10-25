import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Atom,
  Award,
  BookOpen,
  Check,
  ChevronRight,
  ClipboardList,
  Clock,
  FlaskConical,
  Gauge,
  Layers3,
  Library,
  MousePointer2,
  Play,
  RotateCw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Thermometer,
  Zap,
} from 'lucide-react'
import { CoursePreview } from './CoursePreview'
import { useCourseStore } from '../store'
import type { Course, CourseTool, LessonId } from '../types'
import { CourseProgress } from './UI'
import { Logo } from './Logo'
import { SiteHeader } from './SiteHeader'
import { courseThemeStyle } from '../lib/courseTheme'
import { courses } from '../content/course'
import home from './Home.module.css'
import { classNames, cx } from '../lib/css'

const h = classNames(home)
const moduleIcons = [Layers3, Zap, Thermometer, Atom, RotateCw, BookOpen, Sparkles, Gauge, ShieldCheck, Award]

const toolCards: Array<{ view: CourseTool; icon: typeof Target; title: string; description: string }> = [
  {
    view: 'training',
    icon: Target,
    title: 'Trening liczbowy',
    description: 'Losowe dane, 9 typów zadań, tolerancja i pełne rozwiązania.',
  },
  {
    view: 'exam',
    icon: Clock,
    title: 'Kolokwium próbne',
    description: '20 pytań, 20 minut, wynik według modułów i efektów.',
  },
  {
    view: 'cheatsheet',
    icon: BookOpen,
    title: 'Ściąga',
    description: 'Wszystkie wzory, jednostki i najważniejsze wnioski.',
  },
  {
    view: 'syllabus',
    icon: ClipboardList,
    title: 'Mapa sylabusa',
    description: 'Pokrycie karty przedmiotu i efekty kształcenia.',
  },
  {
    view: 'library',
    icon: Library,
    title: 'Biblioteka',
    description: 'Książki z sylabusa, otwarte podręczniki i mapa źródeł.',
  },
]

export function Home({
  course,
  onStart,
  onModule,
  onTool,
  onCourses,
  onCourse,
}: {
  course: Course
  onStart: (id: LessonId) => void
  onModule: (id: string) => void
  onTool: (view: CourseTool) => void
  onCourses: () => void
  onCourse: (id: string) => void
}) {
  const { completed, lastLessonByCourse, scores } = useCourseStore()
  const [query, setQuery] = useState('')
  const courseLessonIds = useMemo(() => new Set(course.lessons.map((lesson) => lesson.id)), [course])
  const courseCompleted = completed.filter((id) => courseLessonIds.has(id))
  const percent = course.lessons.length ? (courseCompleted.length / course.lessons.length) * 100 : 0
  const normalized = query.trim().toLowerCase()
  const results = useMemo(
    () =>
      normalized.length < 2
        ? []
        : course.lessons
            .filter((lesson) =>
              [lesson.title, lesson.shortTitle, lesson.description].some((value) =>
                value.toLowerCase().includes(normalized),
              ),
            )
            .slice(0, 8),
    [course, normalized],
  )
  const storedLastLesson = lastLessonByCourse[course.id]
  const resume =
    storedLastLesson && course.lessons.some((lesson) => lesson.id === storedLastLesson)
      ? storedLastLesson
      : course.lessons[0]?.id
  const started = courseCompleted.length > 0
  const scrollToModules = () => document.getElementById('moduly')?.scrollIntoView({ behavior: 'smooth' })
  const start = () => (resume ? onStart(resume) : scrollToModules())

  return (
    <div className={h('home')} style={courseThemeStyle(course.theme)}>
      <SiteHeader
        courses={courses}
        activeCourse={course}
        mode="course"
        startLabel={resume ? undefined : 'Zobacz plan'}
        onHome={onCourses}
        onStart={start}
        onTool={onTool}
        onCourse={onCourse}
      />
      <main>
        <section className={h('hero')}>
          <div className={h('hero-copy')}>
            <div className={h('eyebrow')}>
              <span /> {course.eyebrow.toUpperCase()}
            </div>
            <h1>
              {course.marketing.headlineLead}
              <br />
              <em>{course.marketing.headlineAccent}</em>
            </h1>
            <p>{course.marketing.promise}</p>
            <div className={h('hero-actions')}>
              <button className={h('button button-primary')} onClick={start}>
                <Play size={17} fill="currentColor" />
                {resume ? (started ? 'Wróć do laboratorium' : 'Wejdź do laboratorium') : 'Zobacz plan modułów'}
              </button>
              <span>
                {course.modules.length} modułów <i />{' '}
                {course.lessons.length ? `${course.lessons.length} lekcji` : 'lekcje w przygotowaniu'}{' '}
                {course.totalDuration > 0 && (
                  <>
                    <i /> {Math.round(course.totalDuration / 60)} godzin
                  </>
                )}
              </span>
            </div>
            <div className={h('hero-trust')}>
              <span>
                <Check size={15} /> od absolutnych podstaw
              </span>
              <span>
                <Check size={15} /> animowane zadania
              </span>
              <span>
                <Check size={15} /> własne tempo
              </span>
            </div>
          </div>
          <CoursePreview courses={[course]} activeCourseId={course.id} showTabs={false} />
        </section>
        <section className={h('method')} id="metoda">
          <div className={h('section-heading')}>
            <span className={h('section-kicker')}>METODA, KTÓRA DZIAŁA</span>
            <h2>Najpierw intuicja. Potem wzór.</h2>
            <p>Każda lekcja jest małym eksperymentem z konkretnym celem.</p>
          </div>
          <div className={h('method-grid')}>
            <article>
              <span className={h('method-number')}>01</span>
              <div className={h('method-icon')}>
                <MousePointer2 />
              </div>
              <h3>Przewiduj i eksperymentuj</h3>
              <p>Zanim poznasz odpowiedź, postaw hipotezę. Potem steruj parametrami i obserwuj skutki.</p>
            </article>
            <article>
              <span className={h('method-number')}>02</span>
              <div className={h('method-icon')}>
                <FlaskConical />
              </div>
              <h3>Zobacz niewidzialne</h3>
              <p>Animacje łączą odkształcenie, wykres i wzór. Widzisz tę samą historię z trzech stron.</p>
            </article>
            <article>
              <span className={h('method-number')}>03</span>
              <div className={h('method-icon')}>
                <Award />
              </div>
              <h3>Sprawdź i wyjaśnij</h3>
              <p>Pytania z podpowiedziami, trening liczbowy i kolokwium próbne utrwalają aktywne przypominanie.</p>
            </article>
          </div>
        </section>
        <section className={h('chapters')} id="moduly">
          <div className={h('chapters-heading')}>
            <div>
              <span className={h('section-kicker')}>
                {course.status === 'planned' ? 'PLAN KURSU' : 'TWOJA ŚCIEŻKA'}
              </span>
              <h2>
                {course.status === 'planned'
                  ? 'Moduły, które dołączą wkrótce.'
                  : 'Od pierwszej siły do pełnego obrazu.'}
              </h2>
            </div>
            {course.lessons.length > 0 && (
              <div className={h('overall-progress')}>
                <span>
                  {courseCompleted.length} z {course.lessons.length} ukończone · {Math.round(percent)}%
                </span>
                <CourseProgress value={percent} />
              </div>
            )}
          </div>
          {course.lessons.length > 0 && (
            <label className={h('search-field home-search')}>
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Szukaj lekcji, wzoru lub pojęcia…"
                aria-label="Szukaj w kursie"
              />
            </label>
          )}
          {results.length > 0 && (
            <div className={h('search-results')}>
              {results.map((lesson) => (
                <button key={lesson.id} onClick={() => onStart(lesson.id)}>
                  <span>{course.modules.find((module) => module.id === lesson.moduleId)?.shortTitle}</span>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.totalMinutes} min</small>
                  <ChevronRight size={15} />
                </button>
              ))}
            </div>
          )}
          <div className={h('module-grid')}>
            {course.modules.map((module, index) => {
              const Icon = moduleIcons[index % moduleIcons.length]
              const done = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
              const planned = module.status === 'planned' || module.lessons.length === 0
              const modulePercent = module.lessons.length ? (done / module.lessons.length) * 100 : 0
              const bestScore = Math.max(0, ...module.lessons.map((lesson) => scores[lesson.id] ?? 0))
              return (
                <article className={cx(h('module-card'), planned && h('planned'))} key={module.id}>
                  <button className={h('module-card-main')} onClick={() => onModule(module.id)}>
                    <span
                      className={cx(
                        h('chapter-icon'),
                        module.lessons.length > 0 && done === module.lessons.length && h('done'),
                      )}
                    >
                      {done === module.lessons.length && module.lessons.length > 0 ? <Check /> : <Icon />}
                    </span>
                    <span className={h('module-copy')}>
                      <small>
                        MODUŁ {String(module.number).padStart(2, '0')} ·{' '}
                        {planned
                          ? 'W PRZYGOTOWANIU'
                          : `${module.lessons.length} LEKCJI · ${module.lessons.reduce((sum, lesson) => sum + lesson.totalMinutes, 0)} MIN`}
                      </small>
                      <strong>{module.title}</strong>
                      <span>{module.description}</span>
                    </span>
                    <span className={h('chapter-action')}>
                      {planned ? 'Plan' : done ? `${done}/${module.lessons.length}` : 'Otwórz'}
                      <ChevronRight />
                    </span>
                  </button>
                  <div className={h('module-progress')}>
                    <CourseProgress value={modulePercent} />
                    <span>
                      {planned
                        ? 'Lekcje w przygotowaniu'
                        : done === 0
                          ? 'Nie rozpoczęty'
                          : done === module.lessons.length
                            ? `Ukończony${bestScore ? ` · najlepszy wynik ${bestScore}%` : ''}`
                            : `${done} z ${module.lessons.length} lekcji`}
                    </span>
                  </div>
                  {module.lessons.length > 0 ? (
                    <div className={h('module-lessons')}>
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          className={completed.includes(lesson.id) ? h('done') : undefined}
                          onClick={() => onStart(lesson.id)}
                        >
                          {completed.includes(lesson.id) ? <Check size={12} /> : <span>{lesson.number}</span>}
                          {lesson.shortTitle}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className={h('module-lessons')}>
                      <span className={h('module-planned')}>Lekcje pojawią się wraz z publikacją modułu.</span>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </section>
        <section className={h('tools-section')} id="narzedzia">
          <div className={h('section-heading')}>
            <span className={h('section-kicker')}>NARZĘDZIA</span>
            <h2>Ucz się, licz i sprawdzaj.</h2>
            <p>Tryby wspierające ten kurs: od luźnego treningu po warunki kolokwium i bibliotekę źródeł.</p>
          </div>
          <div className={h('tool-grid')}>
            {toolCards.map(({ view, icon: Icon, title, description }) => {
              const available = course.tools[view]
              return (
                <button key={view} onClick={() => available && onTool(view)} disabled={!available}>
                  <Icon />
                  <strong>
                    {title}
                    {!available && <small className={h('tool-soon')}>wkrótce</small>}
                  </strong>
                  <span>{description}</span>
                </button>
              )
            })}
          </div>
        </section>
        <section className={h('research-note')}>
          <ShieldCheck />
          <div>
            <strong>Nauka oparta na dobrych wzorcach, nie na przypadku.</strong>
            <p>
              Sterowana eksploracja, natychmiastowa informacja zwrotna, animowane przykłady i aktywne przypominanie —
              zasady inspirowane badaniami PhET i nauką o uczeniu się.
            </p>
          </div>
          <span>
            Kurs ma charakter edukacyjny. Modele są uproszczone i nie służą do projektowania rzeczywistych konstrukcji.
          </span>
        </section>
      </main>
      <footer className={h('footer')}>
        <Logo onClick={onCourses} subtitle={course.shortTitle} />
        <div className={h('footer-meta')}>
          <Link className={h('footer-link')} to="/issues">
            Zgłoś problem na GitHubie
          </Link>
          {import.meta.env.DEV && (
            <a className={h('debug-link')} href={`${import.meta.env.BASE_URL}debug/labs`}>
              Debug laboratoriów
            </a>
          )}
        </div>
        <div className={h('footer-note')}>
          <span>Treści wspomagane AI — mogą zawierać błędy.</span>
          <span>Mniej zapamiętywania. Więcej rozumienia.</span>
        </div>
      </footer>
    </div>
  )
}
