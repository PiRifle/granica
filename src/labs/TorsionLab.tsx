import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { torsionAngleDeg, torsionShearMPa } from '../lib/engineering'

export function TorsionLab() {
  const [torqueNM, setTorqueNM] = useState(600)
  const [diameterMM, setDiameterMM] = useState(60)
  const [lengthMM, setLengthMM] = useState(800)
  const shearModulusGPa = 80
  const tauMax = torsionShearMPa(torqueNM, diameterMM)
  const angleDeg = torsionAngleDeg(torqueNM, lengthMM, diameterMM, shearModulusGPa)
  const displayAngle = Math.min(60, angleDeg)
  const wave = Math.min(48, displayAngle * 0.8)
  const twistPath = `M 130 155 C 215 ${155 - wave}, 335 ${155 + wave}, 430 155`
  const intensity = Math.min(1, tauMax / 250)
  const halfHeight = 30 + ((diameterMM - 20) / 80) * 60
  const circleR = 45 + ((diameterMM - 20) / 80) * 45
  const torqueStroke = 2 + torqueNM / 1000
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
            Linia na walcu pokazuje kierunek skręcenia. Kolor przekroju nasyca się wraz z maksymalnym naprężeniem.
          </desc>
          <defs>
            <linearGradient id="shaft-fill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#a8c5df" />
              <stop offset="0.45" stopColor="#4f86c6" />
              <stop offset="1" stopColor="#285a88" />
            </linearGradient>
            <radialGradient id="torsion-tau">
              <stop stopColor="#457b9d" stopOpacity="0.25" />
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
              <path d="M0 0L10 5L0 10z" fill="#e76f51" />
            </marker>
          </defs>
          <text x="280" y="30" textAnchor="middle" fontSize="16" fill="currentColor">
            Wał: d = {diameterMM} mm, L = {lengthMM} mm
          </text>
          <path d="M105 70L130 95V215L105 240Z" fill="currentColor" opacity="0.25" />
          <motion.rect
            x="130"
            width="300"
            fill="url(#shaft-fill)"
            animate={{ y: 155 - halfHeight, height: 2 * halfHeight }}
          />
          <motion.ellipse cx="130" cy="155" rx="22" fill="#729fc7" animate={{ ry: halfHeight }} />
          <motion.ellipse cx="430" cy="155" rx="22" fill="#376f9f" animate={{ ry: halfHeight }} />
          <path d="M130 155H430" stroke="white" strokeDasharray="4 4" opacity="0.35" />
          <motion.path
            d={twistPath}
            animate={{ d: twistPath }}
            fill="none"
            stroke="#ffe66d"
            strokeWidth="4"
            strokeLinecap="round"
            transition={{ type: 'spring', stiffness: 130, damping: 22 }}
          />
          <motion.path
            d="M405 65C445 40 490 65 475 105"
            fill="none"
            stroke="#e76f51"
            strokeWidth={torqueStroke}
            markerEnd="url(#torsion-arrow)"
            animate={{ strokeWidth: torqueStroke }}
          />
          <text x="470" y="48" fontSize="15" fill="#e76f51">
            T = {torqueNM} N·m
          </text>
          <line x1="130" y1="251" x2="430" y2="251" stroke="currentColor" />
          <line x1="130" y1="243" x2="130" y2="259" stroke="currentColor" />
          <line x1="430" y1="243" x2="430" y2="259" stroke="currentColor" />
          <text x="280" y="275" textAnchor="middle" fontSize="13" fill="currentColor">
            L = {lengthMM} mm
          </text>
          <text x="280" y="302" textAnchor="middle" fontSize="12" fill="currentColor">
            Linia skręcenia: wizualizacja do 60° · φ wyniku: {fmt(angleDeg, 2)}°
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
          />
          {Array.from({ length: 8 }, (_, index) => {
            const angle = (index * Math.PI) / 4
            return (
              <line
                key={index}
                x1="620"
                y1="165"
                x2={620 + Math.cos(angle) * (circleR - 4)}
                y2={165 + Math.sin(angle) * (circleR - 4)}
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth={1 + intensity * 1.5}
              />
            )
          })}
          <circle cx="620" cy="165" r="4" fill="white" />
          <motion.path
            d={tauArc}
            animate={{ d: tauArc }}
            fill="none"
            stroke="#e76f51"
            strokeWidth="3"
            markerEnd="url(#torsion-arrow)"
          />
          <text x="620" y="268" textAnchor="middle" fontSize="13" fill="currentColor">
            τ = 0 w środku · τmax na obwodzie
          </text>
        </svg>
      }
    />
  )
}
