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

const S = 36
const X0 = 70
const Y0 = 274
const px = (value: number) => X0 + value * S
const py = (value: number) => Y0 - value * S

const A = { x: px(0), y: py(0) }
const C = { x: px(3), y: py(2) }
const TL = { x: px(3), y: py(4) }
const TR = { x: px(7.5), y: py(4) }
const B = { x: px(5.5), y: py(0) }
const Q_X = px(5.25)
const TOP_Y = py(4)

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
  const showBy = index >= 3
  const showAx = index >= 4
  const showAy = index >= 5
  const showSigns = index >= 6
  const showCheck = index >= 7

  const footer = showCheck
    ? 'Kontrola względem B: 15,31 + 2,475 + 24 − 26,785 − 15 = 0'
    : showSigns
      ? 'A_y jest ujemne — reakcja w A działa w dół; B_y i A_x są dodatnie'
      : showAy
        ? 'Rzuty sił dają A_x oraz A_y'
        : showBy
          ? 'Moment względem A eliminuje A_x i A_y, zostaje B_y'
          : showComponents
            ? 'Q = 9,9 kN w środku pasa, P₂ pod 30° w prawo–w dół'
            : showLoads
              ? 'Obciążenie q na 4,5 m, siła P₁ pozioma, P₂ ukośna i moment M'
              : 'Rama z ukośnym lewym pasem, wspornikiem górnym i rolką B'

  return (
    <SchematicFrame
      label="Reakcje ramy z ukośnym pasem"
      desc="Rama z ukośnym pasem A-C, wspornikiem górnym, rolką B, obciążeniem ciągłym q, siłami P1 i P2 oraz momentem M."
    >
      <defs>
        <marker id="a8-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={SCHEMA.moment} />
        </marker>
      </defs>

      <g stroke={SCHEMA.edge} strokeWidth="6" strokeLinecap="round">
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} />
        <line x1={C.x} y1={C.y} x2={TL.x} y2={TL.y} />
        <line x1={TL.x} y1={TOP_Y} x2={TR.x} y2={TOP_Y} />
        <line x1={B.x} y1={TOP_Y} x2={B.x} y2={B.y} />
      </g>
      <PinSupport x={A.x} y={A.y} color={SCHEMA.support} />
      <RollerSupport x={B.x} y={B.y} color={SCHEMA.support} />

      <Label x={A.x - 18} y={A.y - 12} color={SCHEMA.ink} size={11}>
        A
      </Label>
      <Label x={C.x - 8} y={C.y - 12} color={SCHEMA.ink} size={11} anchor="end">
        C
      </Label>
      <Label x={B.x + 8} y={B.y - 8} color={SCHEMA.ink} size={11}>
        B
      </Label>

      <Dimension from={{ x: A.x, y: 300 }} to={{ x: C.x, y: 300 }} label="3 m" />
      <Dimension from={{ x: TL.x, y: 86 }} to={{ x: Q_X, y: 86 }} label="2,5 m" />
      <Dimension from={{ x: Q_X, y: 86 }} to={{ x: TR.x, y: 86 }} label="2 m" />
      <Dimension from={{ x: 250, y: C.y }} to={{ x: 250, y: B.y }} label="2 m" labelOffset={{ x: -14, y: -5 }} />

      <g stroke={SCHEMA.muted} strokeWidth={1.4} strokeLinecap="round">
        <line x1="40" y1="55" x2="68" y2="55" />
        <line x1="40" y1="55" x2="40" y2="27" />
      </g>
      <Label x={72} y={58} color={SCHEMA.muted} size={9}>
        x
      </Label>
      <Label x={37} y={23} color={SCHEMA.muted} size={9}>
        y
      </Label>

      <Fade show={showLoads} reveal={reveal}>
        <motion.g animate={pulse} transition={{ duration: 1.6, repeat: playing ? Infinity : 0 }}>
          <line x1={TL.x} y1={TOP_Y - 18} x2={TR.x} y2={TOP_Y - 18} stroke={SCHEMA.load} strokeWidth={1.4} />
          {Array.from({ length: 10 }, (_, step) => {
            const x = TL.x + (step * (TR.x - TL.x)) / 9
            return (
              <Arrow
                key={`a8-q-${step}`}
                from={{ x, y: TOP_Y - 18 }}
                to={{ x, y: TOP_Y - 6 }}
                color={SCHEMA.load}
                width={1.2}
              />
            )
          })}
          <Label x={TL.x - 6} y={TOP_Y - 26} color={SCHEMA.load} size={9.5} anchor="end">
            q = 2,2 kN/m
          </Label>
          <Arrow from={{ x: B.x, y: C.y }} to={{ x: B.x - 48, y: C.y }} color={SCHEMA.load} width={2.8} />
          <Label x={B.x + 6} y={C.y - 8} color={SCHEMA.load} size={10}>
            P₁ = 12 kN
          </Label>
          <Arrow from={TR} to={{ x: 392, y: 160 }} color={SCHEMA.load} width={2.8} />
          <Label x={396} y={150} color={SCHEMA.load} size={10}>
            P₂ = 6 kN
          </Label>
        </motion.g>
        <path
          d={arc(125, 236, 15, -60, 150)}
          fill="none"
          stroke={SCHEMA.moment}
          strokeWidth={2}
          markerEnd="url(#a8-moment)"
        />
        <Label x={138} y={256} color={SCHEMA.moment} size={9.5}>
          M = 15 kN·m
        </Label>
      </Fade>

      <Fade show={showComponents} reveal={reveal}>
        <Arrow from={{ x: Q_X, y: TOP_Y + 4 }} to={{ x: Q_X, y: TOP_Y + 44 }} color={SCHEMA.load} width={3} />
        <Label x={Q_X - 6} y={TOP_Y + 58} color={SCHEMA.load} size={10} anchor="end">
          Q = 9,9 kN
        </Label>
        <Label x={350} y={122} color={SCHEMA.muted} size={9}>
          30°
        </Label>
      </Fade>

      <Fade show={showBy} reveal={reveal}>
        <Arrow from={B} to={{ x: B.x, y: B.y - 54 }} color={SCHEMA.reaction} width={3} />
        <Label x={B.x + 8} y={B.y - 26} color={SCHEMA.reaction} size={10}>
          B_y = 15,68 kN
        </Label>
      </Fade>

      <Fade show={showAx} reveal={reveal}>
        <Arrow from={A} to={{ x: A.x + 60, y: A.y }} color={SCHEMA.reaction} width={3} />
        <Label x={A.x + 66} y={A.y - 4} color={SCHEMA.reaction} size={10}>
          A_x = 6,80 kN
        </Label>
      </Fade>

      <Fade show={showAy} reveal={reveal}>
        <Arrow from={A} to={{ x: A.x, y: A.y + 32 }} color={SCHEMA.reaction} width={3} />
        <Label x={A.x + 8} y={A.y + 40} color={SCHEMA.reaction} size={9.5}>
          A_y = −2,78 kN (w dół)
        </Label>
      </Fade>

      <Label x={230} y={332} color={showCheck ? SCHEMA.ink : SCHEMA.muted} size={9} anchor="middle">
        {footer}
      </Label>
    </SchematicFrame>
  )
}
