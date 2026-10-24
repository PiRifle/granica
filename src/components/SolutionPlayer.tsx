import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, FastForward, Gauge, Pause, Play, Rewind, RotateCcw } from 'lucide-react'
import type { CourseSolution, SolutionScene } from '../types'
import { splitFormula } from '../lib/mathAnimation'
import { inferFocus, resolveFocus, SolutionFigureView } from './SolutionFigure'
import { MathTransform } from './solution-figures/MathTransform'
import { SceneVisual } from './solution-figures/SceneVisual'
import styles from './SolutionPlayer.module.css'

const local = (...values: Array<string | false | null | undefined>) =>
  values
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => styles[name] ?? name)
    .join(' ')

const SPEEDS = [1, 1.5, 2] as const
const SCENE_MS = 7000
const STEP_MS = 2600
const SKIP_MS = 5000

function formatTime(value: number) {
  const totalSeconds = Math.max(0, Math.round(value / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function SolutionPlayer({ solution }: { solution: CourseSolution }) {
  const [position, setPosition] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<number>(1)
  const [seeking, setSeeking] = useState(false)
  const [heightFloor, setHeightFloor] = useState(0)
  const [stageFloor, setStageFloor] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const previousPositionRef = useRef(0)
  const Body = useMemo(() => lazy(solution.loadBody), [solution.id, solution.loadBody])

  useEffect(() => {
    setHeightFloor(0)
    setStageFloor(0)
  }, [solution.id])

  useEffect(() => {
    if (position < previousPositionRef.current - 1) {
      setHeightFloor(0)
      setStageFloor(0)
    }
    previousPositionRef.current = position
  }, [position])

  const requestHeight = useCallback(
    (height: number) => {
      if (seeking) return
      setHeightFloor((current) => Math.max(current, height))
    },
    [seeking],
  )

  const lastIndex = solution.scenes.length - 1
  const sceneSteps = useMemo(
    () => solution.scenes.map((item) => (item.formula ? splitFormula(item.formula) : [])),
    [solution.scenes],
  )
  const timing = useMemo(() => {
    let start = 0
    return solution.scenes.map((_, sceneIndex) => {
      const steps = sceneSteps[sceneIndex]
      const duration = Math.max(SCENE_MS, Math.max(1, steps.length) * STEP_MS)
      const entry = { start, duration, steps }
      start += duration
      return entry
    })
  }, [sceneSteps, solution.scenes])
  const totalMs = timing.length > 0 ? timing[timing.length - 1].start + timing[timing.length - 1].duration : 0
  let index = 0
  for (let sceneIndex = 0; sceneIndex < timing.length; sceneIndex += 1) {
    if (position >= timing[sceneIndex].start) index = sceneIndex
    else break
  }
  const activeTiming = timing[index]
  const localMs = Math.min(activeTiming.duration, Math.max(0, position - activeTiming.start))
  const sceneProgress = activeTiming.duration > 0 ? localMs / activeTiming.duration : 0
  const steps = activeTiming.steps
  const stepIndex = steps.length > 0 ? Math.min(steps.length - 1, Math.floor(sceneProgress * steps.length)) : 0
  const stepProgress = steps.length > 0 ? sceneProgress * steps.length - stepIndex : sceneProgress
  const stepFormula = steps[stepIndex]
  const scene = solution.scenes[index]

  useLayoutEffect(() => {
    if (seeking) return
    const element = stageRef.current
    if (!element) return
    let timer: number | undefined
    const measure = () => {
      if (timer) window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        setStageFloor((current) => Math.max(current, element.scrollHeight))
      }, 400)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => {
      observer.disconnect()
      if (timer) window.clearTimeout(timer)
    }
  }, [index, seeking, solution.id])
  const baseFocus = solution.figure ? resolveFocus(scene, solution.figure) : undefined
  const stepFocus =
    solution.figure && stepFormula
      ? inferFocus({ ...scene, title: '', narration: '', formula: stepFormula }, solution.figure)
      : undefined
  const figureFocus =
    baseFocus || stepFocus
      ? { metric: stepFocus?.metric ?? baseFocus?.metric, segment: stepFocus?.segment ?? baseFocus?.segment }
      : undefined
  const revealedFocus = useMemo(() => {
    if (!solution.figure) return []
    const revealed = new Set<string>()
    for (let sceneIndex = 0; sceneIndex <= index; sceneIndex += 1) {
      const focus = resolveFocus(solution.scenes[sceneIndex], solution.figure)
      if (focus.metric) revealed.add(focus.metric)
    }
    return Array.from(revealed)
  }, [solution, index])
  const revealedMath = useMemo(() => {
    const parts: string[] = []
    for (let sceneIndex = 0; sceneIndex < index; sceneIndex += 1) parts.push(...sceneSteps[sceneIndex])
    parts.push(...(sceneSteps[index]?.slice(0, stepIndex + 1) ?? []))
    return parts.join(' ')
  }, [index, sceneSteps, stepIndex])
  const progress = totalMs > 0 ? (position / totalMs) * 100 : 0
  const atEnd = position >= totalMs

  useEffect(() => {
    if (!playing || atEnd) return
    let last = performance.now()
    const timer = window.setInterval(() => {
      const now = performance.now()
      const delta = (now - last) * speed
      last = now
      setPosition((current) => Math.min(totalMs, current + delta))
    }, 100)
    return () => window.clearInterval(timer)
  }, [atEnd, playing, speed, totalMs])

  useEffect(() => {
    if (playing && atEnd) setPlaying(false)
  }, [atEnd, playing])

  const seekTo = (value: number) => setPosition(Math.max(0, Math.min(totalMs, value)))

  const seekFromClientX = (clientX: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    if (rect.width === 0) return
    seekTo(((clientX - rect.left) / rect.width) * totalMs)
  }

  const reset = () => {
    setPlaying(false)
    setPosition(0)
  }

  const toggle = () => {
    if (atEnd) {
      setPosition(0)
      setPlaying(true)
      return
    }
    setPlaying((value) => !value)
  }

  const goToScene = (target: number) => {
    const sceneIndex = Math.max(0, Math.min(lastIndex, target))
    setPlaying(false)
    seekTo(timing[sceneIndex]?.start ?? 0)
  }

  return (
    <section className={local('solution-player')} aria-label={`Animowane rozwiązanie: ${solution.title}`}>
      <div className={local('solution-head')}>
        <div>
          <span className={local('section-kicker')}>ROZWIĄZANIE KROK PO KROKU</span>
          <h2>{solution.title}</h2>
          <div className={local('solution-problem')}>
            <Suspense fallback={<p>Ładowanie treści…</p>}>
              <Body components={{}} />
            </Suspense>
          </div>
        </div>
        <span className={local('solution-duration')}>
          <Gauge size={15} /> {solution.duration} min
        </span>
      </div>
      <div className={local('solution-given')}>
        {solution.given.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div
        ref={stageRef}
        className={local('solution-stage')}
        style={{ minHeight: stageFloor > 0 ? `${stageFloor}px` : undefined }}
      >
        <div className={local('solution-visual')}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${solution.id}-${index}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {solution.figure ? (
                <SolutionFigureView
                  figure={solution.figure}
                  scene={scene}
                  focus={figureFocus}
                  animationKey={`${index}-${stepIndex}`}
                  progress={playing ? stepProgress : 1}
                  revealedFocus={revealedFocus}
                  sceneIndex={index}
                  revealedMath={revealedMath}
                  heightFloor={heightFloor}
                  onRequestHeight={requestHeight}
                />
              ) : (
                <SceneVisual scene={scene} index={index} />
              )}
            </motion.div>
          </AnimatePresence>
          <span className={local('solution-scene-count')}>
            SCENA {index + 1} / {solution.scenes.length}
          </span>
        </div>
        <div className={local('solution-copy')}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <span className={local('solution-scene-title')}>{scene.title}</span>
              <p>{scene.narration}</p>
              {scene.formula && <MathTransform formula={scene.formula} progress={sceneProgress} />}
              <p className={local('solution-caption')}>{scene.caption}</p>
              {scene.emphasis && <p className={local('solution-emphasis')}>{scene.emphasis}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className={local('solution-controls')}>
        <div className={local('solution-buttons')}>
          <button className={local('icon-button')} type="button" onClick={reset} aria-label="Od początku">
            <RotateCcw size={17} />
          </button>
          <button
            className={local('icon-button')}
            type="button"
            onClick={() => goToScene(index - 1)}
            aria-label="Poprzednia scena"
            disabled={index === 0}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className={local('icon-button')}
            type="button"
            onClick={() => seekTo(position - SKIP_MS)}
            aria-label="Cofnij 5 sekund"
            disabled={position <= 0}
          >
            <Rewind size={16} />
          </button>
          <button className={local('button button-dark button-small')} type="button" onClick={toggle}>
            {playing ? <Pause size={15} /> : <Play size={15} />}
            {playing ? 'Pauza' : 'Odtwarzaj'}
          </button>
          <button
            className={local('icon-button')}
            type="button"
            onClick={() => seekTo(position + SKIP_MS)}
            aria-label="Przewiń 5 sekund"
            disabled={position >= totalMs}
          >
            <FastForward size={16} />
          </button>
          <button
            className={local('icon-button')}
            type="button"
            onClick={() => goToScene(index + 1)}
            aria-label="Następna scena"
            disabled={index === lastIndex}
          >
            <ChevronRight size={18} />
          </button>
          <div className={local('solution-speed')} role="group" aria-label="Tempo odtwarzania">
            {SPEEDS.map((value) => (
              <button
                key={value}
                type="button"
                className={speed === value ? local('active') : undefined}
                aria-pressed={speed === value}
                onClick={() => setSpeed(value)}
              >
                {value}×
              </button>
            ))}
          </div>
        </div>
        <div className={local('solution-timeline')}>
          <span className={local('solution-time')}>{formatTime(position)}</span>
          <div
            ref={trackRef}
            className={local('solution-track', seeking && 'seeking')}
            role="slider"
            tabIndex={0}
            aria-label="Postęp odtwarzania"
            aria-valuemin={0}
            aria-valuemax={Math.round(totalMs / 1000)}
            aria-valuenow={Math.round(position / 1000)}
            aria-valuetext={`${formatTime(position)} z ${formatTime(totalMs)}`}
            onPointerDown={(event) => {
              event.preventDefault()
              event.currentTarget.focus()
              event.currentTarget.setPointerCapture(event.pointerId)
              setSeeking(true)
              seekFromClientX(event.clientX)
            }}
            onPointerMove={(event) => {
              if (seeking) seekFromClientX(event.clientX)
            }}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId)
              }
              setSeeking(false)
            }}
            onPointerCancel={() => setSeeking(false)}
            onKeyDown={(event) => {
              const step = event.shiftKey ? SCENE_MS : SKIP_MS
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                seekTo(position - step)
              } else if (event.key === 'ArrowRight') {
                event.preventDefault()
                seekTo(position + step)
              } else if (event.key === 'Home') {
                event.preventDefault()
                seekTo(0)
              } else if (event.key === 'End') {
                event.preventDefault()
                seekTo(totalMs)
              }
            }}
          >
            <span className={local('solution-track-fill')} style={{ width: `${progress}%` }} />
            {solution.scenes.map((item, sceneIndex) =>
              sceneIndex === 0 ? null : (
                <span
                  key={`tick-${item.title}-${sceneIndex}`}
                  className={local('solution-track-tick')}
                  style={{ left: `${(timing[sceneIndex].start / totalMs) * 100}%` }}
                  title={`Scena ${sceneIndex + 1}: ${item.title}`}
                />
              ),
            )}
            <span className={local('solution-track-thumb')} style={{ left: `${progress}%` }} />
          </div>
          <span className={local('solution-time')}>{formatTime(totalMs)}</span>
        </div>
      </div>
      <div className={local('solution-result')}>
        <strong>Wynik:</strong>
        <span>{solution.result}</span>
      </div>
    </section>
  )
}
