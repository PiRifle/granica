import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BEAM = '#556273'
const LOAD = '#ff6b45'
const RESULTANT = '#d84f28'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

const xA = 70
const xB = 420
const beamY = 158
const span = xB - xA
const maxLoadHeight = 82

export function Ideal3InverseAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'given'
  const progress = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const x = (value: number) => xA + (value / 6) * span
  const xP = x(4)
  const solved = metric === 'result'
  const inverse = metric === 'inverse'
  const loadScale = inverse ? 0.18 + 0.82 * progress : 1
  const intensityY = (ratio: number) => beamY - 8 - ratio * maxLoadHeight * loadScale
  const loadOpacity = metric === 'given' ? 0.45 : inverse ? 0.55 + 0.45 * progress : 1
  const dataOpacity = metric === 'given' ? progress : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 285"
          role="img"
          aria-label="Belka swobodnie podparta o długości L = 6 m z obciążeniem trójkątnym o nieznanym maksimum q₀; znana wypadkowa P = 27 kN działa 4 m od końca zerowego"
        >
          <line x1={x(0)} y1={beamY} x2={x(6)} y2={beamY} stroke={BEAM} strokeWidth={5} strokeLinecap="round" />

          <g stroke={LOAD} fill={LOAD} opacity={loadOpacity}>
            <path
              d={`M${x(0)} ${beamY} L${x(0)} ${intensityY(0)} L${x(6)} ${intensityY(1)} L${x(6)} ${beamY} Z`}
              fillOpacity={solved ? 0.14 : 0.06}
              stroke="none"
            />
            {Array.from({ length: 13 }, (_, index) => {
              const ratio = index / 12
              const px = x(ratio * 6)
              const top = intensityY(ratio)
              return (
                <g key={index}>
                  {beamY - 5 - top > 1 && <line x1={px} y1={top + 2} x2={px} y2={beamY - 5} strokeWidth={1.4} />}
                  {beamY - 5 - top > 5 && (
                    <path
                      d={`M${px - 3} ${beamY - 11} L${px} ${beamY - 5} L${px + 3} ${beamY - 11}`}
                      fill="none"
                      strokeWidth={1.4}
                    />
                  )}
                </g>
              )
            })}
            <line
              x1={x(0)}
              y1={intensityY(0)}
              x2={x(6)}
              y2={intensityY(1)}
              strokeWidth={2}
              strokeDasharray={metric === 'given' ? '5 4' : undefined}
            />
            {solved ? (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                x={x(6)}
                y={intensityY(1) - 14}
                textAnchor="end"
                fontSize={11}
                fontWeight={600}
                stroke="none"
              >
                q₀ = 9 kN/m
              </motion.text>
            ) : (
              <text x={x(6)} y={intensityY(1) - 14} textAnchor="end" fontSize={11} fontWeight={600} stroke="none">
                q₀ = ?
              </text>
            )}
          </g>

          <motion.g
            initial={false}
            animate={{ opacity: dataOpacity }}
            transition={{ duration: 0.25, ease: 'linear' }}
            stroke={RESULTANT}
            fill={RESULTANT}
          >
            <line x1={xP} y1={beamY - 72} x2={xP} y2={beamY - 8} strokeWidth={2.6} />
            <path
              d={`M${xP - 5} ${beamY - 18} L${xP} ${beamY - 8} L${xP + 5} ${beamY - 18}`}
              fill="none"
              strokeWidth={2.6}
            />
            <line x1={xP} y1={beamY + 2} x2={xP} y2={beamY + 14} strokeDasharray="3 3" strokeWidth={1} />
            <text x={xP + 9} y={beamY - 78} fontSize={10} stroke="none">
              P = 27 kN
            </text>
          </motion.g>

          <g stroke={SUPPORT} fill={SUPPORT}>
            <path d={`M${xA - 11} ${beamY + 18} L${xA} ${beamY + 2} L${xA + 11} ${beamY + 18} Z`} />
            <path d={`M${xB - 11} ${beamY + 18} L${xB} ${beamY + 2} L${xB + 11} ${beamY + 18} Z`} />
            <text x={xA} y={beamY + 34} textAnchor="middle" fontSize={11} stroke="none">
              A
            </text>
            <text x={xB} y={beamY + 34} textAnchor="middle" fontSize={11} stroke="none">
              B
            </text>
          </g>

          <motion.g
            initial={false}
            animate={{ opacity: dataOpacity }}
            transition={{ duration: 0.25, ease: 'linear' }}
            stroke={MUTED}
            fill={MUTED}
          >
            <line x1={xA} y1={beamY + 62} x2={xP} y2={beamY + 62} strokeWidth={1.2} />
            <line x1={xA} y1={beamY + 55} x2={xA} y2={beamY + 69} strokeWidth={1.2} />
            <line x1={xP} y1={beamY + 55} x2={xP} y2={beamY + 69} strokeWidth={1.2} />
            <text x={(xA + xP) / 2} y={beamY + 76} textAnchor="middle" fontSize={10} stroke="none">
              x_P = 4 m
            </text>
          </motion.g>

          <g stroke={MUTED} fill={MUTED}>
            <line x1={xA} y1={beamY + 92} x2={xB} y2={beamY + 92} strokeWidth={1} />
            <line x1={xA} y1={beamY + 86} x2={xA} y2={beamY + 98} strokeWidth={1} />
            <line x1={xB} y1={beamY + 86} x2={xB} y2={beamY + 98} strokeWidth={1} />
            <text x={(xA + xB) / 2} y={beamY + 110} textAnchor="middle" fontSize={10} stroke="none">
              L = 6 m
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
