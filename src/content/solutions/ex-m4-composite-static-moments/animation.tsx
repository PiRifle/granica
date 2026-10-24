import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const METRICS = ['model', 'parts', 'arms', 'sx', 'sy', 'centroid'] as const
type Metric = (typeof METRICS)[number]

const AXIS = '#b7c0cb'
const MUTED = '#87929d'
const INK = '#17202a'
const CENTROID = '#ff6b45'
const WEB = '#4f6df5'
const FLANGE = '#5bb98c'

interface Part {
  id: string
  x: number
  y: number
  width: number
  height: number
  area: number
  cx: number
  cy: number
  color: string
  areaLabel: string
  areaLabelX: number
  areaLabelY: number
  areaAnchor: 'start' | 'middle' | 'end'
}

const PARTS: Part[] = [
  {
    id: 'web',
    x: 50,
    y: 0,
    width: 20,
    height: 100,
    area: 2000,
    cx: 60,
    cy: 50,
    color: WEB,
    areaLabel: 'A₁ = 2000 mm²',
    areaLabelX: 247,
    areaLabelY: 166,
    areaAnchor: 'start',
  },
  {
    id: 'flange',
    x: 0,
    y: 100,
    width: 120,
    height: 20,
    area: 2400,
    cx: 60,
    cy: 110,
    color: FLANGE,
    areaLabel: 'A₂ = 2400 mm²',
    areaLabelX: 216,
    areaLabelY: 41,
    areaAnchor: 'middle',
  },
]

const CENTROID_X = 60
const CENTROID_Y = 82.73
const SECTION_WIDTH = 120
const SECTION_HEIGHT = 120

const SCALE = 1.66
const OX = 112
const OY = 252
const px = (value: number) => OX + value * SCALE
const py = (value: number) => OY - value * SCALE

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

const partial = (count: number, pick: (part: Part) => number) => {
  const parts = PARTS.slice(0, count)
  const total = parts.reduce((sum, part) => sum + part.area, 0)
  return total === 0 ? 0 : parts.reduce((sum, part) => sum + part.area * pick(part), 0) / total
}

export function CompositeStaticMomentsAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const metricIndex = METRICS.indexOf(metric as Metric)
  const stage = metricIndex >= 0 ? metricIndex : Math.min(index, METRICS.length - 1)
  const reveal = playing ? smooth(sceneProgress) : 1

  const addedY = stage >= 3 ? Math.min(PARTS.length, Math.floor(reveal * PARTS.length + 0.0001)) : 0
  const addedX = stage >= 4 ? Math.min(PARTS.length, Math.floor(reveal * PARTS.length + 0.0001)) : 0
  const final = stage >= 5
  const markerY = stage >= 4 ? CENTROID_Y : partial(addedY, (part) => part.cy)
  const markerX = final ? CENTROID_X : partial(addedX, (part) => part.cx)
  const activePart = stage === 3 ? addedY - 1 : stage === 4 ? addedX - 1 : -1

  const partOpacity = (partIndex: number) => {
    if (stage === 0) return 0.14
    return activePart === partIndex ? 0.34 : 0.18
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Przekrój teowy 120 na 120 mm ze środnikiem 20 na 100 mm i półką 120 na 20 mm. Animacja pokazuje podział na części, ramiona, sumowanie momentów statycznych i wyznaczenie środka ciężkości."
        >
          <defs>
            <marker
              id="m4s1-axis"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={AXIS} />
            </marker>
          </defs>

          {PARTS.map((part, partIndex) => (
            <motion.rect
              key={part.id}
              x={px(part.x)}
              y={py(part.y + part.height)}
              width={part.width * SCALE}
              height={part.height * SCALE}
              rx={2}
              fill={part.color}
              fillOpacity={partOpacity(partIndex)}
              stroke={part.color}
              strokeWidth={activePart === partIndex ? 2.6 : 1.5}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 + partIndex * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: `${px(part.x + part.width / 2)}px ${py(part.y + part.height / 2)}px` }}
            />
          ))}

          <g>
            <motion.line
              x1={px(0) - 12}
              y1={py(0)}
              x2={px(SECTION_WIDTH) + 24}
              y2={py(0)}
              stroke={AXIS}
              strokeWidth={1.4}
              markerEnd="url(#m4s1-axis)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.line
              x1={px(0)}
              y1={py(0) + 10}
              x2={px(0)}
              y2={py(SECTION_HEIGHT) - 22}
              stroke={AXIS}
              strokeWidth={1.4}
              markerEnd="url(#m4s1-axis)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
            <text x={px(SECTION_WIDTH) + 28} y={py(0) + 4} fontSize={11} fill={MUTED}>
              x
            </text>
            <text x={px(0) - 13} y={py(SECTION_HEIGHT) - 26} fontSize={11} fill={MUTED}>
              y
            </text>
            <text x={px(0) - 9} y={py(0) + 14} fontSize={10} fill={MUTED}>
              O
            </text>
          </g>

          <g opacity={stage <= 1 ? 1 : 0.55}>
            <line x1={px(0)} y1={py(0) + 30} x2={px(SECTION_WIDTH)} y2={py(0) + 30} stroke={MUTED} strokeWidth={1} />
            <line x1={px(0)} y1={py(0) + 25} x2={px(0)} y2={py(0) + 35} stroke={MUTED} strokeWidth={1} />
            <line
              x1={px(SECTION_WIDTH)}
              y1={py(0) + 25}
              x2={px(SECTION_WIDTH)}
              y2={py(0) + 35}
              stroke={MUTED}
              strokeWidth={1}
            />
            <text x={(px(0) + px(SECTION_WIDTH)) / 2} y={py(0) + 44} textAnchor="middle" fontSize={9} fill={MUTED}>
              120 mm
            </text>

            <line x1={px(0) - 22} y1={py(0)} x2={px(0) - 22} y2={py(100)} stroke={MUTED} strokeWidth={1} />
            <line x1={px(0) - 27} y1={py(0)} x2={px(0) - 17} y2={py(0)} stroke={MUTED} strokeWidth={1} />
            <line x1={px(0) - 27} y1={py(100)} x2={px(0) - 17} y2={py(100)} stroke={MUTED} strokeWidth={1} />
            <text x={px(0) - 27} y={(py(0) + py(100)) / 2 + 3} textAnchor="end" fontSize={9} fill={MUTED}>
              100
            </text>

            <line
              x1={px(SECTION_WIDTH) + 12}
              y1={py(100)}
              x2={px(SECTION_WIDTH) + 12}
              y2={py(120)}
              stroke={MUTED}
              strokeWidth={1}
            />
            <line
              x1={px(SECTION_WIDTH) + 7}
              y1={py(100)}
              x2={px(SECTION_WIDTH) + 17}
              y2={py(100)}
              stroke={MUTED}
              strokeWidth={1}
            />
            <line
              x1={px(SECTION_WIDTH) + 7}
              y1={py(120)}
              x2={px(SECTION_WIDTH) + 17}
              y2={py(120)}
              stroke={MUTED}
              strokeWidth={1}
            />
            <text x={px(SECTION_WIDTH) + 21} y={(py(100) + py(120)) / 2 + 3} fontSize={9} fill={MUTED}>
              20
            </text>
          </g>

          {stage >= 1 && (
            <g>
              {PARTS.map((part, partIndex) => {
                const labelOpacity = stage <= 2 ? 1 : 0.42
                const lineTo = part.areaAnchor === 'start' ? part.areaLabelX - 4 : part.areaLabelX
                return (
                  <motion.g
                    key={`label-${part.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: labelOpacity }}
                    transition={{ delay: 0.18 + partIndex * 0.14, duration: 0.4 }}
                    style={{ transformOrigin: `${px(part.cx)}px ${py(part.cy)}px` }}
                  >
                    <motion.circle
                      cx={px(part.cx)}
                      cy={py(part.cy)}
                      r={5}
                      fill={part.color}
                      stroke="#fff"
                      strokeWidth={1.2}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + partIndex * 0.14, type: 'spring', stiffness: 260, damping: 18 }}
                    />
                    <text
                      x={px(part.cx)}
                      y={py(part.cy) + 2.6}
                      textAnchor="middle"
                      fontSize={6.5}
                      fontWeight={700}
                      fill="#fff"
                    >
                      {partIndex + 1}
                    </text>
                    <line
                      x1={px(part.cx)}
                      y1={py(part.cy)}
                      x2={lineTo}
                      y2={part.areaLabelY - 3}
                      stroke={part.color}
                      strokeWidth={0.9}
                      strokeDasharray="2 2"
                    />
                    <text
                      x={part.areaLabelX}
                      y={part.areaLabelY}
                      textAnchor={part.areaAnchor}
                      fontSize={9}
                      fontWeight={600}
                      fill={part.color}
                    >
                      {part.areaLabel}
                    </text>
                  </motion.g>
                )
              })}
            </g>
          )}

          {stage >= 2 && (
            <g opacity={stage <= 4 ? 1 : 0.45}>
              {PARTS.map((part, partIndex) => {
                const armReveal = clamp((reveal - partIndex * 0.18) / 0.55)
                const armX = px(part.cx) + (partIndex - (PARTS.length - 1) / 2) * 8
                const armColor = part.color
                return (
                  <g key={`arm-${part.id}`}>
                    <motion.line
                      x1={armX}
                      y1={py(0)}
                      x2={armX}
                      y2={py(part.cy)}
                      stroke={armColor}
                      strokeWidth={1.3}
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: armReveal }}
                      transition={{ duration: 0.12, ease: 'linear' }}
                    />
                    <motion.line
                      x1={px(0)}
                      y1={py(part.cy)}
                      x2={armX}
                      y2={py(part.cy)}
                      stroke={armColor}
                      strokeWidth={1.3}
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: armReveal }}
                      transition={{ duration: 0.12, ease: 'linear' }}
                    />
                    <text x={armX + 5} y={(py(0) + py(part.cy)) / 2 + 3} fontSize={9} fontWeight={600} fill={armColor}>
                      {partIndex === 0 ? 'y₁' : 'y₂'}
                    </text>
                    <text
                      x={(px(0) + armX) / 2}
                      y={py(part.cy) - 5}
                      textAnchor="middle"
                      fontSize={9}
                      fontWeight={600}
                      fill={armColor}
                    >
                      {partIndex === 0 ? 'x₁' : 'x₂'}
                    </text>
                  </g>
                )
              })}
            </g>
          )}

          {stage >= 3 && (
            <g>
              <motion.line
                x1={px(0)}
                y1={py(markerY)}
                x2={px(SECTION_WIDTH)}
                y2={py(markerY)}
                stroke={CENTROID}
                strokeWidth={2.1}
                strokeDasharray="6 4"
                initial={false}
                animate={{ y1: py(markerY), y2: py(markerY) }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              />
              <motion.circle
                cx={px(0)}
                cy={py(markerY)}
                r={4.6}
                fill={CENTROID}
                initial={false}
                animate={{ cy: py(markerY) }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              />
              <motion.text
                x={px(SECTION_WIDTH) + 16}
                y={py(markerY) - 6}
                fontSize={9.5}
                fontWeight={700}
                fill={CENTROID}
                initial={false}
                animate={{ y: py(markerY) - 6 }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              >
                {final ? 'yC = 82,73 mm' : 'Σ Aᵢ yᵢ'}
              </motion.text>
            </g>
          )}

          {stage >= 4 && (
            <g>
              <motion.line
                x1={px(markerX)}
                y1={py(0)}
                x2={px(markerX)}
                y2={py(SECTION_HEIGHT)}
                stroke={CENTROID}
                strokeWidth={2.1}
                strokeDasharray="6 4"
                initial={false}
                animate={{ x1: px(markerX), x2: px(markerX) }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              />
              <motion.circle
                cx={px(markerX)}
                cy={py(0)}
                r={4.6}
                fill={CENTROID}
                initial={false}
                animate={{ cx: px(markerX) }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              />
              <motion.text
                x={px(markerX) + 7}
                y={py(0) + 18}
                fontSize={9.5}
                fontWeight={700}
                fill={CENTROID}
                initial={false}
                animate={{ x: px(markerX) + 7 }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              >
                {final ? 'xC = 60 mm' : 'Σ Aᵢ xᵢ'}
              </motion.text>
            </g>
          )}

          {final && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
              style={{ transformOrigin: `${px(CENTROID_X)}px ${py(CENTROID_Y)}px` }}
            >
              <motion.circle
                cx={px(CENTROID_X)}
                cy={py(CENTROID_Y)}
                r={12}
                fill="none"
                stroke={CENTROID}
                strokeWidth={1.4}
                animate={playing ? { r: [10, 16, 10], opacity: [0.7, 0, 0.7] } : { r: 12, opacity: 0.4 }}
                transition={{ duration: 2.4, repeat: playing ? Infinity : 0, ease: 'easeInOut' }}
              />
              <circle cx={px(CENTROID_X)} cy={py(CENTROID_Y)} r={4} fill={INK} stroke="#fff" strokeWidth={1.2} />
              <text x={px(CENTROID_X) + 8} y={py(CENTROID_Y) - 8} fontSize={11} fontWeight={700} fill={INK}>
                C
              </text>
              <text x={px(CENTROID_X) + 18} y={py(CENTROID_Y) + 14} fontSize={8.5} fill={MUTED}>
                osie centralne
              </text>
            </motion.g>
          )}

          <text x={12} y={22} fontSize={9} fill={MUTED}>
            środnik 20 × 100
          </text>
          <text x={12} y={35} fontSize={9} fill={MUTED}>
            półka 120 × 20
          </text>
          <text x={12} y={48} fontSize={9} fill={MUTED}>
            A = 4400 mm²
          </text>
        </svg>
      </div>
    </div>
  )
}
