import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const HEAT = '#ff8a5c'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const GOOD = '#2f7d5b'
const PANEL = '#1f2933'
const PANEL_TEXT = '#dbe7ff'
const PANEL_MUTED = '#9fb3c8'

const BAR_LEFT = 40
const BAR_RIGHT = 292
const BAR_TOP = 64
const BAR_BOTTOM = 100
const GAUGE_CX = 166
const GAUGE_CY = 82
const GAUGE_W = 72
const GAUGE_H = 18

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function GaugeGrid({
  cx,
  cy,
  width,
  height,
  color,
  strokeWidth = 1.4,
}: {
  cx: number
  cy: number
  width: number
  height: number
  color: string
  strokeWidth?: number
}) {
  const left = cx - width / 2
  const top = cy - height / 2
  const bottom = cy + height / 2
  const segments = 5
  const step = width / segments
  let d = `M ${left} ${top}`
  for (let i = 0; i < segments; i += 1) {
    const x = left + step * (i + 1)
    d += i % 2 === 0 ? ` L ${x} ${top} L ${x} ${bottom}` : ` L ${x} ${bottom} L ${x} ${top}`
  }
  return (
    <g>
      <rect
        x={left}
        y={top}
        width={width}
        height={height}
        rx={2}
        fill={color}
        fillOpacity={0.08}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </g>
  )
}

const READINGS: Record<string, { label: string; value: string; note: string; color: string; size?: number }> = {
  model: {
    label: 'CEL POMIARU',
    value: 'ΔR = ?',
    note: 'R₀ = 350 Ω · GF = 2,0',
    color: PANEL_TEXT,
    size: 25,
  },
  ratio: {
    label: 'WZGLĘDNA ZMIANA OPORU',
    value: '2·10⁻⁶',
    note: 'GF·ε = 2,0 · 10⁻⁶',
    color: PANEL_TEXT,
    size: 26,
  },
  absolute: {
    label: 'ZMIANA OPORU',
    value: '0,0007 Ω',
    note: '0,7 mΩ = 2·10⁻⁶ R₀',
    color: HEAT,
    size: 21,
  },
  resolution: {
    label: 'ZWYKŁY OMOMIERZ',
    value: 'za mało',
    note: '0,7 mΩ ginie w szumie',
    color: LOAD,
    size: 24,
  },
  baseline: {
    label: 'DOBÓR OPORU BAZOWEGO',
    value: '350 Ω → 0,7 mΩ',
    note: '120 Ω daje 0,24 mΩ',
    color: ACCENT,
    size: 14,
  },
}

export function GaugeResolutionAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1
  const reading = READINGS[metric] ?? READINGS.model

  const isModel = metric === 'model'
  const showZoom = metric === 'ratio' || metric === 'absolute'
  const showOhm = metric === 'resolution'
  const showBridge = metric === 'resolution' || metric === 'baseline'
  const showBars = metric === 'baseline'

  const stretch = isModel ? progress : 1
  const gaugeWidth = GAUGE_W + 10 * stretch
  const gaugeHeight = GAUGE_H - 2 * stretch
  const barRight = BAR_RIGHT + 5 * stretch
  const gaugeColor = metric === 'absolute' ? HEAT : ACCENT

  const needleLength = 29
  const deflection = showOhm ? 1.4 * progress : 0.2
  const needleAngle = (-90 + deflection) * (Math.PI / 180)
  const needleX = 104 + Math.cos(needleAngle) * needleLength
  const needleY = 212 + Math.sin(needleAngle) * needleLength
  const outputLevel = showBridge ? 0.16 + 0.5 * progress : 0.1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Tensometr 350 omów mierzący odkształcenie 1 mikrostrain. Animacja pokazuje znikomą zmianę oporu 0,7 milioma, zbyt małą dla zwykłego omomierza, oraz sygnał wzmocniony w mostku."
        >
          <defs>
            <marker
              id="resolution-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
          </defs>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={BAR_LEFT} y1={BAR_TOP - 14} x2={BAR_LEFT} y2={BAR_BOTTOM + 14} />
            {Array.from({ length: 6 }, (_, tick) => {
              const y = BAR_TOP - 10 + tick * ((BAR_BOTTOM - BAR_TOP + 20) / 5)
              return <line key={tick} x1={BAR_LEFT} y1={y} x2={BAR_LEFT - 9} y2={y + 6} strokeWidth={1.3} />
            })}
          </g>

          <rect
            x={BAR_LEFT}
            y={BAR_TOP}
            width={BAR_RIGHT - BAR_LEFT}
            height={BAR_BOTTOM - BAR_TOP}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="5 4"
          />
          <motion.rect
            x={BAR_LEFT}
            y={BAR_TOP}
            width={barRight - BAR_LEFT}
            height={BAR_BOTTOM - BAR_TOP}
            rx={3}
            fill={ACCENT}
            fillOpacity={0.09}
            stroke={ACCENT}
            strokeWidth={1.8}
          />
          <GaugeGrid cx={GAUGE_CX} cy={GAUGE_CY} width={gaugeWidth} height={gaugeHeight} color={gaugeColor} />

          <g stroke={LOAD} fill={LOAD}>
            <line
              x1={barRight + 4}
              y1={GAUGE_CY}
              x2={barRight + 16}
              y2={GAUGE_CY}
              strokeWidth={2.2}
              markerEnd="url(#resolution-load)"
            />
            <text x={barRight - 4} y={GAUGE_CY - 26} textAnchor="end" fontSize={9} stroke="none">
              ε = 1 µε
            </text>
          </g>

          <text x={12} y={24} fontSize={9} fill={MUTED}>
            R₀ = 350 Ω
          </text>
          <text x={12} y={38} fontSize={9} fill={MUTED}>
            GF = 2,0
          </text>
          <text x={12} y={52} fontSize={9} fill={MUTED}>
            skala poglądowa
          </text>

          <g stroke={MUTED} fill={MUTED}>
            <line x1={GAUGE_CX} y1={112} x2={GAUGE_CX} y2={150} strokeWidth={1.1} strokeDasharray="3 3" />
            <line x1={GAUGE_CX} y1={150} x2={104} y2={150} strokeWidth={1.1} strokeDasharray="3 3" />
            <line x1={104} y1={150} x2={104} y2={168} strokeWidth={1.1} strokeDasharray="3 3" />
            <line x1={GAUGE_CX} y1={150} x2={310} y2={150} strokeWidth={1.1} strokeDasharray="3 3" />
            <line x1={310} y1={150} x2={310} y2={210} strokeWidth={1.1} strokeDasharray="3 3" />
          </g>

          {showZoom && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <line
                x1={GAUGE_CX + gaugeWidth / 2 - 2}
                y1={GAUGE_CY}
                x2={210}
                y2={166}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <circle cx={232} cy={202} r={40} fill="#ffffff" fillOpacity={0.82} stroke={ACCENT} strokeWidth={1.6} />
              <GaugeGrid cx={232} cy={202} width={54} height={16} color={HEAT} strokeWidth={1.6} />
              <text x={232} y={238} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                powiększenie zmiany
              </text>
            </motion.g>
          )}

          <motion.g animate={{ opacity: showBars ? 0 : showOhm ? 1 : 0.3 }} transition={{ duration: 0.3 }}>
            <circle cx={104} cy={212} r={43} fill="#f7f9fc" stroke={showOhm ? LOAD : MUTED} strokeWidth={1.6} />
            {Array.from({ length: 9 }, (_, tick) => {
              const angle = (-150 + tick * 15) * (Math.PI / 180)
              const inner = 33
              const outer = tick % 4 === 0 ? 39 : 36
              return (
                <line
                  key={tick}
                  x1={104 + Math.cos(angle) * inner}
                  y1={212 + Math.sin(angle) * inner}
                  x2={104 + Math.cos(angle) * outer}
                  y2={212 + Math.sin(angle) * outer}
                  stroke={MUTED}
                  strokeWidth={tick % 4 === 0 ? 1.4 : 0.9}
                />
              )
            })}
            <motion.line
              x1={104}
              y1={212}
              initial={{ x2: 104, y2: 183 }}
              animate={{ x2: needleX, y2: needleY }}
              transition={{ duration: 0.12, ease: 'linear' }}
              stroke={showOhm ? LOAD : MUTED}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <circle cx={104} cy={212} r={3} fill={showOhm ? LOAD : MUTED} />
            <text x={104} y={272} textAnchor="middle" fontSize={9} fill={showOhm ? LOAD : MUTED}>
              omomierz
            </text>
            <text x={104} y={284} textAnchor="middle" fontSize={8} fill={MUTED}>
              0,7 mΩ to 2·10⁻⁶ R₀
            </text>
          </motion.g>

          <motion.g animate={{ opacity: showBars ? 0 : showBridge ? 1 : 0.35 }} transition={{ duration: 0.3 }}>
            <g transform="translate(346 210)">
              <path d="M 0 -36 L 36 0 L 0 36 L -36 0 Z" fill="none" stroke={ACCENT} strokeWidth={1.6} />
              <line x1={18} y1={-18} x2={30} y2={-6} stroke={HEAT} strokeWidth={3} strokeLinecap="round" />
              <circle cx={0} cy={-36} r={2.5} fill={HEAT} />
              <line x1={36} y1={0} x2={60} y2={0} stroke={GOOD} strokeWidth={1.4} />
            </g>
            <rect x={410} y={178} width={9} height={56} rx={4} fill="#e6ebf2" />
            <motion.rect
              x={410}
              y={234 - 56 * outputLevel}
              width={9}
              height={56 * outputLevel}
              rx={4}
              fill={GOOD}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
            <text x={414.5} y={170} textAnchor="middle" fontSize={8} fill={GOOD}>
              V_out
            </text>
            <text x={346} y={268} textAnchor="middle" fontSize={9} fill={showBridge ? ACCENT : MUTED}>
              mostek Wheatstone'a
            </text>
          </motion.g>

          {showBars && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <text x={104} y={184} fontSize={8.5} fill={MUTED}>
                bezwzględna zmiana ΔR
              </text>
              <rect x={104} y={196} width={168} height={12} rx={6} fill="#e6ebf2" />
              <motion.rect
                x={104}
                y={196}
                height={12}
                rx={6}
                fill={ACCENT}
                initial={{ width: 0 }}
                animate={{ width: 144 * progress }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <text x={104} y={226} fontSize={9} fill={ACCENT}>
                350 Ω → 0,7 mΩ
              </text>
              <rect x={104} y={238} width={168} height={12} rx={6} fill="#e6ebf2" />
              <motion.rect
                x={104}
                y={238}
                height={12}
                rx={6}
                fill={HEAT}
                initial={{ width: 0 }}
                animate={{ width: 49 * progress }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.15 }}
              />
              <text x={104} y={268} fontSize={9} fill={HEAT}>
                120 Ω → 0,24 mΩ
              </text>
            </motion.g>
          )}

          <g>
            <rect x={318} y={54} width={132} height={94} rx={10} fill={PANEL} />
            <text x={332} y={71} fontSize={7.2} letterSpacing={0.55} fill={PANEL_MUTED}>
              {reading.label}
            </text>
            <motion.text
              key={metric}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              x={332}
              y={105}
              fontSize={reading.size ?? 22}
              fontWeight={700}
              fill={reading.color}
            >
              {reading.value}
            </motion.text>
            <text x={332} y={126} fontSize={7.6} fill={PANEL_MUTED}>
              {reading.note}
            </text>
          </g>

          <text x={230} y={296} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            sygnał 1 µε jest tak mały, że wzmocnienie mostka jest konieczne
          </text>
        </svg>
      </div>
    </div>
  )
}
