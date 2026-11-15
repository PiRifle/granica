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
type NodeName = 'A' | 'M0' | 'T0' | 'M1' | 'T1' | 'M2' | 'T2' | 'B'

const NODES: Record<NodeName, { x: number; y: number }> = {
  A: { x: 65, y: 280 },
  M0: { x: 65, y: 180 },
  T0: { x: 65, y: 80 },
  M1: { x: 230, y: 180 },
  T1: { x: 230, y: 80 },
  M2: { x: 395, y: 180 },
  T2: { x: 395, y: 80 },
  B: { x: 230, y: 280 },
}

const MEMBERS: Array<{ id: number; from: NodeName; to: NodeName; stage: number }> = [
  { id: 1, from: 'T0', to: 'M0', stage: 5 },
  { id: 2, from: 'M0', to: 'A', stage: 6 },
  { id: 3, from: 'T0', to: 'T1', stage: 3 },
  { id: 4, from: 'T0', to: 'M1', stage: 5 },
  { id: 5, from: 'M0', to: 'M1', stage: 4 },
  { id: 6, from: 'M0', to: 'B', stage: 6 },
  { id: 7, from: 'T1', to: 'M1', stage: 3 },
  { id: 8, from: 'M1', to: 'B', stage: 4 },
  { id: 9, from: 'T1', to: 'T2', stage: 2 },
  { id: 10, from: 'T1', to: 'M2', stage: 2 },
  { id: 11, from: 'M1', to: 'M2', stage: 3 },
  { id: 12, from: 'T2', to: 'M2', stage: 2 },
]

const FORCES: Record<number, number> = {
  1: 7.25,
  2: 12.5,
  3: 6.667,
  4: -12.083,
  5: 3,
  6: -8.75,
  7: -5,
  8: -12.25,
  9: 0,
  10: 8.333,
  11: -6.667,
  12: -5,
}

const LABELS: Record<number, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  1: { x: 59, y: 130, anchor: 'end' },
  2: { x: 59, y: 230, anchor: 'end' },
  3: { x: 190, y: 68, anchor: 'middle' },
  4: { x: 160, y: 108, anchor: 'middle' },
  5: { x: 147, y: 166, anchor: 'middle' },
  6: { x: 175, y: 232, anchor: 'start' },
  7: { x: 236, y: 128, anchor: 'start' },
  8: { x: 236, y: 228, anchor: 'start' },
  9: { x: 312, y: 68, anchor: 'middle' },
  10: { x: 325, y: 108, anchor: 'middle' },
  11: { x: 312, y: 194, anchor: 'middle' },
  12: { x: 401, y: 110, anchor: 'start' },
}

const NODE_LABELS: Record<NodeName, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  A: { x: 58, y: 270, anchor: 'end' },
  M0: { x: 58, y: 170, anchor: 'end' },
  T0: { x: 58, y: 70, anchor: 'end' },
  M1: { x: 230, y: 170, anchor: 'middle' },
  T1: { x: 230, y: 70, anchor: 'middle' },
  M2: { x: 386, y: 166, anchor: 'end' },
  T2: { x: 410, y: 68, anchor: 'start' },
  B: { x: 220, y: 262, anchor: 'end' },
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
      <path d="M 51 297 L 79 297 L 65 280 Z" />
      <line x1={47} y1={297} x2={83} y2={297} />
      {Array.from({ length: 5 }, (_, index) => (
        <line key={`a-${index}`} x1={49 + index * 7} y1={298} x2={42 + index * 7} y2={305} strokeWidth={1.05} />
      ))}
      <path d="M 216 297 L 244 297 L 230 280 Z" />
      <line x1={212} y1={297} x2={248} y2={297} />
      {Array.from({ length: 5 }, (_, index) => (
        <line key={`b-${index}`} x1={214 + index * 7} y1={298} x2={207 + index * 7} y2={305} strokeWidth={1.05} />
      ))}
    </g>
  )
}

export function D10TrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.35 + sceneProgress * 1.9) : 1
  const statusOf = (member: (typeof MEMBERS)[number]): Status => {
    if (index < member.stage) return 'idle'
    const force = FORCES[member.id]
    return force > 0.005 ? 'tension' : force < -0.005 ? 'compression' : 'zero'
  }
  const activeNode: NodeName | null =
    index === 2 ? 'T2' : index === 3 ? 'T1' : index === 4 ? 'M1' : index === 5 ? 'T0' : index === 6 ? 'M0' : null
  const showReactions = index >= 1
  const showValues = index >= 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Dwukondygnacyjna kratownica nr 10 z wysięgnikiem">
          <title>Kratownica nr 10 — dwie kondygnacje i wysięgnik M2–T2</title>
          <desc>Osiem węzłów, dwanaście prętów, przeguby A i B na gruncie oraz obciążenia P1, P2, P3.</desc>
          <defs>
            <marker
              id="d10-load"
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
              id="d10-react"
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
              <line x1={65} y1={55} x2={230} y2={55} strokeDasharray="4 4" />
              <line x1={65} y1={50} x2={65} y2={60} />
              <line x1={230} y1={50} x2={230} y2={60} />
              <line x1={230} y1={55} x2={395} y2={55} strokeDasharray="4 4" />
              <line x1={395} y1={50} x2={395} y2={60} />
              <line x1={430} y1={180} x2={430} y2={280} strokeDasharray="4 4" />
              <line x1={425} y1={180} x2={435} y2={180} />
              <line x1={425} y1={280} x2={435} y2={280} />
            </g>
          )}
          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line x1={65} y1={284} x2={65} y2={318} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d10-react)" />
              <line
                x1={226}
                y1={280}
                x2={190}
                y2={280}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d10-react)"
              />
              <line
                x1={230}
                y1={276}
                x2={230}
                y2={240}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d10-react)"
              />
            </motion.g>
          )}
          <motion.g
            initial={false}
            animate={{ opacity: [1, 0.65, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <line x1={69} y1={80} x2={112} y2={80} stroke={LOAD} strokeWidth={3} markerEnd="url(#d10-load)" />
            <line x1={69} y1={180} x2={112} y2={180} stroke={LOAD} strokeWidth={3} markerEnd="url(#d10-load)" />
            <line x1={395} y1={40} x2={395} y2={75} stroke={LOAD} strokeWidth={3} markerEnd="url(#d10-load)" />
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
            <text x={114} y={70}>
              P₁=3 kN
            </text>
            <text x={114} y={200}>
              P₂=4 kN
            </text>
            <text x={387} y={42} textAnchor="end">
              P₃=5 kN
            </text>
          </g>
          {showReactions && (
            <g fontSize={9} fill={REACTION} fontWeight={600}>
              <text x={50} y={316} textAnchor="end">
                A_y=−12,50
              </text>
              <text x={188} y={272} textAnchor="end">
                B_x=−7,00
              </text>
              <text x={236} y={244}>
                B_y=17,50
              </text>
            </g>
          )}
          {index === 0 && (
            <g fontSize={9} fill={MUTED}>
              <text x={147} y={48} textAnchor="middle">
                a=4,4 m
              </text>
              <text x={312} y={48} textAnchor="middle">
                a=4,4 m
              </text>
              <text x={428} y={235} textAnchor="end">
                h=3,3 m
              </text>
            </g>
          )}
          <text x={230} y={22} textAnchor="middle" fontSize={11.2} fill={INK} fontWeight={600}>
            {index === 0 && 'Model: dwie kondygnacje, wysięgnik M2–T2, 12 prętów'}
            {index === 1 && 'Reakcje: A_y w dół, B_x w lewo, B_y w górę, A_x=0'}
            {index === 2 && 'T2 i M2: N9=0, N12=−5,00, N10=+8,33, N11=−6,67'}
            {index === 3 && 'Węzeł T1: N3=+6,67, N7=−5,00 i N9=0'}
            {index === 4 && 'Węzeł M1: N4=−12,08, N5=+3,00, N8=−12,25'}
            {index === 5 && 'Węzeł T0: N1=+7,25 i N4=−12,08 kN'}
            {index === 6 && 'Węzeł M0: N2=+12,50 i N6=−8,75 kN'}
            {index >= 7 && 'Pręt 9 zerowy; kontrola bilansu reakcji A i B'}
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
