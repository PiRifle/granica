import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react'
import type { SolutionScene, WorkedSolution } from '../types'
import { Formula } from './UI'

const SPEEDS = [1, 1.5, 2] as const
const SCENE_MS = 7000

function AxialVisual({ phase }: { phase: number }) {
  const stretch = 22 + (phase % 3) * 8
  return <svg viewBox="0 0 420 220" role="img" aria-label="Pręt rozciągany z siłami na końcach">
    <line x1="30" y1="110" x2="390" y2="110" stroke="currentColor" strokeOpacity=".16" strokeDasharray="4 5" />
    <motion.rect x={70} y={92} width={280 + stretch} height={36} rx={6} fill="#eef5dd" stroke="#9dbb61" strokeWidth={2}
      animate={{ width: 280 + stretch }} transition={{ type: 'spring', stiffness: 80, damping: 16 }} />
    <motion.g animate={{ x: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }}>
      <path d="M70 92 L40 110 L70 128" fill="none" stroke="#e77451" strokeWidth={3} />
      <path d="M70 80 L40 80 M70 140 L40 140" stroke="#e77451" strokeWidth={2} />
    </motion.g>
    <motion.g animate={{ x: [3, -3, 3] }} transition={{ duration: 2, repeat: Infinity }}>
      <path d={`M${350 + stretch} 92 L${380 + stretch} 110 L${350 + stretch} 128`} fill="none" stroke="#e77451" strokeWidth={3} />
      <path d={`M${350 + stretch} 80 L${380 + stretch} 80 M${350 + stretch} 140 L${380 + stretch} 140`} stroke="#e77451" strokeWidth={2} />
    </motion.g>
    <text x="40" y="62" fontSize="13" fill="#c95c3d">N</text>
    <text x={366 + stretch} y="62" fontSize="13" fill="#c95c3d">N</text>
    <text x="210" y="186" textAnchor="middle" fontSize="12" fill="#7c876a">przekrój A, długość L</text>
    <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#9aa18f">wydłużenie ΔL jest proporcjonalne do N</text>
  </svg>
}

function ThermalVisual({ phase }: { phase: number }) {
  const blocked = phase % 2 === 1
  return <svg viewBox="0 0 420 220" role="img" aria-label="Pręt swobodny i zablokowany podczas ogrzewania">
    <rect x="70" y="60" width="280" height="34" rx="5" fill="#fff2e9" stroke="#e77451" strokeWidth={2} />
    <rect x="70" y="130" width={blocked ? 280 : 280 + 20} height="34" rx="5" fill="#eef5dd" stroke="#9dbb61" strokeWidth={2} />
    {[0, 1, 2, 3].map((i) => <motion.path key={i} d={`M${120 + i * 55} 44 q8 -12 0 -22`} fill="none" stroke="#e7a35c" strokeWidth={2}
      animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />)}
    <rect x="56" y="122" width="14" height="50" fill="#73796e" />
    <rect x="350" y="122" width="14" height="50" fill="#73796e" />
    <text x="70" y="116" fontSize="11" fill="#8a9183">swobodny: wydłuża się, σ = 0</text>
    <text x="70" y="188" fontSize="11" fill="#8a9183">zablokowany: długość stała, σ = −EαΔT</text>
    <motion.line x1="350" y1="101" x2={blocked ? 350 : 370} y2="101" stroke="#e77451" strokeWidth={2}
      animate={{ x2: blocked ? 350 : 370 }} />
  </svg>
}

function SectionVisual({ phase }: { phase: number }) {
  const arrows = 9
  return <svg viewBox="0 0 420 220" role="img" aria-label="Rozkład naprężeń w przekroju">
    <rect x="150" y="36" width="120" height="148" rx="4" fill="#f4f7ec" stroke="#a9b892" strokeWidth={2} />
    {Array.from({ length: arrows }, (_, i) => {
      const intensity = 8 + Math.abs(i - (arrows - 1) / 2) * 6 + (phase % 3) * 2
      return <line key={i} x1={150 - intensity - 8} y1={48 + i * 16} x2={146} y2={48 + i * 16} stroke="#9dbb61" strokeWidth={2.5} />
    })}
    <line x1="150" y1="110" x2="270" y2="110" stroke="#e77451" strokeDasharray="5 4" strokeWidth={1.5} />
    <text x="278" y="110" fontSize="11" fill="#c95c3d">oś obojętna</text>
    <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#8a9183">σ = N/A — równomierny rozkład w przekroju</text>
  </svg>
}

function CubeVisual({ phase }: { phase: number }) {
  const shear = 10 + (phase % 3) * 5
  return <svg viewBox="0 0 420 220" role="img" aria-label="Element sześcienny ze składowymi stanu naprężenia">
    <motion.g animate={{ rotate: [0, shear * 0.3, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: '210px 110px' }}>
      <rect x="160" y="60" width="100" height="100" fill="#f4f7ec" stroke="#8b9b76" strokeWidth={2} />
      <path d="M160 60 L190 35 L290 35 L260 60" fill="#e9f0dc" stroke="#8b9b76" strokeWidth={2} />
      <path d="M260 60 L290 35 L290 135 L260 160" fill="#eef3e4" stroke="#8b9b76" strokeWidth={2} />
      <line x1="210" y1="110" x2="210" y2="60" stroke="#c95c3d" strokeWidth={2} markerEnd="url(#cubeArrow)" />
      <line x1="210" y1="110" x2="260" y2="110" stroke="#9dbb61" strokeWidth={2} />
      <line x1="210" y1="110" x2="170" y2="145" stroke="#6b7c8d" strokeWidth={2} />
    </motion.g>
    <defs><marker id="cubeArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#c95c3d" /></marker></defs>
    <text x="216" y="56" fontSize="11" fill="#c95c3d">σy</text>
    <text x="266" y="114" fontSize="11" fill="#7d963f">σx</text>
    <text x="150" y="158" fontSize="11" fill="#6b7c8d">σz</text>
    <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#8a9183">składowe tensora naprężenia w punkcie</text>
  </svg>
}

function RosetteVisual({ phase }: { phase: number }) {
  return <svg viewBox="0 0 420 220" role="img" aria-label="Rozeta tensometryczna 0, 45 i 90 stopni">
    <circle cx="210" cy="108" r="72" fill="#f6f8f0" stroke="#c9d3b9" strokeWidth={1.5} />
    <motion.g animate={{ rotate: phase % 3 === 0 ? [0, 8, 0] : 0 }} transition={{ duration: 2 }} style={{ transformOrigin: '210px 108px' }}>
      <line x1="210" y1="108" x2="282" y2="108" stroke="#e77451" strokeWidth={3} />
      <line x1="210" y1="108" x2="261" y2="57" stroke="#9dbb61" strokeWidth={3} />
      <line x1="210" y1="108" x2="210" y2="36" stroke="#6b7c8d" strokeWidth={3} />
    </motion.g>
    <text x="288" y="112" fontSize="11" fill="#c95c3d">0°</text>
    <text x="264" y="48" fontSize="11" fill="#7d963f">45°</text>
    <text x="204" y="28" fontSize="11" fill="#6b7c8d">90°</text>
    <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#8a9183">trzy kierunki pomiarowe wyznaczają tensor odkształcenia</text>
  </svg>
}

function BeamVisual({ phase }: { phase: number }) {
  const deflection = 18 + (phase % 3) * 8
  return <svg viewBox="0 0 420 220" role="img" aria-label="Belka zginana z podporami i obciążeniem">
    <motion.path d={`M60 120 Q210 ${120 + deflection} 360 120`} fill="none" stroke="#a8c96a" strokeWidth={10} strokeLinecap="round"
      animate={{ d: [`M60 120 Q210 ${120 + deflection * 0.4} 360 120`, `M60 120 Q210 ${120 + deflection} 360 120`, `M60 120 Q210 ${120 + deflection * 0.4} 360 120`] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
    <path d="M45 135 L60 120 L75 135 Z M345 135 L360 120 L375 135 Z" fill="#73796e" />
    <line x1="20" y1="137" x2="400" y2="137" stroke="#73796e" strokeWidth={1.5} />
    <motion.g animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
      <line x1="210" y1="38" x2="210" y2="94" stroke="#e77451" strokeWidth={3} />
      <path d="M200 83 L210 99 L220 83" fill="none" stroke="#e77451" strokeWidth={3} />
    </motion.g>
    <text x="210" y="28" textAnchor="middle" fontSize="11" fill="#c95c3d">P</text>
    <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#8a9183">reakcje → siły tnące T(x) → moment M(x) → naprężenia σ</text>
  </svg>
}

function DiagramVisual({ phase }: { phase: number }) {
  const curve = phase % 3
  const path = curve === 0
    ? 'M60 170 C130 170 140 60 210 60 C280 60 290 170 360 170'
    : curve === 1
      ? 'M60 170 L360 60'
      : 'M60 60 Q210 190 360 60'
  return <svg viewBox="0 0 420 220" role="img" aria-label="Wykres pomocniczy rozwiązania">
    <line x1="55" y1="20" x2="55" y2="175" stroke="#b9c2ab" />
    <line x1="55" y1="175" x2="385" y2="175" stroke="#b9c2ab" />
    <motion.path d={path} fill="none" stroke="#9dbb61" strokeWidth={3}
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />
    <text x="360" y="196" fontSize="10" fill="#8a9183">x</text>
    <text x="30" y="30" fontSize="10" fill="#8a9183">wynik</text>
  </svg>
}

function SceneVisual({ scene, index }: { scene: SolutionScene; index: number }) {
  switch (scene.visual) {
    case 'axial': return <AxialVisual phase={index} />
    case 'thermal': return <ThermalVisual phase={index} />
    case 'section': return <SectionVisual phase={index} />
    case 'cube': return <CubeVisual phase={index} />
    case 'rosette': return <RosetteVisual phase={index} />
    case 'beam': return <BeamVisual phase={index} />
    default: return <DiagramVisual phase={index} />
  }
}

export function SolutionPlayer({ solution }: { solution: WorkedSolution }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<number>(1)
  const scene = solution.scenes[index]
  const lastIndex = solution.scenes.length - 1
  const progress = ((index + 1) / solution.scenes.length) * 100

  useEffect(() => {
    if (!playing) return
    if (index >= lastIndex) {
      setPlaying(false)
      return
    }
    const timer = window.setTimeout(() => setIndex((current) => Math.min(current + 1, lastIndex)), SCENE_MS / speed)
    return () => window.clearTimeout(timer)
  }, [playing, index, lastIndex, speed])

  const reset = () => {
    setPlaying(false)
    setIndex(0)
  }

  const toggle = () => {
    if (index >= lastIndex) setIndex(0)
    setPlaying((value) => !value)
  }

  const dots = useMemo(() => solution.scenes.map((item, dotIndex) => (
    <button
      key={`${item.title}-${dotIndex}`}
      type="button"
      className={dotIndex === index ? 'solution-dot active' : dotIndex < index ? 'solution-dot done' : 'solution-dot'}
      aria-label={`Scena ${dotIndex + 1}: ${item.title}`}
      aria-current={dotIndex === index}
      onClick={() => { setIndex(dotIndex); setPlaying(false) }}
    />
  )), [solution.scenes, index])

  return <section className="solution-player" aria-label={`Animowane rozwiązanie: ${solution.title}`}>
    <div className="solution-head">
      <div>
        <span className="section-kicker">ROZWIĄZANIE KROK PO KROKU</span>
        <h2>{solution.title}</h2>
        <p>{solution.problem}</p>
      </div>
      <span className="solution-duration"><Gauge size={15} /> {solution.duration} min</span>
    </div>
    <div className="solution-given">
      {solution.given.map((item) => <span key={item}>{item}</span>)}
    </div>
    <div className="solution-stage">
      <div className="solution-visual">
        <AnimatePresence mode="wait">
          <motion.div key={`${solution.id}-${index}`} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <SceneVisual scene={scene} index={index} />
          </motion.div>
        </AnimatePresence>
        <span className="solution-scene-count">SCENA {index + 1} / {solution.scenes.length}</span>
      </div>
      <div className="solution-copy">
        <AnimatePresence mode="wait">
          <motion.div key={`copy-${index}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <span className="solution-scene-title">{scene.title}</span>
            <p>{scene.narration}</p>
            {scene.formula && <Formula>{scene.formula}</Formula>}
            <p className="solution-caption">{scene.caption}</p>
            {scene.emphasis && <p className="solution-emphasis">{scene.emphasis}</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    <div className="solution-controls">
      <div className="solution-buttons">
        <button className="icon-button" type="button" onClick={reset} aria-label="Od początku"><RotateCcw size={17} /></button>
        <button className="icon-button" type="button" onClick={() => { setPlaying(false); setIndex((current) => Math.max(0, current - 1)) }} aria-label="Poprzednia scena" disabled={index === 0}><ChevronLeft size={18} /></button>
        <button className="button button-dark button-small" type="button" onClick={toggle}>{playing ? <Pause size={15} /> : <Play size={15} />}{playing ? 'Pauza' : 'Odtwarzaj'}</button>
        <button className="icon-button" type="button" onClick={() => { setPlaying(false); setIndex((current) => Math.min(lastIndex, current + 1)) }} aria-label="Następna scena" disabled={index === lastIndex}><ChevronRight size={18} /></button>
        <div className="solution-speed" role="group" aria-label="Tempo odtwarzania">
          {SPEEDS.map((value) => <button key={value} type="button" className={speed === value ? 'active' : ''} aria-pressed={speed === value} onClick={() => setSpeed(value)}>{value}×</button>)}
        </div>
      </div>
      <div className="solution-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <div className="solution-dots">{dots}</div>
    </div>
    <div className="solution-result"><strong>Wynik:</strong><span>{solution.result}</span></div>
  </section>
}
