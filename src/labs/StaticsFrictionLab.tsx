import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { criticalFrictionAngleDeg, inclineFrictionState } from '../lib/statics'
import { staticsColors, staticsMarker } from './StaticsLabsShared'

export function StaticsFrictionLab() {
  const [weightN, setWeightN] = useState(200)
  const [angleDeg, setAngleDeg] = useState(25)
  const [coefficient, setCoefficient] = useState(0.35)

  const state = inclineFrictionState(weightN, angleDeg, coefficient)
  const criticalAngle = criticalFrictionAngleDeg(coefficient)
  const angleRad = (angleDeg * Math.PI) / 180
  const maxSpan = 500
  const maxRise = 215
  const rampCenterX = 370
  const span = Math.min(maxSpan, maxRise / Math.max(Math.tan(angleRad), 0.0001))
  const rise = span * Math.tan(angleRad)
  const baseLeft = { x: rampCenterX - span / 2, y: 265 }
  const baseRight = { x: rampCenterX + span / 2, y: 265 }
  const top = { x: baseRight.x, y: baseRight.y - rise }
  const blockX = baseLeft.x + span * 0.46
  const blockY = baseLeft.y - (blockX - baseLeft.x) * Math.tan(angleRad)

  return (
    <Lab
      title="Tarcie suche na równi pochyłej"
      instruction="Klocek na równi jest w spoczynku, dopóki składowa styczna ciężaru nie przekroczy tarcia maksymalnego T_max = μN. Zwiększaj kąt i obserwuj moment utraty równowagi. Kąt graniczny spełnia tan α = μ."
      onReset={() => {
        setWeightN(200)
        setAngleDeg(25)
        setCoefficient(0.35)
      }}
      controls={
        <>
          <Control label="Ciężar G" value={weightN} min={50} max={600} step={10} unit="N" onChange={setWeightN} />
          <Control label="Kąt nachylenia α" value={angleDeg} min={0} max={60} unit="°" onChange={setAngleDeg} />
          <Control
            label="Współczynnik μ"
            value={coefficient}
            min={0}
            max={0.9}
            step={0.05}
            unit="—"
            onChange={setCoefficient}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Siła normalna N = G·cos α" value={fmt(state.normal, 1)} unit="N" />
          <Metric label="Tarcie maksymalne T_max = μN" value={fmt(state.frictionMax, 1)} unit="N" />
          <Metric label="Składowa styczna G·sin α" value={fmt(state.driving, 1)} unit="N" />
          <Metric
            label="Stan"
            value={state.sliding ? 'poślizg w dół' : 'równowaga'}
            unit={
              state.sliding ? `μ_min = ${fmt(state.driving / state.normal, 2)}` : `α_gr = ${fmt(criticalAngle, 1)}°`
            }
            tone="accent"
          />
        </>
      }
      visual={
        <svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Klocek na równi pochyłej z siłami tarcia">
          <title>Tarcie na równi pochyłej</title>
          <desc>Klocek, ciężar, reakcja normalna i siła tarcia na równi o zadanym kącie.</desc>
          <defs>
            {staticsMarker('fric-weight', staticsColors.force)}
            {staticsMarker('fric-normal', staticsColors.reaction)}
            {staticsMarker('fric-friction', staticsColors.compression)}
          </defs>
          <line
            x1="60"
            y1={baseLeft.y}
            x2="670"
            y2={baseLeft.y}
            stroke={staticsColors.axis}
            strokeWidth="1"
            strokeDasharray="5 6"
          />
          <path
            d={`M${baseLeft.x} ${baseLeft.y} L${top.x} ${top.y} L${baseRight.x} ${baseRight.y} Z`}
            fill="currentColor"
            opacity="0.1"
          />
          <line x1={baseLeft.x} y1={baseLeft.y} x2={top.x} y2={top.y} stroke="currentColor" strokeWidth="4" />
          <line
            x1={baseLeft.x}
            y1={baseLeft.y}
            x2={baseRight.x}
            y2={baseRight.y}
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.5"
          />
          <line
            x1={top.x}
            y1={top.y}
            x2={baseRight.x}
            y2={baseRight.y}
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.5"
          />
          <g transform={`rotate(${-angleDeg} ${blockX} ${blockY})`}>
            <rect x={blockX - 26} y={blockY - 38} width="52" height="38" rx="4" fill="currentColor" opacity="0.3" />
            <line
              x1={blockX}
              y1={blockY - 34}
              x2={blockX}
              y2={blockY - 14}
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <line
              x1={blockX - 18}
              y1={blockY - 24}
              x2={blockX + 18}
              y2={blockY - 24}
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </g>
          <line
            x1={blockX}
            y1={blockY - 22}
            x2={blockX}
            y2={blockY - 22 + 86}
            stroke={staticsColors.force}
            strokeWidth="3"
            markerEnd="url(#fric-weight)"
          />
          <text x={blockX + 8} y={blockY + 78} fontSize="13" fill={staticsColors.force}>
            G = {weightN} N
          </text>
          <line
            x1={blockX}
            y1={blockY - 24}
            x2={blockX - 78 * Math.sin(angleRad)}
            y2={blockY - 24 - 78 * Math.cos(angleRad)}
            stroke={staticsColors.reaction}
            strokeWidth="3"
            markerEnd="url(#fric-normal)"
          />
          <text
            x={blockX - 92 * Math.sin(angleRad) - 8}
            y={blockY - 32 - 92 * Math.cos(angleRad)}
            textAnchor="end"
            fontSize="13"
            fill={staticsColors.reaction}
          >
            N
          </text>
          <line
            x1={blockX}
            y1={blockY - 6}
            x2={blockX + 70 * Math.cos(angleRad)}
            y2={blockY - 6 - 70 * Math.sin(angleRad)}
            stroke={staticsColors.compression}
            strokeWidth="3"
            markerEnd="url(#fric-friction)"
          />
          <text
            x={blockX + 76 * Math.cos(angleRad)}
            y={blockY - 12 - 76 * Math.sin(angleRad)}
            textAnchor="middle"
            fontSize="13"
            fill={staticsColors.compression}
          >
            T = {fmt(state.friction, 1)} N
          </text>
          <text x="360" y="312" textAnchor="middle" fontSize="13" fill="currentColor">
            {state.sliding
              ? `G·sin α = ${fmt(state.driving, 1)} N > T_max = ${fmt(state.frictionMax, 1)} N — klocek zsuwa się.`
              : `G·sin α = ${fmt(state.driving, 1)} N ≤ T_max = ${fmt(state.frictionMax, 1)} N — tarcie utrzymuje równowagę.`}
          </text>
        </svg>
      }
    />
  )
}
