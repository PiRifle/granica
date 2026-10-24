import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local, SEGMENT_COLORS } from '../../../components/solution-figures/shared'

const TENSION = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const AXIS = '#c9d0d9'

const SEGMENTS = [
  { id: '1', label: '1', length: 1000, area: 500, n: 50, sigma: 100 },
  { id: '2', label: '2', length: 1000, area: 150, n: 30, sigma: 200 },
]

const N_ORDER = [1, 0]

const X0 = 66
const X1 = 406
const BAR_Y = 106
const ZERO_Y = 246
const N_Y = 38
const LOAD_Y = 64
const STRESS_SCALE = 70 / 200
const SIGMA_DOP = 160

const clamp = (value: number) => Math.min(1, Math.max(0, value))

const TOTAL_LENGTH = SEGMENTS.reduce((sum, segment) => sum + segment.length, 0)
const SPAN = X1 - X0
const BOUNDARIES = [X0]
let runningLength = 0
for (const segment of SEGMENTS) {
  runningLength += segment.length
  BOUNDARIES.push(X0 + (runningLength / TOTAL_LENGTH) * SPAN)
}
const MAX_AREA = Math.max(...SEGMENTS.map((segment) => segment.area))
const halfHeight = (area: number) => 8 + 22 * Math.sqrt(area / MAX_AREA)
const MAX_HALF = halfHeight(MAX_AREA)
const centerOf = (index: number) => (BOUNDARIES[index] + BOUNDARIES[index + 1]) / 2

const SUBSCRIPTS = ['₁', '₂']

function ForceTag({ index, opacity }: { index: number; opacity: number }) {
  const segment = SEGMENTS[index]
  const x1 = BOUNDARIES[index] + 9
  const x2 = BOUNDARIES[index + 1] - 9
  const cx = centerOf(index)
  const tension = segment.n >= 0
  const leftHead = tension
    ? `M${x1 + 7} ${N_Y - 4} L${x1} ${N_Y} L${x1 + 7} ${N_Y + 4}`
    : `M${x1} ${N_Y - 4} L${x1 + 7} ${N_Y} L${x1} ${N_Y + 4}`
  const rightHead = tension
    ? `M${x2 - 7} ${N_Y - 4} L${x2} ${N_Y} L${x2 - 7} ${N_Y + 4}`
    : `M${x2} ${N_Y - 4} L${x2 - 7} ${N_Y} L${x2} ${N_Y + 4}`

  return (
    <motion.g initial={false} animate={{ opacity }} stroke={TENSION} fill={TENSION}>
      <line x1={x1} y1={N_Y} x2={x2} y2={N_Y} strokeWidth={1.8} />
      <path d={leftHead} fill="none" strokeWidth={1.8} />
      <path d={rightHead} fill="none" strokeWidth={1.8} />
      <text x={cx} y={N_Y - 8} textAnchor="middle" fontSize={8.5} fontWeight={600} stroke="none">
        {`N${SUBSCRIPTS[index]} = ${tension ? '+' : '−'}${Math.abs(segment.n)} kN`}
      </text>
    </motion.g>
  )
}

export function SteppedBarsExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'A'
  const progress = playing ? clamp(sceneProgress) : 1
  const focusId = scene.focus?.segment
  const focusIndex = focusId ? SEGMENTS.findIndex((segment) => segment.id === focusId) : -1
  const isCompare = metric === 'σmax'
  const isStress = metric === 'σ' || isCompare
  const activeIndex = isCompare ? 1 : metric === 'σ' ? focusIndex : -1

  const revealOf = (index: number) => {
    if (!playing) return 1
    if (metric === 'N') {
      if (focusIndex >= 0) return index === focusIndex ? clamp(progress / 0.55) : 0
      const position = N_ORDER.indexOf(index)
      return clamp((progress - Math.max(0, position) * 0.34) / 0.34)
    }
    return clamp((progress - index * 0.3) / 0.32)
  }

  const nActive =
    metric === 'N' && playing && focusIndex < 0
      ? N_ORDER.find((index) => {
          const reveal = revealOf(index)
          return reveal > 0.02 && reveal < 0.98
        })
      : undefined
  const aActive =
    metric === 'A' && playing ? SEGMENTS.findIndex((_, index) => revealOf(index) > 0.02 && revealOf(index) < 0.98) : -1
  const highlighted =
    metric === 'N' ? (focusIndex >= 0 ? focusIndex : (nActive ?? -1)) : metric === 'A' ? aActive : activeIndex
  const showArea = metric === 'A' || metric === 'N'
  const showContextArea = metric === 'σ' && activeIndex >= 0
  const visibleBars = isCompare ? SEGMENTS.length : activeIndex + 1
  const currentReveal = playing ? clamp((progress - 0.06) / 0.74) : 1
  const thresholdY = ZERO_Y - SIGMA_DOP * STRESS_SCALE
  const junctionX = BOUNDARIES[1]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 330"
          role="img"
          aria-label="Pręt schodkowy utwierdzony lewym końcem, z odcinkami o polach 500 i 150 milimetrów kwadratowych, obciążony siłami 20 i 30 kiloniutonów; kolejno pokazane siły osiowe i naprężenia"
        >
          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={X0} y1={BAR_Y - MAX_HALF - 8} x2={X0} y2={BAR_Y + MAX_HALF + 8} />
            {Array.from({ length: 7 }, (_, tick) => {
              const y = BAR_Y - MAX_HALF + tick * ((MAX_HALF * 2) / 6)
              return <line key={tick} x1={X0} y1={y} x2={X0 - 9} y2={y - 8} strokeWidth={1.4} />
            })}
          </g>

          {SEGMENTS.map((segment, index) => {
            const height = halfHeight(segment.area)
            const active = index === highlighted
            const color = SEGMENT_COLORS[index % SEGMENT_COLORS.length]
            return (
              <g key={segment.id}>
                <motion.rect
                  x={BOUNDARIES[index]}
                  y={BAR_Y - height}
                  width={BOUNDARIES[index + 1] - BOUNDARIES[index]}
                  height={height * 2}
                  rx={3}
                  fill={color}
                  stroke={color}
                  initial={false}
                  animate={{ fillOpacity: active ? 0.34 : 0.15, strokeWidth: active ? 3.2 : 1.6 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                />
                <text x={centerOf(index)} y={BAR_Y + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>
                  {segment.label}
                </text>
              </g>
            )
          })}

          <motion.g
            stroke={LOAD}
            fill={LOAD}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <line
              x1={junctionX}
              y1={LOAD_Y}
              x2={junctionX}
              y2={BAR_Y - halfHeight(SEGMENTS[0].area)}
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <line x1={junctionX + 4} y1={LOAD_Y} x2={junctionX + 38} y2={LOAD_Y} strokeWidth={2.4} />
            <path
              d={`M${junctionX + 30} ${LOAD_Y - 5} L${junctionX + 38} ${LOAD_Y} L${junctionX + 30} ${LOAD_Y + 5}`}
              fill="none"
              strokeWidth={2.4}
            />
            <text x={junctionX + 20} y={LOAD_Y - 8} textAnchor="middle" fontSize={9} fontWeight={600} stroke="none">
              Q = 20 kN
            </text>

            <line x1={X1 + 4} y1={BAR_Y} x2={X1 + 38} y2={BAR_Y} strokeWidth={2.4} />
            <path
              d={`M${X1 + 30} ${BAR_Y - 5} L${X1 + 38} ${BAR_Y} L${X1 + 30} ${BAR_Y + 5}`}
              fill="none"
              strokeWidth={2.4}
            />
            <text x={X1 + 20} y={BAR_Y - 10} textAnchor="middle" fontSize={9} fontWeight={600} stroke="none">
              P = 30 kN
            </text>
          </motion.g>

          {SEGMENTS.map((segment, index) =>
            metric === 'N' && (focusIndex < 0 || index === focusIndex) ? (
              <ForceTag key={`n-${segment.id}`} index={index} opacity={revealOf(index)} />
            ) : null,
          )}

          {metric === 'σ' && activeIndex >= 0 && <ForceTag index={activeIndex} opacity={1} />}

          {SEGMENTS.map((segment, index) => {
            const height = halfHeight(segment.area)
            const showLabel = showArea || (showContextArea && index === activeIndex)
            const labelReveal = showArea && metric === 'A' && playing ? revealOf(index) : 1
            if (!showLabel) return null
            return (
              <motion.text
                key={`a-${segment.id}`}
                initial={false}
                animate={{ opacity: labelReveal }}
                x={centerOf(index)}
                y={BAR_Y + height + 15}
                textAnchor="middle"
                fontSize={8.5}
                fill={MUTED}
              >
                A{SUBSCRIPTS[index]} = {segment.area} mm²
              </motion.text>
            )
          })}

          {isStress && (
            <g>
              <line x1={X0} y1={ZERO_Y} x2={X1} y2={ZERO_Y} stroke={AXIS} strokeWidth={1.2} />
              <text x={X0} y={ZERO_Y + 14} fontSize={8.5} fill={MUTED}>
                σ [MPa]
              </text>

              {SEGMENTS.slice(0, visibleBars).map((segment, index) => {
                const current = metric === 'σ' && index === activeIndex
                const reveal = current ? currentReveal : 1
                const target = Math.abs(segment.sigma) * STRESS_SCALE
                const height = Math.max(0.6, target * reveal)
                const y = ZERO_Y - height
                const active = index === activeIndex
                const width = (BOUNDARIES[index + 1] - BOUNDARIES[index]) * 0.5
                const x = centerOf(index) - width / 2
                return (
                  <motion.g key={`bar-${segment.id}`} initial={false} animate={{ opacity: 1 }}>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx={2}
                      fill={TENSION}
                      fillOpacity={active ? 0.42 : 0.2}
                      stroke={TENSION}
                      strokeWidth={active ? 2.4 : 1.2}
                    />
                    <text
                      x={centerOf(index)}
                      y={y - 6}
                      textAnchor="middle"
                      fontSize={9}
                      fontWeight={active ? 700 : 500}
                      fill={TENSION}
                    >
                      σ{SUBSCRIPTS[index]} = {segment.sigma} MPa
                    </text>
                  </motion.g>
                )
              })}

              <line
                x1={X0}
                y1={thresholdY}
                x2={X1}
                y2={thresholdY}
                stroke={LOAD}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <g stroke={LOAD} fill={LOAD}>
                <line x1={X0} y1={ZERO_Y - 82} x2={X0 + 14} y2={ZERO_Y - 82} strokeWidth={1.2} strokeDasharray="5 4" />
                <text x={X0 + 20} y={ZERO_Y - 78} fontSize={8.5} fontWeight={600} stroke="none">
                  σdop = 160 MPa
                </text>
              </g>

              {isCompare && (
                <motion.circle
                  cx={centerOf(1)}
                  cy={ZERO_Y - SEGMENTS[1].sigma * STRESS_SCALE - 2}
                  r={3.4}
                  fill={TENSION}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                />
              )}
            </g>
          )}
        </svg>
      </div>
      <p className={local('note')}>Długości odcinków są schematyczne.</p>
    </div>
  )
}
