import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const LOAD = '#ff6b45'
const REACTION = '#2f7d5b'
const CABLE = '#4f6df5'
const MOMENT = '#a970dd'
const PLATE = '#eef3fb'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'

type V3 = { x: number; y: number; z: number }

const OX = 95
const OY = 280
const S = 62
const DY_X = 0.6
const DY_Y = -0.35

const project = (p: V3) => ({
  x: OX + S * (p.x + p.y * DY_X),
  y: OY - S * p.z + S * p.y * DY_Y,
})

const A: V3 = { x: 0, y: 0, z: 0 }
const B: V3 = { x: 2, y: 0, z: 0 }
const C: V3 = { x: 2, y: 3, z: 0 }
const D: V3 = { x: 0, y: 3, z: 0 }
const G: V3 = { x: 1, y: 1.5, z: 0 }

const a2d = project(A)
const b2d = project(B)
const c2d = project(C)
const d2d = project(D)
const g2d = project(G)

const gTip = project({ x: 1, y: 1.5, z: -0.9 })
const pTip = project({ x: 0, y: 3, z: -0.78 })
const hTip = project({ x: 2.8, y: 3, z: 0 })
const cableTip = project({ x: 2, y: 3, z: 1.35 })
const cableAnchor = project({ x: 2, y: 3, z: 2 })
const axTip = project({ x: -0.9, y: 0, z: 0 })
const ayTip = project({ x: 0, y: -1.0, z: 0 })
const azTip = project({ x: 0, y: 0, z: 1.05 })
const byTip = project({ x: 2, y: 1.0, z: 0 })
const bzTip = project({ x: 2, y: 0, z: -0.62 })

const platePoints = [a2d, b2d, c2d, d2d]
const platePath = platePoints.map((point) => `${point.x},${point.y}`).join(' ')

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
      transition={{ duration: 0.32 }}
    />
  )
}

function SupportBase({ at }: { at: { x: number; y: number } }) {
  return (
    <g stroke={MUTED} fill="none" strokeWidth="1.3">
      <line x1={at.x - 11} y1={at.y + 9} x2={at.x + 11} y2={at.y + 9} />
      <line x1={at.x - 8} y1={at.y + 9} x2={at.x - 13} y2={at.y + 17} />
      <line x1={at.x - 2} y1={at.y + 9} x2={at.x - 7} y2={at.y + 17} />
      <line x1={at.x + 4} y1={at.y + 9} x2={at.x - 1} y2={at.y + 17} />
      <line x1={at.x + 10} y1={at.y + 9} x2={at.x + 5} y2={at.y + 17} />
    </g>
  )
}

export function Full3DTaskAnimation({ index }: SolutionAnimationProps) {
  const showCable = index >= 1
  const showHinge = index >= 2
  const showForces = index >= 3
  const showCheck = index >= 4
  const showSense = index >= 5

  const status = [
    'Płyta ABCD, obciążenia G, P, H i trzy więzy',
    'ΣM_A: S = 14 kN z równania względem osi x',
    'ΣM_A: B_z = −8 kN, B_y = 9 kN',
    'ΣF: A_x = −6, A_y = −9, A_z = 14 kN',
    'Kontrola względem B: ΣM_B = (0, 0, 0)',
    'Kontrola sensu: 14 − 8 + 14 = 20 = G + P',
  ][index]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Pełne zadanie równowagi przestrzennej płyty">
          <title>Pełne zadanie 3D</title>
          <desc>Płyta z obciążeniem dwukierunkowym, trzema więzami i kontrolą momentów względem B.</desc>
          <defs>
            <marker
              id="ex-zadania3d-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="ex-zadania3d-react"
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
              id="ex-zadania3d-cable"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={CABLE} />
            </marker>
            <marker
              id="ex-zadania3d-moment"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
          </defs>

          <g stroke={AXIS} strokeWidth="1.3" fill="none">
            <line x1={a2d.x} y1={a2d.y} x2={a2d.x + 350} y2={a2d.y} />
            <line x1={a2d.x} y1={a2d.y} x2={a2d.x + 150} y2={a2d.y - 72} />
            <line x1={a2d.x} y1={a2d.y} x2={a2d.x} y2={a2d.y - 190} />
          </g>
          <g fontSize="12" fill={INK}>
            <text x={a2d.x + 342} y={a2d.y - 8}>
              x
            </text>
            <text x={a2d.x + 154} y={a2d.y - 82}>
              y
            </text>
            <text x={a2d.x + 8} y={a2d.y - 178}>
              z
            </text>
          </g>

          <polygon points={platePath} fill={PLATE} stroke={MUTED} strokeWidth="1.6" />
          <g fontSize="11" fill={INK}>
            <text x={a2d.x - 16} y={a2d.y + 15}>
              A
            </text>
            <text x={b2d.x + 8} y={b2d.y + 15}>
              B
            </text>
            <text x={c2d.x + 8} y={c2d.y + 4}>
              C
            </text>
            <text x={d2d.x - 16} y={d2d.y + 4}>
              D
            </text>
          </g>
          <circle cx={a2d.x} cy={a2d.y} r="3.2" fill={INK} />
          <circle cx={b2d.x} cy={b2d.y} r="3.2" fill={INK} />
          <circle cx={c2d.x} cy={c2d.y} r="3.2" fill={INK} />
          <circle cx={d2d.x} cy={d2d.y} r="3.2" fill={INK} />

          <SupportBase at={a2d} />
          <SupportBase at={b2d} />
          <line x1={b2d.x - 15} y1={b2d.y} x2={b2d.x + 15} y2={b2d.y} stroke={MUTED} strokeWidth="2" />

          <Arrow from={G} to={{ x: 1, y: 1.5, z: -0.9 }} color={LOAD} marker="ex-zadania3d-load" width={3.2} />
          <text x={g2d.x - 8} y={gTip.y - 2} textAnchor="end" fontSize="10.5" fontWeight="700" fill={LOAD}>
            G = 12 kN
          </text>
          <circle cx={g2d.x} cy={g2d.y} r="2.6" fill={LOAD} />

          <Arrow from={D} to={{ x: 0, y: 3, z: -0.78 }} color={LOAD} marker="ex-zadania3d-load" width={3.2} />
          <text x={d2d.x - 8} y={d2d.y + 26} textAnchor="end" fontSize="10.5" fontWeight="700" fill={LOAD}>
            P = 8 kN
          </text>

          <Arrow from={C} to={{ x: 2.8, y: 3, z: 0 }} color={LOAD} marker="ex-zadania3d-load" width={3.2} />
          <text x={hTip.x + 6} y={c2d.y - 6} fontSize="10.5" fontWeight="700" fill={LOAD}>
            H = 6 kN
          </text>

          <line
            x1={cableAnchor.x - 14}
            y1={cableAnchor.y}
            x2={cableAnchor.x + 14}
            y2={cableAnchor.y}
            stroke={MUTED}
            strokeWidth="1.4"
          />
          <line
            x1={c2d.x}
            y1={c2d.y}
            x2={cableAnchor.x}
            y2={cableAnchor.y}
            stroke={MUTED}
            strokeWidth="1.3"
            strokeDasharray="5 4"
          />
          <circle cx={cableAnchor.x} cy={cableAnchor.y} r="2.8" fill={MUTED} />

          {showCable && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Arrow from={C} to={{ x: 2, y: 3, z: 1.35 }} color={CABLE} marker="ex-zadania3d-cable" width={3.4} />
              <text x={cableTip.x + 9} y={cableTip.y + 4} fontSize="10.5" fontWeight="700" fill={CABLE}>
                S = 14 kN
              </text>
              <text x={cableTip.x + 9} y={cableTip.y + 17} fontSize="9" fill={CABLE}>
                cięgno w C
              </text>
              <g stroke={MOMENT} strokeWidth="1.2" strokeDasharray="4 4" fill="none" opacity="0.8">
                <line x1={a2d.x} y1={a2d.y} x2={c2d.x} y2={c2d.y} />
                <line x1={a2d.x} y1={a2d.y} x2={d2d.x} y2={d2d.y} />
                <line x1={a2d.x} y1={a2d.y} x2={g2d.x} y2={g2d.y} />
              </g>
              <text x={a2d.x + 6} y={a2d.y - 22} fontSize="9" fill={MOMENT}>
                momenty względem A
              </text>
            </motion.g>
          )}

          {showHinge && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.42 }}>
              <Arrow from={B} to={{ x: 2, y: 1.0, z: 0 }} color={REACTION} marker="ex-zadania3d-react" width={3} />
              <Arrow from={B} to={{ x: 2, y: 0, z: -0.62 }} color={REACTION} marker="ex-zadania3d-react" width={3} />
              <text x={byTip.x + 7} y={byTip.y - 2} fontSize="10" fontWeight="700" fill={REACTION}>
                B_y = 9 kN
              </text>
              <text x={bzTip.x + 6} y={bzTip.y - 8} fontSize="10" fontWeight="700" fill={REACTION}>
                B_z = −8 kN
              </text>
            </motion.g>
          )}

          {showForces && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.42 }}>
              <Arrow from={A} to={{ x: -0.9, y: 0, z: 0 }} color={REACTION} marker="ex-zadania3d-react" width={3} />
              <Arrow from={A} to={{ x: 0, y: -1.0, z: 0 }} color={REACTION} marker="ex-zadania3d-react" width={3} />
              <Arrow from={A} to={{ x: 0, y: 0, z: 1.05 }} color={REACTION} marker="ex-zadania3d-react" width={3} />
              <text x={axTip.x - 2} y={axTip.y - 10} fontSize="10" fontWeight="700" fill={REACTION}>
                A_x = −6 kN
              </text>
              <text x={ayTip.x - 30} y={ayTip.y + 18} fontSize="10" fontWeight="700" fill={REACTION}>
                A_y = −9 kN
              </text>
              <text x={azTip.x + 7} y={azTip.y + 4} fontSize="10" fontWeight="700" fill={REACTION}>
                A_z = 14 kN
              </text>
            </motion.g>
          )}

          {showCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.42 }}>
              <g stroke={MOMENT} strokeWidth="1.2" strokeDasharray="4 4" fill="none" opacity="0.75">
                <line x1={b2d.x} y1={b2d.y} x2={a2d.x} y2={a2d.y} />
                <line x1={b2d.x} y1={b2d.y} x2={c2d.x} y2={c2d.y} />
                <line x1={b2d.x} y1={b2d.y} x2={d2d.x} y2={d2d.y} />
                <line x1={b2d.x} y1={b2d.y} x2={g2d.x} y2={g2d.y} />
              </g>
              <rect x="286" y="150" width="150" height="42" rx="8" fill="#eef7f1" stroke={REACTION} strokeWidth="1.2" />
              <text x="361" y="167" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={REACTION}>
                ΣM_B = (0, 0, 0)
              </text>
              <text x="361" y="183" textAnchor="middle" fontSize="9" fill={MUTED}>
                kontrola poza równaniem A
              </text>
            </motion.g>
          )}

          {showSense && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.42 }}>
              <rect x="286" y="204" width="150" height="52" rx="8" fill="#eef7f1" stroke={REACTION} strokeWidth="1.2" />
              <text x="361" y="222" textAnchor="middle" fontSize="10" fontWeight="700" fill={REACTION}>
                A_z + B_z + S = 20 kN
              </text>
              <text x="361" y="238" textAnchor="middle" fontSize="10" fontWeight="700" fill={REACTION}>
                G + P = 20 kN
              </text>
              <text x="361" y="251" textAnchor="middle" fontSize="8.5" fill={MUTED}>
                bilans pionowy się zgadza
              </text>
              <line
                x1={azTip.x}
                y1={azTip.y}
                x2={cableTip.x}
                y2={cableTip.y}
                stroke={REACTION}
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.6"
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
