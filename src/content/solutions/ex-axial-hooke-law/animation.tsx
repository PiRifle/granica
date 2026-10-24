import { motion } from 'motion/react'
import type { SolutionAnimationProps } from '../../../types'
import { local } from '../../../components/solution-figures/shared'

const ACCENT = '#4f6df5'
const LOAD = '#ff6b45'
const SUPPORT = '#68727e'
const MUTED = '#87929d'
const YIELD = '#2f7d5b'

const CX = 210
const HALF = 36
const TOP = 52
const BASE = 162
const ORIGINAL_BOTTOM = TOP + BASE
const SCALE = 10
const DELTA = 1.5 * SCALE
const LIMIT_X = CX + HALF + 18
const GAUGE_X = 70
const GAUGE_Y = 250
const GAUGE_W = 130
const GAUGE_MAX = 250

const clamp = (value: number) => Math.min(1, Math.max(0, value))
const smooth = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}

function Support() {
  return (
    <g stroke={SUPPORT} strokeWidth={2} strokeLinecap="round">
      <line x1={CX - HALF - 26} y1={TOP} x2={CX + HALF + 26} y2={TOP} />
      {Array.from({ length: 9 }, (_, index) => {
        const x = CX - HALF - 20 + index * ((HALF * 2 + 40) / 8)
        return <line key={index} x1={x} y1={TOP} x2={x - 8} y2={TOP - 12} strokeWidth={1.5} />
      })}
    </g>
  )
}

export function HookeLawExample1Animation({ scene, index, playing, sceneProgress }: SolutionAnimationProps) {
  const p = playing ? clamp(sceneProgress) : 1
  const metric = scene.focus?.metric
  const stretchT = index === 0 ? 0 : smooth((p - 0.08) / 0.84)
  const stretch = DELTA * stretchT
  const bottom = ORIGINAL_BOTTOM + stretch
  const loadAmount = index === 0 ? smooth(p / 0.72) : 1
  const showStrain = metric === 'ε'
  const showElongation = index >= 2
  const showGauge = index === 3
  const active = metric === 'ε' || metric === 'σ' || metric === 'ΔL'

  return (
    <div className={local('figure')}>
      <div className={local('figure-canvas')}>
        <svg
          viewBox="0 0 460 280"
          role="img"
          aria-label="Pręt stalowy utwierdzony u góry, rozciągany naprężeniem 150 MPa, z zaznaczonym wydłużeniem 1,5 mm"
        >
          <Support />

          <motion.rect
            x={CX - HALF}
            y={TOP}
            width={HALF * 2}
            height={BASE + stretch}
            rx={4}
            fill={ACCENT}
            initial={false}
            animate={{
              height: BASE + stretch,
              fillOpacity: active ? 0.2 : 0.14,
              strokeWidth: active ? 2.6 : 2,
            }}
            transition={{ duration: 0.12, ease: 'linear' }}
            stroke={ACCENT}
          />

          <motion.line
            x1={CX - HALF - 8}
            y1={ORIGINAL_BOTTOM}
            x2={CX + HALF + 8}
            y2={ORIGINAL_BOTTOM}
            stroke={MUTED}
            strokeWidth={1.2}
            strokeDasharray="4 4"
            initial={false}
            animate={{ opacity: stretch > 0.8 ? 0.9 : 0 }}
          />

          <g stroke={MUTED} strokeWidth={1.2} fill="none">
            <line x1={CX - HALF - 28} y1={TOP} x2={CX - HALF - 28} y2={ORIGINAL_BOTTOM} />
            <line x1={CX - HALF - 33} y1={TOP} x2={CX - HALF - 23} y2={TOP} />
            <line x1={CX - HALF - 33} y1={ORIGINAL_BOTTOM} x2={CX - HALF - 23} y2={ORIGINAL_BOTTOM} />
            <text
              x={CX - HALF - 36}
              y={TOP + BASE / 2}
              textAnchor="middle"
              fontSize={9}
              fill={MUTED}
              stroke="none"
              transform={`rotate(-90 ${CX - HALF - 36} ${TOP + BASE / 2})`}
            >
              L₀ = 2 m
            </text>
          </g>

          <text x={CX} y={TOP + 36} textAnchor="middle" fontSize={10} fontWeight={700} fill={ACCENT}>
            σ = 150 MPa
          </text>
          <text x={CX} y={TOP + 52} textAnchor="middle" fontSize={9} fill={MUTED}>
            E = 200 GPa
          </text>

          {showStrain && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: stretchT > 0.35 ? 1 : 0 }}>
              <line x1={LIMIT_X} y1={ORIGINAL_BOTTOM} x2={LIMIT_X} y2={bottom} stroke={ACCENT} strokeWidth={1.3} />
              <line x1={LIMIT_X - 5} y1={ORIGINAL_BOTTOM} x2={LIMIT_X + 5} y2={ORIGINAL_BOTTOM} stroke={ACCENT} />
              <line x1={LIMIT_X - 5} y1={bottom} x2={LIMIT_X + 5} y2={bottom} stroke={ACCENT} />
              <text x={LIMIT_X + 7} y={bottom + 2} fontSize={9} fontWeight={700} fill={ACCENT}>
                ε = 0,00075
              </text>
              <text x={LIMIT_X + 7} y={bottom + 16} fontSize={9} fill={ACCENT}>
                = 0,075%
              </text>
            </motion.g>
          )}

          {showElongation && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: stretchT > 0.35 ? 1 : 0 }}>
              <line x1={LIMIT_X} y1={ORIGINAL_BOTTOM} x2={LIMIT_X} y2={bottom} stroke={ACCENT} strokeWidth={1.3} />
              <line x1={LIMIT_X - 5} y1={ORIGINAL_BOTTOM} x2={LIMIT_X + 5} y2={ORIGINAL_BOTTOM} stroke={ACCENT} />
              <line x1={LIMIT_X - 5} y1={bottom} x2={LIMIT_X + 5} y2={bottom} stroke={ACCENT} />
              <text x={LIMIT_X + 7} y={bottom + 14} fontSize={9} fontWeight={700} fill={ACCENT}>
                ΔL = 1,5 mm
              </text>
            </motion.g>
          )}

          <motion.g initial={{ opacity: 0 }} animate={{ opacity: loadAmount }} stroke={LOAD} fill={LOAD}>
            <line x1={CX} y1={bottom + 7} x2={CX} y2={bottom + 35} strokeWidth={2.5} />
            <path
              d={`M${CX - 5} ${bottom + 27} L${CX} ${bottom + 36} L${CX + 5} ${bottom + 27}`}
              fill="none"
              strokeWidth={2.5}
            />
            <text x={CX + 9} y={bottom + 28} fontSize={9.5} stroke="none">
              N
            </text>
          </motion.g>

          {showGauge && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: p > 0.3 ? 1 : 0 }}>
              <text x={GAUGE_X} y={GAUGE_Y - 10} fontSize={9} fill={MUTED}>
                σ [MPa]
              </text>
              <line x1={GAUGE_X} y1={GAUGE_Y} x2={GAUGE_X + GAUGE_W} y2={GAUGE_Y} stroke={MUTED} strokeWidth={1.3} />
              <motion.rect
                x={GAUGE_X}
                y={GAUGE_Y - 7}
                height={7}
                fill={YIELD}
                fillOpacity={0.65}
                initial={{ width: 0 }}
                animate={{ width: (GAUGE_W * 150) / GAUGE_MAX }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
              <line
                x1={GAUGE_X + (GAUGE_W * 235) / GAUGE_MAX}
                y1={GAUGE_Y - 12}
                x2={GAUGE_X + (GAUGE_W * 235) / GAUGE_MAX}
                y2={GAUGE_Y + 9}
                stroke={YIELD}
                strokeWidth={1.4}
                strokeDasharray="3 3"
              />
              <text
                x={GAUGE_X + (GAUGE_W * 150) / GAUGE_MAX}
                y={GAUGE_Y + 19}
                textAnchor="middle"
                fontSize={8}
                fill={YIELD}
              >
                150
              </text>
              <text
                x={GAUGE_X + (GAUGE_W * 235) / GAUGE_MAX}
                y={GAUGE_Y + 19}
                textAnchor="middle"
                fontSize={8}
                fill={YIELD}
              >
                235
              </text>
              <text x={GAUGE_X + GAUGE_W / 2} y={GAUGE_Y - 18} textAnchor="middle" fontSize={8.5} fill={YIELD}>
                zapas ≈ 1,57
              </text>
            </motion.g>
          )}
        </svg>
      </div>
    </div>
  )
}
