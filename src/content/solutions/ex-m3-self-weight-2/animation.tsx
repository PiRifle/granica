import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const SUPPORT = '#68727e'

const TOP = 54
const BOTTOM = 228
const CX = 112
const HALF = 16
const AXIS_X = 250
const DIAG_X1 = 342

const P = 5000
const N_MAX = 5092.4
const SIGMA_P = 16.67
const SIGMA_MAX = 16.97

const INSET_X0 = 374
const INSET_X1 = 452
const INSET_Y0 = 164
const INSET_Y1 = 238

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

export function SelfWeightExample2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const showN = metric === 'N'
  const showSigma = metric === 'σ'
  const showElongation = metric === 'ΔL'
  const showDiagram = showN || showSigma
  const diagramColor = showSigma ? STRESS : ACCENT

  const draw = showDiagram ? (playing ? smooth(clamp01(sceneProgress / 0.82)) : 1) : 1
  const stretch = showElongation ? (playing ? smooth(clamp01((sceneProgress - 0.05) / 0.75)) : 1) : 0
  const barBottom = BOTTOM + 18 * stretch
  const cutY = BOTTOM - draw * (BOTTOM - TOP)

  const xN = (value: number) => AXIS_X + (value / N_MAX) * (DIAG_X1 - AXIS_X)
  const xSigma = (value: number) => AXIS_X + (value / SIGMA_MAX) * (DIAG_X1 - AXIS_X)
  const currentN = P + (N_MAX - P) * draw
  const currentSigma = SIGMA_P + (SIGMA_MAX - SIGMA_P) * draw
  const markerX = showSigma ? xSigma(currentSigma) : xN(currentN)
  const constantX = showSigma ? xSigma(SIGMA_P) : xN(P)
  const totalX = showSigma ? xSigma(SIGMA_MAX) : xN(N_MAX)

  const insetIncrement = showSigma ? 0.308 : 92.4
  const ix = (value: number) => 392 + (value / insetIncrement) * 54
  const iy = (value: number) => INSET_Y1 - value * (INSET_Y1 - INSET_Y0)
  const insetPath = `M${ix(0)} ${iy(0)} L${ix(insetIncrement)} ${iy(1)}`
  const insetArea = `M${ix(0)} ${iy(0)} L${ix(insetIncrement)} ${iy(1)} L${ix(0)} ${iy(1)} Z`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Pionowy pręt z ładunkiem 5 kiloniutonów na dolnym końcu i ciężarem własnym. Animacja pokazuje sumę stałej siły od ładunku i liniowego przyrostu od ciężaru własnego."
        >
          <text x={14} y={28} fontSize={9} fill={MUTED}>
            L = 4 m
          </text>
          <text x={14} y={42} fontSize={9} fill={MUTED}>
            A = 300 mm²
          </text>
          <text x={14} y={56} fontSize={9} fill={MUTED}>
            P = 5 kN
          </text>
          <text x={14} y={70} fontSize={9} fill={MUTED}>
            γ = 77 kN/m³
          </text>
          <text x={14} y={84} fontSize={9} fill={MUTED}>
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
                <line x1={CX + HALF} y1={y} x2={CX + HALF + 11} y2={y} strokeWidth={1} />
                <line x1={CX + HALF + 11} y1={y} x2={CX + HALF + 11} y2={y + 12} strokeWidth={1.6} />
                <path
                  d={`M${CX + HALF + 7.5} ${y + 5} L${CX + HALF + 11} ${y + 12} L${CX + HALF + 14.5} ${y + 5}`}
                  fill="none"
                  strokeWidth={1.6}
                />
              </g>
            )
          })}
          <text x={CX + HALF + 20} y={TOP + 12} fontSize={9} fill={LOAD}>
            q = γA = 23,1 N/m
          </text>

          <motion.g
            stroke={LOAD}
            fill={LOAD}
            initial={false}
            animate={playing ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
            transition={{ duration: 1.9, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
          >
            <line x1={CX} y1={barBottom + 6} x2={CX} y2={barBottom + 40} strokeWidth={2.5} />
            <path
              d={`M${CX - 5} ${barBottom + 32} L${CX} ${barBottom + 40} L${CX + 5} ${barBottom + 32}`}
              fill="none"
              strokeWidth={2.5}
            />
            <text x={CX + 10} y={barBottom + 50} fontSize={10} stroke="none">
              P = 5 kN
            </text>
          </motion.g>

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
              <line x1={AXIS_X - 4} y1={BOTTOM} x2={DIAG_X1 + 12} y2={BOTTOM} stroke="#c9d0d9" strokeWidth={1.2} />
              <path
                d={`M${DIAG_X1 + 2} ${BOTTOM - 4} L${DIAG_X1 + 12} ${BOTTOM} L${DIAG_X1 + 2} ${BOTTOM + 4}`}
                fill="none"
                stroke="#c9d0d9"
                strokeWidth={1.2}
              />
              <rect
                x={AXIS_X}
                y={TOP}
                width={constantX - AXIS_X}
                height={BOTTOM - TOP}
                fill={diagramColor}
                fillOpacity={0.12}
              />
              <motion.path
                d={`M${constantX} ${BOTTOM} L${totalX} ${TOP} L${constantX} ${TOP} Z`}
                fill={LOAD}
                initial={false}
                animate={{ opacity: 0.42 * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={constantX}
                y1={BOTTOM}
                x2={constantX}
                y2={TOP}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="3 4"
              />
              <motion.path
                d={`M${constantX} ${BOTTOM} L${totalX} ${TOP}`}
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
              <text x={DIAG_X1 + 16} y={BOTTOM + 4} fontSize={9} fill={MUTED}>
                x
              </text>
              {showN && (
                <text x={DIAG_X1 + 2} y={TOP - 8} textAnchor="end" fontSize={9} fontWeight={700} fill={diagramColor}>
                  N_max = 5,09 kN
                </text>
              )}
              {showSigma && (
                <text x={DIAG_X1 + 2} y={TOP - 8} textAnchor="end" fontSize={9} fontWeight={700} fill={diagramColor}>
                  σ_max = 16,97 MPa
                </text>
              )}
              {showN && (
                <text x={AXIS_X + 8} y={TOP + 22} fontSize={8.5} fill={diagramColor}>
                  P = 5,00 kN
                </text>
              )}
              {showSigma && (
                <text x={AXIS_X + 8} y={TOP + 22} fontSize={8.5} fill={diagramColor}>
                  P/A = 16,67 MPa
                </text>
              )}
              <text x={AXIS_X + 8} y={TOP + 36} fontSize={8.5} fill={LOAD}>
                + γ{showSigma ? 'x' : 'Ax'}
              </text>
              {draw > 0.02 && <circle cx={markerX} cy={cutY} r={3.5} fill={diagramColor} />}
            </g>
          )}

          {showDiagram && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <rect
                x={INSET_X0}
                y={INSET_Y0 - 12}
                width={INSET_X1 - INSET_X0}
                height={INSET_Y1 - INSET_Y0 + 26}
                rx={6}
                fill="#fff"
                stroke="#dde3ea"
                strokeWidth={1}
              />
              <text x={INSET_X0 + 6} y={INSET_Y0 - 18} fontSize={8} fill={MUTED}>
                powiększenie przyrostu
              </text>
              <line x1={ix(0)} y1={iy(0)} x2={ix(0)} y2={iy(1)} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={ix(0) - 3} y1={iy(0)} x2={ix(insetIncrement) + 4} y2={iy(0)} stroke="#c9d0d9" strokeWidth={1} />
              <motion.path
                d={insetArea}
                fill={LOAD}
                initial={false}
                animate={{ opacity: 0.18 * draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={insetPath}
                fill="none"
                stroke={LOAD}
                strokeWidth={2.2}
                initial={false}
                animate={{ pathLength: draw }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={ix(0)} y={iy(0) + 12} textAnchor="middle" fontSize={8} fill={MUTED}>
                0
              </text>
              <text x={ix(insetIncrement) + 2} y={iy(1) - 3} textAnchor="end" fontSize={8} fill={LOAD}>
                {showSigma ? '0,308 MPa' : '92,4 N'}
              </text>
              <text x={ix(0) + 6} y={iy(0.55)} fontSize={8} fill={LOAD}>
                {showSigma ? 'γx' : 'γAx'}
              </text>
            </motion.g>
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
              <Dimension x={CX + HALF + 31} from={BOTTOM} to={barBottom} label="δ" color={ACCENT} />
              <text x={CX + HALF + 43} y={BOTTOM + 28} fontSize={8.5} fill={MUTED}>
                w skali poglądowej
              </text>
              <text x={14} y={104} fontSize={9} fill={ACCENT}>
                P: 0,333 mm
              </text>
              <text x={14} y={118} fontSize={9} fill={LOAD}>
                ciężar własny: 0,003 mm
              </text>
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
