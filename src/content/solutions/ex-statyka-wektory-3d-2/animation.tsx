import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const VECTOR = '#4f6df5'
const COMPONENT = '#a970dd'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const OK = '#2f7d5b'
const INK = '#17202a'

type V3 = { x: number; y: number; z: number }

const OX = 190
const OY = 232
const S = 30
const SZ = 13
const DY_X = 0.62
const DY_Y = -0.35

const project = (p: V3) => ({
  x: OX + S * (p.x + p.y * DY_X),
  y: OY - SZ * p.z + S * p.y * DY_Y,
})

const Q_VEC: V3 = { x: 5, y: -5, z: 7.071 }
const QX_END: V3 = { x: 5, y: 0, z: 0 }
const QY_END: V3 = { x: 5, y: -5, z: 0 }
const o2d = project({ x: 0, y: 0, z: 0 })
const q2d = project(Q_VEC)
const qx2d = project(QX_END)
const qxy2d = project(QY_END)
const qy2d = project({ x: 0, y: -5, z: 0 })
const axisX = project({ x: 8, y: 0, z: 0 })
const axisY = project({ x: 0, y: 7, z: 0 })
const axisZ = project({ x: 0, y: 0, z: 10 })

const status = [
  'Q = 10 kN, θx = 60°, θy = 120°, Qz > 0',
  'Qx = 10cos60° = 5 kN, Qy = 10cos120° = −5 kN',
  'cos²θz = 1 − 0,25 − 0,25 = 0,5',
  'Qz > 0, więc cosθz = +√0,5 i Qz ≈ 7,07 kN',
  '|Q| = √(25 + 25 + 50) = 10 kN',
  'Σcos²θ = 0,25 + 0,25 + 0,5 = 1',
]

function Arrow({
  from,
  to,
  color,
  marker,
  width = 3,
  dashed = false,
}: {
  from: V3
  to: V3
  color: string
  marker: string
  width?: number
  dashed?: boolean
}) {
  const a = project(from)
  const b = project(to)
  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dashed ? '5 5' : undefined}
      markerEnd={dashed ? undefined : `url(#${marker})`}
    />
  )
}

export function DirectionCosinesAnimation({ index }: SolutionAnimationProps) {
  const showComponents = index >= 1
  const showUnknown = index >= 2
  const showZ = index >= 3
  const showModule = index >= 4
  const showCosines = index >= 5

  const badgeLabel = ['dane', 'składowe', 'brakujący kąt', 'składowa z', 'kontrola modułu', 'kontrola kierunku'][index]
  const badge = ['θx = 60°, θy = 120°', 'Qx = 5, Qy = −5', 'cos²θz = 0,5', 'Qz = 7,07 kN', '|Q| = 10 kN', 'Σcos²θ = 1'][
    index
  ]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Siła zadana kątami kierunkowymi i jej składowe">
          <title>Siła zadana kątami kierunkowymi</title>
          <desc>Wektor Q, jego składowe Qx, Qy, Qz oraz kontrola modułu i cosinusów kierunkowych.</desc>
          <defs>
            <marker id="ex-w3d2-q" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={VECTOR} />
            </marker>
            <marker
              id="ex-w3d2-comp"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={COMPONENT} />
            </marker>
            <marker id="ex-w3d2-z" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={OK} />
            </marker>
          </defs>

          <g stroke={AXIS} strokeWidth="1.4" fill="none">
            <line x1={o2d.x} y1={o2d.y} x2={axisX.x} y2={axisX.y} />
            <line x1={o2d.x} y1={o2d.y} x2={axisY.x} y2={axisY.y} />
            <line x1={o2d.x} y1={o2d.y} x2={axisZ.x} y2={axisZ.y} />
          </g>
          <g fontSize="12" fill={INK}>
            <text x={axisX.x + 3} y={axisX.y + 16}>
              x
            </text>
            <text x={axisY.x + 6} y={axisY.y - 2}>
              y
            </text>
            <text x={axisZ.x - 4} y={axisZ.y - 6}>
              z
            </text>
            <text x={o2d.x - 16} y={o2d.y + 16}>
              O
            </text>
          </g>

          <g stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 5" fill="none" opacity="0.75">
            <line x1={o2d.x} y1={o2d.y} x2={qxy2d.x} y2={qxy2d.y} />
            <line x1={qxy2d.x} y1={qxy2d.y} x2={q2d.x} y2={q2d.y} />
            <line x1={qx2d.x} y1={qx2d.y} x2={qxy2d.x} y2={qxy2d.y} />
            <line x1={qy2d.x} y1={qy2d.y} x2={qxy2d.x} y2={qxy2d.y} />
          </g>

          <Arrow from={{ x: 0, y: 0, z: 0 }} to={Q_VEC} color={VECTOR} marker="ex-w3d2-q" width={4} />
          <circle cx={q2d.x} cy={q2d.y} r="3.2" fill={VECTOR} />
          <text x={q2d.x + 9} y={q2d.y - 7} fontSize="12" fontWeight="700" fill={VECTOR}>
            Q = 10 kN
          </text>

          <motion.g initial={false} animate={{ opacity: showComponents ? 1 : 0 }} transition={{ duration: 0.35 }}>
            <Arrow from={{ x: 0, y: 0, z: 0 }} to={QX_END} color={COMPONENT} marker="ex-w3d2-comp" width={3.2} />
            <Arrow from={QX_END} to={QY_END} color={COMPONENT} marker="ex-w3d2-comp" width={3.2} />
            <text x={(o2d.x + qx2d.x) / 2} y={o2d.y + 18} textAnchor="middle" fontSize="11" fill={COMPONENT}>
              Qx = 5 kN
            </text>
            <text x={qxy2d.x + 9} y={(qx2d.y + qxy2d.y) / 2 + 4} fontSize="11" fill={COMPONENT}>
              Qy = −5 kN
            </text>
          </motion.g>

          <motion.g
            initial={false}
            animate={{ opacity: showUnknown && !showZ ? 1 : 0 }}
            transition={{ duration: 0.35 }}
          >
            <line
              x1={qxy2d.x}
              y1={qxy2d.y}
              x2={q2d.x}
              y2={q2d.y}
              stroke={MUTED}
              strokeWidth="3"
              strokeDasharray="6 5"
            />
            <text x={qxy2d.x + 10} y={(qxy2d.y + q2d.y) / 2} fontSize="11.5" fill={MUTED}>
              Qz = ?
            </text>
          </motion.g>

          <motion.g initial={false} animate={{ opacity: showZ ? 1 : 0 }} transition={{ duration: 0.35 }}>
            <Arrow from={QY_END} to={Q_VEC} color={OK} marker="ex-w3d2-z" width={3.6} />
            <text x={qxy2d.x + 10} y={(qxy2d.y + q2d.y) / 2 - 2} fontSize="11" fontWeight="700" fill={OK}>
              Qz = 7,07 kN
            </text>
            <text x={q2d.x + 9} y={q2d.y + 10} fontSize="10.5" fill={OK}>
              θz = 45°
            </text>
          </motion.g>

          <motion.g initial={false} animate={{ opacity: showModule ? 1 : 0 }} transition={{ duration: 0.35 }}>
            <polyline
              points={`${o2d.x},${o2d.y} ${qxy2d.x},${qxy2d.y} ${q2d.x},${q2d.y}`}
              fill="none"
              stroke={OK}
              strokeWidth="2.4"
              strokeDasharray="6 4"
            />
            <text x={qxy2d.x + 12} y={qxy2d.y + 18} fontSize="10.5" fill={OK}>
              5² + (−5)²
            </text>
            <text x={q2d.x + 10} y={(qxy2d.y + q2d.y) / 2 + 14} fontSize="10.5" fill={OK}>
              7,07²
            </text>
          </motion.g>

          {showCosines && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <circle cx={o2d.x} cy={o2d.y} r="42" fill="none" stroke={OK} strokeWidth="1.1" strokeDasharray="4 5" />
              <text x={o2d.x + 48} y={o2d.y - 28} fontSize="10.5" fill={OK}>
                cosθx = 0,5
              </text>
              <text x={o2d.x - 92} y={o2d.y + 26} fontSize="10.5" fill={OK}>
                cosθy = −0,5
              </text>
              <text x={o2d.x - 44} y={o2d.y - 48} fontSize="10.5" fill={OK}>
                cosθz = √0,5
              </text>
            </motion.g>
          )}

          <rect x="318" y="42" width="124" height="44" rx="8" fill="#eef7f1" stroke={OK} strokeWidth="1.2" />
          <text x="380" y="60" textAnchor="middle" fontSize="10" fill={MUTED}>
            {badgeLabel}
          </text>
          <text x="380" y="77" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK}>
            {badge}
          </text>

          <text x="230" y="328" textAnchor="middle" fontSize="12" fill={INK}>
            {status[index]}
          </text>
        </svg>
      </div>
    </div>
  )
}
