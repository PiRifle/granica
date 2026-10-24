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
const Q = 6
const R = 18
const M_MAX = 27
const ZERO_AT = 3

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
const shearAt = (meters: number) => R - Q * meters
const momentAt = (meters: number) => R * meters - (Q * meters * meters) / 2
const yM = (value: number) => M_BASE - (value / M_MAX) * M_HEIGHT
const yT = (value: number) => T_BASE - (value / R) * T_HEIGHT

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

const momentPoints = Array.from({ length: 33 }, (_, pointIndex) => {
  const meters = (pointIndex / 32) * LENGTH
  return `${xAt(meters)} ${yM(momentAt(meters))}`
})
const momentPath = `M${momentPoints.join(' L')}`
const shearPath = `M${xAt(0)} ${yT(R)} L${xAt(LENGTH)} ${yT(-R)}`

export function BendingMomentExample2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const progress = playing ? sceneProgress : 1
  const metric = scene.focus?.metric
  const showReactions = index >= 1
  const showShear = index >= 2
  const showMoment = index >= 3

  const shearDraw = index === 2 ? smooth(progress / 0.8) : 1
  const momentDraw = index === 3 ? smooth(progress / 0.85) : 1
  const shearScanX = lerp(0, LENGTH, shearDraw)
  const momentScanMeters = index === 3 ? lerp(0, LENGTH, momentDraw) : index === 4 ? ZERO_AT : null
  const showZero = showShear && (index >= 3 || shearDraw > 0.5)
  const showMax = index === 4

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 344"
          role="img"
          aria-label="Belka swobodnie podparta obciążona równomiernie 6 kN/m, wykres siły tnącej oraz rysowany wykres paraboliczny momentu z maksimum 27 kN·m w środku"
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
            {Array.from({ length: 13 }, (_, arrowIndex) => {
              const meters = (arrowIndex / 12) * LENGTH
              const x = xAt(meters)
              return (
                <g key={arrowIndex}>
                  <line x1={x} y1={BEAM_Y - 32} x2={x} y2={BEAM_Y - 5} strokeWidth={1.4} />
                  <path
                    d={`M${x - 3} ${BEAM_Y - 12} L${x} ${BEAM_Y - 5} L${x + 3} ${BEAM_Y - 12}`}
                    fill="none"
                    strokeWidth={1.4}
                  />
                </g>
              )
            })}
            <line x1={X0} y1={BEAM_Y - 33} x2={X1} y2={BEAM_Y - 33} strokeWidth={2} />
            <text x={(X0 + X1) / 2} y={BEAM_Y - 40} textAnchor="middle" fontSize={9.5}>
              q = 6 kN/m
            </text>
          </motion.g>

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
              <ReactionArrow at={0} offset={-16} label={`R_A = ${R} kN`} active={metric === 'reaction'} />
              <ReactionArrow at={LENGTH} offset={16} label={`R_B = ${R} kN`} active={metric === 'reaction'} />
            </>
          )}

          {showShear && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line x1={X0} y1={T_BASE} x2={X1} y2={T_BASE} stroke="#c9d0d9" strokeWidth={1} />
              <text x={X0 - 8} y={T_BASE - T_HEIGHT + 2} textAnchor="end" fontSize={9} fontWeight={700} fill={SHEAR}>
                T
              </text>
              <motion.path
                d={shearPath}
                fill="none"
                stroke={SHEAR}
                strokeWidth={metric === 'T' ? 2.4 : 1.9}
                initial={{ pathLength: index === 2 ? 0 : 1 }}
                animate={{ pathLength: shearDraw }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              {index === 2 && <circle cx={xAt(shearScanX)} cy={yT(shearAt(shearScanX))} r={3} fill={SHEAR} />}
              {showZero && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <line
                    x1={xAt(ZERO_AT)}
                    y1={BEAM_Y + 4}
                    x2={xAt(ZERO_AT)}
                    y2={T_BASE + 8}
                    stroke={SHEAR}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    opacity={0.55}
                  />
                  <circle cx={xAt(ZERO_AT)} cy={T_BASE} r={3} fill={SHEAR} />
                  <text
                    x={xAt(ZERO_AT)}
                    y={T_BASE - 7}
                    textAnchor="middle"
                    fontSize={8.5}
                    fontWeight={700}
                    fill={SHEAR}
                  >
                    T = 0
                  </text>
                </motion.g>
              )}
            </motion.g>
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
            d={momentPath}
            fill="none"
            stroke={MOMENT}
            strokeWidth={metric === 'M' ? 2.8 : 2.1}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: index === 3 ? 0 : 1 }}
            animate={{ pathLength: showMoment ? momentDraw : 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />

          {showMoment && momentScanMeters != null && (
            <g>
              <line
                x1={xAt(momentScanMeters)}
                y1={BEAM_Y - 18}
                x2={xAt(momentScanMeters)}
                y2={M_BASE + 3}
                stroke={MOMENT}
                strokeWidth={1.3}
                strokeDasharray="5 4"
                opacity={index === 4 ? 0.55 : 0.85}
              />
              <circle cx={xAt(momentScanMeters)} cy={yM(momentAt(momentScanMeters))} r={3.4} fill={MOMENT} />
            </g>
          )}

          {showMax && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <motion.circle
                cx={xAt(ZERO_AT)}
                cy={yM(M_MAX)}
                fill={MOMENT}
                animate={{ r: [4, 6, 4] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <text x={xAt(ZERO_AT) + 10} y={yM(M_MAX) - 1} fontSize={9.5} fontWeight={700} fill={MOMENT}>
                M_max = qL²/8 = 27 kN·m
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
