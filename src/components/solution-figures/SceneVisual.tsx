import { motion } from 'motion/react'
import type { SolutionScene } from '../../types'

function AxialVisual({ phase }: { phase: number }) {
  const stretch = 22 + (phase % 3) * 8
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Pręt rozciągany z siłami na końcach">
      <line x1="30" y1="110" x2="390" y2="110" stroke="currentColor" strokeOpacity=".16" strokeDasharray="4 5" />
      <motion.rect
        x={70}
        y={92}
        width={280 + stretch}
        height={36}
        rx={6}
        fill="#edf1ff"
        stroke="#4f6df5"
        strokeWidth={2}
        animate={{ width: 280 + stretch }}
        transition={{ type: 'spring', stiffness: 80, damping: 16 }}
      />
      <motion.g animate={{ x: [-3, 3, -3] }} transition={{ duration: 2, repeat: Infinity }}>
        <path d="M70 92 L40 110 L70 128" fill="none" stroke="#ff6b45" strokeWidth={3} />
        <path d="M70 80 L40 80 M70 140 L40 140" stroke="#ff6b45" strokeWidth={2} />
      </motion.g>
      <motion.g animate={{ x: [3, -3, 3] }} transition={{ duration: 2, repeat: Infinity }}>
        <path
          d={`M${350 + stretch} 92 L${380 + stretch} 110 L${350 + stretch} 128`}
          fill="none"
          stroke="#ff6b45"
          strokeWidth={3}
        />
        <path
          d={`M${350 + stretch} 80 L${380 + stretch} 80 M${350 + stretch} 140 L${380 + stretch} 140`}
          stroke="#ff6b45"
          strokeWidth={2}
        />
      </motion.g>
      <text x="40" y="62" fontSize="13" fill="#c65c43">
        N
      </text>
      <text x={366 + stretch} y="62" fontSize="13" fill="#c65c43">
        N
      </text>
      <text x="210" y="186" textAnchor="middle" fontSize="12" fill="#68727e">
        przekrój A, długość L
      </text>
      <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#87929d">
        wydłużenie ΔL jest proporcjonalne do N
      </text>
    </svg>
  )
}

function ThermalVisual({ phase }: { phase: number }) {
  const blocked = phase % 2 === 1
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Pręt swobodny i zablokowany podczas ogrzewania">
      <rect x="70" y="60" width="280" height="34" rx="5" fill="#fff2ed" stroke="#ff6b45" strokeWidth={2} />
      <rect
        x="70"
        y="130"
        width={blocked ? 280 : 280 + 20}
        height="34"
        rx="5"
        fill="#edf1ff"
        stroke="#4f6df5"
        strokeWidth={2}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.path
          key={i}
          d={`M${120 + i * 55} 44 q8 -12 0 -22`}
          fill="none"
          stroke="#ff6b45"
          strokeWidth={2}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      <rect x="56" y="122" width="14" height="50" fill="#68727e" />
      <rect x="350" y="122" width="14" height="50" fill="#68727e" />
      <text x="70" y="116" fontSize="11" fill="#87929d">
        swobodny: wydłuża się, σ = 0
      </text>
      <text x="70" y="188" fontSize="11" fill="#87929d">
        zablokowany: długość stała, σ = −EαΔT
      </text>
      <motion.line
        x1="350"
        y1="101"
        x2={blocked ? 350 : 370}
        y2="101"
        stroke="#ff6b45"
        strokeWidth={2}
        animate={{ x2: blocked ? 350 : 370 }}
      />
    </svg>
  )
}

function SectionVisual({ phase }: { phase: number }) {
  const arrows = 9
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Rozkład naprężeń w przekroju">
      <rect x="150" y="36" width="120" height="148" rx="4" fill="#f5f7fc" stroke="#bfc7d1" strokeWidth={2} />
      {Array.from({ length: arrows }, (_, i) => {
        const intensity = 8 + Math.abs(i - (arrows - 1) / 2) * 6 + (phase % 3) * 2
        return (
          <line
            key={i}
            x1={150 - intensity - 8}
            y1={48 + i * 16}
            x2={146}
            y2={48 + i * 16}
            stroke="#4f6df5"
            strokeWidth={2.5}
          />
        )
      })}
      <line x1="150" y1="110" x2="270" y2="110" stroke="#ff6b45" strokeDasharray="5 4" strokeWidth={1.5} />
      <text x="278" y="110" fontSize="11" fill="#c65c43">
        oś obojętna
      </text>
      <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#87929d">
        σ = N/A — równomierny rozkład w przekroju
      </text>
    </svg>
  )
}

function CubeVisual({ phase }: { phase: number }) {
  const shear = 10 + (phase % 3) * 5
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Element sześcienny ze składowymi stanu naprężenia">
      <motion.g
        animate={{ rotate: [0, shear * 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ transformOrigin: '210px 110px' }}
      >
        <rect x="160" y="60" width="100" height="100" fill="#f5f7fc" stroke="#87929d" strokeWidth={2} />
        <path d="M160 60 L190 35 L290 35 L260 60" fill="#edf1ff" stroke="#87929d" strokeWidth={2} />
        <path d="M260 60 L290 35 L290 135 L260 160" fill="#f5f7fc" stroke="#87929d" strokeWidth={2} />
        <line x1="210" y1="110" x2="210" y2="60" stroke="#c65c43" strokeWidth={2} markerEnd="url(#cubeArrow)" />
        <line x1="210" y1="110" x2="260" y2="110" stroke="#4f6df5" strokeWidth={2} />
        <line x1="210" y1="110" x2="170" y2="145" stroke="#6b7c8d" strokeWidth={2} />
      </motion.g>
      <defs>
        <marker id="cubeArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#c65c43" />
        </marker>
      </defs>
      <text x="216" y="56" fontSize="11" fill="#c65c43">
        σy
      </text>
      <text x="266" y="114" fontSize="11" fill="#3155d9">
        σx
      </text>
      <text x="150" y="158" fontSize="11" fill="#6b7c8d">
        σz
      </text>
      <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#87929d">
        składowe tensora naprężenia w punkcie
      </text>
    </svg>
  )
}

function RosetteVisual({ phase }: { phase: number }) {
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Rozeta tensometryczna 0, 45 i 90 stopni">
      <circle cx="210" cy="108" r="72" fill="#f5f7fc" stroke="#d3d9e0" strokeWidth={1.5} />
      <motion.g
        animate={{ rotate: phase % 3 === 0 ? [0, 8, 0] : 0 }}
        transition={{ duration: 2 }}
        style={{ transformOrigin: '210px 108px' }}
      >
        <line x1="210" y1="108" x2="282" y2="108" stroke="#ff6b45" strokeWidth={3} />
        <line x1="210" y1="108" x2="261" y2="57" stroke="#4f6df5" strokeWidth={3} />
        <line x1="210" y1="108" x2="210" y2="36" stroke="#6b7c8d" strokeWidth={3} />
      </motion.g>
      <text x="288" y="112" fontSize="11" fill="#c65c43">
        0°
      </text>
      <text x="264" y="48" fontSize="11" fill="#3155d9">
        45°
      </text>
      <text x="204" y="28" fontSize="11" fill="#6b7c8d">
        90°
      </text>
      <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#87929d">
        trzy kierunki pomiarowe wyznaczają tensor odkształcenia
      </text>
    </svg>
  )
}

function BeamVisual({ phase }: { phase: number }) {
  const deflection = 18 + (phase % 3) * 8
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Belka zginana z podporami i obciążeniem">
      <motion.path
        d={`M60 120 Q210 ${120 + deflection} 360 120`}
        fill="none"
        stroke="#4f6df5"
        strokeWidth={10}
        strokeLinecap="round"
        animate={{
          d: [
            `M60 120 Q210 ${120 + deflection * 0.4} 360 120`,
            `M60 120 Q210 ${120 + deflection} 360 120`,
            `M60 120 Q210 ${120 + deflection * 0.4} 360 120`,
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path d="M45 135 L60 120 L75 135 Z M345 135 L360 120 L375 135 Z" fill="#68727e" />
      <line x1="20" y1="137" x2="400" y2="137" stroke="#68727e" strokeWidth={1.5} />
      <motion.g animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <line x1="210" y1="38" x2="210" y2="94" stroke="#ff6b45" strokeWidth={3} />
        <path d="M200 83 L210 99 L220 83" fill="none" stroke="#ff6b45" strokeWidth={3} />
      </motion.g>
      <text x="210" y="28" textAnchor="middle" fontSize="11" fill="#c65c43">
        P
      </text>
      <text x="210" y="206" textAnchor="middle" fontSize="11" fill="#87929d">
        reakcje → siły tnące T(x) → moment M(x) → naprężenia σ
      </text>
    </svg>
  )
}

function DiagramVisual({ phase }: { phase: number }) {
  const curve = phase % 3
  const path =
    curve === 0
      ? 'M60 170 C130 170 140 60 210 60 C280 60 290 170 360 170'
      : curve === 1
        ? 'M60 170 L360 60'
        : 'M60 60 Q210 190 360 60'
  return (
    <svg viewBox="0 0 420 220" role="img" aria-label="Wykres pomocniczy rozwiązania">
      <line x1="55" y1="20" x2="55" y2="175" stroke="#bfc7d1" />
      <line x1="55" y1="175" x2="385" y2="175" stroke="#bfc7d1" />
      <motion.path
        d={path}
        fill="none"
        stroke="#4f6df5"
        strokeWidth={3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6 }}
      />
      <text x="360" y="196" fontSize="10" fill="#87929d">
        x
      </text>
      <text x="30" y="30" fontSize="10" fill="#87929d">
        wynik
      </text>
    </svg>
  )
}

export function SceneVisual({ scene, index }: { scene: SolutionScene; index: number }) {
  switch (scene.visual) {
    case 'axial':
      return <AxialVisual phase={index} />
    case 'thermal':
      return <ThermalVisual phase={index} />
    case 'section':
      return <SectionVisual phase={index} />
    case 'cube':
      return <CubeVisual phase={index} />
    case 'rosette':
      return <RosetteVisual phase={index} />
    case 'beam':
      return <BeamVisual phase={index} />
    default:
      return <DiagramVisual phase={index} />
  }
}
