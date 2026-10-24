import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ORANGE = '#ff6b45'
const BLUE = '#4f6df5'
const INK = '#17202a'
const MUTED = '#87929d'
const STROKE = '#7d8fa5'
const FILL = '#eef3fa'

const CX = 196
const W = 92
const H = 209
const BASE_Y = 256
const TOP_Y = BASE_Y - H
const AXIS_Y = (BASE_Y + TOP_Y) / 2
const GX = 348
const GAUGE_DEPTH = 46

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

const horizontalLevels = Array.from({ length: 15 }, (_, index) => index / 14)
const verticalLevels = Array.from({ length: 13 }, (_, index) => index / 12)

function MainRectangle({
  top,
  axisY,
  xActive,
  yActive,
  showBDim,
  showHDim,
}: {
  top: number
  axisY: number
  xActive: boolean
  yActive: boolean
  showBDim: boolean
  showHDim: boolean
}) {
  return (
    <g>
      <rect x={CX - W / 2} y={top} width={W} height={BASE_Y - top} fill={FILL} stroke={STROKE} strokeWidth={1.6} />
      <line
        x1={CX - W / 2 - 24}
        y1={axisY}
        x2={CX + W / 2 + 24}
        y2={axisY}
        stroke={xActive ? ORANGE : '#b7c0cb'}
        strokeWidth={xActive ? 2.4 : 1.2}
        strokeDasharray={xActive ? undefined : '6 4'}
      />
      <line
        x1={CX}
        y1={top - 22}
        x2={CX}
        y2={BASE_Y + 22}
        stroke={yActive ? BLUE : '#b7c0cb'}
        strokeWidth={yActive ? 2.4 : 1.2}
        strokeDasharray={yActive ? undefined : '6 4'}
      />
      <text x={CX + W / 2 + 28} y={axisY + 4} fontSize={11} fontWeight={600} fill={xActive ? ORANGE : MUTED}>
        x
      </text>
      <text x={CX + 6} y={top - 12} fontSize={11} fontWeight={600} fill={yActive ? BLUE : MUTED}>
        y
      </text>
      <circle cx={CX} cy={axisY} r={3.6} fill={INK} />
      <text x={CX + 7} y={axisY - 7} fontSize={10} fill={INK}>
        C
      </text>
      {showBDim && (
        <g stroke={STROKE} fill={STROKE}>
          <line x1={CX - W / 2} y1={272} x2={CX + W / 2} y2={272} strokeWidth={1.1} />
          <line x1={CX - W / 2} y1={266} x2={CX - W / 2} y2={278} strokeWidth={1.1} />
          <line x1={CX + W / 2} y1={266} x2={CX + W / 2} y2={278} strokeWidth={1.1} />
          <text x={CX} y={288} textAnchor="middle" fontSize={10} stroke="none">
            b = 80 mm
          </text>
        </g>
      )}
      {showHDim && (
        <g stroke={STROKE} fill={STROKE}>
          <line x1={CX + W / 2 + 14} y1={top} x2={CX + W / 2 + 14} y2={BASE_Y} strokeWidth={1.1} />
          <line x1={CX + W / 2 + 8} y1={top} x2={CX + W / 2 + 20} y2={top} strokeWidth={1.1} />
          <line x1={CX + W / 2 + 8} y1={BASE_Y} x2={CX + W / 2 + 20} y2={BASE_Y} strokeWidth={1.1} />
          <text
            x={CX + W / 2 + 28}
            y={(top + BASE_Y) / 2}
            textAnchor="middle"
            fontSize={10}
            stroke="none"
            transform={`rotate(-90 ${CX + W / 2 + 28} ${(top + BASE_Y) / 2})`}
          >
            h
          </text>
        </g>
      )}
    </g>
  )
}

export function RectangleSecondMomentAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'section'
  const progress = playing ? smooth(clamp(sceneProgress)) : 1
  const ixStrips = metric === 'Ix' && index === 1
  const iyStrips = metric === 'Iy'
  const solving = metric === 'Ix' && index === 2
  const variant = metric === 'section' && index === 4

  if (variant) {
    const left = { cx: 140, width: 62, height: 142, base: 248 }
    const right = { cx: 336, width: 125, height: 112, base: 248 }
    const reveal = 0.55 + 0.45 * progress
    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 480 300"
            role="img"
            aria-label="Porównanie wąskiego wysokiego przekroju i szerszego niższego przekroju o tym samym momencie bezwładności"
          >
            {[
              { ...left, label: 'b = 80 mm', sub: 'h = 181,7 mm', active: true },
              { ...right, label: 'b = 160 mm', sub: 'h = 144,2 mm', active: false },
            ].map((item) => {
              const top = item.base - item.height
              const axisY = item.base - item.height / 2
              return (
                <motion.g
                  key={item.label}
                  initial={false}
                  animate={{ opacity: item.active ? 1 : reveal }}
                  transition={{ duration: 0.2, ease: 'linear' }}
                >
                  <rect
                    x={item.cx - item.width / 2}
                    y={top}
                    width={item.width}
                    height={item.height}
                    fill={item.active ? FILL : '#e4ebf7'}
                    stroke={STROKE}
                    strokeWidth={1.6}
                  />
                  <line
                    x1={item.cx - item.width / 2 - 12}
                    y1={axisY}
                    x2={item.cx + item.width / 2 + 12}
                    y2={axisY}
                    stroke={ORANGE}
                    strokeWidth={2}
                  />
                  <line
                    x1={item.cx}
                    y1={top - 12}
                    x2={item.cx}
                    y2={item.base + 12}
                    stroke={BLUE}
                    strokeWidth={1.1}
                    opacity={0.55}
                    strokeDasharray="5 4"
                  />
                  <text x={item.cx} y={top - 18} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                    {item.label}
                  </text>
                  <text x={item.cx} y={272} textAnchor="middle" fontSize={10} fill={MUTED}>
                    {item.sub}
                  </text>
                </motion.g>
              )
            })}
            <text x={240} y={286} textAnchor="middle" fontSize={9} fontWeight={600} fill={MUTED}>
              ten sam I_x, inny koszt materiałowy
            </text>
          </svg>
        </div>
      </div>
    )
  }

  if (solving) {
    const factor = 0.58 + 0.42 * progress
    const height = H * factor
    const top = BASE_Y - height
    const axisY = BASE_Y - height / 2
    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 480 300"
            role="img"
            aria-label="Prostokąt o stałej szerokości, którego wysokość rośnie do wymaganej wartości"
          >
            <rect
              x={CX - W / 2}
              y={TOP_Y}
              width={W}
              height={H}
              fill="none"
              stroke="#b7c0cb"
              strokeWidth={1.2}
              strokeDasharray="6 5"
            />
            <MainRectangle top={top} axisY={axisY} xActive yActive={false} showBDim showHDim />
            <text
              x={CX + W / 2 + 44}
              y={(top + BASE_Y) / 2 + 4}
              textAnchor="middle"
              fontSize={9}
              fontWeight={600}
              fill={INK}
              opacity={0.15 + 0.85 * smooth(clamp((progress - 0.6) / 0.35))}
              transform={`rotate(-90 ${CX + W / 2 + 44} ${(top + BASE_Y) / 2 + 4})`}
            >
              181,7 mm
            </text>
            <text x={CX} y={19} textAnchor="middle" fontSize={9} fontWeight={600} fill={ORANGE}>
              I_x = 40·10⁶ mm⁴
            </text>
          </svg>
        </div>
      </div>
    )
  }

  const activeY = BASE_Y - 4 - (BASE_Y - TOP_Y - 8) * progress
  const activeX = CX - W / 2 + 4 + (W - 8) * progress
  const yRatio = (activeY - AXIS_Y) / (H / 2)
  const yGauge = GX + GAUGE_DEPTH * yRatio * yRatio
  const xRatio = (activeX - CX) / (W / 2)
  const iyGaugeBase = 278
  const iyGaugeY = iyGaugeBase + 18 * xRatio * xRatio
  const iyGaugePoints = Array.from({ length: 25 }, (_, point) => {
    const t = -1 + (2 * point) / 24
    return [CX + (t * W) / 2, iyGaugeBase + 18 * t * t] as const
  })
  const iyGaugePath = iyGaugePoints.map(([x, y], point) => `${point === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
  const ixGaugePath = Array.from({ length: 25 }, (_, point) => {
    const t = -1 + (2 * point) / 24
    return `${point === 0 ? 'M' : 'L'} ${GX + GAUGE_DEPTH * t * t} ${AXIS_Y + (t * H) / 2}`
  }).join(' ')

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label="Prostokąt z pasami elementarnymi budującymi moment bezwładności względem osi x lub y"
        >
          <MainRectangle
            top={TOP_Y}
            axisY={AXIS_Y}
            xActive={metric === 'Ix' || index === 0}
            yActive={metric === 'Iy' || index === 0}
            showBDim={!iyStrips}
            showHDim={!iyStrips}
          />
          {index === 0 && (
            <text
              x={CX + W / 2 + 44}
              y={(TOP_Y + BASE_Y) / 2}
              textAnchor="middle"
              fontSize={9}
              fontWeight={600}
              fill={MUTED}
              transform={`rotate(-90 ${CX + W / 2 + 44} ${(TOP_Y + BASE_Y) / 2})`}
            >
              h = ?
            </text>
          )}
          {iyStrips && (
            <text x={CX} y={19} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
              b = 80 mm
            </text>
          )}

          {ixStrips && (
            <g>
              {horizontalLevels.map((t, level) => {
                const y = BASE_Y - H * t
                return (
                  <line
                    key={`horizontal-${level}`}
                    x1={CX - W / 2}
                    y1={y}
                    x2={CX + W / 2}
                    y2={y}
                    stroke={ORANGE}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    opacity={0.1 + 0.45 * Math.pow((y - AXIS_Y) / (H / 2), 2)}
                  />
                )
              })}
              <line
                x1={CX - W / 2}
                y1={activeY}
                x2={CX + W / 2}
                y2={activeY}
                stroke={ORANGE}
                strokeWidth={3.6}
                strokeLinecap="round"
              />
              <line
                x1={CX - W / 2 - 16}
                y1={AXIS_Y}
                x2={CX - W / 2 - 16}
                y2={activeY}
                stroke={ORANGE}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text
                x={CX - W / 2 - 22}
                y={(AXIS_Y + activeY) / 2 + 3}
                textAnchor="end"
                fontSize={9}
                fontWeight={600}
                fill={ORANGE}
              >
                y
              </text>
              <line x1={GX} y1={TOP_Y} x2={GX} y2={BASE_Y} stroke="#d7dde5" strokeWidth={1.1} />
              <path d={ixGaugePath} fill="none" stroke={ORANGE} strokeWidth={1.3} opacity={0.45} />
              <motion.circle
                cx={yGauge}
                cy={activeY}
                r={3.8}
                fill={ORANGE}
                animate={{ cx: yGauge, cy: activeY }}
                transition={{ duration: 0.12 }}
              />
              <line x1={GX} y1={activeY} x2={yGauge} y2={activeY} stroke={ORANGE} strokeWidth={1.2} />
              <text x={GX + GAUGE_DEPTH + 10} y={TOP_Y + 4} fontSize={9} fontWeight={600} fill={ORANGE}>
                y²
              </text>
            </g>
          )}

          {iyStrips && (
            <g>
              {verticalLevels.map((t, level) => {
                const x = CX - W / 2 + W * t
                return (
                  <line
                    key={`vertical-${level}`}
                    x1={x}
                    y1={TOP_Y}
                    x2={x}
                    y2={BASE_Y}
                    stroke={BLUE}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    opacity={0.1 + 0.45 * Math.pow((x - CX) / (W / 2), 2)}
                  />
                )
              })}
              <line
                x1={activeX}
                y1={TOP_Y}
                x2={activeX}
                y2={BASE_Y}
                stroke={BLUE}
                strokeWidth={3.6}
                strokeLinecap="round"
              />
              <line x1={CX} y1={268} x2={activeX} y2={268} stroke={BLUE} strokeWidth={1.2} strokeDasharray="4 3" />
              <text x={(CX + activeX) / 2} y={264} textAnchor="middle" fontSize={9} fontWeight={600} fill={BLUE}>
                x
              </text>
              <line
                x1={CX - W / 2}
                y1={iyGaugeBase}
                x2={CX + W / 2}
                y2={iyGaugeBase}
                stroke="#d7dde5"
                strokeWidth={1.1}
              />
              <path d={iyGaugePath} fill="none" stroke={BLUE} strokeWidth={1.3} opacity={0.45} />
              <line x1={activeX} y1={iyGaugeBase} x2={activeX} y2={iyGaugeY} stroke={BLUE} strokeWidth={1.2} />
              <motion.circle
                cx={activeX}
                cy={iyGaugeY}
                r={3.8}
                fill={BLUE}
                animate={{ cx: activeX, cy: iyGaugeY }}
                transition={{ duration: 0.12 }}
              />
              <text x={CX + W / 2 + 10} y={iyGaugeBase + 4} fontSize={9} fontWeight={600} fill={BLUE}>
                x²
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
