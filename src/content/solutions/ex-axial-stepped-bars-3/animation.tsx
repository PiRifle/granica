import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local, SEGMENT_COLORS } from '../../../components/solution-figures/shared'

const TENSION = '#4f6df5'
const COMPRESSION = '#a970dd'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const AXIS = '#c9d0d9'

const SEGMENTS = [
  {
    id: '1',
    label: '1',
    length: 1000,
    area: 314.2,
    areaLabel: '314,2',
    diameter: 20,
    n: 45,
    sigma: 143.3,
    sigmaLabel: '143,3',
  },
  {
    id: '2',
    label: '2',
    length: 1000,
    area: 201.1,
    areaLabel: '201,1',
    diameter: 16,
    n: 30,
    sigma: 149.2,
    sigmaLabel: '149,2',
  },
  {
    id: '3',
    label: '3',
    length: 1000,
    area: 153.9,
    areaLabel: '153,9',
    diameter: 14,
    n: -20,
    sigma: -129.9,
    sigmaLabel: '−129,9',
  },
]

const X0 = 66
const X1 = 406
const BAR_Y = 106
const ZERO_Y = 246
const N_Y = 38
const STRESS_SCALE = 64 / 150
const SIGMA_DOP = 150

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

const SUBSCRIPTS = ['₁', '₂', '₃']

function ForceTag({ index, opacity }: { index: number; opacity: number }) {
  const segment = SEGMENTS[index]
  const x1 = BOUNDARIES[index] + 9
  const x2 = BOUNDARIES[index + 1] - 9
  const cx = centerOf(index)
  const tension = segment.n >= 0
  const color = tension ? TENSION : COMPRESSION
  const leftHead = tension
    ? `M${x1 + 7} ${N_Y - 4} L${x1} ${N_Y} L${x1 + 7} ${N_Y + 4}`
    : `M${x1} ${N_Y - 4} L${x1 + 7} ${N_Y} L${x1} ${N_Y + 4}`
  const rightHead = tension
    ? `M${x2 - 7} ${N_Y - 4} L${x2} ${N_Y} L${x2 - 7} ${N_Y + 4}`
    : `M${x2} ${N_Y - 4} L${x2 - 7} ${N_Y} L${x2} ${N_Y + 4}`

  return (
    <motion.g initial={false} animate={{ opacity }} stroke={color} fill={color}>
      <line x1={x1} y1={N_Y} x2={x2} y2={N_Y} strokeWidth={1.8} />
      <path d={leftHead} fill="none" strokeWidth={1.8} />
      <path d={rightHead} fill="none" strokeWidth={1.8} />
      <text x={cx} y={N_Y - 8} textAnchor="middle" fontSize={8.5} fontWeight={600} stroke="none">
        {`N${SUBSCRIPTS[index]} = ${tension ? '+' : '−'}${Math.abs(segment.n)} kN`}
      </text>
    </motion.g>
  )
}

export function SteppedBarsExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'N'
  const progress = playing ? clamp(sceneProgress) : 1
  const focusId = scene.focus?.segment
  const focusIndex = focusId ? SEGMENTS.findIndex((segment) => segment.id === focusId) : -1
  const isCompare = metric === 'σmax'
  const isStress = metric === 'σ' || isCompare
  const activeIndex = isCompare ? 1 : metric === 'σ' ? focusIndex : -1

  const revealOf = (index: number) => {
    if (metric !== 'N' && metric !== 'A') return 0
    if (!playing) return 1
    return clamp((progress - index * 0.3) / 0.32)
  }

  const sequenceActive =
    (metric === 'N' || metric === 'A') && playing
      ? SEGMENTS.findIndex((_, index) => revealOf(index) > 0.02 && revealOf(index) < 0.98)
      : -1
  const highlighted = metric === 'N' || metric === 'A' ? sequenceActive : activeIndex
  const showDesignArea = metric === 'A'
  const showCompactAreaFor = (index: number) => metric === 'N' || (metric === 'σ' && index === activeIndex)
  const visibleBars = isCompare ? SEGMENTS.length : activeIndex + 1
  const currentReveal = playing ? clamp((progress - 0.06) / 0.74) : 1
  const thresholdY = ZERO_Y - SIGMA_DOP * STRESS_SCALE

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 345"
          role="img"
          aria-label="Pręt schodkowy z trzema odcinkami o przyjętych średnicach 20, 16 i 14 milimetrów, w których siły osiowe wynoszą 45, 30 i 20 kiloniutonów; kolejno pokazane naprężenia, w tym ściskanie w trzecim odcinku"
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

          {SEGMENTS.map((segment, index) =>
            metric === 'N' ? <ForceTag key={`n-${segment.id}`} index={index} opacity={revealOf(index)} /> : null,
          )}

          {metric === 'σ' && activeIndex >= 0 && <ForceTag index={activeIndex} opacity={1} />}

          {SEGMENTS.map((segment, index) => {
            const height = halfHeight(segment.area)
            const designReveal = playing ? revealOf(index) : 1
            if (showDesignArea) {
              return (
                <motion.g key={`design-${segment.id}`} initial={false} animate={{ opacity: designReveal }}>
                  <text x={centerOf(index)} y={BAR_Y + height + 14} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    d{SUBSCRIPTS[index]} = {segment.diameter} mm
                  </text>
                  <text x={centerOf(index)} y={BAR_Y + height + 26} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                    A{SUBSCRIPTS[index]} = {segment.areaLabel} mm²
                  </text>
                </motion.g>
              )
            }
            if (showCompactAreaFor(index)) {
              return (
                <motion.text
                  key={`area-${segment.id}`}
                  initial={false}
                  animate={{ opacity: 1 }}
                  x={centerOf(index)}
                  y={BAR_Y + height + 16}
                  textAnchor="middle"
                  fontSize={8.5}
                  fill={MUTED}
                >
                  A{SUBSCRIPTS[index]} = {segment.areaLabel} mm²
                </motion.text>
              )
            }
            return null
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
                const positive = segment.sigma >= 0
                const y = positive ? ZERO_Y - height : ZERO_Y
                const active = index === activeIndex
                const color = positive ? TENSION : COMPRESSION
                const width = (BOUNDARIES[index + 1] - BOUNDARIES[index]) * 0.5
                const x = centerOf(index) - width / 2
                const valueY = positive ? y - 6 : ZERO_Y + height + 13
                return (
                  <motion.g key={`bar-${segment.id}`} initial={false} animate={{ opacity: 1 }}>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx={2}
                      fill={color}
                      fillOpacity={active ? 0.42 : 0.2}
                      stroke={color}
                      strokeWidth={active ? 2.4 : 1.2}
                    />
                    <text
                      x={centerOf(index)}
                      y={valueY}
                      textAnchor="middle"
                      fontSize={9}
                      fontWeight={active ? 700 : 500}
                      fill={color}
                    >
                      σ{SUBSCRIPTS[index]} = {segment.sigmaLabel} MPa
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
                  σdop = 150 MPa
                </text>
              </g>

              {isCompare && (
                <>
                  <motion.circle
                    cx={centerOf(1)}
                    cy={ZERO_Y - SEGMENTS[1].sigma * STRESS_SCALE - 2}
                    r={3.4}
                    fill={TENSION}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                  />
                  <text
                    x={centerOf(2)}
                    y={ZERO_Y + Math.abs(SEGMENTS[2].sigma) * STRESS_SCALE + 26}
                    textAnchor="middle"
                    fontSize={8}
                    fontStyle="italic"
                    fill={COMPRESSION}
                  >
                    ściskanie — sprawdź wyboczenie
                  </text>
                </>
              )}
            </g>
          )}
        </svg>
      </div>
      <p className={local('note')}>Długości schematyczne; przyjęto średnice 20, 16 i 14 mm.</p>
    </div>
  )
}
