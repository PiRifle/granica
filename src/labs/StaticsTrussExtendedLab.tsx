import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { threePanelTrussForces } from '../lib/statics'
import { staticsColors, staticsMarker } from './StaticsLabsShared'

const topY = 60
const bottomY = 260
const panelPx = (bottomY - topY) / Math.sqrt(3)
const leftX = 360 - (3 * panelPx) / 2
const node = (column: number, top: boolean) => ({
  x: leftX + column * panelPx,
  y: top ? topY : bottomY,
})

const NODES = {
  A: node(0, true),
  B: node(0, false),
  C: node(1, true),
  D: node(1, false),
  E: node(2, true),
  F: node(2, false),
  G: node(3, true),
  H: node(3, false),
}

type NodeKey = keyof typeof NODES

const MEMBERS: Array<{ id: number; from: NodeKey; to: NodeKey }> = [
  { id: 1, from: 'A', to: 'C' },
  { id: 2, from: 'A', to: 'D' },
  { id: 3, from: 'B', to: 'D' },
  { id: 4, from: 'C', to: 'D' },
  { id: 5, from: 'C', to: 'E' },
  { id: 6, from: 'C', to: 'F' },
  { id: 7, from: 'D', to: 'F' },
  { id: 8, from: 'E', to: 'F' },
  { id: 9, from: 'E', to: 'G' },
  { id: 10, from: 'E', to: 'H' },
  { id: 11, from: 'F', to: 'H' },
  { id: 12, from: 'G', to: 'H' },
]

const memberColor = (force: number) =>
  Math.abs(force) < 0.05 ? staticsColors.neutral : force > 0 ? staticsColors.tension : staticsColors.compression

const memberWidth = (force: number) => (Math.abs(force) < 0.05 ? 3.5 : 6)

const formatForce = (force: number) => {
  if (Math.abs(force) < 0.05) {
    return '0'
  }
  return `${force > 0 ? '+' : '−'}${fmt(Math.abs(force), 1)}`
}

const labelFor = (from: NodeKey, to: NodeKey) => {
  const start = NODES[from]
  const end = NODES[to]
  const middleX = (start.x + end.x) / 2
  const middleY = (start.y + end.y) / 2
  if (Math.abs(start.y - end.y) < 0.5) {
    return { x: middleX, y: start.y === topY ? topY - 9 : bottomY + 18, anchor: 'middle' as const }
  }
  if (Math.abs(start.x - end.x) < 0.5) {
    return { x: middleX - 8, y: middleY + 4, anchor: 'end' as const }
  }
  return { x: middleX - 10, y: middleY + 26, anchor: 'middle' as const }
}

export function StaticsTrussExtendedLab() {
  const [p1, setP1] = useState(8)
  const [p2, setP2] = useState(4)
  const [p3, setP3] = useState(2)

  const solution = threePanelTrussForces(p1, p2, p3)
  const { rax, ray, rb } = solution.reactions
  const p3Direction = p3 < 0 ? -1 : 1
  const rbDirection = rb < 0 ? -1 : 1

  return (
    <Lab
      title="Kratownica trójpanelowa: siły w prętach"
      instruction="Trzy panele, osiem węzłów i dwanaście prętów. Ustaw obciążenia P₁, P₂ i P₃, a zobaczysz reakcje oraz znaki sił w każdym pręcie. Kolor niebieski oznacza rozciąganie, brązowy ściskanie, szary pręt zerowy."
      onReset={() => {
        setP1(8)
        setP2(4)
        setP3(2)
      }}
      controls={
        <>
          <Control label="Obciążenie P₁ (węzeł C)" value={p1} min={0} max={20} unit="kN" onChange={setP1} />
          <Control label="Obciążenie P₂ (węzeł E)" value={p2} min={0} max={20} unit="kN" onChange={setP2} />
          <Control label="Obciążenie P₃ (węzeł H)" value={p3} min={-10} max={10} unit="kN" onChange={setP3} />
        </>
      }
      metrics={
        <>
          <Metric label="Reakcja RAx" value={fmt(Math.abs(rax), 2)} unit="kN w lewo" />
          <Metric label="Reakcja RAy" value={fmt(ray, 2)} unit="kN w górę" tone="accent" />
          <Metric
            label="Reakcja RB"
            value={fmt(Math.abs(rb), 2)}
            unit={Math.abs(rb) < 0.005 ? 'kN' : rb > 0 ? 'kN w prawo' : 'kN w lewo'}
          />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 330"
          width="100%"
          role="img"
          aria-label="Kratownica trójpanelowa z obciążeniami i siłami w prętach"
        >
          <title>Kratownica trójpanelowa</title>
          <desc>Trzy panele, osiem węzłów i dwanaście prętów z siłami osiowymi oraz reakcjami podpór.</desc>
          <defs>
            {staticsMarker('trussx-load', staticsColors.force)}
            {staticsMarker('trussx-react', staticsColors.reaction)}
          </defs>
          {MEMBERS.map((member, index) => {
            const force = solution.forces[index] ?? 0
            const start = NODES[member.from]
            const end = NODES[member.to]
            return (
              <line
                key={member.id}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={memberColor(force)}
                strokeWidth={memberWidth(force)}
                strokeLinecap="round"
              />
            )
          })}
          {Object.entries(NODES).map(([name, point]) => (
            <circle key={name} cx={point.x} cy={point.y} r="5" fill="currentColor" />
          ))}
          {MEMBERS.map((member, index) => {
            const force = solution.forces[index] ?? 0
            const label = labelFor(member.from, member.to)
            return (
              <text
                key={`force-${member.id}`}
                x={label.x}
                y={label.y}
                textAnchor={label.anchor}
                fontSize="10.5"
                fill={memberColor(force)}
                stroke="#f8f9fa"
                strokeWidth="3"
                paintOrder="stroke"
              >
                {formatForce(force)}
              </text>
            )
          })}
          <text x="20" y="27" fontSize="11" fill="currentColor">
            α = 60° · siły w kN
          </text>
          <g fontSize="10.5" fill="currentColor">
            <rect x="620" y="12" width="11" height="11" fill={staticsColors.tension} />
            <text x="636" y="21">
              rozciąganie
            </text>
            <rect x="620" y="28" width="11" height="11" fill={staticsColors.compression} />
            <text x="636" y="37">
              ściskanie
            </text>
            <rect x="620" y="44" width="11" height="11" fill={staticsColors.neutral} />
            <text x="636" y="53">
              zero
            </text>
          </g>
          <text x={NODES.A.x - 8} y={NODES.A.y + 16} textAnchor="end" fontSize="11" fill="currentColor">
            A
          </text>
          <text x={NODES.B.x - 8} y={NODES.B.y + 16} textAnchor="end" fontSize="11" fill="currentColor">
            B
          </text>
          <text x={NODES.C.x - 8} y={NODES.C.y - 8} textAnchor="end" fontSize="11" fill="currentColor">
            C
          </text>
          <text x={NODES.D.x - 8} y={NODES.D.y + 16} textAnchor="end" fontSize="11" fill="currentColor">
            D
          </text>
          <text x={NODES.E.x - 8} y={NODES.E.y - 8} textAnchor="end" fontSize="11" fill="currentColor">
            E
          </text>
          <text x={NODES.F.x - 8} y={NODES.F.y + 16} textAnchor="end" fontSize="11" fill="currentColor">
            F
          </text>
          <text x={NODES.G.x + 8} y={NODES.G.y - 8} fontSize="11" fill="currentColor">
            G
          </text>
          <text x={NODES.H.x - 8} y={NODES.H.y + 16} textAnchor="end" fontSize="11" fill="currentColor">
            H
          </text>

          <line
            x1={NODES.C.x}
            y1={topY - 55}
            x2={NODES.C.x}
            y2={topY - 8}
            stroke={staticsColors.force}
            strokeWidth="3.5"
            markerEnd="url(#trussx-load)"
          />
          <text x={NODES.C.x + 8} y="24" fontSize="11" fill={staticsColors.force}>
            P₁ = {fmt(p1, 1)} kN
          </text>
          <line
            x1={NODES.E.x}
            y1={topY - 55}
            x2={NODES.E.x}
            y2={topY - 8}
            stroke={staticsColors.force}
            strokeWidth="3.5"
            markerEnd="url(#trussx-load)"
          />
          <text x={NODES.E.x + 8} y="24" fontSize="11" fill={staticsColors.force}>
            P₂ = {fmt(p2, 1)} kN
          </text>
          {Math.abs(p3) > 0.005 && (
            <line
              x1={NODES.H.x + p3Direction * 6}
              y1={NODES.H.y}
              x2={NODES.H.x + p3Direction * 55}
              y2={NODES.H.y}
              stroke={staticsColors.force}
              strokeWidth="3.5"
              markerEnd="url(#trussx-load)"
            />
          )}
          <text
            x={NODES.H.x + p3Direction * 30}
            y={NODES.H.y - 12}
            textAnchor="middle"
            fontSize="11"
            fill={staticsColors.force}
          >
            P₃ = {fmt(p3, 1)} kN
          </text>

          <line
            x1={NODES.A.x - 6}
            y1={NODES.A.y}
            x2={NODES.A.x - 55}
            y2={NODES.A.y}
            stroke={staticsColors.reaction}
            strokeWidth="3"
            markerEnd="url(#trussx-react)"
          />
          <text x={NODES.A.x - 30} y={NODES.A.y - 8} textAnchor="middle" fontSize="11" fill={staticsColors.reaction}>
            RAx = {fmt(Math.abs(rax), 1)} kN
          </text>
          <line
            x1={NODES.A.x}
            y1={NODES.A.y - 6}
            x2={NODES.A.x}
            y2={NODES.A.y - 55}
            stroke={staticsColors.reaction}
            strokeWidth="3"
            markerEnd="url(#trussx-react)"
          />
          <text x={NODES.A.x + 7} y={NODES.A.y - 30} fontSize="11" fill={staticsColors.reaction}>
            RAy = {fmt(ray, 1)} kN
          </text>
          <line
            x1={NODES.B.x}
            y1={NODES.B.y}
            x2={NODES.B.x + rbDirection * 55}
            y2={NODES.B.y}
            stroke={staticsColors.reaction}
            strokeWidth="3"
            markerEnd="url(#trussx-react)"
          />
          <text
            x={NODES.B.x + rbDirection * 30}
            y={NODES.B.y + 38}
            textAnchor="middle"
            fontSize="11"
            fill={staticsColors.reaction}
          >
            RB = {fmt(Math.abs(rb), 1)} kN
          </text>

          <text x="360" y="318" textAnchor="middle" fontSize="12.5" fill="currentColor">
            RAy = P₁ + P₂ · RAx = −(P₁ + 2P₂)/√3 · RB = (P₁ + 2P₂)/√3 − P₃
          </text>
        </svg>
      }
    />
  )
}
