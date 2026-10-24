import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
import styles from './Content.module.css'

export function Insight({ children }: { children: ReactNode }) {
  return (
    <div className={styles.insight}>
      <Sparkles />
      <div>
        <strong>Jedna rzecz do zapamiętania</strong>
        <p>{children}</p>
      </div>
    </div>
  )
}
