import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { memberForcesAtJoint } from '../lib/statics'
import { staticsColors, staticsMarker, staticsSpring } from './StaticsLabsShared'
import { motion } from 'motion/react'

export function StaticsTrussLab() {
  const [spanM, setSpanM] = useState(4)
  const [heightM, setHeightM] = useState(2)
  const [loadKN, setLoadKN] = useState(12)

  const half = spanM / 2
  const diagonalLength = Math.hypot(half, heightM)
  const directionCA = { x: -half / diagonalLength, y: -heightM / diagonalLength }
  const directionCB = { x: half / diagonalLength, y: -heightM / diagonalLength }
  const joint = memberForcesAtJoint({ x: 0, y: -loadKN }, directionCA, directionCB)
  const diagonal = joint.n1
  const reaction = loadKN / 2
  const bottomChord = (loadKN * spanM) / (4 * heightM)
  const angleDeg = (Math.atan2(heightM, half) * 180) / Math.PI

  const scale = Math.min(480 / spanM, 150 / heightM)
  const baseY = 235
  const centerX = 340
  const left = { x: centerX - half * scale, y: baseY }
  const right = { x: centerX + half * scale, y: baseY }
  const apex = { x: centerX, y: baseY - heightM * scale }
  const colorFor = (force: number) =>
    Math.abs(force) < 0.05 ? staticsColors.neutral : force > 0 ? staticsColors.tension : staticsColors.compression

  return (
    <Lab
      title="Kratownica trójkątna: metoda węzłów"
      instruction="Obciążenie P w wierzchołku rozkłada się na dwa pasy skośne i pas dolny. Reakcje są równe P/2, pasy skośne są ściskane, a pas dolny rozciągany. Zmieniaj wysokość i rozpiętość, aby zobaczyć, jak kąt zmienia siły w prętach."
      onReset={() => {
        setSpanM(4)
        setHeightM(2)
        setLoadKN(12)
      }}
      controls={
        <>
          <Control label="Rozpiętość L" value={spanM} min={2} max={8} step={0.5} unit="m" onChange={setSpanM} />
          <Control label="Wysokość h" value={heightM} min={1} max={5} step={0.5} unit="m" onChange={setHeightM} />
          <Control label="Obciążenie P" value={loadKN} min={2} max={30} unit="kN" onChange={setLoadKN} />
        </>
      }
      metrics={
        <>
          <Metric label="Reakcje RA = RB" value={fmt(reaction, 2)} unit="kN" />
          <Metric
            label="Pas skośny (AC = BC)"
            value={`${fmt(Math.abs(diagonal), 2)} ${diagonal < 0 ? 'ściskanie' : 'rozciąganie'}`}
            unit="kN"
            tone="accent"
          />
          <Metric label="Pas dolny AB" value={fmt(bottomChord, 2)} unit="kN, rozciąganie" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 330"
          width="100%"
          role="img"
          aria-label="Trójkątna kratownica z obciążeniem w wierzchołku"
        >
          <title>Kratownica trójkątna</title>
          <desc>Dwa pasy skośne i pas dolny, obciążenie w wierzchołku oraz reakcje podporowe.</desc>
          <defs>
            {staticsMarker('truss-load', staticsColors.force)}
            {staticsMarker('truss-react', staticsColors.reaction)}
          </defs>
          <line
            x1="60"
            y1={baseY}
            x2="680"
            y2={baseY}
            stroke={staticsColors.axis}
            strokeWidth="1"
            strokeDasharray="5 6"
          />
          <motion.line
            x1={left.x}
            y1={left.y}
            x2={apex.x}
            y2={apex.y}
            stroke={colorFor(diagonal)}
            strokeWidth="7"
            strokeLinecap="round"
            animate={{ x2: apex.x, y2: apex.y }}
            transition={staticsSpring}
          />
          <motion.line
            x1={right.x}
            y1={right.y}
            x2={apex.x}
            y2={apex.y}
            stroke={colorFor(joint.n2)}
            strokeWidth="7"
            strokeLinecap="round"
            animate={{ x2: apex.x, y2: apex.y }}
            transition={staticsSpring}
          />
          <line
            x1={left.x}
            y1={left.y}
            x2={right.x}
            y2={right.y}
            stroke={colorFor(bottomChord)}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <text
            x={(left.x + right.x) / 2}
            y={baseY - 12}
            textAnchor="middle"
            fontSize="12"
            fill={colorFor(bottomChord)}
            stroke="#f8f9fa"
            strokeWidth="3"
            paintOrder="stroke"
          >
            AB = {fmt(bottomChord, 2)} kN
          </text>
          {[left, right, apex].map((node, index) => (
            <g key={index}>
              <circle cx={node.x} cy={node.y} r="6" fill="currentColor" />
            </g>
          ))}
          <text x={left.x - 8} y={left.y + 24} textAnchor="middle" fontSize="13" fill="currentColor">
            A
          </text>
          <text x={right.x + 8} y={right.y + 24} textAnchor="middle" fontSize="13" fill="currentColor">
            B
          </text>
          <text x={apex.x} y={apex.y - 14} textAnchor="middle" fontSize="13" fill="currentColor">
            C
          </text>
          <line
            x1={apex.x}
            y1={apex.y - 58}
            x2={apex.x}
            y2={apex.y - 16}
            stroke={staticsColors.force}
            strokeWidth="4"
            markerEnd="url(#truss-load)"
          />
          <text x={apex.x + 10} y={apex.y - 66} fontSize="14" fill={staticsColors.force}>
            P = {loadKN} kN
          </text>
          <line
            x1={left.x}
            y1={left.y + 55}
            x2={left.x}
            y2={left.y + 15}
            stroke={staticsColors.reaction}
            strokeWidth="3"
            markerEnd="url(#truss-react)"
          />
          <text x={left.x - 10} y={left.y + 52} textAnchor="end" fontSize="12" fill={staticsColors.reaction}>
            RA = {fmt(reaction, 1)} kN
          </text>
          <line
            x1={right.x}
            y1={right.y + 55}
            x2={right.x}
            y2={right.y + 15}
            stroke={staticsColors.reaction}
            strokeWidth="3"
            markerEnd="url(#truss-react)"
          />
          <text x={right.x + 10} y={right.y + 52} textAnchor="start" fontSize="12" fill={staticsColors.reaction}>
            RB = {fmt(reaction, 1)} kN
          </text>
          <text x="680" y="36" textAnchor="end" fontSize="12" fill="currentColor">
            α = {fmt(angleDeg, 1)}°
          </text>
          <rect x="52" y="24" width="14" height="14" fill={staticsColors.tension} />
          <text x="74" y="36" fontSize="12" fill="currentColor">
            rozciąganie
          </text>
          <rect x="160" y="24" width="14" height="14" fill={staticsColors.compression} />
          <text x="182" y="36" fontSize="12" fill="currentColor">
            ściskanie
          </text>
          <text x="360" y="318" textAnchor="middle" fontSize="13" fill="currentColor">
            Węzeł C: 2·N·sin α + P = 0, więc N = −P/(2 sin α). Im niższa kratownica, tym większa siła w pasach.
          </text>
        </svg>
      }
    />
  )
}
