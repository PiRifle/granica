import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'
const BAD = '#d64545'

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)
const pl = (value: number) => value.toFixed(2).replace('.', ',')

export function AxialStiffnessConditionAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'N'
  const isModel = index === 0
  const isStrength = index === 2
  const isCheck = index === 3

  const grow = isModel ? 0 : playing ? easeOut(clamp01(sceneProgress / 0.55)) : 1
  const morph = isStrength || isCheck ? (playing ? easeOut(clamp01((sceneProgress - 0.08) / 0.6)) : 1) : 0
  const area = isStrength ? 800 - 300 * morph : isCheck ? 500 + 300 * morph : 800
  const delta = isStrength ? 1.0 + 0.6 * morph : isCheck ? 1.6 - 0.6 * morph : isModel ? 0 : 1.0 * grow
  const over = delta > 1.0001

  const centerX = 180
  const top = 60
  const baseBottom = 210
  const pxPerMm = 60
  const limitY = baseBottom + pxPerMm
  const bottomY = baseBottom + delta * pxPerMm
  const halfWidth = 30 + 8 * ((area - 500) / 300)
  const leftEdge = centerX - halfWidth
  const rightEdge = centerX + halfWidth
  const color = over ? BAD : isCheck ? OK : ACCENT

  const forceX = leftEdge - 24
  const limitDimX = 390
  const actualDimX = 420

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 335"
          role="img"
          aria-label="Jednorodny pręt rozciągany siłą 80 kN; animacja rzeczywistego wydłużenia i porównanie z dopuszczalnym przemieszczeniem 1,0 mm"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={leftEdge - 18} y1={top} x2={rightEdge + 18} y2={top} />
            {Array.from({ length: 8 }, (_, tick) => {
              const x = leftEdge - 12 + tick * ((halfWidth * 2 + 24) / 7)
              return <line key={tick} x1={x} y1={top} x2={x - 8} y2={top - 12} strokeWidth={1.4} />
            })}
          </g>

          <text x={16} y={84} fontSize={9} fill={MUTED}>
            N = 80 kN
          </text>
          <text x={16} y={98} fontSize={9} fill={MUTED}>
            L = 2 m
          </text>
          <text x={16} y={112} fontSize={9} fill={MUTED}>
            E = 200 GPa
          </text>
          <text x={16} y={126} fontSize={9} fill={MUTED}>
            ΔL_dop = 1,0 mm
          </text>

          <line x1={80} y1={top} x2={80} y2={baseBottom} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
          <line x1={74} y1={top} x2={86} y2={top} stroke={MUTED} strokeWidth={1} />
          <line x1={74} y1={baseBottom} x2={86} y2={baseBottom} stroke={MUTED} strokeWidth={1} />
          <text
            transform={`translate(68 ${(top + baseBottom) / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={9}
            fill={MUTED}
          >
            L = 2 m
          </text>

          <line
            x1={leftEdge - 12}
            y1={baseBottom}
            x2={rightEdge + 12}
            y2={baseBottom}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.65}
          />

          <motion.rect
            x={leftEdge}
            y={top}
            width={halfWidth * 2}
            height={bottomY - top}
            rx={3}
            fill={color}
            fillOpacity={0.16}
            stroke={color}
            strokeWidth={2}
            initial={false}
            animate={{ height: bottomY - top, fill: color, stroke: color }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          <motion.g stroke={LOAD} fill={LOAD} initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <line x1={forceX} y1={bottomY - 36} x2={forceX} y2={bottomY - 8} strokeWidth={2.2} />
            <path
              d={`M${forceX - 4.5} ${bottomY - 16} L${forceX} ${bottomY - 8} L${forceX + 4.5} ${bottomY - 16}`}
              fill="none"
              strokeWidth={2.2}
            />
          </motion.g>
          <text x={forceX - 7} y={bottomY - 41} textAnchor="end" fontSize={9} fill={LOAD}>
            N = 80 kN
          </text>

          <text x={leftEdge} y={top + 18} fontSize={9} fontWeight={metric === 'A' ? 700 : 500} fill={color}>
            {isModel ? 'A = ?' : `A = ${area} mm²`}
          </text>

          <line x1={40} y1={limitY} x2={450} y2={limitY} stroke={MUTED} strokeWidth={1.2} strokeDasharray="6 4" />
          <text x={450} y={limitY - 6} textAnchor="end" fontSize={9} fill={MUTED}>
            ΔL_dop = 1,0 mm
          </text>

          <line x1={limitDimX} y1={baseBottom} x2={limitDimX} y2={limitY} stroke={MUTED} strokeWidth={1} />
          <line x1={limitDimX - 4} y1={baseBottom} x2={limitDimX + 4} y2={baseBottom} stroke={MUTED} strokeWidth={1} />
          <line x1={limitDimX - 4} y1={limitY} x2={limitDimX + 4} y2={limitY} stroke={MUTED} strokeWidth={1} />
          <text
            transform={`translate(${limitDimX - 7} ${(baseBottom + limitY) / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={8.5}
            fill={MUTED}
          >
            limit
          </text>

          {!isModel && (
            <>
              <motion.line
                x1={actualDimX}
                y1={baseBottom}
                x2={actualDimX}
                y2={bottomY}
                stroke={color}
                strokeWidth={1}
                initial={false}
                animate={{ stroke: color, y2: bottomY }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <line
                x1={actualDimX - 4}
                y1={baseBottom}
                x2={actualDimX + 4}
                y2={baseBottom}
                stroke={color}
                strokeWidth={1}
              />
              <line x1={actualDimX - 4} y1={bottomY} x2={actualDimX + 4} y2={bottomY} stroke={color} strokeWidth={1} />
              <text
                transform={`translate(${actualDimX + 14} ${(baseBottom + bottomY) / 2}) rotate(-90)`}
                textAnchor="middle"
                fontSize={9}
                fontWeight={metric === 'ΔL' ? 700 : 600}
                fill={color}
              >
                ΔL = {pl(delta)} mm
              </text>
              <text x={rightEdge + 10} y={bottomY - 5} fontSize={9} fill={color}>
                {over ? 'ΔL > ΔL_dop' : 'ΔL = ΔL_dop'}
              </text>
            </>
          )}

          {isCheck && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: morph > 0.8 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <text x={16} y={162} fontSize={9} fill={OK}>
                ✓ ΔL = 1,0 mm ≤ 1,0 mm
              </text>
              <text x={16} y={176} fontSize={9} fill={OK}>
                ✓ σ &lt; σ_dop
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
