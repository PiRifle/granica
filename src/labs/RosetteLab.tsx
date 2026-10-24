import { useState } from 'react'
import { motion } from 'motion/react'
import { Control, Lab, Metric, Segmented, fmt } from '../components/UI'
import { rectangularRosette } from '../lib/advanced'
import { rosetteMaterials, RosetteMaterial } from './StrainCriteriaLabsShared'

export function RosetteLab() {
  const [e0Micro, setE0Micro] = useState(400)
  const [e45Micro, setE45Micro] = useState(250)
  const [e90Micro, setE90Micro] = useState(-100)
  const [material, setMaterial] = useState<RosetteMaterial>('steel')
  const { youngGPa, poisson } = rosetteMaterials[material]
  const rosette = rectangularRosette(e0Micro / 1e6, e45Micro / 1e6, e90Micro / 1e6)
  const youngMPa = youngGPa * 1000
  const denominator = 1 - poisson ** 2
  const sigma1 = (youngMPa * (rosette.principal1 + poisson * rosette.principal2)) / denominator
  const sigma2 = (youngMPa * (rosette.principal2 + poisson * rosette.principal1)) / denominator
  const principalScale = Math.max(Math.abs(sigma1), Math.abs(sigma2), 1)
  const p1Half = 28 + (Math.abs(sigma1) / principalScale) * 72
  const p2Half = 28 + (Math.abs(sigma2) / principalScale) * 72
  const gauges = [
    { angle: 0, value: e0Micro, color: '#4f86c6', label: 'ε₀' },
    { angle: 45, value: e45Micro, color: '#e9a23b', label: 'ε₄₅' },
    { angle: 90, value: e90Micro, color: '#2a9d8f', label: 'ε₉₀' },
  ]

  return (
    <Lab
      title="Prostokątna rozeta tensometryczna"
      instruction="Wprowadź odczyty trzech czujników i wybierz E oraz ν materiału. Naprężenia główne wyznaczono dla płaskiego stanu naprężenia (σz = 0), a nie płaskiego stanu odkształcenia."
      onReset={() => {
        setE0Micro(400)
        setE45Micro(250)
        setE90Micro(-100)
        setMaterial('steel')
      }}
      controls={
        <>
          <Control
            label="Odczyt czujnika ε₀"
            value={e0Micro}
            min={-1000}
            max={1000}
            step={10}
            unit="µε"
            onChange={setE0Micro}
          />
          <Control
            label="Odczyt czujnika ε₄₅"
            value={e45Micro}
            min={-1000}
            max={1000}
            step={10}
            unit="µε"
            onChange={setE45Micro}
          />
          <Control
            label="Odczyt czujnika ε₉₀"
            value={e90Micro}
            min={-1000}
            max={1000}
            step={10}
            unit="µε"
            onChange={setE90Micro}
          />
          <Segmented
            label="Materiał: E / ν"
            value={material}
            onChange={setMaterial}
            options={[
              { value: 'steel', label: 'Stal · 200 / 0,30' },
              { value: 'aluminium', label: 'Al · 70 / 0,33' },
              { value: 'brass', label: 'Mosiądz · 100 / 0,34' },
            ]}
          />
        </>
      }
      metrics={
        <>
          <Metric label="Odkształcenie główne ε₁" value={fmt(rosette.principal1 * 1e6, 1)} unit="µε" tone="accent" />
          <Metric label="Odkształcenie główne ε₂" value={fmt(rosette.principal2 * 1e6, 1)} unit="µε" />
          <Metric label="Naprężenie główne σ₁" value={fmt(sigma1, 1)} unit="MPa" tone="accent" />
          <Metric label="Naprężenie główne σ₂" value={fmt(sigma2, 1)} unit="MPa" />
        </>
      }
      visual={
        <svg
          viewBox="0 0 760 350"
          width="100%"
          role="img"
          aria-label="Trzy czujniki rozety i obrócone kierunki odkształceń głównych"
        >
          <title>Rozeta 0°, 45°, 90° i kierunki główne</title>
          <desc>
            Odczyty są podane w mikroodkształceniach. Kąt alfa wyznacza kierunek epsilon jeden od osi x, przeciwnie do
            ruchu wskazówek zegara.
          </desc>
          <defs>
            <marker
              id="rosette-principal-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10Z" fill="#e76f51" />
            </marker>
          </defs>
          <text x="200" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            Czujniki: 0° / 45° / 90°
          </text>
          <text x="555" y="28" textAnchor="middle" fontSize="16" fill="currentColor">
            Kierunki główne
          </text>
          <line x1="75" y1="170" x2="325" y2="170" stroke="currentColor" strokeDasharray="5 5" opacity="0.3" />
          <line x1="200" y1="50" x2="200" y2="290" stroke="currentColor" strokeDasharray="5 5" opacity="0.3" />
          {gauges.map((gauge) => (
            <g key={gauge.angle} transform={`rotate(${-gauge.angle} 200 170)`}>
              <motion.g animate={{ opacity: 0.55 + Math.min(Math.abs(gauge.value) / 1000, 1) * 0.45 }}>
                <rect x="125" y="150" width="150" height="40" rx="5" fill="none" stroke={gauge.color} strokeWidth="2" />
                <path
                  d="M140 158H260M140 170H260M140 182H260"
                  stroke={gauge.color}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path d="M125 160H105V145M125 180H105V195" fill="none" stroke={gauge.color} strokeWidth="2" />
              </motion.g>
            </g>
          ))}
          <circle cx="200" cy="170" r="7" fill="currentColor" />
          <text x="200" y="218" textAnchor="middle" fontSize="14" fill="#4f86c6">
            ε₀ = {e0Micro} µε
          </text>
          <text x="77" y="74" textAnchor="middle" fontSize="14" fill="#e9a23b">
            ε₄₅ = {e45Micro} µε
          </text>
          <text x="315" y="78" textAnchor="middle" fontSize="14" fill="#2a9d8f">
            ε₉₀ = {e90Micro} µε
          </text>
          <text x="329" y="175" fontSize="14" fill="currentColor">
            x (0°)
          </text>
          <text x="208" y="52" fontSize="14" fill="currentColor">
            y (90°)
          </text>
          <line x1="440" y1="170" x2="680" y2="170" stroke="currentColor" strokeDasharray="5 5" opacity="0.35" />
          <line x1="555" y1="60" x2="555" y2="280" stroke="currentColor" strokeDasharray="5 5" opacity="0.35" />
          <motion.g
            animate={{ rotate: -rosette.angleDeg }}
            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <rect
              x="505"
              y="120"
              width="100"
              height="100"
              fill="#4f86c6"
              fillOpacity="0.1"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1={555 - p1Half}
              y1="170"
              x2={555 + p1Half}
              y2="170"
              stroke="#e76f51"
              strokeWidth="3"
              markerStart="url(#rosette-principal-arrow)"
              markerEnd="url(#rosette-principal-arrow)"
            />
            <line
              x1="555"
              y1={170 - p2Half}
              x2="555"
              y2={170 + p2Half}
              stroke="#e9a23b"
              strokeWidth="3"
              markerStart="url(#rosette-principal-arrow)"
              markerEnd="url(#rosette-principal-arrow)"
            />
            <text x={555 + p1Half + 8} y="175" fontSize="15" fill="#e76f51">
              1
            </text>
            <text x="560" y={170 - p2Half - 6} fontSize="15" fill="#e9a23b">
              2
            </text>
          </motion.g>
          <path d="M615 170A60 60 0 0 0 555 110" fill="none" stroke="currentColor" opacity="0.45" />
          <text x="555" y="302" textAnchor="middle" fontSize="14" fill="currentColor">
            α = {fmt(rosette.angleDeg, 1)}° od osi x do kierunku 1
          </text>
          <text x="200" y="325" textAnchor="middle" fontSize="13" fill="currentColor">
            γxy = 2ε₄₅ − ε₀ − ε₉₀ = {fmt(rosette.gammaXY * 1e6, 1)} µε
          </text>
          <text x="555" y="325" textAnchor="middle" fontSize="13" fill="currentColor">
            E = {youngGPa} GPa · ν = {fmt(poisson, 2)} · σz = 0
          </text>
          <text x="380" y="346" textAnchor="middle" fontSize="12" fill="currentColor">
            1 µε = 10⁻⁶ · dodatnie ε: wydłużenie · ujemne ε: skrócenie
          </text>
        </svg>
      }
    />
  )
}
