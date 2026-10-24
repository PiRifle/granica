import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const GREEN = '#2e9e6b'
const VIOLET = '#a970dd'
const MUTED = '#87929d'
const AXIS = '#c9d0d9'
const INK = '#17202a'

const RX = 116
const RY = 154
const RR = 84
const MX0 = 246
const MW = 208
const MY = 154

const E0 = 600
const E45 = 300
const E90 = -200
const GAMMA = 200
const CENTER = 200
const RADIUS = 412.3105626
const E1 = 612.3105626
const E2 = -212.3105626
const PHI = 7.018
const PHI_LABEL = '7,018°'
const TWO_PHI_LABEL = '14,036°'

const SIGMA1 = '120,58 MPa'
const SIGMA2 = '−6,29 MPa'

const RAD = Math.PI / 180
const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const ORDER: Record<string, number> = {
  gauges: 0,
  shear: 1,
  mohr: 2,
  principal: 3,
  angle: 4,
  stress: 5,
}

const GAUGES = [
  { angle: 0, display: '600 με', color: BLUE },
  { angle: 45, display: '300 με', color: ORANGE },
  { angle: 90, display: '−200 με', color: GREEN },
]

const minV = Math.min(0, CENTER - RADIUS)
const maxV = Math.max(0, CENTER + RADIUS)
const scale = MW / (maxV - minV)
const xZero = MX0 + (0 - minV) * scale
const xC = xZero + CENTER * scale
const rPix = RADIUS * scale
const xOf = (value: number) => xZero + value * scale
const yOf = (value: number) => MY - value * scale

const polar = (angle: number, radius = RR) =>
  [RX + Math.cos(angle * RAD) * radius, RY - Math.sin(angle * RAD) * radius] as const

const arcPath = (start: number, end: number, radius: number) => {
  const [x1, y1] = polar(start, radius)
  const [x2, y2] = polar(end, radius)
  const large = Math.abs(end - start) > 180 ? 1 : 0
  const sweep = end >= start ? 0 : 1
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} ${sweep} ${x2} ${y2}`
}

const gaugePoint = (angle: number) => {
  const delta = 2 * (angle - PHI) * RAD
  return {
    x: xOf(CENTER + RADIUS * Math.cos(delta)),
    y: yOf(-RADIUS * Math.sin(delta)),
  }
}

const gaugeLabel = (angle: number, x: number, y: number) => {
  if (angle === 0) return { x: x + 8, y: y + 2, anchor: 'start' as const }
  if (angle === 45) return { x: x + 8, y: y - 4, anchor: 'start' as const }
  return { x: x - 8, y: y - 4, anchor: 'end' as const }
}

const P0 = gaugePoint(0)
const P45 = gaugePoint(45)
const P90 = gaugePoint(90)

const mohrArc = (radius: number, endDegrees: number) => {
  const x1 = xC + radius
  const x2 = xC + radius * Math.cos(endDegrees * RAD)
  const y2 = MY - radius * Math.sin(endDegrees * RAD)
  const large = Math.abs(endDegrees) > 180 ? 1 : 0
  return `M ${x1} ${MY} A ${radius} ${radius} 0 ${large} 0 ${x2} ${y2}`
}

export function StrainRosetteExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'gauges'
  const p = playing ? smooth(sceneProgress) : 1
  const stage = ORDER[metric] ?? 0
  const at = (index: number) => (stage > index ? 1 : stage === index ? p : 0)

  const gaugesP = at(0)
  const shearP = at(1)
  const mohrP = at(2)
  const principalP = at(3)
  const angleP = at(4)
  const stressP = at(5)

  const centerP = clamp01(mohrP * 2)
  const radiusP = clamp01(mohrP * 2 - 0.45)
  const circleP = clamp01(mohrP * 2 - 1)

  const point0P = clamp01(shearP * 2)
  const point90P = clamp01(shearP * 2 - 0.45)
  const point45P = clamp01(shearP * 2 - 1)

  const activeGauge = (angle: number) => (metric === 'gauges' ? true : metric === 'shear' ? angle === 45 : false)
  const gaugeOpacity = (angle: number) =>
    metric === 'gauges' || metric === 'shear' ? (activeGauge(angle) ? 1 : 0.45) : 0.55
  const gaugeDraw = (index: number) => clamp01((gaugesP - index * 0.18) / 0.64)

  const principalVisible = stage >= 3
  const angleVisible = stage >= 4
  const stressVisible = stage >= 5

  const points = [
    { point: P0, reveal: point0P, color: BLUE, label: '0°' },
    { point: P45, reveal: point45P, color: ORANGE, label: '45°' },
    { point: P90, reveal: point90P, color: GREEN, label: '90°' },
  ]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 500 320"
          role="img"
          aria-label="Rozeta 0/45/90 stopni z odczytami 600, 300 i minus 200 mikrostrain. Animacja pokazuje kierunki czujników, dodatnie ścinanie, punkty na kole Mohra, środek, promień, odkształcenia główne, kąt 7,018 stopnia i naprężenia."
        >
          <defs>
            <marker
              id="rosette2-axis"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
          </defs>

          <g stroke={AXIS} strokeWidth={1} strokeDasharray="4 4">
            <line x1={RX - RR - 16} y1={RY} x2={RX + RR + 16} y2={RY} />
            <line x1={RX} y1={RY - RR - 16} x2={RX} y2={RY + RR + 16} />
          </g>
          <text x={RX + RR + 18} y={RY - 5} fontSize={9} fill={MUTED}>
            x
          </text>
          <text x={RX + 5} y={RY - RR - 18} fontSize={9} fill={MUTED}>
            y
          </text>

          {GAUGES.map((gauge, index) => {
            const [x2, y2] = polar(gauge.angle)
            const draw = gaugeDraw(index)
            const label = gaugeLabel(gauge.angle, x2, y2)
            return (
              <g key={gauge.angle} opacity={gaugeOpacity(gauge.angle)}>
                <motion.line
                  x1={RX}
                  y1={RY}
                  x2={x2}
                  y2={y2}
                  stroke={gauge.color}
                  strokeWidth={activeGauge(gauge.angle) ? 3 : 2}
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: draw }}
                  transition={{ duration: 0.2, ease: 'linear' }}
                />
                <motion.circle
                  cx={x2}
                  cy={y2}
                  r={3.4}
                  fill={gauge.color}
                  initial={false}
                  animate={{ opacity: draw > 0.88 ? 1 : 0 }}
                />
                <motion.g initial={false} animate={{ opacity: draw > 0.5 ? 1 : 0 }}>
                  <text
                    x={label.x}
                    y={label.y}
                    textAnchor={label.anchor}
                    fontSize={9}
                    fontWeight={600}
                    fill={gauge.color}
                  >
                    {gauge.angle}°
                  </text>
                  <text x={label.x} y={label.y + 11} textAnchor={label.anchor} fontSize={8.5} fill={gauge.color}>
                    {gauge.display}
                  </text>
                </motion.g>
              </g>
            )
          })}

          {principalVisible && (
            <motion.g initial={false} animate={{ opacity: principalP }}>
              <line
                x1={RX}
                y1={RY}
                x2={polar(PHI)[0]}
                y2={polar(PHI)[1]}
                stroke={VIOLET}
                strokeWidth={2.2}
                strokeDasharray="6 4"
              />
              <line
                x1={RX}
                y1={RY}
                x2={polar(PHI + 90)[0]}
                y2={polar(PHI + 90)[1]}
                stroke={VIOLET}
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
              <text
                x={polar(PHI, RR + 18)[0]}
                y={polar(PHI, RR + 18)[1] - 6}
                textAnchor="middle"
                fontSize={9}
                fill={VIOLET}
              >
                εⅠ
              </text>
              <text
                x={polar(PHI + 90, RR + 18)[0] - 6}
                y={polar(PHI + 90, RR + 18)[1]}
                textAnchor="end"
                fontSize={9}
                fill={VIOLET}
              >
                εⅡ
              </text>
            </motion.g>
          )}

          {angleVisible && (
            <motion.g initial={false} animate={{ opacity: angleP }}>
              <path d={arcPath(0, PHI, 34)} fill="none" stroke={ORANGE} strokeWidth={2} strokeLinecap="round" />
              <text
                x={polar(PHI / 2, 48)[0]}
                y={polar(PHI / 2, 48)[1] + 16}
                textAnchor="middle"
                fontSize={9}
                fill={ORANGE}
              >
                φ = {PHI_LABEL}
              </text>
            </motion.g>
          )}

          <g stroke={AXIS} strokeWidth={1}>
            <line x1={MX0} y1={MY} x2={MX0 + MW + 6} y2={MY} markerEnd="url(#rosette2-axis)" />
            <line x1={xZero} y1={MY - 112} x2={xZero} y2={MY + 112} markerEnd="url(#rosette2-axis)" />
          </g>
          <text x={MX0 + MW + 8} y={MY - 7} textAnchor="end" fontSize={9} fill={MUTED}>
            ε
          </text>
          <text x={xZero + 6} y={MY - 96} fontSize={9} fill={MUTED}>
            γ/2
          </text>
          <text x={MX0 + MW / 2} y={18} textAnchor="middle" fontSize={9} fill={MUTED}>
            koło Mohra ε–γ/2
          </text>

          <motion.circle
            cx={xC}
            cy={MY}
            r={rPix}
            fill="none"
            stroke={BLUE}
            strokeWidth={2.2}
            initial={false}
            animate={{ pathLength: circleP, opacity: circleP > 0 ? 1 : 0 }}
            transition={{ duration: 0.18, ease: 'linear' }}
          />

          <motion.line
            x1={xC}
            y1={MY}
            x2={P0.x}
            y2={P0.y}
            stroke={VIOLET}
            strokeWidth={2}
            initial={false}
            animate={{ pathLength: radiusP, opacity: radiusP > 0 ? 1 : 0 }}
            transition={{ duration: 0.18, ease: 'linear' }}
          />

          <motion.g initial={false} animate={{ opacity: centerP }}>
            <circle cx={xC} cy={MY} r={3.6} fill={INK} />
            <text x={xC} y={MY + 17} textAnchor="middle" fontSize={9} fill={INK}>
              C
            </text>
          </motion.g>

          {points.map(({ point, reveal, color, label }) => {
            const above = point.y < MY - 8
            const below = point.y > MY + 8
            const labelY = above ? point.y - 7 : below ? point.y + 14 : point.y - 7
            const showLabel = !principalVisible || label === '45°'
            return (
              <motion.g
                key={label}
                initial={false}
                animate={{ opacity: reveal > 0.35 ? 1 : 0 }}
                transition={{ duration: 0.2, ease: 'linear' }}
              >
                <line
                  x1={point.x}
                  y1={point.y}
                  x2={point.x}
                  y2={MY}
                  stroke={color}
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  opacity={0.7}
                />
                <circle cx={point.x} cy={point.y} r={3.4} fill={color} />
                <circle cx={point.x} cy={MY} r={2} fill={color} />
                {showLabel && (
                  <text
                    x={point.x + (point.x > xC ? 6 : -6)}
                    y={labelY}
                    textAnchor={point.x > xC ? 'start' : 'end'}
                    fontSize={8.5}
                    fill={color}
                  >
                    {label}
                  </text>
                )}
              </motion.g>
            )
          })}

          <motion.g initial={false} animate={{ opacity: principalP }}>
            <circle cx={xOf(E2)} cy={MY} r={3.8} fill={VIOLET} />
            <circle cx={xOf(E1)} cy={MY} r={3.8} fill={VIOLET} />
            <text x={xOf(E2) - 6} y={MY + 16} textAnchor="end" fontSize={9} fontWeight={600} fill={VIOLET}>
              εⅡ
            </text>
            <text x={xOf(E1) + 6} y={MY - 8} textAnchor="start" fontSize={9} fontWeight={600} fill={VIOLET}>
              εⅠ
            </text>
          </motion.g>

          {angleVisible && (
            <motion.g initial={false} animate={{ opacity: angleP }}>
              <path d={mohrArc(34, 2 * PHI)} fill="none" stroke={ORANGE} strokeWidth={2} strokeLinecap="round" />
              <text x={xC + Math.cos(PHI * RAD) * 50} y={MY - Math.sin(PHI * RAD) * 50 - 4} fontSize={9} fill={ORANGE}>
                2φ = {TWO_PHI_LABEL}
              </text>
            </motion.g>
          )}

          {stressVisible && (
            <motion.g initial={false} animate={{ opacity: stressP }}>
              <text x={MX0} y={276} fontSize={9} fill={MUTED}>
                E = 200 GPa · ν = 0,30
              </text>
              <text x={MX0} y={290} fontSize={9} fill={VIOLET}>
                σⅠ = {SIGMA1} · σⅡ = {SIGMA2}
              </text>
            </motion.g>
          )}

          <text x={12} y={310} textAnchor="start" fontSize={8} fill={MUTED}>
            γ = {GAMMA} μrad · ε₀ = {E0} με · ε₄₅ = {E45} με · ε₉₀ = {E90} με
          </text>
        </svg>
      </div>
    </div>
  )
}
