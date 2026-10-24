import { motion } from 'motion/react'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const BLUE = '#4f6df5'
const GREEN = '#2e9e6b'
const LOAD = '#ff6b45'
const ORANGE = '#ff6b45'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const LIMIT = '#7b61ff'
const OK = '#2e9e6b'
const AXIS = '#c9d0d9'

const SQRT3 = Math.sqrt(3)

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const ramp = (value: number, from: number, to: number) => smooth(clamp01((value - from) / (to - from)))
const fmt = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',')

export type ReducedMode = 'model' | 'state' | 'criteria' | 'equivalent' | 'check'

export interface CriterionConfig {
  key: string
  label: string
  symbol: string
  value: number
  factorTau: number
  color: string
  usesPrincipal?: boolean
}

export interface ReducedStressConfig {
  id: string
  kind: 'combined' | 'tension-torsion' | 'design'
  sigma: number
  tau?: number
  tauUnknown?: boolean
  re: number
  kr: number
  nWym: number
  principal: { s1: number; s2: number; s3: number }
  criteria: CriterionConfig[]
  loads: {
    d?: string
    N?: string
    M?: string
    T?: string
    sigma?: string
    tau?: string
  }
  design?: {
    tauLimit: number
    torque: string
    wo: string
  }
}

const markerColors = [
  ['accent', ACCENT],
  ['load', LOAD],
  ['muted', MUTED],
  ['ok', OK],
  ['violet', VIOLET],
] as const

type Tone = (typeof markerColors)[number][0]

function Defs({ id }: { id: string }) {
  return (
    <defs>
      {markerColors.map(([name, color]) => (
        <marker
          key={name}
          id={`${id}-${name}`}
          viewBox="0 0 10 10"
          refX={9}
          refY={5}
          markerWidth={5}
          markerHeight={5}
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill={color} />
        </marker>
      ))}
    </defs>
  )
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 1.8,
  amount = 1,
  dash,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
  amount?: number
  dash?: string
}) {
  const t = clamp01(amount)
  if (t < 0.01) return null
  const ex = x1 + (x2 - x1) * t
  const ey = y1 + (y2 - y1) * t
  const angle = Math.atan2(ey - y1, ex - x1)
  const head = 7
  const wing = 3.2
  const baseX = ex - head * Math.cos(angle)
  const baseY = ey - head * Math.sin(angle)
  const lx = baseX - wing * Math.sin(angle)
  const ly = baseY + wing * Math.cos(angle)
  const rx = baseX + wing * Math.sin(angle)
  const ry = baseY - wing * Math.cos(angle)

  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />
      {t > 0.2 && <polygon points={`${ex},${ey} ${lx},${ly} ${rx},${ry}`} stroke="none" />}
    </g>
  )
}

function ArcArrow({
  id,
  cx,
  cy,
  rx,
  ry,
  start,
  end,
  color,
  tone,
  amount = 1,
  dash,
}: {
  id: string
  cx: number
  cy: number
  rx: number
  ry: number
  start: number
  end: number
  color: string
  tone: Tone
  amount?: number
  dash?: string
}) {
  const t = clamp01(amount)
  if (t < 0.02) return null
  const span = end - start
  const a1 = start + span * t
  const sx = cx + rx * Math.cos(start)
  const sy = cy + ry * Math.sin(start)
  const ex = cx + rx * Math.cos(a1)
  const ey = cy + ry * Math.sin(a1)
  const large = Math.abs(span) > Math.PI ? 1 : 0
  const sweep = span > 0 ? 1 : 0
  return (
    <path
      d={`M ${sx} ${sy} A ${rx} ${ry} 0 ${large} ${sweep} ${ex} ${ey}`}
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeDasharray={dash}
      markerEnd={`url(#${id}-${tone})`}
      opacity={t}
    />
  )
}

function VDim({
  x,
  from,
  to,
  label,
  color = MUTED,
}: {
  x: number
  from: number
  to: number
  label: string
  color?: string
}) {
  const mid = (from + to) / 2
  return (
    <g stroke={color} fill={color}>
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1.1} />
      <line x1={x - 4} y1={from} x2={x + 4} y2={from} strokeWidth={1.1} />
      <line x1={x - 4} y1={to} x2={x + 4} y2={to} strokeWidth={1.1} />
      <text
        x={x + 9}
        y={mid}
        textAnchor="middle"
        fontSize={8.5}
        stroke="none"
        transform={`rotate(-90 ${x + 9} ${mid})`}
      >
        {label}
      </text>
    </g>
  )
}

function ShaftModel({ config, p }: { config: ReducedStressConfig; p: number }) {
  const x0 = 74
  const x1 = 332
  const cy = 154
  const radius = 30
  const ell = 9
  const pointX = x1 - 52
  const pointY = cy - radius
  const showN = config.loads.N != null
  const showM = config.loads.M != null
  const isTension = config.kind === 'tension-torsion'
  const showAxial = showN || isTension
  const support = ramp(p, 0, 0.24)

  return (
    <g>
      <text x={14} y={24} fontSize={9} fill={MUTED}>
        model wału · punkt A na powierzchni
      </text>
      <text x={14} y={40} fontSize={9} fill={MUTED}>
        R_e = {fmt(config.re, 0)} MPa · n_wym = {fmt(config.nWym, 1)}
      </text>
      {isTension ? (
        <>
          <text x={14} y={58} fontSize={9} fill={BLUE}>
            {config.loads.sigma}
          </text>
          <text x={14} y={72} fontSize={9} fill={VIOLET}>
            {config.loads.tau}
          </text>
        </>
      ) : (
        <text x={14} y={58} fontSize={9} fill={MUTED}>
          {config.loads.d ? `d = ${config.loads.d}` : ''}
        </text>
      )}

      <line x1={x0} y1={cy - radius - 18} x2={x0} y2={cy + radius + 18} stroke={EDGE} strokeWidth={2.4} />
      {Array.from({ length: 9 }, (_, index) => {
        const y = cy - radius - 14 + (index * (radius * 2 + 28)) / 8
        return (
          <line key={index} x1={x0} y1={y} x2={x0 - 9} y2={y - 7} stroke={EDGE} strokeWidth={1.1} opacity={support} />
        )
      })}

      <rect
        x={x0}
        y={cy - radius}
        width={x1 - x0}
        height={radius * 2}
        rx={6}
        fill={ACCENT}
        fillOpacity={0.08}
        stroke={ACCENT}
        strokeWidth={1.7}
      />
      <ellipse cx={x1} cy={cy} rx={ell} ry={radius} fill="#eef1ff" stroke={ACCENT} strokeWidth={1.3} />
      <line x1={x0} y1={cy - radius} x2={x1} y2={cy - radius} stroke={ACCENT} strokeWidth={1.2} opacity={0.8} />

      <circle cx={pointX} cy={pointY} r={3.8} fill={INK} />
      <text x={pointX + 7} y={pointY - 7} fontSize={9.5} fontWeight={700} fill={INK}>
        A
      </text>

      {showAxial && (
        <>
          <Arrow
            x1={x1 + 28}
            y1={cy}
            x2={x1 + 84}
            y2={cy}
            color={isTension ? BLUE : LOAD}
            amount={ramp(p, 0.08, 0.38)}
          />
          <text x={x1 + 56} y={cy - 9} textAnchor="middle" fontSize={9} fill={isTension ? BLUE : LOAD}>
            {showN ? config.loads.N : 'σ'}
          </text>
        </>
      )}

      {showM && (
        <>
          <ArcArrow
            id={config.id}
            cx={x1 - 72}
            cy={cy - radius - 34}
            rx={46}
            ry={17}
            start={Math.PI}
            end={Math.PI * 2}
            color={LOAD}
            tone="load"
            amount={ramp(p, 0.18, 0.48)}
          />
          <text x={x1 - 72} y={cy - radius - 56} textAnchor="middle" fontSize={9} fill={LOAD}>
            {config.loads.M}
          </text>
        </>
      )}

      <ArcArrow
        id={config.id}
        cx={x1}
        cy={cy}
        rx={ell + 17}
        ry={radius + 17}
        start={-Math.PI / 2}
        end={Math.PI / 2}
        color={config.tauUnknown ? MUTED : LOAD}
        tone={config.tauUnknown ? 'muted' : 'load'}
        amount={ramp(p, 0.3, 0.62)}
        dash={config.tauUnknown ? '5 4' : undefined}
      />
      <text x={x1 + ell + 23} y={cy + 14} fontSize={9} fill={config.tauUnknown ? MUTED : LOAD}>
        {config.loads.T ?? (isTension ? 'τ' : '')}
      </text>

      {config.loads.d && <VDim x={x0 - 22} from={cy - radius} to={cy + radius} label={`d = ${config.loads.d}`} />}

      <text x={230} y={272} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        {isTension
          ? 'naprężenie normalne i styczne działają w tym samym punkcie'
          : 'zginanie i skręcanie działają równocześnie na włókno A'}
      </text>
    </g>
  )
}

function StressElement({ config, p, unknown = false }: { config: ReducedStressConfig; p: number; unknown?: boolean }) {
  const left = 54
  const right = 150
  const top = 96
  const bottom = 202
  const midX = (left + right) / 2
  const midY = (top + bottom) / 2
  const reveal = ramp(p, 0.04, 0.5)
  const tau = config.tau ?? 0

  return (
    <g>
      <text x={14} y={24} fontSize={9} fill={MUTED}>
        stan naprężenia w punkcie A
      </text>
      <rect
        x={left}
        y={top}
        width={right - left}
        height={bottom - top}
        fill="#f6f8fd"
        stroke={EDGE}
        strokeWidth={1.6}
      />

      <Arrow x1={right} y1={midY} x2={right + 38} y2={midY} color={BLUE} amount={reveal} />
      <Arrow x1={left} y1={midY} x2={left - 38} y2={midY} color={BLUE} amount={reveal} />
      <text x={right + 42} y={midY + 3} fontSize={9} fontWeight={600} fill={BLUE}>
        σx = {fmt(config.sigma)}
      </text>
      <Arrow
        x1={midX - 10}
        y1={top + 13}
        x2={midX + 38}
        y2={top + 13}
        color={VIOLET}
        amount={reveal}
        dash={unknown ? '5 4' : undefined}
      />
      <Arrow
        x1={midX + 10}
        y1={bottom - 13}
        x2={midX - 38}
        y2={bottom - 13}
        color={VIOLET}
        amount={reveal}
        dash={unknown ? '5 4' : undefined}
      />
      <Arrow
        x1={right - 13}
        y1={midY + 10}
        x2={right - 13}
        y2={midY - 38}
        color={VIOLET}
        amount={reveal}
        dash={unknown ? '5 4' : undefined}
      />
      <Arrow
        x1={left + 13}
        y1={midY - 10}
        x2={left + 13}
        y2={midY + 38}
        color={VIOLET}
        amount={reveal}
        dash={unknown ? '5 4' : undefined}
      />
      <text x={midX + 42} y={top + 10} fontSize={9} fontWeight={600} fill={VIOLET}>
        {unknown ? 'τ = ?' : `τ = ${fmt(tau)}`}
      </text>
      <text x={midX} y={midY + 4} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        σy = 0
      </text>
      <text x={midX} y={bottom + 22} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        {unknown ? 'τ wyznaczymy z warunku' : 'znak σ decyduje o rozciąganiu/ściskaniu'}
      </text>
    </g>
  )
}

function MohrPanel({ config, p }: { config: ReducedStressConfig; p: number }) {
  const sigma = config.sigma
  const tau = config.tau ?? 0
  const { s1, s2 } = config.principal
  const x0 = 250
  const x1 = 448
  const yTop = 94
  const yBottom = 258
  const yC = 172
  const sMin = Math.min(s2, 0) - 8
  const sMax = Math.max(s1, 0) + 8
  const radius = (s1 - s2) / 2
  const center = (s1 + s2) / 2
  const tauMax = Math.max(radius * 1.2, Math.abs(tau) * 1.2, 1)
  const scale = Math.min((x1 - x0) / (sMax - sMin), (yBottom - yTop) / 2 / tauMax)
  const xOf = (value: number) => x0 + (value - sMin) * scale
  const yOf = (value: number) => yC - value * scale
  const circleP = ramp(p, 0.12, 0.55)
  const pointP = ramp(p, 0.3, 0.7)
  const principalP = ramp(p, 0.5, 0.9)

  return (
    <g>
      <text x={250} y={24} fontSize={9} fill={MUTED}>
        koło Mohra: σ₁ i σ₂
      </text>
      <line x1={x0 - 4} y1={yC} x2={x1} y2={yC} stroke={AXIS} strokeWidth={1} />
      <line x1={xOf(0)} y1={yTop} x2={xOf(0)} y2={yBottom} stroke={AXIS} strokeWidth={1} />
      <text x={x1} y={yC - 6} textAnchor="end" fontSize={8.5} fill={MUTED}>
        σ
      </text>
      <text x={xOf(0) + 5} y={yTop + 8} fontSize={8.5} fill={MUTED}>
        τ
      </text>

      <motion.circle
        cx={xOf(center)}
        cy={yC}
        r={radius * scale * circleP}
        fill="none"
        stroke={ACCENT}
        strokeWidth={2}
        initial={false}
        animate={{ r: radius * scale * circleP, opacity: circleP > 0.02 ? 1 : 0 }}
      />

      <motion.line
        x1={xOf(sigma)}
        y1={yOf(tau)}
        x2={xOf(0)}
        y2={yOf(-tau)}
        stroke={VIOLET}
        strokeWidth={1.3}
        strokeDasharray="4 3"
        initial={false}
        animate={{ opacity: pointP }}
      />
      <motion.g initial={false} animate={{ opacity: pointP }}>
        <circle cx={xOf(sigma)} cy={yOf(tau)} r={3.6} fill={BLUE} />
        <text x={xOf(sigma) + 7} y={yOf(tau) - 6} fontSize={8.5} fill={BLUE}>
          X
        </text>
        <circle cx={xOf(0)} cy={yOf(-tau)} r={3.6} fill={GREEN} />
        <text x={xOf(0) - 12} y={yOf(-tau) + 12} fontSize={8.5} fill={GREEN}>
          Y
        </text>
        <text x={xOf(center) + 5} y={yC + 14} fontSize={8.5} fill={INK}>
          C
        </text>
      </motion.g>

      <motion.g initial={false} animate={{ opacity: principalP }}>
        <circle cx={xOf(s1)} cy={yC} r={3.2} fill={BLUE} />
        <circle cx={xOf(s2)} cy={yC} r={3.2} fill={GREEN} />
        <text x={xOf(s1)} y={yC - 9} textAnchor="middle" fontSize={8.5} fill={BLUE}>
          σ1={fmt(s1, 1)}
        </text>
        <text x={xOf(s2)} y={yC - 9} textAnchor="middle" fontSize={8.5} fill={GREEN}>
          σ2={fmt(s2, 1)}
        </text>
        <text x={xOf(center)} y={yC + 26} textAnchor="middle" fontSize={8} fill={MUTED}>
          R = {fmt(radius, 1)} MPa
        </text>
      </motion.g>

      <text x={250} y={280} fontSize={8} fill={MUTED}>
        σ1, σ2 to skrajne naprężenia normalne
      </text>
    </g>
  )
}

function UnknownMohr({ config, p }: { config: ReducedStressConfig; p: number }) {
  const x0 = 250
  const x1 = 448
  const yTop = 94
  const yBottom = 258
  const yC = 172
  const sMax = 120
  const scale = Math.min((x1 - x0) / sMax, (yBottom - yTop) / 2 / 80)
  const xOf = (value: number) => x0 + value * scale
  const reveal = ramp(p, 0.1, 0.6)

  return (
    <g>
      <text x={250} y={24} fontSize={9} fill={MUTED}>
        położenie punktu X na kole Mohra
      </text>
      <line x1={x0} y1={yC} x2={x1} y2={yC} stroke={AXIS} strokeWidth={1} />
      <line x1={xOf(0)} y1={yTop} x2={xOf(0)} y2={yBottom} stroke={AXIS} strokeWidth={1} />
      <text x={x1} y={yC - 6} textAnchor="end" fontSize={8.5} fill={MUTED}>
        σ
      </text>
      <text x={xOf(0) + 5} y={yTop + 8} fontSize={8.5} fill={MUTED}>
        τ
      </text>
      <motion.line
        x1={xOf(config.sigma)}
        y1={yC}
        x2={xOf(config.sigma)}
        y2={yTop + 18}
        stroke={VIOLET}
        strokeWidth={1.4}
        strokeDasharray="5 4"
        initial={false}
        animate={{ opacity: reveal }}
      />
      <motion.g initial={false} animate={{ opacity: reveal }}>
        <circle cx={xOf(config.sigma)} cy={yTop + 18} r={4} fill="none" stroke={VIOLET} strokeWidth={1.4} />
        <text x={xOf(config.sigma) + 8} y={yTop + 22} fontSize={9} fill={VIOLET}>
          τ = ?
        </text>
        <text x={xOf(config.sigma) + 8} y={yC - 8} fontSize={8.5} fill={BLUE}>
          σ = {fmt(config.sigma)}
        </text>
      </motion.g>
      <text x={250} y={280} fontSize={8} fill={MUTED}>
        przy nieznanym τ nie znamy promienia koła
      </text>
    </g>
  )
}

function CriterionRows({ config, p }: { config: ReducedStressConfig; p: number }) {
  const tau = config.tau ?? 0
  const rows = config.criteria
  const top = 50
  const available = 224
  const rowH = available / rows.length
  const maxV = Math.max(...rows.map((criterion) => (criterion.usesPrincipal ? 0 : criterion.factorTau * tau)), 0)
  const maxH = Math.max(config.sigma, 1)
  const maxHyp = Math.max(...rows.map((criterion) => criterion.value), 1)
  const scale = Math.min(maxV > 0 ? (rowH * 0.78) / maxV : 1.2, 185 / maxH, 195 / maxHyp)
  const originX = 56

  return (
    <g>
      <text x={14} y={22} fontSize={9} fill={MUTED}>
        redukcja stanu do jednej liczby
      </text>
      <text x={14} y={36} fontSize={8.5} fill={MUTED}>
        σ = {fmt(config.sigma)} MPa · τ = {fmt(tau)} MPa
      </text>
      {rows.map((criterion, index) => {
        const yBase = top + rowH * (index + 0.78)
        const reveal = ramp(p, 0.16 + index * 0.16, 0.55 + index * 0.16)

        if (criterion.usesPrincipal) {
          const xEnd = originX + criterion.value * scale
          return (
            <g key={criterion.key}>
              <text x={originX} y={yBase - rowH * 0.52} fontSize={8.5} fill={criterion.color}>
                {criterion.label}: |σ_i|max
              </text>
              <line
                x1={originX}
                y1={yBase}
                x2={originX + Math.max(maxH, criterion.value) * scale}
                y2={yBase}
                stroke={AXIS}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <Arrow x1={originX} y1={yBase} x2={xEnd} y2={yBase} color={criterion.color} amount={reveal} width={2.4} />
              <text x={xEnd + 6} y={yBase - 5} fontSize={9} fontWeight={600} fill={criterion.color}>
                {criterion.symbol} = {fmt(criterion.value)} MPa
              </text>
              <text x={originX} y={yBase + 14} fontSize={8} fill={MUTED}>
                σ1 = {fmt(config.principal.s1, 1)}, σ2 = {fmt(config.principal.s2, 1)}
              </text>
            </g>
          )
        }

        const xTip = originX + config.sigma * scale
        const yTip = yBase - criterion.factorTau * tau * scale
        const legLabel = criterion.factorTau === SQRT3 ? '√3τ' : criterion.factorTau === 2 ? '2τ' : 'τ'

        return (
          <g key={criterion.key}>
            <text x={originX} y={yBase - rowH * 0.56} fontSize={8.5} fill={criterion.color}>
              {criterion.label}
            </text>
            <Arrow x1={originX} y1={yBase} x2={xTip} y2={yBase} color={BLUE} amount={reveal} width={2.2} />
            <Arrow x1={xTip} y1={yBase} x2={xTip} y2={yTip} color={criterion.color} amount={reveal} width={2.2} />
            <motion.path
              d={`M ${originX} ${yBase} L ${xTip} ${yTip}`}
              fill="none"
              stroke={criterion.color}
              strokeWidth={2.4}
              initial={false}
              animate={{ pathLength: reveal, opacity: reveal > 0.03 ? 1 : 0 }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
            <circle cx={xTip} cy={yTip} r={3} fill={criterion.color} opacity={reveal} />
            <text x={xTip + 7} y={yTip + 3} fontSize={9} fontWeight={600} fill={criterion.color}>
              {criterion.symbol} = {fmt(criterion.value)} MPa
            </text>
            <text x={originX + (xTip - originX) / 2} y={yBase + 11} textAnchor="middle" fontSize={8} fill={BLUE}>
              σ
            </text>
            <text x={xTip + 6} y={(yBase + yTip) / 2} fontSize={8} fill={criterion.color}>
              {legLabel}
            </text>
          </g>
        )
      })}
      <text x={230} y={292} textAnchor="middle" fontSize={8} fill={MUTED}>
        długość przeciwprostokątnej = σ_red
      </text>
    </g>
  )
}

function DesignBoundary({ config, p }: { config: ReducedStressConfig; p: number }) {
  const tauLimit = config.design?.tauLimit ?? 0
  const color = config.criteria[0]?.color ?? ACCENT
  const ox = 88
  const oy = 252
  const scale = Math.min((330 - ox) / config.kr, (oy - 48) / config.kr)
  const radius = config.kr * scale
  const reveal = ramp(p, 0.08, 0.55)
  const tauNow = tauLimit * reveal
  const xSigma = ox + config.sigma * scale
  const yTau = oy - SQRT3 * tauNow * scale
  const redNow = Math.sqrt(config.sigma * config.sigma + 3 * tauNow * tauNow)

  return (
    <g>
      <text x={14} y={22} fontSize={9} fill={MUTED}>
        warunek HMH: σ² + 3τ² ≤ k_r²
      </text>
      <line x1={ox} y1={oy} x2={ox + radius + 24} y2={oy} stroke={AXIS} strokeWidth={1.1} />
      <line x1={ox} y1={oy} x2={ox} y2={oy - radius - 16} stroke={AXIS} strokeWidth={1.1} />
      <text x={ox + radius + 26} y={oy + 4} fontSize={8.5} fill={MUTED}>
        σ
      </text>
      <text x={ox + 5} y={oy - radius - 20} fontSize={8.5} fill={MUTED}>
        √3τ
      </text>

      <motion.path
        d={`M ${ox} ${oy - radius} A ${radius} ${radius} 0 0 1 ${ox + radius} ${oy}`}
        fill="none"
        stroke={LIMIT}
        strokeWidth={1.6}
        strokeDasharray="6 4"
        initial={false}
        animate={{ pathLength: reveal, opacity: reveal > 0.02 ? 1 : 0 }}
      />
      <text x={ox + radius * 0.72} y={oy - radius * 0.72 - 8} fontSize={8.5} fill={LIMIT}>
        k_r = {fmt(config.kr, 1)} MPa
      </text>

      <Arrow x1={ox} y1={oy} x2={xSigma} y2={oy} color={BLUE} amount={reveal} width={2.2} />
      <text x={(ox + xSigma) / 2} y={oy + 14} textAnchor="middle" fontSize={8.5} fill={BLUE}>
        σ = {fmt(config.sigma)}
      </text>
      <Arrow x1={xSigma} y1={oy} x2={xSigma} y2={yTau} color={VIOLET} amount={reveal} width={2.2} />
      <text x={xSigma + 6} y={(oy + yTau) / 2} fontSize={8.5} fill={VIOLET}>
        √3τ
      </text>

      <motion.path
        d={`M ${ox} ${oy} L ${xSigma} ${yTau}`}
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        initial={false}
        animate={{ opacity: reveal > 0.03 ? 1 : 0 }}
      />
      <circle cx={xSigma} cy={yTau} r={3.5} fill={color} opacity={reveal} />
      <text x={xSigma + 8} y={yTau - 6} fontSize={9} fontWeight={600} fill={color}>
        σ_HMH = {fmt(redNow)} MPa
      </text>

      <text x={ox} y={oy + 28} fontSize={8.5} fill={MUTED}>
        τ = {fmt(tauNow)} MPa → τ_dop = {fmt(tauLimit)} MPa
      </text>
      <text x={ox} y={oy + 42} fontSize={8} fill={MUTED}>
        wektor dotyka granicy, gdy σ_red = k_r
      </text>
    </g>
  )
}

function EquivalentPanel({ config, p }: { config: ReducedStressConfig; p: number }) {
  const x0 = 70
  const x1 = 432
  const rows = config.criteria.length
  const axisY = 94 + rows * 36 + 18
  const maxV = Math.max(...config.criteria.map((criterion) => criterion.value), 1) * 1.25
  const xOf = (value: number) => x0 + (value / maxV) * (x1 - x0)

  return (
    <g>
      <text x={14} y={22} fontSize={9} fill={MUTED}>
        jedna liczba dla całego stanu
      </text>
      <text x={14} y={36} fontSize={8.5} fill={MUTED}>
        σ = {fmt(config.sigma)} MPa, τ = {fmt(config.tau ?? 0)} MPa
      </text>
      <line x1={x0} y1={axisY} x2={x1} y2={axisY} stroke={AXIS} strokeWidth={1.1} />
      <text x={x0 - 6} y={axisY + 4} textAnchor="end" fontSize={8} fill={MUTED}>
        0
      </text>
      <text x={x1} y={axisY + 18} textAnchor="end" fontSize={8} fill={MUTED}>
        σ_red [MPa]
      </text>

      {config.criteria.map((criterion, index) => {
        const y = 94 + index * 36
        const reveal = ramp(p, 0.1 + index * 0.15, 0.5 + index * 0.15)
        const width = (xOf(criterion.value) - x0) * reveal
        return (
          <g key={criterion.key}>
            <text x={14} y={y - 4} fontSize={8.5} fill={criterion.color}>
              {criterion.label}
            </text>
            <rect
              x={x0}
              y={y - 6}
              width={x1 - x0}
              height={12}
              rx={6}
              fill="#eef1f4"
              stroke="#d7dde4"
              strokeWidth={0.8}
            />
            <motion.rect
              x={x0}
              y={y - 6}
              height={12}
              rx={6}
              fill={criterion.color}
              fillOpacity={0.28}
              initial={false}
              animate={{ width }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
            <line x1={x0 + width} y1={y - 10} x2={x0 + width} y2={y + 10} stroke={criterion.color} strokeWidth={1.8} />
            <text x={x0 + width + 7} y={y + 4} fontSize={8.5} fontWeight={600} fill={criterion.color}>
              {criterion.symbol} = {fmt(criterion.value)} MPa
            </text>
          </g>
        )
      })}

      <text x={230} y={262} textAnchor="middle" fontSize={8.5} fill={MUTED}>
        σ i τ nie dodają się jak liczby — hipoteza łączy je geometrycznie
      </text>
    </g>
  )
}

function DesignEquivalent({ config, p }: { config: ReducedStressConfig; p: number }) {
  const design = config.design
  const tauLimit = design?.tauLimit ?? 0
  const x0 = 72
  const x1 = 420
  const y0 = 128
  const maxV = tauLimit * 1.3
  const xOf = (value: number) => x0 + (value / maxV) * (x1 - x0)
  const reveal = ramp(p, 0.08, 0.55)
  const markerX = xOf(tauLimit * reveal)

  return (
    <g>
      <text x={14} y={22} fontSize={9} fill={MUTED}>
        dopuszczalne τ i moment skręcający
      </text>
      <line x1={x0} y1={y0} x2={x1} y2={y0} stroke={AXIS} strokeWidth={1.1} />
      <text x={x0 - 6} y={y0 + 4} textAnchor="end" fontSize={8} fill={MUTED}>
        0
      </text>
      <text x={x1} y={y0 + 18} textAnchor="end" fontSize={8} fill={MUTED}>
        τ [MPa]
      </text>
      <rect x={x0} y={y0 - 5} width={x1 - x0} height={10} rx={5} fill="#eef1f4" stroke="#d7dde4" strokeWidth={0.8} />
      <motion.rect
        x={x0}
        y={y0 - 5}
        height={10}
        rx={5}
        fill={ACCENT}
        fillOpacity={0.3}
        initial={false}
        animate={{ width: markerX - x0 }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <line x1={markerX} y1={y0 - 10} x2={markerX} y2={y0 + 10} stroke={ACCENT} strokeWidth={1.8} />
      <text x={markerX} y={y0 - 14} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={ACCENT}>
        τ = {fmt(tauLimit * reveal)} MPa
      </text>

      <circle cx={150} cy={222} r={42} fill={ACCENT} fillOpacity={0.08} stroke={ACCENT} strokeWidth={1.5} />
      <circle cx={150} cy={222} r={3} fill={INK} />
      <ArcArrow
        id={config.id}
        cx={150}
        cy={222}
        rx={58}
        ry={58}
        start={-Math.PI / 2}
        end={Math.PI / 2}
        color={LOAD}
        tone="load"
        amount={reveal}
      />
      <text x={150} y={286} textAnchor="middle" fontSize={9} fontWeight={600} fill={LOAD}>
        T = {design?.torque}
      </text>
      <text x={240} y={204} fontSize={8.5} fill={MUTED}>
        W_o = {design?.wo}
      </text>
      <text x={240} y={220} fontSize={8.5} fill={MUTED}>
        T = τ · W_o
      </text>
      <text x={240} y={244} fontSize={8} fill={MUTED}>
        moment wynika z dopuszczalnego τ
      </text>
    </g>
  )
}

function CheckPanel({ config, p }: { config: ReducedStressConfig; p: number }) {
  const x0 = 74
  const x1 = 436
  const yBase = 238
  const yTop = 70
  const maxV = Math.max(config.re, config.kr, ...config.criteria.map((criterion) => criterion.value))
  const yOf = (value: number) => yBase - (value / maxV) * (yBase - yTop)
  const rows = config.criteria
  const step = 20
  const barW = 40
  const totalW = rows.length * barW + (rows.length - 1) * step
  const startX = x0 + (x1 - x0 - totalW) / 2
  const worst = rows.reduce((best, criterion) => (criterion.value > best.value ? criterion : best), rows[0])
  const nWorst = config.re / worst.value
  const ok = nWorst >= config.nWym - 1e-6
  const equality = Math.abs(nWorst - config.nWym) < 0.01

  return (
    <g>
      <text x={14} y={22} fontSize={9} fill={MUTED}>
        sprawdzenie: σ_red ≤ k_r i n_rz ≥ n_wym
      </text>
      <line x1={x0} y1={yBase} x2={x1} y2={yBase} stroke={AXIS} strokeWidth={1.1} />
      <line x1={x0} y1={yBase} x2={x0} y2={yTop - 8} stroke={AXIS} strokeWidth={1.1} />
      <text x={x0 - 6} y={yBase + 4} textAnchor="end" fontSize={8} fill={MUTED}>
        0
      </text>

      <line
        x1={x0}
        y1={yOf(config.kr)}
        x2={x1}
        y2={yOf(config.kr)}
        stroke={LIMIT}
        strokeWidth={1.5}
        strokeDasharray="6 4"
      />
      <text x={x0 + 6} y={yOf(config.kr) - 5} fontSize={8} fill={LIMIT}>
        k_r = {fmt(config.kr, 1)} MPa
      </text>
      <line
        x1={x0}
        y1={yOf(config.re)}
        x2={x1}
        y2={yOf(config.re)}
        stroke={ORANGE}
        strokeWidth={1.3}
        strokeDasharray="3 4"
      />
      <text x={x0 + 6} y={yOf(config.re) - 5} fontSize={8} fill={ORANGE}>
        R_e = {fmt(config.re, 0)} MPa
      </text>

      {rows.map((criterion, index) => {
        const x = startX + index * (barW + step)
        const height = (yBase - yOf(criterion.value)) * p
        const y = yBase - height
        const n = config.re / criterion.value
        return (
          <g key={criterion.key}>
            <motion.rect
              x={x}
              y={yOf(criterion.value)}
              width={barW}
              height={yBase - yOf(criterion.value)}
              rx={3}
              fill={criterion.color}
              fillOpacity={0.3}
              stroke={criterion.color}
              strokeWidth={1.2}
              initial={false}
              animate={{ y, height }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
            <circle cx={x + barW / 2} cy={y} r={3} fill={criterion.color} />
            <text x={x + barW / 2} y={y - 7} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={criterion.color}>
              {fmt(criterion.value)}
            </text>
            <text x={x + barW / 2} y={yBase + 13} textAnchor="middle" fontSize={8} fill={criterion.color}>
              {criterion.label}
            </text>
            <text x={x + barW / 2} y={yBase + 25} textAnchor="middle" fontSize={7.5} fill={MUTED}>
              n={fmt(n, 2)}
            </text>
          </g>
        )
      })}

      <rect
        x={x0 + 34}
        y={264}
        width={330}
        height={26}
        rx={13}
        fill={ok ? '#eaf6f0' : '#fdeee9'}
        stroke={ok ? OK : ORANGE}
        strokeWidth={1.2}
      />
      <text x={x0 + 46} y={281} fontSize={9} fontWeight={600} fill={ok ? OK : ORANGE}>
        {ok ? 'warunek spełniony' : 'warunek przekroczony'} · n_rz = {fmt(nWorst, 2)} {equality ? '=' : '≥'} n_wym ={' '}
        {fmt(config.nWym, 1)}
      </text>
    </g>
  )
}

export function ReducedStressVisual({
  mode,
  config,
  playing,
  sceneProgress,
}: {
  mode: ReducedMode
  config: ReducedStressConfig
  playing: boolean
  sceneProgress: number
}) {
  const p = playing ? smooth(sceneProgress) : 1
  const aria =
    mode === 'model'
      ? 'Model wału z obciążeniami i punktem A na powierzchni'
      : mode === 'state'
        ? 'Element naprężeń z sigma i tau oraz koło Mohra'
        : mode === 'criteria'
          ? 'Geometryczna redukcja stanu naprężenia według hipotez'
          : mode === 'equivalent'
            ? 'Naprężenia zredukowane na skali'
            : 'Porównanie naprężenia zredukowanego z granicą i współczynnikiem bezpieczeństwa'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 300" role="img" aria-label={aria}>
          <Defs id={config.id} />
          {mode === 'model' && <ShaftModel config={config} p={p} />}
          {mode === 'state' && (
            <g>
              <StressElement config={config} p={p} unknown={config.tauUnknown} />
              {config.tauUnknown ? <UnknownMohr config={config} p={p} /> : <MohrPanel config={config} p={p} />}
            </g>
          )}
          {mode === 'criteria' &&
            (config.kind === 'design' ? (
              <DesignBoundary config={config} p={p} />
            ) : (
              <CriterionRows config={config} p={p} />
            ))}
          {mode === 'equivalent' &&
            (config.kind === 'design' ? (
              <DesignEquivalent config={config} p={p} />
            ) : (
              <EquivalentPanel config={config} p={p} />
            ))}
          {mode === 'check' && <CheckPanel config={config} p={p} />}
        </svg>
      </div>
    </div>
  )
}
