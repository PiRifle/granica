import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { stressMPa } from '../lib/engineering'
import { spring } from './FundamentalsLabsShared'

export function SaintVenantLab() {
  const [forceKN, setForceKN] = useState(24)
  const [areaMM2, setAreaMM2] = useState(400)
  const [distanceMM, setDistanceMM] = useState(60)
  const nominalMPa = stressMPa(forceKN, areaMM2)
  const sideMM = Math.sqrt(areaMM2)
  const concentration = Math.exp(-distanceMM / (0.75 * sideMM))
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

  return (
    <Lab
      title="Zasada de Saint-Venanta"
      instruction="Oddalaj przekrój od miejsca przyłożenia siły. Animowany profil wygładza się, a naprężenie średnie pozostaje równe P/A."
      onReset={() => {
        setForceKN(24)
        setAreaMM2(400)
        setDistanceMM(60)
      }}
      controls={
        <>
          <Control label="Siła osiowa P" value={forceKN} min={5} max={50} unit="kN" onChange={setForceKN} />
          <Control
            label="Pole przekroju A"
            value={areaMM2}
            min={100}
            max={900}
            step={50}
            unit="mm²"
            onChange={setAreaMM2}
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
          <Metric label="Maksimum profilu modelu" value={fmt(modelMaxMPa, 2)} unit="MPa" />
          <Metric label="Równomierność σśr/σmax" value={fmt(uniformity, 1)} unit="%" />
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
            Blisko obciążonego końca profil jest nierównomierny, a dalej zbliża się do prostokątnego. Jest to jakościowy
            model, nie dokładne rozwiązanie sprężyste.
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
              fill={index > 5 && index < 11 ? '#ff6b45' : '#4f6df5'}
              opacity={0.55 + (value / modelMaxMPa) * 0.4}
              animate={{ width: Math.max(1, (value / nominalMPa) * 22) }}
              transition={spring}
            />
          ))}
          <text x="550" y="234" textAnchor="middle" fontSize="12" fill="currentColor">
            środek przekroju · skala pozioma: 22 px = σśr
          </text>
          <path d="M75 224L100 249V294L75 319Z" fill="currentColor" opacity="0.3" />
          <line x1="100" y1="218" x2="100" y2="318" stroke="currentColor" strokeWidth="5" />
          <rect x="100" y="249" width="300" height="45" rx="3" fill="#4f6df5" opacity="0.55" />
          <line
            x1="400"
            y1="271"
            x2={400 + forceArrowLength}
            y2="271"
            stroke="#ff6b45"
            strokeWidth="4"
            markerEnd="url(#fund-saint-force)"
          />
          <text x={400 + forceArrowLength / 2} y="254" textAnchor="middle" fontSize="14" fill="#ff6b45">
            P = {forceKN} kN
          </text>
          <motion.g animate={{ x: sectionX }} transition={spring}>
            <line x1="0" y1="232" x2="0" y2="311" stroke="#e0a14b" strokeWidth="3" strokeDasharray="5 4" />
            <text x="0" y="226" textAnchor="middle" fontSize="13" fill="#e0a14b">
              badany przekrój
            </text>
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
          <text x={(sectionX + 400) / 2} y="349" textAnchor="middle" fontSize="13" fill="currentColor">
            x = {distanceMM} mm
          </text>
          <text x="220" y="366" textAnchor="middle" fontSize="12" fill="currentColor">
            b = √A = {fmt(sideMM, 1)} mm · odległość na rysunku w skali suwaka
          </text>
          <text x="545" y="272" textAnchor="middle" fontSize="12" fill="currentColor">
            Model ilustracyjny: przy idealnej
          </text>
          <text x="545" y="290" textAnchor="middle" fontSize="12" fill="currentColor">
            sile punktowej nie opisuje pola
          </text>
          <text x="545" y="308" textAnchor="middle" fontSize="12" fill="currentColor">
            naprężeń dokładnie przy końcu.
          </text>
        </svg>
      }
    />
  )
}
