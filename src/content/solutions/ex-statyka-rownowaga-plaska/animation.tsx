import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const MOMENT = '#a970dd'
const REACTION = '#27835a'
const HORIZONTAL = '#4f6df5'
const MUTED = '#87929d'
const INK = '#17202a'
const BEAM = '#dfe5ec'

const X0 = 70
const X1 = 370
const Y = 190
const S = 75
const FS = 7
const P_X = X0 + 2 * S
const M_X = X0 + 3 * S
const P_END = { x: P_X + 10 * FS * Math.cos(Math.PI / 6), y: Y + 10 * FS * Math.sin(Math.PI / 6) }
const PX_END = { x: P_X + 10 * FS * Math.cos(Math.PI / 6), y: Y }
const PY_END = { x: P_X, y: Y + 10 * FS * Math.sin(Math.PI / 6) }

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

export function PlanarEquilibriumAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? smooth(sceneProgress) : 1
  const showComponents = index >= 1
  const showB = index >= 2
  const showAx = index >= 3
  const showAy = index >= 4
  const showCheck = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 320" role="img" aria-label="Równowaga belki z siłą ukośną i momentem">
          <title>Równowaga płaska belki</title>
          <desc>Belka z przegubem, rolką, siłą ukośną, jej składowymi, momentem skupionym i reakcjami.</desc>
          <defs>
            <marker
              id="ex-equilibrium-p"
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
              id="ex-equilibrium-px"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={HORIZONTAL} />
            </marker>
            <marker
              id="ex-equilibrium-up"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker
              id="ex-equilibrium-left"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={HORIZONTAL} />
            </marker>
          </defs>

          <rect x={X0 - 8} y={Y - 7} width={X1 - X0 + 16} height="14" rx="4" fill={BEAM} stroke="#b8c2ce" />

          <path
            d={`M ${X0 - 12} ${Y + 4} L ${X0} ${Y + 22} L ${X0 + 12} ${Y + 4} Z`}
            fill="none"
            stroke={INK}
            strokeWidth="1.6"
          />
          <circle cx={X1} cy={Y + 16} r="6" fill="none" stroke={INK} strokeWidth="1.5" />
          <text x={X0} y={Y + 40} textAnchor="middle" fontSize="10" fill={INK}>
            A
          </text>
          <text x={X1} y={Y + 40} textAnchor="middle" fontSize="10" fill={INK}>
            B
          </text>

          <line
            x1={P_X}
            y1={Y}
            x2={P_END.x}
            y2={P_END.y}
            stroke={LOAD}
            strokeWidth="3.4"
            markerEnd="url(#ex-equilibrium-p)"
          />
          <text x={P_END.x + 4} y={P_END.y + 12} fontSize="10" fill={LOAD}>
            P = 10 kN
          </text>
          <text x={P_X - 28} y={Y - 18} fontSize="9" fill={MUTED}>
            30°
          </text>
          <path
            d={`M ${P_X + 22} ${Y} A 22 22 0 0 1 ${P_X + 22 * Math.cos(Math.PI / 6)} ${Y + 22 * Math.sin(Math.PI / 6)}`}
            fill="none"
            stroke={LOAD}
            strokeWidth="1.2"
          />

          <path
            d={`M ${M_X} ${Y - 22} A 22 22 0 0 1 ${M_X + 22} ${Y + 4}`}
            fill="none"
            stroke={MOMENT}
            strokeWidth="2"
          />
          <path d={`M ${M_X + 22} ${Y + 4} L ${M_X + 15} ${Y - 2} L ${M_X + 25} ${Y - 6} Z`} fill={MOMENT} />
          <text x={M_X} y={Y + 42} textAnchor="middle" fontSize="9" fill={MOMENT}>
            M = 6 kN·m
          </text>

          {showComponents && (
            <g>
              <line
                x1={P_X}
                y1={Y}
                x2={PX_END.x}
                y2={PX_END.y}
                stroke={HORIZONTAL}
                strokeWidth="1.8"
                strokeDasharray="5 4"
                markerEnd="url(#ex-equilibrium-px)"
              />
              <line x1={P_X} y1={Y} x2={PY_END.x} y2={PY_END.y} stroke={LOAD} strokeWidth="1.8" strokeDasharray="5 4" />
              <text x={PX_END.x + 4} y={Y - 8} fontSize="9" fill={HORIZONTAL}>
                P_x = 8,66 kN
              </text>
              <text x={P_X + 6} y={PY_END.y + 12} fontSize="9" fill={LOAD}>
                P_y = 5 kN
              </text>
            </g>
          )}

          {showB && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <line
                x1={X1}
                y1={Y + 54}
                x2={X1}
                y2={Y + 12}
                stroke={REACTION}
                strokeWidth="3.2"
                markerEnd="url(#ex-equilibrium-up)"
              />
              <text x={X1} y={Y + 70} textAnchor="middle" fontSize="10" fontWeight="700" fill={REACTION}>
                B_y = 4 kN
              </text>
            </motion.g>
          )}

          {index === 2 && (
            <g>
              <line x1={X0} y1={Y + 78} x2={P_X} y2={Y + 78} stroke={MUTED} strokeWidth="1" />
              <line x1={X0} y1={Y + 72} x2={X0} y2={Y + 84} stroke={MUTED} />
              <line x1={P_X} y1={Y + 72} x2={P_X} y2={Y + 84} stroke={MUTED} />
              <text x={(X0 + P_X) / 2} y={Y + 92} textAnchor="middle" fontSize="9" fill={MUTED}>
                2 m
              </text>
              <line x1={P_X} y1={Y + 96} x2={X1} y2={Y + 96} stroke={MUTED} strokeWidth="1" />
              <line x1={P_X} y1={Y + 90} x2={P_X} y2={Y + 102} stroke={MUTED} />
              <line x1={X1} y1={Y + 90} x2={X1} y2={Y + 102} stroke={MUTED} />
              <text x={(P_X + X1) / 2} y={Y + 112} textAnchor="middle" fontSize="9" fill={MUTED}>
                4 m
              </text>
            </g>
          )}

          {showAx && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line
                x1={X0}
                y1={Y - 22}
                x2={X0 - 58}
                y2={Y - 22}
                stroke={HORIZONTAL}
                strokeWidth="3.2"
                markerEnd="url(#ex-equilibrium-left)"
              />
              <text x="8" y={Y - 32} fontSize="10" fontWeight="700" fill={HORIZONTAL}>
                A_x = 8,66 kN
              </text>
            </motion.g>
          )}

          {showAy && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line
                x1={X0 - 34}
                y1={Y + 40}
                x2={X0 - 34}
                y2={Y - 6}
                stroke={REACTION}
                strokeWidth="3.2"
                markerEnd="url(#ex-equilibrium-up)"
              />
              <text x={X0 - 34} y={Y + 56} textAnchor="middle" fontSize="10" fontWeight="700" fill={REACTION}>
                A_y = 1 kN
              </text>
            </motion.g>
          )}

          {showCheck && (
            <g>
              <polyline
                points="168,286 174,292 186,278"
                fill="none"
                stroke={REACTION}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <text x="194" y="291" fontSize="9.5" fill={REACTION}>
                −1 · 4 + 5 · 2 − 6 = 0
              </text>
              <text x="194" y="306" fontSize="9.5" fill={REACTION}>
                R_A = √(8,66² + 1²) = 8,72 kN
              </text>
            </g>
          )}

          {!showCheck && (
            <text x="230" y="306" textAnchor="middle" fontSize="9.5" fill={MUTED}>
              Trzy równania: dwa rzuty i moment względem A
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
