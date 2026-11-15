import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Code2,
  ExternalLink,
  Factory,
  Play,
  RotateCw,
  Search,
  Shapes,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { lessons, workedSolutions } from '../content/course'
import { loadFactorySolutions } from '../content/factoryRegistry'
import type { CourseSolution } from '../types'
import { SolutionPlayer } from './SolutionPlayer'
import { SolutionDebugDiagnostics } from './SolutionDebugDiagnostics'
import styles from './SolutionDebug.module.css'

class SolutionBoundary extends Component<
  { id: string; children: ReactNode; onError: (message: string) => void },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[solution:${this.props.id}]`, error, info)
    this.props.onError(`${this.props.id}: ${error.message}`)
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.error} role="alert">
          <AlertTriangle />
          <div>
            <strong>Odtwarzacz zgłosił błąd</strong>
            <pre>{this.state.error.message}</pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export function SolutionDebug({ onBack }: { onBack: () => void }) {
  const [params, setParams] = useSearchParams()
  const requestedId = params.get('solution')
  const isFactoryMode = params.get('mode') === 'factory'
  const initialSolution = workedSolutions.find((solution) => solution.id === requestedId) ?? workedSolutions[0]
  const [selectedId, setSelectedId] = useState(initialSolution.id)
  const [query, setQuery] = useState('')
  const [onlyLinked, setOnlyLinked] = useState(false)
  const [activeScene, setActiveScene] = useState(() => Math.max(0, Number(params.get('scene') ?? 1) - 1))
  const [sceneRequest, setSceneRequest] = useState({ index: activeScene, token: 0 })
  const [remountCount, setRemountCount] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showData, setShowData] = useState(true)
  const [runtimeErrors, setRuntimeErrors] = useState<string[]>([])
  const [factorySolutions, setFactorySolutions] = useState<CourseSolution[]>([])
  const [factoryError, setFactoryError] = useState<string | null>(null)
  const playerRef = useRef<HTMLDivElement | null>(null)
  const initialScene = useRef(activeScene)
  const sceneRequestSettled = useRef(activeScene === 0)
  const factoryRequested = useRef(false)

  useEffect(() => {
    const reportError = (event: ErrorEvent) => {
      setRuntimeErrors((errors) => [...errors, event.message].slice(-20))
    }
    const reportRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason instanceof Error ? event.reason.message : String(event.reason)
      setRuntimeErrors((errors) => [...errors, message].slice(-20))
    }
    window.addEventListener('error', reportError)
    window.addEventListener('unhandledrejection', reportRejection)
    return () => {
      window.removeEventListener('error', reportError)
      window.removeEventListener('unhandledrejection', reportRejection)
    }
  }, [])

  useEffect(() => {
    if (!isFactoryMode || factoryRequested.current) return
    factoryRequested.current = true
    let cancelled = false
    loadFactorySolutions()
      .then((solutions) => {
        if (cancelled) return
        setFactorySolutions(solutions)
        setFactoryError(null)
        const requested = params.get('solution')
        setSelectedId((current) => {
          if (requested && solutions.some((entry) => entry.id === requested)) return requested
          return solutions.some((entry) => entry.id === current) ? current : (solutions[0]?.id ?? current)
        })
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setFactoryError(error instanceof Error ? error.message : String(error))
      })
    return () => {
      cancelled = true
    }
  }, [isFactoryMode])

  // Fabryki montujemy wyłącznie na żądanie trybu mode=factory; zwykły debug i
  // mode=player operują wyłącznie na workedSolutions (solutions/*).
  const universe = isFactoryMode ? factorySolutions : workedSolutions

  const solution = universe.find((entry) => entry.id === selectedId) ?? universe[0]
  const solutionIndex = universe.findIndex((entry) => entry.id === solution?.id)
  const linkedLessons = useMemo(
    () => (solution ? lessons.filter((lesson) => lesson.solutionId === solution.id) : []),
    [solution],
  )
  const normalized = query.trim().toLowerCase()
  const visible = useMemo(
    () =>
      universe.filter((entry) => {
        if (!isFactoryMode && onlyLinked && !lessons.some((lesson) => lesson.solutionId === entry.id)) return false
        if (!normalized) return true
        return [entry.id, entry.title, entry.result, ...entry.scenes.map((scene) => scene.title)].some((value) =>
          value.toLowerCase().includes(normalized),
        )
      }),
    [universe, normalized, onlyLinked, isFactoryMode],
  )

  const updateUrl = useCallback(
    (id: string, scene: number) => {
      setParams(
        (current) => {
          const next = new URLSearchParams(current)
          next.set('solution', id)
          next.set('scene', String(scene + 1))
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )

  const selectSolution = (id: string, play = false) => {
    initialScene.current = 0
    sceneRequestSettled.current = true
    setSelectedId(id)
    setActiveScene(0)
    setSceneRequest((request) => ({ index: 0, token: request.token + 1 }))
    setRemountCount((value) => value + 1)
    setRuntimeErrors([])
    setAutoPlay(play)
    setCopied(false)
    updateUrl(id, 0)
  }

  const requestScene = (index: number) => {
    initialScene.current = index
    sceneRequestSettled.current = true
    setActiveScene(index)
    setAutoPlay(false)
    setSceneRequest((request) => ({ index, token: request.token + 1 }))
    if (solution) updateUrl(solution.id, index)
  }

  const handleSceneChange = useCallback(
    (index: number) => {
      if (!sceneRequestSettled.current) {
        if (index !== initialScene.current) return
        sceneRequestSettled.current = true
      }
      setActiveScene(index)
      if (solution) updateUrl(solution.id, index)
    },
    [solution, updateUrl],
  )

  const stepSolution = (direction: number) => {
    const next = (solutionIndex + direction + universe.length) % universe.length
    selectSolution(universe[next].id)
  }

  const toggleFactoryMode = () => {
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (isFactoryMode) next.delete('mode')
        else next.set('mode', 'factory')
        return next
      },
      { replace: true },
    )
    initialScene.current = 0
    sceneRequestSettled.current = true
    setActiveScene(0)
    setSceneRequest((request) => ({ index: 0, token: request.token + 1 }))
    setAutoPlay(false)
    setRuntimeErrors([])
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  const totalScenes = universe.reduce((sum, entry) => sum + entry.scenes.length, 0)
  const solutionPlayer = solution ? (
    <SolutionBoundary
      key={`boundary-${solution.id}-${remountCount}`}
      id={solution.id}
      onError={(message) => setRuntimeErrors((errors) => [...errors, message].slice(-20))}
    >
      <Suspense fallback={<div className={styles.loading}>Ładowanie odtwarzacza…</div>}>
        <SolutionPlayer
          key={`${solution.id}-${remountCount}`}
          solution={solution}
          autoPlay={autoPlay}
          sceneRequest={sceneRequest}
          onSceneChange={handleSceneChange}
        />
      </Suspense>
    </SolutionBoundary>
  ) : null

  if (params.get('mode') === 'player') {
    return (
      <main className={styles.playerOnly}>
        <div className={styles.playerOnlyInner} ref={playerRef}>
          {solution ? solutionPlayer : <div className={styles.loading}>Ładowanie odtwarzacza…</div>}
        </div>
      </main>
    )
  }

  if (isFactoryMode && !solution) {
    return (
      <div className={styles.page}>
        <header className={styles.topbar}>
          <button className={styles.back} onClick={onBack}>
            <ArrowLeft size={16} /> Wróć do kursu
          </button>
          <span className={styles.badge}>
            <Factory size={15} /> Tryb fabryk — podgląd deweloperski
          </span>
          <button className={styles.factoryToggleActive} onClick={toggleFactoryMode}>
            <Shapes size={15} /> Rozwiązania kursu
          </button>
          <span className={styles.route}>/debug/solutions?mode=factory</span>
        </header>
        <main className={styles.workspace}>
          <section className={styles.workbench}>
            <div className={styles.loading} role="status">
              {factoryError ? `Nie udało się wczytać fabryk: ${factoryError}` : 'Ładowanie fabryk…'}
            </div>
          </section>
        </main>
      </div>
    )
  }

  if (!solution) return null

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <button className={styles.back} onClick={onBack}>
          <ArrowLeft size={16} /> Wróć do kursu
        </button>
        <span className={styles.badge}>
          <Shapes size={15} /> {universe.length} {isFactoryMode ? 'fabryk' : 'rozwiązań'} · {totalScenes} scen
        </span>
        <button
          className={isFactoryMode ? styles.factoryToggleActive : styles.factoryToggle}
          onClick={toggleFactoryMode}
          aria-pressed={isFactoryMode}
          data-factory-toggle
        >
          <Factory size={15} /> Fabryki
        </button>
        <span className={styles.route}>/debug/solutions</span>
      </header>

      <main className={styles.workspace}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHead}>
            <span className={styles.kicker}>{isFactoryMode ? 'FABRYKI (DEBUG)' : 'BIBLIOTEKA DEBUG'}</span>
            <strong>{isFactoryMode ? 'Wybierz fabrykę' : 'Wybierz rozwiązanie'}</strong>
            <span>{visible.length} wyników</span>
          </div>
          <label className={styles.search}>
            <Search size={15} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="id, tytuł lub scena…"
              aria-label="Filtruj rozwiązania"
            />
          </label>
          {!isFactoryMode && (
            <label className={styles.filter}>
              <input type="checkbox" checked={onlyLinked} onChange={(event) => setOnlyLinked(event.target.checked)} />
              Tylko podpięte do lekcji
            </label>
          )}
          <nav className={styles.solutionList} aria-label="Rozwiązania do debugowania">
            {visible.map((entry) => (
              <button
                key={entry.id}
                className={entry.id === solution.id ? styles.solutionItemActive : styles.solutionItem}
                onClick={() => selectSolution(entry.id)}
                data-solution-option={entry.id}
              >
                <span className={styles.itemId}>{entry.id}</span>
                <span className={styles.itemTitle}>{entry.title}</span>
                <span className={styles.itemMeta}>
                  {entry.scenes.length} scen · {entry.animation ? 'SVG' : (entry.figure?.kind ?? 'scena')}
                </span>
              </button>
            ))}
            {visible.length === 0 && <p className={styles.empty}>Brak pasujących rozwiązań.</p>}
          </nav>
        </aside>

        <section className={styles.workbench} data-solution-debug={solution.id}>
          {isFactoryMode && (
            <div className={styles.factoryBanner} role="status" data-factory-banner>
              <Factory size={14} />
              <span>Tryb fabryk — podgląd deweloperski. Fabryki nie są częścią kursu ani linków AnimatedSolution.</span>
              <button onClick={toggleFactoryMode}>
                <Shapes size={14} /> Rozwiązania kursu
              </button>
            </div>
          )}
          <div className={styles.workbenchBar}>
            <div className={styles.solutionNav}>
              <button onClick={() => stepSolution(-1)} aria-label="Poprzednie rozwiązanie">
                <ChevronLeft size={16} />
              </button>
              <span>
                {solutionIndex + 1} / {universe.length}
              </span>
              <button onClick={() => stepSolution(1)} aria-label="Następne rozwiązanie">
                <ChevronRight size={16} />
              </button>
            </div>
            <div className={styles.actions}>
              <button onClick={() => selectSolution(solution.id, true)}>
                <Play size={14} /> Odtwórz od startu
              </button>
              <button
                onClick={() => {
                  setRemountCount((value) => value + 1)
                  setAutoPlay(false)
                }}
              >
                <RotateCw size={14} /> Remount
              </button>
              <button onClick={copyLink}>
                {copied ? <Check size={14} /> : <Clipboard size={14} />} {copied ? 'Skopiowano' : 'Kopiuj URL'}
              </button>
            </div>
          </div>

          <header className={styles.solutionHead}>
            <div>
              <span className={styles.id}>{solution.id}</span>
              <h1>{solution.title}</h1>
            </div>
            <div className={styles.tags}>
              <span>{solution.animation ? 'animacja własna' : (solution.figure?.kind ?? 'brak figury')}</span>
              <span>{solution.scenes.length} scen</span>
              <span>{linkedLessons.length} lekcji</span>
            </div>
          </header>

          <div className={styles.sceneStrip} aria-label="Skok do sceny">
            {solution.scenes.map((scene, index) => (
              <button
                key={`${scene.title}-${index}`}
                className={index === activeScene ? styles.sceneActive : styles.sceneButton}
                onClick={() => requestScene(index)}
                aria-current={index === activeScene ? 'step' : undefined}
                data-scene-index={index + 1}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {scene.title}
              </button>
            ))}
          </div>

          <div className={styles.playerFrame} ref={playerRef}>
            {solutionPlayer}
            <SolutionDebugDiagnostics
              targetRef={playerRef}
              sceneIndex={activeScene}
              remountCount={remountCount}
              runtimeErrors={runtimeErrors}
              onClearErrors={() => setRuntimeErrors([])}
            />
          </div>

          <section className={styles.inspector}>
            <button className={styles.inspectorToggle} onClick={() => setShowData((value) => !value)}>
              <Code2 size={15} /> Inspektor danych
              <span>{showData ? 'ukryj' : 'pokaż'}</span>
            </button>
            {showData && (
              <div className={styles.inspectorBody}>
                <div>
                  <span className={styles.inspectorLabel}>AKTYWNA SCENA</span>
                  <strong>
                    {activeScene + 1}. {solution.scenes[activeScene]?.title}
                  </strong>
                  <p>{solution.scenes[activeScene]?.narration}</p>
                  <code>{solution.scenes[activeScene]?.formula ?? 'brak formuły'}</code>
                </div>
                <dl>
                  <div>
                    <dt>focus.metric</dt>
                    <dd>{solution.scenes[activeScene]?.focus?.metric ?? '—'}</dd>
                  </div>
                  <div>
                    <dt>visual</dt>
                    <dd>{solution.scenes[activeScene]?.visual}</dd>
                  </div>
                  <div>
                    <dt>duration</dt>
                    <dd>{solution.duration} min</dd>
                  </div>
                  <div>
                    <dt>remount</dt>
                    <dd>{remountCount}</dd>
                  </div>
                </dl>
                <div className={styles.links}>
                  <span className={styles.inspectorLabel}>POWIĄZANE LEKCJE</span>
                  {linkedLessons.length > 0 ? (
                    linkedLessons.map((lesson) => (
                      <a key={lesson.id} href={`/course/wytrzymalosc/lesson/${lesson.id}`} target="_blank">
                        {lesson.id} <ExternalLink size={12} />
                      </a>
                    ))
                  ) : (
                    <span className={styles.unlinked}>Niepodpięte do programu</span>
                  )}
                </div>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  )
}
