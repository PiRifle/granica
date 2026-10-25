import { useState } from 'react'
import { Control, Lab, Metric, Segmented, fmt } from '../components/UI'
import { degToRad, momentOfForceAboutPoint } from '../lib/statics'
import { staticsColors, staticsMarker } from './StaticsLabsShared'

type Direction = 'counter' | 'clockwise'

export function StaticsMomentLab() {
  const [forceKN, setForceKN] = useState(10)
  const [distanceM, setDistanceM] = useState(3)
  const [angleDeg, setAngleDeg] = useState(60)
  const [direction, setDirection] = useState<Direction>('counter')

  const momentKNM = momentOfForceAboutPoint(forceKN, distanceM, angleDeg) / 1000
  const signedMoment = direction === 'counter' ? momentKNM : -momentKNM
  const origin = { x: 180, y: 220 }
  const pixelsPerM = 90
  const application = { x: origin.x + distanceM * pixelsPerM, y: origin.y }
  const angle = degToRad(angleDeg)
  const outward = direction === 'counter' ? -1 : 1
  const forceTip = {
    x: application.x + outward * 80 * Math.sin(angle),
    y: application.y - 80 * Math.cos(angle),
  }
  const perpendicularDistance = distanceM * Math.sin(angle)

  return (
    <Lab
      title="Moment siły względem punktu"
      instruction="Moment zależy od siły, odległości i kąta między ramieniem a siłą: M = F·d·sin α. Przesuwaj punkt przyłożenia i zmieniaj kierunek siły — moment znika, gdy linia działania przechodzi przez punkt O."
      onReset={() => {
        setForceKN(10)
        setDistanceM(3)
        setAngleDeg(60)
        setDirection('counter')
      }}
      controls={
        <>
          <Control label="Siła F" value={forceKN} min={1} max={30} unit="kN" onChange={setForceKN} />
          <Control label="Odległość d" value={distanceM} min={0.5} max={5} step={0.5} unit="m" onChange={setDistanceM} />
          <Control label="Kąt α" value={angleDeg} min={0} max={180} step={5} unit="°" onChange={setAngleDeg} />
          <Segmented
            label="Zwrot momentu"
            value={direction}
            options={[
              { value: 'counter', label: 'Przeciwnie' },
              { value: 'clockwise', label: 'Zgodnie' },
            ]}
            onChange={setDirection}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Ramię d·sin α" value={fmt(perpendicularDistance, 2)} unit="m" />
          <Metric label="Moment M = F·d·sin α" value={fmt(Math.abs(signedMoment), 2)} unit="kN·m" tone="accent" />
          <Metric label="Znak" value={signedMoment >= 0 ? '+' : '−'} unit="przeciwnie do zegara" />
        </>
      }
      visual={
        <svg viewBox="0 0 720 330" width="100%" role="img" aria-label="Moment siły względem punktu">
          <title>Moment siły względem punktu</title>
          <desc>Ramię, linia działania siły i moment względem punktu O.</desc>
          <defs>
            {staticsMarker('moment-force', staticsColors.force)}
            {staticsMarker('moment-arm', staticsColors.reaction)}
          </defs>
          <line x1="50" y1={origin.y} x2="680" y2={origin.y} stroke={staticsColors.axis} strokeWidth="1" strokeDasharray="4 6" />
          <line x1={origin.x} y1={origin.y} x2={application.x} y2={application.y} stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <circle cx={origin.x} cy={origin.y} r="7" fill="currentColor" />
          <text x={origin.x - 6} y={origin.y + 26} fontSize="14" fill="currentColor">
            O
          </text>
          <circle cx={application.x} cy={application.y} r="5" fill={staticsColors.force} />
          <line
            x1={application.x}
            y1={application.y}
            x2={forceTip.x}
            y2={forceTip.y}
            stroke={staticsColors.force}
            strokeWidth="4"
            markerEnd="url(#moment-force)"
          />
          <line
            x1={application.x - 180 * Math.sin(angle)}
            y1={application.y + 180 * Math.cos(angle)}
            x2={application.x + 180 * Math.sin(angle)}
            y2={application.y - 180 * Math.cos(angle)}
            stroke={staticsColors.force}
            strokeWidth="1.5"
            strokeDasharray="6 5"
            opacity="0.5"
          />
          <path
            d={`M ${origin.x + 38} ${origin.y} A 38 38 0 0 ${signedMoment >= 0 ? 1 : 0} ${origin.x} ${origin.y - 38}`}
            fill="none"
            stroke={staticsColors.reaction}
            strokeWidth="3"
          />
          <text x={origin.x + 46} y={origin.y - 44} fontSize="14" fill={staticsColors.reaction}>
            M = {fmt(Math.abs(signedMoment), 2)} kN·m
          </text>
          <text x={application.x + 8} y={application.y - 88} fontSize="14" fill={staticsColors.force}>
            F = {forceKN} kN
          </text>
          <text x={(origin.x + application.x) / 2} y={origin.y + 26} textAnchor="middle" fontSize="13" fill="currentColor">
            d = {fmt(distanceM, 1)} m
          </text>
          <text x="360" y="316" textAnchor="middle" fontSize="13" fill="currentColor">
            M = F·d·sin α = {forceKN}·{fmt(distanceM, 1)}·sin {angleDeg}° = {fmt(Math.abs(momentKNM), 2)} kN·m
          </text>
        </svg>
      }
    />
  )
}
