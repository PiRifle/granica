import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ARM = '#4f6df5'
const FORCE = '#ff6b45'
const MOMENT = '#a970dd'
const AXIS = '#2f7d5b'
const GUIDE = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'

type V3 = { x: number; y: number; z: number }

const OX = 135
const OY = 205
const S = 55
const DY_X = -0.45
const DY_Y = 0.35

const project = (p: V3) => ({
  x: OX + S * (p.x + p.y * DY_X),
  y: OY + S * (-p.z + p.y * DY_Y),
})

const move = (from: V3, v: V3, k: number): V3 => ({ x: from.x + v.x * k, y: from.y + v.y * k, z: from.z + v.z * k })

const O: V3 = { x: 0, y: 0, z: 0 }
const P: V3 = { x: 2, y: 1, z: 2 }
const F: V3 = { x: 3, y: -6, z: 2 }
const M: V3 = { x: 14, y: 2, z: -15 }
const Q: V3 = { x: 1, y: 2, z: 2 }
const E_L: V3 = { x: 1 / 3, y: 2 / 3, z: 2 / 3 }
const M_L = -4

const o2d = project(O)
const p2d = project(P)
const fEnd3d = move(P, F, 0.2)
const fEnd2d = project(fEnd3d)
const fFromO = project(move(O, F, 0.2))
const mEnd2d = project(move(O, M, 0.1))
const q2d = project(Q)
const projEnd2d = project(move(O, E_L, M_L * 0.35))

const axisVector = { x: q2d.x - o2d.x, y: q2d.y - o2d.y }
const axisLength = Math.hypot(axisVector.x, axisVector.y)
const axisUnit = { x: axisVector.x / axisLength, y: axisVector.y / axisLength }

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

export function Moment3DAnimation({ index }: SolutionAnimationProps) {
  const showPlane = index >= 1
  const showMoment = index >= 2
  const showAxis = index >= 3
  const showProjection = index >= 4
  const showSign = index >= 5

  const status = [
    'Siła F w punkcie P, biegun w O',
    'r × F: płaszczyzna i składowe momentu',
    'M_O = (14, 2, −15) kN·m, |M_O| ≈ 20,6 kN·m',
    'Oś l przez O i Q; e_l = (1/3, 2/3, 2/3)',
    'M_l = M_O · e_l = −4 kN·m',
    'Rzut ujemny — zwrot przeciwny do e_l',
  ][index]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Moment siły względem punktu i względem osi">
          <title>Moment siły w przestrzeni</title>
          <desc>Wektor ramienia, siła, moment względem punktu oraz rzut momentu na oś l.</desc>
          <defs>
            <marker
              id="ex-moment3d-arm"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={ARM} />
            </marker>
            <marker
              id="ex-moment3d-force"
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
              id="ex-moment3d-moment"
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
              id="ex-moment3d-axis"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={AXIS} />
            </marker>
          </defs>

          <g stroke={GUIDE} strokeWidth="1.3" fill="none">
            <line x1={o2d.x} y1={o2d.y} x2={o2d.x + 300} y2={o2d.y} />
            <line x1={o2d.x} y1={o2d.y} x2={o2d.x - 90} y2={o2d.y + 70} />
            <line x1={o2d.x} y1={o2d.y} x2={o2d.x} y2={o2d.y - 160} />
          </g>
          <g fontSize="12" fill={INK}>
            <text x={o2d.x + 292} y={o2d.y - 8}>
              x
            </text>
            <text x={o2d.x - 102} y={o2d.y + 84}>
              y
            </text>
            <text x={o2d.x + 8} y={o2d.y - 150}>
              z
            </text>
            <text x={o2d.x - 16} y={o2d.y + 16}>
              O
            </text>
            <text x={p2d.x + 8} y={p2d.y - 8}>
              P(2,1,2)
            </text>
          </g>
          <circle cx={o2d.x} cy={o2d.y} r="3.2" fill={INK} />
          <circle cx={p2d.x} cy={p2d.y} r="3.2" fill={INK} />

          <motion.g initial={false} animate={{ opacity: showPlane ? 1 : 0 }} transition={{ duration: 0.35 }}>
            <polygon
              points={`${o2d.x},${o2d.y} ${p2d.x},${p2d.y} ${fEnd2d.x},${fEnd2d.y} ${fFromO.x},${fFromO.y}`}
              fill={MOMENT}
              opacity="0.08"
              stroke={MOMENT}
              strokeWidth="1"
              strokeDasharray="5 4"
            />
          </motion.g>

          <Arrow from={O} to={P} color={ARM} marker="ex-moment3d-arm" width={3} />
          <text x={(o2d.x + p2d.x) / 2 - 8} y={(o2d.y + p2d.y) / 2 + 4} fontSize="12" fill={ARM} fontWeight="600">
            r
          </text>

          <Arrow from={P} to={fEnd3d} color={FORCE} marker="ex-moment3d-force" width={3.2} />
          <text x={fEnd2d.x + 7} y={fEnd2d.y + 4} fontSize="12" fill={FORCE} fontWeight="600">
            F
          </text>

          {showMoment && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <Arrow from={O} to={move(O, M, 0.1)} color={MOMENT} marker="ex-moment3d-moment" width={3.8} />
              <text x={mEnd2d.x + 8} y={mEnd2d.y + 2} fontSize="12" fill={MOMENT} fontWeight="700">
                M_O
              </text>
              <text x={mEnd2d.x + 8} y={mEnd2d.y + 16} fontSize="10" fill={MOMENT}>
                (14, 2, −15)
              </text>
            </motion.g>
          )}

          {showAxis && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line
                x1={o2d.x - axisUnit.x * 48}
                y1={o2d.y - axisUnit.y * 48}
                x2={o2d.x + axisUnit.x * 165}
                y2={o2d.y + axisUnit.y * 165}
                stroke={AXIS}
                strokeWidth="2.2"
                strokeDasharray="8 5"
              />
              <circle cx={q2d.x} cy={q2d.y} r="3.4" fill={AXIS} />
              <text x={q2d.x + 8} y={q2d.y + 4} fontSize="11" fontWeight="600" fill={AXIS}>
                Q
              </text>
              <text
                x={o2d.x + axisUnit.x * 172 + 4}
                y={o2d.y + axisUnit.y * 172}
                fontSize="12"
                fontWeight="700"
                fill={AXIS}
              >
                l
              </text>
              <text x={q2d.x + 12} y={q2d.y + 19} fontSize="9.5" fill={AXIS}>
                e_l = (1/3, 2/3, 2/3)
              </text>
            </motion.g>
          )}

          {showProjection && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <line
                x1={mEnd2d.x}
                y1={mEnd2d.y}
                x2={projEnd2d.x}
                y2={projEnd2d.y}
                stroke={GUIDE}
                strokeWidth="1.4"
                strokeDasharray="4 4"
              />
              <line
                x1={o2d.x}
                y1={o2d.y}
                x2={projEnd2d.x}
                y2={projEnd2d.y}
                stroke={AXIS}
                strokeWidth="5.5"
                strokeLinecap="round"
              />
              <circle cx={projEnd2d.x} cy={projEnd2d.y} r="3.2" fill={AXIS} />
              <text
                x={projEnd2d.x - 8}
                y={projEnd2d.y + 26}
                textAnchor="end"
                fontSize="10.5"
                fontWeight="700"
                fill={AXIS}
              >
                M_l = −4 kN·m
              </text>
              <text x={projEnd2d.x - 8} y={projEnd2d.y + 40} textAnchor="end" fontSize="9.5" fill={MUTED}>
                rzut M_O na oś l
              </text>
            </motion.g>
          )}

          {showSign && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <rect x="292" y="232" width="128" height="46" rx="8" fill="#eef7f1" stroke={AXIS} strokeWidth="1.2" />
              <text x="356" y="250" textAnchor="middle" fontSize="11" fontWeight="700" fill={AXIS}>
                M_l &lt; 0
              </text>
              <text x="356" y="266" textAnchor="middle" fontSize="9.5" fill={MUTED}>
                zwrot przeciwny do e_l
              </text>
              <line
                x1={o2d.x}
                y1={o2d.y}
                x2={projEnd2d.x}
                y2={projEnd2d.y}
                stroke={AXIS}
                strokeWidth="1"
                opacity="0.35"
              />
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
