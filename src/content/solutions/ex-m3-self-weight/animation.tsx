import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'

const TOP = 54
const BOTTOM = 244
const CX = 148
const HALF = 17
const AXIS_X = 320
const DIAG_X1 = 440

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
      <line x1={x} y1={from} x2={x} y2={to} strokeWidth={1.2} />
      <line x1={x - 5} y1={from} x2={x + 5} y2={from} strokeWidth={1.2} />
      <line x1={x - 5} y1={to} x2={x + 5} y2={to} strokeWidth={1.2} />
      <text x={x + 8} y={mid + 3} fontSize={10} stroke="none">
        {label}
      </text>
    </g>
  )
}

export function SelfWeightExample1Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const showN = metric === 'N'
  const showSigma = metric === 'σ'
  const showElongation = metric === 'ΔL'
  const showDiagram = showN || showSigma
  const diagramColor = showSigma ? STRESS : ACCENT

  const draw = showDiagram ? (playing ? smooth(clamp01(sceneProgress / 0.8)) : 1) : 1
  const stretch = showElongation ? (playing ? smooth(clamp01((sceneProgress - 0.05) / 0.75)) : 1) : 0
  const barBottom = BOTTOM + 18 * stretch
  const cutY = BOTTOM - draw * (BOTTOM - TOP)
  const markerX = AXIS_X + draw * (DIAG_X1 - AXIS_X)

  const diagramPath = `M${AXIS_X} ${BOTTOM} L${DIAG_X1} ${TOP}`
  const diagramArea = `M${AXIS_X} ${BOTTOM} L${DIAG_X1} ${TOP} L${AXIS_X} ${TOP} Z`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Pionowy, jednorodny pręt zawieszony u góry. Animacja pokazuje obciążenie ciężarem własnym, liniowy przyrost siły osiowej i naprężenia wzdłuż pręta oraz wydłużenie własne."
        >
          <text x={14} y={28} fontSize={9} fill={MUTED}>
            L = 4 m
          </text>
          <text x={14} y={42} fontSize={9} fill={MUTED}>
            A = 300 mm²
          </text>
          <text x={14} y={56} fontSize={9} fill={MUTED}>
            γ = 77 kN/m³
          </text>
          <text x={14} y={70} fontSize={9} fill={MUTED}>
            E = 200 GPa
          </text>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={CX - HALF - 22} y1={TOP} x2={CX + HALF + 22} y2={TOP} />
            {Array.from({ length: 9 }, (_, tick) => {
              const x = CX - HALF - 16 + tick * ((HALF * 2 + 32) / 8)
              return <line key={tick} x1={x} y1={TOP} x2={x - 7} y2={TOP - 11} strokeWidth={1.4} />
            })}
          </g>

          <rect
            x={CX - HALF}
            y={TOP}
            width={HALF * 2}
            height={BOTTOM - TOP}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.3}
            strokeDasharray="5 4"
            opacity={stretch > 0 ? 1 : 0}
          />
          <motion.rect
            x={CX - HALF}
            y={TOP}
            width={HALF * 2}
            height={barBottom - TOP}
            rx={3}
            fill={ACCENT}
            fillOpacity={0.14}
            stroke={ACCENT}
            strokeWidth={2}
            initial={false}
            animate={{ height: barBottom - TOP }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <line x1={CX - HALF - 17} y1={BOTTOM} x2={CX - HALF - 17} y2={TOP + 6} stroke={MUTED} strokeWidth={1} />
          <path
            d={`M${CX - HALF - 21} ${TOP + 14} L${CX - HALF - 17} ${TOP + 4} L${CX - HALF - 13} ${TOP + 14}`}
            fill="none"
            stroke={MUTED}
            strokeWidth={1}
          />
          <text x={CX - HALF - 24} y={TOP + 2} textAnchor="end" fontSize={9} fill={MUTED}>
            x
          </text>
          <text x={CX - HALF - 12} y={BOTTOM + 13} textAnchor="end" fontSize={8.5} fill={MUTED}>
            0
          </text>
          <text x={CX - HALF - 24} y={TOP + 22} textAnchor="end" fontSize={8.5} fill={MUTED}>
            L
          </text>

          {Array.from({ length: 8 }, (_, arrowIndex) => {
            const y = TOP + 18 + arrowIndex * ((BOTTOM - TOP - 36) / 7)
            const appear = index === 0 && playing ? smooth(clamp01(sceneProgress * 1.5 - arrowIndex * 0.08)) : 1
            return (
              <g key={arrowIndex} opacity={showElongation ? 0.45 * appear : appear} stroke={LOAD} fill={LOAD}>
                <line x1={CX + HALF} y1={y} x2={CX + HALF + 13} y2={y} strokeWidth={1} />
                <line x1={CX + HALF + 13} y1={y} x2={CX + HALF + 13} y2={y + 12} strokeWidth={1.6} />
                <path
                  d={`M${CX + HALF + 9.5} ${y + 5} L${CX + HALF + 13} ${y + 12} L${CX + HALF + 16.5} ${y + 5}`}
                  fill="none"
                  strokeWidth={1.6}
                />
              </g>
            )
          })}
          <text x={CX + HALF + 22} y={TOP + 12} fontSize={9} fill={LOAD}>
            q = γA = 23,1 N/m
          </text>

          {showDiagram && draw > 0.01 && (
            <>
              <motion.rect
                x={CX - HALF}
                y={cutY}
                width={HALF * 2}
                height={BOTTOM - cutY}
                fill={diagramColor}
                fillOpacity={0.12}
                initial={false}
                animate={{ opacity: 1 }}
              />
              <line
                x1={CX - HALF - 8}
                y1={cutY}
                x2={CX + HALF + 8}
                y2={cutY}
                stroke={diagramColor}
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
              <text x={CX + HALF + 9} y={cutY - 4} fontSize={8.5} fontWeight={700} fill={diagramColor}>
                x
              </text>
              <line
                x1={CX + HALF + 20}
                y1={cutY}
                x2={markerX}
                y2={cutY}
                stroke={diagramColor}
                strokeWidth={1}
                strokeDasharray="3 4"
                opacity={0.35}
              />
            </>
          )}

          {showDiagram && (
            <g>
              <line x1={AXIS_X} y1={TOP - 10} x2={AXIS_X} y2={BOTTOM + 8} stroke="#c9d0d9" strokeWidth={1.2} />
              <line x1={AXIS_X - 4} y1={BOTTOM} x2={DIAG_X1 + 16} y2={BOTTOM} stroke="#c9d0d9" strokeWidth={1.2} />
              <path
                d={`M${DIAG_X1 + 6} ${BOTTOM - 4} L${DIAG_X1 + 16} ${BOTTOM} L${DIAG_X1 + 6} ${BOTTOM + 4}`}
                fill="none"
                stroke="#c9d0d9"
                strokeWidth={1.2}
              />
              <motion.path
                d={diagramArea}
                fill={diagramColor}
                initial={false}
                animate={{ opacity: 0.13 * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={diagramPath}
                fill="none"
                stroke={diagramColor}
                strokeWidth={2.6}
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={AXIS_X - 8} y={TOP - 2} textAnchor="end" fontSize={10} fontWeight={700} fill={diagramColor}>
                {showSigma ? 'σ' : 'N'}
              </text>
              <text x={AXIS_X} y={BOTTOM + 15} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={DIAG_X1 + 20} y={BOTTOM + 4} fontSize={9} fill={MUTED}>
                x
              </text>
              {showN && (
                <text x={DIAG_X1 + 4} y={TOP - 8} textAnchor="end" fontSize={9} fontWeight={700} fill={diagramColor}>
                  N(L) = 92,4 N
                </text>
              )}
              {showSigma && (
                <text x={DIAG_X1 + 4} y={TOP - 8} textAnchor="end" fontSize={9} fontWeight={700} fill={diagramColor}>
                  σ(L) = 0,308 MPa
                </text>
              )}
              {showN && (
                <text x={AXIS_X + 12} y={TOP + 20} fontSize={8.5} fill={diagramColor}>
                  N(x) = γAx
                </text>
              )}
              {showSigma && (
                <text x={AXIS_X + 8} y={BOTTOM + 30} fontSize={8.5} fill={OK}>
                  σ(x) = γx — nie zależy od A
                </text>
              )}
              {draw > 0.02 && <circle cx={markerX} cy={cutY} r={3.5} fill={diagramColor} />}
            </g>
          )}

          {showElongation && (
            <>
              <line
                x1={CX - HALF - 11}
                y1={BOTTOM}
                x2={CX + HALF + 11}
                y2={BOTTOM}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <Dimension x={CX + HALF + 30} from={BOTTOM} to={barBottom} label="δ" color={ACCENT} />
              <text x={CX + HALF + 42} y={BOTTOM + 28} fontSize={8.5} fill={MUTED}>
                w skali poglądowej
              </text>
              <text x={14} y={104} fontSize={9} fill={ACCENT}>
                δ = 0,00308 mm
              </text>
              <text x={14} y={118} fontSize={9} fill={STRESS}>
                ε_max = 1,54·10⁻⁶
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
