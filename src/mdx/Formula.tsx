import type { ReactNode } from 'react'
import styles from './Content.module.css'

export function Formula({ children }: { children: ReactNode }) {
  return <div className="formula-card">{children}</div>
}

export function Caption({ children }: { children: ReactNode }) {
  return <p className={styles.caption}>{children}</p>
}
