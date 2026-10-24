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

const sx = (value: number) => 66 + value * 1.3
const sy = (value: number) => 210 - value * 1.3
const AXIS_FROM = 34
const AXIS_TO = 250
const PANEL_BASE = 252

function VDimension({
  x,
  from,
  to,
  label,
  color = MUTED,
  opacity = 1,
}: {
  x: number
  from: number
  to: number
  label: string
  color?: string
  opacity?: number
}) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity }} transition={{ duration: 0.3 }} stroke={color} fill={color}>
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1.1} />
      <line x1={x - 4} y1={from} x2={x + 4} y2={from} strokeWidth={1.1} />
      <line x1={x - 4} y1={to} x2={x + 4} y2={to} strokeWidth={1.1} />
      <text x={x + 6} y={(from + to) / 2 + 3} fontSize={8.5} stroke="none">
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
        <text x={AXIS_FROM - 2} y={y - 5} fontSize={9} fill={color}>
          {label}
        </text>
      )}
    </motion.g>
  )
}

function GrowthBar({ value, max, label }: { value: number; max: number; label: string }) {
  const height = 118 * (value / max)
  const x = 338
  return (
    <g>
      <line x1={x - 10} y1={PANEL_BASE + 2} x2={x + 58} y2={PANEL_BASE + 2} stroke={LINE} strokeWidth={1} />
      <motion.rect
        x={x}
        width={48}
        fill={HOT}
        fillOpacity={0.2}
        stroke={HOT}
        strokeWidth={1.4}
        initial={false}
        animate={{ y: PANEL_BASE - height, height }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
      <text x={x + 24} y={PANEL_BASE + 16} textAnchor="middle" fontSize={9} fill={MUTED}>
        A d²
      </text>
      <text x={x + 24} y={PANEL_BASE - height - 8} textAnchor="middle" fontSize={9} fontWeight={700} fill={HOT}>
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
      <line x1={x - 10} y1={base + 2} x2={x + 86} y2={base + 2} stroke={LINE} strokeWidth={1} />
      {parts.map((part, index) => {
        const y = cursor - part.height
        cursor = y
        return (
          <g key={index}>
            <motion.rect
              x={x}
              width={52}
              fill={part.color}
              fillOpacity={0.2}
              stroke={part.color}
              strokeWidth={1.2}
              initial={{ y: base, height: 0 }}
              animate={{ y, height: part.height }}
              transition={{ duration: 0.45, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            />
            <text x={x + 58} y={y + part.height / 2 + 3} fontSize={8.5} fill={part.color}>
              {part.label}
            </text>
          </g>
        )
      })}
      <text x={x + 26} y={cursor - 8} textAnchor="middle" fontSize={9} fontWeight={700} fill={INK}>
        {totalLabel}
      </text>
    </g>
  )
}

export function SteinerParallelAxis2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp01(sceneProgress) : 1
  const webT = index === 2 ? smooth((p - 0.06) / 0.8) : 1
  const flangeT = index === 3 ? smooth((p - 0.06) / 0.8) : 1
  const webD = 32.73 * webT
  const flangeD = 27.27 * flangeT
  const webY = sy(50 + webD)
  const flangeY = sy(110 - flangeD)
  const showAxes = index === 1 || index === 4

  const totalBar = 120
  const webHeight = totalBar * (3.809 / 5.674)
  const flangeHeight = totalBar - webHeight
  const baseHeight = 120
  const removedHeight = baseHeight * (30.11 / 35.79)
  const remainingHeight = baseHeight - removedHeight

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 320"
          role="img"
          aria-label="Teownik ze środnikiem i półką, osią centralną oraz kolejnym przesuwaniem osi części o a jeden i a dwa"
        >
          <text x={12} y={22} fontSize={10} fontWeight={700} fill={INK}>
            {scene.title}
          </text>

          <rect x={sx(50)} y={sy(100)} width={26} height={130} fill="#edf1ff" stroke="#7d8fa5" strokeWidth={1.3} />
          <rect x={sx(0)} y={sy(120)} width={156} height={26} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.3} />

          <g fill={MUTED} fontSize={9}>
            <text x={sx(50) + 13} y={sy(50) + 3} textAnchor="middle">
              środnik
            </text>
            <text x={sx(60)} y={sy(110) + 3} textAnchor="middle">
              półka
            </text>
          </g>

          {showAxes && <Axis y={sy(50)} dashed color={MUTED} label="oś środnika" />}
          {showAxes && <Axis y={sy(110)} dashed color={MUTED} label="oś półki" />}
          {(index === 0 || index === 1 || index === 4) && <Axis y={sy(82.73)} color={ACCENT} width={2.1} label="x_c" />}

          {index === 2 && (
            <g>
              <Axis y={sy(50)} dashed color={MUTED} />
              <Axis y={sy(82.73)} color={ACCENT} width={2.1} label="x_c" />
              <motion.line
                x1={AXIS_FROM}
                x2={AXIS_TO}
                stroke={HOT}
                strokeWidth={2.1}
                initial={false}
                animate={{ y1: webY, y2: webY }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <circle cx={sx(60)} cy={sy(50)} r={3} fill={MUTED} />
              <VDimension
                x={260}
                from={sy(50)}
                to={webY}
                label={`d = ${webD.toFixed(2).replace('.', ',')} mm`}
                color={HOT}
              />
            </g>
          )}

          {index === 3 && (
            <g>
              <Axis y={sy(110)} dashed color={MUTED} />
              <Axis y={sy(82.73)} color={ACCENT} width={2.1} label="x_c" />
              <motion.line
                x1={AXIS_FROM}
                x2={AXIS_TO}
                stroke={HOT}
                strokeWidth={2.1}
                initial={false}
                animate={{ y1: flangeY, y2: flangeY }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <circle cx={sx(60)} cy={sy(110)} r={3} fill={MUTED} />
              <VDimension
                x={260}
                from={sy(82.73)}
                to={flangeY}
                label={`d = ${flangeD.toFixed(2).replace('.', ',')} mm`}
                color={HOT}
              />
            </g>
          )}

          {index === 0 && <VDimension x={260} from={sy(0)} to={sy(82.73)} label="y_C = 82,73 mm" color={ACCENT} />}

          {index === 1 && (
            <g>
              <VDimension x={260} from={sy(50)} to={sy(82.73)} label="a_1 = 32,73 mm" color={HOT} />
              <VDimension x={300} from={sy(82.73)} to={sy(110)} label="a_2 = 27,27 mm" color={HOT} />
            </g>
          )}

          {index === 4 && (
            <g>
              <VDimension x={260} from={sy(50)} to={sy(82.73)} label="a_1 = 32,73" color={MUTED} opacity={0.8} />
              <VDimension x={300} from={sy(82.73)} to={sy(110)} label="a_2 = 27,27" color={MUTED} opacity={0.8} />
            </g>
          )}

          {index === 5 && (
            <g>
              <Axis y={sy(0)} color={HOT} width={1.8} label="podstawa" />
              <Axis y={sy(82.73)} color={ACCENT} width={2.1} label="x_c" />
              <VDimension x={260} from={sy(0)} to={sy(82.73)} label="y_C = 82,73 mm" color={HOT} />
            </g>
          )}

          <g fill={MUTED} fontSize={9}>
            <line x1={sx(0)} y1={sy(0) + 12} x2={sx(120)} y2={sy(0) + 12} stroke={MUTED} strokeWidth={1} />
            <line x1={sx(0)} y1={sy(0) + 8} x2={sx(0)} y2={sy(0) + 16} stroke={MUTED} strokeWidth={1} />
            <line x1={sx(120)} y1={sy(0) + 8} x2={sx(120)} y2={sy(0) + 16} stroke={MUTED} strokeWidth={1} />
            <text x={sx(60)} y={sy(0) + 26} textAnchor="middle">
              b = 120 mm
            </text>
            <line x1={sx(0) - 14} y1={sy(0)} x2={sx(0) - 14} y2={sy(120)} stroke={MUTED} strokeWidth={1} />
            <line x1={sx(0) - 18} y1={sy(0)} x2={sx(0) - 10} y2={sy(0)} stroke={MUTED} strokeWidth={1} />
            <line x1={sx(0) - 18} y1={sy(120)} x2={sx(0) - 10} y2={sy(120)} stroke={MUTED} strokeWidth={1} />
            <text x={sx(0) - 20} y={sy(60)} textAnchor="end">
              h = 120 mm
            </text>
          </g>

          {index === 2 && (
            <GrowthBar
              value={webD}
              max={32.73}
              label={`${((2000 * webD * webD) / 1e6).toFixed(2).replace('.', ',')}·10⁶`}
            />
          )}

          {index === 3 && (
            <GrowthBar
              value={flangeD}
              max={27.27}
              label={`${((2400 * flangeD * flangeD) / 1e6).toFixed(2).replace('.', ',')}·10⁶`}
            />
          )}

          {index === 4 && (
            <StackedContribution
              x={338}
              base={PANEL_BASE}
              parts={[
                { height: webHeight, color: GREEN, label: 'środnik 3,81·10⁶' },
                { height: flangeHeight, color: HOT, label: 'półka 1,87·10⁶' },
              ]}
              totalLabel="5,67·10⁶ mm⁴"
            />
          )}

          {index === 5 && (
            <g>
              <rect
                x={338}
                y={PANEL_BASE - baseHeight}
                width={48}
                height={baseHeight}
                fill={MUTED}
                fillOpacity={0.12}
                stroke={MUTED}
                strokeWidth={1.2}
              />
              <motion.rect
                x={338}
                width={48}
                fill={HOT}
                fillOpacity={0.14}
                stroke={HOT}
                strokeWidth={1.1}
                strokeDasharray="4 3"
                initial={false}
                animate={{ y: PANEL_BASE - baseHeight, height: removedHeight }}
                transition={{ duration: 0.4 }}
              />
              <motion.rect
                x={338}
                width={48}
                fill={GREEN}
                fillOpacity={0.22}
                stroke={GREEN}
                strokeWidth={1.2}
                initial={false}
                animate={{ y: PANEL_BASE - remainingHeight, height: remainingHeight }}
                transition={{ duration: 0.4, delay: 0.12 }}
              />
              <text x={386} y={PANEL_BASE - baseHeight + 14} fontSize={8} fill={MUTED}>
                I_podst ≈ 35,8·10⁶
              </text>
              <text x={386} y={PANEL_BASE - baseHeight + 32} fontSize={8} fill={HOT}>
                −A y_C² ≈ 30,1·10⁶
              </text>
              <text x={386} y={PANEL_BASE - remainingHeight - 8} fontSize={9} fontWeight={700} fill={GREEN}>
                I_x ≈ 5,67·10⁶
              </text>
            </g>
          )}
        </svg>
      </div>
      <p className={local('note')}>
        {index === 5
          ? 'Kontrola przez oś podstawy: od dużego momentu odejmujemy A y_C² i wracamy do momentu centralnego.'
          : 'Każda część przesuwa swoją własną oś centralną na wspólną oś x_c; wkład rośnie jak A d².'}
      </p>
    </div>
  )
}
