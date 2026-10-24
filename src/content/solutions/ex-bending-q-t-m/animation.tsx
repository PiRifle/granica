import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { formatNumber, local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const T_COLOR = '#4f6df5'
const M_COLOR = '#a970dd'
const SUPPORT = '#68727e'
const MUTED = '#87929d'
const INK = '#17202a'

const LENGTH = 5
const Q = 8
const X0 = 56
const X1 = 440
const SPAN = X1 - X0
const BEAM_Y = 58
const T_BASE = 196
const M_BASE = 312
const T_SCALE = 2.4
const M_SCALE = 1.9

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const xAt = (meters: number) => X0 + (meters / LENGTH) * SPAN
const shear = (meters: number) => 20 - Q * meters
const moment = (meters: number) => 20 * meters - (Q * meters * meters) / 2
const yT = (value: number) => T_BASE - value * T_SCALE
const yM = (value: number) => M_BASE - value * M_SCALE

const pathOf = (points: ReadonlyArray<readonly [number, number]>) =>
  points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')

const T_PATH = `M${xAt(0)} ${yT(20)} L${xAt(LENGTH)} ${yT(-20)}`
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

function Dimension({ from, to, y, label }: { from: number; to: number; y: number; label: string }) {
  return (
    <g stroke={MUTED} strokeWidth={1.1} fill="none">
      <line x1={xAt(from)} y1={y} x2={xAt(to)} y2={y} />
      <line x1={xAt(from)} y1={y - 5} x2={xAt(from)} y2={y + 5} />
      <line x1={xAt(to)} y1={y - 5} x2={xAt(to)} y2={y + 5} />
      <text x={(xAt(from) + xAt(to)) / 2} y={y + 12} textAnchor="middle" fontSize={8.5} fill={MUTED} stroke="none">
        {label}
      </text>
    </g>
  )
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

export function BendingQtmAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp(sceneProgress) : 1
  const focus = scene.focus?.metric ?? 'load'

  const loadReveal = index === 0 ? smooth(clamp(p / 0.72)) : 1
  const reactionReveal = index <= 1 ? smooth(clamp((p - 0.18) / 0.62)) : 1
  const shearDraw = index === 2 ? smooth(clamp(p / 0.78)) : 1
  const momentDraw = index === 3 ? smooth(clamp(p / 0.78)) : 1
  const relationReveal = smooth(clamp((p - 0.35) / 0.5))

  const showReactions = index >= 1
  const showShear = index >= 2
  const showMoment = index >= 3
  const showMomentPoint = index === 3
  const showTangent = index === 3
  const showMaximum = index >= 4

  const shearTip = lerp(0.05, LENGTH - 0.05, shearDraw)
  const pointMeters = index === 3 ? lerp(0.25, 2.45, smooth(p)) : 2.5
  const pointShear = shear(pointMeters)
  const pointMoment = moment(pointMeters)
  const tangentHalf = Math.min(0.7, pointMeters, LENGTH - pointMeters)
  const tangentFrom = moment(pointMeters) - pointShear * tangentHalf
  const tangentTo = moment(pointMeters) + pointShear * tangentHalf

  const loadOpacity = focus === 'load' ? 1 : 0.58
  const reactionOpacity = focus === 'reaction' ? 1 : 0.62
  const shearOpacity = focus === 'T' || !showMoment || showMaximum ? 1 : 0.62
  const momentOpacity = 1
  const shearPointValue = shear(shearTip)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 352"
          role="img"
          aria-label="Belka swobodnie podparta o rozpiętości 5 m z obciążeniem 8 kN/m; animacja pokazuje reakcje, liniową siłę tnącą i paraboliczny moment"
        >
          <text x={X1} y={20} textAnchor="end" fontSize={9.5} fill={INK}>
            L = 5 m · q = 8 kN/m
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

          <motion.g stroke={LOAD} fill={LOAD} initial={false} animate={{ opacity: loadOpacity * loadReveal }}>
            {Array.from({ length: 11 }, (_, arrow) => {
              const ratio = arrow / 10
              const meters = 0.08 + ratio * (LENGTH - 0.16)
              const x = xAt(meters)
              const localReveal = index === 0 ? smooth(clamp(loadReveal * 1.5 - ratio * 0.35)) : 1
              return (
                <g key={arrow} opacity={localReveal}>
                  <line x1={x} y1={BEAM_Y - 34} x2={x} y2={BEAM_Y - 7} strokeWidth={1.5} />
                  <path
                    d={`M${x - 3.5} ${BEAM_Y - 14} L${x} ${BEAM_Y - 6} L${x + 3.5} ${BEAM_Y - 14}`}
                    fill="none"
                    strokeWidth={1.5}
                  />
                </g>
              )
            })}
            <line x1={xAt(0.08)} y1={BEAM_Y - 34} x2={xAt(LENGTH - 0.08)} y2={BEAM_Y - 34} strokeWidth={1.9} />
            <text x={X0 + 92} y={BEAM_Y - 44} fontSize={9.5} stroke="none">
              q = 8 kN/m
            </text>
          </motion.g>

          <g stroke={SUPPORT} fill={SUPPORT}>
            <path d={`M${xAt(0) - 9} ${BEAM_Y + 18} L${xAt(0)} ${BEAM_Y + 5} L${xAt(0) + 9} ${BEAM_Y + 18} Z`} />
            <line x1={xAt(0) - 13} y1={BEAM_Y + 18} x2={xAt(0) + 13} y2={BEAM_Y + 18} strokeWidth={1.3} />
            <path d={`M${xAt(5) - 9} ${BEAM_Y + 18} L${xAt(5)} ${BEAM_Y + 5} L${xAt(5) + 9} ${BEAM_Y + 18} Z`} />
            <line x1={xAt(5) - 13} y1={BEAM_Y + 18} x2={xAt(5) + 13} y2={BEAM_Y + 18} strokeWidth={1.3} />
            <text x={xAt(0)} y={BEAM_Y + 31} textAnchor="middle" fontSize={9.5} stroke="none">
              A
            </text>
            <text x={xAt(5)} y={BEAM_Y + 31} textAnchor="middle" fontSize={9.5} stroke="none">
              B
            </text>
          </g>

          {showReactions && (
            <>
              <ReactionArrow at={0} offset={-16} label="R_A = 20 kN" opacity={reactionOpacity * reactionReveal} />
              <ReactionArrow at={5} offset={16} label="R_B = 20 kN" opacity={reactionOpacity * reactionReveal} />
            </>
          )}

          {index === 0 && <Dimension from={0} to={5} y={132} label="L = 5 m" />}

          {showShear && (
            <motion.g initial={false} animate={{ opacity: shearOpacity }}>
              <line x1={X0 - 14} y1={T_BASE + 58} x2={X0 - 14} y2={T_BASE - 58} stroke={MUTED} strokeWidth={1.1} />
              <path
                d={`M${X0 - 18} ${T_BASE - 50} L${X0 - 14} ${T_BASE - 60} L${X0 - 10} ${T_BASE - 50}`}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.1}
              />
              <line x1={X0 - 5} y1={T_BASE} x2={X1 + 12} y2={T_BASE} stroke="#c9d0d9" strokeWidth={1} />
              <text x={10} y={T_BASE - 44} fontSize={10} fontWeight={700} fill={T_COLOR}>
                T [kN]
              </text>
              <text x={X0 - 10} y={yT(20) + 3} textAnchor="end" fontSize={8.5} fill={MUTED}>
                +20
              </text>
              <text x={X0 - 10} y={yT(-20) + 3} textAnchor="end" fontSize={8.5} fill={MUTED}>
                −20
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
              {index === 2 && (
                <>
                  <motion.circle
                    cx={xAt(shearTip)}
                    cy={yT(shearPointValue)}
                    r={4}
                    fill={T_COLOR}
                    initial={false}
                    animate={{ opacity: 1 }}
                  />
                  <motion.text
                    x={xAt(shearTip) + 7}
                    y={yT(shearPointValue) + (shearPointValue >= 0 ? -8 : 15)}
                    fontSize={9}
                    fontWeight={700}
                    fill={T_COLOR}
                    initial={false}
                    animate={{ opacity: 1 }}
                  >
                    T = {formatNumber(shearPointValue)} kN
                  </motion.text>
                  <motion.g initial={false} animate={{ opacity: relationReveal }}>
                    <line
                      x1={xAt(1.05)}
                      y1={yT(shear(1.05))}
                      x2={xAt(1.55)}
                      y2={yT(shear(1.05))}
                      stroke={LOAD}
                      strokeWidth={1.4}
                      strokeDasharray="4 3"
                    />
                    <line
                      x1={xAt(1.55)}
                      y1={yT(shear(1.05))}
                      x2={xAt(1.55)}
                      y2={yT(shear(1.55))}
                      stroke={LOAD}
                      strokeWidth={1.4}
                      strokeDasharray="4 3"
                    />
                    <text x={xAt(1.6)} y={yT(shear(1.3)) + 4} fontSize={8.5} fill={LOAD}>
                      ΔT = −q Δx
                    </text>
                  </motion.g>
                </>
              )}
              {index >= 4 && (
                <motion.g initial={false} animate={{ opacity: 1 }}>
                  <line
                    x1={xAt(2.5)}
                    y1={T_BASE - 54}
                    x2={xAt(2.5)}
                    y2={T_BASE + 6}
                    stroke={T_COLOR}
                    strokeWidth={1.1}
                    strokeDasharray="4 4"
                    opacity={0.7}
                  />
                  <circle cx={xAt(2.5)} cy={T_BASE} r={3.5} fill={T_COLOR} />
                  <text x={xAt(2.5) + 6} y={T_BASE + 15} fontSize={8.5} fontWeight={700} fill={T_COLOR}>
                    T = 0
                  </text>
                </motion.g>
              )}
              {focus === 'T' && (
                <text x={X1} y={T_BASE - 56} textAnchor="end" fontSize={8.5} fontWeight={700} fill={T_COLOR}>
                  dT/dx = −q
                </text>
              )}
            </motion.g>
          )}

          {showMoment && (
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
              {[0, 2.5, 5].map((meters) => (
                <text key={meters} x={xAt(meters)} y={M_BASE + 15} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  {meters === 2.5 ? '2,5' : meters} m
                </text>
              ))}

              <motion.path
                d={areaUnderShear(pointMeters)}
                fill={T_COLOR}
                fillOpacity={0.14}
                stroke="none"
                initial={false}
                animate={{ opacity: showTangent ? relationReveal : showMaximum ? 1 : 0 }}
              />

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

              {showMomentPoint && (
                <>
                  <motion.circle
                    cx={xAt(pointMeters)}
                    cy={yM(pointMoment)}
                    r={4}
                    fill={M_COLOR}
                    initial={false}
                    animate={{ opacity: 1 }}
                  />
                  <motion.text
                    x={xAt(pointMeters) + 7}
                    y={yM(pointMoment) - 7}
                    fontSize={9}
                    fontWeight={700}
                    fill={M_COLOR}
                    initial={false}
                    animate={{ opacity: 1 }}
                  >
                    M = {formatNumber(pointMoment)} kN·m
                  </motion.text>
                </>
              )}

              {showTangent && (
                <motion.g initial={false} animate={{ opacity: relationReveal }}>
                  <line
                    x1={xAt(pointMeters - tangentHalf)}
                    y1={yM(tangentFrom)}
                    x2={xAt(pointMeters + tangentHalf)}
                    y2={yM(tangentTo)}
                    stroke={T_COLOR}
                    strokeWidth={1.8}
                  />
                  <text x={X1} y={M_BASE - 54} textAnchor="end" fontSize={8.5} fontWeight={700} fill={M_COLOR}>
                    dM/dx = T
                  </text>
                </motion.g>
              )}

              {showMaximum && (
                <motion.g initial={false} animate={{ opacity: 1 }}>
                  <line
                    x1={xAt(2.5)}
                    y1={M_BASE}
                    x2={xAt(2.5)}
                    y2={yM(25) - 8}
                    stroke={M_COLOR}
                    strokeWidth={1.1}
                    strokeDasharray="4 4"
                    opacity={0.65}
                  />
                  <line x1={xAt(1.9)} y1={yM(25)} x2={xAt(3.1)} y2={yM(25)} stroke={T_COLOR} strokeWidth={1.8} />
                  <circle cx={xAt(2.5)} cy={yM(25)} r={4} fill={M_COLOR} />
                  <text x={xAt(2.5) + 8} y={yM(25) + 3} fontSize={9.5} fontWeight={700} fill={M_COLOR}>
                    M_max = 25 kN·m
                  </text>
                  <text x={X1} y={M_BASE - 54} textAnchor="end" fontSize={8.5} fontWeight={700} fill={M_COLOR}>
                    d²M/dx² = −q
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
