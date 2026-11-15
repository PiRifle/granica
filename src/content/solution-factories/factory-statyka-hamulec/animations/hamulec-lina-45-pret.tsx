import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../../types'
import {
  Arrow,
  Label,
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

const O = { x: 195, y: 190 }
const RU = 45
const RO = 2 * RU
const RI = RU
const CONTACT = { x: O.x - Math.cos(Math.PI / 6) * RO, y: O.y - Math.sin(Math.PI / 6) * RO }
const U = { x: -Math.cos(Math.PI / 6), y: -0.5 }
const N_DIR = { x: -0.5, y: Math.sqrt(3) / 2 }
const ROD_SCALE = 220
const B_GUIDE = { x: CONTACT.x + 0.1 * ROD_SCALE * U.x, y: CONTACT.y + 0.1 * ROD_SCALE * U.y }
const A_GUIDE = { x: CONTACT.x + 0.3 * ROD_SCALE * U.x, y: CONTACT.y + 0.3 * ROD_SCALE * U.y }
const P_POINT = { x: CONTACT.x + 0.35 * ROD_SCALE * U.x, y: CONTACT.y + 0.35 * ROD_SCALE * U.y }
const ROD_END = { x: CONTACT.x + 0.38 * ROD_SCALE * U.x, y: CONTACT.y + 0.38 * ROD_SCALE * U.y }
const ROPE_START = { x: O.x - Math.SQRT1_2 * RI, y: O.y - Math.SQRT1_2 * RI }
const ROPE_END = { x: ROPE_START.x + 0.707 * 95, y: ROPE_START.y - 0.707 * 95 }
const PULLEY = { x: 272, y: 49, r: 11 }
const WEIGHT_BOX = { x: 260, y: 71, w: 22, h: 22 }
const CONTACT_DIM = { x: CONTACT.x + 16 * N_DIR.x, y: CONTACT.y + 16 * N_DIR.y }
const B_DIM = { x: B_GUIDE.x + 16 * N_DIR.x, y: B_GUIDE.y + 16 * N_DIR.y }
const A_DIM = { x: A_GUIDE.x + 16 * N_DIR.x, y: A_GUIDE.y + 16 * N_DIR.y }

const arc = (cx: number, cy: number, radius: number, from: number, to: number, sweep = 1) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 ${sweep} ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

export function Rope45RodBrakeAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const spin = index >= 2 ? (playing ? 18 * t : 18) : 0
  const stageNote =
    index === 0
      ? 'Model: tarcza 2R, bęben liny R, pręt hamulcowy w prowadnicach A i B'
      : index === 1
        ? 'Geometria: styk lewy-górny, α = 30°, lina 45° do krążka stałego z ciężarem Q'
        : index === 2
          ? 'Naprężenie liny S = Q = 18 kN daje moment M_Q = 18 kN·m'
          : index === 3
            ? 'Tarcie z ΣM_O: T = M_Q/2R = 18/2 = 9,00 kN'
            : index === 4
              ? 'Warunek graniczny T = μN daje N = 9,00/0,35 = 25,71 kN'
              : index === 5
                ? 'Pręt osiowy: P = N = 25,71 kN; reakcje A i B są prostopadłe do pręta'
                : index === 6
                  ? 'Znaki: tarcie na pręcie jest przeciwne do tarcia na bębnie; O = (−30,50; 10,12) kN'
                  : 'Kontrola: P = N, T = μN, reakcje A i B domykają równowagę pręta'
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
      label="Tarcza 2R z prętem hamulcowym i liną przez krążek stały"
      desc="Tarcza hamulcowa, pręt w dwóch prowadnicach, lina pod 45 stopni do krążka z ciężarem Q, tarcie i reakcje."
    >
      <defs>
        <marker id="c8-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
        </marker>
        <marker id="c8-friction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
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

      <line
        x1={CONTACT.x}
        y1={CONTACT.y}
        x2={ROD_END.x}
        y2={ROD_END.y}
        stroke={WEIGHT}
        strokeWidth={7}
        strokeLinecap="round"
      />
      <line
        x1={CONTACT.x - 14 * 0.5}
        y1={CONTACT.y + 14 * 0.866}
        x2={CONTACT.x + 14 * 0.5}
        y2={CONTACT.y - 14 * 0.866}
        stroke={FRICTION}
        strokeWidth={7}
        strokeLinecap="round"
      />
      <line
        x1={B_GUIDE.x - 12 * N_DIR.x}
        y1={B_GUIDE.y - 12 * N_DIR.y}
        x2={B_GUIDE.x + 12 * N_DIR.x}
        y2={B_GUIDE.y + 12 * N_DIR.y}
        stroke={MUTED}
        strokeWidth={3}
      />
      <line
        x1={A_GUIDE.x - 14 * N_DIR.x}
        y1={A_GUIDE.y - 14 * N_DIR.y}
        x2={A_GUIDE.x + 14 * N_DIR.x}
        y2={A_GUIDE.y + 14 * N_DIR.y}
        stroke={MUTED}
        strokeWidth={3}
      />

      <line x1={O.x} y1={O.y} x2={CONTACT.x} y2={CONTACT.y} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
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
      <Arrow from={O} to={{ x: O.x, y: O.y + 46 }} color={WEIGHT} width={2.4} />
      <path d={arc(O.x, O.y, 30, 150, 180)} fill="none" stroke={MUTED} strokeWidth={1.1} />

      <Reveal show={index >= 1}>
        <line x1={ROPE_START.x} y1={ROPE_START.y} x2={ROPE_END.x} y2={ROPE_END.y} stroke={WEIGHT} strokeWidth={3} />
        <line x1={ROPE_END.x} y1={ROPE_END.y} x2={PULLEY.x - 6} y2={PULLEY.y + 6} stroke={WEIGHT} strokeWidth={3} />
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
        <line x1={CONTACT_DIM.x} y1={CONTACT_DIM.y} x2={B_DIM.x} y2={B_DIM.y} stroke={MUTED} strokeWidth={1} />
        <line x1={B_DIM.x} y1={B_DIM.y} x2={A_DIM.x} y2={A_DIM.y} stroke={MUTED} strokeWidth={1} />
        <line
          x1={CONTACT_DIM.x - 3 * U.x}
          y1={CONTACT_DIM.y - 3 * U.y}
          x2={CONTACT_DIM.x + 3 * U.x}
          y2={CONTACT_DIM.y + 3 * U.y}
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
          x1={B_DIM.x - 3 * U.x}
          y1={B_DIM.y - 3 * U.y}
          x2={B_DIM.x + 3 * U.x}
          y2={B_DIM.y + 3 * U.y}
          stroke={MUTED}
          strokeWidth={1}
        />
        <motion.g
          initial={false}
          animate={{ opacity: playing ? 0.82 + 0.18 * Math.sin(t * Math.PI * 2) : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Arrow from={{ x: P_POINT.x - 48 * 0.866, y: P_POINT.y - 48 * 0.5 }} to={P_POINT} color={LOAD} width={3.6} />
        </motion.g>
      </Reveal>

      <Reveal show={index >= 2}>
        <path
          d={arc(O.x, O.y, RO + 16, 60, 120)}
          fill="none"
          stroke={WEIGHT}
          strokeWidth={2.2}
          markerEnd="url(#c8-moment)"
        />
        <line
          x1={CONTACT.x - 4 * 0.5}
          y1={CONTACT.y + 4 * 0.866}
          x2={CONTACT.x - 36 * 0.5}
          y2={CONTACT.y + 36 * 0.866}
          stroke={FRICTION}
          strokeWidth={3.4}
          markerEnd="url(#c8-friction)"
        />
      </Reveal>

      <Reveal show={index >= 4}>
        <Arrow
          from={CONTACT}
          to={{ x: CONTACT.x + 44 * Math.cos(Math.PI / 6), y: CONTACT.y + 22 }}
          color={NORMAL}
          width={3}
        />
      </Reveal>

      <Reveal show={index >= 5}>
        <Arrow from={A_GUIDE} to={{ x: A_GUIDE.x + 38 * 0.5, y: A_GUIDE.y - 38 * 0.866 }} color={NORMAL} width={2.6} />
        <Arrow
          from={B_GUIDE}
          to={{ x: B_GUIDE.x + 38 * N_DIR.x, y: B_GUIDE.y + 38 * N_DIR.y }}
          color={NORMAL}
          width={2.6}
        />
      </Reveal>

      <Reveal show={index >= 6}>
        <Arrow from={O} to={{ x: O.x - 42, y: O.y - 12 }} color={NORMAL} width={2.6} />
      </Reveal>

      <Label x={O.x - 0.707 * RO - 4} y={O.y + 0.707 * RO + 12} size={9} color={MUTED} anchor="end">
        2R
      </Label>
      <Label x={O.x + RI + 4} y={O.y - 3} size={9} color={MUTED}>
        R
      </Label>
      <Label x={O.x + 8} y={O.y + 56} size={10} color={WEIGHT}>
        G = 2,2 kN
      </Label>
      <Label x={150} y={206} size={10} color={MUTED}>
        α = 30°
      </Label>
      {index >= 1 && (
        <>
          <Label x={104} y={160} size={9} color={MUTED}>
            b
          </Label>
          <Label x={58} y={151} size={9} color={MUTED} anchor="end">
            a
          </Label>
          <Label x={44} y={104} size={9} color={NORMAL} anchor="end">
            A
          </Label>
          <Label x={108} y={128} size={9} color={NORMAL}>
            B
          </Label>
          <Label x={12} y={72} size={10} color={LOAD}>
            P = 25,71 kN
          </Label>
          <Label x={225} y={105} size={10} color={WEIGHT}>
            S = Q = 18 kN
          </Label>
          <Label x={288} y={90} size={10} color={WEIGHT}>
            Q = 18 kN
          </Label>
        </>
      )}
      {index >= 2 && (
        <Label x={300} y={268} size={10} color={WEIGHT}>
          M_Q = 18 kN·m
        </Label>
      )}
      {index >= 3 && (
        <Label x={60} y={180} size={10} color={FRICTION} anchor="end">
          T = 9,00 kN
        </Label>
      )}
      {index >= 4 && (
        <Label x={155} y={172} size={10} color={NORMAL}>
          N = 25,71 kN
        </Label>
      )}
      {index >= 6 && (
        <Label x={150} y={174} size={10} color={NORMAL} anchor="end">
          O
        </Label>
      )}

      <text x={230} y={326} textAnchor="middle" fontSize={10.5} fill={noteColor}>
        {stageNote}
      </text>
    </SchematicFrame>
  )
}
