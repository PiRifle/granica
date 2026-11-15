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
type NodeName = 'A' | 'T0' | 'T1' | 'T2' | 'B' | 'C' | 'D' | 'E'

const NODES: Record<NodeName, { x: number; y: number }> = {
  A: { x: 50, y: 75 },
  T0: { x: 140, y: 75 },
  T1: { x: 230, y: 143 },
  T2: { x: 320, y: 212 },
  B: { x: 140, y: 280 },
  C: { x: 230, y: 280 },
  D: { x: 320, y: 280 },
  E: { x: 410, y: 280 },
}

const MEMBERS: Array<{ id: number; from: NodeName; to: NodeName; stage: number }> = [
  { id: 1, from: 'A', to: 'T0', stage: 6 },
  { id: 2, from: 'T0', to: 'B', stage: 6 },
  { id: 3, from: 'T0', to: 'T1', stage: 6 },
  { id: 4, from: 'B', to: 'T1', stage: 6 },
  { id: 5, from: 'B', to: 'C', stage: 5 },
  { id: 6, from: 'T1', to: 'C', stage: 5 },
  { id: 7, from: 'T1', to: 'T2', stage: 4 },
  { id: 8, from: 'C', to: 'T2', stage: 4 },
  { id: 9, from: 'C', to: 'D', stage: 3 },
  { id: 10, from: 'D', to: 'T2', stage: 3 },
  { id: 11, from: 'T2', to: 'E', stage: 2 },
  { id: 12, from: 'D', to: 'E', stage: 2 },
]

const FORCES: Record<number, number> = {
  1: 11.189739793884353,
  2: -6.460399282160998,
  3: 12.920798564321997,
  4: -6.005327275466149,
  5: -11.258330249197702,
  6: 4.5,
  7: 13,
  8: -9,
  9: -3.464101615137757,
  10: 9,
  11: 4,
  12: -3.464101615137757,
}

const LABELS: Record<number, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  1: { x: 95, y: 63, anchor: 'middle' },
  2: { x: 130, y: 171, anchor: 'end' },
  3: { x: 196, y: 100, anchor: 'middle' },
  4: { x: 178, y: 203, anchor: 'end' },
  5: { x: 185, y: 267, anchor: 'middle' },
  6: { x: 239, y: 208, anchor: 'start' },
  7: { x: 287, y: 167, anchor: 'middle' },
  8: { x: 264, y: 228, anchor: 'end' },
  9: { x: 275, y: 267, anchor: 'middle' },
  10: { x: 329, y: 236, anchor: 'start' },
  11: { x: 377, y: 252, anchor: 'middle' },
  12: { x: 365, y: 267, anchor: 'middle' },
}

const NODE_LABELS: Record<NodeName, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  A: { x: 24, y: 65, anchor: 'end' },
  T0: { x: 140, y: 62, anchor: 'middle' },
  T1: { x: 240, y: 134, anchor: 'start' },
  T2: { x: 328, y: 203, anchor: 'start' },
  B: { x: 129, y: 292, anchor: 'end' },
  C: { x: 238, y: 300, anchor: 'start' },
  D: { x: 310, y: 292, anchor: 'end' },
  E: { x: 400, y: 292, anchor: 'end' },
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

function SupportA() {
  return (
    <g stroke="#68727e" strokeWidth={1.7} fill="none" strokeLinejoin="round">
      <line x1={38} y1={52} x2={38} y2={98} />
      {Array.from({ length: 5 }, (_, index) => (
        <line key={index} x1={38} y1={55 + index * 9} x2={29} y2={61 + index * 9} strokeWidth={1.1} />
      ))}
      <path d="M 38 64 L 50 75 L 38 86 Z" />
      <circle cx={50} cy={75} r={3} fill="#68727e" stroke="none" />
    </g>
  )
}

function SupportB() {
  return (
    <g stroke="#68727e" strokeWidth={1.8} fill="none" strokeLinejoin="round">
      <path d="M 126 298 L 154 298 L 140 280 Z" />
      <line x1={122} y1={298} x2={158} y2={298} />
      {Array.from({ length: 5 }, (_, index) => (
        <line key={index} x1={124 + index * 7} y1={299} x2={117 + index * 7} y2={306} strokeWidth={1.1} />
      ))}
    </g>
  )
}

export function D01TrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.35 + sceneProgress * 1.9) : 1
  const statusOf = (member: (typeof MEMBERS)[number]): Status => {
    if (index < member.stage) return 'idle'
    const force = FORCES[member.id]
    return force > 0.005 ? 'tension' : force < -0.005 ? 'compression' : 'zero'
  }
  const activeNode: NodeName | null =
    index === 2 ? 'E' : index === 3 ? 'D' : index === 4 ? 'T2' : index === 5 ? 'C' : index === 6 ? 'T1' : null
  const showReactions = index >= 1
  const showValues = index >= 2

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Kratownica nr 1 z podporą A na ścianie i pełnym rozwiązaniem">
          <title>Kratownica nr 1 — pas górny opadający, metoda węzłów</title>
          <desc>
            Osiem węzłów, dwanaście prętów, podpora A na pionowej ścianie, podpora B na gruncie i obciążenia P1, P2, P3.
          </desc>
          <defs>
            <marker
              id="d01-load"
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
              id="d01-react"
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

          {membersShapes(MEMBERS, statusOf, index)}

          <SupportA />
          <SupportB />

          {index === 0 && (
            <g stroke={AXIS} strokeWidth={1.1} fill="none">
              <line x1={NODES.B.x} y1={302} x2={NODES.E.x} y2={302} strokeDasharray="4 4" />
              {[NODES.B.x, NODES.C.x, NODES.D.x, NODES.E.x].map((x) => (
                <line key={x} x1={x} y1={297} x2={x} y2={307} />
              ))}
              <line x1={438} y1={NODES.T2.y} x2={438} y2={NODES.D.y} strokeDasharray="4 4" />
              <line x1={433} y1={NODES.T2.y} x2={443} y2={NODES.T2.y} />
              <line x1={433} y1={NODES.D.y} x2={443} y2={NODES.D.y} />
              <path d="M 344 212 A 24 24 0 0 0 315 189" />
            </g>
          )}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line
                x1={NODES.A.x - 4}
                y1={NODES.A.y}
                x2={22}
                y2={NODES.A.y}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d01-react)"
              />
              <line
                x1={NODES.B.x + 5}
                y1={292}
                x2={200}
                y2={292}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d01-react)"
              />
              <line
                x1={160}
                y1={275}
                x2={160}
                y2={244}
                stroke={REACTION}
                strokeWidth={2.6}
                markerEnd="url(#d01-react)"
              />
            </motion.g>
          )}

          <motion.g
            initial={false}
            animate={{ opacity: [1, 0.65, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <line
              x1={NODES.T1.x - 4}
              y1={NODES.T1.y}
              x2={188}
              y2={NODES.T1.y}
              stroke={LOAD}
              strokeWidth={3}
              markerEnd="url(#d01-load)"
            />
            <line
              x1={NODES.D.x}
              y1={NODES.D.y + 4}
              x2={NODES.D.x}
              y2={320}
              stroke={LOAD}
              strokeWidth={3}
              markerEnd="url(#d01-load)"
            />
            <line
              x1={NODES.E.x}
              y1={NODES.E.y + 4}
              x2={NODES.E.x}
              y2={320}
              stroke={LOAD}
              strokeWidth={3}
              markerEnd="url(#d01-load)"
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
            <circle key={`${node.x}-${node.y}`} cx={node.x} cy={node.y} r={4.4} fill={INK} />
          ))}

          <g>
            {!showReactions && (
              <line x1={NODES.T1.x - 4} y1={NODES.T1.y} x2={188} y2={NODES.T1.y} stroke="transparent" strokeWidth={1} />
            )}
          </g>

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
              const force = FORCES[member.id]
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
                  {showValues && index >= member.stage ? `N${member.id}=${format(force)}` : member.id}
                </text>
              )
            })}
          </g>

          <g fontSize={9} fill={LOAD} fontWeight={600}>
            <text x={180} y={137} textAnchor="end">
              P₁=4 kN
            </text>
            <text x={329} y={330} textAnchor="start">
              P₂=9 kN
            </text>
            <text x={400} y={330} textAnchor="end">
              P₃=2 kN
            </text>
          </g>

          {showReactions && (
            <g fontSize={9} fill={REACTION} fontWeight={600}>
              <text x={54} y={50}>
                A_x=11,19 kN
              </text>
              <text x={228} y={307} textAnchor="end">
                B_x=15,19 kN
              </text>
              <text x={150} y={262} textAnchor="end">
                B_y=11,00 kN
              </text>
            </g>
          )}

          {index === 0 && (
            <g fontSize={9} fill={MUTED}>
              <text x={185} y={315} textAnchor="middle">
                a=2 m
              </text>
              <text x={275} y={315} textAnchor="middle">
                a=2 m
              </text>
              <text x={365} y={315} textAnchor="middle">
                a=2 m
              </text>
              <text x={445} y={247}>
                h=1,155 m
              </text>
              <text x={316} y={190} textAnchor="middle">
                30°
              </text>
            </g>
          )}

          <text x={230} y={23} textAnchor="middle" fontSize={11.5} fill={INK} fontWeight={600}>
            {index === 0 && 'Model: 8 węzłów, 12 prętów, pas opadający'}
            {index === 1 && 'Reakcje: A_x w lewo, B_x w prawo, B_y w górę'}
            {index === 2 && 'Węzeł E: N11=+4,00 i N12=−3,46 kN'}
            {index === 3 && 'Węzeł D: N9=−3,46 i N10=+9,00 kN'}
            {index === 4 && 'Węzeł T2: N7=+13,00 i N8=−9,00 kN'}
            {index === 5 && 'Węzeł C: N5=−11,26 i N6=+4,50 kN'}
            {index === 6 && 'Węzły T1 i T0 domykają tabelę sił'}
            {index >= 7 && 'Znaki sił i kontrola bilansu całej kratownicy'}
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

function membersShapes(members: typeof MEMBERS, statusOf: (member: (typeof MEMBERS)[number]) => Status, index: number) {
  return members.map((member) => <Member key={member.id} member={member} status={statusOf(member)} index={index} />)
}
