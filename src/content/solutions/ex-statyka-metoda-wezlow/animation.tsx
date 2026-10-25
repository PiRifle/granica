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
const AXIS = '#c3ccd7'

type Status = 'idle' | 'tension' | 'compression' | 'zero'

const NODES = {
  A: { x: 60, y: 255 },
  B: { x: 200, y: 255 },
  C: { x: 340, y: 255 },
  D: { x: 60, y: 105 },
  E: { x: 200, y: 105 },
  F: { x: 340, y: 105 },
}

const MEMBERS: Array<{ id: string; from: keyof typeof NODES; to: keyof typeof NODES }> = [
  { id: 'AB', from: 'A', to: 'B' },
  { id: 'BC', from: 'B', to: 'C' },
  { id: 'DE', from: 'D', to: 'E' },
  { id: 'EF', from: 'E', to: 'F' },
  { id: 'AD', from: 'A', to: 'D' },
  { id: 'BE', from: 'B', to: 'E' },
  { id: 'CF', from: 'C', to: 'F' },
  { id: 'AE', from: 'A', to: 'E' },
  { id: 'BF', from: 'B', to: 'F' },
]

const colorFor = (status: Status) =>
  status === 'tension' ? TENSION : status === 'compression' ? COMPRESSION : status === 'zero' ? ZERO : STEEL

const widthFor = (status: Status) => (status === 'idle' ? 4.5 : status === 'zero' ? 2.5 : 5.5)

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

function ForceLabel({
  x,
  y,
  text,
  color,
  size = 9.5,
}: {
  x: number
  y: number
  text: string
  color: string
  size?: number
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={size}
      fill={color}
      stroke="#ffffff"
      strokeWidth={2.6}
      paintOrder="stroke"
    >
      {text}
    </text>
  )
}

export function NodesMethodAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.5 + sceneProgress * 1.8) : 1
  const showReactions = index >= 1
  const showZeros = index >= 2
  const showF = index >= 3
  const showE = index >= 4
  const showB = index >= 5

  const statusOf = (id: string): Status => {
    if (id === 'AD' || id === 'DE' || id === 'BC') return showZeros ? 'zero' : 'idle'
    if (id === 'CF') return showZeros ? 'compression' : 'idle'
    if (id === 'BF') return showF ? 'tension' : 'idle'
    if (id === 'EF') return showF ? 'compression' : 'idle'
    if (id === 'AE' || id === 'BE') return showE ? 'compression' : 'idle'
    if (id === 'AB') return showB ? 'tension' : 'idle'
    return 'idle'
  }

  const activeNode = index === 2 ? 'C' : index === 3 ? 'F' : index === 4 ? 'E' : index >= 5 ? 'B' : null

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Dwupanelowa kratownica z siłami osiowymi">
          <title>Metoda węzłów — dwupanelowa kratownica</title>
          <desc>Kratownica dwupanelowa z kolejno wyznaczanymi siłami w węzłach D, C, F, E i B.</desc>
          <defs>
            <marker
              id="ex-nodes-load"
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
              id="ex-nodes-reaction"
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
            <g stroke={AXIS} strokeWidth={1.2} fill={MUTED}>
              <line x1={NODES.A.x} y1={310} x2={NODES.C.x} y2={310} strokeDasharray="4 4" />
              <line x1={NODES.A.x} y1={305} x2={NODES.A.x} y2={315} />
              <line x1={NODES.C.x} y1={305} x2={NODES.C.x} y2={315} />
              <text x={NODES.B.x} y={326} textAnchor="middle" fontSize="11" stroke="none">
                2 m + 2 m
              </text>
              <line x1={NODES.F.x + 30} y1={NODES.F.y} x2={NODES.F.x + 30} y2={NODES.C.y} strokeDasharray="4 4" />
              <line x1={NODES.F.x + 25} y1={NODES.F.y} x2={NODES.F.x + 35} y2={NODES.F.y} />
              <line x1={NODES.F.x + 25} y1={NODES.C.y} x2={NODES.F.x + 35} y2={NODES.C.y} />
              <text x={NODES.F.x + 36} y={184} fontSize="11" stroke="none">
                2 m
              </text>
            </g>
          )}

          <Support node={NODES.A} kind="pin" />
          <Support node={NODES.C} kind="roller" />

          {MEMBERS.map((member) => (
            <Member key={member.id} from={member.from} to={member.to} status={statusOf(member.id)} />
          ))}

          {showZeros && (
            <>
              <ForceLabel x={43} y={181} text="N_AD = 0" color={ZERO} />
              <ForceLabel x={130} y={98} text="N_DE = 0" color={ZERO} />
              <ForceLabel x={270} y={274} text="N_BC = 0" color={ZERO} />
              <ForceLabel x={352} y={184} text="N_CF = −4,00" color={COMPRESSION} />
            </>
          )}
          {showF && (
            <>
              <ForceLabel x={278} y={178} text="N_BF = +5,657" color={TENSION} />
              <ForceLabel x={270} y={98} text="N_EF = −4,00" color={COMPRESSION} />
            </>
          )}
          {showE && (
            <>
              <ForceLabel x={121} y={178} text="N_AE = −5,657" color={COMPRESSION} />
              <ForceLabel x={214} y={184} text="N_BE = −4,00" color={COMPRESSION} />
            </>
          )}
          {showB && <ForceLabel x={130} y={274} text="N_AB = +4,00" color={TENSION} />}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line
                x1={NODES.A.x}
                y1={NODES.A.y - 6}
                x2={NODES.A.x}
                y2={NODES.A.y - 45}
                stroke={REACTION}
                strokeWidth={2.8}
                markerEnd="url(#ex-nodes-reaction)"
              />
              <text x={NODES.A.x - 5} y={NODES.A.y - 51} textAnchor="end" fontSize="10.5" fill={REACTION}>
                A_y = 4 kN
              </text>
              <line
                x1={NODES.C.x}
                y1={NODES.C.y - 6}
                x2={NODES.C.x}
                y2={NODES.C.y - 45}
                stroke={REACTION}
                strokeWidth={2.8}
                markerEnd="url(#ex-nodes-reaction)"
              />
              <text x={NODES.C.x + 5} y={NODES.C.y - 51} fontSize="10.5" fill={REACTION}>
                C_y = 4 kN
              </text>
            </motion.g>
          )}

          <line
            x1={NODES.E.x}
            y1={NODES.E.y - 56}
            x2={NODES.E.x}
            y2={NODES.E.y - 10}
            stroke={LOAD}
            strokeWidth={3.5}
            markerEnd="url(#ex-nodes-load)"
          />
          <text x={NODES.E.x + 8} y={NODES.E.y - 17} fontSize="11" fill={LOAD}>
            P = 8 kN
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
                  x={name === 'A' || name === 'D' ? node.x - 12 : node.x + 12}
                  y={node.y - 9}
                  textAnchor={name === 'A' || name === 'D' ? 'end' : 'start'}
                  fontSize="11.5"
                  fontWeight={600}
                  fill={INK}
                >
                  {name}
                </text>
              </g>
            )
          })}

          <text x="230" y="34" textAnchor="middle" fontSize="12.5" fill={INK}>
            {index === 0 && 'Model: dwa panele, dziewięć prętów, obciążenie w E'}
            {index === 1 && 'Reakcje z symetrii: A_y = C_y = 4 kN'}
            {index === 2 && 'Węzły D i C: trzy pręty zerowe i N_CF = −4 kN'}
            {index === 3 && 'Węzeł F: ukośnica BF rozciągana, pas EF ściskany'}
            {index === 4 && 'Węzeł E: oba pręty AE i BE ściskane'}
            {showB && 'Węzeł B i kontrola w A: cały rachunek się domyka'}
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
