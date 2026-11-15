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
type NodeName = 'A' | 'B' | 'T1' | 'T2' | 'T3' | 'C1' | 'C2' | 'C3'

const NODES: Record<NodeName, { x: number; y: number }> = {
  A: { x: 55, y: 85 },
  B: { x: 55, y: 295 },
  T1: { x: 175, y: 85 },
  T2: { x: 295, y: 85 },
  T3: { x: 415, y: 85 },
  C1: { x: 175, y: 295 },
  C2: { x: 295, y: 295 },
  C3: { x: 415, y: 295 },
}

const MEMBERS: Array<{ id: number; from: NodeName; to: NodeName; stage: number }> = [
  { id: 1, from: 'A', to: 'T1', stage: 3 },
  { id: 2, from: 'A', to: 'C1', stage: 3 },
  { id: 3, from: 'B', to: 'C1', stage: 4 },
  { id: 4, from: 'T1', to: 'C1', stage: 4 },
  { id: 5, from: 'T1', to: 'T2', stage: 5 },
  { id: 6, from: 'T1', to: 'C2', stage: 5 },
  { id: 7, from: 'C1', to: 'C2', stage: 4 },
  { id: 8, from: 'T2', to: 'C2', stage: 5 },
  { id: 9, from: 'T2', to: 'T3', stage: 2 },
  { id: 10, from: 'T2', to: 'C3', stage: 2 },
  { id: 11, from: 'C2', to: 'C3', stage: 2 },
  { id: 12, from: 'T3', to: 'C3', stage: 2 },
]

const FORCES: Record<number, number> = {
  1: 1.7320508075688772,
  2: 15.01105163963819,
  3: -5.238190721731133,
  4: -13,
  5: 0,
  6: 3.4641016151377544,
  7: 2.2679491924311224,
  8: -3,
  9: 0,
  10: 0,
  11: 4,
  12: 0,
}

const LABELS: Record<number, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  1: { x: 115, y: 75, anchor: 'middle' },
  2: { x: 100, y: 183, anchor: 'end' },
  3: { x: 135, y: 285, anchor: 'middle' },
  4: { x: 185, y: 190, anchor: 'start' },
  5: { x: 235, y: 75, anchor: 'middle' },
  6: { x: 228, y: 173, anchor: 'end' },
  7: { x: 235, y: 285, anchor: 'middle' },
  8: { x: 305, y: 190, anchor: 'start' },
  9: { x: 355, y: 75, anchor: 'middle' },
  10: { x: 368, y: 183, anchor: 'start' },
  11: { x: 355, y: 285, anchor: 'middle' },
  12: { x: 407, y: 225, anchor: 'end' },
}

const NODE_LABELS: Record<NodeName, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  A: { x: 44, y: 78, anchor: 'end' },
  B: { x: 44, y: 305, anchor: 'end' },
  T1: { x: 175, y: 75, anchor: 'middle' },
  T2: { x: 295, y: 75, anchor: 'middle' },
  T3: { x: 415, y: 75, anchor: 'middle' },
  C1: { x: 175, y: 307, anchor: 'middle' },
  C2: { x: 295, y: 307, anchor: 'middle' },
  C3: { x: 415, y: 307, anchor: 'middle' },
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

function WallSupports() {
  return (
    <g stroke="#68727e" strokeWidth={1.6} fill="none" strokeLinejoin="round">
      <line x1={40} y1={58} x2={40} y2={310} />
      {Array.from({ length: 17 }, (_, index) => (
        <line key={index} x1={40} y1={64 + index * 14} x2={30} y2={70 + index * 14} strokeWidth={1.05} />
      ))}
      <path d="M 40 75 L 55 85 L 40 95 Z" />
      <circle cx={55} cy={85} r={3} fill="#68727e" stroke="none" />
      <path d="M 40 285 L 55 295 L 40 305 Z" />
      <circle cx={55} cy={295} r={3} fill="#68727e" stroke="none" />
    </g>
  )
}

export function D02TrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.35 + sceneProgress * 1.9) : 1
  const statusOf = (member: (typeof MEMBERS)[number]): Status => {
    if (index < member.stage) return 'idle'
    const force = FORCES[member.id]
    return force > 0.005 ? 'tension' : force < -0.005 ? 'compression' : 'zero'
  }
  const activeNode: NodeName | null =
    index === 2 ? 'T3' : index === 3 ? 'A' : index === 4 ? 'C1' : index === 5 ? 'T1' : index === 6 ? 'T2' : null
  const showReactions = index >= 1
  const showValues = index >= 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Kratownica nr 2 z trzema panelami i pasami równoległymi">
          <title>Kratownica nr 2 — trzy panele, pasy równoległe</title>
          <desc>Osiem węzłów, dwanaście prętów, podpory A i B na ścianie oraz obciążenia P1, P2 i P3.</desc>
          <defs>
            <marker
              id="d02-load"
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
              id="d02-react"
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

          <WallSupports />

          {index === 0 && (
            <g stroke={AXIS} strokeWidth={1.1} fill="none">
              <line x1={55} y1={308} x2={415} y2={308} strokeDasharray="4 4" />
              {[55, 175, 295, 415].map((x) => (
                <line key={x} x1={x} y1={303} x2={x} y2={313} />
              ))}
              <line x1={438} y1={85} x2={438} y2={295} strokeDasharray="4 4" />
              <line x1={433} y1={85} x2={443} y2={85} />
              <line x1={433} y1={295} x2={443} y2={295} />
              <path d="M 390 295 A 25 25 0 0 0 402 271" />
            </g>
          )}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line x1={50} y1={85} x2={16} y2={85} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d02-react)" />
              <line x1={55} y1={80} x2={55} y2={45} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d02-react)" />
              <line
                x1={60}
                y1={302}
                x2={105}
                y2={302}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d02-react)"
              />
            </motion.g>
          )}

          <motion.g
            initial={false}
            animate={{ opacity: [1, 0.65, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <line x1={175} y1={80} x2={175} y2={43} stroke={LOAD} strokeWidth={3} markerEnd="url(#d02-load)" />
            <line x1={295} y1={80} x2={295} y2={43} stroke={LOAD} strokeWidth={3} markerEnd="url(#d02-load)" />
            <line x1={420} y1={295} x2={452} y2={295} stroke={LOAD} strokeWidth={3} markerEnd="url(#d02-load)" />
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
            <text x={168} y={38} textAnchor="end">
              P₁=10 kN
            </text>
            <text x={288} y={38} textAnchor="end">
              P₂=3 kN
            </text>
            <text x={436} y={286} textAnchor="middle">
              P₃=4 kN
            </text>
          </g>

          {showReactions && (
            <g fontSize={9} fill={REACTION} fontWeight={600}>
              <text x={18} y={64}>
                A_x=9,24 kN
              </text>
              <text x={60} y={38}>
                A_y=13,00 kN
              </text>
              <text x={80} y={291} textAnchor="middle">
                B_x=5,24 kN
              </text>
            </g>
          )}

          {index === 0 && (
            <g fontSize={9} fill={MUTED}>
              <text x={115} y={318} textAnchor="middle">
                a=2,5 m
              </text>
              <text x={235} y={318} textAnchor="middle">
                a=2,5 m
              </text>
              <text x={355} y={318} textAnchor="middle">
                a=2,5 m
              </text>
              <text x={432} y={135} textAnchor="end">
                h=4,330 m
              </text>
              <text x={396} y={270} textAnchor="middle">
                60°
              </text>
            </g>
          )}

          <text x={230} y={23} textAnchor="middle" fontSize={11.2} fill={INK} fontWeight={600}>
            {index === 0 && 'Model: trzy panele, pasy równoległe, 8 węzłów'}
            {index === 1 && 'Reakcje: A_x w lewo, A_y w górę, B_x w prawo'}
            {index === 2 && 'T3 i C3: pręty 9, 10, 12 zerowe, N11=+4,00'}
            {index === 3 && 'Węzeł A: N1=+1,73 i N2=+15,01 kN'}
            {index === 4 && 'B i C1: N3=−5,24, N4=−13,00, N7=+2,27'}
            {index === 5 && 'T1 i T2: N5=0, N6=+3,46, N8=−3,00'}
            {index === 6 && 'Tabela sił: cztery pręty zerowe'}
            {index >= 7 && 'Interpretacja znaków i kontrola bilansu'}
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
