import { Component, Suspense, useMemo, useState } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, ArrowLeft, FlaskConical, RotateCw, Search } from 'lucide-react'
import { labIds, labRegistry } from './LabRegistry'
import { labMeta } from '../labs/labMeta'
import styles from './LabDebug.module.css'

class LabBoundary extends Component<{ id: string; children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[lab:${this.props.id}]`, error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.error}>
          <AlertTriangle />
          <div>
            <strong>Laboratorium zgłosiło błąd</strong>
            <pre>{this.state.error.message}</pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export function LabDebug({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState('')
  const [keys, setKeys] = useState<Record<string, number>>({})
  const normalized = query.trim().toLowerCase()
  const visible = useMemo(
    () =>
      labIds.filter((id) => {
        const meta = labMeta[id]
        return (
          normalized.length < 2 ||
          [id, meta?.title, meta?.topic].some((value) => value?.toLowerCase().includes(normalized))
        )
      }),
    [normalized],
  )
  const totalMinutes = labIds.reduce((sum, id) => sum + (labMeta[id]?.minutes ?? 4), 0)
  const remount = (id: string) => setKeys((previous) => ({ ...previous, [id]: (previous[id] ?? 0) + 1 }))

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <button className={styles.back} onClick={onBack}>
          <ArrowLeft size={16} />
          Wróć do kursu
        </button>
        <span className={styles.badge}>
          <FlaskConical size={16} /> {labIds.length} laboratoriów · ~{totalMinutes} min
        </span>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.kicker}>NARZĘDZIE DEWELOPERSKIE</span>
          <h1>Wszystkie laboratoria naraz.</h1>
          <p>
            Każdy eksperyment renderuje się niezależnie, więc błąd jednego nie zatrzymuje pozostałych. Użyj „Remount”,
            aby zresetować pojedyncze laboratorium bez przeładowania strony.
          </p>
          <label className={styles.search}>
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filtruj po id, nazwie lub temacie…"
              aria-label="Filtruj laboratoria"
            />
            <span>{visible.length}</span>
          </label>
        </section>

        <div className={styles.grid}>
          {visible.map((id) => {
            const LabComponent = labRegistry[id]
            const meta = labMeta[id]
            return (
              <section key={`${id}-${keys[id] ?? 0}`} className={styles.card} data-lab-debug={id}>
                <header className={styles.cardHead}>
                  <div className={styles.cardCopy}>
                    <span className={styles.id}>{id}</span>
                    <strong>{meta?.title ?? id}</strong>
                    <span className={styles.meta}>
                      {meta?.topic ?? 'bez tematu'} · ~{meta?.minutes ?? 4} min
                    </span>
                  </div>
                  <button className={styles.remount} onClick={() => remount(id)} title={`Remount ${id}`}>
                    <RotateCw size={14} />
                    Remount
                  </button>
                </header>
                <LabBoundary id={id}>
                  <Suspense fallback={<div className={styles.loading}>Ładowanie laboratorium…</div>}>
                    <LabComponent />
                  </Suspense>
                </LabBoundary>
              </section>
            )
          })}
        </div>
        {visible.length === 0 && <p className={styles.empty}>Brak laboratoriów pasujących do „{query}”.</p>}
      </main>
    </div>
  )
}
