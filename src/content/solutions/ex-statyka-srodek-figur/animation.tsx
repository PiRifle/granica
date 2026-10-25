import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const AXIS = '#9aa5b1'
const INK = '#17202a'
const MUTED = '#87929d'
const CURVE = '#ff6b45'
const AREA = '#ff8a5c'
const STRIP = '#a970dd'
const CENTROID = '#27835a'

const X0 = 120
const BASE = 305
const SCALE = 3
const A = 60
const H = 90

const f = (x: number) => 0.025 * x * x
const sx = (x: number) => X0 + x * SCALE
const sy = (y: number) => BASE - y * SCALE

const curvePath = `M ${sx(0)} ${sy(0)} ${Array.from({ length: 61 }, (_, step) => {
  const x = (step / 60) * A
  return `L ${sx(x)} ${sy(f(x))}`
}).join(' ')}`
const areaPath = `${curvePath} L ${sx(A)} ${sy(0)} Z`

const stripPath = (x0: number, x1: number) =>
  `M ${sx(x0)} ${sy(0)} L ${sx(x0)} ${sy(f(x0))} L ${sx(x1)} ${sy(f(x1))} L ${sx(x1)} ${sy(0)} Z`

const strips = Array.from({ length: 12 }, (_, step) => ({
  x0: step * 5,
  x1: (step + 1) * 5,
}))

const centroidPoint = { x: sx(45), y: sy(27) }

export function ParabolicSpandrelAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const curveDraw = Math.min(1, 0.2 + p * 1.4)
  const showStrips = index >= 1
  const showArea = index >= 2
  const showCentroidX = index >= 3
  const showCentroidY = index >= 4
  const showCentroid = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid figury ograniczonej parabolą">
          <title>Centroid spandrela parabolicznego</title>
          <desc>Figura pod parabolą, pionowe paski, pole, momenty statyczne i centroid.</desc>

          <line x1="85" y1={BASE} x2="420" y2={BASE} stroke={AXIS} strokeWidth="1.4" />
          <line x1={X0} y1="20" x2={X0} y2="322" stroke={AXIS} strokeWidth="1.4" />
          <text x="408" y={BASE - 8} fontSize="11" fill={INK}>
            x
          </text>
          <text x={X0 + 8} y="32" fontSize="11" fill={INK}>
            y
          </text>
          {[0, 30, 60].map((tick) => (
            <g key={`x-${tick}`}>
              <line x1={sx(tick)} y1={BASE - 4} x2={sx(tick)} y2={BASE + 4} stroke={AXIS} strokeWidth="1" />
              <text x={sx(tick)} y={BASE + 17} textAnchor="middle" fontSize="9.5" fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}
          {[30, 60, 90].map((tick) => (
            <g key={`y-${tick}`}>
              <line x1={X0 - 4} y1={sy(tick)} x2={X0 + 4} y2={sy(tick)} stroke={AXIS} strokeWidth="1" />
              <text x={X0 - 8} y={sy(tick) + 3} textAnchor="end" fontSize="9.5" fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}

          {showArea && (
            <motion.path
              d={areaPath}
              fill={AREA}
              fillOpacity={0.24}
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {showStrips &&
            strips.map((strip, step) => (
              <motion.path
                key={`strip-${step}`}
                d={stripPath(strip.x0, strip.x1)}
                fill={STRIP}
                fillOpacity={0.12 + (step % 2) * 0.06}
                stroke={STRIP}
                strokeWidth="0.9"
                strokeOpacity="0.65"
                initial={{ opacity: 0 }}
                animate={{ opacity: Math.min(1, p * 1.6) }}
                transition={{ duration: 0.2, delay: step * 0.02 }}
              />
            ))}

          <motion.path
            d={curvePath}
            fill="none"
            stroke={CURVE}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: curveDraw }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <text x={sx(52)} y={sy(f(55)) - 12} fontSize="10.5" fill={CURVE}>
            y = 0,025x²
          </text>

          {index === 0 && (
            <g>
              <path d={stripPath(30, 36)} fill={STRIP} fillOpacity={0.25} stroke={STRIP} strokeWidth="1.3" />
              <circle cx={sx(33)} cy={sy(f(33) / 2)} r="3.4" fill="#fff" stroke={STRIP} strokeWidth="1.8" />
              <text x={sx(37)} y={sy(f(33) / 2) + 4} fontSize="9.5" fill={STRIP}>
                środek paska (x; y/2)
              </text>
              <text x={sx(37)} y={sy(f(33) / 2) + 18} fontSize="9.5" fill={STRIP}>
                dA = y dx
              </text>
            </g>
          )}

          {showArea && (
            <text x={sx(29)} y={sy(68)} textAnchor="middle" fontSize="11" fontWeight="700" fill={AREA}>
              A = 1800 mm²
            </text>
          )}

          <g stroke={MUTED} fill={MUTED}>
            <line x1={sx(0)} y1={BASE + 28} x2={sx(A)} y2={BASE + 28} strokeWidth="1" />
            <line x1={sx(0)} y1={BASE + 24} x2={sx(0)} y2={BASE + 32} strokeWidth="1" />
            <line x1={sx(A)} y1={BASE + 24} x2={sx(A)} y2={BASE + 32} strokeWidth="1" />
            <text x={(sx(0) + sx(A)) / 2} y={BASE + 24} textAnchor="middle" fontSize="9" stroke="none">
              a = 60 mm
            </text>
            <line x1={sx(A) + 20} y1={sy(0)} x2={sx(A) + 20} y2={sy(H)} strokeWidth="1" />
            <line x1={sx(A) + 16} y1={sy(0)} x2={sx(A) + 24} y2={sy(0)} strokeWidth="1" />
            <line x1={sx(A) + 16} y1={sy(H)} x2={sx(A) + 24} y2={sy(H)} strokeWidth="1" />
            <text
              x={sx(A) + 14}
              y={(sy(0) + sy(H)) / 2}
              textAnchor="middle"
              fontSize="9"
              stroke="none"
              transform={`rotate(-90 ${sx(A) + 14} ${(sy(0) + sy(H)) / 2})`}
            >
              h = 90 mm
            </text>
          </g>

          {showCentroidX && (
            <g>
              <line
                x1={centroidPoint.x}
                y1={BASE}
                x2={centroidPoint.x}
                y2={sy(H) - 8}
                stroke={CENTROID}
                strokeWidth="1.3"
                strokeDasharray="5 4"
              />
              <line x1={sx(0)} y1={BASE + 46} x2={centroidPoint.x} y2={BASE + 46} stroke={CENTROID} strokeWidth="1.4" />
              <text x={centroidPoint.x + 6} y={BASE + 42} fontSize="10" fill={CENTROID}>
                x_C = 45 mm = 3a/4
              </text>
            </g>
          )}

          {showCentroidY && (
            <g>
              <line
                x1={X0}
                y1={centroidPoint.y}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={CENTROID}
                strokeWidth="1.4"
              />
              <text x={X0 + 8} y={centroidPoint.y - 7} fontSize="10" fill={CENTROID}>
                y_C = 27 mm = 3h/10
              </text>
            </g>
          )}

          {showCentroid && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <circle cx={centroidPoint.x} cy={centroidPoint.y} r="6" fill="#fff" stroke={CENTROID} strokeWidth="2.4" />
              <line
                x1={centroidPoint.x - 13}
                y1={centroidPoint.y}
                x2={centroidPoint.x + 13}
                y2={centroidPoint.y}
                stroke={CENTROID}
                strokeWidth="1.4"
              />
              <line
                x1={centroidPoint.x}
                y1={centroidPoint.y - 13}
                x2={centroidPoint.x}
                y2={centroidPoint.y + 13}
                stroke={CENTROID}
                strokeWidth="1.4"
              />
              <text x={centroidPoint.x + 18} y={centroidPoint.y + 4} fontSize="12" fontWeight="700" fill={CENTROID}>
                C = (45; 27) mm
              </text>
              <text x="230" y="330" textAnchor="middle" fontSize="10.5" fill={INK}>
                x_C = Q_y / A = 45 mm, y_C = Q_x / A = 27 mm
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
