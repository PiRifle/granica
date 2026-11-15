import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import {
  SCHEMA,
  SchematicFrame,
  Arrow,
  Label,
  Dimension,
  PinSupport,
  RollerSupport,
  revealAt,
} from '../../../components/solution-figures/statics-schematic'

const S = 44
const X0 = 120
const Y0 = 270
const px = (value: number) => X0 + value * S
const py = (value: number) => Y0 - value * S

const A = { x: px(0), y: py(0) }
const C = { x: px(3), y: py(2) }
const D = { x: px(3), y: py(3) }
const TR = { x: px(6), y: py(3) }
const B = { x: px(6), y: py(0) }
const Q_Y = py(1)
const P2_END = { x: C.x + 30, y: A.y - 52 }

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
  const showComponents = index >= 2
  const showHinge = index >= 3
  const showB = index >= 3
  const showAx = index >= 4
  const showD = index >= 5
  const showAy = index >= 6
  const showCheck = index >= 7

  const footer = showCheck
    ? 'Kontrola względem B: −73,998 + 66 + 4 − 18,186 − 20 + 42,186 = 0'
    : showAy
      ? 'A_x = 0,50 kN, A_y = 12,33 kN — przegub A równoważy resztę obciążeń'
      : showD
        ? 'D_y jest ujemne, więc reakcja w D działa w dół'
        : showB
          ? 'Z prawej części: ΣM_C = 3B_y − 20 = 0'
          : showHinge
            ? 'Przegub C nie przenosi momentu — rozdzielamy ramę'
            : showComponents
              ? 'Q = 4 kN w połowie pionu, P₂ pod 60°, P₁ pionowo'
              : showLoads
                ? 'Obciążenia: P₁, q, P₂ i moment M'
                : 'Rama z przegubem pośrednim C, rolką B i podporą D'

  return (
    <SchematicFrame
      label="Reakcje ramy z przegubem pośrednim"
      desc="Rama z przegubem C, rolką B, podporą D, obciążeniem ciągłym q na pionie, siłami P1 i P2 oraz momentem M."
    >
      <defs>
        <marker id="a7-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={SCHEMA.moment} />
        </marker>
      </defs>

      <g stroke={SCHEMA.edge} strokeWidth="6" strokeLinecap="round">
        <line x1={A.x} y1={A.y} x2={A.x} y2={C.y} />
        <line x1={A.x} y1={C.y} x2={C.x} y2={C.y} />
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} />
        <line x1={C.x} y1={A.y} x2={C.x} y2={C.y} />
        <line x1={C.x} y1={C.y} x2={D.x} y2={D.y} />
        <line x1={D.x} y1={D.y} x2={TR.x} y2={TR.y} />
        <line x1={TR.x} y1={TR.y} x2={B.x} y2={B.y} />
      </g>
      <PinSupport x={A.x} y={A.y} color={SCHEMA.support} />
      <RollerSupport x={B.x} y={B.y} color={SCHEMA.support} />
      <g transform={`rotate(180 ${D.x} ${D.y})`}>
        <RollerSupport x={D.x} y={D.y} color={SCHEMA.support} />
      </g>
      <circle cx={C.x} cy={C.y} r={4.2} fill="#ffffff" stroke={SCHEMA.edge} strokeWidth={1.8} />

      <Label x={A.x - 18} y={A.y - 10} color={SCHEMA.ink} size={11}>
        A
      </Label>
      <Label x={C.x + 6} y={C.y - 6} color={SCHEMA.ink} size={11}>
        C
      </Label>
      <Label x={D.x + 8} y={D.y - 26} color={SCHEMA.ink} size={11}>
        D
      </Label>
      <Label x={B.x + 8} y={B.y - 8} color={SCHEMA.ink} size={11}>
        B
      </Label>

      <Dimension from={{ x: A.x, y: 300 }} to={{ x: C.x, y: 300 }} label="3 m" />
      <Dimension from={{ x: C.x, y: 300 }} to={{ x: B.x, y: 300 }} label="3 m" />
      <Dimension from={{ x: 95, y: A.y }} to={{ x: 95, y: C.y }} label="2 m" labelOffset={{ x: -14, y: -5 }} />
      <Dimension from={{ x: 415, y: B.y }} to={{ x: 415, y: D.y }} label="3 m" labelOffset={{ x: 14, y: -5 }} />

      <g stroke={SCHEMA.muted} strokeWidth={1.4} strokeLinecap="round">
        <line x1="50" y1="58" x2="78" y2="58" />
        <line x1="50" y1="58" x2="50" y2="30" />
      </g>
      <Label x={82} y={61} color={SCHEMA.muted} size={9}>
        x
      </Label>
      <Label x={47} y={26} color={SCHEMA.muted} size={9}>
        y
      </Label>

      <Fade show={showLoads} reveal={reveal}>
        <motion.g animate={pulse} transition={{ duration: 1.6, repeat: playing ? Infinity : 0 }}>
          <Arrow from={{ x: A.x, y: C.y - 42 }} to={{ x: A.x, y: C.y - 2 }} color={SCHEMA.load} width={2.8} />
          <Label x={A.x + 6} y={C.y - 48} color={SCHEMA.load} size={10}>
            P₁ = 11 kN
          </Label>
          <line x1={C.x - 30} y1={C.y} x2={C.x - 30} y2={A.y} stroke={SCHEMA.load} strokeWidth={1.4} />
          {Array.from({ length: 6 }, (_, step) => {
            const y = C.y + (step * (A.y - C.y)) / 5
            return (
              <Arrow
                key={`a7-q-${step}`}
                from={{ x: C.x - 30, y }}
                to={{ x: C.x - 6, y }}
                color={SCHEMA.load}
                width={1.2}
              />
            )
          })}
          <Label x={C.x - 34} y={170} color={SCHEMA.load} size={9.5} anchor="end">
            q = 2 kN/m
          </Label>
          <Arrow from={{ x: C.x, y: A.y }} to={P2_END} color={SCHEMA.load} width={2.8} />
          <Label x={P2_END.x + 6} y={P2_END.y - 4} color={SCHEMA.load} size={10}>
            P₂ = 7 kN
          </Label>
        </motion.g>
        <path
          d={arc(318, 160, 15, -60, 150)}
          fill="none"
          stroke={SCHEMA.moment}
          strokeWidth={2}
          markerEnd="url(#a7-moment)"
        />
        <Label x={300} y={190} color={SCHEMA.moment} size={9.5}>
          M = 20 kN·m
        </Label>
      </Fade>

      <Fade show={showComponents} reveal={reveal}>
        <Arrow from={{ x: C.x - 30, y: Q_Y }} to={{ x: C.x - 4, y: Q_Y }} color={SCHEMA.load} width={2.8} />
        <Label x={C.x - 34} y={Q_Y + 20} color={SCHEMA.load} size={9.5} anchor="end">
          Q = 4 kN
        </Label>
      </Fade>

      <Fade show={showHinge} reveal={reveal}>
        <line
          x1={C.x}
          y1={C.y - 26}
          x2={C.x}
          y2={C.y + 34}
          stroke={SCHEMA.moment}
          strokeWidth={1.4}
          strokeDasharray="5 4"
        />
        <Arrow from={{ x: B.x, y: B.y }} to={{ x: B.x, y: B.y - 54 }} color={SCHEMA.reaction} width={3} />
        <Label x={B.x - 6} y={B.y - 26} color={SCHEMA.reaction} size={10} anchor="end">
          B_y = 6,67 kN
        </Label>
      </Fade>

      <Fade show={showD} reveal={reveal}>
        <Arrow from={D} to={{ x: D.x, y: D.y + 48 }} color={SCHEMA.reaction} width={3} />
        <Label x={D.x - 6} y={D.y + 18} color={SCHEMA.reaction} size={9.5} anchor="end">
          D_y = −14,06 kN
        </Label>
      </Fade>

      <Fade show={showAx} reveal={reveal}>
        <Arrow from={A} to={{ x: A.x + 48, y: A.y }} color={SCHEMA.reaction} width={3} />
        <Label x={A.x + 54} y={A.y - 8} color={SCHEMA.reaction} size={10}>
          A_x = 0,50 kN
        </Label>
      </Fade>

      <Fade show={showAy} reveal={reveal}>
        <Arrow from={A} to={{ x: A.x, y: A.y - 56 }} color={SCHEMA.reaction} width={3} />
        <Label x={A.x + 6} y={A.y - 62} color={SCHEMA.reaction} size={9.5}>
          A_y = 12,33 kN
        </Label>
      </Fade>

      <Label x={230} y={332} color={showCheck ? SCHEMA.ink : SCHEMA.muted} size={9} anchor="middle">
        {footer}
      </Label>
    </SchematicFrame>
  )
}
