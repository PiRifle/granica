import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'

const CY = 128
const X0 = 64
const X1 = 398
const R0 = 15
const R50 = 22
const RREQ = R50 * (49.15 / 50)

const PHI_DOP = 0.02618
const PHI_ACTUAL = 0.024446
const PHI_DOP_DEG = 1.5
const PHI_ACTUAL_DEG = 1.4007

const ALLOW_VIS = 1.9
const VIS = ALLOW_VIS / PHI_DOP
const ACTUAL_VIS = PHI_ACTUAL * VIS

const GX0 = 92
const GX1 = 392
const GY = 282
const GH = 9
const GMAX = 1.75

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const pl = (value: number) => value.toFixed(2).replace('.', ',')

function helix(xStart: number, xEnd: number, radius: number, aStart: number, aEnd: number) {
  const points: string[] = []
  const count = 48
  for (let step = 0; step <= count; step += 1) {
    const t = step / count
    const angle = aStart + (aEnd - aStart) * t
    const x = xStart + (xEnd - xStart) * t + radius * 0.18 * Math.sin(angle)
    const y = CY - radius * Math.cos(angle)
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return points.join(' ')
}

function facePoint(x: number, radius: number, angle: number) {
  const rx = radius * 0.34
  return [x + rx * Math.sin(angle), CY - radius * Math.cos(angle)] as const
}

function arcPoints(x: number, radius: number, angle: number) {
  const steps = 24
  const points: string[] = []
  for (let step = 0; step <= steps; step += 1) {
    const a = (angle * step) / steps
    const [px, py] = facePoint(x, radius, a)
    points.push(`${px.toFixed(2)},${py.toFixed(2)}`)
  }
  return points.join(' ')
}

function Face({
  x,
  radius,
  angle,
  allowAngle,
  color,
}: {
  x: number
  radius: number
  angle: number
  allowAngle: number
  color: string
}) {
  const rx = radius * 0.34
  const [markerX, markerY] = facePoint(x, radius, angle)
  const [allowX, allowY] = facePoint(x, radius, allowAngle)
  return (
    <g>
      <ellipse cx={x} cy={CY} rx={rx} ry={radius} fill="#ffffff" fillOpacity={0.72} stroke={ACCENT} strokeWidth={1.2} />
      <line x1={x} y1={CY - radius} x2={x} y2={CY} stroke={MUTED} strokeWidth={0.8} strokeDasharray="2 3" />
      {angle > 0.012 && (
        <path
          d={`M ${x} ${CY} L ${arcPoints(x, radius, angle).split(' ').join(' L ')} Z`}
          fill={color}
          fillOpacity={0.16}
          stroke="none"
        />
      )}
      <polyline
        points={arcPoints(x, radius, allowAngle)}
        fill="none"
        stroke={LOAD}
        strokeWidth={1.4}
        strokeDasharray="4 3"
      />
      <line x1={x} y1={CY} x2={allowX} y2={allowY} stroke={LOAD} strokeWidth={1.2} strokeDasharray="4 3" />
      <line x1={x} y1={CY} x2={markerX} y2={markerY} stroke={color} strokeWidth={2.1} strokeLinecap="round" />
      <circle cx={markerX} cy={markerY} r={2.2} fill={color} />
    </g>
  )
}

export function ShearTwistAngle3Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric
  const progress = playing ? easeOut(clamp01(sceneProgress)) : 1
  const isModel = metric === 'P' || (metric == null && index === 0)
  const isLimit = metric === 'φ_dop' || (metric == null && index === 1)
  const isInertia = metric === 'Jo' || (metric == null && index === 2)
  const isDiameter = metric === 'd' || (metric == null && index === 3)
  const isCheck = metric === 'φ' || (metric == null && index === 4)

  let radius = R0
  if (isDiameter) radius = lerp(R0, R50, progress)
  else if (isCheck) radius = R50

  const twist = isCheck ? ACTUAL_VIS * progress : 0
  const actualDeg = isCheck ? PHI_ACTUAL_DEG * progress : 0
  const diameter = (radius / R50) * 50
  const satisfied = diameter >= 49.15 - 0.02

  const allowX = GX0 + (PHI_DOP_DEG / GMAX) * (GX1 - GX0)
  const fillWidth = (actualDeg / GMAX) * (GX1 - GX0)
  const markerX = GX0 + fillWidth

  const showRequired = index >= 2
  const showGauge = index >= 1

  const phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 330"
          role="img"
          aria-label="Dobór średnicy wału pełnego: moment 800 niutonometrów, długość 1,5 metra i dopuszczalny kąt 1,5 stopnia; animacja wzrostu średnicy oraz porównania rzeczywistego kąta z dopuszczalnym"
        >
          <text x={16} y={20} fontSize={9} fill={MUTED}>
            T = 800 N·m, L = 1,5 m
          </text>
          <text x={16} y={34} fontSize={9} fill={MUTED}>
            G = 80 GPa, φ_dop = 1,5°
          </text>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={X0} y1={CY - R50 - 10} x2={X0} y2={CY + R50 + 10} />
            {Array.from({ length: 7 }, (_, tick) => {
              const y = CY - R50 + tick * ((2 * R50) / 6)
              return <line key={tick} x1={X0} y1={y} x2={X0 - 9} y2={y - 8} strokeWidth={1.3} />
            })}
          </g>
          <text x={X0 - 4} y={CY + R50 + 24} textAnchor="end" fontSize={9} fill={SUPPORT}>
            A
          </text>
          <text x={X1} y={CY + R50 + 24} textAnchor="middle" fontSize={9} fill={SUPPORT}>
            B
          </text>

          <rect
            x={X0}
            y={CY - radius}
            width={X1 - X0}
            height={2 * radius}
            rx={3}
            fill={ACCENT}
            fillOpacity={0.13}
            stroke={isCheck ? OK : ACCENT}
            strokeWidth={1.8}
          />

          <line
            x1={X0}
            y1={CY - radius}
            x2={X1}
            y2={CY - radius}
            stroke={MUTED}
            strokeWidth={0.9}
            strokeDasharray="4 4"
          />

          {phases.map((phase, lineIndex) => (
            <polyline
              key={lineIndex}
              points={helix(X0, X1, radius, phase, twist + phase)}
              fill="none"
              stroke={lineIndex === 0 ? LOAD : ACCENT}
              strokeWidth={lineIndex === 0 ? 2 : 1}
              opacity={lineIndex === 0 ? 0.95 : 0.42}
              strokeLinecap="round"
            />
          ))}

          {showRequired && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <ellipse
                cx={X1}
                cy={CY}
                rx={RREQ * 0.34}
                ry={RREQ}
                fill="none"
                stroke={satisfied && index === 3 ? OK : MUTED}
                strokeWidth={1.3}
                strokeDasharray="5 4"
              />
              <text x={16} y={48} fontSize={8.5} fill={MUTED}>
                J_o,min = 572 941 mm⁴
              </text>
            </motion.g>
          )}

          <Face x={X1} radius={radius} angle={twist} allowAngle={ALLOW_VIS} color={isCheck ? OK : ACCENT} />

          <g stroke={LOAD} fill={LOAD}>
            <line x1={X1 - 58} y1={CY - radius - 10} x2={X1 - 18} y2={CY - radius - 10} strokeWidth={2} />
            <path
              d={`M${X1 - 26} ${CY - radius - 15} L${X1 - 18} ${CY - radius - 10} L${X1 - 26} ${CY - radius - 5}`}
              fill="none"
              strokeWidth={2}
            />
            <line x1={X1 - 18} y1={CY + radius + 10} x2={X1 - 58} y2={CY + radius + 10} strokeWidth={2} />
            <path
              d={`M${X1 - 50} ${CY + radius + 5} L${X1 - 58} ${CY + radius + 10} L${X1 - 50} ${CY + radius + 15}`}
              fill="none"
              strokeWidth={2}
            />
            <text x={X1 - 38} y={CY - radius - 18} textAnchor="middle" fontSize={9} stroke="none">
              T
            </text>
          </g>

          {isModel && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <text x={230} y={CY + R50 + 22} textAnchor="middle" fontSize={10} fontWeight={700} fill={ACCENT}>
                d = ?
              </text>
            </motion.g>
          )}

          {isLimit && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <text x={16} y={48} fontSize={9} fill={LOAD}>
                φ_dop = 1,5° = 0,02618 rad
              </text>
            </motion.g>
          )}

          {isInertia && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <text x={230} y={CY + R50 + 22} textAnchor="middle" fontSize={9} fill={ACCENT}>
                J_o ≥ TL/(G φ_dop) = 572 941 mm⁴
              </text>
            </motion.g>
          )}

          {isDiameter && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <text
                x={230}
                y={CY + R50 + 22}
                textAnchor="middle"
                fontSize={9}
                fontWeight={600}
                fill={satisfied ? OK : ACCENT}
              >
                {satisfied ? 'd = 50 mm ≥ d_min = 49,15 mm' : 'd_min = 49,15 mm'}
              </text>
            </motion.g>
          )}

          {isCheck && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <text x={230} y={CY + R50 + 22} textAnchor="middle" fontSize={9} fontWeight={700} fill={OK}>
                φ = 1,40° ≤ φ_dop = 1,50°
              </text>
              <text x={230} y={CY + R50 + 35} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                τ = 32,6 MPa
              </text>
            </motion.g>
          )}

          {showGauge && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <rect x={GX0} y={GY} width={GX1 - GX0} height={GH} rx={4} fill="#eef1f5" />
              <motion.rect
                x={GX0}
                y={GY}
                height={GH}
                rx={4}
                fill={OK}
                initial={false}
                animate={{ width: Math.max(0, fillWidth) }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
              {[0, 0.5, 1, 1.5].map((tick) => {
                const x = GX0 + (tick / GMAX) * (GX1 - GX0)
                return (
                  <g key={tick}>
                    <line x1={x} y1={GY + GH} x2={x} y2={GY + GH + 4} stroke={MUTED} strokeWidth={0.9} />
                    <text x={x} y={GY + GH + 14} textAnchor="middle" fontSize={8} fill={MUTED}>
                      {tick}°
                    </text>
                  </g>
                )
              })}
              <line
                x1={allowX}
                y1={GY - 7}
                x2={allowX}
                y2={GY + GH + 3}
                stroke={LOAD}
                strokeWidth={1.5}
                strokeDasharray="4 3"
              />
              <text x={allowX} y={GY - 12} textAnchor="middle" fontSize={8} fill={LOAD}>
                φ_dop
              </text>
              {isCheck && (
                <>
                  <line x1={markerX} y1={GY - 7} x2={markerX} y2={GY + GH + 3} stroke={OK} strokeWidth={1.8} />
                  <text x={markerX} y={GY + GH + 27} textAnchor="middle" fontSize={8} fontWeight={700} fill={OK}>
                    φ
                  </text>
                </>
              )}
              <text x={GX1} y={GY + GH + 27} textAnchor="end" fontSize={8} fill={MUTED}>
                kąt skręcenia
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
