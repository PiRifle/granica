import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, fmt } from '../components/UI'
import { stressMPa } from '../lib/engineering'

export function StressLab() {
  const [forceKN, setForceKN] = useState(12)
  const [areaMM2, setAreaMM2] = useState(200)
  const sigma = stressMPa(forceKN, areaMM2)
  const forceKNPerCM2 = (forceKN * 100) / areaMM2
  const intensity = Math.min(1, sigma / 400)
  const rodHeight = 44 + (areaMM2 / 500) * 42
  const color = `hsl(${210 - intensity * 210} 78% 52%)`
  const level = sigma < 100 ? 'niski' : sigma < 250 ? 'umiarkowany' : 'wysoki'
  const arrowLength = 45 + (forceKN / 30) * 65

  return (
    <Lab
      title="Naprężenie normalne w pręcie"
      instruction="Zmień siłę i pole przekroju. Jednakowe σ oznacza równomierny rozkład na przekroju; poziom obciążenia nie jest oceną nośności bez danych materiału."
      onReset={() => {
        setForceKN(12)
        setAreaMM2(200)
      }}
      controls={
        <>
          <Control label="Siła osiowa F" value={forceKN} min={2} max={30} unit="kN" onChange={setForceKN} />
          <Control
            label="Pole przekroju A"
            value={areaMM2}
            min={50}
            max={500}
            step={10}
            unit="mm²"
            onChange={setAreaMM2}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Naprężenie σ = F/A" value={fmt(sigma)} unit="MPa" tone="accent" />
          <Metric label="Równoważnie" value={fmt(forceKNPerCM2, 2)} unit="kN/cm²" />
          <Metric label="Względny poziom σ" value={level} />
        </>
      }
      visual={
        <svg viewBox="0 0 720 320" width="100%" role="img" aria-label="Pręt rozciągany siłami z rozkładem naprężenia">
          <title>Rozkład naprężenia normalnego</title>
          <desc>Kolor i nasycenie cząstek rosną wraz z naprężeniem. Strzałki pokazują rozciąganie.</desc>
          <defs>
            <marker
              id="stress-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#e76f51" />
            </marker>
          </defs>
          <text x="360" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            σ = F/A = const na przekroju
          </text>
          <motion.g animate={{ x: [-5, -11, -5] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <line
              x1="174"
              y1="160"
              x2={174 - arrowLength}
              y2="160"
              stroke="#e76f51"
              strokeWidth="3"
              markerEnd="url(#stress-arrow)"
            />
            <text x={174 - arrowLength / 2} y="140" textAnchor="middle" fontSize="16" fill="#e76f51">
              F = {forceKN} kN
            </text>
          </motion.g>
          <motion.g animate={{ x: [5, 11, 5] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <line
              x1="546"
              y1="160"
              x2={546 + arrowLength}
              y2="160"
              stroke="#e76f51"
              strokeWidth="3"
              markerEnd="url(#stress-arrow)"
            />
            <text x={546 + arrowLength / 2} y="140" textAnchor="middle" fontSize="16" fill="#e76f51">
              F = {forceKN} kN
            </text>
          </motion.g>
          <motion.rect
            x="180"
            width="360"
            rx="5"
            animate={{ y: 160 - rodHeight / 2, height: rodHeight, fill: color }}
            transition={{ type: 'spring', stiffness: 170, damping: 25 }}
          />
          {Array.from({ length: 48 }, (_, index) => {
            const column = index % 12
            const row = Math.floor(index / 12)
            return (
              <motion.circle
                key={index}
                cx={198 + column * 29.5}
                r={2.4 + intensity * 1.8}
                fill="white"
                animate={{ cy: 160 - rodHeight * 0.32 + row * rodHeight * 0.213, opacity: 0.28 + intensity * 0.65 }}
                transition={{ type: 'spring', stiffness: 170, damping: 25 }}
              />
            )
          })}
          <line
            x1="360"
            y1={160 - rodHeight / 2 - 13}
            x2="360"
            y2={160 + rodHeight / 2 + 13}
            stroke="currentColor"
            strokeDasharray="4 4"
            opacity="0.45"
          />
          <text x="372" y={160 - rodHeight / 2 - 18} fontSize="13" fill="currentColor">
            przekrój A = {areaMM2} mm²
          </text>
          <rect x="210" y="258" width="300" height="10" rx="5" fill="url(#stress-legend)" />
          <defs>
            <linearGradient id="stress-legend">
              <stop stopColor="hsl(210 78% 52%)" />
              <stop offset="1" stopColor="hsl(0 78% 52%)" />
            </linearGradient>
          </defs>
          <text x="210" y="288" fontSize="13" fill="currentColor">
            mniejsze σ
          </text>
          <text x="510" y="288" textAnchor="end" fontSize="13" fill="currentColor">
            większe σ
          </text>
          <text x="360" y="310" textAnchor="middle" fontSize="12" fill="currentColor">
            1 MPa = 1 N/mm² = 0,1 kN/cm²
          </text>
        </svg>
      }
    />
  )
}
