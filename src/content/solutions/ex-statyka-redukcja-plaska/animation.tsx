import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE_1 = '#4f6df5'
const FORCE_2 = '#ff6b45'
const MOMENT = '#a970dd'
const RESULT = '#27835a'
const MUTED = '#87929d'
const INK = '#17202a'
const AXIS = '#9aa5b1'

const OX = 150
const OY = 250
const S = 55
const FS = 18

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const at = (x: number, y: number) => ({ x: OX + x * S, y: OY - y * S })

const polar = (cx: number, cy: number, radius: number, degrees: number) => {
  const angle = (degrees * Math.PI) / 180
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) }
}

const arc = (cx: number, cy: number, radius: number, from: number, to: number) => {
  const start = polar(cx, cy, radius, from)
  const end = polar(cx, cy, radius, to)
  const large = Math.abs(to - from) > 180 ? 1 : 0
  const sweep = to > from ? 1 : 0
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} ${sweep} ${end.x} ${end.y}`
}

const A = at(0, 0.5)
const B = at(0.6, 0)
const O = at(0, 0)
const R_END = { x: O.x + 3 * FS, y: O.y - 4 * FS }
const F1_END = { x: A.x + 3 * FS, y: A.y }
const F2_END = { x: B.x, y: B.y - 4 * FS }
const FOOT = { x: OX + 1.104 * S, y: OY + 0.828 * S }
const X_INTERCEPT = at(1.725, 0)
const Y_INTERCEPT = at(0, -2.3)

export function PlanarReductionAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? smooth(sceneProgress) : 1
  const showVector = index >= 1
  const showMoments = index >= 2
  const showMainMoment = index >= 3
  const showLine = index >= 4
  const showCheck = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 400" role="img" aria-label="Redukcja płaskiego układu sił do bieguna">
          <title>Redukcja płaskiego układu sił</title>
          <desc>Siły F1 i F2, moment skupiony, wektor główny, moment główny oraz prosta działania wypadkowej.</desc>
          <defs>
            <marker
              id="ex-reduction-f1"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FORCE_1} />
            </marker>
            <marker
              id="ex-reduction-f2"
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
              id="ex-reduction-r"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
            <marker
              id="ex-reduction-m"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
          </defs>

          <line x1="52" y1={OY} x2="430" y2={OY} stroke={AXIS} strokeWidth="1.3" />
          <line x1={OX} y1="46" x2={OX} y2="388" stroke={AXIS} strokeWidth="1.3" />
          <text x="420" y={OY - 8} fontSize="11" fill={INK}>
            x
          </text>
          <text x={OX + 8} y="58" fontSize="11" fill={INK}>
            y
          </text>
          <text x={OX - 14} y={OY + 18} fontSize="11" fill={INK}>
            O
          </text>

          <circle cx={A.x} cy={A.y} r="4" fill={FORCE_1} />
          <circle cx={B.x} cy={B.y} r="4" fill={FORCE_2} />
          <text x={A.x - 12} y={A.y - 8} fontSize="10" fill={FORCE_1}>
            A
          </text>
          <text x={B.x + 7} y={B.y + 15} fontSize="10" fill={FORCE_2}>
            B
          </text>

          <line
            x1={A.x}
            y1={A.y}
            x2={F1_END.x}
            y2={F1_END.y}
            stroke={FORCE_1}
            strokeWidth="3.2"
            markerEnd="url(#ex-reduction-f1)"
          />
          <text x={F1_END.x + 6} y={F1_END.y - 7} fontSize="10" fill={FORCE_1}>
            F₁ = 3 kN
          </text>

          <line
            x1={B.x}
            y1={B.y}
            x2={F2_END.x}
            y2={F2_END.y}
            stroke={FORCE_2}
            strokeWidth="3.2"
            markerEnd="url(#ex-reduction-f2)"
          />
          <text x={F2_END.x + 7} y={F2_END.y + 4} fontSize="10" fill={FORCE_2}>
            F₂ = 4 kN
          </text>

          <path
            d={arc(182, 266, 20, 330, 30)}
            fill="none"
            stroke={MOMENT}
            strokeWidth="2"
            markerEnd="url(#ex-reduction-m)"
          />
          <text x="206" y="274" fontSize="10" fill={MOMENT}>
            M₀ = 6 kN·m
          </text>

          {showVector && (
            <g>
              <line x1={O.x} y1={O.y} x2={F1_END.x} y2={O.y} stroke={MUTED} strokeWidth="1.4" strokeDasharray="5 4" />
              <line x1={O.x} y1={O.y} x2={O.x} y2={F2_END.y} stroke={MUTED} strokeWidth="1.4" strokeDasharray="5 4" />
              <motion.line
                x1={O.x}
                y1={O.y}
                x2={R_END.x}
                y2={R_END.y}
                stroke={RESULT}
                strokeWidth="4"
                markerEnd="url(#ex-reduction-r)"
                initial={{ opacity: 0 }}
                animate={{ opacity: reveal }}
                transition={{ duration: 0.25 }}
              />
              <text x={R_END.x + 8} y={R_END.y - 4} fontSize="11" fontWeight="700" fill={RESULT}>
                R = 5 kN
              </text>
              <path d={arc(O.x, O.y, 30, 0, -53.13)} fill="none" stroke={RESULT} strokeWidth="1.5" />
              <text x={O.x + 38} y={O.y - 12} fontSize="9" fill={RESULT}>
                53,1°
              </text>
              <text x={(O.x + F1_END.x) / 2} y={O.y + 16} textAnchor="middle" fontSize="9" fill={MUTED}>
                R_x = 3 kN
              </text>
              <text x={O.x - 22} y={(O.y + F2_END.y) / 2} textAnchor="end" fontSize="9" fill={MUTED}>
                R_y = 4 kN
              </text>
            </g>
          )}

          {showMoments && (
            <g>
              <path
                d={arc(O.x, O.y, 26, 200, 340)}
                fill="none"
                stroke={FORCE_2}
                strokeWidth="1.6"
                markerEnd="url(#ex-reduction-f2)"
              />
              <text x={O.x - 40} y={O.y + 44} textAnchor="end" fontSize="9" fill={FORCE_2}>
                M₁ = −1,5
              </text>
              <path
                d={arc(O.x, O.y, 34, 340, 200)}
                fill="none"
                stroke={RESULT}
                strokeWidth="1.6"
                markerEnd="url(#ex-reduction-r)"
              />
              <text x={O.x + 14} y={O.y + 58} fontSize="9" fill={RESULT}>
                M₂ = +2,4
              </text>
              <path
                d={arc(O.x, O.y, 42, 340, 200)}
                fill="none"
                stroke={MOMENT}
                strokeWidth="1.6"
                markerEnd="url(#ex-reduction-m)"
              />
              <text x={O.x - 44} y={O.y + 82} textAnchor="end" fontSize="9" fill={MOMENT}>
                M₀ = +6
              </text>
            </g>
          )}

          {showMainMoment && (
            <g>
              <path
                d={arc(O.x, O.y, 50, 330, 210)}
                fill="none"
                stroke={RESULT}
                strokeWidth="2.6"
                markerEnd="url(#ex-reduction-r)"
              />
              <text x={O.x + 24} y={O.y + 76} fontSize="10" fontWeight="700" fill={RESULT}>
                M_O = 6,9 kN·m
              </text>
            </g>
          )}

          {showLine && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line x1={Y_INTERCEPT.x} y1={Y_INTERCEPT.y} x2="292" y2="190" stroke={RESULT} strokeWidth="2.6" />
              <text x="296" y="188" fontSize="10" fontWeight="700" fill={RESULT}>
                4x − 3y = 6,9
              </text>
              <line x1={O.x} y1={O.y} x2={FOOT.x} y2={FOOT.y} stroke={MUTED} strokeWidth="1.5" strokeDasharray="5 4" />
              <text x={FOOT.x - 56} y={FOOT.y + 4} fontSize="9" fill={MUTED}>
                d = 1,38 m
              </text>
              <circle cx={FOOT.x} cy={FOOT.y} r="3.5" fill={RESULT} />
              <line
                x1={FOOT.x}
                y1={FOOT.y}
                x2={FOOT.x + 54}
                y2={FOOT.y - 72}
                stroke={RESULT}
                strokeWidth="3.5"
                markerEnd="url(#ex-reduction-r)"
              />
              <text x={FOOT.x + 60} y={FOOT.y - 66} fontSize="10" fill={RESULT}>
                5 kN
              </text>
            </motion.g>
          )}

          {showCheck && (
            <g>
              <circle cx={X_INTERCEPT.x} cy={X_INTERCEPT.y} r="4" fill={MOMENT} />
              <circle cx={Y_INTERCEPT.x} cy={Y_INTERCEPT.y} r="4" fill={MOMENT} />
              <text x={X_INTERCEPT.x + 8} y={X_INTERCEPT.y + 18} fontSize="9" fill={MOMENT}>
                x = 1,725 m
              </text>
              <text x={Y_INTERCEPT.x + 8} y={Y_INTERCEPT.y - 8} fontSize="9" fill={MOMENT}>
                y = −2,3 m
              </text>
              <text x="230" y="392" textAnchor="middle" fontSize="10" fill={RESULT}>
                1,725 · 4 = 6,9 kN·m — moment się zgadza
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
