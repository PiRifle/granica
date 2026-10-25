import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE = '#ff6b45'
const RESULT = '#27835a'
const COUPLE = '#a970dd'
const ARM = '#4f6df5'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'

type V3 = { x: number; y: number; z: number }

const OX = 120
const OY = 270
const S = 55
const DZ_X = 0.6
const DZ_Y = -0.35

const project = (p: V3) => ({
  x: OX + S * (p.x + p.z * DZ_X),
  y: OY - S * p.y + S * p.z * DZ_Y,
})

const move = (from: V3, v: V3, k: number): V3 => ({ x: from.x + v.x * k, y: from.y + v.y * k, z: from.z + v.z * k })

const O: V3 = { x: 0, y: 0, z: 0 }
const P: V3 = { x: 1, y: 0, z: 2 }
const FORCE_V: V3 = { x: 0, y: 4, z: 0 }
const COUPLE_V: V3 = { x: 2, y: 0, z: 1 }
const R: V3 = { x: 0, y: 4, z: 0 }
const R_CROSS: V3 = { x: -8, y: 0, z: 4 }
const M_O: V3 = { x: -6, y: 0, z: 5 }
const O_PRIME: V3 = { x: 1, y: 0, z: 0 }
const A_VEC: V3 = { x: 1, y: 0, z: 0 }
const M_PRIME: V3 = { x: -6, y: 0, z: 1 }

const o2d = project(O)
const p2d = project(P)
const fEnd2d = project(move(P, FORCE_V, 0.65))
const rEnd2d = project(move(O, R, 0.65))
const rCross2d = project(move(O, R_CROSS, 0.35))
const mEnd2d = project(move(O, M_O, 0.35))
const op2d = project(O_PRIME)
const aEnd2d = project(move(O, A_VEC, 1))
const mpEnd2d = project(move(O_PRIME, M_PRIME, 0.35))

const lineBottom = project({ x: 1.25, y: -0.35, z: 1.5 })
const lineTop = project({ x: 1.25, y: 3.5, z: 1.5 })
const lineBase = project({ x: 1.25, y: 0, z: 1.5 })

const plate = [
  project({ x: 0, y: 0, z: 0 }),
  project({ x: 2.5, y: 0, z: 0 }),
  project({ x: 2.5, y: 0, z: 3 }),
  project({ x: 0, y: 0, z: 3 }),
]

function Arrow({
  from,
  to,
  color,
  marker,
  width = 3,
  reveal = 1,
}: {
  from: V3
  to: V3
  color: string
  marker: string
  width?: number
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
      markerEnd={`url(#${marker})`}
      initial={false}
      animate={{ opacity: reveal }}
      transition={{ duration: 0.35 }}
    />
  )
}

export function Reduction3DAnimation({ index }: SolutionAnimationProps) {
  const showResultant = index >= 1
  const showMoments = index >= 2
  const showTest = index >= 3
  const showLine = index >= 4
  const showPole = index >= 5

  const status = [
    'Siła w P i przyłożona para M_c',
    'R = (0, 4, 0) kN — suma sił',
    'r × F = (−8, 0, 4), M_O = (−6, 0, 5) kN·m',
    'R · M_O = 0 → układ ma wypadkową',
    'Prosta działania: x = 1,25 m, z = 1,5 m',
    'M_O′ = (−6, 0, 1) kN·m po przesunięciu bieguna',
  ][index]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Redukcja przestrzennego układu sił do bieguna">
          <title>Redukcja układu do bieguna</title>
          <desc>Wektor główny, moment główny, test wypadkowej, prosta działania i zmiana bieguna.</desc>
          <defs>
            <marker
              id="ex-redukcja3d-force"
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
              id="ex-redukcja3d-result"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
            <marker
              id="ex-redukcja3d-couple"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={COUPLE} />
            </marker>
            <marker
              id="ex-redukcja3d-arm"
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
            points={plate.map((point) => `${point.x},${point.y}`).join(' ')}
            fill="#f0f3f7"
            stroke={AXIS}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />

          <g stroke={AXIS} strokeWidth="1.3" fill="none">
            <line x1={o2d.x} y1={o2d.y} x2={o2d.x + 290} y2={o2d.y} />
            <line x1={o2d.x} y1={o2d.y} x2={o2d.x + 145} y2={o2d.y + 85} />
            <line x1={o2d.x} y1={o2d.y} x2={o2d.x} y2={o2d.y - 220} />
          </g>
          <g fontSize="12" fill={INK}>
            <text x={o2d.x + 282} y={o2d.y - 8}>
              x
            </text>
            <text x={o2d.x + 150} y={o2d.y + 96}>
              z
            </text>
            <text x={o2d.x + 8} y={o2d.y - 206}>
              y
            </text>
            <text x={o2d.x - 16} y={o2d.y + 16}>
              O
            </text>
            <text x={p2d.x + 8} y={p2d.y + 4}>
              P(1,0,2)
            </text>
          </g>
          <circle cx={o2d.x} cy={o2d.y} r="3.2" fill={INK} />
          <circle cx={p2d.x} cy={p2d.y} r="3.2" fill={INK} />

          <Arrow from={P} to={move(P, FORCE_V, 0.65)} color={FORCE} marker="ex-redukcja3d-force" width={3.4} />
          <text x={fEnd2d.x + 8} y={fEnd2d.y + 4} fontSize="12" fontWeight="700" fill={FORCE}>
            F = 4 kN
          </text>

          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <path
              d={`M ${p2d.x + 30} ${p2d.y - 10} A 28 28 0 1 0 ${p2d.x + 32} ${p2d.y + 8}`}
              fill="none"
              stroke={COUPLE}
              strokeWidth="2.4"
              markerEnd="url(#ex-redukcja3d-couple)"
            />
            <text x={p2d.x + 38} y={p2d.y - 22} fontSize="10.5" fontWeight="600" fill={COUPLE}>
              M_c
            </text>
            <text x={p2d.x + 38} y={p2d.y - 9} fontSize="9.5" fill={COUPLE}>
              (2, 0, 1)
            </text>
          </motion.g>

          {showResultant && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Arrow from={O} to={move(O, R, 0.65)} color={RESULT} marker="ex-redukcja3d-result" width={3.8} />
              <text x={rEnd2d.x + 8} y={rEnd2d.y - 4} fontSize="12" fontWeight="700" fill={RESULT}>
                R = (0, 4, 0) kN
              </text>
            </motion.g>
          )}

          {showMoments && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <Arrow from={O} to={P} color={ARM} marker="ex-redukcja3d-arm" width={2.4} />
              <Arrow from={O} to={move(O, R_CROSS, 0.35)} color={COUPLE} marker="ex-redukcja3d-couple" width={2.8} />
              <Arrow from={O} to={move(O, M_O, 0.35)} color={COUPLE} marker="ex-redukcja3d-couple" width={3.4} />
              <text x={rCross2d.x + 2} y={rCross2d.y + 16} fontSize="9.5" fill={COUPLE}>
                r × F = (−8, 0, 4)
              </text>
              <text x={mEnd2d.x + 8} y={mEnd2d.y + 4} fontSize="10" fontWeight="600" fill={COUPLE}>
                M_O = (−6, 0, 5)
              </text>
            </motion.g>
          )}

          {showTest && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <rect x="292" y="78" width="132" height="44" rx="8" fill="#eef7f1" stroke={RESULT} strokeWidth="1.2" />
              <text x="358" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill={RESULT}>
                R · M_O = 0
              </text>
              <text x="358" y="112" textAnchor="middle" fontSize="10" fill={RESULT}>
                wypadkowa
              </text>
            </motion.g>
          )}

          {showLine && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <line
                x1={lineBottom.x}
                y1={lineBottom.y}
                x2={lineTop.x}
                y2={lineTop.y}
                stroke={RESULT}
                strokeWidth="2"
                strokeDasharray="8 5"
              />
              <Arrow
                from={{ x: 1.25, y: 0, z: 1.5 }}
                to={move({ x: 1.25, y: 0, z: 1.5 }, FORCE_V, 0.65)}
                color={RESULT}
                marker="ex-redukcja3d-result"
                width={3.4}
              />
              <circle cx={lineBase.x} cy={lineBase.y} r="3.4" fill={RESULT} />
              <text x={lineBase.x} y={lineBase.y + 22} textAnchor="middle" fontSize="9.8" fill={RESULT}>
                x = 1,25 m, z = 1,5 m
              </text>
            </motion.g>
          )}

          {showPole && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <Arrow from={O} to={O_PRIME} color={ARM} marker="ex-redukcja3d-arm" width={2.2} />
              <line x1={op2d.x - 6} y1={op2d.y} x2={op2d.x + 6} y2={op2d.y} stroke={INK} strokeWidth="1.4" />
              <line x1={op2d.x} y1={op2d.y - 6} x2={op2d.x} y2={op2d.y + 6} stroke={INK} strokeWidth="1.4" />
              <text x={op2d.x + 8} y={op2d.y - 8} fontSize="10.5" fontWeight="600" fill={INK}>
                O′
              </text>
              <Arrow
                from={O_PRIME}
                to={move(O_PRIME, M_PRIME, 0.35)}
                color={COUPLE}
                marker="ex-redukcja3d-couple"
                width={2.8}
              />
              <text x={mpEnd2d.x - 4} y={mpEnd2d.y + 18} textAnchor="end" fontSize="9.5" fontWeight="600" fill={COUPLE}>
                M_O′ = (−6, 0, 1)
              </text>
              <text x={(o2d.x + aEnd2d.x) / 2} y={o2d.y + 20} textAnchor="middle" fontSize="9.5" fill={ARM}>
                a = (1, 0, 0)
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
