import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const COUPLE_1 = '#ff6b45'
const COUPLE_2 = '#4f6df5'
const COUPLE_3 = '#a970dd'
const SUM = '#c94a5a'
const RESULT = '#27835a'
const MUTED = '#87929d'
const INK = '#17202a'
const DISC = '#eef2f7'

const CX = 230
const CY = 158
const R = 92

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const polar = (radius: number, degrees: number) => {
  const angle = (degrees * Math.PI) / 180
  return { x: CX + radius * Math.cos(angle), y: CY + radius * Math.sin(angle) }
}

const arc = (radius: number, from: number, to: number) => {
  const start = polar(radius, from)
  const end = polar(radius, to)
  const large = Math.abs(to - from) > 180 ? 1 : 0
  const sweep = to > from ? 1 : 0
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} ${sweep} ${end.x} ${end.y}`
}

export function ForceCoupleAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? smooth(sceneProgress) : 1
  const showValues = index >= 1
  const showSum = index >= 2
  const showBalance = index >= 3
  const showCouple = index >= 4
  const showCheck = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 330" role="img" aria-label="Równoważenie tarczy trzema parami sił">
          <title>Równoważenie tarczy parą sił</title>
          <desc>Trzy pary sił działające na tarczę, ich momenty, moment wypadkowy i para równoważąca.</desc>
          <defs>
            <marker
              id="ex-couple-1"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={COUPLE_1} />
            </marker>
            <marker
              id="ex-couple-2"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={COUPLE_2} />
            </marker>
            <marker
              id="ex-couple-3"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={COUPLE_3} />
            </marker>
            <marker
              id="ex-couple-sum"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={SUM} />
            </marker>
            <marker
              id="ex-couple-ok"
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

          <circle cx={CX} cy={CY} r={R} fill={DISC} stroke="#9aa5b1" strokeWidth="1.5" />
          <circle cx={CX} cy={CY} r="3" fill={INK} />
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize="9" fill={MUTED}>
            tarcza
          </text>

          <path d={arc(70, 330, 210)} fill="none" stroke={COUPLE_1} strokeWidth="2.2" markerEnd="url(#ex-couple-1)" />
          <path d={arc(84, 30, 150)} fill="none" stroke={COUPLE_2} strokeWidth="2.2" markerEnd="url(#ex-couple-2)" />
          <path d={arc(58, 90, 210)} fill="none" stroke={COUPLE_3} strokeWidth="2.2" markerEnd="url(#ex-couple-3)" />

          <text x="304" y="96" fontSize="10" fontWeight="700" fill={COUPLE_1}>
            para 1
          </text>
          <text x="334" y="208" fontSize="10" fontWeight="700" fill={COUPLE_2}>
            para 2
          </text>
          <text x="152" y="262" fontSize="10" fontWeight="700" fill={COUPLE_3}>
            para 3
          </text>

          {showValues && (
            <g>
              <text x="304" y="110" fontSize="9" fill={COUPLE_1}>
                +16 N·m
              </text>
              <text x="334" y="222" fontSize="9" fill={COUPLE_2}>
                −36 N·m
              </text>
              <text x="152" y="276" fontSize="9" fill={COUPLE_3}>
                −20 N·m
              </text>
            </g>
          )}

          {showSum && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
              <path d={arc(42, 210, 330)} fill="none" stroke={SUM} strokeWidth="2.6" markerEnd="url(#ex-couple-sum)" />
              <text x={CX} y={CY + 58} textAnchor="middle" fontSize="10" fontWeight="700" fill={SUM}>
                ΣM = 40 N·m
              </text>
            </motion.g>
          )}

          {showBalance && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <path
                d={arc(50, 330, 210)}
                fill="none"
                stroke={RESULT}
                strokeWidth="2.6"
                markerEnd="url(#ex-couple-ok)"
              />
              <text x={CX} y={CY - 70} textAnchor="middle" fontSize="10" fontWeight="700" fill={RESULT}>
                potrzebne +40 N·m
              </text>
            </motion.g>
          )}

          {showCouple && (
            <g>
              <circle cx={CX} cy={CY} r="46" fill="none" stroke={RESULT} strokeWidth="1" strokeDasharray="5 4" />
              <text x={CX - 54} y={CY + 4} textAnchor="end" fontSize="9" fill={RESULT}>
                r = 0,25 m
              </text>
              <line
                x1={CX + 78}
                y1={CY + 34}
                x2={CX + 78}
                y2={CY - 46}
                stroke={RESULT}
                strokeWidth="3"
                markerEnd="url(#ex-couple-ok)"
              />
              <line
                x1={CX - 78}
                y1={CY - 46}
                x2={CX - 78}
                y2={CY + 34}
                stroke={RESULT}
                strokeWidth="3"
                markerEnd="url(#ex-couple-ok)"
              />
              <text x={CX + 84} y={CY - 36} fontSize="9" fontWeight="700" fill={RESULT}>
                R = 80 N
              </text>
              <text x={CX - 84} y={CY + 48} textAnchor="end" fontSize="9" fontWeight="700" fill={RESULT}>
                R′ = 80 N
              </text>
            </g>
          )}

          {showCheck && (
            <g>
              <polyline
                points="164,292 170,298 182,284"
                fill="none"
                stroke={RESULT}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <text x="188" y="297" fontSize="10" fill={RESULT}>
                ΣM = 0
              </text>
              <polyline
                points="268,292 274,298 286,284"
                fill="none"
                stroke={RESULT}
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <text x="292" y="297" fontSize="10" fill={RESULT}>
                ΣF = 0
              </text>
            </g>
          )}

          {!showCheck && (
            <text x="230" y="318" textAnchor="middle" fontSize="9.5" fill={MUTED}>
              Momenty par sumujemy ze znakami; siły każdej pary znoszą się
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
