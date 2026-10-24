import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const MOMENT = '#d84f28'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

const LENGTH = 6
const P_AT = 3
const M_MAX = 45
const P_VALUE = 30
const REACTION_VALUE = 15

const X0 = 54
const X1 = 430
const BEAM_Y = 54
const M_BASE = 314
const M_HEIGHT = 90

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const xAt = (meters: number) => X0 + (meters / LENGTH) * (X1 - X0)
const yM = (value: number) => M_BASE - (value / M_MAX) * M_HEIGHT
const momentAt = (meters: number) =>
  meters <= P_AT ? (M_MAX / P_AT) * meters : M_MAX - (M_MAX / P_AT) * (meters - P_AT)

const leftPath = `M${xAt(0)} ${M_BASE} L${xAt(P_AT)} ${yM(M_MAX)}`
const rightPath = `M${xAt(P_AT)} ${yM(M_MAX)} L${xAt(LENGTH)} ${M_BASE}`

function Support({ at, label }: { at: number; label: string }) {
  return (
    <g stroke={SUPPORT} fill={SUPPORT}>
      <path d={`M${xAt(at) - 10} ${BEAM_Y + 16} L${xAt(at)} ${BEAM_Y + 2} L${xAt(at) + 10} ${BEAM_Y + 16} Z`} />
      <text x={xAt(at)} y={BEAM_Y + 30} textAnchor="middle" fontSize={10} stroke="none">
        {label}
      </text>
    </g>
  )
}

function ReactionArrow({ at, offset, label, active }: { at: number; offset: number; label: string; active: boolean }) {
  const x = xAt(at) + offset
  return (
    <motion.g
      stroke={REACTION}
      fill={REACTION}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: active ? 1 : 0.65, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <line x1={x} y1={BEAM_Y + 52} x2={x} y2={BEAM_Y + 10} strokeWidth={2.4} />
      <path d={`M${x - 4} ${BEAM_Y + 18} L${x} ${BEAM_Y + 8} L${x + 4} ${BEAM_Y + 18}`} fill="none" strokeWidth={2.4} />
      <text x={x} y={BEAM_Y + 64} textAnchor="middle" fontSize={8.5} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

export function BendingMomentExample3Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const progress = playing ? sceneProgress : 1
  const metric = scene.focus?.metric
  const showReactions = index >= 1
  const showMoment = index >= 2
  const solved = index >= 4

  const leftDraw = index === 2 ? smooth(progress / 0.52) : 1
  const rightDraw = index === 2 ? smooth((progress - 0.38) / 0.62) : 1
  const scanMeters = index === 2 ? lerp(0, LENGTH, smooth(progress / 0.85)) : index >= 3 ? P_AT : null
  const showMax = index >= 3

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 344"
          role="img"
          aria-label="Belka swobodnie podparta z nieznaną siłą P w środku i znanym maksymalnym momentem 45 kN·m; wykres momentu jest rysowany od zera do maksimum"
        >
          <line
            x1={X0 - 8}
            y1={BEAM_Y}
            x2={X1 + 8}
            y2={BEAM_Y}
            stroke="#556273"
            strokeWidth={6}
            strokeLinecap="round"
          />

          <Support at={0} label="A" />
          <Support at={LENGTH} label="B" />

          <motion.g
            stroke={LOAD}
            fill={LOAD}
            initial={false}
            animate={solved ? { opacity: 1, scale: 1 } : { opacity: 0.85, scale: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 16 }}
            style={{ transformOrigin: `${xAt(P_AT)}px ${BEAM_Y - 20}px` }}
          >
            <line x1={xAt(P_AT)} y1={10} x2={xAt(P_AT)} y2={BEAM_Y - 5} strokeWidth={2.6} />
            <path
              d={`M${xAt(P_AT) - 5} ${BEAM_Y - 14} L${xAt(P_AT)} ${BEAM_Y - 5} L${xAt(P_AT) + 5} ${BEAM_Y - 14}`}
              fill="none"
              strokeWidth={2.6}
            />
            <text x={xAt(P_AT)} y={5} textAnchor="middle" fontSize={9.5}>
              {solved ? `P = ${P_VALUE} kN` : 'P = ?'}
            </text>
          </motion.g>

          <text x={X1} y={20} textAnchor="end" fontSize={9} fill={MUTED}>
            dane: M_max = 45 kN·m
          </text>

          <g stroke={MUTED} strokeWidth={1.2} fill="none">
            <line x1={X0} y1={BEAM_Y + 102} x2={X1} y2={BEAM_Y + 102} />
            <line x1={X0} y1={BEAM_Y + 97} x2={X0} y2={BEAM_Y + 107} />
            <line x1={X1} y1={BEAM_Y + 97} x2={X1} y2={BEAM_Y + 107} />
            <text x={(X0 + X1) / 2} y={BEAM_Y + 115} textAnchor="middle" fontSize={8.5} fill={MUTED} stroke="none">
              L = 6 m
            </text>
          </g>

          {showReactions && (
            <>
              <ReactionArrow
                at={0}
                offset={-16}
                label={solved ? `R_A = ${REACTION_VALUE} kN` : 'R_A = P/2'}
                active={metric === 'reaction'}
              />
              <ReactionArrow
                at={LENGTH}
                offset={16}
                label={solved ? `R_B = ${REACTION_VALUE} kN` : 'R_B = P/2'}
                active={metric === 'reaction'}
              />
            </>
          )}

          <motion.g initial={false} animate={{ opacity: showMoment ? 1 : 0 }} transition={{ duration: 0.3 }}>
            <line x1={X0} y1={M_BASE} x2={X1 + 16} y2={M_BASE} stroke={MUTED} strokeWidth={1.2} />
            <path
              d={`M${X1 + 8} ${M_BASE - 4} L${X1 + 18} ${M_BASE} L${X1 + 8} ${M_BASE + 4}`}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.2}
            />
            <line x1={X0} y1={M_BASE} x2={X0} y2={M_BASE - M_HEIGHT - 12} stroke={MUTED} strokeWidth={1.2} />
            <text x={X0 - 8} y={M_BASE - M_HEIGHT - 4} textAnchor="end" fontSize={10} fontWeight={700} fill={MOMENT}>
              M
            </text>
            <text x={X0} y={M_BASE + 14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              0
            </text>
            <text x={X1} y={M_BASE + 14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              6 m
            </text>
            <text x={X1 + 22} y={M_BASE + 4} fontSize={9} fill={MUTED}>
              x
            </text>
          </motion.g>

          {index === 2 && (
            <g>
              <line
                x1={X0}
                y1={yM(M_MAX)}
                x2={X1}
                y2={yM(M_MAX)}
                stroke={MOMENT}
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.45}
              />
              <text x={X1 + 6} y={yM(M_MAX) + 3} fontSize={8} fill={MOMENT}>
                45
              </text>
            </g>
          )}

          <motion.path
            d={leftPath}
            fill="none"
            stroke={MOMENT}
            strokeWidth={metric === 'M' ? 2.8 : 2.1}
            strokeLinecap="round"
            initial={{ pathLength: index === 2 ? 0 : 1 }}
            animate={{ pathLength: showMoment ? leftDraw : 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
          <motion.path
            d={rightPath}
            fill="none"
            stroke={MOMENT}
            strokeWidth={metric === 'M' ? 2.8 : 2.1}
            strokeLinecap="round"
            initial={{ pathLength: index === 2 ? 0 : 1 }}
            animate={{ pathLength: showMoment ? rightDraw : 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />

          {showMoment && scanMeters != null && (
            <g>
              <line
                x1={xAt(scanMeters)}
                y1={BEAM_Y - 18}
                x2={xAt(scanMeters)}
                y2={M_BASE + 3}
                stroke={MOMENT}
                strokeWidth={1.3}
                strokeDasharray="5 4"
                opacity={index >= 3 ? 0.55 : 0.85}
              />
              <circle cx={xAt(scanMeters)} cy={yM(momentAt(scanMeters))} r={3.4} fill={MOMENT} />
            </g>
          )}

          {showMax && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <motion.circle
                cx={xAt(P_AT)}
                cy={yM(M_MAX)}
                fill={MOMENT}
                initial={{ r: 3.5 }}
                animate={solved ? { r: [4, 6, 4] } : { r: 4 }}
                transition={{ duration: 1.6, repeat: solved ? Infinity : 0, ease: 'easeInOut' }}
              />
              <text x={xAt(P_AT) + 10} y={yM(M_MAX) - 1} fontSize={9.5} fontWeight={700} fill={MOMENT}>
                M_max = 45 kN·m
              </text>
            </motion.g>
          )}

          {solved && (
            <motion.text
              x={X0}
              y={BEAM_Y + 132}
              fontSize={8.5}
              fill={REACTION}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.35 }}
            >
              P = 4 · M_max / L = 4 · 45 / 6 = 30 kN
            </motion.text>
          )}
        </svg>
      </div>
    </div>
  )
}
