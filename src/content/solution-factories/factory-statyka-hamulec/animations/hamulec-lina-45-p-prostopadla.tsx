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

const O = { x: 225, y: 165 }
const RU = 50
const RO = 1.5 * RU
const RI = RU
const CONTACT = { x: O.x + Math.cos(Math.PI / 6) * RO, y: O.y - Math.sin(Math.PI / 6) * RO }
const N_OUT = { x: Math.cos(Math.PI / 6), y: -Math.sin(Math.PI / 6) }
const U = { x: -0.5, y: -Math.sqrt(3) / 2 }
const AXIS = { x: CONTACT.x + 10 * N_OUT.x, y: CONTACT.y + 10 * N_OUT.y }
const B = { x: AXIS.x + 0.2 * 200 * U.x, y: AXIS.y + 0.2 * 200 * U.y }
const A = { x: AXIS.x - 0.5 * 200 * U.x, y: AXIS.y - 0.5 * 200 * U.y }
const BLOCK = { x: CONTACT.x + 5 * N_OUT.x, y: CONTACT.y + 5 * N_OUT.y }
const ROPE_START = { x: O.x - Math.SQRT1_2 * RI, y: O.y - Math.SQRT1_2 * RI }
const ROPE_END = { x: ROPE_START.x - 0.707 * 92, y: ROPE_START.y + 0.707 * 92 }
const PULLEY = { x: 96, y: 224, r: 11 }
const WEIGHT_BOX = { x: 84, y: 250, w: 22, h: 22 }
const B_DIM = { x: B.x + 22 * N_OUT.x, y: B.y + 22 * N_OUT.y }
const BLOCK_DIM = { x: BLOCK.x + 22 * N_OUT.x, y: BLOCK.y + 22 * N_OUT.y }
const A_DIM = { x: A.x + 22 * N_OUT.x, y: A.y + 22 * N_OUT.y }

const arc = (cx: number, cy: number, radius: number, from: number, to: number, sweep = 1) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 ${sweep} ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

export function Rope45LeverBrakeAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const spin = index >= 2 ? (playing ? -18 * t : -18) : 0
  const stageNote =
    index === 0
      ? 'Model: tarcza 1,5R, bęben liny R, dźwignia AB styczna do tarczy'
      : index === 1
        ? 'Geometria: styk prawy-górny, α = 30°, lina 45° w lewo-dół, P prostopadła'
        : index === 2
          ? 'Moment liny M_Q = Q·R = 20 kN·m działa przeciwnie do wskazówek zegara'
          : index === 3
            ? 'Tarcie z ΣM_O: T = M_Q/1,5R = 20/1,5 = 13,33 kN'
            : index === 4
              ? 'Warunek graniczny T = μN daje N = 13,33/0,40 = 33,33 kN'
              : index === 5
                ? 'Dźwignia: P(a+b) = Nb + Te, więc P = 24,76 kN'
                : index === 6
                  ? 'Znaki: tarcie na dźwigni jest przeciwne do tarcia na bębnie; O = (36,34; 44,36) kN'
                  : 'Kontrola: T = μN, P > 0, reakcja A domyka równowagę dźwigni'
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
      label="Tarcza 1,5R z dźwignią styczną i liną pod kątem 45 stopni"
      desc="Tarcza hamulcowa z klockiem, styczna dźwignia z siłą P prostopadłą, lina z ciężarem Q i reakcje."
    >
      <defs>
        <marker id="c7-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
        </marker>
        <marker id="c7-friction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
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
        x={BLOCK.x - 13}
        y={BLOCK.y - 4.5}
        width={26}
        height={9}
        rx={2}
        fill={FRICTION}
        opacity={0.85}
        transform={`rotate(-120 ${BLOCK.x} ${BLOCK.y})`}
      />

      <line
        x1={O.x}
        y1={O.y}
        x2={O.x + 0.707 * RO}
        y2={O.y + 0.707 * RO}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <line x1={O.x} y1={O.y} x2={O.x + RI} y2={O.y} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
      <Arrow from={O} to={{ x: O.x, y: O.y + 46 }} color={WEIGHT} width={2.4} />
      <path d={arc(O.x, O.y, 34, -30, 0)} fill="none" stroke={MUTED} strokeWidth={1.1} />

      <Reveal show={index >= 1}>
        <line x1={ROPE_START.x} y1={ROPE_START.y} x2={ROPE_END.x} y2={ROPE_END.y} stroke={WEIGHT} strokeWidth={3} />
        <line x1={ROPE_END.x} y1={ROPE_END.y} x2={PULLEY.x + 6} y2={PULLEY.y - 6} stroke={WEIGHT} strokeWidth={3} />
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
        <line x1={B_DIM.x} y1={B_DIM.y} x2={BLOCK_DIM.x} y2={BLOCK_DIM.y} stroke={MUTED} strokeWidth={1} />
        <line x1={BLOCK_DIM.x} y1={BLOCK_DIM.y} x2={A_DIM.x} y2={A_DIM.y} stroke={MUTED} strokeWidth={1} />
        <line
          x1={B_DIM.x - 3 * U.x}
          y1={B_DIM.y - 3 * U.y}
          x2={B_DIM.x + 3 * U.x}
          y2={B_DIM.y + 3 * U.y}
          stroke={MUTED}
          strokeWidth={1}
        />
        <line
          x1={A_DIM.x - 3 * U.x}
          y1={A_DIM.y - 3 * U.y}
          x2={A_DIM.x + 3 * U.x}
          y2={A_DIM.y + 3 * U.y}
          stroke={MUTED}
          strokeWidth={1}
        />
        <line
          x1={BLOCK_DIM.x - 3 * U.x}
          y1={BLOCK_DIM.y - 3 * U.y}
          x2={BLOCK_DIM.x + 3 * U.x}
          y2={BLOCK_DIM.y + 3 * U.y}
          stroke={MUTED}
          strokeWidth={1}
        />
        <motion.g
          initial={false}
          animate={{ opacity: playing ? 0.82 + 0.18 * Math.sin(t * Math.PI * 2) : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Arrow from={{ x: B.x + 55 * 0.866, y: B.y - 27.5 }} to={B} color={LOAD} width={3.6} />
        </motion.g>
      </Reveal>

      <Reveal show={index >= 2}>
        <path
          d={arc(O.x, O.y, RO + 14, 210, 150, 0)}
          fill="none"
          stroke={WEIGHT}
          strokeWidth={2.2}
          markerEnd="url(#c7-moment)"
        />
        <line
          x1={CONTACT.x + 4 * 0.5}
          y1={CONTACT.y + 4 * 0.866}
          x2={CONTACT.x + 44 * 0.5}
          y2={CONTACT.y + 44 * 0.866}
          stroke={FRICTION}
          strokeWidth={3.4}
          markerEnd="url(#c7-friction)"
        />
      </Reveal>

      <Reveal show={index >= 4}>
        <Arrow
          from={CONTACT}
          to={{ x: CONTACT.x - 44 * Math.cos(Math.PI / 6), y: CONTACT.y + 44 * Math.sin(Math.PI / 6) }}
          color={NORMAL}
          width={3}
        />
      </Reveal>

      <Reveal show={index >= 5}>
        <Arrow from={A} to={{ x: A.x - 14, y: A.y + 42 }} color={NORMAL} width={2.6} />
      </Reveal>

      <Reveal show={index >= 6}>
        <Arrow from={O} to={{ x: O.x + 36, y: O.y - 32 }} color={NORMAL} width={2.6} />
      </Reveal>

      <Label x={O.x + 0.707 * RO + 6} y={O.y + 0.707 * RO + 14} size={9} color={MUTED}>
        1,5R
      </Label>
      <Label x={O.x + RI + 4} y={O.y - 3} size={9} color={MUTED}>
        R
      </Label>
      <Label x={O.x - 90} y={O.y + 74} size={10} color={WEIGHT} anchor="end">
        G = 2,0 kN
      </Label>
      <Label x={300} y={148} size={10} color={MUTED}>
        α = 30°
      </Label>
      {index >= 1 && (
        <>
          <Label x={305} y={90} size={9} color={MUTED} anchor="middle">
            a = 0,20 m
          </Label>
          <Label x={350} y={164} size={9} color={MUTED}>
            b = 0,50 m
          </Label>
          <Label x={312} y={118} size={9} color={MUTED}>
            e
          </Label>
          <Label x={60} y={196} size={10} color={WEIGHT}>
            S = 20 kN
          </Label>
          <Label x={112} y={268} size={10} color={WEIGHT}>
            Q = 20 kN
          </Label>
          <Label x={340} y={58} size={10} color={LOAD}>
            P = 24,76 kN
          </Label>
          <Label x={272} y={82} size={9} color={MUTED} anchor="end">
            B
          </Label>
        </>
      )}
      {index >= 2 && (
        <Label x={52} y={150} size={10} color={WEIGHT}>
          M_Q = 20 kN·m
        </Label>
      )}
      {index >= 3 && (
        <Label x={326} y={186} size={10} color={FRICTION}>
          T = 13,33 kN
        </Label>
      )}
      {index >= 4 && (
        <Label x={148} y={178} size={10} color={NORMAL} anchor="end">
          N = 33,33 kN
        </Label>
      )}
      {index >= 5 && (
        <Label x={356} y={224} size={10} color={NORMAL}>
          A
        </Label>
      )}
      {index >= 6 && (
        <Label x={264} y={130} size={10} color={NORMAL}>
          O
        </Label>
      )}

      <text x={230} y={326} textAnchor="middle" fontSize={10.5} fill={noteColor}>
        {stageNote}
      </text>
    </SchematicFrame>
  )
}
