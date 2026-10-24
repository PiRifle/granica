import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const REACTION = '#2f7d5b'
const MUTED = '#87929d'
const CRITICAL = '#d84f28'

const X0 = 62
const X1 = 438
const LENGTH = 5
const LOAD_X = 2
const BEAM_Y = 62
const T_ZERO = 246
const T_SCALE = 4.2

const xAt = (meters: number) => X0 + (meters / LENGTH) * (X1 - X0)
const tY = (value: number) => T_ZERO - value * T_SCALE
const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const arcPath = (radius: number, fromDeg: number, toDeg: number) => {
  const cx = X0
  const cy = BEAM_Y
  const start = (fromDeg * Math.PI) / 180
  const end = (toDeg * Math.PI) / 180
  const x1 = cx + radius * Math.cos(start)
  const y1 = cy + radius * Math.sin(start)
  const x2 = cx + radius * Math.cos(end)
  const y2 = cy + radius * Math.sin(end)
  const sweep = toDeg > fromDeg ? 1 : 0
  return `M${x1} ${y1} A${radius} ${radius} 0 0 ${sweep} ${x2} ${y2}`
}

function BeamSupport({ x, label }: { x: number; label: string }) {
  return (
    <g>
      <path d={`M${x - 10} ${BEAM_Y + 18} L${x} ${BEAM_Y + 2} L${x + 10} ${BEAM_Y + 18} Z`} fill={SUPPORT} />
      <line x1={x - 14} y1={BEAM_Y + 18} x2={x + 14} y2={BEAM_Y + 18} stroke={SUPPORT} strokeWidth={1.4} />
      <text x={x} y={BEAM_Y + 31} textAnchor="middle" fontSize={9} fill={SUPPORT}>
        {label}
      </text>
    </g>
  )
}

function Dimension({
  from,
  to,
  y,
  label,
  amount,
}: {
  from: number
  to: number
  y: number
  label: string
  amount: number
}) {
  return (
    <motion.g stroke={MUTED} fill="none" initial={false} animate={{ opacity: amount }} transition={{ duration: 0.25 }}>
      <line x1={xAt(from)} y1={y} x2={xAt(to)} y2={y} strokeWidth={1.1} />
      <line x1={xAt(from)} y1={y - 5} x2={xAt(from)} y2={y + 5} strokeWidth={1.1} />
      <line x1={xAt(to)} y1={y - 5} x2={xAt(to)} y2={y + 5} strokeWidth={1.1} />
      <text x={(xAt(from) + xAt(to)) / 2} y={y + 13} textAnchor="middle" fontSize={9} fill={MUTED} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function ReactionArrow({ x, label, amount, opacity }: { x: number; label: string; amount: number; opacity: number }) {
  return (
    <motion.g
      stroke={REACTION}
      fill={REACTION}
      initial={false}
      animate={{ opacity: amount * opacity, y: amount > 0.05 ? 0 : 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <line x1={x} y1={BEAM_Y + 60} x2={x} y2={BEAM_Y + 38} strokeWidth={2.4} />
      <path
        d={`M${x - 5} ${BEAM_Y + 44} L${x} ${BEAM_Y + 33} L${x + 5} ${BEAM_Y + 44}`}
        fill="none"
        strokeWidth={2.4}
      />
      <text x={x} y={BEAM_Y + 76} textAnchor="middle" fontSize={8.5} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

export function BendingShearForceExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'given'
  const p = playing ? smooth(sceneProgress) : 1
  const draw = (from: number, to: number) => (playing ? smooth((p - from) / (to - from)) : 1)

  const isGiven = metric === 'given'
  const isJump = metric === 'jump'
  const isReaction = metric === 'reaction'
  const isCheck = metric === 'check'
  const isCritical = metric === 'critical'

  const loadOpacity = isJump ? 1 : 0.78
  const reactionOpacity = isReaction || isCheck ? 1 : 0.72
  const showP = !isGiven
  const showReactions = isReaction || isCheck || isCritical

  const leftDraw = isGiven ? draw(0, 0.4) : 1
  const jumpDraw = isGiven ? draw(0.35, 0.58) : 1
  const rightDraw = isGiven ? draw(0.55, 0.95) : 1
  const loadDraw = isJump ? draw(0.05, 0.55) : showP ? 1 : 0
  const reactionDraw = isReaction ? draw(0.05, 0.55) : showReactions ? 1 : 0
  const checkDraw = isCheck ? draw(0.05, 0.85) : 0
  const criticalDraw = isCritical ? draw(0.1, 0.7) : 0
  const jumpHighlight = isJump ? draw(0, 0.45) : isCritical ? 1 : 0
  const labelDraw = (amount: number) => smooth(clamp01((amount - 0.45) / 0.55))

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Belka swobodnie podparta o długości 5 metrów. Z dany wykres siły tnącej: +12 kiloniutonów do x równego 2 metry, skok do -8 kiloniutonów i odcinek poziomy do prawej podpory. Animacja odtwarza z wykresu siłę skupioną 20 kiloniutonów, reakcje i przekrój krytyczny."
        >
          <line
            x1={X0 - 8}
            y1={BEAM_Y}
            x2={X1 + 8}
            y2={BEAM_Y}
            stroke="#556273"
            strokeWidth={5}
            strokeLinecap="round"
          />

          <BeamSupport x={xAt(0)} label="A" />
          <BeamSupport x={xAt(LENGTH)} label="B" />

          {isGiven && (
            <motion.g initial={false} animate={{ opacity: 0.85 }} fill={MUTED}>
              <text x={xAt(LOAD_X)} y={30} textAnchor="middle" fontSize={15} fontWeight={700}>
                ?
              </text>
              <text x={xAt(LOAD_X)} y={20} textAnchor="middle" fontSize={8}>
                szukane P
              </text>
            </motion.g>
          )}

          {showP && (
            <motion.g
              stroke={LOAD}
              fill={LOAD}
              initial={false}
              animate={{ opacity: loadOpacity * clamp01(loadDraw * 1.4) }}
              transition={{ duration: 0.25 }}
            >
              <line
                x1={xAt(LOAD_X)}
                y1={20}
                x2={xAt(LOAD_X)}
                y2={BEAM_Y - 10}
                strokeWidth={2.6}
                strokeDasharray="1 0"
              />
              <path
                d={`M${xAt(LOAD_X) - 5} ${BEAM_Y - 18} L${xAt(LOAD_X)} ${BEAM_Y - 8} L${xAt(LOAD_X) + 5} ${BEAM_Y - 18}`}
                fill="none"
                strokeWidth={2.6}
              />
              <text x={xAt(LOAD_X)} y={13} textAnchor="middle" fontSize={10} stroke="none">
                P = 20 kN
              </text>
            </motion.g>
          )}

          <Dimension from={0} to={LENGTH} y={150} label="L = 5 m" amount={1} />
          <Dimension from={0} to={LOAD_X} y={166} label="a = 2 m" amount={1} />

          {showReactions && (
            <>
              <ReactionArrow x={xAt(0) - 18} label="R_A = 12 kN" amount={reactionDraw} opacity={reactionOpacity} />
              <ReactionArrow x={xAt(LENGTH) + 18} label="R_B = 8 kN" amount={reactionDraw} opacity={reactionOpacity} />
            </>
          )}

          {isCheck && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <motion.path
                d={arcPath(30, 200, 340)}
                fill="none"
                stroke={LOAD}
                strokeWidth={2.2}
                initial={false}
                animate={{ pathLength: checkDraw, opacity: Math.min(1, checkDraw * 3) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={arcPath(40, 340, 200)}
                fill="none"
                stroke={REACTION}
                strokeWidth={2.2}
                initial={false}
                animate={{ pathLength: checkDraw, opacity: Math.min(1, checkDraw * 3) }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.g
                initial={false}
                animate={{ opacity: Math.min(1, Math.max(0, (checkDraw - 0.65) / 0.35)) }}
                fill={LOAD}
              >
                <polygon points="92,55.5 86,49 91.6,47" />
              </motion.g>
              <motion.g
                initial={false}
                animate={{ opacity: Math.min(1, Math.max(0, (checkDraw - 0.65) / 0.35)) }}
                fill={REACTION}
              >
                <polygon points="22.7,53 23,43.6 28.6,45.6" />
              </motion.g>
              <motion.g initial={false} animate={{ opacity: checkDraw }} fill={LOAD} fontSize={8.5} fontWeight={700}>
                <text x={X0 + 50} y={54}>
                  P·a
                </text>
              </motion.g>
              <motion.g
                initial={false}
                animate={{ opacity: checkDraw }}
                fill={REACTION}
                fontSize={8.5}
                fontWeight={700}
              >
                <text x={10} y={46}>
                  R_B·L
                </text>
              </motion.g>
            </motion.g>
          )}

          <motion.g initial={false} animate={{ opacity: 1 }}>
            <line x1={X0 - 8} y1={T_ZERO} x2={X1 + 18} y2={T_ZERO} stroke={MUTED} strokeWidth={1.2} />
            <path
              d={`M${X1 + 9} ${T_ZERO - 4} L${X1 + 19} ${T_ZERO} L${X1 + 9} ${T_ZERO + 4}`}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.2}
            />
            <line x1={X0 - 8} y1={T_ZERO + 50} x2={X0 - 8} y2={T_ZERO - 62} stroke={MUTED} strokeWidth={1.2} />
            <path
              d={`M${X0 - 12} ${T_ZERO - 54} L${X0 - 8} ${T_ZERO - 64} L${X0 - 4} ${T_ZERO - 54}`}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.2}
            />
            <text x={X0 - 15} y={T_ZERO - 52} textAnchor="end" fontSize={10} fontWeight={700} fill={MUTED}>
              T
            </text>
            <text x={X0 - 12} y={T_ZERO + 12} textAnchor="end" fontSize={9} fill={MUTED}>
              0
            </text>
            {[0, LOAD_X, LENGTH].map((marker) => (
              <line
                key={marker}
                x1={xAt(marker)}
                y1={BEAM_Y + 22}
                x2={xAt(marker)}
                y2={T_ZERO}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="3 4"
                opacity={0.24}
              />
            ))}
            <text x={xAt(0)} y={T_ZERO + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              0
            </text>
            <text x={xAt(LOAD_X)} y={T_ZERO + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              2
            </text>
            <text x={xAt(LENGTH)} y={T_ZERO + 16} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              5
            </text>
            <text x={X1 + 22} y={T_ZERO + 4} fontSize={9} fill={MUTED}>
              x [m]
            </text>
          </motion.g>

          <motion.path
            d={`M${xAt(0)} ${tY(12)} L${xAt(LOAD_X)} ${tY(12)}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={3}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: leftDraw }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <motion.path
            d={`M${xAt(LOAD_X)} ${tY(12)} L${xAt(LOAD_X)} ${tY(-8)}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={3}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: jumpDraw }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <motion.path
            d={`M${xAt(LOAD_X)} ${tY(-8)} L${xAt(LENGTH)} ${tY(-8)}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={3}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: rightDraw }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <motion.g initial={false} animate={{ opacity: labelDraw(leftDraw) }} transition={{ duration: 0.2 }}>
            <circle cx={xAt(0)} cy={tY(12)} r={3} fill={ACCENT} />
            <text x={xAt(0) + 7} y={tY(12) - 7} fontSize={10} fontWeight={700} fill={ACCENT}>
              +12 kN
            </text>
          </motion.g>
          <motion.g initial={false} animate={{ opacity: labelDraw(rightDraw) }} transition={{ duration: 0.2 }}>
            <circle cx={xAt(LENGTH)} cy={tY(-8)} r={3} fill={ACCENT} />
            <text x={xAt(LENGTH) - 6} y={tY(-8) + 14} textAnchor="end" fontSize={10} fontWeight={700} fill={ACCENT}>
              −8 kN
            </text>
          </motion.g>

          <motion.g initial={false} animate={{ opacity: jumpHighlight }} transition={{ duration: 0.2 }}>
            {isJump && (
              <>
                <line
                  x1={xAt(LOAD_X) + 4}
                  y1={tY(12)}
                  x2={xAt(LOAD_X) + 4}
                  y2={tY(-8)}
                  stroke={LOAD}
                  strokeWidth={1.2}
                  strokeDasharray="4 3"
                />
                <text x={xAt(LOAD_X) + 10} y={(tY(12) + tY(-8)) / 2 + 4} fontSize={9.5} fontWeight={700} fill={LOAD}>
                  skok 20 kN
                </text>
              </>
            )}
          </motion.g>

          <motion.g initial={false} animate={{ opacity: criticalDraw }} transition={{ duration: 0.2 }}>
            <rect x={xAt(LOAD_X) - 6} y={tY(12)} width={12} height={tY(-8) - tY(12)} fill={CRITICAL} opacity={0.14} />
            <line
              x1={xAt(LOAD_X)}
              y1={20}
              x2={xAt(LOAD_X)}
              y2={292}
              stroke={CRITICAL}
              strokeWidth={1.6}
              strokeDasharray="6 4"
            />
            <motion.circle
              cx={xAt(LOAD_X)}
              cy={tY(12)}
              fill={CRITICAL}
              initial={false}
              animate={playing ? { r: [4, 6.5, 4], opacity: [0.55, 1, 0.55] } : { r: 5, opacity: 1 }}
              transition={playing ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            />
            <text x={xAt(LOAD_X) + 9} y={32} fontSize={9} fontWeight={700} fill={CRITICAL}>
              przekrój krytyczny
            </text>
            <text x={xAt(LOAD_X) - 9} y={tY(12) + 16} textAnchor="end" fontSize={9} fontWeight={700} fill={CRITICAL}>
              |T|max = 12 kN
            </text>
            <text x={xAt(LOAD_X) + 9} y={290} fontSize={8.5} fill={CRITICAL}>
              x = 2 m
            </text>
          </motion.g>
        </svg>
      </div>
    </div>
  )
}
