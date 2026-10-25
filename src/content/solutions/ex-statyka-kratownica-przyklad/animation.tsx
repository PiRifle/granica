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
const INK = '#17202a'
const MUTED = '#87929d'
const AXIS = '#c3ccd7'

type Status = 'idle' | 'tension' | 'compression' | 'zero'

const NODES = {
  A: { x: 55, y: 95 },
  B: { x: 55, y: 250 },
  C: { x: 155, y: 95 },
  D: { x: 155, y: 250 },
  E: { x: 255, y: 95 },
  F: { x: 255, y: 250 },
  G: { x: 355, y: 95 },
  H: { x: 355, y: 250 },
}

const MEMBERS: Array<{ id: string; from: keyof typeof NODES; to: keyof typeof NODES }> = [
  { id: '1', from: 'A', to: 'C' },
  { id: '2', from: 'A', to: 'D' },
  { id: '3', from: 'B', to: 'D' },
  { id: '4', from: 'C', to: 'D' },
  { id: '5', from: 'C', to: 'E' },
  { id: '6', from: 'C', to: 'F' },
  { id: '7', from: 'D', to: 'F' },
  { id: '8', from: 'E', to: 'F' },
  { id: '9', from: 'E', to: 'G' },
  { id: '10', from: 'E', to: 'H' },
  { id: '11', from: 'F', to: 'H' },
  { id: '12', from: 'G', to: 'H' },
]

const LABELS: Array<{
  id: string
  x: number
  y: number
  text: string
  reveal: number
  anchor?: 'start' | 'middle' | 'end'
}> = [
  { id: '5', x: 205, y: 85, text: 'N₅=0', reveal: 2 },
  { id: '9', x: 305, y: 85, text: 'N₉=0', reveal: 2 },
  { id: '10', x: 298, y: 169, text: 'N₁₀=0', reveal: 2, anchor: 'end' },
  { id: '12', x: 363, y: 174, text: 'N₁₂=0', reveal: 2, anchor: 'start' },
  { id: '11', x: 305, y: 269, text: 'N₁₁=+2,00', reveal: 2 },
  { id: '8', x: 263, y: 174, text: 'N₈=−4,00', reveal: 3, anchor: 'start' },
  { id: '6', x: 212, y: 174, text: 'N₆=+4,62', reveal: 3, anchor: 'start' },
  { id: '7', x: 205, y: 269, text: 'N₇=−0,31', reveal: 3 },
  { id: '1', x: 105, y: 85, text: 'N₁=+2,31', reveal: 4 },
  { id: '2', x: 96, y: 169, text: 'N₂=+13,86', reveal: 4, anchor: 'end' },
  { id: '3', x: 105, y: 269, text: 'N₃=−7,24', reveal: 4 },
  { id: '4', x: 163, y: 174, text: 'N₄=−12,00', reveal: 4, anchor: 'start' },
]

const colorFor = (status: Status) =>
  status === 'tension' ? TENSION : status === 'compression' ? COMPRESSION : status === 'zero' ? ZERO : STEEL

const widthFor = (status: Status) => (status === 'idle' ? 4.5 : status === 'zero' ? 2.4 : 5.5)

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
      transition={{ duration: 0.35 }}
      strokeDasharray={status === 'zero' ? '9 7' : undefined}
    />
  )
}

export function FullTrussExampleAnimation({ index, playing, sceneProgress }: SolutionAnimationProps) {
  const reveal = playing ? Math.min(1, 0.5 + sceneProgress * 1.8) : 1
  const showReactions = index >= 1
  const showZeros = index >= 2
  const showF = index >= 3
  const showCD = index >= 4
  const showCut = index >= 5

  const statusOf = (id: string): Status => {
    if (id === '5' || id === '9' || id === '10' || id === '12') return showZeros ? 'zero' : 'idle'
    if (id === '11') return showZeros ? 'tension' : 'idle'
    if (id === '8' || id === '7') return showF ? 'compression' : 'idle'
    if (id === '6') return showF ? 'tension' : 'idle'
    if (id === '1' || id === '2') return showCD ? 'tension' : 'idle'
    if (id === '3' || id === '4') return showCD ? 'compression' : 'idle'
    return 'idle'
  }

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg viewBox="0 0 460 340" role="img" aria-label="Kratownica trójpanelowa z pełnym rozwiązaniem">
          <title>Kratownica trójpanelowa — reakcje, metoda węzłów i Ritter</title>
          <desc>Trzy panele, dwanaście prętów, reakcje podpór i kolorowe siły osiowe z kontrolą metodą Rittera.</desc>
          <defs>
            <marker
              id="ex-full-load"
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
              id="ex-full-react"
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
              {[0, 1, 2].map((panel) => {
                const x1 = 55 + panel * 100
                return (
                  <g key={panel}>
                    <line x1={x1} y1={291} x2={x1 + 100} y2={291} strokeDasharray="4 4" />
                    <line x1={x1} y1={286} x2={x1} y2={296} />
                    <line x1={x1 + 100} y1={286} x2={x1 + 100} y2={296} />
                    <text x={x1 + 50} y={306} textAnchor="middle" fontSize="10" stroke="none">
                      2 m
                    </text>
                  </g>
                )
              })}
              <line x1={382} y1={95} x2={382} y2={250} strokeDasharray="4 4" />
              <line x1={377} y1={95} x2={387} y2={95} />
              <line x1={377} y1={250} x2={387} y2={250} />
              <text x={390} y={176} fontSize="10" stroke="none">
                3,464 m
              </text>
              <path
                d={`M ${NODES.A.x + 30} ${NODES.A.y} A 30 30 0 0 0 ${NODES.A.x + 15} ${NODES.A.y + 26}`}
                fill="none"
                stroke={MUTED}
              />
              <text x={NODES.A.x + 36} y={NODES.A.y + 20} fontSize="10" stroke="none">
                60°
              </text>
            </g>
          )}

          {showCut && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <rect x={105} y={78} width={270} height={190} fill={CUT} opacity={0.06} />
              <line x1={105} y1={78} x2={105} y2={268} stroke={CUT} strokeWidth={2.2} strokeDasharray="10 7" />
              <text x={111} y={88} fontSize="9.5" fill={CUT}>
                przekrój 1–2–3
              </text>
              <text x={300} y={88} textAnchor="middle" fontSize="9.5" fill={CUT}>
                prawa część
              </text>
            </motion.g>
          )}

          {MEMBERS.map((member) => (
            <Member key={member.id} from={member.from} to={member.to} status={statusOf(member.id)} />
          ))}

          {LABELS.map((label) => {
            if (index < label.reveal) return null
            const status = statusOf(label.id)
            return (
              <text
                key={label.id}
                x={label.x}
                y={label.y}
                textAnchor={label.anchor ?? 'middle'}
                fontSize="9.5"
                fill={colorFor(status)}
                stroke="#ffffff"
                strokeWidth={2.6}
                paintOrder="stroke"
              >
                {label.text}
              </text>
            )
          })}

          {showReactions && (
            <motion.g initial={false} animate={{ opacity: reveal }} transition={{ duration: 0.35 }}>
              <line
                x1={NODES.A.x - 4}
                y1={NODES.A.y}
                x2={NODES.A.x - 36}
                y2={NODES.A.y}
                stroke={REACTION}
                strokeWidth={2.8}
                markerEnd="url(#ex-full-react)"
              />
              <text x={NODES.A.x - 40} y={NODES.A.y - 7} textAnchor="end" fontSize="9.5" fill={REACTION}>
                R_Ax=9,24
              </text>
              <line
                x1={NODES.A.x}
                y1={NODES.A.y - 4}
                x2={NODES.A.x}
                y2={NODES.A.y - 40}
                stroke={REACTION}
                strokeWidth={2.8}
                markerEnd="url(#ex-full-react)"
              />
              <text x={NODES.A.x + 5} y={NODES.A.y - 44} fontSize="9.5" fill={REACTION}>
                R_Ay=12
              </text>
              <line
                x1={NODES.B.x + 4}
                y1={NODES.B.y}
                x2={NODES.B.x + 40}
                y2={NODES.B.y}
                stroke={REACTION}
                strokeWidth={2.8}
                markerEnd="url(#ex-full-react)"
              />
              <text x={NODES.B.x + 45} y={NODES.B.y + 4} fontSize="9.5" fill={REACTION}>
                R_B=7,24
              </text>
            </motion.g>
          )}

          <line
            x1={NODES.C.x}
            y1={NODES.C.y - 46}
            x2={NODES.C.x}
            y2={NODES.C.y - 8}
            stroke={LOAD}
            strokeWidth={3.2}
            markerEnd="url(#ex-full-load)"
          />
          <text x={NODES.C.x - 5} y={NODES.C.y - 34} textAnchor="end" fontSize="9.5" fill={LOAD}>
            P₁=8
          </text>
          <line
            x1={NODES.E.x}
            y1={NODES.E.y - 46}
            x2={NODES.E.x}
            y2={NODES.E.y - 8}
            stroke={LOAD}
            strokeWidth={3.2}
            markerEnd="url(#ex-full-load)"
          />
          <text x={NODES.E.x + 6} y={NODES.E.y - 34} fontSize="9.5" fill={LOAD}>
            P₂=4
          </text>
          <line
            x1={NODES.H.x + 5}
            y1={NODES.H.y}
            x2={NODES.H.x + 43}
            y2={NODES.H.y}
            stroke={LOAD}
            strokeWidth={3.2}
            markerEnd="url(#ex-full-load)"
          />
          <text x={NODES.H.x + 26} y={NODES.H.y + 16} textAnchor="middle" fontSize="9.5" fill={LOAD}>
            P₃=2
          </text>

          {Object.entries(NODES).map(([name, node]) => {
            const top = node.y < 150
            return (
              <g key={name}>
                <circle cx={node.x} cy={node.y} r={4.5} fill={INK} />
                <text
                  x={name === 'A' || name === 'B' ? node.x - 9 : node.x}
                  y={top ? node.y - 8 : node.y + 16}
                  textAnchor={name === 'A' || name === 'B' ? 'end' : 'middle'}
                  fontSize="10.5"
                  fontWeight={600}
                  fill={INK}
                >
                  {name}
                </text>
              </g>
            )
          })}

          <text x="230" y="34" textAnchor="middle" fontSize="12" fill={INK}>
            {index === 0 && 'Model: trzy panele, 8 węzłów i 12 prętów'}
            {index === 1 && 'Reakcje: R_Ax w lewo, R_Ay w górę, R_B w prawo'}
            {index === 2 && 'Cztery pręty zerowe i pierwsza siła N₁₁ = +2 kN'}
            {index === 3 && 'Węzeł F: N₆ rozciągany, N₇ i N₈ ściskane'}
            {index === 4 && 'Węzły C i D: domknięcie sił w pasach i ukośnicach'}
            {showCut && 'Ritter 1–2–3: N₁=+2,309, N₂=+13,856, N₃=−7,237 kN'}
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
