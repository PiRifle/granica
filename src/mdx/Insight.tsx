import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import styles from './Content.module.css'
import { inline } from './children'

export function Insight({ children }: { children: ReactNode }) {
  return (
    <div className={styles.insight}>
      <Sparkles />
      <div>
        <strong>Jedna rzecz do zapamiętania</strong>
        <p>{inline(children)}</p>
      </div>
    </div>
  )
}
