import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const WEB = '#dfe6f2'
const FLANGE = '#edf1ff'
const EDGE = '#7d8fa5'
const AXIS = '#6d7a88'
const MUTED = '#9aa5b1'
const I1 = '#d84f28'
const I2 = '#4f6df5'
const ANGLE = '#2e9e6b'
const INK = '#17202a'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const rad = (degrees: number) => (degrees * Math.PI) / 180

const SCALE = 1.75
const ORIGIN = { x: 116, y: 250 }
const px = (x: number) => ORIGIN.x + x * SCALE
const py = (y: number) => ORIGIN.y - y * SCALE
const CX = px(60)
const CY = py(82.73)
const AXIS_LENGTH = 88

const point = (degrees: number, length = AXIS_LENGTH) => ({
  x: CX + length * Math.cos(rad(degrees)),
  y: CY - length * Math.sin(rad(degrees)),
})

const arcPath = (start: number, end: number, radius: number) => {
  const a = point(start, radius)
  const b = point(end, radius)
  const large = Math.abs(end - start) > 180 ? 1 : 0
  const sweep = end > start ? 0 : 1
  return `M${a.x} ${a.y} A${radius} ${radius} 0 ${large} ${sweep} ${b.x} ${b.y}`
}

export function SymmetricSectionAxesAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'section'
  const progress = smooth(playing ? sceneProgress : 1)
  const showAxes = metric !== 'section'
  const rotating = metric === 'rotate'
  const principal = metric === 'principal'
  const angle = rotating ? 18 * (1 - progress) : 0
  const coupling = Math.abs(Math.sin(rad(2 * angle)))
  const p1 = point(angle)
  const p2 = point(angle - 90)
  const p1Back = point(angle + 180)
  const p2Back = point(angle + 90)

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Przekrój teowy z pionową osią symetrii. Animacja pokazuje środek ciężkości, centralne osie, zerowy moment dewiacyjny oraz pokrycie osi głównych z osiami symetrii dla kąta zero stopni."
        >
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
            <motion.rect
              x={px(50)}
              y={py(100)}
              width={20 * SCALE}
              height={100 * SCALE}
              fill={WEB}
              stroke={EDGE}
              strokeWidth={1.6}
              initial={{ opacity: 0.25 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.rect
              x={px(0)}
              y={py(120)}
              width={120 * SCALE}
              height={20 * SCALE}
              fill={FLANGE}
              stroke={EDGE}
              strokeWidth={1.6}
              initial={{ opacity: 0.25 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            />
            <text x={CX} y={py(110) + 4} textAnchor="middle" fontSize={9} fill={EDGE}>
              półka
            </text>
            <text x={CX} y={py(50) + 4} textAnchor="middle" fontSize={9} fill={EDGE}>
              środnik
            </text>
          </motion.g>

          <g stroke={MUTED} fill={MUTED} strokeWidth={1}>
            <line x1={px(0)} y1={py(0) + 16} x2={px(120)} y2={py(0) + 16} />
            <line x1={px(0)} y1={py(0) + 10} x2={px(0)} y2={py(0) + 22} />
            <line x1={px(120)} y1={py(0) + 10} x2={px(120)} y2={py(0) + 22} />
            <text x={CX} y={py(0) + 30} textAnchor="middle" fontSize={10} stroke="none">
              120 mm
            </text>
            <line x1={px(0) - 16} y1={py(0)} x2={px(0) - 16} y2={py(120)} />
            <line x1={px(0) - 22} y1={py(0)} x2={px(0) - 10} y2={py(0)} />
            <line x1={px(0) - 22} y1={py(120)} x2={px(0) - 10} y2={py(120)} />
            <text x={px(0) - 24} y={py(60)} textAnchor="end" fontSize={10} stroke="none">
              120 mm
            </text>
          </g>

          {metric === 'section' && (
            <text x={14} y={24} fontSize={10} fill={MUTED}>
              A = 4400 mm²
            </text>
          )}

          <g stroke={I2} strokeWidth={1.3} strokeDasharray="7 4" opacity={metric === 'moments' ? 0.35 : 0.7}>
            <line x1={CX} y1={py(0)} x2={CX} y2={py(120)} />
          </g>
          {metric === 'section' && (
            <text x={CX + 7} y={py(120) - 8} fontSize={9} fill={I2}>
              oś symetrii
            </text>
          )}

          {showAxes && (
            <g
              stroke={AXIS}
              strokeWidth={metric === 'moments' ? 1.8 : 1.2}
              strokeDasharray={metric === 'moments' ? undefined : '6 4'}
            >
              <line x1={CX - AXIS_LENGTH} y1={CY} x2={CX + AXIS_LENGTH} y2={CY} opacity={rotating ? 0.35 : 0.9} />
              <line x1={CX} y1={CY - AXIS_LENGTH} x2={CX} y2={CY + AXIS_LENGTH} opacity={rotating ? 0.35 : 0.9} />
            </g>
          )}

          {showAxes && !rotating && !principal && (
            <g fontSize={10} fill={AXIS}>
              <text x={CX + AXIS_LENGTH + 5} y={CY + 3}>
                x
              </text>
              <text x={CX + 5} y={CY - AXIS_LENGTH - 5}>
                y
              </text>
            </g>
          )}

          {metric === 'centroid' && (
            <g>
              <motion.circle
                cx={CX}
                cy={CY}
                r={4.5}
                fill={INK}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              <text x={CX + 9} y={CY - 8} fontSize={10} fill={INK}>
                C
              </text>
              <text x={14} y={238} fontSize={9} fill={MUTED}>
                x_C = 60 mm
              </text>
              <text x={14} y={253} fontSize={9} fill={MUTED}>
                y_C = 82,73 mm
              </text>
            </g>
          )}

          {metric === 'moments' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <text x={CX + AXIS_LENGTH - 2} y={CY - 10} textAnchor="end" fontSize={10} fill={INK}>
                I_x = 5,674·10⁶ mm⁴
              </text>
              <text x={CX + 8} y={CY - AXIS_LENGTH + 2} fontSize={10} fill={INK}>
                I_y = 2,947·10⁶ mm⁴
              </text>
            </motion.g>
          )}

          {rotating && (
            <g>
              <text x={14} y={24} fontSize={10} fill={INK}>
                I_xy
              </text>
              <line
                x1={48}
                y1={20}
                x2={48 + 72 * coupling}
                y2={20}
                stroke={ANGLE}
                strokeWidth={5}
                strokeLinecap="round"
              />
              <text x={14} y={39} fontSize={9} fill={MUTED}>
                maleje do zera przy θ = 0°
              </text>
            </g>
          )}

          {rotating && (
            <g>
              <line
                x1={p1Back.x}
                y1={p1Back.y}
                x2={p1.x}
                y2={p1.y}
                stroke={I1}
                strokeWidth={2.4}
                strokeLinecap="round"
              />
              <line
                x1={p2Back.x}
                y1={p2Back.y}
                x2={p2.x}
                y2={p2.y}
                stroke={I2}
                strokeWidth={2.4}
                strokeLinecap="round"
              />
              <circle cx={CX} cy={CY} r={4.5} fill={INK} />
              {angle > 2 && (
                <g>
                  <path d={arcPath(0, angle, 42)} fill="none" stroke={ANGLE} strokeWidth={1.6} />
                  <text
                    x={point(angle / 2, 58).x}
                    y={point(angle / 2, 58).y}
                    fontSize={10}
                    fill={ANGLE}
                    textAnchor="middle"
                  >
                    θ = {angle.toFixed(1)}°
                  </text>
                </g>
              )}
              <text x={p1.x + 6} y={p1.y - 5} fontSize={10} fill={MUTED}>
                x′
              </text>
              <text x={p2.x + 6} y={p2.y + 12} fontSize={10} fill={MUTED}>
                y′
              </text>
            </g>
          )}

          {principal && (
            <g>
              <line
                x1={point(180).x}
                y1={point(180).y}
                x2={point(0).x}
                y2={point(0).y}
                stroke={I1}
                strokeWidth={2.8}
                strokeLinecap="round"
              />
              <line
                x1={point(90).x}
                y1={point(90).y}
                x2={point(-90).x}
                y2={point(-90).y}
                stroke={I2}
                strokeWidth={2.8}
                strokeLinecap="round"
              />
              <circle cx={CX} cy={CY} r={4.5} fill={INK} />
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} fontSize={10}>
                <text x={14} y={24} fill={I1} fontWeight={600}>
                  θ = 0°, I_xy = 0
                </text>
                <text x={CX + AXIS_LENGTH + 6} y={CY - 8} fill={I1} fontWeight={600}>
                  x (I₁)
                </text>
                <text x={CX + AXIS_LENGTH + 6} y={CY + 7} fill={I1} fontSize={9}>
                  5,674·10⁶ mm⁴
                </text>
                <text x={CX + 7} y={CY - AXIS_LENGTH - 9} fill={I2} fontWeight={600}>
                  y (I₂)
                </text>
                <text x={CX + 7} y={CY - AXIS_LENGTH + 6} fill={I2} fontSize={9}>
                  2,947·10⁶ mm⁴
                </text>
              </motion.g>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
