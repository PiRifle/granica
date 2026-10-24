import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2e9e6b'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const AXIS = '#9aa5b1'
const FILL = '#eef2f9'

const E = { x: 132, y: 154 }
const HALF = 50
const SY = 20

const SX = 100
const TX = 69.282
const AVG = 60
const A = 40
const R = 80
const S1 = 140
const S2 = -20
const THETA = 30
const ALPHA0 = 60

const PLOT_LEFT = 272
const PLOT_RIGHT = 438
const PLOT_Y = 158
const S_MIN = -40
const S_MAX = 160
const SCALE = (PLOT_RIGHT - PLOT_LEFT) / (S_MAX - S_MIN)
const px = (sigma: number) => PLOT_LEFT + (sigma - S_MIN) * SCALE
const py = (tau: number) => PLOT_Y - tau * SCALE

type Pt = { x: number; y: number }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const rad = (degrees: number) => (degrees * Math.PI) / 180
const num = (value: number, digits = 1) => value.toFixed(digits).replace('.', ',')

const pointAt = (origin: Pt, angle: number, radius: number): Pt => ({
  x: origin.x + radius * Math.cos(rad(angle)),
  y: origin.y - radius * Math.sin(rad(angle)),
})

function arcPath(cx: number, cy: number, radius: number, start: number, end: number) {
  const a = pointAt({ x: cx, y: cy }, start, radius)
  const b = pointAt({ x: cx, y: cy }, end, radius)
  const large = Math.abs(end - start) > 180 ? 1 : 0
  const sweep = end >= start ? 0 : 1
  return `M ${a.x} ${a.y} A ${radius} ${radius} 0 ${large} ${sweep} ${b.x} ${b.y}`
}

function Arrow({
  from,
  to,
  color,
  width = 1.8,
  head = 6,
}: {
  from: Pt
  to: Pt
  color: string
  width?: number
  head?: number
}) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy)
  if (length < 0.8) return null
  const ux = dx / length
  const uy = dy / length
  const h = Math.min(head, length * 0.6)
  const bx = to.x - ux * h
  const by = to.y - uy * h
  const w = h * 0.42
  return (
    <g stroke={color} fill={color}>
      <line x1={from.x} y1={from.y} x2={bx} y2={by} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${to.x},${to.y} ${bx - uy * w},${by + ux * w} ${bx + uy * w},${by - ux * w}`} stroke="none" />
    </g>
  )
}

function DataElement({
  shear = 0,
  unknown = false,
  showDirection = false,
}: {
  shear?: number
  unknown?: boolean
  showDirection?: boolean
}) {
  const right = E.x + HALF
  const left = E.x - HALF
  const top = E.y - HALF
  const bottom = E.y + HALF
  const tLen = 28 * Math.min(1, Math.abs(shear) / TX)
  const n = pointAt({ x: 0, y: 0 }, THETA, 1)
  const nEnd = { x: E.x + 96 * n.x, y: E.y + 96 * n.y }
  const arcLabel = pointAt(E, THETA / 2, 50)

  return (
    <g>
      <rect x={left} y={top} width={2 * HALF} height={2 * HALF} rx={2} fill={FILL} stroke={EDGE} strokeWidth={1.7} />
      <line
        x1={left - 10}
        y1={E.y}
        x2={right + 10}
        y2={E.y}
        stroke={AXIS}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.55}
      />
      <line
        x1={E.x}
        y1={top - 10}
        x2={E.x}
        y2={bottom + 10}
        stroke={AXIS}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.55}
      />
      <text x={right + 12} y={E.y + 3} fontSize={8.5} fill={AXIS}>
        x
      </text>
      <text x={E.x + 3} y={top - 13} fontSize={8.5} fill={AXIS}>
        y
      </text>

      <Arrow from={{ x: right + 2, y: E.y - 20 }} to={{ x: right + 32, y: E.y - 20 }} color={BLUE} />
      <Arrow from={{ x: left - 2, y: E.y + 20 }} to={{ x: left - 32, y: E.y + 20 }} color={BLUE} />
      <Arrow from={{ x: E.x + 20, y: top - 2 }} to={{ x: E.x + 20, y: top - 14 }} color={GREEN} />
      <Arrow from={{ x: E.x - 20, y: bottom + 2 }} to={{ x: E.x - 20, y: bottom + 14 }} color={GREEN} />

      {tLen > 1 && (
        <>
          <Arrow
            from={{ x: right, y: E.y + 22 }}
            to={{ x: right, y: E.y + 22 - tLen }}
            color={ORANGE}
            width={1.7}
            head={5}
          />
          <Arrow
            from={{ x: left, y: E.y - 22 }}
            to={{ x: left, y: E.y - 22 + tLen }}
            color={ORANGE}
            width={1.7}
            head={5}
          />
          <Arrow
            from={{ x: E.x - 22, y: top }}
            to={{ x: E.x - 22 + tLen, y: top }}
            color={ORANGE}
            width={1.7}
            head={5}
          />
          <Arrow
            from={{ x: E.x + 22, y: bottom }}
            to={{ x: E.x + 22 - tLen, y: bottom }}
            color={ORANGE}
            width={1.7}
            head={5}
          />
        </>
      )}

      <text x={right + 2} y={E.y - 26} fontSize={9} fill={BLUE}>
        σx = 100
      </text>
      <text x={right + 2} y={E.y + 34} fontSize={9} fill={ORANGE}>
        {unknown ? 'τxy = ?' : 'τxy = 69,28'}
      </text>
      <text x={E.x + 26} y={top - 7} fontSize={9} fill={GREEN}>
        σy = 20
      </text>

      {showDirection && (
        <g>
          <line x1={E.x} y1={E.y} x2={nEnd.x} y2={nEnd.y} stroke={VIOLET} strokeWidth={1.6} strokeDasharray="7 4" />
          <text x={nEnd.x + 4} y={nEnd.y - 4} fontSize={9.5} fontWeight={600} fill={VIOLET}>
            n1 (σ1)
          </text>
          <path d={arcPath(E.x, E.y, 36, 0, THETA)} fill="none" stroke={VIOLET} strokeWidth={1.5} />
          <text x={arcLabel.x} y={arcLabel.y} textAnchor="middle" fontSize={9} fill={VIOLET}>
            θp = 30°
          </text>
        </g>
      )}
    </g>
  )
}

function normalArrow(face: Pt, normal: Pt, value: number, max: number, color: string) {
  const length = 8 + (30 * Math.abs(value)) / max
  const sign = value >= 0 ? 1 : -1
  const base = { x: face.x + normal.x * 2, y: face.y + normal.y * 2 }
  const tip = { x: base.x + sign * length * normal.x, y: base.y + sign * length * normal.y }
  return <Arrow from={base} to={tip} color={color} width={2.1} />
}
function PrincipalElement({ angle, highlight }: { angle: number; highlight: 'principal' | 'check' | 'second' }) {
  const n = pointAt({ x: 0, y: 0 }, angle, 1)
  const p = { x: -n.y, y: n.x }
  const corners = [
    { x: E.x + HALF * n.x + HALF * p.x, y: E.y + HALF * n.y + HALF * p.y },
    { x: E.x + HALF * n.x - HALF * p.x, y: E.y + HALF * n.y - HALF * p.y },
    { x: E.x - HALF * n.x - HALF * p.x, y: E.y - HALF * n.y - HALF * p.y },
    { x: E.x - HALF * n.x + HALF * p.x, y: E.y - HALF * n.y + HALF * p.y },
  ]
  const points = corners.map((corner) => `${corner.x},${corner.y}`).join(' ')
  const axis1End = { x: E.x + 88 * n.x, y: E.y + 88 * n.y }
  const axis1Back = { x: E.x - 88 * n.x, y: E.y - 88 * n.y }
  const axis2End = { x: E.x + 88 * p.x, y: E.y + 88 * p.y }
  const axis2Back = { x: E.x - 88 * p.x, y: E.y - 88 * p.y }
  const label1 = { x: E.x + 84 * n.x + 12, y: E.y + 84 * n.y - 10 }
  const label2 = { x: E.x + 84 * p.x + 8, y: E.y + 84 * p.y - 6 }

  return (
    <g>
      <line
        x1={E.x - HALF - 8}
        y1={E.y}
        x2={E.x + HALF + 8}
        y2={E.y}
        stroke={AXIS}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.45}
      />
      <line
        x1={E.x}
        y1={E.y - HALF - 8}
        x2={E.x}
        y2={E.y + HALF + 8}
        stroke={AXIS}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.45}
      />

      <line
        x1={axis1Back.x}
        y1={axis1Back.y}
        x2={axis1End.x}
        y2={axis1End.y}
        stroke={BLUE}
        strokeWidth={highlight === 'check' ? 2.6 : 1.8}
        opacity={highlight === 'second' ? 0.4 : 1}
      />
      <line
        x1={axis2Back.x}
        y1={axis2Back.y}
        x2={axis2End.x}
        y2={axis2End.y}
        stroke={VIOLET}
        strokeWidth={highlight === 'second' ? 2.6 : 1.8}
        opacity={highlight === 'check' ? 0.4 : 1}
      />

      <polygon points={points} fill={VIOLET} fillOpacity={0.08} stroke={EDGE} strokeWidth={1.5} />

      {normalArrow({ x: E.x + HALF * n.x, y: E.y + HALF * n.y }, n, S1, S1, BLUE)}
      {normalArrow({ x: E.x - HALF * n.x, y: E.y - HALF * n.y }, { x: -n.x, y: -n.y }, S1, S1, BLUE)}
      {normalArrow({ x: E.x + HALF * p.x, y: E.y + HALF * p.y }, p, S2, S1, VIOLET)}
      {normalArrow({ x: E.x - HALF * p.x, y: E.y - HALF * p.y }, { x: -p.x, y: -p.y }, S2, S1, VIOLET)}

      <text x={label1.x} y={label1.y} fontSize={9.5} fontWeight={600} fill={BLUE}>
        σ1 = 140
      </text>
      <text x={label2.x} y={label2.y} fontSize={9.5} fontWeight={600} fill={VIOLET}>
        σ2 = −20
      </text>
      <text x={E.x} y={270} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={GREEN}>
        τnt = 0 na obu płaszczyznach
      </text>

      {highlight === 'check' && (
        <g>
          <path d={arcPath(E.x, E.y, 38, 0, angle)} fill="none" stroke={BLUE} strokeWidth={1.5} />
          <text x={E.x + 50} y={E.y - 10} fontSize={9} fill={BLUE}>
            θp = 30°
          </text>
        </g>
      )}

      {highlight === 'second' && (
        <g>
          <path d={arcPath(E.x, E.y, 42, THETA, THETA + 90)} fill="none" stroke={VIOLET} strokeWidth={1.6} />
          <text x={E.x - 8} y={E.y - 54} fontSize={9} fill={VIOLET}>
            θp2 = 120°
          </text>
        </g>
      )}
    </g>
  )
}

function KnownMohr() {
  const sigmaLine = px(SX)
  return (
    <g>
      <line x1={PLOT_LEFT - 8} y1={PLOT_Y} x2={PLOT_RIGHT + 4} y2={PLOT_Y} stroke={AXIS} strokeWidth={1.1} />
      <line x1={PLOT_LEFT - 8} y1={PLOT_Y - 82} x2={PLOT_LEFT - 8} y2={PLOT_Y + 82} stroke={AXIS} strokeWidth={1.1} />
      <text x={PLOT_RIGHT + 7} y={PLOT_Y + 3} fontSize={8.5} fill={MUTED}>
        σ
      </text>
      <text x={PLOT_LEFT - 4} y={PLOT_Y - 88} fontSize={8.5} fill={MUTED}>
        τ
      </text>

      <circle cx={px(SY)} cy={PLOT_Y} r={3.6} fill={GREEN} />
      <text x={px(SY)} y={PLOT_Y + 17} textAnchor="middle" fontSize={8.5} fill={GREEN}>
        σy = 20
      </text>
      <circle cx={px(SX)} cy={PLOT_Y} r={3.6} fill={BLUE} />
      <text x={px(SX)} y={PLOT_Y + 17} textAnchor="middle" fontSize={8.5} fill={BLUE}>
        σx = 100
      </text>
      <line x1={px(AVG)} y1={PLOT_Y - 4} x2={px(AVG)} y2={PLOT_Y + 4} stroke={MUTED} strokeWidth={1} />
      <text x={px(AVG)} y={PLOT_Y - 9} textAnchor="middle" fontSize={8} fill={MUTED}>
        σavg = 60
      </text>

      <line
        x1={sigmaLine}
        y1={PLOT_Y - 44}
        x2={sigmaLine}
        y2={PLOT_Y + 44}
        stroke={ORANGE}
        strokeWidth={1.3}
        strokeDasharray="5 4"
      />
      <text x={sigmaLine + 7} y={PLOT_Y + 30} fontSize={9} fontWeight={600} fill={ORANGE}>
        τxy = ?
      </text>
      <text x={20} y={42} fontSize={9.5} fill={MUTED}>
        znane: σx, σy i kierunek θp
      </text>
    </g>
  )
}

function InverseMohr({ progress }: { progress: number }) {
  const C = { x: px(AVG), y: PLOT_Y }
  const alpha = ALPHA0 * progress
  const radiusValue = A / Math.max(0.2, Math.cos(rad(alpha)))
  const radius = radiusValue * SCALE
  const Apoint = pointAt(C, alpha, radius)
  const sigmaLine = px(SX)
  const arcMid = pointAt(C, alpha / 2, radius + 16)
  const tau = radiusValue * Math.sin(rad(alpha))

  return (
    <g>
      <line x1={PLOT_LEFT - 8} y1={PLOT_Y} x2={PLOT_RIGHT + 4} y2={PLOT_Y} stroke={AXIS} strokeWidth={1.1} />
      <line x1={PLOT_LEFT - 8} y1={PLOT_Y - 82} x2={PLOT_LEFT - 8} y2={PLOT_Y + 82} stroke={AXIS} strokeWidth={1.1} />
      <text x={PLOT_RIGHT + 7} y={PLOT_Y + 3} fontSize={8.5} fill={MUTED}>
        σ
      </text>
      <text x={PLOT_LEFT - 4} y={PLOT_Y - 88} fontSize={8.5} fill={MUTED}>
        τ
      </text>

      {progress > 0.02 && (
        <line
          x1={sigmaLine}
          y1={PLOT_Y}
          x2={sigmaLine}
          y2={Apoint.y - 7}
          stroke={AXIS}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      )}
      <circle cx={C.x} cy={C.y} r={2.5} fill={MUTED} />
      <motion.circle cx={C.x} cy={C.y} r={radius} fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
      <line x1={C.x} y1={C.y} x2={Apoint.x} y2={Apoint.y} stroke={GREEN} strokeWidth={1.7} strokeDasharray="5 3" />
      <path d={arcPath(C.x, C.y, radius, 0, alpha)} fill="none" stroke={GREEN} strokeWidth={1.6} />
      <motion.circle cx={Apoint.x} cy={Apoint.y} r={5} fill={ORANGE} stroke="#fff" strokeWidth={1.4} />
      <text x={Apoint.x + 8} y={Apoint.y - 5} fontSize={9} fontWeight={600} fill={ORANGE}>
        A
      </text>
      <text x={Apoint.x + 8} y={Apoint.y + 10} fontSize={8.5} fill={ORANGE}>
        τxy = {num(tau)}
      </text>
      <text x={C.x - 8} y={C.y + 18} textAnchor="end" fontSize={8.5} fill={GREEN}>
        R = {num(radiusValue)}
      </text>
      {progress > 0.25 && (
        <text x={arcMid.x} y={arcMid.y} textAnchor="middle" fontSize={9} fontWeight={600} fill={GREEN}>
          2θ = {num(alpha, 0)}°
        </text>
      )}
      <text x={20} y={42} fontSize={9.5} fill={MUTED}>
        konstrukcja: τxy = a·tan2θp
      </text>
    </g>
  )
}

function MirrorElement() {
  const plus = pointAt({ x: 0, y: 0 }, THETA, 1)
  const minus = pointAt({ x: 0, y: 0 }, -THETA, 1)
  const plusEnd = { x: E.x + 96 * plus.x, y: E.y + 96 * plus.y }
  const minusEnd = { x: E.x + 96 * minus.x, y: E.y + 96 * minus.y }

  return (
    <g>
      <rect
        x={E.x - HALF}
        y={E.y - HALF}
        width={2 * HALF}
        height={2 * HALF}
        rx={2}
        fill={FILL}
        stroke={EDGE}
        strokeWidth={1.5}
      />
      <line
        x1={E.x - HALF - 10}
        y1={E.y}
        x2={E.x + HALF + 10}
        y2={E.y}
        stroke={AXIS}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.6}
      />
      <line
        x1={E.x}
        y1={E.y - HALF - 10}
        x2={E.x}
        y2={E.y + HALF + 10}
        stroke={AXIS}
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.6}
      />

      <line
        x1={E.x - 78 * plus.x}
        y1={E.y - 78 * plus.y}
        x2={plusEnd.x}
        y2={plusEnd.y}
        stroke={BLUE}
        strokeWidth={2.2}
      />
      <line
        x1={E.x - 78 * minus.x}
        y1={E.y - 78 * minus.y}
        x2={minusEnd.x}
        y2={minusEnd.y}
        stroke={VIOLET}
        strokeWidth={2.2}
        strokeDasharray="7 4"
      />
      <path d={arcPath(E.x, E.y, 38, 0, THETA)} fill="none" stroke={BLUE} strokeWidth={1.4} />
      <path d={arcPath(E.x, E.y, 38, 0, -THETA)} fill="none" stroke={VIOLET} strokeWidth={1.4} strokeDasharray="4 3" />

      <text x={plusEnd.x + 4} y={plusEnd.y - 5} fontSize={9} fontWeight={600} fill={BLUE}>
        θp = +30°
      </text>
      <text x={minusEnd.x + 4} y={minusEnd.y + 10} fontSize={9} fontWeight={600} fill={VIOLET}>
        θp = −30°
      </text>
      <text x={E.x} y={56} textAnchor="middle" fontSize={9} fill={MUTED}>
        τxy &gt; 0
      </text>
      <text x={E.x} y={250} textAnchor="middle" fontSize={9} fill={MUTED}>
        ten sam stan, przeciwne τ
      </text>
    </g>
  )
}

function MohrPlot({
  markerAngle,
  reveal,
  arcLabel,
  showCircle = true,
  showInitial = true,
  showPrincipal = false,
  showArc = false,
  showMirror = false,
}: {
  markerAngle: number
  reveal: number
  arcLabel?: string
  showCircle?: boolean
  showInitial?: boolean
  showPrincipal?: boolean
  showArc?: boolean
  showMirror?: boolean
}) {
  const C = { x: px(AVG), y: PLOT_Y }
  const r = R * SCALE
  const M = pointAt(C, markerAngle, r)
  const A = { x: px(SX), y: py(TX) }
  const P1 = { x: px(S1), y: PLOT_Y }
  const P2 = { x: px(S2), y: PLOT_Y }
  const Aminus = { x: px(SX), y: py(-TX) }
  const Mminus = pointAt(C, -ALPHA0, r)
  const arc = showArc && Math.abs(ALPHA0 - markerAngle) > 1 ? arcPath(C.x, C.y, r, ALPHA0, markerAngle) : null
  const arcMid = pointAt(C, (ALPHA0 + markerAngle) / 2, r + 16)

  return (
    <g>
      <line x1={PLOT_LEFT - 8} y1={PLOT_Y} x2={PLOT_RIGHT + 4} y2={PLOT_Y} stroke={AXIS} strokeWidth={1.1} />
      <line x1={PLOT_LEFT - 8} y1={PLOT_Y - 82} x2={PLOT_LEFT - 8} y2={PLOT_Y + 82} stroke={AXIS} strokeWidth={1.1} />
      <text x={PLOT_RIGHT + 7} y={PLOT_Y + 3} fontSize={8.5} fill={MUTED}>
        σ
      </text>
      <text x={PLOT_LEFT - 4} y={PLOT_Y - 88} fontSize={8.5} fill={MUTED}>
        τ
      </text>

      {showCircle && (
        <motion.circle
          cx={C.x}
          cy={C.y}
          r={r}
          fill="none"
          stroke={MUTED}
          strokeWidth={1.4}
          strokeDasharray="5 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: reveal }}
          transition={{ duration: 0.35 }}
        />
      )}

      <line x1={C.x} y1={C.y - 4} x2={C.x} y2={C.y + 4} stroke={MUTED} strokeWidth={1} />
      {showPrincipal && (
        <>
          <circle cx={P1.x} cy={P1.y} r={4} fill={BLUE} />
          <circle cx={P2.x} cy={P2.y} r={4} fill={VIOLET} />
          <text x={P1.x} y={PLOT_Y + 16} textAnchor="middle" fontSize={8.5} fill={BLUE}>
            σ1 = 140
          </text>
          <text x={P2.x} y={PLOT_Y + 16} textAnchor="middle" fontSize={8.5} fill={VIOLET}>
            σ2 = −20
          </text>
          <text x={C.x} y={PLOT_Y - 7} textAnchor="middle" fontSize={8} fill={MUTED}>
            σavg = 60
          </text>
        </>
      )}

      {showInitial && (
        <>
          <motion.circle
            cx={A.x}
            cy={A.y}
            r={3.6}
            fill={MUTED}
            initial={{ opacity: 0 }}
            animate={{ opacity: reveal }}
          />
          <text x={A.x + 5} y={A.y - 5} fontSize={8.5} fill={MUTED}>
            A
          </text>
        </>
      )}

      {arc && <path d={arc} fill="none" stroke={GREEN} strokeWidth={1.6} />}
      {arc && arcLabel && (
        <text x={arcMid.x} y={arcMid.y} textAnchor="middle" fontSize={9} fontWeight={600} fill={GREEN}>
          {arcLabel}
        </text>
      )}

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: reveal }} transition={{ duration: 0.25 }}>
        <line
          x1={M.x}
          y1={M.y}
          x2={M.x}
          y2={PLOT_Y}
          stroke={ORANGE}
          strokeWidth={1}
          strokeDasharray="3 3"
          opacity={0.55}
        />
        <motion.circle cx={M.x} cy={M.y} r={5} fill={ORANGE} stroke="#fff" strokeWidth={1.4} />
      </motion.g>

      {showMirror && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <circle cx={Aminus.x} cy={Aminus.y} r={3.6} fill={VIOLET} />
          <text x={Aminus.x + 5} y={Aminus.y + 12} fontSize={8.5} fill={VIOLET}>
            A′
          </text>
          <circle cx={Mminus.x} cy={Mminus.y} r={5} fill={VIOLET} stroke="#fff" strokeWidth={1.4} />
          <line
            x1={Mminus.x}
            y1={Mminus.y}
            x2={Mminus.x}
            y2={PLOT_Y}
            stroke={VIOLET}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.55}
          />
        </motion.g>
      )}
    </g>
  )
}

export function StressStateDirectionsExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'given'
  const p = playing ? smooth(sceneProgress) : 1
  const isGiven = metric === 'given'
  const isSolve = metric === 'solve'
  const isPrincipal = metric === 'principal'
  const isCheck = metric === 'check'
  const isSign = metric === 'sign'
  const isResult = metric === 'result'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Zadanie odwrotne: dany kierunek główny 30 stopni oraz naprężenia normalne. Animacja odtwarza brakujące ścinanie na kole Mohra, wartości główne i odbicie znaku."
        >
          {isGiven ? (
            <DataElement unknown showDirection />
          ) : isSolve ? (
            <DataElement shear={TX * p} showDirection />
          ) : isSign ? (
            <MirrorElement />
          ) : (
            <PrincipalElement angle={THETA} highlight={isCheck ? 'check' : 'principal'} />
          )}

          {isGiven ? (
            <KnownMohr />
          ) : isSolve ? (
            <InverseMohr progress={p} />
          ) : (
            <MohrPlot
              markerAngle={isSign ? ALPHA0 : 0}
              reveal={isPrincipal ? 1 : isSign ? 1 : 0.9}
              showCircle
              showInitial={isCheck || isSign || isResult}
              showPrincipal={isPrincipal || isCheck || isSign || isResult}
              showArc={isCheck || isResult}
              arcLabel={isCheck || isResult ? '2θ = 60°' : undefined}
              showMirror={isSign}
            />
          )}
        </svg>
      </div>
    </div>
  )
}
