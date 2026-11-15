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
type NodeName = 'A' | 'T0' | 'B1' | 'T1' | 'B2' | 'T2' | 'B3' | 'T3' | 'B4' | 'T4'

const NODES: Record<NodeName, { x: number; y: number }> = {
  A: { x: 55, y: 285 },
  T0: { x: 55, y: 75 },
  B1: { x: 142, y: 285 },
  T1: { x: 142, y: 75 },
  B2: { x: 230, y: 285 },
  T2: { x: 230, y: 75 },
  B3: { x: 317, y: 285 },
  T3: { x: 317, y: 75 },
  B4: { x: 405, y: 285 },
  T4: { x: 405, y: 75 },
}

const MEMBERS: Array<{ id: number; from: NodeName; to: NodeName; stage: number }> = [
  { id: 1, from: 'A', to: 'T0', stage: 3 },
  { id: 2, from: 'T0', to: 'T1', stage: 3 },
  { id: 3, from: 'A', to: 'T1', stage: 3 },
  { id: 4, from: 'A', to: 'B1', stage: 3 },
  { id: 5, from: 'B1', to: 'T1', stage: 4 },
  { id: 6, from: 'T1', to: 'T2', stage: 4 },
  { id: 7, from: 'B1', to: 'T2', stage: 4 },
  { id: 8, from: 'B1', to: 'B2', stage: 4 },
  { id: 9, from: 'B2', to: 'T2', stage: 5 },
  { id: 10, from: 'T2', to: 'T3', stage: 5 },
  { id: 11, from: 'B2', to: 'T3', stage: 5 },
  { id: 12, from: 'B2', to: 'B3', stage: 5 },
  { id: 13, from: 'B3', to: 'T3', stage: 6 },
  { id: 14, from: 'T3', to: 'T4', stage: 6 },
  { id: 15, from: 'B3', to: 'T4', stage: 6 },
  { id: 16, from: 'B3', to: 'B4', stage: 6 },
  { id: 17, from: 'B4', to: 'T4', stage: 2 },
]

const FORCES: Record<number, number> = {
  1: 0,
  2: 0,
  3: -12.279,
  4: 8.14,
  5: 10.634,
  6: -6.14,
  7: -0.732,
  8: 8.506,
  9: 0.634,
  10: -6.506,
  11: 8.506,
  12: 4.253,
  13: -7.366,
  14: -2.253,
  15: 8.506,
  16: 0,
  17: -7.366,
}

const LABELS: Record<number, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  1: { x: 49, y: 180, anchor: 'end' },
  2: { x: 98, y: 63, anchor: 'middle' },
  3: { x: 62, y: 125, anchor: 'start' },
  4: { x: 98, y: 273, anchor: 'middle' },
  5: { x: 136, y: 250, anchor: 'end' },
  6: { x: 186, y: 63, anchor: 'middle' },
  7: { x: 175, y: 230, anchor: 'start' },
  8: { x: 186, y: 273, anchor: 'middle' },
  9: { x: 224, y: 250, anchor: 'end' },
  10: { x: 273, y: 63, anchor: 'middle' },
  11: { x: 262, y: 230, anchor: 'start' },
  12: { x: 273, y: 273, anchor: 'middle' },
  13: { x: 311, y: 250, anchor: 'end' },
  14: { x: 361, y: 63, anchor: 'middle' },
  15: { x: 350, y: 230, anchor: 'start' },
  16: { x: 361, y: 273, anchor: 'middle' },
  17: { x: 411, y: 180, anchor: 'start' },
}

const NODE_LABELS: Record<NodeName, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  A: { x: 47, y: 280, anchor: 'end' },
  T0: { x: 55, y: 65, anchor: 'middle' },
  B1: { x: 142, y: 300, anchor: 'middle' },
  T1: { x: 142, y: 65, anchor: 'middle' },
  B2: { x: 230, y: 300, anchor: 'middle' },
  T2: { x: 230, y: 65, anchor: 'middle' },
  B3: { x: 317, y: 300, anchor: 'middle' },
  T3: { x: 317, y: 65, anchor: 'middle' },
  B4: { x: 405, y: 300, anchor: 'middle' },
  T4: { x: 413, y: 92, anchor: 'start' },
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
      <path d="M 41 303 L 69 303 L 55 285 Z" />
      <line x1={37} y1={303} x2={73} y2={303} />
      {Array.from({ length: 5 }, (_, index) => (
        <line key={index} x1={39 + index * 7} y1={304} x2={32 + index * 7} y2={311} strokeWidth={1.05} />
      ))}
      <path d="M 394 296 L 416 296 L 405 285 Z" />
      <circle cx={399} cy={301} r={3} />
      <circle cx={411} cy={301} r={3} />
      <line x1={390} y1={305} x2={420} y2={305} />
    </g>
  )
}

export function D09TrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.35 + sceneProgress * 1.9) : 1
  const statusOf = (member: (typeof MEMBERS)[number]): Status => {
    if (index < member.stage) return 'idle'
    const force = FORCES[member.id]
    return force > 0.005 ? 'tension' : force < -0.005 ? 'compression' : 'zero'
  }
  const activeNode: NodeName | null =
    index === 2 ? 'T4' : index === 3 ? 'A' : index === 4 ? 'T1' : index === 5 ? 'T2' : index === 6 ? 'T3' : null
  const showReactions = index >= 1
  const showValues = index >= 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Czteropanelowa kratownica prostokątna nr 9">
          <title>Kratownica nr 9 — cztery panele, pasy T0–T4 i A–B4</title>
          <desc>Dziesięć węzłów, siedemnaście prętów, przegub A, podpora pionowa B i obciążenia P1, P2, P3.</desc>
          <defs>
            <marker
              id="d09-load"
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
              id="d09-react"
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
              <line x1={55} y1={308} x2={405} y2={308} strokeDasharray="4 4" />
              {[55, 142, 230, 317, 405].map((x) => (
                <line key={x} x1={x} y1={303} x2={x} y2={313} />
              ))}
              <line x1={430} y1={75} x2={430} y2={285} strokeDasharray="4 4" />
              <line x1={425} y1={75} x2={435} y2={75} />
              <line x1={425} y1={285} x2={435} y2={285} />
              <path d="M 75 285 A 20 20 0 0 0 65 266" />
            </g>
          )}
          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line x1={51} y1={285} x2={24} y2={285} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d09-react)" />
              <line x1={55} y1={281} x2={55} y2={236} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d09-react)" />
              <line
                x1={405}
                y1={281}
                x2={405}
                y2={245}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d09-react)"
              />
            </motion.g>
          )}
          <motion.g
            initial={false}
            animate={{ opacity: [1, 0.65, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <line x1={142} y1={318} x2={142} y2={290} stroke={LOAD} strokeWidth={3} markerEnd="url(#d09-load)" />
            <line x1={230} y1={318} x2={230} y2={290} stroke={LOAD} strokeWidth={3} markerEnd="url(#d09-load)" />
            <line x1={409} y1={75} x2={445} y2={75} stroke={LOAD} strokeWidth={3} markerEnd="url(#d09-load)" />
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
          <g fontSize={7.8} fontWeight={600}>
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
            <text x={136} y={314} textAnchor="end">
              P₁=10 kN
            </text>
            <text x={236} y={314}>
              P₂=8 kN
            </text>
            <text x={445} y={68} textAnchor="end">
              P₃=2 kN
            </text>
          </g>
          {showReactions && (
            <g fontSize={9} fill={REACTION} fontWeight={600}>
              <text x={48} y={258} textAnchor="end">
                A_x=−2,00
              </text>
              <text x={50} y={240} textAnchor="end">
                A_y=10,63
              </text>
              <text x={399} y={250} textAnchor="end">
                B_y=7,37
              </text>
            </g>
          )}
          {index === 0 && (
            <g fontSize={9} fill={MUTED}>
              <text x={186} y={317} textAnchor="middle">
                a=5 m
              </text>
              <text x={428} y={200} textAnchor="end">
                h=8,66 m
              </text>
              <text x={82} y={260}>
                60°
              </text>
            </g>
          )}
          <text x={230} y={22} textAnchor="middle" fontSize={11.2} fill={INK} fontWeight={600}>
            {index === 0 && 'Model: cztery panele, 10 węzłów i 17 prętów'}
            {index === 1 && 'Reakcje: A_x w lewo, A_y i B_y w górę'}
            {index === 2 && 'Węzły B4 i T4: N16=0, N17=−7,37, N14=−2,25, N15=+8,51'}
            {index === 3 && 'A i T0: N1=N2=0, N3=−12,28, N4=+8,14'}
            {index === 4 && 'T1 i B1: N5=+10,63, N6=−6,14, N7=−0,73, N8=+8,51'}
            {index === 5 && 'T2 i B2: N9=+0,63, N10=−6,51, N11=+8,51, N12=+4,25'}
            {index === 6 && 'T3 i B3: N13=−7,37, N14=−2,25, N15=+8,51, N16=0'}
            {index >= 7 && 'Pręty 1, 2, 16 zerowe; pas dolny i ukośnice rozciągane'}
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
