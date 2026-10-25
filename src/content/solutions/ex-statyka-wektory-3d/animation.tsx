import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE = '#ff6b45'
const VECTOR = '#4f6df5'
const RESULT = '#27835a'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'
const OK = '#2f7d5b'

type V3 = { x: number; y: number; z: number }

const OX = 90
const OY = 300
const S = 40
const SZ = 18
const DY_X = 0.62
const DY_Y = -0.35

const project = (p: V3) => ({
  x: OX + S * (p.x + p.y * DY_X),
  y: OY - SZ * p.z + S * p.y * DY_Y,
})

const A: V3 = { x: 0, y: 0, z: 0 }
const B: V3 = { x: 3, y: 4, z: 12 }
const a2d = project(A)
const b2d = project(B)
const cx2d = project({ x: 3, y: 0, z: 0 })
const cy2d = project({ x: 0, y: 4, z: 0 })
const cxy2d = project({ x: 3, y: 4, z: 0 })
const unitEnd = project({ x: (3 / 13) * 6, y: (4 / 13) * 6, z: (12 / 13) * 6 })

const axisX = project({ x: 5.2, y: 0, z: 0 })
const axisY = project({ x: 0, y: 5.2, z: 0 })
const axisZ = project({ x: 0, y: 0, z: 13 })

function arcPath(center: { x: number; y: number }, radius: number, from: number, to: number) {
  const start = { x: center.x + radius * Math.cos(from), y: center.y + radius * Math.sin(from) }
  const end = { x: center.x + radius * Math.cos(to), y: center.y + radius * Math.sin(to) }
  const large = Math.abs(to - from) > Math.PI ? 1 : 0
  const sweep = to > from ? 1 : 0
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} ${sweep} ${end.x} ${end.y}`
}

function Arrow({
  from,
  to,
  color,
  marker,
  width = 3,
  dashed = false,
  reveal = 1,
}: {
  from: V3
  to: V3
  color: string
  marker: string
  width?: number
  dashed?: boolean
  reveal?: number
}) {
  const a = project(from)
  const b = project(to)
  return (
    <motion.line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dashed ? '6 5' : undefined}
      markerEnd={dashed ? undefined : `url(#${marker})`}
      initial={false}
      animate={{ opacity: reveal }}
      transition={{ duration: 0.35 }}
    />
  )
}

const fDir = Math.atan2(b2d.y - a2d.y, b2d.x - a2d.x)
const yDir = Math.atan2(DY_Y, DY_X)
const zDir = -Math.PI / 2

export function Vector3DAnimation({ index }: SolutionAnimationProps) {
  const showVector = index >= 1
  const showLength = index >= 2
  const showUnit = index >= 3
  const showComponents = index >= 4
  const showAngles = index >= 5

  const status = [
    'Cięgno wyznacza kierunek w trzech wymiarach',
    'r_AB = (3, 4, 12) m — różnice współrzędnych',
    'λ = 13 m — długość prostej działania',
    'u = r_AB / λ — wektor jednostkowy',
    'F = 13u = (3, 4, 12) kN',
    'Σcos²θ = 1 — kontrola kątów',
  ][index]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Siła przestrzenna wzdłuż cięgna i jej składowe">
          <title>Siła w przestrzeni</title>
          <desc>Cięgno AB, wektor wodzący, wersor, składowe siły i kąty kierunkowe.</desc>
          <defs>
            <marker
              id="ex-wektory3d-vec"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={VECTOR} />
            </marker>
            <marker
              id="ex-wektory3d-force"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FORCE} />
            </marker>
            <marker
              id="ex-wektory3d-unit"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
          </defs>

          <g stroke={AXIS} strokeWidth="1.4" fill="none">
            <line x1={a2d.x} y1={a2d.y} x2={axisX.x} y2={axisX.y} />
            <line x1={a2d.x} y1={a2d.y} x2={axisY.x} y2={axisY.y} />
            <line x1={a2d.x} y1={a2d.y} x2={axisZ.x} y2={axisZ.y} />
          </g>
          <g fontSize="12" fill={INK}>
            <text x={axisX.x + 4} y={axisX.y + 16}>
              x
            </text>
            <text x={axisY.x + 6} y={axisY.y - 2}>
              y
            </text>
            <text x={axisZ.x - 4} y={axisZ.y - 6}>
              z
            </text>
            <text x={a2d.x - 16} y={a2d.y + 16}>
              A
            </text>
            <text x={b2d.x + 8} y={b2d.y + 4}>
              B
            </text>
          </g>

          <line
            x1={a2d.x}
            y1={a2d.y}
            x2={b2d.x}
            y2={b2d.y}
            stroke={MUTED}
            strokeWidth="1.2"
            strokeDasharray="4 5"
            opacity="0.7"
          />
          <circle cx={a2d.x} cy={a2d.y} r="3.2" fill={INK} />
          <circle cx={b2d.x} cy={b2d.y} r="3.2" fill={INK} />
          <text x={b2d.x + 8} y={b2d.y + 18} fontSize="10.5" fill={MUTED}>
            (3, 4, 12) m
          </text>

          <motion.g initial={false} animate={{ opacity: showVector ? 1 : 0 }} transition={{ duration: 0.3 }}>
            <Arrow from={A} to={B} color={VECTOR} marker="ex-wektory3d-vec" width={3.4} />
            {!showComponents && (
              <text
                x={(a2d.x + b2d.x) / 2 + 10}
                y={(a2d.y + b2d.y) / 2 + 2}
                fontSize="12"
                fill={VECTOR}
                fontWeight="600"
              >
                r_AB
              </text>
            )}
          </motion.g>

          <motion.g
            initial={false}
            animate={{ opacity: showVector ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            stroke={MUTED}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            fill="none"
          >
            <line x1={a2d.x} y1={a2d.y} x2={cx2d.x} y2={cx2d.y} />
            <line x1={cx2d.x} y1={cx2d.y} x2={cxy2d.x} y2={cxy2d.y} />
            <line x1={cxy2d.x} y1={cxy2d.y} x2={b2d.x} y2={b2d.y} />
          </motion.g>
          <motion.g
            initial={false}
            animate={{ opacity: showVector && !showComponents ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            fill={MUTED}
          >
            <text x={(a2d.x + cx2d.x) / 2 - 4} y={a2d.y + 17} fontSize="10.5">
              Δx = 3 m
            </text>
            <text x={cxy2d.x + 4} y={(cx2d.y + cxy2d.y) / 2 + 4} fontSize="10.5">
              Δy = 4 m
            </text>
            <text x={cxy2d.x + 8} y={(cxy2d.y + b2d.y) / 2} fontSize="10.5">
              Δz = 12 m
            </text>
          </motion.g>

          {showLength && !showComponents && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={a2d.x} y1={a2d.y} x2={b2d.x} y2={b2d.y} stroke={OK} strokeWidth="5" opacity="0.18" />
              <rect
                x={b2d.x - 58}
                y={b2d.y + 26}
                width="116"
                height="22"
                rx="7"
                fill="#eef7f1"
                stroke={OK}
                strokeWidth="1"
              />
              <text x={b2d.x} y={b2d.y + 41} textAnchor="middle" fontSize="11" fontWeight="700" fill={OK}>
                λ = 13 m
              </text>
            </motion.g>
          )}

          {showUnit && !showComponents && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Arrow
                from={A}
                to={{ x: (3 / 13) * 6, y: (4 / 13) * 6, z: (12 / 13) * 6 }}
                color={RESULT}
                marker="ex-wektory3d-unit"
                width={3}
              />
              <circle cx={unitEnd.x} cy={unitEnd.y} r="3" fill={RESULT} />
              <text x={unitEnd.x + 8} y={unitEnd.y + 2} fontSize="13" fontWeight="700" fill={RESULT}>
                u
              </text>
              <text x={unitEnd.x + 8} y={unitEnd.y + 16} fontSize="9.5" fill={RESULT}>
                (3/13, 4/13, 12/13)
              </text>
            </motion.g>
          )}

          {showComponents && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <Arrow from={A} to={{ x: 3, y: 0, z: 0 }} color={FORCE} marker="ex-wektory3d-force" width={2.8} />
              <Arrow
                from={{ x: 3, y: 0, z: 0 }}
                to={{ x: 3, y: 4, z: 0 }}
                color={FORCE}
                marker="ex-wektory3d-force"
                width={2.8}
              />
              <Arrow from={{ x: 3, y: 4, z: 0 }} to={B} color={FORCE} marker="ex-wektory3d-force" width={2.8} />
              <Arrow from={A} to={B} color={FORCE} marker="ex-wektory3d-force" width={4} />
              {!showAngles && (
                <>
                  <text x={(a2d.x + cx2d.x) / 2} y={a2d.y - 8} textAnchor="middle" fontSize="10.5" fill={FORCE}>
                    Fx = 3 kN
                  </text>
                  <text x={cxy2d.x + 6} y={(cx2d.y + cxy2d.y) / 2 - 4} fontSize="10.5" fill={FORCE}>
                    Fy = 4 kN
                  </text>
                  <text x={b2d.x + 8} y={(cxy2d.y + b2d.y) / 2} fontSize="10.5" fill={FORCE}>
                    Fz = 12 kN
                  </text>
                </>
              )}
              <text x={b2d.x + 8} y={b2d.y - 10} fontSize="12.5" fontWeight="700" fill={FORCE}>
                F = 13 kN
              </text>
            </motion.g>
          )}

          {showAngles && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <path d={arcPath(a2d, 44, 0, fDir)} fill="none" stroke={RESULT} strokeWidth="1.6" />
              <path d={arcPath(a2d, 56, yDir, fDir)} fill="none" stroke={RESULT} strokeWidth="1.6" />
              <path d={arcPath(a2d, 68, zDir, fDir)} fill="none" stroke={RESULT} strokeWidth="1.6" />
              <text x={a2d.x + 76} y={a2d.y - 10} fontSize="10.5" fill={RESULT}>
                θx ≈ 76,7°
              </text>
              <text x={a2d.x + 52} y={a2d.y - 72} fontSize="10.5" fill={RESULT}>
                θy ≈ 72,1°
              </text>
              <text x={a2d.x - 56} y={a2d.y - 104} fontSize="10.5" fill={RESULT}>
                θz ≈ 22,6°
              </text>
              <rect
                x={b2d.x - 60}
                y={b2d.y - 34}
                width="120"
                height="21"
                rx="7"
                fill="#eef7f1"
                stroke={OK}
                strokeWidth="1"
              />
              <text x="360" y="119" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={OK}>
                Σcos²θ = 1
              </text>
            </motion.g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="12" fill={INK}>
            {status}
          </text>
        </svg>
      </div>
    </div>
  )
}
