import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BEAM = '#556273'
const LOAD = '#ff6b45'
const DISTRIBUTED = '#ff8a5c'
const SUPPORT = '#68727e'
const REACTION = '#2f7d5b'
const MOMENT = '#a970dd'
const MUTED = '#87929d'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const easeOut = (value: number) => 1 - (1 - value) ** 3
const reveal = (progress: number, from: number, to: number) => easeOut(clamp01((progress - from) / (to - from)))

export function SupportsReactionsExample2Animation({ scene, index, sceneProgress }: SolutionAnimationProps) {
  const focus = scene.focus?.metric
  const x0 = 80
  const x1 = 420
  const beamY = 130
  const distributedTop = 84
  const xQ = x0 + (x1 - x0) / 2
  const arrowCount = 9
  const arrows = Array.from({ length: arrowCount }, (_, i) => x0 + (i * (x1 - x0)) / (arrowCount - 1))
  const momentCx = x0 + 36
  const loadArcR = 30
  const reactionArcR = 46
  const raX = x0 + 24

  const qT = index > 1 ? 1 : index === 1 ? reveal(sceneProgress, 0.06, 0.4) : 0
  const raT = index > 2 ? 1 : index === 2 ? reveal(sceneProgress, 0.1, 0.5) : 0
  const loadMomentT = index > 3 ? 1 : index === 3 ? reveal(sceneProgress, 0.08, 0.55) : 0
  const maT = index >= 4 ? reveal(sceneProgress, 0.08, 0.6) : 0

  const loadOpacity = focus === 'load' ? 1 : 0.68
  const reactionOpacity = focus === 'reaction' ? 1 : 0.75

  const loadArc = `M ${momentCx - loadArcR} ${beamY} A ${loadArcR} ${loadArcR} 0 1 1 ${momentCx + loadArcR} ${beamY}`
  const loadArrow = `M ${momentCx + loadArcR - 5} ${beamY - 8} L ${momentCx + loadArcR} ${beamY} L ${momentCx + loadArcR + 5} ${beamY - 8}`
  const reactionArc = `M ${momentCx + reactionArcR} ${beamY} A ${reactionArcR} ${reactionArcR} 0 1 0 ${momentCx - reactionArcR} ${beamY}`
  const reactionArrow = `M ${momentCx - reactionArcR - 5} ${beamY - 8} L ${momentCx - reactionArcR} ${beamY} L ${momentCx - reactionArcR + 5} ${beamY - 8}`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Wspornik utwierdzony w punkcie A o długości 2,5 m, obciążony równomiernie 3 kN/m i siłą 8 kN na swobodnym końcu; animacja reakcji R_Ay i momentu M_A"
        >
          <line x1={x0} y1={beamY} x2={x1} y2={beamY} stroke={BEAM} strokeWidth={5} strokeLinecap="round" />

          <g stroke={SUPPORT} fill={SUPPORT}>
            <line x1={x0} y1={70} x2={x0} y2={190} strokeWidth={3.5} strokeLinecap="round" />
            {Array.from({ length: 9 }, (_, i) => {
              const y = 78 + i * 14
              return <line key={i} x1={x0} y1={y} x2={x0 - 12} y2={y - 10} strokeWidth={1.4} />
            })}
            <text x={x0 - 22} y={beamY + 30} textAnchor="middle" fontSize={10} stroke="none">
              A
            </text>
          </g>

          <g stroke={DISTRIBUTED} fill={DISTRIBUTED} opacity={loadOpacity}>
            <line x1={x0} y1={distributedTop} x2={x1} y2={distributedTop} strokeWidth={2} />
            {arrows.map((x, i) => (
              <g key={i}>
                <line x1={x} y1={distributedTop} x2={x} y2={beamY - 6} strokeWidth={1.4} />
                <path
                  d={`M${x - 3} ${beamY - 12} L${x} ${beamY - 5} L${x + 3} ${beamY - 12}`}
                  fill="none"
                  strokeWidth={1.4}
                />
              </g>
            ))}
            <text x={300} y={70} textAnchor="middle" fontSize={10} stroke="none">
              q = 3 kN/m
            </text>
          </g>

          <g stroke={LOAD} fill={LOAD} opacity={loadOpacity}>
            <line x1={x1} y1={46} x2={x1} y2={beamY - 7} strokeWidth={2.6} />
            <path
              d={`M${x1 - 5} ${beamY - 15} L${x1} ${beamY - 6} L${x1 + 5} ${beamY - 15}`}
              fill="none"
              strokeWidth={2.6}
            />
            <text x={x1} y={36} textAnchor="middle" fontSize={10} stroke="none">
              P = 8 kN
            </text>
          </g>

          {index >= 1 && (
            <motion.g
              stroke="#d84f28"
              fill="#d84f28"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: qT * (focus === 'load' ? 1 : 0.78), y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <line x1={xQ} y1={beamY - 64} x2={xQ} y2={beamY - 8} strokeWidth={2.6} />
              <path
                d={`M${xQ - 5} ${beamY - 17} L${xQ} ${beamY - 7} L${xQ + 5} ${beamY - 17}`}
                fill="none"
                strokeWidth={2.6}
              />
              <line x1={xQ} y1={beamY + 2} x2={xQ} y2={beamY + 14} strokeDasharray="3 3" strokeWidth={1} />
              {index < 4 && (
                <text x={xQ + 18} y={beamY - 72} textAnchor="middle" fontSize={9} stroke="none">
                  Q = 7,5 kN
                </text>
              )}
            </motion.g>
          )}

          {index >= 3 && (
            <g opacity={index >= 4 ? 0.4 : 1}>
              <motion.path
                d={loadArc}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: loadMomentT }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <path
                d={loadArrow}
                fill="none"
                stroke={MOMENT}
                strokeWidth={2.4}
                opacity={Math.max(0, (loadMomentT - 0.7) / 0.3)}
              />
              <text
                x={momentCx + loadArcR + 8}
                y={beamY - 56}
                fontSize={9}
                fill={MOMENT}
                stroke="#fff"
                strokeWidth={2.5}
                paintOrder="stroke"
              >
                M_P + M_Q = 29,375 kN·m
              </text>
            </g>
          )}

          {index >= 4 && (
            <g>
              <motion.path
                d={reactionArc}
                fill="none"
                stroke={REACTION}
                strokeWidth={2.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: maT }}
                transition={{ duration: 0.2, ease: 'linear' }}
              />
              <path
                d={reactionArrow}
                fill="none"
                stroke={REACTION}
                strokeWidth={2.4}
                opacity={Math.max(0, (maT - 0.7) / 0.3)}
              />
              <text
                x={momentCx + reactionArcR + 8}
                y={beamY - 80}
                fontSize={9}
                fill={REACTION}
                stroke="#fff"
                strokeWidth={2.5}
                paintOrder="stroke"
              >
                M_A = 29,375 kN·m
              </text>
              <text
                x={momentCx + reactionArcR + 8}
                y={beamY - 68}
                fontSize={8}
                fill={REACTION}
                stroke="#fff"
                strokeWidth={2.5}
                paintOrder="stroke"
              >
                przeciwnie do obciążeń
              </text>
            </g>
          )}

          {index >= 1 && (
            <motion.g
              stroke={MUTED}
              fill={MUTED}
              initial={{ opacity: 0 }}
              animate={{ opacity: qT }}
              transition={{ duration: 0.35 }}
            >
              <line x1={x0} y1={206} x2={xQ} y2={206} strokeWidth={1.2} />
              <line x1={x0} y1={200} x2={x0} y2={212} strokeWidth={1.2} />
              <line x1={xQ} y1={200} x2={xQ} y2={212} strokeWidth={1.2} />
              <text x={(x0 + xQ) / 2} y={200} textAnchor="middle" fontSize={10} stroke="none">
                x_Q = 1,25 m
              </text>
            </motion.g>
          )}

          {index >= 2 && (
            <motion.g
              stroke={REACTION}
              fill={REACTION}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: raT * reactionOpacity, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <line x1={raX} y1={beamY + 42} x2={raX} y2={beamY + 8} strokeWidth={2.4} />
              <path
                d={`M${raX - 5} ${beamY + 17} L${raX} ${beamY + 6} L${raX + 5} ${beamY + 17}`}
                fill="none"
                strokeWidth={2.4}
              />
              <text x={raX + 8} y={beamY + 58} fontSize={9} stroke="none">
                R_Ay = 15,5 kN
              </text>
            </motion.g>
          )}

          <g stroke={MUTED} fill={MUTED}>
            <line x1={x0} y1={250} x2={x1} y2={250} strokeWidth={1.2} />
            <line x1={x0} y1={244} x2={x0} y2={256} strokeWidth={1.2} />
            <line x1={x1} y1={244} x2={x1} y2={256} strokeWidth={1.2} />
            <text x={(x0 + x1) / 2} y={268} textAnchor="middle" fontSize={10} stroke="none">
              L = 2,5 m
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
