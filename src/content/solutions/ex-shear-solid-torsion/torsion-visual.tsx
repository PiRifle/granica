import { motion } from 'motion/react'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const OK = '#2e9e6b'
const LIMIT = '#a970dd'
const PAPER = '#f2f5fa'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const fmt = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')
const fmtTrim = (value: number) => String(Number(value.toFixed(2))).replace('.', ',')

export type TorsionMode = 'model' | 'load' | 'section' | 'twist' | 'stress' | 'design' | 'result'

export interface TorsionConfig {
  id: string
  d: number
  L: number
  T: number
  tauMax: number
  tauAllow?: number
  J: number
  W: number
  phiRad: number
  phiDeg: number
  phiPerMeterDeg?: number
  phiAllowDeg?: number
  dMinStrength?: number
  dAdopted?: number
  dMinStiffness?: number
  labels: {
    d: string
    L: string
    T: string
    G: string
    phi: string
    power?: string
    speed?: string
  }
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-accent`}
        viewBox="0 0 10 10"
        refX={9}
        refY={5}
        markerWidth={5}
        markerHeight={5}
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
      </marker>
      <marker
        id={`${id}-load`}
        viewBox="0 0 10 10"
        refX={9}
        refY={5}
        markerWidth={5}
        markerHeight={5}
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
      </marker>
      <marker
        id={`${id}-muted`}
        viewBox="0 0 10 10"
        refX={9}
        refY={5}
        markerWidth={5}
        markerHeight={5}
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
      </marker>
      <marker
        id={`${id}-ok`}
        viewBox="0 0 10 10"
        refX={9}
        refY={5}
        markerWidth={5}
        markerHeight={5}
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 Z" fill={OK} />
      </marker>
    </defs>
  )
}

function HDim({
  x1,
  x2,
  y,
  label,
  color = MUTED,
}: {
  x1: number
  x2: number
  y: number
  label: string
  color?: string
}) {
  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth={1.1} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} strokeWidth={1.1} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} strokeWidth={1.1} />
      <text x={(x1 + x2) / 2} y={y + 13} textAnchor="middle" fontSize={8.5} stroke="none">
        {label}
      </text>
    </g>
  )
}

function ShaftView({
  id,
  config,
  p,
  twist,
  x0 = 64,
  x1 = 352,
  cy = 146,
  radius = 34,
}: {
  id: string
  config: TorsionConfig
  p: number
  twist: boolean
  x0?: number
  x1?: number
  cy?: number
  radius?: number
}) {
  const ellRx = 10
  const twistAngle = twist ? 0.95 * p : 0
  const surfaceAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]
  const lineWidths = [1.7, 1.1, 1.2, 0.9]
  const lineOpacity = [0.9, 0.55, 0.4, 0.28]

  const torquePath = `M ${x1} ${cy - radius - 13} A ${ellRx + 13} ${radius + 13} 0 0 1 ${x1} ${cy + radius + 13}`
  const originalEnd = { x: x1, y: cy - radius }
  const rotatedEnd = {
    x: x1 + ellRx * Math.sin(twistAngle),
    y: cy - radius * Math.cos(twistAngle),
  }
  const arcMid = {
    x: x1 + (ellRx + 8) * Math.sin(twistAngle / 2),
    y: cy - (radius + 8) * Math.cos(twistAngle / 2),
  }

  return (
    <g>
      <g stroke={EDGE} strokeWidth={2} strokeLinecap="round">
        <line x1={x0} y1={cy - radius - 13} x2={x0} y2={cy + radius + 13} />
        {Array.from({ length: 9 }, (_, index) => {
          const y = cy - radius - 9 + index * ((radius * 2 + 18) / 8)
          return <line key={index} x1={x0} y1={y} x2={x0 - 8} y2={y - 7} strokeWidth={1.3} />
        })}
      </g>

      <rect
        x={x0}
        y={cy - radius}
        width={x1 - x0}
        height={radius * 2}
        rx={7}
        fill={ACCENT}
        fillOpacity={0.09}
        stroke={ACCENT}
        strokeWidth={1.8}
      />
      <ellipse cx={x1} cy={cy} rx={ellRx} ry={radius} fill="#eef1ff" stroke={ACCENT} strokeWidth={1.5} />

      {surfaceAngles.map((angle, index) => {
        const points = Array.from({ length: 31 }, (_, step) => {
          const u = step / 30
          const x = x0 + (x1 - x0) * u
          const theta = angle + twistAngle * u
          return `${x + ellRx * Math.sin(theta)},${cy - radius * Math.cos(theta)}`
        }).join(' ')
        return (
          <polyline
            key={angle}
            points={points}
            fill="none"
            stroke={ACCENT}
            strokeWidth={lineWidths[index]}
            opacity={lineOpacity[index]}
            strokeLinecap="round"
          />
        )
      })}

      <line
        x1={originalEnd.x}
        y1={originalEnd.y}
        x2={x1}
        y2={cy}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="3 3"
        opacity={twist ? 0.75 : 0}
      />
      <line x1={x1} y1={cy} x2={rotatedEnd.x} y2={rotatedEnd.y} stroke={LOAD} strokeWidth={2} strokeLinecap="round" />
      <circle cx={rotatedEnd.x} cy={rotatedEnd.y} r={2.4} fill={LOAD} />

      {twist && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <path
            d={`M ${originalEnd.x} ${originalEnd.y} A ${ellRx} ${radius} 0 0 1 ${rotatedEnd.x} ${rotatedEnd.y}`}
            fill="none"
            stroke={LOAD}
            strokeWidth={1.3}
            strokeDasharray="3 3"
          />
          <text x={arcMid.x + 5} y={arcMid.y - 4} fontSize={9} fontWeight={600} fill={LOAD}>
            {config.labels.phi}
          </text>
        </motion.g>
      )}

      <motion.path
        d={torquePath}
        fill="none"
        stroke={LOAD}
        strokeWidth={2.2}
        markerEnd={`url(#${id}-load)`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
      <text x={x1 + ellRx + 20} y={cy + 4} fontSize={9.5} fontWeight={600} fill={LOAD}>
        {config.labels.T}
      </text>

      <text x={12} y={26} fontSize={9} fill={MUTED}>
        {config.labels.power ?? config.labels.G}
      </text>
      <text x={12} y={41} fontSize={9} fill={MUTED}>
        {config.labels.speed ?? config.labels.d}
      </text>
      {config.labels.power != null && (
        <>
          <text x={12} y={56} fontSize={9} fill={MUTED}>
            {config.labels.d}
          </text>
          <text x={12} y={71} fontSize={9} fill={MUTED}>
            {config.labels.G}
          </text>
        </>
      )}
      <HDim x1={x0} x2={x1} y={cy + radius + 34} label={config.labels.L} />

      {twist && (
        <text x={12} y={cy + radius + 55} fontSize={8} fill={MUTED}>
          skręcenie pokazano w skali poglądowej
        </text>
      )}
    </g>
  )
}

function SectionRings({ config, p }: { config: TorsionConfig; p: number }) {
  const cx = 150
  const cy = 158
  const radius = 72
  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill={PAPER} stroke={EDGE} strokeWidth={1.6} />
      <line
        x1={cx - radius - 12}
        y1={cy}
        x2={cx + radius + 12}
        y2={cy}
        stroke="#c9d0d9"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <line
        x1={cx}
        y1={cy - radius - 12}
        x2={cx}
        y2={cy + radius + 12}
        stroke="#c9d0d9"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      {Array.from({ length: 6 }, (_, index) => {
        const ratio = (index + 1) / 6
        const reveal = clamp01((p - index * 0.06) / 0.55)
        return (
          <motion.circle
            key={ratio}
            cx={cx}
            cy={cy}
            r={radius * ratio}
            fill="none"
            stroke={ACCENT}
            strokeWidth={0.9 + 2.4 * ratio * ratio}
            initial={false}
            animate={{ opacity: reveal * (0.22 + 0.62 * ratio * ratio) }}
            transition={{ duration: 0.2 }}
          />
        )
      })}
      <line
        x1={cx}
        y1={cy}
        x2={cx + radius}
        y2={cy}
        stroke={ACCENT}
        strokeWidth={1.3}
        markerEnd={`url(#${config.id}-accent)`}
      />
      <text x={cx + radius / 2} y={cy - 6} textAnchor="middle" fontSize={9} fill={ACCENT}>
        r
      </text>
      <text x={cx} y={cy - radius - 18} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
        J_o = ∫ r² dA
      </text>
      <text x={cx} y={cy + radius + 20} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        większy udział mają pierścienie zewnętrzne
      </text>
      <HDim x1={cx - radius} x2={cx + radius} y={cy + radius + 36} label={config.labels.d} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={8} fill={MUTED}>
        oś
      </text>
    </g>
  )
}

function TorqueSection({ config, p }: { config: TorsionConfig; p: number }) {
  const cx = 150
  const cy = 158
  const radius = 72
  const arrowRadius = 48
  const start = -Math.PI / 3
  const end = (4 * Math.PI) / 3
  const startPoint = {
    x: cx + arrowRadius * Math.cos(start),
    y: cy + arrowRadius * Math.sin(start),
  }
  const endPoint = {
    x: cx + arrowRadius * Math.cos(end),
    y: cy + arrowRadius * Math.sin(end),
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill={PAPER} stroke={EDGE} strokeWidth={1.6} />
      <line
        x1={cx - radius - 12}
        y1={cy}
        x2={cx + radius + 12}
        y2={cy}
        stroke="#c9d0d9"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <line
        x1={cx}
        y1={cy - radius - 12}
        x2={cx}
        y2={cy + radius + 12}
        stroke="#c9d0d9"
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <circle cx={cx} cy={cy} r={2.5} fill={INK} />
      <motion.path
        d={`M ${startPoint.x} ${startPoint.y} A ${arrowRadius} ${arrowRadius} 0 1 1 ${endPoint.x} ${endPoint.y}`}
        fill="none"
        stroke={LOAD}
        strokeWidth={2.2}
        markerEnd={`url(#${config.id}-load)`}
        initial={false}
        animate={{ pathLength: p, opacity: p > 0.02 ? 1 : 0 }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <text x={cx} y={cy - arrowRadius - 10} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={LOAD}>
        {config.labels.T}
      </text>
      <text x={cx + 7} y={cy + 4} fontSize={8.5} fill={MUTED}>
        oś
      </text>
      <HDim x1={cx - radius} x2={cx + radius} y={cy + radius + 32} label={config.labels.d} />
      <text x={cx} y={cy + radius + 18} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        moment działa wokół osi wału
      </text>
    </g>
  )
}

function SectionStress({
  config,
  p,
  tauMax,
  cx = 148,
  cy = 158,
  radius = 72,
  compact = false,
}: {
  config: TorsionConfig
  p: number
  tauMax: number
  cx?: number
  cy?: number
  radius?: number
  compact?: boolean
}) {
  const maxLength = compact ? 38 : 54
  const rows = [0.25, 0.5, 0.75, 1]
  const envelope = maxLength * clamp01((p - 0.1) / 0.9)
  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill={PAPER} stroke={EDGE} strokeWidth={1.5} />
      <line x1={cx - radius} y1={cy} x2={cx + radius} y2={cy} stroke="#c9d0d9" strokeWidth={1} strokeDasharray="4 4" />
      <line x1={cx} y1={cy - radius} x2={cx} y2={cy + radius} stroke="#c9d0d9" strokeWidth={1} strokeDasharray="4 4" />
      <line x1={cx} y1={cy} x2={cx + radius} y2={cy} stroke={MUTED} strokeWidth={1.2} />
      <path
        d={`M ${cx} ${cy} L ${cx + radius} ${cy} L ${cx + radius} ${cy - envelope} Z`}
        fill={ACCENT}
        fillOpacity={0.13}
        stroke={ACCENT}
        strokeWidth={1.1}
      />
      {rows.map((ratio) => {
        const x = cx + radius * ratio
        const reveal = clamp01((p - (ratio - 0.25) * 0.18) / 0.65)
        const length = maxLength * ratio * reveal
        return (
          <motion.line
            key={ratio}
            x1={x}
            y1={cy}
            x2={x}
            y2={cy - length}
            stroke={ACCENT}
            strokeWidth={ratio === 1 ? 2.2 : 1.7}
            markerEnd={`url(#${config.id}-accent)`}
            initial={false}
            animate={{ y2: cy - length }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
        )
      })}
      <text x={cx - 7} y={cy - 5} textAnchor="end" fontSize={8.5} fill={MUTED}>
        τ = 0
      </text>
      <text x={cx + radius + 4} y={cy - maxLength - 5} fontSize={9} fontWeight={600} fill={ACCENT}>
        τ_max = {fmtTrim(tauMax)} MPa
      </text>
      <text x={cx + radius / 2} y={cy + 13} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        r
      </text>
      {!compact && (
        <text x={cx} y={cy + radius + 34} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          rozkład liniowy: τ = T r / J_o
        </text>
      )}
    </g>
  )
}

function StressProfile({
  id,
  tauMax,
  tauAllow,
  p,
  x0 = 294,
  y0 = 250,
  width = 128,
  height = 98,
}: {
  id: string
  tauMax: number
  tauAllow?: number
  p: number
  x0?: number
  y0?: number
  width?: number
  height?: number
}) {
  const yMax = tauAllow ? Math.max(tauAllow * 1.25, tauMax * 1.15) : tauMax * 1.2
  const yOf = (value: number) => y0 - (value / yMax) * height
  const xEnd = x0 + width
  const yEnd = yOf(tauMax * p)
  const limitY = tauAllow ? yOf(tauAllow) : 0

  return (
    <g>
      <text x={x0 + width / 2} y={y0 - height - 16} textAnchor="middle" fontSize={9} fill={MUTED}>
        rozkład τ(r)
      </text>
      <line x1={x0} y1={y0} x2={x0} y2={y0 - height} stroke={EDGE} strokeWidth={1.3} />
      <line x1={x0} y1={y0} x2={xEnd} y2={y0} stroke={EDGE} strokeWidth={1.3} />
      <path d={`M ${x0} ${y0} L ${xEnd} ${yEnd} L ${xEnd} ${y0} Z`} fill={ACCENT} fillOpacity={0.14} stroke="none" />
      <motion.line
        x1={x0}
        y1={y0}
        x2={xEnd}
        y2={yEnd}
        stroke={ACCENT}
        strokeWidth={2}
        initial={false}
        animate={{ y2: yEnd }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <circle cx={xEnd} cy={yEnd} r={2.5} fill={ACCENT} />
      <text x={x0 - 6} y={y0 + 3} textAnchor="end" fontSize={8} fill={MUTED}>
        0
      </text>
      <text x={x0 - 6} y={y0 - height + 3} textAnchor="end" fontSize={8} fill={MUTED}>
        τ
      </text>
      <text x={xEnd} y={y0 + 13} textAnchor="middle" fontSize={8} fill={MUTED}>
        R
      </text>
      <text x={xEnd + 4} y={yEnd + 3} fontSize={8.5} fontWeight={600} fill={ACCENT}>
        τ_max
      </text>
      {tauAllow != null && (
        <>
          <line
            x1={x0 - 4}
            y1={limitY}
            x2={xEnd}
            y2={limitY}
            stroke={LIMIT}
            strokeWidth={1.5}
            strokeDasharray="5 3"
            markerEnd={`url(#${id}-muted)`}
          />
          <text x={xEnd} y={limitY - 5} textAnchor="end" fontSize={8} fontWeight={600} fill={LIMIT}>
            τ_dop = {fmt(tauAllow, 0)} MPa
          </text>
        </>
      )}
    </g>
  )
}

function PhiBar({
  p,
  value,
  limit,
  max,
  unit = '°/m',
  x = 250,
  y = 286,
  width = 178,
}: {
  p: number
  value: number
  limit?: number
  max: number
  unit?: string
  x?: number
  y?: number
  width?: number
}) {
  const ratio = Math.min(1, value / max)
  const limitRatio = limit != null ? Math.min(1, limit / max) : null
  return (
    <g>
      <text x={x} y={y - 8} fontSize={8.5} fill={MUTED}>
        kąt skręcenia
      </text>
      <rect x={x} y={y} width={width} height={9} rx={4.5} fill="#eef1f4" stroke="#d7dde4" strokeWidth={1} />
      <motion.rect
        x={x}
        y={y}
        height={9}
        rx={4.5}
        fill={ACCENT}
        fillOpacity={0.35}
        initial={false}
        animate={{ width: ratio * width * p }}
        transition={{ duration: 0.15, ease: 'linear' }}
      />
      {limitRatio != null && limit != null && (
        <>
          <line
            x1={x + limitRatio * width}
            y1={y - 4}
            x2={x + limitRatio * width}
            y2={y + 13}
            stroke={LIMIT}
            strokeWidth={1.6}
            strokeDasharray="4 3"
          />
          <text x={x + limitRatio * width} y={y + 24} textAnchor="middle" fontSize={8} fill={LIMIT}>
            φ_dop = {fmt(limit)}
            {unit}
          </text>
        </>
      )}
      <text x={x + width} y={y - 8} textAnchor="end" fontSize={8.5} fontWeight={600} fill={ACCENT}>
        φ = {fmt(value)}
        {unit}
      </text>
    </g>
  )
}

function DesignSection({
  config,
  p,
  dStart,
  dTarget,
  dMin,
}: {
  config: TorsionConfig
  p: number
  dStart: number
  dTarget: number
  dMin?: number
}) {
  const cx = 150
  const cy = 158
  const pxPerMm = 2
  const current = dStart + (dTarget - dStart) * p
  const radius = (current * pxPerMm) / 2
  const minRadius = dMin != null ? (dMin * pxPerMm) / 2 : undefined
  return (
    <g>
      {minRadius != null && (
        <>
          <circle cx={cx} cy={cy} r={minRadius} fill="none" stroke={LIMIT} strokeWidth={1.7} strokeDasharray="6 4" />
          <text x={cx} y={cy - minRadius - 7} textAnchor="middle" fontSize={8.5} fill={LIMIT}>
            d_min = {fmt(dMin ?? 0, 1)} mm
          </text>
        </>
      )}
      <motion.circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={ACCENT}
        fillOpacity={0.12}
        stroke={ACCENT}
        strokeWidth={2}
        initial={false}
        animate={{ r: radius }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line
        x1={cx - radius}
        y1={cy}
        x2={cx + radius}
        y2={cy}
        stroke={ACCENT}
        strokeWidth={1.3}
        markerStart={`url(#${config.id}-accent)`}
        markerEnd={`url(#${config.id}-accent)`}
      />
      <line
        x1={cx}
        y1={cy - radius}
        x2={cx}
        y2={cy + radius}
        stroke={ACCENT}
        strokeWidth={1.1}
        markerStart={`url(#${config.id}-accent)`}
        markerEnd={`url(#${config.id}-accent)`}
      />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={8} fill={MUTED}>
        oś
      </text>
      <text x={cx} y={cy + radius + 20} textAnchor="middle" fontSize={9.5} fontWeight={600} fill={INK}>
        d = {fmt(current, 1)} mm
      </text>
      {config.dAdopted != null && (
        <text x={cx} y={cy + radius + 35} textAnchor="middle" fontSize={8.5} fill={MUTED}>
          przyjęto {fmt(config.dAdopted, 0)} mm
        </text>
      )}
      <text x={12} y={26} fontSize={9} fill={MUTED}>
        {config.labels.T}
      </text>
      <text x={12} y={41} fontSize={9} fill={MUTED}>
        τ_dop = {fmt(config.tauAllow ?? 0, 0)} MPa
      </text>
    </g>
  )
}

function MiniShaft({ config, p }: { config: TorsionConfig; p: number }) {
  const x0 = 62
  const x1 = 344
  const cy = 78
  const radius = 21
  const ellRx = 7
  const twistAngle = 0.95 * p
  const surfaceAngles = [0, Math.PI / 2, Math.PI]
  return (
    <g>
      <rect
        x={x0}
        y={cy - radius}
        width={x1 - x0}
        height={radius * 2}
        rx={5}
        fill={ACCENT}
        fillOpacity={0.1}
        stroke={ACCENT}
        strokeWidth={1.5}
      />
      <ellipse cx={x1} cy={cy} rx={ellRx} ry={radius} fill="#eef1ff" stroke={ACCENT} strokeWidth={1.2} />
      {surfaceAngles.map((angle, index) => {
        const points = Array.from({ length: 26 }, (_, step) => {
          const u = step / 25
          const x = x0 + (x1 - x0) * u
          const theta = angle + twistAngle * u
          return `${x + ellRx * Math.sin(theta)},${cy - radius * Math.cos(theta)}`
        }).join(' ')
        return (
          <polyline
            key={angle}
            points={points}
            fill="none"
            stroke={ACCENT}
            strokeWidth={index === 0 ? 1.4 : 1}
            opacity={index === 0 ? 0.85 : 0.4}
          />
        )
      })}
      <path
        d={`M ${x1} ${cy - radius - 8} A ${ellRx + 8} ${radius + 8} 0 0 1 ${x1} ${cy + radius + 8}`}
        fill="none"
        stroke={LOAD}
        strokeWidth={1.8}
        markerEnd={`url(#${config.id}-load)`}
      />
      <text x={x1 + ellRx + 13} y={cy + 3} fontSize={8.5} fontWeight={600} fill={LOAD}>
        {config.labels.T}
      </text>
      <text x={x1 + 4} y={cy - radius - 14} fontSize={8.5} fontWeight={600} fill={LOAD}>
        {config.labels.phi}
      </text>
    </g>
  )
}

function CombinedView({ config, p, tauMax }: { config: TorsionConfig; p: number; tauMax: number }) {
  return (
    <g>
      <MiniShaft config={config} p={p} />
      <SectionStress config={config} p={1} tauMax={tauMax} cx={132} cy={236} radius={50} compact />
      <StressProfile id={config.id} tauMax={tauMax} p={1} x0={272} y0={300} width={142} height={82} />
      <text x={132} y={306} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        przekrój: τ rośnie od osi do powierzchni
      </text>
    </g>
  )
}

export function TorsionVisual({
  mode,
  config,
  playing,
  sceneProgress,
  designStart,
  designTarget,
  designMin,
  dOverride,
  tauOverride,
  showGauge = false,
  gaugeValue,
  gaugeLimit,
  gaugeMax = 2.5,
  gaugeUnit = '°/m',
}: {
  mode: TorsionMode
  config: TorsionConfig
  playing: boolean
  sceneProgress: number
  designStart?: number
  designTarget?: number
  designMin?: number
  dOverride?: number
  tauOverride?: number
  showGauge?: boolean
  gaugeValue?: number
  gaugeLimit?: number
  gaugeMax?: number
  gaugeUnit?: string
}) {
  const p = playing ? smooth(sceneProgress) : 1
  const tauMax = tauOverride ?? config.tauMax
  const d = dOverride ?? config.d
  const aria =
    mode === 'stress'
      ? 'Przekrój wału z liniowym rozkładem naprężeń stycznych od zera w osi do maksimum na powierzchni'
      : mode === 'twist'
        ? 'Wał skręcany z zaznaczonym obrotem przekroju i kątem skręcenia'
        : mode === 'design'
          ? 'Przekrój wału o średnicy dobieranej z warunku wytrzymałości'
          : mode === 'section'
            ? 'Przekrój kołowy z pierścieniami ilustrującymi biegunowy moment bezwładności'
            : mode === 'load'
              ? 'Przekrój wału z momentem skręcającym działającym wokół osi'
              : mode === 'result'
                ? 'Wał skręcony oraz przekrój z liniowym rozkładem naprężeń stycznych'
                : 'Model wału pełnego obciążonego momentem skręcającym'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 330" role="img" aria-label={aria}>
          <Defs id={config.id} />
          {mode === 'model' && <ShaftView id={config.id} config={config} p={p} twist={false} />}
          {mode === 'load' && <TorqueSection config={config} p={p} />}
          {mode === 'twist' && (
            <>
              <ShaftView id={config.id} config={config} p={p} twist />
              {showGauge && (
                <PhiBar
                  p={p}
                  value={gaugeValue ?? config.phiPerMeterDeg ?? config.phiDeg}
                  limit={gaugeLimit}
                  max={gaugeMax}
                  unit={gaugeUnit}
                />
              )}
            </>
          )}
          {mode === 'section' && <SectionRings config={config} p={p} />}
          {mode === 'stress' && (
            <>
              <SectionStress config={config} p={p} tauMax={tauMax} />
              <StressProfile id={config.id} tauMax={tauMax} tauAllow={config.tauAllow} p={p} />
            </>
          )}
          {mode === 'design' && (
            <DesignSection
              config={config}
              p={p}
              dStart={designStart ?? config.d}
              dTarget={designTarget ?? d}
              dMin={designMin}
            />
          )}
          {mode === 'result' && <CombinedView config={config} p={1} tauMax={tauMax} />}
        </svg>
      </div>
    </div>
  )
}
