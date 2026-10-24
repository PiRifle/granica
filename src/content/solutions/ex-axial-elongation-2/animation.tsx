import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const INK = '#17202a'

const TOP = 56
const BOTTOM = 250
const CX = 150
const HALF = 14
const E_TOTAL = 16

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

export function AxialSelfWeightAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const progress = playing ? smooth(sceneProgress) : 1

  const isModel = metric === 'model'
  const isNormal = metric === 'N'
  const isElongation = metric === 'ΔL'
  const isEnd = metric === 'end'
  const isArea = metric === 'A'
  const isStress = metric === 'σ'

  let elongation = 0
  if (isElongation) elongation = progress
  else if (isEnd) elongation = 2 * progress
  else if (isArea || isStress) elongation = 1

  const bottom = BOTTOM + E_TOTAL * elongation
  const halfWidth = isArea ? HALF * (0.6 + 0.9 * progress) : HALF

  const showSelfWeight = isModel || isNormal || isElongation || isArea
  const showNormalDiagram = isNormal
  const showStressDiagram = isStress

  const axisX = 300
  const maxX = 390
  const diagramColor = isStress ? STRESS : ACCENT
  const diagramLabel = isStress ? 'σ(y)' : 'N(y)'
  const diagramTopLabel = isStress ? 'σ_max = γL' : 'N_max = γAL'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pionowa stalowa lina utwierdzona górnym końcem, obciążona ciężarem własnym. Animacja pokazuje wydłużenie względem pierwotnej długości zaznaczonej linią przerywaną oraz liniowy rozkład siły osiowej."
        >
          <defs>
            <marker
              id="ax2-load"
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
            <line x1={CX - 42} y1={TOP} x2={CX + 42} y2={TOP} />
            {Array.from({ length: 9 }, (_, tick) => {
              const x = CX - 36 + tick * 9
              return <line key={tick} x1={x} y1={TOP} x2={x - 7} y2={TOP - 11} strokeWidth={1.4} />
            })}
          </g>

          <rect
            x={CX - halfWidth}
            y={TOP}
            width={halfWidth * 2}
            height={BOTTOM - TOP}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.4}
            strokeDasharray="5 4"
          />
          <rect
            x={CX - halfWidth}
            y={TOP}
            width={halfWidth * 2}
            height={bottom - TOP}
            rx={2}
            fill={ACCENT}
            fillOpacity={0.16}
            stroke={ACCENT}
            strokeWidth={2}
          />

          {showSelfWeight && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              {Array.from({ length: 8 }, (_, arrowIndex) => {
                const y = TOP + 20 + arrowIndex * ((BOTTOM - TOP - 34) / 7)
                return (
                  <g key={y} stroke={LOAD} fill={LOAD}>
                    <line x1={CX + halfWidth + 14} y1={y - 13} x2={CX + halfWidth + 14} y2={y} strokeWidth={1.5} />
                    <path
                      d={`M${CX + halfWidth + 10.5} ${y - 5} L${CX + halfWidth + 14} ${y} L${CX + halfWidth + 17.5} ${y - 5}`}
                      fill="none"
                      strokeWidth={1.5}
                    />
                  </g>
                )
              })}
              <text x={CX + halfWidth + 22} y={TOP + 12} fontSize={9} fill={LOAD}>
                ciężar własny
              </text>
            </motion.g>
          )}

          {isEnd && (
            <motion.g
              stroke={LOAD}
              fill={LOAD}
              animate={playing ? { opacity: [0.75, 1, 0.75] } : { opacity: 1 }}
              transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
            >
              <line x1={CX + 44} y1={bottom - 38} x2={CX + 44} y2={bottom - 6} strokeWidth={2.5} />
              <path
                d={`M${CX + 39} ${bottom - 14} L${CX + 44} ${bottom - 6} L${CX + 49} ${bottom - 14}`}
                fill="none"
                strokeWidth={2.5}
              />
              <text x={CX + 52} y={bottom - 20} fontSize={10} stroke="none">
                W = γAL
              </text>
            </motion.g>
          )}

          {(showNormalDiagram || showStressDiagram) && (
            <g>
              <line x1={axisX} y1={TOP - 10} x2={axisX} y2={BOTTOM + 10} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={axisX - 4} y1={BOTTOM} x2={maxX + 8} y2={BOTTOM} stroke="#c9d0d9" strokeWidth={1} />
              <motion.path
                d={`M ${axisX} ${BOTTOM} L ${maxX} ${TOP} L ${axisX} ${TOP} Z`}
                fill={diagramColor}
                fillOpacity={0.12}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              <line x1={axisX} y1={BOTTOM} x2={maxX} y2={TOP} stroke={diagramColor} strokeWidth={2.4} />
              <text x={axisX - 8} y={TOP - 2} textAnchor="end" fontSize={10} fontWeight={700} fill={diagramColor}>
                {diagramLabel}
              </text>
              <text x={maxX} y={TOP - 8} textAnchor="middle" fontSize={9} fill={diagramColor}>
                {diagramTopLabel}
              </text>
              <text x={axisX - 6} y={BOTTOM + 14} textAnchor="end" fontSize={9} fill={MUTED}>
                0
              </text>
              {isStress && (
                <text x={maxX + 6} y={TOP + 16} fontSize={9} fill={STRESS}>
                  ε_max = σ_max/E
                </text>
              )}
            </g>
          )}

          {(isElongation || isEnd || isArea) && (
            <>
              <line
                x1={CX - halfWidth - 12}
                y1={BOTTOM}
                x2={CX + halfWidth + 12}
                y2={BOTTOM}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <Dimension x={232} from={BOTTOM} to={bottom} label={isEnd ? 'WL/EA = 2ΔLγ' : 'ΔLγ'} color={ACCENT} />
              {isEnd && (
                <>
                  <line
                    x1={CX - halfWidth - 12}
                    y1={BOTTOM + E_TOTAL}
                    x2={CX + halfWidth + 12}
                    y2={BOTTOM + E_TOTAL}
                    stroke={MUTED}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                  <text x={CX - halfWidth - 16} y={BOTTOM + E_TOTAL - 4} textAnchor="end" fontSize={9} fill={MUTED}>
                    ΔLγ
                  </text>
                </>
              )}
            </>
          )}

          <text x={16} y={TOP + 18} fontSize={10} fill={INK}>
            L = 30 m
          </text>
          <text x={16} y={TOP + 32} fontSize={9} fill={MUTED}>
            d = 20 mm, A = 314 mm²
          </text>
          <text x={16} y={TOP + 46} fontSize={9} fill={MUTED}>
            E = 200 GPa
          </text>
          <text x={16} y={TOP + 60} fontSize={9} fill={MUTED}>
            γ = 7,7·10⁻⁵ N/mm³
          </text>

          {isArea && (
            <motion.g
              initial={false}
              animate={{ opacity: playing ? [0.6, 1, 0.6] : 1 }}
              transition={{ duration: 1.8, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
            >
              <line
                x1={CX - halfWidth}
                y1={TOP - 16}
                x2={CX + halfWidth}
                y2={TOP - 16}
                stroke={ACCENT}
                strokeWidth={1.3}
              />
              <line
                x1={CX - halfWidth}
                y1={TOP - 20}
                x2={CX - halfWidth}
                y2={TOP - 12}
                stroke={ACCENT}
                strokeWidth={1.3}
              />
              <line
                x1={CX + halfWidth}
                y1={TOP - 20}
                x2={CX + halfWidth}
                y2={TOP - 12}
                stroke={ACCENT}
                strokeWidth={1.3}
              />
              <text x={CX} y={TOP - 22} textAnchor="middle" fontSize={10} fill={ACCENT}>
                A
              </text>
              <text x={CX + 44} y={TOP + 74} fontSize={9} fill={ACCENT}>
                ΔL nie zależy od A
              </text>
            </motion.g>
          )}

          <text x={16} y={288} fontSize={9} fill={MUTED}>
            pierwotna długość: linia przerywana; wydłużenie w skali poglądowej
          </text>
        </svg>
      </div>
    </div>
  )
}
