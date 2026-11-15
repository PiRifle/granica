import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../../types'
import {
  Arrow,
  Label,
  PinSupport,
  RollerSupport,
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
type NodeName = 'A' | 'M0' | 'T0' | 'M1' | 'T1' | 'M2' | 'T2' | 'T3'

const SCALE = 30
const ORIGIN = { x: 50, y: 250 }
const px = (x: number, y: number) => ({ x: ORIGIN.x + x * SCALE, y: ORIGIN.y - y * SCALE })

const NODES: Record<NodeName, { x: number; y: number }> = {
  A: px(0, 0),
  M0: px(0, 3),
  T0: px(0, 6),
  M1: px(4, 3),
  T1: px(4, 6),
  M2: px(8, 3),
  T2: px(8, 6),
  T3: px(12, 6),
}

const MEMBERS: Array<{ id: number; from: NodeName; to: NodeName; stage: number }> = [
  { id: 1, from: 'T0', to: 'M0', stage: 2 },
  { id: 2, from: 'M0', to: 'A', stage: 2 },
  { id: 3, from: 'T0', to: 'T1', stage: 2 },
  { id: 4, from: 'M0', to: 'T1', stage: 2 },
  { id: 5, from: 'M0', to: 'M1', stage: 2 },
  { id: 6, from: 'A', to: 'M1', stage: 3 },
  { id: 7, from: 'T1', to: 'M1', stage: 3 },
  { id: 8, from: 'T1', to: 'T2', stage: 3 },
  { id: 9, from: 'M1', to: 'T2', stage: 4 },
  { id: 10, from: 'M1', to: 'M2', stage: 4 },
  { id: 11, from: 'T2', to: 'M2', stage: 5 },
  { id: 12, from: 'T2', to: 'T3', stage: 5 },
  { id: 13, from: 'M2', to: 'T3', stage: 5 },
]

const FORCES: Record<number, number> = {
  1: 0,
  2: -1,
  3: -3,
  4: -1.667,
  5: 1.333,
  6: 3.75,
  7: -6,
  8: -4.333,
  9: 13.75,
  10: -6.667,
  11: -8.25,
  12: 6.667,
  13: -8.333,
}

const LABELS: Record<number, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  1: { x: 42, y: 115, anchor: 'end' },
  2: { x: 42, y: 205, anchor: 'end' },
  3: { x: 110, y: 63, anchor: 'middle' },
  4: { x: 104, y: 110, anchor: 'middle' },
  5: { x: 110, y: 152, anchor: 'middle' },
  6: { x: 103, y: 200, anchor: 'middle' },
  7: { x: 162, y: 117, anchor: 'end' },
  8: { x: 230, y: 63, anchor: 'middle' },
  9: { x: 236, y: 110, anchor: 'start' },
  10: { x: 230, y: 152, anchor: 'middle' },
  11: { x: 298, y: 117, anchor: 'start' },
  12: { x: 350, y: 63, anchor: 'middle' },
  13: { x: 356, y: 110, anchor: 'start' },
}

const NODE_LABELS: Record<NodeName, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  A: { x: 40, y: 266, anchor: 'end' },
  M0: { x: 42, y: 164, anchor: 'end' },
  T0: { x: 42, y: 74, anchor: 'end' },
  M1: { x: 170, y: 176, anchor: 'middle' },
  T1: { x: 170, y: 60, anchor: 'middle' },
  M2: { x: 290, y: 176, anchor: 'middle' },
  T2: { x: 290, y: 60, anchor: 'middle' },
  T3: { x: 410, y: 60, anchor: 'middle' },
}

const NOTES = [
  'Model: dwa poziomy pasa T0–T3 i M0–M2, dolny węzeł A oraz podpora B w M2',
  'Reakcje: A_x = −3,000 kN, A_y = −1,250 kN, B_y = 13,250 kN',
  'Pręt zerowy N1 = 0; z węzła T0: N3 = −3,000 kN',
  'Węzły M0 i A: N2 = −1,000, N4 = −1,667, N5 = +1,333, N6 = +3,750 kN',
  'Węzły T1 i M1: N7 = −6,000, N8 = −4,333, N9 = +13,750 kN',
  'Węzły T2, M2 i T3: N10 = −6,667, N11 = −8,250, N12 = +6,667, N13 = −8,333 kN',
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

function arc(cx: number, cy: number, radius: number, from: number, to: number) {
  const a = (from * Math.PI) / 180
  const b = (to * Math.PI) / 180
  return `M ${cx + radius * Math.cos(a)} ${cy + radius * Math.sin(a)} A ${radius} ${radius} 0 0 1 ${cx + radius * Math.cos(b)} ${cy + radius * Math.sin(b)}`
}

export function D06TrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.35 + sceneProgress * 1.9) : 1
  const statusOf = (member: (typeof MEMBERS)[number]): Status => {
    if (index < member.stage) return 'idle'
    const force = FORCES[member.id]
    return force > 0.005 ? 'tension' : force < -0.005 ? 'compression' : 'zero'
  }
  const showReactions = index >= 1
  const showValues = index >= 2
  const activeNode: NodeName | null =
    index === 2 ? 'T0' : index === 3 ? 'M0' : index === 4 ? 'T1' : index === 5 ? 'M2' : null

  return (
    <SchematicFrame
      label="Kratownica nr 6 z dwoma poziomami pasa i podporą B w węźle M2"
      desc="Osiem węzłów, trzynaście prętów, przegub A na gruncie, pionowa podpora B na występnie oraz obciążenia P1, P2 i P3."
    >
      <defs>
        <marker id="d06-load" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.2" markerHeight="6.2" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={LOAD} />
        </marker>
        <marker id="d06-react" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.2" markerHeight="6.2" orient="auto">
          <path d="M0 0L10 5L0 10Z" fill={REACTION} />
        </marker>
      </defs>

      <Label x={230} y={15} size={10} anchor="middle" color={MUTED}>
        {NOTES[index] ?? NOTES[NOTES.length - 1]}
      </Label>

      {index === 0 && (
        <g stroke={AXIS} strokeWidth={1.1} fill={MUTED}>
          <line x1={NODES.T0.x} y1={274} x2={NODES.T3.x} y2={274} strokeDasharray="4 4" />
          {[NODES.T0.x, NODES.T1.x, NODES.T2.x, NODES.T3.x].map((x) => (
            <line key={x} x1={x} y1={269} x2={x} y2={279} stroke={AXIS} />
          ))}
          <text x={(NODES.T0.x + NODES.T1.x) / 2} y={288} textAnchor="middle" fontSize={7.5} stroke="none">
            a = 4,0 m
          </text>
          <text x={(NODES.T1.x + NODES.T2.x) / 2} y={288} textAnchor="middle" fontSize={7.5} stroke="none">
            a = 4,0 m
          </text>
          <text x={(NODES.T2.x + NODES.T3.x) / 2} y={288} textAnchor="middle" fontSize={7.5} stroke="none">
            a = 4,0 m
          </text>
          <line x1={30} y1={NODES.A.y} x2={30} y2={NODES.T0.y} strokeDasharray="4 4" />
          {[NODES.A.y, NODES.M0.y, NODES.T0.y].map((y) => (
            <line key={y} x1={25} y1={y} x2={35} y2={y} stroke={AXIS} />
          ))}
          <text transform="rotate(-90 22 205)" x={22} y={205} textAnchor="middle" fontSize={7.5} stroke="none">
            h = 3,0 m
          </text>
          <text transform="rotate(-90 22 115)" x={22} y={115} textAnchor="middle" fontSize={7.5} stroke="none">
            h = 3,0 m
          </text>
          <path d={arc(NODES.A.x, NODES.A.y, 26, -36.87, 0)} fill="none" />
          <text x={NODES.A.x + 44} y={NODES.A.y + 12} fontSize={8} stroke="none">
            36,9°
          </text>
        </g>
      )}

      {MEMBERS.map((member) => (
        <Member key={member.id} member={member} status={statusOf(member)} index={index} />
      ))}

      <PinSupport x={NODES.A.x} y={NODES.A.y} />
      <RollerSupport x={NODES.M2.x} y={NODES.M2.y + 2} />
      <line x1={NODES.M2.x} y1={NODES.M2.y} x2={NODES.M2.x} y2={NODES.M2.y + 2} stroke={STEEL} strokeWidth={2} />
      <Label x={NODES.M2.x + 14} y={NODES.M2.y + 26} size={9.5} color={INK}>
        B
      </Label>

      {showReactions && (
        <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
          <Arrow
            from={{ x: NODES.A.x - 4, y: NODES.A.y }}
            to={{ x: NODES.A.x - 40, y: NODES.A.y }}
            color={REACTION}
            width={2.6}
          />
          <Label x={NODES.A.x - 44} y={NODES.A.y - 6} size={8.5} anchor="end" color={REACTION}>
            A_x = −3,000
          </Label>
          <Arrow
            from={{ x: NODES.A.x + 16, y: NODES.A.y }}
            to={{ x: NODES.A.x + 16, y: NODES.A.y + 38 }}
            color={REACTION}
            width={2.6}
          />
          <Label x={NODES.A.x + 20} y={NODES.A.y + 42} size={8.5} color={REACTION}>
            A_y = −1,250
          </Label>
          <Arrow
            from={{ x: NODES.M2.x - 16, y: NODES.M2.y }}
            to={{ x: NODES.M2.x - 16, y: NODES.M2.y - 44 }}
            color={REACTION}
            width={2.6}
          />
          <Label x={NODES.M2.x + 42} y={NODES.M2.y - 18} size={8.5} color={REACTION}>
            B_y = 13,250
          </Label>
        </motion.g>
      )}

      <motion.g
        initial={false}
        animate={{ opacity: [1, 0.72, 1] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      >
        <line
          x1={NODES.T0.x + 8}
          y1={NODES.T0.y - 12}
          x2={NODES.T0.x + 44}
          y2={NODES.T0.y - 12}
          stroke={LOAD}
          strokeWidth={3}
          markerEnd="url(#d06-load)"
        />
        <line x1={NODES.T0.x} y1={NODES.T0.y} x2={NODES.T0.x + 8} y2={NODES.T0.y - 12} stroke={LOAD} strokeWidth={2} />
        <line
          x1={NODES.T1.x + 10}
          y1={NODES.T1.y}
          x2={NODES.T1.x + 10}
          y2={NODES.T1.y + 36}
          stroke={LOAD}
          strokeWidth={3}
          markerEnd="url(#d06-load)"
        />
        <line x1={NODES.T1.x} y1={NODES.T1.y} x2={NODES.T1.x + 10} y2={NODES.T1.y} stroke={LOAD} strokeWidth={2} />
        <line
          x1={NODES.T3.x}
          y1={NODES.T3.y + 4}
          x2={NODES.T3.x}
          y2={NODES.T3.y + 38}
          stroke={LOAD}
          strokeWidth={3}
          markerEnd="url(#d06-load)"
        />
      </motion.g>

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
        <text x={NODES.T0.x + 18} y={NODES.T0.y - 20}>
          P₁=3 kN
        </text>
        <text x={NODES.T1.x + 16} y={NODES.T1.y + 44}>
          P₂=7 kN
        </text>
        <text x={NODES.T3.x - 4} y={NODES.T3.y + 56} textAnchor="end">
          P₃=5 kN
        </text>
      </g>

      <g fontSize={8.3} fill={MUTED}>
        <rect x={58} y={326} width={14} height={3} rx={1.5} fill={TENSION} />
        <text x={76} y={331}>
          rozciąganie
        </text>
        <rect x={150} y={326} width={14} height={3} rx={1.5} fill={COMPRESSION} />
        <text x={168} y={331}>
          ściskanie
        </text>
        <line x1={238} y1={328} x2={252} y2={328} stroke={ZERO} strokeWidth={2.4} strokeDasharray="6 4" />
        <text x={256} y={331}>
          zero
        </text>
      </g>
    </SchematicFrame>
  )
}
