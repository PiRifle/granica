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
  B: { x: 210, y: 255 },
  C: { x: 360, y: 255 },
  D: { x: 210, y: 95 },
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
      <path d={`M ${x - 15} ${y + 20} L ${x + 15} ${y + 20} L ${x} ${y + 3} Z`} strokeWidth={1.8} />
      <line x1={x - 19} y1={y + 20} x2={x + 19} y2={y + 20} strokeWidth={1.8} />
      {kind === 'pin' ? (
        <>
          {Array.from({ length: 5 }, (_, i) => (
            <line key={i} x1={x - 15 + i * 7} y1={y + 21} x2={x - 21 + i * 7} y2={y + 28} strokeWidth={1.2} />
          ))}
        </>
      ) : (
        <>
          <circle cx={x - 9} cy={y + 25} r={3.2} strokeWidth={1.4} />
          <circle cx={x + 9} cy={y + 25} r={3.2} strokeWidth={1.4} />
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
      strokeWidth={3}
      paintOrder="stroke"
    >
      {text}
    </text>
  )
}

export function ZeroMembersAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.5 + sceneProgress * 1.8) : 1
  const showReactions = index >= 1
  const showZero = index >= 2
  const showDiagonals = index >= 3
  const showBottom = index >= 4
  const showCheck = index >= 5

  const statusOf = (id: string): Status => {
    if (id === 'BD') return showZero ? 'zero' : 'idle'
    if (id === 'AD' || id === 'CD') return showDiagonals ? 'compression' : 'idle'
    if (id === 'AB' || id === 'BC') return showBottom ? 'tension' : 'idle'
    return 'idle'
  }

  const activeNode = index === 2 ? 'B' : index === 3 ? 'D' : index === 4 ? 'A' : index >= 5 ? 'B' : null

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Kratownica z pionowym prętem zerowym i siłami osiowymi">
          <title>Pręty zerowe i siły w kratownicy</title>
          <desc>Kratownica z prętem BD zerowym, ukośnicami ściskanymi i dolnym pasem rozciąganym.</desc>
          <defs>
            <marker
              id="ex-zero-load"
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
              id="ex-zero-reaction"
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
                4 m + 4 m
              </text>
              <line x1={NODES.D.x + 34} y1={NODES.D.y} x2={NODES.D.x + 34} y2={NODES.B.y} strokeDasharray="4 4" />
              <text x={NODES.D.x + 40} y={178} fontSize="11" stroke="none">
                4 m
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
              <ForceLabel x={123} y={168} text="N_AD = −8,49 kN" color={COMPRESSION} />
              <ForceLabel x={299} y={168} text="N_CD = −8,49 kN" color={COMPRESSION} />
            </>
          )}
          {showBottom && (
            <>
              <ForceLabel x={135} y={276} text="N_AB = +6,00 kN" color={TENSION} />
              <ForceLabel x={287} y={276} text="N_BC = +6,00 kN" color={TENSION} />
            </>
          )}
          {showZero && <ForceLabel x={224} y={186} text="N_BD = 0" color={ZERO} />}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line
                x1={NODES.A.x}
                y1={NODES.A.y - 6}
                x2={NODES.A.x}
                y2={NODES.A.y - 48}
                stroke={REACTION}
                strokeWidth={3}
                markerEnd="url(#ex-zero-reaction)"
              />
              <text x={NODES.A.x - 6} y={NODES.A.y - 54} textAnchor="end" fontSize="11" fill={REACTION}>
                A_y = 6 kN
              </text>
              <line
                x1={NODES.C.x}
                y1={NODES.C.y - 6}
                x2={NODES.C.x}
                y2={NODES.C.y - 48}
                stroke={REACTION}
                strokeWidth={3}
                markerEnd="url(#ex-zero-reaction)"
              />
              <text x={NODES.C.x + 6} y={NODES.C.y - 54} fontSize="11" fill={REACTION}>
                C_y = 6 kN
              </text>
            </motion.g>
          )}

          <line
            x1={NODES.D.x}
            y1={NODES.D.y - 54}
            x2={NODES.D.x}
            y2={NODES.D.y - 12}
            stroke={LOAD}
            strokeWidth={3.5}
            markerEnd="url(#ex-zero-load)"
          />
          <text x={NODES.D.x + 8} y={NODES.D.y - 19} fontSize="11" fill={LOAD}>
            P = 12 kN
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
                  animate={{ r: active ? 8 : 5.5, strokeWidth: active ? 2.4 : 1.2 }}
                  transition={{ duration: 0.3 }}
                />
                <text
                  x={name === 'A' ? node.x - 14 : name === 'C' ? node.x + 14 : node.x + 9}
                  y={node.y - 10}
                  textAnchor={name === 'A' ? 'end' : 'start'}
                  fontSize="12"
                  fontWeight={600}
                  fill={INK}
                >
                  {name}
                </text>
              </g>
            )
          })}

          <text x="230" y="34" textAnchor="middle" fontSize="12.5" fill={INK}>
            {index === 0 && 'Model: dwa trójkąty, pionowy zastrzał i obciążenie w D'}
            {index === 1 && 'Reakcje: A_y = C_y = 6 kN'}
            {index === 2 && 'Węzeł B bez obciążenia i para współliniowa ⇒ N_BD = 0'}
            {index === 3 && 'Węzeł D: ukośnice przejmują całe obciążenie'}
            {index === 4 && 'Węzeł A: dolny pas rozciągany, ukośnica ściskana'}
            {showCheck && 'Kontrola: w B pasy 6 kN znoszą się, BD pozostaje zerowy'}
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
