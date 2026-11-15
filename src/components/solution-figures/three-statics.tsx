import type { ReactNode } from 'react'
import type { ThreeLabel, ThreePrimitive, Vec3 } from './ThreeSolutionScene'

export const THREE_COLORS = {
  ink: '#17202a',
  member: '#556273',
  edge: '#68727e',
  muted: '#87929d',
  axis: '#9aa5b1',
  load: '#ff6b45',
  reaction: '#2f7d5b',
  vector: '#4f6df5',
  moment: '#a970dd',
  material: '#dce8f7',
  pale: '#eef3fb',
  support: '#68727e',
  ok: '#27835a',
}

export const v = (x: number, y: number, z: number): Vec3 => [x, y, z]
export const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
export const scale = (a: Vec3, factor: number): Vec3 => [a[0] * factor, a[1] * factor, a[2] * factor]
export const move = (from: Vec3, direction: Vec3, factor: number): Vec3 => add(from, scale(direction, factor))

export function axisSystem(origin: Vec3, lengths: Vec3 = [1, 1, 1], visibleAt = 0): ThreePrimitive[] {
  return [
    {
      kind: 'arrow',
      from: origin,
      to: move(origin, [1, 0, 0], lengths[0]),
      color: THREE_COLORS.axis,
      radius: 0.012,
      visibleAt,
    },
    {
      kind: 'arrow',
      from: origin,
      to: move(origin, [0, 1, 0], lengths[1]),
      color: THREE_COLORS.axis,
      radius: 0.012,
      visibleAt,
    },
    {
      kind: 'arrow',
      from: origin,
      to: move(origin, [0, 0, 1], lengths[2]),
      color: THREE_COLORS.axis,
      radius: 0.012,
      visibleAt,
    },
  ]
}

export function axisLabels(origin: Vec3, lengths: Vec3 = [1, 1, 1], visibleAt = 0): ThreeLabel[] {
  return [
    { id: 'axis-x', text: 'x', at: move(origin, [1, 0, 0], lengths[0]), offset: [6, 4], size: 11, visibleAt },
    { id: 'axis-y', text: 'y', at: move(origin, [0, 1, 0], lengths[1]), offset: [6, 4], size: 11, visibleAt },
    { id: 'axis-z', text: 'z', at: move(origin, [0, 0, 1], lengths[2]), offset: [6, -4], size: 11, visibleAt },
  ]
}

export function pointLabel(
  id: string,
  text: string,
  at: Vec3,
  offset: readonly [number, number] = [7, -6],
): ThreeLabel {
  return { id, text, at, offset, size: 11, weight: 700 }
}

export function ThreeStatus({ children }: { children: ReactNode }) {
  return (
    <text x="230" y="329" textAnchor="middle" fontSize="10.5" fill={THREE_COLORS.ink}>
      {children}
    </text>
  )
}

export function ThreeBadge({
  title,
  value,
  note,
  x = 304,
  y = 42,
  width = 140,
  color = THREE_COLORS.reaction,
}: {
  title?: string
  value: string
  note?: string
  x?: number
  y?: number
  width?: number
  color?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={note ? 50 : 40} rx={8} fill="#f2f8f4" stroke={color} strokeWidth={1.1} />
      {title && (
        <text x={x + width / 2} y={y + 15} textAnchor="middle" fontSize={8.5} fill={THREE_COLORS.muted}>
          {title}
        </text>
      )}
      <text
        x={x + width / 2}
        y={y + (title ? 32 : 24)}
        textAnchor="middle"
        fontSize={10.5}
        fontWeight={700}
        fill={color}
      >
        {value}
      </text>
      {note && (
        <text x={x + width / 2} y={y + 44} textAnchor="middle" fontSize={8} fill={THREE_COLORS.muted}>
          {note}
        </text>
      )}
    </g>
  )
}
