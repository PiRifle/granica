import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE = '#ff6b45'
const MOMENT_1 = '#a970dd'
const MOMENT_2 = '#d05c8f'
const RESULT = '#27835a'
const ARM = '#4f6df5'
const AXIS = '#9aa5b1'
const MUTED = '#87929d'
const INK = '#17202a'

type V3 = { x: number; y: number; z: number }

const OX = 170
const OY = 260
const S = 52
const SYX = 0.55
const SYY = -0.32
const SZ = 42
const M_SCALE = 0.25
const F_SCALE = 0.35

const project = (p: V3) => ({
  x: OX + S * (p.x + SYX * p.y),
  y: OY - SZ * p.z + S * SYY * p.y,
})

const add = (a: V3, b: V3): V3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z })
const scale = (v: V3, k: number): V3 => ({ x: v.x * k, y: v.y * k, z: v.z * k })

const A: V3 = { x: 0, y: 1, z: 2 }
const B: V3 = { x: 2, y: 0, z: 1 }
const F1: V3 = { x: 3, y: -2, z: 1 }
const F2: V3 = { x: -3, y: 2, z: -1 }
const M1: V3 = { x: 5, y: 6, z: -3 }
const M2: V3 = { x: -2, y: -1, z: 4 }
const MSUM: V3 = { x: 3, y: 5, z: 1 }
const OPRIME: V3 = { x: 1, y: 1, z: 1 }

const o2d = project({ x: 0, y: 0, z: 0 })
const a2d = project(A)
const b2d = project(B)
const f1End = project(add(A, scale(F1, F_SCALE)))
const f2End = project(add(B, scale(F2, F_SCALE)))
const m1End = project(scale(M1, M_SCALE))
const op2d = project(OPRIME)
const axisX = project({ x: 5, y: 0, z: 0 })
const axisY = project({ x: 0, y: 5, z: 0 })
const axisZ = project({ x: 0, y: 0, z: 3.4 })

const status = [
  'F₂ = −F₁, punkty A i B wyznaczają ramię pary',
  'R = F₁ + F₂ = 0 — układ jest parą sił',
  'M₁ = r_A × F₁ = (5, 6, −3) kN·m',
  'M₂ = r_B × F₂ = (−2, −1, 4) kN·m',
  'M = M₁ + M₂ = (3, 5, 1) kN·m',
  'R = 0 ⇒ M_O′ = M_O; kontrola r_BA × F₁ = M',
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
      strokeDasharray={dashed ? '5 4' : undefined}
      markerEnd={`url(#${marker})`}
    />
  )
}

export function CoupleReductionAnimation({ index }: SolutionAnimationProps) {
  const badgeLabel = ['para sił', 'wektor główny', 'moment F₁', 'moment F₂', 'moment główny', 'kontrola'][index]
  const badgeValue = ['F₂ = −F₁', 'R = 0', 'M₁ = (5, 6, −3)', 'M₂ = (−2, −1, 4)', 'M = (3, 5, 1)', 'M_O′ = M_O'][index]
  const m2From = index >= 4 ? scale(M1, M_SCALE) : { x: 0, y: 0, z: 0 }
  const m2Tip = index >= 4 ? scale(MSUM, M_SCALE) : scale(M2, M_SCALE)
  const m2From2d = project(m2From)
  const m2Tip2d = project(m2Tip)
  const showMoments = index >= 2
  const showBothMoments = index >= 3
  const showSum = index >= 4
  const showCheck = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Redukcja pary sił do bieguna">
          <title>Para sił i jej moment główny</title>
          <desc>Dwie przeciwne siły w punktach A i B, ich momenty względem O oraz moment pary.</desc>
          <defs>
            <marker
              id="ex-red3d2-force"
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
              id="ex-red3d2-m1"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MOMENT_1} />
            </marker>
            <marker
              id="ex-red3d2-m2"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MOMENT_2} />
            </marker>
            <marker
              id="ex-red3d2-m"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={RESULT} />
            </marker>
            <marker
              id="ex-red3d2-arm"
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

          <g stroke={AXIS} strokeWidth="1.3" fill="none">
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
            <text x={a2d.x - 18} y={a2d.y - 8}>
              A
            </text>
            <text x={b2d.x + 8} y={b2d.y + 4}>
              B
            </text>
          </g>

          <circle cx={o2d.x} cy={o2d.y} r="3.2" fill={INK} />
          <circle cx={a2d.x} cy={a2d.y} r="3.2" fill={INK} />
          <circle cx={b2d.x} cy={b2d.y} r="3.2" fill={INK} />
          <line x1={a2d.x} y1={a2d.y} x2={b2d.x} y2={b2d.y} stroke={MUTED} strokeWidth="1.2" strokeDasharray="5 4" />

          <Arrow from={A} to={add(A, scale(F1, F_SCALE))} color={FORCE} marker="ex-red3d2-force" width={4} />
          <Arrow from={B} to={add(B, scale(F2, F_SCALE))} color={FORCE} marker="ex-red3d2-force" width={4} />
          <text x={f1End.x + 8} y={f1End.y - 4} fontSize="11.5" fill={FORCE}>
            F₁
          </text>
          <text x={f2End.x + 8} y={f2End.y + 12} fontSize="11.5" fill={FORCE}>
            F₂ = −F₁
          </text>

          {showMoments && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Arrow from={{ x: 0, y: 0, z: 0 }} to={A} color={ARM} marker="ex-red3d2-arm" width={2.2} />
              <Arrow
                from={{ x: 0, y: 0, z: 0 }}
                to={scale(M1, M_SCALE)}
                color={MOMENT_1}
                marker="ex-red3d2-m1"
                width={3.6}
              />
              <text x={m1End.x + 8} y={m1End.y + 4} fontSize="10.5" fontWeight="700" fill={MOMENT_1}>
                M₁
              </text>
            </motion.g>
          )}

          {showBothMoments && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Arrow from={{ x: 0, y: 0, z: 0 }} to={B} color={ARM} marker="ex-red3d2-arm" width={2.2} />
              <Arrow from={m2From} to={m2Tip} color={MOMENT_2} marker="ex-red3d2-m2" width={3.6} />
              <text
                x={(m2From2d.x + m2Tip2d.x) / 2 + 8}
                y={(m2From2d.y + m2Tip2d.y) / 2 + 4}
                fontSize="10.5"
                fontWeight="700"
                fill={MOMENT_2}
              >
                M₂
              </text>
            </motion.g>
          )}

          {showSum && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Arrow
                from={{ x: 0, y: 0, z: 0 }}
                to={scale(MSUM, M_SCALE)}
                color={RESULT}
                marker="ex-red3d2-m"
                width={4.4}
              />
            </motion.g>
          )}

          {showCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={b2d.x} y1={b2d.y} x2={a2d.x} y2={a2d.y} stroke={RESULT} strokeWidth="2" strokeDasharray="6 4" />
              <circle cx={op2d.x} cy={op2d.y} r="3" fill={RESULT} />
              <text x={op2d.x + 8} y={op2d.y - 6} fontSize="11" fontWeight="700" fill={RESULT}>
                O′
              </text>
              <Arrow
                from={OPRIME}
                to={add(OPRIME, scale(MSUM, M_SCALE))}
                color={RESULT}
                marker="ex-red3d2-m"
                width={2.4}
                dashed
              />
              <text x={(a2d.x + b2d.x) / 2 + 10} y={(a2d.y + b2d.y) / 2 - 6} fontSize="10" fill={RESULT}>
                r_BA
              </text>
            </motion.g>
          )}

          <rect x="306" y="42" width="136" height="48" rx="8" fill="#eef7f1" stroke={RESULT} strokeWidth="1.2" />
          <text x="374" y="60" textAnchor="middle" fontSize="10" fill={MUTED}>
            {badgeLabel}
          </text>
          <text x="374" y="78" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={RESULT}>
            {badgeValue}
          </text>

          <text x="230" y="328" textAnchor="middle" fontSize="12" fill={INK}>
            {status[index]}
          </text>
        </svg>
      </div>
    </div>
  )
}
