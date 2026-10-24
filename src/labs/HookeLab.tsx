import { useState } from 'react'
import { motion } from 'motion/react'
import { CartesianGrid, Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Control, Lab, Metric, Segmented, fmt } from '../components/UI'
import { axialStrain, elongationMM, stressMPa } from '../lib/engineering'
import { chartMargin, materials, MaterialKey } from './LabsShared'

export function HookeLab() {
  const [forceKN, setForceKN] = useState(8)
  const [areaMM2, setAreaMM2] = useState(160)
  const [material, setMaterial] = useState<MaterialKey>('steel')
  const youngGPa = materials[material].youngGPa
  const sigma = stressMPa(forceKN, areaMM2)
  const strain = axialStrain(sigma, youngGPa)
  const deltaL = elongationMM(forceKN, 1000, areaMM2, youngGPa)
  const visualScale = Math.min(4, 48 / Math.max(deltaL, 0.0001))
  const visualDelta = deltaL * visualScale
  const maxStrain = Math.max(0.004, strain * 1.2)
  const forceArrowLength = 55 + (forceKN / 20) * 85
  const chartData = Array.from({ length: 31 }, (_, index) => {
    const currentStrain = (maxStrain * index) / 30
    return {
      strainPerMille: currentStrain * 1000,
      stress: currentStrain * youngGPa * 1000,
    }
  })

  return (
    <Lab
      title="Prawo Hooke’a: stal, aluminium i drewno"
      instruction="Dobierz materiał i obciążenie. Nachylenie prostej σ–ε to moduł Younga E; obliczenia dla pręta o długości L = 1000 mm."
      onReset={() => {
        setForceKN(8)
        setAreaMM2(160)
        setMaterial('steel')
      }}
      controls={
        <>
          <Control label="Siła F" value={forceKN} min={1} max={20} unit="kN" onChange={setForceKN} />
          <Control
            label="Pole przekroju A"
            value={areaMM2}
            min={50}
            max={400}
            step={10}
            unit="mm²"
            onChange={setAreaMM2}
          />
          <Segmented
            label="Materiał i moduł E"
            value={material}
            onChange={setMaterial}
            options={[
              { value: 'steel', label: 'Stal · 200 GPa' },
              { value: 'aluminium', label: 'Al · 70 GPa' },
              { value: 'wood', label: 'Drewno · 12 GPa' },
            ]}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Wydłużenie ΔL" value={fmt(deltaL, 3)} unit="mm" tone="accent" />
          <Metric label="Odkształcenie ε" value={fmt(strain * 1000, 3)} unit="‰" />
          <Metric label="Naprężenie σ" value={fmt(sigma)} unit="MPa" />
        </>
      }
      visual={
        <>
          <svg viewBox="0 24 720 152" width="100%" role="img" aria-label="Wydłużenie pręta zgodnie z prawem Hooke’a">
            <title>Wydłużenie pręta</title>
            <defs>
              <marker
                id="hooke-arrow"
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
            <path d="M105 50L130 85L105 120Z" fill="currentColor" opacity="0.25" />
            <line x1="130" y1="42" x2="130" y2="128" stroke="currentColor" strokeWidth="4" />
            <line
              x1="130"
              y1="135"
              x2={430 + visualDelta}
              y2="135"
              stroke="currentColor"
              strokeDasharray="5 5"
              opacity="0.45"
            />
            <motion.rect
              x="130"
              y="70"
              height="40"
              rx="4"
              fill="#4f6df5"
              animate={{ width: 300 + visualDelta }}
              transition={{ type: 'spring', stiffness: 170, damping: 25 }}
            />
            <motion.g animate={{ x: visualDelta }} transition={{ type: 'spring', stiffness: 170, damping: 25 }}>
              <line
                x1="430"
                y1="90"
                x2={430 + forceArrowLength}
                y2="90"
                stroke="#ff6b45"
                strokeWidth="3"
                markerEnd="url(#hooke-arrow)"
              />
              <text x={430 + forceArrowLength / 2} y="72" textAnchor="middle" fill="#ff6b45" fontSize="15">
                F = {fmt(forceKN, 1)} kN
              </text>
            </motion.g>
            <line x1="130" y1="145" x2="430" y2="145" stroke="currentColor" opacity="0.45" />
            <text x="280" y="164" textAnchor="middle" fontSize="13" fill="currentColor">
              L = 1000 mm
            </text>
            <motion.line
              x1="430"
              x2="430"
              y1="145"
              y2="145"
              animate={{ x1: 430, x2: 430 + visualDelta, y1: 145, y2: 145 }}
              stroke="#27835a"
              strokeWidth="3"
            />
            <text x="575" y="124" fontSize="13" fill="currentColor">
              ΔL = {fmt(deltaL, 3)} mm
            </text>
            <text x="575" y="145" fontSize="12" fill="currentColor">
              rysunek: ×{fmt(visualScale, 2)}
            </text>
          </svg>
          <div className="lab-chart" aria-label="Wykres zależności naprężenia od odkształcenia">
            <ResponsiveContainer width="100%" height={185}>
              <LineChart data={chartData} margin={chartMargin}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
                <XAxis
                  dataKey="strainPerMille"
                  type="number"
                  domain={[0, 'dataMax']}
                  tickFormatter={(value: number) => fmt(value, 1)}
                  label={{ value: 'ε [‰]', position: 'insideBottomRight', offset: -12 }}
                />
                <YAxis
                  width={62}
                  tickFormatter={(value: number) => fmt(value, 0)}
                  label={{ value: 'σ [MPa]', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip />
                <Line
                  type="linear"
                  dataKey="stress"
                  name={`σ [MPa], ${materials[material].label}`}
                  stroke="#4f6df5"
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
                <ReferenceDot
                  x={strain * 1000}
                  y={sigma}
                  r={6}
                  fill="#ff6b45"
                  stroke="white"
                  strokeWidth={2}
                  label={{ value: 'stan bieżący', position: strain > maxStrain * 0.5 ? 'left' : 'right', fontSize: 12 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      }
    />
  )
}
