import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Check, Lightbulb, RefreshCw, Target, X } from 'lucide-react'
import { generateTasks, isAnswerClose, type NumericTask } from '../lib/training'
import { InlineMath } from 'react-katex'

export function Training({ onBack }: { onBack: () => void }) {
  const [round, setRound] = useState(0)
  const tasks = useMemo(() => generateTasks(6), [round])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [hints, setHints] = useState<Record<string, boolean>>({})

  const correctCount = tasks.filter((task) => checked[task.id] && isAnswerClose(task, Number(answers[task.id]?.replace(',', '.')))).length

  const check = (task: NumericTask) => {
    setChecked((current) => ({ ...current, [task.id]: true }))
  }

  const restart = () => {
    setAnswers({})
    setChecked({})
    setHints({})
    setRound((value) => value + 1)
  }

  return <div className="tool-page">
    <header className="tool-header">
      <button className="button button-quiet button-small" onClick={onBack}>← Wróć do kursu</button>
      <div className="tool-header-copy">
        <span className="section-kicker">TRENING LICZBOWY</span>
        <h1>Policz sam. Sprawdź zrozumienie.</h1>
        <p>Zadania losują dane z tych samych wzorów, których używa kurs. Odpowiedź z tolerancją 1% i pełnym rozwiązaniem po sprawdzeniu.</p>
      </div>
      <span className="tool-score"><Target size={17} /> {correctCount} / {tasks.length} poprawnych</span>
    </header>
    <div className="training-list">
      {tasks.map((task, index) => {
        const value = answers[task.id] ?? ''
        const numeric = Number(value.replace(',', '.'))
        const isChecked = checked[task.id] ?? false
        const isCorrect = isChecked && isAnswerClose(task, numeric)
        return <motion.article key={task.id} className={`training-card ${isChecked ? (isCorrect ? 'correct' : 'wrong') : ''}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
          <div className="training-card-head">
            <span className="training-number">{String(index + 1).padStart(2, '0')}</span>
            <div><span className="training-topic">{task.label}</span><p>{task.prompt}</p></div>
          </div>
          <div className="training-answer">
            <label>
              <span>Twoja odpowiedź</span>
              <span className="training-input"><input inputMode="decimal" value={value} onChange={(event) => setAnswers((current) => ({ ...current, [task.id]: event.target.value }))} aria-label={`Odpowiedź do zadania ${index + 1}`} disabled={isChecked} /><strong>{task.unit}</strong></span>
            </label>
            {!isChecked ? <button className="button button-dark button-small" onClick={() => check(task)} disabled={!value.trim()}>Sprawdź<ArrowRight size={15} /></button> : <span className={`training-verdict ${isCorrect ? 'ok' : 'bad'}`}>{isCorrect ? <Check size={16} /> : <X size={16} />}{isCorrect ? 'Dobrze' : `Wynik: ${task.answer.toFixed(2)} ${task.unit}`}</span>}
          </div>
          <div className="training-foot">
            <button className="hint-button" onClick={() => setHints((current) => ({ ...current, [task.id]: !current[task.id] }))}><Lightbulb size={15} />{hints[task.id] ? 'Ukryj podpowiedź' : 'Podpowiedź'}</button>
            <span className="training-formula"><InlineMath math={task.formula} /></span>
          </div>
          {hints[task.id] && !isChecked && <p className="training-hint">{task.hint}</p>}
          {isChecked && <div className="training-solution"><strong>Rozwiązanie krok po kroku</strong><p>{task.solution}</p></div>}
        </motion.article>
      })}
    </div>
    <div className="tool-footer">
      <span>Losowe dane · tolerancja 1% · odpowiedzi nie są zapisywane</span>
      <button className="button button-primary" onClick={restart}><RefreshCw size={16} />Nowy zestaw zadań</button>
    </div>
  </div>
}
