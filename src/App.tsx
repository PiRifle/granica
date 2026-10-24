import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Atom, Award, BookOpen, Check, CheckCircle2,
  ChevronRight, ClipboardList, Clock, FlaskConical, Gauge, Layers3, Lightbulb,
  Menu, MousePointer2, Play, RotateCw, Search, ShieldCheck, Sparkles,
  Target, Thermometer, X, Zap,
} from 'lucide-react'
import {
  getLesson, getModuleForLesson, getSolution, lessons, lessonIds, lessonIndex,
  modules, totalDuration,
} from './data/course'
import { useCourseStore } from './store'
import type { CourseLesson, Lesson, LessonId } from './types'
import { CourseProgress } from './components/UI'
import { labRegistry } from './components/LabRegistry'
import { SolutionPlayer } from './components/SolutionPlayer'
import { Training } from './components/Training'
import { Exam } from './components/Exam'
import { CheatSheet, SyllabusMap } from './components/StudyTools'
import { LessonBody } from './mdx/LessonBody'
import home from './App.module.css'
import lessonView from './LessonView.module.css'

type View = 'home' | 'lesson' | 'training' | 'exam' | 'cheatsheet' | 'syllabus'

const cx = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ')
const local = (names: string) => names.split(/\s+/).filter(Boolean).map((name) => home[name] ?? lessonView[name] ?? name).join(' ')

const moduleIcons = [Layers3, Zap, Thermometer, Atom, RotateCw, BookOpen, Sparkles, Gauge, ShieldCheck, Award]

function Logo({ onClick }: { onClick: () => void }) {
  return <button className={local('logo')} onClick={onClick} aria-label="Strona główna kursu">
    <span className={local('logo-mark')}><span /><span /><span /></span>
    <span>wytrzymałość<small>interaktywnie</small></span>
  </button>
}

function Header({ onHome, onStart, onTool }: { onHome: () => void; onStart: () => void; onTool: (view: View) => void }) {
  const completed = useCourseStore((state) => state.completed)
  return <header className={local('site-header')}>
    <Logo onClick={onHome} />
    <nav aria-label="Główna nawigacja"><a href="#metoda">Jak się uczymy</a><a href="#moduly">Moduły</a><a href="#narzedzia">Narzędzia</a></nav>
    <div className={local('header-actions')}>
      <button className={local('button button-quiet button-small')} onClick={() => onTool('training')}><Target size={15} />Trening</button>
      <button className={local('button button-dark button-small')} onClick={onStart}>{completed.length ? 'Wróć do kursu' : 'Zacznij naukę'}<ArrowRight size={16} /></button>
    </div>
  </header>
}

function HeroGraphic() {
  return <div className={local('hero-graphic')} aria-label="Animowana belka pokazująca odkształcenie pod siłą">
    <div className={local('hero-card-top')}><span><i /> SYMULACJA</span><small>spróbuj sam</small></div>
    <svg viewBox="0 0 540 300" role="img" aria-label="Belka uginająca się pod przyłożoną siłą">
      <defs><linearGradient id="heroBeam" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d8ef9c" /><stop offset="1" stopColor="#a7cf4c" /></linearGradient></defs>
      {[80, 130, 180, 230, 280, 330, 380, 430].map((x) => <line key={x} x1={x} x2={x} y1="45" y2="245" stroke="#e4e6df" strokeWidth="1" />)}
      {[70, 120, 170, 220].map((y) => <line key={y} x1="45" x2="495" y1={y} y2={y} stroke="#e4e6df" strokeWidth="1" />)}
      <motion.g animate={{ y: [0, 16, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
        <line x1="270" x2="270" y1="42" y2="112" stroke="#e77451" strokeWidth="3" />
        <path d="M258 99 L270 116 L282 99" fill="none" stroke="#e77451" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="228" y="22" width="84" height="28" rx="14" fill="#fff4ec" /><text x="270" y="41" textAnchor="middle" fill="#c95c3d" fontSize="13" fontWeight="700">siła F</text>
      </motion.g>
      <motion.path d="M90 145 Q270 145 450 145" animate={{ d: ['M90 145 Q270 145 450 145', 'M90 145 Q270 204 450 145', 'M90 145 Q270 145 450 145'] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }} fill="none" stroke="url(#heroBeam)" strokeWidth="17" strokeLinecap="round" />
      <path d="M75 162 L90 145 L105 162 Z M435 162 L450 145 L465 162 Z" fill="#72776c" />
      <line x1="60" x2="480" y1="164" y2="164" stroke="#72776c" strokeWidth="2" />
      <motion.g animate={{ opacity: [0, 1, 0], y: [5, 0, 5] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M387 184 L387 224 M380 217 L387 225 L394 217" stroke="#69705f" fill="none" strokeWidth="2" />
        <rect x="326" y="231" width="122" height="27" rx="8" fill="#fff" /><text x="387" y="249" textAnchor="middle" fill="#5f6657" fontSize="12">odkształcenie</text>
      </motion.g>
    </svg>
    <div className={local('hero-card-bottom')}><span className={local('mini-icon')}><MousePointer2 size={16} /></span><span><strong>Nie tylko czytasz.</strong><small>Zmieniasz. Obserwujesz. Rozumiesz.</small></span></div>
    <motion.div className={local('floating-note')} animate={{ y: [-4, 5, -4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><Lightbulb size={18} /><span><small>Wniosek</small>Belka pracuje nawet bez ruchu</span></motion.div>
  </div>
}

function Home({ onStart, onTool }: { onStart: (id: LessonId) => void; onTool: (view: View) => void }) {
  const { completed, lastLesson, scores } = useCourseStore()
  const [query, setQuery] = useState('')
  const percent = completed.length / lessons.length * 100
  const normalized = query.trim().toLowerCase()
  const results = useMemo(() => normalized.length < 2 ? [] : lessons.filter((lesson) =>
    [lesson.title, lesson.shortTitle, lesson.description, lesson.formula, lesson.insight]
      .some((value) => value.toLowerCase().includes(normalized))).slice(0, 8), [normalized])
  const resume = lastLesson && lessons.some((lesson) => lesson.id === lastLesson) ? lastLesson : lessons[0].id

  return <div className={local('home')}>
    <Header onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onStart={() => onStart(resume)} onTool={onTool} />
    <main>
      <section className={local('hero')}>
        <div className={local('hero-copy')}><div className={local('eyebrow')}><span /> KURS OD ZERA · 10 MODUŁÓW · PEŁNY SYLABUS</div><h1>Zobacz, co czuje<br /><em>materiał.</em></h1><p>Wytrzymałość materiałów przez eksperymenty, animowane rozwiązania i policzalne zadania. Dotknij siły, zmień kształt i zobacz, skąd naprawdę biorą się wzory.</p><div className={local('hero-actions')}><button className={local('button button-primary')} onClick={() => onStart(resume)}><Play size={17} fill="currentColor" />{completed.length ? 'Kontynuuj naukę' : 'Uruchom pierwszą lekcję'}</button><span>{modules.length} modułów <i /> {lessons.length} lekcji <i /> {Math.round(totalDuration / 60)} godzin</span></div><div className={local('hero-trust')}><span><Check size={15} /> od absolutnych podstaw</span><span><Check size={15} /> animowane zadania</span><span><Check size={15} /> własne tempo</span></div></div>
        <HeroGraphic />
      </section>
      <section className={local('method')} id="metoda"><div className={local('section-heading')}><span className={local('section-kicker')}>METODA, KTÓRA DZIAŁA</span><h2>Najpierw intuicja. Potem wzór.</h2><p>Każda lekcja jest małym eksperymentem z konkretnym celem.</p></div><div className={local('method-grid')}>
        <article><span className={local('method-number')}>01</span><div className={local('method-icon')}><MousePointer2 /></div><h3>Przewiduj i eksperymentuj</h3><p>Zanim poznasz odpowiedź, postaw hipotezę. Potem steruj parametrami i obserwuj skutki.</p></article>
        <article><span className={local('method-number')}>02</span><div className={local('method-icon')}><FlaskConical /></div><h3>Zobacz niewidzialne</h3><p>Animacje łączą odkształcenie, wykres i wzór. Widzisz tę samą historię z trzech stron.</p></article>
        <article><span className={local('method-number')}>03</span><div className={local('method-icon')}><Award /></div><h3>Sprawdź i wyjaśnij</h3><p>Pytania z podpowiedziami, trening liczbowy i kolokwium próbne utrwalają aktywne przypominanie.</p></article>
      </div></section>
      <section className={local('chapters')} id="moduly">
        <div className={local('chapters-heading')}><div><span className={local('section-kicker')}>TWOJA ŚCIEŻKA</span><h2>Od pierwszej siły do pełnego obrazu.</h2></div><div className={local('overall-progress')}><span>{completed.length} z {lessons.length} ukończone · {Math.round(percent)}%</span><CourseProgress value={percent} /></div></div>
        <label className={local('search-field home-search')}><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Szukaj lekcji, wzoru lub pojęcia…" aria-label="Szukaj w kursie" /></label>
        {results.length > 0 && <div className={local('search-results')}>{results.map((lesson) => <button key={lesson.id} onClick={() => onStart(lesson.id)}><span>{getModuleForLesson(lesson).shortTitle}</span><strong>{lesson.title}</strong><small>{lesson.duration} min</small><ChevronRight size={15} /></button>)}</div>}
        <div className={local('module-grid')}>{modules.map((module, index) => {
          const Icon = moduleIcons[index % moduleIcons.length]
          const done = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
          const modulePercent = done / module.lessons.length * 100
          const next = module.lessons.find((lesson) => !completed.includes(lesson.id)) ?? module.lessons[0]
          const bestScore = Math.max(...module.lessons.map((lesson) => scores[lesson.id] ?? 0))
          return <article className={local('module-card')} key={module.id}>
            <button className={local('module-card-main')} onClick={() => onStart(next.id)}>
              <span className={cx(local('chapter-icon'), done === module.lessons.length && local('done'))}>{done === module.lessons.length ? <Check /> : <Icon />}</span>
              <span className={local('module-copy')}><small>MODUŁ {String(module.number).padStart(2, '0')} · {module.lessons.length} LEKCJI · {module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)} MIN</small><strong>{module.title}</strong><span>{module.description}</span></span>
              <span className={local('chapter-action')}>{done ? `${done}/${module.lessons.length}` : 'Zacznij'}<ChevronRight /></span>
            </button>
            <div className={local('module-progress')}><CourseProgress value={modulePercent} /><span>{done === 0 ? 'Nie rozpoczęty' : done === module.lessons.length ? `Ukończony${bestScore ? ` · najlepszy wynik ${bestScore}%` : ''}` : `${done} z ${module.lessons.length} lekcji`}</span></div>
            <div className={local('module-lessons')}>{module.lessons.map((lesson) => <button key={lesson.id} className={completed.includes(lesson.id) ? local('done') : undefined} onClick={() => onStart(lesson.id)}>{completed.includes(lesson.id) ? <Check size={12} /> : <span>{lesson.number}</span>}{lesson.shortTitle}</button>)}</div>
          </article>
        })}</div>
      </section>
      <section className={local('tools-section')} id="narzedzia"><div className={local('section-heading')}><span className={local('section-kicker')}>NARZĘDZIA</span><h2>Ucz się, licz i sprawdzaj.</h2><p>Cztery tryby wspierające kurs: od luźnego treningu po warunki kolokwium.</p></div><div className={local('tool-grid')}>
        <button onClick={() => onTool('training')}><Target /><strong>Trening liczbowy</strong><span>Losowe dane, 9 typów zadań, tolerancja i pełne rozwiązania.</span></button>
        <button onClick={() => onTool('exam')}><Clock /><strong>Kolokwium próbne</strong><span>20 pytań, 20 minut, wynik według modułów i efektów.</span></button>
        <button onClick={() => onTool('cheatsheet')}><BookOpen /><strong>Ściąga</strong><span>Wszystkie wzory, jednostki i najważniejsze wnioski.</span></button>
        <button onClick={() => onTool('syllabus')}><ClipboardList /><strong>Mapa sylabusa</strong><span>Pokrycie karty przedmiotu i efekty W1–W3, U1–U3.</span></button>
      </div></section>
      <section className={local('research-note')}><ShieldCheck /><div><strong>Nauka oparta na dobrych wzorcach, nie na przypadku.</strong><p>Sterowana eksploracja, natychmiastowa informacja zwrotna, animowane przykłady i aktywne przypominanie — zasady inspirowane badaniami PhET i nauką o uczeniu się.</p></div><span>Kurs ma charakter edukacyjny. Modele są uproszczone i nie służą do projektowania rzeczywistych konstrukcji.</span></section>
    </main>
    <footer><Logo onClick={() => window.scrollTo({ top: 0 })} /><span>Mniej zapamiętywania. Więcej rozumienia.</span></footer>
  </div>
}

function Quiz({ lesson, onComplete }: { lesson: Lesson; onComplete: (score: number) => void }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [hint, setHint] = useState(false)
  const question = lesson.questions[index]
  const total = lesson.questions.length
  const answered = selected !== null
  const correct = selected === question.correct
  const score = Math.round(correctCount / total * 100)

  const next = () => {
    const currentCorrect = correctCount + (correct ? 1 : 0)
    if (index === total - 1) {
      setCorrectCount(currentCorrect)
      setFinished(true)
      onComplete(Math.round(currentCorrect / total * 100))
    } else {
      setCorrectCount(currentCorrect)
      setIndex(index + 1)
      setSelected(null)
      setHint(false)
    }
  }

  if (finished) return <motion.section className={local('quiz-result')} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span className={local('result-icon')}><Award /></span><span className={local('section-kicker')}>LEKCJA UKOŃCZONA</span><h2>{correctCount === total ? 'Świetnie — to już rozumiesz.' : correctCount >= Math.ceil(total / 2) ? 'Dobry wynik. Powtórka utrwali wiedzę.' : 'Warto wrócić do laboratorium i spróbować jeszcze raz.'}</h2><p>Twój wynik: <strong>{correctCount} / {total}</strong> ({score}%). Lekcja jest zapisana w Twojej ścieżce.</p><button className={local('button button-dark')} onClick={() => { setIndex(0); setSelected(null); setCorrectCount(0); setFinished(false) }}><RotateCw size={17} />Spróbuj jeszcze raz</button></motion.section>

  return <section className={local('quiz')} id="quiz"><div className={local('quiz-top')}><span className={local('section-kicker')}>SPRAWDŹ, CZY ROZUMIESZ{question.outcome ? ` · ${question.outcome}` : ''}</span><span>{index + 1} / {total}</span></div><h2>{question.question}</h2><div className={local('answers')}>{question.answers.map((answer, answerIndex) => {
    const isSelected = selected === answerIndex
    const isCorrect = answered && answerIndex === question.correct
    return <button key={answer} disabled={answered} onClick={() => setSelected(answerIndex)} className={cx(local('answer'), isCorrect && local('correct'), isSelected && !isCorrect && local('wrong'))}><span className={local('answer-letter')}>{String.fromCharCode(65 + answerIndex)}</span><span>{answer}</span>{isCorrect && <CheckCircle2 />}{isSelected && !isCorrect && <X />}</button>
  })}</div>{!answered && <button className={local('hint-button')} onClick={() => setHint(!hint)}><Lightbulb size={16} />{hint ? question.hint : 'Potrzebuję podpowiedzi'}</button>}<AnimatePresence>{answered && <motion.div className={local(`feedback ${correct ? 'feedback-correct' : 'feedback-wrong'}`)} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><strong>{correct ? 'Dokładnie tak!' : 'Jeszcze nie — spójrz na to tak:'}</strong><p>{question.explanation}</p></motion.div>}</AnimatePresence><button className={local('button button-dark quiz-next')} disabled={!answered} onClick={next}>{index === total - 1 ? 'Zakończ lekcję' : 'Następne pytanie'}<ArrowRight size={17} /></button></section>
}

function LessonView({ lesson, onHome, onLesson, onTool }: { lesson: CourseLesson; onHome: () => void; onLesson: (id: LessonId) => void; onTool: (view: View) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { completed, completeLesson, setLastLesson } = useCourseStore()
  const ActiveLab = labRegistry[lesson.lab]
  const module = getModuleForLesson(lesson)
  const index = lessonIndex(lesson.id)
  const prevLesson = lessons[index - 1]
  const nextLesson = lessons[index + 1]
  const solution = lesson.solutionId ? getSolution(lesson.solutionId) : undefined

  useEffect(() => { setLastLesson(lesson.id); window.scrollTo(0, 0) }, [lesson.id, setLastLesson])

  return <div className={local('lesson-page')}>
    <header className={local('lesson-header')}><Logo onClick={onHome} /><div className={local('lesson-header-progress')}><span>Twój postęp <strong>{completed.length}/{lessons.length}</strong></span><CourseProgress value={completed.length / lessons.length * 100} /></div><button className={local('icon-button mobile-menu')} onClick={() => setMenuOpen(!menuOpen)} aria-label="Pokaż moduły">{menuOpen ? <X /> : <Menu />}</button><button className={local('button button-small button-quiet')} onClick={onHome}><X size={16} />Zamknij lekcję</button></header>
    <div className={local('lesson-layout')}>
      <aside className={cx(local('lesson-sidebar'), menuOpen && local('open'))}><span className={local('sidebar-label')}>TWOJA ŚCIEŻKA · {modules.length} MODUŁÓW</span><nav className={local('sidebar-nav')} aria-label="Lekcje kursu">{modules.map((moduleEntry) => <div key={moduleEntry.id} className={local('sidebar-module')}><span className={local('sidebar-module-title')}>{String(moduleEntry.number).padStart(2, '0')} · {moduleEntry.shortTitle}</span>{moduleEntry.lessons.map((item) => <button key={item.id} className={cx(local('sidebar-lesson'), item.id === lesson.id && local('active'))} onClick={() => { onLesson(item.id); setMenuOpen(false) }}><span className={local('sidebar-number')}>{completed.includes(item.id) ? <Check size={14} /> : item.number}</span><span>{item.shortTitle}<small>{item.duration} min</small></span></button>)}</div>)}</nav><div className={local('sidebar-tip')}><Lightbulb /><strong>Ucz się po swojemu</strong><p>Możesz wracać do eksperymentów. Postęp zapisuje się na tym urządzeniu.</p></div></aside>
      <main className={local('lesson-main')}><div className={local('lesson-breadcrumb')}><button onClick={onHome}>Kurs</button><ChevronRight size={14} /><span>Moduł {module.number}: {module.shortTitle}</span><ChevronRight size={14} /><span>Lekcja {lesson.number}</span></div><div className={local('lesson-title')}><span className={local('section-kicker')}>{lesson.eyebrow.toUpperCase()}</span><h1>{lesson.title}</h1><p>{lesson.description}</p><span className={local('lesson-time')}><BookOpen size={15} /> około {lesson.duration} min · eksperyment + {lesson.questions.length} pytania{solution ? ' + animowane rozwiązanie' : ''}</span></div>
        <motion.div key={`lab-${lesson.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{ActiveLab ? <ActiveLab /> : <div className={local('lab-fallback')}>Laboratorium dla tej lekcji nie jest jeszcze dostępne.</div>}</motion.div>
        <section className={local('explanation')}><div className={local('explanation-heading')}><span className={local('round-icon')}><Lightbulb /></span><div><span className={local('section-kicker')}>CO WŁAŚNIE ZA OBSERWOWAŁEŚ?</span><h2>Wzór jest skrótem obserwacji.</h2></div></div><LessonBody lesson={lesson} /></section>
        {solution && <SolutionPlayer solution={solution} />}
        <Quiz key={lesson.id} lesson={lesson} onComplete={(score) => completeLesson(lesson.id, score)} />
        <div className={local('lesson-navigation')}>{prevLesson ? <button className={local('button button-quiet')} onClick={() => onLesson(prevLesson.id)}><ArrowLeft />Poprzednia</button> : <span />}{nextLesson ? <button className={local('button button-primary')} onClick={() => onLesson(nextLesson.id)}>Następna lekcja<ArrowRight /></button> : <button className={local('button button-primary')} onClick={() => onTool('exam')}>Przejdź do kolokwium<Award /></button>}</div>
      </main>
    </div>
  </div>
}

const toolPaths: Record<'training' | 'exam' | 'cheatsheet' | 'syllabus', string> = {
  training: '/training',
  exam: '/exam',
  cheatsheet: '/cheatsheet',
  syllabus: '/syllabus',
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function HomeRoute() {
  const navigate = useNavigate()
  const openTool = (view: View) => navigate(view === 'home' ? '/' : view === 'lesson' ? '/' : toolPaths[view])
  return <Home onStart={(id) => navigate(`/lesson/${id}`)} onTool={openTool} />
}

function TrainingRoute() {
  const navigate = useNavigate()
  return <Training onBack={() => navigate('/')} />
}

function ExamRoute() {
  const navigate = useNavigate()
  return <Exam onBack={() => navigate('/')} />
}

function CheatSheetRoute() {
  const navigate = useNavigate()
  return <CheatSheet onBack={() => navigate('/')} />
}

function SyllabusRoute() {
  const navigate = useNavigate()
  return <SyllabusMap onBack={() => navigate('/')} />
}

function LessonRoute() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  if (!lessonId || !lessonIds.includes(lessonId)) return <Navigate to="/" replace />
  const openTool = (view: View) => navigate(view === 'home' || view === 'lesson' ? '/' : toolPaths[view])
  return <LessonView
    lesson={getLesson(lessonId)}
    onHome={() => navigate('/')}
    onLesson={(id) => navigate(`/lesson/${id}`)}
    onTool={openTool}
  />
}

export default function App() {
  return <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/lesson/:lessonId" element={<LessonRoute />} />
      <Route path="/training" element={<TrainingRoute />} />
      <Route path="/exam" element={<ExamRoute />} />
      <Route path="/cheatsheet" element={<CheatSheetRoute />} />
      <Route path="/syllabus" element={<SyllabusRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
}

