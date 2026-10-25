import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const FORCE = '#ff6b45'
const REACTION = '#4f6df5'
const SUPPORT = '#68727e'
const MUTED = '#87929d'
const OK = '#2f7d5b'
const INK = '#17202a'

const A = { x: 118, y: 252 }
const C = { x: 118, y: 92 }
const D = { x: 380, y: 92 }
const Q = { x: (C.x + D.x) / 2, y: C.y }

const status = [
  'Przegub A: dwie niewiadome, rolka D: jedna',
  'q = 2 kN/m → Q = 12 kN w środku rygla',
  'A_x + 12 = 0 ⇒ A_x = 12 kN w lewo',
  'ΣM_A = 0 ⇒ 6D_y = 84 ⇒ D_y = 14 kN',
  'A_y + 14 − 12 = 0 ⇒ A_y = 2 kN w dół',
  'Kontrola: ΣM_D = −48 + 12 + 36 = 0',
]

function Arrow({
  from,
  to,
  color,
  marker,
  width = 3.4,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: string
  marker: string
  width?: number
}) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      markerEnd={`url(#${marker})`}
    />
  )
}

export function FrameReactionsAnimation({ index }: SolutionAnimationProps) {
  const showDistributed = index === 0
  const showResultant = index >= 1
  const showAx = index >= 2
  const showDy = index >= 3
  const showAy = index >= 4
  const showCheck = index >= 5

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Reakcje ramy L z przegubem i rolką">
          <title>Reakcje ramy z przegubem i rolką</title>
          <desc>Rama AC–CD, obciążenie ciągłe, siła P oraz reakcje A_x, A_y i D_y.</desc>
          <defs>
            <marker id="ex-rk2-p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={FORCE} />
            </marker>
            <marker id="ex-rk2-q" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={FORCE} />
            </marker>
            <marker
              id="ex-rk2-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={FORCE} />
            </marker>
            <marker id="ex-rk2-ax" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker id="ex-rk2-ay" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker id="ex-rk2-dy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
          </defs>

          <g stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none">
            <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} />
            <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} />
          </g>

          <g stroke={SUPPORT} strokeWidth="2" fill="none" strokeLinecap="round">
            <polygon points={`${A.x},${A.y} ${A.x - 15},${A.y + 26} ${A.x + 15},${A.y + 26}`} />
            {Array.from({ length: 7 }, (_, i) => {
              const x = A.x - 18 + i * 6
              return <line key={i} x1={x} y1={A.y + 26} x2={x - 5} y2={A.y + 34} strokeWidth="1.3" />
            })}
            <polygon points={`${D.x},${D.y} ${D.x - 13},${D.y + 22} ${D.x + 13},${D.y + 22}`} />
            <circle cx={D.x - 6} cy={D.y + 27} r="4.5" />
            <circle cx={D.x + 6} cy={D.y + 27} r="4.5" />
            <line x1={D.x - 34} y1={D.y + 34} x2={D.x + 34} y2={D.y + 34} strokeWidth="2" />
          </g>

          <g fontSize="12" fill={INK}>
            <text x={A.x - 24} y={A.y + 6}>
              A
            </text>
            <text x={C.x - 20} y={C.y - 8}>
              C
            </text>
            <text x={D.x + 8} y={D.y - 8}>
              D
            </text>
          </g>

          <g stroke={MUTED} strokeWidth="1" fill={MUTED}>
            <line x1="74" y1={C.y} x2="74" y2={A.y} />
            <line x1="70" y1={C.y} x2="78" y2={C.y} />
            <line x1="70" y1={A.y} x2="78" y2={A.y} />
            <text x="60" y={(C.y + A.y) / 2 + 4} fontSize="11">
              4 m
            </text>
            <line x1={C.x} y1="126" x2={D.x} y2="126" />
            <line x1={C.x} y1="122" x2={C.x} y2="130" />
            <line x1={D.x} y1="122" x2={D.x} y2="130" />
            <text x={(C.x + D.x) / 2} y="141" fontSize="11" textAnchor="middle">
              6 m
            </text>
          </g>

          <motion.g initial={false} animate={{ opacity: showDistributed ? 1 : 0 }} transition={{ duration: 0.3 }}>
            <line x1={C.x + 6} y1="58" x2={D.x - 6} y2="58" stroke={FORCE} strokeWidth="1.6" />
            {Array.from({ length: 9 }, (_, i) => {
              const x = C.x + 8 + i * ((D.x - C.x - 16) / 8)
              return (
                <Arrow key={i} from={{ x, y: 60 }} to={{ x, y: 88 }} color={FORCE} marker="ex-rk2-load" width={2} />
              )
            })}
            <text x={(C.x + D.x) / 2} y="49" fontSize="11.5" textAnchor="middle" fill={FORCE}>
              q = 2 kN/m
            </text>
          </motion.g>

          <Arrow from={C} to={{ x: C.x + 66, y: C.y }} color={FORCE} marker="ex-rk2-p" width={4} />
          <text x={C.x + 74} y={C.y + 5} fontSize="11.5" fill={FORCE}>
            P = 12 kN
          </text>

          <motion.g initial={false} animate={{ opacity: showResultant ? 1 : 0 }} transition={{ duration: 0.35 }}>
            <Arrow from={{ x: Q.x, y: 52 }} to={{ x: Q.x, y: 87 }} color={FORCE} marker="ex-rk2-q" width={4} />
            <text x={Q.x + 8} y="58" fontSize="11.5" fill={FORCE}>
              Q = 12 kN
            </text>
            <line x1={Q.x} y1={C.y} x2={Q.x} y2={C.y + 26} stroke={MUTED} strokeWidth="1" strokeDasharray="4 4" />
            <text x={Q.x - 6} y={C.y + 40} fontSize="10.5" textAnchor="end" fill={MUTED}>
              3 m
            </text>
          </motion.g>

          <motion.g initial={false} animate={{ opacity: showAx ? 1 : 0 }} transition={{ duration: 0.35 }}>
            <Arrow from={A} to={{ x: A.x - 70, y: A.y }} color={REACTION} marker="ex-rk2-ax" width={4} />
            <text x={A.x - 72} y={A.y - 9} fontSize="11.5" fill={REACTION}>
              A_x = 12 kN
            </text>
          </motion.g>

          <motion.g initial={false} animate={{ opacity: showDy ? 1 : 0 }} transition={{ duration: 0.35 }}>
            <Arrow from={D} to={{ x: D.x, y: D.y - 55 }} color={REACTION} marker="ex-rk2-dy" width={4} />
            <text x={D.x + 9} y={D.y - 38} fontSize="11.5" fill={REACTION}>
              D_y = 14 kN
            </text>
          </motion.g>

          <motion.g initial={false} animate={{ opacity: showAy ? 1 : 0 }} transition={{ duration: 0.35 }}>
            <Arrow
              from={{ x: A.x + 25, y: A.y }}
              to={{ x: A.x + 25, y: A.y + 54 }}
              color={REACTION}
              marker="ex-rk2-ay"
              width={4}
            />
            <text x={A.x + 34} y={A.y + 46} fontSize="11.5" fill={REACTION}>
              A_y = 2 kN
            </text>
          </motion.g>

          {showCheck && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={D.x} y1={D.y} x2={A.x} y2={A.y} stroke={OK} strokeWidth="1.4" strokeDasharray="5 4" />
              <line x1={D.x} y1={D.y} x2={Q.x} y2={Q.y} stroke={OK} strokeWidth="1.4" strokeDasharray="5 4" />
              <circle cx={D.x} cy={D.y} r="9" fill="none" stroke={OK} strokeWidth="2" />
              <text x={D.x - 30} y={D.y + 52} fontSize="10.5" fill={OK}>
                biegun D
              </text>
              <rect x="272" y="278" width="178" height="26" rx="8" fill="#eef7f1" stroke={OK} strokeWidth="1.2" />
              <text x="361" y="296" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={OK}>
                ΣM_D = −48 + 12 + 36 = 0
              </text>
            </motion.g>
          )}

          <text x="230" y="328" textAnchor="middle" fontSize="12" fill={INK}>
            {status[index]}
          </text>
        </svg>
      </div>
    </div>
  )
}
