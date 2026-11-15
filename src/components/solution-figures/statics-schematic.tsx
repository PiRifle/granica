import { useId, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { local } from './shared'

export const SCHEMA = {
  ink: '#17202a',
  muted: '#87929d',
  grid: '#d7dde5',
  edge: '#68727e',
  load: '#ff6b45',
  moment: '#a970dd',
  reaction: '#2f7d5b',
  member: '#4f6df5',
  tension: '#2f7d5b',
  compression: '#cf5b4e',
  zero: '#9aa5b1',
  accent: '#4f6df5',
  pale: '#eef2ff',
  material: '#dfe7ff',
  cut: '#b56b3a',
  support: '#68727e',
  beam: '#dfe5ec',
} as const

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
export const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

export function revealAt(playing: boolean, sceneProgress: number, delay = 0) {
  return playing ? smooth(clamp01(sceneProgress * 4 - delay)) : 1
}

export function SchematicFrame({
  label,
  desc,
  children,
  viewBox = '0 0 460 340',
}: {
  label: string
  desc: string
  children: ReactNode
  viewBox?: string
}) {
  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox={viewBox} role="img" aria-label={label}>
          <title>{label}</title>
          <desc>{desc}</desc>
          {children}
        </svg>
      </div>
    </div>
  )
}

export function Arrow({
  from,
  to,
  color = SCHEMA.load,
  width = 2.6,
  dashed = false,
  opacity = 1,
  label,
  labelOffset = { x: 6, y: -6 },
  labelAnchor = 'start',
  labelSize = 10,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color?: string
  width?: number
  dashed?: boolean
  opacity?: number
  label?: string
  labelOffset?: { x: number; y: number }
  labelAnchor?: 'start' | 'middle' | 'end'
  labelSize?: number
}) {
  const id = useId().replace(/[:]/g, '')
  const markerId = `arrow-${id}`
  return (
    <g opacity={opacity}>
      <defs>
        <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={color} />
        </marker>
      </defs>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? '6 4' : undefined}
        markerEnd={`url(#${markerId})`}
      />
      {label && (
        <text
          x={to.x + labelOffset.x}
          y={to.y + labelOffset.y}
          fontSize={labelSize}
          fill={color}
          textAnchor={labelAnchor}
        >
          {label}
        </text>
      )}
    </g>
  )
}

export function ReactionArrow(props: Omit<Parameters<typeof Arrow>[0], 'color'> & { color?: string }) {
  return <Arrow color={SCHEMA.reaction} {...props} />
}

export function Label({
  x,
  y,
  children,
  color = SCHEMA.ink,
  size = 11,
  anchor = 'start',
  weight = 500,
}: {
  x: number
  y: number
  children: ReactNode
  color?: string
  size?: number
  anchor?: 'start' | 'middle' | 'end'
  weight?: number
}) {
  return (
    <text x={x} y={y} fontSize={size} fill={color} textAnchor={anchor} fontWeight={weight}>
      {children}
    </text>
  )
}

export function Dimension({
  from,
  to,
  label,
  color = SCHEMA.muted,
  offset = 0,
  labelOffset = { x: 0, y: -5 },
  size = 9,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  label: string
  color?: string
  offset?: number
  labelOffset?: { x: number; y: number }
  size?: number
}) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy) || 1
  const nx = (-dy / length) * offset
  const ny = (dx / length) * offset
  const a = { x: from.x + nx, y: from.y + ny }
  const b = { x: to.x + nx, y: to.y + ny }
  const mid = { x: (a.x + b.x) / 2 + labelOffset.x, y: (a.y + b.y) / 2 + labelOffset.y }
  return (
    <g stroke={color} fill={color}>
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={1} />
      <line x1={a.x - 3} y1={a.y - 3} x2={a.x + 3} y2={a.y + 3} strokeWidth={1} />
      <line x1={b.x - 3} y1={b.y - 3} x2={b.x + 3} y2={b.y + 3} strokeWidth={1} />
      <text x={mid.x} y={mid.y} fontSize={size} textAnchor="middle" stroke="none">
        {label}
      </text>
    </g>
  )
}

export function Hatch({
  x,
  y,
  direction = 'right',
  count = 7,
  length = 28,
  color = SCHEMA.edge,
}: {
  x: number
  y: number
  direction?: 'right' | 'left'
  count?: number
  length?: number
  color?: string
}) {
  return (
    <g stroke={color} strokeWidth={1.1} opacity={0.7}>
      {Array.from({ length: count }, (_, index) => {
        const offset = index * (length / count)
        return (
          <line key={index} x1={x} y1={y + offset} x2={x + (direction === 'right' ? -10 : 10)} y2={y + offset + 8} />
        )
      })}
    </g>
  )
}

export function PinSupport({ x, y, color = SCHEMA.support }: { x: number; y: number; color?: string }) {
  return (
    <g stroke={color} fill="none" strokeWidth={1.8} strokeLinejoin="round">
      <path d={`M ${x - 11} ${y + 18} L ${x} ${y} L ${x + 11} ${y + 18} Z`} />
      <line x1={x - 15} y1={y + 18} x2={x + 15} y2={y + 18} />
      <Hatch x={x - 15} y={y + 18} direction="left" count={4} length={15} color={color} />
    </g>
  )
}

export function RollerSupport({ x, y, color = SCHEMA.support }: { x: number; y: number; color?: string }) {
  return (
    <g stroke={color} fill="none" strokeWidth={1.8} strokeLinejoin="round">
      <path d={`M ${x - 11} ${y + 11} L ${x} ${y} L ${x + 11} ${y + 11} Z`} />
      <circle cx={x - 6} cy={y + 16} r={3.2} />
      <circle cx={x + 6} cy={y + 16} r={3.2} />
      <line x1={x - 15} y1={y + 21} x2={x + 15} y2={y + 21} />
    </g>
  )
}

export function FixedSupport({
  x,
  y,
  side = 'left',
  color = SCHEMA.edge,
  height = 70,
}: {
  x: number
  y: number
  side?: 'left' | 'right' | 'up'
  color?: string
  height?: number
}) {
  if (side === 'up') {
    return (
      <g stroke={color} strokeWidth={2}>
        <line x1={x - height / 2} y1={y} x2={x + height / 2} y2={y} />
        {Array.from({ length: 7 }, (_, index) => (
          <line
            key={index}
            x1={x - height / 2 + index * (height / 7)}
            y1={y}
            x2={x - height / 2 + index * (height / 7) - 9}
            y2={y - 10}
            strokeWidth={1.1}
          />
        ))}
      </g>
    )
  }
  const dir = side === 'left' ? -1 : 1
  return (
    <g stroke={color} strokeWidth={2}>
      <line x1={x} y1={y - height / 2} x2={x} y2={y + height / 2} />
      {Array.from({ length: 9 }, (_, index) => (
        <line
          key={index}
          x1={x}
          y1={y - height / 2 + index * (height / 9)}
          x2={x + dir * 11}
          y2={y - height / 2 + index * (height / 9) + 8}
          strokeWidth={1.1}
        />
      ))}
    </g>
  )
}

export function Beam({
  x1,
  x2,
  y,
  height = 12,
  color = SCHEMA.edge,
  fill = SCHEMA.beam,
}: {
  x1: number
  x2: number
  y: number
  height?: number
  color?: string
  fill?: string
}) {
  return (
    <rect
      x={Math.min(x1, x2)}
      y={y - height / 2}
      width={Math.abs(x2 - x1)}
      height={height}
      rx={3}
      fill={fill}
      stroke={color}
      strokeWidth={1.6}
    />
  )
}

export function Member({
  x1,
  y1,
  x2,
  y2,
  force,
  width = 2.4,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  force?: number
  width?: number
}) {
  const color =
    force == null ? SCHEMA.edge : force > 0.05 ? SCHEMA.tension : force < -0.05 ? SCHEMA.compression : SCHEMA.zero
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />
}

export function Node({ x, y, label, color = SCHEMA.ink }: { x: number; y: number; label?: string; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={3.4} fill={color} />
      {label && (
        <Label x={x + 5} y={y - 6} size={9.5} color={color}>
          {label}
        </Label>
      )}
    </g>
  )
}

export function Pulley({
  cx,
  cy,
  r,
  color = SCHEMA.edge,
  fill = '#ffffff',
}: {
  cx: number
  cy: number
  r: number
  color?: string
  fill?: string
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={color} strokeWidth={1.8} />
      <circle cx={cx} cy={cy} r={Math.max(3, r * 0.16)} fill={color} />
    </g>
  )
}

export function Reveal({ show, children, delay = 0 }: { show: boolean; children: ReactNode; delay?: number }) {
  return (
    <motion.g initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.25, delay }}>
      {children}
    </motion.g>
  )
}
