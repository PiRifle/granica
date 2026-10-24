import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowLeft, ArrowRight, Atom, Award, BookOpen, Check, CheckCircle2,
  ChevronRight, ClipboardList, Clock, FlaskConical, Gauge, Layers3, Lightbulb,
  Menu, MousePointer2, Play, RotateCw, Search, ShieldCheck, Sparkles,
  Target, Thermometer, X, Zap,
} from 'lucide-react'
import {
  getLesson, getModuleForLesson, getSolution, lessons, lessonIndex,
  modules, totalDuration,
} from './data/course'
import { useCourseStore } from './store'
import type { Lesson, LessonId } from './types'
import { CourseProgress, Formula } from './components/UI'
import { labRegistry } from './components/LabRegistry'
import { SolutionPlayer } from './components/SolutionPlayer'
import { Training } from './components/Training'
import { Exam } from './components/Exam'
import { CheatSheet, SyllabusMap } from './components/StudyTools'

type View = 'home' | 'lesson' | 'training' | 'exam' | 'cheatsheet' | 'syllabus'

const moduleIcons = [Layers3, Zap, Thermometer, Atom, RotateCw, BookOpen, Sparkles, Gauge, ShieldCheck, Award]

function Logo({ onClick }: { onClick: () => void }) {
  return <button className="logo" onClick={onClick} aria-label="Strona główna kursu">
    <span className="logo-mark"><span /><span /><span /></span>
    <span>wytrzymałość<small>interaktywnie</small></span>
  </button>
}

function Header({ onHome, onStart, onTool }: { onHome: () => void; onStart: () => void; onTool: (view: View) => void }) {
  const completed = useCourseStore((state) => state.completed)
  return <header className="site-header">
    <Logo onClick={onHome} />
    <nav aria-label="Główna nawigacja"><a href="#metoda">Jak się uczymy</a><a href="#moduly">Moduły</a><a href="#narzedzia">Narzędzia</a></nav>
    <div className="header-actions">
      <button className="button button-quiet button-small" onClick={() => onTool('training')}><Target size={15} />Trening</button>
      <button className="button button-dark button-small" onClick={onStart}>{completed.length ? 'Wróć do kursu' : 'Zacznij naukę'}<ArrowRight size={16} /></button>
    </div>
  </header>
}

function HeroGraphic() {
  return <div className="hero-graphic" aria-label="Animowana belka pokazująca odkształcenie pod siłą">
    <div className="hero-card-top"><span><i /> SYMULACJA</span><small>spróbuj sam</small></div>
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
    <div className="hero-card-bottom"><span className="mini-icon"><MousePointer2 size={16} /></span><span><strong>Nie tylko czytasz.</strong><small>Zmieniasz. Obserwujesz. Rozumiesz.</small></span></div>
    <motion.div className="floating-note" animate={{ y: [-4, 5, -4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><Lightbulb size={18} /><span><small>Wniosek</small>Belka pracuje nawet bez ruchu</span></motion.div>
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

  return <div className="home">
    <Header onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onStart={() => onStart(resume)} onTool={onTool} />
    <main>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span /> KURS OD ZERA · 10 MODUŁÓW · PEŁNY SYLABUS</div><h1>Zobacz, co czuje<br /><em>materiał.</em></h1><p>Wytrzymałość materiałów przez eksperymenty, animowane rozwiązania i policzalne zadania. Dotknij siły, zmień kształt i zobacz, skąd naprawdę biorą się wzory.</p><div className="hero-actions"><button className="button button-primary" onClick={() => onStart(resume)}><Play size={17} fill="currentColor" />{completed.length ? 'Kontynuuj naukę' : 'Uruchom pierwszą lekcję'}</button><span>{modules.length} modułów <i /> {lessons.length} lekcji <i /> {Math.round(totalDuration / 60)} godzin</span></div><div className="hero-trust"><span><Check size={15} /> od absolutnych podstaw</span><span><Check size={15} /> animowane zadania</span><span><Check size={15} /> własne tempo</span></div></div>
        <HeroGraphic />
      </section>
      <section className="method" id="metoda"><div className="section-heading"><span className="section-kicker">METODA, KTÓRA DZIAŁA</span><h2>Najpierw intuicja. Potem wzór.</h2><p>Każda lekcja jest małym eksperymentem z konkretnym celem.</p></div><div className="method-grid">
        <article><span className="method-number">01</span><div className="method-icon"><MousePointer2 /></div><h3>Przewiduj i eksperymentuj</h3><p>Zanim poznasz odpowiedź, postaw hipotezę. Potem steruj parametrami i obserwuj skutki.</p></article>
        <article><span className="method-number">02</span><div className="method-icon"><FlaskConical /></div><h3>Zobacz niewidzialne</h3><p>Animacje łączą odkształcenie, wykres i wzór. Widzisz tę samą historię z trzech stron.</p></article>
        <article><span className="method-number">03</span><div className="method-icon"><Award /></div><h3>Sprawdź i wyjaśnij</h3><p>Pytania z podpowiedziami, trening liczbowy i kolokwium próbne utrwalają aktywne przypominanie.</p></article>
      </div></section>
      <section className="chapters" id="moduly">
        <div className="chapters-heading"><div><span className="section-kicker">TWOJA ŚCIEŻKA</span><h2>Od pierwszej siły do pełnego obrazu.</h2></div><div className="overall-progress"><span>{completed.length} z {lessons.length} ukończone · {Math.round(percent)}%</span><CourseProgress value={percent} /></div></div>
        <label className="search-field home-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Szukaj lekcji, wzoru lub pojęcia…" aria-label="Szukaj w kursie" /></label>
        {results.length > 0 && <div className="search-results">{results.map((lesson) => <button key={lesson.id} onClick={() => onStart(lesson.id)}><span>{getModuleForLesson(lesson).shortTitle}</span><strong>{lesson.title}</strong><small>{lesson.duration} min</small><ChevronRight size={15} /></button>)}</div>}
        <div className="module-grid">{modules.map((module, index) => {
          const Icon = moduleIcons[index % moduleIcons.length]
          const done = module.lessons.filter((lesson) => completed.includes(lesson.id)).length
          const modulePercent = done / module.lessons.length * 100
          const next = module.lessons.find((lesson) => !completed.includes(lesson.id)) ?? module.lessons[0]
          const bestScore = Math.max(...module.lessons.map((lesson) => scores[lesson.id] ?? 0))
          return <article className="module-card" key={module.id}>
            <button className="module-card-main" onClick={() => onStart(next.id)}>
              <span className={`chapter-icon ${done === module.lessons.length ? 'done' : ''}`}>{done === module.lessons.length ? <Check /> : <Icon />}</span>
              <span className="module-copy"><small>MODUŁ {String(module.number).padStart(2, '0')} · {module.lessons.length} LEKCJI · {module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0)} MIN</small><strong>{module.title}</strong><span>{module.description}</span></span>
              <span className="chapter-action">{done ? `${done}/${module.lessons.length}` : 'Zacznij'}<ChevronRight /></span>
            </button>
            <div className="module-progress"><CourseProgress value={modulePercent} /><span>{done === 0 ? 'Nie rozpoczęty' : done === module.lessons.length ? `Ukończony${bestScore ? ` · najlepszy wynik ${bestScore}%` : ''}` : `${done} z ${module.lessons.length} lekcji`}</span></div>
            <div className="module-lessons">{module.lessons.map((lesson) => <button key={lesson.id} className={completed.includes(lesson.id) ? 'done' : ''} onClick={() => onStart(lesson.id)}>{completed.includes(lesson.id) ? <Check size={12} /> : <span>{lesson.number}</span>}{lesson.shortTitle}</button>)}</div>
          </article>
        })}</div>
      </section>
      <section className="tools-section" id="narzedzia"><div className="section-heading"><span className="section-kicker">NARZĘDZIA</span><h2>Ucz się, licz i sprawdzaj.</h2><p>Cztery tryby wspierające kurs: od luźnego treningu po warunki kolokwium.</p></div><div className="tool-grid">
        <button onClick={() => onTool('training')}><Target /><strong>Trening liczbowy</strong><span>Losowe dane, 9 typów zadań, tolerancja i pełne rozwiązania.</span></button>
        <button onClick={() => onTool('exam')}><Clock /><strong>Kolokwium próbne</strong><span>20 pytań, 20 minut, wynik według modułów i efektów.</span></button>
        <button onClick={() => onTool('cheatsheet')}><BookOpen /><strong>Ściąga</strong><span>Wszystkie wzory, jednostki i najważniejsze wnioski.</span></button>
        <button onClick={() => onTool('syllabus')}><ClipboardList /><strong>Mapa sylabusa</strong><span>Pokrycie karty przedmiotu i efekty W1–W3, U1–U3.</span></button>
      </div></section>
      <section className="research-note"><ShieldCheck /><div><strong>Nauka oparta na dobrych wzorcach, nie na przypadku.</strong><p>Sterowana eksploracja, natychmiastowa informacja zwrotna, animowane przykłady i aktywne przypominanie — zasady inspirowane badaniami PhET i nauką o uczeniu się.</p></div><span>Kurs ma charakter edukacyjny. Modele są uproszczone i nie służą do projektowania rzeczywistych konstrukcji.</span></section>
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

  if (finished) return <motion.section className="quiz-result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span className="result-icon"><Award /></span><span className="section-kicker">LEKCJA UKOŃCZONA</span><h2>{correctCount === total ? 'Świetnie — to już rozumiesz.' : correctCount >= Math.ceil(total / 2) ? 'Dobry wynik. Powtórka utrwali wiedzę.' : 'Warto wrócić do laboratorium i spróbować jeszcze raz.'}</h2><p>Twój wynik: <strong>{correctCount} / {total}</strong> ({score}%). Lekcja jest zapisana w Twojej ścieżce.</p><button className="button button-dark" onClick={() => { setIndex(0); setSelected(null); setCorrectCount(0); setFinished(false) }}><RotateCw size={17} />Spróbuj jeszcze raz</button></motion.section>

  return <section className="quiz" id="quiz"><div className="quiz-top"><span className="section-kicker">SPRAWDŹ, CZY ROZUMIESZ{question.outcome ? ` · ${question.outcome}` : ''}</span><span>{index + 1} / {total}</span></div><h2>{question.question}</h2><div className="answers">{question.answers.map((answer, answerIndex) => {
    const isSelected = selected === answerIndex
    const isCorrect = answered && answerIndex === question.correct
    return <button key={answer} disabled={answered} onClick={() => setSelected(answerIndex)} className={`answer ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isSelected && !isCorrect ? 'wrong' : ''}`}><span className="answer-letter">{String.fromCharCode(65 + answerIndex)}</span><span>{answer}</span>{isCorrect && <CheckCircle2 />}{isSelected && !isCorrect && <X />}</button>
  })}</div>{!answered && <button className="hint-button" onClick={() => setHint(!hint)}><Lightbulb size={16} />{hint ? question.hint : 'Potrzebuję podpowiedzi'}</button>}<AnimatePresence>{answered && <motion.div className={`feedback ${correct ? 'feedback-correct' : 'feedback-wrong'}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><strong>{correct ? 'Dokładnie tak!' : 'Jeszcze nie — spójrz na to tak:'}</strong><p>{question.explanation}</p></motion.div>}</AnimatePresence><button className="button button-dark quiz-next" disabled={!answered} onClick={next}>{index === total - 1 ? 'Zakończ lekcję' : 'Następne pytanie'}<ArrowRight size={17} /></button></section>
}

function WorkedExample({ lesson }: { lesson: Lesson }) {
  const example = lesson.workedExample
  if (!example) return null
  return <section className="worked-example">
    <div className="worked-heading"><span className="round-icon"><FlaskConical /></span><div><span className="section-kicker">PRZYKŁAD PROWADZONY</span><h2>Od danych do wyniku.</h2></div></div>
    <p className="worked-given"><strong>Dane:</strong> {example.given}</p>
    <ol>{example.steps.map((step) => <li key={step}>{step}</li>)}</ol>
    <div className="worked-result"><CheckCircle2 size={17} /><strong>Wynik:</strong> {example.result}</div>
  </section>
}

function LessonView({ lesson, onHome, onLesson, onTool }: { lesson: Lesson; onHome: () => void; onLesson: (id: LessonId) => void; onTool: (view: View) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { completed, completeLesson, setLastLesson } = useCourseStore()
  const ActiveLab = labRegistry[lesson.lab]
  const module = getModuleForLesson(lesson)
  const index = lessonIndex(lesson.id)
  const prevLesson = lessons[index - 1]
  const nextLesson = lessons[index + 1]
  const solution = lesson.solutionId ? getSolution(lesson.solutionId) : undefined

  useEffect(() => { setLastLesson(lesson.id); window.scrollTo(0, 0) }, [lesson.id, setLastLesson])

  return <div className="lesson-page">
    <header className="lesson-header"><Logo onClick={onHome} /><div className="lesson-header-progress"><span>Twój postęp <strong>{completed.length}/{lessons.length}</strong></span><CourseProgress value={completed.length / lessons.length * 100} /></div><button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Pokaż moduły">{menuOpen ? <X /> : <Menu />}</button><button className="button button-small button-quiet" onClick={onHome}><X size={16} />Zamknij lekcję</button></header>
    <div className="lesson-layout">
      <aside className={`lesson-sidebar ${menuOpen ? 'open' : ''}`}><span className="sidebar-label">TWOJA ŚCIEŻKA · {modules.length} MODUŁÓW</span><nav className="sidebar-nav" aria-label="Lekcje kursu">{modules.map((moduleEntry) => <div key={moduleEntry.id} className="sidebar-module"><span className="sidebar-module-title">{String(moduleEntry.number).padStart(2, '0')} · {moduleEntry.shortTitle}</span>{moduleEntry.lessons.map((item) => <button key={item.id} className={`sidebar-lesson ${item.id === lesson.id ? 'active' : ''}`} onClick={() => { onLesson(item.id); setMenuOpen(false) }}><span className="sidebar-number">{completed.includes(item.id) ? <Check size={14} /> : item.number}</span><span>{item.shortTitle}<small>{item.duration} min</small></span></button>)}</div>)}</nav><div className="sidebar-tip"><Lightbulb /><strong>Ucz się po swojemu</strong><p>Możesz wracać do eksperymentów. Postęp zapisuje się na tym urządzeniu.</p></div></aside>
      <main className="lesson-main"><div className="lesson-breadcrumb"><button onClick={onHome}>Kurs</button><ChevronRight size={14} /><span>Moduł {module.number}: {module.shortTitle}</span><ChevronRight size={14} /><span>Lekcja {lesson.number}</span></div><div className="lesson-title"><span className="section-kicker">{lesson.eyebrow.toUpperCase()}</span><h1>{lesson.title}</h1><p>{lesson.description}</p><span className="lesson-time"><BookOpen size={15} /> około {lesson.duration} min · eksperyment + {lesson.questions.length} pytania{solution ? ' + animowane rozwiązanie' : ''}</span></div>
        <div className="learning-path"><span className="active"><i>1</i>Eksperymentuj</span><span><i>2</i>Zrozum</span><span><i>3</i>Przykład</span><span><i>4</i>Sprawdź się</span></div>
        <motion.div key={`lab-${lesson.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{ActiveLab ? <ActiveLab /> : <div className="lab-fallback">Laboratorium dla tej lekcji nie jest jeszcze dostępne.</div>}</motion.div>
        <section className="explanation"><div className="explanation-heading"><span className="round-icon"><Lightbulb /></span><div><span className="section-kicker">CO WŁAŚNIE ZA OBSERWOWAŁEŚ?</span><h2>Wzór jest skrótem obserwacji.</h2></div></div><p className="intuition">{lesson.intuition}</p><Formula note={lesson.formulaNote}>{lesson.formula}</Formula><div className="key-insight"><Sparkles /><div><strong>Jedna rzecz do zapamiętania</strong><p>{lesson.insight}</p></div></div></section>
        <WorkedExample lesson={lesson} />
        {solution && <SolutionPlayer solution={solution} />}
        <Quiz key={lesson.id} lesson={lesson} onComplete={(score) => completeLesson(lesson.id, score)} />
        <div className="lesson-navigation">{prevLesson ? <button className="button button-quiet" onClick={() => onLesson(prevLesson.id)}><ArrowLeft />Poprzednia</button> : <span />}{nextLesson ? <button className="button button-primary" onClick={() => onLesson(nextLesson.id)}>Następna lekcja<ArrowRight /></button> : <button className="button button-primary" onClick={() => onTool('exam')}>Przejdź do kolokwium<Award /></button>}</div>
      </main>
    </div>
  </div>
}

export default function App() {
  const [view, setView] = useState<View>('home')
  const [activeLesson, setActiveLesson] = useState<LessonId>(lessons[0].id)
  const openLesson = (id: LessonId) => { setActiveLesson(id); setView('lesson'); window.scrollTo(0, 0) }
  const openTool = (next: View) => { setView(next); window.scrollTo(0, 0) }
  const home = () => setView('home')

  if (view === 'training') return <Training onBack={home} />
  if (view === 'exam') return <Exam onBack={home} />
  if (view === 'cheatsheet') return <CheatSheet onBack={home} />
  if (view === 'syllabus') return <SyllabusMap onBack={home} />
  if (view === 'lesson') return <LessonView lesson={getLesson(activeLesson)} onHome={home} onLesson={openLesson} onTool={openTool} />
  return <Home onStart={openLesson} onTool={openTool} />
}

