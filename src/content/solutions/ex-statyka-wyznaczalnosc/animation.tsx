import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const MOMENT = '#a970dd'
const HORIZONTAL = '#4f6df5'
const REACTION = '#27835a'
const MUTED = '#87929d'
const INK = '#17202a'
const BEAM = '#dfe5ec'

const X0 = 60
const X1 = 380
const Y = 200
const S = 32
const Q_X = X0 + 5 * S
const M_X = X0 + 2 * S
const P_X = X0 + 8 * S
const H_X = X0 + 6 * S
const C_POINT = { x: X0 + 5 * S, y: Y - 3 * S }

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

export function DeterminacyAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? smooth(sceneProgress) : 1
  const showEquations = index >= 1
  const showB = index >= 2
  const showA = index >= 3
  const showAx = index >= 4
  const showCheck = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 320" role="img" aria-label="Belka wyznaczalna z dwoma równaniami momentów">
          <title>Belka statycznie wyznaczalna</title>
          <desc>Belka z obciążeniem ciągłym, momentem, siłami skupionymi, reakcjami i kontrolą równań równowagi.</desc>
          <defs>
            <marker
              id="ex-determinacy-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="ex-determinacy-up"
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
              id="ex-determinacy-left"
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

          <rect
            x={X0}
            y={Y - 21}
            width={X1 - X0}
            height="14"
            fill={LOAD}
            fillOpacity="0.16"
            stroke={LOAD}
            strokeWidth="1.2"
          />
          {Array.from({ length: 15 }, (_, step) => {
            const x = X0 + (step * (X1 - X0)) / 14
            return (
              <line
                key={`q-${step}`}
                x1={x}
                y1={Y - 21}
                x2={x}
                y2={Y - 5}
                stroke={LOAD}
                strokeWidth="1"
                markerEnd="url(#ex-determinacy-load)"
                opacity="0.75"
              />
            )
          })}
          <text x={X0 + 4} y={Y - 28} fontSize="9" fill={LOAD}>
            q = 2 kN/m
          </text>

          <line
            x1={Q_X}
            y1={Y + 8}
            x2={Q_X}
            y2={Y + 48}
            stroke={LOAD}
            strokeWidth="3"
            markerEnd="url(#ex-determinacy-load)"
          />
          <text x={Q_X + 7} y={Y + 58} fontSize="10" fontWeight="700" fill={LOAD}>
            Q = 20 kN
          </text>

          <path
            d={`M ${M_X - 20} ${Y + 4} A 20 20 0 0 1 ${M_X + 4} ${Y + 24}`}
            fill="none"
            stroke={MOMENT}
            strokeWidth="2"
          />
          <path d={`M ${M_X + 4} ${Y + 24} L ${M_X - 5} ${Y + 20} L ${M_X + 2} ${Y + 12} Z`} fill={MOMENT} />
          <text x={M_X} y={Y + 42} textAnchor="middle" fontSize="9" fill={MOMENT}>
            M = 20 kN·m
          </text>

          <line
            x1={P_X}
            y1={Y + 8}
            x2={P_X}
            y2={Y + 48}
            stroke={LOAD}
            strokeWidth="3"
            markerEnd="url(#ex-determinacy-load)"
          />
          <text x={P_X + 7} y={Y + 58} fontSize="10" fontWeight="700" fill={LOAD}>
            P = 10 kN
          </text>

          <line x1={H_X} y1={Y - 50} x2={H_X + 52} y2={Y - 50} stroke={HORIZONTAL} strokeWidth="3" />
          <path d={`M ${H_X + 52} ${Y - 50} L ${H_X + 44} ${Y - 56} L ${H_X + 44} ${Y - 44} Z`} fill={HORIZONTAL} />
          <line x1={H_X} y1={Y - 50} x2={H_X} y2={Y - 3} stroke={HORIZONTAL} strokeWidth="1" strokeDasharray="3 3" />
          <text x={H_X + 54} y={Y - 54} fontSize="9" fill={HORIZONTAL}>
            H = 6 kN
          </text>

          {showEquations && (
            <g>
              <circle cx={X0} cy={Y} r="10" fill="none" stroke={REACTION} strokeWidth="1.5" />
              <circle cx={X1} cy={Y} r="10" fill="none" stroke={REACTION} strokeWidth="1.5" />
              <line x1="56" y1="116" x2="424" y2="116" stroke={MUTED} strokeWidth="1" strokeDasharray="5 4" />
              <text x="424" y="108" textAnchor="end" fontSize="9" fill={MUTED}>
                oś x
              </text>
              <text x="230" y="92" textAnchor="middle" fontSize="10" fontWeight="700" fill={REACTION}>
                ΣM_A = 0 · ΣM_B = 0 · ΣF_x = 0
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
                markerEnd="url(#ex-determinacy-up)"
              />
              <text x={X1} y={Y + 70} textAnchor="middle" fontSize="10" fontWeight="700" fill={REACTION}>
                B_y = 20 kN
              </text>
            </motion.g>
          )}

          {showA && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line
                x1={X0 - 30}
                y1={Y + 44}
                x2={X0 - 30}
                y2={Y - 4}
                stroke={REACTION}
                strokeWidth="3.2"
                markerEnd="url(#ex-determinacy-up)"
              />
              <text x={X0 - 30} y={Y + 60} textAnchor="middle" fontSize="10" fontWeight="700" fill={REACTION}>
                A_y = 10 kN
              </text>
            </motion.g>
          )}

          {showAx && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line
                x1={X0}
                y1={Y - 40}
                x2={X0 - 52}
                y2={Y - 40}
                stroke={HORIZONTAL}
                strokeWidth="3.2"
                markerEnd="url(#ex-determinacy-left)"
              />
              <text x="10" y={Y - 50} fontSize="10" fontWeight="700" fill={HORIZONTAL}>
                A_x = 6 kN
              </text>
            </motion.g>
          )}

          {showCheck && (
            <g>
              <circle cx={C_POINT.x} cy={C_POINT.y} r="4" fill={MOMENT} />
              <text x={C_POINT.x + 8} y={C_POINT.y + 4} fontSize="9" fill={MOMENT}>
                C(5; 3)
              </text>
              <line
                x1={C_POINT.x}
                y1={C_POINT.y + 4}
                x2={C_POINT.x}
                y2={Y}
                stroke={MOMENT}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <polyline
                points="160,286 166,292 178,278"
                fill="none"
                stroke={REACTION}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <text x="186" y="291" fontSize="9.5" fill={REACTION}>
                ΣF_y = 10 + 20 − 20 − 10 = 0
              </text>
              <text x="186" y="306" fontSize="9.5" fill={REACTION}>
                ΣM_C = −18 − 50 + 100 − 20 − 30 + 18 = 0
              </text>
            </g>
          )}

          {!showCheck && (
            <text x="230" y="306" textAnchor="middle" fontSize="9.5" fill={MUTED}>
              {showAx ? 'Trzy niewiadome i trzy niezależne równania' : 'R = 3, n = r − 3 = 0 — układ wyznaczalny'}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
