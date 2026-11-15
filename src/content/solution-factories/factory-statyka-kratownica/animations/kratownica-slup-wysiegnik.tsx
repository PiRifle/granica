import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../../types'
import {
  Arrow,
  Dimension,
  Label,
  PinSupport,
  SCHEMA,
  SchematicFrame,
} from '../../../../components/solution-figures/statics-schematic'

const TENSION = SCHEMA.tension
const COMPRESSION = SCHEMA.compression
const ZERO = SCHEMA.zero
const STEEL = SCHEMA.edge
const LOAD = SCHEMA.load
const REACTION = SCHEMA.member
const INK = SCHEMA.ink
const MUTED = SCHEMA.muted
const AXIS = '#c3ccd7'

type Status = 'idle' | 'tension' | 'compression' | 'zero'
type NodeName = 'A' | 'L3' | 'L2' | 'L1' | 'B' | 'R3' | 'R2' | 'R1'

const SCALE = 32
const ORIGIN = { x: 180, y: 285 }
const px = (x: number, y: number) => ({ x: ORIGIN.x + x * SCALE, y: ORIGIN.y - y * SCALE })
const A = Math.sqrt(4 / 3)

const NODES: Record<NodeName, { x: number; y: number }> = {
  A: px(0, 8),
  L3: px(0, 6),
  L2: px(0, 4),
  L1: px(0, 2),
  B: px(0, 0),
  R3: px(A, 6),
  R2: px(2 * A, 4),
  R1: px(A, 2),
}

const MEMBERS: Array<{ id: number; from: NodeName; to: NodeName; stage: number }> = [
  { id: 1, from: 'A', to: 'L3', stage: 2 },
  { id: 2, from: 'A', to: 'R3', stage: 3 },
  { id: 3, from: 'L3', to: 'R3', stage: 2 },
  { id: 4, from: 'L3', to: 'L2', stage: 2 },
  { id: 5, from: 'L2', to: 'R3', stage: 3 },
  { id: 6, from: 'R3', to: 'R2', stage: 3 },
  { id: 7, from: 'L2', to: 'R2', stage: 4 },
  { id: 8, from: 'L2', to: 'L1', stage: 2 },
  { id: 9, from: 'L2', to: 'R1', stage: 4 },
  { id: 10, from: 'R1', to: 'R2', stage: 4 },
  { id: 11, from: 'L1', to: 'R1', stage: 2 },
  { id: 12, from: 'L1', to: 'B', stage: 2 },
  { id: 13, from: 'B', to: 'R1', stage: 5 },
]

const FORCES: Record<number, number> = {
  1: -1.634,
  2: 1.887,
  3: 0,
  4: -1.634,
  5: -1.155,
  6: 0.732,
  7: 1.577,
  8: -0.902,
  9: -2,
  10: -3.887,
  11: 0,
  12: -0.902,
  13: -5.887,
}

const LABELS: Record<number, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  1: { x: 172, y: 60, anchor: 'end' },
  2: { x: 205, y: 50, anchor: 'start' },
  3: { x: 198, y: 86, anchor: 'middle' },
  4: { x: 172, y: 125, anchor: 'end' },
  5: { x: 203, y: 125, anchor: 'start' },
  6: { x: 243, y: 122, anchor: 'start' },
  7: { x: 217, y: 150, anchor: 'middle' },
  8: { x: 172, y: 189, anchor: 'end' },
  9: { x: 194, y: 196, anchor: 'middle' },
  10: { x: 242, y: 194, anchor: 'start' },
  11: { x: 198, y: 230, anchor: 'middle' },
  12: { x: 172, y: 253, anchor: 'end' },
  13: { x: 204, y: 258, anchor: 'start' },
}

const NODE_LABELS: Record<NodeName, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  A: { x: 174, y: 22, anchor: 'end' },
  L3: { x: 174, y: 90, anchor: 'end' },
  L2: { x: 174, y: 154, anchor: 'end' },
  L1: { x: 174, y: 218, anchor: 'end' },
  B: { x: 188, y: 302, anchor: 'start' },
  R3: { x: 224, y: 88, anchor: 'start' },
  R2: { x: 262, y: 154, anchor: 'start' },
  R1: { x: 224, y: 218, anchor: 'start' },
}

const NOTES = [
  'Model: pionowy słup A–B i trójkątny wysięgnik R1–R3',
  'Reakcje: A_x = −0,943 kN w lewo, B_x = 2,943 kN w prawo, B_y = 6,000 kN w górę',
  'Pręty zerowe N3 = N11 = 0; z węzła L3: N1 = N4 = −1,634 kN',
  'Węzeł R3: N2 = +1,887, N5 = −1,155, N6 = +0,732 kN',
  'Węzły L2 i R2: N7 = +1,577, N9 = −2,000, N10 = −3,887 kN',
  'Węzeł R1 i B: N8 = N12 = −0,902, N13 = −5,887 kN',
  'Komplet sił N1–N13; liczby na prętach są zgodne z rozwiązaniem',
  'Znaki i kontrola: reszty węzłowe ≈ 0, bilans globalny = 0',
]

const colorFor = (status: Status) =>
  status === 'tension' ? TENSION : status === 'compression' ? COMPRESSION : status === 'zero' ? ZERO : STEEL

const widthFor = (status: Status) => (status === 'idle' ? 3.6 : status === 'zero' ? 2.4 : 5)

function format(value: number) {
  if (Math.abs(value) < 0.005) return '0'
  const text = Math.abs(value).toLocaleString('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  })
  return `${value > 0 ? '+' : '−'}${text}`
}

function Member({ member, status, index }: { member: (typeof MEMBERS)[number]; status: Status; index: number }) {
  const a = NODES[member.from]
  const b = NODES[member.to]
  const active = status !== 'idle'
  return (
    <g>
      <motion.line
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        strokeLinecap="round"
        initial={false}
        animate={{ stroke: colorFor(status), strokeWidth: widthFor(status) }}
        transition={{ duration: 0.35 }}
        strokeDasharray={status === 'zero' ? '9 7' : undefined}
      />
      {active && index >= 2 && (
        <motion.line
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="#ffffff"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeDasharray="4 12"
          initial={false}
          animate={{ strokeDashoffset: [0, -32] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: 'linear' }}
          opacity={0.8}
        />
      )}
    </g>
  )
}

function WallA() {
  return (
    <g stroke={STEEL} strokeWidth={1.6} fill="none">
      <line x1={150} y1={5} x2={150} y2={55} />
      {Array.from({ length: 6 }, (_, index) => (
        <line key={index} x1={150} y1={7 + index * 8} x2={140} y2={13 + index * 8} strokeWidth={1} />
      ))}
      <circle cx={NODES.A.x} cy={NODES.A.y} r={4} fill={STEEL} stroke="none" />
    </g>
  )
}

export function D05TrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.35 + sceneProgress * 1.9) : 1
  const statusOf = (member: (typeof MEMBERS)[number]): Status => {
    if (index < member.stage) return 'idle'
    const force = FORCES[member.id]
    return force > 0.005 ? 'tension' : force < -0.005 ? 'compression' : 'zero'
  }
  const showReactions = index >= 1
  const showValues = index >= 2
  const activeNode: NodeName | null =
    index === 2 ? 'L3' : index === 3 ? 'R3' : index === 4 ? 'L2' : index === 5 ? 'R1' : null

  return (
    <SchematicFrame
      label="Kratownica nr 5 z pionowym słupem A–B i trójkątnym wysięgnikiem"
      desc="Osiem węzłów, trzynaście prętów, podpora pozioma A na ścianie, przegub B na gruncie oraz obciążenia P1, P2 i P3."
    >
      <defs>
        <marker id="d05-load" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.2" markerHeight="6.2" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={LOAD} />
        </marker>
        <marker id="d05-react" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.2" markerHeight="6.2" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={REACTION} />
        </marker>
      </defs>

      <Label x={230} y={334} size={10} anchor="middle" color={MUTED}>
        {NOTES[index] ?? NOTES[NOTES.length - 1]}
      </Label>

      {index === 0 && (
        <g stroke={AXIS} strokeWidth={1.1} fill={MUTED}>
          <Dimension from={NODES.L3} to={NODES.R3} label="" offset={-26} size={8} labelOffset={{ x: -75, y: -12 }} />
          <text x={244} y={82} fontSize={8} fill={MUTED} stroke="none">
            a = 1,155 m
          </text>
          <line x1={158} y1={NODES.A.y} x2={158} y2={NODES.B.y} strokeDasharray="4 4" />
          {[NODES.A.y, NODES.L3.y, NODES.L2.y, NODES.L1.y, NODES.B.y].map((y) => (
            <line key={y} x1={153} y1={y} x2={163} y2={y} stroke={AXIS} />
          ))}
          <text x={156} y={(NODES.L3.y + NODES.L2.y) / 2 + 3} textAnchor="end" fontSize={8} stroke="none">
            h = 2,0 m
          </text>
          <path
            d={`M ${NODES.R1.x - 24} ${NODES.R1.y} A 24 24 0 0 0 ${NODES.R1.x - 13} ${NODES.R1.y + 21}`}
            fill="none"
          />
          <text x={NODES.R1.x - 60} y={NODES.R1.y + 24} textAnchor="end" fontSize={8.5} stroke="none">
            α = 60°
          </text>
        </g>
      )}

      {MEMBERS.map((member) => (
        <Member key={member.id} member={member} status={statusOf(member)} index={index} />
      ))}

      <WallA />
      <PinSupport x={NODES.B.x} y={NODES.B.y} />

      {showReactions && (
        <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
          <Arrow from={NODES.A} to={{ x: NODES.A.x - 32, y: NODES.A.y }} color={REACTION} width={2.6} />
          <Label x={NODES.A.x - 36} y={NODES.A.y - 6} size={8.5} anchor="end" color={REACTION}>
            A_x = −0,943
          </Label>
          <Arrow
            from={{ x: NODES.B.x + 8, y: NODES.B.y - 6 }}
            to={{ x: NODES.B.x + 52, y: NODES.B.y - 6 }}
            color={REACTION}
            width={2.6}
          />
          <Label x={NODES.B.x + 56} y={NODES.B.y - 10} size={8.5} color={REACTION}>
            B_x = 2,943
          </Label>
          <Arrow
            from={{ x: NODES.B.x + 12, y: NODES.B.y }}
            to={{ x: NODES.B.x + 12, y: NODES.B.y - 46 }}
            color={REACTION}
            width={2.6}
          />
          <Label x={NODES.B.x + 50} y={NODES.B.y - 50} size={8.5} color={REACTION}>
            B_y = 6,000
          </Label>
        </motion.g>
      )}

      <motion.g
        initial={false}
        animate={{ opacity: [1, 0.72, 1] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      >
        <line
          x1={NODES.R3.x}
          y1={NODES.R3.y + 4}
          x2={NODES.R3.x}
          y2={NODES.R3.y + 34}
          stroke={LOAD}
          strokeWidth={3}
          markerEnd="url(#d05-load)"
        />
        <line
          x1={NODES.R2.x}
          y1={NODES.R2.y + 4}
          x2={NODES.R2.x}
          y2={NODES.R2.y + 36}
          stroke={LOAD}
          strokeWidth={3}
          markerEnd="url(#d05-load)"
        />
        <line
          x1={NODES.R1.x - 6}
          y1={NODES.R1.y - 12}
          x2={NODES.R1.x - 42}
          y2={NODES.R1.y - 12}
          stroke={LOAD}
          strokeWidth={3}
          markerEnd="url(#d05-load)"
        />
      </motion.g>
      <line x1={NODES.R1.x} y1={NODES.R1.y} x2={NODES.R1.x} y2={NODES.R1.y - 12} stroke={LOAD} strokeWidth={2.2} />

      {activeNode && (
        <motion.circle
          cx={NODES[activeNode].x}
          cy={NODES[activeNode].y}
          fill="none"
          stroke={REACTION}
          initial={false}
          animate={{ r: [8, 12, 8], opacity: [0.65, 0.2, 0.65] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      )}

      {Object.values(NODES).map((node) => (
        <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r={4.1} fill={INK} />
      ))}

      <g fontSize={9.5} fontWeight={600} fill={INK}>
        {(Object.keys(NODE_LABELS) as NodeName[]).map((name) => {
          const label = NODE_LABELS[name]
          return (
            <text key={name} x={label.x} y={label.y} textAnchor={label.anchor}>
              {name}
            </text>
          )
        })}
      </g>

      <g fontSize={7.8} fontWeight={600}>
        {MEMBERS.map((member) => {
          const label = LABELS[member.id]
          const status = statusOf(member)
          const force = FORCES[member.id]
          return (
            <text
              key={member.id}
              x={label.x}
              y={label.y}
              textAnchor={label.anchor}
              fill={showValues && index >= member.stage ? colorFor(status) : MUTED}
              stroke="#ffffff"
              strokeWidth={2.2}
              paintOrder="stroke"
            >
              {showValues && index >= member.stage ? `N${member.id}=${format(force)}` : member.id}
            </text>
          )
        })}
      </g>

      <g fontSize={8.5} fill={LOAD} fontWeight={600}>
        <text x={NODES.R3.x + 6} y={NODES.R3.y + 44}>
          P₁=2 kN
        </text>
        <text x={NODES.R2.x + 6} y={NODES.R2.y + 55}>
          P₂=4 kN
        </text>
        <text x={NODES.R1.x - 46} y={NODES.R1.y - 16} textAnchor="end">
          P₃=2 kN
        </text>
      </g>

      <g fontSize={8.3} fill={MUTED}>
        <rect x={300} y={22} width={14} height={3} rx={1.5} fill={TENSION} />
        <text x={318} y={27}>
          rozciąganie
        </text>
        <rect x={300} y={40} width={14} height={3} rx={1.5} fill={COMPRESSION} />
        <text x={318} y={45}>
          ściskanie
        </text>
        <line x1={300} y1={58} x2={314} y2={58} stroke={ZERO} strokeWidth={2.4} strokeDasharray="6 4" />
        <text x={318} y={62}>
          zero
        </text>
      </g>
    </SchematicFrame>
  )
}
