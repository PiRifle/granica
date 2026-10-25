import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACTION = '#27835a'
const EDGE = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'
const AXIS = '#9aa5b1'

const A = { x: 70, y: 190 }
const B = { x: 370, y: 190 }
const x1 = 170
const xH = 220
const x2 = 270

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const captions = [
  'Trzy niewiadome reakcje, trzy równania równowagi',
  'Moment względem A: B_y = 8 kN',
  'Suma pionowa: A_y = 6 kN',
  'Suma pozioma: A_x = 3 kN w lewo',
  'Wypadkowa reakcja w A: R_A = 6,71 kN',
  'Kontrola momentem względem B: suma zeruje się',
]

function SupportA() {
  return (
    <g>
      <path d={`M ${A.x - 12} ${A.y + 14} L ${A.x} ${A.y} L ${A.x + 12} ${A.y + 14} Z`} fill={EDGE} />
      {Array.from({ length: 6 }, (_, index) => {
        const x = A.x - 10 + index * 4
        return <line key={index} x1={x} y1={A.y + 14} x2={x - 5} y2={A.y + 22} stroke={EDGE} strokeWidth="1.3" />
      })}
    </g>
  )
}

function SupportB() {
  return (
    <g>
      <path d={`M ${B.x - 12} ${B.y + 14} L ${B.x} ${B.y} L ${B.x + 12} ${B.y + 14} Z`} fill={EDGE} />
      <circle cx={B.x - 6} cy={B.y + 18} r="3.4" fill={EDGE} />
      <circle cx={B.x + 6} cy={B.y + 18} r="3.4" fill={EDGE} />
    </g>
  )
}

function LoadArrow({ x, top, label }: { x: number; top: number; label: string }) {
  return (
    <g>
      <line x1={x} y1={top} x2={x} y2={A.y - 5} stroke={LOAD} strokeWidth="2.4" strokeLinecap="round" />
      <path
        d={`M ${x - 5} ${A.y - 14} L ${x} ${A.y - 5} L ${x + 5} ${A.y - 14}`}
        fill="none"
        stroke={LOAD}
        strokeWidth="2.4"
      />
      <text x={x} y={top - 7} textAnchor="middle" fontSize="9.5" fill={LOAD}>
        {label}
      </text>
    </g>
  )
}

export function EquilibriumBeamAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const showBy = index >= 1
  const showAy = index >= 2
  const showAx = index >= 3
  const showResultant = index >= 4
  const showCheck = index >= 5
  const raGrow = showResultant ? (playing && index === 4 ? 0.35 + 0.65 * smooth(sceneProgress) : 1) : 0
  const raTip = {
    x: A.x - 30 * raGrow,
    y: A.y - 60 * raGrow,
  }
  const summary = captions[Math.min(index, captions.length - 1)]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Belka z przegubem, podporą przesuwną i reakcjami podpór">
          <title>Reakcje belki z równań równowagi</title>
          <desc>Belka 6 metrów, obciążenia 4 kN i 10 kN oraz siła pozioma 3 kN, reakcje 8 kN, 6 kN i 3 kN.</desc>
          <defs>
            <marker
              id="ex-eq-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="ex-eq-react"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker id="ex-eq-arc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MUTED} />
            </marker>
          </defs>

          <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={EDGE} strokeWidth="5" strokeLinecap="round" />
          <SupportA />
          <SupportB />
          <text x={A.x - 18} y={A.y + 2} fontSize="10" fill={EDGE}>
            A
          </text>
          <text x={B.x + 10} y={B.y + 2} fontSize="10" fill={EDGE}>
            B
          </text>

          <LoadArrow x={x1} top={144} label="F₁ = 4 kN" />
          <LoadArrow x={x2} top={84} label="F₂ = 10 kN" />

          <g>
            <line x1={xH} y1={A.y} x2={xH + 30} y2={A.y} stroke={LOAD} strokeWidth="2.4" markerEnd="url(#ex-eq-load)" />
            <text x={xH + 15} y={A.y - 8} textAnchor="middle" fontSize="9.5" fill={LOAD}>
              H = 3 kN
            </text>
          </g>

          <g stroke={MUTED} fill={MUTED}>
            <line x1={A.x} y1="292" x2={B.x} y2="292" strokeWidth="1" />
            {[A.x, x1, x2, B.x].map((x) => (
              <line key={x} x1={x} y1="288" x2={x} y2="296" strokeWidth="1" />
            ))}
            <text x={(A.x + x1) / 2} y="286" textAnchor="middle" fontSize="8.5" stroke="none">
              2 m
            </text>
            <text x={(x1 + x2) / 2} y="286" textAnchor="middle" fontSize="8.5" stroke="none">
              2 m
            </text>
            <text x={(x2 + B.x) / 2} y="286" textAnchor="middle" fontSize="8.5" stroke="none">
              2 m
            </text>
            <text x={(A.x + B.x) / 2} y="306" textAnchor="middle" fontSize="8.5" stroke="none">
              l = 6 m
            </text>
          </g>

          {showBy && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <line
                x1={B.x}
                y1="268"
                x2={B.x}
                y2={A.y - 2}
                stroke={REACTION}
                strokeWidth="2.6"
                markerEnd="url(#ex-eq-react)"
              />
              <text x={B.x + 8} y="258" fontSize="9.5" fill={REACTION}>
                B_y = 8 kN
              </text>
            </motion.g>
          )}

          {showAy && (
            <motion.g initial={false} animate={{ opacity: showResultant ? 0.55 : 1 }}>
              <line
                x1={A.x}
                y1="252"
                x2={A.x}
                y2={A.y - 2}
                stroke={REACTION}
                strokeWidth="2.6"
                markerEnd="url(#ex-eq-react)"
              />
              <text x={A.x - 8} y="246" textAnchor="end" fontSize="9.5" fill={REACTION}>
                A_y = 6 kN
              </text>
            </motion.g>
          )}

          {showAx && (
            <motion.g initial={false} animate={{ opacity: showResultant ? 0.55 : 1 }}>
              <line
                x1={A.x}
                y1={A.y}
                x2={A.x - 30}
                y2={A.y}
                stroke={REACTION}
                strokeWidth="2.6"
                markerEnd="url(#ex-eq-react)"
              />
              <text x={A.x - 15} y={A.y - 9} textAnchor="middle" fontSize="9.5" fill={REACTION}>
                A_x = 3 kN
              </text>
            </motion.g>
          )}

          {showBy && (
            <g fill="none" stroke={MUTED} strokeWidth="1.5" opacity={index >= 2 ? 0.4 : 0.9}>
              <path d={`M ${A.x + 28} ${A.y} A 28 28 0 0 0 ${A.x} ${A.y - 28}`} markerEnd="url(#ex-eq-arc)" />
              <text x={A.x + 34} y={A.y - 18} fontSize="9" fill={MUTED} stroke="none">
                ΣM_A
              </text>
            </g>
          )}

          {showResultant && (
            <g>
              <line
                x1={A.x}
                y1={A.y}
                x2={raTip.x}
                y2={raTip.y}
                stroke={REACTION}
                strokeWidth="3.4"
                markerEnd="url(#ex-eq-react)"
              />
              <text x={A.x - 22} y={A.y - 68} fontSize="9.5" fill={REACTION}>
                R_A = 6,71 kN
              </text>
              <path
                d={`M ${A.x - 26} ${A.y} A 26 26 0 0 1 ${A.x - 26 * Math.cos((63.44 * Math.PI) / 180)} ${A.y - 26 * Math.sin((63.44 * Math.PI) / 180)}`}
                fill="none"
                stroke={REACTION}
                strokeWidth="1.2"
                opacity="0.7"
              />
              <text x={A.x - 24} y={A.y - 34} fontSize="9" fill={REACTION}>
                63,4°
              </text>
            </g>
          )}

          {showCheck && (
            <g>
              <path
                d={`M ${B.x - 28} ${B.y} A 28 28 0 0 1 ${B.x} ${B.y - 28}`}
                fill="none"
                stroke={REACTION}
                strokeWidth="1.5"
              />
              <text x={B.x - 36} y={B.y - 18} fontSize="9" fill={REACTION}>
                ΣM_B = 0
              </text>
              <circle cx={B.x + 24} cy="146" r="10" fill={REACTION} opacity="0.15" />
              <path
                d={`M ${B.x + 19} 146 L ${B.x + 23} 150 L ${B.x + 30} 141`}
                fill="none"
                stroke={REACTION}
                strokeWidth="1.8"
              />
            </g>
          )}

          <line x1="40" y1="320" x2="420" y2="320" stroke={AXIS} strokeWidth="0" />
          <text x="230" y="332" textAnchor="middle" fontSize="12" fill={INK}>
            {summary}
          </text>
        </svg>
      </div>
    </div>
  )
}
