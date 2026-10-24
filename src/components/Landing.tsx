import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  ChevronRight,
  FlaskConical,
  Layers3,
  MousePointer2,
  Play,
  Sparkles,
  Target,
  WifiOff,
} from 'lucide-react'
import { CoursePreview } from './CoursePreview'
import { CourseProgress } from './UI'
import { Logo } from './Logo'
import { SiteHeader } from './SiteHeader'
import { courses, defaultCourse } from '../content/course'
import { courseThemeStyle } from '../lib/courseTheme'
import { useCourseStore } from '../store'
import type { Course } from '../types'
import home from './Home.module.css'
import { classNames, cx } from '../lib/css'

const h = classNames(home)

const toolHighlights = [
  { icon: FlaskConical, label: '23 laboratoria', detail: 'zmieniasz parametr i widzisz skutek' },
  { icon: Play, label: 'animowane rozwiązania', detail: 'krok po kroku, bez zgadywania' },
  { icon: Target, label: '210 pytań', detail: 'trening i kolokwium próbne' },
  { icon: WifiOff, label: 'offline', detail: 'po pierwszym wczytaniu działa bez sieci' },
]

export function Landing({
  onCourse,
  onResume,
  onFirstLesson,
}: {
  onCourse: (id: string) => void
  onResume: () => void
  onFirstLesson: () => void
}) {
  const { completed, lastCourseId } = useCourseStore()
  const [previewCourseId, setPreviewCourseId] = useState(
    courses.some((course) => course.id === lastCourseId) ? lastCourseId : defaultCourse.id,
  )
  const resumeCourse = courses.find((course) => course.id === lastCourseId) ?? defaultCourse
  const firstLesson = defaultCourse.lessons[0]
  const resumeStarted = resumeCourse.lessons.some((lesson) => completed.includes(lesson.id))
  const scrollToCourses = () => document.getElementById('kursy')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className={h('home')}>
      <SiteHeader
        courses={courses}
        mode="landing"
        onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onStart={resumeStarted ? onResume : scrollToCourses}
        onTool={() => undefined}
        onCourse={onCourse}
      />
      <main>
        <section className={h('landing-hero')}>
          <div className={h('landing-copy')}>
            <div className={h('eyebrow')}>
              <span /> STATYKA · WYTRZYMAŁOŚĆ · JEDEN SUWAK
            </div>
            <h1 className={h('landing-title')}>
              <span>Przesuń.</span>
              <span className={h('accent')}>Zobacz.</span>
              <span className={h('highlight')}>Zrozum.</span>
            </h1>
            <p>
              Mechanika bez ścian tekstu. Przesuń suwak, zobacz, co się gnie, i policz dopiero wtedy, gdy obraz ma sens.
            </p>
            <div className={h('hero-actions')}>
              <button className={h('button button-primary')} onClick={scrollToCourses}>
                Wybierz kurs
                <ArrowRight size={17} />
              </button>
              {resumeStarted && (
                <button className={h('button button-quiet')} onClick={onResume}>
                  <Play size={16} fill="currentColor" />
                  Kontynuuj: {resumeCourse.shortTitle}
                </button>
              )}
            </div>
            <p className={h('landing-micro')}>Bez konta. Bez rozgrzewki. Zaczynasz od pierwszej lekcji.</p>
            <div className={h('hero-trust')}>
              <span>
                <Check size={15} /> interaktywne lekcje
              </span>
              <span>
                <Check size={15} /> krótkie porcje
              </span>
              <span>
                <Check size={15} /> własne tempo
              </span>
            </div>
          </div>
          <div className={h('landing-preview')}>
            <CoursePreview courses={courses} activeCourseId={previewCourseId} onCourseChange={setPreviewCourseId} />
            <div className={h('landing-story')}>
              <span className={h('section-kicker')}>DLACZEGO TO POWSTAŁO</span>
              <p>
                Granica zaczęła się od frustracji: na wykładzie wszystko wyglądało logicznie, a w domu zostawała ściana
                wzorów. Chcieliśmy najpierw zobaczyć, co naprawdę robi siła.
              </p>
              <p>
                Dlatego każdy temat zaczyna się od ruchu, a nie od wzoru. Inspiracją były wizualne wykłady 3Blue1Brown —
                z tą różnicą, że tutaj możesz wejść w środek przykładu i zmienić jego parametry.
              </p>
            </div>
          </div>
        </section>

        <section className={h('landing-courses')} id="kursy">
          <div className={h('section-heading')}>
            <span className={h('section-kicker')}>WYBIERZ KURS</span>
            <h2>Dwa przedmioty. Ten sam sposób nauki.</h2>
            <p>Zacznij od fundamentów albo wejdź od razu do pełnego kursu. Reszta jest po twojej stronie.</p>
          </div>
          <div className={h('course-grid')}>
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onCourse={onCourse} />
            ))}
          </div>
        </section>

        <section className={h('method')} id="metoda">
          <div className={h('section-heading')}>
            <span className={h('section-kicker')}>JAK TO DZIAŁA</span>
            <h2>Trzy ruchy i rozumiesz.</h2>
            <p>Najpierw obraz. Potem wzór. Na końcu zadanie.</p>
          </div>
          <div className={h('method-grid')}>
            <article>
              <span className={h('method-number')}>01</span>
              <div className={h('method-icon')}>
                <MousePointer2 />
              </div>
              <h3>Przesuń</h3>
              <p>Zmień siłę, kąt albo przekrój. Bez klikania w dziesięć zakładek i bez szukania wzoru w PDF-ie.</p>
            </article>
            <article>
              <span className={h('method-number')}>02</span>
              <div className={h('method-icon')}>
                <FlaskConical />
              </div>
              <h3>Zobacz</h3>
              <p>Konstrukcja reaguje od razu. Belka się gnie, siły się rozkładają, wykres zmienia kształt.</p>
            </article>
            <article>
              <span className={h('method-number')}>03</span>
              <div className={h('method-icon')}>
                <Award />
              </div>
              <h3>Zrozum</h3>
              <p>Wzór i krótkie zadanie układają się w całość. Sprawdzasz się wtedy, gdy obraz jest już jasny.</p>
            </article>
          </div>
        </section>

        <section className={h('landing-features')} id="w-srodku">
          <div className={h('section-heading')}>
            <span className={h('section-kicker')}>W ŚRODKU</span>
            <h2>Konkret, nie ściana tekstu.</h2>
            <p>Każda lekcja: jedna idea, jeden eksperyment, jeden quiz.</p>
          </div>
          <div className={h('feature-grid')}>
            {toolHighlights.map(({ icon: Icon, label, detail }) => (
              <article key={label}>
                <Icon />
                <strong>{label}</strong>
                <span>{detail}</span>
              </article>
            ))}
          </div>
          <div className={h('landing-stats')}>
            <span>
              <Layers3 size={16} /> 10 modułów w wytrzymałości
            </span>
            <span>
              <BookOpen size={16} /> 7 modułów w planie statyki
            </span>
            <span>
              <Sparkles size={16} /> nowe lekcje bez przepisywania strony
            </span>
          </div>
        </section>

        <section className={h('landing-final')}>
          <div>
            <span className={h('section-kicker')}>PIERWSZA LEKCJA · {firstLesson.readingMinutes} MIN</span>
            <h2>{firstLesson.title}</h2>
            <p>{firstLesson.description}</p>
            <div className={h('landing-unit-chips')}>
              <span>1 kN = 1000 N</span>
              <span>1 MPa = 1 N/mm²</span>
              <span>1 m = 1000 mm</span>
            </div>
          </div>
          <div className={h('landing-final-actions')}>
            <button
              className={h('button button-primary')}
              style={courseThemeStyle(defaultCourse.theme)}
              onClick={onFirstLesson}
            >
              <Play size={15} fill="currentColor" />
              Otwórz pierwszą lekcję
            </button>
            <button className={h('landing-text-link')} onClick={() => onCourse('statyka')}>
              Statyka w przygotowaniu
              <ChevronRight size={14} />
            </button>
          </div>
        </section>
      </main>
      <footer className={h('footer')}>
        <Logo onClick={() => window.scrollTo({ top: 0 })} dotColor="var(--orange)" />
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
          <span>Kurs edukacyjny. Modele uproszczone — nie do projektowania rzeczywistych konstrukcji.</span>
        </div>
      </footer>
    </div>
  )
}

function CourseCard({ course, onCourse }: { course: Course; onCourse: (id: string) => void }) {
  const completed = useCourseStore((state) => state.completed)
  const done = course.lessons.filter((lesson) => completed.includes(lesson.id)).length
  const percent = course.lessons.length ? (done / course.lessons.length) * 100 : 0
  return (
    <article
      className={cx(h('course-card'), course.status === 'planned' && h('planned'))}
      style={courseThemeStyle(course.theme)}
    >
      <div className={h('course-card-top')}>
        <span className={cx(h('course-badge'), course.status === 'planned' && h('planned'))}>
          {course.marketing.statusLabel}
        </span>
        <span className={h('course-number')}>{course.marketing.visual === 'beam' ? '01' : '02'}</span>
      </div>
      <button className={h('course-card-main')} onClick={() => onCourse(course.id)}>
        <h3>{course.title}</h3>
        <strong className={h('course-tagline')}>{course.marketing.tagline}</strong>
        <p>{course.description}</p>
        <span className={h('course-audience')}>{course.marketing.audience}</span>
      </button>
      <div className={h('course-card-stats')}>
        {course.marketing.highlights.map((highlight) => (
          <span key={highlight}>{highlight}</span>
        ))}
      </div>
      {done > 0 && (
        <div className={h('course-card-progress')}>
          <CourseProgress value={percent} />
          <span>
            {done} z {course.lessons.length} ukończonych
          </span>
        </div>
      )}
      <div className={h('course-card-foot')}>
        <button className={h('course-card-cta')} onClick={() => onCourse(course.id)}>
          {course.marketing.ctaLabel}
          <ArrowRight size={16} />
        </button>
        {course.marketing.crossSell && <small>{course.marketing.crossSell}</small>}
      </div>
    </article>
  )
}
