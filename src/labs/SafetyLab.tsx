import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { stressMPa } from '../lib/engineering'
import { safetyFactor } from '../lib/advanced'

export function SafetyLab() {
  const [forceKN, setForceKN] = useState(40)
  const [areaMM2, setAreaMM2] = useState(250)
  const [Re, setRe] = useState(235)
  const [requiredFactor, setRequiredFactor] = useState(1.5)
  const sigma = stressMPa(forceKN, areaMM2)
  const allowable = Re / requiredFactor
  const actualFactor = safetyFactor(Re, sigma)
  const requiredArea = (forceKN * 1000) / allowable
  const safe = sigma <= allowable
  const scaleMaxMPa = Math.max(allowable * 2, sigma * 1.15, 1)
  const gaugeWidth = Math.min(100, (sigma / scaleMaxMPa) * 100)
  const limitWidth = (allowable / scaleMaxMPa) * 100

  return (
    <Lab
      title="Warunek wytrzymałości i dobór przekroju"
      instruction="Dla zadanej granicy Re oblicz naprężenie dopuszczalne σdop = Re/n. Warunek dotyczy wyłącznie naprężenia normalnego w modelu F/A."
      onReset={() => {
        setForceKN(40)
        setAreaMM2(250)
        setRe(235)
        setRequiredFactor(1.5)
      }}
      controls={
        <>
          <Control label="Siła rozciągająca F" value={forceKN} min={1} max={100} unit="kN" onChange={setForceKN} />
          <Control
            label="Pole przekroju A"
            value={areaMM2}
            min={50}
            max={600}
            step={10}
            unit="mm²"
            onChange={setAreaMM2}
          />
          <Control label="Granica materiału Re" value={Re} min={100} max={500} step={5} unit="MPa" onChange={setRe} />
          <Control
            label="Wymagany współczynnik n"
            value={requiredFactor}
            min={1.1}
            max={3}
            step={0.1}
            unit="–"
            format={(value) => fmt(value, 1)}
            onChange={setRequiredFactor}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Naprężenie rzeczywiste σ" value={fmt(sigma)} unit="MPa" tone={safe ? 'accent' : undefined} />
          <Metric label="Rzeczywiste n = Re/σ" value={fmt(actualFactor, 2)} unit="–" />
          <Metric label="Wymagane pole Amin" value={fmt(requiredArea)} unit="mm²" tone="accent" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 720 320"
          width="100%"
          role="img"
          aria-label={`Porównanie naprężenia z dopuszczalnym: warunek ${safe ? 'spełniony' : 'niespełniony'}`}
        >
          <title>Ocena warunku σ ≤ Re/n</title>
          <desc>
            Niebieski pasek pokazuje naprężenie rzeczywiste, a zielona linia naprężenie dopuszczalne. Skala
            automatycznie obejmuje obie wartości.
          </desc>
          <text x="70" y="46" fontSize="17" fill="currentColor">
            σ = {fmt(sigma)} MPa
          </text>
          <text x="650" y="46" textAnchor="end" fontSize="17" fill={safe ? '#3155d9' : '#c65c43'}>
            {safe ? '✓ warunek spełniony' : '✕ warunek niespełniony'}
          </text>
          <rect x="70" y="78" width="580" height="52" rx="8" fill="#edf1ff" />
          <motion.rect
            x="70"
            y="78"
            height="52"
            rx="8"
            fill={safe ? '#4f6df5' : '#ff6b45'}
            animate={{ width: 5.8 * gaugeWidth }}
            transition={{ type: 'spring', stiffness: 150, damping: 23 }}
          />
          <line
            x1={70 + 5.8 * limitWidth}
            y1="65"
            x2={70 + 5.8 * limitWidth}
            y2="145"
            stroke="#3155d9"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <text x={70 + 5.8 * limitWidth} y="164" textAnchor="middle" fontSize="13" fill="currentColor">
            σdop = {fmt(allowable)} MPa
          </text>
          <text x="70" y="190" fontSize="12" fill="currentColor">
            0
          </text>
          <text x="650" y="190" textAnchor="end" fontSize="12" fill="currentColor">
            skala: {fmt(scaleMaxMPa)} MPa
          </text>
          <rect x="70" y="215" width="580" height="72" rx="10" fill="#edf7f1" />
          <text x="360" y="242" textAnchor="middle" fontSize="15" fill="currentColor">
            σ ≤ σdop ⇔ Re/σ ≥ n ⇔ A ≥ F·1000·n/Re
          </text>
          <text x="360" y="270" textAnchor="middle" fontSize="13" fill={safe ? '#3155d9' : '#c65c43'}>
            {safe
              ? `Zapas pola: ${fmt(areaMM2 - requiredArea)} mm²`
              : `Brakuje pola: ${fmt(requiredArea - areaMM2)} mm²`}
          </text>
        </svg>
      }
    />
  )
}
