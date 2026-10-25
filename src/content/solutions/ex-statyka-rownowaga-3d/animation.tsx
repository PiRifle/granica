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

const OX = 108
const OY = 280
const S = 75
const DY_X = 0.6
const DY_Y = -0.35

const project = (p: V3) => ({
  x: OX + S * (p.x + p.y * DY_X),
  y: OY - S * p.z + S * p.y * DY_Y,
})

const A: V3 = { x: 0, y: 0, z: 0 }
const B: V3 = { x: 2, y: 0, z: 0 }
const C: V3 = { x: 2, y: 2, z: 0 }
const D: V3 = { x: 0, y: 2, z: 0 }
const E: V3 = { x: 2, y: 0, z: 2 }
const G: V3 = { x: 1, y: 1, z: 0 }

const a2d = project(A)
const b2d = project(B)
const c2d = project(C)
const d2d = project(D)
const e2d = project(E)
const g2d = project(G)

const cableTip = project({ x: 1.3, y: 0.7, z: 1.3 })
const gTip = project({ x: 1, y: 1, z: -0.8 })
const pTip = project({ x: 2, y: 2, z: -0.8 })
const byTip = project({ x: 2, y: 1.5, z: 0 })
const bzTip = project({ x: 2, y: 0, z: 1.25 })
const axTip = project({ x: -1.2, y: 0, z: 0 })
const azLabel = { x: a2d.x - 8, y: a2d.y + 38 }

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
      transition={{ duration: 0.35 }}
    />
  )
}

function SupportBase({ at }: { at: { x: number; y: number } }) {
  return (
    <g stroke={MUTED} fill="none" strokeWidth="1.3">
      <line x1={at.x - 12} y1={at.y + 10} x2={at.x + 12} y2={at.y + 10} />
      <line x1={at.x - 9} y1={at.y + 10} x2={at.x - 14} y2={at.y + 18} />
      <line x1={at.x - 3} y1={at.y + 10} x2={at.x - 8} y2={at.y + 18} />
      <line x1={at.x + 3} y1={at.y + 10} x2={at.x - 2} y2={at.y + 18} />
      <line x1={at.x + 9} y1={at.y + 10} x2={at.x + 4} y2={at.y + 18} />
    </g>
  )
}

export function Equilibrium3DAnimation({ index }: SolutionAnimationProps) {
  const showCable = index >= 1
  const showSupports = index >= 2
  const showMoments = index >= 3
  const showForces = index >= 4
  const showCheck = index >= 5

  const status = [
    'Płyta ABCD, ciężar G, siła P i cięgno DE',
    'DE = (2, −2, 2) m, |DE| = 2√3 m',
    'Więzy: A — 3 reakcje, B — 2, cięgno — 1',
    'S = 11√3 ≈ 19,05 kN, B_z = 11 kN, B_y = 11 kN',
    'A_x = −11 kN, A_y = 0, A_z = −6 kN',
    'ΣM_B = 0; A_z działa w dół — płyta nie odrywa się',
  ][index]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Równowaga płyty na trzech podporach">
          <title>Równowaga przestrzenna płyty</title>
          <desc>Płyta ABCD, obciążenia pionowe, cięgno DE i reakcje podpór.</desc>
          <defs>
            <marker
              id="ex-rownowaga3d-load"
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
              id="ex-rownowaga3d-react"
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
              id="ex-rownowaga3d-cable"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={CABLE} />
            </marker>
          </defs>

          <g stroke={AXIS} strokeWidth="1.3" fill="none">
            <line x1={a2d.x} y1={a2d.y} x2={a2d.x + 330} y2={a2d.y} />
            <line x1={a2d.x} y1={a2d.y} x2={a2d.x + 150} y2={a2d.y - 70} />
            <line x1={a2d.x} y1={a2d.y} x2={a2d.x} y2={a2d.y - 210} />
          </g>
          <g fontSize="12" fill={INK}>
            <text x={a2d.x + 322} y={a2d.y - 8}>
              x
            </text>
            <text x={a2d.x + 154} y={a2d.y - 80}>
              y
            </text>
            <text x={a2d.x + 8} y={a2d.y - 198}>
              z
            </text>
          </g>

          <polygon points={platePath} fill={PLATE} stroke={MUTED} strokeWidth="1.6" />
          <g fontSize="11" fill={INK}>
            <text x={a2d.x - 16} y={a2d.y + 16}>
              A
            </text>
            <text x={b2d.x + 8} y={b2d.y + 16}>
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
          <line x1={b2d.x - 16} y1={b2d.y} x2={b2d.x + 16} y2={b2d.y} stroke={MUTED} strokeWidth="2" />

          <Arrow from={G} to={{ x: 1, y: 1, z: -0.8 }} color={LOAD} marker="ex-rownowaga3d-load" width={3.2} />
          <text x={g2d.x - 8} y={gTip.y - 8} textAnchor="end" fontSize="11" fontWeight="700" fill={LOAD}>
            G = 10 kN
          </text>
          <circle cx={g2d.x} cy={g2d.y} r="2.6" fill={LOAD} />

          <Arrow from={C} to={{ x: 2, y: 2, z: -0.8 }} color={LOAD} marker="ex-rownowaga3d-load" width={3.2} />
          <text x={c2d.x + 10} y={pTip.y + 4} fontSize="11" fontWeight="700" fill={LOAD}>
            P = 6 kN
          </text>

          <line x1={e2d.x - 14} y1={e2d.y} x2={e2d.x + 14} y2={e2d.y} stroke={MUTED} strokeWidth="1.4" />
          <line x1={d2d.x} y1={d2d.y} x2={e2d.x} y2={e2d.y} stroke={MUTED} strokeWidth="1.4" strokeDasharray="5 4" />
          <circle cx={e2d.x} cy={e2d.y} r="3" fill={MUTED} />
          <text x={e2d.x + 8} y={e2d.y - 6} fontSize="11" fill={INK}>
            E
          </text>

          {showCable && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={d2d.x} y1={d2d.y} x2={e2d.x} y2={e2d.y} stroke={CABLE} strokeWidth="3" strokeDasharray="7 4" />
              <Arrow from={D} to={{ x: 1.3, y: 0.7, z: 1.3 }} color={CABLE} marker="ex-rownowaga3d-cable" width={3.2} />
              <text x={cableTip.x + 8} y={cableTip.y + 4} fontSize="11" fontWeight="700" fill={CABLE}>
                S = 19,05 kN
              </text>
              <text x={(d2d.x + e2d.x) / 2 + 8} y={(d2d.y + e2d.y) / 2} fontSize="9.5" fill={CABLE}>
                |DE| = 2√3 m
              </text>
            </motion.g>
          )}

          {showSupports && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <g stroke={MUTED} strokeWidth="1.4" strokeDasharray="4 3" fill="none">
                <line x1={a2d.x} y1={a2d.y} x2={a2d.x + 34} y2={a2d.y} />
                <line x1={a2d.x} y1={a2d.y} x2={a2d.x + 20} y2={a2d.y - 32} />
                <line x1={a2d.x} y1={a2d.y} x2={a2d.x} y2={a2d.y - 36} />
                <line x1={b2d.x} y1={b2d.y} x2={b2d.x + 6} y2={b2d.y - 34} />
                <line x1={b2d.x} y1={b2d.y} x2={b2d.x} y2={b2d.y - 38} />
              </g>
              <text x={a2d.x + 38} y={a2d.y + 4} fontSize="9" fill={MUTED}>
                Ax, Ay, Az
              </text>
              <text x={b2d.x + 10} y={b2d.y - 30} fontSize="9" fill={MUTED}>
                By, Bz
              </text>
              <text x={e2d.x + 8} y={e2d.y + 14} fontSize="9" fill={MUTED}>
                S
              </text>
            </motion.g>
          )}

          {showMoments && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <g stroke={MOMENT} strokeWidth="1.3" strokeDasharray="5 4" fill="none" opacity="0.8">
                <line x1={a2d.x} y1={a2d.y} x2={g2d.x} y2={g2d.y} />
                <line x1={a2d.x} y1={a2d.y} x2={c2d.x} y2={c2d.y} />
                <line x1={a2d.x} y1={a2d.y} x2={d2d.x} y2={d2d.y} />
                <line x1={a2d.x} y1={a2d.y} x2={b2d.x} y2={b2d.y} />
              </g>
              <Arrow
                from={D}
                to={{ x: 1.3, y: 0.7, z: 1.3 }}
                color={REACTION}
                marker="ex-rownowaga3d-react"
                width={3.4}
              />
              <Arrow from={B} to={{ x: 2, y: 1.5, z: 0 }} color={REACTION} marker="ex-rownowaga3d-react" width={3} />
              <Arrow from={B} to={{ x: 2, y: 0, z: 1.25 }} color={REACTION} marker="ex-rownowaga3d-react" width={3} />
              <text x={byTip.x + 8} y={byTip.y + 4} fontSize="10" fontWeight="700" fill={REACTION}>
                B_y = 11 kN
              </text>
              <text x={bzTip.x + 8} y={bzTip.y} fontSize="10" fontWeight="700" fill={REACTION}>
                B_z = 11 kN
              </text>
              <text x={a2d.x + 6} y={a2d.y - 56} fontSize="9.5" fill={MOMENT}>
                momenty względem A
              </text>
            </motion.g>
          )}

          {showForces && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <Arrow from={A} to={{ x: -1.2, y: 0, z: 0 }} color={REACTION} marker="ex-rownowaga3d-react" width={3} />
              <Arrow from={A} to={{ x: 0, y: 0, z: -0.5 }} color={REACTION} marker="ex-rownowaga3d-react" width={3} />
              <text x={axTip.x + 4} y={axTip.y + 30} fontSize="10" fontWeight="700" fill={REACTION}>
                A_x = −11 kN
              </text>
              <text x={azLabel.x} y={azLabel.y} textAnchor="end" fontSize="10" fontWeight="700" fill={REACTION}>
                A_z = −6 kN
              </text>
              <text x={a2d.x + 10} y={a2d.y + 24} fontSize="9.5" fill={MUTED}>
                A_y = 0
              </text>
            </motion.g>
          )}

          {showCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <g stroke={MOMENT} strokeWidth="1.2" strokeDasharray="4 4" fill="none" opacity="0.7">
                <line x1={b2d.x} y1={b2d.y} x2={g2d.x} y2={g2d.y} />
                <line x1={b2d.x} y1={b2d.y} x2={c2d.x} y2={c2d.y} />
                <line x1={b2d.x} y1={b2d.y} x2={d2d.x} y2={d2d.y} />
                <line x1={b2d.x} y1={b2d.y} x2={a2d.x} y2={a2d.y} />
              </g>
              <rect x="292" y="46" width="142" height="42" rx="8" fill="#eef7f1" stroke={REACTION} strokeWidth="1.2" />
              <text x="363" y="63" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={REACTION}>
                ΣM_B = (0, 0, 0)
              </text>
              <text x="363" y="79" textAnchor="middle" fontSize="9.5" fill={REACTION}>
                kontrola niezależna
              </text>
              <line x1={a2d.x} y1={a2d.y + 20} x2={a2d.x} y2={a2d.y + 34} stroke={REACTION} strokeWidth="2" />
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
