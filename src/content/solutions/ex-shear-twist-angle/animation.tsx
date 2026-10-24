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
const XM = X0 + 0.6 * (X1 - X0)
const R1 = 24
const R2 = R1 * (40 / 50)

const PHI1 = 0.014668
const PHI2 = 0.023873
const PHI = PHI1 + PHI2
const RAD_TO_DEG = 180 / Math.PI
const PHI1_DEG = PHI1 * RAD_TO_DEG
const PHI2_DEG = PHI2 * RAD_TO_DEG
const PHI_DEG = PHI * RAD_TO_DEG

const VIS = 1.95 / PHI
const T1 = PHI1 * VIS
const T2 = PHI2 * VIS

const GX0 = 92
const GX1 = 392
const GY = 282
const GH = 9
const GMAX = 3

const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const easeOut = (value: number) => 1 - Math.pow(1 - clamp01(value), 3)
const pl = (value: number) => value.toFixed(2).replace('.', ',')

function helix(xStart: number, xEnd: number, radius: number, aStart: number, aEnd: number) {
  const points: string[] = []
  const count = 44
  for (let step = 0; step <= count; step += 1) {
    const t = step / count
    const angle = aStart + (aEnd - aStart) * t
    const x = xStart + (xEnd - xStart) * t + radius * 0.18 * Math.sin(angle)
    const y = CY - radius * Math.cos(angle)
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return points.join(' ')
}

function TwistFace({
  x,
  radius,
  angle,
  color,
  muted = false,
}: {
  x: number
  radius: number
  angle: number
  color: string
  muted?: boolean
}) {
  const rx = radius * 0.34
  const steps = 22
  const points: string[] = []
  for (let step = 0; step <= steps; step += 1) {
    const a = (angle * step) / steps
    points.push(`${(x + rx * Math.sin(a)).toFixed(2)},${(CY - radius * Math.cos(a)).toFixed(2)}`)
  }
  const markerX = x + rx * Math.sin(angle)
  const markerY = CY - radius * Math.cos(angle)

  return (
    <g>
      <ellipse
        cx={x}
        cy={CY}
        rx={rx}
        ry={radius}
        fill="#ffffff"
        fillOpacity={muted ? 0.35 : 0.72}
        stroke={muted ? MUTED : ACCENT}
        strokeWidth={muted ? 0.9 : 1.2}
      />
      <line x1={x} y1={CY - radius} x2={x} y2={CY} stroke={MUTED} strokeWidth={0.8} strokeDasharray="2 3" />
      {angle > 0.012 && (
        <path d={`M ${x} ${CY} L ${points.join(' L ')} Z`} fill={color} fillOpacity={0.16} stroke="none" />
      )}
      <line x1={x} y1={CY} x2={markerX} y2={markerY} stroke={color} strokeWidth={2} strokeLinecap="round" />
      <circle cx={markerX} cy={markerY} r={2.1} fill={color} />
    </g>
  )
}

export function ShearTwistAngleAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric
  const progress = playing ? easeOut(clamp01(sceneProgress)) : 1
  const isJo = metric === 'Jo' || (metric == null && index === 1)
  const isPhi1 = metric === 'φ1' || (metric == null && index === 2)
  const isPhi2 = metric === 'φ2' || (metric == null && index === 3)
  const isTotal = metric === 'φ' || (metric == null && index === 4)
  const isStress = metric === 'stress' || (metric == null && index === 5)

  let twist1 = 0
  let twist2 = 0
  if (isPhi1) {
    twist1 = T1 * progress
  } else if (isPhi2) {
    twist1 = T1
    twist2 = T2 * progress
  } else if (isTotal) {
    twist1 = T1
    twist2 = T2
  } else if (isStress) {
    twist1 = T1
    twist2 = T2
  }

  const totalTwist = twist1 + twist2

  let fill1 = 0
  let fill2 = 0
  if (isPhi1) {
    fill1 = PHI1_DEG * progress
  } else if (isPhi2) {
    fill1 = PHI1_DEG
    fill2 = PHI2_DEG * progress
  } else if (isTotal) {
    fill1 = PHI1_DEG
    fill2 = PHI2_DEG
  } else if (isStress) {
    fill1 = PHI1_DEG
    fill2 = PHI2_DEG
  }

  const showGauge = index >= 2
  const gaugeEnd = GX0 + ((fill1 + fill2) / GMAX) * (GX1 - GX0)
  const width1 = (fill1 / GMAX) * (GX1 - GX0)
  const width2 = (fill2 / GMAX) * (GX1 - GX0)

  const shaftPath = [
    `M ${X0} ${CY - R1}`,
    `L ${XM} ${CY - R1}`,
    `L ${XM} ${CY - R2}`,
    `L ${X1} ${CY - R2}`,
    `L ${X1} ${CY + R2}`,
    `L ${XM} ${CY + R2}`,
    `L ${XM} ${CY + R1}`,
    `L ${X0} ${CY + R1}`,
    'Z',
  ].join(' ')

  const stressPath = `M ${XM} ${CY - R2} L ${X1} ${CY - R2} L ${X1} ${CY + R2} L ${XM} ${CY + R2} Z`

  const phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 330"
          role="img"
          aria-label="Wał stopniowany o średnicach 50 i 40 milimetrów, skręcany momentem 1,2 kiloniutometra; animacja narastania kąta skręcenia w obu odcinkach i porównanie z linią odniesienia"
        >
          <text x={16} y={20} fontSize={9} fill={MUTED}>
            T = 1,2 kN·m
          </text>
          <text x={16} y={34} fontSize={9} fill={MUTED}>
            d₁ = 50 mm, L₁ = 600 mm
          </text>
          <text x={16} y={48} fontSize={9} fill={MUTED}>
            d₂ = 40 mm, L₂ = 400 mm
          </text>
          <text x={16} y={62} fontSize={9} fill={MUTED}>
            G = 80 GPa
          </text>

          <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
            <line x1={X0} y1={CY - R1 - 10} x2={X0} y2={CY + R1 + 10} />
            {Array.from({ length: 7 }, (_, tick) => {
              const y = CY - R1 + tick * ((2 * R1) / 6)
              return <line key={tick} x1={X0} y1={y} x2={X0 - 9} y2={y - 8} strokeWidth={1.3} />
            })}
          </g>
          <text x={X0 - 4} y={CY + R1 + 24} textAnchor="end" fontSize={9} fill={SUPPORT}>
            A
          </text>
          <text x={X1} y={CY + R2 + 24} textAnchor="middle" fontSize={9} fill={SUPPORT}>
            B
          </text>

          <path d={shaftPath} fill={ACCENT} fillOpacity={0.13} stroke={ACCENT} strokeWidth={1.8} />

          {isStress && (
            <motion.path
              d={stressPath}
              fill={BAD}
              fillOpacity={0.16}
              stroke={BAD}
              strokeWidth={1.8}
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
          )}

          <line x1={X0} y1={CY - R1} x2={XM} y2={CY - R1} stroke={MUTED} strokeWidth={0.9} strokeDasharray="4 4" />
          <line x1={XM} y1={CY - R2} x2={X1} y2={CY - R2} stroke={MUTED} strokeWidth={0.9} strokeDasharray="4 4" />

          {phases.map((phase, lineIndex) => (
            <polyline
              key={`seg1-${lineIndex}`}
              points={helix(X0, XM, R1, phase, twist1 + phase)}
              fill="none"
              stroke={lineIndex === 0 ? LOAD : ACCENT}
              strokeWidth={lineIndex === 0 ? 2 : 1}
              opacity={lineIndex === 0 ? 0.95 : 0.42}
              strokeLinecap="round"
            />
          ))}
          {phases.map((phase, lineIndex) => (
            <polyline
              key={`seg2-${lineIndex}`}
              points={helix(XM, X1, R2, twist1 + phase, twist1 + twist2 + phase)}
              fill="none"
              stroke={lineIndex === 0 ? LOAD : ACCENT}
              strokeWidth={lineIndex === 0 ? 2 : 1}
              opacity={lineIndex === 0 ? 0.95 : 0.42}
              strokeLinecap="round"
            />
          ))}

          <TwistFace x={XM} radius={R1} angle={twist1} color={ACCENT} muted />
          <TwistFace x={X1} radius={R2} angle={totalTwist} color={isStress ? BAD : ACCENT} />

          <g stroke={LOAD} fill={LOAD}>
            <line x1={X1 - 58} y1={CY - R2 - 10} x2={X1 - 18} y2={CY - R2 - 10} strokeWidth={2} />
            <path
              d={`M${X1 - 26} ${CY - R2 - 15} L${X1 - 18} ${CY - R2 - 10} L${X1 - 26} ${CY - R2 - 5}`}
              fill="none"
              strokeWidth={2}
            />
            <line x1={X1 - 18} y1={CY + R2 + 10} x2={X1 - 58} y2={CY + R2 + 10} strokeWidth={2} />
            <path
              d={`M${X1 - 50} ${CY + R2 + 5} L${X1 - 58} ${CY + R2 + 10} L${X1 - 50} ${CY + R2 + 15}`}
              fill="none"
              strokeWidth={2}
            />
            <text x={X1 - 38} y={CY - R2 - 18} textAnchor="middle" fontSize={9} stroke="none">
              T
            </text>
          </g>

          {twist1 > 0.03 && (
            <text x={XM + 10} y={CY - R1 - 12} fontSize={9} fontWeight={isPhi1 ? 700 : 600} fill={ACCENT}>
              φ₁ = {pl((PHI1_DEG * twist1) / T1)}°
            </text>
          )}
          {totalTwist > 0.03 && (
            <text
              x={X1 - 4}
              y={CY - R2 - 14}
              textAnchor="end"
              fontSize={9}
              fontWeight={700}
              fill={isStress ? BAD : ACCENT}
            >
              φ = {pl((PHI_DEG * totalTwist) / (T1 + T2))}°
            </text>
          )}

          <motion.g initial={false} animate={{ opacity: isJo ? 1 : 0 }} transition={{ duration: 0.25 }}>
            <line x1={(X0 + XM) / 2} y1={CY + R1 + 2} x2={(X0 + XM) / 2} y2={202} stroke={ACCENT} strokeWidth={0.9} />
            <line x1={(XM + X1) / 2} y1={CY + R2 + 2} x2={(XM + X1) / 2} y2={202} stroke={ACCENT} strokeWidth={0.9} />
            <text x={(X0 + XM) / 2} y={212} textAnchor="middle" fontSize={9} fill={ACCENT}>
              J_o1 = 613 592 mm⁴
            </text>
            <text x={(XM + X1) / 2} y={212} textAnchor="middle" fontSize={9} fill={ACCENT}>
              J_o2 = 251 327 mm⁴
            </text>
            <text x={230} y={230} textAnchor="middle" fontSize={8.5} fill={MUTED}>
              mniejszy J_o → większy przyrost kąta
            </text>
          </motion.g>

          {isStress && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <text x={X1 - 6} y={CY + R2 + 40} textAnchor="end" fontSize={9} fontWeight={700} fill={BAD}>
                τ₂ = 95,5 MPa
              </text>
              <text x={X0 + 6} y={CY + R1 + 40} fontSize={9} fill={MUTED}>
                τ₁ = 48,9 MPa
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
                fill={ACCENT}
                initial={false}
                animate={{ width: Math.max(0, width1) }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
              <motion.rect
                x={GX0 + width1}
                y={GY}
                height={GH}
                rx={4}
                fill={LOAD}
                initial={false}
                animate={{ width: Math.max(0, width2) }}
                transition={{ duration: 0.15, ease: 'linear' }}
              />
              {[0, 1, 2, 3].map((tick) => {
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
              <line x1={gaugeEnd} y1={GY - 5} x2={gaugeEnd} y2={GY + GH + 3} stroke={OK} strokeWidth={1.6} />
              <text x={GX0} y={GY - 9} fontSize={9} fontWeight={700} fill={ACCENT}>
                {isPhi1 ? `φ₁ = ${pl(fill1)}°` : `φ = ${pl(fill1 + fill2)}°`}
              </text>
              <g fontSize={8} fill={MUTED}>
                <rect x={GX0} y={GY + 24} width={7} height={7} rx={1.5} fill={ACCENT} />
                <text x={GX0 + 11} y={GY + 31}>
                  odcinek 1: {pl(fill1)}°
                </text>
                <rect x={GX0 + 108} y={GY + 24} width={7} height={7} rx={1.5} fill={LOAD} />
                <text x={GX0 + 119} y={GY + 31}>
                  odcinek 2: {pl(fill2)}°
                </text>
              </g>
            </motion.g>
          )}

          {isTotal && (
            <text x={GX1} y={GY - 9} textAnchor="end" fontSize={9} fontWeight={700} fill={OK}>
              0,03854 rad
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
