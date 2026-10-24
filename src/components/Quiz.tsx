import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Award, CheckCircle2, Lightbulb, RotateCw, X } from 'lucide-react'
import type { Lesson } from '../types'
import lessonView from './LessonView.module.css'
import { classNames, cx } from '../lib/css'

const l = classNames(lessonView)

export function Quiz({ lesson, onComplete }: { lesson: Lesson; onComplete: (score: number) => void }) {
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

  if (finished) return <motion.section className={l('quiz-result')} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><span className={l('result-icon')}><Award /></span><span className={l('section-kicker')}>LEKCJA UKOŃCZONA</span><h2>{correctCount === total ? 'Świetnie — to już rozumiesz.' : correctCount >= Math.ceil(total / 2) ? 'Dobry wynik. Powtórka utrwali wiedzę.' : 'Warto wrócić do laboratorium i spróbować jeszcze raz.'}</h2><p>Twój wynik: <strong>{correctCount} / {total}</strong> ({score}%). Lekcja jest zapisana w Twojej ścieżce.</p><button className={l('button button-dark')} onClick={() => { setIndex(0); setSelected(null); setCorrectCount(0); setFinished(false) }}><RotateCw size={17} />Spróbuj jeszcze raz</button></motion.section>

  return <section className={l('quiz')} id="quiz"><div className={l('quiz-top')}><span className={l('section-kicker')}>SPRAWDŹ, CZY ROZUMIESZ{question.outcome ? ` · ${question.outcome}` : ''}</span><span>{index + 1} / {total}</span></div><h2>{question.question}</h2><div className={l('answers')}>{question.answers.map((answer, answerIndex) => {
    const isSelected = selected === answerIndex
    const isCorrect = answered && answerIndex === question.correct
    return <button key={answer} disabled={answered} onClick={() => setSelected(answerIndex)} className={cx(l('answer'), isCorrect && l('correct'), isSelected && !isCorrect && l('wrong'))}><span className={l('answer-letter')}>{String.fromCharCode(65 + answerIndex)}</span><span>{answer}</span>{isCorrect && <CheckCircle2 />}{isSelected && !isCorrect && <X />}</button>
  })}</div>{!answered && <button className={l('hint-button')} onClick={() => setHint(!hint)}><Lightbulb size={16} />{hint ? question.hint : 'Potrzebuję podpowiedzi'}</button>}<AnimatePresence>{answered && <motion.div className={l(`feedback ${correct ? 'feedback-correct' : 'feedback-wrong'}`)} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><strong>{correct ? 'Dokładnie tak!' : 'Jeszcze nie — spójrz na to tak:'}</strong><p>{question.explanation}</p></motion.div>}</AnimatePresence><button className={l('button button-dark quiz-next')} disabled={!answered} onClick={next}>{index === total - 1 ? 'Zakończ lekcję' : 'Następne pytanie'}<ArrowRight size={17} /></button></section>
}
