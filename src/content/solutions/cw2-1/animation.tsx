import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'
const STRAIN = '#2f8d6a'

const TOP = 34
const H_GAMMA = 52
const H_BETA = 52
const H_ALPHA = 78
const Y1 = TOP + H_GAMMA
const Y2 = Y1 + H_BETA
const Y3 = Y2 + H_ALPHA
const CX = 138
const W_TOP = 30
const W_BOTTOM = 18
const D_GAMMA = 15
const D_BETA = 15
const D_ALPHA = 23

const AXIS_X = 286
const MAX_BAR = 82

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
      <text x={x + 8} y={mid + 3} fontSize={9} stroke="none">
        {label}
      </text>
    </g>
  )
}

function BarDiagram({
  segments,
  color,
  maxValue,
  title,
  labels,
}: {
  segments: Array<{ from: number; to: number; value: number }>
  color: string
  maxValue: number
  title: string
  labels: string[]
}) {
  return (
    <g>
      <line x1={AXIS_X} y1={TOP - 8} x2={AXIS_X} y2={Y3 + 8} stroke="#c9d0d9" strokeWidth={1} />
      <line x1={AXIS_X - 4} y1={Y3 + 8} x2={AXIS_X + MAX_BAR + 12} y2={Y3 + 8} stroke="#c9d0d9" strokeWidth={1} />
      {segments.map((segment, index) => {
        const width = (Math.abs(segment.value) / maxValue) * MAX_BAR
        return (
          <g key={`${title}-${index}`}>
            <motion.rect
              x={AXIS_X}
              y={segment.from}
              width={width}
              height={segment.to - segment.from}
              fill={color}
              fillOpacity={0.14}
              stroke={color}
              strokeWidth={1.8}
              initial={false}
              animate={{ width }}
              transition={{ duration: 0.2, ease: 'linear' }}
            />
            <text
              x={AXIS_X + width + 6}
              y={(segment.from + segment.to) / 2 + 3}
              fontSize={9}
              fontWeight={700}
              fill={color}
            >
              {labels[index]}
            </text>
          </g>
        )
      })}
      <text x={AXIS_X - 8} y={TOP - 2} textAnchor="end" fontSize={10} fontWeight={700} fill={color}>
        {title}
      </text>
    </g>
  )
}

export function SteppedBarElongationAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const segment = scene.focus?.segment
  const progress = playing ? smooth(sceneProgress) : 1
  const pulse = playing ? 0.7 + 0.3 * Math.sin((sceneProgress * 3 + index) * Math.PI * 2) : 1

  const isModel = metric === 'model'
  const isNormal = metric === 'N'
  const isStress = metric === 'σ'
  const isStrain = metric === 'ε'
  const isElongation = metric === 'ΔL'

  let aGamma = 0
  let aBeta = 0
  let aAlpha = 0
  if (isElongation) {
    if (segment === 'α') {
      aAlpha = progress
    } else if (segment === 'β' || segment === 'γ') {
      aGamma = progress
      aBeta = progress
    } else {
      aGamma = progress
      aBeta = progress
      aAlpha = progress
    }
  }

  const gammaBottom = Y1 + D_GAMMA * aGamma
  const betaBottom = gammaBottom + H_BETA + D_BETA * aBeta
  const alphaBottom = betaBottom + H_ALPHA + D_ALPHA * aAlpha

  const originalPath = `M ${CX - W_TOP} ${TOP} L ${CX + W_TOP} ${TOP} L ${CX + W_TOP} ${Y2} L ${CX + W_BOTTOM} ${Y2} L ${CX + W_BOTTOM} ${Y3} L ${CX - W_BOTTOM} ${Y3} L ${CX - W_BOTTOM} ${Y2} L ${CX - W_TOP} ${Y2} Z`
  const barPath = `M ${CX - W_TOP} ${TOP} L ${CX + W_TOP} ${TOP} L ${CX + W_TOP} ${betaBottom} L ${CX + W_BOTTOM} ${betaBottom} L ${CX + W_BOTTOM} ${alphaBottom} L ${CX - W_BOTTOM} ${alphaBottom} L ${CX - W_BOTTOM} ${betaBottom} L ${CX - W_TOP} ${betaBottom} Z`

  const highlightAlpha = isElongation && segment === 'α'
  const highlightUpper = isElongation && (segment === 'β' || segment === 'γ')
  const highlightAll = isElongation && segment == null

  const showLoads = isModel || isNormal
  const loadX = 216
  const p2Y = betaBottom
  const p1Y = alphaBottom

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Stopniowany pręt stalowy utwierdzony górnym końcem. Animacja pokazuje wykres siły podłużnej, naprężeń i odkształceń oraz rzeczywiste wydłużenie odcinków alfa, beta i gamma względem pierwotnego kształtu."
        >
          <defs>
            <marker
              id="cw21-load"
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
              id="cw21-dim"
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
            <line x1={CX - W_TOP - 22} y1={TOP} x2={CX + W_TOP + 22} y2={TOP} />
            {Array.from({ length: 10 }, (_, tick) => {
              const x = CX - W_TOP - 16 + tick * ((W_TOP * 2 + 32) / 9)
              return <line key={tick} x1={x} y1={TOP} x2={x - 7} y2={TOP - 11} strokeWidth={1.4} />
            })}
          </g>

          <path d={originalPath} fill="none" stroke={MUTED} strokeWidth={1.4} strokeDasharray="5 4" />
          <path d={barPath} fill={ACCENT} fillOpacity={0.14} stroke={ACCENT} strokeWidth={2} />

          {isStress && (
            <>
              <rect x={CX - W_TOP} y={TOP} width={W_TOP * 2} height={gammaBottom - TOP} fill={LOAD} fillOpacity={0.1} />
              <rect
                x={CX - W_TOP}
                y={gammaBottom}
                width={W_TOP * 2}
                height={betaBottom - gammaBottom}
                fill={LOAD}
                fillOpacity={0.1}
              />
              <rect
                x={CX - W_BOTTOM}
                y={betaBottom}
                width={W_BOTTOM * 2}
                height={alphaBottom - betaBottom}
                fill={LOAD}
                fillOpacity={0.2}
              />
            </>
          )}

          {isStrain && (
            <>
              <rect
                x={CX - W_TOP}
                y={TOP}
                width={W_TOP * 2}
                height={gammaBottom - TOP}
                fill={STRAIN}
                fillOpacity={0.1}
              />
              <rect
                x={CX - W_TOP}
                y={gammaBottom}
                width={W_TOP * 2}
                height={betaBottom - gammaBottom}
                fill={STRAIN}
                fillOpacity={0.1}
              />
              <rect
                x={CX - W_BOTTOM}
                y={betaBottom}
                width={W_BOTTOM * 2}
                height={alphaBottom - betaBottom}
                fill={STRAIN}
                fillOpacity={0.2}
              />
            </>
          )}

          {(highlightAlpha || highlightAll) && (
            <motion.rect
              x={CX - W_BOTTOM - 5}
              y={betaBottom - 2}
              width={W_BOTTOM * 2 + 10}
              height={Math.max(1, alphaBottom - betaBottom + 4)}
              rx={6}
              fill="none"
              stroke={LOAD}
              strokeWidth={1.8}
              animate={{ opacity: playing ? [0.35, pulse, 0.35] : 0.55 }}
              transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
            />
          )}

          {(highlightUpper || highlightAll) && (
            <motion.rect
              x={CX - W_TOP - 5}
              y={TOP - 2}
              width={W_TOP * 2 + 10}
              height={Math.max(1, betaBottom - TOP + 4)}
              rx={6}
              fill="none"
              stroke={LOAD}
              strokeWidth={1.8}
              animate={{ opacity: playing ? [0.35, pulse, 0.35] : 0.55 }}
              transition={{ duration: 1.5, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
            />
          )}

          <text x={12} y={TOP + 18} fontSize={9} fill={INK}>
            γ · L = 1000 mm
          </text>
          <text x={12} y={TOP + 31} fontSize={8} fill={MUTED}>
            A = 500 mm²
          </text>
          <text x={12} y={Y1 + 18} fontSize={9} fill={INK}>
            β · L = 1000 mm
          </text>
          <text x={12} y={Y1 + 31} fontSize={8} fill={MUTED}>
            A = 500 mm²
          </text>
          <text x={12} y={Y2 + 24} fontSize={9} fill={INK}>
            α · L = 1500 mm
          </text>
          <text x={12} y={Y2 + 37} fontSize={8} fill={MUTED}>
            A = 200 mm²
          </text>
          <text x={12} y={286} fontSize={8} fill={MUTED}>
            E = 200 GPa · wydłużenie w skali poglądowej
          </text>

          {showLoads && (
            <g stroke={LOAD} fill={LOAD}>
              <line x1={loadX} y1={p2Y - 38} x2={loadX} y2={p2Y - 6} strokeWidth={2.2} markerEnd="url(#cw21-load)" />
              <text x={loadX + 8} y={p2Y - 22} fontSize={9} stroke="none">
                P₂ = 40 kN
              </text>
              <line x1={loadX} y1={p1Y - 38} x2={loadX} y2={p1Y - 6} strokeWidth={2.2} markerEnd="url(#cw21-load)" />
              <text x={loadX + 8} y={p1Y - 22} fontSize={9} stroke="none">
                P₁ = 30 kN
              </text>
            </g>
          )}

          {isNormal && (
            <BarDiagram
              segments={[
                { from: TOP, to: Y1, value: 70 },
                { from: Y1, to: Y2, value: 70 },
                { from: Y2, to: Y3, value: 30 },
              ]}
              color={ACCENT}
              maxValue={70}
              title="N [kN]"
              labels={['+70', '+70', '+30']}
            />
          )}

          {isStress && (
            <BarDiagram
              segments={[
                { from: TOP, to: Y1, value: 140 },
                { from: Y1, to: Y2, value: 140 },
                { from: Y2, to: Y3, value: 150 },
              ]}
              color={LOAD}
              maxValue={150}
              title="σ [MPa]"
              labels={['140', '140', '150']}
            />
          )}

          {isStrain && (
            <BarDiagram
              segments={[
                { from: TOP, to: Y1, value: 0.0007 },
                { from: Y1, to: Y2, value: 0.0007 },
                { from: Y2, to: Y3, value: 0.00075 },
              ]}
              color={STRAIN}
              maxValue={0.00075}
              title="ε [–]"
              labels={['0,00070', '0,00070', '0,00075']}
            />
          )}

          {isElongation && segment === 'α' && aAlpha > 0.001 && (
            <>
              <line x1={CX - W_BOTTOM} y1={Y3} x2={258} y2={Y3} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
              <Dimension x={248} from={Y3} to={alphaBottom} label="ΔLα = 1,125 mm" color={LOAD} />
            </>
          )}

          {isElongation && (segment === 'β' || segment === 'γ') && (
            <>
              <line x1={CX + W_TOP} y1={Y1} x2={244} y2={Y1} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
              <line x1={CX + W_TOP} y1={Y2} x2={276} y2={Y2} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
              <Dimension x={236} from={Y1} to={gammaBottom} label="ΔLγ = 0,700" color={LOAD} />
              <Dimension x={262} from={Y2} to={betaBottom} label="ΔLβ = 0,700" color={LOAD} />
            </>
          )}

          {isElongation && segment == null && (
            <>
              <line x1={CX + W_TOP} y1={Y1} x2={378} y2={Y1} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
              <line x1={CX + W_TOP} y1={Y2} x2={378} y2={Y2} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
              <line x1={CX + W_BOTTOM} y1={Y3} x2={378} y2={Y3} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
              <Dimension x={210} from={Y1} to={gammaBottom} label="0,700" color={MUTED} />
              <Dimension x={232} from={Y2} to={betaBottom} label="1,400" color={MUTED} />
              <Dimension x={254} from={Y3} to={alphaBottom} label="2,525" color={LOAD} />

              <line x1={AXIS_X} y1={TOP - 8} x2={AXIS_X} y2={Y3 + 8} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={AXIS_X - 4} y1={Y3 + 8} x2={AXIS_X + 92} y2={Y3 + 8} stroke="#c9d0d9" strokeWidth={1} />
              <motion.polyline
                points={`${AXIS_X},${TOP} ${AXIS_X + 0.7 * 35},${gammaBottom} ${AXIS_X + 1.4 * 35},${betaBottom} ${AXIS_X + 2.525 * 35},${alphaBottom}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth={2.2}
                initial={false}
                animate={{ opacity: progress }}
                transition={{ duration: 0.2 }}
              />
              <text x={AXIS_X - 8} y={TOP - 2} textAnchor="end" fontSize={10} fontWeight={700} fill={ACCENT}>
                u [mm]
              </text>
              <text x={AXIS_X + 2.525 * 35 + 6} y={alphaBottom + 3} fontSize={9} fontWeight={700} fill={ACCENT}>
                2,525
              </text>
              <text x={AXIS_X + 0.7 * 35 + 5} y={gammaBottom - 3} fontSize={8} fill={MUTED}>
                0,700
              </text>
              <text x={AXIS_X + 1.4 * 35 + 5} y={betaBottom - 3} fontSize={8} fill={MUTED}>
                1,400
              </text>
            </>
          )}

          {(showLoads || isNormal) && (
            <text x={AXIS_X} y={Y3 + 28} fontSize={8} fill={MUTED}>
              R = 70 kN u góry
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
