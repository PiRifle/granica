import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { AlertTriangle, Bug, ScanLine, Trash2 } from 'lucide-react'
import { scanSolutionLayout, type SolutionLayoutIssue } from './solution-player/solutionLayoutScanner'
import styles from './SolutionDebug.module.css'

export function SolutionDebugDiagnostics({
  targetRef,
  sceneIndex,
  remountCount,
  runtimeErrors,
  onClearErrors,
}: {
  targetRef: RefObject<HTMLDivElement | null>
  sceneIndex: number
  remountCount: number
  runtimeErrors: string[]
  onClearErrors: () => void
}) {
  const [issues, setIssues] = useState<SolutionLayoutIssue[]>([])
  const [enabled, setEnabled] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setIssues([])
      return
    }

    const scan = () => {
      const target = targetRef.current
      if (!target) return
      const found = scanSolutionLayout(target)
      setIssues((previous) => {
        const signature = (entries: SolutionLayoutIssue[]) =>
          entries
            .map(({ kind, message, rect }) => `${kind}:${message}:${Math.round(rect.left)}:${Math.round(rect.top)}`)
            .join('|')
        return signature(previous) === signature(found) ? previous : found
      })
    }

    const timeout = window.setTimeout(scan, 500)
    const interval = window.setInterval(scan, 1200)
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [enabled, remountCount, sceneIndex, targetRef])

  return (
    <>
      {enabled && issues.length > 0 && (
        <div className={styles.collisionLayer} aria-hidden="true">
          {issues.map((issue, index) => (
            <span
              key={issue.id}
              className={
                issue.kind === 'SVG / tekst' || issue.kind === 'panel / overflow'
                  ? styles.collisionError
                  : styles.collisionWarning
              }
              style={{
                left: issue.rect.left,
                top: issue.rect.top,
                width: issue.rect.width,
                height: issue.rect.height,
              }}
            >
              {index + 1}
            </span>
          ))}
        </div>
      )}
      <section className={styles.diagnostics} aria-label="Diagnostyka odtwarzacza">
        <header className={styles.diagnosticsHead}>
          <span>
            <ScanLine size={15} /> Diagnostyka sceny {sceneIndex + 1}
          </span>
          <div>
            <button className={enabled ? styles.scanActive : undefined} onClick={() => setEnabled((value) => !value)}>
              {enabled ? 'Kolizje: wł.' : 'Kolizje: wył.'}
            </button>
            {runtimeErrors.length > 0 && (
              <button onClick={onClearErrors}>
                <Trash2 size={12} /> Wyczyść błędy
              </button>
            )}
          </div>
        </header>
        <div className={styles.diagnosticsSummary}>
          <span className={runtimeErrors.length ? styles.statusError : styles.statusOk}>
            <Bug size={13} /> {runtimeErrors.length} błędów
          </span>
          <span className={issues.length ? styles.statusWarning : styles.statusOk}>
            <AlertTriangle size={13} /> {issues.length} wskazań kolizji
          </span>
          <span className={styles.diagnosticHint}>Ramki na figurze odpowiadają pozycjom na liście.</span>
        </div>
        {(runtimeErrors.length > 0 || issues.length > 0) && (
          <ol className={styles.issueList}>
            {runtimeErrors.map((error, index) => (
              <li key={`${error}-${index}`} className={styles.issueRuntime}>
                <strong>BŁĄD</strong>
                <span>{error}</span>
              </li>
            ))}
            {issues.map((issue, index) => (
              <li key={issue.id} className={selectedId === issue.id ? styles.issueSelected : undefined}>
                <button
                  onClick={() => setSelectedId((current) => (current === issue.id ? null : issue.id))}
                  title="Pokaż szczegóły kolizji"
                >
                  <strong>{index + 1}</strong>
                  <span>{issue.kind}</span>
                  <p>{issue.message}</p>
                </button>
              </li>
            ))}
          </ol>
        )}
        {runtimeErrors.length === 0 && issues.length === 0 && (
          <p className={styles.noIssues}>Brak wykrytych błędów i kolizji dla bieżącego widoku.</p>
        )}
      </section>
    </>
  )
}
