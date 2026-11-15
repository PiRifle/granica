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
type NodeName = 'A' | 'L' | 'M' | 'R' | 'N' | "N'" | 'O' | 'B'

const NODES: Record<NodeName, { x: number; y: number }> = {
  A: { x: 55, y: 180 },
  L: { x: 113, y: 79 },
  M: { x: 231, y: 79 },
  R: { x: 348, y: 79 },
  N: { x: 172, y: 180 },
  "N'": { x: 289, y: 180 },
  O: { x: 231, y: 281 },
  B: { x: 406, y: 180 },
}

const MEMBERS: Array<{ id: number; from: NodeName; to: NodeName; stage: number }> = [
  { id: 1, from: 'A', to: 'L', stage: 5 },
  { id: 2, from: 'A', to: 'N', stage: 5 },
  { id: 3, from: 'L', to: 'N', stage: 5 },
  { id: 4, from: 'L', to: 'M', stage: 4 },
  { id: 5, from: 'N', to: 'M', stage: 4 },
  { id: 6, from: 'N', to: 'O', stage: 3 },
  { id: 7, from: 'M', to: 'O', stage: 3 },
  { id: 8, from: 'M', to: 'R', stage: 2 },
  { id: 9, from: 'M', to: "N'", stage: 3 },
  { id: 10, from: 'O', to: "N'", stage: 3 },
  { id: 11, from: 'R', to: "N'", stage: 2 },
  { id: 12, from: 'R', to: 'B', stage: 2 },
  { id: 13, from: "N'", to: 'B', stage: 2 },
]

const FORCES: Record<number, number> = {
  1: -4.262,
  2: 7.131,
  3: 4.262,
  4: -6.262,
  5: 7.131,
  6: 11.392,
  7: -19.732,
  8: -3.595,
  9: 1.797,
  10: 11.392,
  11: 9.595,
  12: -3.595,
  13: 1.797,
}

const LABELS: Record<number, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  1: { x: 74, y: 121, anchor: 'end' },
  2: { x: 113, y: 170, anchor: 'middle' },
  3: { x: 153, y: 121, anchor: 'start' },
  4: { x: 172, y: 68, anchor: 'middle' },
  5: { x: 211, y: 121, anchor: 'start' },
  6: { x: 211, y: 239, anchor: 'start' },
  7: { x: 241, y: 176, anchor: 'start' },
  8: { x: 289, y: 68, anchor: 'middle' },
  9: { x: 270, y: 121, anchor: 'start' },
  10: { x: 270, y: 239, anchor: 'start' },
  11: { x: 330, y: 127, anchor: 'start' },
  12: { x: 387, y: 121, anchor: 'start' },
  13: { x: 347, y: 170, anchor: 'middle' },
}

const NODE_LABELS: Record<NodeName, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  A: { x: 48, y: 195, anchor: 'end' },
  L: { x: 108, y: 96, anchor: 'end' },
  M: { x: 219, y: 94, anchor: 'end' },
  R: { x: 340, y: 96, anchor: 'end' },
  N: { x: 165, y: 195, anchor: 'end' },
  "N'": { x: 282, y: 195, anchor: 'end' },
  O: { x: 231, y: 300, anchor: 'middle' },
  B: { x: 412, y: 195, anchor: 'start' },
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
    <g stroke="#68727e" strokeWidth={1.8} fill="none" strokeLinejoin="round">
      <path d="M 41 198 L 69 198 L 55 180 Z" />
      <line x1={37} y1={198} x2={73} y2={198} />
      {Array.from({ length: 5 }, (_, index) => (
        <line key={index} x1={39 + index * 7} y1={199} x2={32 + index * 7} y2={206} strokeWidth={1.1} />
      ))}
      <path d="M 395 191 L 417 191 L 406 180 Z" />
      <circle cx={400} cy={196} r={3} />
      <circle cx={412} cy={196} r={3} />
      <line x1={392} y1={201} x2={420} y2={201} />
    </g>
  )
}

export function D03TrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.35 + sceneProgress * 1.9) : 1
  const statusOf = (member: (typeof MEMBERS)[number]): Status => {
    if (index < member.stage) return 'idle'
    const force = FORCES[member.id]
    return force > 0.005 ? 'tension' : force < -0.005 ? 'compression' : 'zero'
  }
  const activeNode: NodeName | null =
    index === 2 ? 'B' : index === 3 ? 'O' : index === 4 ? 'M' : index === 5 ? 'L' : index === 6 ? 'R' : null
  const showReactions = index >= 1
  const showValues = index >= 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Symetryczna kratownica nr 3 z dolnym węzłem O">
          <title>Kratownica nr 3 — układ symetryczny z dolnym węzłem O</title>
          <desc>Osiem węzłów, trzynaście prętów, podpora przegubowa A, podpora pionowa B i trzy obciążenia.</desc>
          <defs>
            <marker
              id="d03-load"
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
              id="d03-react"
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
              <line x1={NODES.A.x} y1={305} x2={NODES.N.x} y2={305} strokeDasharray="4 4" />
              <line x1={NODES.N.x} y1={300} x2={NODES.N.x} y2={310} />
              <line x1={NODES["N'"].x} y1={305} x2={NODES.B.x} y2={305} strokeDasharray="4 4" />
              <line x1={NODES["N'"].x} y1={300} x2={NODES["N'"].x} y2={310} />
              <line x1={430} y1={NODES.R.y} x2={430} y2={NODES.B.y} strokeDasharray="4 4" />
              <line x1={425} y1={NODES.R.y} x2={435} y2={NODES.R.y} />
              <line x1={425} y1={NODES.B.y} x2={435} y2={NODES.B.y} />
              <path d="M 323 79 A 25 25 0 0 0 341 104" />
            </g>
          )}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line x1={50} y1={180} x2={16} y2={180} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d03-react)" />
              <line x1={55} y1={175} x2={55} y2={142} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d03-react)" />
              <line
                x1={406}
                y1={175}
                x2={406}
                y2={142}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d03-react)"
              />
            </motion.g>
          )}

          <motion.g
            initial={false}
            animate={{ opacity: [1, 0.65, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <line
              x1={63}
              y1={NODES.L.y}
              x2={108}
              y2={NODES.L.y}
              stroke={LOAD}
              strokeWidth={3}
              markerEnd="url(#d03-load)"
            />
            <line x1={231} y1={74} x2={231} y2={38} stroke={LOAD} strokeWidth={3} markerEnd="url(#d03-load)" />
            <line x1={348} y1={75} x2={366} y2={45} stroke={LOAD} strokeWidth={3} markerEnd="url(#d03-load)" />
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
            <text x={63} y={68}>
              P₁=2 kN
            </text>
            <text x={238} y={50}>
              P₂=12 kN
            </text>
            <text x={371} y={42}>
              P₃=6 kN
            </text>
          </g>

          {showReactions && (
            <g fontSize={9} fill={REACTION} fontWeight={600}>
              <text x={14} y={170}>
                A_x=5,00 kN
              </text>
              <text x={60} y={145}>
                A_y=3,69 kN
              </text>
              <text x={412} y={140}>
                B_y=3,11 kN
              </text>
            </g>
          )}

          {index === 0 && (
            <g fontSize={9} fill={MUTED}>
              <text x={113} y={315} textAnchor="middle">
                a=3 m
              </text>
              <text x={347} y={315} textAnchor="middle">
                a=3 m
              </text>
              <text x={424} y={158} textAnchor="end">
                h=2,598 m
              </text>
              <text x={355} y={106} textAnchor="middle">
                60°
              </text>
            </g>
          )}

          <text x={230} y={23} textAnchor="middle" fontSize={11.2} fill={INK} fontWeight={600}>
            {index === 0 && 'Model: pas górny L–M–R i dolny węzeł O'}
            {index === 1 && 'Reakcje: A_x w lewo, A_y i B_y w górę'}
            {index === 2 && 'B i R: N8=−3,60, N11=+9,60, N12=−3,60, N13=+1,80'}
            {index === 3 && "N' i O: N9=+1,80, N10=N6=+11,39, N7=−19,73"}
            {index === 4 && 'Węzeł M: N4=−6,26 i N5=+7,13 kN'}
            {index === 5 && 'L i N: N1=−4,26, N2=+7,13, N3=+4,26'}
            {index === 6 && 'Tabela trzynastu sił osiowych'}
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
