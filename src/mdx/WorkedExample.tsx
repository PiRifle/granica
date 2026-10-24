import type { ReactNode } from 'react'
import { CheckCircle2, FlaskConical } from 'lucide-react'
import styles from './Content.module.css'
import { inline } from './children'

export function WorkedExample({ children }: { children: ReactNode }) {
  return <section className={styles.workedExample}>
    <div className={styles.workedHeading}><span className={styles.roundIcon}><FlaskConical /></span><div><span className="section-kicker">PRZYKŁAD PROWADZONY</span><h2>Od danych do wyniku.</h2></div></div>
    {children}
  </section>
}

export function Given({ children }: { children: ReactNode }) {
  return <p className={styles.workedGiven}><strong>Dane:</strong> {inline(children)}</p>
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className={styles.steps}>{children}</ol>
}

export function Step({ children }: { children: ReactNode }) {
  return <li>{inline(children)}</li>
}

export function Result({ children }: { children: ReactNode }) {
  return <div className={styles.workedResult}><CheckCircle2 size={17} /><strong>Wynik:</strong> {inline(children)}</div>
}
