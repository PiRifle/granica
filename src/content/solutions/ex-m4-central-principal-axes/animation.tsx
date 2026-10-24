import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const SECTION = '#e3eaf3'
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

const SCALE = 2.1
const ORIGIN = { x: 112, y: 242 }
const px = (x: number) => ORIGIN.x + x * SCALE
const py = (y: number) => ORIGIN.y - y * SCALE
const CX = px(40)
const CY = py(26.67)
const AXIS_LENGTH = 104
const THETA_1 = 64.9

const point = (degrees: number, length = AXIS_LENGTH) => ({
  x: CX + length * Math.cos(rad(degrees)),
  y: CY - length * Math.sin(rad(degrees)),
})

const triangle = `${px(0)},${py(0)} ${px(120)},${py(0)} ${px(0)},${py(80)}`

const arcPath = (start: number, end: number, radius: number) => {
  const a = point(start, radius)
  const b = point(end, radius)
  const large = Math.abs(end - start) > 180 ? 1 : 0
  const sweep = end > start ? 0 : 1
  return `M${a.x} ${a.y} A${radius} ${radius} 0 ${large} ${sweep} ${b.x} ${b.y}`
}

export function CentralPrincipalAxesAnimation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'section'
  const progress = smooth(playing ? sceneProgress : 1)
  const rotating = metric === 'rotate'
  const angle = rotating ? THETA_1 * progress : metric === 'principal' || metric === 'result' ? THETA_1 : 0
  const showAxes = metric !== 'section'
  const showRotated = rotating || metric === 'principal' || metric === 'result'
  const centralSolid = metric === 'moments' || metric === 'Ixy'
  const principal = metric === 'principal' || metric === 'result'
  const showPrincipalLabels = principal || (rotating && progress > 0.72)
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
          aria-label="Trójkąt prostokątny 120 na 80 milimetrów. Animacja pokazuje środek ciężkości, centralne osie, moment dewiacyjny oraz obrót układu o kąt 64,9 stopnia do osi głównych z momentami I1 i I2."
        >
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
            <motion.polygon
              points={triangle}
              fill={SECTION}
              stroke={EDGE}
              strokeWidth={1.6}
              initial={{ pathLength: 0, fillOpacity: 0.2 }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.g>

          <g stroke={MUTED} fill={MUTED} strokeWidth={1}>
            <line x1={px(0)} y1={py(0) + 16} x2={px(120)} y2={py(0) + 16} />
            <line x1={px(0)} y1={py(0) + 10} x2={px(0)} y2={py(0) + 22} />
            <line x1={px(120)} y1={py(0) + 10} x2={px(120)} y2={py(0) + 22} />
            <text x={(px(0) + px(120)) / 2} y={py(0) + 30} textAnchor="middle" fontSize={10} stroke="none">
              a = 120 mm
            </text>
            <line x1={px(0) - 16} y1={py(0)} x2={px(0) - 16} y2={py(80)} />
            <line x1={px(0) - 22} y1={py(0)} x2={px(0) - 10} y2={py(0)} />
            <line x1={px(0) - 22} y1={py(80)} x2={px(0) - 10} y2={py(80)} />
            <text x={px(0) - 24} y={py(40)} textAnchor="end" fontSize={10} stroke="none">
              b = 80 mm
            </text>
          </g>

          <text x={14} y={24} fontSize={10} fill={MUTED}>
            A = 4800 mm²
          </text>

          {showAxes && (
            <g stroke={AXIS} strokeWidth={centralSolid ? 1.8 : 1.2} strokeDasharray={centralSolid ? undefined : '6 4'}>
              <line x1={CX - AXIS_LENGTH} y1={CY} x2={CX + AXIS_LENGTH} y2={CY} opacity={showRotated ? 0.35 : 0.9} />
              <line x1={CX} y1={CY - AXIS_LENGTH} x2={CX} y2={CY + AXIS_LENGTH} opacity={showRotated ? 0.35 : 0.9} />
            </g>
          )}

          {showAxes && !showRotated && (
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
              <text x={14} y={232} fontSize={9} fill={MUTED}>
                x_C = 40 mm
              </text>
              <text x={14} y={247} fontSize={9} fill={MUTED}>
                y_C = 26,67 mm
              </text>
            </g>
          )}

          {metric === 'moments' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <text x={CX + AXIS_LENGTH - 4} y={CY - 10} textAnchor="end" fontSize={10} fill={INK}>
                I_x = 1,707·10⁶ mm⁴
              </text>
              <text x={CX + 8} y={CY - AXIS_LENGTH + 2} fontSize={10} fill={INK}>
                I_y = 3,840·10⁶ mm⁴
              </text>
            </motion.g>
          )}

          {metric === 'Ixy' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
              <text x={14} y={24} fontSize={10} fill={INK}>
                I_xy,c = −1,280·10⁶ mm⁴
              </text>
              <text x={14} y={39} fontSize={9} fill={MUTED}>
                osie centralne, ale nie główne
              </text>
              <path
                d={`M${CX - 26} ${CY + 28} A34 34 0 0 1 ${CX + 26} ${CY + 28}`}
                fill="none"
                stroke={ANGLE}
                strokeWidth={1.4}
                strokeDasharray="4 3"
              />
              <text x={CX} y={CY + 48} textAnchor="middle" fontSize={9} fill={ANGLE}>
                sprzężenie kierunków
              </text>
            </motion.g>
          )}

          {showRotated && (
            <g>
              {rotating && (
                <line
                  x1={CX}
                  y1={CY}
                  x2={point(0).x}
                  y2={point(0).y}
                  stroke={AXIS}
                  strokeWidth={1.3}
                  strokeDasharray="4 3"
                  opacity={0.7}
                />
              )}

              <line
                x1={p1Back.x}
                y1={p1Back.y}
                x2={p1.x}
                y2={p1.y}
                stroke={I1}
                strokeWidth={2.6}
                strokeLinecap="round"
              />
              <line
                x1={p2Back.x}
                y1={p2Back.y}
                x2={p2.x}
                y2={p2.y}
                stroke={I2}
                strokeWidth={2.6}
                strokeLinecap="round"
              />
              <circle cx={CX} cy={CY} r={4.5} fill={INK} />

              {angle > 3 && (
                <g>
                  <path d={arcPath(0, angle, 44)} fill="none" stroke={ANGLE} strokeWidth={1.6} />
                  <text
                    x={point(angle / 2, 62).x}
                    y={point(angle / 2, 62).y}
                    fontSize={10}
                    fill={ANGLE}
                    textAnchor="middle"
                  >
                    θ = {angle.toFixed(1)}°
                  </text>
                </g>
              )}

              {rotating && !showPrincipalLabels && (
                <g fontSize={10} fill={MUTED}>
                  <text x={p1.x + 5} y={p1.y - 5}>
                    x′
                  </text>
                  <text x={p2.x + 5} y={p2.y + 11}>
                    y′
                  </text>
                </g>
              )}

              {showPrincipalLabels && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  fontSize={10}
                >
                  <text x={p1.x + 6} y={p1.y - 6} fill={I1} fontWeight={600}>
                    x₁ (I₁)
                  </text>
                  <text x={p2.x + 6} y={p2.y + 12} fill={I2} fontWeight={600}>
                    x₂ (I₂)
                  </text>
                  <text x={p1.x + 6} y={p1.y + 8} fill={I1} fontSize={9}>
                    4,44·10⁶ mm⁴
                  </text>
                  <text x={p2.x + 6} y={p2.y + 26} fill={I2} fontSize={9}>
                    1,11·10⁶ mm⁴
                  </text>
                  {metric !== 'result' && (
                    <text x={14} y={24} fontSize={10} fill={I1}>
                      I_xy = 0
                    </text>
                  )}
                </motion.g>
              )}

              {metric === 'result' && (
                <g fontSize={10} fill={INK}>
                  <text x={14} y={24}>
                    I₁ + I₂ = I_x + I_y
                  </text>
                  <text x={14} y={39} fontSize={9} fill={MUTED}>
                    obrót nie zmienia sumy momentów
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
