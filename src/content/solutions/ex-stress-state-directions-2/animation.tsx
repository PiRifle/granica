import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2e9e6b'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const AXIS = '#9aa5b1'
const FILL = '#eef2f9'

const E = { x: 132, y: 154 }
const HALF = 50

const SX = 80
const TX = 40
const AVG = 40
const A = 40
const R = 56.5685
const S1 = 96.5685
const S2 = -16.5685
const THETA = 22.5
const ALPHA0 = 45

const PLOT_LEFT = 272
const PLOT_RIGHT = 438
const PLOT_Y = 158
const S_MIN = -30
const S_MAX = 110
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

function DataElement() {
  const right = E.x + HALF
  const left = E.x - HALF
  const top = E.y - HALF
  const bottom = E.y + HALF
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

      <Arrow from={{ x: right, y: E.y + 22 }} to={{ x: right, y: E.y - 6 }} color={ORANGE} width={1.7} head={5} />
      <Arrow from={{ x: left, y: E.y - 22 }} to={{ x: left, y: E.y + 6 }} color={ORANGE} width={1.7} head={5} />
      <Arrow from={{ x: E.x - 22, y: top }} to={{ x: E.x + 6, y: top }} color={ORANGE} width={1.7} head={5} />
      <Arrow from={{ x: E.x + 22, y: bottom }} to={{ x: E.x - 6, y: bottom }} color={ORANGE} width={1.7} head={5} />

      <text x={right + 2} y={E.y - 26} fontSize={9} fill={BLUE}>
        σx = 80
      </text>
      <text x={right + 2} y={E.y + 34} fontSize={9} fill={ORANGE}>
        τxy = 40
      </text>
      <text x={E.x + 26} y={top - 7} fontSize={9} fill={GREEN}>
        σy = 0
      </text>
      <text x={18} y={26} fontSize={9} fill={MUTED}>
        składowe w MPa
      </text>
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
        σ1 = 96,57
      </text>
      <text x={label2.x} y={label2.y} fontSize={9.5} fontWeight={600} fill={VIOLET}>
        σ2 = −16,57
      </text>
      <text x={E.x} y={270} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={GREEN}>
        τnt = 0 na obu płaszczyznach
      </text>

      {highlight === 'check' && (
        <g>
          <path d={arcPath(E.x, E.y, 38, 0, angle)} fill="none" stroke={BLUE} strokeWidth={1.5} />
          <text x={E.x + 50} y={E.y - 10} fontSize={9} fill={BLUE}>
            θp1 = 22,5°
          </text>
        </g>
      )}

      {highlight === 'second' && (
        <g>
          <path d={arcPath(E.x, E.y, 42, THETA, THETA + 90)} fill="none" stroke={VIOLET} strokeWidth={1.6} />
          <text x={E.x - 8} y={E.y - 54} fontSize={9} fill={VIOLET}>
            θp2 = 112,5°
          </text>
        </g>
      )}
    </g>
  )
}

function SearchOverlay({ theta }: { theta: number }) {
  const n = pointAt({ x: 0, y: 0 }, theta, 1)
  const p = { x: -n.y, y: n.x }
  const tn = -A * Math.sin(rad(2 * theta)) + TX * Math.cos(rad(2 * theta))
  const sn = AVG + A * Math.cos(rad(2 * theta)) + TX * Math.sin(rad(2 * theta))
  const planeA = { x: E.x - 84 * p.x, y: E.y - 84 * p.y }
  const planeB = { x: E.x + 84 * p.x, y: E.y + 84 * p.y }
  const traction = { x: E.x + 70 * p.x, y: E.y + 70 * p.y }
  const nEnd = { x: E.x + 96 * n.x, y: E.y + 96 * n.y }
  const snLength = 10 + (28 * Math.abs(sn)) / S1
  const tnLength = (36 * Math.abs(tn)) / TX
  const snSign = sn >= 0 ? 1 : -1
  const tnSign = tn >= 0 ? 1 : -1
  const snTip = { x: traction.x + snSign * snLength * n.x, y: traction.y + snSign * snLength * n.y }
  const tnTip = { x: traction.x + tnSign * tnLength * p.x, y: traction.y + tnSign * tnLength * p.y }
  const mid = theta / 2
  const arcLabel = pointAt(E, mid, 48)

  return (
    <g>
      <line
        x1={planeA.x}
        y1={planeA.y}
        x2={planeB.x}
        y2={planeB.y}
        stroke={VIOLET}
        strokeWidth={1.3}
        strokeDasharray="7 4"
        opacity={0.85}
      />
      <Arrow from={E} to={nEnd} color={VIOLET} width={2} />
      <text x={nEnd.x + 4} y={nEnd.y - 4} fontSize={9.5} fontWeight={600} fill={VIOLET}>
        n
      </text>

      <path d={arcPath(E.x, E.y, 34, 0, theta)} fill="none" stroke={BLUE} strokeWidth={1.6} />
      <text x={arcLabel.x} y={arcLabel.y} textAnchor="middle" fontSize={9.5} fill={BLUE}>
        θ
      </text>

      <Arrow from={traction} to={snTip} color={BLUE} width={2.2} />
      <text x={snTip.x + 4} y={snTip.y - 4} fontSize={9} fill={BLUE}>
        σn
      </text>
      {tnLength > 1.4 && (
        <>
          <Arrow from={traction} to={tnTip} color={ORANGE} width={2.2} />
          <text x={tnTip.x + 5} y={tnTip.y + 3} fontSize={9} fill={ORANGE}>
            τnt
          </text>
        </>
      )}

      <text x={20} y={42} fontSize={10} fontWeight={600} fill={INK}>
        θ = {num(theta)}°
      </text>
      <text x={20} y={58} fontSize={9.5} fill={Math.abs(tn) < 0.1 ? GREEN : ORANGE}>
        τnt = {num(Math.abs(tn) < 0.05 ? 0 : tn)} MPa
      </text>
      <text x={20} y={74} fontSize={8.5} fill={MUTED}>
        obrót płaszczyzny wokół punktu
      </text>
    </g>
  )
}

function MaxShearElement() {
  const n = pointAt({ x: 0, y: 0 }, THETA, 1)
  const p = { x: -n.y, y: n.x }
  const corners = [
    { x: E.x + HALF * n.x + HALF * p.x, y: E.y + HALF * n.y + HALF * p.y },
    { x: E.x + HALF * n.x - HALF * p.x, y: E.y + HALF * n.y - HALF * p.y },
    { x: E.x - HALF * n.x - HALF * p.x, y: E.y - HALF * n.y - HALF * p.y },
    { x: E.x - HALF * n.x + HALF * p.x, y: E.y - HALF * n.y + HALF * p.y },
  ]
  const points = corners.map((corner) => `${corner.x},${corner.y}`).join(' ')
  const nms = pointAt({ x: 0, y: 0 }, THETA + 45, 1)
  const pms = { x: -nms.y, y: nms.x }
  const planeA = { x: E.x - 74 * pms.x, y: E.y - 74 * pms.y }
  const planeB = { x: E.x + 74 * pms.x, y: E.y + 74 * pms.y }
  const traction = { x: E.x + 58 * nms.x, y: E.y + 58 * nms.y }
  const shearTip = { x: traction.x + 40 * pms.x, y: traction.y + 40 * pms.y }
  const normalTip = { x: traction.x + 22 * nms.x, y: traction.y + 22 * nms.y }
  const normalBack = { x: E.x + 86 * nms.x, y: E.y + 86 * nms.y }

  return (
    <g>
      <polygon points={points} fill={FILL} stroke={EDGE} strokeWidth={1.5} />
      <line
        x1={E.x - 88 * n.x}
        y1={E.y - 88 * n.y}
        x2={E.x + 88 * n.x}
        y2={E.y + 88 * n.y}
        stroke={BLUE}
        strokeWidth={1.5}
        opacity={0.45}
      />
      <line
        x1={E.x - 88 * p.x}
        y1={E.y - 88 * p.y}
        x2={E.x + 88 * p.x}
        y2={E.y + 88 * p.y}
        stroke={VIOLET}
        strokeWidth={1.5}
        opacity={0.45}
      />

      <line
        x1={planeA.x}
        y1={planeA.y}
        x2={planeB.x}
        y2={planeB.y}
        stroke={ORANGE}
        strokeWidth={1.5}
        strokeDasharray="7 4"
      />
      <Arrow from={E} to={normalBack} color={ORANGE} width={1.8} />
      <text x={normalBack.x + 4} y={normalBack.y - 4} fontSize={9} fontWeight={600} fill={ORANGE}>
        nτ
      </text>

      <Arrow from={traction} to={shearTip} color={ORANGE} width={2.4} />
      <text x={shearTip.x + 5} y={shearTip.y + 10} fontSize={9} fontWeight={600} fill={ORANGE}>
        τmax = 56,57
      </text>
      <Arrow from={traction} to={normalTip} color={BLUE} width={1.8} />
      <text x={normalTip.x + 4} y={normalTip.y - 4} fontSize={8.5} fill={BLUE}>
        σavg = 40
      </text>

      <text x={E.x + 12} y={E.y - 38} fontSize={9} fill={MUTED}>
        θτmax = 67,5°
      </text>
      <text x={E.x} y={270} textAnchor="middle" fontSize={9} fontWeight={600} fill={ORANGE}>
        płaszczyzna maksymalnego ścinania
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
  showMaxShear = false,
}: {
  markerAngle: number
  reveal: number
  arcLabel?: string
  showCircle?: boolean
  showInitial?: boolean
  showPrincipal?: boolean
  showArc?: boolean
  showMaxShear?: boolean
}) {
  const C = { x: px(AVG), y: PLOT_Y }
  const r = R * SCALE
  const M = pointAt(C, markerAngle, r)
  const A = { x: px(SX), y: py(TX) }
  const P1 = { x: px(S1), y: PLOT_Y }
  const P2 = { x: px(S2), y: PLOT_Y }
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
            σ1 = 96,57
          </text>
          <text x={P2.x} y={PLOT_Y + 16} textAnchor="middle" fontSize={8.5} fill={VIOLET}>
            σ2 = −16,57
          </text>
          <text x={C.x} y={PLOT_Y - 7} textAnchor="middle" fontSize={8} fill={MUTED}>
            σavg = 40
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

      {showMaxShear && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <circle cx={C.x} cy={PLOT_Y - r} r={4.5} fill={ORANGE} />
          <circle cx={C.x} cy={PLOT_Y + r} r={4.5} fill={ORANGE} />
          <text x={C.x + 8} y={PLOT_Y - r - 2} fontSize={8.5} fill={ORANGE}>
            τmax = R
          </text>
          <line x1={C.x} y1={C.y} x2={C.x} y2={PLOT_Y - r} stroke={ORANGE} strokeWidth={1.2} strokeDasharray="4 3" />
        </motion.g>
      )}
    </g>
  )
}

export function StressStateDirectionsExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'given'
  const p = playing ? smooth(sceneProgress) : 1
  const isGiven = metric === 'given'
  const isSearch = metric === 'search'
  const isAngle = metric === 'angle'
  const isPrincipal = metric === 'principal'
  const isCheck = metric === 'check'
  const isMax = metric === 'taumax'

  const theta = isSearch ? THETA * p : THETA
  const markerAngle = isGiven
    ? ALPHA0
    : isSearch
      ? ALPHA0 - 2 * theta
      : isAngle
        ? ALPHA0 - 2 * THETA
        : isPrincipal || isCheck
          ? 0
          : 90
  const reveal = isGiven ? 0.9 : 1
  const showSearch = isSearch || isAngle

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Element naprężenia i koło Mohra. Animacja pokazuje obrót płaszczyzny do kierunku głównego, zanikanie naprężenia stycznego oraz położenie kierunków głównych na kole."
        >
          {showSearch ? (
            <>
              <DataElement />
              <SearchOverlay theta={theta} />
            </>
          ) : isMax ? (
            <MaxShearElement />
          ) : isPrincipal || isCheck ? (
            <PrincipalElement angle={THETA} highlight={isCheck ? 'check' : 'principal'} />
          ) : (
            <DataElement />
          )}

          <MohrPlot
            markerAngle={markerAngle}
            reveal={reveal}
            showCircle={!isGiven && reveal > 0.4}
            showInitial={isGiven || isSearch}
            showPrincipal={isPrincipal || isCheck}
            showArc={isSearch || isAngle}
            arcLabel={isAngle || (!playing && isSearch) ? `2θp = ${num(ALPHA0)}°` : undefined}
            showMaxShear={isMax}
          />
        </svg>
      </div>
    </div>
  )
}
