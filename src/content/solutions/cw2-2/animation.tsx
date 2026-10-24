import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'
const COMP = '#a970dd'
const STRAIN = '#2f8d6a'

const TOP = 34
const H1 = 88
const H2 = 97
const JUNC0 = TOP + H1
const BOTTOM = JUNC0 + H2
const CX = 150
const W1 = 32
const W2 = 28
const FREE1 = 26
const FREE2 = 28
const FREE_TOTAL = FREE1 + FREE2
const U1 = 8

const AXIS_X = 306
const MAX_BAR = 86

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function VDim({ x, from, to, label, color }: { x: number; from: number; to: number; label: string; color: string }) {
  const mid = (from + to) / 2
  return (
    <g stroke={color} fill={color}>
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1.3} />
      <line x1={x - 5} y1={from} x2={x + 5} y2={from} strokeWidth={1.3} />
      <line x1={x - 5} y1={to} x2={x + 5} y2={to} strokeWidth={1.3} />
      <text x={x + 8} y={mid + 3} fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function FixedSupport({ y, direction }: { y: number; direction: 'top' | 'bottom' }) {
  const sign = direction === 'top' ? -1 : 1
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={CX - W1 - 22} y1={y} x2={CX + W1 + 22} y2={y} />
      {Array.from({ length: 8 }, (_, tick) => {
        const x = CX - W1 - 16 + tick * ((W1 * 2 + 32) / 7)
        return <line key={tick} x1={x} y1={y} x2={x + sign * 7} y2={y + sign * 11} strokeWidth={1.4} />
      })}
    </g>
  )
}

function NegativeBarDiagram({
  segments,
  maxValue,
  title,
  color,
  labels,
}: {
  segments: Array<{ from: number; to: number; value: number }>
  maxValue: number
  title: string
  color: string
  labels: string[]
}) {
  return (
    <g>
      <line x1={AXIS_X} y1={TOP - 8} x2={AXIS_X} y2={BOTTOM + 10} stroke="#c9d0d9" strokeWidth={1} />
      <line
        x1={AXIS_X - MAX_BAR - 12}
        y1={BOTTOM + 10}
        x2={AXIS_X + 4}
        y2={BOTTOM + 10}
        stroke="#c9d0d9"
        strokeWidth={1}
      />
      {segments.map((segment, index) => {
        const width = (Math.abs(segment.value) / maxValue) * MAX_BAR
        return (
          <g key={`${title}-${index}`}>
            <rect
              x={AXIS_X - width}
              y={segment.from}
              width={width}
              height={segment.to - segment.from}
              fill={color}
              fillOpacity={0.14}
              stroke={color}
              strokeWidth={1.8}
            />
            <text
              x={AXIS_X - width - 6}
              y={(segment.from + segment.to) / 2 + 3}
              textAnchor="end"
              fontSize={9}
              fontWeight={700}
              fill={color}
            >
              {labels[index]}
            </text>
          </g>
        )
      })}
      <text x={AXIS_X + 8} y={TOP - 2} fontSize={10} fontWeight={700} fill={color}>
        {title}
      </text>
    </g>
  )
}

function CompliancePanel({ progress }: { progress: number }) {
  const w1 = 54
  const w2 = 75
  const x1 = 228
  const x2 = x1 + w1 + 12
  return (
    <motion.g initial={false} animate={{ opacity: progress }} transition={{ duration: 0.25 }}>
      <line x1={208} y1={94} x2={390} y2={94} stroke={ACCENT} strokeWidth={1.2} markerEnd="url(#cw22-flow)" />
      <text x={208} y={86} fontSize={9} fill={ACCENT}>
        N
      </text>
      <rect
        x={x1}
        y={112}
        width={w1}
        height={34}
        rx={5}
        fill={ACCENT}
        fillOpacity={0.12}
        stroke={ACCENT}
        strokeWidth={1.8}
      />
      <rect
        x={x2}
        y={112}
        width={w2}
        height={34}
        rx={5}
        fill={ACCENT}
        fillOpacity={0.18}
        stroke={ACCENT}
        strokeWidth={1.8}
      />
      <line x1={x1 + w1} y1={129} x2={x2} y2={129} stroke={ACCENT} strokeWidth={1.6} />
      <text x={x1 + w1 / 2} y={133} textAnchor="middle" fontSize={10} fontWeight={700} fill={ACCENT}>
        f₁
      </text>
      <text x={x2 + w2 / 2} y={133} textAnchor="middle" fontSize={10} fontWeight={700} fill={ACCENT}>
        f₂
      </text>
      <text x={x1} y={166} fontSize={8} fill={MUTED}>
        L₁/(EA₁)
      </text>
      <text x={x2} y={166} fontSize={8} fill={MUTED}>
        L₂/(EA₂)
      </text>
      <text x={x1} y={192} fontSize={10} fontWeight={700} fill={INK}>
        f = f₁ + f₂
      </text>
      <text x={x1} y={207} fontSize={8} fill={MUTED}>
        szeregowo: ta sama siła N
      </text>
    </motion.g>
  )
}

function StrainPanel({ progress }: { progress: number }) {
  const scale = 20833
  const zero = 294
  const thermal = 0.0024
  const topMechanical = -421.3717 / 200_000
  const bottomMechanical = -533.2985 / 200_000
  const topTotal = thermal + topMechanical
  const bottomTotal = thermal + bottomMechanical
  const rows = [
    { y: 78, label: 'górny', mech: topMechanical, total: topTotal, totalLabel: '+0,000293' },
    { y: 164, label: 'dolny', mech: bottomMechanical, total: bottomTotal, totalLabel: '−0,000266' },
  ]
  return (
    <motion.g initial={false} animate={{ opacity: progress }} transition={{ duration: 0.25 }}>
      <line x1={zero} y1={58} x2={zero} y2={196} stroke="#c9d0d9" strokeWidth={1} />
      <text x={zero - 6} y={54} textAnchor="end" fontSize={8} fill={MUTED}>
        0
      </text>
      {rows.map((row) => {
        const thermalEnd = zero + thermal * scale
        const mechEnd = thermalEnd + row.mech * scale
        return (
          <g key={row.label}>
            <text x={214} y={row.y + 3} fontSize={9} fill={INK}>
              {row.label}
            </text>
            <line x1={zero} y1={row.y} x2={thermalEnd} y2={row.y} stroke={LOAD} strokeWidth={5} />
            <line x1={thermalEnd} y1={row.y} x2={mechEnd} y2={row.y} stroke={COMP} strokeWidth={5} />
            <line x1={mechEnd} y1={row.y - 7} x2={mechEnd} y2={row.y + 7} stroke={INK} strokeWidth={1.6} />
            <circle cx={mechEnd} cy={row.y} r={3} fill={row.total > 0 ? STRAIN : COMP} />
            <text x={thermalEnd + 6} y={row.y - 8} fontSize={8} fill={LOAD}>
              ε_T
            </text>
            <text x={thermalEnd - 6} y={row.y + 17} textAnchor="end" fontSize={8} fill={COMP}>
              ε_m
            </text>
            <text x={zero + 58} y={row.y + 19} fontSize={8} fontWeight={700} fill={row.total > 0 ? STRAIN : COMP}>
              ε = {row.totalLabel}
            </text>
          </g>
        )
      })}
      <text x={zero + 58} y={74} fontSize={8} fill={MUTED}>
        ε_T = +0,0024
      </text>
    </motion.g>
  )
}

function SectionPanel({ progress }: { progress: number }) {
  const r1 = 45 * (0.55 + 0.45 * progress)
  const r2 = 40 * (0.55 + 0.45 * progress)
  return (
    <motion.g initial={false} animate={{ opacity: progress }} transition={{ duration: 0.25 }}>
      <circle cx={258} cy={112} r={r1} fill={ACCENT} fillOpacity={0.1} stroke={ACCENT} strokeWidth={2} />
      <circle cx={358} cy={112} r={r2} fill={COMP} fillOpacity={0.12} stroke={COMP} strokeWidth={2} />
      <line x1={258 - r1} y1={112} x2={258 + r1} y2={112} stroke={ACCENT} strokeWidth={1.2} strokeDasharray="4 3" />
      <line x1={358 - r2} y1={112} x2={358 + r2} y2={112} stroke={COMP} strokeWidth={1.2} strokeDasharray="4 3" />
      <text x={258} y={112 + r1 + 18} textAnchor="middle" fontSize={9} fontWeight={700} fill={ACCENT}>
        d₁ = 90 mm
      </text>
      <text x={258} y={112 + r1 + 31} textAnchor="middle" fontSize={8} fill={MUTED}>
        A₁ = 6361,7 mm²
      </text>
      <text x={358} y={112 + r2 + 18} textAnchor="middle" fontSize={9} fontWeight={700} fill={COMP}>
        d₂ = 80 mm
      </text>
      <text x={358} y={112 + r2 + 31} textAnchor="middle" fontSize={8} fill={MUTED}>
        A₂ = 5026,5 mm²
      </text>
    </motion.g>
  )
}

export function RestrainedThermalBarAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1
  const pulse = playing ? 0.7 + 0.3 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1
  const heat = playing ? smooth(clamp01(sceneProgress * 1.5)) : 1

  const isModel = metric === 'model'
  const isFree = metric === 'ΔL_T'
  const isCompliance = metric === 'f'
  const isReaction = metric === 'R'
  const isNormal = metric === 'N'
  const isArea = metric === 'A'
  const isStress = metric === 'σ'
  const isStrain = metric === 'ε'
  const isDelta = metric === 'ΔL'

  const timeline = playing ? sceneProgress : 1
  const freeGrow = isFree ? progress : 0
  const ghostGrow = isReaction ? smooth(clamp01(timeline / 0.55)) : 0
  const press = isReaction ? smooth(clamp01((timeline - 0.35) / 0.5)) : 0

  let junction = JUNC0
  let bottom = BOTTOM
  if (isFree) {
    junction = JUNC0 + FREE1 * freeGrow
    bottom = BOTTOM + FREE_TOTAL * freeGrow
  } else if (isDelta) {
    junction = JUNC0 + U1 * progress
    bottom = BOTTOM
  }

  const ghostJunction = JUNC0 + FREE1 * ghostGrow
  const ghostBottom = BOTTOM + FREE_TOTAL * ghostGrow

  const originalPath = `M ${CX - W1} ${TOP} L ${CX + W1} ${TOP} L ${CX + W1} ${JUNC0} L ${CX + W2} ${JUNC0} L ${CX + W2} ${BOTTOM} L ${CX - W2} ${BOTTOM} L ${CX - W2} ${JUNC0} L ${CX - W1} ${JUNC0} Z`
  const barPath = `M ${CX - W1} ${TOP} L ${CX + W1} ${TOP} L ${CX + W1} ${junction} L ${CX + W2} ${junction} L ${CX + W2} ${bottom} L ${CX - W2} ${bottom} L ${CX - W2} ${junction} L ${CX - W1} ${junction} Z`
  const ghostPath = `M ${CX - W1} ${TOP} L ${CX + W1} ${TOP} L ${CX + W1} ${ghostJunction} L ${CX + W2} ${ghostJunction} L ${CX + W2} ${ghostBottom} L ${CX - W2} ${ghostBottom} L ${CX - W2} ${ghostJunction} L ${CX - W1} ${ghostJunction} Z`

  const compressed = isReaction || isNormal || isStress || isStrain || isDelta
  const barColor = compressed ? COMP : ACCENT
  const showHeat = isModel || isFree || isReaction || isDelta

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Stopniowany stalowy pręt między dwoma nieruchomymi podporami. Animacja porównuje swobodne wydłużenie termiczne z prętem zablokowanym, pokazuje reakcje, wykres siły osiowej, naprężeń i odkształceń oraz końcową deformację odcinków."
        >
          <defs>
            <marker
              id="cw22-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={COMP} />
            </marker>
            <marker
              id="cw22-load"
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
              id="cw22-flow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
            </marker>
          </defs>

          <FixedSupport y={TOP} direction="top" />
          <motion.g initial={false} animate={{ opacity: isFree ? 0.28 : 1 }} transition={{ duration: 0.25 }}>
            <FixedSupport y={BOTTOM} direction="bottom" />
          </motion.g>

          <path d={originalPath} fill="none" stroke={MUTED} strokeWidth={1.3} strokeDasharray="5 4" />
          {isReaction && ghostGrow > 0.01 && (
            <path d={ghostPath} fill="none" stroke={LOAD} strokeWidth={1.4} strokeDasharray="5 4" />
          )}

          <path d={barPath} fill={barColor} fillOpacity={compressed ? 0.18 : 0.14} stroke={barColor} strokeWidth={2} />

          {isStress && (
            <motion.g
              stroke={COMP}
              fill={COMP}
              markerEnd="url(#cw22-arrow)"
              initial={false}
              animate={{ opacity: playing ? pulse : 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <line x1={CX} y1={TOP + 8} x2={CX} y2={TOP + 30} strokeWidth={1.8} />
              <line x1={CX} y1={BOTTOM - 8} x2={CX} y2={BOTTOM - 30} strokeWidth={1.8} />
            </motion.g>
          )}

          {isReaction && (
            <motion.g
              stroke={COMP}
              fill={COMP}
              initial={false}
              animate={{ opacity: press }}
              transition={{ duration: 0.2 }}
            >
              <line
                x1={CX + W1 + 34}
                y1={TOP - 4}
                x2={CX + W1 + 34}
                y2={TOP + 24}
                strokeWidth={2.2}
                markerEnd="url(#cw22-arrow)"
              />
              <line
                x1={CX + W2 + 34}
                y1={BOTTOM + 4}
                x2={CX + W2 + 34}
                y2={BOTTOM - 24}
                strokeWidth={2.2}
                markerEnd="url(#cw22-arrow)"
              />
              <text x={CX + W1 + 40} y={TOP + 22} fontSize={8} stroke="none">
                R
              </text>
              <text x={CX + W2 + 40} y={BOTTOM - 16} fontSize={8} stroke="none">
                R
              </text>
            </motion.g>
          )}

          {showHeat && (
            <motion.g
              stroke={LOAD}
              strokeWidth={1.6}
              fill="none"
              initial={false}
              animate={{ opacity: heat }}
              transition={{ duration: 0.3 }}
            >
              {Array.from({ length: 7 }, (_, wave) => {
                const y = TOP + 16 + wave * 28
                const x = CX + W1 + 14
                return (
                  <motion.path
                    key={wave}
                    d={`M ${x} ${y} q 8 -8 0 -16`}
                    animate={playing ? { opacity: [0.2, 0.9, 0.2], x: [0, 2, 0] } : { opacity: 0.75 }}
                    transition={{ duration: 1.8, repeat: playing ? Infinity : 0, delay: wave * 0.12 }}
                  />
                )
              })}
            </motion.g>
          )}

          <text x={10} y={TOP + 18} fontSize={9} fill={INK}>
            górny · d₁ = 90 mm
          </text>
          <text x={10} y={TOP + 31} fontSize={8} fill={MUTED}>
            L₁ = 200 mm
          </text>
          <text x={10} y={TOP + 43} fontSize={8} fill={MUTED}>
            A₁ = 6361,7 mm²
          </text>
          <text x={10} y={JUNC0 + 20} fontSize={9} fill={INK}>
            dolny · d₂ = 80 mm
          </text>
          <text x={10} y={JUNC0 + 33} fontSize={8} fill={MUTED}>
            L₂ = 220 mm
          </text>
          <text x={10} y={JUNC0 + 45} fontSize={8} fill={MUTED}>
            A₂ = 5026,5 mm²
          </text>
          <text x={10} y={286} fontSize={8} fill={MUTED}>
            α = 12·10⁻⁶ 1/K · deformacja w skali poglądowej
          </text>

          <text x={444} y={24} textAnchor="end" fontSize={10} fontWeight={700} fill={LOAD}>
            ΔT = 200 K
          </text>
          <text x={444} y={38} textAnchor="end" fontSize={8} fill={MUTED}>
            ε_T = αΔT = 0,0024
          </text>

          {isFree && freeGrow > 0.01 && (
            <>
              <VDim x={214} from={BOTTOM} to={bottom} label="ΔL_T = 1,008 mm" color={LOAD} />
              <text x={214} y={TOP + 66} fontSize={8} fill={MUTED}>
                górny: +0,480 mm
              </text>
              <text x={214} y={TOP + 79} fontSize={8} fill={MUTED}>
                dolny: +0,528 mm
              </text>
              <text x={214} y={TOP + 98} fontSize={10} fontWeight={700} fill={ACCENT}>
                σ = 0
              </text>
            </>
          )}

          {isReaction && (
            <>
              <line x1={AXIS_X} y1={TOP} x2={AXIS_X} y2={ghostBottom + 8} stroke="#c9d0d9" strokeWidth={1} />
              <motion.g
                initial={false}
                animate={{ opacity: press }}
                transition={{ duration: 0.25 }}
                stroke={LOAD}
                fill={LOAD}
                markerEnd="url(#cw22-load)"
              >
                <line x1={AXIS_X + 20} y1={TOP} x2={AXIS_X + 20} y2={ghostBottom} strokeWidth={2} />
                <text x={AXIS_X + 26} y={(TOP + ghostBottom) / 2} fontSize={8} stroke="none">
                  ΔL_T
                </text>
              </motion.g>
              <motion.g
                initial={false}
                animate={{ opacity: press }}
                transition={{ duration: 0.25 }}
                stroke={COMP}
                fill={COMP}
                markerEnd="url(#cw22-arrow)"
              >
                <line x1={AXIS_X - 16} y1={ghostBottom} x2={AXIS_X - 16} y2={BOTTOM} strokeWidth={2} />
                <text x={AXIS_X - 22} y={(BOTTOM + ghostBottom) / 2} textAnchor="end" fontSize={8} stroke="none">
                  Rf
                </text>
              </motion.g>
              <text x={AXIS_X} y={BOTTOM + 50} textAnchor="middle" fontSize={9} fontWeight={700} fill={COMP}>
                ΔL_T − Rf = 0
              </text>
              <text x={214} y={TOP + 66} fontSize={9} fontWeight={700} fill={COMP}>
                R = 2,681 MN
              </text>
            </>
          )}

          {isNormal && (
            <NegativeBarDiagram
              segments={[{ from: TOP, to: BOTTOM, value: -2681 }]}
              maxValue={2681}
              title="N [MN]"
              color={COMP}
              labels={['−2,681']}
            />
          )}

          {isStress && (
            <NegativeBarDiagram
              segments={[
                { from: TOP, to: JUNC0, value: -421.37 },
                { from: JUNC0, to: BOTTOM, value: -533.3 },
              ]}
              maxValue={533.3}
              title="σ [MPa]"
              color={COMP}
              labels={['−421', '−533']}
            />
          )}

          {isStrain && <StrainPanel progress={progress} />}
          {isArea && <SectionPanel progress={progress} />}
          {isCompliance && <CompliancePanel progress={progress} />}

          {isDelta && (
            <>
              <VDim x={196} from={JUNC0} to={junction} label="" color={STRAIN} />
              <VDim x={232} from={JUNC0} to={junction} label="" color={COMP} />
              <text x={204} y={(JUNC0 + junction) / 2 - 3} fontSize={9} fontWeight={700} fill={STRAIN}>
                ΔL₁ = +0,0586
              </text>
              <text x={204} y={(JUNC0 + junction) / 2 + 12} fontSize={9} fontWeight={700} fill={COMP}>
                ΔL₂ = −0,0586
              </text>
              <text x={196} y={JUNC0 - 10} fontSize={8} fill={MUTED}>
                góra wydłuża się, dół skraca
              </text>
              <text x={196} y={BOTTOM + 30} fontSize={9} fontWeight={700} fill={STRAIN}>
                ΔL₁ + ΔL₂ = 0
              </text>
            </>
          )}

          {isModel && (
            <>
              <text x={214} y={TOP + 66} fontSize={9} fill={INK}>
                pełne utwierdzenie
              </text>
              <text x={214} y={TOP + 80} fontSize={8} fill={MUTED}>
                ΔL₁ + ΔL₂ = 0
              </text>
              <text x={214} y={TOP + 98} fontSize={9} fontWeight={700} fill={LOAD}>
                ogrzewanie: ΔT = 200 K
              </text>
            </>
          )}

          {isCompliance && (
            <text x={10} y={JUNC0 + 58} fontSize={8} fill={MUTED}>
              podatności sumują się
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
