import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { mohrCircle } from '../lib/engineering'

export function MohrLab() {
  const [sigmaX, setSigmaX] = useState(80)
  const [sigmaY, setSigmaY] = useState(20)
  const [tauXY, setTauXY] = useState(40)
  const circle = mohrCircle(sigmaX, sigmaY, tauXY)
  const padding = Math.max(10, circle.radiusMPa * 0.25)
  const minSigma = Math.min(0, circle.sigma2MPa) - padding
  const maxSigma = Math.max(0, circle.sigma1MPa) + padding
  const maxTau = Math.max(10, circle.radiusMPa * 1.25)
  const scale = Math.min(560 / (maxSigma - minSigma), 120 / maxTau)
  const originX = 80 - minSigma * scale
  const originY = 155
  const centerX = originX + circle.centerMPa * scale
  const radius = Math.max(1.5, circle.radiusMPa * scale)
  const pointAX = originX + sigmaX * scale
  const pointAY = originY - tauXY * scale
  const pointBX = originX + sigmaY * scale
  const pointBY = originY + tauXY * scale
  const sigma1X = originX + circle.sigma1MPa * scale
  const sigma2X = originX + circle.sigma2MPa * scale
  const sigmaTicks = Array.from({ length: 5 }, (_, index) => minSigma + ((maxSigma - minSigma) * index) / 4)

  return (
    <Lab
      title="Koło Mohra dla stanu płaskiego"
      instruction="Ustaw σx, σy i τxy. Koło pokazuje wszystkie orientacje przekroju; przecięcia z osią σ wyznaczają naprężenia główne."
      onReset={() => {
        setSigmaX(80)
        setSigmaY(20)
        setTauXY(40)
      }}
      controls={
        <>
          <Control
            label="Naprężenie normalne σx"
            value={sigmaX}
            min={-50}
            max={150}
            step={5}
            unit="MPa"
            onChange={setSigmaX}
          />
          <Control
            label="Naprężenie normalne σy"
            value={sigmaY}
            min={-100}
            max={100}
            step={5}
            unit="MPa"
            onChange={setSigmaY}
          />
          <Control
            label="Naprężenie styczne τxy"
            value={tauXY}
            min={0}
            max={100}
            step={5}
            unit="MPa"
            onChange={setTauXY}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Naprężenie główne σ₁" value={fmt(circle.sigma1MPa)} unit="MPa" tone="accent" />
          <Metric label="Naprężenie główne σ₂" value={fmt(circle.sigma2MPa)} unit="MPa" />
          <Metric label="Maksymalne τmax = R" value={fmt(circle.maxShearMPa)} unit="MPa" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 330"
          width="100%"
          role="img"
          aria-label="Koło Mohra na osiach naprężenia normalnego i stycznego"
        >
          <title>Koło Mohra</title>
          <desc>Punkty A i B odpowiadają stanom na przekrojach x i y. C jest środkiem, a R promieniem koła.</desc>
          <line x1="65" y1={originY} x2="680" y2={originY} stroke="currentColor" strokeWidth="1.5" />
          <line x1={originX} y1="25" x2={originX} y2="285" stroke="currentColor" strokeWidth="1.5" />
          <path d="M680 155l-10-5v10z" fill="currentColor" />
          <path d={`M${originX} 25l-5 10h10z`} fill="currentColor" />
          <text x="687" y="160" fontSize="16" fill="currentColor">
            σ
          </text>
          <text x={originX + 9} y="32" fontSize="16" fill="currentColor">
            τ
          </text>
          {sigmaTicks.map((tick, index) => (
            <g key={index}>
              <line
                x1={originX + tick * scale}
                y1={originY - 4}
                x2={originX + tick * scale}
                y2={originY + 4}
                stroke="currentColor"
                opacity="0.55"
              />
              <text x={originX + tick * scale} y={originY + 21} textAnchor="middle" fontSize="11" fill="currentColor">
                {fmt(tick, 0)}
              </text>
            </g>
          ))}
          {[-maxTau, maxTau].map((tick) => (
            <g key={tick}>
              <line
                x1={originX - 4}
                y1={originY - tick * scale}
                x2={originX + 4}
                y2={originY - tick * scale}
                stroke="currentColor"
                opacity="0.55"
              />
              <text x={originX - 9} y={originY - tick * scale + 4} textAnchor="end" fontSize="11" fill="currentColor">
                {fmt(tick, 0)}
              </text>
            </g>
          ))}
          <motion.circle
            cx={centerX}
            cy={originY}
            r={radius}
            animate={{ cx: centerX, cy: originY, r: radius }}
            fill="#4f6df5"
            fillOpacity="0.12"
            stroke="#4f6df5"
            strokeWidth="3"
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          />
          <motion.line
            x1={centerX}
            y1={originY}
            x2={pointAX}
            y2={pointAY}
            animate={{ x1: centerX, y1: originY, x2: pointAX, y2: pointAY }}
            stroke="#e0a14b"
            strokeWidth="2"
            strokeDasharray="5 4"
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          />
          <motion.line
            x1={pointAX}
            y1={pointAY}
            x2={pointBX}
            y2={pointBY}
            animate={{ x1: pointAX, y1: pointAY, x2: pointBX, y2: pointBY }}
            stroke="currentColor"
            strokeOpacity="0.3"
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          />
          <motion.circle
            r="6"
            fill="#ff6b45"
            animate={{ cx: pointAX, cy: pointAY }}
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          />
          <motion.circle
            r="6"
            fill="#e0a14b"
            animate={{ cx: pointBX, cy: pointBY }}
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          />
          <motion.circle
            r="5"
            fill="currentColor"
            animate={{ cx: centerX, cy: originY }}
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          />
          <circle cx={sigma1X} cy={originY} r="5" fill="#27835a" />
          <circle cx={sigma2X} cy={originY} r="5" fill="#27835a" />
          <text x={pointAX + 9} y={pointAY - 9} fontSize="13" fill="#ff6b45">
            A(σx, τxy)
          </text>
          <text x={pointBX + 9} y={pointBY + 17} fontSize="13" fill="#e0a14b">
            B(σy, −τxy)
          </text>
          <text x={centerX} y={originY - 11} textAnchor="middle" fontSize="13" fill="currentColor">
            C = {fmt(circle.centerMPa)} MPa
          </text>
          <text
            x={(centerX + pointAX) / 2}
            y={(originY + pointAY) / 2 - 8}
            textAnchor="middle"
            fontSize="13"
            fill="#e0a14b"
          >
            R = {fmt(circle.radiusMPa)} MPa
          </text>
          <text x={sigma1X} y={originY - 12} textAnchor="middle" fontSize="13" fill="#27835a">
            σ₁
          </text>
          <text x={sigma2X} y={originY - 12} textAnchor="middle" fontSize="13" fill="#27835a">
            σ₂
          </text>
          <text x="360" y="315" textAnchor="middle" fontSize="12" fill="currentColor">
            σ [MPa] · τ [MPa] · wspólna skala osi; dodatnie τ powyżej osi σ
          </text>
        </svg>
      }
    />
  )
}
