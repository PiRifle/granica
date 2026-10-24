import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { formatNumber, local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const T_COLOR = '#4f6df5'
const M_COLOR = '#a970dd'
const SUPPORT = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const LENGTH = 6
const Q = 4
const X0 = 56
const X1 = 440
const SPAN = X1 - X0
const BEAM_Y = 58
const T_BASE = 196
const M_BASE = 312
const T_SCALE = 2.8
const M_SCALE = 2.5

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const xAt = (meters: number) => X0 + (meters / LENGTH) * SPAN
const shear = (meters: number) => 12 - Q * meters
const moment = (meters: number) => 12 * meters - 2 * meters * meters
const yT = (value: number) => T_BASE - value * T_SCALE
const yM = (value: number) => M_BASE - value * M_SCALE

const pathOf = (points: ReadonlyArray<readonly [number, number]>) =>
  points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')

const T_PATH = `M${xAt(0)} ${yT(12)} L${xAt(LENGTH)} ${yT(-12)}`
const M_POINTS = Array.from({ length: 49 }, (_, i) => {
  const meters = (LENGTH * i) / 48
  return [xAt(meters), yM(moment(meters))] as const
})
const M_PATH = pathOf(M_POINTS)

function areaUnderShear(upTo: number) {
  const steps = 24
  const points: Array<readonly [number, number]> = [
    [xAt(0), T_BASE],
    [xAt(0), yT(shear(0))],
  ]
  for (let i = 1; i <= steps; i += 1) {
    const meters = (upTo * i) / steps
    points.push([xAt(meters), yT(shear(meters))])
  }
  points.push([xAt(upTo), T_BASE])
  return `${pathOf(points)} Z`
}

function ReactionArrow({ at, offset, label, opacity }: { at: number; offset: number; label: string; opacity: number }) {
  const x = xAt(at) + offset
  return (
    <motion.g stroke={SUPPORT} fill={SUPPORT} initial={false} animate={{ opacity }}>
      <line x1={x} y1={102} x2={x} y2={BEAM_Y + 7} strokeWidth={2.3} />
      <path d={`M${x - 4} ${BEAM_Y + 16} L${x} ${BEAM_Y + 6} L${x + 4} ${BEAM_Y + 16}`} fill="none" strokeWidth={2.3} />
      <text x={x} y={114} textAnchor="middle" fontSize={8.5} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

export function BendingQtmInverseAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp(sceneProgress) : 1
  const focus = scene.focus?.metric ?? 'M'

  const momentDraw = index === 0 ? smooth(clamp(p / 0.78)) : 1
  const shearDraw = index === 1 ? smooth(clamp(p / 0.72)) : 1
  const loadReveal = index === 2 ? smooth(clamp((p - 0.12) / 0.68)) : 1
  const reactionReveal = index === 3 ? smooth(clamp(p / 0.7)) : 1
  const relationReveal = smooth(clamp((p - 0.32) / 0.55))

  const showShear = index >= 1
  const showLoad = index >= 2
  const showReactions = index >= 3
  const showTangent = index === 1
  const showSlopeTriangle = index === 2
  const showCheck = index >= 4

  const tangentMeters = index === 1 ? lerp(0.25, 4.9, smooth(p * 0.92)) : 3
  const tangentShear = shear(tangentMeters)
  const tangentMoment = moment(tangentMeters)
  const tangentHalf = Math.min(0.6, tangentMeters, LENGTH - tangentMeters)

  const momentOpacity = index === 1 || focus === 'M' ? 1 : 0.55
  const shearOpacity = focus === 'T' || focus === 'load' || focus === 'M' ? 1 : 0.68
  const loadOpacity = focus === 'load' ? 1 : 0.62

  const dataLine =
    index === 0
      ? 'M(x) = 12x − 2x²'
      : index === 1
        ? 'T(x) = dM/dx = 12 − 4x'
        : index === 2
          ? 'q = −dT/dx = 4 kN/m'
          : 'q = 4 kN/m, T = 12 − 4x'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 352"
          role="img"
          aria-label="Belka swobodnie podparta o rozpiętości 6 m; z danego parabolicznego momentu animacja odtwarza siłę tnącą, obciążenie i reakcje"
        >
          <text x={X1} y={20} textAnchor="end" fontSize={9.5} fill={INK}>
            L = 6 m
          </text>
          <text x={X1} y={33} textAnchor="end" fontSize={9} fill={MUTED}>
            {dataLine}
          </text>

          <line
            x1={X0 - 8}
            y1={BEAM_Y}
            x2={X1 + 8}
            y2={BEAM_Y}
            stroke="#556273"
            strokeWidth={5}
            strokeLinecap="round"
          />

          {showLoad && (
            <motion.g stroke={LOAD} fill={LOAD} initial={false} animate={{ opacity: loadOpacity * loadReveal }}>
              {Array.from({ length: 13 }, (_, arrow) => {
                const ratio = arrow / 12
                const meters = 0.08 + ratio * (LENGTH - 0.16)
                const x = xAt(meters)
                const localReveal = index === 2 ? smooth(clamp(loadReveal * 1.5 - ratio * 0.3)) : 1
                return (
                  <g key={arrow} opacity={localReveal}>
                    <line x1={x} y1={BEAM_Y - 32} x2={x} y2={BEAM_Y - 7} strokeWidth={1.4} />
                    <path
                      d={`M${x - 3.2} ${BEAM_Y - 13} L${x} ${BEAM_Y - 6} L${x + 3.2} ${BEAM_Y - 13}`}
                      fill="none"
                      strokeWidth={1.4}
                    />
                  </g>
                )
              })}
              <line x1={xAt(0.08)} y1={BEAM_Y - 32} x2={xAt(LENGTH - 0.08)} y2={BEAM_Y - 32} strokeWidth={1.8} />
              <text x={X0 + 92} y={BEAM_Y - 44} fontSize={9.5} stroke="none">
                q = 4 kN/m
              </text>
            </motion.g>
          )}

          <g stroke={SUPPORT} fill={SUPPORT}>
            <path d={`M${xAt(0) - 9} ${BEAM_Y + 18} L${xAt(0)} ${BEAM_Y + 5} L${xAt(0) + 9} ${BEAM_Y + 18} Z`} />
            <line x1={xAt(0) - 13} y1={BEAM_Y + 18} x2={xAt(0) + 13} y2={BEAM_Y + 18} strokeWidth={1.3} />
            <path d={`M${xAt(6) - 9} ${BEAM_Y + 18} L${xAt(6)} ${BEAM_Y + 5} L${xAt(6) + 9} ${BEAM_Y + 18} Z`} />
            <line x1={xAt(6) - 13} y1={BEAM_Y + 18} x2={xAt(6) + 13} y2={BEAM_Y + 18} strokeWidth={1.3} />
            <text x={xAt(0)} y={BEAM_Y + 31} textAnchor="middle" fontSize={9.5} stroke="none">
              A
            </text>
            <text x={xAt(6)} y={BEAM_Y + 31} textAnchor="middle" fontSize={9.5} stroke="none">
              B
            </text>
          </g>

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
              <ReactionArrow at={0} offset={-16} label="R_A = T(0) = 12 kN" opacity={reactionReveal} />
              <ReactionArrow at={6} offset={16} label="R_B = −T(6) = 12 kN" opacity={reactionReveal} />
            </motion.g>
          )}

          <motion.g initial={false} animate={{ opacity: momentOpacity }}>
            <line x1={X0 - 14} y1={M_BASE + 20} x2={X0 - 14} y2={M_BASE - 56} stroke={MUTED} strokeWidth={1.1} />
            <path
              d={`M${X0 - 18} ${M_BASE - 48} L${X0 - 14} ${M_BASE - 58} L${X0 - 10} ${M_BASE - 48}`}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.1}
            />
            <line x1={X0 - 5} y1={M_BASE} x2={X1 + 12} y2={M_BASE} stroke="#c9d0d9" strokeWidth={1} />
            <text x={8} y={M_BASE - 48} fontSize={10} fontWeight={700} fill={M_COLOR}>
              M [kN·m]
            </text>
            {[0, 3, 6].map((meters) => (
              <text key={meters} x={xAt(meters)} y={M_BASE + 15} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                {meters} m
              </text>
            ))}

            {showCheck && (
              <motion.path
                d={areaUnderShear(3)}
                fill={T_COLOR}
                fillOpacity={0.15}
                stroke="none"
                initial={false}
                animate={{ opacity: 1 }}
              />
            )}

            <motion.path
              d={M_PATH}
              fill="none"
              stroke={M_COLOR}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={false}
              animate={{ pathLength: momentDraw }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />

            {showTangent && (
              <motion.g initial={false} animate={{ opacity: relationReveal }}>
                <line
                  x1={xAt(tangentMeters - tangentHalf)}
                  y1={yM(tangentMoment - tangentShear * tangentHalf)}
                  x2={xAt(tangentMeters + tangentHalf)}
                  y2={yM(tangentMoment + tangentShear * tangentHalf)}
                  stroke={T_COLOR}
                  strokeWidth={1.8}
                />
                <circle cx={xAt(tangentMeters)} cy={yM(tangentMoment)} r={4} fill={M_COLOR} />
                <text x={xAt(tangentMeters) + 7} y={yM(tangentMoment) - 8} fontSize={9} fontWeight={700} fill={M_COLOR}>
                  M = {formatNumber(tangentMoment)} kN·m
                </text>
                <text x={X1} y={M_BASE - 54} textAnchor="end" fontSize={8.5} fontWeight={700} fill={M_COLOR}>
                  dM/dx = T
                </text>
              </motion.g>
            )}

            {showCheck && (
              <motion.g initial={false} animate={{ opacity: 1 }}>
                <line
                  x1={xAt(3)}
                  y1={M_BASE}
                  x2={xAt(3)}
                  y2={yM(18) - 8}
                  stroke={M_COLOR}
                  strokeWidth={1.1}
                  strokeDasharray="4 4"
                  opacity={0.65}
                />
                <line x1={xAt(2.2)} y1={yM(18)} x2={xAt(3.8)} y2={yM(18)} stroke={T_COLOR} strokeWidth={1.8} />
                <circle cx={xAt(3)} cy={yM(18)} r={4} fill={M_COLOR} />
                <text x={xAt(3) + 8} y={yM(18) + 3} fontSize={9.5} fontWeight={700} fill={M_COLOR}>
                  M_max = 18 kN·m
                </text>
                <text x={X1} y={M_BASE - 54} textAnchor="end" fontSize={8.5} fontWeight={700} fill={M_COLOR}>
                  d²M/dx² = −q
                </text>
              </motion.g>
            )}
          </motion.g>

          {showShear && (
            <motion.g initial={false} animate={{ opacity: shearOpacity }}>
              <line x1={X0 - 14} y1={T_BASE + 38} x2={X0 - 14} y2={T_BASE - 42} stroke={MUTED} strokeWidth={1.1} />
              <path
                d={`M${X0 - 18} ${T_BASE - 34} L${X0 - 14} ${T_BASE - 44} L${X0 - 10} ${T_BASE - 34}`}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.1}
              />
              <line x1={X0 - 5} y1={T_BASE} x2={X1 + 12} y2={T_BASE} stroke="#c9d0d9" strokeWidth={1} />
              <text x={10} y={T_BASE - 32} fontSize={10} fontWeight={700} fill={T_COLOR}>
                T [kN]
              </text>
              <text x={X0 - 10} y={yT(12) + 3} textAnchor="end" fontSize={8.5} fill={MUTED}>
                +12
              </text>
              <text x={X0 - 10} y={yT(-12) + 3} textAnchor="end" fontSize={8.5} fill={MUTED}>
                −12
              </text>
              <motion.path
                d={T_PATH}
                fill="none"
                stroke={T_COLOR}
                strokeWidth={3}
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: shearDraw }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />

              {showSlopeTriangle && (
                <motion.g initial={false} animate={{ opacity: relationReveal }}>
                  <line
                    x1={xAt(1.5)}
                    y1={yT(shear(1.5))}
                    x2={xAt(2.0)}
                    y2={yT(shear(1.5))}
                    stroke={LOAD}
                    strokeWidth={1.3}
                    strokeDasharray="4 3"
                  />
                  <line
                    x1={xAt(2.0)}
                    y1={yT(shear(1.5))}
                    x2={xAt(2.0)}
                    y2={yT(shear(2.0))}
                    stroke={LOAD}
                    strokeWidth={1.3}
                    strokeDasharray="4 3"
                  />
                  <text x={xAt(2.05)} y={yT(shear(1.75)) + 4} fontSize={8.5} fill={LOAD}>
                    ΔT = −q Δx = −4Δx
                  </text>
                </motion.g>
              )}

              {showCheck && (
                <motion.g initial={false} animate={{ opacity: 1 }}>
                  <line
                    x1={xAt(3)}
                    y1={T_BASE - 42}
                    x2={xAt(3)}
                    y2={T_BASE + 6}
                    stroke={T_COLOR}
                    strokeWidth={1.1}
                    strokeDasharray="4 4"
                    opacity={0.7}
                  />
                  <circle cx={xAt(3)} cy={T_BASE} r={3.5} fill={T_COLOR} />
                  <text x={xAt(3) + 6} y={T_BASE + 15} fontSize={8.5} fontWeight={700} fill={T_COLOR}>
                    T = 0
                  </text>
                </motion.g>
              )}

              {focus === 'T' && (
                <text x={X1} y={T_BASE - 40} textAnchor="end" fontSize={8.5} fontWeight={700} fill={T_COLOR}>
                  dM/dx = T
                </text>
              )}
              {focus === 'load' && (
                <text x={X1} y={T_BASE - 40} textAnchor="end" fontSize={8.5} fontWeight={700} fill={LOAD}>
                  q = −dT/dx
                </text>
              )}
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
