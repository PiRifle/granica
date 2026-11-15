import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../../types'
import {
  Arrow,
  Label,
  PinSupport,
  Pulley,
  Reveal,
  SCHEMA,
  SchematicFrame,
  clamp01,
} from '../../../../components/solution-figures/statics-schematic'

const INK = SCHEMA.ink
const MUTED = SCHEMA.muted
const LOAD = SCHEMA.load
const FRICTION = SCHEMA.member
const NORMAL = SCHEMA.reaction
const WEIGHT = '#68727e'
const ACCENT = SCHEMA.accent

const O = { x: 212, y: 186 }
const RU = 52
const RO = 1.2 * RU
const RI = RU
const CONTACT = { x: O.x, y: O.y - RO }
const LEVER_Y = CONTACT.y - 9
const A = { x: CONTACT.x - 42, y: LEVER_Y }
const B = { x: CONTACT.x + 63, y: LEVER_Y }
const ROPE_START = { x: O.x + Math.SQRT1_2 * RI, y: O.y - Math.SQRT1_2 * RI }
const ROPE_END = { x: ROPE_START.x + 74, y: ROPE_START.y + 74 }
const PULLEY = { x: 338, y: 232, r: 11 }
const WEIGHT_BOX = { x: 325, y: 259, w: 22, h: 22 }

const arc = (cx: number, cy: number, radius: number, from: number, to: number) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 1 ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

const dimHorizontal = (x1: number, x2: number, y: number) => (
  <g stroke={MUTED} strokeWidth={1} fill="none">
    <line x1={x1} y1={y} x2={x2} y2={y} />
    <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} />
    <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} />
  </g>
)

const dimVertical = (x: number, y1: number, y2: number) => (
  <g stroke={MUTED} strokeWidth={1} fill="none">
    <line x1={x} y1={y1} x2={x} y2={y2} />
    <line x1={x - 4} y1={y1} x2={x + 4} y2={y1} />
    <line x1={x - 4} y1={y2} x2={x + 4} y2={y2} />
  </g>
)

export function LeverBrakeP30Animation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const spin = index >= 2 ? (playing ? 18 * t : 18) : 0
  const stageNote =
    index === 0
      ? 'Model: bęben 1,2R, lina Q na promieniu R, dźwignia AB z klockiem'
      : index === 1
        ? 'Geometria: styk u góry, lina pod 45°, ramiona a i b, mimośród e'
        : index === 2
          ? 'Moment liny M_Q = 16 kN·m działa zgodnie z ruchem wskazówek zegara'
          : index === 3
            ? 'Tarcie z ΣM_O: T = M_Q/1,2R = 16/1,2 = 13,33 kN'
            : index === 4
              ? 'Stan graniczny T = μN daje N = 13,33/0,30 = 44,44 kN'
              : index === 5
                ? 'Dźwignia: ΣM_A = 0 daje P = 37,69 kN oraz A = (−45,97; −25,60) kN'
                : index === 6
                  ? 'Znaki: tarcie przeciwdziała M_Q, a reakcja O równoważy obciążenia bębna'
                  : 'Kontrola: T = μN, P > 0, reszty sił i momentów są zerowe'
  const noteColor =
    index === 2
      ? WEIGHT
      : index === 3
        ? FRICTION
        : index === 4
          ? NORMAL
          : index === 5
            ? LOAD
            : index >= 6
              ? NORMAL
              : MUTED

  return (
    <SchematicFrame
      label="Bęben 1,2R z dźwignią hamulcową i liną pod kątem 45 stopni"
      desc="Tarcza hamulcowa z klockiem, pozioma dźwignia, lina z ciężarem Q, tarcie, nacisk i reakcje."
    >
      <defs>
        <marker id="c5-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
        </marker>
        <marker id="c5-friction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={FRICTION} />
        </marker>
      </defs>

      <motion.g
        initial={false}
        animate={{ rotate: spin }}
        transition={{ type: 'spring', stiffness: 55, damping: 18 }}
        style={{ transformOrigin: `${O.x}px ${O.y}px` }}
      >
        <circle cx={O.x} cy={O.y} r={RO} fill="#eef2fb" stroke={ACCENT} strokeWidth={2.4} />
        <circle cx={O.x} cy={O.y} r={RI} fill="#f7f9fc" stroke={WEIGHT} strokeWidth={1.8} />
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180
          return (
            <line
              key={angle}
              x1={O.x + 7 * Math.cos(rad)}
              y1={O.y + 7 * Math.sin(rad)}
              x2={O.x + (RO - 7) * Math.cos(rad)}
              y2={O.y + (RO - 7) * Math.sin(rad)}
              stroke="#c9d3e2"
              strokeWidth={1.1}
            />
          )
        })}
        <circle cx={O.x} cy={O.y} r={4} fill={INK} />
      </motion.g>

      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={WEIGHT} strokeWidth={6} strokeLinecap="round" />
      <circle cx={A.x} cy={A.y} r={4.5} fill="#ffffff" stroke={WEIGHT} strokeWidth={2} />
      <PinSupport x={A.x} y={A.y + 2} />
      <rect
        x={CONTACT.x - 10}
        y={LEVER_Y}
        width={20}
        height={CONTACT.y - LEVER_Y}
        rx={2}
        fill={FRICTION}
        opacity={0.85}
      />

      <line
        x1={O.x}
        y1={O.y}
        x2={O.x - 0.707 * RO}
        y2={O.y + 0.707 * RO}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <line x1={O.x} y1={O.y} x2={O.x + RI} y2={O.y} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
      <Arrow from={{ x: O.x, y: O.y }} to={{ x: O.x, y: O.y + 46 }} color={WEIGHT} width={2.4} />

      <Reveal show={index >= 1}>
        <line x1={ROPE_START.x} y1={ROPE_START.y} x2={ROPE_END.x} y2={ROPE_END.y} stroke={WEIGHT} strokeWidth={3} />
        <line x1={ROPE_END.x} y1={ROPE_END.y} x2={PULLEY.x - 6} y2={PULLEY.y - 6} stroke={WEIGHT} strokeWidth={3} />
        <Pulley cx={PULLEY.x} cy={PULLEY.y} r={PULLEY.r} />
        <line x1={PULLEY.x} y1={PULLEY.y + PULLEY.r} x2={PULLEY.x} y2={WEIGHT_BOX.y} stroke={WEIGHT} strokeWidth={2} />
        <rect
          x={WEIGHT_BOX.x}
          y={WEIGHT_BOX.y}
          width={WEIGHT_BOX.w}
          height={WEIGHT_BOX.h}
          rx={3}
          fill="#f7f9fc"
          stroke={WEIGHT}
          strokeWidth={1.8}
        />
        <path d={arc(CONTACT.x, CONTACT.y, 22, 0, 45)} fill="none" stroke={MUTED} strokeWidth={1.1} />
        {dimHorizontal(A.x, CONTACT.x, LEVER_Y - 20)}
        {dimHorizontal(CONTACT.x, B.x, LEVER_Y - 20)}
        {dimVertical(CONTACT.x + 24, LEVER_Y, CONTACT.y)}
        <motion.g
          initial={false}
          animate={{ opacity: playing ? 0.82 + 0.18 * Math.sin(t * Math.PI * 2) : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Arrow from={B} to={{ x: B.x + 50, y: B.y + 29 }} color={LOAD} width={3.6} />
        </motion.g>
      </Reveal>

      <Reveal show={index >= 2}>
        <path
          d={arc(O.x, O.y, RO + 14, 150, 210)}
          fill="none"
          stroke={WEIGHT}
          strokeWidth={2.2}
          markerEnd="url(#c5-moment)"
        />
        <line
          x1={O.x - 8}
          y1={CONTACT.y + 12}
          x2={O.x - 62}
          y2={CONTACT.y + 12}
          stroke={FRICTION}
          strokeWidth={3.4}
          markerEnd="url(#c5-friction)"
        />
      </Reveal>

      <Reveal show={index >= 4}>
        <Arrow from={{ x: O.x, y: CONTACT.y }} to={{ x: O.x, y: CONTACT.y + 42 }} color={NORMAL} width={3} />
      </Reveal>

      <Reveal show={index >= 5}>
        <Arrow from={{ x: A.x, y: A.y - 4 }} to={{ x: A.x - 32, y: A.y - 4 }} color={NORMAL} width={2.6} />
        <Arrow from={{ x: A.x, y: A.y - 4 }} to={{ x: A.x, y: A.y - 26 }} color={NORMAL} width={2.6} />
      </Reveal>

      <Reveal show={index >= 6}>
        <Arrow from={{ x: O.x + 8, y: O.y }} to={{ x: O.x + 8, y: O.y - 38 }} color={NORMAL} width={2.6} />
        <Arrow from={{ x: O.x + 8, y: O.y }} to={{ x: O.x + 38, y: O.y }} color={NORMAL} width={2.6} />
      </Reveal>

      <Label x={O.x - 0.707 * RO - 4} y={O.y + 0.707 * RO + 12} size={9} color={MUTED} anchor="end">
        1,2R
      </Label>
      <Label x={O.x + RI + 4} y={O.y - 3} size={9} color={MUTED}>
        R
      </Label>
      <Label x={O.x - 8} y={O.y + 56} size={10} color={WEIGHT} anchor="middle">
        G = 1,5 kN
      </Label>
      {index >= 1 && (
        <>
          <Label x={A.x + 4} y={LEVER_Y - 24} size={9} color={MUTED} anchor="end">
            a = 0,20 m
          </Label>
          <Label x={CONTACT.x + 6} y={LEVER_Y - 24} size={9} color={MUTED}>
            b = 0,30 m
          </Label>
          <Label x={CONTACT.x + 30} y={(LEVER_Y + CONTACT.y) / 2 + 3} size={9} color={MUTED}>
            e = 0,04
          </Label>
          <Label x={300} y={190} size={10} color={MUTED}>
            α = 45°
          </Label>
          <Label x={B.x + 58} y={B.y + 33} size={10} color={LOAD}>
            P = 37,69 kN
          </Label>
          <Label x={PULLEY.x + 16} y={PULLEY.y + 48} size={10} color={WEIGHT}>
            Q = 16 kN
          </Label>
        </>
      )}
      {index >= 2 && (
        <Label x={O.x - 160} y={O.y - 6} size={10} color={WEIGHT}>
          M_Q = 16 kN·m
        </Label>
      )}
      {index >= 3 && (
        <Label x={O.x - 68} y={CONTACT.y + 4} size={10} color={FRICTION} anchor="end">
          T = 13,33 kN
        </Label>
      )}
      {index >= 4 && (
        <Label x={O.x + 50} y={O.y - 20} size={10} color={NORMAL}>
          N = 44,44 kN
        </Label>
      )}
      {index >= 5 && (
        <Label x={A.x - 20} y={A.y - 10} size={10} color={NORMAL} anchor="end">
          A
        </Label>
      )}
      {index >= 6 && (
        <Label x={O.x + 42} y={O.y - 40} size={10} color={NORMAL}>
          O
        </Label>
      )}

      <text x={230} y={326} textAnchor="middle" fontSize={10.5} fill={noteColor}>
        {stageNote}
      </text>
    </SchematicFrame>
  )
}
