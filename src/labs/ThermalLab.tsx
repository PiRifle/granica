import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, Segmented, fmt } from '../components/UI'
import { constrainedThermalStressMPa, thermalStrain } from '../lib/engineering'
import { ThermalMode } from './LabsShared'

export function ThermalLab() {
  const [mode, setMode] = useState<ThermalMode>('free')
  const [deltaT, setDeltaT] = useState(60)
  const [lengthMM, setLengthMM] = useState(1500)
  const alpha = 12e-6
  const youngGPa = 200
  const freeDeltaMM = thermalStrain(alpha, deltaT) * lengthMM
  const geometricDeltaMM = mode === 'free' ? freeDeltaMM : 0
  const sigma = mode === 'fixed' ? constrainedThermalStressMPa(alpha, deltaT, youngGPa) : 0
  const visualScale = mode === 'free' ? Math.min(2, 50 / Math.max(Math.abs(freeDeltaMM), 0.001)) : 1
  const visualDelta = geometricDeltaMM * visualScale
  const temperatureHue = 210 - ((deltaT + 50) / 200) * 210
  const temperatureColor = `hsl(${temperatureHue} 78% 52%)`
  const barWidth = 300 + ((lengthMM - 500) / 2500) * 240
  const rightX = 110 + barWidth
  const freeRightX = rightX + visualDelta
  const midX = (110 + freeRightX) / 2
  const initialMidX = 110 + barWidth / 2
  const thermalArrowLength = 15 + Math.min(45, (Math.abs(sigma) / 300) * 45)

  return (
    <Lab
      title="Odkształcenia i naprężenia termiczne"
      instruction="Zmień temperaturę stalowego pręta. Porównaj swobodny ruch końców z pełnym zablokowaniem; α = 12·10⁻⁶/K, E = 200 GPa."
      onReset={() => {
        setMode('free')
        setDeltaT(60)
        setLengthMM(1500)
      }}
      controls={
        <>
          <Segmented
            label="Warunek podparcia"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'free', label: 'Swobodny' },
              { value: 'fixed', label: 'Zablokowany' },
            ]}
          />
          <Control
            label="Przyrost temperatury ΔT"
            value={deltaT}
            min={-50}
            max={150}
            step={5}
            unit="°C"
            onChange={setDeltaT}
          />
          <Control
            label="Długość początkowa L"
            value={lengthMM}
            min={500}
            max={3000}
            step={100}
            unit="mm"
            onChange={setLengthMM}
          />
        </>
      }
      metrics={
        <>
          <Metric label="ΔL geometryczne" value={fmt(geometricDeltaMM, 3)} unit="mm" tone="accent" />
          <Metric label="Naprężenie termiczne σ" value={fmt(sigma)} unit="MPa" />
          <Metric label="Odkształcenie αΔT" value={fmt(thermalStrain(alpha, deltaT) * 1000, 3)} unit="‰" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 320"
          width="100%"
          role="img"
          aria-label={mode === 'free' ? 'Swobodna zmiana długości pręta' : 'Pręt zablokowany między podporami'}
        >
          <title>{mode === 'free' ? 'Swobodna deformacja termiczna' : 'Zablokowana deformacja termiczna'}</title>
          <defs>
            <linearGradient id="thermal-bar">
              <stop stopColor={temperatureColor} stopOpacity="0.65" />
              <stop offset="0.5" stopColor={temperatureColor} />
              <stop offset="1" stopColor={temperatureColor} stopOpacity="0.65" />
            </linearGradient>
            <marker
              id="thermal-reaction"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10z" fill="#ff6b45" />
            </marker>
          </defs>
          <text x="90" y="35" fontSize="13" fill="currentColor">
            ΔT = −50 °C
          </text>
          <text x="630" y="35" textAnchor="end" fontSize="13" fill="currentColor">
            ΔT = +150 °C
          </text>
          <rect x="90" y="45" width="540" height="10" rx="5" fill="url(#thermal-legend)" />
          <defs>
            <linearGradient id="thermal-legend">
              <stop stopColor="hsl(210 78% 52%)" />
              <stop offset="0.5" stopColor="hsl(52 78% 52%)" />
              <stop offset="1" stopColor="hsl(0 78% 52%)" />
            </linearGradient>
          </defs>
          <line
            x1={90 + ((deltaT + 50) / 200) * 540}
            y1="40"
            x2={90 + ((deltaT + 50) / 200) * 540}
            y2="62"
            stroke="currentColor"
            strokeWidth="3"
          />
          <text x="360" y="82" textAnchor="middle" fontSize="15" fill={temperatureColor}>
            Aktualnie: ΔT = {deltaT} °C
          </text>
          <line x1="110" y1="200" x2={rightX} y2="200" stroke="currentColor" strokeDasharray="6 5" opacity="0.35" />
          <text x={initialMidX} y="220" textAnchor="middle" fontSize="12" fill="currentColor">
            długość początkowa L = {lengthMM} mm
          </text>
          <path d="M85 120L110 155L85 190Z" fill="currentColor" opacity="0.35" />
          <line x1="110" y1="110" x2="110" y2="200" stroke="currentColor" strokeWidth="5" />
          <motion.rect
            x="110"
            y="125"
            height="55"
            rx="4"
            fill="url(#thermal-bar)"
            animate={{ width: barWidth + visualDelta }}
            transition={{ type: 'spring', stiffness: 160, damping: 24 }}
          />
          {mode === 'fixed' ? (
            <>
              <line x1={rightX} y1="110" x2={rightX} y2="200" stroke="currentColor" strokeWidth="5" />
              <path d={`M${rightX + 25} 120 L${rightX} 155 L${rightX + 25} 190 Z`} fill="currentColor" opacity="0.35" />
              <line
                x1={103 - thermalArrowLength}
                y1="152"
                x2="103"
                y2="152"
                stroke="#ff6b45"
                strokeWidth="3"
                markerEnd="url(#thermal-reaction)"
              />
              <line
                x1={rightX + 7 + thermalArrowLength}
                y1="152"
                x2={rightX + 7}
                y2="152"
                stroke="#ff6b45"
                strokeWidth="3"
                markerEnd="url(#thermal-reaction)"
              />
              <text x={midX} y="115" textAnchor="middle" fontSize="14" fill="#ff6b45">
                Reakcje podpór równoważą siłę termiczną
              </text>
            </>
          ) : (
            <motion.g animate={{ x: visualDelta }} transition={{ type: 'spring', stiffness: 160, damping: 24 }}>
              <line x1={rightX} y1="120" x2={rightX} y2="194" stroke="#27835a" strokeWidth="3" strokeDasharray="4 3" />
              <text x={rightX} y="108" textAnchor="middle" fontSize="13" fill="#27835a">
                koniec swobodny
              </text>
            </motion.g>
          )}
          <line x1="110" y1="239" x2={freeRightX} y2="239" stroke="#27835a" strokeWidth="2" />
          <text x={midX} y="260" textAnchor="middle" fontSize="14" fill="currentColor">
            {mode === 'free'
              ? `Swobodnie: ΔL = αΔTL = ${fmt(freeDeltaMM, 3)} mm, σ = 0`
              : 'Zablokowanie: ΔL geometryczne = 0'}
          </text>
          <text x="360" y="286" textAnchor="middle" fontSize="14" fill="currentColor">
            {mode === 'free'
              ? `Skala zmiany długości na rysunku ×${fmt(visualScale, 2)}`
              : `Odkształcenie całkowite = 0, więc σ = −EαΔT = ${fmt(sigma)} MPa`}
          </text>
          <text x="360" y="307" textAnchor="middle" fontSize="12" fill="currentColor">
            Dodatnie σ: rozciąganie · ujemne σ: ściskanie
          </text>
        </svg>
      }
    />
  )
}
