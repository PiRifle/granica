import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const GOOD = '#2f7d5b'
const PANEL = '#1f2933'
const PANEL_TEXT = '#dbe7ff'
const PANEL_MUTED = '#9fb3c8'

const BAR_LEFT = 44
const BAR_RIGHT = 300
const BAR_TOP = 82
const BAR_BOTTOM = 122
const GAUGE_CX = 172
const GAUGE_CY = 102
const GAUGE_W = 92
const GAUGE_H = 24

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
  widthScale = 1,
}: {
  cx: number
  cy: number
  width: number
  height: number
  color: string
  widthScale?: number
}) {
  const left = cx - width / 2
  const top = cy - height / 2
  const bottom = cy + height / 2
  const segments = 6
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
        strokeWidth={1.4 * widthScale}
      />
      <path d={d} fill="none" stroke={color} strokeWidth={1.5 * widthScale} strokeLinecap="round" />
    </g>
  )
}

const READINGS: Record<string, { label: string; value: string; note: string; color: string; size?: number }> = {
  model: {
    label: 'TOR POMIAROWY',
    value: 'ΔR = 0,147 Ω',
    note: 'R₀ = 350 Ω · GF = 2,10',
    color: PANEL_TEXT,
  },
  ratio: {
    label: 'WZGLĘDNA ZMIANA OPORU',
    value: 'ΔR/R₀ = 0,00042',
    note: '0,147 Ω / 350 Ω',
    color: PANEL_TEXT,
    size: 19,
  },
  strain: {
    label: 'ODKSZTAŁCENIE',
    value: 'ε = 0,000200',
    note: '0,00042 / 2,10',
    color: PANEL_TEXT,
    size: 20,
  },
  micro: {
    label: 'ODCZYT W MIKROSTRAINACH',
    value: 'ε = 200 µε',
    note: '0,000200 · 10⁶ = 200',
    color: ACCENT,
    size: 24,
  },
  axis: {
    label: 'KIERUNEK CZUJNIKA',
    value: 'ε_x = 200 µε',
    note: 'ε_y = 0 · γ_xy = 0',
    color: ACCENT,
    size: 22,
  },
  check: {
    label: 'KONTROLA ODWROTNA',
    value: 'GF·ε·R₀ = 0,147 Ω',
    note: 'σ = Eε = 40,0 MPa',
    color: GOOD,
    size: 17,
  },
}

export function StrainGaugeChainAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1
  const reading = READINGS[metric] ?? READINGS.model

  const isModel = metric === 'model'
  const isStrain = metric === 'strain'
  const isAxis = metric === 'axis'
  const isCheck = metric === 'check'

  const stretch = isModel ? progress : 1
  const gaugeWidth = GAUGE_W + 15 * stretch
  const gaugeHeight = GAUGE_H - 3 * stretch
  const barRight = BAR_RIGHT + 12 * stretch
  const gaugeLeft = GAUGE_CX - gaugeWidth / 2
  const gaugeRight = GAUGE_CX + gaugeWidth / 2
  const gaugeGlow = isStrain || isAxis
  const bridgeActive = metric === 'model' || metric === 'ratio' || isCheck
  const loadPulse = playing ? 0.82 + 0.18 * Math.sin(sceneProgress * Math.PI * 4) : 1
  const signalDash = playing ? undefined : '4 6'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Próbka rozciągana z tensometrem, mostkiem Wheatstone'a i cyfrowym odczytem. Animacja pokazuje łańcuch pomiarowy od odkształcenia przez zmianę oporu do wskazania 200 mikrostrainów."
        >
          <defs>
            <marker
              id="gauge-chain-load"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={LOAD} />
            </marker>
            <marker
              id="gauge-chain-axis"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
          </defs>

          <g fontSize={9} fill={MUTED}>
            <text x={14} y={26}>
              R₀ = 350 Ω
            </text>
            <text x={14} y={40}>
              GF = 2,10
            </text>
            <text x={14} y={54}>
              ΔR = 0,147 Ω
            </text>
            <text x={330} y={26}>
              stal
            </text>
            <text x={330} y={40}>
              σ = Eε
            </text>
          </g>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={BAR_LEFT} y1={BAR_TOP - 16} x2={BAR_LEFT} y2={BAR_BOTTOM + 16} />
            {Array.from({ length: 7 }, (_, tick) => {
              const y = BAR_TOP - 12 + tick * ((BAR_BOTTOM - BAR_TOP + 24) / 6)
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
            strokeWidth={1.3}
            strokeDasharray="5 4"
          />
          <motion.rect
            x={BAR_LEFT}
            y={BAR_TOP}
            width={barRight - BAR_LEFT}
            height={BAR_BOTTOM - BAR_TOP}
            rx={3}
            fill={ACCENT}
            fillOpacity={0.1}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <g>
            <rect
              x={gaugeLeft - 4}
              y={GAUGE_CY - gaugeHeight / 2 - 4}
              width={gaugeWidth + 8}
              height={gaugeHeight + 8}
              rx={3}
              fill={gaugeGlow ? ACCENT : LOAD}
              fillOpacity={gaugeGlow ? 0.12 : 0.04}
              stroke={gaugeGlow ? ACCENT : MUTED}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <GaugeGrid
              cx={GAUGE_CX}
              cy={GAUGE_CY}
              width={gaugeWidth}
              height={gaugeHeight}
              color={gaugeGlow ? ACCENT : LOAD}
              widthScale={gaugeGlow ? 1.3 : 1}
            />
          </g>

          <g stroke={MUTED} fill={MUTED}>
            <line x1={gaugeLeft} y1={140} x2={gaugeRight} y2={140} strokeWidth={1.2} />
            <line x1={gaugeLeft} y1={135} x2={gaugeLeft} y2={145} strokeWidth={1.2} />
            <line x1={gaugeRight} y1={135} x2={gaugeRight} y2={145} strokeWidth={1.2} />
            <text x={GAUGE_CX} y={154} textAnchor="middle" fontSize={9}>
              baza L_g
            </text>
          </g>

          <motion.g
            stroke={LOAD}
            fill={LOAD}
            animate={{ opacity: loadPulse }}
            transition={{ duration: 1.2, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <line
              x1={barRight + 8}
              y1={GAUGE_CY}
              x2={barRight + 34}
              y2={GAUGE_CY}
              strokeWidth={2.3}
              markerEnd="url(#gauge-chain-load)"
            />
            <text x={barRight + 12} y={GAUGE_CY - 8} fontSize={9} stroke="none">
              N
            </text>
          </motion.g>

          {isAxis && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              stroke={ACCENT}
              fill={ACCENT}
            >
              <line
                x1={GAUGE_CX}
                y1={GAUGE_CY}
                x2={GAUGE_CX + 94}
                y2={GAUGE_CY}
                strokeWidth={2.2}
                markerEnd="url(#gauge-chain-axis)"
              />
              <line
                x1={GAUGE_CX}
                y1={GAUGE_CY}
                x2={GAUGE_CX}
                y2={GAUGE_CY - 42}
                strokeWidth={2.2}
                markerEnd="url(#gauge-chain-axis)"
              />
              <text x={GAUGE_CX + 98} y={GAUGE_CY + 4} fontSize={9} stroke="none" fontWeight={700}>
                ε_x = 200 µε
              </text>
              <text x={GAUGE_CX + 5} y={GAUGE_CY - 48} fontSize={9} stroke="none">
                ε_y = 0
              </text>
            </motion.g>
          )}

          <motion.path
            d={`M ${GAUGE_CX} ${BAR_BOTTOM} L ${GAUGE_CX} 158 L 100 158 L 100 180`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.4}
            strokeDasharray="4 6"
            animate={playing ? { strokeDashoffset: [0, -20] } : { strokeDashoffset: 0 }}
            transition={{ duration: 1.1, repeat: playing ? Infinity : 0, ease: 'linear' }}
            opacity={0.85}
          />
          <path
            d={`M 130 210 L 150 210`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.4}
            strokeDasharray={signalDash}
            opacity={0.85}
          />

          <g transform="translate(100 210)">
            <motion.g
              animate={{ opacity: bridgeActive ? 1 : 0.45 }}
              transition={{ duration: 0.3 }}
              stroke={ACCENT}
              fill="none"
            >
              <path d="M 0 -30 L 30 0 L 0 30 L -30 0 Z" strokeWidth={1.8} />
              <line x1={0} y1={-30} x2={0} y2={30} strokeWidth={1} strokeDasharray="3 3" opacity={0.45} />
              <line x1={-30} y1={0} x2={30} y2={0} strokeWidth={1} strokeDasharray="3 3" opacity={0.45} />
              <path d="M -8 -20 L -2 -17 L -2 -23 L 4 -20" stroke={LOAD} strokeWidth={2.2} />
              <circle cx={30} cy={0} r={2.5} fill={ACCENT} stroke="none" />
              <circle cx={-30} cy={0} r={2.5} fill={ACCENT} stroke="none" />
              <text x={0} y={46} textAnchor="middle" fontSize={8.5} fill={MUTED} stroke="none">
                mostek
              </text>
            </motion.g>
          </g>

          <g>
            <rect x={150} y={176} width={296} height={86} rx={10} fill={PANEL} />
            <text x={166} y={195} fontSize={8} letterSpacing={0.8} fill={PANEL_MUTED}>
              {reading.label}
            </text>
            <motion.text
              key={metric}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              x={166}
              y={226}
              fontSize={reading.size ?? 20}
              fontWeight={700}
              fill={reading.color}
            >
              {reading.value}
            </motion.text>
            <text x={166} y={247} fontSize={8.5} fill={PANEL_MUTED}>
              {reading.note}
            </text>
            {isCheck && (
              <g transform="translate(418 204)">
                <motion.g
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35, type: 'spring', stiffness: 240, damping: 16 }}
                >
                  <circle r={11} fill={GOOD} fillOpacity={0.16} stroke={GOOD} strokeWidth={1.4} />
                  <path d="M -5 0 L -1 4 L 6 -5" fill="none" stroke={GOOD} strokeWidth={2} strokeLinecap="round" />
                </motion.g>
              </g>
            )}
          </g>

          <text x={230} y={282} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            odkształcenie → zmiana oporu → mostek → odczyt
          </text>
        </svg>
      </div>
    </div>
  )
}
