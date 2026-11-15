import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import {
  SCHEMA,
  SchematicFrame,
  Arrow,
  Label,
  Dimension,
  RollerSupport,
  FixedSupport,
  revealAt,
} from '../../../components/solution-figures/statics-schematic'

const A = { x: 85, y: 250 }
const COL_TOP = { x: 85, y: 142 }
const C = { x: 193, y: 142 }
const B = { x: 265, y: 142 }
const END = { x: 373, y: 142 }
const Y_Q_TOP = 120

const Q_X = A.x + 1.5 * 36
const P1_TAIL = { x: 425, y: 112 }

function Fade({ show, reveal, children }: { show: boolean; reveal: number; children: ReactNode }) {
  if (!show) return null
  return (
    <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.3 }}>
      {children}
    </motion.g>
  )
}

function arc(cx: number, cy: number, r: number, from: number, to: number) {
  const start = (from * Math.PI) / 180
  const end = (to * Math.PI) / 180
  const x1 = cx + r * Math.cos(start)
  const y1 = cy + r * Math.sin(start)
  const x2 = cx + r * Math.cos(end)
  const y2 = cy + r * Math.sin(end)
  return `M ${x1} ${y1} A ${r} ${r} 0 ${Math.abs(to - from) > 180 ? 1 : 0} 1 ${x2} ${y2}`
}

export function SolutionAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = revealAt(playing, sceneProgress)
  const pulse = playing ? { opacity: [0.55, 1, 0.55] } : { opacity: 1 }

  const showLoads = index >= 1
  const showComponents = index >= 1
  const showBy = index >= 2
  const showAx = index >= 3
  const showAy = index >= 4
  const showMomentA = index >= 5
  const showSigns = index >= 6
  const showCheck = index >= 7

  const footer = showCheck
    ? 'Kontrola względem B: M_A + 16,8 − 13,5 + 23,382 + 49,75 − 16 = 0'
    : showSigns
      ? 'A_y i M_A są ujemne: reakcja działa w dół, a moment zgodnie ze wskazówkami zegara'
      : showMomentA
        ? 'Utwierdzenie A daje A_x, A_y oraz moment M_A'
        : showBy
          ? 'Przegub C przenosi zero momentu — prawa część daje B_y'
          : showComponents
            ? 'Q = 4,8 kN w środku pasa, P₁ rozłożone na składowe'
            : showLoads
              ? 'Obciążenia: q na 3 m, siła P₁ pod 30° i moment M'
              : 'Rama utwierdzona w A z przegubem pośrednim C i rolką B'

  return (
    <SchematicFrame
      label="Reakcje ramy z przegubem i wspornikiem"
      desc="Rama utwierdzona w A, przegub pośredni C, rolka B, obciążenie ciągłe q, moment M i siła P1 pod kątem 30 stopni."
    >
      <defs>
        <marker id="a5-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={SCHEMA.moment} />
        </marker>
        <marker id="a5-reaction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={SCHEMA.reaction} />
        </marker>
      </defs>

      <g stroke={SCHEMA.edge} strokeWidth="6" strokeLinecap="round">
        <line x1={A.x} y1={A.y} x2={COL_TOP.x} y2={COL_TOP.y} />
        <line x1={A.x} y1={COL_TOP.y} x2={END.x} y2={END.y} />
      </g>
      <FixedSupport x={A.x} y={A.y} side="left" height={58} color={SCHEMA.edge} />
      <RollerSupport x={B.x} y={B.y} color={SCHEMA.support} />
      <circle cx={C.x} cy={C.y} r={4.2} fill="#ffffff" stroke={SCHEMA.edge} strokeWidth={1.8} />

      <Label x={A.x - 25} y={A.y + 14} color={SCHEMA.ink} size={11}>
        A
      </Label>
      <Label x={C.x + 6} y={C.y - 10} color={SCHEMA.ink} size={11}>
        C
      </Label>
      <Label x={B.x + 8} y={B.y - 10} color={SCHEMA.ink} size={11}>
        B
      </Label>

      <Dimension from={{ x: A.x, y: 300 }} to={{ x: C.x, y: 300 }} label="3 m" />
      <Dimension from={{ x: C.x, y: 300 }} to={{ x: B.x, y: 300 }} label="2 m" />
      <Dimension from={{ x: B.x, y: 300 }} to={{ x: END.x, y: 300 }} label="3 m" />
      <Dimension from={{ x: 55, y: A.y }} to={{ x: 55, y: COL_TOP.y }} label="3 m" labelOffset={{ x: -14, y: -5 }} />

      <g stroke={SCHEMA.muted} strokeWidth={1.4} strokeLinecap="round">
        <line x1="32" y1="58" x2="60" y2="58" />
        <line x1="32" y1="58" x2="32" y2="30" />
      </g>
      <Label x={64} y={61} color={SCHEMA.muted} size={9}>
        x
      </Label>
      <Label x={29} y={26} color={SCHEMA.muted} size={9}>
        y
      </Label>

      <Fade show={showLoads} reveal={reveal}>
        <motion.g animate={pulse} transition={{ duration: 1.6, repeat: playing ? Infinity : 0 }}>
          <rect x={A.x} y={Y_Q_TOP} width={C.x - A.x} height="22" fill={SCHEMA.load} fillOpacity="0.12" />
          <line x1={A.x} y1={Y_Q_TOP} x2={C.x} y2={Y_Q_TOP} stroke={SCHEMA.load} strokeWidth={1.4} />
          {Array.from({ length: 8 }, (_, step) => {
            const x = A.x + (step * (C.x - A.x)) / 7
            return (
              <Arrow
                key={`a5-q-${step}`}
                from={{ x, y: Y_Q_TOP }}
                to={{ x, y: C.y - 6 }}
                color={SCHEMA.load}
                width={1.2}
              />
            )
          })}
          <Label x={A.x + 4} y={Y_Q_TOP - 8} color={SCHEMA.load} size={9.5}>
            q = 1,6 kN/m
          </Label>
          <Arrow from={P1_TAIL} to={END} color={SCHEMA.load} width={2.8} />
          <Label x={P1_TAIL.x + 6} y={P1_TAIL.y - 8} color={SCHEMA.load} size={10} anchor="end">
            P₁ = 9 kN
          </Label>
        </motion.g>
      </Fade>

      <Fade show={showComponents} reveal={reveal}>
        <Arrow from={{ x: Q_X, y: C.y + 6 }} to={{ x: Q_X, y: 192 }} color={SCHEMA.load} width={3} />
        <Label x={Q_X + 6} y={202} color={SCHEMA.load} size={10}>
          Q = 4,8 kN
        </Label>
        <Arrow
          from={{ x: END.x - 2, y: END.y - 2 }}
          to={{ x: END.x - 48, y: END.y - 2 }}
          color={SCHEMA.member}
          width={1.8}
          dashed
        />
        <Label x={END.x - 54} y={112} color={SCHEMA.member} size={9} anchor="end">
          P₁x = 7,79 kN
        </Label>
        <Arrow
          from={{ x: END.x - 2, y: END.y + 2 }}
          to={{ x: END.x - 2, y: END.y + 46 }}
          color={SCHEMA.member}
          width={1.8}
          dashed
        />
        <Label x={END.x + 6} y={END.y + 40} color={SCHEMA.member} size={9}>
          P₁y = 4,5 kN
        </Label>
        <Label x={386} y={120} color={SCHEMA.muted} size={9} anchor="middle">
          30°
        </Label>
      </Fade>

      <Fade show={showLoads} reveal={reveal}>
        <path
          d={arc(213, 166, 15, -60, 150)}
          fill="none"
          stroke={SCHEMA.moment}
          strokeWidth={2}
          markerEnd="url(#a5-moment)"
        />
        <Label x={212} y={108} color={SCHEMA.moment} size={9.5}>
          M = 16 kN·m
        </Label>
      </Fade>

      <Fade show={showBy} reveal={reveal}>
        <g stroke={SCHEMA.moment} strokeWidth={1.3} strokeDasharray="5 4" fill="none" opacity="0.8">
          <line x1={C.x} y1={C.y - 28} x2={C.x} y2={C.y + 44} />
        </g>
        <Arrow from={{ x: B.x, y: 198 }} to={{ x: B.x, y: 150 }} color={SCHEMA.reaction} width={3} />
        <Label x={B.x + 8} y={204} color={SCHEMA.reaction} size={10}>
          B_y = 19,25 kN
        </Label>
      </Fade>

      <Fade show={showAx} reveal={reveal}>
        <Arrow from={{ x: A.x, y: A.y }} to={{ x: A.x + 60, y: A.y }} color={SCHEMA.reaction} width={3} />
        <Label x={A.x + 66} y={A.y - 8} color={SCHEMA.reaction} size={10}>
          A_x = 7,79 kN
        </Label>
      </Fade>

      <Fade show={showAy} reveal={reveal}>
        <Arrow from={{ x: A.x, y: A.y }} to={{ x: A.x, y: A.y + 50 }} color={SCHEMA.reaction} width={3} />
        <Label x={A.x + 10} y={A.y + 64} color={SCHEMA.reaction} size={9.5}>
          A_y = −9,95 kN (w dół)
        </Label>
      </Fade>

      <Fade show={showMomentA} reveal={reveal}>
        <path
          d={arc(107, 265, 16, -60, 150)}
          fill="none"
          stroke={SCHEMA.reaction}
          strokeWidth={2.2}
          markerEnd="url(#a5-reaction)"
        />
        <Label x={130} y={278} color={SCHEMA.reaction} size={9.5}>
          M_A = 60,43 kN·m ↻
        </Label>
      </Fade>

      <Label x={230} y={332} color={showSigns ? SCHEMA.ink : SCHEMA.muted} size={9} anchor="middle">
        {footer}
      </Label>
    </SchematicFrame>
  )
}
