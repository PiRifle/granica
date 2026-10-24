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
const Q = 3
const P = 12
const HALF = 3
const X0 = 56
const X1 = 440
const SPAN = X1 - X0
const BEAM_Y = 58
const T_BASE = 196
const M_BASE = 312
const T_SCALE = 2.4
const M_SCALE = 1.5

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const xAt = (meters: number) => X0 + (meters / LENGTH) * SPAN
const shear = (meters: number) => 15 - Q * meters - (meters > HALF ? P : 0)
const moment = (meters: number) => 15 * meters - (Q * meters * meters) / 2 - (meters > HALF ? P * (meters - HALF) : 0)
const yT = (value: number) => T_BASE - value * T_SCALE
const yM = (value: number) => M_BASE - value * M_SCALE

const pathOf = (points: ReadonlyArray<readonly [number, number]>) =>
  points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')

const T_PATH = `M${xAt(0)} ${yT(15)} L${xAt(HALF)} ${yT(6)} L${xAt(HALF)} ${yT(-6)} L${xAt(LENGTH)} ${yT(-15)}`

const M_POINTS: Array<readonly [number, number]> = []
for (let i = 0; i <= 24; i += 1) {
  const meters = (HALF * i) / 24
  M_POINTS.push([xAt(meters), yM(moment(meters))])
}
for (let i = 1; i <= 24; i += 1) {
  const meters = HALF + (HALF * i) / 24
  M_POINTS.push([xAt(meters), yM(moment(meters))])
}
const M_PATH = pathOf(M_POINTS)

function areaUnderShear(upTo: number) {
  const steps = 28
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

export function BendingQtmPointLoadAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp(sceneProgress) : 1
  const focus = scene.focus?.metric ?? 'load'

  const loadReveal = index === 0 ? smooth(clamp(p / 0.7)) : 1
  const reactionReveal = index <= 1 ? smooth(clamp((p - 0.15) / 0.65)) : 1
  const shearDraw = index === 2 ? smooth(clamp(p / 0.8)) : 1
  const momentDraw = index === 3 ? smooth(clamp(p / 0.8)) : 1
  const relationReveal = smooth(clamp((p - 0.35) / 0.5))

  const showReactions = index >= 1
  const showShear = index >= 2
  const showMoment = index >= 3
  const showTangent = index === 3
  const showKink = index >= 4
  const pointMeters = index === 3 ? lerp(0.35, 2.45, smooth(p)) : HALF
  const pointMoment = moment(pointMeters)
  const pointShear = shear(pointMeters)

  const loadOpacity = focus === 'load' ? 1 : 0.58
  const reactionOpacity = focus === 'reaction' ? 1 : 0.62
  const shearOpacity = focus === 'T' || showKink ? 1 : 0.7

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 352"
          role="img"
          aria-label="Belka swobodnie podparta o rozpiętości 6 m z obciążeniem 3 kN/m i siłą 12 kN w środku; animacja pokazuje skok siły tnącej i załamanie momentu"
        >
          <text x={X1} y={20} textAnchor="end" fontSize={9.5} fill={INK}>
            L = 6 m
          </text>
          <text x={X1} y={33} textAnchor="end" fontSize={9} fill={MUTED}>
            q = 3 kN/m, P = 12 kN
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
            {Array.from({ length: 13 }, (_, arrow) => {
              const ratio = arrow / 12
              const meters = 0.08 + ratio * (LENGTH - 0.16)
              const x = xAt(meters)
              const localReveal = index === 0 ? smooth(clamp(loadReveal * 1.5 - ratio * 0.3)) : 1
              return (
                <g key={arrow} opacity={localReveal}>
                  <line x1={x} y1={BEAM_Y - 30} x2={x} y2={BEAM_Y - 7} strokeWidth={1.4} />
                  <path
                    d={`M${x - 3.2} ${BEAM_Y - 13} L${x} ${BEAM_Y - 6} L${x + 3.2} ${BEAM_Y - 13}`}
                    fill="none"
                    strokeWidth={1.4}
                  />
                </g>
              )
            })}
            <line x1={xAt(0.08)} y1={BEAM_Y - 30} x2={xAt(LENGTH - 0.08)} y2={BEAM_Y - 30} strokeWidth={1.8} />
            <text x={X0 + 92} y={BEAM_Y - 40} fontSize={9.5} stroke="none">
              q = 3 kN/m
            </text>
            <motion.g initial={false} animate={{ opacity: loadReveal }}>
              <line x1={xAt(HALF)} y1={BEAM_Y - 42} x2={xAt(HALF)} y2={BEAM_Y - 7} strokeWidth={2.5} />
              <path
                d={`M${xAt(HALF) - 5} ${BEAM_Y - 16} L${xAt(HALF)} ${BEAM_Y - 6} L${xAt(HALF) + 5} ${BEAM_Y - 16}`}
                fill="none"
                strokeWidth={2.5}
              />
              <text x={xAt(HALF)} y={BEAM_Y - 46} textAnchor="middle" fontSize={9.5} stroke="none">
                P = 12 kN
              </text>
            </motion.g>
          </motion.g>

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
            <>
              <ReactionArrow at={0} offset={-16} label="R_A = 15 kN" opacity={reactionOpacity * reactionReveal} />
              <ReactionArrow at={6} offset={16} label="R_B = 15 kN" opacity={reactionOpacity * reactionReveal} />
            </>
          )}

          {index === 0 && <Dimension from={0} to={6} y={132} label="L = 6 m" />}

          {showShear && (
            <motion.g initial={false} animate={{ opacity: shearOpacity }}>
              <line x1={X0 - 14} y1={T_BASE + 48} x2={X0 - 14} y2={T_BASE - 48} stroke={MUTED} strokeWidth={1.1} />
              <path
                d={`M${X0 - 18} ${T_BASE - 40} L${X0 - 14} ${T_BASE - 50} L${X0 - 10} ${T_BASE - 40}`}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.1}
              />
              <line x1={X0 - 5} y1={T_BASE} x2={X1 + 12} y2={T_BASE} stroke="#c9d0d9" strokeWidth={1} />
              <text x={10} y={T_BASE - 38} fontSize={10} fontWeight={700} fill={T_COLOR}>
                T [kN]
              </text>
              <text x={X0 - 10} y={yT(15) + 3} textAnchor="end" fontSize={8.5} fill={MUTED}>
                +15
              </text>
              <text x={X0 - 10} y={yT(-15) + 3} textAnchor="end" fontSize={8.5} fill={MUTED}>
                −15
              </text>
              <motion.path
                d={T_PATH}
                fill="none"
                stroke={T_COLOR}
                strokeWidth={3}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                initial={false}
                animate={{ pathLength: shearDraw }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />

              <motion.g initial={false} animate={{ opacity: relationReveal }}>
                <text x={xAt(0.6) + 4} y={yT(12) - 6} fontSize={8.5} fontWeight={700} fill={T_COLOR}>
                  +15→+6 kN
                </text>
                <text x={xAt(HALF) + 7} y={(yT(6) + yT(-6)) / 2 + 4} fontSize={8.5} fill={LOAD}>
                  skok P = 12 kN
                </text>
                <text x={xAt(4.2) + 4} y={yT(-12) - 6} fontSize={8.5} fontWeight={700} fill={T_COLOR}>
                  −6→−15 kN
                </text>
                <line
                  x1={xAt(1.0)}
                  y1={yT(shear(1.0))}
                  x2={xAt(1.5)}
                  y2={yT(shear(1.0))}
                  stroke={LOAD}
                  strokeWidth={1.3}
                  strokeDasharray="4 3"
                />
                <line
                  x1={xAt(1.5)}
                  y1={yT(shear(1.0))}
                  x2={xAt(1.5)}
                  y2={yT(shear(1.5))}
                  stroke={LOAD}
                  strokeWidth={1.3}
                  strokeDasharray="4 3"
                />
              </motion.g>

              <line
                x1={xAt(HALF)}
                y1={yT(6)}
                x2={xAt(HALF)}
                y2={yT(-6)}
                stroke={T_COLOR}
                strokeWidth={1.2}
                strokeDasharray="3 3"
                opacity={0.75}
              />
              {focus === 'T' && (
                <text x={X1} y={T_BASE - 46} textAnchor="end" fontSize={8.5} fontWeight={700} fill={T_COLOR}>
                  dT/dx = −q
                </text>
              )}
            </motion.g>
          )}

          {showMoment && (
            <motion.g initial={false} animate={{ opacity: 1 }}>
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

              <motion.path
                d={areaUnderShear(pointMeters)}
                fill={T_COLOR}
                fillOpacity={0.14}
                stroke="none"
                initial={false}
                animate={{ opacity: showTangent ? relationReveal : 1 }}
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

              {showTangent && (
                <motion.g initial={false} animate={{ opacity: relationReveal }}>
                  <line
                    x1={xAt(pointMeters - 0.55)}
                    y1={yM(pointMoment - pointShear * 0.55)}
                    x2={xAt(pointMeters + 0.55)}
                    y2={yM(pointMoment + pointShear * 0.55)}
                    stroke={T_COLOR}
                    strokeWidth={1.8}
                  />
                  <circle cx={xAt(pointMeters)} cy={yM(pointMoment)} r={4} fill={M_COLOR} />
                  <text x={xAt(pointMeters) + 7} y={yM(pointMoment) - 8} fontSize={9.5} fontWeight={700} fill={M_COLOR}>
                    M = {formatNumber(pointMoment)} kN·m
                  </text>
                  <text x={X1} y={M_BASE - 54} textAnchor="end" fontSize={8.5} fontWeight={700} fill={M_COLOR}>
                    dM/dx = T
                  </text>
                </motion.g>
              )}

              {showKink && (
                <motion.g initial={false} animate={{ opacity: 1 }}>
                  <line
                    x1={xAt(2.55)}
                    y1={yM(31.5 - 6 * 0.45)}
                    x2={xAt(3)}
                    y2={yM(31.5)}
                    stroke={T_COLOR}
                    strokeWidth={1.8}
                  />
                  <line
                    x1={xAt(3)}
                    y1={yM(31.5)}
                    x2={xAt(3.45)}
                    y2={yM(31.5 + 6 * 0.45)}
                    stroke={T_COLOR}
                    strokeWidth={1.8}
                  />
                  <circle cx={xAt(3)} cy={yM(31.5)} r={4} fill={M_COLOR} />
                  <text x={xAt(3) + 8} y={yM(31.5) + 3} fontSize={9.5} fontWeight={700} fill={M_COLOR}>
                    M_max = 31,5 kN·m
                  </text>
                  <text x={X1} y={M_BASE - 54} textAnchor="end" fontSize={8.5} fontWeight={700} fill={M_COLOR}>
                    d²M/dx² = −q
                  </text>
                  <text x={xAt(3)} y={M_BASE - 62} textAnchor="middle" fontSize={8.5} fill={T_COLOR}>
                    T: +6 → −6 kN — załamanie stycznej
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
