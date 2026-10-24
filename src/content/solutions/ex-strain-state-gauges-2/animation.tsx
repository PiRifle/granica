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

const BEAM_LEFT = 36
const BEAM_RIGHT = 286
const BEAM_TOP = 82
const BEAM_BOTTOM = 114
const GAUGE_CX = 172
const GAUGE_CY = 98
const REF_CY = 178

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
}: {
  cx: number
  cy: number
  width: number
  height: number
  color: string
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
        fillOpacity={0.18}
        stroke={color}
        strokeWidth={1.5}
      />
      <path d={d} fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    </g>
  )
}

const READINGS: Record<string, { label: string; value: string; note: string; color: string; size?: number }> = {
  heat: {
    label: 'STAN POCZĄTKOWY',
    value: '0 µε',
    note: 'belka nieobciążona, ΔT rośnie',
    color: PANEL_TEXT,
    size: 26,
  },
  apparent: {
    label: 'WSKAZANIE CZUJNIKA',
    value: '198 µε',
    note: 'pozorne — tylko od temperatury',
    color: HEAT,
    size: 26,
  },
  stress: {
    label: 'BŁĘDNA INTERPRETACJA',
    value: '39,6 MPa',
    note: 'gdy pominiemy temperaturę',
    color: LOAD,
    size: 23,
  },
  compensate: {
    label: 'RÓŻNICA CZUJNIKÓW',
    value: '0 µε',
    note: 'ε czynny − ε odniesienia',
    color: GOOD,
    size: 26,
  },
  check: {
    label: 'KONTROLA',
    value: '0 µε / 0 MPa',
    note: 'temperatura zniesiona',
    color: GOOD,
    size: 20,
  },
}

export function ThermalCompensationAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'heat'
  const progress = playing ? smooth(sceneProgress) : 1
  const reading = READINGS[metric] ?? READINGS.heat

  const isHeat = metric === 'heat'
  const showReference = metric === 'compensate' || metric === 'check'
  const isStress = metric === 'stress'

  const heat = isHeat ? progress : 1
  const activeWidth = 60 + 7 * heat
  const activeHeight = 14
  const couponWidth = 112 + 5 * heat
  const couponHeight = 30
  const beamRight = BEAM_RIGHT + 6 * heat
  const gaugeColor = heat > 0.04 ? HEAT : ACCENT
  const glow = playing ? [0.03, 0.11 + 0.06 * heat, 0.03] : 0.12 * heat

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Nieobciążona stalowa belka nagrzana o 18 kelwinów z tensometrem czynnym i czujnikiem odniesienia. Animacja pokazuje pozorny odczyt 198 mikrostrainów, fałszywe naprężenie 39,6 MPa i wyzerowanie różnicy po kompensacji."
        >
          <defs>
            <marker
              id="thermal-comp-bridge"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={GOOD} />
            </marker>
          </defs>

          <motion.ellipse
            cx={165}
            cy={98}
            rx={132}
            ry={36}
            fill={HEAT}
            animate={{ opacity: glow }}
            transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          />

          {[0, 1, 2].map((wave) => (
            <motion.path
              key={wave}
              d={`M ${106 + wave * 34} 70 q 9 -8 18 0 t 18 0`}
              fill="none"
              stroke={HEAT}
              strokeWidth={1.5}
              strokeLinecap="round"
              animate={{ opacity: playing ? [0.18, 0.65, 0.18] : 0.45 }}
              transition={{
                duration: 1.5,
                repeat: playing ? Infinity : 0,
                delay: wave * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={BEAM_LEFT} y1={BEAM_TOP - 16} x2={BEAM_LEFT} y2={BEAM_BOTTOM + 16} />
            {Array.from({ length: 7 }, (_, tick) => {
              const y = BEAM_TOP - 12 + tick * ((BEAM_BOTTOM - BEAM_TOP + 24) / 6)
              return <line key={tick} x1={BEAM_LEFT} y1={y} x2={BEAM_LEFT - 9} y2={y + 6} strokeWidth={1.3} />
            })}
          </g>

          <motion.rect
            x={BEAM_LEFT}
            y={BEAM_TOP}
            width={beamRight - BEAM_LEFT}
            height={BEAM_BOTTOM - BEAM_TOP}
            rx={3}
            fill={HEAT}
            animate={{ fillOpacity: 0.05 + 0.1 * heat }}
            stroke={heat > 0.5 ? HEAT : ACCENT}
            strokeWidth={2}
          />
          <rect
            x={BEAM_LEFT}
            y={BEAM_TOP}
            width={BEAM_RIGHT - BEAM_LEFT}
            height={BEAM_BOTTOM - BEAM_TOP}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.1}
            strokeDasharray="5 4"
          />

          <g>
            <rect
              x={GAUGE_CX - 36}
              y={GAUGE_CY - 11}
              width={72}
              height={22}
              rx={2}
              fill="none"
              stroke={MUTED}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <GaugeGrid cx={GAUGE_CX} cy={GAUGE_CY} width={activeWidth} height={activeHeight} color={gaugeColor} />
          </g>

          <text x={GAUGE_CX} y={BEAM_TOP - 10} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            czujnik czynny — belka bez obciążenia
          </text>
          <text x={BEAM_LEFT + 4} y={BEAM_BOTTOM + 20} fontSize={8.5} fill={MUTED}>
            ΔT = 18 K
          </text>

          {showReference && (
            <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <rect
                x={GAUGE_CX - couponWidth / 2}
                y={REF_CY - couponHeight / 2}
                width={couponWidth}
                height={couponHeight}
                rx={3}
                fill={ACCENT}
                fillOpacity={0.07}
                stroke={ACCENT}
                strokeWidth={1.6}
              />
              <GaugeGrid cx={GAUGE_CX} cy={REF_CY} width={activeWidth} height={activeHeight} color={HEAT} />
              <text x={GAUGE_CX} y={REF_CY + 40} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                czujnik odniesienia — to samo ΔT, brak odkształcenia mechanicznego
              </text>
              <path
                d={`M ${GAUGE_CX} ${BEAM_BOTTOM + 2} L ${GAUGE_CX} 158 L 338 158 L 338 214`}
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.2}
                strokeDasharray="4 4"
                opacity={0.65}
              />
              <path
                d={`M ${GAUGE_CX} ${REF_CY + 12} L ${GAUGE_CX} 202 L 330 202 L 338 214`}
                fill="none"
                stroke={HEAT}
                strokeWidth={1.2}
                strokeDasharray="4 4"
                opacity={0.65}
              />
            </motion.g>
          )}

          {!showReference && (
            <path
              d={`M ${GAUGE_CX} ${BEAM_BOTTOM + 2} L ${GAUGE_CX} 158 L 338 158 L 338 214`}
              fill="none"
              stroke={ACCENT}
              strokeWidth={1.2}
              strokeDasharray="4 4"
              opacity={0.55}
            />
          )}

          <g fill={MUTED} fontSize={9}>
            <text x={12} y={26}>
              R₀ = 350 Ω
            </text>
            <text x={12} y={40}>
              GF = 2,10
            </text>
            <text x={12} y={54}>
              E = 200 GPa
            </text>
            <text x={238} y={40}>
              α_poz ≈ 11 µε/K
            </text>
          </g>

          <g transform="translate(374 214)">
            <path d="M 0 -36 L 36 0 L 0 36 L -36 0 Z" fill="none" stroke={MUTED} strokeWidth={1.5} />
            <line x1={18} y1={-18} x2={30} y2={-6} stroke={HEAT} strokeWidth={3.2} strokeLinecap="round" />
            {showReference && (
              <line x1={-30} y1={6} x2={-18} y2={18} stroke={ACCENT} strokeWidth={3.2} strokeLinecap="round" />
            )}
            <circle cx={0} cy={-36} r={2.6} fill={HEAT} />
            {showReference && <circle cx={-36} cy={0} r={2.6} fill={ACCENT} />}
            <line
              x1={36}
              y1={0}
              x2={62}
              y2={0}
              stroke={showReference ? GOOD : MUTED}
              strokeWidth={1.6}
              markerEnd={showReference ? 'url(#thermal-comp-bridge)' : undefined}
            />
            <text x={0} y={54} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              mostek różnicowy
            </text>
          </g>

          <g>
            <rect x={300} y={54} width={148} height={100} rx={10} fill={PANEL} />
            <text x={314} y={71} fontSize={7.5} letterSpacing={0.6} fill={PANEL_MUTED}>
              {reading.label}
            </text>
            <motion.text
              key={metric}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              x={314}
              y={104}
              fontSize={reading.size ?? 24}
              fontWeight={700}
              fill={reading.color}
            >
              {reading.value}
            </motion.text>
            <text x={314} y={124} fontSize={8} fill={PANEL_MUTED}>
              {reading.note}
            </text>
            {isStress && (
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.2, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
                d="M 424 78 L 432 78 L 428 90 L 434 90 L 424 104 L 427 93 L 421 93 Z"
                fill={LOAD}
              />
            )}
            {(showReference || metric === 'check') && (
              <g transform="translate(424 90)">
                <motion.path
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 240, damping: 16 }}
                  d="M -7 0 L -2 5 L 7 -6"
                  fill="none"
                  stroke={GOOD}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                />
              </g>
            )}
          </g>

          <text x={230} y={286} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            temperatura działa na oba czujniki jednakowo, więc w różnicy znika
          </text>
        </svg>
      </div>
    </div>
  )
}
