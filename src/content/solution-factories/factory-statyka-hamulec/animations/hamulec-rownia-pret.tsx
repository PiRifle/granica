import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../../types'
import { Arrow, Label, Reveal, SCHEMA, SchematicFrame, clamp01 } from '../../../../components/solution-figures/statics-schematic'

const INK = SCHEMA.ink
const MUTED = SCHEMA.muted
const LOAD = SCHEMA.load
const FRICTION = SCHEMA.member
const NORMAL = SCHEMA.reaction
const WEIGHT = '#68727e'
const ACCENT = SCHEMA.accent

const O = { x: 238, y: 160 }
const RU = 50
const RO = 2 * RU
const RI = RU
const CONTACT = { x: O.x - Math.SQRT1_2 * RO, y: O.y + Math.SQRT1_2 * RO }
const U = { x: -Math.SQRT1_2, y: Math.SQRT1_2 }
const ROD_SCALE = 240
const B_GUIDE = { x: CONTACT.x + 0.1 * ROD_SCALE * U.x, y: CONTACT.y + 0.1 * ROD_SCALE * U.y }
const A_GUIDE = { x: CONTACT.x + 0.25 * ROD_SCALE * U.x, y: CONTACT.y + 0.25 * ROD_SCALE * U.y }
const P_POINT = { x: CONTACT.x + 0.3 * ROD_SCALE * U.x, y: CONTACT.y + 0.3 * ROD_SCALE * U.y }
const ROD_END = { x: CONTACT.x + 0.34 * ROD_SCALE * U.x, y: CONTACT.y + 0.34 * ROD_SCALE * U.y }
const ROPE_START = { x: O.x + 0.5 * RI, y: O.y - 0.866 * RI }
const ROPE_END = { x: ROPE_START.x + 0.866 * 110, y: ROPE_START.y + 0.5 * 110 }
const N_DIR = { x: Math.SQRT1_2, y: Math.SQRT1_2 }
const BLOCK = { x: ROPE_END.x, y: ROPE_END.y }

const arc = (cx: number, cy: number, radius: number, from: number, to: number) => {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 1 ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

const hatch = (x: number, y: number, count: number) => (
  <g stroke={MUTED} strokeWidth={1.1} opacity={0.7}>
    {Array.from({ length: count }, (_, i) => (
      <line key={i} x1={x + i * 18} y1={y + i * 10.4} x2={x + i * 18 - 10} y2={y + i * 10.4 + 12} />
    ))}
  </g>
)

export function SlopeBlockRodBrakeAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const t = playing ? clamp01(sceneProgress) : 1
  const spin = index >= 2 ? (playing ? 18 * t : 18) : 0
  const stageNote =
    index === 0
      ? 'Model: tarcza 2R, bęben R, pręt hamulcowy w prowadnicach A i B'
      : index === 1
        ? 'Geometria: styk lewy-dolny pod 45°, lina 30° do klocka Q na równi'
        : index === 2
          ? 'Naprężenie liny S = Q sin30° = 9 kN daje moment M_Q = 9 kN·m'
          : index === 3
            ? 'Tarcie z ΣM_O: T = M_Q/2R = 9/2 = 4,50 kN'
            : index === 4
              ? 'Warunek graniczny T = μN daje N = 4,50/0,35 = 12,86 kN'
              : index === 5
                ? 'Pręt osiowy: P = N = 12,86 kN; reakcje A i B są prostopadłe do pręta'
                : index === 6
                  ? 'Znaki: tarcie na pręcie ma zwrot przeciwny do tarcia na bębnie; O = (−20,07; 0,19) kN'
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
      label="Bęben 2R z prętem hamulcowym i klockiem Q na równi 30 stopni"
      desc="Tarcza hamulcowa, pręt w dwóch prowadnicach, lina do klocka na równi, tarcie, nacisk i reakcje."
    >
      <defs>
        <marker id="c6-moment" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={WEIGHT} />
        </marker>
        <marker id="c6-friction" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
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
              x1={O.x + 8 * Math.cos(rad)}
              y1={O.y + 8 * Math.sin(rad)}
              x2={O.x + (RO - 8) * Math.cos(rad)}
              y2={O.y + (RO - 8) * Math.sin(rad)}
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
        x1={CONTACT.x}
        y1={CONTACT.y}
        x2={CONTACT.x - 27 * N_DIR.x}
        y2={CONTACT.y - 27 * N_DIR.y}
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
        x2={O.x + 0.707 * RO}
        y2={O.y + 0.707 * RO}
        stroke={MUTED}
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <line x1={O.x} y1={O.y} x2={O.x + RI} y2={O.y} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />
      <Arrow from={{ x: O.x, y: O.y }} to={{ x: O.x, y: O.y + 46 }} color={WEIGHT} width={2.4} />
      <path d={arc(O.x, O.y, 30, 90, 135)} fill="none" stroke={MUTED} strokeWidth={1.1} />

      <Reveal show={index >= 1}>
        <line x1={ROPE_START.x} y1={ROPE_START.y} x2={ROPE_END.x} y2={ROPE_END.y} stroke={WEIGHT} strokeWidth={3} />
        <line x1={BLOCK.x - 33} y1={BLOCK.y - 19} x2={BLOCK.x + 72} y2={BLOCK.y + 42} stroke={MUTED} strokeWidth={2} />
        {hatch(BLOCK.x - 30, BLOCK.y - 12, 6)}
        <rect
          x={BLOCK.x - 14}
          y={BLOCK.y - 7}
          width={28}
          height={13}
          rx={2}
          fill="#eef2fb"
          stroke={ACCENT}
          strokeWidth={1.6}
          transform={`rotate(30 ${BLOCK.x} ${BLOCK.y})`}
        />
        <motion.g
          initial={false}
          animate={{ opacity: playing ? 0.82 + 0.18 * Math.sin(t * Math.PI * 2) : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Arrow
            from={{ x: P_POINT.x + 12 * N_DIR.x, y: P_POINT.y + 12 * N_DIR.y }}
            to={{ x: P_POINT.x + 12 * N_DIR.x + 40 * Math.SQRT1_2, y: P_POINT.y + 12 * N_DIR.y - 40 * Math.SQRT1_2 }}
            color={LOAD}
            width={3.6}
          />
        </motion.g>
      </Reveal>

      <Reveal show={index >= 5}>
        <Arrow
          from={{ x: B_GUIDE.x, y: B_GUIDE.y }}
          to={{ x: B_GUIDE.x + 38 * N_DIR.x, y: B_GUIDE.y + 38 * N_DIR.y }}
          color={NORMAL}
          width={2.6}
        />
        <Arrow
          from={{ x: A_GUIDE.x, y: A_GUIDE.y }}
          to={{ x: A_GUIDE.x - 38 * N_DIR.x, y: A_GUIDE.y - 38 * N_DIR.y }}
          color={NORMAL}
          width={2.6}
        />
      </Reveal>

      <Reveal show={index >= 2}>
        <path
          d={arc(O.x, O.y, RO + 16, 150, 210)}
          fill="none"
          stroke={WEIGHT}
          strokeWidth={2.2}
          markerEnd="url(#c6-moment)"
        />
        <line
          x1={CONTACT.x + 6 * N_DIR.x}
          y1={CONTACT.y + 6 * N_DIR.y}
          x2={CONTACT.x + 52 * N_DIR.x}
          y2={CONTACT.y + 52 * N_DIR.y}
          stroke={FRICTION}
          strokeWidth={3.4}
          markerEnd="url(#c6-friction)"
        />
      </Reveal>

      <Reveal show={index >= 4}>
        <Arrow
          from={CONTACT}
          to={{ x: CONTACT.x + 44 * Math.SQRT1_2, y: CONTACT.y - 44 * Math.SQRT1_2 }}
          color={NORMAL}
          width={3}
        />
      </Reveal>

      <Reveal show={index >= 6}>
        <Arrow from={O} to={{ x: O.x - 42, y: O.y }} color={NORMAL} width={2.6} />
      </Reveal>

      <Label x={O.x + 0.707 * RO + 8} y={O.y + 0.707 * RO + 14} size={9} color={MUTED}>
        2R
      </Label>
      <Label x={O.x + RI + 4} y={O.y - 3} size={9} color={MUTED}>
        R
      </Label>
      <Label x={O.x - 90} y={O.y + 52} size={10} color={WEIGHT} anchor="end">
        G = 1,6 kN
      </Label>
      <Label x={O.x + 30} y={O.y + 44} size={10} color={MUTED}>
        α = 45°
      </Label>
      {index >= 1 && (
        <>
          <Label x={118} y={254} size={9} color={MUTED} anchor="end">
            a
          </Label>
          <Label x={150} y={234} size={9} color={MUTED} anchor="end">
            b
          </Label>
          <Label x={110} y={268} size={9} color={MUTED} anchor="end">
            A
          </Label>
          <Label x={166} y={258} size={9} color={NORMAL}>
            B
          </Label>
          <Label x={112} y={306} size={10} color={LOAD}>
            P = 12,86 kN
          </Label>
          <Label x={300} y={130} size={10} color={WEIGHT}>
            S = Q sin30° = 9 kN
          </Label>
          <Label x={382} y={158} size={10} color={WEIGHT}>
            Q = 18 kN
          </Label>
        </>
      )}
      {index >= 2 && (
        <Label x={52} y={132} size={10} color={WEIGHT}>
          M_Q = 9 kN·m
        </Label>
      )}
      {index >= 3 && (
        <Label x={208} y={276} size={10} color={FRICTION}>
          T = 4,50 kN
        </Label>
      )}
      {index >= 4 && (
        <Label x={212} y={184} size={10} color={NORMAL}>
          N = 12,86 kN
        </Label>
      )}
      {index >= 6 && (
        <Label x={188} y={154} size={10} color={NORMAL} anchor="end">
          O
        </Label>
      )}

      <text x={230} y={326} textAnchor="middle" fontSize={10.5} fill={noteColor}>
        {stageNote}
      </text>
    </SchematicFrame>
  )
}
