import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const BAD = '#d64545'
const OK = '#2f7d5b'

const CY = 128
const X0 = 64
const X1 = 398
const R35 = 22
const R40 = 22 * (40 / 35)

const PHI35 = 0.016536
const PHI40 = 0.009693
const PHI35_DEG = 0.9475
const PHI40_DEG = 0.5554

const VIS = 1.75 / PHI35
const T35 = PHI35 * VIS
const T40 = PHI40 * VIS

const GX0 = 92
const GX1 = 392
const GY = 282
const GH = 9
const GMAX = 1.1

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const pl = (value: number) => value.toFixed(2).replace('.', ',')

const polar = (cx: number, cy: number, radius: number, degrees: number) => {
  const angle = (degrees * Math.PI) / 180
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
}

function arcPath(cx: number, cy: number, radius: number, from: number, to: number) {
  const [x0, y0] = polar(cx, cy, radius, from)
  const [x1, y1] = polar(cx, cy, radius, to)
  const large = Math.abs(to - from) > 180 ? 1 : 0
  const sweep = to > from ? 1 : 0
  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${radius} ${radius} 0 ${large} ${sweep} ${x1.toFixed(1)} ${y1.toFixed(1)}`
}

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

function FaceMarker({
  x,
  radius,
  angle,
  color,
  showWedge,
}: {
  x: number
  radius: number
  angle: number
  color: string
  showWedge: boolean
}) {
  const rx = radius * 0.34
  const steps = 24
  const points: string[] = []
  for (let step = 0; step <= steps; step += 1) {
    const a = (angle * step) / steps
    points.push(`${(x + rx * Math.sin(a)).toFixed(2)},${(CY - radius * Math.cos(a)).toFixed(2)}`)
  }
  const markerX = x + rx * Math.sin(angle)
  const markerY = CY - radius * Math.cos(angle)
  return (
    <g>
      <ellipse cx={x} cy={CY} rx={rx} ry={radius} fill="#ffffff" fillOpacity={0.72} stroke={ACCENT} strokeWidth={1.2} />
      <line x1={x} y1={CY - radius} x2={x} y2={CY} stroke={MUTED} strokeWidth={0.8} strokeDasharray="2 3" />
      {showWedge && <path d={`M ${x} ${CY} L ${points.join(' L ')} Z`} fill={color} fillOpacity={0.16} stroke="none" />}
      <line x1={x} y1={CY} x2={markerX} y2={markerY} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <circle cx={markerX} cy={markerY} r={2.1} fill={color} />
    </g>
  )
}

export function ShearTwistAngle2Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric
  const progress = playing ? easeOut(clamp01(sceneProgress)) : 1
  const isPower = metric === 'T' || (metric == null && index === 1)
  const isTwist = metric === 'φ' || (metric == null && index === 2)
  const isVariant = metric === 'd' || (metric == null && index === 3)
  const isStress = metric === 'stress' || (metric == null && index === 4)

  let radius = R35
  let twist = 0
  let spin = 0
  if (isPower) {
    spin = progress * Math.PI * 2.4
  } else if (isTwist) {
    twist = T35 * progress
  } else if (isVariant) {
    radius = lerp(R35, R40, progress)
    twist = lerp(T35, T40, progress)
  } else if (isStress) {
    radius = R40
    twist = T40
  }

  const faceAngle = twist + spin

  let actualDeg = 0
  if (isTwist) actualDeg = PHI35_DEG * progress
  else if (isVariant) actualDeg = lerp(PHI35_DEG, PHI40_DEG, progress)
  else if (isStress) actualDeg = PHI40_DEG

  const showGauge = index >= 2
  const showBaseline = index >= 3
  const baselineX = GX0 + (PHI35_DEG / GMAX) * (GX1 - GX0)
  const fillWidth = (actualDeg / GMAX) * (GX1 - GX0)
  const markerX = GX0 + fillWidth

  const phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]
  const bodyTop = CY - radius
  const bodyHeight = 2 * radius

  const shaftColor = isStress ? BAD : ACCENT

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 330"
          role="img"
          aria-label="Wał napędowy o średnicy 35 milimetrów przenoszący 30 kilowatów przy 1470 obrotach na minutę; animacja obrotu, skręcenia i porównania kąta po zwiększeniu średnicy do 40 milimetrów"
        >
          <defs>
            <marker
              id="ex2-spin-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={MUTED} />
            </marker>
          </defs>

          <text x={16} y={20} fontSize={9} fill={MUTED}>
            P = 30 kW, n = 1470 obr/min
          </text>
          <text x={16} y={34} fontSize={9} fill={MUTED}>
            d = 35 mm, L = 1 m
          </text>
          <text x={16} y={48} fontSize={9} fill={MUTED}>
            G = 80 GPa
          </text>

          <g stroke={SUPPORT} strokeWidth={1.6} strokeLinecap="round">
            <line x1={X0 - 10} y1={CY + radius + 10} x2={X0 + 8} y2={CY + radius + 10} />
            <line x1={X1 - 8} y1={CY + radius + 10} x2={X1 + 10} y2={CY + radius + 10} />
            {Array.from({ length: 4 }, (_, tick) => (
              <line
                key={`l-${tick}`}
                x1={X0 - 8 + tick * 5}
                y1={CY + radius + 10}
                x2={X0 - 13 + tick * 5}
                y2={CY + radius + 17}
              />
            ))}
            {Array.from({ length: 4 }, (_, tick) => (
              <line
                key={`r-${tick}`}
                x1={X1 - 6 + tick * 5}
                y1={CY + radius + 10}
                x2={X1 - 11 + tick * 5}
                y2={CY + radius + 17}
              />
            ))}
          </g>
          <text x={X0 - 2} y={CY + radius + 32} textAnchor="middle" fontSize={9} fill={SUPPORT}>
            A
          </text>
          <text x={X1 + 2} y={CY + radius + 32} textAnchor="middle" fontSize={9} fill={SUPPORT}>
            B
          </text>

          <rect
            x={X0}
            y={bodyTop}
            width={X1 - X0}
            height={bodyHeight}
            rx={3}
            fill={shaftColor}
            fillOpacity={0.13}
            stroke={shaftColor}
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
              points={helix(X0, X1, radius, spin + phase, spin + twist + phase)}
              fill="none"
              stroke={lineIndex === 0 ? LOAD : ACCENT}
              strokeWidth={lineIndex === 0 ? 2 : 1}
              opacity={lineIndex === 0 ? 0.95 : 0.42}
              strokeLinecap="round"
            />
          ))}

          <FaceMarker x={X1} radius={radius} angle={faceAngle} color={shaftColor} showWedge={twist > 0.012} />

          <motion.g initial={false} animate={{ opacity: isPower ? 1 : 0.55 }} transition={{ duration: 0.25 }}>
            <path
              d={arcPath(X0, CY, radius + 13, -142, -38)}
              fill="none"
              stroke={MUTED}
              strokeWidth={1.6}
              strokeDasharray="5 3"
              markerEnd="url(#ex2-spin-arrow)"
            />
            <text x={X0 + 2} y={CY - radius - 24} textAnchor="middle" fontSize={9} fill={MUTED}>
              ω
            </text>
          </motion.g>

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

          {isPower && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <text x={230} y={196} textAnchor="middle" fontSize={9} fill={LOAD}>
                ω = 153,94 rad/s
              </text>
              <text x={230} y={209} textAnchor="middle" fontSize={9} fill={LOAD}>
                T = 194,9 N·m
              </text>
            </motion.g>
          )}

          {isTwist && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line x1={230} y1={CY + radius + 2} x2={230} y2={198} stroke={ACCENT} strokeWidth={0.9} />
              <text x={230} y={208} textAnchor="middle" fontSize={9} fill={ACCENT}>
                J_o = 147 324 mm⁴
              </text>
              <text x={230} y={222} textAnchor="middle" fontSize={9} fill={ACCENT}>
                φ = {pl(actualDeg)}°
              </text>
            </motion.g>
          )}

          {isVariant && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line x1={230} y1={CY + radius + 2} x2={230} y2={198} stroke={OK} strokeWidth={0.9} />
              <text x={230} y={208} textAnchor="middle" fontSize={9} fill={OK}>
                d = 40 mm → J_o = 251 327 mm⁴
              </text>
              <text x={230} y={222} textAnchor="middle" fontSize={9} fill={OK}>
                φ = {pl(actualDeg)}°
              </text>
            </motion.g>
          )}

          {isStress && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <line x1={230} y1={CY + radius + 2} x2={230} y2={198} stroke={BAD} strokeWidth={0.9} />
              <text x={230} y={208} textAnchor="middle" fontSize={9} fill={BAD}>
                τ_max = 15,5 MPa przy d = 40 mm
              </text>
              <text x={230} y={222} textAnchor="middle" fontSize={9} fill={MUTED}>
                przy d = 35 mm było 23,1 MPa
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
                fill={isStress ? OK : ACCENT}
                initial={false}
                animate={{ width: Math.max(0, fillWidth) }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
              {[0, 0.5, 1].map((tick) => {
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
                x1={markerX}
                y1={GY - 5}
                x2={markerX}
                y2={GY + GH + 3}
                stroke={isStress ? OK : ACCENT}
                strokeWidth={1.6}
              />
              <text x={GX0} y={GY - 9} fontSize={9} fontWeight={700} fill={isStress ? OK : ACCENT}>
                {`φ = ${pl(actualDeg)}°`}
              </text>
              {showBaseline && (
                <>
                  <line
                    x1={baselineX}
                    y1={GY - 5}
                    x2={baselineX}
                    y2={GY + GH + 3}
                    stroke={MUTED}
                    strokeWidth={1.2}
                    strokeDasharray="3 3"
                  />
                  <text x={baselineX} y={GY - 16} textAnchor="middle" fontSize={8} fill={MUTED}>
                    ∅35: 0,947°
                  </text>
                </>
              )}
              <text x={GX1} y={GY - 9} textAnchor="end" fontSize={8} fill={MUTED}>
                kąt na długości L
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
