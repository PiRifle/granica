import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../../types'
import {
  Arrow,
  Dimension,
  Label,
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

const O = { x: 188, y: 166 }
const RO = 78
const RI = 52
const CONTACT = { x: O.x + RO, y: O.y }
const GUIDE_A = { x: CONTACT.x + 19, y: O.y }
const GUIDE_B = { x: CONTACT.x + 57, y: O.y }
const ROD_END = { x: CONTACT.x + 78, y: O.y }
const P_POINT = { x: CONTACT.x + 66, y: O.y }
const ROPE_POINT = { x: O.x - 0.866 * RI, y: O.y - 0.5 * RI }
const PULLEY = { x: 83, y: 244, r: 9 }
const Q_BOX = { x: 74, y: 262, w: 20, h: 18 }

const arc = (cx: number, cy: number, radius: number, from: number, to: number, sweep = 1) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 ${sweep} ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

const NOTES = [
  'Model: tarcza 1,5R, bęben R, lina Q i poziomy pręt w prowadnicach A, B',
  'Geometria: promienie 1,5R i R, ramiona a = 0,10 m, b = 0,20 m, kąt α = 30°',
  'Lina Q daje moment M_Q = 20 kN·m; ciężar G = 2,1 kN',
  'Stan graniczny: T = μN = 13,33 kN, nacisk N = 44,44 kN',
  'Równowaga pręta: P = 44,44 kN, A_y = −20,00 kN, B_y = 6,67 kN',
  'Reakcja czopa O = (54,44; 32,75) kN równoważy G, Q, N i T',
  'Znaki: tarcie działa w dół, normalna w lewo; siła P jest dodatnia',
  'Kontrola: ΣF = 0, ΣM_O = 0, ΣM_C = 0 oraz T = μN',
]

export function HorizontalRodBrakeAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const showGeometry = index >= 1
  const showLoad = index >= 2
  const showFriction = index >= 3
  const showRodForces = index >= 4
  const showO = index >= 5
  const showSigns = index >= 6
  const showCheck = index >= 7
  const spin = showLoad && playing ? 9 * Math.sin(t * Math.PI * 2) : 0
  const pulse = showRodForces ? 1 + 0.035 * Math.sin(t * Math.PI * 3) : 1

  return (
    <SchematicFrame
      label="Bęben 1,5R z liną Q pod kątem 30 stopni i poziomym prętem hamulcowym"
      desc="Tarcza hamulcowa z klockiem, poziomy pręt w gładkich prowadnicach A i B, lina z ciężarem Q, tarcie T, nacisk N, siła P oraz reakcje O, A i B."
    >
      <defs>
        <marker id="c9-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={MOMENT} />
        </marker>
        <marker id="c9-friction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
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
              x2={O.x + (RO - 10) * Math.cos(rad)}
              y2={O.y + (RO - 10) * Math.sin(rad)}
              stroke="#c9d3e2"
              strokeWidth={1.1}
            />
          )
        })}
      </motion.g>
      <circle cx={O.x} cy={O.y} r={4.5} fill={INK} />

      <line
        x1={CONTACT.x}
        y1={O.y}
        x2={ROD_END.x}
        y2={ROD_END.y}
        stroke={WEIGHT}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <rect x={CONTACT.x} y={O.y - 16} width={11} height={32} rx={2.5} fill={FRICTION} opacity={0.85} />
      <g stroke={WEIGHT} strokeWidth={1.7} fill="none">
        <line x1={GUIDE_A.x - 7} y1={O.y - 19} x2={GUIDE_A.x + 7} y2={O.y - 19} />
        <line x1={GUIDE_A.x - 7} y1={O.y + 19} x2={GUIDE_A.x + 7} y2={O.y + 19} />
        <line x1={GUIDE_B.x - 7} y1={O.y - 19} x2={GUIDE_B.x + 7} y2={O.y - 19} />
        <line x1={GUIDE_B.x - 7} y1={O.y + 19} x2={GUIDE_B.x + 7} y2={O.y + 19} />
      </g>

      <line x1={ROPE_POINT.x} y1={ROPE_POINT.y} x2={PULLEY.x + 4} y2={PULLEY.y - 7} stroke={WEIGHT} strokeWidth={2.8} />
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
      <Label x={PULLEY.x + 16} y={Q_BOX.y + 6} size={9.5} color={WEIGHT}>
        Q = 20 kN
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
          <Label x={O.x + RO / 2 - 8} y={O.y - 8} size={9} color={MUTED}>
            1,5R
          </Label>
          <line
            x1={O.x}
            y1={O.y}
            x2={ROPE_POINT.x}
            y2={ROPE_POINT.y}
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="5 4"
          />
          <Label x={O.x - 26} y={O.y + 18} size={9} color={MUTED}>
            R
          </Label>
          <line
            x1={ROPE_POINT.x}
            y1={ROPE_POINT.y}
            x2={ROPE_POINT.x}
            y2={ROPE_POINT.y + 58}
            stroke={MUTED}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <path d={arc(ROPE_POINT.x, ROPE_POINT.y, 30, 90, 120)} fill="none" stroke={MUTED} strokeWidth={1.1} />
          <Label x={ROPE_POINT.x - 28} y={ROPE_POINT.y + 48} size={9.5} color={INK}>
            α = 30°
          </Label>
          <Dimension
            from={{ x: CONTACT.x, y: O.y - 30 }}
            to={{ x: GUIDE_A.x, y: O.y - 30 }}
            label="a"
            size={8.5}
            labelOffset={{ x: 0, y: -5 }}
          />
          <Dimension
            from={{ x: GUIDE_A.x, y: O.y - 46 }}
            to={{ x: GUIDE_B.x, y: O.y - 46 }}
            label="b"
            size={8.5}
            labelOffset={{ x: 0, y: -5 }}
          />
          <Label x={GUIDE_A.x - 10} y={O.y + 36} size={9.5} anchor="end" color={INK}>
            A
          </Label>
          <Label x={GUIDE_B.x} y={O.y + 36} size={9.5} anchor="middle" color={INK}>
            B
          </Label>
          <Label x={O.x - 4} y={O.y + 64} size={9.5} color={WEIGHT} anchor="middle">
            G = 2,1 kN
          </Label>
        </>
      )}

      {showLoad && (
        <>
          <path
            d={arc(O.x, O.y, 24, 340, 200, 0)}
            fill="none"
            stroke={MOMENT}
            strokeWidth={2.2}
            markerEnd="url(#c9-moment)"
          />
          <Label x={O.x - 120} y={O.y - 78} size={9.5} color={MOMENT}>
            M_Q = 20 kN·m
          </Label>
        </>
      )}

      {showFriction && (
        <>
          <Arrow from={CONTACT} to={{ x: CONTACT.x, y: CONTACT.y + 47 }} color={FRICTION} width={3.2} />
          <Label x={CONTACT.x - 8} y={O.y + 60} size={9.5} anchor="end" color={FRICTION}>
            T = 13,33 kN
          </Label>
          <Arrow from={CONTACT} to={{ x: CONTACT.x - 52, y: CONTACT.y }} color={NORMAL} width={3.2} />
          <Label x={CONTACT.x - 84} y={O.y - 24} size={9.5} anchor="end" color={NORMAL}>
            N = 44,44 kN
          </Label>
          <path
            d={arc(CONTACT.x, CONTACT.y, 14, 200, 340)}
            fill="none"
            stroke={FRICTION}
            strokeWidth={2.1}
            markerEnd="url(#c9-friction)"
            opacity={0.85}
          />
        </>
      )}

      {showRodForces && (
        <motion.g
          initial={false}
          animate={{ scale: pulse }}
          transition={{ type: 'spring', stiffness: 60, damping: 16 }}
          style={{ transformOrigin: `${P_POINT.x}px ${P_POINT.y}px` }}
        >
          <Arrow from={{ x: ROD_END.x + 24, y: O.y }} to={P_POINT} color={LOAD} width={3.8} />
          <Label x={ROD_END.x + 30} y={O.y + 4} size={9.5} color={LOAD}>
            P = 44,44 kN
          </Label>
        </motion.g>
      )}

      {showRodForces && (
        <>
          <Arrow from={GUIDE_A} to={{ x: GUIDE_A.x, y: GUIDE_A.y + 44 }} color={NORMAL} width={2.8} />
          <Label x={GUIDE_A.x + 5} y={GUIDE_A.y + 58} size={9} color={NORMAL}>
            A_y = −20,00
          </Label>
          <Arrow from={GUIDE_B} to={{ x: GUIDE_B.x, y: GUIDE_B.y - 42 }} color={NORMAL} width={2.8} />
          <Label x={GUIDE_B.x + 5} y={GUIDE_B.y - 46} size={9} color={NORMAL}>
            B_y = 6,67
          </Label>
        </>
      )}

      {showO && (
        <>
          <Arrow from={{ x: O.x + 5, y: O.y }} to={{ x: O.x + 70, y: O.y }} color={NORMAL} width={2.6} />
          <Arrow from={{ x: O.x, y: O.y - 5 }} to={{ x: O.x, y: O.y - 62 }} color={NORMAL} width={2.6} />
          <Label x={O.x + 74} y={O.y + 4} size={9} color={NORMAL}>
            O_x = 54,44
          </Label>
          <Label x={O.x + 5} y={O.y - 66} size={9} color={NORMAL}>
            O_y = 32,75
          </Label>
        </>
      )}

      {showSigns && (
        <>
          <Label x={ROPE_POINT.x - 18} y={ROPE_POINT.y + 8} size={8.5} anchor="end" color={MUTED}>
            lina
          </Label>
          <Label x={CONTACT.x + 16} y={CONTACT.y + 34} size={8.5} color={FRICTION}>
            klocek
          </Label>
        </>
      )}

      {showCheck && (
        <text x={230} y={330} textAnchor="middle" fontSize={9.5} fill={NORMAL}>
          T = μN = 13,33 kN; P = 44,44 kN; reszty ΣF i ΣM są zerowe
        </text>
      )}
    </SchematicFrame>
  )
}
