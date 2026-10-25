import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE = '#ff6b45'
const FORCE_2 = '#4f6df5'
const RESULT = '#27835a'
const MUTED = '#87929d'
const INK = '#17202a'
const BEAM = '#dfe5ec'

const X0 = 80
const X1 = 380
const Y = 120
const S = 100
const WX = X0 + 1.8 * S
const AXIS_Y = 286

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

export function ParallelResultantAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? smooth(sceneProgress) : 1
  const showSum = index >= 1
  const showMoment = index >= 2
  const showPosition = index >= 3
  const showCheck = index >= 4
  const showProportion = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 320" role="img" aria-label="Wypadkowa dwóch sił równoległych">
          <title>Wypadkowa dwóch sił równoległych</title>
          <desc>Dwie siły pionowe, ich suma, równanie momentów, położenie wypadkowej i kontrola drugim biegunem.</desc>
          <defs>
            <marker
              id="ex-parallel-down"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FORCE} />
            </marker>
            <marker
              id="ex-parallel-down2"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FORCE_2} />
            </marker>
            <marker
              id="ex-parallel-res"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
          </defs>

          <rect x={X0 - 12} y={Y - 8} width={X1 - X0 + 24} height="16" rx="5" fill={BEAM} stroke="#b8c2ce" />
          <line x1={X0 - 12} y1={Y} x2={X1 + 12} y2={Y} stroke="#b8c2ce" strokeWidth="1.2" />

          <line x1="52" y1={AXIS_Y} x2="418" y2={AXIS_Y} stroke={MUTED} strokeWidth="1.2" />
          {[0, 1, 2, 3].map((tick) => (
            <g key={`tick-${tick}`}>
              <line x1={X0 + tick * S} y1={AXIS_Y - 4} x2={X0 + tick * S} y2={AXIS_Y + 4} stroke={MUTED} />
              <text x={X0 + tick * S} y={AXIS_Y + 16} textAnchor="middle" fontSize="9" fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}
          <text x={X0 - 20} y={AXIS_Y + 16} fontSize="9" fill={MUTED}>
            x [m]
          </text>

          {!showPosition && (
            <g>
              <line x1={X0} y1="84" x2={X1} y2="84" stroke={MUTED} strokeWidth="1" />
              <line x1={X0} y1="78" x2={X0} y2="90" stroke={MUTED} />
              <line x1={X1} y1="78" x2={X1} y2="90" stroke={MUTED} />
              <text x={(X0 + X1) / 2} y="78" textAnchor="middle" fontSize="10" fill={MUTED}>
                AB = 3 m
              </text>
            </g>
          )}

          <circle cx={X0} cy={Y} r="4" fill={FORCE} />
          <circle cx={X1} cy={Y} r="4" fill={FORCE_2} />
          <text x={X0 - 10} y={Y - 10} fontSize="11" fontWeight="700" fill={INK}>
            A
          </text>
          <text x={X1 + 8} y={Y - 10} fontSize="11" fontWeight="700" fill={INK}>
            B
          </text>

          <line
            x1={X0}
            y1={Y + 8}
            x2={X0}
            y2={Y + 48}
            stroke={FORCE}
            strokeWidth="3"
            markerEnd="url(#ex-parallel-down)"
          />
          <text x={X0} y={Y + 66} textAnchor="middle" fontSize="10" fill={FORCE}>
            P₁ = 400 N
          </text>

          <line
            x1={X1}
            y1={Y + 8}
            x2={X1}
            y2={Y + 68}
            stroke={FORCE_2}
            strokeWidth="3"
            markerEnd="url(#ex-parallel-down2)"
          />
          <text x={X1} y={Y + 86} textAnchor="middle" fontSize="10" fill={FORCE_2}>
            P₂ = 600 N
          </text>

          {showSum && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <line
                x1={WX}
                y1={Y + 8}
                x2={WX}
                y2={Y + 88}
                stroke={RESULT}
                strokeWidth="3.5"
                markerEnd="url(#ex-parallel-res)"
              />
              <text x={WX + 8} y={Y + 104} fontSize="10" fontWeight="700" fill={RESULT}>
                W = 1000 N
              </text>
            </motion.g>
          )}

          {showMoment && (
            <g>
              <circle cx={X0} cy={Y} r="9" fill="none" stroke={INK} strokeWidth="1.5" />
              <line x1={X0} y1={Y + 112} x2={X1} y2={Y + 112} stroke={MUTED} strokeWidth="1" strokeDasharray="5 4" />
              <text x={(X0 + X1) / 2} y={Y + 126} textAnchor="middle" fontSize="9" fill={MUTED}>
                P₂ · 3 = 1800 N·m
              </text>
              <text x={X0 + 14} y={Y + 124} fontSize="9" fill={MUTED}>
                M_A(P₁) = 0
              </text>
              <path
                d={`M ${X0 + 22} ${Y + 14} A 24 24 0 0 1 ${X0 + 4} ${Y + 34}`}
                fill="none"
                stroke={INK}
                strokeWidth="1.5"
                markerEnd="url(#ex-parallel-res)"
              />
            </g>
          )}

          {showPosition && (
            <g>
              <line x1={X0} y1="74" x2={WX} y2="74" stroke={RESULT} strokeWidth="1.2" />
              <line x1={X0} y1="68" x2={X0} y2="80" stroke={RESULT} />
              <line x1={WX} y1="68" x2={WX} y2="80" stroke={RESULT} />
              <text x={(X0 + WX) / 2} y="64" textAnchor="middle" fontSize="10" fill={RESULT}>
                1,8 m
              </text>
              <line x1={WX} y1="48" x2={X1} y2="48" stroke={MUTED} strokeWidth="1.2" />
              <line x1={WX} y1="42" x2={WX} y2="54" stroke={MUTED} />
              <line x1={X1} y1="42" x2={X1} y2="54" stroke={MUTED} />
              <text x={(WX + X1) / 2} y="38" textAnchor="middle" fontSize="10" fill={MUTED}>
                1,2 m
              </text>
            </g>
          )}

          {showCheck && (
            <g>
              <circle cx={X1} cy={Y} r="9" fill="none" stroke={INK} strokeWidth="1.5" />
              <text x={X1 - 6} y={Y + 124} textAnchor="end" fontSize="9" fill={MUTED}>
                1000 · 1,2 = 1200 N·m
              </text>
              <text x={X1 - 6} y={Y + 138} textAnchor="end" fontSize="9" fill={MUTED}>
                400 · 3 = 1200 N·m
              </text>
            </g>
          )}

          {showProportion && (
            <text x="230" y="308" textAnchor="middle" fontSize="11" fill={RESULT}>
              AD : DB = P₂ : P₁ = 600 : 400 = 3 : 2
            </text>
          )}

          {!showProportion && (
            <text x="230" y="308" textAnchor="middle" fontSize="10" fill={MUTED}>
              {showPosition
                ? 'Wypadkowa leży bliżej silniejszej siły'
                : 'Wartość i położenie wypadkowej układu równoległego'}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
