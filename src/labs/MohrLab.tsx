import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { mohrCircle } from '../lib/engineering'

function Arrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const back = 9
  const spread = 0.45
  const p1x = x2 - back * Math.cos(angle - spread)
  const p1y = y2 - back * Math.sin(angle - spread)
  const p2x = x2 - back * Math.cos(angle + spread)
  const p2y = y2 - back * Math.sin(angle + spread)
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" />
      <polygon points={`${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}`} fill={color} />
    </g>
  )
}

export function MohrLab() {
  const [sigmaX, setSigmaX] = useState(80)
  const [sigmaY, setSigmaY] = useState(20)
  const [tauXY, setTauXY] = useState(40)
  const [theta, setTheta] = useState(20)
  const circle = mohrCircle(sigmaX, sigmaY, tauXY)
  const padding = Math.max(10, circle.radiusMPa * 0.25)
  const minSigma = Math.min(0, circle.sigma2MPa) - padding
  const maxSigma = Math.max(0, circle.sigma1MPa) + padding
  const maxTau = Math.max(10, circle.radiusMPa * 1.25)
  const scale = Math.min(470 / (maxSigma - minSigma), 130 / maxTau)
  const originX = 300 - minSigma * scale
  const originY = 185
  const centerX = originX + circle.centerMPa * scale
  const radius = Math.max(1.5, circle.radiusMPa * scale)
  const pointAX = originX + sigmaX * scale
  const pointAY = originY - tauXY * scale
  const pointBX = originX + sigmaY * scale
  const pointBY = originY + tauXY * scale
  const sigma1X = originX + circle.sigma1MPa * scale
  const sigma2X = originX + circle.sigma2MPa * scale
  const sigmaTicks = Array.from({ length: 5 }, (_, index) => minSigma + ((maxSigma - minSigma) * index) / 4)

  const thetaRad = (theta * Math.PI) / 180
  const phiA = Math.atan2(tauXY, (sigmaX - sigmaY) / 2)
  const thetaPDeg = (phiA * 90) / Math.PI
  const sigmaTheta =
    circle.centerMPa + ((sigmaX - sigmaY) / 2) * Math.cos(2 * thetaRad) + tauXY * Math.sin(2 * thetaRad)
  const tauTheta = -((sigmaX - sigmaY) / 2) * Math.sin(2 * thetaRad) + tauXY * Math.cos(2 * thetaRad)
  const pointPX = originX + sigmaTheta * scale
  const pointPY = originY - tauTheta * scale
  const phiP = phiA - 2 * thetaRad
  const arcLabelR = Math.max(50, radius * 0.9)
  const arcPR = Math.max(54, radius * 0.72)
  const phiB = phiA + Math.PI
  const aLabelR = radius + 34
  const bLabelR = radius + 34
  const showArcs = circle.radiusMPa > 0.5

  const elementCX = 130
  const elementCY = 180
  const elementHalf = 44
  const faceLeft = elementCX - elementHalf
  const faceRight = elementCX + elementHalf
  const faceTop = elementCY - elementHalf
  const faceBottom = elementCY + elementHalf
  const sigmaXOut = sigmaX >= 0
  const sigmaYOut = sigmaY >= 0

  return (
    <Lab
      title="Koło Mohra dla stanu płaskiego"
      instruction="Ustaw σx, σy i τxy, potem obracaj przekrój kątem θ. Konstrukcja: 1) punkty A(σx, τxy) i B(σy, −τxy) opisują ściany kostki, 2) środek C = (σx+σy)/2, a promień R to odcinek CA, 3) przecięcia koła z osią σ dają naprężenia główne σ1 i σ2, najwyższy punkt to τmax, 4) obrotowi przekroju o θ odpowiada obrót o 2θ po kole — śledź punkt P."
      onReset={() => {
        setSigmaX(80)
        setSigmaY(20)
        setTauXY(40)
        setTheta(20)
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
          <Control label="Obrót przekroju θ" value={theta} min={0} max={90} step={5} unit="°" onChange={setTheta} />
        </>
      }
      metrics={
        <>
          <Metric label="Naprężenie główne σ₁" value={fmt(circle.sigma1MPa)} unit="MPa" tone="accent" />
          <Metric label="Naprężenie główne σ₂" value={fmt(circle.sigma2MPa)} unit="MPa" />
          <Metric label="Maksymalne τmax = R" value={fmt(circle.maxShearMPa)} unit="MPa" />
          <Metric label="Kierunek główny θp" value={fmt(thetaPDeg)} unit="°" />
          <Metric label="σθ na przekroju P" value={fmt(sigmaTheta)} unit="MPa" />
          <Metric label="τθ na przekroju P" value={fmt(tauTheta)} unit="MPa" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 860 450"
          width="100%"
          role="img"
          aria-label="Kostka naprężona i koło Mohra na osiach naprężenia normalnego i stycznego"
        >
          <title>Koło Mohra</title>
          <desc>
            Kostka z naprężeniami σx, σy i τxy oraz koło Mohra: punkty A i B odpowiadają ścianom kostki, C to środek, R
            promień, σ1 i σ2 naprężenia główne, τmax maksymalne naprężenie styczne, a punkt P stan na przekroju
            obróconym o kąt θ, co na kole oznacza obrót o 2θ.
          </desc>
          <text x={elementCX} y="58" textAnchor="middle" fontSize="13" fill="currentColor">
            Kostka naprężona
          </text>
          <rect
            x={faceLeft}
            y={faceTop}
            width={elementHalf * 2}
            height={elementHalf * 2}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {sigmaXOut ? (
            <>
              <Arrow x1={faceRight} y1={elementCY} x2={faceRight + 32} y2={elementCY} color="#ff6b45" />
              <Arrow x1={faceLeft} y1={elementCY} x2={faceLeft - 32} y2={elementCY} color="#ff6b45" />
            </>
          ) : (
            <>
              <Arrow x1={faceRight + 32} y1={elementCY} x2={faceRight} y2={elementCY} color="#ff6b45" />
              <Arrow x1={faceLeft - 32} y1={elementCY} x2={faceLeft} y2={elementCY} color="#ff6b45" />
            </>
          )}
          {sigmaYOut ? (
            <>
              <Arrow x1={elementCX} y1={faceTop} x2={elementCX} y2={faceTop - 32} color="#e0a14b" />
              <Arrow x1={elementCX} y1={faceBottom} x2={elementCX} y2={faceBottom + 32} color="#e0a14b" />
            </>
          ) : (
            <>
              <Arrow x1={elementCX} y1={faceTop - 32} x2={elementCX} y2={faceTop} color="#e0a14b" />
              <Arrow x1={elementCX} y1={faceBottom + 32} x2={elementCX} y2={faceBottom} color="#e0a14b" />
            </>
          )}
          {tauXY > 0 && (
            <>
              <Arrow x1={faceRight + 7} y1={elementCY + 22} x2={faceRight + 7} y2={elementCY - 22} color="#4f6df5" />
              <Arrow x1={elementCX - 22} y1={faceTop - 7} x2={elementCX + 22} y2={faceTop - 7} color="#4f6df5" />
              <Arrow x1={faceLeft - 7} y1={elementCY - 22} x2={faceLeft - 7} y2={elementCY + 22} color="#4f6df5" />
              <Arrow x1={elementCX + 22} y1={faceBottom + 7} x2={elementCX - 22} y2={faceBottom + 7} color="#4f6df5" />
              <text x={elementCX - 26} y={faceTop - 11} textAnchor="end" fontSize="13" fill="#4f6df5">
                τxy
              </text>
            </>
          )}
          <text x={faceRight + 36} y={elementCY + 4} fontSize="13" fill="#ff6b45">
            σx
          </text>
          <text x={elementCX + 7} y={faceTop - 36} fontSize="13" fill="#e0a14b">
            σy
          </text>
          {theta > 0 && (
            <g transform={`rotate(${-theta} ${elementCX} ${elementCY})`}>
              <rect
                x={faceLeft}
                y={faceTop}
                width={elementHalf * 2}
                height={elementHalf * 2}
                fill="none"
                stroke="#4f6df5"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <Arrow x1={faceRight + 4} y1={elementCY} x2={faceRight + 36} y2={elementCY} color="#4f6df5" />
              {tauTheta >= 0 ? (
                <Arrow
                  x1={faceRight + 11}
                  y1={elementCY + 20}
                  x2={faceRight + 11}
                  y2={elementCY - 20}
                  color="#4f6df5"
                />
              ) : (
                <Arrow
                  x1={faceRight + 11}
                  y1={elementCY - 20}
                  x2={faceRight + 11}
                  y2={elementCY + 20}
                  color="#4f6df5"
                />
              )}
              <text x={faceRight + 40} y={elementCY + 4} fontSize="13" fill="#4f6df5">
                σθ
              </text>
            </g>
          )}
          {theta > 0 && (
            <>
              <path
                d={`M ${elementCX + 26} ${elementCY} A 26 26 0 0 0 ${elementCX + 26 * Math.cos(thetaRad)} ${elementCY - 26 * Math.sin(thetaRad)}`}
                fill="none"
                stroke="#4f6df5"
                strokeWidth="1.5"
              />
              <text
                x={elementCX + 40 * Math.cos(thetaRad / 2)}
                y={elementCY - 40 * Math.sin(thetaRad / 2)}
                fontSize="13"
                fill="#4f6df5"
              >
                θ
              </text>
            </>
          )}
          <text x={elementCX} y="292" textAnchor="middle" fontSize="12.5" fill="#ff6b45">
            σx, τxy na ścianie x → punkt A
          </text>
          <text x={elementCX} y="310" textAnchor="middle" fontSize="12.5" fill="#e0a14b">
            σy, −τxy na ścianie y → punkt B
          </text>
          <text x={elementCX} y="328" textAnchor="middle" fontSize="12.5" fill="#4f6df5">
            przekrój obrócony o θ → punkt P
          </text>
          <line x1="280" y1={originY} x2="820" y2={originY} stroke="currentColor" strokeWidth="1.5" />
          <line x1={originX} y1="40" x2={originX} y2="330" stroke="currentColor" strokeWidth="1.5" />
          <path d={`M820 ${originY}l-10-5v10z`} fill="currentColor" />
          <path d={`M${originX} 40l-5 10h10z`} fill="currentColor" />
          <text x="827" y={originY + 5} fontSize="16" fill="currentColor">
            σ
          </text>
          <text x={originX + 9} y="47" fontSize="16" fill="currentColor">
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
          {theta > 0 && (
            <motion.line
              x1={centerX}
              y1={originY}
              x2={pointPX}
              y2={pointPY}
              animate={{ x1: centerX, y1: originY, x2: pointPX, y2: pointPY }}
              stroke="#4f6df5"
              strokeWidth="2"
              strokeDasharray="5 4"
              transition={{ type: 'spring', stiffness: 150, damping: 24 }}
            />
          )}
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
          <motion.line
            x1={centerX}
            y1={originY}
            x2={centerX}
            y2={originY - radius}
            animate={{ x1: centerX, y1: originY, x2: centerX, y2: originY - radius }}
            stroke="#27835a"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          />
          {showArcs && phiA > 0.02 && (
            <>
              <path
                d={`M ${centerX + 30 * Math.cos(phiA)} ${originY - 30 * Math.sin(phiA)} A 30 30 0 0 1 ${centerX + 30} ${originY}`}
                fill="none"
                stroke="#27835a"
                strokeWidth="1.5"
              />
              <text
                x={centerX + (radius + 40) * Math.cos(phiA / 2)}
                y={originY - (radius + 40) * Math.sin(phiA / 2) - 6}
                fontSize="13"
                fill="#27835a"
              >
                2θp
              </text>
            </>
          )}
          {showArcs && theta > 0 && (
            <>
              <path
                d={`M ${centerX + 54 * Math.cos(phiA)} ${originY - 54 * Math.sin(phiA)} A 54 54 0 0 1 ${centerX + 54 * Math.cos(phiP)} ${originY - 54 * Math.sin(phiP)}`}
                fill="none"
                stroke="#4f6df5"
                strokeWidth="1.5"
              />
              <text
                x={centerX + (radius + 8) * Math.cos(phiA - thetaRad)}
                y={originY - (radius + 8) * Math.sin(phiA - thetaRad) - 10}
                fontSize="13"
                fill="#4f6df5"
              >
                2θ
              </text>
            </>
          )}
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
          <motion.circle
            r="5.5"
            fill="#27835a"
            animate={{ cx: centerX, cy: originY - radius }}
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          />
          <motion.circle
            r="11"
            fill="none"
            stroke="#4f6df5"
            strokeWidth="1.5"
            animate={{ cx: pointPX, cy: pointPY }}
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          />
          <motion.circle
            r="5"
            fill="#4f6df5"
            animate={{ cx: pointPX, cy: pointPY }}
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          />
          <text
            x={centerX + aLabelR * Math.cos(phiA)}
            y={originY - aLabelR * Math.sin(phiA)}
            textAnchor="middle"
            fontSize="12"
            fill="#ff6b45"
          >
            A
          </text>
          <text
            x={centerX + bLabelR * Math.cos(phiB)}
            y={originY - bLabelR * Math.sin(phiB)}
            textAnchor="middle"
            fontSize="12"
            fill="#e0a14b"
          >
            B
          </text>
          <text x={centerX - 10} y={originY - 12} textAnchor="end" fontSize="13" fill="currentColor">
            C = {fmt(circle.centerMPa)} MPa
          </text>
          <text
            x={centerX + 0.38 * (pointAX - centerX)}
            y={originY + 0.38 * (pointAY - originY) - 8}
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
          <motion.text
            fontSize="13"
            fill="#27835a"
            animate={{ x: centerX + 10, y: originY - radius + 4 }}
            transition={{ type: 'spring', stiffness: 150, damping: 24 }}
          >
            τmax
          </motion.text>
          <text
            x={centerX + (radius + 18) * Math.cos(phiP)}
            y={originY - (radius + 18) * Math.sin(phiP) - 18}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#4f6df5"
          >
            P
          </text>
          <text x="550" y="352" textAnchor="middle" fontSize="12" fill="currentColor">
            σ [MPa] · τ [MPa] · wspólna skala osi; dodatnie τ powyżej osi σ
          </text>
          <circle cx="40" cy="424" r="5" fill="#ff6b45" />
          <text x="52" y="428" fontSize="12" fill="currentColor">
            A(σx, τxy) — ściana x
          </text>
          <circle cx="250" cy="424" r="5" fill="#e0a14b" />
          <text x="262" y="428" fontSize="12" fill="currentColor">
            B(σy, −τxy) — ściana y
          </text>
          <circle cx="470" cy="424" r="5" fill="#27835a" />
          <text x="482" y="428" fontSize="12" fill="currentColor">
            σ1, σ2, τmax — wielkości główne
          </text>
          <circle cx="700" cy="424" r="5" fill="#4f6df5" />
          <text x="712" y="428" fontSize="12" fill="currentColor">
            P — stan po obrocie θ
          </text>
        </svg>
      }
    />
  )
}
