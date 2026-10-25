import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, Search, Shapes } from 'lucide-react'
import { workedSolutions } from '../content/course'
import { SolutionPlayer } from './SolutionPlayer'
import styles from './SolutionDebug.module.css'

export function SolutionDebug({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(12)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const normalized = query.trim().toLowerCase()

  const visible = useMemo(
    () =>
      workedSolutions.filter((solution) => {
        if (normalized.length < 2) return true
        return [
          solution.id,
          solution.title,
          solution.result,
          ...solution.scenes.flatMap((scene) => [scene.title, scene.narration, scene.formula ?? '']),
        ].some((value) => value.toLowerCase().includes(normalized))
      }),
    [normalized],
  )

  const totalScenes = workedSolutions.reduce((sum, solution) => sum + solution.scenes.length, 0)
  const visibleScenes = visible.reduce((sum, solution) => sum + solution.scenes.length, 0)
  const shown = visible.slice(0, limit)
  const hasMore = visible.length > limit

  useEffect(() => {
    if (!hasMore || typeof IntersectionObserver === 'undefined') {
      return
    }
    const node = loadMoreRef.current
    if (!node) {
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLimit((value) => Math.min(value + 12, visible.length))
        }
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, limit, visible.length])

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <button className={styles.back} onClick={onBack}>
          <ArrowLeft size={16} />
          Wróć do kursu
        </button>
        <span className={styles.badge}>
          <Shapes size={16} /> {workedSolutions.length} rozwiązań · {totalScenes} scen · widoczne {visibleScenes}
        </span>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.kicker}>NARZĘDZIE DEWELOPERSKIE</span>
          <h1>Wszystkie odtwarzacze rozwiązań naraz.</h1>
          <p>
            Każdy moduł „Rozwiązanie krok po kroku” renderuje się niezależnie, z pełną nawigacją, przekształceniami i
            figurą. Wyszukiwarka filtruje całe odtwarzacze po id, tytule, narracji lub formule.
          </p>
          <label className={styles.search}>
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setLimit(12)
              }}
              placeholder="Filtruj po id, tytule lub formule…"
              aria-label="Filtruj odtwarzacze rozwiązań"
            />
            <span>{visibleScenes}</span>
          </label>
        </section>

        {shown.map((solution) => (
          <section key={solution.id} className={styles.solution} data-solution-debug={solution.id}>
            <header className={styles.solutionHead}>
              <div>
                <span className={styles.id}>{solution.id}</span>
                <h2>{solution.title}</h2>
              </div>
              <div className={styles.tags}>
                <span className={styles.tag}>
                  {solution.animation ? 'animacja własna' : (solution.figure?.kind ?? 'brak figury')}
                </span>
                <span className={styles.tag}>{solution.scenes.length} scen</span>
              </div>
            </header>
            <SolutionPlayer solution={solution} />
          </section>
        ))}

        {visible.length === 0 && <p className={styles.empty}>Brak odtwarzaczy pasujących do „{query}”.</p>}
        {hasMore && (
          <p ref={loadMoreRef} className={styles.empty} role="status">
            Wczytywanie kolejnych rozwiązań…
          </p>
        )}
      </main>
    </div>
  )
}
