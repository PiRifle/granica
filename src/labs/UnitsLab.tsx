import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { spring } from './FundamentalsLabsShared'

export function UnitsLab() {
  const [forceKN, setForceKN] = useState(12)
  const [sigmaMPa, setSigmaMPa] = useState(80)
  const forceN = forceKN * 1000
  const sigmaNMM2 = sigmaMPa
  const sigmaKNCM2 = sigmaMPa / 10
  const forcePointerX = 90 + (forceKN / 100) * 540
  const stressPointerX = 90 + (sigmaMPa / 500) * 540

  return (
    <Lab
      title="Jednostki siły i naprężenia"
      instruction="Przesuwaj wielkości i odczytuj równoważne wartości na podziałkach. Przeliczenie jednostek nie zmienia fizycznej wielkości."
      onReset={() => {
        setForceKN(12)
        setSigmaMPa(80)
      }}
      controls={
        <>
          <Control label="Siła F" value={forceKN} min={0} max={100} unit="kN" onChange={setForceKN} />
          <Control label="Naprężenie σ" value={sigmaMPa} min={0} max={500} step={5} unit="MPa" onChange={setSigmaMPa} />
        </>
      }
      metrics={
        <>
          <Metric label="Siła F" value={fmt(forceN, 0)} unit="N" tone="accent" />
          <Metric label="Naprężenie σ" value={fmt(sigmaNMM2, 2)} unit="N/mm²" />
          <Metric label="Naprężenie σ" value={fmt(sigmaKNCM2, 2)} unit="kN/cm²" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 330"
          width="100%"
          role="img"
          aria-label="Podziałki przeliczania kiloniutonów na niutony oraz megapaskali na inne jednostki naprężenia"
        >
          <title>Wspólne podziałki jednostek</title>
          <desc>Górna podziałka przedstawia siłę, a dolna naprężenie. Wskaźniki pokazują bieżące wartości.</desc>
          <text x="90" y="38" fontSize="17" fill="currentColor">
            Siła: 1 kN = 1000 N
          </text>
          <text x="630" y="38" textAnchor="end" fontSize="16" fill="#e76f51">
            F = {fmt(forceKN, 0)} kN = {fmt(forceN, 0)} N
          </text>
          <line x1="90" y1="82" x2="630" y2="82" stroke="currentColor" strokeWidth="3" />
          {Array.from({ length: 5 }, (_, index) => {
            const value = index * 25
            const x = 90 + (value / 100) * 540
            return (
              <g key={value}>
                <line x1={x} y1="72" x2={x} y2="93" stroke="currentColor" strokeWidth="2" />
                <text x={x} y="113" textAnchor="middle" fontSize="12" fill="currentColor">
                  {value} kN
                </text>
                <text x={x} y="131" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">
                  {fmt(value * 1000, 0)} N
                </text>
              </g>
            )
          })}
          <motion.g animate={{ x: forcePointerX }} transition={spring}>
            <line x1="0" y1="52" x2="0" y2="96" stroke="#e76f51" strokeWidth="3" />
            <path d="M-7 48L0 58L7 48Z" fill="#e76f51" />
          </motion.g>
          <text x="90" y="177" fontSize="17" fill="currentColor">
            Naprężenie: 1 MPa = 1 N/mm² = 0,1 kN/cm²
          </text>
          <text x="630" y="177" textAnchor="end" fontSize="16" fill="#4f86c6">
            σ = {fmt(sigmaMPa, 0)} MPa
          </text>
          <line x1="90" y1="221" x2="630" y2="221" stroke="currentColor" strokeWidth="3" />
          {Array.from({ length: 6 }, (_, index) => {
            const value = index * 100
            const x = 90 + (value / 500) * 540
            return (
              <g key={value}>
                <line x1={x} y1="211" x2={x} y2="232" stroke="currentColor" strokeWidth="2" />
                <text x={x} y="252" textAnchor="middle" fontSize="12" fill="currentColor">
                  {value} MPa
                </text>
                <text x={x} y="270" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">
                  {fmt(value / 10, 0)} kN/cm²
                </text>
              </g>
            )
          })}
          <motion.g animate={{ x: stressPointerX }} transition={spring}>
            <line x1="0" y1="191" x2="0" y2="235" stroke="#4f86c6" strokeWidth="3" />
            <path d="M-7 187L0 197L7 187Z" fill="#4f86c6" />
          </motion.g>
          <text x="360" y="310" textAnchor="middle" fontSize="14" fill="currentColor">
            MPa i N/mm² mają tę samą wartość liczbową; kN/cm² jest 10 razy mniejszą liczbą.
          </text>
        </svg>
      }
    />
  )
}
