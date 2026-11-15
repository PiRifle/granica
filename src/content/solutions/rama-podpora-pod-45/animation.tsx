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

const S = 40
const X0 = 60
const Y0 = 240
const px = (value: number) => X0 + value * S
const py = (value: number) => Y0 - value * S

const A = { x: px(2), y: py(0) }
const C = { x: px(4), y: py(2) }
const B = { x: px(7), y: py(2) }
const TOP_Y = py(2)
const Q_X = px(1)
const P1_TAIL = { x: C.x + 30, y: C.y - 30 }

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
  const showB = index >= 3
  const showAx = index >= 5
  const showAy = index >= 6
  const showSigns = index >= 7
  const showCheck = index >= 7

  const footer = showCheck
    ? 'Kontrola względem B: −33,813 + 21,6 + 21,213 + 16 − 25 = 0'
    : showSigns
      ? 'Reakcja B działa ukośnie w lewo i w górę; A_x i A_y są dodatnie'
      : showAy
        ? 'Rzuty ΣFx i ΣFy dają składowe reakcji przegubu A'
        : showB
          ? 'Siła w podporze B jest prostopadła do pochyłego podłoża 45°'
          : showComponents
            ? 'Moment względem A: Q, P₁, P₂ i reakcja B'
            : showLoads
              ? 'Obciążenia: q na 2 m, P₁ pod 45°, P₂ pionowo i moment M'
              : 'Rama z podporą przegubową A i rolką na pochyłym podłożu B'

  return (
    <SchematicFrame
      label="Reakcje ramy z ukośną podporą B"
      desc="Rama z przegubem A, ukośną rolką B pod 45 stopni, obciążeniem ciągłym q, siłami P1 i P2 oraz momentem M."
    >
      <defs>
        <marker id="a6-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={SCHEMA.moment} />
        </marker>
      </defs>

      <g stroke={SCHEMA.edge} strokeWidth="6" strokeLinecap="round">
        <line x1={px(0)} y1={TOP_Y} x2={C.x} y2={TOP_Y} />
        <line x1={A.x} y1={A.y} x2={A.x} y2={TOP_Y} />
        <line x1={C.x} y1={TOP_Y} x2={B.x} y2={TOP_Y} />
      </g>
      <PinSupport x={A.x} y={A.y} color={SCHEMA.support} />
      <g transform={`rotate(-45 ${B.x} ${B.y})`}>
        <RollerSupport x={B.x} y={B.y} color={SCHEMA.support} />
      </g>

      <Label x={A.x - 30} y={A.y + 4} color={SCHEMA.ink} size={11}>
        A
      </Label>
      <Label x={C.x - 8} y={TOP_Y - 10} color={SCHEMA.ink} size={11} anchor="end">
        C
      </Label>
      <Label x={B.x + 6} y={TOP_Y - 12} color={SCHEMA.ink} size={11}>
        B
      </Label>

      <Dimension from={{ x: px(0), y: 285 }} to={{ x: px(2), y: 285 }} label="2 m" />
      <Dimension from={{ x: px(2), y: 285 }} to={{ x: px(4), y: 285 }} label="2 m" />
      <Dimension from={{ x: px(4), y: 285 }} to={{ x: px(5), y: 285 }} label="1 m" />
      <Dimension from={{ x: px(5), y: 285 }} to={{ x: px(7), y: 285 }} label="2 m" />
      <Dimension from={{ x: 40, y: py(0) }} to={{ x: 40, y: py(2) }} label="2 m" labelOffset={{ x: -14, y: -5 }} />

      <g stroke={SCHEMA.muted} strokeWidth={1.4} strokeLinecap="round">
        <line x1="34" y1="70" x2="62" y2="70" />
        <line x1="34" y1="70" x2="34" y2="42" />
      </g>
      <Label x={66} y={73} color={SCHEMA.muted} size={9}>
        x
      </Label>
      <Label x={31} y={38} color={SCHEMA.muted} size={9}>
        y
      </Label>

      <Fade show={showLoads} reveal={reveal}>
        <motion.g animate={pulse} transition={{ duration: 1.6, repeat: playing ? Infinity : 0 }}>
          <line x1={px(0)} y1={TOP_Y - 22} x2={px(2)} y2={TOP_Y - 22} stroke={SCHEMA.load} strokeWidth={1.4} />
          {Array.from({ length: 6 }, (_, step) => {
            const x = px(0) + (step * (px(2) - px(0))) / 5
            return (
              <Arrow
                key={`a6-q-${step}`}
                from={{ x, y: TOP_Y - 22 }}
                to={{ x, y: TOP_Y - 6 }}
                color={SCHEMA.load}
                width={1.2}
              />
            )
          })}
          <Label x={px(0) + 4} y={TOP_Y - 30} color={SCHEMA.load} size={9.5}>
            q = 1,8 kN/m
          </Label>
          <Arrow from={P1_TAIL} to={C} color={SCHEMA.load} width={2.8} />
          <Label x={P1_TAIL.x - 4} y={104} color={SCHEMA.load} size={10} anchor="end">
            P₁ = 10 kN
          </Label>
          <Arrow from={{ x: px(5), y: TOP_Y - 34 }} to={{ x: px(5), y: TOP_Y - 4 }} color={SCHEMA.load} width={2.8} />
          <Label x={px(5) - 8} y={120} color={SCHEMA.load} size={10} anchor="end">
            P₂ = 8 kN
          </Label>
        </motion.g>
        <path
          d={arc(238, 178, 15, -60, 150)}
          fill="none"
          stroke={SCHEMA.moment}
          strokeWidth={2}
          markerEnd="url(#a6-moment)"
        />
        <Label x={C.x + 6} y={C.y + 64} color={SCHEMA.moment} size={9.5}>
          M = 25 kN·m
        </Label>
      </Fade>

      <Fade show={showComponents} reveal={reveal}>
        <Arrow from={{ x: Q_X, y: TOP_Y + 4 }} to={{ x: Q_X, y: TOP_Y + 46 }} color={SCHEMA.load} width={3} />
        <Label x={Q_X + 6} y={TOP_Y + 14} color={SCHEMA.load} size={10}>
          Q = 3,6 kN
        </Label>
        <Arrow from={{ x: C.x - 2, y: C.y }} to={{ x: C.x - 44, y: C.y }} color={SCHEMA.member} width={1.8} dashed />
        <Label x={C.x - 48} y={C.y - 10} color={SCHEMA.member} size={9} anchor="end">
          P₁x = 7,07 kN
        </Label>
        <Arrow from={{ x: C.x, y: C.y + 2 }} to={{ x: C.x, y: C.y + 44 }} color={SCHEMA.member} width={1.8} dashed />
        <Label x={C.x + 6} y={C.y + 48} color={SCHEMA.member} size={9}>
          P₁y = 7,07 kN
        </Label>
        <Label x={372} y={180} color={SCHEMA.muted} size={9}>
          45°
        </Label>
      </Fade>

      <Fade show={showB} reveal={reveal}>
        <Arrow from={B} to={{ x: 301, y: 121 }} color={SCHEMA.reaction} width={3.2} />
        <Label x={356} y={108} color={SCHEMA.reaction} size={10}>
          B = 9,17 kN
        </Label>
        <Arrow from={{ x: B.x, y: B.y }} to={{ x: B.x - 38, y: B.y }} color={SCHEMA.reaction} width={1.6} dashed />
        <Arrow from={{ x: B.x, y: B.y }} to={{ x: B.x, y: B.y - 38 }} color={SCHEMA.reaction} width={1.6} dashed />
        <Label x={B.x - 42} y={B.y + 18} color={SCHEMA.reaction} size={8.5} anchor="end">
          B_x
        </Label>
        <Label x={B.x + 6} y={B.y - 30} color={SCHEMA.reaction} size={8.5}>
          B_y
        </Label>
      </Fade>

      <Fade show={showAx} reveal={reveal}>
        <Arrow from={A} to={{ x: A.x + 62, y: A.y }} color={SCHEMA.reaction} width={3} />
        <Label x={C.x + 6} y={240} color={SCHEMA.reaction} size={10}>
          A_x = 13,56 kN
        </Label>
      </Fade>

      <Fade show={showAy} reveal={reveal}>
        <Arrow from={A} to={{ x: A.x, y: A.y - 60 }} color={SCHEMA.reaction} width={3} />
        <Label x={A.x - 8} y={A.y - 18} color={SCHEMA.reaction} size={10} anchor="end">
          A_y = 12,19 kN
        </Label>
      </Fade>

      <Label x={230} y={332} color={showSigns ? SCHEMA.ink : SCHEMA.muted} size={9} anchor="middle">
        {footer}
      </Label>
    </SchematicFrame>
  )
}
