import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'
const COMP = '#a970dd'

const X0 = 86
const BASE = 230
const GAP = 24
const FREE = (1.08 / 0.5) * GAP
const SUPPORT_X = X0 + BASE + GAP
const BAR_Y = 126
const BAR_H = 36

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function HDim({ y, from, to, label, color }: { y: number; from: number; to: number; label: string; color: string }) {
  const mid = (from + to) / 2
  return (
    <g stroke={color} fill={color}>
      <line x1={from} y1={y} x2={to} y2={y} strokeWidth={1.2} />
      <line x1={from} y1={y - 4} x2={from} y2={y + 4} strokeWidth={1.2} />
      <line x1={to} y1={y - 4} x2={to} y2={y + 4} strokeWidth={1.2} />
      <text x={mid} y={y - 6} textAnchor="middle" fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function FixedSupport({ x, opacity = 1, dashed = false }: { x: number; opacity?: number; dashed?: boolean }) {
  const direction = x < X0 + BASE ? -1 : 1
  return (
    <motion.g
      stroke={SUPPORT}
      strokeWidth={2}
      strokeLinecap="round"
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.25 }}
    >
      <rect x={x - 4} y={BAR_Y - 14} width={8} height={BAR_H + 28} fill={SUPPORT} stroke="none" />
      {Array.from({ length: 5 }, (_, tick) => {
        const y = BAR_Y - 10 + tick * 11
        return (
          <line
            key={tick}
            x1={x + direction * 4}
            y1={y}
            x2={x + direction * 13}
            y2={y + 5}
            strokeWidth={1.3}
            strokeDasharray={dashed ? '3 3' : undefined}
          />
        )
      })}
    </motion.g>
  )
}

function HeatWaves({ from, to, opacity, playing }: { from: number; to: number; opacity: number; playing: boolean }) {
  const span = Math.max(24, to - from - 40)
  return (
    <motion.g
      stroke={LOAD}
      strokeWidth={1.8}
      fill="none"
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
    >
      {Array.from({ length: 6 }, (_, wave) => {
        const x = from + 20 + (wave * span) / 5
        return (
          <motion.path
            key={wave}
            d={`M ${x} ${BAR_Y - 9} q 8 -14 0 -23`}
            animate={playing ? { opacity: [0.35, 1, 0.35], y: [0, -3, 0] } : { opacity: 0.8 }}
            transition={{ duration: 1.7, repeat: playing ? Infinity : 0, delay: wave * 0.15 }}
          />
        )
      })}
    </motion.g>
  )
}

function CompressionArrows({ from, to, opacity }: { from: number; to: number; opacity: number }) {
  const y = BAR_Y + BAR_H / 2
  return (
    <motion.g stroke={COMP} fill={COMP} initial={false} animate={{ opacity }} transition={{ duration: 0.2 }}>
      <line x1={from + 8} y1={y} x2={from + 34} y2={y} strokeWidth={2.2} markerEnd="url(#thermal-gap-comp)" />
      <line x1={to - 8} y1={y} x2={to - 34} y2={y} strokeWidth={2.2} markerEnd="url(#thermal-gap-comp)" />
    </motion.g>
  )
}

function StressGauge({ opacity }: { opacity: number }) {
  const x = 412
  const top = 86
  const bottom = 212
  const yOf = (value: number) => top + (Math.abs(value) / 160) * (bottom - top)
  return (
    <motion.g initial={false} animate={{ opacity }} transition={{ duration: 0.25 }}>
      <line x1={x} y1={top} x2={x} y2={bottom} stroke="#c9d0d9" strokeWidth={1} />
      {[0, -80, -160].map((value) => {
        const y = yOf(value)
        return (
          <g key={value}>
            <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke={MUTED} strokeWidth={1} />
            <text x={x + 8} y={y + 3} fontSize={8} fill={MUTED}>
              {value === 0 ? '0' : `${value}`}
            </text>
          </g>
        )
      })}
      <text x={x} y={top - 12} textAnchor="middle" fontSize={8} fill={MUTED}>
        σ [MPa]
      </text>
      <line
        x1={x - 10}
        y1={yOf(-144)}
        x2={x + 10}
        y2={yOf(-144)}
        stroke={MUTED}
        strokeWidth={1.2}
        strokeDasharray="3 3"
      />
      <text x={x - 14} y={yOf(-144) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
        −144
      </text>
      <line x1={x - 12} y1={yOf(-77.3)} x2={x + 12} y2={yOf(-77.3)} stroke={COMP} strokeWidth={2.6} />
      <text x={x - 14} y={yOf(-77.3) + 3} textAnchor="end" fontSize={8} fontWeight={700} fill={COMP}>
        −77,3
      </text>
      <text x={x + 8} y={yOf(-144) + 14} fontSize={7.5} fill={MUTED}>
        bez luzu
      </text>
      <text x={x + 8} y={yOf(-77.3) + 14} fontSize={7.5} fill={COMP}>
        z luzem
      </text>
    </motion.g>
  )
}

function GapDesignPlot({ progress, playing }: { progress: number; playing: boolean }) {
  const xOf = (deltaT: number) => 84 + (deltaT / 75) * 340
  const yOf = (sigma: number) => 54 + (Math.abs(sigma) / 180) * 190
  const reveal = playing ? progress : 1

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Wykres naprężenia w funkcji temperatury. Do 27,8 K luz się domyka i naprężenie jest zerowe, potem rośnie liniowo. Linia bez luzu rośnie od zera i przy 60 K osiąga 144 MPa."
        >
          <line x1={84} y1={44} x2={84} y2={244} stroke="#c9d0d9" strokeWidth={1} />
          <line x1={84} y1={244} x2={430} y2={244} stroke="#c9d0d9" strokeWidth={1} />

          <motion.path
            d={`M ${xOf(0)} ${yOf(0)} L ${xOf(75)} ${yOf(-180)}`}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.4}
            strokeDasharray="5 4"
            initial={false}
            animate={{ pathLength: reveal }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <text x={xOf(69)} y={yOf(-166) - 8} textAnchor="end" fontSize={8.5} fill={MUTED}>
            bez luzu
          </text>

          <motion.path
            d={`M ${xOf(0)} ${yOf(0)} L ${xOf(27.8)} ${yOf(0)} L ${xOf(75)} ${yOf(-113.3)}`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={2.6}
            initial={false}
            animate={{ pathLength: reveal }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />
          <text x={xOf(71)} y={yOf(-96)} fontSize={9} fontWeight={700} fill={ACCENT}>
            z luzem
          </text>

          <line
            x1={xOf(27.8)}
            y1={yOf(0)}
            x2={xOf(27.8)}
            y2={244}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <circle cx={xOf(27.8)} cy={yOf(0)} r={3.5} fill={ACCENT} />
          <text x={xOf(27.8)} y={258} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            27,8
          </text>
          <text x={xOf(27.8) + 6} y={yOf(0) + 16} fontSize={9} fill={ACCENT}>
            ΔT_c
          </text>

          <circle cx={xOf(60)} cy={yOf(-77.3)} r={4} fill={ACCENT} />
          <text x={xOf(60) + 8} y={yOf(-77.3) + 4} fontSize={9} fontWeight={700} fill={ACCENT}>
            ΔT = 60 K
          </text>
          <text x={xOf(60) + 8} y={yOf(-77.3) + 16} fontSize={8.5} fill={ACCENT}>
            σ = −77,3 MPa
          </text>
          <circle cx={xOf(60)} cy={yOf(-144)} r={3} fill={MUTED} />
          <text x={xOf(60) + 8} y={yOf(-144) + 4} fontSize={8.5} fill={MUTED}>
            bez luzu: −144 MPa
          </text>

          <text x={16} y={26} fontSize={9} fill={INK}>
            luz 0,5 mm przesuwa początek ściskania
          </text>
          <text x={84} y={38} textAnchor="middle" fontSize={8.5} fill={MUTED}>
            σ [MPa]
          </text>
          <text x={430} y={268} textAnchor="end" fontSize={8.5} fill={MUTED}>
            ΔT [K]
          </text>
          <text x={74} y={58} textAnchor="end" fontSize={8} fill={MUTED}>
            0
          </text>
          <text x={74} y={yOf(-90) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
            −90
          </text>
          <text x={74} y={yOf(-180) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
            −180
          </text>
          {[0, 30, 60].map((tick) => (
            <g key={tick}>
              <line x1={xOf(tick)} y1={244} x2={xOf(tick)} y2={250} stroke={MUTED} strokeWidth={1} />
              <text x={xOf(tick)} y={260} textAnchor="middle" fontSize={8} fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}
          <text x={16} y={286} fontSize={8.5} fill={MUTED}>
            po kontakcie nachylenie jest takie samo jak bez luzu
          </text>
        </svg>
      </div>
    </div>
  )
}

export function ThermalGapAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const mode = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1
  const isModel = mode === 'model'
  const isFree = mode === 'free'
  const isGap = mode === 'gap'
  const isRestraint = mode === 'restraint'
  const isStress = mode === 'stress'
  const isDesign = mode === 'design'
  const compressed = isRestraint || isStress
  const heat = isModel ? 0 : playing ? smooth(clamp01(sceneProgress * 1.6)) : 1
  const pulse = playing ? 0.68 + 0.32 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1

  if (isDesign) return <GapDesignPlot progress={progress} playing={playing} />

  const ext = isModel ? 0 : isFree ? FREE * progress : isGap ? GAP * progress : GAP
  const barEnd = X0 + BASE + ext
  const gapNow = SUPPORT_X - barEnd
  const freeEnd = X0 + BASE + FREE
  const barColor = compressed ? COMP : ACCENT
  const heatLabel = isModel ? 'ΔT = 0' : isGap ? 'ΔT_c ≈ 27,8 K' : 'ΔT = 60 K'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pręt utwierdzony z lewej strony i luzem do ściany z prawej. Animacja pokazuje swobodne wydłużenie 1,08 mm, zamknięcie luzu 0,5 mm i ściskanie po kontakcie."
        >
          <defs>
            <marker
              id="thermal-gap-comp"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={COMP} />
            </marker>
          </defs>

          <FixedSupport x={X0} />
          <FixedSupport x={SUPPORT_X} opacity={isFree ? 0.28 : 1} dashed={isFree} />

          <rect
            x={X0}
            y={BAR_Y}
            width={BASE}
            height={BAR_H}
            rx={4}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
          />

          {compressed && (
            <rect
              x={X0}
              y={BAR_Y}
              width={BASE + FREE}
              height={BAR_H}
              rx={4}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.1}
              strokeDasharray="5 5"
              opacity={0.7}
            />
          )}

          <motion.rect
            x={X0}
            y={BAR_Y}
            height={BAR_H}
            rx={4}
            initial={false}
            animate={{ width: Math.max(1, BASE + ext) }}
            transition={{ duration: 0.12, ease: 'linear' }}
            fill={barColor}
            fillOpacity={compressed ? 0.2 : 0.16}
            stroke={barColor}
            strokeWidth={2}
          />

          <HeatWaves from={X0} to={barEnd} opacity={heat} playing={playing} />

          {compressed && <CompressionArrows from={X0} to={barEnd} opacity={progress * (playing ? pulse : 1)} />}

          {isFree && (
            <>
              <HDim y={BAR_Y + BAR_H + 42} from={X0 + BASE} to={barEnd} label="ΔL_T = 1,08 mm" color={LOAD} />
              <text x={X0} y={BAR_Y + BAR_H + 64} fontSize={10} fontWeight={700} fill={ACCENT}>
                swobodnie: σ = 0
              </text>
            </>
          )}

          {isGap && (
            <>
              <HDim y={BAR_Y + BAR_H + 50} from={X0 + BASE} to={barEnd} label="ΔL = 0,5 mm" color={ACCENT} />
              {gapNow > 1 && <HDim y={BAR_Y + BAR_H + 22} from={barEnd} to={SUPPORT_X} label="luz → 0" color={MUTED} />}
              {gapNow <= 1 && (
                <g stroke={SUPPORT} strokeWidth={2}>
                  <line x1={SUPPORT_X - 12} y1={BAR_Y + BAR_H + 14} x2={SUPPORT_X + 12} y2={BAR_Y + BAR_H + 14} />
                  <line x1={SUPPORT_X - 12} y1={BAR_Y + BAR_H + 20} x2={SUPPORT_X + 12} y2={BAR_Y + BAR_H + 20} />
                  <text
                    x={SUPPORT_X}
                    y={BAR_Y + BAR_H + 36}
                    textAnchor="middle"
                    fontSize={9}
                    fill={MUTED}
                    stroke="none"
                  >
                    kontakt
                  </text>
                </g>
              )}
              <text x={X0} y={BAR_Y + BAR_H + 64} fontSize={10} fontWeight={700} fill={ACCENT}>
                przy kontakcie σ = 0
              </text>
            </>
          )}

          {compressed && (
            <>
              <text x={X0 + 10} y={BAR_Y + BAR_H + 18} fontSize={10} fontWeight={700} fill={COMP}>
                {isStress ? 'σ = −77,3 MPa' : 'N = −30,9 kN'}
              </text>
              <HDim y={BAR_Y + BAR_H + 42} from={SUPPORT_X} to={freeEnd} label="zablokowane 0,58 mm" color={COMP} />
              <StressGauge opacity={isStress ? progress : 0.35} />
            </>
          )}

          {isRestraint && (
            <text x={X0} y={BAR_Y + BAR_H + 64} fontSize={9} fill={COMP}>
              luz zamknięty; dalsze wydłużenie jest blokowane
            </text>
          )}

          {isStress && (
            <text x={X0} y={BAR_Y + BAR_H + 64} fontSize={9} fill={COMP}>
              luz zmniejsza ściskanie z −144 do −77,3 MPa
            </text>
          )}

          <text x={16} y={22} fontSize={9} fill={INK}>
            L = 1500 mm, A = 400 mm²
          </text>
          <text x={16} y={36} fontSize={8.5} fill={MUTED}>
            E = 200 GPa, α = 12·10⁻⁶ 1/K
          </text>
          <text x={16} y={50} fontSize={8.5} fill={MUTED}>
            g = 0,5 mm
          </text>
          <text x={444} y={22} textAnchor="end" fontSize={10} fontWeight={700} fill={heat > 0.05 ? LOAD : MUTED}>
            {heatLabel}
          </text>
          <text x={444} y={38} textAnchor="end" fontSize={8.5} fill={MUTED}>
            ściana po prawej
          </text>

          <text x={16} y={288} fontSize={8.5} fill={MUTED}>
            {isModel
              ? 'przed ogrzaniem: między prętem a ścianą jest luz 0,5 mm'
              : isFree
                ? 'myślowo bez ściany: pełne wydłużenie swobodne'
                : isGap
                  ? 'luz zamyka się przy ΔT ≈ 27,8 K; do tej chwili σ = 0'
                  : isRestraint
                    ? 'po kontakcie podpora przejmuje resztę wydłużenia'
                    : 'naprężenie rośnie liniowo po zamknięciu luzu'}
          </text>
        </svg>
      </div>
    </div>
  )
}
