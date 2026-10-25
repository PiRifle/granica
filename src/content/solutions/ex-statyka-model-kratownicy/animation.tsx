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
  A: { x: 70, y: 250 },
  B: { x: 390, y: 250 },
  C: { x: 230, y: 90 },
}

const MEMBERS: Array<{ id: string; from: keyof typeof NODES; to: keyof typeof NODES }> = [
  { id: 'AC', from: 'A', to: 'C' },
  { id: 'BC', from: 'B', to: 'C' },
  { id: 'AB', from: 'A', to: 'B' },
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

export function ModelTrussAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.5 + sceneProgress * 1.8) : 1
  const showReactions = index >= 1
  const showGeometry = index >= 2
  const showDiagonalForces = index >= 3
  const showBottomForce = index >= 4
  const showCheck = index >= 5

  const statusOf = (id: string): Status => {
    if (id === 'AC' || id === 'BC') return showDiagonalForces ? 'compression' : 'idle'
    if (id === 'AB') return showBottomForce ? 'tension' : 'idle'
    return 'idle'
  }

  const activeNode = index === 2 ? 'A' : index === 3 ? 'C' : index === 4 ? 'A' : index >= 5 ? 'B' : null

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Kratownica trójkątna z reakcjami i siłami w prętach">
          <title>Kratownica trójkątna — model i siły osiowe</title>
          <desc>Trójkątna kratownica z obciążeniem w wierzchołku, reakcjami podpór i kolorami sił osiowych.</desc>
          <defs>
            <marker
              id="ex-model-load"
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
              id="ex-model-reaction"
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

          {showGeometry && (
            <g stroke={AXIS} strokeWidth={1.2} fill={MUTED}>
              <line x1={NODES.A.x} y1={304} x2={NODES.B.x} y2={304} strokeDasharray="4 4" />
              <line x1={NODES.A.x} y1={299} x2={NODES.A.x} y2={309} />
              <line x1={NODES.B.x} y1={299} x2={NODES.B.x} y2={309} />
              <text x={(NODES.A.x + NODES.B.x) / 2} y={320} textAnchor="middle" fontSize="11" stroke="none">
                6 m
              </text>
              <line x1={NODES.C.x + 40} y1={NODES.C.y} x2={NODES.C.x + 40} y2={NODES.A.y} strokeDasharray="4 4" />
              <line x1={NODES.C.x + 35} y1={NODES.C.y} x2={NODES.C.x + 45} y2={NODES.C.y} />
              <line x1={NODES.C.x + 35} y1={NODES.A.y} x2={NODES.C.x + 45} y2={NODES.A.y} />
              <text x={NODES.C.x + 48} y={175} fontSize="11" stroke="none">
                4 m
              </text>
              <path
                d={`M ${NODES.A.x + 42} ${NODES.A.y} A 42 42 0 0 0 ${NODES.A.x + 42 * Math.cos((45 * Math.PI) / 180)} ${NODES.A.y - 42 * Math.sin((45 * Math.PI) / 180)}`}
                fill="none"
                stroke={MUTED}
              />
              <text x={NODES.A.x + 52} y={NODES.A.y - 20} fontSize="11" stroke="none">
                θ
              </text>
            </g>
          )}

          <Support node={NODES.A} kind="pin" />
          <Support node={NODES.B} kind="roller" />

          {MEMBERS.map((member) => (
            <Member key={member.id} from={member.from} to={member.to} status={statusOf(member.id)} />
          ))}

          {showDiagonalForces && (
            <>
              <text
                x={150}
                y={157}
                textAnchor="middle"
                fontSize="11"
                fill={COMPRESSION}
                stroke="#ffffff"
                strokeWidth={3}
                paintOrder="stroke"
              >
                N_AC = −6,25 kN
              </text>
              <text
                x={310}
                y={157}
                textAnchor="middle"
                fontSize="11"
                fill={COMPRESSION}
                stroke="#ffffff"
                strokeWidth={3}
                paintOrder="stroke"
              >
                N_BC = −6,25 kN
              </text>
            </>
          )}
          {showBottomForce && (
            <text
              x={230}
              y={272}
              textAnchor="middle"
              fontSize="11"
              fill={TENSION}
              stroke="#ffffff"
              strokeWidth={3}
              paintOrder="stroke"
            >
              N_AB = +3,75 kN
            </text>
          )}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line
                x1={NODES.A.x}
                y1={NODES.A.y - 6}
                x2={NODES.A.x}
                y2={NODES.A.y - 50}
                stroke={REACTION}
                strokeWidth={3}
                markerEnd="url(#ex-model-reaction)"
              />
              <text x={NODES.A.x - 8} y={NODES.A.y - 56} textAnchor="end" fontSize="11" fill={REACTION}>
                A_y = 5 kN
              </text>
              <line
                x1={NODES.B.x}
                y1={NODES.B.y - 6}
                x2={NODES.B.x}
                y2={NODES.B.y - 50}
                stroke={REACTION}
                strokeWidth={3}
                markerEnd="url(#ex-model-reaction)"
              />
              <text x={NODES.B.x + 8} y={NODES.B.y - 56} fontSize="11" fill={REACTION}>
                B_y = 5 kN
              </text>
              <text x={NODES.A.x - 8} y={NODES.A.y + 52} textAnchor="end" fontSize="11" fill={MUTED}>
                A_x = 0
              </text>
            </motion.g>
          )}

          <line
            x1={NODES.C.x}
            y1={NODES.C.y - 58}
            x2={NODES.C.x}
            y2={NODES.C.y - 12}
            stroke={LOAD}
            strokeWidth={3.5}
            markerEnd="url(#ex-model-load)"
          />
          <text x={NODES.C.x + 8} y={NODES.C.y - 38} fontSize="11" fill={LOAD}>
            P = 10 kN
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
                  x={name === 'A' ? node.x - 14 : name === 'B' ? node.x + 14 : node.x + 8}
                  y={name === 'C' ? node.y + 20 : node.y - 12}
                  textAnchor={name === 'B' ? 'start' : name === 'C' ? 'start' : 'end'}
                  fontSize="12"
                  fontWeight={600}
                  fill={INK}
                >
                  {name}
                </text>
              </g>
            )
          })}

          <text x="230" y="38" textAnchor="middle" fontSize="12.5" fill={INK}>
            {index === 0 && 'Model: przeguby, obciążenie w węźle, pręty dwuosiowe'}
            {index === 1 && 'Reakcje: symetria daje A_y = B_y = 5 kN'}
            {index === 2 && 'Geometria: trójkąt 3–4–5, sinθ = 0,8, cosθ = 0,6'}
            {index === 3 && 'Węzeł C: oba pręty ukośne ściskane'}
            {index === 4 && 'Węzeł A: dolny pas rozciągany'}
            {showCheck && 'Kontrola węzła B: suma sił i reakcji równa zero'}
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
