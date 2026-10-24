import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BEAM = '#556273'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const REACTION = '#2f7d5b'
const MOMENT = '#a970dd'
const MUTED = '#87929d'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const easeOut = (value: number) => 1 - (1 - value) ** 3
const easeInOut = (value: number) => (value < 0.5 ? 2 * value * value : 1 - (-2 * value + 2) ** 2 / 2)
const reveal = (progress: number, from: number, to: number) => easeOut(clamp01((progress - from) / (to - from)))

export function SupportsReactionsExample3Animation({ scene, index, sceneProgress }: SolutionAnimationProps) {
  const focus = scene.focus?.metric
  const x0 = 60
  const x1 = 400
  const beamY = 120
  const unknownX = x0 + 0.42 * (x1 - x0)
  const targetX = x0 + (3 / 4) * (x1 - x0)

  const moveT = index > 2 ? 1 : index === 2 ? easeInOut(clamp01((sceneProgress - 0.08) / 0.58)) : 0
  const loadX = unknownX + (targetX - unknownX) * moveT
  const settled = index > 2 ? 1 : index === 2 ? reveal(sceneProgress, 0.62, 0.85) : 0
  const raT = index > 3 ? 1 : index === 3 ? reveal(sceneProgress, 0.1, 0.5) : 0
  const momentT = index >= 4 ? reveal(sceneProgress, 0.08, 0.6) : 0

  const loadActive = focus === 'load' ? 1 : 0.75
  const reactionActive = focus === 'reaction' ? 1 : 0.8

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 320"
          role="img"
          aria-label="Belka swobodnie podparta o długości 4 m z siłą 20 kN w nieznanej odległości a od podpory A i zadaną reakcją 15 kN w podporze B; animacja wyznaczania położenia siły i reakcji"
        >
          <line x1={x0} y1={beamY} x2={x1} y2={beamY} stroke={BEAM} strokeWidth={5} strokeLinecap="round" />

          <g fill={LOAD} stroke={LOAD} opacity={loadActive}>
            <line
              x1={loadX}
              y1={40}
              x2={loadX}
              y2={beamY - 7}
              strokeWidth={2.6}
              strokeDasharray={index < 2 ? '5 4' : undefined}
            />
            <path
              d={`M${loadX - 5} ${beamY - 15} L${loadX} ${beamY - 6} L${loadX + 5} ${beamY - 15}`}
              fill="none"
              strokeWidth={2.6}
              strokeDasharray={index < 2 ? '5 4' : undefined}
            />
            <text x={loadX} y={30} textAnchor="middle" fontSize={10} stroke="none">
              P = 20 kN
            </text>
          </g>

          <g stroke={REACTION} fill={REACTION} opacity={reactionActive}>
            <line x1={x1} y1={beamY - 8} x2={x1} y2={beamY - 44} strokeWidth={2.4} />
            <path
              d={`M${x1 - 5} ${beamY - 36} L${x1} ${beamY - 46} L${x1 + 5} ${beamY - 36}`}
              fill="none"
              strokeWidth={2.4}
            />
            <text x={x1} y={beamY - 54} textAnchor="middle" fontSize={10} stroke="none">
              R_B = 15 kN
            </text>
          </g>

          {index >= 3 && (
            <motion.g
              stroke={REACTION}
              fill={REACTION}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: raT * reactionActive, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <line x1={x0} y1={beamY - 8} x2={x0} y2={beamY - 44} strokeWidth={2.4} />
              <path
                d={`M${x0 - 5} ${beamY - 36} L${x0} ${beamY - 46} L${x0 + 5} ${beamY - 36}`}
                fill="none"
                strokeWidth={2.4}
              />
              <text x={x0} y={beamY - 54} textAnchor="middle" fontSize={10} stroke="none">
                R_A = 5 kN
              </text>
            </motion.g>
          )}

          <g stroke={SUPPORT} fill={SUPPORT}>
            <path d={`M${x0 - 10} ${beamY + 16} L${x0} ${beamY + 2} L${x0 + 10} ${beamY + 16} Z`} />
            <line x1={x0 - 12} y1={beamY + 16} x2={x0 + 12} y2={beamY + 16} strokeWidth={1.2} />
            <text x={x0} y={beamY + 34} textAnchor="middle" fontSize={10} stroke="none">
              A
            </text>

            <path d={`M${x1 - 10} ${beamY + 14} L${x1} ${beamY + 2} L${x1 + 10} ${beamY + 14} Z`} />
            <circle cx={x1 - 5} cy={beamY + 19} r={2.8} />
            <circle cx={x1 + 5} cy={beamY + 19} r={2.8} />
            <line x1={x1 - 13} y1={beamY + 25} x2={x1 + 13} y2={beamY + 25} strokeWidth={1.2} />
            <text x={x1} y={beamY + 40} textAnchor="middle" fontSize={10} stroke="none">
              B
            </text>
          </g>

          <g stroke={MUTED} fill={MUTED}>
            <line
              x1={x0}
              y1={186}
              x2={loadX}
              y2={186}
              strokeWidth={1.2}
              strokeDasharray={index < 2 ? '4 4' : undefined}
            />
            <line x1={x0} y1={180} x2={x0} y2={192} strokeWidth={1.2} />
            <line x1={loadX} y1={180} x2={loadX} y2={192} strokeWidth={1.2} />
            <text x={(x0 + loadX) / 2} y={180} textAnchor="middle" fontSize={10} stroke="none" opacity={1 - settled}>
              a = ?
            </text>
            <text x={(x0 + loadX) / 2} y={180} textAnchor="middle" fontSize={10} stroke="none" opacity={settled}>
              a = 3 m
            </text>

            <line x1={x0} y1={224} x2={x1} y2={224} strokeWidth={1.2} />
            <line x1={x0} y1={218} x2={x0} y2={230} strokeWidth={1.2} />
            <line x1={x1} y1={218} x2={x1} y2={230} strokeWidth={1.2} />
            <text x={(x0 + x1) / 2} y={242} textAnchor="middle" fontSize={10} stroke="none">
              L = 4 m
            </text>
          </g>

          {index >= 4 && (
            <g>
              <line x1={x0} y1={286} x2={x1} y2={286} stroke="#c9d0d9" strokeWidth={1} />
              <motion.path
                d={`M ${x0} 286 L ${targetX} 246 L ${x1} 286`}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.4}
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: momentT }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <text x={targetX + 8} y={238} fontSize={9} fill={MOMENT} opacity={momentT}>
                M = 15 kN·m
              </text>
              <text x={x0 - 10} y={282} textAnchor="end" fontSize={10} fill={MOMENT}>
                M
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
