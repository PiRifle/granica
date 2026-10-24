import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const BLUE = '#4f6df5'
const ORANGE = '#ff6b45'
const VIOLET = '#a970dd'
const GREEN = '#2e9e6b'
const RED = '#d84f28'
const MUTED = '#87929d'
const EDGE = '#68727e'
const INK = '#17202a'
const FILL = '#eef3fa'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}
const mix = (from: number, to: number, t: number) => from + (to - from) * t

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  width = 1.6,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  width?: number
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const length = Math.hypot(x2 - x1, y2 - y1)
  if (length < 0.8) return null
  const head = Math.min(7, length * 0.35)
  const wing = Math.min(3.6, length * 0.2)
  const baseX = x2 - head * Math.cos(angle)
  const baseY = y2 - head * Math.sin(angle)
  return (
    <g stroke={color} fill={color}>
      <line x1={x1} y1={y1} x2={baseX} y2={baseY} strokeWidth={width} strokeLinecap="round" />
      <polygon
        points={`${x2},${y2} ${baseX - wing * Math.sin(angle)},${baseY + wing * Math.cos(angle)} ${baseX + wing * Math.sin(angle)},${baseY - wing * Math.cos(angle)}`}
        stroke="none"
      />
    </g>
  )
}

function Shaft({ y = 96, height = 64 }: { y?: number; height?: number }) {
  const left = 58
  const right = 402
  return (
    <g>
      <rect x={left} y={y} width={right - left} height={height} fill="#e9eef7" stroke={EDGE} strokeWidth={1.6} />
      <ellipse cx={right} cy={y + height / 2} rx={9} ry={height / 2} fill="#dfe6f2" stroke={EDGE} strokeWidth={1.4} />
      <ellipse cx={left} cy={y + height / 2} rx={9} ry={height / 2} fill="#f5f7fc" stroke={EDGE} strokeWidth={1.4} />
      <line
        x1={left + 8}
        y1={y + height / 2}
        x2={right}
        y2={y + height / 2}
        stroke={MUTED}
        strokeWidth={0.8}
        strokeDasharray="5 5"
      />
    </g>
  )
}

function LoadHeader() {
  return (
    <g fontSize={9} fill={MUTED}>
      <text x={14} y={20}>
        d = 60 mm
      </text>
      <text x={14} y={34}>
        A = 2 827 mm² · W = 21 206 mm³
      </text>
      <text x={14} y={48}>
        W_o = 42 412 mm³ · R_e = 235 MPa
      </text>
    </g>
  )
}

export function CombinedLoadingExample1Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'loads'
  const p = playing ? smooth(sceneProgress) : 1
  const stressScale = 1.32
  const profileAxis = 300

  const levels = [80, 108, 136, 164, 192, 220]
  const normalAt = (y: number) => 10.61 + 56.59 * ((150 - y) / 70)
  const common = 10.61 * stressScale * p
  const bendingTop = 56.59 * stressScale * p
  const combinedTop = 67.2 * stressScale * p
  const combinedBottom = -45.98 * stressScale * p

  const hmhLeg = 67.2 * 1.5
  const hmhRise = Math.sqrt(3) * 18.86 * 1.5
  const trescaRise = 2 * 18.86 * 1.5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pręt kołowy obciążony siłą osiową, momentem gnącym i momentem skręcającym. Animacja prowadzi od obciążeń przez składowe naprężenia i stan w punkcie do hipotez HMH i Tresca oraz kontroli zapasu."
        >
          {metric === 'loads' && (
            <g>
              <LoadHeader />
              <Shaft />
              <Arrow x1={56} y1={128} x2={mix(56, 18, p)} y2={128} color={BLUE} width={2.6} />
              <Arrow x1={404} y1={128} x2={mix(404, 442, p)} y2={128} color={BLUE} width={2.6} />
              <text x={12} y={112} fontSize={10} fill={BLUE}>
                N = 30 kN
              </text>
              <text x={404} y={112} fontSize={10} fill={BLUE}>
                N = 30 kN
              </text>

              <motion.path
                d="M 232 56 A 44 30 0 1 1 312 62"
                fill="none"
                stroke={ORANGE}
                strokeWidth={2.4}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: p, opacity: 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <path d="M 306 52 L 314 64 L 300 66" fill="none" stroke={ORANGE} strokeWidth={2.4} />
              <text x={312} y={42} fontSize={10} fill={ORANGE}>
                M = 1,2 kN·m
              </text>

              <motion.ellipse
                cx={250}
                cy={128}
                rx={44}
                ry={17}
                fill="none"
                stroke={VIOLET}
                strokeWidth={2.4}
                strokeDasharray="7 5"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <path d="M 290 139 L 300 126 L 286 121" fill="none" stroke={VIOLET} strokeWidth={2.4} />
              <text x={206} y={174} fontSize={10} fill={VIOLET}>
                T = 800 N·m
              </text>

              <line x1={58} y1={182} x2={402} y2={182} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
              <line x1={58} y1={176} x2={58} y2={188} stroke={MUTED} strokeWidth={1} />
              <line x1={402} y1={176} x2={402} y2={188} stroke={MUTED} strokeWidth={1} />
              <text x={230} y={198} textAnchor="middle" fontSize={9} fill={MUTED}>
                jeden przekrój, trzy siły wewnętrzne
              </text>
              <text x={230} y={270} textAnchor="middle" fontSize={9} fill={MUTED}>
                obciążenia działają jednocześnie — nie dodajemy M i T jako liczb
              </text>
            </g>
          )}

          {metric === 'normal' && (
            <g>
              <LoadHeader />
              <circle cx={135} cy={150} r={70} fill={FILL} stroke={EDGE} strokeWidth={1.8} />
              <line x1={65} y1={150} x2={205} y2={150} stroke={INK} strokeWidth={1} strokeDasharray="6 5" />
              <text x={68} y={144} fontSize={9} fill={MUTED}>
                oś obojętna zginania
              </text>
              <text x={68} y={96} fontSize={9} fill={BLUE}>
                góra — rozciąganie
              </text>
              <text x={68} y={212} fontSize={9} fill={RED}>
                dół — ściskanie
              </text>
              <circle cx={135} cy={80} r={4.5} fill={BLUE} stroke={INK} strokeWidth={1} />
              <text x={145} y={74} fontSize={10} fontWeight={600} fill={BLUE}>
                A
              </text>
              <text x={145} y={88} fontSize={9} fill={MUTED}>
                skrajne włókno
              </text>

              <line x1={profileAxis} y1={70} x2={profileAxis} y2={232} stroke="#c9d0d9" strokeWidth={1} />
              <text x={profileAxis} y={246} textAnchor="middle" fontSize={9} fill={MUTED}>
                0
              </text>
              <text x={profileAxis - 8} y={64} textAnchor="end" fontSize={9} fill={MUTED}>
                σ
              </text>

              <line
                x1={profileAxis + common}
                y1={80}
                x2={profileAxis + common}
                y2={220}
                stroke={BLUE}
                strokeWidth={1.4}
                strokeDasharray="4 4"
                opacity={0.65}
              />
              <line
                x1={profileAxis + bendingTop}
                y1={80}
                x2={profileAxis - bendingTop}
                y2={220}
                stroke={ORANGE}
                strokeWidth={1.4}
                strokeDasharray="4 4"
                opacity={0.75}
              />
              <line
                x1={profileAxis + combinedTop}
                y1={80}
                x2={profileAxis + combinedBottom}
                y2={220}
                stroke={INK}
                strokeWidth={2.2}
              />

              {levels.map((y) => {
                const stress = normalAt(y)
                const tip = profileAxis + stress * stressScale * p
                return (
                  <Arrow key={y} x1={profileAxis} y1={y} x2={tip} y2={y} color={stress >= 0 ? BLUE : RED} width={1.4} />
                )
              })}

              <text x={profileAxis + common} y={70} textAnchor="middle" fontSize={9} fill={BLUE}>
                σ_N
              </text>
              <text x={profileAxis + bendingTop} y={62} textAnchor="middle" fontSize={9} fill={ORANGE}>
                σ_M
              </text>
              <text x={profileAxis + combinedTop} y={50} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                σ_x = 67,20 MPa
              </text>
              <text x={profileAxis + combinedBottom} y={238} textAnchor="middle" fontSize={9} fill={RED}>
                −45,98 MPa
              </text>
              <text x={230} y={278} textAnchor="middle" fontSize={9} fill={MUTED}>
                σ_x = N/A + M/W = 10,61 + 56,59 MPa w włóknie A
              </text>
            </g>
          )}

          {metric === 'shear' && (
            <g>
              <LoadHeader />
              <circle cx={135} cy={150} r={70} fill={FILL} stroke={EDGE} strokeWidth={1.8} />
              <circle cx={135} cy={150} r={2.8} fill={INK} />
              {Array.from({ length: 12 }, (_, index) => {
                const angle = (index * Math.PI) / 6
                const radius = 78
                const x = 135 + Math.cos(angle) * radius
                const y = 150 + Math.sin(angle) * radius
                const tangent = angle + Math.PI / 2
                const length = 14 * p
                return (
                  <Arrow
                    key={index}
                    x1={x}
                    y1={y}
                    x2={x + Math.cos(tangent) * length}
                    y2={y + Math.sin(tangent) * length}
                    color={VIOLET}
                    width={1.4}
                  />
                )
              })}
              <circle cx={135} cy={80} r={4.5} fill={VIOLET} stroke={INK} strokeWidth={1} />
              <Arrow x1={144} y1={80} x2={144 + 30 * p} y2={80} color={VIOLET} width={2.4} />
              <text x={155} y={74} fontSize={10} fontWeight={600} fill={VIOLET}>
                A
              </text>
              <text x={68} y={238} fontSize={9} fill={MUTED}>
                τ rośnie liniowo od środka do obwodu
              </text>

              <line x1={300} y1={82} x2={300} y2={218} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={300} y1={150} x2={420} y2={150} stroke="#c9d0d9" strokeWidth={1} />
              <text x={300} y={232} textAnchor="middle" fontSize={9} fill={MUTED}>
                0
              </text>
              <text x={423} y={154} fontSize={9} fill={MUTED}>
                τ
              </text>
              <text x={282} y={96} textAnchor="end" fontSize={9} fill={MUTED}>
                r = c
              </text>
              <path d={`M 300 150 L 300 82 L ${300 + 18.86 * 6 * p} 82 Z`} fill={VIOLET} fillOpacity={0.16} />
              <line x1={300} y1={150} x2={300 + 18.86 * 6 * p} y2={82} stroke={VIOLET} strokeWidth={2.2} />
              <line x1={300} y1={82} x2={300 + 18.86 * 6 * p} y2={82} stroke={VIOLET} strokeWidth={2.2} />
              <text x={300 + 18.86 * 6 * p} y={72} textAnchor="middle" fontSize={10} fontWeight={600} fill={VIOLET}>
                τ = 18,86 MPa
              </text>
              <text x={230} y={272} textAnchor="middle" fontSize={9} fill={MUTED}>
                τ = T/W_o, W_o = 2W; w środku τ = 0
              </text>
            </g>
          )}

          {metric === 'state' && (
            <g>
              <LoadHeader />
              <rect x={85} y={95} width={110} height={110} fill={FILL} stroke={EDGE} strokeWidth={1.8} />
              <Arrow x1={85} y1={150} x2={mix(85, 42, p)} y2={150} color={BLUE} width={2.6} />
              <Arrow x1={195} y1={150} x2={mix(195, 238, p)} y2={150} color={BLUE} width={2.6} />
              <Arrow x1={110} y1={95} x2={mix(110, 172, p)} y2={95} color={VIOLET} width={2.2} />
              <Arrow x1={170} y1={205} x2={mix(170, 108, p)} y2={205} color={VIOLET} width={2.2} />
              <text x={140} y={172} textAnchor="middle" fontSize={10} fontWeight={600} fill={BLUE}>
                σ_x = 67,20
              </text>
              <text x={140} y={86} textAnchor="middle" fontSize={10} fontWeight={600} fill={VIOLET}>
                τ = 18,86 MPa
              </text>
              <text x={58} y={240} fontSize={9} fill={MUTED}>
                element w włóknie A
              </text>

              <text x={352} y={96} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                koło Mohra
              </text>
              <line x1={260} y1={170} x2={426} y2={170} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={300} y1={178} x2={300} y2={162} stroke={MUTED} strokeWidth={1} />
              <motion.circle cx={350.4} cy={170} r={38.53 * 1.5 * p} fill="none" stroke={GREEN} strokeWidth={2} />
              <motion.line
                x1={350.4}
                y1={170}
                x2={350.4 + 38.53 * 1.5 * p}
                y2={170}
                stroke={GREEN}
                strokeWidth={1.4}
                strokeDasharray="4 4"
              />
              <circle cx={350.4} cy={170} r={2.5} fill={INK} />
              <text x={350.4 + 38.53 * 1.5 * p} y={158} textAnchor="middle" fontSize={9} fill={GREEN}>
                σ₁ = 72,1
              </text>
              <text x={350.4 - 38.53 * 1.5 * p} y={190} textAnchor="middle" fontSize={9} fill={RED}>
                σ₂ = −4,9
              </text>
              <text x={350.4} y={132} textAnchor="middle" fontSize={9} fill={GREEN}>
                R = τ_max = 38,5 MPa
              </text>
              <text x={230} y={272} textAnchor="middle" fontSize={9} fill={MUTED}>
                σ_y = σ_z = 0, więc stan opisują dwie liczby: σ_x i τ
              </text>
            </g>
          )}

          {metric === 'reduce' && (
            <g>
              <LoadHeader />
              <text x={85} y={62} fontSize={10} fontWeight={600} fill={GREEN}>
                HMH: √(σ_x² + 3τ²)
              </text>
              <text x={260} y={62} fontSize={10} fontWeight={600} fill={ORANGE}>
                Tresca: √(σ_x² + 4τ²)
              </text>

              <line x1={85} y1={238} x2={mix(85, 85 + hmhLeg, p)} y2={238} stroke={BLUE} strokeWidth={2.6} />
              <line x1={85} y1={238} x2={85} y2={mix(238, 238 - hmhRise, p)} stroke={VIOLET} strokeWidth={2.6} />
              <line
                x1={85}
                y1={mix(238, 238 - hmhRise, p)}
                x2={mix(85, 85 + hmhLeg, p)}
                y2={238}
                stroke={GREEN}
                strokeWidth={2.6}
              />
              <text x={85 + hmhLeg / 2} y={254} textAnchor="middle" fontSize={9} fill={BLUE}>
                σ_x = 67,20
              </text>
              <text x={76} y={238 - hmhRise / 2} textAnchor="end" fontSize={9} fill={VIOLET}>
                √3τ = 32,68
              </text>
              <text x={85 + hmhLeg / 2 + 4} y={174} fontSize={10} fontWeight={600} fill={GREEN}>
                σ_HMH = 74,72 MPa
              </text>

              <line x1={260} y1={238} x2={mix(260, 260 + hmhLeg, p)} y2={238} stroke={BLUE} strokeWidth={2.6} />
              <line x1={260} y1={238} x2={260} y2={mix(238, 238 - trescaRise, p)} stroke={VIOLET} strokeWidth={2.6} />
              <line
                x1={260}
                y1={mix(238, 238 - trescaRise, p)}
                x2={mix(260, 260 + hmhLeg, p)}
                y2={238}
                stroke={ORANGE}
                strokeWidth={2.6}
              />
              <text x={260 + hmhLeg / 2} y={254} textAnchor="middle" fontSize={9} fill={BLUE}>
                σ_x = 67,20
              </text>
              <text x={251} y={238 - trescaRise / 2} textAnchor="end" fontSize={9} fill={VIOLET}>
                2τ = 37,72
              </text>
              <text x={260 + hmhLeg / 2 + 4} y={166} fontSize={10} fontWeight={600} fill={ORANGE}>
                σ_T = 77,06 MPa
              </text>
              <text x={230} y={278} textAnchor="middle" fontSize={9} fill={MUTED}>
                hipotezy nie dodają naprężeń wprost — składają je przez kwadraty
              </text>
            </g>
          )}

          {metric === 'check' && (
            <g>
              <LoadHeader />
              <text x={70} y={82} fontSize={10} fontWeight={600} fill={INK}>
                wykorzystanie granicy R_e = 235 MPa
              </text>
              <line x1={70} y1={220} x2={400} y2={220} stroke="#c9d0d9" strokeWidth={1} />
              {[0, 50, 100, 150, 200].map((value) => {
                const x = 70 + (value / 235) * 330
                return (
                  <g key={value}>
                    <line x1={x} y1={216} x2={x} y2={224} stroke="#c9d0d9" strokeWidth={1} />
                    <text x={x} y={236} textAnchor="middle" fontSize={8} fill={MUTED}>
                      {value}
                    </text>
                  </g>
                )
              })}
              <line x1={400} y1={94} x2={400} y2={226} stroke={RED} strokeWidth={1.6} strokeDasharray="6 4" />
              <text x={404} y={90} fontSize={9} fill={RED}>
                R_e
              </text>

              <rect x={70} y={112} width={330} height={28} rx={4} fill="#f2f5fa" stroke="#d9dfe7" />
              <motion.rect
                x={70}
                y={112}
                width={(74.72 / 235) * 330 * p}
                height={28}
                rx={4}
                fill={GREEN}
                fillOpacity={0.35}
              />
              <text x={78} y={132} fontSize={10} fontWeight={600} fill={INK}>
                HMH 74,72 MPa
              </text>
              <text x={70 + (74.72 / 235) * 330 * p + 8} y={132} fontSize={9} fill={GREEN}>
                n = 3,14
              </text>

              <rect x={70} y={162} width={330} height={28} rx={4} fill="#f2f5fa" stroke="#d9dfe7" />
              <motion.rect
                x={70}
                y={162}
                width={(77.06 / 235) * 330 * p}
                height={28}
                rx={4}
                fill={ORANGE}
                fillOpacity={0.32}
              />
              <text x={78} y={182} fontSize={10} fontWeight={600} fill={INK}>
                Tresca 77,06 MPa
              </text>
              <text x={70 + (77.06 / 235) * 330 * p + 8} y={182} fontSize={9} fill={ORANGE}>
                n = 3,05
              </text>

              <circle cx={424} cy={130} r={12} fill="none" stroke={GREEN} strokeWidth={2} />
              <path d="M 418 130 L 422 135 L 430 124" fill="none" stroke={GREEN} strokeWidth={2.2} />
              <text x={424} y={156} textAnchor="middle" fontSize={8} fill={GREEN}>
                OK
              </text>
              <text x={230} y={270} textAnchor="middle" fontSize={9} fill={MUTED}>
                oba zapasy przekraczają 1 — element jest bezpieczny z dużym marginesem
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
