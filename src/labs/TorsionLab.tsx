import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { torsionAngleDeg, torsionShearMPa } from '../lib/engineering'
import { spring } from './FundamentalsLabsShared'

export function TorsionLab() {
  const [torqueNM, setTorqueNM] = useState(600)
  const [diameterMM, setDiameterMM] = useState(60)
  const [lengthMM, setLengthMM] = useState(800)
  const shearModulusGPa = 80
  const tauMax = torsionShearMPa(torqueNM, diameterMM)
  const angleDeg = torsionAngleDeg(torqueNM, lengthMM, diameterMM, shearModulusGPa)
  const displayAngle = Math.min(60, angleDeg)
  const twistRad = (displayAngle * Math.PI) / 180
  const intensity = Math.min(1, tauMax / 250)
  const centerY = 155
  const shaftX0 = 130
  const shaftX1 = shaftX0 + 130 + ((lengthMM - 200) / 1300) * 220
  const shaftLen = shaftX1 - shaftX0
  const halfHeight = 30 + ((diameterMM - 20) / 80) * 60
  const endRx = 22
  const circleR = 45 + ((diameterMM - 20) / 80) * 45
  const torqueStroke = 2 + torqueNM / 1000
  const dimY = 274
  const supportPath = `M105 ${centerY - halfHeight - 25}L130 ${centerY - halfHeight}V${centerY + halfHeight}L105 ${centerY + halfHeight + 25}Z`
  const twistX = shaftX1 + endRx * Math.sin(twistRad)
  const twistY = centerY - halfHeight * Math.cos(twistRad)
  const twistPath = `M ${shaftX0} ${centerY} C ${shaftX0 + shaftLen * 0.45} ${centerY}, ${shaftX1 - shaftLen * 0.2} ${twistY}, ${twistX} ${twistY}`
  const arcRx = 30
  const arcRy = halfHeight + 18
  const arcPoint = (deg: number) => ({
    x: shaftX1 + arcRx * Math.cos((deg * Math.PI) / 180),
    y: centerY + arcRy * Math.sin((deg * Math.PI) / 180),
  })
  const arcA = arcPoint(130)
  const arcB = arcPoint(410)
  const actionArc = `M ${arcA.x} ${arcA.y} A ${arcRx} ${arcRy} 0 1 1 ${arcB.x} ${arcB.y}`
  const swingRad = (10 * Math.PI) / 180
  const swingX = arcRx * Math.sin(swingRad)
  const swingY = arcRy * (1 - Math.cos(swingRad))
  const swingRot = (Math.atan2(arcRy * Math.sin(swingRad), arcRx * Math.cos(swingRad)) * 180) / Math.PI
  const tauArc = `M${620 - circleR} ${165 - circleR * 0.7} A${circleR} ${circleR} 0 0 1 ${620 + circleR * 0.7} ${165 - circleR}`

  return (
    <Lab
      title="Skręcanie wału kołowego"
      instruction="Reguluj moment, średnicę i długość wału. Naprężenie styczne rośnie liniowo od środka do zewnętrznego włókna; G = 80 GPa."
      onReset={() => {
        setTorqueNM(600)
        setDiameterMM(60)
        setLengthMM(800)
      }}
      controls={
        <>
          <Control
            label="Moment skręcający T"
            value={torqueNM}
            min={0}
            max={2000}
            step={50}
            unit="N·m"
            onChange={setTorqueNM}
          />
          <Control
            label="Średnica d"
            value={diameterMM}
            min={20}
            max={100}
            step={5}
            unit="mm"
            onChange={setDiameterMM}
          />
          <Control label="Długość L" value={lengthMM} min={200} max={1500} step={50} unit="mm" onChange={setLengthMM} />
        </>
      }
      metrics={
        <>
          <Metric label="Maksymalne τ na obwodzie" value={fmt(tauMax)} unit="MPa" tone="accent" />
          <Metric label="Kąt skręcenia φ" value={fmt(angleDeg, 2)} unit="°" />
          <Metric label="Kąt φ" value={fmt((angleDeg * Math.PI) / 180, 3)} unit="rad" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 760 330"
          width="100%"
          role="img"
          aria-label="Skręcany walec i przekrój kołowy z rozkładem naprężeń stycznych"
        >
          <title>Skręcanie wału</title>
          <desc>
            Linia odniesienia na walcu pokazuje przemieszczenie skrętne. Strzałka momentu porusza się po linii działania
            wokół wału. Kolor przekroju nasyca się wraz z maksymalnym naprężeniem.
          </desc>
          <defs>
            <linearGradient id="shaft-fill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#c3cdf9" />
              <stop offset="0.45" stopColor="#4f6df5" />
              <stop offset="1" stopColor="#3155d9" />
            </linearGradient>
            <radialGradient id="torsion-tau">
              <stop stopColor="#4f6df5" stopOpacity="0.25" />
              <stop offset="1" stopColor={`hsl(${205 - intensity * 205} 80% 52%)`} stopOpacity="0.95" />
            </radialGradient>
            <marker
              id="torsion-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10z" fill="#ff6b45" />
            </marker>
          </defs>
          <text x="280" y="30" textAnchor="middle" fontSize="16" fill="currentColor">
            Wał: d = {diameterMM} mm, L = {lengthMM} mm
          </text>
          <motion.path
            d={supportPath}
            animate={{ d: supportPath }}
            transition={spring}
            fill="currentColor"
            opacity="0.25"
          />
          <motion.rect
            x="130"
            fill="url(#shaft-fill)"
            animate={{ y: centerY - halfHeight, width: shaftLen, height: 2 * halfHeight }}
            transition={spring}
          />
          <motion.ellipse
            cx="130"
            cy={centerY}
            rx={endRx}
            fill="#8fa4f8"
            animate={{ ry: halfHeight }}
            transition={spring}
          />
          <motion.ellipse
            cx={shaftX1}
            cy={centerY}
            rx={endRx}
            fill="#3155d9"
            animate={{ cx: shaftX1, ry: halfHeight }}
            transition={spring}
          />
          <motion.line
            x1={shaftX0}
            y1={centerY}
            y2={centerY}
            stroke="white"
            strokeDasharray="4 4"
            opacity="0.35"
            animate={{ x2: shaftX1 }}
            transition={spring}
          />
          <motion.line
            y1={centerY}
            y2={centerY - halfHeight}
            stroke="white"
            strokeOpacity="0.35"
            strokeDasharray="4 4"
            animate={{ x1: shaftX1, x2: shaftX1, y2: centerY - halfHeight }}
            transition={spring}
          />
          {displayAngle > 0.5 && (
            <motion.line
              y1={centerY}
              stroke="#ff6b45"
              strokeWidth="2.5"
              strokeDasharray="5 4"
              animate={{ x1: shaftX1, x2: twistX, y2: twistY }}
              transition={spring}
            />
          )}
          <motion.path
            d={twistPath}
            animate={{ d: twistPath }}
            fill="none"
            stroke="#1b2350"
            strokeWidth="7.5"
            strokeLinecap="round"
            opacity="0.85"
            transition={spring}
          />
          <motion.path
            d={twistPath}
            animate={{ d: twistPath }}
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            markerEnd="url(#torsion-arrow)"
            transition={spring}
          />
          <motion.text
            fontSize="12"
            fill="white"
            opacity="0.9"
            animate={{ x: shaftX0 + 14, y: centerY + 24 }}
            transition={spring}
          >
            linia odniesienia
          </motion.text>
          <motion.path
            d={actionArc}
            animate={{ d: actionArc }}
            transition={spring}
            fill="none"
            stroke="#ff6b45"
            strokeWidth="2"
            strokeDasharray="6 6"
            opacity="0.55"
          />
          <motion.g animate={{ x: shaftX1, y: centerY - arcRy, opacity: torqueNM === 0 ? 0.3 : 1 }} transition={spring}>
            <motion.g
              animate={{ x: [-swingX, 0, swingX, 0], y: [swingY, 0, swingY, 0], rotate: [-swingRot, 0, swingRot, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.line
                x1={-16}
                y1={0}
                x2={12}
                y2={0}
                stroke="#ff6b45"
                strokeWidth={torqueStroke}
                markerEnd="url(#torsion-arrow)"
                animate={{ strokeWidth: torqueStroke }}
                transition={spring}
              />
              <circle cx={-16} cy={0} r="3" fill="#ff6b45" />
            </motion.g>
          </motion.g>
          <motion.text
            fontSize="15"
            fill="#ff6b45"
            animate={{ x: shaftX1 + arcRx + 8, y: centerY - arcRy * 0.75 }}
            transition={spring}
          >
            T = {torqueNM} N·m
          </motion.text>
          <motion.line
            x1={shaftX0}
            y1={dimY}
            y2={dimY}
            stroke="currentColor"
            animate={{ x2: shaftX1 }}
            transition={spring}
          />
          <line x1={shaftX0} y1={dimY - 8} x2={shaftX0} y2={dimY + 8} stroke="currentColor" />
          <motion.line
            y1={dimY - 8}
            y2={dimY + 8}
            stroke="currentColor"
            animate={{ x1: shaftX1, x2: shaftX1 }}
            transition={spring}
          />
          <motion.text
            y={dimY + 24}
            textAnchor="middle"
            fontSize="13"
            fill="currentColor"
            animate={{ x: (shaftX0 + shaftX1) / 2 }}
            transition={spring}
          >
            L = {lengthMM} mm
          </motion.text>
          <text x="280" y="318" textAnchor="middle" fontSize="12" fill="currentColor">
            Linia odniesienia: wizualizacja do 60° · φ wyniku: {fmt(angleDeg, 2)}°
          </text>
          <text x="620" y="65" textAnchor="middle" fontSize="15" fill="currentColor">
            Przekrój: τ(r) = τmax·r/R
          </text>
          <motion.circle
            cx="620"
            cy="165"
            fill="url(#torsion-tau)"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ r: circleR }}
            transition={spring}
          />
          {Array.from({ length: 8 }, (_, index) => {
            const angle = (index * Math.PI) / 4
            return (
              <motion.line
                key={index}
                x1="620"
                y1="165"
                stroke="white"
                strokeOpacity="0.5"
                animate={{
                  x2: 620 + Math.cos(angle) * (circleR - 4),
                  y2: 165 + Math.sin(angle) * (circleR - 4),
                  strokeWidth: 1 + intensity * 1.5,
                }}
                transition={spring}
              />
            )
          })}
          <circle cx="620" cy="165" r="4" fill="white" />
          <motion.path
            d={tauArc}
            animate={{ d: tauArc }}
            fill="none"
            stroke="#ff6b45"
            strokeWidth="3"
            markerEnd="url(#torsion-arrow)"
            transition={spring}
          />
          <text x="620" y="268" textAnchor="middle" fontSize="13" fill="currentColor">
            τ = 0 w środku · τmax na obwodzie
          </text>
        </svg>
      }
    />
  )
}
