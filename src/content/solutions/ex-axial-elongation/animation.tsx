import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'

const TOP = 64
const BOTTOM = 248
const CX = 152
const L1 = 1200
const L2 = 800
const TOTAL = L1 + L2
const SPAN = BOTTOM - TOP
const H1 = (SPAN * L1) / TOTAL
const H2 = (SPAN * L2) / TOTAL
const EXAG = 120
const PX_PER_MM = SPAN / TOTAL
const E1 = 0.6 * PX_PER_MM * EXAG
const E2 = 0.8 * PX_PER_MM * EXAG

const W1 = 44
const W2 = 18 + 26 * Math.sqrt(120 / 240)

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function Dimension({
  x,
  from,
  to,
  label,
  color,
}: {
  x: number
  from: number
  to: number
  label: string
  color: string
}) {
  const mid = (from + to) / 2
  return (
    <g stroke={color} fill={color}>
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1.3} />
      <line x1={x - 5} y1={from} x2={x + 5} y2={from} strokeWidth={1.3} />
      <line x1={x - 5} y1={to} x2={x + 5} y2={to} strokeWidth={1.3} />
      <text x={x + 8} y={mid + 3} fontSize={10} stroke="none">
        {label}
      </text>
    </g>
  )
}

export function AxialElongationAnimation({
  scene,
  index,
  playing,
  stepProgress,
  sceneProgress,
}: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const activeSegment = scene.focus?.segment
  const progress = playing ? smooth(sceneProgress) : 1
  const pulse = playing ? 0.72 + 0.28 * Math.sin((sceneProgress * 3 + stepProgress + index) * Math.PI * 2) : 1

  const isElongation = metric === 'ΔL'
  const isCheck = metric === 'check'
  const isNormal = metric === 'N'
  const isStress = metric === 'σ'

  let a1 = 0
  let a2 = 0
  if (isElongation) {
    if (activeSegment === '1') {
      a1 = progress
    } else if (activeSegment === '2') {
      a1 = 1
      a2 = progress
    } else {
      a1 = progress
      a2 = progress
    }
  } else if (isCheck) {
    a1 = progress
    a2 = progress
  }

  const originalJunction = TOP + H1
  const originalBottom = BOTTOM
  const junction = originalJunction + E1 * a1
  const bottom = junction + H2 + E2 * a2

  const originalPath = `M ${CX - W1} ${TOP} L ${CX + W1} ${TOP} L ${CX + W1} ${originalJunction} L ${CX + W2} ${originalJunction} L ${CX + W2} ${originalBottom} L ${CX - W2} ${originalBottom} L ${CX - W2} ${originalJunction} L ${CX - W1} ${originalJunction} Z`
  const barPath = `M ${CX - W1} ${TOP} L ${CX + W1} ${TOP} L ${CX + W1} ${junction} L ${CX + W2} ${junction} L ${CX + W2} ${bottom} L ${CX - W2} ${bottom} L ${CX - W2} ${junction} L ${CX - W1} ${junction} Z`

  const normalAxis = 306
  const normalMax = 392

  const highlight =
    activeSegment === '1'
      ? { y: TOP, height: junction - TOP, width: W1, color: ACCENT }
      : activeSegment === '2'
        ? { y: junction, height: bottom - junction, width: W2, color: ACCENT }
        : metric === 'ΔL' || isCheck
          ? { y: TOP, height: bottom - TOP, width: W1, color: LOAD }
          : null

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Schodkowy pręt stalowy utwierdzony u góry, z odcinkiem grubszym i cieńszym. Animacja pokazuje wydłużenie obu odcinków względem pierwotnego kształtu zaznaczonego linią przerywaną."
        >
          <defs>
            <marker
              id="ax1-load"
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
              id="ax1-dim"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={CX - W1 - 20} y1={TOP} x2={CX + W1 + 20} y2={TOP} />
            {Array.from({ length: 10 }, (_, tick) => {
              const x = CX - W1 - 14 + tick * ((W1 * 2 + 28) / 9)
              return <line key={tick} x1={x} y1={TOP} x2={x - 7} y2={TOP - 11} strokeWidth={1.4} />
            })}
          </g>

          <path d={originalPath} fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
          <path d={barPath} fill={ACCENT} fillOpacity={0.16} stroke={ACCENT} strokeWidth={2} />

          <rect
            x={CX - W2}
            y={junction}
            width={W2 * 2}
            height={bottom - junction}
            fill={isStress ? LOAD : ACCENT}
            fillOpacity={isStress ? 0.22 : 0.08}
          />

          {highlight && (
            <motion.rect
              x={CX - highlight.width - 4}
              y={highlight.y - 2}
              width={highlight.width * 2 + 8}
              height={Math.max(1, highlight.height + 4)}
              rx={6}
              fill="none"
              stroke={highlight.color}
              strokeWidth={1.6}
              animate={{ opacity: playing ? [0.35, pulse, 0.35] : 0.55 }}
              transition={{ duration: 1.6, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
            />
          )}

          {isNormal && (
            <g>
              <line
                x1={normalAxis}
                y1={TOP - 10}
                x2={normalAxis}
                y2={originalBottom + 10}
                stroke="#c9d0d9"
                strokeWidth={1}
              />
              <line
                x1={normalAxis - 4}
                y1={originalBottom}
                x2={normalMax + 8}
                y2={originalBottom}
                stroke="#c9d0d9"
                strokeWidth={1}
              />
              <motion.path
                d={`M ${normalAxis} ${TOP} L ${normalMax} ${TOP} L ${normalMax} ${originalBottom} L ${normalAxis} ${originalBottom} Z`}
                fill={ACCENT}
                fillOpacity={0.12}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              <line x1={normalMax} y1={TOP} x2={normalMax} y2={originalBottom} stroke={ACCENT} strokeWidth={2.4} />
              <text x={normalAxis - 8} y={TOP - 2} textAnchor="end" fontSize={10} fontWeight={700} fill={ACCENT}>
                N(x)
              </text>
              <text x={normalMax} y={TOP - 8} textAnchor="middle" fontSize={9} fill={ACCENT}>
                N = 24 kN
              </text>
              <text x={normalMax + 4} y={originalBottom + 14} fontSize={9} fill={MUTED}>
                stała na obu odcinkach
              </text>
            </g>
          )}

          <text x={16} y={TOP + 16} fontSize={10} fill={INK}>
            L₁ = 1200 mm
          </text>
          <text x={16} y={TOP + 30} fontSize={9} fill={MUTED}>
            A₁ = 240 mm²
          </text>
          <text x={16} y={originalJunction + 20} fontSize={10} fill={INK}>
            L₂ = 800 mm
          </text>
          <text x={16} y={originalJunction + 34} fontSize={9} fill={MUTED}>
            A₂ = 120 mm²
          </text>
          <text x={306} y={26} fontSize={9} fill={MUTED}>
            E = 200 GPa
          </text>

          {isElongation && (
            <>
              <Dimension x={246} from={originalJunction} to={junction} label="ΔL₁" color={ACCENT} />
              {a2 > 0.001 && <Dimension x={264} from={junction + H2} to={bottom} label="ΔL₂" color={ACCENT} />}
              {activeSegment == null && (
                <Dimension x={282} from={originalBottom} to={bottom} label="ΔL" color={ACCENT} />
              )}
            </>
          )}

          {isCheck && (
            <>
              <text x={246} y={TOP + 46} fontSize={9} fill={MUTED}>
                ε = ΔL/L
              </text>
              <text x={246} y={TOP + 60} fontSize={9} fill={MUTED}>
                σ = N/A
              </text>
              <text x={CX + W1 + 14} y={junction + 24} fontSize={9} fill={LOAD}>
                większe ε i σ
              </text>
            </>
          )}

          <motion.g
            animate={playing ? { opacity: [0.75, 1, 0.75] } : { opacity: 1 }}
            transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <line
              x1={CX + W2 + 34}
              y1={bottom + 4}
              x2={CX + W2 + 34}
              y2={bottom + 34}
              stroke={LOAD}
              strokeWidth={2.4}
              markerEnd="url(#ax1-load)"
            />
            <text x={CX + W2 + 40} y={bottom + 26} fontSize={10} fill={LOAD}>
              N = 24 kN
            </text>
          </motion.g>

          <text x={16} y={286} fontSize={9} fill={MUTED}>
            pierwotny kształt: linia przerywana; wydłużenie pokazano w skali poglądowej
          </text>
        </svg>
      </div>
    </div>
  )
}
