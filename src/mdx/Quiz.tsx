import { Children, isValidElement, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Award, CheckCircle2, Lightbulb, RotateCw, X } from 'lucide-react'
import { useCourseStore } from '../store'
import { useLessonRuntime } from './LessonRuntimeContext'
import lessonView from '../components/LessonView.module.css'
import { classNames, cx } from '../lib/css'
import { inline } from './children'

const l = classNames(lessonView)

type QuestionProps = { outcome?: string; children?: ReactNode }

export function Quiz({ children }: { children: ReactNode }) {
  const lesson = useLessonRuntime()
  const completeLesson = useCourseStore((state) => state.completeLesson)
  const questions = normalize(Children.toArray(children), lesson.id)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)
  const [hint, setHint] = useState(false)

  if (questions.length === 0) return null
  const question = questions[index]
  const total = questions.length
  const answered = selected !== null
  const correctIndex = question.answers.findIndex((answer) => answer.correct)
  const correct = selected === correctIndex
  const score = Math.round((correctCount / total) * 100)

  const next = () => {
    const currentCorrect = correctCount + (correct ? 1 : 0)
    if (index === total - 1) {
      setCorrectCount(currentCorrect)
      setFinished(true)
      completeLesson(lesson.id, Math.round((currentCorrect / total) * 100))
    } else {
      setCorrectCount(currentCorrect)
      setIndex(index + 1)
      setSelected(null)
      setHint(false)
    }
  }

  if (finished)
    return (
      <motion.section className={l('quiz-result')} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <span className={l('result-icon')}>
          <Award />
        </span>
        <span className={l('section-kicker')}>LEKCJA UKOŃCZONA</span>
        <h2>
          {correctCount === total
            ? 'Świetnie — to już rozumiesz.'
            : correctCount >= Math.ceil(total / 2)
              ? 'Dobry wynik. Powtórka utrwali wiedzę.'
              : 'Warto wrócić do laboratorium i spróbować jeszcze raz.'}
        </h2>
        <p>
          Twój wynik:{' '}
          <strong>
            {correctCount} / {total}
          </strong>{' '}
          ({score}%). Lekcja jest zapisana w Twojej ścieżce.
        </p>
        <button
          className={l('button button-dark')}
          onClick={() => {
            setIndex(0)
            setSelected(null)
            setCorrectCount(0)
            setFinished(false)
          }}
        >
          <RotateCw size={17} />
          Spróbuj jeszcze raz
        </button>
      </motion.section>
    )

  return (
    <section className={l('quiz')} id="quiz">
      <div className={l('quiz-top')}>
        <span className={l('section-kicker')}>
          SPRAWDŹ, CZY ROZUMIESZ{question.outcome ? ` · ${question.outcome}` : ''}
        </span>
        <span>
          {index + 1} / {total}
        </span>
      </div>
      <h2>{question.prompt}</h2>
      <div className={l('answers')}>
        {question.answers.map((answer, answerIndex) => {
          const isSelected = selected === answerIndex
          const isCorrect = answered && answerIndex === correctIndex
          return (
            <button
              key={answerIndex}
              disabled={answered}
              onClick={() => setSelected(answerIndex)}
              className={cx(l('answer'), isCorrect && l('correct'), isSelected && !isCorrect && l('wrong'))}
            >
              <span className={l('answer-letter')}>{String.fromCharCode(65 + answerIndex)}</span>
              <span>{answer.content}</span>
              {isCorrect && <CheckCircle2 />}
              {isSelected && !isCorrect && <X />}
            </button>
          )
        })}
      </div>
      {!answered && (
        <button className={l('hint-button')} onClick={() => setHint(!hint)}>
          <Lightbulb size={16} />
          {hint ? question.hint : 'Potrzebuję podpowiedzi'}
        </button>
      )}
      <AnimatePresence>
        {answered && (
          <motion.div
            className={l(`feedback ${correct ? 'feedback-correct' : 'feedback-wrong'}`)}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <strong>{correct ? 'Dokładnie tak!' : 'Jeszcze nie — spójrz na to tak:'}</strong>
            <p>{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button className={l('button button-dark quiz-next')} disabled={!answered} onClick={next}>
        {index === total - 1 ? 'Zakończ lekcję' : 'Następne pytanie'}
        <ArrowRight size={17} />
      </button>
    </section>
  )
}

function normalize(children: ReactNode[], lessonId: string): NormalizedQuestion[] {
  const questions = children.filter(
    (child): child is ReactElement<QuestionProps> => isValidElement(child) && child.type === Question,
  )
  if (questions.length === 0) return []
  return questions.map((question, index) => {
    const parts = Children.toArray(question.props.children)
    const prompt = parts.find(
      (part): part is ReactElement<{ children?: ReactNode }> => isValidElement(part) && part.type === Prompt,
    )
    const hint = parts.find(
      (part): part is ReactElement<{ children?: ReactNode }> => isValidElement(part) && part.type === Hint,
    )
    const explanation = parts.find(
      (part): part is ReactElement<{ children?: ReactNode }> => isValidElement(part) && part.type === Explanation,
    )
    const answers = parts.filter(
      (part): part is ReactElement<{ correct?: boolean; children?: ReactNode }> =>
        isValidElement(part) && part.type === Answer,
    )
    if (!prompt || !hint || !explanation || answers.length < 2)
      throw new Error(`Niepełne pytanie ${index + 1} w lekcji ${lessonId}`)
    if (answers.filter((answer) => answer.props.correct).length !== 1)
      throw new Error(`Pytanie ${index + 1} w lekcji ${lessonId} musi mieć dokładnie jedną poprawną odpowiedź`)
    return {
      prompt: inline(prompt.props.children),
      hint: inline(hint.props.children),
      explanation: inline(explanation.props.children),
      outcome: question.props.outcome,
      answers: answers.map((answer) => ({
        content: inline(answer.props.children),
        correct: Boolean(answer.props.correct),
      })),
    }
  })
}

interface NormalizedQuestion {
  prompt: ReactNode
  answers: Array<{ content: ReactNode; correct: boolean }>
  hint: ReactNode
  explanation: ReactNode
  outcome?: string
}

export function Question(_: QuestionProps) {
  return null
}
export function Prompt(_: { children?: ReactNode }) {
  return null
}
export function Answer(_: { correct?: boolean; children?: ReactNode }) {
  return null
}
export function Hint(_: { children?: ReactNode }) {
  return null
}
export function Explanation(_: { children?: ReactNode }) {
  return null
}
