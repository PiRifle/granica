import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ORANGE = '#ff6b45'
const BLUE = '#4f6df5'
const INK = '#17202a'
const MUTED = '#87929d'
const STROKE = '#7d8fa5'
const FILL = '#eef3fa'
const SOLID = '#dfe6f2'

const CX = 206
const CY = 136
const R = 92
const INNER = 76.7
const GX = 344
const GAUGE_DEPTH = 52

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

const hSegments = (dy: number, outer: number, inner: number): Array<[number, number]> => {
  if (Math.abs(dy) > outer) return []
  const xo = Math.sqrt(outer * outer - dy * dy)
  const xi = Math.abs(dy) < inner ? Math.sqrt(inner * inner - dy * dy) : 0
  const segments: Array<[number, number]> =
    xi > 0
      ? [
          [-xo, -xi],
          [xi, xo],
        ]
      : [[-xo, xo]]
  return segments
}

const vSegments = (dx: number, outer: number, inner: number): Array<[number, number]> => {
  if (Math.abs(dx) > outer) return []
  const yo = Math.sqrt(outer * outer - dx * dx)
  const yi = Math.abs(dx) < inner ? Math.sqrt(inner * inner - dx * dx) : 0
  const segments: Array<[number, number]> =
    yi > 0
      ? [
          [-yo, -yi],
          [yi, yo],
        ]
      : [[-yo, yo]]
  return segments
}

const stripLevels = Array.from({ length: 15 }, (_, index) => -R + (2 * R * index) / 14)

function MainSection({
  xActive,
  yActive,
  ixStrips,
  iyStrips,
  showHole,
  holeProgress,
}: {
  xActive: boolean
  yActive: boolean
  ixStrips: boolean
  iyStrips: boolean
  showHole: boolean
  holeProgress: number
}) {
  const visible = Math.max(1, Math.ceil(holeProgress * stripLevels.length))

  return (
    <g>
      <circle cx={CX} cy={CY} r={R} fill={FILL} stroke={STROKE} strokeWidth={1.5} />
      <circle cx={CX} cy={CY} r={INNER} fill="#fff" stroke={STROKE} strokeWidth={1.4} />

      {ixStrips &&
        stripLevels.slice(0, showHole ? stripLevels.length : visible).map((dy, index) => {
          const segments = hSegments(dy, R, showHole ? 0 : INNER)
          return segments.map(([from, to], segmentIndex) => (
            <line
              key={`ix-strip-${index}-${segmentIndex}`}
              x1={CX + from}
              y1={CY + dy}
              x2={CX + to}
              y2={CY + dy}
              stroke={ORANGE}
              strokeWidth={2.6}
              strokeLinecap="round"
              opacity={showHole ? 0.16 : 0.1 + 0.45 * Math.pow(dy / R, 2)}
            />
          ))
        })}
      {iyStrips &&
        stripLevels.map((dx, index) =>
          vSegments(dx, R, INNER).map(([from, to], segmentIndex) => (
            <line
              key={`iy-strip-${index}-${segmentIndex}`}
              x1={CX + dx}
              y1={CY + from}
              x2={CX + dx}
              y2={CY + to}
              stroke={BLUE}
              strokeWidth={2.6}
              strokeLinecap="round"
              opacity={0.1 + 0.45 * Math.pow(dx / R, 2)}
            />
          )),
        )}

      {showHole && (
        <>
          <motion.circle
            cx={CX}
            cy={CY}
            animate={{ r: INNER * smooth(holeProgress) }}
            transition={{ duration: 0.2, ease: 'linear' }}
            fill="#fff"
            stroke={ORANGE}
            strokeWidth={1.8}
            strokeDasharray="5 4"
          />
          <text
            x={CX}
            y={CY + 4}
            textAnchor="middle"
            fontSize={14}
            fontWeight={600}
            fill={INK}
            opacity={0.2 + 0.8 * smooth(holeProgress)}
          >
            ∅100
          </text>
        </>
      )}

      {!showHole && (
        <text x={CX} y={CY + 4} textAnchor="middle" fontSize={12} fontWeight={600} fill={INK} opacity={0.82}>
          ∅100
        </text>
      )}

      <line
        x1={CX - R - 30}
        y1={CY}
        x2={CX + R + 30}
        y2={CY}
        stroke={xActive ? ORANGE : '#b7c0cb'}
        strokeWidth={xActive ? 2.4 : 1.2}
        strokeDasharray={xActive ? undefined : '6 4'}
      />
      <line
        x1={CX}
        y1={CY - R - 26}
        x2={CX}
        y2={CY + R + 26}
        stroke={yActive ? BLUE : '#b7c0cb'}
        strokeWidth={yActive ? 2.4 : 1.2}
        strokeDasharray={yActive ? undefined : '6 4'}
      />
      <text x={CX + R + 34} y={CY + 4} fontSize={11} fontWeight={600} fill={xActive ? ORANGE : MUTED}>
        x
      </text>
      <text x={CX + 6} y={CY - R - 8} fontSize={11} fontWeight={600} fill={yActive ? BLUE : MUTED}>
        y
      </text>

      <line x1={CX - R} y1={26} x2={CX + R} y2={26} stroke={STROKE} strokeWidth={1.2} />
      <line x1={CX - R} y1={20} x2={CX - R} y2={32} stroke={STROKE} strokeWidth={1.2} />
      <line x1={CX + R} y1={20} x2={CX + R} y2={32} stroke={STROKE} strokeWidth={1.2} />
      <text x={CX} y={17} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
        D = 120 mm
      </text>
      <circle cx={CX} cy={CY} r={3.5} fill={INK} />
      <text x={CX + 7} y={CY - 7} fontSize={10} fill={INK}>
        C
      </text>
    </g>
  )
}

export function PipeSecondMomentAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'section'
  const progress = playing ? smooth(clamp(sceneProgress)) : 1
  const compare = metric === 'compare' || index === 4
  const subtraction = metric === 'Ix' && index === 2
  const ixStrips = metric === 'Ix' && !compare
  const iyStrips = metric === 'Iy' && !compare
  const activeY = -R * 0.94 + progress * 1.88 * R
  const activeX = -R * 0.94 + progress * 1.88 * R
  const activeDist = Math.abs(activeY) / R
  const activeXDist = Math.abs(activeX) / R
  const gaugePath = `M ${GX} ${CY - R} Q ${GX + 2 * GAUGE_DEPTH} ${CY} ${GX} ${CY + R}`
  const gaugeX = GX + GAUGE_DEPTH * activeDist * activeDist
  const iyGaugeBase = 262
  const iyGaugePoints = Array.from({ length: 29 }, (_, point) => {
    const t = -1 + (2 * point) / 28
    return [CX + t * R, iyGaugeBase + 26 * t * t] as const
  })
  const iyGaugePath = iyGaugePoints.map(([x, y], point) => `${point === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')
  const iyGaugeY = iyGaugeBase + 26 * activeXDist * activeXDist

  if (compare) {
    const rMini = 68
    const innerMini = 56.7
    const miniLevels = Array.from({ length: 11 }, (_, level) => -rMini + (2 * rMini * level) / 10)
    const miniActive = -rMini * 0.9 + progress * 1.8 * rMini
    return (
      <div className={local('figure')}>
        <div className={local('figure-canvas')}>
          <svg
            viewBox="0 0 480 300"
            role="img"
            aria-label="Porównanie przekroju rurowego i pełnego pręta o tej samej średnicy zewnętrznej"
          >
            {[
              { cx: 145, inner: innerMini, label: 'rura', sub: 'D = 120, d = 100' },
              { cx: 335, inner: 0, label: 'pręt pełny', sub: 'D = 120' },
            ].map((item) => (
              <g key={item.label}>
                <circle
                  cx={item.cx}
                  cy={148}
                  r={rMini}
                  fill={item.inner ? FILL : SOLID}
                  stroke={STROKE}
                  strokeWidth={1.5}
                />
                {item.inner > 0 && (
                  <circle cx={item.cx} cy={148} r={item.inner} fill="#fff" stroke={STROKE} strokeWidth={1.3} />
                )}
                {miniLevels.map((dy, level) =>
                  hSegments(dy, rMini, item.inner).map(([from, to], segmentIndex) => (
                    <line
                      key={`${item.label}-strip-${level}-${segmentIndex}`}
                      x1={item.cx + from}
                      y1={148 + dy}
                      x2={item.cx + to}
                      y2={148 + dy}
                      stroke={ORANGE}
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      opacity={0.12 + 0.42 * Math.pow(dy / rMini, 2)}
                    />
                  )),
                )}
                {hSegments(miniActive, rMini, item.inner).map(([from, to], segmentIndex) => (
                  <line
                    key={`${item.label}-active-${segmentIndex}`}
                    x1={item.cx + from}
                    y1={148 + miniActive}
                    x2={item.cx + to}
                    y2={148 + miniActive}
                    stroke={ORANGE}
                    strokeWidth={3.2}
                    strokeLinecap="round"
                  />
                ))}
                <line
                  x1={item.cx - rMini - 18}
                  y1={148}
                  x2={item.cx + rMini + 18}
                  y2={148}
                  stroke={ORANGE}
                  strokeWidth={2.2}
                />
                <line
                  x1={item.cx}
                  y1={148 - rMini - 16}
                  x2={item.cx}
                  y2={148 + rMini + 16}
                  stroke={BLUE}
                  strokeWidth={1.2}
                  opacity={0.55}
                />
                <text x={item.cx + rMini + 22} y={152} fontSize={10} fontWeight={600} fill={ORANGE}>
                  x
                </text>
                <text x={item.cx} y={238} textAnchor="middle" fontSize={11} fontWeight={600} fill={INK}>
                  {item.label}
                </text>
                <text x={item.cx} y={252} textAnchor="middle" fontSize={9} fill={MUTED}>
                  {item.sub}
                </text>
              </g>
            ))}
            <text x={240} y={204} textAnchor="middle" fontSize={11} fontWeight={700} fill={MUTED}>
              vs
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
          aria-label="Przekrój rurowy z osią poziomą x i pionową y oraz pasami elementarnymi budującymi moment bezwładności"
        >
          <MainSection
            xActive={metric === 'Ix' || index === 0}
            yActive={metric === 'Iy' || index === 0}
            ixStrips={ixStrips}
            iyStrips={iyStrips}
            showHole={subtraction}
            holeProgress={progress}
          />

          {ixStrips && !subtraction && (
            <g>
              {hSegments(activeY, R, INNER).map(([from, to], segmentIndex) => (
                <line
                  key={`ix-active-${segmentIndex}`}
                  x1={CX + from}
                  y1={CY + activeY}
                  x2={CX + to}
                  y2={CY + activeY}
                  stroke={ORANGE}
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              ))}
              <line
                x1={CX - R - 20}
                y1={CY}
                x2={CX - R - 20}
                y2={CY + activeY}
                stroke={ORANGE}
                strokeWidth={1.2}
                strokeDasharray="4 3"
              />
              <text x={CX - R - 16} y={(CY + CY + activeY) / 2 + 3} fontSize={9} fontWeight={600} fill={ORANGE}>
                y
              </text>
              <line x1={GX} y1={CY - R} x2={GX} y2={CY + R} stroke="#d7dde5" strokeWidth={1.1} />
              <path d={gaugePath} fill="none" stroke={ORANGE} strokeWidth={1.3} opacity={0.45} />
              <line x1={GX} y1={CY + activeY} x2={gaugeX} y2={CY + activeY} stroke={ORANGE} strokeWidth={1.6} />
              <motion.circle
                cx={gaugeX}
                cy={CY + activeY}
                r={3.8}
                fill={ORANGE}
                animate={{ cx: gaugeX }}
                transition={{ duration: 0.12 }}
              />
              <text x={GX + GAUGE_DEPTH + 12} y={CY - R + 4} fontSize={9} fontWeight={600} fill={ORANGE}>
                y²
              </text>
            </g>
          )}

          {iyStrips && (
            <g>
              {vSegments(activeX, R, INNER).map(([from, to], segmentIndex) => (
                <line
                  key={`iy-active-${segmentIndex}`}
                  x1={CX + activeX}
                  y1={CY + from}
                  x2={CX + activeX}
                  y2={CY + to}
                  stroke={BLUE}
                  strokeWidth={4}
                  strokeLinecap="round"
                />
              ))}
              <line x1={CX} y1={246} x2={CX + activeX} y2={246} stroke={BLUE} strokeWidth={1.2} strokeDasharray="4 3" />
              <text x={(CX + CX + activeX) / 2} y={242} textAnchor="middle" fontSize={9} fontWeight={600} fill={BLUE}>
                x
              </text>
              <line x1={CX - R} y1={iyGaugeBase} x2={CX + R} y2={iyGaugeBase} stroke="#d7dde5" strokeWidth={1.1} />
              <path d={iyGaugePath} fill="none" stroke={BLUE} strokeWidth={1.3} opacity={0.45} />
              <line
                x1={CX + activeX}
                y1={iyGaugeBase}
                x2={CX + activeX}
                y2={iyGaugeY}
                stroke={BLUE}
                strokeWidth={1.6}
              />
              <motion.circle
                cx={CX + activeX}
                cy={iyGaugeY}
                r={3.8}
                fill={BLUE}
                animate={{ cy: iyGaugeY }}
                transition={{ duration: 0.12 }}
              />
              <text x={CX + R + 10} y={iyGaugeBase + 4} fontSize={9} fontWeight={600} fill={BLUE}>
                x²
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
