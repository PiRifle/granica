import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const SUPPORT = '#68727e'

const clamp = (value: number) => Math.max(0, Math.min(1, value))

export function LoadTypesExampleAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'N'
  const progress = playing ? clamp(sceneProgress) : 1

  const top = 52
  const bottom = 258
  const centerX = 196
  const halfWidth = 23
  const zeroX = 300
  const maxX = 392
  const arrowX = centerX + halfWidth + 20
  const loadPositions = [76, 102, 128, 154, 180, 206, 232, 250]

  const showNormal = metric === 'N' && index >= 2
  const showStress = metric === 'σ'
  const drawNormal = index === 2 ? progress : 1
  const drawStress = index === 4 ? progress : 1
  const arrowLength = index === 1 ? 8 + 12 * progress : 18

  const cutRatio = index === 3 ? progress : null
  const cutY = cutRatio == null ? null : bottom - (bottom - top) * cutRatio
  const cutX = cutRatio == null ? null : zeroX + (maxX - zeroX) * cutRatio

  const linePath = `M ${zeroX} ${bottom} L ${maxX} ${top}`
  const areaPath = `M ${zeroX} ${bottom} L ${maxX} ${top} L ${zeroX} ${top} Z`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pojedynczy pionowy pręt stalowy o polu 500 mm² i długości 2,5 m obciążony równomiernie rozłożonym ciężarem własnym; siła normalna rośnie od zera na swobodnym końcu do ciężaru całego pręta przy utwierdzeniu"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={148} y1={top} x2={244} y2={top} />
            {Array.from({ length: 8 }, (_, tick) => {
              const x = 156 + tick * 12
              return <line key={tick} x1={x} y1={top} x2={x - 8} y2={top - 12} strokeWidth={1.4} />
            })}
          </g>

          <rect
            x={centerX - halfWidth}
            y={top}
            width={halfWidth * 2}
            height={bottom - top}
            rx={3}
            fill={ACCENT}
            fillOpacity={0.16}
            stroke={ACCENT}
            strokeWidth={2}
          />

          <line x1={146} y1={top} x2={146} y2={bottom} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
          <line x1={140} y1={top} x2={152} y2={top} stroke={MUTED} strokeWidth={1} />
          <line x1={140} y1={bottom} x2={152} y2={bottom} stroke={MUTED} strokeWidth={1} />
          <text x={138} y={(top + bottom) / 2 + 4} textAnchor="end" fontSize={10} fill={MUTED}>
            L = 2,5 m
          </text>

          <text x={12} y={top + 18} fontSize={9} fill={MUTED}>
            ρ = 7850 kg/m³
          </text>
          <text x={12} y={top + 32} fontSize={9} fill={MUTED}>
            g = 9,81 m/s²
          </text>
          <text x={138} y={top + 48} textAnchor="end" fontSize={9} fill={ACCENT}>
            A = 500 mm²
          </text>

          {loadPositions.map((y, loadIndex) => (
            <motion.g
              key={y}
              stroke={LOAD}
              fill={LOAD}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: loadIndex * 0.045, duration: 0.35 }}
            >
              <line x1={arrowX} y1={y - arrowLength} x2={arrowX} y2={y} strokeWidth={1.6} />
              <path
                d={`M${arrowX - 3.5} ${y - 5} L${arrowX} ${y} L${arrowX + 3.5} ${y - 5}`}
                fill="none"
                strokeWidth={1.6}
              />
            </motion.g>
          ))}

          <text x={arrowX + 12} y={top + 8} fontSize={9} fill={LOAD}>
            {index === 0 ? 'ciężar własny' : 'q_g ≈ 38,5 N/m'}
          </text>
          {index === 1 && (
            <motion.text
              x={arrowX + 12}
              y={top + 22}
              fontSize={8.5}
              fill={MUTED}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              γ ≈ 77 009 N/m³
            </motion.text>
          )}

          {showNormal && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line x1={zeroX} y1={top - 12} x2={zeroX} y2={bottom + 4} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={zeroX - 4} y1={bottom} x2={maxX + 8} y2={bottom} stroke="#c9d0d9" strokeWidth={1} />
              <motion.path
                d={areaPath}
                fill={ACCENT}
                fillOpacity={0.12}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              <motion.path
                d={linePath}
                fill="none"
                stroke={ACCENT}
                strokeWidth={2.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: drawNormal }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={zeroX - 8} y={top - 2} textAnchor="end" fontSize={10} fontWeight={700} fill={ACCENT}>
                N(x)
              </text>
              <text x={zeroX - 6} y={bottom + 14} textAnchor="end" fontSize={9} fill={MUTED}>
                0
              </text>
              <text x={maxX} y={top - 9} textAnchor="middle" fontSize={9} fill={ACCENT}>
                G ≈ 96,3 N
              </text>
            </motion.g>
          )}

          {showStress && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line x1={zeroX} y1={top - 12} x2={zeroX} y2={bottom + 4} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={zeroX - 4} y1={bottom} x2={maxX + 8} y2={bottom} stroke="#c9d0d9" strokeWidth={1} />
              <motion.path
                d={areaPath}
                fill={STRESS}
                fillOpacity={0.12}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              />
              <motion.path
                d={linePath}
                fill="none"
                stroke={STRESS}
                strokeWidth={2.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: drawStress }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <circle cx={maxX} cy={top} r={3.2} fill={STRESS} />
              <text x={zeroX - 8} y={top - 2} textAnchor="end" fontSize={10} fontWeight={700} fill={STRESS}>
                σ(x)
              </text>
              <text x={zeroX - 6} y={bottom + 14} textAnchor="end" fontSize={9} fill={MUTED}>
                0
              </text>
              <text x={maxX} y={top - 9} textAnchor="middle" fontSize={8.5} fill={STRESS}>
                σ_max ≈ 0,193 MPa
              </text>
            </motion.g>
          )}

          {cutY != null && cutX != null && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
              <line
                x1={centerX - halfWidth - 10}
                y1={cutY}
                x2={cutX}
                y2={cutY}
                stroke={LOAD}
                strokeWidth={1.4}
                strokeDasharray="3 3"
              />
              <line
                x1={centerX - halfWidth - 3}
                y1={cutY - 5}
                x2={centerX - halfWidth - 3}
                y2={cutY + 5}
                stroke={LOAD}
                strokeWidth={1.4}
              />
              <circle cx={cutX} cy={cutY} r={3.2} fill={LOAD} />
              <text x={Math.min(cutX + 6, 438)} y={cutY - 5} fontSize={9} fill={LOAD}>
                N(x)
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
