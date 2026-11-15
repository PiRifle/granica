import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../../types'
import { local } from '../../../../components/solution-figures/shared'

const TENSION = '#2f7d5b'
const COMPRESSION = '#d84f28'
const ZERO = '#a970dd'
const STEEL = '#68727e'
const LOAD = '#ff6b45'
const REACTION = '#4f6df5'
const INK = '#17202a'
const MUTED = '#87929d'
const AXIS = '#c3ccd7'

type Status = 'idle' | 'tension' | 'compression' | 'zero'
type NodeName = 'A' | 'L0' | 'L1' | 'L2' | 'L3' | 'T0' | 'T1' | 'T2'

const NODES: Record<NodeName, { x: number; y: number }> = {
  A: { x: 180, y: 70 },
  L0: { x: 70, y: 280 },
  L1: { x: 180, y: 280 },
  L2: { x: 290, y: 280 },
  L3: { x: 400, y: 280 },
  T0: { x: 125, y: 175 },
  T1: { x: 235, y: 175 },
  T2: { x: 345, y: 175 },
}

const MEMBERS: Array<{ id: number; from: NodeName; to: NodeName; stage: number }> = [
  { id: 1, from: 'A', to: 'T1', stage: 2 },
  { id: 2, from: 'L0', to: 'T0', stage: 2 },
  { id: 3, from: 'L0', to: 'L1', stage: 2 },
  { id: 4, from: 'T0', to: 'L1', stage: 3 },
  { id: 5, from: 'T0', to: 'T1', stage: 3 },
  { id: 6, from: 'L1', to: 'T1', stage: 4 },
  { id: 7, from: 'L1', to: 'L2', stage: 4 },
  { id: 8, from: 'T1', to: 'L2', stage: 5 },
  { id: 9, from: 'T1', to: 'T2', stage: 5 },
  { id: 10, from: 'L2', to: 'T2', stage: 6 },
  { id: 11, from: 'T2', to: 'L3', stage: 6 },
  { id: 12, from: 'L2', to: 'L3', stage: 6 },
]

const FORCES: Record<number, number> = {
  1: 24.713,
  2: 4.619,
  3: -2.309,
  4: -4.619,
  5: 4.619,
  6: 11.547,
  7: -10.392,
  8: 13.166,
  9: 16.166,
  10: -13.166,
  11: 13.166,
  12: 2.774,
}

const LABELS: Record<number, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  1: { x: 229, y: 108, anchor: 'middle' },
  2: { x: 76, y: 214, anchor: 'middle' },
  3: { x: 125, y: 260, anchor: 'middle' },
  4: { x: 163, y: 196, anchor: 'middle' },
  5: { x: 180, y: 159, anchor: 'middle' },
  6: { x: 186, y: 216, anchor: 'middle' },
  7: { x: 235, y: 262, anchor: 'middle' },
  8: { x: 292, y: 196, anchor: 'middle' },
  9: { x: 290, y: 159, anchor: 'middle' },
  10: { x: 296, y: 216, anchor: 'middle' },
  11: { x: 394, y: 216, anchor: 'middle' },
  12: { x: 345, y: 296, anchor: 'middle' },
}

const NODE_LABELS: Record<NodeName, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  A: { x: 170, y: 62, anchor: 'end' },
  L0: { x: 62, y: 268, anchor: 'end' },
  L1: { x: 186, y: 296, anchor: 'start' },
  L2: { x: 283, y: 298, anchor: 'end' },
  L3: { x: 392, y: 268, anchor: 'end' },
  T0: { x: 125, y: 164, anchor: 'middle' },
  T1: { x: 235, y: 164, anchor: 'middle' },
  T2: { x: 345, y: 164, anchor: 'middle' },
}

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
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="5 13"
          initial={false}
          animate={{ strokeDashoffset: [0, -36] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
          opacity={0.85}
        />
      )}
    </g>
  )
}

function Supports() {
  return (
    <g stroke="#68727e" strokeWidth={1.7} fill="none" strokeLinejoin="round">
      <line x1={160} y1={44} x2={200} y2={44} />
      {Array.from({ length: 6 }, (_, index) => (
        <line key={index} x1={162 + index * 7} y1={44} x2={155 + index * 7} y2={35} strokeWidth={1.05} />
      ))}
      <line x1={180} y1={44} x2={180} y2={66} />
      <circle cx={180} cy={70} r={3} fill="#68727e" stroke="none" />
      <path d="M 386 298 L 414 298 L 400 280 Z" />
      <line x1={382} y1={298} x2={418} y2={298} />
      {Array.from({ length: 5 }, (_, index) => (
        <line key={index} x1={384 + index * 7} y1={299} x2={377 + index * 7} y2={306} strokeWidth={1.05} />
      ))}
    </g>
  )
}

export function D07TrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.35 + sceneProgress * 1.9) : 1
  const statusOf = (member: (typeof MEMBERS)[number]): Status => {
    if (index < member.stage) return 'idle'
    const force = FORCES[member.id]
    return force > 0.005 ? 'tension' : force < -0.005 ? 'compression' : 'zero'
  }
  const activeNode: NodeName | null =
    index === 2 ? 'A' : index === 3 ? 'T0' : index === 4 ? 'L1' : index === 5 ? 'T1' : index === 6 ? 'T2' : null
  const showReactions = index >= 1
  const showValues = index >= 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Kratownica Warrena nr 7 zawieszona w węźle A">
          <title>Kratownica nr 7 — wieszak A–T1 i pas dolny L0–L3</title>
          <desc>Osiem węzłów, dwanaście prętów, przegub A u góry, podpora B w węźle L3 i obciążenia P1, P2, P3.</desc>
          <defs>
            <marker
              id="d07-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6.5"
              markerHeight="6.5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="d07-react"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6.5"
              markerHeight="6.5"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
          </defs>
          {MEMBERS.map((member) => (
            <Member key={member.id} member={member} status={statusOf(member)} index={index} />
          ))}
          <Supports />
          {index === 0 && (
            <g stroke={AXIS} strokeWidth={1.1} fill="none">
              <line x1={NODES.L0.x} y1={306} x2={NODES.L3.x} y2={306} strokeDasharray="4 4" />
              {[NODES.L0.x, NODES.L1.x, NODES.L2.x, NODES.L3.x].map((x) => (
                <line key={x} x1={x} y1={301} x2={x} y2={311} />
              ))}
              <line x1={430} y1={NODES.T2.y} x2={430} y2={NODES.L3.y} strokeDasharray="4 4" />
              <line x1={425} y1={NODES.T2.y} x2={435} y2={NODES.T2.y} />
              <line x1={425} y1={NODES.L3.y} x2={435} y2={NODES.L3.y} />
              <path d="M 255 175 A 20 20 0 0 1 235 195" />
            </g>
          )}
          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line x1={176} y1={70} x2={140} y2={70} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d07-react)" />
              <line x1={200} y1={70} x2={200} y2={48} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d07-react)" />
              <line
                x1={404}
                y1={280}
                x2={442}
                y2={280}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d07-react)"
              />
              <line
                x1={400}
                y1={284}
                x2={400}
                y2={316}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d07-react)"
              />
            </motion.g>
          )}
          <motion.g
            initial={false}
            animate={{ opacity: [1, 0.65, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <line x1={70} y1={318} x2={70} y2={285} stroke={LOAD} strokeWidth={3} markerEnd="url(#d07-load)" />
            <line x1={180} y1={318} x2={180} y2={285} stroke={LOAD} strokeWidth={3} markerEnd="url(#d07-load)" />
            <line x1={349} y1={175} x2={385} y2={175} stroke={LOAD} strokeWidth={3} markerEnd="url(#d07-load)" />
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
            <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r={4.4} fill={INK} />
          ))}
          <g fontSize={10.5} fontWeight={600} fill={INK}>
            {(Object.keys(NODE_LABELS) as NodeName[]).map((name) => {
              const label = NODE_LABELS[name]
              return (
                <text key={name} x={label.x} y={label.y} textAnchor={label.anchor}>
                  {name}
                </text>
              )
            })}
          </g>
          <g fontSize={8.4} fontWeight={600}>
            {MEMBERS.map((member) => {
              const label = LABELS[member.id]
              const status = statusOf(member)
              return (
                <text
                  key={member.id}
                  x={label.x}
                  y={label.y}
                  textAnchor={label.anchor}
                  fill={showValues && index >= member.stage ? colorFor(status) : MUTED}
                  stroke="#ffffff"
                  strokeWidth={2.4}
                  paintOrder="stroke"
                >
                  {showValues && index >= member.stage ? `N${member.id}=${format(FORCES[member.id])}` : member.id}
                </text>
              )
            })}
          </g>
          <g fontSize={9} fill={LOAD} fontWeight={600}>
            <text x={64} y={298} textAnchor="end">
              P₁=4 kN
            </text>
            <text x={174} y={298} textAnchor="end">
              P₂=6 kN
            </text>
            <text x={387} y={170}>
              P₃=3 kN
            </text>
          </g>
          {showReactions && (
            <g fontSize={9} fill={REACTION} fontWeight={600}>
              <text x={138} y={66} textAnchor="end">
                A_x=−12,36
              </text>
              <text x={204} y={52}>
                A_y=21,40
              </text>
              <text x={444} y={276} textAnchor="end">
                B_x=9,36
              </text>
              <text x={404} y={314}>
                B_y=−11,40
              </text>
            </g>
          )}
          {index === 0 && (
            <g fontSize={9} fill={MUTED}>
              <text x={125} y={316} textAnchor="middle">
                a=4 m
              </text>
              <text x={235} y={316} textAnchor="middle">
                a=4 m
              </text>
              <text x={345} y={316} textAnchor="middle">
                a=4 m
              </text>
              <text x={428} y={232} textAnchor="end">
                h=3,46 m
              </text>
              <text x={252} y={196}>
                60°
              </text>
            </g>
          )}
          <text x={230} y={22} textAnchor="middle" fontSize={11.2} fill={INK} fontWeight={600}>
            {index === 0 && 'Model: wieszak A–T1, pas dolny L0–L3, 12 prętów'}
            {index === 1 && 'Reakcje: A_x w lewo, A_y w górę, B_x w prawo, B_y w dół'}
            {index === 2 && 'Węzeł A i L0: N1=+24,71, N2=+4,62, N3=−2,31 kN'}
            {index === 3 && 'Węzeł T0: N4=−4,62 i N5=+4,62 kN'}
            {index === 4 && 'Węzeł L1: N6=+11,55 i N7=−10,39 kN'}
            {index === 5 && 'Węzeł T1: N8=+13,17 i N9=+16,17 kN'}
            {index === 6 && 'T2, L2 i L3: N10=−13,17, N11=+13,17, N12=+2,77'}
            {index >= 7 && 'Znaki sił: 8 prętów rozciąganych, 4 ściskane, brak zerowych'}
          </text>
          <g fontSize={8.8} fill={MUTED}>
            <rect x={54} y={326} width={14} height={3} rx={1.5} fill={TENSION} />
            <text x={72} y={331}>
              rozciąganie
            </text>
            <rect x={146} y={326} width={14} height={3} rx={1.5} fill={COMPRESSION} />
            <text x={164} y={331}>
              ściskanie
            </text>
            <line x1={232} y1={328} x2={246} y2={328} stroke={ZERO} strokeWidth={2.4} strokeDasharray="6 4" />
            <text x={250} y={331}>
              zero
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
