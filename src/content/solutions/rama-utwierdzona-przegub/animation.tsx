import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { Arrow, FixedSupport, RollerSupport } from '../../../components/solution-figures/statics-schematic'

const LOAD = '#ff6b45'
const MOMENT = '#a970dd'
const REACTION = '#2f7d5b'
const MUTED = '#87929d'
const INK = '#17202a'
const EDGE = '#4a5563'
const ACCENT = '#4f6df5'

const A = { x: 120, y: 270 }
const C = { x: 204, y: 144 }
const B = { x: 330, y: 270 }
const P_AT = { x: 267, y: 207 }
const P_TIP = { x: 237, y: 237 }

const status = [
  'Utwierdzenie A, przegub pośredni C i rolka B',
  'Wymiary poziome 2 + 1,5 + 1,5 m; pion 3 m',
  'q = 2,6 kN/m daje Q = 7,8 kN; P₁ = 14 kN ⊥ CB',
  'Przecięcie w C: na prawą część działają tylko P₁ i B_y',
  'P₁ ma składowe P₁x = P₁y = −9,899 kN',
  'Moment części prawej względem C: B_y = 9,899 kN',
  'A_x = 2,099 kN; A_y = 0; M_A = −5,998 kN·m',
  'Kontrola: ΣF_y = −9,899 + 9,899 = 0; M_A kręci zgodnie z zegarem',
]

export function FrameA10Animation({ index, playing }: SolutionAnimationProps) {
  const showDims = index >= 1
  const showLoads = index >= 2
  const showComponents = index >= 3
  const showReactions = index >= 4
  const isolateRight = index === 2
  const leftOpacity = isolateRight ? 0.3 : 1

  const pulse = playing ? { opacity: [0.78, 1, 0.78] } : { opacity: 1 }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Rama utwierdzona z przegubem pośrednim, rolką i obciążeniem ciągłym"
        >
          <title>Reakcje ramy A10</title>
          <desc>
            Rama utwierdzona w A, przegub C, rolka B, poziome obciążenie ciągłe q, siła P1 prostopadła do CB i moment.
          </desc>
          <defs>
            <marker
              id="a10-moment"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
            <marker id="a10-react" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
          </defs>

          {isolateRight && (
            <line
              x1={C.x}
              y1={C.y}
              x2={B.x}
              y2={B.y}
              stroke={ACCENT}
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.22"
            />
          )}

          <g>
            <g opacity={leftOpacity}>
              <line x1={A.x} y1={A.y} x2={A.x} y2={C.y} stroke={EDGE} strokeWidth="5" strokeLinecap="round" />
              <line x1={A.x} y1={C.y} x2={C.x} y2={C.y} stroke={EDGE} strokeWidth="5" strokeLinecap="round" />
              <circle cx={A.x} cy={A.y} r="3.2" fill={INK} />
              <FixedSupport x={A.x} y={A.y} side="left" height={70} />
            </g>
            <line x1={C.x} y1={C.y} x2={B.x} y2={B.y} stroke={EDGE} strokeWidth="5" strokeLinecap="round" />
            <circle cx={C.x} cy={C.y} r="3.4" fill={INK} />
            <circle cx={B.x} cy={B.y} r="3.2" fill={INK} />
            <RollerSupport x={B.x} y={B.y} />
          </g>

          {isolateRight && (
            <g>
              <circle cx={C.x} cy={C.y} r="7" fill="none" stroke={ACCENT} strokeWidth="1.6" />
              <text x={268} y={234} fontSize={9.5} fontWeight={700} fill={ACCENT}>
                część prawa
              </text>
            </g>
          )}

          {showDims && (
            <g stroke={MUTED} strokeWidth="1">
              <line x1={A.x} y1="300" x2={B.x} y2="300" />
              {[A.x, C.x, P_AT.x, B.x].map((x) => (
                <line key={`hx-${x}`} x1={x} y1="295" x2={x} y2="305" />
              ))}
              <line x1="76" y1={C.y} x2="76" y2={A.y} />
              <line x1="71" y1={C.y} x2="81" y2={C.y} />
              <line x1="71" y1={A.y} x2="81" y2={A.y} />
            </g>
          )}

          {showLoads && (
            <motion.g
              initial={false}
              animate={pulse}
              transition={playing ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            >
              <g opacity={leftOpacity}>
                <line x1="98" y1={C.y} x2="98" y2={A.y} stroke={LOAD} strokeWidth="1.4" opacity="0.5" />
                {Array.from({ length: 7 }, (_, step) => {
                  const y = C.y + (step * (A.y - C.y)) / 6
                  return <Arrow key={`q-${step}`} from={{ x: 98, y }} to={{ x: 118, y }} color={LOAD} width={1.6} />
                })}
                <Arrow from={{ x: 84, y: 207 }} to={{ x: 116, y: 207 }} color={LOAD} width={3} />
                <path
                  d="M 132 200 A 16 16 0 1 1 130 180"
                  fill="none"
                  stroke={MOMENT}
                  strokeWidth="2"
                  markerEnd="url(#a10-moment)"
                />
              </g>
              <Arrow from={P_AT} to={P_TIP} color={LOAD} width={3} />
            </motion.g>
          )}

          {showComponents && (
            <motion.g
              animate={playing ? { strokeDashoffset: [0, -9] } : { strokeDashoffset: 0 }}
              transition={playing ? { duration: 1.4, repeat: Infinity, ease: 'linear' } : { duration: 0.2 }}
              stroke={EDGE}
              strokeWidth="1.4"
              strokeDasharray="5 4"
              fill="none"
            >
              <line x1={P_AT.x} y1={P_AT.y} x2={P_TIP.x} y2={P_AT.y} />
              <line x1={P_TIP.x} y1={P_AT.y} x2={P_TIP.x} y2={P_TIP.y} />
            </motion.g>
          )}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <Arrow from={A} to={{ x: A.x + 34, y: A.y }} color={REACTION} width={3.2} />
              <Arrow from={B} to={{ x: B.x, y: B.y - 36 }} color={REACTION} width={3.2} />
              <path
                d="M 132 258 A 14 14 0 1 1 130 238"
                fill="none"
                stroke={REACTION}
                strokeWidth="2.2"
                markerEnd="url(#a10-react)"
              />
            </motion.g>
          )}

          <g>
            <text x={98} y={246} fontSize={11} fontWeight={700} fill={INK} textAnchor="end">
              A
            </text>
            <text x={208} y={136} fontSize={10.5} fontWeight={700} fill={INK}>
              C
            </text>
            <text x={338} y={262} fontSize={11} fontWeight={700} fill={INK}>
              B
            </text>
          </g>

          {showDims && (
            <g fontSize={9} fill={MUTED} textAnchor="middle">
              <text x="162" y="295">
                2
              </text>
              <text x="235" y="295">
                1,5
              </text>
              <text x="298" y="295">
                1,5
              </text>
              <text x="68" y="207">
                3
              </text>
            </g>
          )}

          {showLoads && (
            <motion.g
              initial={false}
              animate={pulse}
              transition={playing ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            >
              <g opacity={leftOpacity}>
                <text x="24" y="136" fontSize={9.5} fontWeight="600" fill={LOAD}>
                  q = 2,6 kN/m
                </text>
                <text x="24" y="186" fontSize={10} fontWeight="700" fill={LOAD}>
                  Q = 7,8 kN
                </text>
                <text x="142" y="180" fontSize={10} fontWeight="700" fill={MOMENT}>
                  M = 12 kN·m
                </text>
              </g>
              <text x="230" y="225" fontSize={10} fontWeight="700" fill={LOAD} textAnchor="end">
                P₁ = 14 kN
              </text>
              <text x="278" y="198" fontSize={9} fill={LOAD}>
                90°
              </text>
            </motion.g>
          )}

          {showReactions && (
            <g>
              <text x="160" y="260" fontSize={10} fontWeight="700" fill={REACTION}>
                A_x = 2,099 kN
              </text>
              <text x="160" y="278" fontSize={10} fontWeight="700" fill={REACTION}>
                A_y = 0
              </text>
              <text x="148" y="240" fontSize={10} fontWeight="700" fill={REACTION}>
                M_A = −5,998 kN·m
              </text>
              <text x="340" y="246" fontSize={10} fontWeight="700" fill={REACTION}>
                B_y = 9,899 kN
              </text>
            </g>
          )}

          <text x="230" y="330" textAnchor="middle" fontSize="11" fill={INK}>
            {status[Math.min(index, status.length - 1)]}
          </text>
        </svg>
      </div>
    </div>
  )
}
