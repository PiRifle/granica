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

const CENTER = 300
const RADIUS = 400
const E1 = 700
const E2 = -100
const PHI = 20
const PHI_LABEL = '20°'
const TWO_PHI_LABEL = '40°'

const SIGMA1 = '147,25 MPa'
const SIGMA2 = '24,18 MPa'

const RAD = Math.PI / 180
const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

const ORDER: Record<string, number> = {
  model: 0,
  mohr: 1,
  gauge0: 2,
  gauges: 3,
  check: 4,
  stress: 5,
}

const GAUGES = [
  { angle: 0, display: '606,42 με', color: BLUE },
  { angle: 45, display: '557,12 με', color: ORANGE },
  { angle: 90, display: '−6,42 με', color: GREEN },
]

const minV = Math.min(0, CENTER - RADIUS, E2)
const maxV = Math.max(0, CENTER + RADIUS, E1)
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

export function StrainRosetteExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1
  const stage = ORDER[metric] ?? 0
  const at = (index: number) => (stage > index ? 1 : stage === index ? p : 0)

  const modelP = at(0)
  const gaugesP = at(3)
  const checkP = at(4)
  const stressP = at(5)

  const circleSolidP = stage >= 1 ? (stage === 1 ? p : 1) : 0
  const ghostOpacity = stage === 0 ? 0.4 * modelP : stage === 1 ? 0.4 * (1 - p) : 0
  const centerP = stage >= 1 ? (stage === 1 ? clamp01(p * 2) : 1) : 0
  const radiusP = stage >= 1 ? (stage === 1 ? clamp01(p * 2 - 0.5) : 1) : 0
  const principalP = stage === 0 ? modelP : 1

  const point0P = stage >= 2 ? (stage === 2 ? p : 1) : 0
  const point45P = stage >= 3 ? (stage === 3 ? clamp01((p - 0.1) / 0.5) : 1) : 0
  const point90P = stage >= 3 ? (stage === 3 ? clamp01((p - 0.35) / 0.5) : 1) : 0

  const gaugeDraw = (angle: number) => {
    if (angle === 0) return stage >= 2 ? (stage === 2 ? clamp01(p * 1.2) : 1) : 0
    if (stage < 3) return 0
    if (stage === 3) return clamp01((p - (angle === 45 ? 0 : 0.25)) / 0.65)
    return 1
  }

  const activeGauge = (angle: number) =>
    metric === 'gauge0' ? angle === 0 : metric === 'gauges' || metric === 'check' ? true : false
  const gaugeOpacity = (angle: number) => (activeGauge(angle) ? 1 : gaugesP > 0 ? 0.55 : 0)

  const points = [
    { point: P0, reveal: point0P, color: BLUE, label: '0°', reading: 'ε₀ = 606,42' },
    { point: P45, reveal: point45P, color: ORANGE, label: '45°', reading: 'ε₄₅ = 557,12' },
    { point: P90, reveal: point90P, color: GREEN, label: '90°', reading: 'ε₉₀ = −6,42' },
  ]

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 500 320"
          role="img"
          aria-label="Zadanie odwrotne rozety: dane odkształcenia główne 700 i minus 100 mikrostrain oraz kierunek 20 stopni. Animacja odtwarza koło Mohra, rzuty trzech kierunków czujników i odczyty 606,42, 557,12 oraz minus 6,42 mikrostrain."
        >
          <defs>
            <marker
              id="rosette3-axis"
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

          <text x={12} y={18} fontSize={9} fill={MUTED}>
            dane: εⅠ = 700 με · εⅡ = −100 με
          </text>
          <text x={12} y={32} fontSize={9} fill={MUTED}>
            kierunek główny φ = {PHI_LABEL}
          </text>
          <text x={12} y={46} fontSize={8.5} fill={VIOLET}>
            zadanie odwrotne
          </text>

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

          {GAUGES.map((gauge) => {
            const [x2, y2] = polar(gauge.angle)
            const draw = gaugeDraw(gauge.angle)
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

          <g stroke={AXIS} strokeWidth={1}>
            <line x1={MX0} y1={MY} x2={MX0 + MW + 6} y2={MY} markerEnd="url(#rosette3-axis)" />
            <line x1={xZero} y1={MY - 112} x2={xZero} y2={MY + 112} markerEnd="url(#rosette3-axis)" />
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

          {ghostOpacity > 0 && (
            <circle
              cx={xC}
              cy={MY}
              r={rPix}
              fill="none"
              stroke={BLUE}
              strokeWidth={1.6}
              strokeDasharray="5 5"
              opacity={ghostOpacity}
            />
          )}

          <motion.circle
            cx={xC}
            cy={MY}
            r={rPix}
            fill="none"
            stroke={BLUE}
            strokeWidth={2.2}
            initial={false}
            animate={{ pathLength: circleSolidP, opacity: circleSolidP > 0 ? 1 : 0 }}
            transition={{ duration: 0.18, ease: 'linear' }}
          />

          <motion.line
            x1={xC}
            y1={MY}
            x2={xOf(E1)}
            y2={MY}
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

          {points.map(({ point, reveal, color, label, reading }) => {
            const above = point.y < MY - 8
            const below = point.y > MY + 8
            const side = point.x > xC ? 1 : -1
            const textX = point.x + side * 6
            const textAnchor = side > 0 ? 'start' : 'end'
            const labelY = above ? point.y - 7 : below ? point.y + 14 : point.y - 7
            const readingY = above ? point.y - 20 : below ? point.y + 27 : point.y + 12
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
                  opacity={0.75}
                />
                <circle cx={point.x} cy={point.y} r={3.4} fill={color} />
                <circle cx={point.x} cy={MY} r={2} fill={color} />
                <text x={textX} y={labelY} textAnchor={textAnchor} fontSize={8.5} fill={color}>
                  {label}
                </text>
                <text x={textX} y={readingY} textAnchor={textAnchor} fontSize={8.5} fontWeight={600} fill={color}>
                  {reading}
                </text>
              </motion.g>
            )
          })}

          <motion.g initial={false} animate={{ opacity: principalP }}>
            <circle cx={xOf(E2)} cy={MY} r={3.8} fill={VIOLET} />
            <circle cx={xOf(E1)} cy={MY} r={3.8} fill={VIOLET} />
            <text x={xOf(E2) + 6} y={MY + 16} textAnchor="start" fontSize={9} fontWeight={600} fill={VIOLET}>
              εⅡ
            </text>
            <text x={xOf(E1) + 6} y={MY - 8} textAnchor="start" fontSize={9} fontWeight={600} fill={VIOLET}>
              εⅠ
            </text>
          </motion.g>

          {stage >= 4 && (
            <motion.g initial={false} animate={{ opacity: checkP }}>
              <path d={mohrArc(34, 2 * PHI)} fill="none" stroke={ORANGE} strokeWidth={2} strokeLinecap="round" />
              <text x={xC + Math.cos(PHI * RAD) * 50} y={MY - Math.sin(PHI * RAD) * 50 - 4} fontSize={9} fill={ORANGE}>
                2φ = {TWO_PHI_LABEL}
              </text>
              <line x1={P0.x} y1={MY} x2={P0.x} y2={P0.y} stroke={ORANGE} strokeWidth={2.2} />
              <text x={P0.x + 8} y={(MY + P0.y) / 2} fontSize={9} fill={ORANGE}>
                γ/2 = 257,12
              </text>
            </motion.g>
          )}

          {stage >= 5 && (
            <motion.g initial={false} animate={{ opacity: stressP }}>
              <text x={MX0} y={276} fontSize={9} fill={MUTED}>
                E = 200 GPa · ν = 0,30
              </text>
              <text x={MX0} y={290} fontSize={9} fill={VIOLET}>
                σⅠ = {SIGMA1} · σⅡ = {SIGMA2}
              </text>
            </motion.g>
          )}

          <motion.text
            initial={false}
            animate={{ opacity: at(3) }}
            x={12}
            y={310}
            textAnchor="start"
            fontSize={8}
            fill={MUTED}
          >
            γ = 514,23 μrad · ε₀ = 606,42 με · ε₄₅ = 557,12 με · ε₉₀ = −6,42 με
          </motion.text>
        </svg>
      </div>
    </div>
  )
}
