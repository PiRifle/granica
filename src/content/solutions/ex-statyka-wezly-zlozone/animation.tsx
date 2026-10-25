import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const TENSION = '#2f7d5b'
const COMPRESSION = '#d84f28'
const ZERO = '#a970dd'
const STEEL = '#68727e'
const LOAD = '#ff6b45'
const REACTION = '#4f6df5'
const INK = '#17202a'
const MUTED = '#87929d'
const HIGHLIGHT = '#d8a13b'

type Status = 'idle' | 'tension' | 'compression' | 'zero'

const NODES = {
  A: { x: 55, y: 255 },
  B: { x: 210, y: 255 },
  C: { x: 365, y: 255 },
  D: { x: 210, y: 105 },
}

const MEMBERS: Array<{ id: string; from: keyof typeof NODES; to: keyof typeof NODES }> = [
  { id: 'AB', from: 'A', to: 'B' },
  { id: 'BC', from: 'B', to: 'C' },
  { id: 'AD', from: 'A', to: 'D' },
  { id: 'CD', from: 'C', to: 'D' },
  { id: 'BD', from: 'B', to: 'D' },
]

const colorFor = (status: Status) =>
  status === 'tension' ? TENSION : status === 'compression' ? COMPRESSION : status === 'zero' ? ZERO : STEEL

const widthFor = (status: Status) => (status === 'idle' ? 5 : status === 'zero' ? 2.5 : 6)

function Member({ from, to, status }: { from: keyof typeof NODES; to: keyof typeof NODES; status: Status }) {
  const a = NODES[from]
  const b = NODES[to]
  return (
    <motion.line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      strokeLinecap="round"
      initial={false}
      animate={{ stroke: colorFor(status), strokeWidth: widthFor(status) }}
      transition={{ duration: 0.4 }}
      strokeDasharray={status === 'zero' ? '9 7' : undefined}
    />
  )
}

function Support({ node, kind }: { node: { x: number; y: number }; kind: 'pin' | 'roller' }) {
  const { x, y } = node
  return (
    <g stroke={MUTED} fill="none" strokeLinecap="round">
      <path d={`M ${x - 14} ${y + 19} L ${x + 14} ${y + 19} L ${x} ${y + 3} Z`} strokeWidth={1.8} />
      <line x1={x - 18} y1={y + 19} x2={x + 18} y2={y + 19} strokeWidth={1.8} />
      {kind === 'pin' ? (
        <>
          {Array.from({ length: 5 }, (_, i) => (
            <line key={i} x1={x - 14 + i * 7} y1={y + 20} x2={x - 20 + i * 7} y2={y + 27} strokeWidth={1.2} />
          ))}
        </>
      ) : (
        <>
          <circle cx={x - 8} cy={y + 24} r={3} strokeWidth={1.4} />
          <circle cx={x + 8} cy={y + 24} r={3} strokeWidth={1.4} />
        </>
      )}
    </g>
  )
}

function ForceLabel({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="10.5"
      fill={color}
      stroke="#ffffff"
      strokeWidth={2.8}
      paintOrder="stroke"
    >
      {text}
    </text>
  )
}

export function ComplexNodesAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.5 + sceneProgress * 1.8) : 1
  const showReactions = index >= 1
  const showDiagonals = index >= 2
  const showVertical = index >= 3

  const statusOf = (id: string): Status => {
    if (id === 'AD' || id === 'CD') return showDiagonals ? 'compression' : 'idle'
    if (id === 'AB' || id === 'BC') return showDiagonals ? 'tension' : 'idle'
    if (id === 'BD') return showVertical ? 'tension' : 'idle'
    return 'idle'
  }

  const activeNode =
    index === 1 ? 'A' : index === 2 ? 'A' : index === 3 ? 'B' : index === 4 ? 'D' : index >= 5 ? 'B' : null

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Kratownica królewska z węzłem złożonym">
          <title>Węzły złożone — kratownica królewska</title>
          <desc>Kratownica z parą współliniową w węźle B i pionowym prętem, który przejmuje obciążenie.</desc>
          <defs>
            <marker
              id="ex-complex-load"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={LOAD} />
            </marker>
            <marker
              id="ex-complex-reaction"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
          </defs>

          {index === 0 && (
            <g fill="none">
              <line
                x1={NODES.A.x}
                y1={NODES.B.y - 24}
                x2={NODES.C.x}
                y2={NODES.C.y - 24}
                stroke={HIGHLIGHT}
                strokeWidth={2}
                strokeDasharray="6 5"
              />
              <rect
                x={NODES.B.x - 26}
                y={NODES.B.y - 34}
                width={52}
                height={20}
                rx={6}
                fill="#ffffff"
                stroke={HIGHLIGHT}
                strokeWidth={1.5}
              />
              <text x={NODES.B.x} y={NODES.B.y - 20} textAnchor="middle" fontSize="9.5" fill={HIGHLIGHT}>
                węzeł złożony
              </text>
            </g>
          )}

          <Support node={NODES.A} kind="pin" />
          <Support node={NODES.C} kind="roller" />

          {MEMBERS.map((member) => (
            <Member key={member.id} from={member.from} to={member.to} status={statusOf(member.id)} />
          ))}

          {showDiagonals && (
            <>
              <ForceLabel x={127} y={170} text="N_AD = −5,00 kN" color={COMPRESSION} />
              <ForceLabel x={293} y={170} text="N_CD = −5,00 kN" color={COMPRESSION} />
              <ForceLabel x={132} y={274} text="N_AB = +4,00 kN" color={TENSION} />
              <ForceLabel x={288} y={274} text="N_BC = +4,00 kN" color={TENSION} />
            </>
          )}
          {showVertical && <ForceLabel x={224} y={181} text="N_BD = +6,00 kN" color={TENSION} />}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line
                x1={NODES.A.x}
                y1={NODES.A.y - 6}
                x2={NODES.A.x}
                y2={NODES.A.y - 46}
                stroke={REACTION}
                strokeWidth={2.8}
                markerEnd="url(#ex-complex-reaction)"
              />
              <text x={NODES.A.x - 5} y={NODES.A.y - 52} textAnchor="end" fontSize="10.5" fill={REACTION}>
                A_y = 3 kN
              </text>
              <line
                x1={NODES.C.x}
                y1={NODES.C.y - 6}
                x2={NODES.C.x}
                y2={NODES.C.y - 46}
                stroke={REACTION}
                strokeWidth={2.8}
                markerEnd="url(#ex-complex-reaction)"
              />
              <text x={NODES.C.x + 5} y={NODES.C.y - 52} fontSize="10.5" fill={REACTION}>
                C_y = 3 kN
              </text>
            </motion.g>
          )}

          <line
            x1={NODES.B.x}
            y1={NODES.B.y + 7}
            x2={NODES.B.x}
            y2={NODES.B.y + 46}
            stroke={LOAD}
            strokeWidth={3.5}
            markerEnd="url(#ex-complex-load)"
          />
          <text x={NODES.B.x + 8} y={NODES.B.y + 31} fontSize="11" fill={LOAD}>
            P = 6 kN
          </text>

          {Object.entries(NODES).map(([name, node]) => {
            const active = activeNode === name
            return (
              <g key={name}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  fill={active ? '#ffffff' : INK}
                  stroke={active ? REACTION : INK}
                  initial={false}
                  animate={{ r: active ? 7.5 : 5, strokeWidth: active ? 2.4 : 1.2 }}
                  transition={{ duration: 0.3 }}
                />
                <text
                  x={name === 'A' ? node.x - 12 : name === 'C' ? node.x + 12 : node.x + 10}
                  y={node.y - 10}
                  textAnchor={name === 'A' ? 'end' : 'start'}
                  fontSize="11.5"
                  fontWeight={600}
                  fill={INK}
                >
                  {name}
                </text>
              </g>
            )
          })}

          {index >= 3 && (
            <motion.text
              x="230"
              y="60"
              textAnchor="middle"
              fontSize="10.5"
              fill={HIGHLIGHT}
              initial={false}
              animate={{ opacity: index === 3 ? 1 : 0.55 }}
            >
              Bez obciążenia w B: N_BD = 0 — z obciążeniem: N_BD = +6 kN
            </motion.text>
          )}

          <text x="230" y="34" textAnchor="middle" fontSize="12.5" fill={INK}>
            {index === 0 && 'Węzeł B: para współliniowa, pion i obciążenie zewnętrzne'}
            {index === 1 && 'Reakcje z symetrii: A_y = C_y = 3 kN'}
            {index === 2 && 'Węzły A i C: ukośnice ściskane, pasy rozciągane'}
            {index === 3 && 'Węzeł B: pionowy pręt przejmuje całe obciążenie'}
            {index === 4 && 'Kontrola w D: składowe AD, CD i BD sumują się do zera'}
            {index >= 5 && 'Pełny obraz: AB, BC, BD rozciągane; AD, CD ściskane'}
          </text>

          <g transform="translate(54, 330)" fontSize="10" fill={MUTED}>
            <rect x={0} y={-8} width={16} height={3} rx={1.5} fill={TENSION} />
            <text x={21} y={-3}>
              rozciąganie
            </text>
            <rect x={112} y={-8} width={16} height={3} rx={1.5} fill={COMPRESSION} />
            <text x={133} y={-3}>
              ściskanie
            </text>
            <line x1={224} y1={-6} x2={240} y2={-6} stroke={ZERO} strokeWidth={2.5} strokeDasharray="7 5" />
            <text x={245} y={-3}>
              zero
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
