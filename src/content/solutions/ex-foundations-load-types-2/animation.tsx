import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { formatNumber, local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const ACCENT = '#4f6df5'
const MOMENT = '#a970dd'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

const LENGTH = 6
const Q = 2.4
const P = 18
const REACTION = 16.2
const HALF = LENGTH / 2
const X0 = 60
const X1 = 440
const SPAN = X1 - X0
const BEAM_Y = 64
const T_BASE = 220
const M_BASE = 340
const T_SCALE = 2.2
const M_SCALE = 1.35

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const xAt = (meters: number) => X0 + (meters / LENGTH) * SPAN
const shear = (meters: number) => REACTION - Q * meters - (meters > HALF ? P : 0)
const moment = (meters: number) =>
  REACTION * meters - (Q * meters * meters) / 2 - (meters > HALF ? P * (meters - HALF) : 0)
const yT = (value: number) => T_BASE - value * T_SCALE
const yM = (value: number) => M_BASE - value * M_SCALE

const T_PATH = `M${xAt(0)} ${yT(REACTION)} L${xAt(HALF)} ${yT(9)} L${xAt(HALF)} ${yT(-9)} L${xAt(LENGTH)} ${yT(-REACTION)}`

const M_POINTS: Array<readonly [number, number]> = []
for (let i = 0; i <= 24; i += 1) {
  const meters = (HALF * i) / 24
  M_POINTS.push([xAt(meters), yM(moment(meters))])
}
for (let i = 1; i <= 24; i += 1) {
  const meters = HALF + (HALF * i) / 24
  M_POINTS.push([xAt(meters), yM(moment(meters))])
}
const M_PATH = M_POINTS.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')

const momentMax = moment(HALF)

function ReactionArrow({ at, offset, label }: { at: number; offset: number; label: string }) {
  const x = xAt(at) + offset
  return (
    <g stroke={SUPPORT} fill={SUPPORT}>
      <line x1={x} y1={BEAM_Y + 44} x2={x} y2={BEAM_Y + 7} strokeWidth={2.3} />
      <path d={`M${x - 4} ${BEAM_Y + 16} L${x} ${BEAM_Y + 6} L${x + 4} ${BEAM_Y + 16}`} fill="none" strokeWidth={2.3} />
      <text x={x} y={BEAM_Y + 58} textAnchor="middle" fontSize={8.5} stroke="none">
        {label}
      </text>
    </g>
  )
}

export function LoadTypesExample2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const progress = playing ? clamp(sceneProgress) : 1
  const loadReveal = index === 0 ? smooth(clamp(progress / 0.7)) : 1
  const reactionReveal = index === 2 ? smooth(clamp((progress - 0.15) / 0.65)) : 1
  const shearDraw = index === 3 ? smooth(clamp(progress / 0.8)) : 1
  const momentDraw = index === 4 ? smooth(clamp(progress / 0.8)) : 1
  const showResultant = index === 1
  const showReactions = index >= 2
  const showShear = index >= 3
  const showMoment = index >= 4
  const focus = scene.focus?.metric ?? 'load'
  const loadOpacity = focus === 'load' ? 1 : 0.6
  const reactionOpacity = focus === 'reaction' ? 1 : 0.6
  const shearOpacity = focus === 'T' ? 1 : 0.55
  const momentOpacity = focus === 'M' ? 1 : 0.55

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 370"
          role="img"
          aria-label="Belka swobodnie podparta o długości 6 m z obciążeniem równomiernym 2,4 kN/m i siłą skupioną 18 kN w środku; wypadkowa ciężaru własnego, reakcje oraz wykresy siły tnącej i momentu"
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

          <motion.g stroke={LOAD} fill={LOAD} initial={false} animate={{ opacity: loadOpacity * loadReveal }}>
            {Array.from({ length: 13 }, (_, arrow) => {
              const ratio = arrow / 12
              const meters = 0.08 + ratio * (LENGTH - 0.16)
              const x = xAt(meters)
              return (
                <g key={arrow}>
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
            <line x1={xAt(HALF)} y1={BEAM_Y - 44} x2={xAt(HALF)} y2={BEAM_Y - 7} strokeWidth={2.5} />
            <path
              d={`M${xAt(HALF) - 5} ${BEAM_Y - 16} L${xAt(HALF)} ${BEAM_Y - 6} L${xAt(HALF) + 5} ${BEAM_Y - 16}`}
              fill="none"
              strokeWidth={2.5}
            />
            {showResultant && (
              <>
                <line
                  x1={xAt(HALF) - 14}
                  y1={BEAM_Y - 34}
                  x2={xAt(HALF) - 14}
                  y2={BEAM_Y - 7}
                  stroke={ACCENT}
                  strokeWidth={2.4}
                />
                <path
                  d={`M${xAt(HALF) - 18} ${BEAM_Y - 16} L${xAt(HALF) - 14} ${BEAM_Y - 6} L${xAt(HALF) - 10} ${BEAM_Y - 16}`}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth={2.4}
                />
                <line
                  x1={xAt(HALF) - 14}
                  y1={BEAM_Y + 2}
                  x2={xAt(HALF) - 14}
                  y2={BEAM_Y + 14}
                  stroke={ACCENT}
                  strokeWidth={1}
                  strokeDasharray="3 3"
                />
              </>
            )}
          </motion.g>

          <g stroke={SUPPORT} fill={SUPPORT}>
            <path d={`M${xAt(0) - 9} ${BEAM_Y + 18} L${xAt(0)} ${BEAM_Y + 5} L${xAt(0) + 9} ${BEAM_Y + 18} Z`} />
            <line x1={xAt(0) - 13} y1={BEAM_Y + 18} x2={xAt(0) + 13} y2={BEAM_Y + 18} strokeWidth={1.3} />
            <path d={`M${xAt(6) - 9} ${BEAM_Y + 18} L${xAt(6)} ${BEAM_Y + 5} L${xAt(6) + 9} ${BEAM_Y + 18} Z`} />
            <line x1={xAt(6) - 13} y1={BEAM_Y + 18} x2={xAt(6) + 13} y2={BEAM_Y + 18} strokeWidth={1.3} />
          </g>

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reactionOpacity * reactionReveal }}>
              <ReactionArrow at={0} offset={-8} label={`R_A = ${formatNumber(REACTION)} kN`} />
              <ReactionArrow at={6} offset={8} label={`R_B = ${formatNumber(REACTION)} kN`} />
            </motion.g>
          )}

          {index <= 1 && (
            <g stroke={MUTED} strokeWidth={1.1} fill="none">
              <line x1={xAt(0)} y1={BEAM_Y + 92} x2={xAt(6)} y2={BEAM_Y + 92} />
              <line x1={xAt(0)} y1={BEAM_Y + 86} x2={xAt(0)} y2={BEAM_Y + 98} />
              <line x1={xAt(6)} y1={BEAM_Y + 86} x2={xAt(6)} y2={BEAM_Y + 98} />
            </g>
          )}

          {showShear && (
            <motion.g initial={false} animate={{ opacity: shearOpacity }}>
              <line x1={X0 - 10} y1={T_BASE + 46} x2={X0 - 10} y2={T_BASE - 46} stroke={MUTED} strokeWidth={1.1} />
              <path
                d={`M${X0 - 14} ${T_BASE - 38} L${X0 - 10} ${T_BASE - 48} L${X0 - 6} ${T_BASE - 38}`}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.1}
              />
              <line x1={X0 - 2} y1={T_BASE} x2={X1 + 8} y2={T_BASE} stroke="#c9d0d9" strokeWidth={1} />
              <motion.path
                d={T_PATH}
                fill="none"
                stroke={ACCENT}
                strokeWidth={2.6}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                initial={false}
                animate={{ pathLength: shearDraw }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </motion.g>
          )}

          {showMoment && (
            <motion.g initial={false} animate={{ opacity: momentOpacity }}>
              <line x1={X0 - 10} y1={M_BASE + 18} x2={X0 - 10} y2={M_BASE - 54} stroke={MUTED} strokeWidth={1.1} />
              <path
                d={`M${X0 - 14} ${M_BASE - 46} L${X0 - 10} ${M_BASE - 56} L${X0 - 6} ${M_BASE - 46}`}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.1}
              />
              <line x1={X0 - 2} y1={M_BASE} x2={X1 + 8} y2={M_BASE} stroke="#c9d0d9" strokeWidth={1} />
              <motion.path
                d={M_PATH}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{ pathLength: momentDraw }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </motion.g>
          )}

          <g fontSize={9.5}>
            <text x={X0 + 80} y={BEAM_Y - 42} fill={LOAD} stroke="none">
              q = 2,4 kN/m
            </text>
            <text x={xAt(HALF)} y={BEAM_Y - 52} textAnchor="middle" fill={LOAD} stroke="none">
              P = 18 kN
            </text>
            {showResultant && (
              <text x={xAt(HALF) + 8} y={BEAM_Y - 16} fill={ACCENT} stroke="none">
                Q = 14,4 kN
              </text>
            )}
            <text x={xAt(0)} y={BEAM_Y + 31} textAnchor="middle" fill={SUPPORT} stroke="none">
              A
            </text>
            <text x={xAt(6)} y={BEAM_Y + 31} textAnchor="middle" fill={SUPPORT} stroke="none">
              B
            </text>
            {index <= 1 && (
              <text x={(xAt(0) + xAt(6)) / 2} y={BEAM_Y + 106} textAnchor="middle" fill={MUTED} stroke="none">
                L = 6 m
              </text>
            )}
          </g>

          <g fontSize={8.5} fill={MUTED} stroke="none">
            {showShear && (
              <>
                <text x={10} y={T_BASE - 52} fontSize={10} fontWeight={700} fill={ACCENT}>
                  T [kN]
                </text>
                <text x={X0 - 12} y={yT(REACTION) + 3} textAnchor="end">
                  +{formatNumber(REACTION)}
                </text>
                <text x={X0 - 12} y={yT(-REACTION) + 3} textAnchor="end">
                  −{formatNumber(REACTION)}
                </text>
              </>
            )}
            {showMoment && (
              <>
                <text x={10} y={M_BASE - 56} fontSize={10} fontWeight={700} fill={MOMENT}>
                  M [kN·m]
                </text>
                <text x={xAt(HALF) + 8} y={yM(momentMax) - 8} fill={MOMENT} fontWeight={700}>
                  M_max = {formatNumber(momentMax)} kN·m
                </text>
              </>
            )}
          </g>
        </svg>
      </div>
    </div>
  )
}
