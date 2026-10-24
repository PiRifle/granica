import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ORANGE = '#ff6b45'
const BLUE = '#4f6df5'
const INK = '#17202a'
const MUTED = '#87929d'
const STROKE = '#7d8fa5'
const FILL = '#eef3fa'

const CX = 230
const BASE_Y = 228
const APEX_Y = 48
const HALF = 120
const H = BASE_Y - APEX_Y
const CENTROID_Y = BASE_Y - H / 3
const GX = 384
const GAUGE_DEPTH = 44

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

const baseDensityMax = 4 / 27
const centroidDensityMax = Math.max(
  ...Array.from({ length: 201 }, (_, index) => {
    const t = index / 200
    return (1 - t) * Math.pow(t - 1 / 3, 2)
  }),
)

const baseGaugePath = Array.from({ length: 31 }, (_, point) => {
  const t = point / 30
  const x = GX + GAUGE_DEPTH * ((t * t * (1 - t)) / baseDensityMax)
  const y = BASE_Y - H * t
  return `${point === 0 ? 'M' : 'L'} ${x} ${y}`
}).join(' ')

const centroidGaugePath = Array.from({ length: 31 }, (_, point) => {
  const t = point / 30
  const density = (1 - t) * Math.pow(t - 1 / 3, 2)
  const x = GX + GAUGE_DEPTH * (density / centroidDensityMax)
  const y = BASE_Y - H * t
  return `${point === 0 ? 'M' : 'L'} ${x} ${y}`
}).join(' ')

const horizontalLevels = Array.from({ length: 15 }, (_, index) => index / 14)
const verticalLevels = Array.from({ length: 15 }, (_, index) => -1 + (2 * index) / 14)

function Triangle({
  baseActive,
  centralActive,
  yAxisActive,
  showDimensions,
}: {
  baseActive: boolean
  centralActive: boolean
  yAxisActive: boolean
  showDimensions: boolean
}) {
  return (
    <g>
      <polygon
        points={`${CX - HALF},${BASE_Y} ${CX},${APEX_Y} ${CX + HALF},${BASE_Y}`}
        fill={FILL}
        stroke={STROKE}
        strokeWidth={1.6}
      />
      <line
        x1={CX - HALF - 20}
        y1={BASE_Y}
        x2={CX + HALF + 20}
        y2={BASE_Y}
        stroke={baseActive ? ORANGE : '#b7c0cb'}
        strokeWidth={baseActive ? 2.4 : 1.2}
        strokeDasharray={baseActive ? undefined : '6 4'}
      />
      <line
        x1={CX - HALF - 8}
        y1={CENTROID_Y}
        x2={CX + HALF + 8}
        y2={CENTROID_Y}
        stroke={centralActive ? ORANGE : '#b7c0cb'}
        strokeWidth={centralActive ? 2.4 : 1.2}
        strokeDasharray={centralActive ? undefined : '6 4'}
      />
      <line
        x1={CX}
        y1={APEX_Y - 24}
        x2={CX}
        y2={BASE_Y + 24}
        stroke={yAxisActive ? BLUE : '#b7c0cb'}
        strokeWidth={yAxisActive ? 2.4 : 1.2}
        strokeDasharray={yAxisActive ? undefined : '6 4'}
      />
      <text
        x={CX + HALF + 24}
        y={(baseActive ? BASE_Y : CENTROID_Y) + 4}
        fontSize={11}
        fontWeight={600}
        fill={baseActive || centralActive ? ORANGE : MUTED}
      >
        x
      </text>
      <text x={CX + 6} y={APEX_Y - 14} fontSize={11} fontWeight={600} fill={yAxisActive ? BLUE : MUTED}>
        y
      </text>
      <circle cx={CX} cy={CENTROID_Y} r={3.6} fill={INK} />
      <text x={CX + 7} y={CENTROID_Y - 7} fontSize={10} fill={INK}>
        C
      </text>
      {showDimensions && (
        <g stroke={STROKE} fill={STROKE}>
          <line x1={CX - HALF} y1={264} x2={CX + HALF} y2={264} strokeWidth={1.1} />
          <line x1={CX - HALF} y1={258} x2={CX - HALF} y2={270} strokeWidth={1.1} />
          <line x1={CX + HALF} y1={258} x2={CX + HALF} y2={270} strokeWidth={1.1} />
          <text x={CX} y={280} textAnchor="middle" fontSize={10} stroke="none">
            b = 120 mm
          </text>
          <line x1={84} y1={APEX_Y} x2={84} y2={BASE_Y} strokeWidth={1.1} />
          <line x1={78} y1={APEX_Y} x2={90} y2={APEX_Y} strokeWidth={1.1} />
          <line x1={78} y1={BASE_Y} x2={90} y2={BASE_Y} strokeWidth={1.1} />
          <text
            x={74}
            y={(APEX_Y + BASE_Y) / 2}
            textAnchor="middle"
            fontSize={10}
            stroke="none"
            transform={`rotate(-90 74 ${(APEX_Y + BASE_Y) / 2})`}
          >
            h = 90 mm
          </text>
        </g>
      )}
    </g>
  )
}

export function TriangleSecondMomentAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'section'
  const progress = playing ? smooth(clamp(sceneProgress)) : 1
  const rotation = index === 4
  const centroidAxis = index === 2
  const baseAxis = index === 1
  const verticalStrips = metric === 'Iy' && !rotation
  const horizontalStrips = (baseAxis || centroidAxis) && !rotation
  const tActive = 0.02 + 0.96 * progress
  const yActive = BASE_Y - H * tActive
  const halfActive = HALF * (1 - tActive)
  const baseDensity = (tActive * tActive * (1 - tActive)) / baseDensityMax
  const centroidDensity = ((1 - tActive) * Math.pow(tActive - 1 / 3, 2)) / centroidDensityMax

  if (rotation) {
    const angle = (-90 * progress * Math.PI) / 180
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const rotate = (x: number, y: number) => {
      const dx = x - CX
      const dy = y - CENTROID_Y
      return [CX + dx * cos - dy * sin, CENTROID_Y + dx * sin + dy * cos] as const
    }
    const rotatedPoints = [
      [CX - HALF, BASE_Y],
      [CX, APEX_Y],
      [CX + HALF, BASE_Y],
    ]
      .map(([x, y]) => rotate(x, y))
      .map(([x, y]) => `${x},${y}`)
      .join(' ')

    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 480 300"
            role="img"
            aria-label="Obrót trójkąta o 90 stopni wokół środka ciężkości przy nieruchomej poziomej osi x"
          >
            <line
              x1={CX - HALF - 28}
              y1={CENTROID_Y}
              x2={CX + HALF + 28}
              y2={CENTROID_Y}
              stroke={ORANGE}
              strokeWidth={2.4}
            />
            <line
              x1={CX}
              y1={APEX_Y - 24}
              x2={CX}
              y2={BASE_Y + 24}
              stroke={BLUE}
              strokeWidth={1.2}
              opacity={0.5}
              strokeDasharray="6 4"
            />
            <text x={CX + HALF + 32} y={CENTROID_Y + 4} fontSize={11} fontWeight={600} fill={ORANGE}>
              x
            </text>
            <text x={CX + 6} y={APEX_Y - 14} fontSize={11} fontWeight={600} fill={MUTED}>
              y
            </text>

            <polygon
              points={`${CX - HALF},${BASE_Y} ${CX},${APEX_Y} ${CX + HALF},${BASE_Y}`}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.2}
              strokeDasharray="6 5"
              opacity={0.55}
            />

            <polygon points={rotatedPoints} fill={FILL} stroke={STROKE} strokeWidth={1.8} />

            <circle cx={CX} cy={CENTROID_Y} r={3.8} fill={INK} />
            <text x={CX + 8} y={CENTROID_Y - 8} fontSize={10} fill={INK}>
              C
            </text>
            <text x={340} y={270} textAnchor="middle" fontSize={10} fontWeight={600} fill={MUTED}>
              obrót 90°
            </text>
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Trójkąt z pasami elementarnymi i podświetloną osią, względem której liczony jest moment bezwładności"
        >
          <Triangle
            baseActive={index === 0 || baseAxis}
            centralActive={centroidAxis}
            yAxisActive={metric === 'Iy' || index === 0}
            showDimensions
          />

          {horizontalStrips && (
            <g>
              {horizontalLevels.map((t, level) => {
                const y = BASE_Y - H * t
                const half = HALF * (1 - t)
                const density = centroidAxis
                  ? ((1 - t) * Math.pow(t - 1 / 3, 2)) / centroidDensityMax
                  : (t * t * (1 - t)) / baseDensityMax
                return (
                  <line
                    key={`horizontal-${level}`}
                    x1={CX - half}
                    y1={y}
                    x2={CX + half}
                    y2={y}
                    stroke={ORANGE}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    opacity={0.08 + 0.42 * density}
                  />
                )
              })}
              <line
                x1={CX - halfActive}
                y1={yActive}
                x2={CX + halfActive}
                y2={yActive}
                stroke={ORANGE}
                strokeWidth={4}
                strokeLinecap="round"
              />
              <line
                x1={104}
                y1={centroidAxis ? CENTROID_Y : BASE_Y}
                x2={104}
                y2={yActive}
                stroke={ORANGE}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text
                x={110}
                y={((centroidAxis ? CENTROID_Y : BASE_Y) + yActive) / 2 + 3}
                fontSize={9}
                fontWeight={600}
                fill={ORANGE}
              >
                y
              </text>
              <line x1={GX} y1={APEX_Y} x2={GX} y2={BASE_Y} stroke="#d7dde5" strokeWidth={1.1} />
              <path
                d={centroidAxis ? centroidGaugePath : baseGaugePath}
                fill="none"
                stroke={ORANGE}
                strokeWidth={1.3}
                opacity={0.45}
              />
              <line
                x1={GX}
                y1={yActive}
                x2={GX + GAUGE_DEPTH * (centroidAxis ? centroidDensity : baseDensity)}
                y2={yActive}
                stroke={ORANGE}
                strokeWidth={1.6}
              />
              <motion.circle
                cx={GX + GAUGE_DEPTH * (centroidAxis ? centroidDensity : baseDensity)}
                cy={yActive}
                r={3.8}
                fill={ORANGE}
                animate={{
                  cx: GX + GAUGE_DEPTH * (centroidAxis ? centroidDensity : baseDensity),
                  cy: yActive,
                }}
                transition={{ duration: 0.12 }}
              />
              <text x={GX + 6} y={APEX_Y - 10} fontSize={8} fontWeight={600} fill={ORANGE}>
                y²·b(y)
              </text>
            </g>
          )}

          {verticalStrips && (
            <g>
              {verticalLevels.map((position, level) => {
                const x = CX + position * HALF
                const top = BASE_Y - H * (1 - Math.abs(position))
                return (
                  <line
                    key={`vertical-${level}`}
                    x1={x}
                    y1={top}
                    x2={x}
                    y2={BASE_Y}
                    stroke={BLUE}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    opacity={0.08 + 0.42 * ((position * position * (1 - Math.abs(position))) / baseDensityMax)}
                  />
                )
              })}
              <line
                x1={CX + (2 * progress - 1) * HALF * 0.98}
                y1={BASE_Y - H * (1 - Math.abs(2 * progress - 1))}
                x2={CX + (2 * progress - 1) * HALF * 0.98}
                y2={BASE_Y}
                stroke={BLUE}
                strokeWidth={4}
                strokeLinecap="round"
              />
              <line
                x1={CX}
                y1={BASE_Y - 14}
                x2={CX + (2 * progress - 1) * HALF * 0.98}
                y2={BASE_Y - 14}
                stroke={BLUE}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text
                x={CX + (2 * progress - 1) * HALF * 0.49}
                y={BASE_Y - 18}
                textAnchor="middle"
                fontSize={9}
                fontWeight={600}
                fill={BLUE}
              >
                x
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
