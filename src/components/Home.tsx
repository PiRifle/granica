import { useMemo, useState } from 'react'
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
import { getModuleForLesson, lessons, modules, totalDuration } from '../content/course'
import { useCourseStore } from '../store'
import type { LessonId } from '../types'
import type { View } from '../lib/navigation'
import { CourseProgress } from './UI'
import { Logo } from './Logo'
import { SiteHeader } from './SiteHeader'
import { HeroGraphic } from './HeroGraphic'
import home from './Home.module.css'
import { classNames, cx } from '../lib/css'

const h = classNames(home)
const moduleIcons = [Layers3, Zap, Thermometer, Atom, RotateCw, BookOpen, Sparkles, Gauge, ShieldCheck, Award]

export function Home({ onStart, onTool }: { onStart: (id: LessonId) => void; onTool: (view: View) => void }) {
  const { completed, lastLesson, scores } = useCourseStore()
  const [query, setQuery] = useState('')
  const percent = (completed.length / lessons.length) * 100
  const normalized = query.trim().toLowerCase()
  const results = useMemo(
    () =>
      normalized.length < 2
        ? []
        : lessons
            .filter((lesson) =>
              [lesson.title, lesson.shortTitle, lesson.description].some((value) =>
                value.toLowerCase().includes(normalized),
              ),
            )
            .slice(0, 8),
    [normalized],
  )
  const resume = lastLesson && lessons.some((lesson) => lesson.id === lastLesson) ? lastLesson : lessons[0].id

  return (
    <div className={h('home')}>
      <SiteHeader
        onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onStart={() => onStart(resume)}
        onTool={onTool}
      />
      <main>
        <section className={h('hero')}>
          <div className={h('hero-copy')}>
            <div className={h('eyebrow')}>
              <span /> KURS OD ZERA · 10 MODUŁÓW · PEŁNY SYLABUS
            </div>
            <h1>
              Zobacz, co czuje
              <br />
              <em>materiał.</em>
            </h1>
            <p>
              Wytrzymałość materiałów przez eksperymenty, animowane rozwiązania i policzalne zadania. Dotknij siły,
              zmień kształt i zobacz, skąd naprawdę biorą się wzory.
            </p>
            <div className={h('hero-actions')}>
              <button className={h('button button-primary')} onClick={() => onStart(resume)}>
                <Play size={17} fill="currentColor" />
                {completed.length ? 'Kontynuuj naukę' : 'Uruchom pierwszą lekcję'}
              </button>
              <span>
                {modules.length} modułów <i /> {lessons.length} lekcji <i /> {Math.round(totalDuration / 60)} godzin
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
          <HeroGraphic />
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
              <span className={h('section-kicker')}>TWOJA ŚCIEŻKA</span>
              <h2>Od pierwszej siły do pełnego obrazu.</h2>
            </div>
            <div className={h('overall-progress')}>
              <span>
                {completed.length} z {lessons.length} ukończone · {Math.round(percent)}%
              </span>
              <CourseProgress value={percent} />
            </div>
          </div>
          <label className={h('search-field home-search')}>
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Szukaj lekcji, wzoru lub pojęcia…"
              aria-label="Szukaj w kursie"
            />
          </label>
          {results.length > 0 && (
            <div className={h('search-results')}>
              {results.map((lesson) => (
                <button key={lesson.id} onClick={() => onStart(lesson.id)}>
                  <span>{getModuleForLesson(lesson).shortTitle}</span>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.duration} min</small>
                  <ChevronRight size={15} />
                </button>
              ))}
            </div>
          )}
          <div className={h('module-grid')}>
            {modules.map((module, index) => {
              const Icon = moduleIcons[index % moduleIcons.length]
              const done = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
              const modulePercent = (done / module.lessons.length) * 100
              const next = module.lessons.find((lesson) => !completed.includes(lesson.id)) ?? module.lessons[0]
              const bestScore = Math.max(...module.lessons.map((lesson) => scores[lesson.id] ?? 0))
              return (
                <article className={h('module-card')} key={module.id}>
                  <button className={h('module-card-main')} onClick={() => onStart(next.id)}>
                    <span className={cx(h('chapter-icon'), done === module.lessons.length && h('done'))}>
                      {done === module.lessons.length ? <Check /> : <Icon />}
                    </span>
                    <span className={h('module-copy')}>
                      <small>
                        MODUŁ {String(module.number).padStart(2, '0')} · {module.lessons.length} LEKCJI ·{' '}
                        {module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)} MIN
                      </small>
                      <strong>{module.title}</strong>
                      <span>{module.description}</span>
                    </span>
                    <span className={h('chapter-action')}>
                      {done ? `${done}/${module.lessons.length}` : 'Zacznij'}
                      <ChevronRight />
                    </span>
                  </button>
                  <div className={h('module-progress')}>
                    <CourseProgress value={modulePercent} />
                    <span>
                      {done === 0
                        ? 'Nie rozpoczęty'
                        : done === module.lessons.length
                          ? `Ukończony${bestScore ? ` · najlepszy wynik ${bestScore}%` : ''}`
                          : `${done} z ${module.lessons.length} lekcji`}
                    </span>
                  </div>
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
                </article>
              )
            })}
          </div>
        </section>
        <section className={h('tools-section')} id="narzedzia">
          <div className={h('section-heading')}>
            <span className={h('section-kicker')}>NARZĘDZIA</span>
            <h2>Ucz się, licz i sprawdzaj.</h2>
            <p>Cztery tryby wspierające kurs: od luźnego treningu po warunki kolokwium.</p>
          </div>
          <div className={h('tool-grid')}>
            <button onClick={() => onTool('training')}>
              <Target />
              <strong>Trening liczbowy</strong>
              <span>Losowe dane, 9 typów zadań, tolerancja i pełne rozwiązania.</span>
            </button>
            <button onClick={() => onTool('exam')}>
              <Clock />
              <strong>Kolokwium próbne</strong>
              <span>20 pytań, 20 minut, wynik według modułów i efektów.</span>
            </button>
            <button onClick={() => onTool('cheatsheet')}>
              <BookOpen />
              <strong>Ściąga</strong>
              <span>Wszystkie wzory, jednostki i najważniejsze wnioski.</span>
            </button>
            <button onClick={() => onTool('syllabus')}>
              <ClipboardList />
              <strong>Mapa sylabusa</strong>
              <span>Pokrycie karty przedmiotu i efekty W1–W3, U1–U3.</span>
            </button>
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
        <Logo onClick={() => window.scrollTo({ top: 0 })} />
        <span>Mniej zapamiętywania. Więcej rozumienia.</span>
      </footer>
    </div>
  )
}
