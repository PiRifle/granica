import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'
import { Arrow, PinSupport, RollerSupport } from '../../../components/solution-figures/statics-schematic'

const LOAD = '#ff6b45'
const MOMENT = '#a970dd'
const REACTION = '#2f7d5b'
const MUTED = '#87929d'
const INK = '#17202a'
const EDGE = '#4a5563'

const A = { x: 100, y: 258 }
const B = { x: 310, y: 258 }
const TOP = 153
const C = { x: 226, y: TOP }
const FREE = { x: 394, y: TOP }
const P_TIP = { x: FREE.x - 32, y: FREE.y + 32 }
const Q_AT = { x: 163, y: TOP }

const status = [
  'Rama: przegub A, rolka B, obciążenia q, P₁ i moment M',
  'Wymiary: 3 + 2 + 2 m, wysokość 2,5 m; q na lewym pasie',
  'q daje Q = 7,2 kN w x = 1,5 m; P₁ = 13 kN pod 45°',
  'P₁ rozkładamy na P₁x = P₁y = −9,192 kN',
  'A_x = 9,192 kN; A_y = 3,959 kN; B_y = 12,433 kN',
  'Znaki: +x w prawo, +y w górę; M kręci zgodnie z zegarem',
  'Kontrola ΣM_B: 9,192·2,5 − 9,192·2 − 7,2·3,5 + 10 ≈ 0',
]

export function FrameA09Animation({ index, playing }: SolutionAnimationProps) {
  const showDims = index >= 1
  const showLoads = index >= 2
  const showComponents = index >= 3
  const showReactions = index >= 4

  const pulse = playing ? { opacity: [0.78, 1, 0.78] } : { opacity: 1 }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Rama płaska z przegubem, rolką, obciążeniem ciągłym i momentem"
        >
          <title>Reakcje ramy A09</title>
          <desc>
            Rama o wysokości 2,5 m, przegub w A, rolka w B, obciążenie ciągłe q, siła P1 pod 45° i moment przy B.
          </desc>
          <defs>
            <marker
              id="a09-moment"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
            </marker>
          </defs>

          <g>
            <line x1={A.x} y1={A.y} x2={A.x} y2={TOP} stroke={EDGE} strokeWidth="5" strokeLinecap="round" />
            <line x1={A.x} y1={TOP} x2={FREE.x} y2={TOP} stroke={EDGE} strokeWidth="5" strokeLinecap="round" />
            <line x1={B.x} y1={TOP} x2={B.x} y2={B.y} stroke={EDGE} strokeWidth="5" strokeLinecap="round" />
            <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={MUTED} strokeWidth="1.1" strokeDasharray="5 4" />
            <circle cx={A.x} cy={A.y} r="3.2" fill={INK} />
            <circle cx={B.x} cy={B.y} r="3.2" fill={INK} />
            <circle cx={C.x} cy={C.y} r="3" fill={INK} />
            <PinSupport x={A.x} y={A.y} />
            <RollerSupport x={B.x} y={B.y} />
          </g>

          {showDims && (
            <g stroke={MUTED} strokeWidth="1">
              <line x1={A.x} y1="292" x2={FREE.x} y2="292" />
              {[A.x, C.x, B.x, FREE.x].map((x) => (
                <line key={`hx-${x}`} x1={x} y1="287" x2={x} y2="297" />
              ))}
              <line x1="80" y1={TOP} x2="80" y2={A.y} />
              <line x1="75" y1={TOP} x2="85" y2={TOP} />
              <line x1="75" y1={A.y} x2="85" y2={A.y} />
            </g>
          )}

          {showLoads && (
            <motion.g
              initial={false}
              animate={pulse}
              transition={playing ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            >
              <line x1={A.x} y1="133" x2={C.x} y2="133" stroke={LOAD} strokeWidth="1.4" opacity="0.5" />
              {Array.from({ length: 7 }, (_, step) => {
                const x = A.x + (step * (C.x - A.x)) / 6
                return <Arrow key={`q-${step}`} from={{ x, y: 133 }} to={{ x, y: TOP }} color={LOAD} width={1.6} />
              })}
              <Arrow from={Q_AT} to={{ x: Q_AT.x, y: TOP + 37 }} color={LOAD} width={3} />
              <Arrow from={FREE} to={P_TIP} color={LOAD} width={3} />
              <path
                d="M 322 208 A 15 15 0 1 1 320 188"
                fill="none"
                stroke={MOMENT}
                strokeWidth="2"
                markerEnd="url(#a09-moment)"
              />
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
              <line x1={FREE.x} y1={FREE.y} x2={P_TIP.x} y2={FREE.y} />
              <line x1={P_TIP.x} y1={FREE.y} x2={P_TIP.x} y2={P_TIP.y} />
            </motion.g>
          )}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
              <Arrow from={A} to={{ x: A.x + 36, y: A.y }} color={REACTION} width={3.2} />
              <Arrow from={A} to={{ x: A.x, y: A.y - 44 }} color={REACTION} width={3.2} />
              <Arrow from={B} to={{ x: B.x, y: B.y - 44 }} color={REACTION} width={3.2} />
            </motion.g>
          )}

          <g>
            <text x={88} y={248} fontSize={11} fontWeight={700} fill={INK} textAnchor="end">
              A
            </text>
            <text x={300} y={250} fontSize={11} fontWeight={700} fill={INK} textAnchor="end">
              B
            </text>
            <text x={232} y={147} fontSize={10.5} fontWeight={700} fill={INK}>
              C
            </text>
          </g>

          {showDims && (
            <g fontSize={9} fill={MUTED} textAnchor="middle">
              <text x="163" y="287">
                3
              </text>
              <text x="268" y="287">
                2
              </text>
              <text x="352" y="287">
                2
              </text>
              <text x="72" y="205">
                2,5
              </text>
            </g>
          )}

          {showLoads && (
            <motion.g
              initial={false}
              animate={pulse}
              transition={playing ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            >
              <text x="104" y="124" fontSize={9.5} fontWeight="600" fill={LOAD}>
                q = 2,4 kN/m
              </text>
              <text x="170" y="178" fontSize={10} fontWeight="700" fill={LOAD}>
                Q = 7,2 kN
              </text>
              <text x="400" y="160" fontSize={10} fontWeight="700" fill={LOAD}>
                P₁ = 13 kN
              </text>
              <text x="400" y="174" fontSize={9} fill={LOAD}>
                45°
              </text>
              <text x="330" y="196" fontSize={10} fontWeight="700" fill={MOMENT}>
                M = 10 kN·m
              </text>
            </motion.g>
          )}

          {showReactions && (
            <g>
              <text x="108" y="246" fontSize={10} fontWeight="700" fill={REACTION}>
                A_x = 9,192 kN
              </text>
              <text x="108" y="206" fontSize={10} fontWeight="700" fill={REACTION}>
                A_y = 3,959 kN
              </text>
              <text x="318" y="246" fontSize={10} fontWeight="700" fill={REACTION}>
                B_y = 12,433 kN
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
