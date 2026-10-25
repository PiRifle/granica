import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ARM = '#4f6df5'
const FORCE = '#ff6b45'
const MOMENT = '#a970dd'
const AXIS_Y = '#2f7d5b'
const GUIDE = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'

type V3 = { x: number; y: number; z: number }

const OX = 148
const OY = 245
const S = 265
const SYX = 0.55
const SYY = -0.3
const SZ = 180

const project = (p: V3) => ({
  x: OX + S * (p.x + SYX * p.y),
  y: OY - SZ * p.z + S * SYY * p.y,
})

const O: V3 = { x: 0, y: 0, z: 0 }
const P: V3 = { x: 0.346, y: 0.2, z: 0 }
const F_TIP: V3 = { x: 0.346, y: 0.2, z: -0.18 }
const M_VEC: V3 = { x: -0.4, y: 0.693, z: 0 }
const M_Y_END: V3 = { x: 0, y: 0.693, z: 0 }
const P_ON_Y: V3 = { x: 0, y: 0.2, z: 0 }

const o2d = project(O)
const p2d = project(P)
const fTip2d = project(F_TIP)
const pOnY2d = project(P_ON_Y)
const pOnX2d = project({ x: 0.346, y: 0, z: 0 })
const mEnd2d = project(M_VEC)
const myEnd2d = project(M_Y_END)
const axisX = project({ x: 0.58, y: 0, z: 0 })
const axisY = project({ x: 0, y: 0.62, z: 0 })
const axisZ = project({ x: 0, y: 0, z: 0.36 })

const status = [
  'Dźwignia 0,4 m pod kątem 30°; F = 200 N w dół',
  'P = (0,346; 0,2; 0) m',
  'M_O = r × F = (−40; 69,3; 0) N·m',
  'M_y = M_O · e_y = 69,3 N·m',
  'Kontrola: M_y = 200 · 0,346 = 69,3 N·m',
  'Dodatni moment — obrót zgodny z osią +y',
]

function Arrow({
  from,
  to,
  color,
  marker,
  width = 3,
}: {
  from: V3
  to: V3
  color: string
  marker: string
  width?: number
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
      markerEnd={`url(#${marker})`}
    />
  )
}

export function MomentAboutAxisAnimation({ index }: SolutionAnimationProps) {
  const showPoint = index >= 1
  const showMoment = index >= 2
  const showProjection = index >= 3
  const showCheck = index >= 4
  const showSign = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Moment siły względem osi y dla dźwigni poziomej">
          <title>Moment względem osi y</title>
          <desc>Dźwignia OP, pionowa siła F, wektor momentu względem O i jego rzut na oś y.</desc>
          <defs>
            <marker
              id="ex-m3d2-arm"
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
              id="ex-m3d2-force"
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
              id="ex-m3d2-moment"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
            <marker id="ex-m3d2-y" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={AXIS_Y} />
            </marker>
            <marker
              id="ex-m3d2-rot"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={AXIS_Y} />
            </marker>
          </defs>

          <g stroke={GUIDE} strokeWidth="1.3" fill="none">
            <line x1={o2d.x} y1={o2d.y} x2={axisX.x} y2={axisX.y} />
            <line x1={o2d.x} y1={o2d.y} x2={axisY.x} y2={axisY.y} />
            <line x1={o2d.x} y1={o2d.y} x2={axisZ.x} y2={axisZ.y} />
          </g>
          <g fontSize="12" fill={INK}>
            <text x={axisX.x + 3} y={axisX.y + 16}>
              x
            </text>
            <text x={axisY.x + 6} y={axisY.y - 8}>
              y
            </text>
            <text x={axisZ.x - 4} y={axisZ.y - 6}>
              z
            </text>
            <text x={o2d.x - 16} y={o2d.y + 16}>
              O
            </text>
          </g>

          <line x1={o2d.x} y1={o2d.y} x2={p2d.x} y2={p2d.y} stroke={ARM} strokeWidth="4" strokeLinecap="round" />
          <circle cx={o2d.x} cy={o2d.y} r="3.4" fill={INK} />
          <circle cx={p2d.x} cy={p2d.y} r="3.4" fill={INK} />
          <text x={p2d.x + 8} y={p2d.y - 8} fontSize="11.5" fontWeight="700" fill={INK}>
            P
          </text>
          <text x={(o2d.x + p2d.x) / 2 + 12} y={(o2d.y + p2d.y) / 2 - 16} fontSize="11" fill={ARM}>
            OP = 0,4 m
          </text>

          <path
            d={`M ${o2d.x + 42} ${o2d.y} A 42 42 0 0 0 ${o2d.x + 42 * Math.cos(-0.13)} ${o2d.y - 42 * Math.sin(0.13)}`}
            fill="none"
            stroke={MUTED}
            strokeWidth="1.4"
          />
          <text x={o2d.x + 47} y={o2d.y - 8} fontSize="10.5" fill={MUTED}>
            30°
          </text>

          <Arrow from={P} to={F_TIP} color={FORCE} marker="ex-m3d2-force" width={3.4} />
          <text x={fTip2d.x + 8} y={fTip2d.y + 4} fontSize="11.5" fill={FORCE}>
            F = 200 N
          </text>

          {showPoint && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line
                x1={p2d.x}
                y1={p2d.y}
                x2={pOnX2d.x}
                y2={pOnX2d.y}
                stroke={MUTED}
                strokeWidth="1.3"
                strokeDasharray="5 4"
              />
              <line
                x1={p2d.x}
                y1={p2d.y}
                x2={pOnY2d.x}
                y2={pOnY2d.y}
                stroke={MUTED}
                strokeWidth="1.3"
                strokeDasharray="5 4"
              />
              <circle cx={pOnX2d.x} cy={pOnX2d.y} r="2.8" fill={MUTED} />
              <circle cx={pOnY2d.x} cy={pOnY2d.y} r="2.8" fill={MUTED} />
              <text x={(p2d.x + pOnX2d.x) / 2} y={pOnX2d.y - 8} textAnchor="middle" fontSize="10.5" fill={MUTED}>
                x = 0,346 m
              </text>
              <text x={pOnY2d.x - 8} y={(p2d.y + pOnY2d.y) / 2} textAnchor="end" fontSize="10.5" fill={MUTED}>
                y = 0,2 m
              </text>
            </motion.g>
          )}

          {showMoment && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Arrow from={O} to={P} color={ARM} marker="ex-m3d2-arm" width={2.4} />
              <Arrow from={O} to={M_VEC} color={MOMENT} marker="ex-m3d2-moment" width={3.8} />
              <text x={mEnd2d.x - 8} y={mEnd2d.y - 8} textAnchor="end" fontSize="12" fontWeight="700" fill={MOMENT}>
                M_O
              </text>
              <text x={mEnd2d.x - 6} y={mEnd2d.y + 7} textAnchor="end" fontSize="9.5" fill={MOMENT}>
                (−40; 69,3; 0)
              </text>
            </motion.g>
          )}

          {showProjection && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Arrow from={O} to={M_Y_END} color={AXIS_Y} marker="ex-m3d2-y" width={4.5} />
              <line
                x1={mEnd2d.x}
                y1={mEnd2d.y}
                x2={myEnd2d.x}
                y2={myEnd2d.y}
                stroke={GUIDE}
                strokeWidth="1.3"
                strokeDasharray="4 4"
              />
              <text x={myEnd2d.x + 8} y={myEnd2d.y + 20} fontSize="12" fontWeight="700" fill={AXIS_Y}>
                M_y = 69,3 N·m
              </text>
            </motion.g>
          )}

          {showCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={p2d.x} y1={p2d.y} x2={pOnY2d.x} y2={pOnY2d.y} stroke={AXIS_Y} strokeWidth="2.4" />
              <text
                x={(p2d.x + pOnY2d.x) / 2 + 6}
                y={(p2d.y + pOnY2d.y) / 2 + 30}
                textAnchor="middle"
                fontSize="10.5"
                fill={AXIS_Y}
              >
                d = x = 0,346 m
              </text>
              <rect x="292" y="268" width="142" height="42" rx="8" fill="#eef7f1" stroke={AXIS_Y} strokeWidth="1.2" />
              <text x="363" y="285" textAnchor="middle" fontSize="10" fill={MUTED}>
                kontrola z rzutu
              </text>
              <text x="363" y="301" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={AXIS_Y}>
                200 · 0,346 = 69,3
              </text>
            </motion.g>
          )}

          {showSign && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <path
                d={`M ${o2d.x + 30} ${o2d.y - 30} A 42 42 0 1 1 ${o2d.x + 30} ${o2d.y + 30}`}
                fill="none"
                stroke={AXIS_Y}
                strokeWidth="2.2"
                markerEnd="url(#ex-m3d2-rot)"
              />
              <text x={o2d.x + 52} y={o2d.y + 4} fontSize="10.5" fontWeight="700" fill={AXIS_Y}>
                +M_y
              </text>
              <text x={o2d.x + 52} y={o2d.y + 18} fontSize="10" fill={AXIS_Y}>
                zgodny z +y
              </text>
              <rect x="292" y="214" width="142" height="24" rx="7" fill="#eef7f1" stroke={AXIS_Y} strokeWidth="1" />
              <text x="363" y="230" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={AXIS_Y}>
                znak dodatni
              </text>
            </motion.g>
          )}

          <text x="230" y="328" textAnchor="middle" fontSize="12" fill={INK}>
            {status[index]}
          </text>
        </svg>
      </div>
    </div>
  )
}
