import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const MUTED = '#87929d'
const SUPPORT = '#68727e'
const OK = '#2f7d5b'
const INK = '#17202a'

const CX = 170
const HALF = 34
const TOP = 56
const BASE = 150
const ORIGINAL_BOTTOM = TOP + BASE
const PX_PER_MM = 10
const DELTA_MM = 2
const STRETCH = DELTA_MM * PX_PER_MM

const PLOT_X = 300
const PLOT_Y = 310
const PLOT_W = 120
const PLOT_H = 58

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

function Support() {
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={CX - HALF - 20} y1={TOP} x2={CX + HALF + 20} y2={TOP} />
      {Array.from({ length: 8 }, (_, index) => {
        const x = CX - HALF - 14 + index * ((HALF * 2 + 28) / 7)
        return <line key={index} x1={x} y1={TOP} x2={x - 8} y2={TOP - 12} strokeWidth={1.4} />
      })}
    </g>
  )
}

function DeltaBracket({
  x,
  from,
  to,
  label,
  color,
  opacity,
}: {
  x: number
  from: number
  to: number
  label: string
  color: string
  opacity: number
}) {
  return (
    <motion.g initial={false} animate={{ opacity }} transition={{ duration: 0.3 }}>
      <line x1={x} y1={from} x2={x} y2={to} stroke={color} strokeWidth={1.3} />
      <line x1={x - 5} y1={from} x2={x + 5} y2={from} stroke={color} strokeWidth={1.3} />
      <line x1={x - 5} y1={to} x2={x + 5} y2={to} stroke={color} strokeWidth={1.3} />
      <text x={x + 8} y={(from + to) / 2 + 3} fontSize={9} fontWeight={700} fill={color}>
        {label}
      </text>
    </motion.g>
  )
}

export function HookeStiffnessAnimation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp01(sceneProgress) : 1
  const metric = scene.focus?.metric ?? 'N'
  const stretchT = index < 2 ? 0 : playing ? smooth((p - 0.05) / 0.7) : 1
  const stretch = STRETCH * stretchT
  const bottom = ORIGINAL_BOTTOM + stretch
  const loadT = index === 0 ? smooth(p / 0.65) : 1
  const stressT = index === 1 ? smooth(p / 0.55) : 1
  const deltaT = index >= 3 ? smooth((p - 0.08) / 0.62) : 0
  const showStress = index === 1
  const showStrain = index === 2
  const showDelta = index >= 3
  const showStiffness = index === 4

  const pointX = PLOT_X + PLOT_W * (DELTA_MM / 2.5)
  const pointY = PLOT_Y - PLOT_H * (50 / 60)
  const markerX = PLOT_X + (pointX - PLOT_X) * stretchT
  const markerY = PLOT_Y - (PLOT_Y - pointY) * stretchT

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 330"
          role="img"
          aria-label="Stalowy pręt utwierdzony u góry, rozciągany siłą 50 kN; animacja naprężenia 200 MPa, odkształcenia 0,001 i wydłużenia 2 mm"
        >
          <Support />

          <g fill={MUTED} fontSize={9}>
            <text x={14} y={86}>
              N = 50 kN
            </text>
            <text x={14} y={100}>
              L = 2 m
            </text>
            <text x={14} y={114}>
              A = 250 mm²
            </text>
            <text x={14} y={128}>
              E = 200 GPa
            </text>
          </g>

          <g stroke={MUTED} strokeWidth={1.2} fill="none">
            <line x1={118} y1={TOP} x2={118} y2={ORIGINAL_BOTTOM} />
            <line x1={113} y1={TOP} x2={123} y2={TOP} />
            <line x1={113} y1={ORIGINAL_BOTTOM} x2={123} y2={ORIGINAL_BOTTOM} />
            <text
              x={110}
              y={TOP + BASE / 2}
              textAnchor="middle"
              fontSize={9}
              fill={MUTED}
              stroke="none"
              transform={`rotate(-90 110 ${TOP + BASE / 2})`}
            >
              L₀ = 2 m
            </text>
          </g>

          <line
            x1={CX - HALF - 8}
            y1={ORIGINAL_BOTTOM}
            x2={CX + HALF + 8}
            y2={ORIGINAL_BOTTOM}
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
            opacity={stretch > 0.5 ? 0.9 : 0.45}
          />

          <motion.rect
            x={CX - HALF}
            y={TOP}
            width={HALF * 2}
            height={bottom - TOP}
            rx={4}
            fill={ACCENT}
            initial={false}
            animate={{
              height: bottom - TOP,
              fillOpacity: metric === 'σ' || metric === 'ε' || metric === 'ΔL' ? 0.22 : 0.15,
              strokeWidth: metric === 'σ' || metric === 'ε' || metric === 'ΔL' ? 2.6 : 2,
            }}
            transition={{ duration: 0.12, ease: 'linear' }}
            stroke={ACCENT}
          />

          <text x={CX} y={TOP + 34} textAnchor="middle" fontSize={10} fontWeight={700} fill={ACCENT}>
            A = 250 mm²
          </text>
          <text x={CX} y={TOP + 49} textAnchor="middle" fontSize={9} fill={MUTED}>
            E = 200 GPa
          </text>

          {showStress && (
            <motion.g initial={false} animate={{ opacity: stressT }} transition={{ duration: 0.25 }}>
              <line
                x1={CX - HALF - 10}
                y1={TOP + 78}
                x2={CX + HALF + 10}
                y2={TOP + 78}
                stroke={ACCENT}
                strokeWidth={1.3}
                strokeDasharray="3 3"
              />
              {Array.from({ length: 5 }, (_, arrow) => {
                const x = CX - HALF + 8 + arrow * ((HALF * 2 - 16) / 4)
                return (
                  <g key={arrow} stroke={ACCENT} fill={ACCENT}>
                    <line x1={x} y1={TOP + 84} x2={x} y2={TOP + 102} strokeWidth={1.8} />
                    <path d={`M${x - 3.5} ${TOP + 97} L${x} ${TOP + 103} L${x + 3.5} ${TOP + 97}`} fill="none" />
                  </g>
                )
              })}
              <text x={CX + HALF + 18} y={TOP + 96} fontSize={9.5} fontWeight={700} fill={ACCENT}>
                σ = 200 MPa
              </text>
              <text x={CX + HALF + 18} y={TOP + 110} fontSize={8.5} fill={MUTED}>
                rozkład równomierny
              </text>
            </motion.g>
          )}

          {showStrain && (
            <motion.g initial={false} animate={{ opacity: stressT }} transition={{ duration: 0.25 }}>
              <text x={CX + HALF + 20} y={TOP + 52} fontSize={10} fontWeight={700} fill={ACCENT}>
                ε = 0,001
              </text>
              <text x={CX + HALF + 20} y={TOP + 66} fontSize={8.5} fill={MUTED}>
                σ/E = 200/200 000
              </text>
              <text x={CX + HALF + 20} y={TOP + 80} fontSize={8.5} fill={MUTED}>
                czyli 0,1% długości
              </text>
            </motion.g>
          )}

          {showDelta && (
            <DeltaBracket
              x={CX + HALF + 20}
              from={ORIGINAL_BOTTOM}
              to={bottom}
              label={`ΔL = ${DELTA_MM} mm`}
              color={ACCENT}
              opacity={deltaT}
            />
          )}

          {index === 3 && (
            <motion.text
              x={CX + HALF + 20}
              y={TOP + 52}
              fontSize={9}
              fontWeight={700}
              fill={ACCENT}
              initial={false}
              animate={{ opacity: deltaT }}
            >
              ε = 0,001
            </motion.text>
          )}

          {showStiffness && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: p > 0.25 ? 1 : 0 }} transition={{ duration: 0.3 }}>
              <text x={PLOT_X} y={PLOT_Y - PLOT_H - 9} fontSize={9} fontWeight={700} fill={ACCENT}>
                k = 25 MN/m
              </text>
              <line x1={PLOT_X} y1={PLOT_Y} x2={PLOT_X + PLOT_W + 12} y2={PLOT_Y} stroke={MUTED} strokeWidth={1.2} />
              <line x1={PLOT_X} y1={PLOT_Y} x2={PLOT_X} y2={PLOT_Y - PLOT_H - 10} stroke={MUTED} strokeWidth={1.2} />
              <line x1={PLOT_X} y1={PLOT_Y} x2={markerX} y2={markerY} stroke={ACCENT} strokeWidth={2} />
              <circle cx={markerX} cy={markerY} r={3} fill={ACCENT} />
              <text x={PLOT_X + PLOT_W / 2} y={PLOT_Y + 14} textAnchor="middle" fontSize={8} fill={MUTED}>
                ΔL [mm]
              </text>
              <text
                x={PLOT_X - 7}
                y={PLOT_Y - PLOT_H / 2}
                textAnchor="middle"
                fontSize={8}
                fill={MUTED}
                transform={`rotate(-90 ${PLOT_X - 7} ${PLOT_Y - PLOT_H / 2})`}
              >
                N [kN]
              </text>
              <text x={pointX + 5} y={pointY - 4} fontSize={8} fill={ACCENT}>
                50
              </text>
              <text
                x={PLOT_X + PLOT_W * (DELTA_MM / 2.5)}
                y={PLOT_Y + 11}
                textAnchor="middle"
                fontSize={8}
                fill={MUTED}
              >
                2
              </text>
            </motion.g>
          )}

          <motion.g initial={false} animate={{ opacity: loadT }} transition={{ duration: 0.25 }}>
            <g stroke={LOAD} fill={LOAD}>
              <line x1={CX} y1={bottom + 7} x2={CX} y2={bottom + 38} strokeWidth={2.4} />
              <path
                d={`M${CX - 5} ${bottom + 29} L${CX} ${bottom + 39} L${CX + 5} ${bottom + 29}`}
                fill="none"
                strokeWidth={2.4}
              />
            </g>
            <text x={CX + 9} y={bottom + 30} fontSize={9.5} fill={LOAD}>
              N = 50 kN
            </text>
          </motion.g>

          {showStiffness && (
            <motion.text
              x={14}
              y={298}
              fontSize={9}
              fill={OK}
              initial={{ opacity: 0 }}
              animate={{ opacity: p > 0.7 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ✓ σ = 200 MPa &lt; 235 MPa
            </motion.text>
          )}

          <text x={14} y={322} fontSize={8} fill={MUTED}>
            {index < 2 ? 'schemat pręta w skali poglądowej' : 'wydłużenie pokazano w powiększeniu'}
          </text>
          <text x={CX} y={TOP - 16} textAnchor="middle" fontSize={8.5} fill={INK}>
            stal
          </text>
        </svg>
      </div>
    </div>
  )
}
