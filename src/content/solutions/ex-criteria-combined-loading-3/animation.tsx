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
const pl = (value: number) => value.toFixed(1).replace('.', ',')

function Shaft() {
  const left = 58
  const right = 402
  const y = 86
  const height = 58
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

function TwistedShaft({
  y,
  halfHeight,
  maxAngle,
  color,
  progress,
}: {
  y: number
  halfHeight: number
  maxAngle: number
  color: string
  progress: number
}) {
  const left = 96
  const right = 390
  const sections = Array.from({ length: 13 }, (_, index) => {
    const x = left + ((right - left) * index) / 12
    const ratio = (x - left) / (right - left)
    const angle = (maxAngle * Math.PI * smooth(ratio) * progress) / 180
    return {
      x,
      x1: x - halfHeight * Math.sin(angle),
      y1: y - halfHeight * Math.cos(angle),
      x2: x + halfHeight * Math.sin(angle),
      y2: y + halfHeight * Math.cos(angle),
    }
  })
  return (
    <g>
      <rect x={80} y={y - halfHeight - 14} width={9} height={halfHeight * 2 + 28} fill={EDGE} />
      {sections.map((section, index) => (
        <line
          key={index}
          x1={section.x1}
          y1={section.y1}
          x2={section.x2}
          y2={section.y2}
          stroke={color}
          strokeWidth={1.8}
          opacity={0.35 + 0.65 * (index / 12)}
        />
      ))}
      <polyline
        points={sections.map((section) => `${section.x1},${section.y1}`).join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        opacity={0.55}
      />
      <polyline
        points={sections.map((section) => `${section.x2},${section.y2}`).join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        opacity={0.55}
      />
      <line x1={left} y1={y} x2={right} y2={y} stroke={MUTED} strokeWidth={0.8} strokeDasharray="4 4" />
      <text x={right + 8} y={y + 4} fontSize={9} fill={color}>
        φ
      </text>
    </g>
  )
}

export function CombinedLoadingExample3Animation({ scene, playing, sceneProgress }: SolutionAnimationProps) {
  const metric = scene.focus?.metric ?? 'model'
  const p = playing ? smooth(sceneProgress) : 1

  const m = 1.2
  const t = 0.8
  const mEqHmh = 1.386
  const k = 117.5
  const dTarget = Math.cbrt((32 * (mEqHmh * 1_000_000)) / k / Math.PI)
  const scale = 175
  const originX = 150
  const originY = 235
  const legM = m * scale
  const legT = Math.sqrt(0.75) * t * scale

  const diameter = mix(40, dTarget, p)
  const radius = (diameter * 2.2) / 2
  const w = (Math.PI * diameter ** 3) / 32
  const sigma = (mEqHmh * 1_000_000) / w
  const gaugeX = 230 + Math.min(180, sigma)
  const targetX = 230 + k

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label="Projektowanie średnicy wału zginanego i skręcanego. Animacja pokazuje dane projektowe, moment zastępczy, dobór średnicy, porównanie HMH i Tresca, kontrolę naprężenia oraz warunek sztywności."
        >
          {metric === 'model' && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                M = 1,2 kN·m · T = 0,8 kN·m · N = 0
              </text>
              <text x={14} y={34} fontSize={9} fill={MUTED}>
                R_e = 235 MPa · n_wym = 2 → k = 117,5 MPa
              </text>
              <Shaft />
              <motion.path
                d="M 224 52 A 44 30 0 1 1 304 58"
                fill="none"
                stroke={ORANGE}
                strokeWidth={2.4}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: p, opacity: 1 }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
              <path d="M 298 48 L 306 60 L 292 62" fill="none" stroke={ORANGE} strokeWidth={2.4} />
              <text x={312} y={40} fontSize={10} fill={ORANGE}>
                M = 1,2 kN·m
              </text>

              <motion.ellipse
                cx={250}
                cy={115}
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
              <path d="M 288 125 L 298 112 L 284 108" fill="none" stroke={VIOLET} strokeWidth={2.4} />
              <text x={202} y={158} fontSize={10} fill={VIOLET}>
                T = 0,8 kN·m
              </text>

              <line x1={70} y1={228} x2={390} y2={228} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={390} y1={220} x2={390} y2={236} stroke={RED} strokeWidth={1.6} />
              <text x={390} y={250} textAnchor="middle" fontSize={9} fill={RED}>
                R_e
              </text>
              <motion.rect x={70} y={220} width={(k / 235) * 320 * p} height={16} fill={GREEN} fillOpacity={0.2} />
              <line x1={targetX} y1={214} x2={targetX} y2={242} stroke={GREEN} strokeWidth={1.8} />
              <text x={targetX} y={208} textAnchor="middle" fontSize={10} fontWeight={600} fill={GREEN}>
                k = 117,5 MPa
              </text>
              <text x={230} y={278} textAnchor="middle" fontSize={9} fill={MUTED}>
                naprężenie dopuszczalne wyznacza cel projektu
              </text>
            </g>
          )}

          {metric === 'eq' && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                M = 1,2 kN·m · T = 0,8 kN·m
              </text>
              <text x={230} y={62} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                moment zastępczy HMH: √(M² + 0,75T²)
              </text>

              <line
                x1={originX}
                y1={originY}
                x2={mix(originX, originX + legM, p)}
                y2={originY}
                stroke={ORANGE}
                strokeWidth={2.8}
              />
              <line
                x1={originX}
                y1={originY}
                x2={originX}
                y2={mix(originY, originY - legT, p)}
                stroke={VIOLET}
                strokeWidth={2.8}
              />
              <line
                x1={originX}
                y1={mix(originY, originY - legT, p)}
                x2={mix(originX, originX + legM, p)}
                y2={originY}
                stroke={GREEN}
                strokeWidth={2.8}
              />
              <path
                d={`M ${originX} ${originY - 12} L ${originX + 12} ${originY - 12} L ${originX + 12} ${originY}`}
                fill="none"
                stroke={MUTED}
                strokeWidth={1}
              />
              <text
                x={originX + legM / 2}
                y={originY + 20}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill={ORANGE}
              >
                M = 1,2
              </text>
              <text x={originX - 10} y={originY - legT / 2} textAnchor="end" fontSize={10} fill={VIOLET}>
                √0,75·T = 0,693
              </text>
              <text
                x={(originX + originX + legM) / 2 + 12}
                y={(originY + originY - legT) / 2 - 8}
                fontSize={10}
                fontWeight={600}
                fill={GREEN}
              >
                M_eq = 1,386 kN·m
              </text>
              <text x={230} y={280} textAnchor="middle" fontSize={9} fill={MUTED}>
                składowe M i √0,75·T są prostopadłe, więc wypadkowa to przeciwprostokątna
              </text>
            </g>
          )}

          {metric === 'design' && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                M_eq HMH = 1,386 kN·m · k = 117,5 MPa
              </text>
              <text x={230} y={50} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                średnica dobrana z warunku wytrzymałości
              </text>

              <circle cx={125} cy={150} r={radius} fill={FILL} stroke={BLUE} strokeWidth={2.2} />
              <line x1={125 - radius} y1={228} x2={125 + radius} y2={228} stroke={MUTED} strokeWidth={1} />
              <line x1={125 - radius} y1={222} x2={125 - radius} y2={234} stroke={MUTED} strokeWidth={1} />
              <line x1={125 + radius} y1={222} x2={125 + radius} y2={234} stroke={MUTED} strokeWidth={1} />
              <text x={125} y={248} textAnchor="middle" fontSize={10} fontWeight={600} fill={BLUE}>
                d = {pl(diameter)} mm
              </text>

              <line x1={230} y1={100} x2={410} y2={100} stroke="#c9d0d9" strokeWidth={1} />
              <line x1={230} y1={96} x2={230} y2={188} stroke="#c9d0d9" strokeWidth={1} />
              <text x={234} y={94} fontSize={9} fill={MUTED}>
                σ = M_eq / W
              </text>
              <rect x={230} y={122} width={180} height={34} rx={4} fill="#f2f5fa" stroke="#d9dfe7" />
              <motion.rect
                x={230}
                y={122}
                width={Math.max(0, gaugeX - 230)}
                height={34}
                rx={4}
                fill={sigma > k ? RED : GREEN}
                fillOpacity={0.32}
              />
              <line
                x1={targetX}
                y1={104}
                x2={targetX}
                y2={184}
                stroke={GREEN}
                strokeWidth={1.6}
                strokeDasharray="6 4"
              />
              <text x={targetX + 5} y={116} fontSize={9} fill={GREEN}>
                k = 117,5
              </text>
              <text x={236} y={144} fontSize={11} fontWeight={600} fill={sigma > k ? RED : GREEN}>
                {pl(sigma)} MPa
              </text>
              <text x={230} y={178} fontSize={9} fill={MUTED}>
                d rośnie → W rośnie → σ maleje
              </text>
              <text x={315} y={270} textAnchor="middle" fontSize={9} fill={MUTED}>
                przy d = 49,3 mm otrzymujemy W = 11 796 mm³ i σ = k
              </text>
            </g>
          )}

          {metric === 'criteria' && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                ten sam k = 117,5 MPa, dwa kryteria
              </text>
              <text x={125} y={68} textAnchor="middle" fontSize={10} fontWeight={600} fill={GREEN}>
                HMH
              </text>
              <text x={335} y={68} textAnchor="middle" fontSize={10} fontWeight={600} fill={ORANGE}>
                Tresca
              </text>

              <circle cx={125} cy={140} r={44.4 * p} fill={FILL} stroke={GREEN} strokeWidth={2.2} />
              <circle cx={335} cy={140} r={45 * p} fill={FILL} stroke={ORANGE} strokeWidth={2.2} />
              <line x1={80} y1={206} x2={170} y2={206} stroke={MUTED} strokeWidth={1} />
              <line x1={80} y1={200} x2={80} y2={212} stroke={MUTED} strokeWidth={1} />
              <line x1={170} y1={200} x2={170} y2={212} stroke={MUTED} strokeWidth={1} />
              <line x1={290} y1={206} x2={380} y2={206} stroke={MUTED} strokeWidth={1} />
              <line x1={290} y1={200} x2={290} y2={212} stroke={MUTED} strokeWidth={1} />
              <line x1={380} y1={200} x2={380} y2={212} stroke={MUTED} strokeWidth={1} />
              <text x={125} y={224} textAnchor="middle" fontSize={10} fontWeight={600} fill={GREEN}>
                d = 49,3 mm
              </text>
              <text x={335} y={224} textAnchor="middle" fontSize={10} fontWeight={600} fill={ORANGE}>
                d = 50,0 mm
              </text>
              <text x={125} y={94} textAnchor="middle" fontSize={9} fill={MUTED}>
                M_eq = 1,386 kN·m
              </text>
              <text x={335} y={94} textAnchor="middle" fontSize={9} fill={MUTED}>
                M_eq = 1,442 kN·m
              </text>
              <text x={230} y={252} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                Tresca wymaga większej średnicy
              </text>
              <text x={230} y={274} textAnchor="middle" fontSize={9} fill={MUTED}>
                obie średnice dobrano tak, aby σ_red osiągnęło k
              </text>
            </g>
          )}

          {metric === 'check' && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                po zaokrągleniu d = 50 mm · W = 12 272 mm³
              </text>
              <text x={70} y={78} fontSize={10} fontWeight={600} fill={INK}>
                naprężenie zredukowane względem k
              </text>
              <line x1={80} y1={218} x2={400} y2={218} stroke="#c9d0d9" strokeWidth={1} />
              {[0, 25, 50, 75, 100, 125].map((value) => {
                const x = 80 + (value / 130) * 320
                return (
                  <g key={value}>
                    <line x1={x} y1={214} x2={x} y2={222} stroke="#c9d0d9" strokeWidth={1} />
                    <text x={x} y={234} textAnchor="middle" fontSize={8} fill={MUTED}>
                      {value}
                    </text>
                  </g>
                )
              })}
              <line
                x1={80 + (k / 130) * 320}
                y1={94}
                x2={80 + (k / 130) * 320}
                y2={226}
                stroke={GREEN}
                strokeWidth={1.6}
                strokeDasharray="6 4"
              />
              <text x={80 + (k / 130) * 320 + 4} y={90} fontSize={9} fill={GREEN}>
                k
              </text>

              <rect x={80} y={108} width={320} height={28} rx={4} fill="#f2f5fa" stroke="#d9dfe7" />
              <motion.rect
                x={80}
                y={108}
                width={(112.9 / 130) * 320 * p}
                height={28}
                rx={4}
                fill={BLUE}
                fillOpacity={0.3}
              />
              <text x={88} y={128} fontSize={10} fontWeight={600} fill={INK}>
                HMH 112,9 MPa
              </text>

              <rect x={80} y={160} width={320} height={28} rx={4} fill="#f2f5fa" stroke="#d9dfe7" />
              <motion.rect
                x={80}
                y={160}
                width={(117.5 / 130) * 320 * p}
                height={28}
                rx={4}
                fill={ORANGE}
                fillOpacity={0.3}
              />
              <text x={88} y={180} fontSize={10} fontWeight={600} fill={INK}>
                Tresca 117,5 MPa
              </text>

              <circle cx={424} cy={146} r={12} fill="none" stroke={GREEN} strokeWidth={2} />
              <path d="M 418 146 L 422 151 L 430 140" fill="none" stroke={GREEN} strokeWidth={2.2} />
              <text x={424} y={172} textAnchor="middle" fontSize={8} fill={GREEN}>
                OK
              </text>
              <text x={230} y={266} textAnchor="middle" fontSize={9} fill={MUTED}>
                HMH ma zapas, Tresca leży praktycznie na granicy k
              </text>
            </g>
          )}

          {metric === 'stiffness' && (
            <g>
              <text x={14} y={20} fontSize={9} fill={MUTED}>
                φ = TL / (G·I₀), I₀ = πd⁴/32 → φ ~ 1/d⁴
              </text>
              <text x={230} y={48} textAnchor="middle" fontSize={10} fontWeight={600} fill={INK}>
                dobór wytrzymałościowy nie zastępuje sprawdzenia sztywności
              </text>
              <TwistedShaft y={104} halfHeight={16} maxAngle={30} color={BLUE} progress={p} />
              <TwistedShaft y={214} halfHeight={22} maxAngle={18} color={GREEN} progress={p} />
              <text x={96} y={62} fontSize={9} fill={BLUE}>
                d = 49,3 mm → większy kąt φ
              </text>
              <text x={96} y={266} fontSize={9} fill={GREEN}>
                d = 55 mm → mniejszy kąt φ
              </text>
              <text x={398} y={84} fontSize={9} fill={VIOLET}>
                T
              </text>
              <text x={398} y={190} fontSize={9} fill={VIOLET}>
                T
              </text>
              <text x={230} y={288} textAnchor="middle" fontSize={9} fill={MUTED}>
                w zadaniu projektowym liczymy oba warunki i wybieramy większą średnicę
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
