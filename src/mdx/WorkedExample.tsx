import { CheckCircle2, FlaskConical } from 'lucide-react'
import { useLessonContent } from './LessonContentContext'
import styles from './Content.module.css'

export function WorkedExample() {
  const lesson = useLessonContent()
  const example = lesson.workedExample
  if (!example) return null
  return <section className={styles.workedExample}>
    <div className={styles.workedHeading}><span className={styles.roundIcon}><FlaskConical /></span><div><span className="section-kicker">PRZYKŁAD PROWADZONY</span><h2>Od danych do wyniku.</h2></div></div>
    <p className={styles.workedGiven}><strong>Dane:</strong> {example.given}</p>
    <ol>{example.steps.map((step) => <li key={step}>{step}</li>)}</ol>
    <div className={styles.workedResult}><CheckCircle2 size={17} /><strong>Wynik:</strong> {example.result}</div>
  </section>
}
