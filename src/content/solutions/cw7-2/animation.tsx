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

const RX = 104
const RY = 154
const RR = 78
const MX0 = 240
const MW = 226
const MY = 154

const CENTER = 1.5
const RADIUS = 293.7252
const E1 = CENTER + RADIUS
const E2 = CENTER - RADIUS
const PHI = 12.432

const SIGMA_I = '45,62 MPa'
const SIGMA_II = '−44,76 MPa'

const RAD = Math.PI / 180
const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const fmt = (value: number, digits = 2) => value.toFixed(digits).replace('.', ',').replace('-', '−')

const STAGES: Record<string, number> = {
  gauges: 0,
  shear: 1,
  mohr: 2,
  principal: 3,
  angle: 4,
  stress: 5,
}

const GAUGES = [
  { angle: 0, color: BLUE, display: '268 με' },
  { angle: 45, color: ORANGE, display: '125 με' },
  { angle: 90, color: GREEN, display: '−265 με' },
]

const minV = Math.min(0, E2)
const maxV = Math.max(0, E1)
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
const principalArc = `M ${P0.x} ${P0.y} A ${rPix} ${rPix} 0 0 1 ${xC + rPix} ${MY}`

export function RosetteMohrAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'gauges'
  const stage = STAGES[metric] ?? 0
  const p = playing ? smooth(sceneProgress) : 1
  const at = (step: number) => (stage > step ? 1 : stage === step ? p : 0)

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

  const activeGauge = (angle: number) => (stage === 0 ? true : stage === 1 ? angle === 45 : false)
  const gaugeOpacity = (angle: number) => {
    if (stage === 0) return 1
    if (stage === 1) return angle === 45 ? 1 : 0.45
    return 0.55
  }
  const gaugeDraw = (gaugeIndex: number) => clamp01((gaugesP - gaugeIndex * 0.18) / 0.64)

  const points = [
    { point: P0, reveal: point0P, color: BLUE, label: '0°' },
    { point: P45, reveal: point45P, color: ORANGE, label: '45°' },
    { point: P90, reveal: point90P, color: GREEN, label: '90°' },
  ]

  const stressAngleI = PHI * RAD
  const stressAngleII = (PHI + 90) * RAD
  const stressEndI = [RX + Math.cos(stressAngleI) * 62, RY - Math.sin(stressAngleI) * 62] as const
  const stressStartII = [RX + Math.cos(stressAngleII) * 72, RY - Math.sin(stressAngleII) * 72] as const
  const stressEndII = [RX + Math.cos(stressAngleII) * 40, RY - Math.sin(stressAngleII) * 40] as const

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 500 330"
          role="img"
          aria-label="Rozeta tensometryczna 0, 45 i 90 stopni z odczytami oraz koło Mohra odkształceń. Animacja pokazuje kierunki czujników, odkształcenie postaciowe, środek i promień koła, odkształcenia główne, kąt 12,432 stopnia oraz naprężenia główne."
        >
          <defs>
            <marker
              id="cw72-axis-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={MUTED} />
            </marker>
            <marker
              id="cw72-tension-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={ORANGE} />
            </marker>
            <marker
              id="cw72-compression-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill={BLUE} />
            </marker>
          </defs>

          <g stroke={AXIS} strokeWidth={1} strokeDasharray="4 4">
            <line x1={RX - RR - 18} y1={RY} x2={RX + RR + 18} y2={RY} />
            <line x1={RX} y1={RY - RR - 18} x2={RX} y2={RY + RR + 18} />
          </g>
          <text x={RX + RR + 22} y={RY - 5} fontSize={9} fill={MUTED}>
            x
          </text>
          <text x={RX + 5} y={RY - RR - 22} fontSize={9} fill={MUTED}>
            y
          </text>

          {GAUGES.map((gauge, gaugeIndex) => {
            const [x2, y2] = polar(gauge.angle)
            const draw = gaugeDraw(gaugeIndex)
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

          {stage >= 4 && (
            <motion.g initial={false} animate={{ opacity: angleP }} transition={{ duration: 0.3 }}>
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
              <path d={arcPath(0, PHI, 32)} fill="none" stroke={ORANGE} strokeWidth={2} strokeLinecap="round" />
              {stage === 4 && (
                <>
                  <text
                    x={polar(PHI / 2, 45)[0]}
                    y={polar(PHI / 2, 45)[1]}
                    textAnchor="middle"
                    fontSize={8.5}
                    fill={ORANGE}
                  >
                    φ = {fmt(PHI, 3)}°
                  </text>
                  <text
                    x={polar(PHI, RR + 15)[0]}
                    y={polar(PHI, RR + 15)[1] - 6}
                    textAnchor="middle"
                    fontSize={9}
                    fill={VIOLET}
                  >
                    εI
                  </text>
                  <text
                    x={polar(PHI + 90, RR + 15)[0] - 4}
                    y={polar(PHI + 90, RR + 15)[1]}
                    textAnchor="end"
                    fontSize={9}
                    fill={VIOLET}
                  >
                    εII
                  </text>
                </>
              )}
            </motion.g>
          )}

          {stage === 5 && (
            <motion.g initial={false} animate={{ opacity: stressP }} transition={{ duration: 0.3 }}>
              <line
                x1={RX}
                y1={RY}
                x2={stressEndI[0]}
                y2={stressEndI[1]}
                stroke={ORANGE}
                strokeWidth={2.4}
                markerEnd="url(#cw72-tension-arrow)"
              />
              <line
                x1={stressStartII[0]}
                y1={stressStartII[1]}
                x2={stressEndII[0]}
                y2={stressEndII[1]}
                stroke={BLUE}
                strokeWidth={2.4}
                markerEnd="url(#cw72-compression-arrow)"
              />
              <text x={stressEndI[0] - 4} y={stressEndI[1] - 8} fontSize={8} fontWeight={600} fill={ORANGE}>
                σI = {SIGMA_I}
              </text>
              <text
                x={stressEndII[0] - 4}
                y={stressEndII[1] + 4}
                textAnchor="end"
                fontSize={8}
                fontWeight={600}
                fill={BLUE}
              >
                σII = {SIGMA_II}
              </text>
              <text x={RX} y={258} textAnchor="middle" fontSize={8.5} fill={MUTED}>
                E = 200 GPa · ν = 0,30
              </text>
              <text x={RX} y={272} textAnchor="middle" fontSize={8.5} fill={VIOLET}>
                płaski stan naprężenia
              </text>
            </motion.g>
          )}

          <g stroke={AXIS} strokeWidth={1}>
            <line x1={MX0} y1={MY} x2={MX0 + MW + 8} y2={MY} markerEnd="url(#cw72-axis-arrow)" />
            <line x1={xZero} y1={MY - 118} x2={xZero} y2={MY + 118} markerEnd="url(#cw72-axis-arrow)" />
          </g>
          <text x={MX0 + MW + 10} y={MY - 7} textAnchor="end" fontSize={9} fill={MUTED}>
            ε
          </text>
          <text x={xZero + 6} y={MY - 102} fontSize={9} fill={MUTED}>
            γ/2
          </text>
          <text x={MX0 + MW / 2} y={22} textAnchor="middle" fontSize={9} fill={MUTED}>
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

          <motion.g initial={false} animate={{ opacity: centerP }} transition={{ duration: 0.25 }}>
            <circle cx={xC} cy={MY} r={3.6} fill={INK} />
            <text x={xC} y={MY + 17} textAnchor="middle" fontSize={9} fill={INK}>
              C
            </text>
            <text x={xC + 6} y={MY - 8} fontSize={8.5} fill={VIOLET}>
              R_ε
            </text>
          </motion.g>

          {stage === 1 && (
            <motion.g initial={false} animate={{ opacity: shearP }} transition={{ duration: 0.25 }}>
              <line x1={P0.x} y1={P0.y} x2={P90.x} y2={P90.y} stroke={VIOLET} strokeWidth={1.6} strokeDasharray="5 4" />
              <line x1={P0.x} y1={P0.y} x2={P0.x} y2={MY} stroke={BLUE} strokeWidth={1} strokeDasharray="3 3" />
              <line x1={P90.x} y1={P90.y} x2={P90.x} y2={MY} stroke={GREEN} strokeWidth={1} strokeDasharray="3 3" />
              <text x={P0.x + 6} y={(P0.y + MY) / 2} fontSize={8} fill={BLUE}>
                +γ/2
              </text>
              <text x={P90.x - 6} y={(P90.y + MY) / 2} textAnchor="end" fontSize={8} fill={GREEN}>
                −γ/2
              </text>
            </motion.g>
          )}

          {points.map(({ point, reveal, color, label }) => {
            const above = point.y < MY - 8
            const below = point.y > MY + 8
            const labelY = above ? point.y - 7 : below ? point.y + 14 : point.y - 7
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
                  opacity={0.55}
                />
                <circle cx={point.x} cy={point.y} r={3.4} fill={color} />
                <circle cx={point.x} cy={MY} r={2} fill={color} />
                <text
                  x={point.x + (point.x > xC ? 6 : -6)}
                  y={labelY}
                  textAnchor={point.x > xC ? 'start' : 'end'}
                  fontSize={8.5}
                  fill={color}
                >
                  {label}
                </text>
              </motion.g>
            )
          })}

          <motion.g initial={false} animate={{ opacity: principalP }} transition={{ duration: 0.25 }}>
            <circle cx={xOf(E2)} cy={MY} r={3.8} fill={VIOLET} />
            <circle cx={xOf(E1)} cy={MY} r={3.8} fill={VIOLET} />
            <text x={xOf(E2) + 4} y={MY - 9} textAnchor="middle" fontSize={9} fontWeight={600} fill={VIOLET}>
              εII
            </text>
            <text x={xOf(E1) - 4} y={MY - 9} textAnchor="middle" fontSize={9} fontWeight={600} fill={VIOLET}>
              εI
            </text>
          </motion.g>

          {stage >= 4 && (
            <motion.g initial={false} animate={{ opacity: angleP }} transition={{ duration: 0.25 }}>
              <path d={principalArc} fill="none" stroke={ORANGE} strokeWidth={2} strokeLinecap="round" />
              <text x={xC + rPix - 16} y={MY + 18} textAnchor="end" fontSize={8.5} fill={ORANGE}>
                2φ = {fmt(2 * PHI, 3)}°
              </text>
            </motion.g>
          )}

          <text x={12} y={316} fontSize={8} fill={MUTED}>
            {index + 1}. {scene.title}
          </text>
        </svg>
      </div>
      <p className={local('note')}>
        {stage <= 1
          ? 'Trzy czujniki rozety dają ε₀, ε₄₅ i ε₉₀; z nich wyznaczamy γ_xy.'
          : stage <= 3
            ? 'Koło Mohra rysujemy w osiach (ε, γ/2), a jego skrajne punkty to odkształcenia główne.'
            : 'Kierunki główne obracają się o φ od czujnika 0°, a naprężenia wynikają z modelu materiału.'}
      </p>
    </div>
  )
}
