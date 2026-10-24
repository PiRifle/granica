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

function Shaft() {
  const left = 58
  const right = 402
  const y = 88
  const height = 60
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

function Header() {
  return (
    <g fontSize={9} fill={MUTED}>
      <text x={14} y={20}>
        d = 60 mm · N = −20 kN
      </text>
      <text x={14} y={34}>
        M = 1,2 kN·m · T = 500 N·m
      </text>
      <text x={14} y={48}>
        A = 2 827 mm² · W = 21 206 mm³
      </text>
    </g>
  )
}

function FiberMark({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={4} fill={color} stroke={INK} strokeWidth={0.9} />
      <text x={x + 8} y={y + 4} fontSize={9} fontWeight={600} fill={color}>
        {label}
      </text>
    </g>
  )
}

export function CombinedLoadingExample2Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'loads'
  const p = playing ? smooth(sceneProgress) : 1
  const profileAxis = 278
  const stressScale = 1.26
  const levels = [82, 110, 138, 166, 194, 222]
  const normalAt = (y: number) => -7.07 + 56.59 * ((150 - y) / 70)

  const tension = 49.52
  const compression = -63.66
  const tau = 11.79
  const hmhA = 53.6
  const hmhB = 66.9
  const trescaB = 67.9

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Pręt kołowy ściskany, zginany i skręcany. Animacja porównuje przeciwległe włókna, pokazuje przesunięty rozkład naprężeń normalnych, ścinanie od skręcania, redukcję HMH i Tresca oraz kontrolę zapasu."
        >
          {metric === 'loads' && (
            <g>
              <Header />
              <Shaft />
              <Arrow x1={22} y1={118} x2={mix(22, 58, p)} y2={118} color={BLUE} width={2.6} />
              <Arrow x1={438} y1={118} x2={mix(438, 402, p)} y2={118} color={BLUE} width={2.6} />
              <text x={10} y={102} fontSize={10} fill={BLUE}>
                N = −20 kN
              </text>
              <text x={400} y={102} fontSize={10} fill={BLUE}>
                N = −20 kN
              </text>

              <motion.path
                d="M 220 52 A 44 30 0 1 1 300 58"
                fill="none"
                stroke={ORANGE}
                strokeWidth={2.4}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: p, opacity: 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <path d="M 294 48 L 302 60 L 288 62" fill="none" stroke={ORANGE} strokeWidth={2.4} />
              <text x={238} y={36} fontSize={10} fill={ORANGE}>
                M = 1,2 kN·m
              </text>

              <motion.ellipse
                cx={250}
                cy={118}
                rx={42}
                ry={16}
                fill="none"
                stroke={VIOLET}
                strokeWidth={2.4}
                strokeDasharray="7 5"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              <path d="M 288 128 L 298 115 L 284 111" fill="none" stroke={VIOLET} strokeWidth={2.4} />
              <text x={204} y={162} fontSize={10} fill={VIOLET}>
                T = 500 N·m
              </text>

              <circle cx={370} cy={226} r={38} fill={FILL} stroke={EDGE} strokeWidth={1.6} />
              <line x1={332} y1={226} x2={408} y2={226} stroke={INK} strokeWidth={0.9} strokeDasharray="5 4" />
              <FiberMark x={370} y={188} label="A" color={BLUE} />
              <FiberMark x={370} y={264} label="B" color={RED} />
              <text x={370} y={282} textAnchor="middle" fontSize={9} fill={MUTED}>
                dwa przeciwległe włókna
              </text>
              <text x={230} y={292} textAnchor="middle" fontSize={9} fill={MUTED}>
                siła osiowa ściska, zginanie rozciąga górę i ściska dół
              </text>
            </g>
          )}

          {metric === 'normal' && (
            <g>
              <Header />
              <circle cx={115} cy={150} r={68} fill={FILL} stroke={EDGE} strokeWidth={1.8} />
              <line x1={47} y1={150} x2={183} y2={150} stroke={INK} strokeWidth={1} strokeDasharray="6 5" />
              <text x={50} y={144} fontSize={9} fill={MUTED}>
                oś obojętna
              </text>
              <FiberMark x={115} y={82} label="A" color={BLUE} />
              <FiberMark x={115} y={218} label="B" color={RED} />
              <text x={48} y={100} fontSize={9} fill={BLUE}>
                A: rozciąganie
              </text>
              <text x={48} y={208} fontSize={9} fill={RED}>
                B: ściskanie
              </text>

              <line x1={profileAxis} y1={72} x2={profileAxis} y2={230} stroke="#c9d0d9" strokeWidth={1} />
              <text x={profileAxis} y={244} textAnchor="middle" fontSize={9} fill={MUTED}>
                0
              </text>
              <text x={profileAxis - 8} y={66} textAnchor="end" fontSize={9} fill={MUTED}>
                σ
              </text>

              <line
                x1={profileAxis - 7.07 * stressScale * p}
                y1={82}
                x2={profileAxis - 7.07 * stressScale * p}
                y2={218}
                stroke={BLUE}
                strokeWidth={1.4}
                strokeDasharray="4 4"
                opacity={0.6}
              />
              <line
                x1={profileAxis + 56.59 * stressScale * p}
                y1={82}
                x2={profileAxis - 56.59 * stressScale * p}
                y2={218}
                stroke={ORANGE}
                strokeWidth={1.4}
                strokeDasharray="4 4"
                opacity={0.7}
              />
              <line
                x1={profileAxis + tension * stressScale * p}
                y1={82}
                x2={profileAxis + compression * stressScale * p}
                y2={218}
                stroke={INK}
                strokeWidth={2.2}
              />

              {levels.map((y) => {
                const stress = normalAt(y)
                return (
                  <Arrow
                    key={y}
                    x1={profileAxis}
                    y1={y}
                    x2={profileAxis + stress * stressScale * p}
                    y2={y}
                    color={stress >= 0 ? BLUE : RED}
                    width={1.3}
                  />
                )
              })}

              <text x={profileAxis - 7.07 * stressScale} y={70} textAnchor="middle" fontSize={9} fill={BLUE}>
                σ_N
              </text>
              <text x={profileAxis + 56.59 * stressScale} y={64} textAnchor="middle" fontSize={9} fill={ORANGE}>
                σ_M
              </text>
              <text
                x={profileAxis + tension * stressScale}
                y={52}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={BLUE}
              >
                A: +49,52 MPa
              </text>
              <text
                x={profileAxis + compression * stressScale}
                y={236}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={RED}
              >
                B: −63,66 MPa
              </text>
              <text x={230} y={278} textAnchor="middle" fontSize={9} fill={MUTED}>
                siła osiowa przesuwa cały wykres, zginanie go obraca
              </text>
            </g>
          )}

          {metric === 'fibers' && (
            <g>
              <Header />
              <circle cx={95} cy={150} r={68} fill={FILL} stroke={EDGE} strokeWidth={1.8} />
              <FiberMark x={95} y={82} label="A" color={BLUE} />
              <FiberMark x={95} y={218} label="B" color={RED} />
              <Arrow x1={104} y1={82} x2={104 + 30 * p} y2={82} color={VIOLET} width={2.3} />
              <Arrow x1={86} y1={218} x2={86 - 30 * p} y2={218} color={VIOLET} width={2.3} />
              <text x={108} y={64} fontSize={9} fill={VIOLET}>
                τ = 11,79
              </text>
              <text x={44} y={236} fontSize={9} fill={VIOLET}>
                τ = 11,79
              </text>
              <text x={34} y={270} fontSize={9} fill={MUTED}>
                ten sam moduł τ, przeciwne zwroty
              </text>

              <rect x={222} y={64} width={88} height={88} fill={FILL} stroke={EDGE} strokeWidth={1.6} />
              <Arrow x1={222} y1={108} x2={mix(222, 190, p)} y2={108} color={BLUE} width={2.3} />
              <Arrow x1={310} y1={108} x2={mix(310, 342, p)} y2={108} color={BLUE} width={2.3} />
              <Arrow x1={244} y1={64} x2={mix(244, 288, p)} y2={64} color={VIOLET} width={1.9} />
              <text x={266} y={148} textAnchor="middle" fontSize={9} fontWeight={600} fill={BLUE}>
                A: σ_x = +49,52
              </text>
              <text x={266} y={58} textAnchor="middle" fontSize={9} fill={VIOLET}>
                τ = 11,79
              </text>

              <rect x={222} y={178} width={88} height={88} fill={FILL} stroke={EDGE} strokeWidth={1.6} />
              <Arrow x1={190} y1={222} x2={mix(190, 222, p)} y2={222} color={RED} width={2.3} />
              <Arrow x1={342} y1={222} x2={mix(342, 310, p)} y2={222} color={RED} width={2.3} />
              <Arrow x1={266} y1={178} x2={mix(266, 222, p)} y2={178} color={VIOLET} width={1.9} />
              <text x={266} y={262} textAnchor="middle" fontSize={9} fontWeight={600} fill={RED}>
                B: σ_x = −63,66
              </text>
              <text x={266} y={198} textAnchor="middle" fontSize={9} fill={VIOLET}>
                τ = 11,79
              </text>
              <text x={352} y={108} fontSize={9} fill={MUTED}>
                element A
              </text>
              <text x={352} y={222} fontSize={9} fill={MUTED}>
                element B
              </text>
            </g>
          )}

          {metric === 'reduce' && (
            <g>
              <Header />
              <text x={70} y={74} fontSize={10} fontWeight={600} fill={INK}>
                wytężenie obu włókien
              </text>
              <text x={70} y={92} fontSize={9} fill={MUTED}>
                σ_x = 49,52 MPa (A) lub −63,66 MPa (B), τ = 11,79 MPa
              </text>

              <text x={70} y={128} fontSize={9} fontWeight={600} fill={BLUE}>
                HMH · włókno A
              </text>
              <rect x={180} y={114} width={230} height={22} rx={3} fill="#f2f5fa" stroke="#d9dfe7" />
              <motion.rect
                x={180}
                y={114}
                width={(hmhA / 70) * 230 * p}
                height={22}
                rx={3}
                fill={BLUE}
                fillOpacity={0.35}
              />
              <text x={186} y={130} fontSize={9} fill={INK}>
                {hmhA.toFixed(1).replace('.', ',')} MPa
              </text>

              <text x={70} y={178} fontSize={9} fontWeight={600} fill={RED}>
                HMH · włókno B
              </text>
              <rect x={180} y={164} width={230} height={22} rx={3} fill="#f2f5fa" stroke="#d9dfe7" />
              <motion.rect
                x={180}
                y={164}
                width={(hmhB / 70) * 230 * p}
                height={22}
                rx={3}
                fill={RED}
                fillOpacity={0.3}
              />
              <text x={186} y={180} fontSize={9} fill={INK}>
                {hmhB.toFixed(1).replace('.', ',')} MPa
              </text>

              <text x={70} y={228} fontSize={9} fontWeight={600} fill={ORANGE}>
                Tresca · włókno B
              </text>
              <rect x={180} y={214} width={230} height={22} rx={3} fill="#f2f5fa" stroke="#d9dfe7" />
              <motion.rect
                x={180}
                y={214}
                width={(trescaB / 70) * 230 * p}
                height={22}
                rx={3}
                fill={ORANGE}
                fillOpacity={0.3}
              />
              <text x={186} y={230} fontSize={9} fill={INK}>
                {trescaB.toFixed(1).replace('.', ',')} MPa
              </text>

              <line
                x1={180 + (hmhB / 70) * 230}
                y1={156}
                x2={180 + (hmhB / 70) * 230}
                y2={248}
                stroke={RED}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <text x={184 + (hmhB / 70) * 230} y={258} fontSize={9} fill={RED}>
                decyduje B
              </text>
              <text x={230} y={284} textAnchor="middle" fontSize={9} fill={MUTED}>
                większy moduł naprężenia normalnego w włóknie ściskanym przeważa nad różnicą znaku
              </text>
            </g>
          )}

          {metric === 'check' && (
            <g>
              <Header />
              <text x={70} y={82} fontSize={10} fontWeight={600} fill={INK}>
                kontrola przy R_e = 235 MPa
              </text>
              <line x1={70} y1={218} x2={400} y2={218} stroke="#c9d0d9" strokeWidth={1} />
              {[0, 50, 100, 150, 200].map((value) => {
                const x = 70 + (value / 235) * 330
                return (
                  <g key={value}>
                    <line x1={x} y1={214} x2={x} y2={222} stroke="#c9d0d9" strokeWidth={1} />
                    <text x={x} y={234} textAnchor="middle" fontSize={8} fill={MUTED}>
                      {value}
                    </text>
                  </g>
                )
              })}
              <line x1={400} y1={94} x2={400} y2={224} stroke={RED} strokeWidth={1.6} strokeDasharray="6 4" />
              <text x={404} y={90} fontSize={9} fill={RED}>
                R_e
              </text>

              <rect x={70} y={108} width={330} height={28} rx={4} fill="#f2f5fa" stroke="#d9dfe7" />
              <motion.rect
                x={70}
                y={108}
                width={(hmhB / 235) * 330 * p}
                height={28}
                rx={4}
                fill={GREEN}
                fillOpacity={0.34}
              />
              <text x={78} y={128} fontSize={10} fontWeight={600} fill={INK}>
                HMH włókno B: 66,9 MPa
              </text>
              <text x={70 + (hmhB / 235) * 330 * p + 8} y={128} fontSize={9} fill={GREEN}>
                n = 3,51
              </text>

              <rect x={70} y={160} width={330} height={28} rx={4} fill="#f2f5fa" stroke="#d9dfe7" />
              <motion.rect
                x={70}
                y={160}
                width={(trescaB / 235) * 330 * p}
                height={28}
                rx={4}
                fill={ORANGE}
                fillOpacity={0.3}
              />
              <text x={78} y={180} fontSize={10} fontWeight={600} fill={INK}>
                Tresca włókno B: 67,9 MPa
              </text>
              <text x={70 + (trescaB / 235) * 330 * p + 8} y={180} fontSize={9} fill={ORANGE}>
                n = 3,46
              </text>

              <circle cx={424} cy={146} r={12} fill="none" stroke={GREEN} strokeWidth={2} />
              <path d="M 418 146 L 422 151 L 430 140" fill="none" stroke={GREEN} strokeWidth={2.2} />
              <text x={424} y={172} textAnchor="middle" fontSize={8} fill={GREEN}>
                OK
              </text>
              <text x={230} y={270} textAnchor="middle" fontSize={9} fill={MUTED}>
                oba zapasy przekraczają 1, ale decyduje włókno ściskane B
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
