import {
  ThreeSolutionScene,
  type ThreeCamera,
  type ThreeLabel,
  type ThreePrimitive,
  type Vec3,
} from './ThreeSolutionScene'
import type { SolutionAnimationProps } from '../../types'
import { THREE_COLORS, ThreeBadge, ThreeStatus, axisLabels, axisSystem, move, pointLabel, v } from './three-statics'

type ArrowSpec = {
  from: Vec3
  to: Vec3
  text?: string
  visibleAt: number
  color?: string
  offset?: readonly [number, number]
}

export type ShaftSceneSpec = {
  label: string
  status: string[]
  start: Vec3
  end: Vec3
  bearingAt?: Vec3
  axis?: Vec3
  axisLengths?: Vec3
  discs: Array<{ at: Vec3; radius: number; color?: string; spin?: number }>
  points?: Array<{ id: string; text: string; at: Vec3; offset?: readonly [number, number] }>
  dimensions?: { points: Vec3[]; offset: Vec3; labels: Array<{ text: string; at: Vec3 }> }
  loads: ArrowSpec[]
  reactions: ArrowSpec[]
  arms?: Array<{ from: Vec3; to: Vec3; visibleAt?: number }>
  extra?: ThreePrimitive[]
  results?: { visibleAt: number; title: string; lines: string[] }
  checkPoint: string
  camera?: ThreeCamera
}

function ResultCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <g>
      <rect
        x="14"
        y="42"
        width="156"
        height={28 + lines.length * 14}
        rx="8"
        fill="#eef7f1"
        stroke={THREE_COLORS.reaction}
        strokeWidth="1.1"
      />
      <text x="24" y="59" fontSize="9" fontWeight="700" fill={THREE_COLORS.reaction}>
        {title}
      </text>
      {lines.map((line, index) => (
        <text key={line} x="24" y={75 + index * 14} fontSize="9" fill={THREE_COLORS.reaction}>
          {line}
        </text>
      ))}
    </g>
  )
}

export function ShaftThreeScene(spec: ShaftSceneSpec, props: SolutionAnimationProps) {
  const { index } = props
  const axis = spec.axis ?? v(0, 1, 0)
  const axisOrigin = move(spec.start, [-0.2, 0, 0.4], 1)
  const dimensionPoints =
    spec.dimensions?.points.map((point) => move(point, spec.dimensions?.offset ?? [0, 0, 0], 1)) ?? []
  const primitives: ThreePrimitive[] = [
    { kind: 'rod', from: spec.start, to: spec.end, radius: 0.025, color: THREE_COLORS.ink },
    { kind: 'support', at: spec.start, support: 'pin' },
    { kind: 'ring', at: spec.bearingAt ?? spec.end, radius: 0.065, tube: 0.018, axis, color: THREE_COLORS.support },
    ...spec.discs.map((disc) => ({
      kind: 'disc' as const,
      at: disc.at,
      radius: disc.radius,
      thickness: 0.045,
      axis,
      spin: disc.spin ?? 0.45,
      color: disc.color ?? THREE_COLORS.material,
    })),
    ...axisSystem(axisOrigin, spec.axisLengths ?? [0.25, 0.25, 0.25]),
    ...(spec.dimensions
      ? [
          { kind: 'line' as const, points: dimensionPoints, color: THREE_COLORS.muted, visibleAt: 1, hideAt: 2 },
          ...spec.dimensions.points.flatMap((point, dimensionIndex) => [
            {
              kind: 'line' as const,
              points: [point, dimensionPoints[dimensionIndex]],
              color: THREE_COLORS.muted,
              dashed: true,
              opacity: 0.6,
              visibleAt: 1,
              hideAt: 2,
            },
          ]),
        ]
      : []),
    ...(spec.arms ?? []).map((arm) => ({
      kind: 'line' as const,
      points: [arm.from, arm.to],
      color: THREE_COLORS.moment,
      dashed: true,
      visibleAt: arm.visibleAt ?? 3,
    })),
    ...(spec.extra ?? []),
    ...spec.loads.map((load) => ({
      kind: 'arrow' as const,
      from: load.from,
      to: load.to,
      color: load.color ?? THREE_COLORS.load,
      radius: 0.018,
      visibleAt: load.visibleAt,
      pulse: true,
    })),
    ...spec.reactions.map((reaction) => ({
      kind: 'arrow' as const,
      from: reaction.from,
      to: reaction.to,
      color: reaction.color ?? THREE_COLORS.reaction,
      radius: 0.017,
      visibleAt: reaction.visibleAt,
    })),
  ]

  const labels: ThreeLabel[] = [
    ...axisLabels(axisOrigin, spec.axisLengths ?? [0.25, 0.25, 0.25], 2).map((label) => ({
      ...label,
      hideAt: spec.results?.visibleAt,
    })),
    ...(spec.points ?? []).map((point) => ({
      ...pointLabel(point.id, point.text, point.at, point.offset),
      hideAt: spec.results?.visibleAt,
    })),
    ...(spec.dimensions?.labels.map((label, labelIndex) => ({
      id: `dimension-${labelIndex}`,
      text: label.text,
      at: move(label.at, spec.dimensions?.offset ?? [0, 0, 0], 1),
      color: THREE_COLORS.muted,
      size: 8.5,
      anchor: 'middle' as const,
      visibleAt: 1,
      hideAt: 2,
    })) ?? []),
    ...[...spec.loads, ...spec.reactions].flatMap((arrow, arrowIndex) => {
      const offset = arrow.offset ?? [6, -5]
      return arrow.text
        ? [
            {
              id: `arrow-${arrowIndex}`,
              text: arrow.text,
              at: arrow.to,
              offset,
              anchor: offset[0] < 0 ? ('end' as const) : ('start' as const),
              color: arrow.color ?? (arrowIndex < spec.loads.length ? THREE_COLORS.load : THREE_COLORS.reaction),
              size: 9,
              visibleAt: arrow.visibleAt,
              hideAt: spec.results?.visibleAt,
            },
          ]
        : []
    }),
  ]

  return (
    <ThreeSolutionScene
      {...props}
      label={spec.label}
      primitives={primitives}
      labels={labels}
      camera={spec.camera ?? { position: [1.15, -1.65, 1.05], target: [0, 0.35, 0], viewSize: 1.25 }}
    >
      {spec.results && index >= spec.results.visibleAt && (
        <ResultCard title={spec.results.title} lines={spec.results.lines} />
      )}
      {index >= 7 && <ThreeBadge value="ΣF = 0, ΣM_K = 0" note={spec.checkPoint} x={292} y={248} width={152} />}
      <ThreeStatus>{spec.status[Math.min(index, spec.status.length - 1)]}</ThreeStatus>
    </ThreeSolutionScene>
  )
}
