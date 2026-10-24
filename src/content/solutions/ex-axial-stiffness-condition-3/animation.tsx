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

export function AxialStiffnessCondition3Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'N'
  const isModel = index === 0
  const isAluminium = index === 3
  const isFix = index === 4

  const grow = isModel ? 0 : playing ? easeOut(clamp01(sceneProgress / 0.55)) : 1
  const morph = isFix ? (playing ? easeOut(clamp01((sceneProgress - 0.08) / 0.6)) : 1) : 0

  const area = isFix ? 250 + (714.3 - 250) * morph : 250
  const delta = isModel
    ? 0
    : isFix
      ? 4.286 + (1.5 - 4.286) * morph
      : isAluminium
        ? 4.286 * grow
        : index === 1
          ? 1.5 * grow
          : 1.5
  const over = delta > 1.5001

  const centerX = 205
  const top = 60
  const baseBottom = 185
  const pxPerMm = 36
  const limitY = baseBottom + 1.5 * pxPerMm
  const bottomY = baseBottom + delta * pxPerMm
  const halfWidth = 24 * Math.sqrt(area / 250)
  const leftEdge = centerX - halfWidth
  const rightEdge = centerX + halfWidth
  const color = over ? BAD : isFix && !over ? OK : ACCENT

  const forceX = leftEdge - 25
  const limitDimX = 370
  const actualDimX = 410

  const modulus = isModel ? 'E = ?' : isAluminium || isFix ? 'E = 70 GPa' : 'E = 200 GPa'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 365"
          role="img"
          aria-label="Jednorodny pręt o polu 250 mm² i długości 2,5 m; animacja wydłużenia dla stali i aluminium oraz porównanie z dopuszczalnym wydłużeniem 1,5 mm"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={leftEdge - 18} y1={top} x2={rightEdge + 18} y2={top} />
            {Array.from({ length: 7 }, (_, tick) => {
              const x = leftEdge - 12 + tick * ((halfWidth * 2 + 24) / 6)
              return <line key={tick} x1={x} y1={top} x2={x - 8} y2={top - 12} strokeWidth={1.4} />
            })}
          </g>

          <text x={14} y={84} fontSize={9} fill={MUTED}>
            N = 30 kN
          </text>
          <text x={14} y={98} fontSize={9} fill={MUTED}>
            L = 2,5 m
          </text>
          <text x={14} y={112} fontSize={9} fill={MUTED}>
            A = 250 mm²
          </text>
          <text x={14} y={126} fontSize={9} fill={MUTED}>
            ΔL_dop = 1,5 mm
          </text>

          <line x1={110} y1={top} x2={110} y2={baseBottom} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
          <line x1={104} y1={top} x2={116} y2={top} stroke={MUTED} strokeWidth={1} />
          <line x1={104} y1={baseBottom} x2={116} y2={baseBottom} stroke={MUTED} strokeWidth={1} />
          <text
            transform={`translate(98 ${(top + baseBottom) / 2}) rotate(-90)`}
            textAnchor="middle"
            fontSize={9}
            fill={MUTED}
          >
            L = 2,5 m
          </text>

          <line
            x1={centerX - 55}
            y1={baseBottom}
            x2={centerX + 55}
            y2={baseBottom}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.6}
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
            animate={{ x: leftEdge, width: halfWidth * 2, height: bottomY - top, fill: color, stroke: color }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          {isFix && (
            <>
              <line
                x1={centerX - 24}
                y1={top}
                x2={centerX - 24}
                y2={bottomY}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.65}
              />
              <line
                x1={centerX + 24}
                y1={top}
                x2={centerX + 24}
                y2={bottomY}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.65}
              />
            </>
          )}

          <motion.g stroke={LOAD} fill={LOAD} initial={false} animate={{ opacity: 1 }}>
            <line x1={forceX} y1={bottomY - 34} x2={forceX} y2={bottomY - 6} strokeWidth={2.2} />
            <path
              d={`M${forceX - 4.5} ${bottomY - 14} L${forceX} ${bottomY - 6} L${forceX + 4.5} ${bottomY - 14}`}
              fill="none"
              strokeWidth={2.2}
            />
          </motion.g>
          <text x={forceX - 7} y={bottomY - 39} textAnchor="end" fontSize={9} fill={LOAD}>
            N = 30 kN
          </text>

          <text x={leftEdge} y={top + 18} fontSize={9} fontWeight={metric === 'A' ? 700 : 500} fill={color}>
            A = {area.toFixed(0)} mm²
          </text>
          <text x={leftEdge} y={top + 32} fontSize={9} fill={MUTED}>
            {modulus}
          </text>

          <line x1={40} y1={limitY} x2={450} y2={limitY} stroke={MUTED} strokeWidth={1.2} strokeDasharray="6 4" />
          <text x={450} y={limitY - 6} textAnchor="end" fontSize={9} fill={MUTED}>
            ΔL_dop = 1,5 mm
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

          {index === 1 && (
            <motion.text
              x={14}
              y={160}
              fontSize={9}
              fill={OK}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              ✓ ΔL = 1,5 mm = limit
            </motion.text>
          )}

          {index === 2 && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.4 }}>
              <text x={14} y={160} fontSize={9} fill={OK}>
                ✓ σ &lt; 235 MPa
              </text>
            </motion.g>
          )}

          {isAluminium && (
            <motion.text
              x={14}
              y={160}
              fontSize={9}
              fill={BAD}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              ✗ ΔL = 4,29 mm &gt; 1,5 mm
            </motion.text>
          )}

          {isFix && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: morph > 0.8 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <text x={14} y={160} fontSize={9} fill={OK}>
                ✓ ΔL = 1,5 mm = ΔL_dop
              </text>
              <text x={centerX} y={bottomY + 36} textAnchor="middle" fontSize={9} fontWeight={600} fill={OK}>
                A: 250 → 714 mm²
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
