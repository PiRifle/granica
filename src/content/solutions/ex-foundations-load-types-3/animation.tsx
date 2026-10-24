import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const SUPPORT = '#68727e'

const clamp = (value: number) => Math.max(0, Math.min(1, value))

export function LoadTypesExample3Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'σ'
  const progress = playing ? clamp(sceneProgress) : 1

  const top = 52
  const bottom = 268
  const centerX = 200
  const zeroX = 292
  const maxX = 400
  const arrowX = centerX + 18
  const loadPositions = [76, 100, 124, 148, 172, 196, 220, 244, 260]

  const showDiagram = index >= 1 && metric === 'σ'
  const stressRatio = index >= 4 ? 0.5 : 1
  const limitRatio = index >= 4 ? 0.5 : 1
  const drawStress = index === 1 ? progress : 1
  const topX = zeroX + (maxX - zeroX) * stressRatio
  const limitX = zeroX + (maxX - zeroX) * limitRatio

  const stressPath = `M ${zeroX} ${bottom} L ${topX} ${top}`
  const areaPath = `M ${zeroX} ${bottom} L ${topX} ${top} L ${zeroX} ${top} Z`

  const lengthLabel = index >= 4 ? 'L_max ≈ 779 m' : index >= 3 ? 'L_max ≈ 1558 m' : 'L = ?'

  const topStressLabel = index === 1 ? 'σmax = γL' : index >= 4 ? 'σmax = 60 MPa' : 'σmax = 120 MPa'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pionowa stalowa linka o nieznanej długości, obciążona wyłącznie ciężarem własnym; naprężenie rośnie od zera na swobodnym końcu do wartości γL przy utwierdzeniu i jest porównywane z naprężeniem dopuszczalnym"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={158} y1={top} x2={242} y2={top} />
            {Array.from({ length: 7 }, (_, tick) => {
              const x = 166 + tick * 12
              return <line key={tick} x1={x} y1={top} x2={x - 8} y2={top - 12} strokeWidth={1.4} />
            })}
          </g>

          <rect
            x={centerX - 4}
            y={top}
            width={8}
            height={bottom - top}
            rx={2}
            fill={ACCENT}
            fillOpacity={0.22}
            stroke={ACCENT}
            strokeWidth={1.6}
          />

          <line x1={176} y1={top} x2={176} y2={bottom} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
          <line x1={170} y1={top} x2={182} y2={top} stroke={MUTED} strokeWidth={1} />
          <line x1={170} y1={bottom} x2={182} y2={bottom} stroke={MUTED} strokeWidth={1} />

          <text x={12} y={top + 18} fontSize={9} fill={MUTED}>
            γ = 77 kN/m³
          </text>
          <text x={12} y={top + 32} fontSize={9} fill={MUTED}>
            σ_dop = 120 MPa
          </text>
          {index >= 4 && (
            <motion.text
              x={12}
              y={top + 46}
              fontSize={9}
              fill={LOAD}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              n = 2 → σ_dop = 60 MPa
            </motion.text>
          )}

          {loadPositions.map((y, loadIndex) => (
            <motion.g
              key={y}
              stroke={LOAD}
              fill={LOAD}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: loadIndex * 0.04, duration: 0.35 }}
            >
              <line x1={arrowX} y1={y - 16} x2={arrowX} y2={y} strokeWidth={1.5} />
              <path
                d={`M${arrowX - 3.5} ${y - 5} L${arrowX} ${y} L${arrowX + 3.5} ${y - 5}`}
                fill="none"
                strokeWidth={1.5}
              />
            </motion.g>
          ))}

          <text x={arrowX + 12} y={top + 18} fontSize={9} fill={LOAD}>
            ciężar własny
          </text>
          <text x={centerX} y={bottom + 18} textAnchor="middle" fontSize={10} fill={MUTED}>
            {lengthLabel}
          </text>

          {showDiagram && (
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
                d={stressPath}
                fill="none"
                stroke={STRESS}
                strokeWidth={2.2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: drawStress }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />

              {index >= 2 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
                  {index >= 4 && (
                    <>
                      <line
                        x1={maxX}
                        y1={top - 4}
                        x2={maxX}
                        y2={bottom}
                        stroke={MUTED}
                        strokeWidth={1}
                        strokeDasharray="4 4"
                      />
                      <text x={maxX - 4} y={top + 10} textAnchor="end" fontSize={8} fill={MUTED}>
                        120 MPa
                      </text>
                    </>
                  )}
                  <line
                    x1={limitX}
                    y1={top - 4}
                    x2={limitX}
                    y2={bottom}
                    stroke={index >= 4 ? LOAD : STRESS}
                    strokeWidth={1.4}
                    strokeDasharray="4 4"
                  />
                  <text
                    x={limitX - 4}
                    y={index >= 4 ? top + 26 : top + 10}
                    textAnchor="end"
                    fontSize={8}
                    fill={index >= 4 ? LOAD : STRESS}
                  >
                    σdop = {index >= 4 ? '60' : '120'} MPa
                  </text>
                </motion.g>
              )}

              <circle cx={topX} cy={top} r={3.2} fill={STRESS} />
              <text x={zeroX - 8} y={top - 2} textAnchor="end" fontSize={10} fontWeight={700} fill={STRESS}>
                σ(x)
              </text>
              <text x={zeroX - 6} y={bottom + 14} textAnchor="end" fontSize={9} fill={MUTED}>
                0
              </text>
              <text x={topX} y={top - 9} textAnchor="middle" fontSize={8.5} fill={STRESS}>
                {topStressLabel}
              </text>
              {index >= 2 && index <= 3 && (
                <text x={topX} y={top + 14} textAnchor="middle" fontSize={8.5} fill={STRESS}>
                  {index >= 3 ? 'σmax = σdop' : 'σmax ≤ σdop'}
                </text>
              )}
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
