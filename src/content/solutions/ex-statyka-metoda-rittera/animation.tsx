import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const TENSION = '#2f7d5b'
const COMPRESSION = '#d84f28'
const ZERO = '#a970dd'
const STEEL = '#68727e'
const LOAD = '#ff6b45'
const REACTION = '#4f6df5'
const CUT = '#a970dd'
const ARM = '#d8a13b'
const INK = '#17202a'
const MUTED = '#87929d'

type Status = 'idle' | 'tension' | 'compression' | 'zero'

const NODES = {
  A: { x: 55, y: 265 },
  B: { x: 225, y: 265 },
  C: { x: 395, y: 265 },
  D: { x: 140, y: 105 },
  E: { x: 310, y: 105 },
}

const MEMBERS: Array<{ id: string; from: keyof typeof NODES; to: keyof typeof NODES }> = [
  { id: 'AB', from: 'A', to: 'B' },
  { id: 'BC', from: 'B', to: 'C' },
  { id: 'DE', from: 'D', to: 'E' },
  { id: 'AD', from: 'A', to: 'D' },
  { id: 'DB', from: 'D', to: 'B' },
  { id: 'BE', from: 'B', to: 'E' },
  { id: 'EC', from: 'E', to: 'C' },
]

const colorFor = (status: Status) =>
  status === 'tension' ? TENSION : status === 'compression' ? COMPRESSION : status === 'zero' ? ZERO : STEEL

const widthFor = (status: Status) => (status === 'idle' ? 4.5 : status === 'zero' ? 2.5 : 6)

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

export function RitterMethodAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.5 + sceneProgress * 1.8) : 1
  const showReactions = index >= 1
  const showCut = index >= 2
  const showDB = index >= 3
  const showAB = index >= 4
  const showDE = index >= 5
  const cutX = 182.5

  const statusOf = (id: string): Status => {
    if (id === 'DB') return showDB ? 'compression' : 'idle'
    if (id === 'AB') return showAB ? 'tension' : 'idle'
    if (id === 'DE') return showDE ? 'compression' : 'idle'
    return 'idle'
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Kratownica Warrena z przekrojem Rittera">
          <title>Metoda Rittera — przekrój przez trzy pręty</title>
          <desc>Kratownica Warrena z pionowym przekrojem przez pręty AB, DB i DE oraz wyznaczonymi siłami.</desc>
          <defs>
            <marker
              id="ex-ritter-load"
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
              id="ex-ritter-reaction"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={REACTION} />
            </marker>
            <marker
              id="ex-ritter-cut"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill={CUT} />
            </marker>
          </defs>

          {showCut && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <rect x={34} y={72} width={cutX - 34} height={222} fill={CUT} opacity={0.07} />
              <line x1={cutX} y1={78} x2={cutX} y2={292} stroke={CUT} strokeWidth={2.2} strokeDasharray="10 7" />
              <text x={cutX - 8} y={90} textAnchor="end" fontSize="10" fill={CUT}>
                przekrój
              </text>
              <text x={70} y={90} fontSize="10" fill={CUT}>
                część lewa
              </text>
            </motion.g>
          )}

          <Support node={NODES.A} kind="pin" />
          <Support node={NODES.C} kind="roller" />

          {MEMBERS.map((member) => (
            <Member key={member.id} from={member.from} to={member.to} status={statusOf(member.id)} />
          ))}

          {showDB && <ForceLabel x={155} y={207} text="N_DB = −1,414 kN" color={COMPRESSION} />}
          {showAB && <ForceLabel x={115} y={286} text="N_AB = +7,00 kN" color={TENSION} />}
          {showDE && <ForceLabel x={225} y={96} text="N_DE = −6,00 kN" color={COMPRESSION} />}

          {index === 4 && (
            <motion.g
              stroke={ARM}
              strokeWidth={1.4}
              fill="none"
              strokeDasharray="4 4"
              initial={false}
              animate={{ opacity: reveal }}
            >
              <line x1={NODES.D.x} y1={NODES.D.y} x2={NODES.D.x} y2={NODES.A.y} />
              <line x1={NODES.D.x} y1={NODES.D.y} x2={NODES.A.x} y2={NODES.D.y} />
              <text x={NODES.D.x + 5} y={190} fontSize="9.5" stroke="none" fill={ARM}>
                2 m
              </text>
              <text x={97} y={NODES.D.y - 6} fontSize="9.5" stroke="none" fill={ARM}>
                2 m
              </text>
              <circle cx={NODES.D.x} cy={NODES.D.y} r={13} stroke={ARM} strokeDasharray="3 3" />
              <text x={NODES.D.x + 18} y={NODES.D.y - 14} fontSize="10" stroke="none" fill={ARM}>
                ΣM_D = 0
              </text>
            </motion.g>
          )}

          {index === 5 && (
            <motion.g
              stroke={ARM}
              strokeWidth={1.3}
              fill="none"
              strokeDasharray="4 4"
              initial={false}
              animate={{ opacity: reveal }}
            >
              <line x1={NODES.B.x} y1={NODES.B.y} x2={NODES.A.x} y2={NODES.B.y} />
              <line x1={NODES.B.x} y1={NODES.B.y} x2={NODES.D.x} y2={NODES.B.y} />
              <line x1={NODES.B.x} y1={NODES.B.y} x2={NODES.B.x} y2={NODES.E.y} />
              <circle cx={NODES.B.x} cy={NODES.B.y} r={12} stroke={ARM} strokeDasharray="3 3" />
              <text x={NODES.B.x + 16} y={NODES.B.y - 16} fontSize="10" stroke="none" fill={ARM}>
                ΣM_B = 0
              </text>
            </motion.g>
          )}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line
                x1={NODES.A.x}
                y1={NODES.A.y - 6}
                x2={NODES.A.x}
                y2={NODES.A.y - 46}
                stroke={REACTION}
                strokeWidth={2.8}
                markerEnd="url(#ex-ritter-reaction)"
              />
              <text x={NODES.A.x - 5} y={NODES.A.y - 52} textAnchor="end" fontSize="10.5" fill={REACTION}>
                A_y = 7 kN
              </text>
              <line
                x1={NODES.C.x}
                y1={NODES.C.y - 6}
                x2={NODES.C.x}
                y2={NODES.C.y - 40}
                stroke={REACTION}
                strokeWidth={2.8}
                markerEnd="url(#ex-ritter-reaction)"
              />
              <text x={NODES.C.x + 5} y={NODES.C.y - 46} fontSize="10.5" fill={REACTION}>
                C_y = 5 kN
              </text>
            </motion.g>
          )}

          <line
            x1={NODES.D.x}
            y1={NODES.D.y - 50}
            x2={NODES.D.x}
            y2={NODES.D.y - 10}
            stroke={LOAD}
            strokeWidth={3.4}
            markerEnd="url(#ex-ritter-load)"
          />
          <text x={NODES.D.x - 7} y={NODES.D.y - 57} textAnchor="end" fontSize="10.5" fill={LOAD}>
            P₁ = 8 kN
          </text>
          <line
            x1={NODES.E.x}
            y1={NODES.E.y - 50}
            x2={NODES.E.x}
            y2={NODES.E.y - 10}
            stroke={LOAD}
            strokeWidth={3.4}
            markerEnd="url(#ex-ritter-load)"
          />
          <text x={NODES.E.x + 7} y={NODES.E.y - 57} fontSize="10.5" fill={LOAD}>
            P₂ = 4 kN
          </text>

          {Object.entries(NODES).map(([name, node]) => {
            const active =
              (index === 1 && name === 'A') ||
              (index === 3 && name === 'D') ||
              (index === 4 && name === 'D') ||
              (index === 5 && name === 'B')
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
                  textAnchor={name === 'A' ? 'end' : name === 'C' ? 'start' : 'start'}
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
            {index === 0 && 'Model: obciążenia w górnych węzłach D i E'}
            {index === 1 && 'Reakcje: A_y = 7 kN, C_y = 5 kN'}
            {index === 2 && 'Cięcie w x = 3 m przez AB, DB i DE'}
            {index === 3 && 'Rzut pionowy: N_DB = −1,414 kN'}
            {index === 4 && 'Moment względem D: N_AB = +7,00 kN'}
            {showDE && 'Moment względem B: N_DE = −6,00 kN; rzuty potwierdzają'}
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
            <line x1={224} y1={-6} x2={240} y2={-6} stroke={CUT} strokeWidth={2.5} strokeDasharray="7 5" />
            <text x={245} y={-3}>
              przekrój
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
