import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BEAM = '#556273'
const LOAD = '#ff6b45'
const RESULTANT = '#d84f28'
const REACTION = '#2f7d5b'
const SUPPORT = '#68727e'
const MOMENT = '#ff6b45'
const MUTED = '#87929d'

const X0 = 64
const X1 = 436
const SPAN = X1 - X0
const LENGTH = 5
const BEAM_Y = 130
const MOMENT_BASE = 310
const MOMENT_HEIGHT = 30

const x = (value: number) => X0 + (value / LENGTH) * SPAN
const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const MOMENT_POINTS: Array<[number, number]> = [
  [0, 0],
  [1, 26],
  [2, 48],
  [3, 36],
  [4, 20],
  [5, 0],
]
const momentY = (value: number) => MOMENT_BASE - (value / 48) * MOMENT_HEIGHT

function Support({ at, label }: { at: number; label: string }) {
  return (
    <g>
      <path d={`M${at - 10} ${BEAM_Y + 16} L${at} ${BEAM_Y + 2} L${at + 10} ${BEAM_Y + 16} Z`} fill={SUPPORT} />
      <line x1={at - 14} y1={BEAM_Y + 16} x2={at + 14} y2={BEAM_Y + 16} stroke={SUPPORT} strokeWidth={1.4} />
      <text x={at} y={BEAM_Y + 32} textAnchor="middle" fontSize={10} fill={SUPPORT}>
        {label}
      </text>
    </g>
  )
}

function Reaction({ at, label, amount }: { at: number; label: string; amount: number }) {
  return (
    <motion.g
      stroke={REACTION}
      fill={REACTION}
      initial={false}
      animate={{ opacity: amount, y: amount > 0.05 ? 0 : 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <line x1={at} y1={BEAM_Y + 54} x2={at} y2={BEAM_Y + 8} strokeWidth={2.4} />
      <path
        d={`M${at - 5} ${BEAM_Y + 18} L${at} ${BEAM_Y + 6} L${at + 5} ${BEAM_Y + 18}`}
        fill="none"
        strokeWidth={2.4}
      />
      <text x={at} y={BEAM_Y + 70} textAnchor="middle" fontSize={9} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function Dimension({ from, to, y, label }: { from: number; to: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} fill={MUTED}>
      <line x1={from} y1={y} x2={to} y2={y} strokeWidth={1.2} />
      <line x1={from} y1={y - 8} x2={from} y2={y + 8} strokeWidth={1.2} />
      <line x1={to} y1={y - 8} x2={to} y2={y + 8} strokeWidth={1.2} />
      <text x={(from + to) / 2} y={y + 12} textAnchor="middle" fontSize={10} stroke="none">
        {label}
      </text>
    </g>
  )
}

export function SupportsReactionsExample1Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'load'
  const p = playing ? smooth(sceneProgress) : 1
  const showLoad = index >= 1
  const showReactionB = index >= 2
  const showReactionA = index >= 3
  const showMoment = index >= 4
  const loadOpacity = metric === 'load' ? 1 : 0.65
  const reactionOpacity = metric === 'reaction' || metric === 'M' ? 1 : 0.7
  const resultantX = x(LENGTH / 2)
  const pointX = x(2)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 330"
          role="img"
          aria-label="Belka swobodnie podparta o długości 5 m z obciążeniem równomiernym 4 kN/m i siłą 30 kN w odległości 2 m od podpory A; animacja pokazuje wypadkową 20 kN, reakcje 28 kN i 22 kN oraz moment 48 kN·m"
        >
          <line x1={X0} y1={BEAM_Y} x2={X1} y2={BEAM_Y} stroke={BEAM} strokeWidth={5} strokeLinecap="round" />

          <g stroke={LOAD} fill={LOAD} opacity={loadOpacity}>
            {Array.from({ length: 13 }, (_, arrow) => {
              const px = X0 + (arrow / 12) * SPAN
              return (
                <g key={arrow}>
                  <line x1={px} y1={BEAM_Y - 32} x2={px} y2={BEAM_Y - 5} strokeWidth={1.5} />
                  <path
                    d={`M${px - 3} ${BEAM_Y - 12} L${px} ${BEAM_Y - 5} L${px + 3} ${BEAM_Y - 12}`}
                    fill="none"
                    strokeWidth={1.5}
                  />
                </g>
              )
            })}
            <line x1={X0} y1={BEAM_Y - 32} x2={X1} y2={BEAM_Y - 32} strokeWidth={2} />
            <text x={x(3.9)} y={BEAM_Y - 44} textAnchor="middle" fontSize={10} stroke="none">
              q = 4 kN/m
            </text>
          </g>

          <g stroke={LOAD} fill={LOAD} opacity={loadOpacity}>
            <line x1={pointX} y1={BEAM_Y - 48} x2={pointX} y2={BEAM_Y - 7} strokeWidth={2.6} />
            <path
              d={`M${pointX - 5} ${BEAM_Y - 17} L${pointX} ${BEAM_Y - 7} L${pointX + 5} ${BEAM_Y - 17}`}
              fill="none"
              strokeWidth={2.6}
            />
            <text x={pointX} y={BEAM_Y - 58} textAnchor="middle" fontSize={9.5} stroke="none">
              P = 30 kN
            </text>
          </g>

          <Support at={X0} label="A" />
          <Support at={X1} label="B" />

          {showLoad && (
            <motion.g
              stroke={RESULTANT}
              fill={RESULTANT}
              initial={false}
              animate={{ opacity: p * loadOpacity }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <line x1={resultantX} y1={BEAM_Y - 68} x2={resultantX} y2={BEAM_Y - 8} strokeWidth={2.6} />
              <path
                d={`M${resultantX - 5} ${BEAM_Y - 18} L${resultantX} ${BEAM_Y - 8} L${resultantX + 5} ${BEAM_Y - 18}`}
                fill="none"
                strokeWidth={2.6}
              />
              <line
                x1={resultantX}
                y1={BEAM_Y + 2}
                x2={resultantX}
                y2={BEAM_Y + 16}
                strokeDasharray="3 3"
                strokeWidth={1}
              />
              <text x={resultantX} y={BEAM_Y - 78} textAnchor="middle" fontSize={9.5} stroke="none">
                Q = 20 kN
              </text>
            </motion.g>
          )}

          {showReactionB && <Reaction at={X1 + 22} label="R_B = 22 kN" amount={p * reactionOpacity} />}
          {showReactionA && <Reaction at={X0 - 22} label="R_A = 28 kN" amount={p * reactionOpacity} />}

          {showLoad && <Dimension from={X0} to={resultantX} y={BEAM_Y + 86} label="x_Q = 2,5 m" />}
          <Dimension from={X0} to={X1} y={BEAM_Y + 110} label="L = 5 m" />

          {showMoment && (
            <motion.g
              initial={false}
              animate={{ opacity: p }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              stroke={MOMENT}
              fill={MOMENT}
            >
              <line x1={X0} y1={MOMENT_BASE} x2={X1} y2={MOMENT_BASE} stroke={MUTED} strokeWidth={1} />
              <polyline
                points={MOMENT_POINTS.map(([position, value]) => `${x(position)},${momentY(value)}`).join(' ')}
                fill="none"
                strokeWidth={2.4}
                strokeLinejoin="round"
              />
              <circle cx={x(2)} cy={momentY(48)} r={3} />
              <text x={(X0 + X1) / 2} y={MOMENT_BASE + 12} textAnchor="middle" fontSize={9} fill={MUTED} stroke="none">
                M [kN·m]
              </text>
              <text x={x(2) + 8} y={momentY(48) - 6} fontSize={9} stroke="none">
                M = 48 kN·m
              </text>
            </motion.g>
          )}
        </svg>
      </div>
      <p className={local('note')}>Obciążenie równomierne działa na całej długości, a siła P w x = 2 m.</p>
    </div>
  )
}
