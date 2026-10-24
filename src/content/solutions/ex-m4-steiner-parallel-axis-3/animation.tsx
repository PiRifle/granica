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

const sx = (value: number) => 62 + value * 1.5
const sy = (value: number) => 170 - value * 1.5
const AXIS_FROM = 34
const AXIS_TO = 250
const PANEL_BASE = 252
const PANEL_MAX = 118

function VDimension({
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
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      stroke={color}
      fill={color}
    >
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
  width = 1.2,
  dashed = false,
  label,
}: {
  y: number
  color?: string
  width?: number
  dashed?: boolean
  label?: string
}) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
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

export function SteinerParallelAxis3Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp01(sceneProgress) : 1
  const explore = index === 1 ? 15 * smooth((p - 0.08) / 0.8) : 0
  const solve = index === 2 || index === 5 ? 34.64 * smooth((p - 0.06) / 0.8) : 34.64
  const radius = index === 3 ? 11.55 * smooth((p - 0.06) / 0.8) : 11.55
  const targetA = index === 1 ? explore : index === 2 || index === 5 ? solve : radius
  const targetY = sy(20 + targetA)
  const showTarget = index >= 1 && index !== 4

  const ixcHeight = (0.64 / 6.4) * PANEL_MAX
  const growth = index === 1 ? 0 : (targetA / 34.64) ** 2
  const adHeight = (5.76 / 6.4) * PANEL_MAX * growth
  const totalHeight = ixcHeight + adHeight
  const totalValue = 0.64 + 4800 * targetA * targetA * 1e-6
  const radiusAdHeight = 58 * (targetA / 11.55) ** 2
  const radiusTotal = 0.64 + 4800 * targetA * targetA * 1e-6

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 320"
          role="img"
          aria-label="Prostokąt 120 na 40 mm, jego oś centralna i równoległa oś docelowa przesuwana o odległość a, z rosnącym składnikiem A a kwadrat"
        >
          <text x={12} y={22} fontSize={10} fontWeight={700} fill={INK}>
            {scene.title}
          </text>

          <rect x={sx(0)} y={sy(40)} width={180} height={60} fill="#f2f5fa" stroke="#7d8fa5" strokeWidth={1.4} />
          <text x={sx(60)} y={sy(20) + 3} textAnchor="middle" fontSize={9} fill={MUTED}>
            prostokąt 120 × 40
          </text>

          {index !== 4 ? (
            <g>
              <Axis y={sy(20)} color={ACCENT} width={2.1} label="x_c" />
              {showTarget && (
                <motion.line
                  x1={AXIS_FROM}
                  x2={AXIS_TO}
                  stroke={HOT}
                  strokeWidth={2.1}
                  initial={false}
                  animate={{ y1: targetY, y2: targetY }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              )}
              {showTarget && (
                <VDimension
                  x={262}
                  from={sy(20)}
                  to={targetY}
                  label={index === 1 ? 'a = ?' : `a = ${targetA.toFixed(2).replace('.', ',')} mm`}
                  color={HOT}
                />
              )}
              <circle cx={sx(60)} cy={sy(20)} r={3.5} fill={INK} />
              <text x={sx(60) + 8} y={sy(20) - 8} fontSize={9} fill={INK}>
                C
              </text>
            </g>
          ) : (
            <g>
              <line x1={sx(60)} y1={sy(40) - 20} x2={sx(60)} y2={sy(0) + 22} stroke={ACCENT} strokeWidth={2.1} />
              <text x={sx(60) + 6} y={sy(40) - 12} fontSize={9} fill={ACCENT}>
                y_c
              </text>
              <circle cx={sx(60)} cy={sy(20)} r={3.5} fill={INK} />
              <text x={sx(60) + 8} y={sy(20) - 8} fontSize={9} fill={INK}>
                C
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
            <line x1={sx(0) - 14} y1={sy(0)} x2={sx(0) - 14} y2={sy(40)} stroke={MUTED} strokeWidth={1} />
            <line x1={sx(0) - 18} y1={sy(0)} x2={sx(0) - 10} y2={sy(0)} stroke={MUTED} strokeWidth={1} />
            <line x1={sx(0) - 18} y1={sy(40)} x2={sx(0) - 10} y2={sy(40)} stroke={MUTED} strokeWidth={1} />
            <text x={sx(0) - 20} y={sy(20)} textAnchor="end">
              h = 40 mm
            </text>
          </g>

          {index === 1 && (
            <g>
              <line x1={338} y1={PANEL_BASE + 2} x2={398} y2={PANEL_BASE + 2} stroke={LINE} strokeWidth={1} />
              <rect
                x={338}
                y={PANEL_BASE - ixcHeight}
                width={48}
                height={ixcHeight}
                fill={GREEN}
                fillOpacity={0.22}
                stroke={GREEN}
                strokeWidth={1.2}
              />
              <rect
                x={338}
                y={PANEL_BASE - PANEL_MAX}
                width={48}
                height={PANEL_MAX - ixcHeight}
                fill="none"
                stroke={HOT}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <text x={394} y={PANEL_BASE - 2} fontSize={8.5} fill={GREEN}>
                I_xc = 0,64·10⁶
              </text>
              <text x={394} y={PANEL_BASE - PANEL_MAX + 14} fontSize={8.5} fill={HOT}>
                A a² = ?
              </text>
            </g>
          )}

          {(index === 2 || index === 5) && (
            <g>
              <line x1={338} y1={PANEL_BASE + 2} x2={398} y2={PANEL_BASE + 2} stroke={LINE} strokeWidth={1} />
              <rect
                x={338}
                y={PANEL_BASE - ixcHeight}
                width={48}
                height={ixcHeight}
                fill={GREEN}
                fillOpacity={0.22}
                stroke={GREEN}
                strokeWidth={1.2}
              />
              <motion.rect
                x={338}
                width={48}
                fill={HOT}
                fillOpacity={0.2}
                stroke={HOT}
                strokeWidth={1.3}
                initial={false}
                animate={{ y: PANEL_BASE - totalHeight, height: adHeight }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <text x={394} y={PANEL_BASE - totalHeight - 8} fontSize={9} fontWeight={700} fill={INK}>
                I_x = {totalValue.toFixed(2).replace('.', ',')}·10⁶
              </text>
              <text x={394} y={PANEL_BASE - ixcHeight - 4} fontSize={8.5} fill={GREEN}>
                I_xc = 0,64·10⁶
              </text>
              <text x={394} y={PANEL_BASE - totalHeight + 14} fontSize={8.5} fill={HOT}>
                A a² = {(4800 * targetA * targetA * 1e-6).toFixed(2).replace('.', ',')}·10⁶
              </text>
            </g>
          )}

          {index === 3 && (
            <g>
              <line x1={338} y1={PANEL_BASE + 2} x2={398} y2={PANEL_BASE + 2} stroke={LINE} strokeWidth={1} />
              <rect
                x={338}
                y={PANEL_BASE - 58}
                width={48}
                height={58}
                fill={GREEN}
                fillOpacity={0.22}
                stroke={GREEN}
                strokeWidth={1.2}
              />
              <motion.rect
                x={338}
                width={48}
                fill={HOT}
                fillOpacity={0.2}
                stroke={HOT}
                strokeWidth={1.3}
                initial={false}
                animate={{ y: PANEL_BASE - 58 - radiusAdHeight, height: radiusAdHeight }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
              <text x={394} y={PANEL_BASE - 58 - radiusAdHeight - 8} fontSize={9} fontWeight={700} fill={INK}>
                I_x = {radiusTotal.toFixed(2).replace('.', ',')}·10⁶
              </text>
              <text x={394} y={PANEL_BASE - 56} fontSize={8.5} fill={GREEN}>
                I_xc = 0,64·10⁶
              </text>
              <text x={394} y={PANEL_BASE - 58 - radiusAdHeight + 14} fontSize={8.5} fill={HOT}>
                A a² = {(4800 * targetA * targetA * 1e-6).toFixed(2).replace('.', ',')}·10⁶
              </text>
            </g>
          )}
        </svg>
      </div>
      <p className={local('note')}>
        {index === 3
          ? 'Przy a = i_xc oba składniki są równe, więc moment względem osi równoległej jest dwa razy większy.'
          : 'Widoczny składnik A a² rośnie z kwadratem przesunięcia osi względem centroidu.'}
      </p>
    </div>
  )
}
