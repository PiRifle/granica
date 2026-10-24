import { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { Award, CheckCircle2, Clock, RefreshCw, Target, XCircle } from 'lucide-react'
import { lessons } from '../data/course'
import type { Question } from '../types'

interface ExamQuestion {
  key: string
  lessonId: string
  lessonTitle: string
  moduleId: string
  moduleTitle: string
  question: Question
}

const EXAM_SIZE = 20
const EXAM_SECONDS = 20 * 60

function buildPool(): ExamQuestion[] {
  return lessons.flatMap((lesson) => lesson.questions.map((question, index) => ({
    key: `${lesson.id}-${index}`,
    lessonId: lesson.id,
    lessonTitle: lesson.shortTitle,
    moduleId: lesson.moduleId,
    moduleTitle: lesson.moduleId,
    question,
  })))
}

function shuffle<T>(values: T[]): T[] {
  const copy = [...values]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swap]] = [copy[swap], copy[index]]
  }
  return copy
}

function pickExam(pool: ExamQuestion[], size = EXAM_SIZE): ExamQuestion[] {
  return shuffle(pool).slice(0, Math.min(size, pool.length))
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`
}

const moduleNames: Record<string, string> = {
  foundations: 'Fundamenty',
  axial: 'Rozciąganie i ściskanie',
  material: 'Materiał i temperatura',
  geometry: 'Geometria przekrojów',
  shear: 'Ścinanie i skręcanie',
  bending: 'Zginanie',
  'stress-state': 'Stan naprężenia',
  'strain-state': 'Stan odkształcenia',
  criteria: 'Hipotezy wytężeniowe',
  design: 'Projektowanie',
}

export function Exam({ onBack }: { onBack: () => void }) {
  const pool = useMemo(buildPool, [])
  const [phase, setPhase] = useState<'intro' | 'running' | 'done'>('intro')
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [index, setIndex] = useState(0)
  const [remaining, setRemaining] = useState(EXAM_SECONDS)

  useEffect(() => {
    if (phase !== 'running') return
    if (remaining <= 0) {
      setPhase('done')
      return
    }
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [phase, remaining])

  const start = (items?: ExamQuestion[]) => {
    setQuestions(items ?? pickExam(pool))
    setAnswers({})
    setIndex(0)
    setRemaining(EXAM_SECONDS)
    setPhase('running')
  }

  const finish = () => setPhase('done')

  const results = useMemo(() => {
    let correct = 0
    const byModule = new Map<string, { correct: number; total: number }>()
    const byOutcome = new Map<string, { correct: number; total: number }>()
    const wrong: ExamQuestion[] = []
    questions.forEach((item, questionIndex) => {
      const isCorrect = answers[questionIndex] === item.question.correct
      if (isCorrect) correct += 1
      else wrong.push(item)
      const module = byModule.get(item.moduleId) ?? { correct: 0, total: 0 }
      module.total += 1
      module.correct += isCorrect ? 1 : 0
      byModule.set(item.moduleId, module)
      const outcome = item.question.outcome ?? 'inne'
      const outcomeEntry = byOutcome.get(outcome) ?? { correct: 0, total: 0 }
      outcomeEntry.total += 1
      outcomeEntry.correct += isCorrect ? 1 : 0
      byOutcome.set(outcome, outcomeEntry)
    })
    return { correct, byModule, byOutcome, wrong, percent: questions.length ? Math.round(correct / questions.length * 100) : 0 }
  }, [questions, answers])

  if (phase === 'intro') {
    return <div className="tool-page">
      <header className="tool-header">
        <button className="button button-quiet button-small" onClick={onBack}>← Wróć do kursu</button>
        <div className="tool-header-copy">
          <span className="section-kicker">KOLOKWIUM PRÓBNE</span>
          <h1>Sprawdź się w warunkach egzaminacyjnych.</h1>
          <p>{EXAM_SIZE} losowych pytań z całego kursu, 20 minut, wynik według modułów i efektów kształcenia. Po zakończeniu zobaczysz każde błędne pytanie z wyjaśnieniem.</p>
        </div>
        <span className="tool-score"><Clock size={17} /> 20 minut</span>
      </header>
      <section className="exam-intro">
        <div className="exam-intro-grid">
          <article><Target /><strong>{EXAM_SIZE} pytań</strong><span>losowanych z puli {pool.length} pytań kursu</span></article>
          <article><Clock /><strong>20 minut</strong><span>czas liczony od startu, bez pauzy</span></article>
          <article><Award /><strong>Wynik analityczny</strong><span>procent, moduły, efekty W1–W3 i U1–U3</span></article>
        </div>
        <button className="button button-primary" onClick={() => start()}>Rozpocznij kolokwium<Award size={17} /></button>
      </section>
    </div>
  }

  if (phase === 'running') {
    const item = questions[index]
    const answeredCount = Object.keys(answers).length
    return <div className="tool-page exam-running">
      <header className="exam-bar">
        <button className="button button-quiet button-small" onClick={finish}>Zakończ</button>
        <div className="exam-progress"><span>{index + 1} / {questions.length}</span><div className="progress-root"><div className="progress-indicator" style={{ transform: `translateX(-${100 - (index + 1) / questions.length * 100}%)` }} /></div></div>
        <span className={`exam-timer ${remaining < 120 ? 'danger' : ''}`}><Clock size={16} /> {formatTime(remaining)}</span>
      </header>
      <main className="exam-main">
        <span className="section-kicker">{moduleNames[item.moduleId] ?? item.moduleId} · {item.lessonTitle}</span>
        <h1>{item.question.question}</h1>
        <div className="answers">{item.question.answers.map((answer, answerIndex) => <button key={answer} className={`answer ${answers[index] === answerIndex ? 'selected' : ''}`} onClick={() => setAnswers((current) => ({ ...current, [index]: answerIndex }))}><span className="answer-letter">{String.fromCharCode(65 + answerIndex)}</span><span>{answer}</span></button>)}</div>
        <div className="exam-nav">
          <button className="button button-quiet" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>Poprzednie</button>
          <span>{answeredCount} z {questions.length} odpowiedzi</span>
          {index === questions.length - 1 ? <button className="button button-primary" onClick={finish}>Zakończ i sprawdź<CheckCircle2 size={17} /></button> : <button className="button button-dark" onClick={() => setIndex((value) => Math.min(questions.length - 1, value + 1))}>Następne</button>}
        </div>
      </main>
    </div>
  }

  return <div className="tool-page">
    <header className="tool-header">
      <button className="button button-quiet button-small" onClick={onBack}>← Wróć do kursu</button>
      <div className="tool-header-copy">
        <span className="section-kicker">WYNIK KOLOKWIUM</span>
        <h1>{results.percent}% — {results.correct} z {questions.length}</h1>
        <p>{remaining === 0 ? 'Czas minął. ' : ''}Poniżej rozkład według modułów i efektów kształcenia oraz pełne wyjaśnienia błędnych odpowiedzi.</p>
      </div>
      <span className="tool-score"><Award size={17} /> {results.percent >= 60 ? 'Zaliczone' : 'Do powtórki'}</span>
    </header>
    <div className="exam-results">
      <section className="exam-result-block">
        <h2>Według modułów</h2>
        {[...results.byModule.entries()].map(([moduleId, value]) => <div className="result-row" key={moduleId}><span>{moduleNames[moduleId] ?? moduleId}</span><div className="progress-root"><div className="progress-indicator" style={{ transform: `translateX(-${100 - value.correct / value.total * 100}%)` }} /></div><strong>{value.correct}/{value.total}</strong></div>)}
      </section>
      <section className="exam-result-block">
        <h2>Według efektów kształcenia</h2>
        {[...results.byOutcome.entries()].sort().map(([outcome, value]) => <div className="result-row" key={outcome}><span>{outcome}</span><div className="progress-root"><div className="progress-indicator" style={{ transform: `translateX(-${100 - value.correct / value.total * 100}%)` }} /></div><strong>{value.correct}/{value.total}</strong></div>)}
      </section>
    </div>
    {results.wrong.length > 0 && <section className="exam-review">
      <h2>Do powtórki ({results.wrong.length})</h2>
      {results.wrong.map((item) => <article key={item.key}><strong>{item.question.question}</strong><p className="exam-review-correct"><CheckCircle2 size={15} /> {item.question.answers[item.question.correct]}</p><p>{item.question.explanation}</p></article>)}
    </section>}
    <div className="tool-footer">
      <span>{results.wrong.length ? <><XCircle size={15} /> Możesz powtórzyć tylko błędne pytania.</> : <><CheckCircle2 size={15} /> Wszystkie odpowiedzi poprawne.</>}</span>
      <div className="tool-footer-actions">
        {results.wrong.length > 0 && <button className="button button-dark" onClick={() => start(results.wrong)}><Target size={16} />Powtórz błędne</button>}
        <button className="button button-primary" onClick={() => start()}><RefreshCw size={16} />Nowe kolokwium</button>
      </div>
    </div>
  </div>
}
