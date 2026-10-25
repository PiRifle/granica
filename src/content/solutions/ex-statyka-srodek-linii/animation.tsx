import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const AXIS = '#9aa5b1'
const INK = '#17202a'
const MUTED = '#87929d'
const VERTICAL = '#4f6df5'
const HORIZONTAL = '#3f9c74'
const DIAGONAL = '#ff8a5c'
const ARM = '#a970dd'
const CENTROID = '#27835a'

const ORIGIN = { x: 110, y: 300 }
const SCALE = 48
const at = (x: number, y: number) => ({ x: ORIGIN.x + x * SCALE, y: ORIGIN.y - y * SCALE })

const NODES: Record<string, { x: number; y: number; label: string }> = {
  A: { x: 0, y: 0, label: 'A' },
  B: { x: 4, y: 0, label: 'B' },
  C: { x: 0, y: 2.5, label: 'C' },
  D: { x: 0, y: 5, label: 'D' },
  E: { x: 4, y: 2.5, label: 'E' },
}

const RODS = [
  { id: 'AC', from: 'A', to: 'C', length: 2.5, group: 0, mid: { x: 0, y: 1.25 }, label: '2,5' },
  { id: 'CD', from: 'C', to: 'D', length: 2.5, group: 0, mid: { x: 0, y: 3.75 }, label: '2,5' },
  { id: 'CB', from: 'C', to: 'B', length: 4.72, group: 2, mid: { x: 2, y: 1.25 }, label: '4,72' },
  { id: 'BE', from: 'B', to: 'E', length: 2.5, group: 0, mid: { x: 4, y: 1.25 }, label: '2,5' },
  { id: 'CE', from: 'C', to: 'E', length: 4, group: 1, mid: { x: 2, y: 2.5 }, label: '4,00' },
  { id: 'DE', from: 'D', to: 'E', length: 4.72, group: 2, mid: { x: 2, y: 3.75 }, label: '4,72' },
]

const GROUP_COLORS = [VERTICAL, HORIZONTAL, DIAGONAL]
const CENTROID_WORLD = { x: 1.76, y: 2.35 }
const centroidPoint = at(CENTROID_WORLD.x, CENTROID_WORLD.y)

function nodePoint(id: string) {
  const node = NODES[id]
  return at(node.x, node.y)
}

function nodeLabelOffset(id: string) {
  switch (id) {
    case 'A':
      return { x: -14, y: 18 }
    case 'B':
      return { x: 10, y: 18 }
    case 'C':
      return { x: -14, y: -6 }
    case 'D':
      return { x: -14, y: -6 }
    default:
      return { x: 10, y: -6 }
  }
}

export function TrussCentroidAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const rodDraw = Math.min(1, 0.25 + p * 1.3)
  const showLengths = index >= 1
  const showTotal = index >= 2
  const showMomentY = index === 3
  const showMomentX = index === 4
  const showCentroid = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Środek ciężkości kratownicy z sześciu prętów">
          <title>Centroid kratownicy</title>
          <desc>Kratownica o pięciu węzłach i sześciu prętach, ich długości, momenty statyczne i centroid.</desc>

          <line x1="55" y1={ORIGIN.y} x2="400" y2={ORIGIN.y} stroke={AXIS} strokeWidth="1.3" />
          <line x1={ORIGIN.x} y1="25" x2={ORIGIN.x} y2="320" stroke={AXIS} strokeWidth="1.3" />
          <text x="388" y={ORIGIN.y - 8} fontSize="11" fill={INK}>
            x
          </text>
          <text x={ORIGIN.x + 8} y="38" fontSize="11" fill={INK}>
            y
          </text>

          {RODS.map((rod) => {
            const a = nodePoint(rod.from)
            const b = nodePoint(rod.to)
            return (
              <motion.path
                key={rod.id}
                d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                fill="none"
                stroke={showMomentY || showMomentX ? '#b9c1ca' : GROUP_COLORS[rod.group]}
                strokeWidth={showCentroid ? 2.2 : 3.4}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: rodDraw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
            )
          })}

          {showLengths &&
            RODS.map((rod) => {
              const mid = at(rod.mid.x, rod.mid.y)
              return (
                <g key={`mid-${rod.id}`}>
                  <circle
                    cx={mid.x}
                    cy={mid.y}
                    r="3.2"
                    fill="#fff"
                    stroke={GROUP_COLORS[rod.group]}
                    strokeWidth="1.8"
                  />
                  <text
                    x={mid.x + (rod.mid.x === 4 ? 9 : rod.mid.x === 0 ? -9 : 7)}
                    y={mid.y + (rod.id === 'CE' ? -7 : 12)}
                    textAnchor={rod.mid.x === 0 ? 'end' : rod.mid.x === 4 ? 'start' : 'middle'}
                    fontSize="9"
                    fontWeight="600"
                    fill={GROUP_COLORS[rod.group]}
                  >
                    {rod.label} m
                  </text>
                </g>
              )
            })}

          {Object.entries(NODES).map(([id, node]) => {
            const point = at(node.x, node.y)
            const offset = nodeLabelOffset(id)
            return (
              <g key={id}>
                <circle cx={point.x} cy={point.y} r="4.2" fill="#fff" stroke={INK} strokeWidth="1.8" />
                <text x={point.x + offset.x} y={point.y + offset.y} fontSize="12" fontWeight="600" fill={INK}>
                  {node.label}
                </text>
              </g>
            )
          })}

          {showMomentY && (
            <g stroke={ARM} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.8">
              {[
                { x: 2, y: 1.25 },
                { x: 4, y: 1.25 },
                { x: 2, y: 2.5 },
                { x: 2, y: 3.75 },
              ].map((arm) => (
                <line
                  key={`arm-y-${arm.x}-${arm.y}`}
                  x1={ORIGIN.x}
                  y1={at(arm.x, arm.y).y}
                  x2={at(arm.x, arm.y).x}
                  y2={at(arm.x, arm.y).y}
                />
              ))}
              <text x={at(1, 2.5).x} y={at(2, 2.5).y + 14} textAnchor="middle" fontSize="9.5" stroke="none" fill={ARM}>
                x = 2 m
              </text>
              <text
                x={at(4, 1.25).x - 4}
                y={at(4, 1.25).y - 7}
                textAnchor="end"
                fontSize="9.5"
                stroke="none"
                fill={ARM}
              >
                x = 4 m
              </text>
              <text x="20" y={ORIGIN.y - 10} fontSize="10" stroke="none" fill={ARM}>
                Q_y = Σ x·L = 36,88 m²
              </text>
            </g>
          )}

          {showMomentX && (
            <g stroke={ARM} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.8">
              {[
                { x: 0, y: 1.25 },
                { x: 2, y: 1.25 },
                { x: 4, y: 1.25 },
                { x: 0, y: 3.75 },
                { x: 2, y: 3.75 },
                { x: 2, y: 2.5 },
              ].map((arm) => (
                <line
                  key={`arm-x-${arm.x}-${arm.y}`}
                  x1={at(arm.x, arm.y).x}
                  y1={ORIGIN.y}
                  x2={at(arm.x, arm.y).x}
                  y2={at(arm.x, arm.y).y}
                />
              ))}
              <text x={at(2, 3.75).x + 6} y={at(2, 3.75).y + 4} fontSize="9.5" stroke="none" fill={ARM}>
                y = 3,75 m
              </text>
              <text x={at(2, 2.5).x + 6} y={at(2, 2.5).y + 4} fontSize="9.5" stroke="none" fill={ARM}>
                y = 2,5 m
              </text>
              <text x="20" y={ORIGIN.y - 10} fontSize="10" stroke="none" fill={ARM}>
                Q_x = Σ y·L = 49,225 m²
              </text>
            </g>
          )}

          {showTotal && (
            <g>
              <text x="230" y="326" textAnchor="middle" fontSize="10" fill={MUTED}>
                Σ L = 2,5 + 2,5 + 4,72 + 2,5 + 4,00 + 4,72 = 20,94 m
              </text>
            </g>
          )}

          {showCentroid && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <circle cx={centroidPoint.x} cy={centroidPoint.y} r="7" fill="#fff" stroke={CENTROID} strokeWidth="2.4" />
              <line
                x1={centroidPoint.x - 14}
                y1={centroidPoint.y}
                x2={centroidPoint.x + 14}
                y2={centroidPoint.y}
                stroke={CENTROID}
                strokeWidth="1.4"
              />
              <line
                x1={centroidPoint.x}
                y1={centroidPoint.y - 14}
                x2={centroidPoint.x}
                y2={centroidPoint.y + 14}
                stroke={CENTROID}
                strokeWidth="1.4"
              />
              <text x={centroidPoint.x + 16} y={centroidPoint.y - 8} fontSize="11" fontWeight="700" fill={CENTROID}>
                C = (1,76; 2,35) m
              </text>
              <text x={centroidPoint.x + 16} y={centroidPoint.y + 8} fontSize="9.5" fill={CENTROID}>
                centroid linii — w świetle między prętami
              </text>
              <text x="230" y="326" textAnchor="middle" fontSize="10" fill={INK}>
                x_C = Q_y / L, y_C = Q_x / L
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
