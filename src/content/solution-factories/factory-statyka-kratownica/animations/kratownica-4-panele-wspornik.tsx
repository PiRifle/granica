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
type NodeName = 'A' | 'C0' | 'C1' | 'C2' | 'C3' | 'B' | 'T1' | 'T2' | 'T3'

const NODES: Record<NodeName, { x: number; y: number }> = {
  A: { x: 55, y: 63 },
  C0: { x: 55, y: 267 },
  C1: { x: 143, y: 267 },
  C2: { x: 231, y: 267 },
  C3: { x: 319, y: 267 },
  B: { x: 407, y: 267 },
  T1: { x: 143, y: 165 },
  T2: { x: 231, y: 165 },
  T3: { x: 319, y: 165 },
}

const MEMBERS: Array<{ id: number; from: NodeName; to: NodeName; stage: number }> = [
  { id: 1, from: 'A', to: 'C0', stage: 2 },
  { id: 2, from: 'C0', to: 'T1', stage: 2 },
  { id: 3, from: 'C0', to: 'C1', stage: 2 },
  { id: 4, from: 'T1', to: 'C1', stage: 3 },
  { id: 5, from: 'T1', to: 'T2', stage: 3 },
  { id: 6, from: 'C1', to: 'T2', stage: 4 },
  { id: 7, from: 'C1', to: 'C2', stage: 4 },
  { id: 8, from: 'T2', to: 'C2', stage: 5 },
  { id: 9, from: 'T2', to: 'T3', stage: 5 },
  { id: 10, from: 'T2', to: 'C3', stage: 5 },
  { id: 11, from: 'C2', to: 'C3', stage: 5 },
  { id: 12, from: 'T3', to: 'C3', stage: 6 },
  { id: 13, from: 'T3', to: 'B', stage: 6 },
  { id: 14, from: 'C3', to: 'B', stage: 6 },
]

const FORCES: Record<number, number> = {
  1: 10.335,
  2: -11.934,
  3: 5.967,
  4: 10.335,
  5: -5.967,
  6: -0.387,
  7: 6.16,
  8: 10,
  9: -0.58,
  10: -11.16,
  11: 6.16,
  12: 9.665,
  13: -11.16,
  14: 0.58,
}

const LABELS: Record<number, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  1: { x: 65, y: 160, anchor: 'start' },
  2: { x: 88, y: 209, anchor: 'end' },
  3: { x: 99, y: 256, anchor: 'middle' },
  4: { x: 153, y: 232, anchor: 'start' },
  5: { x: 187, y: 154, anchor: 'middle' },
  6: { x: 176, y: 209, anchor: 'end' },
  7: { x: 187, y: 256, anchor: 'middle' },
  8: { x: 241, y: 216, anchor: 'start' },
  9: { x: 275, y: 154, anchor: 'middle' },
  10: { x: 286, y: 230, anchor: 'start' },
  11: { x: 275, y: 256, anchor: 'middle' },
  12: { x: 329, y: 216, anchor: 'start' },
  13: { x: 374, y: 230, anchor: 'start' },
  14: { x: 363, y: 256, anchor: 'middle' },
}

const NODE_LABELS: Record<NodeName, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  A: { x: 47, y: 58, anchor: 'end' },
  C0: { x: 48, y: 282, anchor: 'end' },
  C1: { x: 135, y: 258, anchor: 'end' },
  C2: { x: 231, y: 258, anchor: 'middle' },
  C3: { x: 319, y: 258, anchor: 'middle' },
  B: { x: 414, y: 282, anchor: 'start' },
  T1: { x: 143, y: 155, anchor: 'middle' },
  T2: { x: 231, y: 155, anchor: 'middle' },
  T3: { x: 319, y: 178, anchor: 'middle' },
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
      <line x1={33} y1={52} x2={77} y2={52} />
      {Array.from({ length: 7 }, (_, index) => (
        <line key={`top-${index}`} x1={36 + index * 6} y1={52} x2={29 + index * 6} y2={43} strokeWidth={1.05} />
      ))}
      <path d="M 43 52 L 55 63 L 67 52 Z" />
      <circle cx={55} cy={63} r={3} fill="#68727e" stroke="none" />
      <path d="M 393 285 L 421 285 L 407 267 Z" />
      <line x1={389} y1={285} x2={425} y2={285} />
      {Array.from({ length: 5 }, (_, index) => (
        <line key={`bottom-${index}`} x1={391 + index * 7} y1={286} x2={384 + index * 7} y2={293} strokeWidth={1.05} />
      ))}
    </g>
  )
}

export function D04TrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.35 + sceneProgress * 1.9) : 1
  const statusOf = (member: (typeof MEMBERS)[number]): Status => {
    if (index < member.stage) return 'idle'
    const force = FORCES[member.id]
    return force > 0.005 ? 'tension' : force < -0.005 ? 'compression' : 'zero'
  }
  const activeNode: NodeName | null =
    index === 2 ? 'C0' : index === 3 ? 'T1' : index === 4 ? 'C1' : index === 5 ? 'T2' : index === 6 ? 'T3' : null
  const showReactions = index >= 1
  const showValues = index >= 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 340"
          role="img"
          aria-label="Kratownica nr 4 z wysięgnikiem górnym i podporą B w prawym dolnym węźle"
        >
          <title>Kratownica nr 4 — czteropanelowy pas dolny i wysięgnik</title>
          <desc>
            Dziewięć węzłów, czternaście prętów, podpora A na stropie, podpora B na gruncie i trzy obciążenia.
          </desc>
          <defs>
            <marker
              id="d04-load"
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
              id="d04-react"
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
              <line x1={55} y1={324} x2={407} y2={324} strokeDasharray="4 4" />
              {[55, 143, 231, 319, 407].map((x) => (
                <line key={x} x1={x} y1={319} x2={x} y2={329} />
              ))}
              <line x1={428} y1={165} x2={428} y2={267} strokeDasharray="4 4" />
              <line x1={423} y1={165} x2={433} y2={165} />
              <line x1={423} y1={267} x2={433} y2={267} />
              <path d="M 384 267 A 28 28 0 0 0 407 239" />
            </g>
          )}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line x1={70} y1={58} x2={70} y2={28} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d04-react)" />
              <line
                x1={402}
                y1={300}
                x2={360}
                y2={300}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d04-react)"
              />
              <line
                x1={407}
                y1={262}
                x2={407}
                y2={225}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d04-react)"
              />
            </motion.g>
          )}

          <motion.g
            initial={false}
            animate={{ opacity: [1, 0.65, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <line x1={143} y1={272} x2={143} y2={305} stroke={LOAD} strokeWidth={3} markerEnd="url(#d04-load)" />
            <line x1={231} y1={272} x2={231} y2={305} stroke={LOAD} strokeWidth={3} markerEnd="url(#d04-load)" />
            <line x1={324} y1={165} x2={365} y2={165} stroke={LOAD} strokeWidth={3} markerEnd="url(#d04-load)" />
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

          <g fontSize={8.8} fontWeight={600}>
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
            <text x={135} y={315} textAnchor="end">
              P₂=10 kN
            </text>
            <text x={223} y={315} textAnchor="end">
              P₁=10 kN
            </text>
            <text x={345} y={155} textAnchor="middle">
              P₃=5 kN
            </text>
          </g>

          {showReactions && (
            <g fontSize={9} fill={REACTION} fontWeight={600}>
              <text x={84} y={42}>
                A_y=10,34 kN
              </text>
              <text x={350} y={296} textAnchor="end">
                B_y=9,67 kN
              </text>
              <text x={381} y={312} textAnchor="middle">
                B_x=5,00 kN
              </text>
            </g>
          )}

          {index === 0 && (
            <g fontSize={9} fill={MUTED}>
              <text x={99} y={334} textAnchor="middle">
                a=4 m
              </text>
              <text x={187} y={334} textAnchor="middle">
                a=4 m
              </text>
              <text x={275} y={334} textAnchor="middle">
                a=4 m
              </text>
              <text x={363} y={334} textAnchor="middle">
                a=4 m
              </text>
              <text x={422} y={175} textAnchor="end">
                h=6,928 m
              </text>
              <text x={396} y={244} textAnchor="middle">
                60°
              </text>
            </g>
          )}

          <text x={200} y={23} textAnchor="middle" fontSize={11.2} fill={INK} fontWeight={600}>
            {index === 0 && 'Model: cztery panele, wysięgnik i 9 węzłów'}
            {index === 1 && 'Reakcje: A_y w górę, B_x w lewo, B_y w górę'}
            {index === 2 && 'A i C0: N1=+10,34, N2=−11,93, N3=+5,97'}
            {index === 3 && 'Węzeł T1: N4=+10,34 i N5=−5,97 kN'}
            {index === 4 && 'Węzeł C1: N6=−0,39 i N7=+6,16 kN'}
            {index === 5 && 'C2 i T2: N8=+10,00, N9=−0,58, N10=−11,16, N11=+6,16'}
            {index === 6 && 'T3 i C3: N12=+9,67, N13=−11,16, N14=+0,58'}
            {index >= 7 && 'Interpretacja znaków i kontrola bilansu'}
          </text>

          <g fontSize={8.8} fill={MUTED}>
            <rect x={250} y={35} width={14} height={3} rx={1.5} fill={TENSION} />
            <text x={268} y={40}>
              rozciąganie
            </text>
            <rect x={330} y={35} width={14} height={3} rx={1.5} fill={COMPRESSION} />
            <text x={348} y={40}>
              ściskanie
            </text>
            <line x1={402} y1={37} x2={416} y2={37} stroke={ZERO} strokeWidth={2.4} strokeDasharray="6 4" />
            <text x={420} y={40}>
              zero
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
