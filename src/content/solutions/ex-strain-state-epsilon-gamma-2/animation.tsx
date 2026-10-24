import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2e9e6b'
const MUTED = '#87929d'
const EDGE = '#68727e'
const LIGHT = '#e8eeff'

const CX = 165
const CY = 168
const HALF = 65
const K = 1000
const SMALL_CX = 105
const SMALL_CY = 150
const SMALL_HALF = 34
const SMALL_K = K * 0.55

type Params = { ex: number; ey: number; sxy: number; syx: number }
type Pt = readonly [number, number]

const EMPTY: Params = { ex: 0, ey: 0, sxy: 0, syx: 0 }
const FIELD: Params = { ex: 0.0004, ey: -0.0001, sxy: 0.0002, syx: 0.0003 }
const NORMAL: Params = { ex: 0.0004, ey: -0.0001, sxy: 0, syx: 0 }
const SHEAR: Params = { ex: 0, ey: 0, sxy: 0.0002, syx: 0.0003 }

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function mapPoint(px: number, py: number, params: Params, t: number, cx = CX, cy = CY, half = HALF, scale = K): Pt {
  const x = px - cx
  const yUp = cy - py
  const dx = scale * t * (params.ex * (x + half) + params.sxy * (yUp + half))
  const dyUp = scale * t * (params.syx * (x + half) + params.ey * (yUp + half))
  return [cx + x + dx, cy - yUp - dyUp] as const
}

function elementPoints(params: Params, t: number, cx = CX, cy = CY, half = HALF, scale = K) {
  return [
    mapPoint(cx - half, cy - half, params, t, cx, cy, half, scale),
    mapPoint(cx + half, cy - half, params, t, cx, cy, half, scale),
    mapPoint(cx + half, cy + half, params, t, cx, cy, half, scale),
    mapPoint(cx - half, cy + half, params, t, cx, cy, half, scale),
  ] as const
}

const polygonPath = (points: readonly Pt[]) =>
  `M ${points.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(' L ')} Z`

const unit = (from: Pt, to: Pt): Pt => {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const length = Math.hypot(dx, dy) || 1
  return [dx / length, dy / length] as const
}

function arcGeometry(origin: Pt, start: Pt, end: Pt, radius: number) {
  const a0 = Math.atan2(start[1], start[0])
  let a1 = Math.atan2(end[1], end[0])
  let delta = a1 - a0
  while (delta > Math.PI) delta -= 2 * Math.PI
  while (delta < -Math.PI) delta += 2 * Math.PI
  const p0: Pt = [origin[0] + radius * Math.cos(a0), origin[1] + radius * Math.sin(a0)]
  const p1: Pt = [origin[0] + radius * Math.cos(a0 + delta), origin[1] + radius * Math.sin(a0 + delta)]
  const mid: Pt = [
    origin[0] + radius * 0.74 * Math.cos(a0 + delta / 2),
    origin[1] + radius * 0.74 * Math.sin(a0 + delta / 2),
  ]
  const sweep = delta > 0 ? 1 : 0
  return {
    d: `M ${p0[0].toFixed(2)} ${p0[1].toFixed(2)} A ${radius} ${radius} 0 0 ${sweep} ${p1[0].toFixed(2)} ${p1[1].toFixed(2)}`,
    mid,
  }
}

function AngleArc({
  origin,
  start,
  end,
  radius,
  color,
  label,
  progress,
  labelDx = 0,
  labelDy = 0,
}: {
  origin: Pt
  start: Pt
  end: Pt
  radius: number
  color: string
  label: string
  progress: number
  labelDx?: number
  labelDy?: number
}) {
  const { d, mid } = arcGeometry(origin, start, end, radius)
  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: progress, opacity: progress > 0 ? 1 : 0 }}
        transition={{ pathLength: { duration: 0.16, ease: 'linear' }, opacity: { duration: 0.18 } }}
      />
      <text x={mid[0] + labelDx} y={mid[1] + labelDy} fontSize={8} fill={color} textAnchor="middle">
        {label}
      </text>
    </g>
  )
}

function HDim({
  x1,
  x2,
  y,
  label,
  color = MUTED,
  progress = 1,
}: {
  x1: number
  x2: number
  y: number
  label: string
  color?: string
  progress?: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: progress }}
      transition={{ duration: 0.25 }}
      stroke={color}
      fill={color}
    >
      <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth={1.1} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} strokeWidth={1.1} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} strokeWidth={1.1} />
      <text x={(x1 + x2) / 2} y={y - 5} textAnchor="middle" fontSize={8} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function VDim({
  x,
  y1,
  y2,
  label,
  color = MUTED,
  progress = 1,
}: {
  x: number
  y1: number
  y2: number
  label: string
  color?: string
  progress?: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: progress }}
      transition={{ duration: 0.25 }}
      stroke={color}
      fill={color}
    >
      <line x1={x} y1={y1} x2={x} y2={y2} strokeWidth={1.1} />
      <line x1={x - 4} y1={y1} x2={x + 4} y2={y1} strokeWidth={1.1} />
      <line x1={x - 4} y1={y2} x2={x + 4} y2={y2} strokeWidth={1.1} />
      <text x={x + 6} y={(y1 + y2) / 2 + 3} fontSize={8} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function GridLines({
  params,
  t,
  cx,
  cy,
  half,
  scale,
  color,
  opacity,
  dash,
}: {
  params: Params
  t: number
  cx: number
  cy: number
  half: number
  scale: number
  color: string
  opacity: number
  dash?: string
}) {
  const offsets = [-half / 3, half / 3]
  return (
    <g stroke={color} strokeWidth={0.9} strokeOpacity={opacity} strokeDasharray={dash}>
      {offsets.map((offset, i) => {
        const a = mapPoint(cx + offset, cy - half, params, t, cx, cy, half, scale)
        const b = mapPoint(cx + offset, cy + half, params, t, cx, cy, half, scale)
        return <line key={`v-${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
      })}
      {offsets.map((offset, i) => {
        const a = mapPoint(cx - half, cy + offset, params, t, cx, cy, half, scale)
        const b = mapPoint(cx + half, cy + offset, params, t, cx, cy, half, scale)
        return <line key={`h-${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
      })}
    </g>
  )
}

function OriginalElement({
  cx = CX,
  cy = CY,
  half = HALF,
  scale = K,
}: {
  cx?: number
  cy?: number
  half?: number
  scale?: number
}) {
  const points = elementPoints(EMPTY, 0, cx, cy, half, scale)
  return (
    <g>
      <path d={polygonPath(points)} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="5 4" />
      <GridLines
        params={EMPTY}
        t={0}
        cx={cx}
        cy={cy}
        half={half}
        scale={scale}
        color={MUTED}
        opacity={0.38}
        dash="3 4"
      />
    </g>
  )
}

function DeformedElement({
  params,
  t,
  cx = CX,
  cy = CY,
  half = HALF,
  scale = K,
  fillOpacity = 0.12,
}: {
  params: Params
  t: number
  cx?: number
  cy?: number
  half?: number
  scale?: number
  fillOpacity?: number
}) {
  const points = elementPoints(params, t, cx, cy, half, scale)
  return (
    <g>
      <path d={polygonPath(points)} fill={BLUE} fillOpacity={fillOpacity} stroke={BLUE} strokeWidth={2} />
      <GridLines params={params} t={t} cx={cx} cy={cy} half={half} scale={scale} color={BLUE} opacity={0.28} />
    </g>
  )
}

function CoordinateAxes({ x, y, size = 30 }: { x: number; y: number; size?: number }) {
  return (
    <g stroke={MUTED} strokeWidth={1} fill={MUTED}>
      <line x1={x} y1={y} x2={x + size} y2={y} />
      <line x1={x} y1={y} x2={x} y2={y - size} />
      <text x={x + size + 4} y={y + 3} fontSize={9} stroke="none">
        x
      </text>
      <text x={x - 3} y={y - size - 5} fontSize={9} stroke="none" textAnchor="end">
        y
      </text>
    </g>
  )
}

function FieldArrows() {
  const corners = [
    [CX - HALF, CY - HALF],
    [CX + HALF, CY - HALF],
    [CX + HALF, CY + HALF],
    [CX - HALF, CY + HALF],
  ] as const
  return (
    <g>
      {corners.map(([px, py], i) => {
        const x = px - CX
        const yUp = CY - py
        const dx = K * (FIELD.ex * (x + HALF) + FIELD.sxy * (yUp + HALF))
        const dyUp = K * (FIELD.syx * (x + HALF) + FIELD.ey * (yUp + HALF))
        if (Math.hypot(dx, dyUp) < 2) return null
        return (
          <motion.line
            key={i}
            x1={px}
            y1={py}
            x2={px + dx}
            y2={py - dyUp}
            stroke={ORANGE}
            strokeWidth={1.6}
            markerEnd="url(#eg2-field)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.08 * i }}
          />
        )
      })}
      <text x={CX + HALF + 12} y={CY - HALF - 10} fontSize={8.5} fill={ORANGE}>
        pole (u, v)
      </text>
    </g>
  )
}

function SmallElement({ params, t, principalAngle }: { params: Params; t: number; principalAngle?: number }) {
  const points = elementPoints(params, t, SMALL_CX, SMALL_CY, SMALL_HALF, SMALL_K)
  const phi = ((principalAngle ?? 0) * Math.PI) / 180
  const axis = 54
  const axisA: Pt = [SMALL_CX + axis * Math.cos(phi), SMALL_CY - axis * Math.sin(phi)]
  const axisB: Pt = [SMALL_CX - axis * Math.cos(phi), SMALL_CY + axis * Math.sin(phi)]
  return (
    <g>
      <OriginalElement cx={SMALL_CX} cy={SMALL_CY} half={SMALL_HALF} scale={SMALL_K} />
      <path d={polygonPath(points)} fill={BLUE} fillOpacity={0.12} stroke={BLUE} strokeWidth={1.8} />
      <GridLines
        params={params}
        t={t}
        cx={SMALL_CX}
        cy={SMALL_CY}
        half={SMALL_HALF}
        scale={SMALL_K}
        color={BLUE}
        opacity={0.28}
      />
      {principalAngle != null && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: t > 0.35 ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <line
            x1={axisB[0]}
            y1={axisB[1]}
            x2={axisA[0]}
            y2={axisA[1]}
            stroke={ORANGE}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <circle cx={axisA[0]} cy={axisA[1]} r={3} fill={ORANGE} />
          <circle cx={axisB[0]} cy={axisB[1]} r={3} fill={ORANGE} />
          <text x={axisA[0] + 4} y={axisA[1] - 4} fontSize={9} fill={ORANGE}>
            I
          </text>
          <text x={axisB[0] - 8} y={axisB[1] + 8} fontSize={9} fill={ORANGE}>
            II
          </text>
          <text x={SMALL_CX + 16} y={SMALL_CY - 10} fontSize={8.5} fill={ORANGE}>
            φ = {principalAngle.toFixed(1)}°
          </text>
        </motion.g>
      )}
      <text x={SMALL_CX} y={SMALL_CY + 58} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        element odkształcony
      </text>
    </g>
  )
}

function Mohr({ t, principal }: { t: number; principal: boolean }) {
  const base = 300
  const cy = 150
  const scale = 100 / 503.5533906
  const center = 150
  const radius = 353.5533906
  const cx = base + center * scale
  const r = radius * scale
  const left = base + (center - radius) * scale
  const right = base + (center + radius) * scale
  const xA = base + (center + 250) * scale
  const yA = cy - 250 * scale
  const xB = base + (center - 250) * scale
  const yB = cy + 250 * scale
  const angle = (45 * Math.PI) / 180

  return (
    <g>
      <line x1={238} y1={cy} x2={446} y2={cy} stroke="#c9d0d9" strokeWidth={1} />
      <line x1={base + center * scale} y1={72} x2={base + center * scale} y2={228} stroke="#e2e7ee" strokeWidth={1} />
      <motion.circle
        cx={cx}
        cy={cy}
        r={Math.abs(r)}
        fill="none"
        stroke={principal ? ORANGE : BLUE}
        strokeWidth={principal ? 2.6 : 2}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: t, opacity: t > 0 ? 1 : 0 }}
        transition={{ pathLength: { duration: 0.2, ease: 'linear' }, opacity: { duration: 0.2 } }}
      />
      <motion.line
        x1={left}
        y1={cy}
        x2={right}
        y2={cy}
        stroke={principal ? ORANGE : BLUE}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: t }}
        transition={{ duration: 0.2 }}
      />
      <line x1={xA} y1={yA} x2={xB} y2={yB} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: t > 0.45 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <circle cx={xA} cy={yA} r={3.2} fill={BLUE} />
        <circle cx={xB} cy={yB} r={3.2} fill={BLUE} />
        <text x={xA + 6} y={yA - 5} fontSize={8} fill={BLUE}>
          ε_x
        </text>
        <text x={xB - 6} y={yB + 11} fontSize={8} fill={BLUE} textAnchor="end">
          ε_y
        </text>
        <circle cx={cx} cy={cy} r={2.6} fill={EDGE} />
        <text x={cx + 5} y={cy - 6} fontSize={8} fill={EDGE}>
          ε_sr = 150 με
        </text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: t > 0.6 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <circle cx={left} cy={cy} r={3.6} fill={principal ? ORANGE : MUTED} />
        <circle cx={right} cy={cy} r={3.6} fill={principal ? ORANGE : MUTED} />
        <text x={left - 6} y={cy + 16} fontSize={8} fill={principal ? ORANGE : MUTED} textAnchor="end">
          ε_II
        </text>
        <text x={right + 6} y={cy + 16} fontSize={8} fill={principal ? ORANGE : MUTED}>
          ε_I
        </text>
        <text x={cx} y={cy + r + 18} textAnchor="middle" fontSize={8} fill={MUTED}>
          R_ε = 353,55 με
        </text>
      </motion.g>
      {principal && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <path
            d={`M ${cx + 34} ${cy} A 34 34 0 0 0 ${cx + 34 * Math.cos(-angle)} ${cy + 34 * Math.sin(-angle)}`}
            fill="none"
            stroke={ORANGE}
            strokeWidth={1.5}
          />
          <text x={cx + 44} y={cy - 12} fontSize={8} fill={ORANGE}>
            2φ = 45°
          </text>
          <text x={base} y={72} fontSize={8} fill={MUTED}>
            koło Mohra odkształceń
          </text>
        </motion.g>
      )}
    </g>
  )
}

export function StrainFieldAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const isModel = metric === 'model'
  const isNormal = metric === 'normal'
  const isShear = metric === 'shear'
  const isCombined = metric === 'combined'
  const isPrincipal = metric === 'principal'
  const isMohr = metric === 'mohr' || isPrincipal
  const t = playing ? smooth(sceneProgress) : 1

  let params = EMPTY
  if (isNormal) params = NORMAL
  else if (isShear) params = SHEAR
  else if (isCombined || isMohr) params = FIELD

  const elementT = isModel ? 0 : t
  const points = elementPoints(params, elementT)
  const [tl, , br, bl] = points
  const bottomDir = unit(bl, br)
  const leftDir = unit(bl, tl)
  const rightMid = mapPoint(CX + HALF, CY, params, elementT)
  const topMid = mapPoint(CX, CY - HALF, params, elementT)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Element tarczy poddany liniowemu polu przemieszczeń. Animacja pokazuje wydłużenie w kierunku x, skrócenie w kierunku y oraz różne obroty obu boków przy ścinaniu."
        >
          <defs>
            <marker
              id="eg2-field"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ORANGE} />
            </marker>
          </defs>

          <text x={14} y={20} fontSize={9} fill={MUTED}>
            u = 0,0004x + 0,0002y
          </text>
          <text x={14} y={34} fontSize={9} fill={MUTED}>
            v = 0,0003x − 0,0001y
          </text>
          <CoordinateAxes x={200} y={74} size={26} />

          {!isMohr && (
            <g>
              {!isModel && <OriginalElement />}
              {isModel ? (
                <g>
                  <path d={polygonPath(elementPoints(EMPTY, 0))} fill={LIGHT} stroke={BLUE} strokeWidth={2} />
                  <GridLines params={EMPTY} t={0} cx={CX} cy={CY} half={HALF} scale={K} color={BLUE} opacity={0.35} />
                  <FieldArrows />
                </g>
              ) : (
                <DeformedElement params={params} t={elementT} />
              )}

              {isModel && (
                <text x={CX} y={CY + HALF + 34} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                  liniowe pole przemieszczeń: pochodne są stałe
                </text>
              )}

              {isNormal && (
                <g>
                  <line x1={CX + HALF} y1={88} x2={CX + HALF} y2={topMid[1]} stroke={MUTED} strokeDasharray="3 3" />
                  <line x1={rightMid[0]} y1={88} x2={rightMid[0]} y2={topMid[1]} stroke={MUTED} strokeDasharray="3 3" />
                  <HDim
                    x1={CX + HALF}
                    x2={rightMid[0]}
                    y={88}
                    label="ε_x = 400 με"
                    color={ORANGE}
                    progress={t > 0.2 ? 1 : 0}
                  />
                  <VDim
                    x={CX + HALF + 22}
                    y1={CY - HALF}
                    y2={topMid[1]}
                    label="Δy"
                    color={ORANGE}
                    progress={t > 0.2 ? 1 : 0}
                  />
                  <text x={rightMid[0] + 8} y={CY - 18} fontSize={9} fill={ORANGE}>
                    wydłużenie x
                  </text>
                  <text x={CX - HALF - 6} y={CY - HALF + 4} textAnchor="end" fontSize={8.5} fill={ORANGE}>
                    ε_y = −100 με
                  </text>
                  <text x={CX} y={CY + HALF + 34} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    ε_x = ∂u/∂x, ε_y = ∂v/∂y
                  </text>
                </g>
              )}

              {isShear && (
                <g>
                  <line x1={bl[0]} y1={bl[1]} x2={bl[0] + 52} y2={bl[1]} stroke={MUTED} strokeDasharray="3 3" />
                  <line x1={bl[0]} y1={bl[1]} x2={bl[0]} y2={bl[1] - 52} stroke={MUTED} strokeDasharray="3 3" />
                  <AngleArc
                    origin={bl}
                    start={[1, 0]}
                    end={bottomDir}
                    radius={42}
                    color={ORANGE}
                    label="∂v/∂x"
                    progress={t}
                    labelDx={0}
                    labelDy={16}
                  />
                  <AngleArc
                    origin={bl}
                    start={[0, -1]}
                    end={leftDir}
                    radius={48}
                    color={ORANGE}
                    label="∂u/∂y"
                    progress={t}
                    labelDx={-14}
                    labelDy={-10}
                  />
                  <text x={CX + 26} y={CY + 84} fontSize={9} fill={BLUE}>
                    γ_xy = ∂u/∂y + ∂v/∂x = 500 μrad
                  </text>
                  <text x={CX} y={CY + HALF + 34} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    oba boki obracają się, ale o różne kąty
                  </text>
                </g>
              )}

              {isCombined && (
                <g>
                  <text x={rightMid[0] + 8} y={rightMid[1] - 10} fontSize={9} fill={ORANGE}>
                    ε_x = 400 με
                  </text>
                  <text x={CX - HALF - 8} y={topMid[1] - 8} textAnchor="end" fontSize={9} fill={ORANGE}>
                    ε_y = −100 με
                  </text>
                  <text x={CX + 26} y={CY + 84} fontSize={9} fill={BLUE}>
                    ε_xy = γ_xy/2 = 250 μrad
                  </text>
                  <text x={CX} y={CY + HALF + 34} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    pełna deformacja: zmiana długości i kątów razem
                  </text>
                </g>
              )}
            </g>
          )}

          {isMohr && (
            <g>
              <SmallElement params={params} t={t} principalAngle={isPrincipal ? 22.5 : undefined} />
              <Mohr t={t} principal={isPrincipal} />
              {isPrincipal && (
                <g>
                  <text x={14} y={226} fontSize={9} fill={ORANGE}>
                    ε_I = 503,55 με
                  </text>
                  <text x={14} y={240} fontSize={9} fill={ORANGE}>
                    ε_II = −203,55 με
                  </text>
                  <text x={14} y={254} fontSize={9} fill={GREEN}>
                    σ_I = 97,25 MPa · σ_II = −11,54 MPa
                  </text>
                </g>
              )}
            </g>
          )}

          <text x={446} y={286} textAnchor="end" fontSize={8} fill={MUTED}>
            deformacje powiększone poglądowo
          </text>
        </svg>
      </div>
    </div>
  )
}
