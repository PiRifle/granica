import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { hollowTorsionShearMPa } from '../lib/advanced'
import { torsionShearMPa } from '../lib/engineering'

export function HollowShaftLab() {
  const [torqueNM, setTorqueNM] = useState(1000)
  const [outerDMM, setOuterDMM] = useState(80)
  const [innerDMM, setInnerDMM] = useState(40)
  const tauHollowMPa = hollowTorsionShearMPa(torqueNM, outerDMM, innerDMM)
  const tauSolidMPa = torsionShearMPa(torqueNM, outerDMM)
  const solidAreaMM2 = (Math.PI * outerDMM ** 2) / 4
  const hollowAreaMM2 = (Math.PI * (outerDMM ** 2 - innerDMM ** 2)) / 4
  const areaSavingPercent = 100 * (1 - hollowAreaMM2 / solidAreaMM2)
  const outerRadius = 50 + ((outerDMM - 40) / 80) * 42
  const innerRadius = (outerRadius * innerDMM) / outerDMM
  const torqueStroke = 2 + torqueNM / 1000
  const torqueArc = (cx: number) =>
    `M${cx - outerRadius} ${155 - outerRadius * 0.66} A${outerRadius} ${outerRadius} 0 0 1 ${cx + outerRadius * 0.66} ${155 - outerRadius}`

  const changeOuterD = (value: number) => {
    setOuterDMM(value)
    setInnerDMM((current) => Math.min(current, value - 5))
  }

  return (
    <Lab
      title="Wał pełny i rura o tej samej średnicy"
      instruction="Porównaj przekroje o identycznym D przy tym samym momencie T. Usunięcie środka zmniejsza pole, ale zwiększa maksymalne τ na zewnętrznym obwodzie."
      onReset={() => {
        setTorqueNM(1000)
        setOuterDMM(80)
        setInnerDMM(40)
      }}
      controls={
        <>
          <Control
            label="Moment skręcający T"
            value={torqueNM}
            min={100}
            max={3000}
            step={100}
            unit="N·m"
            onChange={setTorqueNM}
          />
          <Control
            label="Średnica zewnętrzna D"
            value={outerDMM}
            min={40}
            max={120}
            step={5}
            unit="mm"
            onChange={changeOuterD}
          />
          <Control
            label="Średnica wewnętrzna d"
            value={innerDMM}
            min={0}
            max={outerDMM - 5}
            step={5}
            unit="mm"
            onChange={setInnerDMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="τmax w rurze" value={fmt(tauHollowMPa)} unit="MPa" tone="accent" />
          <Metric label="τmax w wale pełnym" value={fmt(tauSolidMPa)} unit="MPa" />
          <Metric label="Oszczędność pola" value={fmt(areaSavingPercent)} unit="%" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 355"
          width="100%"
          role="img"
          aria-label="Porównanie wału pełnego i rury poddanego skręcaniu"
        >
          <title>Skręcanie przekroju pełnego i rurowego</title>
          <desc>
            Oba przekroje mają średnicę zewnętrzną D i przenoszą moment T. Rura ma otwór o średnicy d, mniejsze pole i
            większe maksymalne naprężenie styczne.
          </desc>
          <defs>
            <radialGradient id="hollow-solid-stress">
              <stop stopColor="#4f6df5" stopOpacity="0.12" />
              <stop offset="1" stopColor="#ff6b45" stopOpacity="0.9" />
            </radialGradient>
            <radialGradient id="hollow-tube-stress">
              <stop stopColor="#4f6df5" stopOpacity="0.2" />
              <stop offset="1" stopColor="#ff6b45" stopOpacity="0.95" />
            </radialGradient>
            <marker
              id="hollow-shaft-arrow"
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
          <text x="190" y="32" textAnchor="middle" fontSize="17" fill="currentColor">
            Wał pełny
          </text>
          <text x="530" y="32" textAnchor="middle" fontSize="17" fill="currentColor">
            Rura
          </text>
          <motion.circle
            cx="190"
            cy="155"
            fill="url(#hollow-solid-stress)"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ r: outerRadius }}
            transition={{ type: 'spring', stiffness: 160, damping: 23 }}
          />
          <motion.circle
            cx="530"
            cy="155"
            fill="url(#hollow-tube-stress)"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ r: outerRadius }}
            transition={{ type: 'spring', stiffness: 160, damping: 23 }}
          />
          <motion.circle
            cx="530"
            cy="155"
            fill="var(--bg, #17202a)"
            stroke="currentColor"
            strokeWidth="2"
            animate={{ r: Math.max(0.5, innerRadius) }}
            transition={{ type: 'spring', stiffness: 160, damping: 23 }}
          />
          <circle cx="190" cy="155" r="4" fill="currentColor" />
          <circle cx="530" cy="155" r="3" fill="currentColor" />
          <motion.path
            d={torqueArc(190)}
            fill="none"
            stroke="#ff6b45"
            strokeWidth={torqueStroke}
            markerEnd="url(#hollow-shaft-arrow)"
            animate={{ d: torqueArc(190) }}
          />
          <motion.path
            d={torqueArc(530)}
            fill="none"
            stroke="#ff6b45"
            strokeWidth={torqueStroke}
            markerEnd="url(#hollow-shaft-arrow)"
            animate={{ d: torqueArc(530) }}
          />
          <text x="190" y={155 - outerRadius - 12} textAnchor="middle" fontSize="14" fill="#ff6b45">
            T = {torqueNM} N·m
          </text>
          <text x="530" y={155 - outerRadius - 12} textAnchor="middle" fontSize="14" fill="#ff6b45">
            T = {torqueNM} N·m
          </text>
          <line x1={190 - outerRadius - 8} y1="259" x2={190 + outerRadius + 8} y2="259" stroke="currentColor" />
          <line x1={530 - outerRadius - 8} y1="259" x2={530 + outerRadius + 8} y2="259" stroke="currentColor" />
          <text x="190" y="280" textAnchor="middle" fontSize="14" fill="currentColor">
            D = {outerDMM} mm
          </text>
          <text x="530" y="280" textAnchor="middle" fontSize="14" fill="currentColor">
            D = {outerDMM} mm · d = {innerDMM} mm
          </text>
          <text x="190" y="308" textAnchor="middle" fontSize="14" fill="currentColor">
            A = {fmt(solidAreaMM2)} mm²
          </text>
          <text x="530" y="308" textAnchor="middle" fontSize="14" fill="currentColor">
            A = {fmt(hollowAreaMM2)} mm²
          </text>
          <text x="190" y="334" textAnchor="middle" fontSize="14" fill="#ff6b45">
            τmax = {fmt(tauSolidMPa)} MPa
          </text>
          <text x="530" y="334" textAnchor="middle" fontSize="14" fill="#ff6b45">
            τmax = {fmt(tauHollowMPa)} MPa
          </text>
        </svg>
      }
    />
  )
}
