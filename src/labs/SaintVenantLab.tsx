import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { stressMPa } from '../lib/engineering'
import { spring } from './FundamentalsLabsShared'

export function SaintVenantLab() {
  const [forceKN, setForceKN] = useState(24)
  const [widthMM, setWidthMM] = useState(20)
  const [distanceMM, setDistanceMM] = useState(60)
  const areaMM2 = widthMM ** 2
  const nominalMPa = stressMPa(forceKN, areaMM2)
  const concentration = Math.exp(-distanceMM / (0.75 * widthMM))
  const rawProfile = Array.from({ length: 17 }, (_, index) => {
    const y = -1 + index / 8
    return 1 + 4 * concentration * Math.exp(-4 * y ** 2)
  })
  const profileMean = rawProfile.reduce((sum, value) => sum + value, 0) / rawProfile.length
  const profile = rawProfile.map((value) => (value / profileMean) * nominalMPa)
  const modelMaxMPa = Math.max(...profile)
  const uniformity = (nominalMPa / modelMaxMPa) * 100
  const sectionX = 400 - (distanceMM / 600) * 280
  const forceArrowLength = 40 + (forceKN / 50) * 45
  const barCenterY = 271.5
  const barHeight = 2.2 * widthMM
  const barTop = barCenterY - barHeight / 2
  const barBottom = barCenterY + barHeight / 2

  return (
    <Lab
      title="Zasada de Saint-Venanta"
      instruction="Zmieniaj wymiar przekroju b, siłę i położenie badanego przekroju. Profil naprężeń wygładza się z odległością od siły, a naprężenie średnie pozostaje równe P/A."
      onReset={() => {
        setForceKN(24)
        setWidthMM(20)
        setDistanceMM(60)
      }}
      controls={
        <>
          <Control label="Siła osiowa P" value={forceKN} min={5} max={50} unit="kN" onChange={setForceKN} />
          <Control
            label="Bok przekroju kwadratowego b"
            value={widthMM}
            min={10}
            max={30}
            unit="mm"
            onChange={setWidthMM}
          />
          <Control
            label="Odległość od obciążonego końca x"
            value={distanceMM}
            min={0}
            max={600}
            step={10}
            unit="mm"
            onChange={setDistanceMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Naprężenie średnie P/A" value={fmt(nominalMPa, 2)} unit="MPa" tone="accent" />
          <Metric label="Pole przekroju A = b²" value={fmt(areaMM2, 0)} unit="mm²" />
          <Metric label="Maksimum profilu modelu" value={fmt(modelMaxMPa, 2)} unit="MPa" />
          <Metric label="Równomierność σśr/σmax" value={fmt(uniformity, 1)} unit="%" />
          <Metric label="Zaburzenie przy przekroju" value={fmt(concentration * 100, 0)} unit="%" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 370"
          width="100%"
          role="img"
          aria-label="Model wygładzania rozkładu naprężeń wraz ze wzrostem odległości od siły skupionej"
        >
          <title>Ilustracja zasady de Saint-Venanta</title>
          <desc>
            Blisko obciążonego końca profil jest nierównomierny — pomarańczowe słupki pokazują koncentrację naprężeń
            powyżej średniego, a niebieskie odciążoną część przekroju. Z odległością profil zbliża się do prostokątnego.
            Jest to jakościowy model, nie dokładne rozwiązanie sprężyste.
          </desc>
          <defs>
            <marker
              id="fund-saint-force"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0L10 5L0 10Z" fill="#ff6b45" />
            </marker>
          </defs>
          <text x="550" y="31" textAnchor="middle" fontSize="15" fill="currentColor">
            Profil σ na przekroju [MPa]
          </text>
          <line x1="460" y1="54" x2="460" y2="215" stroke="currentColor" strokeWidth="2" />
          <line x1="482" y1="54" x2="482" y2="215" stroke="#27835a" strokeDasharray="4 4" />
          <text x="482" y="48" textAnchor="middle" fontSize="11" fill="#27835a">
            σśr
          </text>
          {profile.map((value, index) => (
            <motion.rect
              key={index}
              x="461"
              y={62 + index * 9}
              height="7"
              rx="2"
              fill={value > nominalMPa ? '#ff6b45' : '#4f6df5'}
              opacity={0.55 + (value / modelMaxMPa) * 0.4}
              animate={{ width: Math.max(1, (value / nominalMPa) * 22) }}
              transition={spring}
            />
          ))}
          <text x="550" y="234" textAnchor="middle" fontSize="12" fill="currentColor">
            środek przekroju · skala pozioma: 22 px = σśr
          </text>
          <text x="460" y="252" fontSize="12" fontWeight="600" fill="currentColor">
            Legenda profilu:
          </text>
          <rect x="460" y="259" width="14" height="8" rx="2" fill="#ff6b45" />
          <text x="480" y="267" fontSize="11" fill="currentColor">
            σ &gt; σśr — koncentracja naprężeń przy sile
          </text>
          <rect x="460" y="275" width="14" height="8" rx="2" fill="#4f6df5" />
          <text x="480" y="283" fontSize="11" fill="currentColor">
            σ ≤ σśr — odciążona część przekroju
          </text>
          <line x1="460" y1="294" x2="474" y2="294" stroke="#27835a" strokeDasharray="4 4" />
          <text x="480" y="298" fontSize="11" fill="currentColor">
            σśr = P/A — pole równomierne daleko od siły
          </text>
          <text x="460" y="318" fontSize="11" fill="currentColor">
            Blisko siły punktowej profil jest spiczasty;
          </text>
          <text x="460" y="333" fontSize="11" fill="currentColor">
            wg Saint-Venanta zaburzenie wygasa
          </text>
          <text x="460" y="348" fontSize="11" fill="currentColor">
            i dla x ≳ b profil wyrównuje się.
          </text>
          <motion.line
            x1="75"
            x2="100"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.5"
            animate={{ y1: barTop - 25, y2: barTop }}
            transition={spring}
          />
          <motion.line
            x1="75"
            x2="100"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.5"
            animate={{ y1: barBottom + 25, y2: barBottom }}
            transition={spring}
          />
          <motion.line
            x1="75"
            x2="75"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.5"
            animate={{ y1: barTop - 25, y2: barBottom + 25 }}
            transition={spring}
          />
          <motion.line
            x1="100"
            x2="100"
            stroke="currentColor"
            strokeWidth="5"
            animate={{ y1: barTop - 31, y2: barBottom + 31 }}
            transition={spring}
          />
          <motion.rect
            x="100"
            width="300"
            rx="3"
            fill="#4f6df5"
            opacity="0.55"
            animate={{ y: barTop, height: barHeight }}
            transition={spring}
          />
          <line
            x1="400"
            y1={barCenterY}
            x2={400 + forceArrowLength}
            y2={barCenterY}
            stroke="#ff6b45"
            strokeWidth="4"
            markerEnd="url(#fund-saint-force)"
          />
          <motion.text
            x="394"
            textAnchor="end"
            fontSize="14"
            fill="#ff6b45"
            animate={{ y: barTop - 8 }}
            transition={spring}
          >
            P = {forceKN} kN
          </motion.text>
          <motion.g animate={{ x: sectionX }} transition={spring}>
            <motion.line
              x1="0"
              x2="0"
              stroke="#e0a14b"
              strokeWidth="3"
              strokeDasharray="5 4"
              animate={{ y1: barTop - 14, y2: barBottom + 14 }}
              transition={spring}
            />
            <motion.text
              x="0"
              textAnchor="middle"
              fontSize="13"
              fill="#e0a14b"
              animate={{ y: barTop - 38 }}
              transition={spring}
            >
              badany przekrój
            </motion.text>
          </motion.g>
          <line x1={sectionX} y1="327" x2="400" y2="327" stroke="currentColor" />
          <motion.line
            x1={sectionX}
            x2={sectionX}
            y1="319"
            y2="335"
            animate={{ x1: sectionX, x2: sectionX }}
            stroke="currentColor"
            transition={spring}
          />
          <line x1="400" y1="319" x2="400" y2="335" stroke="currentColor" />
          <text x={(sectionX + 400) / 2} y="313" textAnchor="middle" fontSize="13" fill="currentColor">
            x = {distanceMM} mm
          </text>
          <text x="220" y="360" textAnchor="middle" fontSize="12" fill="currentColor">
            b = {widthMM} mm · A = b² = {fmt(areaMM2, 0)} mm² · odległość na rysunku w skali suwaka
          </text>
        </svg>
      }
    />
  )
}
