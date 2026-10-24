import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const STRESS = '#a970dd'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const BAD = '#d84f28'
const OK = '#2f7d5b'

const TOP = 54
const BOTTOM = 244
const CX = 136
const HALF = 15
const AXIS_X = 300
const DIAG_X1 = 438

const GX0 = 64
const GX1 = 446
const GY0 = 66
const GY1 = 236
const L_GRAPH = 3600
const SIGMA_GRAPH = 280
const R_E = 235
const L_MAX = 3052
const L_MAX_N = 1526
const SHORT_L = 300
const SHORT_SIGMA = 23.1

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const xL = (length: number) => GX0 + (length / L_GRAPH) * (GX1 - GX0)
const yS = (sigma: number) => GY1 - (sigma / SIGMA_GRAPH) * (GY1 - GY0)

export function SelfWeightExample3Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const showBar = index <= 1
  const showStressBar = metric === 'σ' && index === 1
  const showGraph = index >= 2
  const drawStress = showStressBar ? (playing ? smooth(clamp01(sceneProgress / 0.8)) : 1) : 0
  const cutY = BOTTOM - drawStress * (BOTTOM - TOP)
  const markerX = AXIS_X + drawStress * (DIAG_X1 - AXIS_X)

  const travel = index === 2 ? (playing ? smooth(clamp01(sceneProgress / 0.8)) : 1) : 1
  const currentL = index === 2 ? travel * L_MAX : L_MAX
  const lineReveal = index === 2 ? (playing ? smooth(clamp01((sceneProgress - 0.4) / 0.4)) : 1) : 1
  const safetyReveal = index === 3 ? (playing ? smooth(clamp01((sceneProgress - 0.08) / 0.6)) : 1) : 0
  const shortReveal = index === 4 ? (playing ? smooth(clamp01((sceneProgress - 0.08) / 0.6)) : 1) : 0

  const stressPath = `M${AXIS_X} ${BOTTOM} L${DIAG_X1} ${TOP}`
  const stressArea = `M${AXIS_X} ${BOTTOM} L${DIAG_X1} ${TOP} L${AXIS_X} ${TOP} Z`
  const graphPath = `M${xL(0)} ${yS(0)} L${xL(L_MAX)} ${yS(R_E)}`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Pionowy pręt obciążony ciężarem własnym. Animacja pokazuje liniowy przyrost naprężenia wzdłuż pręta, granicę plastyczności oraz wykres maksymalnego naprężenia w funkcji długości."
        >
          <text x={14} y={26} fontSize={9} fill={MUTED}>
            R_e = 235 MPa
          </text>
          <text x={14} y={40} fontSize={9} fill={MUTED}>
            ρ = 7850 kg/m³
          </text>
          <text x={14} y={54} fontSize={9} fill={MUTED}>
            γ = 77 kN/m³
          </text>

          {showBar && (
            <>
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
                rx={3}
                fill={ACCENT}
                fillOpacity={0.14}
                stroke={ACCENT}
                strokeWidth={2}
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

              {Array.from({ length: 8 }, (_, arrowIndex) => {
                const y = TOP + 18 + arrowIndex * ((BOTTOM - TOP - 36) / 7)
                const appear = index === 0 && playing ? smooth(clamp01(sceneProgress * 1.5 - arrowIndex * 0.08)) : 1
                return (
                  <g key={arrowIndex} opacity={appear} stroke={LOAD} fill={LOAD}>
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
                q = γA
              </text>

              {index === 0 && (
                <text x={14} y={82} fontSize={10} fontWeight={700} fill={ACCENT}>
                  L = ?
                </text>
              )}
              {index === 1 && (
                <text x={14} y={82} fontSize={9} fontWeight={700} fill={ACCENT}>
                  L_max = 3052 m
                </text>
              )}
            </>
          )}

          {showStressBar && drawStress > 0.01 && (
            <>
              <motion.rect
                x={CX - HALF}
                y={cutY}
                width={HALF * 2}
                height={BOTTOM - cutY}
                fill={STRESS}
                fillOpacity={0.12}
                initial={false}
                animate={{ opacity: 1 }}
              />
              <line
                x1={CX - HALF - 8}
                y1={cutY}
                x2={CX + HALF + 8}
                y2={cutY}
                stroke={STRESS}
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
              <text x={CX + HALF + 9} y={cutY - 4} fontSize={8.5} fontWeight={700} fill={STRESS}>
                x
              </text>
              <line
                x1={CX + HALF + 20}
                y1={cutY}
                x2={markerX}
                y2={cutY}
                stroke={STRESS}
                strokeWidth={1}
                strokeDasharray="3 4"
                opacity={0.35}
              />
            </>
          )}

          {showStressBar && (
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
                d={stressArea}
                fill={STRESS}
                initial={false}
                animate={{ opacity: 0.13 * drawStress }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <motion.path
                d={stressPath}
                fill="none"
                stroke={STRESS}
                strokeWidth={2.6}
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: drawStress }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={AXIS_X - 8} y={TOP - 2} textAnchor="end" fontSize={10} fontWeight={700} fill={STRESS}>
                σ
              </text>
              <text x={AXIS_X} y={BOTTOM + 15} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                0
              </text>
              <text x={DIAG_X1 + 20} y={BOTTOM + 4} fontSize={9} fill={MUTED}>
                x
              </text>
              <text x={DIAG_X1 + 4} y={TOP - 8} textAnchor="end" fontSize={9} fontWeight={700} fill={STRESS}>
                σ(L_max) = 235 MPa
              </text>
              <text x={AXIS_X + 12} y={TOP + 20} fontSize={8.5} fill={STRESS}>
                σ(x) = γx
              </text>
              <text x={AXIS_X + 8} y={BOTTOM + 30} fontSize={8.5} fill={BAD}>
                przy x = L_max: σ = R_e
              </text>
              {drawStress > 0.02 && <circle cx={markerX} cy={cutY} r={3.5} fill={STRESS} />}
            </g>
          )}

          {showGraph && (
            <g>
              <line x1={GX0} y1={GY0 - 8} x2={GX0} y2={GY1 + 6} stroke="#c9d0d9" strokeWidth={1.2} />
              <line x1={GX0 - 6} y1={GY1} x2={GX1 + 8} y2={GY1} stroke="#c9d0d9" strokeWidth={1.2} />
              <path
                d={`M${GX1 - 2} ${GY1 - 4} L${GX1 + 8} ${GY1} L${GX1 - 2} ${GY1 + 4}`}
                fill="none"
                stroke="#c9d0d9"
                strokeWidth={1.2}
              />

              {[0, 1000, 2000, 3000].map((length) => (
                <g key={length}>
                  <line x1={xL(length)} y1={GY1 - 3} x2={xL(length)} y2={GY1 + 3} stroke="#c9d0d9" strokeWidth={1} />
                  <text x={xL(length)} y={GY1 + 15} textAnchor="middle" fontSize={8} fill={MUTED}>
                    {length}
                  </text>
                </g>
              ))}
              {[0, 100, 200].map((sigma) => (
                <g key={sigma}>
                  <line x1={GX0 - 3} y1={yS(sigma)} x2={GX0 + 3} y2={yS(sigma)} stroke="#c9d0d9" strokeWidth={1} />
                  <line
                    x1={GX0}
                    y1={yS(sigma)}
                    x2={GX1}
                    y2={yS(sigma)}
                    stroke="#eef1f4"
                    strokeWidth={1}
                    opacity={0.8}
                  />
                  <text x={GX0 - 7} y={yS(sigma) + 3} textAnchor="end" fontSize={8} fill={MUTED}>
                    {sigma}
                  </text>
                </g>
              ))}

              <text x={GX1 + 8} y={GY1 + 15} fontSize={8.5} fill={MUTED}>
                L [m]
              </text>
              <text x={GX0} y={GY0 - 14} fontSize={8.5} fontWeight={700} fill={ACCENT}>
                σ_max [MPa]
              </text>

              <motion.path
                d={graphPath}
                fill="none"
                stroke={ACCENT}
                strokeWidth={2.6}
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: index === 2 ? travel : 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <text x={GX0 + 12} y={GY0 + 16} fontSize={8.5} fill={ACCENT}>
                σ_max = γL
              </text>

              {index >= 2 && (
                <motion.g
                  initial={false}
                  animate={{ opacity: index === 2 ? lineReveal : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <line
                    x1={GX0}
                    y1={yS(R_E)}
                    x2={GX1}
                    y2={yS(R_E)}
                    stroke={BAD}
                    strokeWidth={1.3}
                    strokeDasharray="6 4"
                  />
                  <text x={GX1} y={yS(R_E) - 6} textAnchor="end" fontSize={8.5} fontWeight={700} fill={BAD}>
                    R_e = 235 MPa
                  </text>
                  <line
                    x1={xL(L_MAX)}
                    y1={yS(R_E)}
                    x2={xL(L_MAX)}
                    y2={GY1}
                    stroke={BAD}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                  <text x={xL(L_MAX)} y={GY1 + 28} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={BAD}>
                    L_max = 3052 m
                  </text>
                </motion.g>
              )}

              {index === 2 && (
                <>
                  <circle cx={xL(currentL)} cy={yS(0.077 * currentL)} r={4} fill={ACCENT} />
                  {currentL < 2900 && (
                    <text
                      x={xL(currentL) + 6}
                      y={yS(0.077 * currentL) - 7}
                      fontSize={8.5}
                      fill={ACCENT}
                      textAnchor={currentL > 2400 ? 'end' : 'start'}
                    >
                      σ rośnie
                    </text>
                  )}
                </>
              )}

              {index === 3 && (
                <motion.g initial={false} animate={{ opacity: safetyReveal }} transition={{ duration: 0.3 }}>
                  <line
                    x1={GX0}
                    y1={yS(117.5)}
                    x2={GX1}
                    y2={yS(117.5)}
                    stroke={LOAD}
                    strokeWidth={1.3}
                    strokeDasharray="6 4"
                  />
                  <text x={GX1} y={yS(117.5) - 6} textAnchor="end" fontSize={8.5} fontWeight={700} fill={LOAD}>
                    R_e / n = 117,5 MPa
                  </text>
                  <line
                    x1={xL(L_MAX_N)}
                    y1={yS(117.5)}
                    x2={xL(L_MAX_N)}
                    y2={GY1}
                    stroke={LOAD}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                  <text x={xL(L_MAX_N)} y={GY1 + 28} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={LOAD}>
                    L_max,n = 1526 m
                  </text>
                  <circle cx={xL(L_MAX_N)} cy={yS(117.5)} r={4} fill={LOAD} />
                </motion.g>
              )}

              {index === 4 && (
                <motion.g initial={false} animate={{ opacity: shortReveal }} transition={{ duration: 0.3 }}>
                  <circle cx={xL(SHORT_L)} cy={yS(SHORT_SIGMA)} r={4.5} fill={OK} />
                  <text x={xL(SHORT_L) + 8} y={yS(SHORT_SIGMA) - 8} fontSize={8.5} fontWeight={700} fill={OK}>
                    L = 300 m, σ = 23,1 MPa
                  </text>
                  <text x={xL(SHORT_L) + 8} y={yS(SHORT_SIGMA) + 7} fontSize={8.5} fill={OK}>
                    zapas 235/23,1 ≈ 10,2
                  </text>
                </motion.g>
              )}
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
