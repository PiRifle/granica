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
  const diameterMM = Math.sqrt((4 * areaMM2) / Math.PI)
  const barScreenWidth = diameterMM * 2.2
  const crateWidth = 84 + forceKN * 1.05
  const crateHeight = 40 + forceKN * 0.34
  const modelColor = safe ? '#27835a' : '#ff6b45'
  const modelTint = safe ? '#edf7f1' : '#fdeee8'
  const arrowLength = 46 + forceKN * 0.9
  const hatchXs = Array.from({ length: 12 }, (_, i) => 212 + i * 28)

  return (
    <Lab
      title="Warunek wytrzymałości i dobór przekroju"
      instruction="Wymiarujesz pręt zawieszenia platformy z ładunkiem. Dla zadanej granicy Re oblicz naprężenie dopuszczalne σdop = Re/n. Warunek dotyczy wyłącznie naprężenia normalnego w modelu F/A."
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
          viewBox="0 0 720 560"
          width="100%"
          role="img"
          aria-label={`Pręt zawieszenia z platformą: warunek ${safe ? 'spełniony' : 'niespełniony'}`}
        >
          <title>Model zawieszenia i ocena warunku σ ≤ Re/n</title>
          <desc>
            Pręt zawieszony pod stropem dźwiga platformę z ładunkiem F. Średnica pręta odpowiada polu A, a kolor
            sygnalizuje zapas bezpieczeństwa: zielony bezpieczny, pomarańczowy niewystarczający. Poniżej niebieski pasek
            pokazuje naprężenie rzeczywiste, a zielona linia naprężenie dopuszczalne.
          </desc>
          <defs>
            <marker
              id="safety-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff6b45" />
            </marker>
          </defs>
          <rect x="70" y="20" width="580" height="262" rx="10" fill={modelTint} />
          <text x="86" y="44" fontSize="14" fill="currentColor">
            Pręt zawieszenia platformy
          </text>
          <text x="634" y="44" textAnchor="end" fontSize="14" fill={modelColor}>
            {safe ? `zapas n = ${fmt(actualFactor, 2)}` : `n = ${fmt(actualFactor, 2)} < ${fmt(requiredFactor, 1)}`}
          </text>
          <rect x="200" y="56" width="320" height="14" rx="3" fill="#4f6df5" />
          {hatchXs.map((x) => (
            <line key={x} x1={x} y1="70" x2={x - 10} y2="82" stroke="#4f6df5" strokeWidth="2" />
          ))}
          <motion.rect
            y="70"
            height="118"
            rx="5"
            fill={modelColor}
            animate={{ x: 360 - barScreenWidth / 2, width: barScreenWidth }}
            transition={{ type: 'spring', stiffness: 170, damping: 24 }}
          />
          {!safe && (
            <polyline
              points={`356,96 364,116 356,136 364,156`}
              fill="none"
              stroke="#a33c22"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}
          <text x="318" y="140" textAnchor="end" fontSize="13" fill="currentColor">
            A = {fmt(areaMM2, 0)} mm²
          </text>
          <text x="318" y="158" textAnchor="end" fontSize="13" fill="currentColor">
            ∅ {fmt(diameterMM)} mm
          </text>
          <rect x="357" y="188" width="6" height="12" fill="currentColor" />
          <motion.rect
            y="200"
            height={crateHeight}
            rx="6"
            fill="#4f6df5"
            animate={{ x: 360 - crateWidth / 2, width: crateWidth }}
            transition={{ type: 'spring', stiffness: 170, damping: 24 }}
          />
          <motion.rect
            y="200"
            height="10"
            rx="5"
            fill="#3155d9"
            animate={{ x: 360 - crateWidth / 2, width: crateWidth }}
            transition={{ type: 'spring', stiffness: 170, damping: 24 }}
          />
          <text
            x="360"
            y={205 + crateHeight / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="15"
            fill="#ffffff"
          >
            F = {fmt(forceKN, 0)} kN
          </text>
          <motion.line
            x1="560"
            x2="560"
            y1="176"
            stroke="#ff6b45"
            strokeWidth="4"
            markerEnd="url(#safety-arrow)"
            animate={{ y2: 176 + arrowLength }}
            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
          />
          <text x="574" y={186 + arrowLength} fontSize="13" fill="#c65c43">
            F
          </text>
          <text x="70" y="312" fontSize="17" fill="currentColor">
            σ = {fmt(sigma)} MPa
          </text>
          <text x="650" y="300" textAnchor="end" fontSize="17" fill={safe ? '#3155d9' : '#c65c43'}>
            {safe ? '✓ warunek spełniony' : '✕ warunek niespełniony'}
          </text>
          <rect x="70" y="344" width="580" height="52" rx="8" fill="#edf1ff" />
          <motion.rect
            x="70"
            y="344"
            height="52"
            rx="8"
            fill={safe ? '#4f6df5' : '#ff6b45'}
            animate={{ width: 5.8 * gaugeWidth }}
            transition={{ type: 'spring', stiffness: 150, damping: 23 }}
          />
          <line
            x1={70 + 5.8 * limitWidth}
            y1="331"
            x2={70 + 5.8 * limitWidth}
            y2="411"
            stroke="#3155d9"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <text x={70 + 5.8 * limitWidth} y="430" textAnchor="middle" fontSize="13" fill="currentColor">
            σdop = {fmt(allowable)} MPa
          </text>
          <text x="70" y="456" fontSize="12" fill="currentColor">
            0
          </text>
          <text x="650" y="456" textAnchor="end" fontSize="12" fill="currentColor">
            skala: {fmt(scaleMaxMPa)} MPa
          </text>
          <rect x="70" y="481" width="580" height="72" rx="10" fill="#edf7f1" />
          <text x="360" y="508" textAnchor="middle" fontSize="15" fill="currentColor">
            σ ≤ σdop ⇔ Re/σ ≥ n ⇔ A ≥ F·1000·n/Re
          </text>
          <text x="360" y="536" textAnchor="middle" fontSize="13" fill={safe ? '#3155d9' : '#c65c43'}>
            {safe
              ? `Zapas pola: ${fmt(areaMM2 - requiredArea)} mm²`
              : `Brakuje pola: ${fmt(requiredArea - areaMM2)} mm²`}
          </text>
        </svg>
      }
    />
  )
}
