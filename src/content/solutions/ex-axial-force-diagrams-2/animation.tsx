import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const MUTED = '#87929d'

const X0 = 66
const X1 = 430
const SPAN = X1 - X0
const BAR_Y = 86
const BAR_H = 18
const N_Y = 220
const N_SCALE = 4.3

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
const xAt = (meters: number) => X0 + (meters / 2) * SPAN
const nAt = (meters: number) => 22 - 8 * meters
const yN = (value: number) => N_Y - value * N_SCALE

export function AxialForceDistributedAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'N'
  const p = playing ? clamp(sceneProgress) : 1
  const reveal = playing ? smooth(clamp(sceneProgress / 0.7)) : 1
  const cutMeters = index === 1 && playing ? 0.45 + 1.1 * smooth(clamp(p / 0.85)) : 1
  const cutX = xAt(cutMeters)
  const showLine = index >= 2
  const lineProgress = index === 2 ? smooth(clamp(p / 0.55)) : 1
  const showReaction = index >= 3
  const showCritical = metric === 'σ'
  const showArea = metric === 'ΔL'
  const path = `M${xAt(0)} ${yN(nAt(0))} L${xAt(2)} ${yN(nAt(2))}`
  const areaPath = `M${xAt(0)} ${N_Y} L${xAt(0)} ${yN(nAt(0))} L${xAt(2)} ${yN(nAt(2))} L${xAt(2)} ${N_Y} Z`

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Pręt utwierdzony z obciążeniem rozłożonym q i siłą P na końcu; wykres N maleje liniowo od 22 do 6 kN"
        >
          <line x1={X0} y1={BAR_Y - 30} x2={X0} y2={BAR_Y + 30} stroke={SUPPORT} strokeWidth={2.6} />
          {Array.from({ length: 7 }, (_, i) => (
            <line
              key={i}
              x1={X0}
              y1={BAR_Y - 24 + i * 8}
              x2={X0 - 14}
              y2={BAR_Y - 30 + i * 8}
              stroke={SUPPORT}
              strokeWidth={1.4}
            />
          ))}
          <text x={X0 - 20} y={BAR_Y + 4} textAnchor="end" fontSize={10} fill={SUPPORT}>
            A
          </text>

          <rect
            x={X0}
            y={BAR_Y - BAR_H / 2}
            width={SPAN}
            height={BAR_H}
            rx={3}
            fill={ACCENT}
            fillOpacity={0.12}
            stroke={ACCENT}
            strokeWidth={2}
          />

          {Array.from({ length: 9 }, (_, i) => {
            const ratio = i / 8
            const x = X0 + 8 + ratio * (SPAN - 30)
            const appear = index === 0 ? smooth(clamp(p * 1.3 - i * 0.04)) : 1
            return (
              <g key={i} opacity={appear} stroke={LOAD} fill={LOAD}>
                <line x1={x} y1={BAR_Y - 9} x2={x} y2={58} strokeWidth={0.8} opacity={0.35} />
                <line x1={x} y1={58} x2={x + 18} y2={58} strokeWidth={1.8} />
                <path d={`M${x + 11} 53.5 L${x + 19} 58 L${x + 11} 62.5}`} fill="none" strokeWidth={1.8} />
              </g>
            )
          })}
          <text x={X1 - 6} y={44} textAnchor="end" fontSize={10} fontWeight={700} fill={LOAD}>
            q = 8 kN/m
          </text>

          <g stroke={LOAD} fill={LOAD}>
            <line x1={X1} y1={BAR_Y - 9} x2={X1} y2={34} strokeWidth={1} opacity={0.5} />
            <line x1={X1} y1={34} x2={X1 + 38} y2={34} strokeWidth={2.6} />
            <path d={`M${X1 + 30} 29 L${X1 + 39} 34 L${X1 + 30} 39`} fill="none" strokeWidth={2.6} />
            <text x={X1 + 19} y={24} textAnchor="middle" fontSize={10} stroke="none">
              P = 6 kN
            </text>
          </g>

          {showReaction && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <line x1={X0} y1={34} x2={X0 - 38} y2={34} stroke={SUPPORT} strokeWidth={2.2} />
              <path d={`M${X0 - 30} 29 L${X0 - 39} 34 L${X0 - 30} 39`} fill="none" stroke={SUPPORT} strokeWidth={2.2} />
              <text x={X0 + 4} y={28} fontSize={9} fontWeight={700} fill={SUPPORT}>
                R_A = 22 kN
              </text>
            </motion.g>
          )}

          {index === 1 && (
            <>
              <rect x={cutX} y={BAR_Y - BAR_H / 2} width={X1 - cutX} height={BAR_H} fill={ACCENT} fillOpacity={0.18} />
              <line
                x1={cutX}
                y1={BAR_Y - 16}
                x2={cutX}
                y2={N_Y - 12}
                stroke={ACCENT}
                strokeWidth={1.5}
                strokeDasharray="5 4"
              />
              <text x={cutX + 5} y={BAR_Y - 20} fontSize={8.5} fontWeight={700} fill={ACCENT}>
                przekrój x
              </text>
              <line x1={cutX} y1={BAR_Y + 34} x2={cutX - 44} y2={BAR_Y + 34} stroke={ACCENT} strokeWidth={2.6} />
              <path
                d={`M${cutX - 36} ${BAR_Y + 29} L${cutX - 45} ${BAR_Y + 34} L${cutX - 36} ${BAR_Y + 39}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth={2.6}
              />
              <text x={cutX - 49} y={BAR_Y + 38} textAnchor="end" fontSize={10} fontWeight={700} fill={ACCENT}>
                N(x)
              </text>
              <line x1={X0} y1={BAR_Y + 58} x2={cutX} y2={BAR_Y + 58} stroke={MUTED} strokeWidth={1.1} />
              <line x1={cutX} y1={BAR_Y + 58} x2={X1} y2={BAR_Y + 58} stroke={MUTED} strokeWidth={1.1} />
              <line x1={X0} y1={BAR_Y + 53} x2={X0} y2={BAR_Y + 63} stroke={MUTED} strokeWidth={1.1} />
              <line x1={cutX} y1={BAR_Y + 53} x2={cutX} y2={BAR_Y + 63} stroke={MUTED} strokeWidth={1.1} />
              <line x1={X1} y1={BAR_Y + 53} x2={X1} y2={BAR_Y + 63} stroke={MUTED} strokeWidth={1.1} />
              <text x={(X0 + cutX) / 2} y={BAR_Y + 72} textAnchor="middle" fontSize={9} fill={MUTED}>
                x
              </text>
              <text x={(cutX + X1) / 2} y={BAR_Y + 72} textAnchor="middle" fontSize={9} fill={MUTED}>
                L − x
              </text>
            </>
          )}

          <line x1={X0 - 16} y1={N_Y + 40} x2={X0 - 16} y2={118} stroke={MUTED} strokeWidth={1.2} />
          <path d={`M${X0 - 20} 126 L${X0 - 16} 116 L${X0 - 12} 126`} fill="none" stroke={MUTED} strokeWidth={1.2} />
          <line x1={X0 - 16} y1={N_Y} x2={X1 + 14} y2={N_Y} stroke={MUTED} strokeWidth={1.2} />
          <path
            d={`M${X1 + 6} ${N_Y - 4} L${X1 + 16} ${N_Y} L${X1 + 6} ${N_Y + 4}`}
            fill="none"
            stroke={MUTED}
            strokeWidth={1.2}
          />
          <text x={X0 - 22} y={112} textAnchor="end" fontSize={10} fontWeight={700} fill={MUTED}>
            N
          </text>
          <text x={X1 + 20} y={N_Y + 4} fontSize={10} fill={MUTED}>
            x
          </text>
          <text x={X0} y={N_Y + 15} textAnchor="middle" fontSize={9} fill={MUTED}>
            0
          </text>
          <text x={X1} y={N_Y + 15} textAnchor="middle" fontSize={9} fill={MUTED}>
            2 m
          </text>

          {showArea && (
            <motion.path
              d={areaPath}
              fill={ACCENT}
              fillOpacity={0.16}
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          )}

          <motion.path
            d={path}
            fill="none"
            stroke={ACCENT}
            strokeWidth={3}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: showLine ? lineProgress : 0 }}
            transition={{ duration: 0.12, ease: 'linear' }}
          />

          {showLine && (
            <>
              <motion.circle
                cx={xAt(2)}
                cy={yN(nAt(2))}
                r={3.5}
                fill={ACCENT}
                initial={false}
                animate={{ opacity: index === 2 ? reveal : 1 }}
              />
              <motion.circle
                cx={xAt(0)}
                cy={yN(nAt(0))}
                r={showCritical ? 6 : 3.5}
                fill={showCritical ? '#d84f28' : ACCENT}
                initial={false}
                animate={{ opacity: index === 2 ? reveal : 1 }}
              />
              <motion.text
                x={xAt(0) + 6}
                y={yN(nAt(0)) - 9}
                fontSize={10}
                fontWeight={700}
                fill={showCritical ? '#d84f28' : ACCENT}
                initial={false}
                animate={{ opacity: index === 2 ? reveal : 1 }}
              >
                22 kN
              </motion.text>
              <motion.text
                x={xAt(2) - 4}
                y={yN(nAt(2)) - 9}
                textAnchor="end"
                fontSize={10}
                fontWeight={700}
                fill={ACCENT}
                initial={false}
                animate={{ opacity: index === 2 ? reveal : 1 }}
              >
                6 kN
              </motion.text>
            </>
          )}

          {index >= 3 && (
            <>
              <line
                x1={xAt(0)}
                y1={yN(nAt(0))}
                x2={xAt(2)}
                y2={yN(nAt(0))}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.7}
              />
              <line
                x1={xAt(2)}
                y1={yN(nAt(0))}
                x2={xAt(2)}
                y2={yN(nAt(2))}
                stroke={MUTED}
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.7}
              />
              <text x={xAt(2) - 6} y={(yN(nAt(0)) + yN(nAt(2))) / 2} textAnchor="end" fontSize={9} fill={MUTED}>
                −16 kN
              </text>
              <text x={xAt(1)} y={yN(nAt(0)) - 8} textAnchor="middle" fontSize={9} fill={MUTED}>
                2 m
              </text>
            </>
          )}

          {showCritical && (
            <text x={xAt(0) + 8} y={N_Y + 34} fontSize={8.5} fontWeight={700} fill="#d84f28">
              największe N i σ przy utwierdzeniu
            </text>
          )}

          {showArea && (
            <text x={xAt(1)} y={N_Y - 16} textAnchor="middle" fontSize={9} fill={ACCENT}>
              pole pod wykresem
            </text>
          )}

          {showArea && (
            <text x={X0 + 8} y={N_Y + 34} fontSize={8.5} fill={MUTED}>
              N &gt; 0 na całej długości — rozciąganie
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
