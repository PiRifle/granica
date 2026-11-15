import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../../types'
import {
  Arrow,
  Dimension,
  Label,
  PinSupport,
  Pulley,
  SCHEMA,
  SchematicFrame,
  clamp01,
} from '../../../../components/solution-figures/statics-schematic'

const INK = SCHEMA.ink
const MUTED = SCHEMA.muted
const LOAD = SCHEMA.load
const FRICTION = SCHEMA.member
const NORMAL = SCHEMA.reaction
const WEIGHT = SCHEMA.edge
const MOMENT = SCHEMA.moment

const O = { x: 235, y: 155 }
const RI = 52
const RO = 62.4
const CONTACT = { x: O.x - 0.707 * RO, y: O.y + 0.707 * RO }
const AXIS = { x: CONTACT.x - 0.028, y: CONTACT.y + 0.028 }
const U = { x: -0.707, y: -0.707 }
const A = { x: AXIS.x - 51 * U.x, y: AXIS.y - 51 * U.y }
const B = { x: AXIS.x + 51 * U.x, y: AXIS.y + 51 * U.y }
const ROPE_TOP = { x: O.x, y: O.y - RI }
const PULLEY = { x: 370, y: ROPE_TOP.y, r: 10 }
const Q_BOX = { x: 360, y: 130, w: 20, h: 18 }

const arc = (cx: number, cy: number, radius: number, from: number, to: number) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 1 ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

const NOTES = [
  'Model: tarcza 1,2R, bęben R, lina Q do krążka i dźwignia A–B z siłą P',
  'Geometria: styk lewy-dolny, α = 45°, ramiona a = b = 0,30 m, e = 0,04 m',
  'Moment liny M_Q = 22 kN·m działa zgodnie z ruchem wskazówek zegara',
  'Równowaga bębna: tarcie T = 18,33 kN równoważy moment liny',
  'Warunek graniczny: N = T/μ = 73,33 kN',
  'Dźwignia: P = 53,58 kN oraz A = (11,24; 38,89) kN',
  'Reakcja czopa O = (−86,82; −37,09) kN i interpretacja znaków',
  'Kontrola: ΣF = 0, ΣM_A = 0, ΣM_O = 0 oraz T = μN',
]

export function HorizontalRopeLeverBrakeAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const showGeometry = index >= 1
  const showLoad = index >= 2
  const showFriction = index >= 3
  const showNormal = index >= 4
  const showLeverForces = index >= 5
  const showO = index >= 6
  const showCheck = index >= 7
  const spin = showLoad && playing ? -8 * Math.sin(t * Math.PI * 2) : 0
  const pulse = showLeverForces ? 1 + 0.035 * Math.sin(t * Math.PI * 3) : 1

  return (
    <SchematicFrame
      label="Tarcza 1,2R z dźwignią hamulcową, liną poziomą i siłą P"
      desc="Tarcza hamulcowa z klockiem, dźwignia A–B nachylona pod kątem 45 stopni, lina z ciężarem Q przez krążek, tarcie T, nacisk N, siła P i reakcje O oraz A."
    >
      <defs>
        <marker id="c10-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
        </marker>
        <marker id="c10-friction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={FRICTION} />
        </marker>
      </defs>

      <Label x={230} y={20} size={10} anchor="middle" color={MUTED}>
        {NOTES[index] ?? NOTES[NOTES.length - 1]}
      </Label>

      <motion.g
        initial={false}
        animate={{ rotate: spin }}
        transition={{ type: 'spring', stiffness: 55, damping: 18 }}
        style={{ transformOrigin: `${O.x}px ${O.y}px` }}
      >
        <circle cx={O.x} cy={O.y} r={RO} fill="#eef2fb" stroke={SCHEMA.member} strokeWidth={2.6} />
        <circle cx={O.x} cy={O.y} r={RI} fill="#f8fafd" stroke={WEIGHT} strokeWidth={2} />
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180
          return (
            <line
              key={angle}
              x1={O.x + 8 * Math.cos(rad)}
              y1={O.y + 8 * Math.sin(rad)}
              x2={O.x + (RO - 9) * Math.cos(rad)}
              y2={O.y + (RO - 9) * Math.sin(rad)}
              stroke="#c9d3e2"
              strokeWidth={1.1}
            />
          )
        })}
      </motion.g>
      <circle cx={O.x} cy={O.y} r={4.5} fill={INK} />

      <line x1={B.x} y1={B.y} x2={A.x} y2={A.y} stroke={WEIGHT} strokeWidth={6} strokeLinecap="round" />
      <circle cx={A.x} cy={A.y} r={5} fill="#ffffff" stroke={WEIGHT} strokeWidth={2.2} />
      <PinSupport x={A.x} y={A.y + 2} />
      <circle cx={B.x} cy={B.y} r={3.4} fill={WEIGHT} />
      <g transform={`rotate(45 ${CONTACT.x} ${CONTACT.y})`}>
        <rect x={CONTACT.x - 12} y={CONTACT.y - 5.5} width={24} height={11} rx={2} fill={FRICTION} opacity={0.85} />
      </g>

      <line x1={ROPE_TOP.x} y1={ROPE_TOP.y} x2={PULLEY.x - PULLEY.r} y2={PULLEY.y} stroke={WEIGHT} strokeWidth={2.8} />
      <line x1={PULLEY.x} y1={PULLEY.y + PULLEY.r} x2={PULLEY.x} y2={Q_BOX.y} stroke={WEIGHT} strokeWidth={2.2} />
      <Pulley cx={PULLEY.x} cy={PULLEY.y} r={PULLEY.r} />
      <rect
        x={Q_BOX.x}
        y={Q_BOX.y}
        width={Q_BOX.w}
        height={Q_BOX.h}
        rx={3}
        fill="#f8fafd"
        stroke={WEIGHT}
        strokeWidth={1.7}
      />
      <Label x={Q_BOX.x + 5} y={Q_BOX.y + 13} size={9} color={INK}>
        Q
      </Label>
      <Label x={PULLEY.x + 10} y={Q_BOX.y + 8} size={9.5} color={WEIGHT}>
        Q = 22 kN
      </Label>
      <Arrow from={{ x: O.x, y: O.y + 5 }} to={{ x: O.x, y: O.y + 50 }} color={WEIGHT} width={2.2} />

      {showGeometry && (
        <>
          <line
            x1={O.x}
            y1={O.y}
            x2={CONTACT.x}
            y2={CONTACT.y}
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="5 4"
          />
          <Label x={O.x - 90} y={O.y - 8} size={9} anchor="end" color={MUTED}>
            1,2R
          </Label>
          <line
            x1={O.x}
            y1={O.y}
            x2={ROPE_TOP.x}
            y2={ROPE_TOP.y}
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="5 4"
          />
          <Label x={O.x + 5} y={ROPE_TOP.y + 16} size={9} color={MUTED}>
            R
          </Label>
          <line x1={O.x} y1={O.y} x2={O.x} y2={O.y + 44} stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
          <path d={arc(O.x, O.y, 29, 90, 135)} fill="none" stroke={MUTED} strokeWidth={1.1} />
          <Label x={O.x - 105} y={O.y + 25} size={9.5} anchor="end" color={INK}>
            α = 45°
          </Label>
          <Dimension from={B} to={CONTACT} label="a = 0,30 m" offset={34} size={8.5} labelOffset={{ x: -8, y: 6 }} />
          <Dimension from={CONTACT} to={A} label="b = 0,30 m" offset={34} size={8.5} labelOffset={{ x: -8, y: 6 }} />
          <line
            x1={CONTACT.x}
            y1={CONTACT.y}
            x2={AXIS.x}
            y2={AXIS.y}
            stroke={MUTED}
            strokeWidth={1.1}
            strokeDasharray="3 3"
          />
          <Label x={CONTACT.x + 50} y={CONTACT.y - 22} size={8.5} color={MUTED}>
            e
          </Label>
          <Label x={B.x - 6} y={B.y + 16} size={9.5} anchor="end" color={INK}>
            B
          </Label>
          <Label x={A.x + 24} y={A.y + 30} size={9.5} color={INK}>
            A
          </Label>
          <Label x={O.x + 30} y={O.y + 40} size={9.5} color={WEIGHT}>
            G = 1,8 kN
          </Label>
        </>
      )}

      {showLoad && (
        <>
          <path
            d={arc(O.x, O.y, 20, 210, 330)}
            fill="none"
            stroke={MOMENT}
            strokeWidth={2.2}
            markerEnd="url(#c10-moment)"
          />
          <Label x={O.x - 118} y={O.y - 62} size={9.5} color={MOMENT}>
            M_Q = 22 kN·m
          </Label>
        </>
      )}

      {showFriction && (
        <>
          <Arrow from={CONTACT} to={{ x: CONTACT.x + 32, y: CONTACT.y + 32 }} color={FRICTION} width={3.2} />
          <Label x={A.x + 31} y={A.y + 17} size={9.5} color={FRICTION}>
            T = 18,33 kN
          </Label>
          <path
            d={arc(CONTACT.x, CONTACT.y, 14, 200, 340)}
            fill="none"
            stroke={FRICTION}
            strokeWidth={2.1}
            markerEnd="url(#c10-friction)"
            opacity={0.85}
          />
        </>
      )}

      {showNormal && (
        <>
          <Arrow from={CONTACT} to={{ x: CONTACT.x + 40, y: CONTACT.y - 40 }} color={NORMAL} width={3.2} />
          <Label x={CONTACT.x + 58} y={CONTACT.y - 52} size={9.5} color={NORMAL}>
            N = 73,33 kN
          </Label>
        </>
      )}

      {showLeverForces && (
        <>
          <motion.g
            initial={false}
            animate={{ scale: pulse }}
            transition={{ type: 'spring', stiffness: 60, damping: 16 }}
            style={{ transformOrigin: `${B.x}px ${B.y}px` }}
          >
            <Arrow from={{ x: B.x - 44, y: B.y }} to={B} color={LOAD} width={3.8} />
          </motion.g>
          <Label x={B.x - 48} y={B.y - 8} size={9.5} anchor="end" color={LOAD}>
            P = 53,58 kN
          </Label>
          <Arrow from={A} to={{ x: A.x + 54, y: A.y }} color={NORMAL} width={2.6} />
          <Arrow from={A} to={{ x: A.x, y: A.y - 54 }} color={NORMAL} width={2.6} />
          <Label x={A.x + 68} y={A.y - 15} size={9} color={NORMAL}>
            A_x = 11,24
          </Label>
          <Label x={A.x + 17} y={A.y - 28} size={9} color={NORMAL}>
            A_y = 38,89
          </Label>
        </>
      )}

      {showO && (
        <>
          <Arrow from={{ x: O.x - 5, y: O.y }} to={{ x: O.x - 72, y: O.y }} color={NORMAL} width={2.6} />
          <Arrow from={{ x: O.x, y: O.y + 5 }} to={{ x: O.x, y: O.y + 66 }} color={NORMAL} width={2.6} />
          <Label x={O.x - 70} y={O.y - 24} size={9} anchor="end" color={NORMAL}>
            O_x = −86,82
          </Label>
          <Label x={O.x + 12} y={O.y + 13} size={9} color={NORMAL}>
            O_y = −37,09
          </Label>
        </>
      )}

      {showCheck && (
        <text x={230} y={330} textAnchor="middle" fontSize={9.5} fill={NORMAL}>
          T = μN = 18,33 kN; P = 53,58 kN; reszty ΣF, ΣM_O i ΣM_A są zerowe
        </text>
      )}
    </SchematicFrame>
  )
}
