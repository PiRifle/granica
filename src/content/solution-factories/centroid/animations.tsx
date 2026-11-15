import { useId } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import type { CentroidConfig } from './configs'
import { pl } from '../core/source-task'

const INK = '#17202a'
const MUTED = '#87929d'
const AXIS = '#9aa5b1'
const EDGE = '#68727e'
const ACCENT = '#4f6df5'
const MATERIAL = '#dfe7ff'
const CAP_FILL = '#dbe6ff'
const BASE_FILL = '#d9f0e2'
const STRIP_FILL = '#ece0fb'
const CAP_EDGE = '#4f6df5'
const BASE_EDGE = '#2f7d5b'
const STRIP_EDGE = '#8b5cc7'
const CUT = '#b56b3a'
const CUT_FILL = '#fdf2ec'
const OK = '#2f7d5b'
const RESULT = '#ff6b45'

function figureOneGeometry(config: CentroidConfig) {
  const a = config.a
  const d = config.d ?? 1
  const sagitta = 15
  const totalHeight = 2 * a + sagitta
  const left = 70
  const right = 420
  const top = 22
  const bottom = 280
  const scale = Math.min((right - left) / d, (bottom - top) / totalHeight)
  const padX = (right - left - d * scale) / 2
  const padY = (bottom - top - totalHeight * scale) / 2
  const originX = left + padX
  const originY = top + padY + (a + sagitta) * scale
  const sx = (x: number) => originX + x * scale
  const sy = (y: number) => originY - y * scale

  const radius = ((d * d) / 4 + sagitta * sagitta) / (2 * sagitta)
  const centerY = a + sagitta - radius
  const theta = Math.asin((a - centerY) / radius)
  const steps = 48
  const arc = Array.from({ length: steps + 1 }, (_, index) => {
    const angle = Math.PI - theta - ((Math.PI - 2 * theta) * index) / steps
    return { x: d / 2 + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) }
  })
  const capPath = `M ${sx(0).toFixed(2)} ${sy(a).toFixed(2)} ${arc
    .map((point) => `L ${sx(point.x).toFixed(2)} ${sy(point.y).toFixed(2)}`)
    .join(' ')} Z`

  return { a, d, sagitta, scale, originX, originY, sx, sy, capPath }
}

export function FigureOneCentroidAnimation({
  config,
  index,
  playing,
  sceneProgress,
}: SolutionAnimationProps & { config: CentroidConfig }) {
  const geometry = figureOneGeometry(config)
  const { a, d, sagitta, originX, originY, sx, sy, capPath } = geometry
  const [cap, base, strip] = config.parts
  const notch = d - 2 * a - 2
  const showParts = index >= 1
  const showAreas = index === 2
  const showArmsX = index === 3
  const showArmsY = index === 4
  const showCentroidX = index >= 5
  const showCentroidY = index >= 6
  const showCentroidLabel = index >= 6
  const showCheck = index >= 7
  const centroid = config.centroid
  const centroidPoint = { x: sx(centroid.x), y: sy(centroid.y) }
  const status =
    [
      `Figura 1: czasza d = ${pl(d)} mm (h = 15), podstawa 2a × a = ${pl(2 * a)} × ${pl(a)}, listwa 2 × 2a = 2 × ${pl(2 * a)}, wycięcie ${pl(notch)} × ${pl(a)}`,
      'Podział: 1 czasza, 2 lewa podstawa, 3 prawa listwa — pola dodatnie, wycięcie jest puste',
      `Pola: A1 = ${pl(cap.area)} + A2 = ${pl(base.area)} + A3 = ${pl(strip.area)} = ${pl(config.area)} mm²`,
      `Q_y = ${pl(config.moments.qy)} mm³ — ramiona x_c, x_L, x_P mierzone od osi y`,
      `Q_x = ${pl(config.moments.qx)} mm³ — ramiona y_c, y_L mierzone od osi x; listwa leży na osi (y = 0)`,
      `x_C = Q_y / A = ${pl(config.moments.qy)} / ${pl(config.area)} = ${pl(centroid.x)} mm`,
      `Centroid C = (${pl(centroid.x)}; ${pl(centroid.y)}) mm`,
      'Kontrola: ΣA_i(x_i − x_C) = 0 i ΣA_i(y_i − y_C) = 0; A·x_C = Q_y, A·y_C = Q_x',
    ][index] ?? ''

  const armParts = [
    { part: cap, color: CAP_EDGE },
    { part: base, color: BASE_EDGE },
    { part: strip, color: STRIP_EDGE },
  ]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid figury 1 — czasza, podstawa i listwa">
          <title>Figura 1 — czasza kołowa z wycięciem i centroid</title>
          <desc>
            Czasza kołowa o cięciwie d i strzałce 15 mm, lewa podstawa 2a × a, prawa listwa 2 × 2a, prostokątne
            wycięcie, pola, momenty i centroid.
          </desc>

          <path d={capPath} fill={CAP_FILL} stroke={CAP_EDGE} strokeWidth="1.6" strokeLinejoin="round" />
          <rect
            x={sx(0)}
            y={sy(a)}
            width={2 * a * geometry.scale}
            height={a * geometry.scale}
            fill={BASE_FILL}
            stroke={BASE_EDGE}
            strokeWidth="1.6"
          />
          <rect
            x={sx(d - 2)}
            y={sy(a)}
            width={2 * geometry.scale}
            height={2 * a * geometry.scale}
            fill={STRIP_FILL}
            stroke={STRIP_EDGE}
            strokeWidth="1.6"
          />
          <rect
            x={sx(2 * a)}
            y={sy(a)}
            width={(d - 2 - 2 * a) * geometry.scale}
            height={a * geometry.scale}
            fill={CUT_FILL}
            stroke={CUT}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />

          <line
            x1={sx(0) - 12}
            y1={originY}
            x2={sx(d) + 16}
            y2={originY}
            stroke={AXIS}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <line
            x1={originX}
            y1={sy(-a) - 10}
            x2={originX}
            y2={sy(a + sagitta) + 10}
            stroke={AXIS}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />

          {showParts && (
            <motion.rect
              x={sx(2 * a)}
              y={sy(a)}
              width={(d - 2 - 2 * a) * geometry.scale}
              height={a * geometry.scale}
              fill="none"
              stroke={CUT}
              strokeWidth="2"
              strokeDasharray="6 5"
              initial={false}
              animate={{ opacity: index === 1 ? 1 : 0.35, strokeDashoffset: playing ? [0, 22] : 0 }}
              transition={{
                opacity: { duration: 0.3 },
                strokeDashoffset: { duration: 1.4, repeat: playing ? Infinity : 0, ease: 'linear' },
              }}
            />
          )}

          <g stroke={MUTED} fill={MUTED} strokeWidth="1">
            <line x1={sx(0) - 22} y1={sy(a)} x2={sx(0) - 10} y2={sy(a)} />
            <line x1={sx(0) - 22} y1={sy(a + sagitta)} x2={sx(0) - 10} y2={sy(a + sagitta)} />
            <line x1={sx(0) - 16} y1={sy(a)} x2={sx(0) - 16} y2={sy(a + sagitta)} />
            <line
              x1={sx(0) - 6}
              y1={sy(a + sagitta)}
              x2={sx(d / 2)}
              y2={sy(a + sagitta)}
              strokeDasharray="4 3"
              opacity="0.7"
            />

            <line x1={sx(0) - 22} y1={sy(0)} x2={sx(0) - 10} y2={sy(0)} />
            <line x1={sx(0) - 22} y1={sy(a)} x2={sx(0) - 10} y2={sy(a)} />
            <line x1={sx(0) - 16} y1={sy(0)} x2={sx(0) - 16} y2={sy(a)} />

            <line x1={sx(0)} y1={sy(0) + 20} x2={sx(2 * a)} y2={sy(0) + 20} />
            <line x1={sx(0)} y1={sy(0) + 16} x2={sx(0)} y2={sy(0) + 24} />
            <line x1={sx(2 * a)} y1={sy(0) + 16} x2={sx(2 * a)} y2={sy(0) + 24} />

            <line x1={sx(0)} y1={sy(-a) + 22} x2={sx(d)} y2={sy(-a) + 22} />
            <line x1={sx(0)} y1={sy(-a) + 18} x2={sx(0)} y2={sy(-a) + 26} />
            <line x1={sx(d)} y1={sy(-a) + 18} x2={sx(d)} y2={sy(-a) + 26} />

            <line x1={sx(d) + 12} y1={sy(a)} x2={sx(d) + 12} y2={sy(-a)} />
            <line x1={sx(d) + 8} y1={sy(a)} x2={sx(d) + 16} y2={sy(a)} />
            <line x1={sx(d) + 8} y1={sy(-a)} x2={sx(d) + 16} y2={sy(-a)} />

            <line x1={sx(d - 2)} y1={sy(a) - 8} x2={sx(d)} y2={sy(a) - 8} />
            <line x1={sx(d - 2)} y1={sy(a) - 12} x2={sx(d - 2)} y2={sy(a) - 4} />
            <line x1={sx(d)} y1={sy(a) - 12} x2={sx(d)} y2={sy(a) - 4} />
          </g>

          {showParts && (
            <g>
              <circle cx={sx(cap.x)} cy={sy(cap.y)} r="7" fill={CAP_EDGE} />
              <circle cx={sx(base.x)} cy={sy(base.y)} r="7" fill={BASE_EDGE} />
              <circle cx={sx(strip.x)} cy={sy(strip.y)} r="7" fill={STRIP_EDGE} />
            </g>
          )}

          {showArmsX && (
            <g strokeWidth="1.3" strokeDasharray="4 3" opacity="0.85">
              {armParts.map(({ part, color }, armIndex) => (
                <line
                  key={`arm-x-${armIndex}`}
                  x1={sx(0)}
                  y1={sy(part.y)}
                  x2={sx(part.x)}
                  y2={sy(part.y)}
                  stroke={color}
                />
              ))}
            </g>
          )}
          {showArmsY && (
            <g strokeWidth="1.3" strokeDasharray="4 3" opacity="0.85">
              {armParts.map(({ part, color }, armIndex) =>
                part.y !== 0 ? (
                  <line
                    key={`arm-y-${armIndex}`}
                    x1={sx(part.x)}
                    y1={sy(0)}
                    x2={sx(part.x)}
                    y2={sy(part.y)}
                    stroke={color}
                  />
                ) : (
                  <circle key={`arm-y-${armIndex}`} cx={sx(part.x)} cy={sy(0)} r="3" fill={color} stroke="none" />
                ),
              )}
            </g>
          )}

          {showCentroidX && (
            <line
              x1={centroidPoint.x}
              y1={sy(0)}
              x2={centroidPoint.x}
              y2={centroidPoint.y}
              stroke={RESULT}
              strokeWidth="1.3"
              strokeDasharray="5 4"
            />
          )}
          {showCentroidY && (
            <line
              x1={sx(0)}
              y1={centroidPoint.y}
              x2={centroidPoint.x}
              y2={centroidPoint.y}
              stroke={RESULT}
              strokeWidth="1.3"
              strokeDasharray="5 4"
            />
          )}

          <motion.g
            initial={false}
            animate={{
              x: index >= 6 ? 0 : sx(0) - centroidPoint.x,
              y: index >= 6 ? 0 : originY - centroidPoint.y,
              opacity: index >= 6 ? 1 : 0,
            }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <circle
              cx={centroidPoint.x}
              cy={centroidPoint.y}
              r="6.4"
              fill="#ffffff"
              stroke={showCheck ? OK : RESULT}
              strokeWidth="2.4"
            />
            <line
              x1={centroidPoint.x - 13}
              y1={centroidPoint.y}
              x2={centroidPoint.x + 13}
              y2={centroidPoint.y}
              stroke={showCheck ? OK : RESULT}
              strokeWidth="1.4"
            />
            <line
              x1={centroidPoint.x}
              y1={centroidPoint.y - 13}
              x2={centroidPoint.x}
              y2={centroidPoint.y + 13}
              stroke={showCheck ? OK : RESULT}
              strokeWidth="1.4"
            />
          </motion.g>

          <g fontSize="11" fill={INK}>
            <text x={sx(d) + 2} y={originY + 14}>
              x
            </text>
            <text x={originX + 7} y={sy(a + sagitta) - 5}>
              y
            </text>
            <text x={originX - 9} y={originY + 16}>
              O
            </text>
          </g>

          <g fill={MUTED} fontSize="9.5">
            <text x={sx(0) - 26} y={sy(a + sagitta / 2) + 3} textAnchor="end">
              15
            </text>
            <text x={sx(0) - 26} y={sy(a / 2) + 3} textAnchor="end">
              a
            </text>
            <text x={sx(a)} y={sy(0) + 15} textAnchor="middle">
              2a
            </text>
            <text x={sx(d / 2)} y={sy(-a) + 18} textAnchor="middle">
              d
            </text>
            <text x={sx(d) + 18} y={sy(0) + 3}>
              2a
            </text>
            <text x={sx(d - 1)} y={sy(a) - 11} textAnchor="middle">
              2
            </text>
          </g>

          {showParts && (
            <g fill="#ffffff" fontSize="9" fontWeight="700" textAnchor="middle">
              <text x={sx(cap.x)} y={sy(cap.y) + 3.2}>
                1
              </text>
              <text x={sx(base.x)} y={sy(base.y) + 3.2}>
                2
              </text>
              <text x={sx(strip.x)} y={sy(strip.y) + 3.2}>
                3
              </text>
            </g>
          )}

          {showAreas && (
            <g fontSize="9" fill={INK} fontWeight="600">
              <text x={sx(cap.x)} y={sy(cap.y) + 19} textAnchor="middle" fill={CAP_EDGE}>
                A1 = {pl(cap.area)}
              </text>
              <text x={sx(base.x)} y={sy(base.y) + 19} textAnchor="middle" fill={BASE_EDGE}>
                A2 = {pl(base.area)}
              </text>
              <text x={sx(d - 2) - 7} y={sy(0) - 7} textAnchor="end" fill={STRIP_EDGE}>
                A3 = {pl(strip.area)}
              </text>
            </g>
          )}

          {index === 5 && (
            <text x={centroidPoint.x + 8} y={sy(0) - 10} fontSize="10" fill={RESULT} fontWeight="600">
              x_C = {pl(centroid.x)} mm
            </text>
          )}
          {index === 6 && (
            <text x={sx(0) + 8} y={centroidPoint.y - 7} fontSize="10" fill={RESULT} fontWeight="600">
              y_C = {pl(centroid.y)} mm
            </text>
          )}
          {showCentroidLabel && (
            <text
              x={centroidPoint.x + 12}
              y={centroidPoint.y + 15}
              fontSize="11"
              fontWeight="700"
              fill={showCheck ? OK : RESULT}
            >
              C = ({pl(centroid.x)}; {pl(centroid.y)}) mm
            </text>
          )}

          <text x="230" y="328" textAnchor="middle" fontSize="9.3" fill={INK}>
            {status}
          </text>
        </svg>
      </div>
    </div>
  )
}

function figureTwoGeometry() {
  const radius = 25
  const left = 25
  const right = 455
  const top = 18
  const bottom = 306
  const scale = Math.min((right - left) / (2 * radius), (bottom - top) / (2 * radius))
  const centerX = (left + right) / 2
  const centerY = (top + bottom) / 2
  const sx = (x: number) => centerX + x * scale
  const sy = (y: number) => centerY - y * scale
  return { radius, scale, centerX, centerY, sx, sy }
}

export function FigureTwoCentroidAnimation({
  config,
  index,
  playing,
  sceneProgress,
}: SolutionAnimationProps & { config: CentroidConfig }) {
  const id = useId().replace(/[:]/g, '')
  const hatchId = `e2-hatch-${id}`
  const arrowId = `e2-arrow-${id}`
  const geometry = figureTwoGeometry()
  const { radius, scale, centerX, centerY, sx, sy } = geometry
  const a = config.a
  const [, rectangle, triangle] = config.parts
  const rectangleArea = Math.abs(rectangle.area)
  const triangleArea = Math.abs(triangle.area)
  const cutArea = rectangleArea + triangleArea
  const removedX = (rectangleArea * rectangle.x + triangleArea * triangle.x) / cutArea
  const removedY = (rectangleArea * rectangle.y + triangleArea * triangle.y) / cutArea
  const centroid = config.centroid
  const showParts = index >= 1 && index <= 2
  const showCutCentroid = index === 3
  const showInset = index >= 4
  const showCentroid = index >= 6
  const showCheck = index >= 7
  const progress = playing ? Math.min(1, Math.max(0, sceneProgress)) : 1
  const status =
    [
      `Koło R = 25 mm; wycięcie 2a × a = ${pl(2 * a)} × ${pl(a)} mm, ścięcie 45°; pas materiału 5 mm nad wycięciem`,
      'Podział: koło dodatnie, wycięcie = prostokąt 2a × a + trójkąt ścięcia a²/2 (ujemne)',
      `Pola: A_k = ${pl(config.parts[0].area)} mm², A_p = ${pl(rectangleArea)} mm², A_t = ${pl(triangleArea)} mm²; A = ${pl(config.area)} mm²`,
      `Wycięcie: A_w = ${pl(cutArea)} mm², x_w = ${pl(removedX)} mm, y_w = ${pl(removedY)} mm; Q_y = ${pl(config.moments.qy)} mm³, Q_x = ${pl(config.moments.qx)} mm³`,
      `x_C = Q_y / A = ${pl(config.moments.qy)} / ${pl(config.area)} = ${pl(centroid.x)} mm — przesunięcie w lewo`,
      `y_C = Q_x / A = ${pl(config.moments.qx)} / ${pl(config.area)} = ${pl(centroid.y)} mm — przesunięcie w dół`,
      `C = (${pl(centroid.x)}; ${pl(centroid.y)}) mm ≈ O; ubytek w I i II ćwiartce`,
      'Kontrola: ΣA_i(x_i − x_C) = 0 i ΣA_i(y_i − y_C) = 0; A·x_C = Q_y, A·y_C = Q_x',
    ][index] ?? ''

  const cutoutPath = `M ${sx(-a).toFixed(2)} ${sy(0).toFixed(2)} L ${sx(0).toFixed(2)} ${sy(a).toFixed(2)} L ${sx(2 * a).toFixed(2)} ${sy(a).toFixed(2)} L ${sx(2 * a).toFixed(2)} ${sy(0).toFixed(2)} Z`
  const inset = { x: 6, y: 6, width: 104, height: 82, cx: 58, cy: 50, scale: 80 }
  const insetCentroid = { x: inset.cx + centroid.x * inset.scale, y: inset.cy - centroid.y * inset.scale }
  const leaderStart = { x: centerX, y: centerY }
  const leaderEnd = { x: inset.x + inset.width, y: inset.y + inset.height }
  const cutCentroid = { x: sx(removedX), y: sy(removedY) }
  const viewCentroid = { x: sx(centroid.x), y: sy(centroid.y) }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Centroid koła z wycięciem i ścięciem 45 stopni">
          <title>Figura 2 — koło R25 z wycięciem i ścięciem</title>
          <desc>
            Koło o promieniu 25 mm, wycięcie 2a × a przy osi x, ścięcie 45°, pas materiału 5 mm, pola, momenty, centroid
            i powiększenie małego przesunięcia.
          </desc>
          <defs>
            <pattern id={hatchId} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="7" stroke={CUT} strokeWidth="1" opacity="0.35" />
            </pattern>
            <marker id={arrowId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={MUTED} />
            </marker>
          </defs>

          <circle cx={centerX} cy={centerY} r={radius * scale} fill={MATERIAL} stroke={EDGE} strokeWidth="1.8" />

          <path d={cutoutPath} fill="#ffffff" stroke={CUT} strokeWidth="1.6" strokeLinejoin="round" />
          <path d={cutoutPath} fill={`url(#${hatchId})`} stroke="none" />

          <line
            x1={centerX - radius * scale - 12}
            y1={centerY}
            x2={centerX + radius * scale + 12}
            y2={centerY}
            stroke={AXIS}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <line
            x1={centerX}
            y1={centerY - radius * scale - 12}
            x2={centerX}
            y2={centerY + radius * scale + 12}
            stroke={AXIS}
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />

          <g stroke={MUTED} fill={MUTED} strokeWidth="1">
            <line x1={sx(0)} y1={sy(a) - 10} x2={sx(2 * a)} y2={sy(a) - 10} />
            <line x1={sx(0)} y1={sy(a) - 14} x2={sx(0)} y2={sy(a) - 6} />
            <line x1={sx(2 * a)} y1={sy(a) - 14} x2={sx(2 * a)} y2={sy(a) - 6} />
            <line x1={sx(2 * a) + 32} y1={sy(0)} x2={sx(2 * a) + 32} y2={sy(a)} />
            <line x1={sx(2 * a) + 28} y1={sy(0)} x2={sx(2 * a) + 36} y2={sy(0)} />
            <line x1={sx(2 * a) + 28} y1={sy(a)} x2={sx(2 * a) + 36} y2={sy(a)} />
            <line x1={sx(2 * a) + 32} y1={sy(a)} x2={sx(2 * a) + 32} y2={sy(a + 5)} />
            <line x1={sx(2 * a) + 28} y1={sy(a + 5)} x2={sx(2 * a) + 36} y2={sy(a + 5)} />
            <line x1={sx(0)} y1={sy(a + 5)} x2={sx(2 * a) + 32} y2={sy(a + 5)} strokeDasharray="4 3" opacity="0.55" />
          </g>

          <path
            d={`M ${sx(-a) + 14} ${sy(0)} A 14 14 0 0 0 ${sx(-a) + 14 * Math.SQRT1_2} ${sy(0) - 14 * Math.SQRT1_2}`}
            fill="none"
            stroke={CUT}
            strokeWidth="1.1"
          />

          <line
            x1="42"
            y1="252"
            x2={sx(-20.49)}
            y2={sy(-14.34)}
            stroke={MUTED}
            strokeWidth="1.1"
            markerEnd={`url(#${arrowId})`}
          />

          {showParts && (
            <g>
              <circle cx={centerX} cy={centerY} r="6" fill="#ffffff" stroke={ACCENT} strokeWidth="1.6" />
              <circle cx={sx(a)} cy={sy(a / 2)} r="6" fill="#ffffff" stroke={CUT} strokeWidth="1.6" />
              <circle cx={sx(-a / 3)} cy={sy(a / 3)} r="6" fill="#ffffff" stroke={CUT} strokeWidth="1.6" />
            </g>
          )}

          {showCutCentroid && (
            <g>
              <line
                x1={sx(0)}
                y1={cutCentroid.y}
                x2={cutCentroid.x}
                y2={cutCentroid.y}
                stroke={ACCENT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <line
                x1={cutCentroid.x}
                y1={sy(0)}
                x2={cutCentroid.x}
                y2={cutCentroid.y}
                stroke={ACCENT}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <circle cx={cutCentroid.x} cy={cutCentroid.y} r="6" fill="#ffffff" stroke={ACCENT} strokeWidth="1.8" />
            </g>
          )}

          {showInset && (
            <g>
              <line
                x1={leaderStart.x}
                y1={leaderStart.y}
                x2={leaderEnd.x}
                y2={leaderEnd.y}
                stroke={MUTED}
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <rect
                x={inset.x}
                y={inset.y}
                width={inset.width}
                height={inset.height}
                rx="9"
                fill="#ffffff"
                stroke={AXIS}
                strokeWidth="1.1"
              />
              <line
                x1={inset.x + 12}
                y1={inset.cy}
                x2={inset.x + inset.width - 12}
                y2={inset.cy}
                stroke={AXIS}
                strokeWidth="1"
              />
              <line
                x1={inset.cx}
                y1={inset.y + 24}
                x2={inset.cx}
                y2={inset.y + inset.height - 12}
                stroke={AXIS}
                strokeWidth="1"
              />
              <circle cx={inset.cx} cy={inset.cy} r="2.4" fill={MUTED} />
              {index === 4 && (
                <line
                  x1={insetCentroid.x}
                  y1={inset.cy}
                  x2={insetCentroid.x}
                  y2={insetCentroid.y}
                  stroke={RESULT}
                  strokeWidth="1.2"
                  strokeDasharray="3 2"
                />
              )}
              {index === 5 && (
                <line
                  x1={inset.cx}
                  y1={insetCentroid.y}
                  x2={insetCentroid.x}
                  y2={insetCentroid.y}
                  stroke={RESULT}
                  strokeWidth="1.2"
                  strokeDasharray="3 2"
                />
              )}
              {index >= 6 && (
                <>
                  <line
                    x1={insetCentroid.x}
                    y1={inset.cy}
                    x2={insetCentroid.x}
                    y2={insetCentroid.y}
                    stroke={RESULT}
                    strokeWidth="1.1"
                    strokeDasharray="3 2"
                  />
                  <line
                    x1={inset.cx}
                    y1={insetCentroid.y}
                    x2={insetCentroid.x}
                    y2={insetCentroid.y}
                    stroke={RESULT}
                    strokeWidth="1.1"
                    strokeDasharray="3 2"
                  />
                </>
              )}
              <circle
                cx={insetCentroid.x}
                cy={insetCentroid.y}
                r="3.8"
                fill="#ffffff"
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.8"
              />
            </g>
          )}

          {showCentroid && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <circle
                cx={viewCentroid.x}
                cy={viewCentroid.y}
                r="5"
                fill="#ffffff"
                stroke={showCheck ? OK : RESULT}
                strokeWidth="2.2"
              />
              <line
                x1={viewCentroid.x - 11}
                y1={viewCentroid.y}
                x2={viewCentroid.x + 11}
                y2={viewCentroid.y}
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.2"
              />
              <line
                x1={viewCentroid.x}
                y1={viewCentroid.y - 11}
                x2={viewCentroid.x}
                y2={viewCentroid.y + 11}
                stroke={showCheck ? OK : RESULT}
                strokeWidth="1.2"
              />
            </motion.g>
          )}

          <g fontSize="11" fill={INK}>
            <text x={centerX + radius * scale + 16} y={centerY - 7}>
              x
            </text>
            <text x={centerX + 7} y={centerY - radius * scale - 4}>
              y
            </text>
            <text x={centerX - 11} y={centerY + 16}>
              O
            </text>
          </g>

          <g fill={MUTED} fontSize="9.5">
            <text x={sx(a)} y={sy(a) - 14} textAnchor="middle">
              2a
            </text>
            <text x={sx(2 * a) + 40} y={sy(a / 2) + 3}>
              a
            </text>
            <text x={sx(2 * a) + 40} y={sy(a + 2.5) + 3}>
              5
            </text>
            <text x="42" y="256" fontSize="10">
              R25
            </text>
            <text x={sx(-a * 0.55) - 8} y={sy(a * 0.18) + 3} textAnchor="end" fontSize="9" fill={CUT}>
              45°
            </text>
          </g>

          {showParts && (
            <g fontSize="8.5" fontWeight="700" textAnchor="middle" fill={INK}>
              <text x={centerX} y={centerY + 3}>
                k
              </text>
              <text x={sx(a)} y={sy(a / 2) + 3}>
                p
              </text>
              <text x={sx(-a / 3)} y={sy(a / 3) + 3}>
                t
              </text>
            </g>
          )}

          {showCutCentroid && (
            <text x={cutCentroid.x + 8} y={cutCentroid.y - 5} fontSize="9.5" fill={ACCENT} fontWeight="700">
              w
            </text>
          )}

          {showInset && (
            <g fontSize="8.5" fill={INK}>
              <text x={inset.cx} y={inset.y + 15} textAnchor="middle" fontSize="8" fill={MUTED}>
                powiększenie
              </text>
              <text
                x={insetCentroid.x + 6}
                y={insetCentroid.y + 3}
                fontSize="9"
                fontWeight="700"
                fill={showCheck ? OK : RESULT}
              >
                C
              </text>
              <text x={inset.x + 2} y={inset.y + inset.height + 14} fill={RESULT}>
                x_C = {pl(centroid.x)} mm
              </text>
              <text x={inset.x + 2} y={inset.y + inset.height + 26} fill={RESULT}>
                y_C = {pl(centroid.y)} mm
              </text>
            </g>
          )}

          {showCentroid && (
            <text
              x={viewCentroid.x + 9}
              y={viewCentroid.y - 8}
              fontSize="9.5"
              fontWeight="700"
              fill={showCheck ? OK : RESULT}
            >
              C
            </text>
          )}

          <text x="230" y="328" textAnchor="middle" fontSize="9.3" fill={INK}>
            {status}
          </text>

          {showCentroid && (
            <motion.circle
              cx={viewCentroid.x}
              cy={viewCentroid.y}
              r="8"
              fill="none"
              stroke={showCheck ? OK : RESULT}
              strokeWidth="1.4"
              initial={false}
              animate={playing && progress < 1 ? { r: [8, 13, 8], opacity: [0.55, 0, 0.55] } : { opacity: 0 }}
              transition={{ duration: 1.8, repeat: playing && progress < 1 ? Infinity : 0, ease: 'easeInOut' }}
            />
          )}
        </svg>
      </div>
    </div>
  )
}
