import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const AXIS = '#9aa5b1'
const INK = '#17202a'
const MUTED = '#87929d'
const ARM = '#27835a'
const CENTROID = '#27835a'
const DIM = '#87929d'

const OX = 70
const OY = 300
const SCALE = 27

const sx = (x: number) => OX + x * SCALE
const sy = (y: number) => OY - y * SCALE

interface Part {
  id: number
  x0: number
  x1: number
  y0: number
  y1: number
  cx: number
  cy: number
  area: number
  color: string
}

const PARTS: Part[] = [
  { id: 1, x0: 0, x1: 12, y0: 0, y1: 2, cx: 6, cy: 1, area: 24, color: '#4f6df5' },
  { id: 2, x0: 0, x1: 2, y0: 2, y1: 8, cx: 1, cy: 5, area: 12, color: '#5bb98c' },
  { id: 3, x0: 10, x1: 12, y0: 2, y1: 4, cx: 11, cy: 3, area: 4, color: '#a970dd' },
  { id: 4, x0: 0, x1: 8, y0: 8, y1: 10, cx: 4, cy: 9, area: 16, color: '#d8a13b' },
  { id: 5, x0: 6, x1: 8, y0: 6, y1: 8, cx: 7, cy: 7, area: 4, color: '#ff8a5c' },
]

const CENTROID_X = 292 / 60
const CENTROID_Y = 268 / 60
const centroidPoint = { x: sx(CENTROID_X), y: sy(CENTROID_Y) }

function areaLabelPosition(part: Part) {
  switch (part.id) {
    case 1:
      return { dx: 0, dy: 4, anchor: 'middle' as const }
    case 2:
      return { dx: 11, dy: 4, anchor: 'start' as const }
    case 3:
      return { dx: -10, dy: 4, anchor: 'end' as const }
    case 4:
      return { dx: 0, dy: -9, anchor: 'middle' as const }
    default:
      return { dx: 0, dy: -9, anchor: 'middle' as const }
  }
}

export function CompositeAreaAnimation({ index }: SolutionAnimationProps) {
  const showAreas = index >= 1
  const showArmsX = index === 2
  const showArmsY = index === 3
  const showCentroid = index >= 4
  const showCheck = index >= 5
  const dimParts = showArmsX || showArmsY

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid figury złożonej z pięciu prostokątów">
          <title>Metoda części składowych</title>
          <desc>Pięć prostokątów, ich pola, ramiona momentów oraz wyznaczony centroid.</desc>

          <line x1="42" y1={OY} x2="430" y2={OY} stroke={AXIS} strokeWidth="1.4" />
          <line x1={OX} y1="16" x2={OX} y2="315" stroke={AXIS} strokeWidth="1.4" />
          <text x="418" y={OY - 8} fontSize="11" fill={INK}>
            x
          </text>
          <text x={OX + 8} y="28" fontSize="11" fill={INK}>
            y
          </text>
          {[2, 4, 6, 8, 10, 12].map((tick) => (
            <g key={`x-${tick}`}>
              <line x1={sx(tick)} y1={OY - 4} x2={sx(tick)} y2={OY + 4} stroke={AXIS} strokeWidth="1" />
              <text x={sx(tick)} y={OY + 16} textAnchor="middle" fontSize="8.5" fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}
          {[2, 4, 6, 8, 10].map((tick) => (
            <g key={`y-${tick}`}>
              <line x1={OX - 4} y1={sy(tick)} x2={OX + 4} y2={sy(tick)} stroke={AXIS} strokeWidth="1" />
              <text x={OX - 8} y={sy(tick) + 3} textAnchor="end" fontSize="8.5" fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}

          {PARTS.map((part) => {
            const x = sx(part.x0)
            const y = sy(part.y1)
            const width = (part.x1 - part.x0) * SCALE
            const height = (part.y1 - part.y0) * SCALE
            return (
              <motion.rect
                key={part.id}
                x={x}
                y={y}
                initial={{ width: 0, height: 0 }}
                animate={{ width, height }}
                transition={{ duration: 0.35, delay: part.id * 0.04 }}
                rx="2"
                fill={dimParts ? '#e6eaf0' : part.color}
                fillOpacity={dimParts ? 0.9 : 0.18}
                stroke={dimParts ? '#b9c1ca' : part.color}
                strokeWidth={2}
              />
            )
          })}

          {PARTS.map((part) => {
            const point = { x: sx(part.cx), y: sy(part.cy) }
            const label = areaLabelPosition(part)
            return (
              <g key={`label-${part.id}`}>
                <text x={point.x} y={point.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={part.color}>
                  {part.id}
                </text>
                {showAreas && (
                  <text
                    x={point.x + label.dx}
                    y={point.y + label.dy}
                    textAnchor={label.anchor}
                    fontSize="9.5"
                    fill={dimParts ? MUTED : part.color}
                  >
                    A{part.id} = {part.area}
                  </text>
                )}
              </g>
            )
          })}

          {showArmsX &&
            PARTS.map((part) => (
              <g key={`arm-x-${part.id}`} stroke={ARM} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8">
                <line x1={OX} y1={sy(part.cy)} x2={sx(part.cx)} y2={sy(part.cy)} />
                <text
                  x={sx(part.cx / 2)}
                  y={sy(part.cy) - 5}
                  textAnchor="middle"
                  fontSize="8.5"
                  stroke="none"
                  fill={ARM}
                >
                  x{part.id} = {part.cx}
                </text>
              </g>
            ))}

          {showArmsY &&
            PARTS.map((part) => (
              <g key={`arm-y-${part.id}`} stroke={ARM} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8">
                <line x1={sx(part.cx)} y1={OY} x2={sx(part.cx)} y2={sy(part.cy)} />
                <text x={sx(part.cx) + 5} y={sy(part.cy / 2)} fontSize="8.5" stroke="none" fill={ARM}>
                  y{part.id} = {part.cy}
                </text>
              </g>
            ))}

          {showCheck && (
            <g fill="none" stroke={DIM} strokeWidth="1.3" strokeDasharray="6 4">
              <rect x={sx(0)} y={sy(10)} width={12 * SCALE} height={10 * SCALE} />
              <text x={sx(6)} y={316} textAnchor="middle" fontSize="9" stroke="none" fill={DIM}>
                12 cm
              </text>
              <text
                x={sx(12) + 16}
                y={sy(5)}
                textAnchor="middle"
                fontSize="9"
                stroke="none"
                fill={DIM}
                transform={`rotate(-90 ${sx(12) + 16} ${sy(5)})`}
              >
                10 cm
              </text>
            </g>
          )}

          {showCentroid && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <line
                x1={centroidPoint.x}
                y1={OY}
                x2={centroidPoint.x}
                y2={sy(10)}
                stroke={CENTROID}
                strokeWidth="1.3"
                strokeDasharray="5 4"
              />
              <line
                x1={OX}
                y1={centroidPoint.y}
                x2={sx(12)}
                y2={centroidPoint.y}
                stroke={CENTROID}
                strokeWidth="1.3"
                strokeDasharray="5 4"
              />
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
              <text x={centroidPoint.x + 18} y={centroidPoint.y - 7} fontSize="11" fontWeight="700" fill={CENTROID}>
                C = (4,87; 4,47) cm
              </text>
              <text x={centroidPoint.x + 18} y={centroidPoint.y + 8} fontSize="9" fill={CENTROID}>
                x_C = Q_y / A, y_C = Q_x / A
              </text>
            </motion.g>
          )}

          <text x="230" y="326" textAnchor="middle" fontSize="10" fill={INK}>
            {showCheck
              ? 'Centroid leży w obrysie 12 × 10 cm, choć wypada w pustce między częściami'
              : showAreas
                ? 'Wagą jest pole części; otworów tu nie ma, więc wszystkie pola są dodatnie'
                : 'Figura dzieli się na pięć rozłącznych prostokątów'}
          </text>
        </svg>
      </div>
    </div>
  )
}
