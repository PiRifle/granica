import type { ReactNode } from 'react'
import styles from './Content.module.css'

export function Callout({
  kind = 'info',
  title,
  children,
}: {
  kind?: 'info' | 'warning' | 'success'
  title?: string
  children: ReactNode
}) {
  return (
    <aside className={styles.callout} data-kind={kind}>
      {title && <span className={styles.calloutTitle}>{title}</span>}
      {children}
    </aside>
  )
}
