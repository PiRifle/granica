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
const BOTTOM = '#ff8a5c'
const TOP = '#5bb98c'

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
  areaLabelY: number
}

const PARTS: Part[] = [
  {
    id: 'web',
    x: 0,
    y: 10,
    width: 10,
    height: 180,
    area: 1800,
    cx: 5,
    cy: 100,
    color: WEB,
    areaLabel: 'A₁ = 1800 mm²',
    areaLabelY: 148,
  },
  {
    id: 'bottom',
    x: 0,
    y: 0,
    width: 80,
    height: 10,
    area: 800,
    cx: 40,
    cy: 5,
    color: BOTTOM,
    areaLabel: 'A₂ = 800 mm²',
    areaLabelY: 238,
  },
  {
    id: 'top',
    x: 0,
    y: 190,
    width: 80,
    height: 10,
    area: 800,
    cx: 40,
    cy: 195,
    color: TOP,
    areaLabel: 'A₃ = 800 mm²',
    areaLabelY: 58,
  },
]

const CENTROID_X = 21.47
const CENTROID_Y = 100
const SECTION_WIDTH = 80
const SECTION_HEIGHT = 200

const SCALE = 1.02
const OX = 160
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

export function CompositeStaticMoments2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
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
          aria-label="Ceownik otwarty w prawo o wysokości 200 mm i szerokości 80 mm, złożony ze środnika 10 na 180 mm i dwóch półek 80 na 10 mm. Animacja pokazuje podział na części, ramiona, sumowanie momentów statycznych i wyznaczenie środka ciężkości."
        >
          <defs>
            <marker
              id="m4s2-axis"
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
              rx={1.5}
              fill={part.color}
              fillOpacity={partOpacity(partIndex)}
              stroke={part.color}
              strokeWidth={activePart === partIndex ? 2.6 : 1.5}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 + partIndex * 0.11, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
              markerEnd="url(#m4s2-axis)"
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
              markerEnd="url(#m4s2-axis)"
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
              80 mm
            </text>

            <line x1={px(0) - 26} y1={py(0)} x2={px(0) - 26} y2={py(SECTION_HEIGHT)} stroke={MUTED} strokeWidth={1} />
            <line x1={px(0) - 31} y1={py(0)} x2={px(0) - 21} y2={py(0)} stroke={MUTED} strokeWidth={1} />
            <line
              x1={px(0) - 31}
              y1={py(SECTION_HEIGHT)}
              x2={px(0) - 21}
              y2={py(SECTION_HEIGHT)}
              stroke={MUTED}
              strokeWidth={1}
            />
            <text x={px(0) - 31} y={(py(0) + py(SECTION_HEIGHT)) / 2 + 3} textAnchor="end" fontSize={9} fill={MUTED}>
              200
            </text>
          </g>

          {stage >= 1 && (
            <g>
              {PARTS.map((part, partIndex) => {
                const labelOpacity = stage <= 2 ? 1 : 0.4
                return (
                  <motion.g
                    key={`label-${part.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: labelOpacity }}
                    transition={{ delay: 0.18 + partIndex * 0.12, duration: 0.4 }}
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
                      transition={{ delay: 0.2 + partIndex * 0.12, type: 'spring', stiffness: 260, damping: 18 }}
                      style={{ transformOrigin: `${px(part.cx)}px ${py(part.cy)}px` }}
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
                      x2={px(SECTION_WIDTH) + 6}
                      y2={part.areaLabelY - 3}
                      stroke={part.color}
                      strokeWidth={0.9}
                      strokeDasharray="2 2"
                    />
                    <text
                      x={px(SECTION_WIDTH) + 10}
                      y={part.areaLabelY}
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
                const armReveal = clamp((reveal - partIndex * 0.14) / 0.58)
                const armX = px(part.cx) + partIndex * 6
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
                      {['y₁', 'y₂', 'y₃'][partIndex]}
                    </text>
                    <text
                      x={(px(0) + armX) / 2}
                      y={py(part.cy) - 5}
                      textAnchor="middle"
                      fontSize={9}
                      fontWeight={600}
                      fill={armColor}
                    >
                      {['x₁', 'x₂', 'x₃'][partIndex]}
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
                y={py(markerY) - 14}
                fontSize={9.5}
                fontWeight={700}
                fill={CENTROID}
                initial={false}
                animate={{ y: py(markerY) - 14 }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              >
                {final ? 'yC = 100 mm' : 'Σ Aᵢ yᵢ'}
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
                {final ? 'xC = 21,47 mm' : 'Σ Aᵢ xᵢ'}
              </motion.text>
            </g>
          )}

          {final && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
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
            środnik 10 × 180
          </text>
          <text x={12} y={35} fontSize={9} fill={MUTED}>
            półki 80 × 10
          </text>
          <text x={12} y={48} fontSize={9} fill={MUTED}>
            A = 3400 mm²
          </text>
        </svg>
      </div>
    </div>
  )
}
