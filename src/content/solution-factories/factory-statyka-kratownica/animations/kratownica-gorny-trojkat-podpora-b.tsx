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
type NodeName = 'A' | 'T0' | 'T1' | 'T2' | 'T3' | 'U1' | 'U2' | 'B'

const NODES: Record<NodeName, { x: number; y: number }> = {
  A: { x: 55, y: 75 },
  T0: { x: 142, y: 75 },
  T1: { x: 230, y: 75 },
  T2: { x: 317, y: 75 },
  T3: { x: 405, y: 75 },
  U1: { x: 230, y: 180 },
  U2: { x: 317, y: 180 },
  B: { x: 230, y: 285 },
}

const MEMBERS: Array<{ id: number; from: NodeName; to: NodeName; stage: number }> = [
  { id: 1, from: 'A', to: 'T0', stage: 3 },
  { id: 2, from: 'T0', to: 'T1', stage: 3 },
  { id: 3, from: 'T0', to: 'U1', stage: 3 },
  { id: 4, from: 'T1', to: 'U1', stage: 4 },
  { id: 5, from: 'T1', to: 'T2', stage: 4 },
  { id: 6, from: 'U1', to: 'T2', stage: 5 },
  { id: 7, from: 'U1', to: 'U2', stage: 5 },
  { id: 8, from: 'U1', to: 'B', stage: 5 },
  { id: 9, from: 'U2', to: 'B', stage: 6 },
  { id: 10, from: 'T2', to: 'U2', stage: 6 },
  { id: 11, from: 'T2', to: 'T3', stage: 2 },
  { id: 12, from: 'T3', to: 'U2', stage: 2 },
]

const FORCES: Record<number, number> = {
  1: 10.5,
  2: 10.5,
  3: 0,
  4: -5,
  5: 10.5,
  6: -4.95,
  7: 3.5,
  8: -8.5,
  9: -14.849,
  10: -3.5,
  11: 7,
  12: -9.899,
}

const LABELS: Record<number, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  1: { x: 98, y: 91, anchor: 'middle' },
  2: { x: 186, y: 61, anchor: 'middle' },
  3: { x: 202, y: 113, anchor: 'middle' },
  4: { x: 250, y: 192, anchor: 'start' },
  5: { x: 273, y: 61, anchor: 'middle' },
  6: { x: 257, y: 113, anchor: 'middle' },
  7: { x: 273, y: 169, anchor: 'middle' },
  8: { x: 222, y: 237, anchor: 'end' },
  9: { x: 258, y: 216, anchor: 'middle' },
  10: { x: 324, y: 92, anchor: 'start' },
  11: { x: 361, y: 61, anchor: 'middle' },
  12: { x: 344, y: 112, anchor: 'middle' },
}

const NODE_LABELS: Record<NodeName, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  A: { x: 48, y: 88, anchor: 'end' },
  T0: { x: 142, y: 67, anchor: 'middle' },
  T1: { x: 222, y: 67, anchor: 'end' },
  T2: { x: 309, y: 67, anchor: 'end' },
  T3: { x: 397, y: 67, anchor: 'end' },
  U1: { x: 238, y: 189, anchor: 'start' },
  U2: { x: 325, y: 189, anchor: 'start' },
  B: { x: 220, y: 267, anchor: 'end' },
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
      <line x1={40} y1={58} x2={40} y2={104} />
      {Array.from({ length: 6 }, (_, index) => (
        <line key={index} x1={40} y1={62 + index * 7} x2={31} y2={68 + index * 7} strokeWidth={1.05} />
      ))}
      <path d="M 40 65 L 55 75 L 40 85 Z" />
      <circle cx={55} cy={75} r={3} fill="#68727e" stroke="none" />
      <path d="M 216 301 L 244 301 L 230 285 Z" />
      <line x1={212} y1={301} x2={248} y2={301} />
      {Array.from({ length: 5 }, (_, index) => (
        <line key={index} x1={214 + index * 7} y1={302} x2={207 + index * 7} y2={309} strokeWidth={1.05} />
      ))}
    </g>
  )
}

export function D08TrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.35 + sceneProgress * 1.9) : 1
  const statusOf = (member: (typeof MEMBERS)[number]): Status => {
    if (index < member.stage) return 'idle'
    const force = FORCES[member.id]
    return force > 0.005 ? 'tension' : force < -0.005 ? 'compression' : 'zero'
  }
  const activeNode: NodeName | null =
    index === 2 ? 'T3' : index === 3 ? 'T0' : index === 4 ? 'T1' : index === 5 ? 'U1' : index === 6 ? 'T2' : null
  const showReactions = index >= 1
  const showValues = index >= 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Kratownica nr 8 z pasem górnym i dolnym trójkątem">
          <title>Kratownica nr 8 — pas górny T0–T3 i podpora B pod U1</title>
          <desc>
            Osiem węzłów, dwanaście prętów, przegub A na ścianie, przegub B na gruncie i obciążenia P1, P2, P3.
          </desc>
          <defs>
            <marker
              id="d08-load"
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
              id="d08-react"
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
              <line x1={55} y1={307} x2={405} y2={307} strokeDasharray="4 4" />
              {[55, 142, 230, 317, 405].map((x) => (
                <line key={x} x1={x} y1={302} x2={x} y2={312} />
              ))}
              <line x1={430} y1={75} x2={430} y2={285} strokeDasharray="4 4" />
              <line x1={425} y1={75} x2={435} y2={75} />
              <line x1={425} y1={285} x2={435} y2={285} />
              <path d="M 230 160 A 20 20 0 0 1 250 180" />
            </g>
          )}
          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line x1={51} y1={75} x2={16} y2={75} stroke={REACTION} strokeWidth={2.6} markerEnd="url(#d08-react)" />
              <line
                x1={234}
                y1={285}
                x2={272}
                y2={285}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d08-react)"
              />
              <line
                x1={230}
                y1={281}
                x2={230}
                y2={245}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d08-react)"
              />
            </motion.g>
          )}
          <motion.g
            initial={false}
            animate={{ opacity: [1, 0.65, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <line x1={230} y1={36} x2={230} y2={71} stroke={LOAD} strokeWidth={3} markerEnd="url(#d08-load)" />
            <line x1={317} y1={36} x2={317} y2={71} stroke={LOAD} strokeWidth={3} markerEnd="url(#d08-load)" />
            <line x1={405} y1={36} x2={405} y2={71} stroke={LOAD} strokeWidth={3} markerEnd="url(#d08-load)" />
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
            <text x={238} y={44}>
              P₁=5 kN
            </text>
            <text x={325} y={44}>
              P₂=7 kN
            </text>
            <text x={413} y={44}>
              P₃=7 kN
            </text>
          </g>
          {showReactions && (
            <g fontSize={9} fill={REACTION} fontWeight={600}>
              <text x={60} y={62}>
                A_x=−10,50
              </text>
              <text x={274} y={281}>
                B_x=10,50
              </text>
              <text x={222} y={252} textAnchor="end">
                B_y=19,00
              </text>
            </g>
          )}
          {index === 0 && (
            <g fontSize={9} fill={MUTED}>
              <text x={98} y={314} textAnchor="middle">
                a=3,2 m
              </text>
              <text x={186} y={314} textAnchor="middle">
                a=3,2 m
              </text>
              <text x={273} y={314} textAnchor="middle">
                a=3,2 m
              </text>
              <text x={361} y={314} textAnchor="middle">
                a=3,2 m
              </text>
              <text x={424} y={178} textAnchor="end">
                h=6,4 m
              </text>
              <text x={330} y={164}>
                45°
              </text>
            </g>
          )}
          <text x={230} y={22} textAnchor="middle" fontSize={11.2} fill={INK} fontWeight={600}>
            {index === 0 && 'Model: pas górny T0–T3, dolny trójkąt U1–U2–B'}
            {index === 1 && 'Reakcje: A_x w lewo, B_x w prawo, B_y w górę, A_y=0'}
            {index === 2 && 'Węzeł T3: N11=+7,00 i N12=−9,90 kN'}
            {index === 3 && 'Węzły A i T0: N1=N2=+10,50, N3=0'}
            {index === 4 && 'Węzeł T1: N4=−5,00 i N5=+10,50 kN'}
            {index === 5 && 'U1 i B: N6=−4,95, N7=+3,50, N8=−8,50'}
            {index === 6 && 'U2 i T2: N9=−14,85, N10=−3,50, N12=−9,90'}
            {index >= 7 && 'Pręt 3 zerowy; reszta znaków domyka równania węzłów'}
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
