import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const AXIS = '#9aa5b1'
const INK = '#17202a'
const MUTED = '#87929d'
const WEIGHT = '#d84f28'
const CENTROID = '#27835a'
const MASS_COLORS = ['#4f6df5', '#ff8a5c', '#d8a13b']

const ORIGIN = { x: 80, y: 270 }
const SCALE = 48
const ARITHMETIC = { x: 2, y: 4 / 3 }
const CENTER = { x: 2.5, y: 2 }

const at = (x: number, y: number) => ({ x: ORIGIN.x + x * SCALE, y: ORIGIN.y - y * SCALE })

const MASSES = [
  { x: 0, y: 0, mass: 2, weight: 19.62, label: 'm₁ = 2 kg', color: MASS_COLORS[0] },
  { x: 3, y: 0, mass: 4, weight: 39.24, label: 'm₂ = 4 kg', color: MASS_COLORS[1] },
  { x: 3, y: 4, mass: 6, weight: 58.86, label: 'm₃ = 6 kg', color: MASS_COLORS[2] },
]

const arithmeticPoint = at(ARITHMETIC.x, ARITHMETIC.y)
const centroidPoint = at(CENTER.x, CENTER.y)

function MassMarker({
  point,
  mass,
  color,
  draw,
}: {
  point: { x: number; y: number }
  mass: number
  color: string
  draw: number
}) {
  const radius = 4.5 + mass * 1.35
  return (
    <g>
      <motion.circle
        cx={point.x}
        cy={point.y}
        r={radius * draw}
        fill={color}
        fillOpacity={0.2}
        stroke={color}
        strokeWidth={2.2}
        initial={false}
      />
      <motion.circle cx={point.x} cy={point.y} r={2.4 * draw} fill={color} initial={false} />
    </g>
  )
}

export function PointMassCentroidAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const draw = Math.min(1, 0.35 + p * 1.2)
  const showWeights = index >= 1
  const showMomentY = index === 2
  const showMomentX = index === 3
  const showCentroid = index >= 4
  const showCheck = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Środek ciężkości trzech mas punktowych">
          <title>Środek ciężkości układu trzech mas</title>
          <desc>Trzy masy w punktach, ich ciężary, ramiona momentów oraz wyznaczony środek ciężkości.</desc>
          <defs>
            <marker
              id="ex-srodek-masy-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
            </marker>
          </defs>

          <line x1="40" y1={ORIGIN.y} x2="430" y2={ORIGIN.y} stroke={AXIS} strokeWidth="1.5" />
          <line x1={ORIGIN.x} y1="30" x2={ORIGIN.x} y2="315" stroke={AXIS} strokeWidth="1.5" />
          <text x="418" y={ORIGIN.y - 8} fontSize="12" fill={INK}>
            x
          </text>
          <text x={ORIGIN.x + 8} y="45" fontSize="12" fill={INK}>
            y
          </text>
          <text x={ORIGIN.x - 14} y={ORIGIN.y + 18} fontSize="12" fill={INK}>
            O
          </text>
          {[1, 2, 3].map((tick) => (
            <g key={`tick-${tick}`} stroke={AXIS} strokeWidth="1">
              <line x1={at(tick, 0).x} y1={ORIGIN.y - 4} x2={at(tick, 0).x} y2={ORIGIN.y + 4} />
              <text x={at(tick, 0).x} y={ORIGIN.y + 17} textAnchor="middle" fontSize="9.5" fill={MUTED}>
                {tick} m
              </text>
            </g>
          ))}

          {showMomentY && (
            <g stroke={MASS_COLORS[2]} strokeWidth="1.3" strokeDasharray="5 4" fill="none" opacity="0.75">
              <line x1={ORIGIN.x} y1={at(0, 4).y} x2={at(3, 4).x} y2={at(3, 4).y} />
              <line x1={ORIGIN.x} y1={ORIGIN.y} x2={at(3, 0).x} y2={ORIGIN.y} />
            </g>
          )}
          {showMomentX && (
            <g stroke={MASS_COLORS[2]} strokeWidth="1.3" strokeDasharray="5 4" fill="none" opacity="0.75">
              <line x1={at(3, 4).x} y1={ORIGIN.y} x2={at(3, 4).x} y2={at(3, 4).y} />
            </g>
          )}

          {MASSES.map((item, itemIndex) => {
            const point = at(item.x, item.y)
            const arrowLength = 24 + item.weight * 0.58
            return (
              <g key={item.label}>
                <MassMarker point={point} mass={item.mass} color={item.color} draw={draw} />
                <text
                  x={point.x + (itemIndex === 2 ? 20 : 12)}
                  y={point.y - 8}
                  fontSize="11"
                  fontWeight="600"
                  fill={item.color}
                >
                  {item.label}
                </text>
                {showWeights && (
                  <>
                    <motion.line
                      x1={point.x}
                      y1={point.y + 8}
                      x2={point.x}
                      y2={point.y + 8 + arrowLength * draw}
                      stroke={WEIGHT}
                      strokeWidth="2.4"
                      markerEnd="url(#ex-srodek-masy-arrow)"
                      initial={false}
                    />
                    <text x={point.x + 8} y={point.y + 8 + arrowLength * 0.55} fontSize="10" fill={WEIGHT}>
                      G{itemIndex + 1} = {item.weight.toFixed(2).replace('.', ',')} N
                    </text>
                  </>
                )}
              </g>
            )
          })}

          {showMomentY && (
            <>
              <text x={at(1.5, 0).x} y={ORIGIN.y - 7} textAnchor="middle" fontSize="10" fill={MASS_COLORS[2]}>
                x₂ = x₃ = 3 m
              </text>
              <text x={at(1.5, 4).x} y={at(3, 4).y - 7} textAnchor="middle" fontSize="10" fill={MASS_COLORS[2]}>
                Q_y = 294,30 N·m
              </text>
            </>
          )}
          {showMomentX && (
            <text
              x={at(3, 4).x - 8}
              y={at(3, 2).y}
              textAnchor="end"
              fontSize="10"
              fill={MASS_COLORS[2]}
              transform={`rotate(-90 ${at(3, 4).x - 8} ${at(3, 2).y})`}
            >
              y₃ = 4 m
            </text>
          )}

          {showCheck && (
            <g>
              <polygon
                points={`${at(0, 0).x},${at(0, 0).y} ${at(3, 0).x},${at(3, 0).y} ${at(3, 4).x},${at(3, 4).y}`}
                fill="none"
                stroke={MUTED}
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              <circle
                cx={arithmeticPoint.x}
                cy={arithmeticPoint.y}
                r="5"
                fill="none"
                stroke={MUTED}
                strokeWidth="1.6"
              />
              <text x={arithmeticPoint.x + 9} y={arithmeticPoint.y + 4} fontSize="9.5" fill={MUTED}>
                średnia arytmetyczna
              </text>
              <line
                x1={arithmeticPoint.x}
                y1={arithmeticPoint.y}
                x2={centroidPoint.x}
                y2={centroidPoint.y}
                stroke={CENTROID}
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />
            </g>
          )}

          {showCentroid && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line
                x1={centroidPoint.x - 13}
                y1={centroidPoint.y}
                x2={centroidPoint.x + 13}
                y2={centroidPoint.y}
                stroke={CENTROID}
                strokeWidth="1.6"
              />
              <line
                x1={centroidPoint.x}
                y1={centroidPoint.y - 13}
                x2={centroidPoint.x}
                y2={centroidPoint.y + 13}
                stroke={CENTROID}
                strokeWidth="1.6"
              />
              <motion.circle
                cx={centroidPoint.x}
                cy={centroidPoint.y}
                r="5.5"
                fill="#fff"
                stroke={CENTROID}
                strokeWidth="2.4"
                animate={{ scale: playing ? [1, 1.25, 1] : 1 }}
                transition={{ duration: 1.2, repeat: playing ? Infinity : 0 }}
                style={{ transformOrigin: `${centroidPoint.x}px ${centroidPoint.y}px` }}
              />
              <text x={centroidPoint.x + 38} y={centroidPoint.y - 9} fontSize="12" fontWeight="700" fill={CENTROID}>
                C = (2,50; 2,00) m
              </text>
              <text x={centroidPoint.x + 38} y={centroidPoint.y + 7} fontSize="9.5" fill={CENTROID}>
                środek ciężkości
              </text>
            </motion.g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="11" fill={INK}>
            {showCentroid
              ? 'Środek ciężkości to średnia ważona położeń — wagą jest ciężar części'
              : 'Momenty względem osi liczymy jako ciężar razy ramię'}
          </text>
        </svg>
      </div>
    </div>
  )
}
