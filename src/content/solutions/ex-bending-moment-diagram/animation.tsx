import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const MOMENT = '#d84f28'
const SHEAR = '#4f6df5'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

const LENGTH = 6
const P_AT = 2
const R_A = 20
const R_B = 10
const M_MAX = 40

const X0 = 54
const X1 = 430
const BEAM_Y = 54
const T_BASE = 200
const T_HEIGHT = 16
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
const yT = (value: number) => T_BASE - (value / 20) * T_HEIGHT

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

function Dimension({ from, to, y, label }: { from: number; to: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} strokeWidth={1.2} fill="none">
      <line x1={xAt(from)} y1={y} x2={xAt(to)} y2={y} />
      <line x1={xAt(from)} y1={y - 5} x2={xAt(from)} y2={y + 5} />
      <line x1={xAt(to)} y1={y - 5} x2={xAt(to)} y2={y + 5} />
      <text x={(xAt(from) + xAt(to)) / 2} y={y + 13} textAnchor="middle" fontSize={8.5} fill={MUTED} stroke="none">
        {label}
      </text>
    </g>
  )
}

export function BendingMomentExample1Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const progress = playing ? sceneProgress : 1
  const metric = scene.focus?.metric
  const showReactions = index >= 1
  const showMoment = index >= 2
  const showShear = index === 4

  const leftDraw = index === 2 ? smooth(progress / 0.82) : 1
  const rightDraw = index === 2 ? 0 : index === 3 ? smooth(progress / 0.82) : 1

  const sectionMeters =
    index === 2 ? lerp(0, P_AT, leftDraw) : index === 3 ? lerp(P_AT, LENGTH, rightDraw) : index === 4 ? P_AT : null
  const sectionValue =
    sectionMeters == null
      ? 0
      : sectionMeters <= P_AT
        ? R_A * sectionMeters
        : R_A * sectionMeters - 30 * (sectionMeters - P_AT)
  const showSection = showMoment && sectionMeters != null
  const showMax = index >= 3
  const showMaxLabel = index === 4

  const leftPath = `M${xAt(0)} ${M_BASE} L${xAt(P_AT)} ${yM(M_MAX)}`
  const rightPath = `M${xAt(P_AT)} ${yM(M_MAX)} L${xAt(LENGTH)} ${M_BASE}`
  const shearPath = `M${xAt(0)} ${yT(R_A)} L${xAt(P_AT)} ${yT(R_A)} L${xAt(P_AT)} ${yT(-R_B)} L${xAt(LENGTH)} ${yT(-R_B)}`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 344"
          role="img"
          aria-label="Belka swobodnie podparta z siłą 30 kN w odległości 2 m oraz wykresem momentu zginającego rysowanym od zera do maksimum 40 kN·m"
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

          <motion.g stroke={LOAD} fill={LOAD} initial={false} animate={{ opacity: metric === 'load' ? 1 : 0.78 }}>
            <line x1={xAt(P_AT)} y1={10} x2={xAt(P_AT)} y2={BEAM_Y - 5} strokeWidth={2.6} />
            <path
              d={`M${xAt(P_AT) - 5} ${BEAM_Y - 14} L${xAt(P_AT)} ${BEAM_Y - 5} L${xAt(P_AT) + 5} ${BEAM_Y - 14}`}
              fill="none"
              strokeWidth={2.6}
            />
            <text x={xAt(P_AT)} y={5} textAnchor="middle" fontSize={9.5}>
              P = 30 kN
            </text>
          </motion.g>

          <Dimension from={0} to={P_AT} y={BEAM_Y + 78} label="a = 2 m" />
          <Dimension from={0} to={LENGTH} y={BEAM_Y + 102} label="L = 6 m" />

          {showReactions && (
            <>
              <ReactionArrow at={0} offset={-16} label={`R_A = ${R_A} kN`} active={metric === 'reaction'} />
              <ReactionArrow at={LENGTH} offset={16} label={`R_B = ${R_B} kN`} active={metric === 'reaction'} />
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

          <motion.path
            d={leftPath}
            fill="none"
            stroke={MOMENT}
            strokeWidth={metric === 'M' ? 2.8 : 2.1}
            strokeLinecap="round"
            initial={{ pathLength: index >= 3 ? 1 : 0 }}
            animate={{ pathLength: showMoment ? leftDraw : 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
          <motion.path
            d={rightPath}
            fill="none"
            stroke={MOMENT}
            strokeWidth={metric === 'M' ? 2.8 : 2.1}
            strokeLinecap="round"
            initial={{ pathLength: index >= 4 ? 1 : 0 }}
            animate={{ pathLength: showMoment ? rightDraw : 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />

          {showSection && (
            <g>
              <line
                x1={xAt(sectionMeters)}
                y1={BEAM_Y - 18}
                x2={xAt(sectionMeters)}
                y2={M_BASE + 3}
                stroke={MOMENT}
                strokeWidth={1.3}
                strokeDasharray="5 4"
                opacity={index === 4 ? 0.55 : 0.85}
              />
              <circle cx={xAt(sectionMeters)} cy={yM(sectionValue)} r={3.4} fill={MOMENT} />
            </g>
          )}

          {showShear && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <line x1={X0} y1={T_BASE} x2={X1} y2={T_BASE} stroke="#c9d0d9" strokeWidth={1} />
              <text x={X0 - 8} y={T_BASE - T_HEIGHT + 2} textAnchor="end" fontSize={9} fontWeight={700} fill={SHEAR}>
                T
              </text>
              <motion.path
                d={shearPath}
                fill="none"
                stroke={SHEAR}
                strokeWidth={metric === 'T' ? 2.4 : 1.9}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: smooth(progress / 0.6) }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <line
                x1={xAt(P_AT)}
                y1={T_BASE - T_HEIGHT - 4}
                x2={xAt(P_AT)}
                y2={T_BASE + T_HEIGHT + 4}
                stroke={SHEAR}
                strokeWidth={1}
                strokeDasharray="3 3"
                opacity={0.55}
              />
              <text x={xAt(P_AT) + 6} y={T_BASE - T_HEIGHT - 6} fontSize={8.5} fill={SHEAR}>
                T zmienia znak
              </text>
            </motion.g>
          )}

          {showMax && (
            <motion.g
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: `${xAt(P_AT)}px ${yM(M_MAX)}px` }}
            >
              <motion.circle
                cx={xAt(P_AT)}
                cy={yM(M_MAX)}
                fill={MOMENT}
                initial={{ r: 3.5 }}
                animate={index === 4 ? { r: [4, 6, 4] } : { r: 4 }}
                transition={{ duration: 1.6, repeat: index === 4 ? Infinity : 0, ease: 'easeInOut' }}
              />
              {showMaxLabel && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
                  <text x={xAt(P_AT) + 10} y={yM(M_MAX) - 1} fontSize={9.5} fontWeight={700} fill={MOMENT}>
                    M_max = 40 kN·m
                  </text>
                </motion.g>
              )}
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
