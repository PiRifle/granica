import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const MOMENT = '#a970dd'
const CABLE = '#4f6df5'
const REACTION = '#27835a'
const MUTED = '#87929d'
const INK = '#17202a'
const BEAM = '#dfe5ec'

const X0 = 90
const X1 = 370
const Y = 190
const S = 70
const FS = 7
const Q_X = X0 + 2 * S
const CABLE_END = { x: 442, y: 150 }
const PY_END = { x: X1, y: Y - 10 * FS * Math.sin(Math.PI / 6) }
const PX_END = { x: X1 + 10 * FS * Math.cos(Math.PI / 6), y: Y }

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

export function SupportReactionsAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? smooth(sceneProgress) : 1
  const showLoads = index >= 1
  const showAx = index >= 2
  const showAy = index >= 3
  const showMoment = index >= 4
  const showCheck = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 320" role="img" aria-label="Reakcje belki wspornikowej z linką">
          <title>Reakcje wspornika z linką</title>
          <desc>
            Belka utwierdzona z obciążeniem ciągłym, momentem skupionym, linką przez krążek i reakcjami utwierdzenia.
          </desc>
          <defs>
            <marker
              id="ex-reactions-q"
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
              id="ex-reactions-cable"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={CABLE} />
            </marker>
            <marker
              id="ex-reactions-up"
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
              id="ex-reactions-left"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={CABLE} />
            </marker>
          </defs>

          <line x1="78" y1="120" x2="78" y2="258" stroke={INK} strokeWidth="3" />
          {Array.from({ length: 9 }, (_, step) => (
            <line
              key={`hatch-${step}`}
              x1="78"
              y1={128 + step * 16}
              x2="64"
              y2={138 + step * 16}
              stroke={INK}
              strokeWidth="1.2"
              opacity="0.6"
            />
          ))}

          <rect x={X0} y={Y - 7} width={X1 - X0} height="14" rx="4" fill={BEAM} stroke="#b8c2ce" />
          <text x={X0 - 8} y={Y - 16} textAnchor="end" fontSize="10" fill={INK}>
            A
          </text>
          <text x={X1 + 4} y={Y - 16} fontSize="10" fill={INK}>
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
          {Array.from({ length: 11 }, (_, step) => {
            const x = X0 + (step * (X1 - X0)) / 10
            return (
              <line
                key={`q-${step}`}
                x1={x}
                y1={Y - 21}
                x2={x}
                y2={Y - 5}
                stroke={LOAD}
                strokeWidth="1.1"
                markerEnd="url(#ex-reactions-q)"
                opacity="0.8"
              />
            )
          })}
          <text x={X0 + 6} y={Y - 28} fontSize="9" fill={LOAD}>
            q = 2 kN/m
          </text>

          <line x1={X1} y1={Y} x2={CABLE_END.x} y2={CABLE_END.y} stroke={CABLE} strokeWidth="1.8" />
          <circle cx={CABLE_END.x} cy={CABLE_END.y} r="8" fill="#eef2f7" stroke={CABLE} strokeWidth="1.6" />
          <line
            x1={CABLE_END.x}
            y1={CABLE_END.y + 8}
            x2={CABLE_END.x}
            y2={CABLE_END.y + 38}
            stroke={CABLE}
            strokeWidth="1.6"
          />
          <path
            d={`M ${CABLE_END.x - 5} ${CABLE_END.y + 32} L ${CABLE_END.x} ${CABLE_END.y + 42} L ${CABLE_END.x + 5} ${CABLE_END.y + 32}`}
            fill={CABLE}
          />
          <text x={CABLE_END.x - 4} y={CABLE_END.y + 58} textAnchor="end" fontSize="9" fill={CABLE}>
            P = 10 kN
          </text>

          <path
            d={`M ${X1 - 22} ${Y - 22} A 22 22 0 0 1 ${X1 - 18} ${Y + 6}`}
            fill="none"
            stroke={MOMENT}
            strokeWidth="2"
          />
          <path d={`M ${X1 - 18} ${Y + 6} L ${X1 - 26} ${Y + 1} L ${X1 - 16} ${Y - 3} Z`} fill={MOMENT} />
          <text x={X1 - 18} y={Y + 30} textAnchor="middle" fontSize="9" fill={MOMENT}>
            M = 8 kN·m
          </text>

          <line
            x1={Q_X}
            y1={Y + 8}
            x2={Q_X}
            y2={Y + 48}
            stroke={LOAD}
            strokeWidth="3"
            markerEnd="url(#ex-reactions-q)"
          />
          <text x={Q_X + 8} y={Y + 58} fontSize="10" fontWeight="700" fill={LOAD}>
            Q = 8 kN
          </text>

          {showLoads && (
            <g>
              <line
                x1={X1}
                y1={Y}
                x2={PX_END.x}
                y2={PX_END.y}
                stroke={CABLE}
                strokeWidth="1.6"
                strokeDasharray="5 4"
                markerEnd="url(#ex-reactions-cable)"
              />
              <line x1={X1} y1={Y} x2={PY_END.x} y2={PY_END.y} stroke={CABLE} strokeWidth="1.6" strokeDasharray="5 4" />
              <text x="458" y={Y - 8} textAnchor="end" fontSize="9" fill={CABLE}>
                P_x = 8,66 kN
              </text>
              <text x={X1 + 6} y={PY_END.y - 4} fontSize="9" fill={CABLE}>
                P_y = 5 kN
              </text>
            </g>
          )}

          {showAx && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <line
                x1={X0}
                y1={Y - 42}
                x2={X0 - 58}
                y2={Y - 42}
                stroke={CABLE}
                strokeWidth="3.2"
                markerEnd="url(#ex-reactions-left)"
              />
              <text x="18" y={Y - 52} fontSize="10" fontWeight="700" fill={CABLE}>
                A_x = 8,66 kN
              </text>
            </motion.g>
          )}

          {showAy && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <line
                x1={X0 - 26}
                y1={Y + 58}
                x2={X0 - 26}
                y2={Y - 2}
                stroke={REACTION}
                strokeWidth="3.2"
                markerEnd="url(#ex-reactions-up)"
              />
              <text x={X0 - 26} y={Y + 74} textAnchor="middle" fontSize="10" fontWeight="700" fill={REACTION}>
                A_y = 3 kN
              </text>
            </motion.g>
          )}

          {showMoment && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <path
                d={`M ${X0 + 20} ${Y - 10} A 24 24 0 0 0 ${X0 + 4} ${Y + 14}`}
                fill="none"
                stroke={REACTION}
                strokeWidth="2.2"
                markerEnd="url(#ex-reactions-up)"
              />
              <text x={X0 + 30} y={Y - 18} fontSize="10" fontWeight="700" fill={REACTION}>
                M_A = 4 kN·m
              </text>
            </motion.g>
          )}

          {showCheck && (
            <g>
              <polyline
                points="170,286 176,292 188,278"
                fill="none"
                stroke={REACTION}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <text x="196" y="291" fontSize="9.5" fill={REACTION}>
                4 − 3 · 4 + 8 · 2 − 8 = 0
              </text>
              <text x="196" y="306" fontSize="9.5" fill={MUTED}>
                Kontrola momentów względem B
              </text>
            </g>
          )}

          {!showCheck && (
            <text x="230" y="306" textAnchor="middle" fontSize="9.5" fill={MUTED}>
              {showMoment
                ? 'Moment utwierdzenia równoważy obciążenie i linkę'
                : 'Utwierdzenie daje trzy niewiadome reakcje'}
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
