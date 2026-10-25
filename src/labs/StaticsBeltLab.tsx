import { useState } from 'react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { beltTensionEuler, degToRad } from '../lib/statics'
import { staticsColors, staticsMarker } from './StaticsLabsShared'

export function StaticsBeltLab() {
  const [tightN, setTightN] = useState(200)
  const [coefficient, setCoefficient] = useState(0.3)
  const [wrapDeg, setWrapDeg] = useState(180)

  const wrapRad = degToRad(wrapDeg)
  const slackN = beltTensionEuler(tightN, coefficient, wrapRad)
  const ratio = slackN / tightN
  const center = { x: 360, y: 138 }
  const radius = 88
  const branchLength = 78
  const startAngle = -Math.PI / 2 - wrapRad / 2
  const revolutions = wrapRad / (2 * Math.PI)
  const layerSpacing = 14
  const steps = Math.max(48, Math.ceil(wrapDeg / 4))
  const pointOnWrap = (progress: number) => {
    const angle = startAngle + wrapRad * progress
    const currentRadius = radius + layerSpacing * Math.max(0, revolutions * progress - 1)
    return { x: center.x + currentRadius * Math.cos(angle), y: center.y + currentRadius * Math.sin(angle) }
  }
  const wrapPoints = Array.from({ length: steps + 1 }, (_, index) => pointOnWrap(index / steps))
  const wrapPath = wrapPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  const wrapStart = wrapPoints[0]
  const wrapEnd = wrapPoints[wrapPoints.length - 1]
  const branchDirection = (point: { x: number; y: number }, side: number) => {
    const rx = (point.x - center.x) / (Math.hypot(point.x - center.x, point.y - center.y) || 1)
    const ry = (point.y - center.y) / (Math.hypot(point.x - center.x, point.y - center.y) || 1)
    const dx = rx + side
    const dy = ry + 1.1
    const length = Math.hypot(dx, dy) || 1
    return { x: dx / length, y: dy / length }
  }
  const tightSide = wrapStart.x < center.x ? -1 : 1
  const slackSide = wrapEnd.x > center.x ? 1 : -1
  const tightDirection = branchDirection(wrapStart, tightSide)
  const slackDirection = branchDirection(wrapEnd, slackSide)
  const tightEnd = {
    x: wrapStart.x + tightDirection.x * branchLength,
    y: wrapStart.y + tightDirection.y * branchLength,
  }
  const slackEnd = {
    x: wrapEnd.x + slackDirection.x * branchLength,
    y: wrapEnd.y + slackDirection.y * branchLength,
  }

  return (
    <Lab
      title="Tarcie cięgna o bęben — wzór Eulera"
      instruction="Cięgno opasuje bęben o kącie θ. Stosunek sił w gałęzi napinającej i luźnej rośnie wykładniczo: T₂ = T₁·e^(μθ). Kąt musisz wyrazić w radianach; zwiększ opasanie lub tarcie, aby zobaczyć lawinowy wzrost."
      onReset={() => {
        setTightN(200)
        setCoefficient(0.3)
        setWrapDeg(180)
      }}
      controls={
        <>
          <Control
            label="Siła w gałęzi napinającej T₁"
            value={tightN}
            min={50}
            max={800}
            step={10}
            unit="N"
            onChange={setTightN}
          />
          <Control
            label="Współczynnik μ"
            value={coefficient}
            min={0}
            max={0.8}
            step={0.05}
            unit="—"
            onChange={setCoefficient}
          />
          <Control label="Kąt opasania θ" value={wrapDeg} min={30} max={540} step={15} unit="°" onChange={setWrapDeg} />
        </>
      }
      metrics={
        <>
          <Metric label="Kąt w radianach" value={fmt(wrapRad, 2)} unit="rad" />
          <Metric label="Siła w gałęzi luźnej T₂" value={fmt(slackN, 1)} unit="N" tone="accent" />
          <Metric label="Stosunek T₂/T₁ = e^(μθ)" value={fmt(ratio, 2)} unit="—" />
        </>
      }
      visual={
        <svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Cięgno opasujące bęben i siły w gałęziach">
          <title>Tarcie cięgna o bęben</title>
          <desc>Bęben, kąt opasania, siła napinająca i luźna oraz wzór Eulera.</desc>
          <defs>
            {staticsMarker('belt-tight', staticsColors.force)}
            {staticsMarker('belt-slack', staticsColors.reaction)}
          </defs>
          <circle cx={center.x} cy={center.y} r={radius} fill="currentColor" opacity="0.12" />
          <path
            d={wrapPath}
            fill="none"
            stroke={staticsColors.compression}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={center.x}
            cy={center.y}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1={wrapStart.x}
            y1={wrapStart.y}
            x2={tightEnd.x}
            y2={tightEnd.y}
            stroke={staticsColors.force}
            strokeWidth="6"
            strokeLinecap="round"
            markerEnd="url(#belt-tight)"
          />
          <line
            x1={wrapEnd.x}
            y1={wrapEnd.y}
            x2={slackEnd.x}
            y2={slackEnd.y}
            stroke={staticsColors.reaction}
            strokeWidth="6"
            strokeLinecap="round"
            markerEnd="url(#belt-slack)"
          />
          <text x="20" y="26" fontSize="14" fill={staticsColors.force}>
            T₁ = {tightN} N
          </text>
          <text x="700" y="26" textAnchor="end" fontSize="14" fill={staticsColors.reaction}>
            T₂ = {fmt(slackN, 1)} N
          </text>
          <text x={center.x + 10} y={center.y - 50} fontSize="13" fill={staticsColors.accent}>
            θ = {wrapDeg}°
          </text>
          <circle cx={center.x} cy={center.y} r="8" fill="currentColor" />
          <text x={center.x} y={center.y + 5} textAnchor="middle" fontSize="11" fill="#fff">
            O
          </text>
          <text x="360" y="318" textAnchor="middle" fontSize="13" fill="currentColor">
            T₂ = T₁·e^(μθ) = {tightN}·e^({coefficient}·{fmt(wrapRad, 2)}) = {fmt(slackN, 1)} N
          </text>
        </svg>
      }
    />
  )
}
