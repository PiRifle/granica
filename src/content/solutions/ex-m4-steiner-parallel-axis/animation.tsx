import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const HOT = '#ff6b45'
const MUTED = '#87929d'
const INK = '#17202a'
const LINE = '#c9d0d9'
const GREEN = '#2f7d5b'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const sx = (value: number) => 68 + value
const sy = (value: number) => 222 - value * 0.9
const AXIS_FROM = 32
const AXIS_TO = 248
const PANEL_BASE = 252

function VDimension({
  x,
  from,
  to,
  label,
  color = MUTED,
  opacity = 1,
  delay = 0,
}: {
  x: number
  from: number
  to: number
  label: string
  color?: string
  opacity?: number
  delay?: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.3, delay }}
      stroke={color}
      fill={color}
    >
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1.1} />
      <line x1={x - 4} y1={from} x2={x + 4} y2={from} strokeWidth={1.1} />
      <line x1={x - 4} y1={to} x2={x + 4} y2={to} strokeWidth={1.1} />
      <text x={x + 6} y={(from + to) / 2 + 3} fontSize={9} stroke="none">
        {label}
      </text>
    </motion.g>
  )
}

function Axis({
  y,
  color = MUTED,
  dashed = false,
  width = 1.2,
  opacity = 1,
  label,
}: {
  y: number
  color?: string
  dashed?: boolean
  width?: number
  opacity?: number
  label?: string
}) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity }} transition={{ duration: 0.35 }}>
      <line
        x1={AXIS_FROM}
        y1={y}
        x2={AXIS_TO}
        y2={y}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? '6 4' : undefined}
      />
      {label && (
        <text x={AXIS_FROM - 2} y={y - 5} fontSize={9} fill={color} textAnchor="start">
          {label}
        </text>
      )}
    </motion.g>
  )
}

function GrowthBar({ value, max, label }: { value: number; max: number; label: string }) {
  const height = 118 * (value / max)
  const x = 336
  return (
    <g>
      <line x1={x - 10} y1={PANEL_BASE + 2} x2={x + 62} y2={PANEL_BASE + 2} stroke={LINE} strokeWidth={1} />
      <motion.rect
        x={x}
        width={52}
        fill={HOT}
        fillOpacity={0.2}
        stroke={HOT}
        strokeWidth={1.4}
        initial={false}
        animate={{ y: PANEL_BASE - height, height }}
        transition={{ duration: 0.12, ease: 'linear' }}
      />
      <text x={x + 26} y={PANEL_BASE + 16} textAnchor="middle" fontSize={9} fill={MUTED}>
        A d²
      </text>
      <text x={x + 26} y={PANEL_BASE - height - 8} textAnchor="middle" fontSize={9} fontWeight={700} fill={HOT}>
        {label}
      </text>
    </g>
  )
}

function StackedContribution({
  x,
  base,
  parts,
  totalLabel,
}: {
  x: number
  base: number
  parts: Array<{ height: number; color: string; label: string }>
  totalLabel: string
}) {
  let cursor = base
  return (
    <g>
      <line x1={x - 10} y1={base + 2} x2={x + 84} y2={base + 2} stroke={LINE} strokeWidth={1} />
      {parts.map((part, index) => {
        const y = cursor - part.height
        cursor = y
        return (
          <g key={index}>
            <motion.rect
              x={x}
              width={54}
              fill={part.color}
              fillOpacity={0.2}
              stroke={part.color}
              strokeWidth={1.2}
              initial={{ y: base, height: 0 }}
              animate={{ y, height: part.height }}
              transition={{ duration: 0.45, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            />
            <text x={x + 60} y={y + part.height / 2 + 3} fontSize={8.5} fill={part.color}>
              {part.label}
            </text>
          </g>
        )
      })}
      <text x={x + 27} y={cursor - 8} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
        {totalLabel}
      </text>
    </g>
  )
}

export function SteinerParallelAxisAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp01(sceneProgress) : 1
  const shiftT = index === 2 ? smooth((p - 0.06) / 0.8) : 1
  const d = 90 * shiftT
  const movingY = sy(10 + d)
  const showParts = index >= 1
  const compare = index === 5

  const flangeBar = 118
  const flangeAd = flangeBar - 4
  const totalBar = 120
  const flangesHeight = totalBar * (39.04 / 45.87)
  const webHeight = totalBar - flangesHeight
  const fullHeight = 120
  const beamHeight = fullHeight * (45.87 / 80)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 320"
          role="img"
          aria-label="Dwuteownik 120 na 200 mm z osią centralną, przesuwaniem osi półki o d oraz rosnącym składnikiem A d kwadrat"
        >
          <text x={12} y={22} fontSize={10} fontWeight={700} fill={INK}>
            {scene.title}
          </text>

          {compare && (
            <g>
              <rect
                x={sx(0)}
                y={sy(200)}
                width={120}
                height={180}
                fill="none"
                stroke={MUTED}
                strokeWidth={1.1}
                strokeDasharray="5 4"
              />
              <rect x={sx(0)} y={sy(180)} width={50} height={144} fill="#fff" stroke={LINE} strokeDasharray="4 3" />
              <rect x={sx(70)} y={sy(180)} width={50} height={144} fill="#fff" stroke={LINE} strokeDasharray="4 3" />
              <text x={sx(25)} y={sy(100) + 3} textAnchor="middle" fontSize={8} fill={MUTED}>
                pustka
              </text>
              <text x={sx(95)} y={sy(100) + 3} textAnchor="middle" fontSize={8} fill={MUTED}>
                pustka
              </text>
            </g>
          )}

          <rect x={sx(0)} y={sy(20)} width={120} height={18} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.3} />
          <rect x={sx(50)} y={sy(180)} width={20} height={144} fill="#edf1ff" stroke="#7d8fa5" strokeWidth={1.3} />
          <rect x={sx(0)} y={sy(200)} width={120} height={18} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.3} />

          <g fill={MUTED} fontSize={8.5}>
            <text x={sx(60)} y={sy(10) + 3} textAnchor="middle">
              półka
            </text>
            <text x={sx(60)} y={sy(100) + 3} textAnchor="middle">
              środnik
            </text>
            <text x={sx(60)} y={sy(190) + 3} textAnchor="middle">
              półka
            </text>
          </g>

          {showParts && index !== 2 && (
            <g>
              <Axis y={sy(10)} dashed color={MUTED} label="oś półki" />
              <Axis y={sy(190)} dashed color={MUTED} />
              {index >= 3 && <Axis y={sy(100)} color={ACCENT} width={2.1} label="x_c" />}
            </g>
          )}

          {index <= 1 && <Axis y={sy(100)} color={ACCENT} width={2.1} label="x_c" />}

          {index === 2 && (
            <g>
              <Axis y={sy(10)} dashed color={MUTED} />
              <Axis y={sy(100)} color={ACCENT} width={2.1} label="x_c" />
              <motion.line
                x1={AXIS_FROM}
                x2={AXIS_TO}
                stroke={HOT}
                strokeWidth={2.1}
                initial={false}
                animate={{ y1: movingY, y2: movingY }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <circle cx={sx(60)} cy={sy(10)} r={3} fill={MUTED} />
              <VDimension x={260} from={sy(10)} to={movingY} label={`d = ${Math.round(d)} mm`} color={HOT} />
            </g>
          )}

          {index === 3 && (
            <g>
              <VDimension x={260} from={sy(10)} to={sy(100)} label="a_p = 90 mm" color={HOT} />
              <circle cx={sx(60)} cy={sy(10)} r={3} fill={MUTED} />
            </g>
          )}

          {index === 4 && (
            <g>
              <VDimension x={260} from={sy(10)} to={sy(100)} label="a_p = 90 mm" color={MUTED} opacity={0.75} />
              <text x={sx(80)} y={sy(100) - 8} fontSize={9} fill={GREEN}>
                a_s = 0
              </text>
            </g>
          )}

          <g fill={MUTED} fontSize={9}>
            <line x1={sx(0)} y1={sy(0) + 12} x2={sx(120)} y2={sy(0) + 12} stroke={MUTED} strokeWidth={1} />
            <line x1={sx(0)} y1={sy(0) + 8} x2={sx(0)} y2={sy(0) + 16} stroke={MUTED} strokeWidth={1} />
            <line x1={sx(120)} y1={sy(0) + 8} x2={sx(120)} y2={sy(0) + 16} stroke={MUTED} strokeWidth={1} />
            <text x={sx(60)} y={sy(0) + 26} textAnchor="middle">
              b = 120 mm
            </text>
            <line x1={sx(0) - 14} y1={sy(0)} x2={sx(0) - 14} y2={sy(200)} stroke={MUTED} strokeWidth={1} />
            <line x1={sx(0) - 18} y1={sy(0)} x2={sx(0) - 10} y2={sy(0)} stroke={MUTED} strokeWidth={1} />
            <line x1={sx(0) - 18} y1={sy(200)} x2={sx(0) - 10} y2={sy(200)} stroke={MUTED} strokeWidth={1} />
            <text x={sx(0) - 20} y={sy(100)} textAnchor="end">
              h = 200 mm
            </text>
          </g>

          {index === 2 && (
            <GrowthBar value={d} max={90} label={`${((2400 * d * d) / 1e6).toFixed(2).replace('.', ',')}·10⁶`} />
          )}

          {index === 3 && (
            <StackedContribution
              x={336}
              base={PANEL_BASE}
              parts={[
                { height: 4, color: GREEN, label: 'I_xc = 0,08·10⁶' },
                { height: flangeAd, color: HOT, label: 'A a² = 19,44·10⁶' },
              ]}
              totalLabel="19,52·10⁶ mm⁴"
            />
          )}

          {index === 4 && (
            <StackedContribution
              x={336}
              base={PANEL_BASE}
              parts={[
                { height: webHeight, color: GREEN, label: 'środnik 6,83·10⁶' },
                { height: flangesHeight, color: HOT, label: '2 półki 39,04·10⁶' },
              ]}
              totalLabel="45,87·10⁶ mm⁴"
            />
          )}

          {index === 5 && (
            <g>
              <motion.rect
                x={330}
                width={44}
                fill={MUTED}
                fillOpacity={0.16}
                stroke={MUTED}
                strokeWidth={1.2}
                initial={false}
                animate={{ y: PANEL_BASE - fullHeight, height: fullHeight }}
                transition={{ duration: 0.4 }}
              />
              <motion.rect
                x={396}
                width={44}
                fill={HOT}
                fillOpacity={0.2}
                stroke={HOT}
                strokeWidth={1.2}
                initial={false}
                animate={{ y: PANEL_BASE - beamHeight, height: beamHeight }}
                transition={{ duration: 0.4, delay: 0.12 }}
              />
              <text
                x={352}
                y={PANEL_BASE - fullHeight - 8}
                textAnchor="middle"
                fontSize={9}
                fontWeight={700}
                fill={MUTED}
              >
                80·10⁶
              </text>
              <text
                x={418}
                y={PANEL_BASE - beamHeight - 8}
                textAnchor="middle"
                fontSize={9}
                fontWeight={700}
                fill={HOT}
              >
                45,87·10⁶
              </text>
              <text x={352} y={PANEL_BASE + 16} textAnchor="middle" fontSize={8} fill={MUTED}>
                pełny
              </text>
              <text x={418} y={PANEL_BASE + 16} textAnchor="middle" fontSize={8} fill={MUTED}>
                dwuteownik
              </text>
            </g>
          )}
        </svg>
      </div>
      <p className={local('note')}>
        {compare
          ? 'Pole spada do jednej trzeciej, a moment pozostaje na poziomie około 57% wartości pełnego prostokąta.'
          : 'Składnik A d² rośnie z kwadratem odległości osi od środka ciężkości części.'}
      </p>
    </div>
  )
}
