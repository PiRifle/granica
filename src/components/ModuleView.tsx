import { lazy, Suspense, useMemo } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Circle, Clock, GraduationCap, ListChecks } from 'lucide-react'
import { modules } from '../content/course'
import { useCourseStore } from '../store'
import type { CourseModule, LessonId } from '../types'
import { mdxComponents } from '../mdx/components'
import contentStyles from '../mdx/Content.module.css'
import { CourseProgress } from './UI'
import { Logo } from './Logo'
import styles from './ModuleView.module.css'

const cx = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ')

export function ModuleView({
  module,
  onBack,
  onLesson,
}: {
  module: CourseModule
  onBack: () => void
  onLesson: (id: LessonId) => void
}) {
  const completed = useCourseStore((state) => state.completed)
  const done = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
  const percent = (done / module.lessons.length) * 100
  const nextLesson = module.lessons.find((lesson) => !completed.includes(lesson.id)) ?? module.lessons[0]
  const position = modules.findIndex((entry) => entry.id === module.id)
  const previous = modules[position - 1]
  const following = modules[position + 1]
  const Body = useMemo(() => (module.loadOverview ? lazy(module.loadOverview) : null), [module.id, module.loadOverview])

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <Logo onClick={onBack} />
        <button className={styles.back} onClick={onBack}>
          <ArrowLeft size={16} />
          Wszystkie moduły
        </button>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>
              MODUŁ {String(module.number).padStart(2, '0')} · {module.lessons.length} LEKCJI ·{' '}
              {module.lessons.reduce((sum, lesson) => sum + lesson.totalMinutes, 0)} MIN
            </span>
            <h1>{module.title}</h1>
            <p>{module.description}</p>
            <div className={styles.heroActions}>
              <button className={styles.primary} onClick={() => onLesson(nextLesson.id)}>
                <BookOpen size={17} />
                {done === 0
                  ? 'Zacznij od pierwszej lekcji'
                  : done === module.lessons.length
                    ? 'Powtórz moduł'
                    : 'Kontynuuj naukę'}
                <ArrowRight size={17} />
              </button>
              <span className={styles.progressLabel}>
                <strong>{done}</strong> / {module.lessons.length} lekcji · {Math.round(percent)}%
              </span>
            </div>
            <CourseProgress value={percent} />
          </div>
          <div className={styles.heroAside}>
            <span className={styles.heroIcon}>
              <GraduationCap />
            </span>
            <strong>Po tym module będziesz umieć</strong>
            <ul>
              {module.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className={styles.layout}>
          <article className={styles.article}>
            <div className={styles.articleHead}>
              <span className={styles.kicker}>WPROWADZENIE DO MODUŁU</span>
              <h2>O czym jest ten moduł i po co go przechodzić</h2>
            </div>
            {Body ? (
              <div className={contentStyles.content}>
                <Suspense fallback={<p>Ładowanie wprowadzenia…</p>}>
                  <Body components={mdxComponents} />
                </Suspense>
              </div>
            ) : (
              <p>Wprowadzenie do tego modułu jest w przygotowaniu.</p>
            )}
          </article>

          <aside className={styles.aside}>
            <section className={styles.asideCard}>
              <span className={styles.asideTitle}>
                <ListChecks size={17} /> Mapa lekcji
              </span>
              <ol className={styles.lessonList}>
                {module.lessons.map((lesson) => {
                  const isDone = completed.includes(lesson.id)
                  return (
                    <li key={lesson.id}>
                      <button
                        className={cx(styles.lessonButton, isDone && styles.lessonDone)}
                        onClick={() => onLesson(lesson.id)}
                      >
                        <span className={styles.lessonNumber}>
                          {isDone ? <CheckCircle2 size={17} /> : lesson.number}
                        </span>
                        <span className={styles.lessonCopy}>
                          <strong>{lesson.title}</strong>
                          <small>{lesson.description}</small>
                          <span>
                            <Clock size={12} /> {lesson.totalMinutes} min
                          </span>
                        </span>
                        <ArrowRight size={15} />
                      </button>
                    </li>
                  )
                })}
              </ol>
            </section>

            <section className={styles.asideCard}>
              <span className={styles.asideTitle}>
                <Circle size={16} /> Jak przejść ten moduł
              </span>
              <ol className={styles.steps}>
                <li>Przeczytaj wprowadzenie i sprawdź, czego już nie pamiętasz.</li>
                <li>Przejdź lekcje po kolei — każda kończy się krótkim quizem.</li>
                <li>Po lekcjach wróć do laboratoriów i zmień parametry na skrajne.</li>
                <li>Rozwiąż kilka zadań z literatury, zanim przejdziesz dalej.</li>
              </ol>
            </section>
          </aside>
        </div>

        <nav className={styles.moduleNav} aria-label="Nawigacja między modułami">
          {previous ? (
            <button onClick={() => onLesson(previous.lessons[0].id)}>
              <ArrowLeft size={16} />
              <span>
                <small>Poprzedni moduł</small>
                {previous.title}
              </span>
            </button>
          ) : (
            <span />
          )}
          {following ? (
            <button onClick={() => onLesson(following.lessons[0].id)}>
              <span>
                <small>Następny moduł</small>
                {following.title}
              </span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={onBack}>
              <span>
                <small>Koniec ścieżki</small>
                Wróć do wszystkich modułów
              </span>
              <ArrowRight size={16} />
            </button>
          )}
        </nav>
      </main>
    </div>
  )
}
