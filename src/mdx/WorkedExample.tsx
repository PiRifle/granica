import { Children, isValidElement, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, ChevronLeft, ChevronRight, FlaskConical, Pause, Play } from 'lucide-react'
import styles from './Content.module.css'
import { inline } from './children'

const STEP_MS = 4500

type WorkedParts = {
  given: ReactNode
  hasGiven: boolean
  steps: ReactNode[]
  result: ReactNode
  hasResult: boolean
}

function parseWorked(children: ReactNode): WorkedParts {
  const parts: WorkedParts = { given: null, hasGiven: false, steps: [], result: null, hasResult: false }

  Children.forEach(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return

    if (child.type === Given) {
      parts.given = child.props.children
      parts.hasGiven = true
      return
    }

    if (child.type === Steps) {
      Children.forEach(child.props.children, (step) => {
        if (isValidElement<{ children?: ReactNode }>(step) && step.type === Step) {
          parts.steps.push(step.props.children)
        }
      })
      return
    }

    if (child.type === Result) {
      parts.result = child.props.children
      parts.hasResult = true
    }
  })

  return parts
}

function WorkedHeading() {
  return (
    <div className={styles.workedHeading}>
      <span className={styles.roundIcon}>
        <FlaskConical />
      </span>
      <div>
        <span className="section-kicker">PRZYKŁAD PROWADZONY</span>
        <h2>Od danych do wyniku.</h2>
      </div>
    </div>
  )
}

export function WorkedExample({ children }: { children: ReactNode }) {
  const { given, hasGiven, steps, result, hasResult } = parseWorked(children)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const trackRef = useRef<HTMLDivElement>(null)
  const lastIndex = steps.length - 1

  useEffect(() => {
    if (!playing) return
    if (index >= lastIndex) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(() => {
      setIndex((current) => Math.min(lastIndex, current + 1))
    }, STEP_MS)
    return () => window.clearTimeout(timer)
  }, [index, lastIndex, playing])

  if (steps.length === 0) {
    return (
      <section className={styles.workedExample}>
        <WorkedHeading />
        {children}
      </section>
    )
  }

  const safeIndex = Math.min(index, lastIndex)
  const atLast = safeIndex === lastIndex
  const progress = lastIndex === 0 ? 100 : (safeIndex / lastIndex) * 100

  const seekToStep = (target: number) => {
    setPlaying(false)
    setIndex(Math.max(0, Math.min(lastIndex, target)))
  }

  const seekFromClientX = (clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    if (rect.width === 0) return
    const ratio = (clientX - rect.left) / rect.width
    seekToStep(Math.round(Math.max(0, Math.min(1, ratio)) * lastIndex))
  }

  const toggle = () => {
    if (playing) {
      setPlaying(false)
      return
    }
    if (atLast) {
      setIndex(0)
      setPlaying(true)
      return
    }
    setPlaying(true)
  }

  return (
    <section className={styles.workedExample}>
      <WorkedHeading />
      {hasGiven && <Given>{given}</Given>}
      <div className={styles.workedPlayer}>
        <div className={styles.workedStepPanel} aria-live="polite">
          <span className={styles.workedStepKicker}>KROK {safeIndex + 1}</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={safeIndex}
              className={styles.workedStepText}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {inline(steps[safeIndex])}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={styles.workedControls}>
          <div className={styles.workedButtons}>
            <button
              type="button"
              className={styles.workedButton}
              onClick={() => seekToStep(safeIndex - 1)}
              aria-label="Poprzedni krok"
              disabled={safeIndex === 0}
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button"
              className={`${styles.workedButton} ${styles.workedPlay}`}
              onClick={toggle}
              aria-label={playing ? 'Wstrzymaj odtwarzanie' : 'Odtwarzaj kroki'}
              aria-pressed={playing}
            >
              {playing ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <button
              type="button"
              className={styles.workedButton}
              onClick={() => seekToStep(safeIndex + 1)}
              aria-label="Następny krok"
              disabled={atLast}
            >
              <ChevronRight size={17} />
            </button>
          </div>
          <span className={styles.workedStepCount}>
            Krok {safeIndex + 1} / {steps.length}
          </span>
        </div>
        <div
          ref={trackRef}
          className={styles.workedProgress}
          role="slider"
          tabIndex={0}
          aria-label="Postęp przykładowego rozwiązania"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={safeIndex + 1}
          aria-valuetext={`Krok ${safeIndex + 1} z ${steps.length}`}
          onPointerDown={(event) => {
            event.preventDefault()
            event.currentTarget.focus()
            event.currentTarget.setPointerCapture(event.pointerId)
            seekFromClientX(event.clientX)
          }}
          onPointerMove={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              seekFromClientX(event.clientX)
            }
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              seekToStep(safeIndex - 1)
            } else if (event.key === 'ArrowRight') {
              event.preventDefault()
              seekToStep(safeIndex + 1)
            } else if (event.key === 'Home') {
              event.preventDefault()
              seekToStep(0)
            } else if (event.key === 'End') {
              event.preventDefault()
              seekToStep(lastIndex)
            }
          }}
        >
          <span className={styles.workedProgressFill} style={{ width: `${progress}%` }} />
          {steps.map((_, stepIndex) =>
            stepIndex === 0 ? null : (
              <span
                key={`tick-${stepIndex}`}
                className={styles.workedProgressTick}
                style={{ left: `${(stepIndex / lastIndex) * 100}%` }}
              />
            ),
          )}
          <span className={styles.workedProgressThumb} style={{ left: `${progress}%` }} />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {atLast && hasResult && (
          <motion.div
            key="result"
            className={styles.workedResultWrap}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Result>{result}</Result>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function Given({ children }: { children: ReactNode }) {
  return (
    <p className={styles.workedGiven}>
      <strong>Dane:</strong> {inline(children)}
    </p>
  )
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className={styles.steps}>{children}</ol>
}

export function Step({ children }: { children: ReactNode }) {
  return <li>{inline(children)}</li>
}

export function Result({ children }: { children: ReactNode }) {
  return (
    <div className={styles.workedResult}>
      <CheckCircle2 size={17} />
      <strong>Wynik:</strong> {inline(children)}
    </div>
  )
}
