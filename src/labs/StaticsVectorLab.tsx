import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { angle2Deg, magnitude2, resultantConcurrent, vector2 } from '../lib/statics'
import { staticsColors, staticsMarker, staticsSpring } from './StaticsLabsShared'
import { motion } from 'motion/react'

const origin = { x: 210, y: 255 }
const scale = 5

function point(vector: { x: number; y: number }) {
  return { x: origin.x + vector.x * scale, y: origin.y - vector.y * scale }
}

export function StaticsVectorLab() {
  const [firstMagnitude, setFirstMagnitude] = useState(30)
  const [firstAngle, setFirstAngle] = useState(25)
  const [secondMagnitude, setSecondMagnitude] = useState(20)
  const [secondAngle, setSecondAngle] = useState(120)

  const first = vector2(firstMagnitude, firstAngle)
  const second = vector2(secondMagnitude, secondAngle)
  const resultant = resultantConcurrent([
    { magnitude: firstMagnitude, angleDeg: firstAngle },
    { magnitude: secondMagnitude, angleDeg: secondAngle },
  ])
  const firstEnd = point(first)
  const secondEnd = point(second)
  const resultantEnd = point(resultant)
  const parallelogramEnd = point({ x: first.x + second.x, y: first.y + second.y })

  return (
    <Lab
      title="Składanie dwóch sił: równoległobok i wypadkowa"
      instruction="Zmieniaj moduły i kąty obu sił. Wypadkowa to przekątna równoległoboku zbudowanego na wektorach sił — jej składowe są sumami odpowiednich składowych."
      onReset={() => {
        setFirstMagnitude(30)
        setFirstAngle(25)
        setSecondMagnitude(20)
        setSecondAngle(120)
      }}
      controls={
        <>
          <Control label="Moduł F₁" value={firstMagnitude} min={5} max={45} unit="kN" onChange={setFirstMagnitude} />
          <Control label="Kąt F₁" value={firstAngle} min={0} max={180} step={5} unit="°" onChange={setFirstAngle} />
          <Control label="Moduł F₂" value={secondMagnitude} min={5} max={45} unit="kN" onChange={setSecondMagnitude} />
          <Control label="Kąt F₂" value={secondAngle} min={0} max={180} step={5} unit="°" onChange={setSecondAngle} />
        </>
      }
      metrics={
        <>
          <Metric label="Wypadkowa R" value={fmt(magnitude2(resultant), 2)} unit="kN" tone="accent" />
          <Metric label="Kąt wypadkowej" value={fmt(angle2Deg(resultant), 1)} unit="°" />
          <Metric
            label="Składowe R"
            value={`${fmt(resultant.x, 1)} / ${fmt(resultant.y, 1)}`}
            unit="kN"
          />
        </>
      }
      visual={
        <svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Równoległobok sił i wypadkowa">
          <title>Składanie dwóch sił metodą równoległoboku</title>
          <desc>Dwie siły zaczepione w jednym punkcie, ich równoległobok i wypadkowa.</desc>
          <defs>
            {staticsMarker('vec-f1', staticsColors.force)}
            {staticsMarker('vec-f2', staticsColors.compression)}
            {staticsMarker('vec-r', staticsColors.reaction)}
          </defs>
          <line x1="60" y1={origin.y} x2="660" y2={origin.y} stroke={staticsColors.axis} strokeWidth="1.5" />
          <line x1={origin.x} y1="30" x2={origin.x} y2="310" stroke={staticsColors.axis} strokeWidth="1.5" />
          <text x="650" y={origin.y - 8} fontSize="13" fill="currentColor">
            x
          </text>
          <text x={origin.x + 8} y="42" fontSize="13" fill="currentColor">
            y
          </text>
          <line
            x1={firstEnd.x}
            y1={firstEnd.y}
            x2={parallelogramEnd.x}
            y2={parallelogramEnd.y}
            stroke={staticsColors.compression}
            strokeWidth="2"
            strokeDasharray="6 5"
            opacity="0.65"
          />
          <line
            x1={secondEnd.x}
            y1={secondEnd.y}
            x2={parallelogramEnd.x}
            y2={parallelogramEnd.y}
            stroke={staticsColors.force}
            strokeWidth="2"
            strokeDasharray="6 5"
            opacity="0.65"
          />
          <motion.line
            x1={origin.x}
            y1={origin.y}
            x2={resultantEnd.x}
            y2={resultantEnd.y}
            stroke={staticsColors.reaction}
            strokeWidth="4"
            markerEnd="url(#vec-r)"
            animate={{ x2: resultantEnd.x, y2: resultantEnd.y }}
            transition={staticsSpring}
          />
          <motion.line
            x1={origin.x}
            y1={origin.y}
            x2={firstEnd.x}
            y2={firstEnd.y}
            stroke={staticsColors.force}
            strokeWidth="4"
            markerEnd="url(#vec-f1)"
            animate={{ x2: firstEnd.x, y2: firstEnd.y }}
            transition={staticsSpring}
          />
          <motion.line
            x1={origin.x}
            y1={origin.y}
            x2={secondEnd.x}
            y2={secondEnd.y}
            stroke={staticsColors.compression}
            strokeWidth="4"
            markerEnd="url(#vec-f2)"
            animate={{ x2: secondEnd.x, y2: secondEnd.y }}
            transition={staticsSpring}
          />
          <circle cx={origin.x} cy={origin.y} r="5" fill="currentColor" />
          <text x={origin.x - 14} y={origin.y + 20} fontSize="13" fill="currentColor">
            O
          </text>
          <text x={firstEnd.x + 8} y={firstEnd.y - 8} fontSize="14" fill={staticsColors.force}>
            F₁ = {firstMagnitude} kN
          </text>
          <text x={secondEnd.x + 8} y={secondEnd.y - 8} fontSize="14" fill={staticsColors.compression}>
            F₂ = {secondMagnitude} kN
          </text>
          <text x={resultantEnd.x + 8} y={resultantEnd.y + 18} fontSize="14" fill={staticsColors.reaction}>
            R = {fmt(magnitude2(resultant), 1)} kN
          </text>
          <text x="360" y="316" textAnchor="middle" fontSize="13" fill="currentColor">
            R = F₁ + F₂, składowe sumują się oddzielnie: Rx = F₁x + F₂x, Ry = F₁y + F₂y
          </text>
        </svg>
      }
    />
  )
}
