import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE = '#ff6b45'
const REACTION = '#2f7d5b'
const MOMENT = '#a970dd'
const ARM = '#4f6df5'
const STRUCT = '#556273'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'

type V3 = { x: number; y: number; z: number }

const OX = 100
const OY = 290
const S = 58
const DY_X = 0.62
const DY_Y = -0.35

const project = (p: V3) => ({
  x: OX + S * (p.x + p.y * DY_X),
  y: OY - S * p.z + S * p.y * DY_Y,
})

const move = (from: V3, v: V3, k: number): V3 => ({ x: from.x + v.x * k, y: from.y + v.y * k, z: from.z + v.z * k })

const O: V3 = { x: 0, y: 0, z: 0 }
const A: V3 = { x: 2, y: 0, z: 0 }
const B: V3 = { x: 2, y: 3, z: 1 }
const F: V3 = { x: 4, y: 0, z: -6 }
const R: V3 = { x: -4, y: 0, z: 6 }
const LOAD_MOMENT: V3 = { x: -18, y: 16, z: -12 }
const REACTION_MOMENT: V3 = { x: 18, y: -16, z: 12 }

const o2d = project(O)
const a2d = project(A)
const b2d = project(B)
const fEnd2d = project(move(B, F, 0.28))
const rEnd2d = project(move(O, R, 0.28))
const lmEnd2d = project(move(O, LOAD_MOMENT, 0.08))
const rmEnd2d = project(move(O, REACTION_MOMENT, 0.08))

const wall = [
  project({ x: 0, y: -0.4, z: -0.4 }),
  project({ x: 0, y: 1.2, z: -0.4 }),
  project({ x: 0, y: 1.2, z: 1.2 }),
  project({ x: 0, y: -0.4, z: 1.2 }),
]

const ghostX = project({ x: 0.8, y: 0, z: 0 })
const ghostY = project({ x: 0, y: 0.8, z: 0 })
const ghostZ = project({ x: 0, y: 0, z: 0.8 })

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

export function Supports3DAnimation({ index }: SolutionAnimationProps) {
  const showSupports = index >= 1
  const showForce = index >= 2
  const showLoadMoment = index >= 3
  const showReactionMoment = index >= 4
  const showCheck = index >= 5

  const status = [
    'Wspornik O–A–B obciążony siłą F w końcu B',
    'Podpora stała: 3 siły + 3 momenty = 6 niewiadomych',
    'R = −F = (−4, 0, 6) kN',
    'r_B × F = (−18, 16, −12) kN·m',
    'M = −r_B × F = (18, −16, 12) kN·m',
    'R = 7,21 kN, M ≈ 26,9 kN·m — podpora przenosi oba',
  ][index]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Wspornik w podporze stałej i reakcje przestrzenne">
          <title>Więzy i reakcje podpory stałej</title>
          <desc>Wspornik przestrzenny, obciążenie w punkcie B, reakcja siłowa i momentowa.</desc>
          <defs>
            <marker
              id="ex-wiezy3d-force"
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
              id="ex-wiezy3d-react"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker
              id="ex-wiezy3d-moment"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
            <marker
              id="ex-wiezy3d-arm"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={ARM} />
            </marker>
          </defs>

          <polygon
            points={wall.map((point) => `${point.x},${point.y}`).join(' ')}
            fill="#e7ebf0"
            stroke={MUTED}
            strokeWidth="1.4"
          />
          <g stroke={MUTED} strokeWidth="1" opacity="0.6">
            {Array.from({ length: 6 }, (_, lineIndex) => {
              const t = lineIndex / 5
              const x1 = wall[0].x + (wall[1].x - wall[0].x) * t
              const y1 = wall[0].y + (wall[1].y - wall[0].y) * t
              const x2 = wall[3].x + (wall[2].x - wall[3].x) * t
              const y2 = wall[3].y + (wall[2].y - wall[3].y) * t
              return <line key={lineIndex} x1={x1} y1={y1} x2={x2} y2={y2} />
            })}
          </g>

          <g stroke={AXIS} strokeWidth="1.3" fill="none">
            <line x1={o2d.x} y1={o2d.y} x2={o2d.x + 330} y2={o2d.y} />
            <line x1={o2d.x} y1={o2d.y} x2={o2d.x + 155} y2={o2d.y - 78} />
            <line x1={o2d.x} y1={o2d.y} x2={o2d.x} y2={o2d.y - 205} />
          </g>
          <g fontSize="12" fill={INK}>
            <text x={o2d.x + 322} y={o2d.y - 8}>
              x
            </text>
            <text x={o2d.x + 160} y={o2d.y - 88}>
              y
            </text>
            <text x={o2d.x + 8} y={o2d.y - 194}>
              z
            </text>
            <text x={o2d.x - 16} y={o2d.y + 16}>
              O
            </text>
            <text x={a2d.x - 4} y={a2d.y + 17}>
              A
            </text>
            <text x={b2d.x + 8} y={b2d.y - 6}>
              B(2,3,1)
            </text>
          </g>
          <circle cx={o2d.x} cy={o2d.y} r="3.6" fill={INK} />
          <circle cx={a2d.x} cy={a2d.y} r="3" fill={INK} />
          <circle cx={b2d.x} cy={b2d.y} r="3.4" fill={INK} />

          <g stroke={STRUCT} strokeWidth="5" strokeLinecap="round" fill="none">
            <line x1={o2d.x} y1={o2d.y} x2={a2d.x} y2={a2d.y} />
            <line x1={a2d.x} y1={a2d.y} x2={b2d.x} y2={b2d.y} />
          </g>

          <Arrow from={B} to={move(B, F, 0.28)} color={FORCE} marker="ex-wiezy3d-force" width={3.6} />
          <text x={fEnd2d.x - 8} y={fEnd2d.y + 4} textAnchor="end" fontSize="11" fontWeight="700" fill={FORCE}>
            F
          </text>
          <text x={fEnd2d.x - 8} y={fEnd2d.y + 18} textAnchor="end" fontSize="9.5" fill={FORCE}>
            (4, 0, −6) kN
          </text>

          {showSupports && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <g stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 3" fill="none">
                <line x1={o2d.x} y1={o2d.y} x2={ghostX.x} y2={ghostX.y} />
                <line x1={o2d.x} y1={o2d.y} x2={ghostY.x} y2={ghostY.y} />
                <line x1={o2d.x} y1={o2d.y} x2={ghostZ.x} y2={ghostZ.y} />
              </g>
              <g fontSize="9" fill={MUTED}>
                <text x={ghostX.x + 4} y={ghostX.y + 12}>
                  Rx
                </text>
                <text x={ghostY.x + 4} y={ghostY.y - 2}>
                  Ry
                </text>
                <text x={ghostZ.x - 22} y={ghostZ.y}>
                  Rz
                </text>
              </g>
              <path
                d={`M ${o2d.x + 24} ${o2d.y - 46} A 30 30 0 1 0 ${o2d.x + 34} ${o2d.y - 30}`}
                fill="none"
                stroke={MOMENT}
                strokeWidth="1.6"
                strokeDasharray="4 3"
              />
              <text x={o2d.x + 40} y={o2d.y - 50} fontSize="9" fill={MOMENT}>
                Mx, My, Mz
              </text>
              <rect x="292" y="42" width="136" height="40" rx="8" fill="#f4f1fa" stroke={MOMENT} strokeWidth="1.1" />
              <text x="360" y="59" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={MOMENT}>
                3 siły + 3 momenty
              </text>
              <text x="360" y="74" textAnchor="middle" fontSize="9.5" fill={MUTED}>
                n_u = 6
              </text>
            </motion.g>
          )}

          {showForce && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Arrow from={O} to={move(O, R, 0.28)} color={REACTION} marker="ex-wiezy3d-react" width={3.6} />
              <text x={rEnd2d.x + 2} y={rEnd2d.y - 8} fontSize="10.5" fontWeight="700" fill={REACTION}>
                R = (−4, 0, 6)
              </text>
            </motion.g>
          )}

          {showLoadMoment && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <Arrow from={O} to={B} color={ARM} marker="ex-wiezy3d-arm" width={2.4} dashed />
              <text x={(o2d.x + b2d.x) / 2 - 12} y={(o2d.y + b2d.y) / 2 + 16} fontSize="11" fill={ARM} fontWeight="600">
                r_B
              </text>
              <Arrow from={O} to={move(O, LOAD_MOMENT, 0.08)} color={MOMENT} marker="ex-wiezy3d-moment" width={3.2} />
              <text x={lmEnd2d.x - 4} y={lmEnd2d.y - 8} textAnchor="end" fontSize="9.5" fontWeight="700" fill={MOMENT}>
                r_B × F
              </text>
              <text x={lmEnd2d.x - 4} y={lmEnd2d.y + 6} textAnchor="end" fontSize="9" fill={MOMENT}>
                (−18, 16, −12)
              </text>
            </motion.g>
          )}

          {showReactionMoment && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <Arrow from={O} to={move(O, REACTION_MOMENT, 0.08)} color={MOMENT} marker="ex-wiezy3d-moment" width={4} />
              <text x={rmEnd2d.x + 8} y={rmEnd2d.y - 4} fontSize="10.5" fontWeight="700" fill={MOMENT}>
                M = (18, −16, 12)
              </text>
            </motion.g>
          )}

          {showCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <rect x="278" y="222" width="158" height="52" rx="8" fill="#eef7f1" stroke={REACTION} strokeWidth="1.2" />
              <text x="357" y="240" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={REACTION}>
                R = 7,21 kN
              </text>
              <text x="357" y="256" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={REACTION}>
                M ≈ 26,9 kN·m
              </text>
              <text x="357" y="270" textAnchor="middle" fontSize="9" fill={MUTED}>
                podpora stała przenosi oba
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
