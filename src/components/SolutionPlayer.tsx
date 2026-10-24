import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { InlineMath } from 'react-katex'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, FastForward, Gauge, Pause, Play, Rewind, RotateCcw } from 'lucide-react'
import type { CourseSolution, SolutionScene } from '../types'
import { splitFormula, tokenizeFormula, type MathToken } from '../lib/mathAnimation'
import { inferFocus, resolveFocus, SolutionFigureView } from './SolutionFigure'
import styles from './SolutionPlayer.module.css'

const cx = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(' ')
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

function AxialVisual({ phase }: { phase: number }) {
  const stretch = 22 + (phase % 3) * 8
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Pręt rozciągany z siłami na końcach">
      <line x1="30" y1="110" x2="390" y2="110" stroke="currentColor" strokeOpacity=".16" strokeDasharray="4 5" />
      <motion.rect
        x={70}
        y={92}
        width={280 + stretch}
        height={36}
        rx={6}
        fill="#edf1ff"
        stroke="#4f6df5"
        strokeWidth={2}
        animate={{ width: 280 + stretch }}
        transition={{ type: 'spring', stiffness: 80, damping: 16 }}
      />
      <motion.g animate={{ x: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }}>
        <path d="M70 92 L40 110 L70 128" fill="none" stroke="#ff6b45" strokeWidth={3} />
        <path d="M70 80 L40 80 M70 140 L40 140" stroke="#ff6b45" strokeWidth={2} />
      </motion.g>
      <motion.g animate={{ x: [3, -3, 3] }} transition={{ duration: 2, repeat: Infinity }}>
        <path
          d={`M${350 + stretch} 92 L${380 + stretch} 110 L${350 + stretch} 128`}
          fill="none"
          stroke="#ff6b45"
          strokeWidth={3}
        />
        <path
          d={`M${350 + stretch} 80 L${380 + stretch} 80 M${350 + stretch} 140 L${380 + stretch} 140`}
          stroke="#ff6b45"
          strokeWidth={2}
        />
      </motion.g>
      <text x="40" y="62" fontSize="13" fill="#c65c43">
        N
      </text>
      <text x={366 + stretch} y="62" fontSize="13" fill="#c65c43">
        N
      </text>
      <text x="210" y="186" textAnchor="middle" fontSize="12" fill="#68727e">
        przekrój A, długość L
      </text>
      <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#87929d">
        wydłużenie ΔL jest proporcjonalne do N
      </text>
    </svg>
  )
}

function ThermalVisual({ phase }: { phase: number }) {
  const blocked = phase % 2 === 1
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Pręt swobodny i zablokowany podczas ogrzewania">
      <rect x="70" y="60" width="280" height="34" rx="5" fill="#fff2ed" stroke="#ff6b45" strokeWidth={2} />
      <rect
        x="70"
        y="130"
        width={blocked ? 280 : 280 + 20}
        height="34"
        rx="5"
        fill="#edf1ff"
        stroke="#4f6df5"
        strokeWidth={2}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.path
          key={i}
          d={`M${120 + i * 55} 44 q8 -12 0 -22`}
          fill="none"
          stroke="#ff6b45"
          strokeWidth={2}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      <rect x="56" y="122" width="14" height="50" fill="#68727e" />
      <rect x="350" y="122" width="14" height="50" fill="#68727e" />
      <text x="70" y="116" fontSize="11" fill="#87929d">
        swobodny: wydłuża się, σ = 0
      </text>
      <text x="70" y="188" fontSize="11" fill="#87929d">
        zablokowany: długość stała, σ = −EαΔT
      </text>
      <motion.line
        x1="350"
        y1="101"
        x2={blocked ? 350 : 370}
        y2="101"
        stroke="#ff6b45"
        strokeWidth={2}
        animate={{ x2: blocked ? 350 : 370 }}
      />
    </svg>
  )
}

function SectionVisual({ phase }: { phase: number }) {
  const arrows = 9
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Rozkład naprężeń w przekroju">
      <rect x="150" y="36" width="120" height="148" rx="4" fill="#f5f7fc" stroke="#bfc7d1" strokeWidth={2} />
      {Array.from({ length: arrows }, (_, i) => {
        const intensity = 8 + Math.abs(i - (arrows - 1) / 2) * 6 + (phase % 3) * 2
        return (
          <line
            key={i}
            x1={150 - intensity - 8}
            y1={48 + i * 16}
            x2={146}
            y2={48 + i * 16}
            stroke="#4f6df5"
            strokeWidth={2.5}
          />
        )
      })}
      <line x1="150" y1="110" x2="270" y2="110" stroke="#ff6b45" strokeDasharray="5 4" strokeWidth={1.5} />
      <text x="278" y="110" fontSize="11" fill="#c65c43">
        oś obojętna
      </text>
      <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#87929d">
        σ = N/A — równomierny rozkład w przekroju
      </text>
    </svg>
  )
}

function CubeVisual({ phase }: { phase: number }) {
  const shear = 10 + (phase % 3) * 5
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Element sześcienny ze składowymi stanu naprężenia">
      <motion.g
        animate={{ rotate: [0, shear * 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '210px 110px' }}
      >
        <rect x="160" y="60" width="100" height="100" fill="#f5f7fc" stroke="#87929d" strokeWidth={2} />
        <path d="M160 60 L190 35 L290 35 L260 60" fill="#edf1ff" stroke="#87929d" strokeWidth={2} />
        <path d="M260 60 L290 35 L290 135 L260 160" fill="#f5f7fc" stroke="#87929d" strokeWidth={2} />
        <line x1="210" y1="110" x2="210" y2="60" stroke="#c65c43" strokeWidth={2} markerEnd="url(#cubeArrow)" />
        <line x1="210" y1="110" x2="260" y2="110" stroke="#4f6df5" strokeWidth={2} />
        <line x1="210" y1="110" x2="170" y2="145" stroke="#6b7c8d" strokeWidth={2} />
      </motion.g>
      <defs>
        <marker id="cubeArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#c65c43" />
        </marker>
      </defs>
      <text x="216" y="56" fontSize="11" fill="#c65c43">
        σy
      </text>
      <text x="266" y="114" fontSize="11" fill="#3155d9">
        σx
      </text>
      <text x="150" y="158" fontSize="11" fill="#6b7c8d">
        σz
      </text>
      <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#87929d">
        składowe tensora naprężenia w punkcie
      </text>
    </svg>
  )
}

function RosetteVisual({ phase }: { phase: number }) {
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Rozeta tensometryczna 0, 45 i 90 stopni">
      <circle cx="210" cy="108" r="72" fill="#f5f7fc" stroke="#d3d9e0" strokeWidth={1.5} />
      <motion.g
        animate={{ rotate: phase % 3 === 0 ? [0, 8, 0] : 0 }}
        transition={{ duration: 2 }}
        style={{ transformOrigin: '210px 108px' }}
      >
        <line x1="210" y1="108" x2="282" y2="108" stroke="#ff6b45" strokeWidth={3} />
        <line x1="210" y1="108" x2="261" y2="57" stroke="#4f6df5" strokeWidth={3} />
        <line x1="210" y1="108" x2="210" y2="36" stroke="#6b7c8d" strokeWidth={3} />
      </motion.g>
      <text x="288" y="112" fontSize="11" fill="#c65c43">
        0°
      </text>
      <text x="264" y="48" fontSize="11" fill="#3155d9">
        45°
      </text>
      <text x="204" y="28" fontSize="11" fill="#6b7c8d">
        90°
      </text>
      <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#87929d">
        trzy kierunki pomiarowe wyznaczają tensor odkształcenia
      </text>
    </svg>
  )
}

function BeamVisual({ phase }: { phase: number }) {
  const deflection = 18 + (phase % 3) * 8
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Belka zginana z podporami i obciążeniem">
      <motion.path
        d={`M60 120 Q210 ${120 + deflection} 360 120`}
        fill="none"
        stroke="#4f6df5"
        strokeWidth={10}
        strokeLinecap="round"
        animate={{
          d: [
            `M60 120 Q210 ${120 + deflection * 0.4} 360 120`,
            `M60 120 Q210 ${120 + deflection} 360 120`,
            `M60 120 Q210 ${120 + deflection * 0.4} 360 120`,
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path d="M45 135 L60 120 L75 135 Z M345 135 L360 120 L375 135 Z" fill="#68727e" />
      <line x1="20" y1="137" x2="400" y2="137" stroke="#68727e" strokeWidth={1.5} />
      <motion.g animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <line x1="210" y1="38" x2="210" y2="94" stroke="#ff6b45" strokeWidth={3} />
        <path d="M200 83 L210 99 L220 83" fill="none" stroke="#ff6b45" strokeWidth={3} />
      </motion.g>
      <text x="210" y="28" textAnchor="middle" fontSize="11" fill="#c65c43">
        P
      </text>
      <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#87929d">
        reakcje → siły tnące T(x) → moment M(x) → naprężenia σ
      </text>
    </svg>
  )
}

function DiagramVisual({ phase }: { phase: number }) {
  const curve = phase % 3
  const path =
    curve === 0
      ? 'M60 170 C130 170 140 60 210 60 C280 60 290 170 360 170'
      : curve === 1
        ? 'M60 170 L360 60'
        : 'M60 60 Q210 190 360 60'
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Wykres pomocniczy rozwiązania">
      <line x1="55" y1="20" x2="55" y2="175" stroke="#bfc7d1" />
      <line x1="55" y1="175" x2="385" y2="175" stroke="#bfc7d1" />
      <motion.path
        d={path}
        fill="none"
        stroke="#4f6df5"
        strokeWidth={3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6 }}
      />
      <text x="360" y="196" fontSize="10" fill="#87929d">
        x
      </text>
      <text x="30" y="30" fontSize="10" fill="#87929d">
        wynik
      </text>
    </svg>
  )
}

function SceneVisual({ scene, index }: { scene: SolutionScene; index: number }) {
  switch (scene.visual) {
    case 'axial':
      return <AxialVisual phase={index} />
    case 'thermal':
      return <ThermalVisual phase={index} />
    case 'section':
      return <SectionVisual phase={index} />
    case 'cube':
      return <CubeVisual phase={index} />
    case 'rosette':
      return <RosetteVisual phase={index} />
    case 'beam':
      return <BeamVisual phase={index} />
    default:
      return <DiagramVisual phase={index} />
  }
}

function changedTokenRatio(previous: MathToken[], current: MathToken[]) {
  if (previous.length === 0) return 0
  const counts = new Map<string, number>()
  for (const token of previous) counts.set(token.math, (counts.get(token.math) ?? 0) + 1)
  let unchanged = 0
  for (const token of current) {
    const count = counts.get(token.math) ?? 0
    if (count > 0) {
      unchanged += 1
      counts.set(token.math, count - 1)
    }
  }
  return 1 - unchanged / Math.max(previous.length, current.length)
}

function MathTransform({ formula, progress }: { formula: string; progress: number }) {
  const steps = useMemo(() => splitFormula(formula), [formula])
  const active = Math.min(steps.length - 1, Math.max(0, Math.floor(progress * steps.length)))
  const stepProgress = Math.max(0, Math.min(1, progress * steps.length - active))
  const currentFormula = steps[active] ?? formula
  const tokens = useMemo(() => tokenizeFormula(currentFormula), [currentFormula])
  const contextFormula = useMemo(() => {
    for (let stepIndex = active; stepIndex >= 1; stepIndex -= 1) {
      const from = steps[stepIndex - 1]
      const to = steps[stepIndex]
      if (changedTokenRatio(tokenizeFormula(from), tokenizeFormula(to)) > 0.7) return from
    }
    return undefined
  }, [steps, active])
  const contextTokens = useMemo(() => (contextFormula ? tokenizeFormula(contextFormula) : []), [contextFormula])
  const totalTokenLength = tokens.reduce((sum, token) => sum + token.math.length, 0)
  const longestToken = tokens.reduce((longest, token) => Math.max(longest, token.math.length), 0)
  const density = Math.min(
    totalTokenLength >= 520
      ? 0.64
      : totalTokenLength >= 380
        ? 0.72
        : totalTokenLength >= 260
          ? 0.8
          : totalTokenLength >= 160
            ? 0.88
            : totalTokenLength >= 100
              ? 0.94
              : 1,
    longestToken >= 90 ? 0.8 : 1,
  )

  return (
    <div className={local('solution-derivation', 'math-transform')}>
      <div className={local('derivation-head')}>
        <span className={local('derivation-kicker')}>PRZEKSZTAŁCENIE</span>
        <span className={local('derivation-counter')}>
          {active + 1} / {steps.length}
        </span>
      </div>
      <div className={local('math-stage')}>
        <AnimatePresence initial={false} mode="popLayout">
          {contextFormula && (
            <motion.div
              key={`context-${contextFormula}`}
              className={local('math-context')}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 0.45, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={local('math-tokens')}>
                {contextTokens.map((token) => (
                  <span key={token.id} className={local('math-token')}>
                    <InlineMath math={`\\displaystyle ${token.math}`} />
                  </span>
                ))}
              </div>
              <span className={local('math-arrow')} aria-hidden="true">
                ↓
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          layout
          className={local('math-current')}
          style={{ fontSize: `${density}em` }}
          transition={{ layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className={local('math-tokens')}>
            <AnimatePresence initial={false} mode="popLayout">
              {tokens.map((token) => (
                <motion.span
                  key={token.id}
                  layout
                  className={local('math-token')}
                  initial={{ opacity: 0, y: 18, scale: 0.65 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.65 }}
                  transition={{
                    layout: { type: 'spring', stiffness: 340, damping: 34, mass: 0.8 },
                    default: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <InlineMath math={`\\displaystyle ${token.math}`} />
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <div className={local('math-steps')} aria-hidden="true">
        {steps.map((_, stepIndex) => (
          <span
            key={stepIndex}
            className={local('math-step', stepIndex < active && 'done', stepIndex === active && 'active')}
          >
            {stepIndex === active && (
              <motion.span
                className={local('math-step-fill')}
                initial={false}
                animate={{ scaleX: stepProgress }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export function SolutionPlayer({ solution }: { solution: CourseSolution }) {
  const [position, setPosition] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<number>(1)
  const [seeking, setSeeking] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const Body = useMemo(() => lazy(solution.loadBody), [solution.id, solution.loadBody])
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
  const baseFocus = solution.figure ? resolveFocus(scene, solution.figure) : undefined
  const stepFocus =
    solution.figure && stepFormula
      ? inferFocus({ ...scene, title: '', narration: '', formula: stepFormula }, solution.figure)
      : undefined
  const figureFocus =
    baseFocus || stepFocus
      ? { metric: stepFocus?.metric ?? baseFocus?.metric, segment: stepFocus?.segment ?? baseFocus?.segment }
      : undefined
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
      <div className={local('solution-stage')}>
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
